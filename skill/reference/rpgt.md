# RPGT — Real Property Gains Tax

Compute RPGT liability on disposal of real property or shares in a real property company (RPC). Covers all entity types, holding periods, exemptions, and the income tax vs RPGT boundary.

---

## Jurisdiction

RPGT is governed by the **Real Property Gains Tax Act 1976 (RPGTA)** — completely separate from the ITA 1967. Different legislation, different rates, different filing, different penalties.

---

## Scope of Charge

### What triggers RPGT

```
CHARGEABLE ASSET [Schedule 2, RPGTA]:
  (a) Real property situated in Malaysia
  (b) Shares in a Real Property Company (RPC)

CHARGEABLE PERSON: Any person (individual, company, trust, partnership, non-resident)
  disposing of a chargeable asset

DISPOSAL includes:
  - Sale
  - Gift (deemed disposal at MV)
  - Compulsory acquisition
  - Transfer between connected persons (deemed MV)
  - Transfer to/from partnership
  - Distribution in specie
  - Part disposal (apportionment of acquisition price)
```

### What does NOT trigger RPGT

```
EXEMPT DISPOSALS:
  □ Transfer between spouses [Para 12(1)(a), Schedule 2]
  □ Transfer to a company in exchange for shares (≥75% holding) [Para 12(1)(b)]
  □ Transfer between companies in the same group [Para 12(1)(c)] — 75% control
  □ Gift to government, state, local authority [Para 12(1)(d)]
  □ Gift to approved charitable institution [Para 12(1)(e)]
  □ Compulsory acquisition under any written law (by ≤ 1 Jan 2022: exempt; after: taxable)
  □ Disposal of private residence (once-in-a-lifetime exemption below)
```

---

## Rates by Holding Period and Entity Type

### Individuals (Malaysian citizen or PR)

| Holding period | Rate |
|---------------|------|
| Within 3 years | 30% |
| In the 4th year | 20% |
| In the 5th year | 15% |
| In the 6th year and thereafter | 0% |

### Individuals (Non-citizen, non-PR)

| Holding period | Rate |
|---------------|------|
| Within 5 years | 30% |
| In the 6th year and thereafter | 10% |

### Companies (Malaysian-incorporated)

| Holding period | Rate |
|---------------|------|
| Within 3 years | 30% |
| In the 4th year | 20% |
| In the 5th year | 15% |
| In the 6th year and thereafter | 10% |

### Companies (foreign-incorporated)

| Holding period | Rate |
|---------------|------|
| Within 5 years | 30% |
| In the 6th year and thereafter | 10% |

### Trustees / Executors

Same as individual (citizen) rates if beneficiary is a citizen/PR.

---

## Holding Period Computation

```
ACQUISITION DATE:
  - Contract date (date of agreement), NOT completion/settlement date
  - If conditional contract: date condition is fulfilled
  - If inherited: date of DEATH of deceased (not probate date)
  - If gift: date of gift (not registration date)
  - If Para 12 exempt transfer: ORIGINAL acquisition date carries through

DISPOSAL DATE:
  - Contract date of sale agreement
  - If compulsory acquisition: date of gazette notification

COUNTING:
  - "Within 3 years" = disposed on or before the 3rd anniversary of acquisition
  - "In the 4th year" = disposed after 3rd anniversary but on or before 4th
  - "6th year and thereafter" = disposed after the 5th anniversary
```

---

## Computation of Gain

```
DISPOSAL PRICE (or Market Value if connected persons)          RM XXX
Less: ACQUISITION PRICE                                       (RM XXX)
Less: INCIDENTAL COSTS of acquisition                         (RM XXX)
      - Legal fees, stamp duty, valuation fees, agent commission
Less: INCIDENTAL COSTS of disposal                            (RM XXX)
      - Legal fees, agent commission, advertising
Less: ENHANCEMENT EXPENDITURE [Para 4, Schedule 2]            (RM XXX)
      - Capital expenditure to enhance value (renovations, extensions)
      - Must be reflected in the state of the property at disposal
      - Running repairs / maintenance do NOT qualify
= CHARGEABLE GAIN                                              RM XXX

Less: EXEMPTIONS (see below)                                  (RM XXX)
= NET CHARGEABLE GAIN                                          RM XXX

× RATE (per holding period and entity type)                    = TAX
```

