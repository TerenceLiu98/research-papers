---
title: "Getting Time Right: Using Cox Models and Probabilities to Interpret Binary Panel Data"
type: paper
authors:
  - Shawna K. Metzger
  - Benjamin T. Jones
year: 2022
doi: "10.1017/pan.2021.14"
tags:
  - survival-analysis
  - binary-panel-data
  - political-methodology
---

## TL;DR

Cox duration models offer a practical alternative to logit with time polynomials or splines for binary panel data. The paper's simulations generally find comparable or better recovery with Cox, especially when effects change with duration or differ between event onset and termination. Transition probabilities provide an interpretable probability-scale summary.

Published online June 14, 2021; *Political Analysis* 30 (2022), 151–166.

## Research Question

Can Cox models analyze grouped binary panel outcomes as effectively as logit, while accommodating duration-dependent covariate effects and distinct transitions with fewer estimated parameters?

## Motivation

Adding elapsed-time terms to logit addresses baseline duration dependence, but does not automatically allow covariate effects to change over time. Binary coding can also conflate peaceful periods with ongoing conflicts, or onset with persistence. These choices can conceal different processes and distort estimates.

## Contributions

- Compares Cox and logit in 54 basic simulation scenarios and 162 complex parameter combinations.
- Connects proportionality diagnostics, transition-specific modeling, and baseline-hazard flexibility to practical estimation demands.
- Demonstrates how separating dispute onset from termination changes substantive interpretation, and advocates transition probabilities for communicating duration-model results.

## Method

The approach treats binary time-series cross-sectional observations as grouped duration data. Cox estimation leaves the baseline hazard unspecified, while time interactions accommodate nonproportional covariate effects. Multistate specifications assign separate baseline hazards and covariate effects to transitions such as peace → dispute and dispute → peace.

Comparators are logit models with cubic time polynomials or natural cubic splines. Complex simulations compare Cox with Efron and exact partial-likelihood tie corrections, both logit specifications, and a naïve logit omitting transition heterogeneity and time-varying effects. Nonproportionality is introduced through interactions with log duration. In the paper's illustrative two-stage, one-covariate setup, Cox estimates four coefficients versus 12–16 parameters for the specified logit alternatives (Table 1); these are specification-specific counts.

Transition probabilities summarize movement between states over a specified interval. Their detailed estimation is deferred to online Appendix B and Jones and Metzger (2019), rather than developed in the supplied main text.

## Experiments

**Basic simulations.** The 54 scenarios vary sample size and baseline hazards across continuous durations, continuous durations rounded into start–stop observations, and genuinely discrete durations. Both approaches generally recover unbiased effects; Cox typically has lower bias and RMSE despite larger standard errors.

**Complex simulations.** With sample size 250, the authors vary transition-specific effects, baseline hazards, and nonproportionality. Properly specified models generally recover main and time-varying effects. Cox consistently improves bias and RMSE in the reported rounded-duration scenarios with proportionality violations. When no violation exists, a simpler logit can outperform models containing unnecessary time interactions. Transition probabilities are generally unbiased for both approaches, with a modest Cox advantage in the rounded-duration cases.

**Practice audit.** Among 26 selected articles using logit/probit with cubic polynomials, only one explicitly reports testing or correcting proportionality. Re-estimating the selected models as Cox reveals evidence of violations in at least half, depending on test specification (Section 3.1).

**Interstate disputes.** The application uses Oneal and Russett's dyad-year data for 1885–2000. The onset comparison has 464,981 observations and 2,028 failures (Table 2). Correcting nonproportionality indicates that economic interdependence's negative association with onset weakens as peace lasts. The multistate analysis has 465,997 observations, 1,350 onsets, and 1,241 terminations (Table 3). Democracy predicts lower onset risk, increasingly so with elapsed peace, but has no statistically significant association with termination in that specification.

## Limitations

- Simulation advantages are conditional on the tested designs; the paper does not establish universal dominance over discrete-time models.
- Reported complex comparisons use parameter settings where all competing specifications could be estimated, excluding some settings with logit estimation problems.
- Leaving the baseline hazard unspecified does not eliminate the need to check proportionality, covariate specification, state definitions, or tied-event handling.
- The observational dispute application illustrates model-dependent associations rather than identifying causal effects.
- Supplementary details and qualifications referenced by the authors are not included in the supplied Markdown.

## Related Concepts

- [[concepts/cox-duration-models|Cox Duration Models]] — semiparametric baseline hazards and transition-specific extensions underpin the comparison.
- [[concepts/schoenfeld-residual-proportional-hazards-tests|Schoenfeld Residual Proportional Hazards Tests]] — relevant diagnostics for the proportionality assumptions emphasized here.

## Related Papers

- Beck, Katz, and Tucker (1998), “Taking Time Seriously” — establishes the grouped-duration interpretation motivating time corrections in binary panel models.
- Carter and Signorino (2010), “Back to the Future” — time-polynomial modeling and proportionality checks form a principal comparison.
- Metzger and Jones (2016), “Surviving Phases” — multistate survival modeling supports the onset/termination distinction.
- [[papers/proportionally-less-difficult-reevaluating-keeles-proportionally-difficult|Proportionally Less Difficult]] — related work on implementation and interpretation of proportionality diagnostics.

Replication resources reported by the paper: [Code Ocean](https://doi.org/10.24433/CO.7111207.v2) and [Harvard Dataverse](https://doi.org/10.7910/DVN/FEW2JP).
