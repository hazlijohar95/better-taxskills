# Tax Strategy — Optimisation by Company Stage

Analyse the entity's profit position and produce stage-specific tax planning recommendations. Strategy is not generic advice — it is quantified, actionable, and bounded by anti-avoidance law.

This command requires the same preflight gates as `compute`. You need actual financials to produce real strategy. "What should a typical Sdn Bhd do?" is not a valid input.

---

## Stage Classification

Determine the company's stage from its current and projected position:

```
INPUTS REQUIRED:
  - Current YA adjusted income (or loss)
  - Unabsorbed losses b/f (quantum + year of origin)
  - Unabsorbed CA b/f
  - Projected profitability (next 3-5 years, if client provides)
  - Current incentive status (PS/ITA/RA in force?)
  - Group structure (if any)

CLASSIFICATION:
  Loss-Making   → Adjusted loss in current YA OR cumulative unabsorbed losses > 2× current income
  Breakeven     → Adjusted income ~NIL (within ±10% of zero after CA) OR oscillating profit/loss
  Profitable    → Stable positive chargeable income, CI ≤ RM5m
  Super-Profit  → Chargeable income > RM5m, or effective tax > RM1m/year
```

Do NOT classify from revenue or turnover. A RM50m revenue company with RM200k CI is "Breakeven", not "Super-Profit".

---

## STAGE 1: LOSS-MAKING

### Priority: Preserve losses, prevent expiry, maintain activity

The 10-year clock is the single most important constraint. Every strategy must be evaluated against: "Does this help use the losses before they expire?"

### 1.1 Loss Utilisation Hierarchy

```
STEP 1: Current-year loss offsets ALL sources of statutory income [s.44(2)]
        → Rental, interest, royalty — all consumed first
        → This is MANDATORY. Cannot elect to preserve current-year loss.

STEP 2: Excess loss carries forward up to 10 consecutive YAs [s.44(5F)]
        → Clock starts from YA loss ARISES (not from when carry-forward begins)
        → Pre-2019 losses: carry forward until YA 2028 [Finance Act 2018, s.11]

STEP 3: B/F loss offsets business income ONLY [s.44(5A)]
        → Cannot offset rental/interest/dividend income in carry-forward years
        → Only business source (s.4(a)) — not other income sources
```

### 1.2 The CA vs Loss Asymmetry

| Item | Time limit | Implication |
|------|-----------|-------------|
| Unabsorbed adjusted loss | 10 years from YA of origin | Expires permanently |
| Unabsorbed capital allowances | INDEFINITE | Never expires |

**Decision framework:**

```
IF losses approaching expiry (year 7-10) AND company has current income:
  → MAXIMISE CA claims this year
  → CA creates unabsorbed CA (infinite shelf life)
  → Current income absorbs the expiring losses instead

IF losses have many years remaining (year 1-5) AND no certainty of future profits:
  → MINIMISE CA claims (IA is mandatory; AA can be deferred by election)
  → Preserve CA for profitable years
  → Do NOT convert infinite-life CA into 10-year-life losses

IF company is certain profits will return within remaining loss years:
  → Standard approach: claim CA normally, losses will absorb naturally
```

**Critical:** Annual allowance election is per asset per year [PR 12/2014]. Initial allowance is NOT electable — given in year asset first used. Plan asset purchases with this in mind.

### 1.3 Group Relief [s.44A]

Available only if ALL conditions met simultaneously:

| # | Condition | Check |
|---|-----------|-------|
| 1 | Surrendering company in first 3 YAs of business | Count from commencement date |
| 2 | 70% ordinary share ownership (direct/indirect) | Through MY-incorporated entities only |
| 3 | Both companies paid-up capital > RM2.5m | Excludes most SMEs |
| 4 | Same financial year end | Exact match required |
| 5 | Neither company under any tax incentive | No PS/ITA/RA/ACA |
| 6 | Maximum 70% of adjusted loss surrenderable | 30% permanently in surrendering co |
| 7 | Only ADJUSTED LOSS (not CA) | CA cannot transfer between companies |
| 8 | Both companies MY-resident | |
| 9 | Election made in Form C of both companies | Formal joint election |
| 10 | Not a dormant company | |

