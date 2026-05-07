import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const checklist: ToolDefinition = {
  name: "checklist",
  description:
    "Generate a filing-ready documentation checklist from a tax computation. Lists every supporting document required per claim with risk severity if absent.",
  schema: {
    computation: z.string().min(1).describe("The computation to generate checklist for"),
  },
  handler: async (args) => {
    const { computation } = args as { computation: string };

    const checklistRef = await loadReference("checklist.md");

    return text([
      `# Documentation Checklist Instructions`,
      ``,
      `## Computation`,
      "```",
      computation,
      "```",
      ``,
      `## Checklist Reference`,
      checklistRef,
    ]);
  },
};
