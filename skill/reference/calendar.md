# Compliance Calendar — Deadline-Aware Warnings

Track filing deadlines, payment due dates, revision windows, and penalty triggers relative to TODAY'S DATE and the entity's financial year end. Surface time-sensitive warnings automatically.

---

## Core Deadlines by Entity Type

### Companies (Sdn Bhd / Berhad)

| Obligation | Deadline | Penalty for breach |
|------------|----------|-------------------|
| Form C filing | 7 months after FYE | s.112(3): RM200-RM20,000 + 300% of tax |
| Tax payment (balance) | Due date of Form C (7 months after FYE) | s.103(3): 10% increase |
| CP204 submission (new estimate) | 30 days before start of basis period | s.107C(4): LHDN deems estimate |
| CP204 instalments | Monthly, by 15th of each month | s.103(7): 10% on shortfall per instalment |
| CP204 revision (6th month) | Before end of 6th month of basis period | Can increase OR decrease |
| CP204 revision (9th month) | Before end of 9th month of basis period | Can INCREASE only |
| Form E (employer return) | 31 March following calendar year | s.120(1): RM200-RM20,000 / imprisonment |
| Monthly PCB remittance | 15th of following month | s.107(3): employer liable |
| WHT remittance (s.109/109B) | Within 30 days of payment/crediting to NR | s.109(4): 10% penalty on late WHT |
| e-Invoice compliance | From 1 July 2025 (all taxpayers) | Expense deductibility at risk |
| Annual return (SSM) | Within 30 days of AGM | SSM penalty (not tax, but affects status) |

### Individuals (employed — Form BE)

| Obligation | Deadline | Penalty for breach |
|------------|----------|-------------------|
| Form BE filing | 30 April following YA (or 15 May if e-filing) | s.112(3): penalty |
| Tax payment (balance) | 30 April (or 15 May e-filing) | s.103(3): 10% increase |
| CP500 instalments (if issued) | Bi-monthly as per CP500 notice | 10% on shortfall |

### Individuals (business — Form B)

| Obligation | Deadline | Penalty for breach |
|------------|----------|-------------------|
| Form B filing | 30 June following YA (or 15 July if e-filing) | s.112(3): penalty |
| Tax payment (balance) | 30 June (or 15 July e-filing) | s.103(3): 10% increase |
| CP500 instalments | Bi-monthly as per CP500 notice | 10% on shortfall |

### Partnerships / PLTs (Form P)

| Obligation | Deadline | Penalty for breach |
|------------|----------|-------------------|
| Form P filing | 30 June following YA (or 15 July e-filing) | s.112(3): penalty |
| Partners' individual forms | As per individual deadlines (Form BE/B) | Individual partner liable |
| PLT distribution tax (2%) | Within 3 months of distribution | Per gazette (from YA 2026) |

### RPGT

| Obligation | Deadline | Penalty for breach |
|------------|----------|-------------------|
| CKHT 1A/1B filing | 60 days from disposal date | s.29(2): RM2,000 / imprisonment |
| RPGT payment | 60 days from disposal date | s.23: 10% increase |
| Retention sum remittance (by purchaser) | 60 days from disposal date | s.21B: purchaser liable for shortfall |

---

## CP204 Revision Windows

```
FINANCIAL YEAR: [FYE month]
BASIS PERIOD: [Start] to [End]

REVISION WINDOWS:
  6th month revision: before [date]
    → Can INCREASE or DECREASE estimate
    → Affects instalments from 7th month onwards
    → Strategy: if actual tracking below estimate, DECREASE to improve cash flow
    → Strategy: if actual tracking above estimate, INCREASE to avoid penalty

  9th month revision: before [date]
    → Can INCREASE ONLY
    → Affects instalments from 10th month onwards
    → Strategy: must revise upward if actual will exceed 30% threshold

30% SAFE HARBOUR:
  IF actual tax ≤ (estimate × 1.3): NO underestimation penalty
  IF actual tax > (estimate × 1.3): penalty = 10% × (shortfall beyond 30%)
  
  To be safe: ensure estimate ≥ actual/1.3 (i.e., estimate ≥ ~77% of expected actual)
```

---

## Deadline Computation Rules

```
FROM FYE, COMPUTE:
  CP204 new estimate due:       FYE - 11 months (30 days before next basis period starts)
  CP204 1st instalment:         1st month of basis period, by 15th
  CP204 6th month revision:     Before end of month 6 of basis period
  CP204 9th month revision:     Before end of month 9 of basis period
  Form C due:                   FYE + 7 months
  Form C tax payment:           FYE + 7 months (same as filing)
  
EXAMPLE (FYE 31 December 2025, YA 2025):
  CP204 estimate for YA 2026:   Due 30 November 2025
  Basis period YA 2025:         1 Jan 2025 - 31 Dec 2025
  6th month revision:           Before 30 June 2025
  9th month revision:           Before 30 September 2025
  Form C YA 2025:               Due 31 July 2026
  Tax payment YA 2025:          Due 31 July 2026
```

