#!/usr/bin/env node

/**
 * Build script for Malaysian Tax Computation Skill
 *
 * Transforms the source skill into provider-specific distributions.
 * Inspired by impeccable's multi-provider build system.
 *
 * Usage: node scripts/build.js [--provider <name>] [--all]
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync } from 'fs';
import { join, resolve, basename } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const SKILL_DIR = join(ROOT, 'skill');
const DIST_DIR = join(ROOT, 'dist');

const PROVIDERS = {
  'claude-code': {
    configDir: '.claude/skills/malaysian-tax',
    displayName: 'Claude Code',
    frontmatterFields: ['name', 'description', 'user-invocable', 'argument-hint'],
    placeholders: {
      '{{command_prefix}}': '/',
      '{{model}}': 'Claude',
      '{{config_file}}': 'CLAUDE.md'
    }
  },
  'cursor': {
    configDir: '.cursor/skills/malaysian-tax',
    displayName: 'Cursor',
    frontmatterFields: ['name', 'description'],
    placeholders: {
      '{{command_prefix}}': '/',
      '{{model}}': 'the AI',
      '{{config_file}}': '.cursorrules'
    }
  },
  'windsurf': {
    configDir: '.windsurf/skills/malaysian-tax',
    displayName: 'Windsurf',
    frontmatterFields: ['name', 'description'],
    placeholders: {
      '{{command_prefix}}': '/',
      '{{model}}': 'the AI',
      '{{config_file}}': '.windsurfrules'
    }
  },
  'gemini': {
    configDir: '.gemini/skills/malaysian-tax',
    displayName: 'Gemini CLI',
    frontmatterFields: ['name', 'description'],
    placeholders: {
      '{{command_prefix}}': '/',
      '{{model}}': 'Gemini',
      '{{config_file}}': 'GEMINI.md'
    }
  },
  'codex': {
    configDir: '.codex/skills/malaysian-tax',
    displayName: 'OpenAI Codex',
    frontmatterFields: ['name', 'description'],
    placeholders: {
      '{{command_prefix}}': '/',
      '{{model}}': 'the AI',
      '{{config_file}}': 'AGENTS.md'
    }
  }
};

function readSourceFiles() {
  const skillMd = readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf-8');

  const references = {};
  const refDir = join(SKILL_DIR, 'reference');
  if (existsSync(refDir)) {
    for (const file of readdirSync(refDir)) {
      if (file.endsWith('.md')) {
        references[file] = readFileSync(join(refDir, file), 'utf-8');
      }
    }
  }

  const data = {};
  const dataDir = join(SKILL_DIR, 'data');
  if (existsSync(dataDir)) {
    for (const file of readdirSync(dataDir)) {
      if (file.endsWith('.json')) {
        data[file] = readFileSync(join(dataDir, file), 'utf-8');
      }
    }
  }

  return { skillMd, references, data };
}

function replacePlaceholders(content, placeholders) {
  let result = content;
  for (const [key, value] of Object.entries(placeholders)) {
    result = result.replaceAll(key, value);
  }
  return result;
}

function buildProvider(providerName, config, source) {
  const outDir = join(DIST_DIR, providerName, config.configDir);
  mkdirSync(outDir, { recursive: true });
  mkdirSync(join(outDir, 'reference'), { recursive: true });
  mkdirSync(join(outDir, 'data'), { recursive: true });

  const skillContent = replacePlaceholders(source.skillMd, config.placeholders);
  writeFileSync(join(outDir, 'SKILL.md'), skillContent);

  for (const [filename, content] of Object.entries(source.references)) {
    writeFileSync(join(outDir, 'reference', filename), content);
  }

  for (const [filename, content] of Object.entries(source.data)) {
    writeFileSync(join(outDir, 'data', filename), content);
  }

  return outDir;
}

function validate(source) {
  const errors = [];

  if (!source.skillMd.includes('---\nname:')) {
    errors.push('SKILL.md missing frontmatter');
  }

  const requiredRefs = ['corporate.md', 'partnership.md', 'sole-prop.md', 'ngo.md',
                        'capital-allowances.md', 'deductions.md', 'audit.md',
                        'transfer-pricing.md', 'international.md', 'group.md'];
  for (const ref of requiredRefs) {
    if (!source.references[ref]) {
      errors.push(`Missing reference: ${ref}`);
    }
  }

  const requiredData = ['rates.json', 'ca-rates.json', 'reliefs.json', 'wht-dta.json'];
  for (const d of requiredData) {
    if (!source.data[d]) {
      errors.push(`Missing data file: ${d}`);
    }
  }

  return errors;
}

// Main
const args = process.argv.slice(2);
const targetProvider = args.includes('--provider') ? args[args.indexOf('--provider') + 1] : null;
const buildAll = args.includes('--all') || !targetProvider;

console.log('Malaysian Tax Skill — Build System\n');

const source = readSourceFiles();

const errors = validate(source);
if (errors.length > 0) {
  console.error('Validation errors:');
  errors.forEach(e => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log('✓ Validation passed\n');

const providers = buildAll ? Object.keys(PROVIDERS) : [targetProvider];

for (const name of providers) {
  if (!PROVIDERS[name]) {
    console.error(`Unknown provider: ${name}`);
    continue;
  }
  const outDir = buildProvider(name, PROVIDERS[name], source);
  console.log(`✓ Built: ${PROVIDERS[name].displayName} → ${outDir}`);
}

console.log(`\nDone. ${providers.length} provider(s) built.`);
