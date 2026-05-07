#!/usr/bin/env node

import { cpSync, existsSync, rmSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../../skill");
const dest = resolve(__dirname, "../content");

if (!existsSync(src)) {
  console.error("ERROR: skill/ directory not found at", src);
  process.exit(1);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true });
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`Copied skill content to ${dest}`);
