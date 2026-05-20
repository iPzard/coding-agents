#!/usr/bin/env node
// sync-ai-rules.mjs
//
// Single source of truth: .claude/rules/**.  This script regenerates the rule
// catalogs for the other AI coding tools (Cursor, GitHub Copilot, Windsurf) so
// each tool folder is self-contained and grab-and-go.
//
// It ONLY writes the per-catalog rule subdirs it owns. Hand-authored files
// (the auditor "agent" files, prompts, workflows, READMEs) live elsewhere in
// each tool folder and are never touched here.
//
// Usage:  node scripts/sync-ai-rules.mjs
// No dependencies. Re-run after editing anything under .claude/rules/.

import {
  readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync,
} from 'node:fs';
import { join, dirname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, '.claude', 'rules');
const CATALOGS = ['clean-code', 'architecture-scalability', 'test-driven-development'];

// Each target maps a catalog name to an output dir, picks a file extension, and
// builds tool-specific YAML frontmatter from the parsed rule.
const TARGETS = [
  {
    name: 'Cursor',
    dir: (cat) => join(ROOT, '.cursor', 'rules', cat),
    ext: '.mdc',
    // "Agent Requested": description set, no globs, alwaysApply false → the model
    // pulls the rule by description when relevant. Mirrors Claude's lazy loading.
    frontmatter: (r) => `---\ndescription: ${yamlStr(r.description)}\nglobs:\nalwaysApply: false\n---\n`,
  },
  {
    name: 'GitHub Copilot',
    dir: (cat) => join(ROOT, '.github', 'instructions', cat),
    ext: '.instructions.md',
    // applyTo "**" → guidance is available for any file. Copilot has no lazy
    // per-rule retrieval, so all rules are in scope; see the folder README.
    frontmatter: () => `---\napplyTo: "**"\n---\n`,
  },
  {
    name: 'Windsurf',
    dir: (cat) => join(ROOT, '.windsurf', 'rules', cat),
    ext: '.md',
    // model_decision: Cascade pulls the rule by description when relevant.
    frontmatter: (r) => `---\ntrigger: model_decision\ndescription: ${yamlStr(r.description)}\n---\n`,
  },
];

function yamlStr(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function titleOf(body, fallback) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

// Description = "<title>: <first sentence of the Principle section>", capped.
// Falls back to the first prose line after the H1 when there is no Principle.
function describe(body, title) {
  const lines = body.split(/\r?\n/);
  const principleIdx = lines.findIndex((l) => /^##\s+Principle/i.test(l));
  const h1Idx = lines.findIndex((l) => /^#\s+/.test(l));
  const start = (principleIdx >= 0 ? principleIdx : h1Idx) + 1;
  let sentence = '';
  for (let i = start; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t || t.startsWith('#') || t.startsWith('**Cite as')) continue;
    sentence = t;
    break;
  }
  sentence = sentence.replace(/[*`[\]]/g, '').replace(/\s+/g, ' ').trim();
  const out = `${title}: ${sentence}`.replace(/\s+/g, ' ').trim();
  return out.length > 160 ? `${out.slice(0, 157).trimEnd()}…` : out;
}

function run() {
  if (!existsSync(SRC)) {
    console.error(`Source not found: ${relative(ROOT, SRC)} — run from the repo root.`);
    process.exit(1);
  }

  // Wipe only the generated catalog subdirs (stale rules get removed).
  for (const t of TARGETS) {
    for (const cat of CATALOGS) {
      const d = t.dir(cat);
      if (existsSync(d)) rmSync(d, { recursive: true, force: true });
    }
  }

  let ruleCount = 0;
  const counts = Object.fromEntries(TARGETS.map((t) => [t.name, 0]));

  for (const cat of CATALOGS) {
    const srcDir = join(SRC, cat);
    if (!existsSync(srcDir)) {
      console.warn(`(skip) missing catalog: ${relative(ROOT, srcDir)}`);
      continue;
    }
    const files = readdirSync(srcDir).filter((f) => f.endsWith('.md')).sort();
    for (const file of files) {
      const raw = readFileSync(join(srcDir, file), 'utf8').replace(/^﻿/, '');
      const base = basename(file, '.md');
      const title = titleOf(raw, base);
      const rule = { description: describe(raw, title) };
      ruleCount++;
      for (const t of TARGETS) {
        const outDir = t.dir(cat);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, base + t.ext), `${t.frontmatter(rule)}\n${raw}`, 'utf8');
        counts[t.name]++;
      }
    }
  }

  console.log(`Synced ${ruleCount} rules → ${TARGETS.length} tools`);
  for (const t of TARGETS) {
    console.log(`  ${t.name.padEnd(15)} ${counts[t.name]} files  (${relative(ROOT, t.dir('<catalog>'))})`);
  }
  console.log('Source of truth: .claude/rules/  — do not hand-edit generated catalog subdirs.');
}

run();
