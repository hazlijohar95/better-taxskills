# Compare — Prior-Year Variance Analysis with LHDN Risk Flags

Analyse year-on-year changes in a tax computation and flag items that would trigger LHDN scrutiny. This is what an auditor does first — before looking at any single item, they look at what MOVED.

---

## Inputs Required

```
MINIMUM:
  - Current YA computation (full or in-progress)
  - Prior YA computation (at least: revenue, GP, adjusted income, tax payable)

IDEAL:
  - 2-3 years of comparative data
  - Industry classification (for GP margin benchmarking)
  - Prior LHDN correspondence (if any queries/audits in progress)
```

---

## Variance Categories

### Category A: Revenue and Gross Profit

```
FOR EACH YEAR:
  Revenue (turnover)                                 RM XXX
  Cost of sales                                     (RM XXX)
  Gross profit                                       RM XXX
  GP margin                                          XX.X%

COMPUTE:
  Revenue growth/decline: (Current - Prior) / Prior × 100
  GP margin change: Current GP% - Prior GP%
  
FLAGS:
  ⚠ Revenue declined > 15% without explanation → LHDN suspects income suppression
  ⚠ GP margin declined > 5 percentage points → LHDN suspects cost inflation or income diversion
  ⚠ GP margin below industry norm (LHDN has industry benchmarks per MSIC code)
  ⚠ Revenue increased significantly but tax payable decreased → red flag for aggressive deductions
```

### Category B: Add-Backs and Deductions

```
FOR EACH MATERIAL ADD-BACK/DEDUCTION:
  Compare current vs prior year amount
  Compute absolute change (RM) and relative change (%)

FLAGS:
  ⚠ Entertainment increased > 50% or > 5% of turnover → LHDN priority review item
  ⚠ New add-back category appearing (e.g., first time "management fees to related party")
  ⚠ Previously disallowed item now treated as deductible without explanation
  ⚠ Depreciation growth inconsistent with fixed asset additions
  ⚠ General provisions significantly higher than prior year
  ⚠ Directors' remuneration change > 30% in either direction
```

### Category C: Capital Allowances

```
COMPARE:
  Total CA claimed: current vs prior
  New asset additions (QE): consistency with capex narrative
  Disposals: any balancing charges that should have been but weren't
  Residual balances: do they carry forward correctly?

FLAGS:
  ⚠ CA claimed jumped significantly without corresponding asset purchases visible
  ⚠ Assets disposed but no balancing charge in computation
  ⚠ Residual c/f from prior year ≠ Residual b/f in current year (LHDN ALWAYS checks this)
  ⚠ Small value assets claimed when company is non-SME and amount > RM20k
  ⚠ Automation CA claimed without visible IR 4.0 narrative
```

### Category D: Losses and Carry-Forwards

```
COMPARE:
  Losses b/f: does current year b/f = prior year c/f?
  Losses utilised: quantum and year of origin
  Loss expiry: any losses in their final year?
  
FLAGS:
  ⚠ Losses b/f in current year ≠ losses c/f from prior year (discrepancy = immediate audit)
  ⚠ Losses being claimed in year 9-10 without prior utilisation → LHDN questions genuineness
  ⚠ New losses appearing without revenue decline (manufactured loss)
  ⚠ Unabsorbed CA b/f changed without disposal or new claims
  ⚠ Shareholder change occurred AND losses still claimed (continuity test)
```

### Category E: Related Party Transactions

```
COMPARE:
  Total related-party charges: current vs prior
  New related-party transactions (type and quantum)
  Pricing changes on existing transactions

FLAGS:
  ⚠ New management fee or service charge to related party (>RM100k) not present in prior year
  ⚠ Related-party charge increased > 20% without corresponding revenue growth
  ⚠ Related-party interest charges approaching RM500k threshold (s.140C)
  ⚠ Royalties/licensing fees introduced or significantly increased
  ⚠ Inter-company loan increased without visible capital expenditure
```

### Category F: Tax Position

```
COMPARE:
  Effective tax rate: current vs prior
  Absolute tax payable/refundable: current vs prior
  CP204 estimate vs actual: variance trend
  
FLAGS:
  ⚠ Effective tax rate dropped > 5 percentage points without incentive/loss explanation
  ⚠ Moved from tax payable to tax refundable without clear reason
  ⚠ CP204 consistently under-estimated for 3+ years → LHDN may impose higher estimates
  ⚠ Refund claimed > RM50k → automatic review queue
  ⚠ Permanent differences growing each year (aggressive positions accumulating)
```

