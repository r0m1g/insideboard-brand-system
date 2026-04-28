#!/usr/bin/env node
/*
 * scripts/check-icons.js
 *
 * Verify that every SVG in assets/icons/ has a registry entry in icons.md,
 * and every registry entry in icons.md has a matching SVG on disk.
 *
 *   node scripts/check-icons.js
 *
 * Exit 0 = clean. Exit 1 = drift detected.
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '..', 'assets', 'icons');
const REGISTRY  = path.join(ICONS_DIR, 'icons.md');
const TEMPLATE  = '[anatomical-name]'; // placeholder entry — not a real icon

// --- collect SVG files (base name without -active suffix) ---
function collectSvgs(dir) {
  const results = new Set();
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const name of collectSvgs(full)) results.add(name);
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      // strip -active suffix so layout-sidebar-left and layout-sidebar-left-active
      // both resolve to the same canonical name
      const base = entry.name.replace(/\.svg$/, '').replace(/-active$/, '');
      results.add(base);
    }
  }
  return results;
}

// --- collect registered names from icons.md (#### name lines) ---
function collectRegistered(registryPath) {
  const results = new Set();
  if (!fs.existsSync(registryPath)) return results;
  const lines = fs.readFileSync(registryPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^####\s+(.+)$/);
    if (m) {
      const name = m[1].trim();
      if (name !== TEMPLATE) results.add(name);
    }
  }
  return results;
}

// --- run ---
const svgs       = collectSvgs(ICONS_DIR);
const registered = collectRegistered(REGISTRY);

const orphanedSvgs     = [...svgs].filter(n => !registered.has(n)).sort();
const orphanedEntries  = [...registered].filter(n => !svgs.has(n)).sort();

let drift = false;

if (orphanedSvgs.length) {
  drift = true;
  console.error('\n✗ SVGs with no registry entry in icons.md:');
  orphanedSvgs.forEach(n => console.error(`  - ${n}`));
}

if (orphanedEntries.length) {
  drift = true;
  console.error('\n✗ Registry entries with no matching SVG file:');
  orphanedEntries.forEach(n => console.error(`  - ${n}`));
}

if (!drift) {
  console.log(`✓ icons clean — ${svgs.size} SVG(s), ${registered.size} registered`);
}

process.exit(drift ? 1 : 0);
