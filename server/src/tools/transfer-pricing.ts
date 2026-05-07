import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const transferPricing: ToolDefinition = {
  name: "transfer_pricing",
  description:
    "Transfer pricing analysis for controlled transactions. Tests arm's length pricing, computes earnings stripping (s.140C), and determines documentation requirements.",
  schema: {
    transactions: z.string().min(1).describe("Related-party transactions: counterparty, nature, amount, jurisdiction"),
    group_revenue: z.string().optional().describe("Group consolidated revenue (for documentation threshold)"),
  },
  handler: async (args) => {
    const { transactions, group_revenue } = args as {
      transactions: string; group_revenue?: string;
    };

    const tpRef = await loadReference("transfer-pricing.md");

    return text([
      `# Transfer Pricing Analysis Instructions`,
      ``,
      `## Controlled Transactions`,
      transactions,
      ``,
      group_revenue ? `Group revenue: ${group_revenue}` : "",
      ``,
      `## TP Reference`,
      tpRef,
    ]);
  },
};
