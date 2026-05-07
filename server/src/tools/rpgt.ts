import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const rpgt: ToolDefinition = {
  name: "rpgt",
  description:
    "Real Property Gains Tax computation under RPGTA 1976. Handles all entity types, holding periods, RPC shares, exemptions, and the income tax vs RPGT boundary.",
  schema: {
    disposal_details: z.string().min(1).describe("Property details: acquisition date, disposal date, prices, enhancement costs, disposer type"),
    disposer_type: z.enum(["citizen", "pr", "non-citizen", "company-my", "company-foreign"]).describe("Type of disposer (affects rates)"),
  },
  handler: async (args) => {
    const { disposal_details, disposer_type } = args as {
      disposal_details: string; disposer_type: string;
    };

    const rpgtRef = await loadReference("rpgt.md");

    return text([
      `# RPGT Computation Instructions`,
      ``,
      `## Disposal Details`,
      disposal_details,
      ``,
      `## Disposer Type: ${disposer_type}`,
      ``,
      `## RPGT Reference`,
      rpgtRef,
    ]);
  },
};
