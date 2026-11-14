---
title: Damped Inference-Time Layer Reuse
type: concept
tags:
  - looped-transformers
  - inference-time-compute
  - numerical-integration
---

## Overview

Damped inference-time layer reuse spends additional computation by repeatedly evaluating a frozen transformer layer or short layer window while scaling its residual updates. It aims to refine representations without moving as far from the original downstream input distribution as unrestricted repetition would.

## Key Ideas

- For a window $g$, the residual field is $F_g(x)=g(x)-x$. Damped steps use $x+hF_g(x)$; choosing $h=1/K$ keeps the nominal integration interval fixed across $K$ evaluations.
- Blending the refined endpoint with $g(x)$ anchors computation to the trained one-pass behavior.
- Block-wise and layer-wise reuse define different trajectories. Expert routing and KV-cache writes must be handled explicitly; recurrence alone does not preserve either.
- Better numerical integration is not automatically better prediction. Window placement, solver, iteration count, and downstream distribution shift remain empirical questions.
- Finite-step refinement does not require convergence to an equilibrium. Accelerator failures and task accuracy should not be mistaken for proofs about fixed-point stability.

## Important Papers

- [[papers/training-free-looped-transformers|Training-Free Looped Transformers]] develops this residual-field view and reports frozen-checkpoint experiments, with unresolved differences between main-text and appendix descriptions of selection protocols.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]