---

## Automated Warning Rules

When processing a computation, check ALL of the following against TODAY'S DATE:

### Critical (≤ 14 days to deadline)

```
🔴 CRITICAL — IMMEDIATE ACTION REQUIRED:
  "Form C due in [X] days (deadline: [DATE]). File immediately."
  "WHT on [payment] was due [DATE] — [X] days overdue. 10% penalty accruing."
  "CP204 6th month revision window closes in [X] days."
  "RPGT filing due in [X] days from disposal on [DATE]."
```

### Warning (15-60 days to deadline)

```
⚠ WARNING — PLAN AHEAD:
  "Form C due in [X] days. Computation should be finalised within [Y] days."
  "CP204 9th month revision available until [DATE] — consider revising upward."
  "Form E due [DATE] — prepare employer return data."
  "Budget 2026 ACA window closes 31 Dec 2026 — [X] days remaining for eligible capex."
```

### Advisory (61-180 days to deadline)

```
ℹ️ ADVISORY — FOR PLANNING:
  "Form C due in ~[X] months. Begin computation preparation."
  "CP204 next year estimate due [DATE] — base on projected YA [X] results."
  "New financial year starting [DATE] — review tax planning before year starts."
```

---

## Multi-Year Calendar View

For entities with ongoing engagements, show:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ COMPLIANCE CALENDAR — [ENTITY NAME]                                     │
│ FYE: [DATE]  Current date: [TODAY]                                      │
├──────────────┬─────────────────────────────────────────┬────────────────┤
│ Date         │ Obligation                              │ Status         │
├──────────────┼─────────────────────────────────────────┼────────────────┤
│ [PAST DATE]  │ CP204 instalment #3                     │ ✓ Paid         │
│ [PAST DATE]  │ CP204 instalment #4                     │ ✓ Paid         │
│ [PAST DATE]  │ 6th month revision window               │ ✗ Not revised  │
│ [FUTURE]     │ CP204 instalment #7                     │ ◯ Due [DATE]   │
│ [FUTURE]     │ 9th month revision (last chance ↑)      │ ◯ Window open  │
│ [FUTURE]     │ Form C YA [X]                           │ ◯ Due [DATE]   │
│ [FUTURE]     │ CP204 new estimate for YA [X+1]        │ ◯ Due [DATE]   │
├──────────────┴─────────────────────────────────────────┴────────────────┤
│ NEXT ACTION: [Most urgent upcoming obligation + days remaining]         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Special Windows and Expiries

Track time-limited incentives and elections:

```
BUDGET 2026 ACA:
  Window: 11 October 2025 to 31 December 2026
  Days remaining: [compute from today]
  Impact: Pull forward eligible capex before window closes

AUTOMATION CA (200%):
  Window: YA 2023 to YA 2027
  Remaining YAs: [compute]
  Impact: Last chance to make qualifying automation investments

GITA APPLICATIONS:
  Deadline: 31 December 2026
  Days remaining: [compute]
  Impact: Apply to MIDA before deadline for green technology investments

JS-SEZ APPLICATIONS:
  Deadline: 31 December 2034
  Status: Open for applications

LOSS EXPIRY:
  For each B/F loss with year of origin:
    Loss from YA [X]: expires end of YA [X+10]
    Remaining YAs to utilise: [compute]
    ⚠ If ≤ 2 years remaining: FLAG for urgent utilisation planning

RA 15-YEAR LIMIT:
  If RA first claimed in YA [X]: exhausts at YA [X+14]
  Remaining years: [compute]
  If exhausted: eligible for NIMP 2030 post-RA incentive
```

---

## Integration with Other Commands

```
AFTER compute:
  → Auto-check: Form C deadline relative to today
  → Auto-check: CP204 underestimation against current estimate
  → Auto-check: any WHT payments due and not yet remitted
  → Auto-check: loss expiry dates for any B/F losses used

AFTER strategy:
  → Surface ACA/Automation CA window deadlines
  → Flag incentive application deadlines
  → Warn about group relief 3-year window

AFTER compare:
  → Flag if prior year filing deadline was missed (s.77B amendment window)
  → Note 5-year statute limitation on amended returns
```

---

## NEVER

- Present a computation without checking if the filing deadline has already passed
- Ignore CP204 revision windows (these save real money when estimate is wrong)
- Forget that WHT is due 30 days from PAYMENT, not from FYE
- Assume e-filing extension (15 days) without confirming entity uses e-Filing
- Present loss carry-forward without noting expiry year
- Skip the Budget 2026 ACA window alert (it closes 31 Dec 2026 — practitioners need time to plan capex)
- Generate a calendar without today's date as anchor point
