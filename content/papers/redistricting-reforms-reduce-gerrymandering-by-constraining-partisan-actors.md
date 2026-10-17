---
title: Redistricting Reforms Reduce Gerrymandering by Constraining Partisan Actors
type: paper
authors:
  - Cory McCartan
  - Christopher T. Kenny
  - Tyler Simko
  - Emma Ebowe
  - Michael Y. Zhao
  - Kosuke Imai
year: 2026
doi: "10.1017/S0003055426101610"
source_job_id: cba2acc6-7242-4d7b-aee9-2daaf1777d3f
tags:
  - redistricting
  - gerrymandering
  - institutional-design
  - causal-inference
---

## TL;DR

Redistricting reforms reduce partisan bias when they constrain partisan actors throughout the map-making process. The authors summarize institutional rules with a sequential game's equilibrium, then estimate effects using changes between the 2010 and 2020 congressional redistricting cycles and simulation-adjusted outcomes. Their nationwide counterfactual predicts **7.8 additional Democratic seats** under Michigan-style reforms (95% credible interval: 2.1 to 13.9), conditional on the studied political geography and partisan control. This is an exploratory policy projection, not a prediction that commissions inherently benefit Democrats.

## Research Question

How do the full sequence of map proposals, vetoes, stalemate procedures, and court review affect partisan gerrymandering and electoral responsiveness? Can these heterogeneous institutions be summarized sufficiently to estimate the effects of reform?

## Motivation

A commission label conceals substantial differences in partisan influence: a nonpartisan proposal may still face partisan vetoes. States also select into reforms, and changing voter geography can affect seat outcomes independently of institutions. The study addresses treatment complexity, confounding, and outcome complexity together.

## Contributions

- Codes 14 institutional features across 87 state-cycle processes, containing 58 distinct procedural configurations, 41 of them unique.
- Defines [[concepts/institutional-leeway|Institutional Leeway]] from a sequential zero-sum game, without fitting the treatment measure to electoral outcomes.
- Combines continuous-treatment difference-in-differences with [[concepts/redistricting-ensembles|Redistricting Ensembles]] to adjust outcomes for state-specific political geography.
- Compares nationwide adoption of New York-, Ohio-, and Michigan-style institutional structures, showing why downstream partisan control matters.

## Method

### Measuring Institutional Leeway

Democrats and Republicans choose proposals and vetoes to maximize partisan advantage. Bias ranges from -4 (Democratic) to +4 (Republican). Nonpartisan or split-control actions and court interventions are modeled as moves by nature. Nineteen parameters govern these moves; the authors average results over 200 draws from specified prior distributions.

Backward induction yields a subgame-perfect equilibrium for each process. **Realized leeway** uses observed party control; **absolute realized leeway** removes its partisan sign. **Maximum leeway** measures institutional permissiveness under hypothetical unified partisan control. This separates institutional constraints from the parties currently holding office. The model treats litigation probabilistically rather than as a fully strategic interaction among litigants.

### Outcomes and Identification

For state $i$ and cycle $t$, the treatment is $D_{it}=u^*(\mathbf Z_{it})$, where $\mathbf Z_{it}$ contains institutional features. Identification requires a sufficiency assumption: institutional configurations with the same equilibrium score have the same potential outcome. It also requires strong conditional parallel trends across treatment doses.

Outcomes include expected Republican seats, their simulation-standardized z-score, absolute deviations from the simulated baseline, and electoral responsiveness. The election model uses 2008 presidential returns for the 2010 cycle and averaged 2016/2020 returns for the 2020 cycle, shifted to a common 50/50 national vote. National and district swings are calibrated using historical congressional elections, and expectations are computed by numerical integration.

The analysis subtracts each state-cycle's mean simulated outcome from its enacted-map outcome before taking the change between cycles. A Bayesian linear regression relates this adjusted change to treatment change, baseline treatment, covariates, and interactions allowing heterogeneous effects. Covariates include 2008 Democratic vote share, Southern location, district counts and their change, prior corruption convictions, and ballot-initiative availability. Maximum-leeway models additionally adjust for changes in partisan control of the map drawer and state supreme court.

## Experiments

This is an observational institutional comparison with simulation-based outcome measurement, rather than a randomized experiment.

### Reform Effects

The main empirical findings report that a four-unit decrease in maximum leeway reduces the absolute enacted-versus-baseline seat deviation by about **0.6 seats** (reported interval: 0.06 to 1.20). The corresponding simulation-standardized estimate is 2.6 standard deviations, with a wide interval spanning zero (-1 to 6). These quantify reduced bias magnitude, not a fixed gain for either party.

For signed realized leeway, a four-unit increase, such as movement from a Democratic legislature toward an independent commission or from a commission toward Republican control, produces an estimated **0.75 additional Republican seats** (0.22 to 1.27).

