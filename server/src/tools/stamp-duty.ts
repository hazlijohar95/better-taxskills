import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";

export const stampDuty: ToolDefinition = {
  name: "stamp_duty",
  description:
    "Stamp duty computation under Stamp Act 1949 for property transfers, share transfers, loan agreements, leases, and group restructuring (s.15A relief).",
  schema: {
    instrument_details: z.string().min(1).describe("Instrument type, parties, consideration/value, transaction details"),
    instrument_type: z.enum(["property-transfer", "share-transfer", "loan", "lease", "group-restructuring"]).describe("Type of instrument"),
  },
  handler: async (args) => {
    const { instrument_details, instrument_type } = args as {
      instrument_details: string; instrument_type: string;
    };

    const stampRef = await loadReference("stamp-duty.md");

    return text([
      `# Stamp Duty Computation Instructions`,
      ``,
      `## Instrument Details`,
      instrument_details,
      ``,
      `## Instrument Type: ${instrument_type}`,
      ``,
      `## Stamp Duty Reference`,
      stampRef,
    ]);
  },
};
