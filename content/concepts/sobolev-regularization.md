---
title: Sobolev Regularization
type: concept
aliases:
  - Sobolev Training
  - Sobolev Loss
tags:
  - sobolev-spaces
  - regularization
  - derivative-penalties
  - scientific-machine-learning
---

## Overview

Sobolev regularization trains a model using information about a function's derivatives in addition to its values. Depending on the objective, training may match predicted derivatives to known target derivatives or penalize the magnitude of predicted derivatives directly. The latter can encourage smooth outputs even when derivative labels are unavailable.

## Key Ideas

- A Sobolev norm combines a function norm with norms of weak derivatives through a chosen order $k$. In learning objectives, the derivative order, norm order, and penalty weight determine which kinds of variation are discouraged.
- Derivative matching uses target derivative information and can teach local shape beyond observed values. Derivative penalization instead constrains the learned output itself and therefore acts as a smoothness prior.
- Automatic differentiation can evaluate derivative terms at sampled coordinates. Coordinate sampling then matters: a finite penalty controls behavior where derivatives are evaluated, not uniformly over the entire domain by default.
- Smoothness and fidelity compete. A strong derivative penalty can suppress noise and interpolation artifacts but can also erase legitimate sharp transitions or high-frequency structure.
- A continuously queryable model is not automatically accurate between samples. Derivative-aware training supplies an inductive bias, while interpolation accuracy still requires empirical evaluation on held-out coordinates and sampling patterns.

## Important Papers

- Czarnecki et al. (2017), "Sobolev Training for Neural Networks": trains neural networks with targets that include function derivatives.
- [[papers/continuous-spatiotemporal-transformer|Continuous Spatiotemporal Transformer]]: combines errors at observed points with norms of output derivatives at observed and dummy coordinates, avoiding a requirement for target derivatives.
- Son et al. (2021), "Sobolev Training for the Neural Network Solutions of PDEs": applies Sobolev training to learned PDE solutions.

## Related Concepts

- [[concepts/neural-operators|Neural Operators]]: function-space models for which derivative control and cross-resolution evaluation can be relevant.
- [[concepts/implicit-neural-representations|Implicit Neural Representations]]: coordinate-based functions that can be differentiated with respect to their inputs.
- Physics-informed neural networks
- Weak derivatives
- Smoothness regularization
