import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadSkill, loadReference, loadData } from "../content/loader.js";
import { today, daysUntil } from "../tools/date-utils.js";
import { logger } from "../logger.js";

export async function registerPrompts(server: McpServer): Promise<void> {
  server.prompt(
    "tax-computation",
    "Full Malaysian tax computation workflow — guides through discovery, entity classification, and computation with all preflight gates enforced.",
    {
      entity_type: z.string().optional().describe("Entity type (sdn-bhd, plt, partnership, sole-proprietor, etc.)"),
      year_of_assessment: z.string().optional().describe("Year of Assessment (e.g. 2025)"),
    },
    async ({ entity_type, year_of_assessment }) => {
      const [skill, rates] = await Promise.all([loadSkill(), loadData("rates.json")]);

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `You are a Malaysian tax computation specialist. Follow these instructions exactly:`,
                ``,
                skill,
                ``,
                `## Tax Rates`,
                "```json",
                JSON.stringify(rates, null, 2),
                "```",
                ``,
                `## Task`,
                `Perform a full tax computation.`,
                entity_type ? `Entity type: ${entity_type}` : "Determine entity type through discovery interview.",
                year_of_assessment ? `Year of Assessment: ${year_of_assessment}` : "Determine YA through discovery.",
                ``,
                `Begin with the discovery interview if any preflight gate cannot pass. Do not produce a computation until all gates pass.`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "tax-audit",
    "Audit an existing tax computation with the 5-dimension health score (/20) and severity-tagged findings.",
    {
      computation: z.string().describe("The tax computation to audit"),
    },
    async ({ computation }) => {
      const [auditRef, rates] = await Promise.all([loadReference("audit.md"), loadData("rates.json")]);

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `You are a Malaysian tax audit specialist. Review the following computation using the audit framework below.`,
                ``,
                `## Computation to Audit`,
                "```",
                computation,
                "```",
                ``,
                `## Audit Framework`,
                auditRef,
                ``,
                `## Rates for Verification`,
                "```json",
                JSON.stringify(rates, null, 2),
                "```",
                ``,
                `Produce the full audit report: health score table, executive summary, detailed findings by severity, systemic issues, and positive findings.`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "year-end-planning",
    "Pre-FYE tactical planning — identify all available levers to reduce tax before books close.",
    {
      financial_year_end: z.string().describe("FYE date (YYYY-MM-DD)"),
      projected_profit: z.string().optional().describe("Projected net profit before tax"),
    },
    async ({ financial_year_end, projected_profit }) => {
      const yearEndRef = await loadReference("year-end.md");

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `You are a Malaysian tax planning specialist. Help me with year-end tax planning.`,
                ``,
                `## Context`,
                `- Financial Year End: ${financial_year_end}`,
                `- Today: ${today()}`,
                `- Days remaining: ${daysUntil(financial_year_end)}`,
                projected_profit ? `- Projected net profit: ${projected_profit}` : "",
                ``,
                `## Year-End Planning Reference`,
                yearEndRef,
                ``,
                `Identify all available pre-FYE actions, quantify each lever's tax saving, and produce a prioritised action table with deadlines.`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "new-client-takeover",
    "New client onboarding from prior agent — verify carry-forwards and identify errors.",
    {},
    async () => {
      const takeoverRef = await loadReference("takeover.md");

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `You are a Malaysian tax practitioner taking over a new client from a prior agent.`,
                `Follow this takeover procedure:`,
                ``,
                takeoverRef,
                ``,
                `Begin by asking me for the prior agent's computations, CA schedules, and loss memorandum. Then verify every carry-forward position.`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "dispute-analysis",
    "Analyse an LHDN additional assessment and recommend fight vs settle vs concede for each issue.",
    {
      assessment_details: z.string().describe("LHDN Form JA or query letter content"),
    },
    async ({ assessment_details }) => {
      const disputeRef = await loadReference("dispute.md");

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `You are a Malaysian tax dispute specialist. Analyse the following LHDN action:`,
                ``,
                `## LHDN Correspondence`,
                "```",
                assessment_details,
                "```",
                ``,
                `## Dispute Resolution Framework`,
                disputeRef,
                ``,
                `For each issue raised by LHDN: assess our position strength, quantify exposure, cite relevant authority, and recommend fight/settle/concede.`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  logger.info("prompts_registered", { count: 5 });
}
