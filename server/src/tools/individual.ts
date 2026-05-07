import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference, loadData } from "../content/loader.js";

export const individual: ToolDefinition = {
  name: "individual",
  description:
    "Individual tax computation covering employment income (s.13), benefits-in-kind, residence determination (s.7), personal reliefs, PCB reconciliation, and dividend tax.",
  schema: {
    individual_details: z.string().min(1).describe("Employment details, Form EA data, BIK, other income sources, relief claims"),
    year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Year of Assessment"),
    residence_status: z.enum(["resident", "non-resident", "unknown"]).optional().describe("Tax residence status (will verify if unknown)"),
  },
  handler: async (args) => {
    const { individual_details, year_of_assessment, residence_status } = args as {
      individual_details: string; year_of_assessment: string; residence_status?: string;
    };

    const [individualRef, reliefs, rates] = await Promise.all([
      loadReference("individual.md"),
      loadData("reliefs.json"),
      loadData("rates.json"),
    ]);

    return text([
      `# Individual Tax Computation Instructions`,
      ``,
      `## Individual Details`,
      individual_details,
      ``,
      `## Parameters`,
      `- YA: ${year_of_assessment}`,
      `- Residence: ${residence_status || "unknown — must determine via s.7 day count"}`,
      ``,
      `## Individual Tax Reference`,
      individualRef,
      ``,
      `## Personal Reliefs`,
      "```json",
      JSON.stringify(reliefs, null, 2),
      "```",
      ``,
      `## Tax Rates`,
      "```json",
      JSON.stringify(rates, null, 2),
      "```",
    ]);
  },
};
