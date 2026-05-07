---
name: malaysian-tax
description: "Use when the user wants to compute, audit, review, or plan Malaysian tax for any entity type: Sdn Bhd, PLT, Partnership, Sole Proprietor, NGO, or Cooperative. Covers tax computation, transfer pricing, international taxation, group structures, incentives, and compliance review. Not for non-Malaysian jurisdictions or non-tax advisory work."
argument-hint: "[compute · audit · strategy · transfer-pricing · international · group · incentive · cp204 · shape] [target]"
user-invocable: true
allowed-tools:
  - Read(*)
  - Bash(*)
---

Produces accurate, complete tax computations for Malaysian entities under the Income Tax Act 1967. Real numbers from real source documents, traceable to statutory authority, filed with confidence.

## Setup (non-optional)

Before any computation or file edits, pass these gates. Skipping them produces generic output that ignores the entity's actual position.

| Gate | Required check | If fail |
|---|---|---|
| Context | Entity type, YA, and basis period are known. | Ask. Do not infer from company name alone. |
| Source | Trial balance or financial statements provided and read. | Request documents. Never proceed with "typical" or "estimated" figures. |
| Rate | SME status verified OR flat rate confirmed. Incentives checked. | Load `data/rates.json`, verify against SSM profile and accounts. |
| Command | Matching command reference is loaded. | Load the reference before continuing. |
| Compute | For `compute`: all add-back items individually identified from source. | Do not group items into "sundry" or "various". Every line item is named. |
| Mutation | All active gates pass. | Do not produce a tax computation yet. |

Agents must state this before producing any computation:

```text
TAX_PREFLIGHT: context=pass source=pass rate=pass command_reference=pass compute=pass|not_required mutation=open
```

For `compute`, `source=pass` requires actual financial data in the conversation, not a summary, not "the user mentioned profit of RM X", not prior-conversation memory. If source documents were provided but context was compacted, re-read them.

## Discovery interview

When the user provides incomplete information, run a structured discovery. This is mandatory interaction, not optional guidance.

### Interview cadence

Discovery must include at least one user-answer round unless documents already answer the needed inputs. With sparse input, do NOT synthesize a complete computation for confirmation on the first response.

- Ask 2-3 questions per round, then wait.
- Round 1: entity type, Year of Assessment, basis period, data availability.
- Round 2: income sources, related parties, cross-border transactions, incentives in force.
- Round 3: prior year position (losses, unabsorbed CA), specific items requiring judgment.

Do NOT dump all questions at once. Have a natural dialogue. Each answer may change which questions come next.

### When to skip discovery

- User provides full trial balance + entity details + YA in a single message.
- User says "use same parameters as last computation" (and prior computation is in context).
- User provides an existing computation for `audit` review.

## Entity classification

```
INPUT: Entity name, SSM registration, financial statements

DECISION TREE:
├── Companies Act 2016?
│   ├── Private limited (Sdn Bhd) → compute [corporate]
│   ├── Limited by guarantee → compute [ngo]
│   └── Public (Berhad) → compute [corporate] (no SME rate)
├── LLP Act 2012 (PLT)?
│   └── → compute [partnership] (+ 2% distribution tax check YA 2026+)
├── Registration of Businesses Act 1956?
│   ├── Partnership (2+ owners) → compute [partnership]
│   └── Sole proprietor → compute [sole-prop]
├── Societies Act 1966?
│   ├── Trade association → compute [trade-assoc]
│   └── Club/Society → compute [club]
├── Co-operative Societies Act 1993?
│   └── → compute [cooperative]
└── Other (Yayasan, statutory body)?
    └── → compute [ngo-exempt]
```

## Commands

| Command | Category | Description | Reference |
|---|---|---|---|
| `compute [entity]` | Build | Full tax computation | [reference/corporate.md](reference/corporate.md), [reference/partnership.md](reference/partnership.md), [reference/sole-prop.md](reference/sole-prop.md), [reference/ngo.md](reference/ngo.md) |
| `audit [computation]` | Evaluate | Error detection and overpayment review | [reference/audit.md](reference/audit.md) |
| `transfer-pricing [transactions]` | Evaluate | TP analysis, earnings stripping, documentation | [reference/transfer-pricing.md](reference/transfer-pricing.md) |
| `international [transactions]` | Evaluate | WHT, FTC, FSI, PE, Labuan | [reference/international.md](reference/international.md) |
| `group [structure]` | Evaluate | IHC, group relief, controlled transfers, continuity | [reference/group.md](reference/group.md) |
| `incentive [entity]` | Advise | Available incentives and eligibility | [reference/incentives.md](reference/incentives.md) |
| `strategy [entity]` | Advise | Tax optimisation by company stage — quantified, bounded by anti-avoidance | [reference/tax-strategy.md](reference/tax-strategy.md) |
| `cp204 [actual vs estimate]` | Check | Underestimation penalty computation | [reference/corporate.md](reference/corporate.md) |
| `shape [scenario]` | Plan | Discovery interview for complex scenarios | (this file) |

