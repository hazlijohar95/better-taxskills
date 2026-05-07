# Takeover — New Client From Prior Agent

Structured workflow for onboarding a client from a previous tax agent. Verify every carry-forward position, identify errors in prior computations (both against and for the client), quantify exposure and opportunity, and establish a clean baseline.

---

## Why This Exists

Prior agents make mistakes. Common ones:
- CA schedule wrong (assets still claimed after disposal, wrong rates used)
- Loss memorandum incorrect (wrong year of origin, expired losses still claimed)
- SME status not verified (assumed instead of checked)
- WHT obligations missed (non-resident payments not caught)
- Entertainment treated as blanket 50% (no proviso analysis)
- Related-party transactions not flagged for TP
- Prior voluntary disclosure opportunities missed

Every error is either exposure (underpaid → LHDN can assess + penalty) or opportunity (overpaid → amended return for refund).

---

## Phase 1: Document Collection

```
OBTAIN FROM PRIOR AGENT (Form CP600B authorises you):

CRITICAL (cannot proceed without):
  □ Tax computations for last 3 YAs (minimum)
  □ Form C / BE / P copies as filed
  □ Fixed asset register with CA schedule
  □ Loss memorandum (if losses exist)
  □ CP204 estimates and revision history
  □ Any LHDN correspondence (queries, Form JA, Form Q)

IMPORTANT:
  □ Transfer pricing documentation (if applicable)
  □ WHT returns filed (CP37/37A) — last 3 years
  □ Form E and EA details (employer obligations)
  □ Incentive approval letters (PS/ITA/RA if applicable)
  □ Group relief election forms (if claimed)
  □ Prior year financial statements and trial balances

OPERATIONAL:
  □ Chart of accounts with tax mapping
  □ Related party listing and transaction register
  □ Shareholder history (for continuity test)
  □ Minutes of AGM/board meetings (bonus resolutions, write-offs)

IF PRIOR AGENT REFUSES TO RELEASE:
  → Formal demand letter (they are obligated under professional standards)
  → Obtain from client's own records (signed financial statements, LHDN copies)
  → Request from LHDN directly (taxpayer has right to their own filed documents)
  → File complaint with MIA/CTIM if agent withholds unreasonably
```

---

## Phase 2: Carry-Forward Verification

This is the most critical phase. Get this wrong and every computation going forward inherits the error.

### Loss Memorandum Verification

```
FOR EACH YEAR OF ORIGIN CLAIMED IN LOSS MEMORANDUM:

  □ Verify: Does the computation for that year actually show an adjusted loss?
  □ Verify: Was the loss correctly computed (not inflated by wrong add-backs/deductions)?
  □ Verify: Was s.44(2) offset done first? (current year loss against all income)
  □ Verify: Year of origin is correctly stated (clock starts from correct YA)
  □ Verify: Has the 10-year clock expired? (loss from YA 2015 expired after YA 2024)
  □ Verify: Was loss USED in any intermediate year? (reduce quantum accordingly)
  □ Verify: Shareholder continuity maintained from year of origin to present
  □ Verify: No dormancy period that would have triggered cessation

COMMON ERRORS FOUND:
  - Loss year of origin misdated (clock should have expired but wasn't updated)
  - Loss claimed in intermediate year but memorandum not reduced
  - Shareholder change occurred mid-period but loss still claimed
  - Pre-2019 losses carried forward past YA 2028 (should have expired)
  - Loss computed incorrectly in original year (e.g., depreciation not added back)
```

### CA Schedule Verification

```
FOR EACH ASSET IN THE CA SCHEDULE:

  □ Verify: Is the asset still owned by the company? (check latest FA register)
  □ Verify: Is the asset still IN USE? (dormant/idle assets don't get AA)
  □ Verify: Correct QE used? (motor vehicle cap applied? HP = capital paid only?)
  □ Verify: Correct rate applied? (Category 1/2/3, ACA if eligible, SVA if qualifying)
  □ Verify: IA was given in year 1 only (not repeated)
  □ Verify: AA not claimed after asset fully written down (residual = 0)
  □ Verify: Disposal in prior years triggered BA/BC correctly
  □ Verify: Residual c/f from year N = Residual b/f in year N+1

COMMON ERRORS FOUND:
  - Assets disposed 2 years ago still getting AA (CA over-claimed)
  - Motor vehicle QE at full cost without cap (RM50k or RM100k)
  - HP assets at full purchase price instead of capital paid in period
  - SVA claimed on assets > RM2,000 or HP assets
  - Wrong rate (e.g., furniture at 10% instead of 14%)
  - Buildings at wrong rate (industrial 10% vs general)
  - ACA claimed on non-qualifying assets (imported, not local)
```