**Planning for new subsidiaries expected to make losses:**
1. Set FYE identical to the profitable group company
2. Capitalise at > RM2.5m paid-up (even if cash returned as shareholder loan)
3. Do NOT apply for any incentive during group relief window
4. Maintain 70% ownership throughout

### 1.4 Shareholder Continuity [s.44(5A)-(5D)]

> Losses forfeited if shareholders on last day of basis period (when loss USED) are not "substantially the same" as on first day.

**"Substantially the same"** = LHDN interprets as > 50% by value remaining.

**Look-through rule [s.44(5C)]:** Corporate shareholders are deemed transparent — shares held by a company are treated as held by ITS shareholders. Prevents circumvention via interposition.

**Preservation strategies:**
- Stage share transfers: keep > 50% continuity at each year-end
- Complete all restructuring AFTER losses fully utilised
- Use share subscription (new shares) rather than transfer — dilution may not trigger continuity test
- Document commercial rationale for any change

**Same rule applies to unabsorbed CA [Para 75A-75C, Schedule 3].**

### 1.5 The Dormancy Trap

```
DORMANCY = no business activity, no gross income from business

CONSEQUENCES:
  - LHDN may deem business ceased
  - Upon cessation: all unabsorbed losses and CA crystallised and lost
  - Per PR 03/2021: dormant company cannot claim SVA
  - Shareholder change during dormancy + >50% change → ALL B/F items forfeited [Trap 12]

PREVENTION:
  □ Maintain MINIMAL activity (even nominal inter-company services)
  □ Continue filing Form C annually (even nil)
  □ Keep company "resident" (board meeting in Malaysia per year)
  □ Maintain SSM registration
  □ If valuable losses exist: generate minimal arm's-length activity
```

### 1.6 Entity Conversion Decision

```
SOLE PROP → SDN BHD (while in losses):
  Generally NOT advisable because:
  - Sole prop losses offset ALL individual income [s.44(2)] (employment, rental, etc.)
  - Sdn Bhd losses are trapped within company (no offset against director's other income)
  - Conversion crystallises BA/BC on transferred assets [unless s.37 applies]
  
  Exception: Convert IF:
  - Business will be profitable within 2-3 years
  - Long-term corporate benefits (liability, SME rates) outweigh immediate loss offset

SDN BHD → SOLE PROP (while in losses):
  Almost never advisable:
  - Striking off triggers final computation; losses die
  - No mechanism to transfer corporate losses to individual
  - BA/BC on asset disposal
```

### 1.7 Revenue vs Capital Classification

In a loss year, revenue treatment is generally PREFERABLE:
- Revenue expenditure = immediate deduction = increases current loss
- Capital expenditure = CA (potentially infinite carry-forward, but NO offset against other sources when carried forward)

**Legitimate classifications that increase revenue deductions:**
- Repairs: like-for-like replacement = revenue [s.33(1)]. Enhancement/upgrade = capital [s.39(1)(b)]
- Software: recurring licence = revenue. Perpetual licence = capital (but ACA may apply)
- Professional fees: relating to existing operations = revenue. Creating new structure = capital

**WARNING:** Deliberate mis-classification is tax evasion, not planning. The item's nature determines treatment — not the taxpayer's preference.

---

## STAGE 2: BREAKEVEN

### Priority: Tip into loss or tip into profit — deliberately, not accidentally

A breakeven company has the most planning flexibility because small timing shifts produce large relative changes in tax position.

### 2.1 The Tipping-Point Decision

```
QUESTION: Is it better to be slightly in loss or slightly in profit THIS year?

BETTER TO BE IN LOSS IF:
  - Losses created NOW carry forward 10 years (fresh clock)
  - Existing losses are NOT approaching expiry
  - Future years expected to be highly profitable (larger income to shelter)
  - CA claims can be deferred to preserve the loss position

BETTER TO BE IN PROFIT IF:
  - Existing B/F losses approaching expiry (year 8-10) → need income to absorb them
  - Company needs to show profitability (banking covenants, listing requirements)
  - CP204 estimate already submitted as positive → avoiding underestimation penalty
  - No strategic benefit to accumulating more losses
```

