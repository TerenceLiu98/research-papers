---
title: Attention Flow
type: concept
tags:
  - attention
  - interpretability
  - transformers
---

## Overview

Attention flow estimates input-token relevance by treating a layered Transformer attention graph as a capacity-constrained flow network. Each hidden embedding can be a source and each input token a sink.

## Key Ideas

Average attention over heads and incorporate residual edges by adding the identity and normalizing. Use the resulting weights as edge capacities, then compute maximum flow separately for each source–input pair. Flow conservation and edge capacities account for shared bottlenecks; simply adding independently scored paths would overcount shared edges.

Unlike rollout’s proportional propagation, maximum flow measures possible propagation under capacity constraints. It can distribute relevance across a broader set of tokens, at greater computational cost. These capacities remain attention-based approximations, not measurements of actual information or causal influence.

## Important Papers

- [[papers/quantifying-attention-flow-in-transformers|Quantifying Attention Flow in Transformers]] introduces the method and compares it with blank-out and gradient importance. Stronger upper-layer agreement on verb-number prediction contrasts with low correlations on SST-2.

## Related Concepts

- [[concepts/attention-rollout|Attention Rollout]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