---

## LHDN Industry Benchmarks

LHDN maintains internal GP margin and expense ratio benchmarks by MSIC code. While not published, practitioners observe that audits are commonly triggered when:

```
COMMON INDUSTRY THRESHOLDS (approximate):
  □ Retail/wholesale: GP < 15% (margin compression query)
  □ F&B: GP < 50% (food costs should be ~30-40%)
  □ Professional services: GP < 60% (minimal COGS expected)
  □ Manufacturing: GP < 20% (varies by sub-sector)
  □ Construction: GP < 10% (project-based, low but acceptable)
  □ Property: GP < 25% (land cost as COGS)

If client's GP margin is SIGNIFICANTLY below industry norm:
  → Flag and recommend documentation of commercial reasons
  → Prepare explanation BEFORE LHDN asks (proactive defence)
```

---

## Output Format

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ YEAR-ON-YEAR VARIANCE ANALYSIS                                              │
│ Entity: [NAME]  Comparing: YA [PRIOR] → YA [CURRENT]                       │
├─────────────────────────┬──────────────┬──────────────┬──────────┬──────────┤
│ Item                    │ YA [PRIOR]   │ YA [CURRENT] │ Δ (RM)   │ Δ (%)    │
├─────────────────────────┼──────────────┼──────────────┼──────────┼──────────┤
│ Revenue                 │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ Gross profit            │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ GP margin               │ XX.X%        │ XX.X%        │          │ ±X.X pp  │
│ Adjusted income         │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ Total CA                │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ Chargeable income       │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ Tax payable             │ RM XXX       │ RM XXX       │ ±XXX     │ ±XX%     │
│ Effective tax rate      │ XX.X%        │ XX.X%        │          │ ±X.X pp  │
├─────────────────────────┴──────────────┴──────────────┴──────────┴──────────┤
│ LHDN RISK FLAGS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ [⚠/🔴] [Description] — [Impact/Reason LHDN would query]                    │
│ [⚠/🔴] [Description] — [Impact/Reason LHDN would query]                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ CONTINUITY CHECKS                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ □ Losses b/f ties to prior c/f: [PASS/FAIL]                                │
│ □ CA residual b/f ties to prior c/f: [PASS/FAIL]                           │
│ □ Shareholder continuity maintained: [PASS/FAIL/N.A.]                       │
│ □ Incentive period continuity: [PASS/FAIL/N.A.]                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ RECOMMENDATIONS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. [Proactive action to mitigate identified risk]                           │
│ 2. [Documentation to prepare in case of LHDN query]                        │
│ 3. [Position that may need revision before filing]                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Risk severity

- 🔴 **High**: LHDN would likely raise additional assessment. Prepare defence or revise.
- ⚠ **Medium**: LHDN may query. Prepare documentation proactively.
- ℹ️ **Low**: Unusual but defensible. Note for file.

---

## Systemic Pattern Detection

Beyond line-by-line comparison, identify patterns across multiple years:

```
ESCALATION PATTERNS:
  □ Related-party charges growing each year (gradual profit shift)
  □ Entertainment growing faster than revenue (lifestyle masking)
  □ Losses never fully utilised despite profitability (poor planning or fabrication)
  □ Tax refunds every year (something structural is off)
  □ GP margin declining steadily (transfer pricing issue building)

INCONSISTENCY PATTERNS:
  □ Revenue up but profitability flat (cost structure problem)
  □ Staff costs flat but directors' remuneration up (profit extraction)
  □ Fixed assets growing but no corresponding revenue growth (non-business use?)
  □ Depreciation in accounts doesn't match CA computation (reconciliation needed)
```

---

## NEVER

- Present a comparison without checking that carry-forward figures actually tie between years
- Ignore a material new related-party transaction that wasn't in prior year
- Skip the GP margin analysis (this is LHDN's primary selection criterion for audit)
- Report numbers without explaining WHY the variance matters from LHDN's perspective
- Assume a declining GP margin is always a problem (may have legitimate commercial reasons — but document them)
- Compare only absolute numbers without percentages (RM50k increase is nothing for a RM100m company; it's everything for a RM500k company)
