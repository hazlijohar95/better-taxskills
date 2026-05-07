import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const takeover: ToolDefinition = {
  name: "takeover",
  description:
    "New client onboarding from a prior tax agent. Verify carry-forward positions, identify errors in prior computations, quantify exposure and refund opportunities.",
  schema: {
    prior_computations: z.string().min(1).describe("Prior agent's computations, CA schedules, loss memorandum"),
    years_covered: z.string().optional().describe("Year range covered (e.g. YA 2022-2024)"),
  },
  handler: async (args) => {
    const { prior_computations, years_covered } = args as {
      prior_computations: string; years_covered?: string;
    };

    const [takeoverRef, auditRef] = await Promise.all([
      loadReference("takeover.md"),
      loadReference("audit.md"),
    ]);

    return text([
      `# Takeover Review Instructions`,
      ``,
      `## Prior Agent's Work`,
      "```",
      prior_computations,
      "```",
      ``,
      years_covered ? `Years covered: ${years_covered}` : "",
      ``,
      `## Takeover Procedure`,
      takeoverRef,
      ``,
      `## Audit Criteria (for error identification)`,
      auditRef,
    ]);
  },
};