### 2.2 Budget 2026 ACA Window

**Window:** QCE incurred 11 October 2025 to 31 December 2026.
**Effect:** 20% IA + 40% AA = full write-off in ~2 years (vs 7-14 years normally).

**Qualifying expenditure:**
- Heavy machinery/plant from LOCAL manufacturers
- ICT equipment and computer software (no local-sourcing requirement)
- Software development/customisation costs

**Strategy for breakeven companies:**
- Pull forward planned 2027 capex to December 2026
- Even if CA cannot be fully absorbed immediately, unabsorbed CA carries forward indefinitely
- Finance the purchase if needed — interest cost < NPV of accelerated deduction
- Do NOT claim SVA (100% immediate) on items that qualify for ACA if the company is in a loss position — SVA wastes the deduction in a nil-income year

### 2.3 Expense Timing Levers

**Accelerate into current period (to create/increase loss):**

| Expense | Mechanism | Authority |
|---------|-----------|-----------|
| Staff bonus | Board resolution before FYE; pay within 2-3 months | s.33(1), case law — liability crystallises at resolution date |
| Repairs & maintenance | Complete and invoice before FYE | s.33(1) — "incurred" in basis period |
| Bad debt write-off | Board resolution + evidence of recovery attempts + accounting entry | s.34(2), PR 04/2019 |
| Professional fees | Engage and complete work before FYE | Revenue expenditure when incurred |
| Annual subscriptions | Pay before FYE (deductible when paid) | Revenue items deductible on payment basis |
| Stock write-off | Physical count + board approval + evidence of obsolescence | PR 02/2020 — specific identification required |

**Defer to next period (to preserve current income for loss absorption):**
- Delay non-urgent repairs to post-FYE
- Invoice revenue items before FYE (accelerate income recognition)
- Defer bonus declarations to subsequent year's board meeting

### 2.4 R&D Double Deduction Timing [s.34A]

- 200% deduction on approved R&D expenditure
- At breakeven: even modest R&D tips company into loss (fresh 10-year clock)
- Better to time R&D recognition in a year with SOME income — the double deduction creates a planned, controlled loss
- MOSTI approval required for in-house R&D — plan 6+ months ahead

### 2.5 Renovation Allowance Window Management

- RM300,000 cap per 3-year period (standard)
- RM500,000 cap for tourism operators (11 Oct 2025 - 31 Dec 2027)
- Track when the 3-year window resets
- Strategy: Phase large renovations to straddle two windows (Phase 1 end of current window, Phase 2 start of new window)
- If RA creates unabsorbed allowance that cannot carry forward: DEFER renovation to year with sufficient income

### 2.6 FYE Change Considerations

Changing FYE creates a straddle period with overlap formula [s.42(2)]:
- A × B/C (A = adjusted income, B = overlap period, C = basis period length)
- Can create temporary tax reduction in transition year

**When to consider:**
- Highly profitable period expected: short basis period = less income per YA
- Loss expected: extend basis period to push more income into pre-loss period

**Constraint:** Frequent changes (>1 per 3 years) attract LHDN scrutiny. s.140 applies if sole purpose is tax reduction.

---

## STAGE 3: PROFITABLE

### Priority: Minimise effective tax rate through legitimate deductions, accelerations, and rate optimisation

### 3.1 SME Rate Preservation

**Rates (YA 2025-2026):**
| Band | Rate |
|------|------|
| First RM150,000 | 15% |
| RM150,001 - RM600,000 | 17% |
| Above RM600,000 | 24% |

**ALL five conditions — failure on ANY ONE = flat 24%:**
1. Paid-up capital ≤ RM2.5m
2. Gross income from business ≤ RM50m
3. Not > 20% foreign-owned (directly or indirectly)
4. Not controlled by company with paid-up > RM2.5m (>50% ownership)
5. Does not control company with paid-up > RM2.5m (>50% ownership)

