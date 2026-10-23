---
title: "Making Event Study Plots Honest: A Functional Data Approach to Causal Inference"
type: paper
authors:
  - Chencheng Fang
  - Dominik Liebl
year: 2025
source_job_id: "972abbc0-3201-42b2-b22f-6d7329036a86"
tags:
  - causal-inference
  - difference-in-differences
  - event-studies
  - functional-data-analysis
  - simultaneous-inference
---

## TL;DR

The paper treats event-time outcomes in difference-in-differences as functional data and derives a DiD estimator that converges uniformly to a Gaussian process. This supports [[concepts/simultaneous-confidence-bands|Simultaneous Confidence Bands]] across event time. The resulting [[concepts/honest-event-study-inference|Honest Event Study Inference]] uses pre-treatment equivalence tests to assess a researcher-specified reference band for plausible bias and post-treatment relevance tests to identify effects that remain distinguishable from that band.

## Research Question

How can an event-study plot support simultaneous inference across event time, provide affirmative evidence about the plausibility of pre-treatment restrictions, and remain informative when parallel trends or no anticipation may fail?

## Motivation

Conventional event-study plots usually show pointwise intervals. Reading the whole plot as one test ignores multiplicity, while treating insignificant pre-treatment coefficients as evidence for parallel trends or no anticipation reverses the logic of a standard null-hypothesis test. Existing sensitivity analyses also do not naturally appear in the same visual framework. The paper addresses these problems by testing against an honest reference band that represents substantively tolerable treatment-anticipation or differential-trend bias.

## Contributions

- Formulates DiD outcomes as continuous-time stochastic processes and establishes uniform consistency and Gaussian-process convergence for the functional estimator.
- Shows that natural-cubic-spline interpolation of ordinary panel estimates and their covariance can inherit the functional limit under smoothness and sampling-rate conditions.
- Uses infimum-based simultaneous bands for pre-treatment equivalence testing and supremum-based simultaneous bands for post-treatment relevance testing.
- Proposes reference bands for constant anticipation bias and extrapolated linear differential trends, including conditions under which estimating these bands from the same data does not alter asymptotic size.
- Extends the estimator to time-invariant controls and staggered adoption.

## Method

For a reference event time of $-1$, the observable functional DiD contrast is decomposed into the average treatment effect on the treated, treatment-anticipation bias, and differential-trend bias. Point identification of the treatment effect requires no anticipation, parallel trends, and overlap. Instead of assuming the first two biases are zero, the honest analysis specifies a time-varying reference band $[\Delta_\ell(t),\Delta_u(t)]$ containing values regarded as plausible.

In the oracle setting, entire outcome trajectories are observed. The functional DiD estimator is pointwise identical to the classical panel estimator, but its limiting object is a Gaussian process in the space of continuous functions. In the practical setting, event-time coefficients and their covariance surface are interpolated with natural cubic splines. The interpolation estimator has the same uniform limit when interpolation error vanishes sufficiently quickly relative to sampling error.

Post-treatment relevance testing rejects the hypothesis that the DiD path lies inside the reference band if a two-sided supremum-based band is disjoint from it at any post-treatment time. Pre-treatment equivalence testing reverses the hypotheses: a reference band is validated over the pre-anticipation interval only if a two-sided infimum-based band lies strictly inside it everywhere. The paper estimates critical values with parametric and multiplier bootstrap procedures, and also considers a Kac-Rice approximation for supremum bands.

## Experiments

The simulations use smooth and rough Gaussian-process errors, sample sizes from 100 to 800, and panels observed at 21 or 41 time points. Across 500 replications per configuration, interpolation error falls with denser sampling for the more complex effect path. For post-treatment testing, the proposed supremum bands control uniform size more reliably than naive pointwise intervals and are less conservative and more powerful than Bonferroni bands. For pre-treatment equivalence testing with $n=200$ and 21 time points, the parametric and multiplier infimum bands have reported empirical sizes of 0.032 and 0.034 under smooth errors, and 0.050 and 0.044 under rough errors; the pointwise and Bonferroni comparisons are more conservative.

The first application revisits working-from-home potential and commuting distance. A reference band for anticipation bias is validated at the 5% level, and the post-treatment effect is uniformly distinguishable from it over event times 23 through 44. The second revisits duty-to-bargain laws and female employment. Its differential-trend reference band is not validated because of high variability; using that substantively motivated band, the honest post-treatment analysis finds no statistically significant effect, unlike the original pointwise plot's apparent decline.

## Limitations

- The continuous-time formulation and interpolation theory rely on smooth functional components and on the time grid becoming dense sufficiently quickly, although the simulations suggest the testing procedures can remain valid with rough errors in the studied designs.
- The main theory assumes independent units. Clustered and spatial dependence are left for future work.
- Equivalence testing validates a reference band only over the observed pre-anticipation interval. It does not establish that the band contains post-treatment bias.
- Reference-band width creates a substantive trade-off: wider bands are easier to validate but make post-treatment inference more conservative.
- Failure to validate a reference band is a lack of evidence for equivalence, not evidence that the band is false. Using an unvalidated band requires an external substantive justification.
- The supplied manuscript gives no DOI, arXiv identifier, or venue. The year follows its self-citation of the matching online appendix as Fang and Liebl (2025b).

## Related Concepts

- [[concepts/honest-event-study-inference|Honest Event Study Inference]]
- [[concepts/simultaneous-confidence-bands|Simultaneous Confidence Bands]]
- [[concepts/stacked-event-studies|Stacked Event Studies]]: a complementary design for cohort-specific comparisons under staggered adoption.
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: another DiD extension that emphasizes which causal estimand additional assumptions identify.

## Related Papers

- Rambachan and Roth (2023), "A More Credible Approach to Parallel Trends": a sensitivity-analysis framework for departures from parallel trends used as a methodological point of comparison.
- Dette and Schumann (2024), "Testing for Equivalence of Pre-Trends in Difference-in-Differences Estimation": related equivalence testing for pre-trends.
- Liebl and Reimherr (2023), "Fast and Fair Simultaneous Confidence Bands for Functional Parameters": provides the simultaneous-band machinery used for computationally efficient inference.
- Fogarty and Small (2014), "Equivalence Testing for Functional Data with an Application to Comparing Pulmonary Function Devices": supplies the pointwise functional-equivalence comparison used in the simulations.

[[index|Library home]]
