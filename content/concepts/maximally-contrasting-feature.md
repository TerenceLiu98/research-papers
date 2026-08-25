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
- In the unrestricted oracle class with $0 \leq g \leq 1$, the score selects represented outcomes whose treated density exceeds their control density. A fitted neural score is a restricted and interpretable approximation to this rule.
- In observational data, inverse-propensity weighting identifies the contrast under consistency, overlap, and unconfoundedness. Sample splitting or cross-fitting avoids using the same observations to learn treatment assignment and the feature score.
- A heterogeneous MCF uses $g(Y,X)$ to let the treatment-induced direction vary by context. A budgeted MCF selects only the most treatment-enriched portion of the outcome population by changing a threshold along the same learned direction.
- The MCF can combine correlated attributes. Labels such as formality, non-toxicity, blur, or punctuation are interpretations supported by examples and external checks, not separate causal estimands automatically recovered by the score.

## Important Papers

- [[Causal Inference with Unstructured Outcomes]]
- Egami et al. (2022), "How to make causal inferences using texts."
- Modarressi, Spiess, and Venugopal (2025), "Causal inference on outcomes learned from text."

## Related Concepts

- [[Unstructured Outcome Causal Inference]]
- [[Maximally Influential Treatment Features]]
- Potential outcomes
- Inverse-propensity weighting
- Heterogeneous treatment effects
- Causal representation learning
