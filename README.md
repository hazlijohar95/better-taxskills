# Malaysian Tax

The precision your practice demands. 1 skill, 18 commands, and 20 traps that catch practitioners before LHDN does.

> **Quick start:** Copy `dist/claude-code/.claude/` into your project, or install for any supported AI tool below.

## Why This Exists

No AI tool understands Malaysian taxation natively. Ask any model to compute corporate tax for a Sdn Bhd and you get:

- Wrong rates (2019 bands on a 2026 computation)
- Missing add-backs (depreciation left in, entertainment at 100%)
- No capital allowance schedule (just "less: CA")
- Fabricated figures ("estimated profit of RM500,000")
- No statutory citations (just "disallowed" with no section)

This skill fixes that. It encodes the Income Tax Act 1967, Budget 2026, 76 DTAs, and the exact workflow a tax practitioner follows — then enforces it through preflight gates that prevent the AI from producing anything until source documents are loaded and verified.

## What's Inside

### The Skill: malaysian-tax

A complete tax computation system with 23 domain references and structured data:

```
skill/
├── SKILL.md                          ← Entry point: gates, routing, procedures
├── reference/                        ← Domain knowledge (loaded per command)
│   ├── corporate.md                     Sdn Bhd / Berhad
│   ├── partnership.md                   Partnership & PLT
│   ├── sole-prop.md                     Sole proprietor (Form B)
│   ├── ngo.md                           NGO / Club / Cooperative
│   ├── capital-allowances.md            Schedule 3 — complete
│   ├── deductions.md                    Section 33/39 — full classification
│   ├── incentives.md                    PS/ITA/RA/ACA/GITA/JS-SEZ
│   ├── withholding-tax.md               WHT rates and compliance
│   ├── transfer-pricing.md              Section 140A + earnings stripping
│   ├── international.md                 FSI/FTC/DTA/Labuan/PE
│   ├── group.md                         Group relief/IHC/controlled transfers
│   ├── compliance.md                    Edge cases/audit/penalties
│   ├── audit.md                         Error detection + health scoring
│   ├── tax-strategy.md                  Optimisation by stage (loss→super-profit)
│   ├── rpgt.md                          Real Property Gains Tax (RPGTA 1976)
│   ├── individual.md                    Individual tax: BIK, residence, reliefs, PCB
│   ├── compare.md                       Year-on-year variance with LHDN risk flags
│   ├── dispute.md                       LHDN queries, audits, appeals, settlements
│   ├── checklist.md                     Documentation evidence per deduction claimed
│   ├── calendar.md                      Compliance deadlines relative to today
│   ├── stamp-duty.md                    Stamp Act 1949: transfers, loans, leases
│   ├── year-end.md                      Pre-FYE tactical planning (1-3 months)
│   ├── takeover.md                      New client onboarding from prior agent
│   └── workflow.md                      Practitioner 9-phase workflow
└── data/                             ← Structured (machine-readable)
    ├── rates.json                       Corporate, individual, cooperative rates
    ├── ca-rates.json                    Capital allowance rates by asset type
    ├── reliefs.json                     24 personal reliefs with sub-limits
    ├── wht-dta.json                     WHT + DTA rates (25 treaty partners)
    └── command-metadata.json            Sub-command definitions
```

### 18 Commands

All accessed through `/malaysian-tax`:

| Command | What it does |
|---------|-------------|
| `/malaysian-tax compute` | Full tax computation — any entity type, from source documents to tax payable |
| `/malaysian-tax audit` | Review computation for errors with health score (5 dimensions, /20) |
| `/malaysian-tax transfer-pricing` | TP analysis: arm's length, earnings stripping, documentation |
| `/malaysian-tax international` | Cross-border: WHT, FTC, FSI, Labuan, PE determination |
| `/malaysian-tax group` | Group structure: IHC, relief, controlled transfers, continuity |
| `/malaysian-tax incentive` | Available incentives, eligibility, tax savings quantified |
| `/malaysian-tax strategy` | Tax optimisation by company stage — quantified savings, anti-avoidance bounded |
| `/malaysian-tax compare` | Year-on-year variance analysis with LHDN risk flags |
| `/malaysian-tax rpgt` | Real property gains tax computation (RPGTA 1976) |
| `/malaysian-tax individual` | Individual tax: employment income, BIK, residence, reliefs |
| `/malaysian-tax checklist` | Documentation evidence required per deduction claimed |
| `/malaysian-tax calendar` | Compliance deadlines and penalty windows relative to today |
| `/malaysian-tax year-end` | Pre-FYE tactical actions (1-3 months before close) |
| `/malaysian-tax takeover` | New client onboarding — verify prior agent, correct carry-forwards |
| `/malaysian-tax dispute` | LHDN query/audit/appeal — fight vs settle analysis |
| `/malaysian-tax stamp-duty` | Stamp duty on property, shares, loans, leases, group relief |
| `/malaysian-tax cp204` | Underestimation penalty computation |
| `/malaysian-tax shape` | Discovery interview for complex scenarios |

