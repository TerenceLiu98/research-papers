---
title: Attention Rollout
type: concept
tags:
  - attention
  - interpretability
  - transformers
---

## Overview

Attention rollout estimates how a hidden position attends to original input tokens by composing attention matrices across layers. It addresses the mixing of token information that makes isolated upper-layer attention maps difficult to interpret.

## Key Ideas

For head-averaged, row-normalized attention $W_l$, include residual connections using $A_l=(W_l+I)/2$. Compute $R_0=I$ and $R_l=A_lR_{l-1}$. Each resulting entry sums products of weights over paths through the layered graph.

The calculation assumes proportional propagation according to attention weights. It ignores value transformations and nonlinear processing, so it is a diagnostic approximation rather than a causal attribution. Causal masks can introduce an early-token bias.

## Important Papers

- [[papers/quantifying-attention-flow-in-transformers|Quantifying Attention Flow in Transformers]] introduces the method and compares it with blank-out and gradient importance. Stronger upper-layer agreement on verb-number prediction contrasts with low correlations on SST-2.

## Related Concepts

- [[concepts/attention-flow|Attention Flow]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