### Connected persons — Market Value rule

```
CONNECTED PERSONS [Schedule 2, Para 2]:
  - Husband and wife
  - Parent and child (including stepchild, adopted child)
  - Person and company controlled by them (>50% voting power)
  - Companies under common control
  - Trustees and settlor/beneficiaries
  - Partners in a partnership

IF disposal between connected persons:
  → Deemed disposal at MARKET VALUE (not actual consideration)
  → Exception: Para 12 exempt transfers (spouse, group, share exchange)
```

### Part disposal

```
IF only PART of the property is disposed:
  Allowable acquisition price = Total acquisition price × (A / (A + B))
  Where:
    A = disposal price of the part disposed
    B = market value of the part RETAINED at date of disposal
```

---

## Exemptions

### Once-in-a-lifetime exemption (individuals only)

```
CONDITIONS:
  □ Disposal of a PRIVATE RESIDENCE
  □ Individual is a Malaysian citizen
  □ The property was the individual's dwelling place
  □ Elected ONCE in lifetime (irrevocable)

EFFECT: Entire gain is EXEMPT from RPGT

"PRIVATE RESIDENCE" = property where the individual ordinarily resides.
Only ONE property can be the private residence at any time.
```

### RM10,000 or 10% exemption (individuals only)

```
FOR EVERY disposal by an individual (whether or not once-in-a-lifetime is used):
  Exempt amount = HIGHER of:
    (a) RM10,000; or
    (b) 10% of chargeable gain

This applies AUTOMATICALLY to every disposal. It is NOT the once-in-a-lifetime exemption.
```

### No gain no loss transfers

Para 12 transfers (spouse, group, share-for-share):
- No gain/no loss in transferor's hands
- Transferee inherits original acquisition price and date
- Effect: tax is DEFERRED, not eliminated

---

## Real Property Company (RPC)

### Definition [Para 34A, Schedule 2]

```
A CONTROLLED COMPANY is an RPC if:
  - At any time in the 3 years preceding disposal of shares, OR
  - At the date of acquisition of shares:

  The defined value of real property owned by the company (including
  subsidiaries) ≥ 75% of the value of the company's total tangible assets

DEFINED VALUE = market value of real property
TOTAL TANGIBLE ASSETS = all assets EXCEPT:
  - Cash and deposits with financial institutions
  - Shares/bonds/debentures in non-RPC companies
```

### RPC share disposal

```
IF company is RPC AND shares are disposed:
  → Disposal of shares is deemed disposal of "chargeable asset"
  → RPGT applies (not income tax, not CGT)
  → Gain computed on shares, not underlying property
  → Holding period = period shares were held (NOT property holding period)
```

### RPC planning considerations

- Company that was NOT an RPC at acquisition but BECOMES one (property values increase, other assets disposed): RPGT may now apply to share disposal
- Company that IS an RPC: consider reducing property proportion below 75% before share sale (add non-property tangible assets)
- BUT: anti-avoidance — artificial asset additions close to disposal date may be challenged

---

## RPGT vs Income Tax (The Boundary)

```
IS THE DISPOSAL A BUSINESS TRANSACTION?

Badges of trade test:
  □ Frequency of transactions (multiple property flips = trade)
  □ Period of ownership (very short = indicative of trade)
  □ Method of finance (short-term borrowing to flip = trade)
  □ Motive at acquisition (bought to resell = trade)
  □ Organisation of activity (systematic = trade)
  □ Supplementary work (renovate to resell = trade)
  □ Connection with existing trade (property developer = trade)

IF YES → s.4(a) ITA 1967 (business income at 24%)
IF NO  → RPGTA 1976 (RPGT at holding-period rates)

KEY: Property developers are ALWAYS under income tax for their trading stock.
     RPGT applies only to investment properties / capital assets.
```

