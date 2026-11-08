---
title: Bayesian Wind Tunnels
type: concept
aliases:
  - Bayesian Wind Tunnel
tags:
  - bayesian-inference
  - model-evaluation
  - mechanistic-interpretability
---

## Overview

Bayesian wind tunnels are controlled prediction environments in which the exact Bayesian posterior predictive is analytically available, task instances are generated rather than reused, and the hypothesis space is large enough to make instance memorization implausible. They test whether a learned predictor reproduces a specified probabilistic computation under conditions that support position-wise and distribution-level verification.

## Key Ideas

- **Known target:** An analytic posterior makes predictive entropy, KL divergence, total variation distance, or other distributional discrepancies directly measurable.
- **Fresh task instances:** Sampling a new latent task for each sequence reduces the value of memorizing individual examples and turns contextual prediction into inference over the current task.
- **Primitive isolation:** Bijection elimination, HMM filtering, Bayesian regression, and associative recall can separately emphasize accumulation, dynamic propagation, continuous uncertainty, and content-addressable retrieval.
- **Behavior and mechanism:** Exact output comparisons can be combined with ablations and representation analysis, but geometric correspondence remains mechanistic evidence rather than a proof of causal sufficiency.
- **Scope matters:** Success in a small synthetic environment establishes realizability for that task family. It does not establish general Bayesian reasoning, Bayesian uncertainty over model weights, or transfer to natural-language settings.

## Important Papers

- [[papers/the-bayesian-geometry-of-transformer-attention|The Bayesian Geometry of Transformer Attention]]: introduces the wind-tunnel framing and compares neural sequence architectures against analytic posteriors on controlled task families.

## Related Concepts

- [[concepts/bayesian-inference-primitives|Bayesian Inference Primitives]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/bayesian-predictive-coherence|Bayesian Predictive Coherence]]
- [[concepts/simulation-based-calibration|Simulation-Based Calibration]]: validates Bayesian procedures over repeated prior-predictive simulations, whereas a wind tunnel directly compares a learned predictor with an analytic posterior on designed tasks.
