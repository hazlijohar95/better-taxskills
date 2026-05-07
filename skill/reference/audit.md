# Audit — Error Detection, Overpayment Review, Health Score

Run systematic quality checks on a tax computation and generate a comprehensive report. Don't fix issues directly; document them with severity, impact, and recommended commands to address.

This is a compliance-level audit, not a summary check. Verify what's measurable and traceable in the computation.

## Diagnostic Scan

Run comprehensive checks across 5 dimensions. Score each dimension 0-4 using the criteria below.

### 1. Compliance

**Check for:**
- Every add-back has a section reference (s.39(1)(a), s.39(1)(b), etc.)
- Every deduction has a statutory basis (s.33(1), s.34(6), etc.)
- Tax rates match entity type and YA (verify against `data/rates.json`)
- Caps applied correctly (donations 10%, zakat 2.5%, motor QE, small value RM20k)
- Filing deadline correctly stated
- CP204 underestimation checked
- WHT obligations identified for all non-resident payments

**Score 0-4:** 0=Multiple wrong sections/rates. 1=Rates correct but caps missed. 2=Most items sectioned, some gaps. 3=Fully compliant, minor citation gaps. 4=Every item cited, all caps applied, all deadlines correct.

### 2. Accuracy

**Check for:**
- All figures tie to the source document (TB or accounts)
- Arithmetic: add-backs + deductions = adjusted income correctly
- CA schedule: residual b/f + QE - IA - AA = residual c/f (per asset)
- Statutory income not negative (minimum NIL per source)
- Rate bands applied correctly (SME: 15%/17%/24%; progressive: correct cumulative)
- No rounding that creates material differences
- Loss utilisation does not exceed available losses

**Score 0-4:** 0=Multiple arithmetic errors. 1=Totals wrong or figures don't tie. 2=Minor discrepancies (<RM1,000). 3=All ties except immaterial differences. 4=Every figure ties perfectly, arithmetic verified.

### 3. Completeness

**Check for:**
- All income sources assessed (business, rental, interest, dividend)
- All assets in the fixed asset register are in the CA schedule
- All B/F items tracked (losses with year of origin, unabsorbed CA with source)
- Prior year position carried forward correctly
- Both add-backs AND deductions considered (not just add-backs)
- Entertainment classified (not left as a single lump)
- Bad debts separated (specific vs general)

**Score 0-4:** 0=Major sources missing. 1=CA schedule incomplete. 2=Most items covered, some missing. 3=Comprehensive, minor omissions. 4=Every source, every asset, every B/F item, every classification.

### 4. Optimisation

**Check for:**
- Double deductions claimed where qualifying (training, R&D, export, disabled)
- Budget 2026 ACA applied (local machinery, ICT — 20% IA / 40% AA)
- Small value assets claimed (not left at standard rates)
- Automation CA considered (200%, RM10m cap, YA 2023-2027)
- Renovation allowance claimed (RM300k/3 years)
- Prior year losses utilised (not forgotten)
- Correct rate applied (SME vs standard — all 5 conditions checked)
- Zakat claimed (company: deduction; individual: rebate)
- Secretarial/tax filing fees claimed (RM5k + RM15k caps)
- FTC claimed (if foreign tax paid)

**Score 0-4:** 0=Multiple missed claims (>RM50k tax impact). 1=Major missed opportunities. 2=Most obvious ones claimed, nuanced ones missed. 3=Well optimised, minor improvements. 4=Every applicable relief, deduction, and rate advantage claimed and documented.

### 5. Risk

**Check for:**
- Related party transactions identified and flagged for TP
- Earnings stripping computed (if related-party interest > RM500k)
- Shareholder continuity verified (if B/F losses/CA exist)
- WHT deducted and remitted (or expense disallowed)
- e-Invoice compliance flagged (from 1 Jul 2025)
- CP204 underestimation exposure quantified
- Dormant company / change of shareholders checked
- Large one-off items explained
- IHC classification considered
- Non-resident PE exposure checked

**Score 0-4:** 0=Major risks unaddressed (WHT not checked, TP ignored). 1=Some risks identified, material gaps. 2=Most risks checked, documentation gaps. 3=Comprehensive risk review, minor gaps. 4=Every risk dimension checked, documented, quantified.

---

## Generate Report

### Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Compliance | ?/4 | [most critical compliance issue or "—"] |
| 2 | Accuracy | ?/4 | [most critical accuracy issue or "—"] |
| 3 | Completeness | ?/4 | [most critical completeness issue or "—"] |
| 4 | Optimisation | ?/4 | [most critical missed opportunity or "—"] |
| 5 | Risk | ?/4 | [most critical unaddressed risk or "—"] |
| **Total** | | **??/20** | **[Rating band]** |

**Rating bands:**
- 18-20 **File with confidence** — minor polish only
- 14-17 **Good** — address weak dimensions before filing
- 10-13 **Material gaps** — significant work needed, do not file yet
- 6-9 **Do not file** — major errors or missing items
- 0-5 **Recompute** — fundamental issues, start fresh

### Executive Summary
- Audit Health Score: **??/20** ([rating band])
- Total issues found: ? P0 / ? P1 / ? P2 / ? P3
- Top 3 critical issues (one line each)
- Recommended immediate actions

### Detailed Findings by Severity

Tag every finding with severity:

- **P0 Blocking**: Computation is WRONG. Tax liability misstated. LHDN would raise additional assessment. Fix before filing.
- **P1 Major**: Significant risk or missed compliance. LHDN audit would catch this. Fix before filing.
- **P2 Minor**: Suboptimal but defensible. Fix in next iteration or flag to client.
- **P3 Polish**: Best practice improvement. Fix if time permits.

For each finding, document:

```
[P?] Issue name
  Location: Schedule/line/item in the computation
  Section: ITA section or Public Ruling reference
  Impact: RM amount (tax underpaid or overpaid)
  Recommendation: Specific fix
  Suggested command: /malaysian-tax [command] for detailed analysis
```

### Systemic Issues

Identify recurring patterns that indicate systemic gaps:
- "Entertainment consistently classified without checking provisos — 5 items affected"
- "No section references on any add-back — entire compliance dimension at risk"
- "CA schedule uses standard rates for all ICT despite Budget 2026 ACA eligibility"

### Positive Findings

Note what's working well. Practitioners need confidence, not just criticism:
- "Loss memorandum properly maintained with year of origin"
- "SME status verified with all 5 conditions documented"
- "WHT analysis complete for all non-resident payments"

---

## Common LHDN Audit Catches

These are what LHDN auditors check first. Verify each:

```
 1. Entertainment at 100% without proviso justification
 2. General provisions claimed as specific bad debts (ECL models)
 3. Capital expenditure buried in repairs account
 4. Related party transactions not at arm's length
 5. WHT not deducted on non-resident payments
 6. Losses claimed beyond 10-year limit or against wrong source
 7. Shareholder change but losses still claimed (no continuity test)
 8. Private motor vehicle expenses in company accounts
 9. Directors' benefits not disclosed / under-declared
10. Forex treatment inconsistent (capital vs revenue mixed)
```

---

## Refund Handling

```
IF computation shows TAX REFUNDABLE:

1. Verify genuineness:
   □ CP204 instalments correctly totalled
   □ s.110 credits backed by WHT certificates
   □ No arithmetic error creating false refund

2. Alert client:
   → "Refund of RM XXX. Ensure bank details current with LHDN."
   → "Typical processing: 30 working days (statutory) to 3-12 months (reality)."

3. Offset risk:
   □ Outstanding tax in other YAs → LHDN offsets first
   □ Outstanding SST/WHT/PCB → delays refund

4. Audit risk:
   □ Refund > RM50,000 or significantly higher than prior year → higher audit probability
   □ Ensure all supporting documentation is watertight
```

---

## After presenting the report

State:

> You can address findings by running specific commands:
> - `transfer-pricing` for TP issues
> - `international` for WHT or FTC gaps
> - `incentive` for missed claims
> - `group` for IHC or continuity issues
>
> Re-run `audit` after fixes to see the score improve.

**IMPORTANT**: Be thorough but actionable. Too many P3 issues creates noise. Focus on what changes the tax liability or creates LHDN risk. Never report a finding without explaining WHY it matters (RM impact or compliance risk).

**NEVER:**
- Report "issue found" without RM impact or specific risk
- Provide generic recommendations ("review this item")
- Skip positive findings (practitioners need confidence)
- Mark everything P0 (that's not triage, that's panic)
- Report findings you haven't verified against the computation