**Tax saving at SME rate vs flat 24%:**
- First RM150k: saves RM13,500 (9% differential)
- RM150k-600k: saves RM31,500 (7% differential)
- Total maximum SME benefit: RM33,600/year
- For companies with CI > RM5m, this is trivial (<0.7% of tax)

**Structuring note:** Issuing shares at premium is legitimate (premium ≠ paid-up capital). Share premium does NOT count toward the RM2.5m test.

### 3.2 Directors' Remuneration vs Dividends

**The crossover analysis:**

```
COMPANY DEDUCTION FOR REMUNERATION: 24% (or 15-17% SME)
INDIVIDUAL TAX ON REMUNERATION: progressive 0-30%
DIVIDEND TO INDIVIDUAL: exempt (single-tier)

CROSSOVER POINT: where director's marginal rate = company's marginal rate

At 24% corporate rate:
  Director marginal 24% occurs at chargeable income ~RM250,001-RM400,000
  
  BELOW crossover (director's rate < 24%):
    → Remuneration is MORE efficient
    → Company saves 24%, individual pays < 24% = net benefit
  
  ABOVE crossover (director's rate > 24%):
    → Dividends MORE efficient
    → Company already paid 24%, individual pays 0% on dividend
    → vs. deduction saves 24% but individual pays 25-30%

OPTIMAL SPLIT:
  → Pay remuneration up to the crossover point (~RM400-600k depending on reliefs)
  → Above that: pay as dividends
  → Account for EPF cost (employer 12-13%): increases effective cost of remuneration
```

**WARNING:** Excessive remuneration to related-party directors will be challenged under s.140A (TP) and disallowed under s.39 if not commensurate with services actually rendered.

### 3.3 Double Deduction Stacking

Every eligible double deduction should be claimed before considering any other planning:

| Deduction | Effective rate | Key requirement | Budget status |
|-----------|---------------|-----------------|---------------|
| R&D (in-house) | 200% | MOSTI approval | Extended |
| Export promotion | 200% | Overseas marketing/fairs | Extended |
| Training (approved) | 200% | Approved institutions | Extended |
| Disabled employees | 200% | JKM-registered | Ongoing |
| Halal certification | 200% | JAKIM/state authority | Ongoing |
| Internship | 200% | Structured programme with HEIs | Extended |
| Scholarships | 200% | Bachelor's + professional in ICT/engineering/accounting/finance | Budget 2026 new |
| Environmental equipment | 200% | Per gazette | Ongoing |

**Effective tax saving per RM100k of qualifying expenditure at 24%: RM48,000.**

### 3.4 CA Acceleration Strategy

**Priority order for profitable companies:**

```
1. AUTOMATION CA (200%, RM10m cap, YA 2023-2027)
   → Requires: operating ≥36 months + IR 4.0 element
   → Effective: RM100k spend = RM200k CA = RM48k tax saving

2. BUDGET 2026 ACA (20% IA / 40% AA — full write-off in ~2 years)
   → QCE: 11 Oct 2025 - 31 Dec 2026
   → Local machinery/plant OR ICT (no local requirement for ICT)

3. SMALL VALUE ASSETS (100% immediate, each asset ≤ RM2,000)
   → SME: NO annual cap
   → Non-SME: RM20,000 total per YA
   → Disaggregate genuinely separable components where possible
   → HP assets DO NOT qualify

4. STANDARD RATES (Schedule 3)
   → 20% IA + 10-20% AA per asset category
   → Use when nothing else applies
```

### 3.5 Donation Optimisation [s.44(6)]

- Cap: 10% of aggregate income
- Excess is permanently lost (no carry-forward)
- Strategy: calculate 10% of expected aggregate income BEFORE year-end
- If current donations below cap: make additional qualifying donations before FYE
- If expecting a high-income year: maximise donations that year (higher cap = higher absolute deduction)
- NEVER over-donate in one year; spread across years

### 3.6 Zakat Strategy

