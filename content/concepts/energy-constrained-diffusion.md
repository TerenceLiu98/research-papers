---
title: Energy-Constrained Diffusion
type: concept
tags: [neural-diffusion, graph-learning, transformers]
---

## Overview

Energy-constrained diffusion designs representation propagation so that discrete diffusion updates decrease a specified regularized energy. It connects the local exchange of node features to a global criterion for representation consistency and provides a route from energy design to attention mechanisms.

## Key Ideas

- Static couplings yield quadratic smoothness penalties; adaptive couplings can arise from derivatives of concave, non-decreasing penalties on squared embedding distance.
- Normalizing these derivatives produces attention weights that downweight distant representations. A quadratic surrogate makes the relationship to iterative energy minimization explicit.
- Restricting couplings to observed edges produces local propagation, while allowing all pairs supports latent graph inference. Efficient factorization of the similarity function can make global aggregation linear in node count at fixed feature width.
- Energy descent need not preserve useful distinctions: excessive smoothing can collapse representations. Source terms inject node-specific information, and descent claims remain conditional on the modeled dynamics and step-size assumptions.

## Important Papers

- [[papers/transformers-from-diffusion-a-unified-framework-for-neural-message-passing|Transformers from Diffusion: A Unified Framework for Neural Message Passing]] develops the framework and the simple and advanced DIFFormer attention variants.

## Related Concepts

- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
