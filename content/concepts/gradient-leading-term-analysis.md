---
title: Gradient Leading-Term Analysis
type: concept
aliases:
  - Gradient Leading Terms
  - Leading-Order Gradient Analysis
tags:
  - training-dynamics
  - mechanistic-interpretability
  - asymptotic-analysis
  - representation-learning
---

## Overview

Gradient leading-term analysis studies the first nonzero terms in a model's parameter updates near initialization. When higher-order corrections remain controlled, these terms provide closed-form approximations to early learned weights and expose which data statistics enter each component first.

## Key Ideas

- Different parameter classes can begin moving at different orders. In an attention-only transformer initialized at zero, the output matrix moves on the first step, the value matrices next, and the attention and positional parameters only after information can propagate through the earlier updates.
- A useful leading term does more than approximate magnitude: its matrix factors can identify interpretable corpus statistics and show how model components compose them.
- Approximation guarantees require an explicit time horizon and error bounds. A direction that dominates early training may remain empirically correlated with later weights, but the early-stage theorem alone does not guarantee this persistence.
- Initialization scale matters. Zero initialization can simplify the update sequence, while a Gaussian-initialization result must show that random starting weights and their induced gradients are smaller than the retained terms.
- In [[Semantic Associations in Transformers]], leading terms can connect weight-space structure to next-token, functional-interchangeability, and longer-range context statistics.

## Important Papers

- [[How Do Transformers Learn to Associate Tokens Gradient Leading Terms Bring Mechanistic Interpretability]]
- Bietti et al. (2023), "Birth of a Transformer: A Memory Viewpoint."
- Nichani, Damian, and Lee (2024), "How Transformers Learn Causal Structure with Gradient Descent."

## Related Concepts

- [[Semantic Associations in Transformers]]
- Training dynamics
- Perturbation analysis
- Mechanistic interpretability
- Feature learning
