# Tax Computation Workflow — What a Tax Agent Actually Does

This is the real-world, step-by-step workflow of preparing a Malaysian tax computation for a company (Sdn Bhd) from engagement to submission. The same general flow applies to all entity types with minor variations.

---

## PHASE 1: ENGAGEMENT & DOCUMENT COLLECTION

### What the tax agent receives from the client (or the client's accountant):

1. **Audited/management financial statements** (P&L, Balance Sheet, notes)
2. **Trial balance** (detailed — this is the real working document)
3. **Fixed asset register** (showing all assets, dates acquired, costs, depreciation)
4. **Prior year tax computation** (last year's submitted comp, to check consistency)
5. **Prior year Form C / tax return** (to know what was filed before)
6. **CP204 estimate** (what monthly instalments were paid this year)
7. **Bank statements** (sometimes, for verifying interest income)
8. **Invoices / supporting docs** for specific items if needed
9. **Directors' information** (for filing Form C)
10. **SSM company profile** (to confirm paid-up capital, shareholders — for SME status check)

### For Partnerships additionally:
- Partnership deed (profit sharing ratio)
- Partners' details (IC numbers, tax reference numbers)

### For Sole Proprietors additionally:
- Personal income details (employment income, rental, etc.)
- Relief claim documents (medical receipts, SSPN statements, insurance policies)

---

## PHASE 2: PRELIMINARY REVIEW

Before touching the computation, the tax agent reviews:

### 2.1 Check SME Status (Sdn Bhd)
```
□ What is the paid-up capital? (look at SSM profile or Balance Sheet equity)
□ What is the gross business income? (look at P&L revenue line)
□ Who are the shareholders? (check for corporate shareholders >RM2.5m capital)
□ Any foreign ownership > 20%?
→ This determines whether you apply 15%/17%/24% or flat 24%
```

### 2.2 Review the P&L Structure
```
□ What are the revenue streams? (multiple business sources?)
□ Any non-business income? (interest, rental, dividend — these are separate sources)
□ What's the net profit figure? (this is your starting point)
□ Any unusual/large one-off items? (gains on disposal, write-offs, impairments)
```

### 2.3 Review the Trial Balance
```
□ Compare TB totals to financial statements (must tie)
□ Identify accounts that will need adjustment:
  - Any "provision" accounts → likely add-back
  - Depreciation accounts → definitely add-back
  - Entertainment accounts → 50% add-back (or check for 100% items)
  - Donation accounts → check if approved body
  - Legal fees → check capital vs revenue
  - Motor vehicle accounts → check QE cap
  - Interest accounts → check if business-related
  - Forex accounts → check trade vs non-trade
  - Directors' fees/remuneration → check if reasonable
  - Bad debt accounts → specific or general?
```

### 2.4 Review Prior Year Computation
```
□ Any brought-forward losses? (how many years remaining of the 10-year limit?)
□ Any unabsorbed capital allowances? (from same source?)
□ What was the CA residual expenditure? (this carries into this year)
□ Any incentives claimed? (Pioneer, ITA, RA — still running?)
□ Any items under query from LHDN? (audit issues?)
```

---

## PHASE 3: PREPARE THE TAX COMPUTATION

This is the actual work product. It's typically done in Excel.

### 3.1 The Tax Computation Layout (what gets produced)

A complete tax comp for a Sdn Bhd has these worksheets/sections:

```
SHEET 1: TAX COMPUTATION (main)
─────────────────────────────────
Company: XYZ Sdn Bhd (123456-X)
YA: 2026
Basis Period: 1 January 2025 to 31 December 2025
Tax Rate: SME / Standard

                                              RM          RM
Net profit per accounts                                XXX,XXX

Add: Non-allowable expenses
  Depreciation                               XX,XXX
  Entertainment (50% of RM XX,XXX)           XX,XXX
  General provision for doubtful debts       XX,XXX
  Donation (non-approved)                    XX,XXX
  Penalty/fine                               XX,XXX
  Motor vehicle expenses (excess)            XX,XXX
  [... every add-back item listed]           XX,XXX
                                                       ───────
                                                       XX,XXX

Less: Non-taxable income
  Exempt dividend                           (XX,XXX)
  Over-provision brought back               (XX,XXX)
                                                       ───────
                                                      (XX,XXX)

ADJUSTED INCOME                                        XXX,XXX

Less: Capital allowances (Schedule 3)
  Current year (per CA schedule)            (XX,XXX)
  B/F unabsorbed CA utilised                (XX,XXX)
                                                       ───────
                                                      (XX,XXX)

STATUTORY INCOME — Business                            XXX,XXX

Add: Other income
  Interest income (s.4(c))                   XX,XXX
  Rental income (s.4(d))                     XX,XXX
                                                       ───────
TOTAL STATUTORY INCOME                                 XXX,XXX

Less: Approved donation u/s 44(6)
  (restricted to 10% of aggregate income)   (XX,XXX)
Less: Zakat u/s 44(11A)
  (restricted to 2.5% of aggregate income)  (XX,XXX)
                                                       ───────
AGGREGATE INCOME                                       XXX,XXX

Less: Current year loss u/s 44(2)           (XX,XXX)
Less: B/F losses u/s 44(5A)                 (XX,XXX)
                                                       ───────
CHARGEABLE INCOME                                      XXX,XXX
                                                       ═══════

TAX COMPUTATION:
  First RM150,000 × 15%                      22,500
  Next RM450,000 × 17%                       76,500
  Balance RM XXX,XXX × 24%                   XX,XXX
                                            ────────
TAX CHARGED                                  XX,XXX

Less: Section 110 tax credit                (XX,XXX)
Less: CP204 instalments paid                (XX,XXX)
                                            ────────
TAX PAYABLE / (REFUNDABLE)                   XX,XXX
                                            ════════
```

### 3.2 Capital Allowance Schedule

```
SHEET 2: CAPITAL ALLOWANCE SCHEDULE
────────────────────────────────────
Company: XYZ Sdn Bhd
YA: 2026

Asset Description | Date    | Cost   | QE     | IA   | AA   | Residual | Residual
                  | Acquired| (RM)   | (RM)   | (RM) | (RM) | b/f (RM) | c/f (RM)
──────────────────┼─────────┼────────┼────────┼──────┼──────┼──────────┼─────────
Motor vehicle     | 15.3.23 | 180,000| 100,000|   —  |20,000| 40,000   | 20,000
(QE capped)       |         |        |        |      |      |          |
                  |         |        |        |      |      |          |
Office furniture  | 1.6.24  | 15,000 | 15,000 |   —  | 1,500| 10,500   | 9,000
                  |         |        |        |      |      |          |
Computer (new)    | 10.1.26 | 8,000  | 8,000  | 1,600| 3,200|    —     | 3,200
(Budget 2026 ACA) |         |        |        |20%   |40%   |          |
                  |         |        |        |      |      |          |
Small value items | various | 12,000 | 12,000 |   —  |12,000|    —     |    —
(6 items × <RM2k) |         |        |        |      |100%  |          |
──────────────────┼─────────┼────────┼────────┼──────┼──────┼──────────┼─────────
TOTAL CA THIS YEAR                            | 1,600|36,700|          |
                                              └──────┴──────┘
CA utilised (restricted to adjusted income):  38,300
Unabsorbed CA c/f:                                 0
```

### 3.3 Schedule of Add-Backs

```
SHEET 3: SCHEDULE OF NON-ALLOWABLE EXPENSES
──────────────────────────────────────────────
#  | Account Code | Description                        | Amount (RM) | Reason
───┼──────────────┼────────────────────────────────────┼─────────────┼────────────
1  | 6100         | Depreciation — motor vehicle       | 45,000      | s.39(1)(c)
2  | 6101         | Depreciation — office equipment    | 8,200       | s.39(1)(c)
3  | 6200         | Provision for doubtful debts       | 15,000      | s.39(1)(m)
4  | 6310         | Entertainment — client meals       | 4,250       | s.39(1)(l) 50%
5  | 6400         | Donation — political               | 5,000       | Not approved
6  | 6500         | Penalty — late SST payment         | 1,200       | s.39(1)(b)
7  | 6600         | Legal fees — share transfer        | 8,000       | Capital nature
───┴──────────────┴────────────────────────────────────┴─────────────┴────────────
TOTAL ADD-BACKS                                         | 86,650
```

---

## PHASE 4: REVIEW & QUERY RESOLUTION

### 4.1 Tax Agent Reviews Their Own Work
```
□ Does adjusted income make sense relative to net profit?
□ Are all depreciation charges added back?
□ Is the CA schedule reconciled to the fixed asset register?
□ Do the B/F losses/CA from prior year match what was filed?
□ Is the donation cap correctly applied?
□ Are there any transactions with non-residents? (WHT check)
□ Has the SME status been correctly determined?
```

### 4.2 Queries to Client
Common questions sent back to client:
```
- "What is the nature of the RM50,000 legal fees? Was it for an asset acquisition?"
- "Can you confirm the bad debt of RM30,000 was specifically written off? Do you have the debtor details?"
- "Was the motor vehicle used 100% for business, or partly personal?"
- "These training expenses — were they at an approved institution? Do you have the HRDF cert?"
- "This donation of RM10,000 — was it to a Section 44(6) approved body? Do you have the tax-deductible receipt?"
- "Can you confirm no payments were made to non-resident consultants/service providers?"
```

### 4.3 Client Responds, Agent Finalises
- Adjust the computation based on answers
- Some items may change from "add-back" to "allowable" (or vice versa) based on documentation

---

## PHASE 5: PREPARE THE TAX RETURN (Form C)

### 5.1 What is Form C?

Form C is the official LHDN tax return. It's a structured form with specific fields. The tax agent transfers numbers FROM the tax computation INTO the form fields.

### 5.2 Key Sections of Form C

```
PART A: Company particulars
  - Company name, registration no, tax reference no
  - Business code (MSIC)
  - Basis period (from-to)
  - Accounting currency
  - Paid-up capital

PART B: Income
  - Business adjusted income
  - Dividend income
  - Interest income
  - Rental income
  - Other income

PART C: Deductions and reliefs
  - Capital allowances claimed
  - Losses utilised
  - Approved donations
  - Zakat

PART D: Tax computation
  - Chargeable income
  - Tax rate applied
  - Tax charged
  - Tax credits (s.110, s.132)
  - Instalments paid (CP204)
  - Tax payable / refundable

PART E: Additional information
  - Details of related party transactions
  - Transfer pricing documentation status
  - Tax incentives claimed
  - WHT obligations

PART F: Declaration
  - Signed by director
  - Certified by tax agent (if filed by agent)
```

### 5.3 The Tax Agent's Working Papers

Besides Form C, the tax agent keeps:
- The full tax computation (Excel)
- Capital allowance schedule
- Add-back schedule with references
- Copy of audited accounts
- Client query correspondence
- Prior year computation (for comparison)
- Any LHDN correspondence

These are NOT submitted to LHDN but must be kept for 7 years in case of audit.

---

## PHASE 6: CLIENT SIGN-OFF

```
1. Tax agent sends to client:
   - Draft tax computation
   - Summary of tax position (how much tax to pay/refund)
   - Comparison vs prior year and vs CP204 estimate
   - Alert if underestimation penalty may apply

2. Client reviews and approves (or raises questions)

3. Director signs the declaration section of Form C
   (or authorises the tax agent to sign under Form CP55)
```

---

## PHASE 7: E-FILING SUBMISSION

### 7.1 How Filing Works

```
1. Tax agent logs into MyTax portal (https://mytax.hasil.gov.my)
   - Using the TAX AGENT's login (not the company's)
   - Tax agent must be registered with LHDN and have valid licence

2. Select the client company

3. Fill in Form C online OR upload the form
   - Transfer all numbers from the tax computation
   - System validates basic checks (totals must tie)

4. Attach supporting documents (if required by system)

5. Submit electronically
   - System generates acknowledgement receipt
   - Receipt = proof of filing + deemed date of assessment

6. Print/save the acknowledgement
```

### 7.2 Deadlines

```
FORM C (Sdn Bhd, PLT, Cooperative, CLG):
  Due: 7 months from FYE
  Example: FYE 31 Dec 2025 → due 31 July 2026

FORM P (Partnership):
  Due: 30 June of following year

FORM B (Sole Proprietor — with business income):
  Due: 30 June of following year
  (Note: 30 April if NO business income — Form BE)

FORM TF (Club/Association/Trade Association):
  Due: 7 months from accounting period close
```

### 7.3 Tax Payment

```
IF tax payable (balance after CP204 instalments):
  - Due on SAME date as Form C deadline
  - Pay via: online banking, FPX, cheque to LHDN
  - Late payment: 10% penalty immediately; further 5% after 60 days

IF tax refundable:
  - LHDN processes refund (can take 2-12 months in practice)
  - Refund credited to company's bank account on file with LHDN
```

---

## PHASE 8: CP204 FOR NEXT YEAR

Immediately after filing, the tax agent must also handle the next year's estimate:

### 8.1 What is CP204?

CP204 = the company's ESTIMATE of tax payable for the NEXT year. LHDN uses this to collect tax monthly in advance.

### 8.2 Workflow

```
1. Estimate next year's taxable profit
   (usually based on current year actual ± growth/decline expectations)

2. Calculate estimated tax payable

3. Divide by number of instalments (usually 12)

4. Submit CP204 form to LHDN
   - Due: 30 days BEFORE the start of the next basis period
   - Example: FYE Dec → CP204 for YA 2027 due by 1 December 2026

5. Company pays monthly instalments starting from month 2 of basis period
```

### 8.3 Revision (CP204A)

```
Month 6: Can revise UP or DOWN
Month 9: Can ONLY revise UP

If actual tax exceeds estimate by > 30%:
  → 10% penalty on the excess beyond 30%
```

---

## PHASE 9: POST-FILING

### 9.1 LHDN Audit Risk
```
LHDN may audit the company within 5 years of filing (no limit if fraud).
Common audit triggers:
  - Large fluctuation in profit vs prior year
  - Consistently claiming high deductions
  - Transfer pricing with related parties
  - First year claiming incentives
  - Random selection
```

### 9.2 Record Retention
```
ALL records must be kept for 7 YEARS from the date of filing:
  - Tax computation working papers
  - Supporting invoices/receipts for add-back decisions
  - Capital allowance schedule with asset documentation
  - Partnership allocation workings (Form CP30)
  - Bank statements, contracts, agreements
  - Correspondence with LHDN
```

---

## VARIATIONS BY ENTITY TYPE

### Partnership (Form P) — Additional Steps

```
After computing PAI and divisible income:

1. Prepare Form CP30 (allocation statement) for each partner
2. Issue CP30 to each partner (they need it for their own filing)
3. File Form P by 30 June
4. Each partner uses CP30 to file their OWN Form B or Form C
```

### Sole Proprietor (Form B) — Additional Steps

```
1. Gather personal income details (not just business):
   - Employment income (EA form from employer)
   - Rental income (tenancy agreements, expenses)
   - Interest/dividend income (bank statements)

2. Gather relief claim documents:
   - Medical receipts (parents, self/spouse/child)
   - Insurance policies (life, education, medical)
   - EPF statement (annual contribution)
   - SSPN statement
   - Receipt for EV charger / composting machine
   - Childcare/kindergarten receipts
   - Course fee receipts (self-education)
   - Zakat payment receipt

3. Compute total income from ALL sources
4. Apply personal reliefs
5. Compute tax at progressive rates
6. Apply zakat rebate
7. File Form B by 30 June
```

### NGO/Club (Form TF) — Additional Steps

```
1. Classify EVERY income line as member vs non-member
2. Apportion common expenses using formula
3. Check Section 44(6) approval status
4. Verify 50% spending rule compliance
5. File Form TF (even if fully exempt)
```

---

## TIMELINE SUMMARY (Sdn Bhd, FYE 31 December)

```
Jan-Mar:  Accounts being prepared by accountant/auditor
Mar-Apr:  Audited accounts finalised, received by tax agent
Apr-May:  Tax agent prepares tax computation
May-Jun:  Client review, queries resolved
Jun-Jul:  Finalise, get sign-off, prepare Form C
July:     File Form C + pay balance tax (DEADLINE: 31 July)
Nov:      CP204 for next year due (by 1 December)
Monthly:  CP204 instalments paid throughout the year
```

---

## WHAT THE AI AGENT NEEDS TO REPLICATE

The AI agent replaces the manual work in Phases 2-5:

```
INPUT:
  - Trial balance (or P&L + BS)
  - Fixed asset register
  - Prior year computation (for B/F items)
  - Entity details (paid-up capital, shareholders, registration type)
  - Answers to standard queries (nature of specific items)

PROCESSING:
  - Classify entity type
  - Determine tax rate
  - Map each TB account to tax treatment (allowable/add-back/exempt)
  - Compute adjusted income
  - Compute capital allowances
  - Apply loss rules
  - Calculate tax

OUTPUT:
  - Complete tax computation (formatted)
  - Capital allowance schedule
  - Add-back schedule with section references
  - Filing summary (form type, deadline, amount payable)
  - Flagged items requiring human judgment
  - CP204 estimate recommendation for next year
```

The human practitioner still handles:
- Client relationship and engagement
- Judgment calls on ambiguous items (repair vs improvement, etc.)
- Final review and sign-off
- Physical submission to LHDN portal
- Dealing with LHDN audits/queries