### SME Status Verification

```
FOR EACH YEAR SME RATES WERE CLAIMED:

  □ Condition 1: Paid-up capital ≤ RM2.5m at start of basis period? [SSM extract]
  □ Condition 2: Gross business income ≤ RM50m? [P&L / computation]
  □ Condition 3: Foreign ownership ≤ 20%? [SSM shareholders]
  □ Condition 4: Not controlled by large-capital company? [Group structure]
  □ Condition 5: Does not control large-capital company? [Subsidiary check]

IF ANY CONDITION FAILED IN PRIOR YEAR:
  → Flat 24% should have been applied
  → Exposure: additional tax = difference between SME band rates and 24% on first RM600k
  → Maximum exposure per year: RM33,600 + penalty
```

### WHT Compliance Check

```
FOR EACH YEAR, IDENTIFY NON-RESIDENT PAYMENTS:

  □ Management/technical fees to non-resident related parties → s.109B (10%)
  □ Royalties to non-residents → s.109 (10%)
  □ Contract payments to NR contractors → s.107A (10%+3%)
  □ Interest to NR lenders → s.109 (15%)
  □ Rental of moveable property to NR → s.109 (10%)

FOR EACH IDENTIFIED PAYMENT:
  □ Was WHT deducted?
  □ Was WHT remitted to LHDN within 30 days?
  □ Was DTA relief claimed? (reduced rate — with Certificate of Residence?)
  □ If WHT NOT remitted: expense is NON-DEDUCTIBLE [s.39(2)]
    → Prior computation may have claimed deduction without remitting WHT
    → Exposure: disallowed expense + WHT liability + penalty
```

---

## Phase 3: Error Identification

### Against the client (underpaid — LHDN exposure)

```
FOR EACH ERROR WHERE TAX WAS UNDERPAID:

  Document:
    □ Year of assessment affected
    □ Nature of error
    □ Original treatment (as filed)
    □ Correct treatment (as it should be)
    □ Additional tax (difference)
    □ Potential penalty (15-100% depending on nature and disclosure timing)
    □ Statute limitation: can LHDN still assess? (5 years from return due date)
    □ Is voluntary disclosure advisable? (penalty reduction)

PRIORITISE ERRORS BY:
  1. Still within statute (LHDN can still assess) → ACTION REQUIRED
  2. Outside statute (>5 years) but no fraud → LHDN time-barred, note for records
  3. Suspected fraud/wilful default → NO time limit, assess risk carefully
```

### For the client (overpaid — refund opportunity)

```
FOR EACH ERROR WHERE TAX WAS OVERPAID:

  Document:
    □ Year of assessment affected
    □ Nature of error (deduction missed, CA unclaimed, incentive not applied)
    □ Original treatment (as filed)
    □ Correct treatment (refund computation)
    □ Tax overpaid (refund amount)
    □ Can we still amend? s.77B: within 5 years of return due date
    □ Net benefit after any fee for amended return preparation

COMMON REFUND OPPORTUNITIES:
  - Double deductions not claimed (training, R&D, export — RM often significant)
  - ACA not applied when eligible (prior agent used standard rates)
  - Donations/zakat not claimed (receipts existed but not deducted)
  - Entertainment 100% proviso items treated as 50% (staff-only events)
  - Secretarial/tax filing fee deduction missed (RM5k + RM15k caps)
  - Renovation allowance not claimed (RM300k/3 years)
  - Prior year loss utilisation missed (loss existed but not offset)
```

---

