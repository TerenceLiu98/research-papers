---
title: Coupling Designs
type: concept
aliases:
  - Coupling-Based Randomization
tags:
  - experimental-design
  - randomized-experiments
  - complex-treatments
  - covariate-balance
  - monte-carlo
---

## Overview

Coupling designs generalize stratified randomization to continuous, multivariate, constrained, or otherwise irregular treatment spaces. They match similar experimental units into small groups and jointly assign treatments from a coupling that preserves the target marginal distribution for every unit while making the within-group treatments unusually dispersed.

## Key Ideas

- **Fixed marginals, dependent assignments:** Every unit still receives treatment according to the chosen distribution $F$, but assignments within a matched group are negatively dependent rather than independent.
- **Match and disperse:** Matching makes units' treatment-response or influence functions more similar; dispersion then prevents similar units from receiving redundant treatments.
- **Two-factor efficiency:** In simple settings, variance reduction relative to independent assignment equals treatment dispersion times within-group match quality. Increasing tuple size can improve dispersion while degrading matching.
- **Influence-function alignment:** A coupling need not disperse every function of treatment equally. Its coupling operator defines high- and low-dispersion eigenspaces, and efficiency depends on where the estimator's influence functions place their variation.
- **Monte Carlo constructions:** Antithetic variates, Latin hypercube sampling, rotation sampling, Gaussian copulas, and randomized low-discrepancy designs provide different dispersion and robustness properties.
- **Transport to complex supports:** A geometry-preserving [[concepts/optimal-transport|Optimal Transport]] map can push dispersed uniform samples onto dependent, discrete, or constrained treatment distributions.
- **Approximate stratification:** Perfect dispersion may require groups large enough to damage match quality. Coupling designs can instead approximate stratification on smooth components of the influence function using smaller groups.

## Important Papers

- [[papers/coupling-designs-for-randomized-experiments-with-complex-treatments|Coupling Designs for Randomized Experiments with Complex Treatments]] (Cytrynbaum and Sävje, 2026): develops the design family, spectral efficiency theory, inference, and a network-monitor application.
- Hammersley and Morton (1956), "A New Monte Carlo Technique: Antithetic Variates": foundational negatively dependent Monte Carlo sampling.
- McKay, Beckman, and Conover (1979), "A Comparison of Three Methods for Selecting Values of Input Variables in the Analysis of Output from a Computer Code": foundational Latin hypercube sampling.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- Stratified randomization
- Matched-pairs randomization
- Latin hypercube sampling
- Antithetic variates
- Covariate balance
