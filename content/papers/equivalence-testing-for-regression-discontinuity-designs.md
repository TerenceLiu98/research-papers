---
title: Equivalence Testing for Regression Discontinuity Designs
type: paper
authors:
  - Erin Hartman
year: 2021
doi: 10.1017/pan.2020.43
tags:
  - causal-inference
  - regression-discontinuity
  - equivalence-testing
---

## TL;DR

Hartman develops equivalence tests for pretreatment-covariate continuity and running-variable density continuity in regression discontinuity designs. These tests require evidence that discrepancies are substantively small, avoiding the interpretation of an insignificant difference as evidence of design validity. Close-election reanalysis supports pooled diagnostics but finds uneven evidence across electoral contexts.

## Research Question

How can RD falsification tests provide affirmative evidence of substantively negligible covariate imbalance and sorting at a treatment cutoff?

## Motivation

Conventional tests place exact continuity in the null. With few observations near the cutoff, failure to reject can conceal substantial imbalance; with abundant data, tiny discrepancies can become significant. Equivalence testing makes the tolerated discrepancy explicit and controls erroneous declarations of equivalence.

## Contributions

- Adapts an asymptotic equivalence test to local estimates of pretreatment-covariate discontinuities.
- Constructs a scale-free density-ratio equivalence test for sorting diagnostics.
- Advocates reporting the smallest equivalence range supported by the data at a chosen significance level.
- Reassesses global close-election diagnostics using the data of Eggers et al. (2015).

## Method

For a pretreatment covariate, let $\tau_Z$ be the difference between its conditional-mean limits at the cutoff. The test contrasts $H_0: |\tau_Z|\geq\epsilon$ with $H_A: |\tau_Z|<\epsilon$. Section 3.2 combines consistent local estimates and standard errors from Calonico, Cattaneo, and Titiunik (2014) with Wellek's equivalence test, whose critical value uses a noncentral chi-square quantile. The paper compares this with interval inclusion, equivalent to two one-sided tests. Use the same bandwidth-selection criterion for diagnostics and outcome estimation, without requiring identical realized bandwidths.

For density continuity, define $r=f^+/f^-$. Equivalence means $1/\epsilon<r<\epsilon$, with $\epsilon>1$. Section 3.3 tests the two bounds through an intersection-union procedure using boundary-adaptive density estimates from Cattaneo, Jansson, and Ma (2019). Ratios avoid dependence on the units of the running variable.

The **equivalence confidence interval** is the smallest equivalence range that permits rejection at the chosen level. It does not depend on a prespecified tolerance, but its substantive acceptability still requires justification. These are diagnostics of observable implications of [[concepts/regression-discontinuity-design|Regression Discontinuity Design]], not direct tests of potential-outcome continuity.

## Experiments

Section 4 runs 1,000 simulations per parameter value, modeled on close-election data. Covariate discontinuities are 0, 1.25, 2.5, and 3.75 percentage points, with tolerance ±2.5. Density ratios range from 1 to 1.75, with equivalence bounds [2/3, 1.5]. Equivalence procedures control false declarations outside the tolerated region; treating difference-test nonrejection as equivalence performs poorly with small samples. The proposed covariate test is more powerful than interval inclusion in small samples, while density tests remain comparatively underpowered.

The empirical reanalysis uses lagged winning-party vote share and running-variable densities. Figures 3–4 report false-discovery-rate-adjusted p-values.

| Covariate diagnostic | Reported result |
|---|---|
| Pooled elections | Point estimate 0.38 percentage points; minimum equivalence range ±1.16 |
| US House, 1880–1944 | Minimum range ±1.68 percentage points |
| French municipal elections | Minimum range ±11.51 percentage points |
| India lower house | Point estimate 4.19 percentage points; equivalence not established at ±2.5 |

Density diagnostics support equivalence within [2/3, 1.5] in many, but not all, settings. Pooled support therefore does not establish credibility for every geography and period.

## Limitations

- Results depend on what discrepancies are substantively tolerable; observed imbalance cannot bound causal bias without additional assumptions.
- Failure to establish equivalence can reflect imprecision and does not itself demonstrate an invalid design.
- Density diagnostics have low power in small samples, including under the proposed approach.
- The development focuses on sharp RD. Extensions to fuzzy and kink designs are discussed rather than demonstrated here.
- Theory about sorting and evidence from predictive pretreatment covariates remain necessary; passing diagnostics does not prove identification.

## Related Concepts

- [[concepts/equivalence-testing|Equivalence Testing]]: makes substantively meaningful difference the null to be rejected.
- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: supplies the cutoff-specific estimands and diagnostic implications.

## Related Papers

- Hartman and Hidalgo (2018), *An Equivalence Approach to Balance and Placebo Tests*: the general design-diagnostic approach extended to RD.
- Eggers et al. (2015), *On the Validity of the Regression Discontinuity Design for Estimating Electoral Effects: New Evidence from Over 40,000 Close Races*: source of the reanalyzed electoral data.
- [[papers/when-can-we-trust-regression-discontinuity-design-estimates-from-close-elections|When Can We Trust Regression Discontinuity Design Estimates from Close Elections? Evidence from Experimental Benchmarks]]: complementary library evidence on estimation and inference choices using electoral lotteries, rather than equivalence diagnostics.

Published in *Political Analysis* 29, 505–521 (2021); online publication 31 December 2020. Replication identifier supplied by the paper: `10.7910/DVN/IVRHIR`.