Maximum- and signed-realized-leeway estimates support increased responsiveness when leeway falls, with posterior probability above 99% for the reported direction. The absolute-realized-leeway responsiveness estimate is near zero. The main findings translate a four-unit reduction into an increase in the weighted share of competitive seats from 25% to 43% (28% to 58%); this measure weights seats by proximity to balanced partisanship rather than counting districts below a binary competitiveness threshold.

### Nationwide Counterfactuals

The policy analysis changes institutional structures while holding partisan control fixed and approximates national seats-votes curves around a 50% vote share. Reported gains are relative to the modeled 2020 baseline.

| Reform structure | Additional Democratic seats | 95% credible interval |
| --- | ---: | --- |
| New York-style: nonpartisan initial drawer with partisan veto points | 3.0 | -0.17 to 6.60 |
| Ohio-style: legislative drawing with partisan/bipartisan constraints and backup procedures | 6.0 | 1.8 to 10.7 |
| Michigan-style: nonpartisan commission, no partisan vetoes, potential court review | 7.8 | 2.1 to 13.9 |

Michigan-style reform yields an estimated 8.3 additional Democratic seats per one-percentage-point national vote increase (7.7 to 8.9), a responsiveness increase of 0.54 seats over baseline. The direction of partisan gains reflects the studied geography and existing Republican advantage.

### Validation and Robustness

- State rankings of equilibrium leeway are stable across parameter draws: average pairwise Spearman correlation exceeds 0.99.
- Predicted final map drawers broadly match observed institutions, but the model overpredicts court-drawn maps.
- The authors report qualitatively similar but attenuated effects with Bayesian additive regression trees, and no statistically distinguishable estimates after additionally controlling for institutional features.
- A presidential-vote placebo produces estimates near zero with intervals covering zero. This is supportive evidence, not a direct test of parallel trends or treatment sufficiency.

## Limitations

- **Identification:** Treatment sufficiency and strong conditional parallel trends are substantive assumptions. The game summarizes institutions but does not model reform adoption or by itself identify causal effects.
- **Limited data:** The institutional dataset contains 87 state-cycle observations across two cycles. Missing earlier precinct data prevents conventional pre-trend placebo checks using comparable simulations.
- **Conditional baseline:** Simulations follow each cycle's rules. Subtraction can remove effects of rule changes bundled with institutional reform, attenuating the estimated total reform effect.
- **Model scope:** Zero-sum partisan preferences, probabilistic nonpartisan behavior, court specifications, and the regression dose-response form constrain interpretation. Counterfactual nationwide adoption extrapolates beyond observed reforms and does not establish future partisan gains.
- **Source consistency:** The introduction reports competitive-seat share increasing from 25% to 38%, while the main findings give 25% to 43% for a four-unit change. The responsiveness paragraph also reports an increase of 1.5 but describes an additional 0.6 percentage points of seat share per vote-share point. These figures are not reconciled in the supplied text; the weighted-share result above follows the main findings without converting the inconsistent responsiveness figures.
- **Source completeness:** The supplied Markdown contains the main article and references, but not Supplementary Sections S1-S10 or the text of its numbered footnotes. Supplementary robustness results are therefore reported as the authors' descriptions. The placebo paragraph names 2012 and 2024 while calling them the first post-census presidential elections; the date wording is not independently resolved here.

## Related Concepts

- [[concepts/institutional-leeway|Institutional Leeway]]: a theoretically constructed treatment summarizing sequential partisan constraints.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: the nonpartisan reference distribution used to adjust outcomes.
- [[concepts/geographic-polarization|Geographic Polarization]]: a source of electoral change that must be distinguished from institutional effects.

## Related Papers

- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]]: a complementary library study separating geography from enacted-map deviations across the same cycles; it is not cited in the supplied article.
- [[papers/partisan-alignment-increases-voter-turnout-evidence-from-redistricting|Partisan Alignment Increases Voter Turnout: Evidence from Redistricting]]: cited as a study of a particular redistricting-induced treatment, with turnout rather than institutional reform as its focus.
- Callaway, Goodman-Bacon, and Sant'Anna (2024), "Difference-in-Differences with a Continuous Treatment": provides the continuous-dose identification framework.
- McCartan and Imai (2023), "Sequential Monte Carlo for Sampling Balanced and Compact Redistricting Plans": supplies the simulation algorithm.
- Kenny et al. (2023), "Widespread Partisan Gerrymandering Mostly Cancels Nationally, but Reduces Electoral Competition": supplies the electoral model and related map comparisons.

Article identifier: [10.1017/S0003055426101610](https://doi.org/10.1017/S0003055426101610). Replication data identified in the source: [Harvard Dataverse](https://doi.org/10.7910/DVN/6HGLTN).

[[index|Library home]]
