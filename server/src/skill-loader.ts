import { readFileSync, existsSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = resolve(__dirname, "../../skill");

export function loadReference(filename: string): string {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  const path = join(SKILL_ROOT, "reference", sanitized);
  if (!existsSync(path)) {
    throw new Error(`Reference file not found: ${sanitized}`);
  }
  return readFileSync(path, "utf-8");
}

export function loadData(filename: string): unknown {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  const path = join(SKILL_ROOT, "data", sanitized);
  if (!existsSync(path)) {
    throw new Error(`Data file not found: ${sanitized}`);
  }
  return JSON.parse(readFileSync(path, "utf-8"));
}

export function loadSkill(): string {
  const path = join(SKILL_ROOT, "SKILL.md");
  return readFileSync(path, "utf-8");
}

export function listReferences(): string[] {
  const dir = join(SKILL_ROOT, "reference");
  return readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function listDataFiles(): string[] {
  const dir = join(SKILL_ROOT, "data");
  return readdirSync(dir).filter((f) => f.endsWith(".json"));
}
