---
title: "When conflict becomes calamity: Understanding the role of armed conflict dynamics in natural disasters"
type: paper
authors:
  - Niklas Hänze
year: 2025
doi: "10.1177/00223433241265028"
tags:
  - armed-conflict
  - disaster-risk
  - causal-inference
---

## TL;DR

In Philippine provinces during 2009–2019, high-intensity conflict in the preceding year is associated with greater cyclone mortality after accounting for physical hazard exposure. A two-stage fixed-effects analysis estimates roughly 7.9% higher normalized fatalities in the baseline model and finds evidence of spillovers into neighboring provinces.

## Research Question

Do temporary increases in fighting intensify subsequent natural-hazard impacts within conflict zones and in neighboring areas?

## Motivation

Disaster–conflict research often treats disasters as external shocks. If pre-existing conflict increases vulnerability, disaster losses themselves are endogenous to conflict dynamics. Separating physical hazards, population exposure, and vulnerability is therefore essential for interpreting either direction of this relationship.

## Contributions

- Develops displacement, diversion of relief resources, and deterrence or obstruction of humanitarian actors as mechanisms linking conflict spikes to disaster losses.
- Constructs province-level cyclone-fatality data from Philippine government situation reports and normalizes losses using population-weighted wind and rainfall exposure.
- Estimates local and neighboring effects while addressing heterogeneous treatment effects and contamination of comparison provinces.

## Method

The outcome is annual, log-transformed normalized cyclone fatalities. Conflict events come from UCDP GED; treatment is at least five events in the preceding year, relative to a conflict-prone subsample mean of 4.99 events. Treatment lasts one year in the main specification and can recur. The analysis selects provinces in the upper tercile of total battle-related deaths over the study period: 297 province-years, including 82 treated observations.

The two-stage estimator first fits province and year effects on untreated observations and then regresses adjusted outcomes on treatment. Controls include poverty severity, GDP per capita, human development, and provincial tax revenue as a share of income. Standard errors are province-clustered and adjusted for first-stage estimation. Identification requires conditional parallel trends; fixed effects do not eliminate arbitrary time-varying confounding.

Spatial specifications define neighbors by shared land borders, exclude neighboring treated exposure from first-stage controls, and estimate direct and neighboring treatment effects. Island provinces have no land-border neighbors. This is an application of [[concepts/spatial-causal-inference|Spatial Causal Inference]].

## Experiments

Table 1 reports the following coefficients on the logged normalized outcome (standard errors in parentheses):

| Specification | Local treatment | Neighbor treatment | Observations |
| --- | --- | --- | --- |
| Baseline | 0.076 (0.027), p < .01 | — | 297 |
| Remove spatially exposed controls | 0.074 (0.039), p < .10 | — | 231 |
| Neighbor effect | — | 0.076 (0.035), p < .05 | 231 |
| Joint effects | 0.064 (0.038), p < .10 | 0.067 (0.032), p < .05 | 231 |

The baseline coefficient corresponds to the paper's approximately 7.9% increase. Direct effects in spatial specifications meet the 10% rather than 5% significance threshold. A two-period-early placebo test yields p = .246; a joint pre-trend test yields p = .606. These tests do not reject the identifying assumptions but cannot establish them.

Reported robustness checks cover monthly aggregation, the full province sample, outlier removal, alternative spatial connections, lagged outcomes, treatment duration, and alternative thresholds. Results are generally supportive, but sensitivity appears when treatment uses battle deaths instead of event counts. Qualitative reports illustrate displacement, competing military and humanitarian demands, and attacks on aid convoys; they do not separately identify mechanism effects.

## Limitations

- The estimated contrast is a spike relative to lower-intensity conflict, not conflict versus peace.
- Causal interpretation remains conditional on parallel trends and adequate adjustment for confounding.
- Poverty is interpolated between available years; GDP and human development values after 2015 carry forward the last observation.
- Mechanism evidence is illustrative, and treatment measurement affects robustness.
- External validity beyond Philippine cyclones and relatively low-intensity state-based conflict remains unresolved. The suggested lower-bound interpretation is the author's argument, not an established result.

## Related Concepts

- [[concepts/conflict-induced-disaster-vulnerability|Conflict-Induced Disaster Vulnerability]]
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]

## Related Papers

- Marktanner, Mienie, and Noiset (2015), “From armed conflict to disaster vulnerability”: earlier cross-country evidence discussed in the paper.
- Caso, Hilhorst, and Mena (2023), “The contribution of armed conflict to vulnerability to disaster: Empirical evidence from 1989 to 2018”: complementary cross-country evidence.
- Tennant and Gilmore (2020), “Government effectiveness and institutions as determinants of tropical cyclone mortality”: source of the hazard-exposure normalization approach.

Published in *Journal of Peace Research* 62(4), 1030–1045 (2025; copyright 2024). [Original article](https://doi.org/10.1177/00223433241265028).

[[index|Library home]]
