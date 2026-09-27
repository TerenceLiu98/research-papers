---
title: Maximally Contrasting Feature
type: concept
aliases:
  - MCF
  - Maximally Contrasting Features
tags:
  - causal-inference
  - unstructured-outcomes
  - representation-learning
  - treatment-effects
---

## Overview

The maximally contrasting feature (MCF) is a learned bounded score of an unstructured outcome whose average potential value changes most between treatment and control. It turns the open-ended question of what changed in a text, image, or other object into a causal optimization problem over a chosen class of feature-scoring functions.

## Key Ideas

- For a score $g(Y)$, the target contrast is $\mathbb{E}\{g(Y(1))-g(Y(0))\}$. The MCF maximizes this contrast over the available function class, so its meaning depends on the representation and class.
- In the unrestricted oracle class with $0 \leq g \leq 1$, the score selects represented outcomes whose treated density exceeds their control density. Values on density ties are arbitrary; a zero-probability tie set gives uniqueness almost surely. A fitted neural score approximates this rule within a restricted class and needs interpretation through examples.
- In observational data, inverse-propensity weighting identifies the contrast under consistency, overlap, and unconfoundedness. Sample splitting or cross-fitting avoids using the same observations to learn treatment assignment and the feature score.
- A heterogeneous MCF uses $g(Y,X)$ to let the treatment-induced direction vary by context. For a fixed reference density, a budgeted oracle ranks outcomes by $(p_1-p_0)/p_{\mathrm{ref}}$ and changes the threshold on that ranking. It does not identify separate attributes in sequence. An exact budget eventually forces selection of negative-contrast regions; an upper-bound budget can stop at saturation.
- The MCF can combine correlated attributes. Labels such as formality, non-toxicity, blur, or punctuation are interpretations supported by examples and external checks, not separate causal estimands automatically recovered by the score.
- In the equal-covariance Gaussian example, the oracle thresholds $w^\top Y$, where $w=\Sigma^{-1}(\mu_1-\mu_0)$. A correlated coordinate can receive nonzero weight even when its own mean is unchanged by treatment (Appendix L of the paper below).
- Efficiency requires additional conditions beyond identification and cross-fitting. Proposition 5 assumes an efficient expansion for the fixed-parameter IPW moment; ordinary IPW does not automatically satisfy it.

## Important Papers

- [[papers/causal-inference-with-unstructured-outcomes|Causal Inference with Unstructured Outcomes]]
- Egami et al. (2022), "How to make causal inferences using texts."
- Modarressi, Spiess, and Venugopal (2025), "Causal inference on outcomes learned from text."

## Related Concepts

- [[concepts/unstructured-outcome-causal-inference|Unstructured Outcome Causal Inference]]
- [[concepts/maximally-influential-treatment-features|Maximally Influential Treatment Features]]
- [[concepts/causal-overlap|Causal Overlap]]
- Potential outcomes
- Inverse-propensity weighting
- Heterogeneous treatment effects
- [[concepts/causal-representation-learning|Causal Representation Learning]]
