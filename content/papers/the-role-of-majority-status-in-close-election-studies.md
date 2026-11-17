---
title: "The Role of Majority Status in Close Election Studies"
type: paper
authors:
  - Matteo Alpino
  - Marta Crispino
year: 2024
doi: "10.1017/pan.2023.14"
tags:
  - regression-discontinuity
  - causal-inference
  - legislative-politics
---

## TL;DR

Close-election comparisons in single-member districts can combine party identity with legislative majority status. Alpino and Crispino show that pooling elections does not generally separate these effects, and propose controlling for majority status and election-year fixed effects when assembly control can be treated as nationally determined.

## Research Question

When does a close-election estimate identify a partisan effect, and how can researchers separate it from the effect of representation by a legislative majority member?

## Motivation

In a two-party legislature, a Democratic district winner belongs to the majority in Democratic-controlled terms and to the opposition in Republican-controlled terms. Majority membership can affect legislative influence, funding, and electoral prospects. Thus even credible local assignment around an electoral tie can identify a compound treatment rather than a pure party effect.

## Contributions

- Identifies an institutional source of treatment bundling in close-election studies.
- Explains how imbalance across majority-control regimes affects pooled partisan estimates.
- Proposes majority-status adjustment or balancing across control regimes, and illustrates their relevance with simulations and U.S. House data.

## Method

Let $D_{it}$ indicate a Democratic district victory and $M_{it}$ membership in the legislative majority. In Democratic-controlled terms, $M_{it}=D_{it}$; in Republican-controlled terms, $M_{it}=1-D_{it}$. A within-term comparison therefore combines party and majority status. Pooling terms produces a weighted mixture whose interpretation depends on their composition.

The proposed specification adds $M_{it}$ and year fixed effects to a close-election regression, with separate linear vote-margin functions on each side of the threshold. Identification requires changes in which party controls the chamber and the additional assumption that assembly control is determined nationally rather than by the individual district. Large chambers with many contestable seats make this assumption more plausible. Majority status need not be balanced at the threshold: including it is an identification strategy under that additional assumption, rather than routine precision adjustment.

Alternatively, researchers can balance observations across majority-control regimes by dropping years or using post-stratification weights. The aim is to make party–majority covariance negligible. This addresses the interpretation of the estimand within [[concepts/regression-discontinuity-design|Regression Discontinuity Design]].

## Experiments

**Simulation.** The authors simulate 601 districts over 100 election years and estimate models in nine 50-year samples with different control-regime compositions. The true partisan effect is 0.3. The standard specification recovers it in the balanced sample but shifts upward or downward with partisan control imbalance; majority-status and year adjustment centers estimates on the true effect across the reported samples.

**U.S. House replication.** Table 1 revisits Lee, Moretti, and Butler (2004) with a two-percentage-point bandwidth and no vote-margin controls. Adding majority status and time fixed effects changes the contemporaneous roll-call coefficient from 48.28 to 57.91 and the next-term roll-call coefficient from 20.75 to 17.63. The text identifies the third outcome as next-election party victory: its coefficient falls from 0.530 to 0.389. The original study's qualitative conclusion survives.

**Extended roll-call data.** In the relatively balanced 1982–2004 election sample, the party coefficient is 55.90 without adjustment and 56.31 with majority status and electoral-cycle fixed effects; the adjusted majority coefficient is −4.82 (Table 2). Majority-status adjustment has limited quantitative importance here but shifts estimates in the predicted direction in unbalanced samples.

**Campaign finance.** For 1978–2004 elections, Table 3 reports party coefficients of −132.83 without adjustment and −133.02 with majority status and cycle fixed effects, with an adjusted majority coefficient of 78.61. Units are thousands of 1990 dollars raised from non-investor donors by the previously winning party. Unadjusted party coefficients differ sharply across exclusively Democratic-controlled (−51.13) and Republican-controlled (−205.34) periods, illustrating how the compound contrast varies with control regime.

## Limitations

- Party and majority effects cannot be separated within samples containing only one control regime; time fixed effects alone do not solve this collinearity.
- The proposed adjustment depends on the national-determination assumption, which is less plausible when a few contestable districts determine chamber control.
- Evidence centers on two-party, single-member districts. Extensions to alignment across government levels or branches are suggested rather than tested here.
- Referenced supplementary derivations are absent from the supplied Markdown. Table 1's third outcome header conflicts with the prose; the interpretation above follows the explicit next-election description.

## Related Concepts

- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: credible threshold assignment still requires clarity about which jointly changing attributes constitute treatment.

## Related Papers

- Lee, Moretti, and Butler (2004), *Do Voters Affect or Elect Policies? Evidence from the U.S. House*: the replication examined here.
- Albouy (2013), *Partisan Representation in Congress and the Geographic Distribution of Federal Funds*: uses the national-control assumption to identify majority-status effects.
- [[papers/when-can-we-trust-regression-discontinuity-design-estimates-from-close-elections|When Can We Trust Regression Discontinuity Design Estimates from Close Elections? Evidence from Experimental Benchmarks]]: addresses finite-sample implementation, a distinct concern from the treatment bundling studied here.

Published in *Political Analysis* 32, 148–155 (2024), online 18 April 2023. Replication data: DOI `10.7910/DVN/GAK3QS`.