### Routing rules

1. **No argument**: render the command table. Ask what they need.
2. **First word matches a command**: load its reference and follow instructions. Everything after is the target.
3. **First word doesn't match but financial data is present**: route to `compute`, classify entity first.
4. **Ambiguous**: ask one clarifying question. Do not guess between `compute` and `audit`.

Commands chain naturally: `compute` auto-runs `audit` at the end. `compute` with related parties triggers `transfer-pricing` check. `compute` with non-resident payments triggers `international` WHT check. `strategy` chains to `compute` when the user wants to implement a recommended strategy.

---

## Shared laws

Apply to every computation, every entity type, every command. These are not guidelines. They are the law.

### The accuracy test

If a practitioner could look at this computation and find a number not traceable to the source documents, it has failed. Every RM figure must have a lineage: source document → line item → add-back/deduction → schedule.

Run this at two altitudes:

- **First-order**: Can every amount be traced to the trial balance or accounts? If any figure was "rounded", "estimated", or "typical", it fails.
- **Second-order**: Does every tax treatment have a statutory citation? If any add-back says "disallowed" without specifying the section (s.39(1)(a), s.39(1)(l), etc.), it fails.

### Absolute bans

Match-and-refuse. If you are about to write any of these, stop and rewrite.

- **Hardcoded rates without year.** Any tax percentage not tied to a specific YA and statutory reference. Never acceptable. Load from `data/rates.json` with YA citation. Rates change; hardcoded rates rot.
- **"Sundry" add-backs.** A single line grouping multiple disallowable items. Never acceptable. Every add-back must be named individually with its section reference and amount traced to the accounts.
- **Estimated capital allowances.** CA computed without identifying individual assets, their QE, and their rates. Never acceptable. Every asset gets its own line in the schedule.
- **Missing loss memorandum.** Any computation with B/F losses that doesn't track year of origin and remaining carry-forward years. Never acceptable. Each loss year is a separate line with its expiry date.
- **Unverified SME status.** Claiming SME rates without checking ALL five conditions against actual data (paid-up capital, gross income, corporate shareholders, control test, foreign ownership). Never acceptable. One failed condition = flat 24%.
- **WHT ignored.** Non-resident payments in the accounts without WHT analysis. Never acceptable. Every non-resident payment is classified, WHT obligation determined, deductibility confirmed.
- **Section-less deduction judgment.** Saying "deductible" or "not deductible" without citing the specific section (s.33(1), s.39(1)(b), s.34(6), etc.). Never acceptable. The statute is the authority.

### The practitioner confidence test

Would a tax manager at a Big 4 firm sign this computation and file it? If the answer is "they'd want to check that figure" or "they'd want to see the source", you haven't finished.

---

## COMMAND: compute

### The computation contract

Compute is not a summary. It is a complete working paper with these required artifacts:

1. **Entity identification** with YA, basis period, and rate determination.
2. **Adjusted income working** with every add-back and deduction individually named and sectioned.
3. **Capital allowance schedule** with every asset, its category, QE, IA, AA, and residual.
4. **Statutory income** per source (minimum NIL).
5. **Aggregate and chargeable income** with loss utilisation showing year of origin.
6. **Tax computation** with rate bands shown (not just the final number).
7. **Tax payable/refundable** showing CP204/CP500 credits.
8. **Validation checks** confirming internal ties.
9. **Filing reminders** with deadlines.

Do not present a partial computation and ask "shall I continue?" Present the full computation. If information is genuinely missing for a specific line, mark it `[PENDING: description of what's needed]` and continue with the rest.

### Step 1: Adjusted income