---

## Filing and Payment

```
DISPOSAL:
  → Form CKHT 1A (individual) or CKHT 1B (company) within 60 DAYS of disposal date
  → Payment: within 60 days of disposal

RETENTION SUM:
  → Purchaser MUST retain from purchase price:
     - 3% for Malaysian citizen/PR disposer
     - 7% for non-citizen/non-PR/company disposer
  → Remit to LHDN within 60 days of disposal
  → This is a WITHHOLDING mechanism (not the final tax)
  → Excess retention refunded after assessment; shortfall payable by disposer

PENALTY FOR LATE FILING: RM2,000 or imprisonment ≤ 6 months [s.29(2)]
PENALTY FOR NON-PAYMENT: 10% increase on tax due [s.23]
```

---

## Stamp Duty Interaction

On every property disposal:
- Purchaser pays stamp duty (ad valorem) on the instrument of transfer (MOT)
- Stamp duty is an INCIDENTAL COST OF ACQUISITION for the purchaser (deductible in future RPGT computation)
- Seller's legal fees and agent commission are INCIDENTAL COSTS OF DISPOSAL (deductible in current RPGT computation)

---

## Output Format

```
┌─────────────────────────────────────────────────────────────────┐
│ RPGT COMPUTATION                                                │
│ Disposer: [NAME]  Type: [Individual/Company/Non-resident]       │
│ Property: [ADDRESS/DESCRIPTION]                                 │
├─────────────────────────────────────────────────────────────────┤
│ Acquisition date: [DATE]  Disposal date: [DATE]                 │
│ Holding period: [X years Y months]  Band: [within 3yr/4th/etc]  │
│ Rate: [XX%]                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Disposal price / MV                           RM XXX            │
│ Less: Acquisition price                      (RM XXX)           │
│ Less: Incidental costs (acquisition)         (RM XXX)           │
│ Less: Incidental costs (disposal)            (RM XXX)           │
│ Less: Enhancement expenditure                (RM XXX)           │
│ = Chargeable gain                             RM XXX            │
│ Less: Exemption (RM10k or 10%)               (RM XXX)           │
│ = Net chargeable gain                         RM XXX            │
│ RPGT at [XX%]                                 RM XXX            │
├─────────────────────────────────────────────────────────────────┤
│ Retention sum (3%/7% of disposal price)       RM XXX            │
│ Balance payable / (refundable)                RM XXX            │
│ Filing deadline: [60 days from disposal]      [DATE]            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Edge Cases and Traps

```
 1. RPC TEST: Run at BOTH acquisition and disposal. Company can become RPC after acquisition.
 2. INHERITED PROPERTY: Acquisition date = date of death. Acquisition price = MV at death.
 3. JOINT OWNERSHIP: Each co-owner computes gain on their share separately.
 4. FOREIGN CURRENCY: Convert at exchange rate on date of disposal.
 5. CONNECTED PERSONS: Even gifts are deemed at MV — can create tax liability with no cash.
 6. ONCE-IN-LIFETIME: Must ELECT formally. Not automatic. Cannot change election later.
 7. DEVELOPERS: All stock-in-trade properties are income tax, not RPGT. Only investment properties.
 8. NOMINEE: Beneficial owner is the chargeable person, not the nominee.
 9. CONDITIONAL CONTRACT: Holding period runs from date condition FULFILLED, not contract date.
10. PARA 12 GROUP: Must maintain 75% control for 3 years after transfer, else deemed disposal.
```

---

## NEVER

- Compute RPGT without determining whether the disposal is income tax or RPGT (badges of trade test)
- Assume holding period starts from registration date (it's contract date)
- Forget the automatic RM10k/10% exemption on individual disposals
- Ignore the RPC test when shares in property-owning companies are disposed
- Apply citizen rates to a non-citizen/non-PR individual
- Forget that connected-person transfers are deemed at MV even if no cash changes hands
- Skip the retention sum calculation (this is what the PURCHASER must do)
