import { z } from "zod";
import { ToolDefinition, text } from "./types.js";
import { loadReference } from "../content/loader.js";
import { today } from "./date-utils.js";

export const calendar: ToolDefinition = {
  name: "calendar",
  description:
    "Show compliance deadlines relative to today for a given entity. Includes filing dates, CP204 revision windows, WHT due dates, and penalty thresholds.",
  schema: {
    financial_year_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Entity's financial year end (YYYY-MM-DD)"),
    entity_type: z.enum(["company", "individual-employed", "individual-business", "partnership"]).describe("Entity type (determines filing deadlines)"),
  },
  handler: async (args) => {
    const { financial_year_end, entity_type } = args as {
      financial_year_end: string; entity_type: string;
    };

    const calendarRef = await loadReference("calendar.md");

    return text([
      `# Compliance Calendar Instructions`,
      ``,
      `## Parameters`,
      `- Financial Year End: ${financial_year_end}`,
      `- Entity type: ${entity_type}`,
      `- Today's date: ${today()}`,
      ``,
      `## Calendar Reference`,
      calendarRef,
    ]);
  },
};
