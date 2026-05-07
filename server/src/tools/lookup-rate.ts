import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadData } from "../content/loader.js";

export const lookupRate: ToolDefinition = {
  name: "lookup_rate",
  description:
    "Look up specific tax rates, CA rates, personal reliefs, or WHT/DTA rates from the structured data files.",
  schema: {
    category: z.enum(["tax-rates", "ca-rates", "reliefs", "wht-dta"]).describe("Which rate table to look up"),
    query: z.string().optional().describe("Specific item to look up (e.g. 'SME rates', 'motor vehicle', 'Singapore')"),
  },
  handler: async (args) => {
    const { category, query } = args as { category: string; query?: string };

    const fileMap: Record<string, string> = {
      "tax-rates": "rates.json",
      "ca-rates": "ca-rates.json",
      reliefs: "reliefs.json",
      "wht-dta": "wht-dta.json",
    };

    const data = await loadData(fileMap[category]);

    return text([
      `# Rate Lookup: ${category}`,
      query ? `Query: ${query}` : "",
      ``,
      "```json",
      JSON.stringify(data, null, 2),
      "```",
    ]);
  },
};