#### Usage

```
/malaysian-tax compute                    # Starts discovery interview for entity details
/malaysian-tax audit                      # Reviews computation in context
/malaysian-tax transfer-pricing           # Analyzes related-party transactions
/malaysian-tax international              # WHT/FTC on cross-border payments
/malaysian-tax group                      # Reviews group structure
/malaysian-tax strategy                   # Optimisation strategies by profit stage
/malaysian-tax compare                    # Year-on-year variance with risk flags
/malaysian-tax rpgt                       # Real property gains tax
/malaysian-tax individual                 # Individual tax computation
/malaysian-tax checklist                  # Documentation requirements for filing
/malaysian-tax calendar                   # Deadline alerts relative to today
/malaysian-tax year-end                   # Pre-FYE tactical planning
/malaysian-tax takeover                   # New client from prior agent
/malaysian-tax dispute                    # LHDN audit/appeal handling
/malaysian-tax stamp-duty                 # Stamp duty computation
/malaysian-tax incentive                  # Checks what's available
```

Or invoke directly with data:

```
/malaysian-tax compute [paste trial balance or financial data]
```

### Entity Types Covered

| Entity | Form | Rate | Reference |
|--------|------|------|-----------|
| Sdn Bhd (Private Limited) | C | 15%/17%/24% SME or 24% flat | `corporate.md` |
| Berhad (Public Company) | C | 24% flat | `corporate.md` |
| PLT (LLP) | P-equivalent | Tax transparent + 2% distribution tax | `partnership.md` |
| Partnership | P | Tax transparent | `partnership.md` |
| Sole Proprietor | B | Progressive 0%–30% | `sole-prop.md` |
| Club / Association | TF | Individual scale rates | `ngo.md` |
| Trade Association | TF | Individual rates or 28% flat | `ngo.md` |
| Cooperative | C1 | Cooperative rates 0%–24% | `ngo.md` |
| NGO (s.44(6) approved) | TF | Exempt | `ngo.md` |

### Preflight Gates

The skill will NOT produce a computation until:

| Gate | What it checks |
|------|----------------|
| Context | Entity type, YA, basis period known |
| Source | Actual financial data provided and read |
| Rate | SME status verified or flat rate confirmed |
| Command | Matching reference loaded |
| Compute | Every line item individually identified |
| Mutation | All gates pass |

This prevents fabrication. No "estimated" figures. No "typical" amounts.

### Audit Health Score

Every computation ends with a quality assessment:

```
┌─────────────────────────────────────────────────────────────┐
│ AUDIT HEALTH SCORE                                          │
├───┬──────────────┬───────┬──────────────────────────────────┤
│ # │ Dimension    │ Score │ Key Finding                      │
├───┼──────────────┼───────┼──────────────────────────────────┤
│ 1 │ Compliance   │  4/4  │ —                                │
│ 2 │ Accuracy     │  4/4  │ —                                │
│ 3 │ Completeness │  3/4  │ HP asset CA needs verification   │
│ 4 │ Optimisation │  3/4  │ Budget 2026 ACA not applied      │
│ 5 │ Risk         │  4/4  │ —                                │
├───┼──────────────┼───────┼──────────────────────────────────┤
│   │ TOTAL        │ 18/20 │ File with confidence             │
└───┴──────────────┴───────┴──────────────────────────────────┘
```

### Absolute Bans

The skill refuses to produce these patterns:

| Ban | Why |
|-----|-----|
| Hardcoded rates without YA | Rates change. A 2024 rate in a 2026 computation is wrong. |
| "Sundry" add-backs | LHDN requires individual identification. Grouped items hide errors. |
| Estimated capital allowances | Every asset must be individually scheduled with QE, IA, AA. |
| Missing loss memorandum | B/F losses expire. No year-of-origin tracking = penalty risk. |
| Unverified SME status | One failed condition out of five = flat 24%. Must check all. |
| WHT ignored | Non-resident payments without WHT analysis = non-deductible [s.39(2)]. |
| Section-less judgments | "Disallowed" without citing s.39(1)(x) is not a tax computation. |