```
START: Net profit per accounts (from P&L or TB)

ADD BACK (Section 39 disallowances — each item individually):
  Every item must specify: description, amount, section reference.
  □ Depreciation [s.39(1)(c)]
  □ General provisions [s.39(1)(m)]
  □ Entertainment — 50% of non-proviso items [s.39(1)(l)]
  □ Capital expenditure [s.39(1)(b)]
  □ Penalties and fines [s.39(1)(d)]
  □ Private/domestic expenses [s.39(1)(a)]
  □ Income tax provisions [s.39(1)(e)]
  □ Non-deductible legal fees (capital nature) [s.39(1)(b)]
  □ Unrealised forex on non-trade items [capital — PR 12/2019]
  □ Expenses without WHT remittance [s.39(2)]
  □ Any other item not wholly and exclusively for business [s.39(1)(d)]

DEDUCT (non-taxable items credited to P&L):
  □ Exempt dividends (single-tier)
  □ Over-provisions brought back
  □ Unrealised forex gain on non-trade items (capital)
  □ Capital gains credited to P&L
  □ Non-Malaysian income not received in Malaysia

DOUBLE DEDUCTIONS (Section 34 — each with gazette/approval reference):
  □ Export promotion (200%) — active approval required
  □ R&D (200%) — MOSTI approval required
  □ Training (200%) — approved institution
  □ Disabled employees (200%) — JKM registration
  □ Others per reference/incentives.md

= ADJUSTED INCOME (or ADJUSTED LOSS)
```

### Step 2: Capital allowances

Load `reference/capital-allowances.md` and `data/ca-rates.json`.

```
FOR EACH qualifying asset owned and in use at end of basis period:

1. Classify: Category 1 (20% AA) / Category 2 (14% AA) / Category 3 (10% AA) / ICT (20% AA standard, 40% AA if Budget 2026 ACA)
2. Determine QE: actual cost (check motor vehicle cap, HP rules)
3. Check accelerated rates:
   - Budget 2026 ACA (11 Oct 2025 - 31 Dec 2026): local machinery or ICT → 20% IA / 40% AA
   - Automation CA (YA 2023-2027): 200% up to RM10m, IR 4.0 element
   - Small value asset (< RM2,000): 100% write-off (cap RM20k non-SME)
4. Compute: Residual b/f + QE - IA - AA = Residual c/f
5. If disposed: Balancing Charge or Balancing Allowance

MOTOR VEHICLE QE CAP:
  General non-commercial: RM50,000
  New vehicle ≤ RM150,000: RM100,000
  Commercial (transport): NO CAP

Total CA = sum of IA + AA for all assets
```

### Step 3: Statutory income through to tax payable

```
Adjusted Income                                    XXX
Less: Current year CA                             (XXX)
Less: Unabsorbed CA b/f (same source, indefinite) (XXX)
= STATUTORY INCOME (minimum NIL per source)        XXX

Aggregate all sources of statutory income          XXX
Less: Approved donations [s.44(6)] (10% cap)      (XXX)
Less: Company zakat [s.44(11A)] (2.5% cap)        (XXX)
= AGGREGATE INCOME                                 XXX

Less: Current year business loss [s.44(2)]        (XXX)
Less: B/F losses [s.44(5A)] (10yr, business only) (XXX)
= TOTAL INCOME                                     XXX

Less: Exempt income (PS/ITA if applicable)        (XXX)
= CHARGEABLE INCOME                                XXX

Tax at applicable rate (show bands)                XXX
Less: s.110 bilateral credit                      (XXX)
Less: s.132/133 FTC                               (XXX)
Less: Tax deducted at source                      (XXX)
Less: CP204/CP500 instalments                     (XXX)
= TAX PAYABLE / (REFUNDABLE)                       XXX
```

### Entity branches

**Sdn Bhd/Berhad:** Load `reference/corporate.md`. Check SME (all 5 conditions against actual data). Flat 24% if any condition fails.

**Partnership/PLT:** Load `reference/partnership.md`. Three-step: PAI → Divisible Income → Partner allocation. CA per profit ratio at year-end. Each partner taxed separately. PLT: check 2% distribution tax (YA 2026+, >RM100k to individuals).

**Sole Proprietor:** Load `reference/sole-prop.md`. Progressive rates (load `data/rates.json`). Personal reliefs (load `data/reliefs.json`). Zakat = tax rebate, not deduction.