- Company zakat: deduction from aggregate income, capped at 2.5% [s.44(11A)]
- Separate from donation cap (additive)
- Pay at COMPANY level (reduces taxable income) rather than individual shareholder level (only provides personal rebate)
- Ensure payment to state religious authority or approved body

### 3.7 Loss Utilisation Planning

If the company has B/F losses approaching expiry:
- Year 7-8: begin monitoring — ensure projected income will absorb remaining losses
- Year 9: consider accelerating income if necessary (pull forward billing, defer expenses)
- Year 10: last chance — if losses will expire unused, the RM saved = 0

**Interaction with CA:** Can reduce CA claims to create more taxable income, allowing expiring losses to absorb it. CA deferred = preserved indefinitely.

---

## STAGE 4: SUPER-PROFITABLE

### Priority: Structural tax efficiency, incentive access, and reinvestment

For CI > RM5m, marginal planning (double deductions, SVA, donation timing) yields diminishing relative returns. Strategy shifts to structural and incentive-based approaches.

### 4.1 Incentive Stacking

```
EXISTING MANUFACTURING BUSINESS:
  → Reinvestment Allowance [Schedule 7A]: 60% QCE / 70% SI for 15 years
  → After 15 years: NIMP 2030 post-RA incentive (Tier 1: 100%/100% for 5 years)
  → Automation CA on IR 4.0 equipment (200%, different assets from RA)

NEW PROMOTED ACTIVITY (separate from existing):
  → Pioneer Status: 70-100% SI exempt for 5-10 years
  → OR Investment Tax Allowance: 60-100% QCE / 70-100% SI for 5 years
  → Ring-fenced from existing business during incentive period

STACKING RULES:
  × PS and ITA CANNOT coexist for same activity
  × Companies under PS/ITA CANNOT claim group relief
  ✓ RA and Automation CA CAN coexist (different assets)
  ✓ PS/ITA (new activity) alongside normal tax (existing activity) is valid
  ✓ Budget 2026 ACA can apply to qualifying assets NOT under other incentives
```

### 4.2 JS-SEZ [Johor-Singapore Special Economic Zone]

For companies with genuine ability to locate operations in Johor:

| Flagship Zone | Sector | Rate | Duration |
|---------------|--------|------|----------|
| Forest City SFZ | GSH, Family Offices, Fintech | 0-5% | Up to 20 years |
| Kulai-Sedenak | AI, Quantum, Medical, Pharma | 5% | 10-15 years |
| Senai-Skudai | Aerospace/MRO | 5% | 10-15 years |
| Tanjung Pelepas | Smart Logistics | ITA 100%/100% | 5 years |

**Savings:** 5% vs 24% = 79% reduction in tax cost. On RM10m CI = RM1.9m annual saving.

**Substance requirements:** Adequate employees, premises, and decision-making IN the zone. Shell operations will be challenged.

**Applications open until 31 December 2034.**

### 4.3 Regional HQ / Global Services Hub

- GSH: CIT 5-10% for up to 10 years
- Enhanced GSH within JS-SEZ: CIT 5% for up to 15-20 years
- Requires genuine qualifying services to related companies in ≥3 countries

### 4.4 GITA [Green Investment Tax Allowance]

| Tier | Allowance | Against | Duration | Examples |
|------|-----------|---------|----------|----------|
| Tier 1 (assets) | 100% QCE | 70% SI | - | Battery storage, green buildings |
| Tier 2 (assets) | 60% QCE | 70% SI | - | Renewable energy, energy efficiency |
| Tier 1 (project) | 100% QCE | 100% or 70% SI | 10 years | Green hydrogen |
| Tier 2 (project) | 100% QCE | 100% SI | 5 years | Waste management, EV charging |
| Tier 3 (project) | 100% QCE | 70% SI | 5 years | Biomass, biogas, solar, wind |

**Budget 2026:** MyHIJAU GITA — 100% for locally-manufactured, MyHIJAU-certified green products.
**Deadline:** Applications by 31 December 2026.

### 4.5 Labuan Structuring

