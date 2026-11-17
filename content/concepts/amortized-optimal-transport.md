---
title: Amortized Optimal Transport
type: concept
aliases:
  - Amortized OT
definition: "Amortized optimal transport learns a shared predictor of transport solutions across distribution pairs, reducing the need to optimize every new transport problem independently."
tags:
  - optimal-transport
  - amortized-learning
---

## Overview

Amortized optimal transport shares learning across a family of transport problems. A learned predictor uses distribution information or context to produce a map, potential, or parameters for a solver. Its usefulness depends on generalization to new distributions and on how much task-specific optimization remains necessary.

## Key Ideas

- Conditioning on a distribution requires a representation of its samples or weights. Permutation-invariant encoders can accommodate empirical measures with variable sample counts.
- A hypernetwork can generate potential-network parameters; differentiating convex potentials then yields candidate quadratic-cost transport maps.
- Fixed-reference prediction and arbitrary source/target prediction have different scopes. Success in the former does not establish the latter.
- Evaluate transport quality on unseen distributions, and distinguish direct prediction from fine-tuned adaptation. Training cost must be considered separately from per-problem inference savings.

## Important Papers

- [[papers/embedding-empirical-distributions-for-computing-optimal-transport-maps|Embedding Empirical Distributions for Computing Optimal Transport Maps]]: HOTET combines transformer distribution embeddings with hypernetworks for many-to-one neural transport; demonstrates prediction and short fine-tuning adaptation.
- Amos et al. (2023), “Meta Optimal Transport”: prior amortized transport method discussed and evaluated in the HOTET paper.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: supplies the underlying cost and marginal constraints.
- [[concepts/measure-to-measure-regression|Measure-to-Measure Regression]]: learns distribution-valued outputs from paired measures; amortized transport instead focuses on predicting transport solutions.
