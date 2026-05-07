import { z } from "zod";
import { ToolDefinition, text } from "./types.js";

export const cp204: ToolDefinition = {
  name: "cp204",
  description:
    "Compute CP204 underestimation penalty. Determines if the 30% safe harbour is breached and calculates the 10% penalty on the excess.",
  schema: {
    actual_tax: z.number().min(0).describe("Actual tax payable from computation (RM)"),
    estimated_tax: z.number().min(0).describe("CP204 estimate (original or last revision) (RM)"),
  },
  handler: async (args) => {
    const { actual_tax, estimated_tax } = args as {
      actual_tax: number; estimated_tax: number;
    };

    const shortfall = actual_tax - estimated_tax;
    const threshold = actual_tax * 0.3;
    const penaltyApplies = shortfall > threshold;
    const penalty = penaltyApplies ? (shortfall - threshold) * 0.1 : 0;

    return text([
      `# CP204 Underestimation Analysis`,
      ``,
      `| Item | Amount (RM) |`,
      `|------|-------------|`,
      `| Actual tax payable | ${actual_tax.toLocaleString()} |`,
      `| CP204 estimate | ${estimated_tax.toLocaleString()} |`,
      `| Shortfall | ${shortfall.toLocaleString()} |`,
      `| 30% threshold | ${threshold.toLocaleString()} |`,
      `| Penalty applies? | ${penaltyApplies ? "YES" : "No"} |`,
      penaltyApplies
        ? `| **Penalty (10% of excess)** | **${penalty.toLocaleString()}** |`
        : `| Penalty | NIL |`,
      ``,
      penaltyApplies
        ? `⚠ Underestimation penalty of RM${penalty.toLocaleString()} applies. Consider revising CP204 for next year (recommend estimate of RM${Math.ceil(actual_tax * 1.1).toLocaleString()}).`
        : `✓ Within 30% safe harbour. No penalty.`,
      ``,
      `## Revision Windows`,
      `- 6th month: can increase OR decrease`,
      `- 9th month: can increase ONLY`,
      ``,
      `## Exemptions`,
      `- New company (paid-up ≤ RM2.5m): exempt first 2 YAs`,
      `- Short basis period < 6 months: CP204 not required`,
    ]);
  },
};
