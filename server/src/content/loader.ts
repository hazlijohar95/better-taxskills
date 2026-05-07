import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { REFERENCE_DIR, DATA_DIR, SKILL_FILE } from "./paths.js";
import { ContentNotFoundError } from "../errors.js";
import { logger } from "../logger.js";

const SANITIZE_RE = /[^a-zA-Z0-9._-]/g;

function sanitize(filename: string): string {
  return filename.replace(SANITIZE_RE, "");
}

const referenceCache = new Map<string, string>();
const dataCache = new Map<string, unknown>();
let skillCache: string | null = null;

export async function loadReference(filename: string): Promise<string> {
  const safe = sanitize(filename);
  if (referenceCache.has(safe)) return referenceCache.get(safe)!;

  const path = join(REFERENCE_DIR, safe);
  try {
    const content = await readFile(path, "utf-8");
    referenceCache.set(safe, content);
    return content;
  } catch {
    throw new ContentNotFoundError(safe);
  }
}

export async function loadData(filename: string): Promise<unknown> {
  const safe = sanitize(filename);
  if (dataCache.has(safe)) return dataCache.get(safe);

  const path = join(DATA_DIR, safe);
  try {
    const content = await readFile(path, "utf-8");
    const parsed = JSON.parse(content);
    dataCache.set(safe, parsed);
    return parsed;
  } catch {
    throw new ContentNotFoundError(safe);
  }
}

export async function loadSkill(): Promise<string> {
  if (skillCache) return skillCache;
  try {
    skillCache = await readFile(SKILL_FILE, "utf-8");
    return skillCache;
  } catch {
    throw new ContentNotFoundError("SKILL.md");
  }
}

export async function listReferences(): Promise<string[]> {
  const files = await readdir(REFERENCE_DIR);
  return files.filter((f) => f.endsWith(".md"));
}

export async function listDataFiles(): Promise<string[]> {
  const files = await readdir(DATA_DIR);
  return files.filter((f) => f.endsWith(".json"));
}

export async function warmCache(): Promise<{ references: string[]; dataFiles: string[] }> {
  const start = Date.now();
  const [refs, data] = await Promise.all([listReferences(), listDataFiles()]);

  await Promise.all([
    loadSkill(),
    ...refs.map((r) => loadReference(r)),
    ...data.map((d) => loadData(d)),
  ]);

  logger.info("cache_warm", {
    references: refs.length,
    dataFiles: data.length,
    durationMs: Date.now() - start,
  });

  return { references: refs, dataFiles: data };
}