**3% of net audited profit** for trading activities (or RM20,000 flat election).
**0% tax** for non-trading (investment holding).

**Substance requirements (gazetted 2019):**
- Minimum 2 full-time employees in Labuan
- Minimum RM50,000 annual operating expenditure in Labuan
- Transactions with residents or non-residents outside Labuan

**Works for:**
- Genuine trading with non-Malaysian customers
- Regional holding company
- Treasury/financing centre with real substance
- IP holding (royalty flows at 3%)

**Does NOT work (LHDN actively targeting):**
- Transactions primarily with Malaysian entities
- Sham operations with no genuine Labuan presence
- Management decisions made in KL, not Labuan
- Nominee/administrative employees only

### 4.6 IP and R&D Structuring

```
STRATEGY: Centralise IP in dedicated entity → receives royalties from operating companies

MECHANICS:
  Operating co: deducts royalty (reduces income at 24%)
  IP HoldCo: receives royalty income BUT may have:
    - CA on IP acquisition cost
    - Incentives (technology commercialisation)
    - Lower effective rate under incentive scheme

DOMESTIC ROYALTIES:
  → No WHT (WHT only on payments to non-residents)
  → Full deduction for payer IF arm's length and genuine

RISKS:
  × TP challenge if rate not arm's length
  × s.140 if IP was developed by operating co and transferred without adequate consideration
  × IHC trap [s.60F] if IP HoldCo has >80% investment income
```

### 4.7 Controlled Transfers [Para 38-40, Schedule 3]

Tax-neutral asset transfers within group (≥50% common control):
- Transferor: deemed disposal at TWDV (no balancing charge)
- Transferee: deemed cost = transferor's TWDV (continues depreciation)
- Joint election required

**Strategic uses:**
- Pre-sale clean-up: move retained assets to sister company before selling operating company
- Consolidate assets in entity best positioned to claim CA
- Group restructuring without triggering tax events

**Clawback [Para 40]:** If control relationship ceases within 2 years OR transferee disposes to unconnected party within 2 years → transfer UNWOUND retrospectively.

**Planning:** Time transfers ≥2 years before any planned change in control.

### 4.8 Earnings Stripping [s.140C]

```
RULE: Net interest to related parties capped at 20% of tax-EBITDA
DE MINIMIS: Not applicable if related-party interest ≤ RM500k/year
EXCESS: Permanently disallowed (no carry-forward)

STRATEGIES:
  → Keep related-party interest below RM500k (de minimis safe harbour)
  → If above: compute tax-EBITDA carefully to maximise headroom
  → Convert excess debt to equity (dividends not deductible but no s.140C risk)
  → Use third-party bank debt (not caught unless guaranteed by related party)
  → Time interest payments: capitalise interest during construction [s.33(2)]
```

---

## ANTI-AVOIDANCE BOUNDARIES

### Section 140 — General Anti-Avoidance

The DG may disregard or vary ANY transaction with the direct or indirect effect of:
- Altering the incidence of tax
- Relieving any person from tax liability
- Evading or avoiding any duty under ITA

**No intent required — effect alone is sufficient.** No statutory "commercial purpose" defence (unlike UK/Australia GAAR).

**What triggers s.140 in practice:**
1. Transactions between related parties with no commercial purpose
2. Circular fund flows (round-tripping)
3. Back-to-back arrangements only explicable by tax benefit
4. Artificial interposition of entities
5. Off-market pricing
6. Separation of legal ownership from economic benefit without commercial reason

### The Commercial Substance Test

```
LACKS SUBSTANCE (structure at risk):         HAS SUBSTANCE (generally protected):
  No genuine employees                         Real employees performing real functions
  No real decision-making                      Arm's-length pricing with TP documentation
  Entity exists only for tax benefit           Board minutes showing business rationale
  Artificial pricing                           Actual operations and customer interaction
  Circular cashflows                           Risk borne matches reward received
  Pre-ordained steps                           Commercial rationale documented BEFORE implementation
```

### Ethical Boundaries

