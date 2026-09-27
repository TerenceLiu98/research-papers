---
title: Gerrymandering and geographic polarization have reduced electoral competition
type: paper
authors:
  - Ethan Jasny
  - Tyler Simko
  - Aneetej Arora
  - Taran Samarth
  - Christopher T. Kenny
  - Melissa Wu
  - Emma Ebowe
  - Cory McCartan
  - Michael Y. Zhao
  - Philip O'Sullivan
  - Kosuke Imai
year: 2025
date: 2025-08-21
source_job_id: 24edb1eb-9ca1-4311-96e1-26437aa90b40
tags:
  - redistricting
  - gerrymandering
  - geographic-polarization
  - electoral-competition
---

## TL;DR

Comparing enacted U.S. congressional maps with [[concepts/redistricting-ensembles|Redistricting Ensembles]] for the 2010 and 2020 cycles, the authors find that highly competitive districts declined from about **47 to 34**. The simulated baseline declined from about **67 to 50**, making [[concepts/geographic-polarization|Geographic Polarization]] the larger contributor to the decline over time. Gerrymandering reduced competition in both cycles, even though opposing parties' state-level advantages increasingly canceled nationally. At a common 50% Democratic national vote baseline, expected Democratic seats under enacted maps rose from 201.56 to 208.11, still short of a majority.

## Research Question

How much of the change in congressional partisan advantage and electoral competition between the 2010 and 2020 redistricting cycles reflects changing political geography, and how much reflects partisan choices in drawing district boundaries?

## Motivation

Democratic concentration in cities can produce a Republican seat advantage even without partisan map drawing. Comparing election outcomes or enacted maps alone cannot distinguish this geographic structure from gerrymandering. Moreover, a small net national partisan bias can conceal substantial state-level manipulation and a loss of competitive districts.

## Contributions

- Extends the state-specific simulation framework used for the 2020 cycle to the 2010 cycle, allowing comparisons against a nonpartisan baseline in both periods.
- Separates changes in expected seats under simulated maps from changes in the enacted-minus-simulated gap, while standardizing the national electoral environment.
- Connects district urbanity to modeled win probabilities and documents stronger urban-rural partisan separation.
- Evaluates electoral competition separately from aggregate partisan advantage, showing why national cancellation of gerrymanders does not imply competitive elections.

## Method

### Simulated Maps and Geography

Appendix A reports 5,000 simulated plans per state and cycle using the sequential Monte Carlo algorithm of McCartan and Imai (2023). The simulations incorporate population balance, contiguity, compactness, limits on splitting political subdivisions, Voting Rights Act considerations, and state-specific criteria. The 2010 simulations use 2010 Census data and the rules applicable to that cycle. Legal criteria are approximated by the simulation specification rather than mechanically guaranteed by a single nationwide rule.

District urbanity is the proportion of voters residing in urban census blocks, using the 2020 Census classification for both cycles. Figure 1 uses a random sample of 1,000 plans per cycle to display the relationship between urbanity and Democratic win probability. The median simulated district is approximately 84% urban.

### Electoral Model and Decomposition

The stochastic uniform partisan swing model uses precinct-level two-party presidential votes: 2008 for the 2010 cycle, and the average of 2016 and 2020 for the 2020 cycle. Both are shifted on the logit scale to a common 50% Democratic national vote baseline. This avoids interpreting different national presidential vote totals as changes in geographic bias. Appendix C repeats the analysis at 51.5% Democratic support.

The model combines a national swing shared across districts with district-specific variation. District average vote shares use turnout-weighted precinct votes; district win probabilities average over modeled election variation. Expected Democratic seats are the sum of district win probabilities, rather than a count of districts whose baseline vote share exceeds 50%.

For cycle $t$, let $S_t$ denote expected Democratic seats averaged over simulated plans and $E_t$ the corresponding enacted-map expectation. The paper's gerrymandering estimates follow $G_t=E_t-S_t$: negative values indicate fewer Democratic seats under enacted maps. The decomposition is

$$
E_{2020}-E_{2010}=(S_{2020}-S_{2010})+(G_{2020}-G_{2010}).
$$

The first term captures change in the simulated baseline; the second captures change in enacted-map deviation. Interpreting the first term as geography is conditional on the cycle-specific population, electoral inputs, apportionment, and legal constraints used in the simulations.

## Experiments

These are simulation-based comparisons of historical redistricting cycles, not randomized interventions or forecasts of specific election results.

### Partisan Seats at the 50% Baseline

Table A1 reports the following expected Democratic seat counts and enacted-minus-simulated differences. The intervals are the source's reported 95% intervals for the differences; small arithmetic discrepancies reflect the displayed precision.

| Cycle | Simulated seats | Enacted seats | Enacted minus simulated | Reported 95% interval |
| --- | ---: | ---: | ---: | --- |
| 2010 | 203.68 | 201.56 | -2.11 | [-4.20, -0.15] |
| 2020 | 208.24 | 208.11 | -0.12 | [-2.43, 2.16] |
| Change | +4.56 | +6.55 | +1.99 | [0.97, 7.08] |

