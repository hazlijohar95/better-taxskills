import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";
import { today, daysUntil } from "./date-utils.js";

export const yearEnd: ToolDefinition = {
  name: "year_end",
  description:
    "Pre-FYE tactical planning for the final 1-3 months before financial year close. Identifies actionable deductions, capex timing, bonus declarations, and CP204 revision needs.",
  schema: {
    projected_position: z.string().min(1).describe("Management accounts or projected year-end position"),
    financial_year_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("FYE date (YYYY-MM-DD)"),
    cp204_estimate: z.string().optional().describe("Current CP204 estimate amount"),
  },
  handler: async (args) => {
    const { projected_position, financial_year_end, cp204_estimate } = args as {
      projected_position: string; financial_year_end: string; cp204_estimate?: string;
    };

    const yearEndRef = await loadReference("year-end.md");

    return text([
      `# Year-End Planning Instructions`,
      ``,
      `## Projected Position`,
      projected_position,
      ``,
      `## Parameters`,
      `- FYE: ${financial_year_end}`,
      `- Today: ${today()}`,
      `- Days until FYE: ${daysUntil(financial_year_end)}`,
      cp204_estimate ? `- CP204 estimate: ${cp204_estimate}` : "",
      ``,
      `## Year-End Planning Reference`,
      yearEndRef,
    ]);
  },
};