## Phase 4: Quantification

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TAKEOVER FINDINGS — [ENTITY NAME]                                       │
│ Prior agent: [NAME]  Period covered: YA [X] to YA [Y]                   │
├─────────────────────────────────────────────────────────────────────────┤
│ EXPOSURE (errors against client — LHDN could assess)                    │
├───┬──────────────────────────────┬────────┬──────────┬──────────────────┤
│ # │ Error                        │ YA     │ Tax + Pen│ Within statute?  │
├───┼──────────────────────────────┼────────┼──────────┼──────────────────┤
│ 1 │ [Description]                │ [YA]   │ RM XXX   │ Yes/No           │
│ 2 │ [Description]                │ [YA]   │ RM XXX   │ Yes/No           │
├───┴──────────────────────────────┴────────┴──────────┴──────────────────┤
│ TOTAL EXPOSURE:                              RM XXX                      │
│ WITHIN STATUTE (actionable by LHDN):         RM XXX                      │
├─────────────────────────────────────────────────────────────────────────┤
│ OPPORTUNITY (errors for client — refund via s.77B)                       │
├───┬──────────────────────────────┬────────┬──────────┬──────────────────┤
│ # │ Missed claim                 │ YA     │ Refund   │ Within s.77B?    │
├───┼──────────────────────────────┼────────┼──────────┼──────────────────┤
│ 1 │ [Description]                │ [YA]   │ RM XXX   │ Yes/No           │
│ 2 │ [Description]                │ [YA]   │ RM XXX   │ Yes/No           │
├───┴──────────────────────────────┴────────┴──────────┴──────────────────┤
│ TOTAL REFUND OPPORTUNITY:                    RM XXX                      │
│ WITHIN s.77B (can still amend):              RM XXX                      │
├─────────────────────────────────────────────────────────────────────────┤
│ CARRY-FORWARD CORRECTIONS                                               │
├───┬──────────────────────────────┬──────────────────┬───────────────────┤
│ # │ Item                         │ Per prior agent   │ Corrected         │
├───┼──────────────────────────────┼──────────────────┼───────────────────┤
│ 1 │ Unabsorbed losses b/f        │ RM XXX           │ RM XXX            │
│ 2 │ Unabsorbed CA b/f            │ RM XXX           │ RM XXX            │
│ 3 │ Loss memorandum (per year)   │ [detail]         │ [corrected]       │
├───┴──────────────────────────────┴──────────────────┴───────────────────┤
│ RECOMMENDATIONS                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. [Specific action: voluntary disclosure / amended return / do nothing]│
│ 2. [Specific action]                                                    │
│ 3. [Specific action]                                                    │
│ Client meeting agenda: [summarise what to discuss with client]           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 5: Transition Actions

```
ADMINISTRATIVE:
  □ File Form CP600B (change of agent) with LHDN
  □ Confirm client's TIN, branch, and filing status
  □ Set up file structure (physical and digital)
  □ Diarise all upcoming deadlines (Form C, CP204, WHT)
  □ Brief client on findings — exposure + opportunities

CORRECTIVE (if errors found):
  □ For exposure within statute: voluntary disclosure? (penalty 15-35% vs 100%+ if caught)
  □ For opportunities within s.77B: file amended returns for refund
  □ For carry-forward errors: correct from CURRENT year forward (note correction in computation)

ONGOING:
  □ Correct CA schedule (proper baseline for future computations)
  □ Correct loss memorandum (proper quantum and expiry dates)
  □ Establish proper TP documentation (if related-party transactions exist)
  □ Implement proper WHT tracking (if NR payments exist)
  □ Set up proper entertainment log (if material entertainment claims)
```

---

## The Statute of Limitations

```
LHDN TIME LIMITS:

NORMAL CASES:
  Assessment must be made within 5 YEARS from return due date [s.91(1)]
  Example: YA 2020 Form C due 31 July 2021 → LHDN can assess until 31 July 2026

FRAUD / WILFUL DEFAULT / NEGLIGENCE [s.91(3)]:
  NO TIME LIMIT. LHDN can assess ANY year, going back indefinitely.
  "Negligence" is broadly interpreted.

AMENDED RETURNS [s.77B]:
  Taxpayer can file amended return within 5 YEARS from date return was DUE
  (Not from date of filing — from date it was REQUIRED to be filed)
  
PRACTICAL IMPLICATION:
  For a takeover review, check which years are:
  - Within 5 years (both exposure and opportunity exist)
  - Beyond 5 years but no fraud (exposure gone, opportunity gone)
  - Beyond 5 years with suspected fraud (exposure remains — LHDN has no limit)
```

---

## NEVER

- Accept prior agent's carry-forward figures at face value (VERIFY everything)
- File current year computation using prior agent's incorrect baseline without correcting it
- Ignore exposure just because it's "the prior agent's fault" (client is liable, not the agent)
- Recommend voluntary disclosure without quantifying the penalty saving vs doing nothing
- Assume errors are always against the client (prior agents miss deductions too — find the refunds)
- Forget the 5-year s.77B window (every month of delay = one month closer to losing the refund)
- Skip the shareholder continuity check (if shares changed hands and losses were still claimed, that's a ticking bomb)
- Tell the client their prior agent was "bad" without specific, documented, quantified findings