Section 2 describes the Republican geographic advantage as declining from about 14.3 to 9.8 seats. The near-zero national gerrymandering estimate in 2020 does not imply the absence of state-level gerrymanders: the number of states with statistically detectable enacted-map deviations rises from 11 (eight Republican-favoring, three Democratic-favoring) to 15 (eight Republican-favoring, seven Democratic-favoring).

The most urban quarter of simulated districts sees average Democratic win probability increase from approximately 80% to 88%; the most rural quarter declines from 20% to 12%. Republican geographic gains in the Midwest and Rust Belt are partly offset by Democratic gains in states including Texas, California, and Arizona. Changes in enacted-map bias often run against these geographic changes. Texas has the largest geographic shift toward Democrats and the largest increase in Republican gerrymandering, about two seats.

### Electoral Competition

The main-text competitive category uses an expected two-party victory margin of about five percentage points or less. This concerns the gap between the parties' vote shares, not a five-point deviation of one party's share from 50%.

| Approximate competitive districts | 2010 | 2020 | Change |
| --- | ---: | ---: | ---: |
| Simulated baseline | 67 | 50 | -17 |
| Enacted maps | 47 | 34 | -13 |
| Enacted minus simulated | -20 | -16 | +4 |

Enacted competitive districts fall by more than 25%. Gerrymandering reduces their number by roughly 30% relative to simulations in each cycle, but its estimated competition penalty is smaller in 2020. Thus the temporal decline is driven by the simulated geographic baseline, partly offset by a narrowing enacted-map penalty. In 2020, enacted maps also contain 42 more safe seats, defined by expected margins of at least 20 percentage points, than the simulated baseline (Section 4).

### Sensitivity to the National Baseline

At 51.5% Democratic support, Table A2 reports simulated Democratic seats of 223.37 in 2010 and 224.13 in 2020; enacted seats are 218.92 and 221.73. Its reported changes are +0.75 simulated seats, +2.81 enacted seats, and a +2.05-seat improvement in the enacted-minus-simulated gap. The gap remains Republican-favoring in both cycles (-4.45 and -2.39 seats), and the reported 95% interval for its change is [-2.80, 3.22]. Enacted maps remain less competitive than simulations. The direction of several findings persists, but the magnitude and uncertainty of the decomposition depend on the national baseline.

## Limitations

- **Conditional counterfactual:** Ensemble results depend on how imprecise state and federal criteria are encoded. Comparing cycle-specific baselines does not isolate residential sorting from every other change in population, preferences, apportionment, or rules.
- **Model dependence:** Presidential voting patterns and stochastic swing assumptions supply expected congressional outcomes. The analysis does not separately estimate candidate, incumbency, campaign, or turnout responses to alternative maps.
- **Baseline sensitivity:** The +4.56-seat simulated gain at 50% Democratic support falls to a reported +0.75 at 51.5%. The near-zero 2020 national gerrymandering estimate is also specific to the 50% baseline.
- **Source inconsistencies:** Appendix C prose describes a D+0.3 geographic shift, whereas Table A2 reports +0.75 simulated Democratic seats. Its D+4.4 and D+2.4 gerrymandering labels also conflict with Table A2's negative Democratic seat gaps and the main text's Republican-advantage interpretation. This page uses the tabulated estimates and explicitly defines their sign. Table A1's change interval [0.97, 7.08] is reproduced as supplied and cannot be independently checked without the underlying simulations.
- **Interpretive scope:** Claims about accountability, primary electorates, compromise, and institutional reforms are discussion implications, not outcomes directly tested here. The design describes the 2010 and 2020 cycles; it does not evaluate subsequent mid-decade maps.
- **Source version:** The supplied manuscript is dated August 21, 2025 and includes Appendices A-C and references. It supplies no DOI, arXiv identifier, or publication venue for this paper; none is inferred from the identifiers of cited works.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: the conditional nonpartisan counterfactual for map evaluation.
- [[concepts/geographic-polarization|Geographic Polarization]]: increasing separation of partisan support across places.
- [[concepts/political-polarization|Political Polarization]]: the broader phenomenon, distinct from the district-level geographic measure here.
- [[concepts/partisan-alignment|Partisan Alignment]]: distinguishes a voter's partisan match with a district from the district's competitiveness.

## Related Papers

- Kenny et al. (2023), "Widespread Partisan Gerrymandering Mostly Cancels Nationally, But Reduces Electoral Competition": supplies the 2020 analysis and election model extended here.
- McCartan and Imai (2023), "Sequential Monte Carlo for Sampling Balanced and Compact Redistricting Plans": supplies the simulation algorithm.
- McCartan et al. (2022), "Simulated Redistricting Plans for the Analysis and Evaluation of Redistricting in the United States": documents the state-specific 2020 ensembles and their limitations.
- Chen and Rodden (2013), "Unintentional Gerrymandering: Political Geography and Electoral Bias in Legislatures": motivates distinguishing geographic bias from strategic line drawing.
- [[papers/partisan-alignment-increases-voter-turnout-evidence-from-redistricting|Partisan Alignment Increases Voter Turnout: Evidence from Redistricting]]: a complementary library study of participation responses to district composition; it is not cited in the supplied manuscript.

[[index|Library home]]
