---
title: National Electoral Thresholds and Disproportionality
type: paper
authors:
  - Tasos Kalandrakis
  - Miguel R. Rueda
year: 2021
doi: 10.1017/pan.2020.15
source_job_id: 872c2b9e-a64d-4295-a751-5bc9541376ea
tags:
  - electoral-systems
  - political-methodology
---

## TL;DR

A stochastic votes-to-seats model separates national barriers to representation from advantages enjoyed by larger parties above those barriers. Across 116 electoral systems in 417 European elections, the model fails a goodness-of-fit test in five systems; a zero-threshold restriction is rejected in 49. High thresholds and disproportionate allocation among eligible parties are empirically distinct features.

## Research Question

Can national electoral thresholds and seat-allocation disproportionality be separately identified and estimated from observed national votes and seats?

## Motivation

Legal thresholds need not equal effective national barriers: district victories, upper tiers, and geographically concentrated support can permit representation below a statutory cutoff. Conversely, proportional allocation among eligible parties can coexist with substantial exclusion of smaller parties. A single overall vote-seat discrepancy conceals this distinction.

## Contributions

- Jointly models a stochastic national threshold and a power-law seat-allocation parameter.
- Establishes identification and develops regularized maximum a posteriori expectation-maximization (MAP-EM) estimation with standard errors.
- Compiles electoral returns and detailed institutions for 36 European countries, 1945–2010.
- Develops simulation-based tests of fit, threshold restrictions, and changes in electoral systems.

## Method

For election $t$, a normally distributed latent variable determines a nonnegative threshold: $\theta_t=\max(0,\theta_t^*)$, with $\theta_t^*\sim N(\theta,\sigma^2)$. Conditional on eligibility, seats follow a multinomial distribution with probabilities proportional to $v_{ti}^{\beta}$. Parties below the threshold receive no seats; if the threshold exceeds every vote share, the model allocates seats among plurality leaders. Thus $\beta=1$ means proportionality in expectation among eligible parties, while $\beta>1$ favors larger parties. The expected censored threshold differs from the latent normal mean.

Theorem 1 establishes identification under repeated observations, positive threshold variance, and positive probability of three distinct, strictly positive party vote shares. The likelihood integrates over latent threshold intervals bounded by observed party vote shares. MAP-EM alternates conditional expectations over these latent quantities with parameter updates; a normal–inverse-gamma prior regularizes threshold parameters against singularities and flat likelihood regions. The disproportionality update requires numerical solution of a scalar equation.

The inferential procedures use Monte Carlo reference distributions for discrepancies between observed and predicted seats. Electoral-system change is tested by comparing a pooled model against separate models for a finer partition of elections (Sections 2 and 4).

## Experiments

The application covers 417 lower-house elections in 36 European countries and 116 systems. The default system definition changes when allocation formulas change or other recorded institutional quantities depart by more than 5% from the system average.

| Reported comparison | Result |
| --- | --- |
| Full-model goodness-of-fit rejections at 5% | 5 of 116 systems |
| Zero-threshold model goodness-of-fit rejections | 18 of 116 |
| Zero-threshold restriction rejected in favor of full model | 49 of 116 |
| Threshold restriction rejected, proportional allocation not rejected | 38 of 116 (32.76%) |
| Threshold restriction not rejected, disproportional allocation | 45 of 116 (38.79%) |
| Coarser formula-only system definition versus default | No-change rejected in 10 of 20 comparisons |
| Default versus finer system definition | No-change rejected in 2 of 24 comparisons |

The mean estimated expected threshold is 3.67% in the 49 systems rejecting the restriction, versus 0.8% in the remainder. Comparisons show that omitting thresholds can overestimate advantages for large parties among eligible competitors. Formula-based national thresholds can exceed the estimated barriers, especially where small parties win geographically concentrated support (Sections 3–4).

## Limitations

The estimates summarize the equilibrium interaction of rules, voters, and parties; they do not separately identify causal contributions of institutional provisions or voter and party behavior. Normal latent thresholds and multinomial allocation impose parametric restrictions. Sparse systems yield uncertain and potentially prior-sensitive estimates. Nonrejection of a zero threshold or proportional allocation does not establish that either holds exactly. The reported tests use point estimates rather than integrating over the full posterior. The 5% institutional cutoff is pragmatic and receives only conditional empirical support.

The supplied Markdown contains corrupted mathematical typography; the method above follows the accompanying prose rather than reproducing malformed expressions. Online appendices are referenced by the article but are not included in this source.

## Related Concepts

- [[concepts/national-electoral-thresholds|National Electoral Thresholds]] distinguish effective national access barriers from statutory cutoffs.
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]] describes the separate allocation advantage among eligible parties.

## Related Papers

- [[papers/electoral-rule-disproportionality-and-platform-polarization|Electoral Rule Disproportionality and Platform Polarization]] is a related library reading: its theoretical power-law mapping studies platform incentives, whereas this paper estimates allocation parameters and separates thresholds.
- King (1990), “Electoral Responsiveness and Partisan Bias in Multiparty Democracies,” supplies an antecedent votes-to-seats model discussed by the authors.
- Taagepera (2002), “Nationwide Threshold of Representation,” provides the institutional formula used for the threshold comparison.

Published in *Political Analysis* 29:102–119 (2021); first published online July 13, 2020.
