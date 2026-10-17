---
title: Cross-Token Hidden-State Recurrence
type: concept
tags:
  - recurrent-neural-networks
  - transformer-architectures
---

## Overview

Cross-token hidden-state recurrence feeds a computed hidden representation from an earlier token into a later token's network input or intermediate computation. It creates a temporal chain of learned state updates, allowing the computation path to grow with sequence length while keeping the number of blocks evaluated per token fixed. This differs from repeatedly applying a shared block along depth at the same token.

## Key Ideas

- **State transition:** A recurrent Transformer can be written as $H_t=F_\theta(H_{t-1};e_t,M_{\leq t})$. In RLT, $H_t$ includes both the final hidden vector and layerwise sliding-window KV caches; the causal encoder supplies separate features and global memory.
- **Feedback placement:** Feeding the previous final decoder output into a gated merge makes recurrence span the full decoder. Other placements, such as middle-layer or layerwise feedback, define different computation graphs.
- **Temporal parallelism:** Per-token nonlinear feedback requires ordered updates during training and prefill. Holding feedback fixed across a chunk permits layerwise parallel processing of known tokens within that chunk, at the cost of less frequent state updates.
- **Memory and work:** A bounded feedback vector and local decoder cache do not imply a bounded total cache or constant attention cost when the model also reads growing global encoder memory.
- **Gradient continuity:** Full-history training differentiates through feedback vectors and caches. Detaching a boundary state may preserve its numerical value but removes temporal credit assignment through that state.
- **Continuation consistency:** Prompt and response can use the same transition. Chunked variants must retain the boundary anchor, partial-chunk offset, and appropriate feedback register across serving boundaries.

## Important Papers

- [[papers/recurrent-looped-transformer|Recurrent Looped Transformer]] separates parallel causal encoding from recurrent decoding and measures the accuracy/parallelism tradeoff from per-token, chunked, and absent feedback.

## Related Concepts

- [[concepts/algorithmic-state-tracking|Algorithmic State Tracking]]: a task family that tests whether repeated updates remain accurate beyond training lengths.