**Club/Association:** Load `reference/ngo.md`. Separate mutual (not taxable) from non-mutual (taxable). Apportion common expenses: A × B/C. Individual scale rates. Donations capped at 7%.

**Trade Association:** Load `reference/ngo.md`. ALL revenue = deemed business [s.53(3)]. Subscription exemption (P.U.(A) 19/2005). Individual rates (resident) or 28% flat (non-resident).

**Cooperative:** Load `reference/ngo.md`. Check Para 12 Sch 6 exemption: <5 years = exempt; ≥5 years + members' funds <RM750k = exempt. If taxable: no mutuality, s.65A deductions (25% net profits + 8% members' funds). Cooperative rates (0%-24%).

**NGO exempt [s.44(6)]:** Exempt under Para 13 Sch 6. Must still file. Verify: 50% spending, 25% business cap, board composition.

---

## COMMAND: audit

Load [reference/audit.md](reference/audit.md).

### Audit health score

Score 5 dimensions, 0-4 each. Total /20.

| # | Dimension | What to check |
|---|-----------|---------------|
| 1 | Compliance | Every add-back sectioned, rates correct, caps applied, deadlines met |
| 2 | Accuracy | All figures tie to source, arithmetic correct, no rounding errors |
| 3 | Completeness | All sources assessed, all assets in CA schedule, all B/F items tracked |
| 4 | Optimisation | Double deductions claimed, ACA applied, losses utilised, incentives checked |
| 5 | Risk | WHT checked, TP flagged, shareholder continuity verified, e-invoice compliance |

**Rating bands:** 18-20 File with confidence. 14-17 Minor items to address. 10-13 Material gaps. 6-9 Do not file. 0-5 Recompute from scratch.

### Severity tagging

- **P0 Blocking**: Computation is WRONG. Tax liability misstated. Fix before filing.
- **P1 Major**: Significant risk. LHDN audit would catch this. Fix before filing.
- **P2 Minor**: Suboptimal but not incorrect. Fix in next iteration.
- **P3 Polish**: Best practice. Fix if time permits.

For each finding: `[P?] Issue name` — Location — Section reference — Impact (RM) — Recommendation.

After presenting the score, state:

> Run specific commands to address findings: `transfer-pricing` for P1 TP issues, `international` for WHT gaps, `incentive` for missed claims.

---

## COMMAND: transfer-pricing

Load [reference/transfer-pricing.md](reference/transfer-pricing.md).

### TP computation contract

1. **Identify**: List every controlled transaction (counterparty, nature, amount, jurisdiction).
2. **Test**: For each, select TP method (CUP/RPM/CPM/TNMM/PSM) and state arm's length conclusion.
3. **Earnings stripping** [s.140C]: If related-party interest > RM500k, compute tax-EBITDA, apply 20% cap, determine disallowed amount (permanent, no carry-forward).
4. **Documentation**: State whether full TP documentation is required (group revenue ≥RM25m or RP transactions ≥RM15m).
5. **Risk**: Flag items where LHDN adjustment is likely. Quantify exposure.

---

## COMMAND: international

Load [reference/international.md](reference/international.md).

### International tax contract

**Part A — Outbound payments:** For each payment to non-resident: classify (s.109/109B/107A), check DTA (load `data/wht-dta.json`), confirm WHT deducted, confirm deductibility.

**Part B — FSI:** For each foreign income received in Malaysia: nature, exemption check (individual = exempt; company = check gazette conditions + 15% foreign tax test), include in computation if taxable.

**Part C — FTC:** For each taxable foreign income with foreign tax paid: compute credit per country (s.132 if DTA: full credit limited to MY tax; s.133 if no DTA: 50% credit limited to MY tax). Excess credit = lost.

**Part D — Labuan:** If Labuan entity in group: substance test (2 employees, RM50k opex), WHT on payments TO Labuan entity, TP applies.

**Part E — PE:** If non-resident has fixed place of business in Malaysia: Form C filing, 24% flat (no SME), no WHT on profit remittance.

---

## COMMAND: group

Load [reference/group.md](reference/group.md).

### Group review contract

