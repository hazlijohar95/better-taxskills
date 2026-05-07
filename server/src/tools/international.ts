import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference, loadData } from "../content/loader.js";

export const international: ToolDefinition = {
  name: "international",
  description:
    "Cross-border tax analysis: WHT on outbound payments, Foreign Tax Credit, Foreign Source Income exemption, Labuan structures, and PE determination.",
  schema: {
    transactions: z.string().min(1).describe("Cross-border transactions or structure details"),
  },
  handler: async (args) => {
    const { transactions } = args as { transactions: string };

    const [intlRef, whtDta] = await Promise.all([
      loadReference("international.md"),
      loadData("wht-dta.json"),
    ]);

    return text([
      `# International Tax Analysis Instructions`,
      ``,
      `## Transactions / Structure`,
      transactions,
      ``,
      `## International Tax Reference`,
      intlRef,
      ``,
      `## WHT & DTA Rates`,
      "```json",
      JSON.stringify(whtDta, null, 2),
      "```",
    ]);
  },
};
