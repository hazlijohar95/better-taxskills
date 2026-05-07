import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadReference, loadData, loadSkill } from "./skill-loader.js";

export function registerTools(server: McpServer): void {
  server.tool(
    "compute",
    "Full Malaysian tax computation for any entity type (Sdn Bhd, PLT, Partnership, Sole Proprietor, NGO, Cooperative). Requires financial data. Returns complete working paper with statutory citations.",
    {
      entity_type: z
        .enum([
          "sdn-bhd",
          "berhad",
          "plt",
          "partnership",
          "sole-proprietor",
          "club",
          "trade-association",
          "cooperative",
          "ngo",
        ])
        .describe("Entity type for tax computation"),
      year_of_assessment: z
        .string()
        .regex(/^20\d{2}$/)
        .describe("Year of Assessment (e.g. 2025)"),
      financial_data: z
        .string()
        .min(1)
        .describe(
          "Trial balance, P&L, or financial statements as text. Must contain actual figures."
        ),
      basis_period_start: z
        .string()
        .optional()
        .describe("Start of basis period (YYYY-MM-DD)"),
      basis_period_end: z
        .string()
        .optional()
        .describe("End of basis period (YYYY-MM-DD)"),
    },
    async ({ entity_type, year_of_assessment, financial_data, basis_period_start, basis_period_end }) => {
      const refMap: Record<string, string> = {
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

      const entityRef = loadReference(refMap[entity_type]);
      const caRef = loadReference("capital-allowances.md");
      const deductionsRef = loadReference("deductions.md");
      const rates = loadData("rates.json");
      const caRates = loadData("ca-rates.json");
      const skill = loadSkill();

      const basisPeriod =
        basis_period_start && basis_period_end
          ? `${basis_period_start} to ${basis_period_end}`
          : "Not specified — determine from financial statements";

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Tax Computation Instructions`,
              ``,
              `## Context`,
              `- Entity type: ${entity_type}`,
              `- Year of Assessment: ${year_of_assessment}`,
              `- Basis period: ${basisPeriod}`,
              ``,
              `## Financial Data Provided`,
              `\`\`\``,
              financial_data,
              `\`\`\``,
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
              `\`\`\`json`,
              JSON.stringify(rates, null, 2),
              `\`\`\``,
              ``,
              `## CA Rates`,
              `\`\`\`json`,
              JSON.stringify(caRates, null, 2),
              `\`\`\``,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "audit",
    "Review an existing tax computation for errors, overpayments, and LHDN risk flags. Produces a health score (/20) across 5 dimensions with severity-tagged findings (P0-P3).",
    {
      computation: z
        .string()
        .min(1)
        .describe("The tax computation to audit (full text)"),
      entity_type: z
        .string()
        .optional()
        .describe("Entity type if known"),
      year_of_assessment: z
        .string()
        .optional()
        .describe("Year of Assessment if known"),
    },
    async ({ computation, entity_type, year_of_assessment }) => {
      const auditRef = loadReference("audit.md");
      const rates = loadData("rates.json");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Audit Instructions`,
              ``,
              `## Computation to Review`,
              `\`\`\``,
              computation,
              `\`\`\``,
              ``,
              entity_type ? `Entity type: ${entity_type}` : "",
              year_of_assessment ? `YA: ${year_of_assessment}` : "",
              ``,
              `## Audit Procedure`,
              auditRef,
              ``,
              `## Rates for Verification`,
              `\`\`\`json`,
              JSON.stringify(rates, null, 2),
              `\`\`\``,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "strategy",
    "Tax optimisation recommendations by company stage (loss-making, breakeven, profitable, super-profitable). Quantified savings bounded by anti-avoidance law.",
    {
      financial_position: z
        .string()
        .min(1)
        .describe(
          "Current financial position: adjusted income/loss, unabsorbed losses, CA b/f, projected profitability"
        ),
      entity_type: z
        .enum(["sdn-bhd", "berhad", "plt", "partnership", "sole-proprietor"])
        .describe("Entity type"),
      year_of_assessment: z
        .string()
        .regex(/^20\d{2}$/)
        .describe("Current YA"),
      risk_appetite: z
        .enum(["legitimate-only", "some-grey-area", "aggressive"])
        .optional()
        .describe("Client's risk tolerance for tax planning"),
    },
    async ({ financial_position, entity_type, year_of_assessment, risk_appetite }) => {
      const strategyRef = loadReference("tax-strategy.md");
      const incentivesRef = loadReference("incentives.md");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Strategy Analysis Instructions`,
              ``,
              `## Current Position`,
              financial_position,
              ``,
              `## Parameters`,
              `- Entity: ${entity_type}`,
              `- YA: ${year_of_assessment}`,
              `- Risk appetite: ${risk_appetite || "legitimate-only (default)"}`,
              ``,
              `## Strategy Reference`,
              strategyRef,
              ``,
              `## Incentives Reference`,
              incentivesRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "compare",
    "Year-on-year variance analysis comparing prior and current year tax computations. Flags items that would trigger LHDN audit scrutiny.",
    {
      prior_year: z.string().min(1).describe("Prior year computation or key figures"),
      current_year: z.string().min(1).describe("Current year computation or key figures"),
      entity_type: z.string().optional().describe("Entity type"),
    },
    async ({ prior_year, current_year, entity_type }) => {
      const compareRef = loadReference("compare.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Year-on-Year Comparison Instructions`,
              ``,
              `## Prior Year`,
              `\`\`\``,
              prior_year,
              `\`\`\``,
              ``,
              `## Current Year`,
              `\`\`\``,
              current_year,
              `\`\`\``,
              ``,
              entity_type ? `Entity type: ${entity_type}` : "",
              ``,
              `## Comparison Procedure`,
              compareRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "rpgt",
    "Real Property Gains Tax computation under RPGTA 1976. Handles all entity types, holding periods, RPC shares, exemptions, and the income tax vs RPGT boundary.",
    {
      disposal_details: z
        .string()
        .min(1)
        .describe(
          "Property details: acquisition date, disposal date, prices, enhancement costs, disposer type"
        ),
      disposer_type: z
        .enum(["citizen", "pr", "non-citizen", "company-my", "company-foreign"])
        .describe("Type of disposer (affects rates)"),
    },
    async ({ disposal_details, disposer_type }) => {
      const rpgtRef = loadReference("rpgt.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# RPGT Computation Instructions`,
              ``,
              `## Disposal Details`,
              disposal_details,
              ``,
              `## Disposer Type: ${disposer_type}`,
              ``,
              `## RPGT Reference`,
              rpgtRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "individual",
    "Individual tax computation covering employment income (s.13), benefits-in-kind, residence determination (s.7), personal reliefs, PCB reconciliation, and dividend tax.",
    {
      individual_details: z
        .string()
        .min(1)
        .describe(
          "Employment details, Form EA data, BIK, other income sources, relief claims"
        ),
      year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Year of Assessment"),
      residence_status: z
        .enum(["resident", "non-resident", "unknown"])
        .optional()
        .describe("Tax residence status (will verify if unknown)"),
    },
    async ({ individual_details, year_of_assessment, residence_status }) => {
      const individualRef = loadReference("individual.md");
      const reliefs = loadData("reliefs.json");
      const rates = loadData("rates.json");

      return {
        content: [
          {
            type: "text" as const,
            text: [
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
              `\`\`\`json`,
              JSON.stringify(reliefs, null, 2),
              `\`\`\``,
              ``,
              `## Tax Rates`,
              `\`\`\`json`,
              JSON.stringify(rates, null, 2),
              `\`\`\``,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "transfer_pricing",
    "Transfer pricing analysis for controlled transactions. Tests arm's length pricing, computes earnings stripping (s.140C), and determines documentation requirements.",
    {
      transactions: z
        .string()
        .min(1)
        .describe("Related-party transactions: counterparty, nature, amount, jurisdiction"),
      group_revenue: z
        .string()
        .optional()
        .describe("Group consolidated revenue (for documentation threshold)"),
    },
    async ({ transactions, group_revenue }) => {
      const tpRef = loadReference("transfer-pricing.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Transfer Pricing Analysis Instructions`,
              ``,
              `## Controlled Transactions`,
              transactions,
              ``,
              group_revenue ? `Group revenue: ${group_revenue}` : "",
              ``,
              `## TP Reference`,
              tpRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "international",
    "Cross-border tax analysis: WHT on outbound payments, Foreign Tax Credit, Foreign Source Income exemption, Labuan structures, and PE determination.",
    {
      transactions: z
        .string()
        .min(1)
        .describe("Cross-border transactions or structure details"),
    },
    async ({ transactions }) => {
      const intlRef = loadReference("international.md");
      const whtDta = loadData("wht-dta.json");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# International Tax Analysis Instructions`,
              ``,
              `## Transactions / Structure`,
              transactions,
              ``,
              `## International Tax Reference`,
              intlRef,
              ``,
              `## WHT & DTA Rates`,
              `\`\`\`json`,
              JSON.stringify(whtDta, null, 2),
              `\`\`\``,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "group",
    "Group structure review: IHC classification (s.60F), group relief (s.44A), controlled transfers (Para 38-40), shareholder continuity, and stamp duty (s.15A).",
    {
      structure: z
        .string()
        .min(1)
        .describe("Group structure: entities, ownership percentages, jurisdictions"),
    },
    async ({ structure }) => {
      const groupRef = loadReference("group.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Group Structure Review Instructions`,
              ``,
              `## Group Structure`,
              structure,
              ``,
              `## Group Tax Reference`,
              groupRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "incentive",
    "Check available tax incentives (PS, ITA, RA, ACA, GITA, JS-SEZ) and quantify eligibility and tax savings against a no-incentive baseline.",
    {
      entity_details: z
        .string()
        .min(1)
        .describe("Entity details, activities, sector, and current incentive status"),
      year_of_assessment: z.string().regex(/^20\d{2}$/).describe("Year of Assessment"),
    },
    async ({ entity_details, year_of_assessment }) => {
      const incentiveRef = loadReference("incentives.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Incentive Eligibility Review Instructions`,
              ``,
              `## Entity Details`,
              entity_details,
              ``,
              `## YA: ${year_of_assessment}`,
              ``,
              `## Incentives Reference`,
              incentiveRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "checklist",
    "Generate a filing-ready documentation checklist from a tax computation. Lists every supporting document required per claim with risk severity if absent.",
    {
      computation: z.string().min(1).describe("The computation to generate checklist for"),
    },
    async ({ computation }) => {
      const checklistRef = loadReference("checklist.md");
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Documentation Checklist Instructions`,
              ``,
              `## Computation`,
              `\`\`\``,
              computation,
              `\`\`\``,
              ``,
              `## Checklist Reference`,
              checklistRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "calendar",
    "Show compliance deadlines relative to today for a given entity. Includes filing dates, CP204 revision windows, WHT due dates, and penalty thresholds.",
    {
      financial_year_end: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .describe("Entity's financial year end (YYYY-MM-DD)"),
      entity_type: z
        .enum(["company", "individual-employed", "individual-business", "partnership"])
        .describe("Entity type (determines filing deadlines)"),
    },
    async ({ financial_year_end, entity_type }) => {
      const calendarRef = loadReference("calendar.md");
      const today = new Date().toISOString().split("T")[0];

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Compliance Calendar Instructions`,
              ``,
              `## Parameters`,
              `- Financial Year End: ${financial_year_end}`,
              `- Entity type: ${entity_type}`,
              `- Today's date: ${today}`,
              ``,
              `## Calendar Reference`,
              calendarRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "year_end",
    "Pre-FYE tactical planning for the final 1-3 months before financial year close. Identifies actionable deductions, capex timing, bonus declarations, and CP204 revision needs.",
    {
      projected_position: z
        .string()
        .min(1)
        .describe("Management accounts or projected year-end position"),
      financial_year_end: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .describe("FYE date (YYYY-MM-DD)"),
      cp204_estimate: z
        .string()
        .optional()
        .describe("Current CP204 estimate amount"),
    },
    async ({ projected_position, financial_year_end, cp204_estimate }) => {
      const yearEndRef = loadReference("year-end.md");
      const today = new Date().toISOString().split("T")[0];

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Year-End Planning Instructions`,
              ``,
              `## Projected Position`,
              projected_position,
              ``,
              `## Parameters`,
              `- FYE: ${financial_year_end}`,
              `- Today: ${today}`,
              `- Days until FYE: ${Math.ceil((new Date(financial_year_end).getTime() - new Date(today).getTime()) / 86400000)}`,
              cp204_estimate ? `- CP204 estimate: ${cp204_estimate}` : "",
              ``,
              `## Year-End Planning Reference`,
              yearEndRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "takeover",
    "New client onboarding from a prior tax agent. Verify carry-forward positions, identify errors in prior computations, quantify exposure and refund opportunities.",
    {
      prior_computations: z
        .string()
        .min(1)
        .describe("Prior agent's computations, CA schedules, loss memorandum"),
      years_covered: z
        .string()
        .optional()
        .describe("Year range covered (e.g. YA 2022-2024)"),
    },
    async ({ prior_computations, years_covered }) => {
      const takeoverRef = loadReference("takeover.md");
      const auditRef = loadReference("audit.md");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Takeover Review Instructions`,
              ``,
              `## Prior Agent's Work`,
              `\`\`\``,
              prior_computations,
              `\`\`\``,
              ``,
              years_covered ? `Years covered: ${years_covered}` : "",
              ``,
              `## Takeover Procedure`,
              takeoverRef,
              ``,
              `## Audit Criteria (for error identification)`,
              auditRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "dispute",
    "Analyse LHDN additional assessment, query letter, or audit findings. Assess strength of each position, quantify exposure, and recommend fight vs settle vs concede.",
    {
      lhdn_correspondence: z
        .string()
        .min(1)
        .describe("LHDN query letter, Form JA, or audit findings"),
      our_position: z
        .string()
        .optional()
        .describe("Our current position or response (if drafted)"),
    },
    async ({ lhdn_correspondence, our_position }) => {
      const disputeRef = loadReference("dispute.md");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Dispute Resolution Instructions`,
              ``,
              `## LHDN Correspondence`,
              `\`\`\``,
              lhdn_correspondence,
              `\`\`\``,
              ``,
              our_position ? `## Our Position\n${our_position}` : "",
              ``,
              `## Dispute Reference`,
              disputeRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "stamp_duty",
    "Stamp duty computation under Stamp Act 1949 for property transfers, share transfers, loan agreements, leases, and group restructuring (s.15A relief).",
    {
      instrument_details: z
        .string()
        .min(1)
        .describe("Instrument type, parties, consideration/value, transaction details"),
      instrument_type: z
        .enum(["property-transfer", "share-transfer", "loan", "lease", "group-restructuring"])
        .describe("Type of instrument"),
    },
    async ({ instrument_details, instrument_type }) => {
      const stampRef = loadReference("stamp-duty.md");

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Stamp Duty Computation Instructions`,
              ``,
              `## Instrument Details`,
              instrument_details,
              ``,
              `## Instrument Type: ${instrument_type}`,
              ``,
              `## Stamp Duty Reference`,
              stampRef,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "cp204",
    "Compute CP204 underestimation penalty. Determines if the 30% safe harbour is breached and calculates the 10% penalty on the excess.",
    {
      actual_tax: z.number().min(0).describe("Actual tax payable from computation (RM)"),
      estimated_tax: z.number().min(0).describe("CP204 estimate (original or last revision) (RM)"),
    },
    async ({ actual_tax, estimated_tax }) => {
      const shortfall = actual_tax - estimated_tax;
      const threshold = actual_tax * 0.3;
      const penaltyApplies = shortfall > threshold;
      const penalty = penaltyApplies ? (shortfall - threshold) * 0.1 : 0;

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# CP204 Underestimation Analysis`,
              ``,
              `| Item | Amount (RM) |`,
              `|------|-------------|`,
              `| Actual tax payable | ${actual_tax.toLocaleString()} |`,
              `| CP204 estimate | ${estimated_tax.toLocaleString()} |`,
              `| Shortfall | ${shortfall.toLocaleString()} |`,
              `| 30% threshold | ${threshold.toLocaleString()} |`,
              `| Penalty applies? | ${penaltyApplies ? "YES" : "No"} |`,
              penaltyApplies
                ? `| **Penalty (10% of excess)** | **${penalty.toLocaleString()}** |`
                : `| Penalty | NIL |`,
              ``,
              penaltyApplies
                ? `⚠ Underestimation penalty of RM${penalty.toLocaleString()} applies. Consider revising CP204 for next year (recommend estimate of RM${Math.ceil(actual_tax * 1.1).toLocaleString()}).`
                : `✓ Within 30% safe harbour. No penalty.`,
              ``,
              `## Revision Windows`,
              `- 6th month: can increase OR decrease`,
              `- 9th month: can increase ONLY`,
              ``,
              `## Exemptions`,
              `- New company (paid-up ≤ RM2.5m): exempt first 2 YAs`,
              `- Short basis period < 6 months: CP204 not required`,
            ].join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "lookup_rate",
    "Look up specific tax rates, CA rates, personal reliefs, or WHT/DTA rates from the structured data files.",
    {
      category: z
        .enum(["tax-rates", "ca-rates", "reliefs", "wht-dta"])
        .describe("Which rate table to look up"),
      query: z
        .string()
        .optional()
        .describe("Specific item to look up (e.g. 'SME rates', 'motor vehicle', 'Singapore')"),
    },
    async ({ category, query }) => {
      const fileMap: Record<string, string> = {
        "tax-rates": "rates.json",
        "ca-rates": "ca-rates.json",
        reliefs: "reliefs.json",
        "wht-dta": "wht-dta.json",
      };
      const data = loadData(fileMap[category]);

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `# Rate Lookup: ${category}`,
              query ? `Query: ${query}` : "",
              ``,
              `\`\`\`json`,
              JSON.stringify(data, null, 2),
              `\`\`\``,
            ].join("\n"),
          },
        ],
      };
    }
  );
}