| Category | Examples |
|----------|----------|
| **Clearly legitimate** | Timing capex for ACA window; choosing salary vs dividend; claiming double deductions with proper approval; electing CA deferral in loss years; applying for PS/ITA/RA/GITA |
| **Grey area (aggressive but defensible)** | Splitting related businesses for SME rate (if genuine separation); FYE changes for overlap benefit; Labuan with genuine but minimal substance; capitalising borderline items based on tax outcome |
| **Clearly aggressive / high risk** | Artificial loss creation via sham transactions; round-tripping funds; Labuan with no substance; related-party charges with no service delivery; loss-buying; fabricating commercial purpose after the fact |

---

## LHDN AUDIT TRIGGERS BY STAGE

### Loss-Making
- Perpetual losses (>3 consecutive years)
- Related-party charges creating/increasing losses
- Shareholder change immediately before loss utilisation
- Dormant company suddenly showing activity to utilise losses

### Breakeven
- Consistently at breakeven (never paying tax)
- Volatile income/expense patterns around year-end
- Large year-end accruals reversed in subsequent period
- Frequent FYE changes

### Profitable
- Sudden profitability drop after related-party charges introduced
- GP margin significantly below industry average
- Directors' remuneration disproportionate to company size
- Multiple companies with identical shareholders all at RM600k CI

### Super-Profitable
- Significant royalty/technical fee payments to non-residents
- Labuan structures with primarily Malaysian transactions
- Large controlled transfers followed by change of control
- Effective tax rate < 10% without approved incentive

---

## Output Format

For each strategy recommended, provide:

```
┌─────────────────────────────────────────────────────────────────┐
│ STRATEGY: [Name]                                                │
│ Stage: [Loss/Breakeven/Profitable/Super-Profit]                 │
│ Authority: [ITA section / Schedule / PR / Gazette]              │
├─────────────────────────────────────────────────────────────────┤
│ Current position:   [What the entity is doing now]              │
│ Recommended action: [What to change]                            │
│ Tax saving:         RM [quantified amount]                      │
│ Implementation:     [Steps to execute]                          │
│ Timeline:           [When to act — window/deadline]             │
│ Risk level:         [Legitimate / Grey / Aggressive]            │
│ LHDN audit risk:    [Low / Medium / High]                       │
│ Anti-avoidance:     [Which section could apply if poorly done]  │
└─────────────────────────────────────────────────────────────────┘
```

### Strategy Summary Table

End every strategy review with a prioritised table:

```
┌───┬─────────────────────────┬────────────┬──────────┬────────────┐
│ # │ Strategy                │ Tax Saving │ Risk     │ Priority   │
├───┼─────────────────────────┼────────────┼──────────┼────────────┤
│ 1 │ [Top opportunity]       │ RM XXX     │ Low      │ Immediate  │
│ 2 │ [Second opportunity]    │ RM XXX     │ Low      │ This YA    │
│ 3 │ [Third opportunity]     │ RM XXX     │ Medium   │ Next YA    │
│...│                         │            │          │            │
└───┴─────────────────────────┴────────────┴──────────┴────────────┘

TOTAL ADDRESSABLE SAVINGS: RM [sum of all identified savings]
```

---

## After presenting strategies

State:

> To implement any strategy, run the relevant command:
> - `compute` to rerun computation with optimised treatment
> - `incentive` for detailed eligibility analysis on any incentive
> - `transfer-pricing` for TP documentation on related-party strategies
> - `group` for group restructuring analysis
> - `international` for cross-border structuring
>
> Every strategy is bounded by anti-avoidance law. Quantified savings assume proper implementation with documentation and substance.

**NEVER:**
- Recommend strategies without quantifying the tax saving
- Present aggressive strategies as "legitimate" (be honest about the risk spectrum)
- Ignore implementation complexity (some strategies require MIDA applications, MOSTI approval, or 6-month lead times)
- Recommend incentives without checking mutual exclusivity with existing incentives
- Present strategies that require information you don't have — mark as `[REQUIRES: specific data needed]`
- Conflate tax PLANNING (legal, timing-based, structural) with tax EVASION (concealment, fabrication, non-disclosure)
