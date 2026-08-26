---
title: Neural EXposure Interaction Search
type: concept
aliases:
  - NEXIS
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - causal-representation-learning
  - sparse-autoencoders
  - multiple-hypothesis-testing
---

## Overview

Neural EXposure Interaction Search (NEXIS) is a conditional feature-selection procedure for identifying principal proxies of direct treatment-effect modifiers in a learned pre-treatment representation. It addresses the problem that marginally significant representation coordinates can be redundant proxies or other noncausal effect modifiers. NEXIS searches for a minimal and sufficient set using conditional CATE-equivalence tests.

## Key Ideas

- A foundation model and sparse autoencoder provide a broad candidate dictionary from complex pre-treatment measurements. Optional structured covariates can enter the same search.
- For a candidate coordinate $j$ and selected set $S$, NEXIS tests whether adding $j$ changes the conditional mean treatment effect: $H_0(j\mid S):\mathbb{E}[\tau\mid Z^{S\cup\{j\}}]=\mathbb{E}[\tau\mid Z^S]$.
- The forward step adds the most significant candidate passing its multiple-testing gate. The backward step re-tests retained coordinates and removes those that become redundant after later additions.
- Bonferroni FWER control is the default because it supports the stated precision bound. FDR and unadjusted gates are available for exploratory regimes, but unadjusted search can retain more entangled companions.
- The default test is a linear treatment-by-feature interaction test. Doubly robust generalized covariance measure tests with quadratic or LightGBM nuisance models trade finite-sample power and computation for robustness to nonlinear conditional effects.
- Under Principal Alignment, mean faithfulness, and valid consistent tests, NEXIS has asymptotic recovery and conditional precision guarantees. Measurement and Representation Sufficiency are additionally needed for a causal interpretation of the selected features.
- A spectral-gap heuristic can reject candidates whose conditional statistic is too small relative to selected effects. The paper recommends $\rho=0.5$ with sensitivity checks, while noting that the heuristic is not part of the core recovery theorem.

## Important Papers

- [[From Tokens to Policy: Causal and Interpretable Heterogeneous Treatment Effects Identification]]
- Tsamardinos, Aliferis, and Statnikov (2003), "Algorithms for large scale Markov blanket discovery."
- Shah and Peters (2020), "The hardness of conditional independence testing and the generalised covariance measure."

## Related Concepts

- [[Causal and Interpretable Heterogeneous Treatment Effects]]
- [[Causal Representation Learning]]
- [[Sparse Autoencoders]]
- [[Neural Effect Search]]
- [[Exploratory Causal Inference]]
- Multiple hypothesis testing
- Conditional average treatment effects
- Markov blanket discovery