---

## Coverage

### Legislation (YA 2025/2026)

- Income Tax Act 1967 — all relevant sections
- Finance Act 2024/2025 (giving effect to Budget 2026)
- Promotion of Investments Act 1986
- Labuan Business Activity Tax Act 1990
- Stamp Act 1949 (Section 15A group relief)
- 76+ Double Taxation Agreements

### Budget 2026 (tabled 10 October 2025)

| Change | Detail |
|--------|--------|
| ACA local machinery + ICT | 20% IA / 40% AA (11 Oct 2025 – 31 Dec 2026) |
| e-Invoice ACA | Gazetted April 2026 |
| 2% dividend tax | Individual dividends > RM100k (from YA 2025) |
| 2% PLT distribution tax | Individual distributions > RM100k (from YA 2026) |
| FSI exemption extended | To 31 Dec 2030 (expanded to cooperatives/trusts) |
| Automation CA | Confirmed RM10m / 200% / YA 2023–2027 |
| JS-SEZ | Full framework, 9 flagship areas |
| GITA MyHIJAU | 100% for certified green products |

### Source Authority

- Income Tax Act 1967 statutory text
- LHDN Public Rulings (up to PR 7/2024)
- LHDN Ketetapan Umum (KU series)
- P.U.(A) subsidiary legislation / gazette orders
- PwC Worldwide Tax Summaries (reviewed Dec 2025)
- KPMG / EY Budget 2026 analysis (October 2025)

---

## Installation

### MCP Server (recommended — works with any MCP client)

```bash
cd server && npm install && npm run build

# Then add to your MCP client config:
```

**Claude Code** (`~/.claude.json`):
```json
{
  "mcpServers": {
    "malaysian-tax": {
      "command": "node",
      "args": ["/path/to/tax-agent/server/dist/index.js"]
    }
  }
}
```

**Cursor** (MCP settings):
```json
{
  "malaysian-tax": {
    "command": "node",
    "args": ["/path/to/tax-agent/server/dist/index.js"]
  }
}
```

**Any MCP-compatible client**: Point to the server binary via stdio transport.

The MCP server exposes:
- **19 tools** for tax computation, audit, strategy, RPGT, stamp duty, and more
- **30 resources** providing read-only access to all domain references and structured data
- **5 prompts** for common workflows (computation, audit, year-end planning, takeover, dispute)

---

### Skill Files (alternative — copy-paste installation)

### Claude Code

```bash
# Project-specific
cp -r dist/claude-code/.claude your-project/

# Or global (all projects)
cp -r dist/claude-code/.claude/* ~/.claude/
```

### Cursor

```bash
cp -r dist/cursor/.cursor your-project/
```

### Windsurf

```bash
cp -r dist/windsurf/.windsurf your-project/
```

### Gemini CLI

```bash
cp -r dist/gemini/.gemini your-project/
```

### OpenAI Codex

```bash
cp -r dist/codex/.codex your-project/
```

---

## Build

```bash
npm run build            # All providers
npm run build:claude     # Claude Code only
npm run build:cursor     # Cursor only
npm run clean            # Remove dist/
```

The build system validates all references and data files exist before producing output. It transforms the single source into provider-specific bundles with correct directory conventions.

---

## How It Works

```
User provides financial data
        │
        ▼
┌─────────────────────┐
│   PREFLIGHT GATES   │  ← Entity type? YA? Source documents? Rate verified?
│   All must pass.    │
└────────┬────────────┘
         │ pass
         ▼
┌─────────────────────┐
│   COMMAND ROUTER    │  ← compute? audit? transfer-pricing? international?
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   LOAD REFERENCES   │  ← Only the relevant domain files (not all 14)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   EXECUTE COMMAND   │  ← Full computation with statutory citations
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   VALIDATION        │  ← Ties check, caps check, cross-checks
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   AUDIT SCORE       │  ← 5 dimensions, /20, severity-tagged findings
└─────────────────────┘
```

---

## Supported Tools

| Tool | Config Directory | Status |
|------|-----------------|--------|
| [Claude Code](https://claude.ai/code) | `.claude/skills/` | Fully supported |
| [Cursor](https://cursor.com) | `.cursor/skills/` | Fully supported |
| [Windsurf](https://windsurf.ai) | `.windsurf/skills/` | Fully supported |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `.gemini/skills/` | Fully supported |
| [OpenAI Codex](https://github.com/openai/codex) | `.codex/skills/` | Fully supported |

---

## License

MIT
