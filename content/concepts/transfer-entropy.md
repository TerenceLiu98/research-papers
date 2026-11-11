---
title: Transfer Entropy
type: concept
aliases:
  - TE
tags:
  - information-theory
  - causality
  - interpretability
---

## Overview

Transfer entropy measures the predictive information a source process supplies about a target's future beyond the target's own history. In a one-step formulation,

$$
T_{X\to Y}=I(Y_{t+1};X_t\mid Y_t).
$$

It is a conditional mutual information and can differ between directions. History lengths and conditioning variables determine what predictive dependence is measured.

## Key Ideas

- Conditioning distinguishes incremental predictive information from unconditional association. A causal interpretation still requires appropriate assumptions about confounding and observation.
- In linear–Gaussian settings, TE and variance-based Granger measures coincide up to a conventional scale factor.
- High-dimensional neural activations make density-based estimation difficult. Gaussian covariance approximations or geometric proxies trade fidelity for tractability.
- An activation-alignment proxy must be distinguished from exact TE: squared cosine similarity is symmetric, bounded, and does not itself implement conditional density estimation.
- High predictive dependence alone does not prove a layer is dispensable. Pruning and downstream recovery experiments supply separate evidence about redundancy.

## Important Papers

- Schreiber (2000), “Measuring Information Transfer”: introduces TE, as cited by the paper below.
- Barnett, Barrett, and Seth (2009), “Granger Causality and Transfer Entropy Are Equivalent for Gaussian Variables”: establishes the Gaussian connection cited in the source manuscript.
- [[papers/transfer-entropy-as-a-measure-of-information-flow-in-llms-and-vlms|Transfer Entropy as a Measure of Information Flow in LLMs and VLMs]]: applies a cosine-based surrogate to Transformer profiling and pruning, with qualitative rather than calibrated information interpretation.

## Related Concepts

- [[concepts/granger-causality|Granger Causality]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
