import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference, loadData } from "../content/loader.js";

export const audit: ToolDefinition = {
  name: "audit",
  description:
    "Review an existing tax computation for errors, overpayments, and LHDN risk flags. Produces a health score (/20) across 5 dimensions with severity-tagged findings (P0-P3).",
  schema: {
    computation: z.string().min(1).describe("The tax computation to audit (full text)"),
    entity_type: z.string().optional().describe("Entity type if known"),
    year_of_assessment: z.string().optional().describe("Year of Assessment if known"),
  },
  handler: async (args) => {
    const { computation, entity_type, year_of_assessment } = args as {
      computation: string; entity_type?: string; year_of_assessment?: string;
    };

    const [auditRef, rates] = await Promise.all([
      loadReference("audit.md"),
      loadData("rates.json"),
    ]);

    return text([
      `# Audit Instructions`,
      ``,
      `## Computation to Review`,
      "```",
      computation,
      "```",
      ``,
      entity_type ? `Entity type: ${entity_type}` : "",
      year_of_assessment ? `YA: ${year_of_assessment}` : "",
      ``,
      `## Audit Procedure`,
      auditRef,
      ``,
      `## Rates for Verification`,
      "```json",
      JSON.stringify(rates, null, 2),
      "```",
    ]);
  },
};
