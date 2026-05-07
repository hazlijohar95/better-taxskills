import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveContentRoot(): string {
  // Development: skill/ is sibling to server/
  const devPath = resolve(__dirname, "../../../skill");
  if (existsSync(devPath)) return devPath;

  // npm distribution: content/ is bundled alongside dist/
  const distPath = resolve(__dirname, "../../content");
  if (existsSync(distPath)) return distPath;

  // Fallback: check SKILL_CONTENT_ROOT env
  if (process.env.SKILL_CONTENT_ROOT) {
    const envPath = resolve(process.env.SKILL_CONTENT_ROOT);
    if (existsSync(envPath)) return envPath;
  }

  throw new Error(
    "Cannot locate skill content. Expected at: " +
      `${devPath} (dev) or ${distPath} (npm). ` +
      "Set SKILL_CONTENT_ROOT to override."
  );
}

export const CONTENT_ROOT = resolveContentRoot();
export const REFERENCE_DIR = resolve(CONTENT_ROOT, "reference");
export const DATA_DIR = resolve(CONTENT_ROOT, "data");
export const SKILL_FILE = resolve(CONTENT_ROOT, "SKILL.md");
