import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const compare: ToolDefinition = {
  name: "compare",
  description:
    "Year-on-year variance analysis comparing prior and current year tax computations. Flags items that would trigger LHDN audit scrutiny.",
  schema: {
    prior_year: z.string().min(1).describe("Prior year computation or key figures"),
    current_year: z.string().min(1).describe("Current year computation or key figures"),
    entity_type: z.string().optional().describe("Entity type"),
  },
  handler: async (args) => {
    const { prior_year, current_year, entity_type } = args as {
      prior_year: string; current_year: string; entity_type?: string;
    };

    const compareRef = await loadReference("compare.md");

    return text([
      `# Year-on-Year Comparison Instructions`,
      ``,
      `## Prior Year`,
      "```",
      prior_year,
      "```",
      ``,
      `## Current Year`,
      "```",
      current_year,
      "```",
      ``,
      entity_type ? `Entity type: ${entity_type}` : "",
      ``,
      `## Comparison Procedure`,
      compareRef,
    ]);
  },
};
