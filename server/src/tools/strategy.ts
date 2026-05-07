import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const strategy: ToolDefinition = {
  name: "strategy",
  description:
    "Tax optimisation recommendations by company stage (loss-making, breakeven, profitable, super-profitable). Quantified savings bounded by anti-avoidance law.",
  schema: {
    financial_position: z.string().min(1).describe("Current financial position: adjusted income/loss, unabsorbed losses, CA b/f, projected profitability"),
    entity_type: z.enum(["sdn-bhd", "berhad", "plt", "partnership", "sole-proprietor"]).describe("Entity type"),
    year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Current YA"),
    risk_appetite: z.enum(["legitimate-only", "some-grey-area", "aggressive"]).optional().describe("Client's risk tolerance for tax planning"),
  },
  handler: async (args) => {
    const { financial_position, entity_type, year_of_assessment, risk_appetite } = args as {
      financial_position: string; entity_type: string; year_of_assessment: string; risk_appetite?: string;
    };

    const [strategyRef, incentivesRef] = await Promise.all([
      loadReference("tax-strategy.md"),
      loadReference("incentives.md"),
    ]);

    return text([
      `# Strategy Analysis Instructions`,
      ``,
      `## Current Position`,
      financial_position,
      ``,
      `## Parameters`,
      `- Entity: ${entity_type}`,
      `- YA: ${year_of_assessment}`,
      `- Risk appetite: ${risk_appetite || "legitimate-only (default)"}`,
      ``,
      `## Strategy Reference`,
      strategyRef,
      ``,
      `## Incentives Reference`,
      incentivesRef,
    ]);
  },
};
