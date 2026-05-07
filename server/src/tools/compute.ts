import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference, loadData } from "../content/loader.js";

const ENTITY_REF_MAP: Record<string, string> = {
  "sdn-bhd": "corporate.md",
  berhad: "corporate.md",
  plt: "partnership.md",
  partnership: "partnership.md",
  "sole-proprietor": "sole-prop.md",
  club: "ngo.md",
  "trade-association": "ngo.md",
  cooperative: "ngo.md",
  ngo: "ngo.md",
};

export const compute: ToolDefinition = {
  name: "compute",
  description:
    "Full Malaysian tax computation for any entity type (Sdn Bhd, PLT, Partnership, Sole Proprietor, NGO, Cooperative). Requires financial data. Returns complete working paper with statutory citations.",
  schema: {
    entity_type: z
      .enum(["sdn-bhd", "berhad", "plt", "partnership", "sole-proprietor", "club", "trade-association", "cooperative", "ngo"])
      .describe("Entity type for tax computation"),
    year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Year of Assessment (e.g. 2025)"),
    financial_data: z.string().min(1).describe("Trial balance, P&L, or financial statements as text. Must contain actual figures."),
    basis_period_start: z.string().optional().describe("Start of basis period (YYYY-MM-DD)"),
    basis_period_end: z.string().optional().describe("End of basis period (YYYY-MM-DD)"),
  },
  handler: async (args) => {
    const { entity_type, year_of_assessment, financial_data, basis_period_start, basis_period_end } = args as {
      entity_type: string; year_of_assessment: string; financial_data: string;
      basis_period_start?: string; basis_period_end?: string;
    };

    const [entityRef, caRef, deductionsRef, rates, caRates] = await Promise.all([
      loadReference(ENTITY_REF_MAP[entity_type]),
      loadReference("capital-allowances.md"),
      loadReference("deductions.md"),
      loadData("rates.json"),
      loadData("ca-rates.json"),
    ]);

    const basisPeriod = basis_period_start && basis_period_end
      ? `${basis_period_start} to ${basis_period_end}`
      : "Not specified — determine from financial statements";

    return text([
      `# Tax Computation Instructions`,
      ``,
      `## Context`,
      `- Entity type: ${entity_type}`,
      `- Year of Assessment: ${year_of_assessment}`,
      `- Basis period: ${basisPeriod}`,
      ``,
      `## Financial Data Provided`,
      "```",
      financial_data,
      "```",
      ``,
      `## Computation Procedure`,
      `Follow the compute procedure in SKILL.md exactly. All preflight gates must pass.`,
      ``,
      `## Entity-Specific Rules`,
      entityRef,
      ``,
      `## Capital Allowances`,
      caRef,
      ``,
      `## Deductions Reference`,
      deductionsRef,
      ``,
      `## Tax Rates (YA ${year_of_assessment})`,
      "```json",
      JSON.stringify(rates, null, 2),
      "```",
      ``,
      `## CA Rates`,
      "```json",
      JSON.stringify(caRates, null, 2),
      "```",
    ]);
  },
};
