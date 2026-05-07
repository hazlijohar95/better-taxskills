import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const dispute: ToolDefinition = {
  name: "dispute",
  description:
    "Analyse LHDN additional assessment, query letter, or audit findings. Assess strength of each position, quantify exposure, and recommend fight vs settle vs concede.",
  schema: {
    lhdn_correspondence: z.string().min(1).describe("LHDN query letter, Form JA, or audit findings"),
    our_position: z.string().optional().describe("Our current position or response (if drafted)"),
  },
  handler: async (args) => {
    const { lhdn_correspondence, our_position } = args as {
      lhdn_correspondence: string; our_position?: string;
    };

    const disputeRef = await loadReference("dispute.md");

    return text([
      `# Dispute Resolution Instructions`,
      ``,
      `## LHDN Correspondence`,
      "```",
      lhdn_correspondence,
      "```",
      ``,
      our_position ? `## Our Position\n${our_position}` : "",
      ``,
      `## Dispute Reference`,
      disputeRef,
    ]);
  },
};
