import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const incentive: ToolDefinition = {
  name: "incentive",
  description:
    "Check available tax incentives (PS, ITA, RA, ACA, GITA, JS-SEZ) and quantify eligibility and tax savings against a no-incentive baseline.",
  schema: {
    entity_details: z.string().min(1).describe("Entity details, activities, sector, and current incentive status"),
    year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Year of Assessment"),
  },
  handler: async (args) => {
    const { entity_details, year_of_assessment } = args as {
      entity_details: string; year_of_assessment: string;
    };

    const incentiveRef = await loadReference("incentives.md");

    return text([
      `# Incentive Eligibility Review Instructions`,
      ``,
      `## Entity Details`,
      entity_details,
      ``,
      `## YA: ${year_of_assessment}`,
      ``,
      `## Incentives Reference`,
      incentiveRef,
    ]);
  },
};
