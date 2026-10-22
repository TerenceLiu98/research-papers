---
title: "Fintech Entry, Lending Market Competition, and Welfare"
type: paper
authors:
  - Xavier Vives
  - Zhiqiang Ye
year: 2025
doi: 10.1016/j.jfineco.2025.104040
tags:
  - fintech-lending
  - banking-competition
  - credit-markets
  - price-discrimination
  - welfare
---

## TL;DR

A spatial model of [[concepts/fintech-lending-competition|fintech lending competition]] shows that flexible borrower-specific pricing can let fintechs enter even without a monitoring or funding-cost advantage. Potential entry lowers bank rates and raises investment, but actual entry can weaken bank competition in distant market segments. Its effects on investment and welfare therefore depend on fintech monitoring efficiency, funding costs, bank concentration, and competition between fintechs.

## Research Question

What determines fintech entry into lending markets, how does entry alter bank pricing, monitoring, credit allocation, and entrepreneurial investment, and when does it improve social welfare?

## Motivation

Banks and fintechs differ along several dimensions that standard lending-competition models do not jointly capture. Banks may have cheap funding and specialized local knowledge but use relatively uniform prices; fintechs can use digital information and borrower-specific pricing, avoid physical distance frictions, and offer convenience, yet may face higher funding costs. These differences can produce entry and borrower-risk patterns that cannot be explained by superior fintech information technology alone.

## Contributions

- Defines blockaded, potential, and actual fintech-entry regimes as fintech monitoring efficiency improves. In the potential-entry regime, banks deter entry by lowering their uniform loan rates; with actual entry, fintechs serve borrowers sufficiently far from banks.
- Shows that discriminatory pricing is itself an entry advantage: a fintech can cut its rate at a contested location without reducing revenue elsewhere, while a uniform-pricing bank cannot. Actual entry can therefore occur even when the fintech has worse monitoring efficiency and higher funding costs.
- Predicts more fintech lending in concentrated banking markets because a larger share of borrowers lies far from a bank's area of monitoring expertise.
- Separates the roles of pricing flexibility, funding costs, and convenience in observed loan outcomes. With equal funding costs, fintechs can charge less and monitor less than banks near a market boundary; sufficiently high fintech funding costs reverse both comparisons, while convenience can support higher fintech rates without implying lower default risk.
- Decomposes welfare changes into investment, monitoring-incentive, and monitoring-cost effects, showing why neither actual entry nor price discrimination has an unconditional welfare benefit.

## Method

The paper extends a Salop circular-city model. Equidistant incumbent banks specialize locally, so their quadratic monitoring cost rises with borrower distance. Two potential fintech entrants are effectively located at the center: their monitoring efficiency is independent of borrower location. Banks move first and post uniform loan rates; fintechs then post location-contingent rates. Entrepreneurs choose whether to invest and which lender to approach, and lenders subsequently choose monitoring intensity, which determines project success probability.

Equilibrium depends on the strongest fintech's monitoring efficiency. Low efficiency produces blockaded entry. At intermediate efficiency, the fintech threat induces a lower bank rate but no fintech lending. At high efficiency, fintechs enter and serve the middle region between adjacent banks. In parts of that region, the bank's uniform equilibrium rate may be too low to cover the cost of serving distant borrowers; the disappearance of this bank threat gives the leading fintech additional market power.

The model is extended to unequal funding costs, a borrower convenience benefit from fintech credit, discriminatory bank pricing, and endogenous long-run bank exit. Social welfare is the expected value of funded projects net of funding, monitoring, and entrepreneurial opportunity costs.

## Experiments

The paper is theoretical and uses numerical comparative statics rather than an empirical evaluation.

- Numerical illustrations map fintech monitoring efficiency into the three entry regimes and show how bank and fintech rates vary across borrower locations.
- Potential entry always raises total investment relative to blockaded entry because banks lower rates for all borrowers. Actual entry raises investment when the second fintech is sufficiently competitive, but can reduce it when banks cease to threaten the leading fintech in distant locations.
- With equal bank and fintech funding costs, welfare under actual entry exceeds blockaded-entry welfare when the leading fintech's monitoring efficiency is sufficiently high relative to banks and inter-fintech competition is intermediate. Very weak competition permits excessive fintech rates, while very strong competition can reduce lenders' monitoring incentives through low rates.
- When banks may also price discriminate, fintech market areas shrink, the no-bank-threat regions disappear, and both potential and actual entry raise investment. The welfare effect of allowing bank discrimination remains ambiguous.
- Allowing bank exit makes actual entry and no-bank-threat regions easier to obtain. Exit can reduce investment by weakening bank competition, while recovered salvage values create a welfare-improving option-value effect.

## Limitations

- The conclusions follow from a stylized symmetric circular market with two fintechs, equidistant banks, quadratic monitoring costs, and a sequential pricing game. They are comparative-static mechanisms rather than direct estimates of real lending markets.
- Borrower location summarizes both geography and distance from lender expertise; empirical applications would need to distinguish these mechanisms.
- The benchmark assigns uniform pricing to banks and fully location-contingent pricing to fintechs. The discriminatory-bank extension shows that this institutional assumption materially affects entry and investment results.
- Several welfare claims are sufficient-condition or numerical results. Actual entry can raise or lower investment and welfare outside the stated parameter regions.
- Monitoring directly raises project success probability, while screening, adverse selection, regulation, and endogenous lender funding structures are not modeled in the benchmark.

## Related Concepts

- [[concepts/fintech-lending-competition|Fintech Lending Competition]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

- Vives and Ye (2025), "Information Technology and Lender Competition": a cited companion model in which monitoring reduces borrower shirking benefits rather than directly increasing project success.
- He, Huang, and Zhou (2023), "Open Banking: Credit Market Competition When Borrowers Own the Data": cited work on data sharing, lender competition, and welfare.
- Bouvard, Casamatta, and Xiong (2022), "Lending and Monitoring: Big Tech vs Banks": cited theory comparing lenders with different monitoring characteristics.

[[index|Library home]]