1. **Structure map**: Ownership percentages, entity types, jurisdictions.
2. **IHC test** [s.60F]: Each holding company — is it investment-only? If yes: per-source only, no carry-forward, no inter-source offset, no SME rate.
3. **Intra-group transactions**: Management fees (real services? arm's length? benefit test?), inter-company loans (earnings stripping), royalties, guarantees.
4. **Group relief** [s.44A]: Check all 10 conditions. If ANY fails = not available. Max 70% of adjusted loss, first 3 YAs only.
5. **Controlled transfers** [Sch 3 Para 38-40]: ≥50% control, CA assets only, joint election, 2-year clawback warning.
6. **Shareholder continuity** [Para 75A-75C]: Any >50% change → same business test → preserve or forfeit B/F losses/CA.
7. **Stamp duty** [s.15A]: 90% ownership, 12m before + 24m after, both MY-incorporated.
8. **Dividends**: Single-tier exempt within Malaysia. Foreign sub → parent = FSI rules.

---

## COMMAND: incentive

Load [reference/incentives.md](reference/incentives.md).

### Incentive review contract

1. **Current incentives**: Is entity already under PS/ITA/RA? Remaining years?
2. **Mutual exclusivity**: PS and ITA cannot be held simultaneously. Companies under incentive cannot claim group relief.
3. **Budget 2026 ACA**: Local machinery + ICT (20% IA / 40% AA) — QCE 11 Oct 2025 to 31 Dec 2026.
4. **Automation CA**: 200% up to RM10m (YA 2023-2027). IR 4.0 element required. Operating ≥36 months.
5. **GITA**: Green tech (tiers 1-3, applications by 31 Dec 2026). MyHIJAU 100%.
6. **Double deductions**: Export, R&D, training, disabled, halal, environment, internship — each with conditions and expiry dates.
7. **JS-SEZ**: If entity in Johor — flagship eligibility check.
8. **Tax savings**: Quantify benefit of each applicable incentive vs no-incentive baseline.

---

## COMMAND: cp204

```
Actual tax payable (from computation):             RM XXX
CP204 estimate (original or last revision):        RM XXX
Shortfall = actual - estimate:                     RM XXX
30% threshold = 30% × actual:                      RM XXX

IF shortfall > 30% threshold:
  Penalty = 10% × (shortfall - threshold)          RM XXX
  → Alert client with amount
  → Recommend next year estimate (actual × 1.1 as buffer)

Exemptions:
  - New company (paid-up ≤ RM2.5m): exempt for first 2 YAs
  - Short basis period < 6 months: CP204 not required

Revision rules:
  - 6th month: increase OR decrease
  - 9th month: increase ONLY
```

---

## COMMAND: strategy

Load [reference/tax-strategy.md](reference/tax-strategy.md).

### Strategy review contract

1. **Classify stage**: From actual financials, determine Loss-Making / Breakeven / Profitable / Super-Profitable.
2. **Load stage-specific strategies**: Only the relevant stage section (do not dump all 4 stages on every entity).
3. **For each applicable strategy**: Quantify the tax saving, state the authority, assess risk level, and provide implementation steps.
4. **Anti-avoidance check**: Every recommendation must state which anti-avoidance provision could apply if poorly implemented.
5. **Prioritise**: Rank by tax saving (descending), filtered by risk tolerance (legitimate first, then grey area only if client appetite confirmed).
6. **Summary table**: End with prioritised strategy table showing total addressable savings.

**Discovery additions for strategy:**
- "What is your risk appetite for tax planning?" (legitimate only / some grey area / aggressive)
- "Are there planned capital expenditures in the next 12 months?"
- "Any group restructuring planned?"
- "Current incentive status (PS/ITA/RA in force)?"

**Chains to:** `compute` (to rerun with optimised treatment), `incentive` (for eligibility deep-dive), `transfer-pricing` (for TP documentation), `group` (for restructuring analysis).

---

## Validation (post-computation)

Run EVERY time before presenting a computation:

```
TIES:
□ Net profit + add-backs - deductions = adjusted income
□ Residual b/f + QE - IA - AA = residual c/f (per asset)
□ Sum of all CA per asset = total CA deducted
□ Statutory income ≥ 0 per source
□ Chargeable income ≥ 0

CAPS AND LIMITS:
□ Motor vehicle QE ≤ cap (RM50k/RM100k/uncapped)
□ Small value assets ≤ RM20k/YA (non-SME)
□ Donations ≤ 10% of aggregate income
□ Zakat ≤ 2.5% of aggregate income (company) or ≤ tax charged (individual rebate)
□ B/F losses: each year within 10-year limit
□ Group relief ≤ 70% of adjusted loss
□ Earnings stripping: interest ≤ 20% of tax-EBITDA (or ≤ RM500k de minimis)

CROSS-CHECKS:
□ Every add-back has a section reference
□ Every deduction has a statutory basis
□ SME conditions ALL verified (not assumed)
□ WHT checked for every non-resident payment
□ CP204 underestimation check run
□ All figures traceable to source document
```

---

## Edge cases and traps

These are not guidelines. They are traps that practitioners fall into and LHDN catches. Check every one against the computation before filing.

```
 1. PARTNERSHIP → SDN BHD: Losses don't transfer. Assets trigger BA/BC. Stock at MV.
 2. MIXED ENTERTAINMENT: Staff + client event = apportion between 100% and 50%.
 3. REPAIR vs IMPROVEMENT: Like-for-like = s.33 deductible. Upgrade = s.39(1)(b) capital.
 4. FOREX: Trade monetary items = revenue (both realised and unrealised from YA 2019).
          Non-trade (capital loan) = no tax effect.
 5. BAD DEBTS: Only SPECIFIC (individually identified) debts deductible. % provision = add back.
 6. SHAREHOLDER CHANGE: >50% → test same business → B/F losses and CA may be forfeited.
 7. HP ASSETS: QE = capital PAID in period (not full cost). No small value rules.
 8. PRE-COMMENCEMENT: Revenue expenses → deductible in first YA. Capital → CA in first YA.
 9. RELATED PARTIES: Every transaction must be arm's length [s.140A]. Check earnings stripping.
10. DIVIDEND TAX: 2% on individual dividends > RM100k/year (from YA 2025).
11. PLT DISTRIBUTION TAX: 2% on individual distributions > RM100k (from YA 2026).
12. DORMANT REVIVED: >50% shareholder change during dormancy → ALL B/F items forfeited.
13. SHORT BASIS PERIOD: IA = full. AA = pro-rated (months/12). Small value cap = full.
14. CESSATION: Assets → BA/BC. Stock → deemed MV. Unabsorbed losses → dead.
15. IHC [s.60F]: No inter-source offset. Expenses per source only. No carry-forward. No SME.
16. RPGT vs INCOME TAX: Developer (badges of trade) = s.4(a). Investor = RPGT.
17. CGT SHARES: Pre-1/3/2024 unlisted = 2% gross. Post = 10% net gain. Listed = exempt.
18. E-INVOICE: From 1 Jul 2025 ALL taxpayers. No valid e-invoice → expense at risk.
19. CONNECTED PERSONS INSURANCE: Insurance premiums between connected persons [s.140B].
20. ACA vs STANDARD: Cannot claim Budget 2026 ACA and standard rates on same asset.
```

---

## Output format

```
┌─────────────────────────────────────────────────────────────────┐
│ TAX COMPUTATION                                                 │
│ Entity: [NAME] ([REG NO])                                       │
│ YA: [YEAR]  Basis Period: [FROM] to [TO]                        │
│ Entity Type: [TYPE]  Rate: [SME/Standard/Progressive]           │
├─────────────────────────────────────────────────────────────────┤
│ 1. Adjusted Income Working                                      │
│ 2. Capital Allowance Schedule                                   │
│ 3. Statutory Income (per source)                                │
│ 4. Aggregate & Chargeable Income                                │
│ 5. Tax Computation (with rate bands)                            │
│ 6. Tax Payable / Refundable                                     │
├─────────────────────────────────────────────────────────────────┤
│ SCHEDULES                                                       │
│ A. Add-backs (each with section reference)                      │
│ B. Deductions (each with statutory basis)                       │
│ C. Capital Allowances (per asset)                               │
│ D. Loss Memorandum (year of origin, years remaining)            │
│ E. Donations (approved body, amount, cap check)                 │
├─────────────────────────────────────────────────────────────────┤
│ NOTES                                                           │
│ - Items flagged for practitioner judgment                       │
│ - Missing documentation                                         │
│ - Incentives claimed (conditions, compliance)                   │
│ - WHT obligations identified                                    │
├─────────────────────────────────────────────────────────────────┤
│ FILING                                                          │
│ Form: [TYPE]  Deadline: [DATE]                                  │
│ CP204: [STATUS]  Penalty: [AMOUNT or NONE]                      │
│ WHT due: [LIST or NONE]                                         │
└─────────────────────────────────────────────────────────────────┘
```

Every computation ends with the audit health score. No exceptions.
