import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const group: ToolDefinition = {
  name: "group",
  description:
    "Group structure review: IHC classification (s.60F), group relief (s.44A), controlled transfers (Para 38-40), shareholder continuity, and stamp duty (s.15A).",
  schema: {
    structure: z.string().min(1).describe("Group structure: entities, ownership percentages, jurisdictions"),
  },
  handler: async (args) => {
    const { structure } = args as { structure: string };

    const groupRef = await loadReference("group.md");

    return text([
      `# Group Structure Review Instructions`,
      ``,
      `## Group Structure`,
      structure,
      ``,
      `## Group Tax Reference`,
      groupRef,
    ]);
  },
};
