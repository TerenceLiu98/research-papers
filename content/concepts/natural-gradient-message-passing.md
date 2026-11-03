---
title: Natural-Gradient Message Passing
type: concept
aliases:
  - NGMP
tags:
  - variational-inference
  - message-passing
  - information-geometry
  - factor-graphs
---

## Overview

Natural-gradient message passing (NGMP) approximates an exact factor-to-edge belief-propagation message by projecting its log-message into the tangent space of the exponential family chosen for the receiving edge. The projection is evaluated at the current receiving marginal, so the finite message preserves the component of local cavity uncertainty that the edge family can represent.

## Key Ideas

- **Edge-local form constraints:** Each constrained edge can use its own regular exponential family. The surrounding factor beliefs and exact BP computations remain local rather than being replaced by one global posterior family.
- **Fisher projection:** For sufficient statistics $T_i$, Fisher information $G_i$, and exact log-message $\ell_{a\to i}$, the outgoing natural parameter is

  $$
  \eta_{a\to i}
  =G_i^{-1}\operatorname{Cov}_{q_i}[T_i,\ell_{a\to i}]
  =\nabla_{\mu_i}\mathbb E_{q_i}[\ell_{a\to i}].
  $$

- **Projected stationarity:** On a degree-two edge, the marginal natural parameter equals the sum of its two projected incoming message parameters. The resulting iteration is a natural-gradient fixed-point method for the edge-constrained Bethe stationary condition.
- **Receiving-marginal dependence:** Unlike ordinary BP or VMP, a factor's finite outgoing message depends on the marginal that receives it because that marginal defines the projection point and tangent space.
- **Per-interface surrogates:** A multi-interface non-conjugate factor emits a separate conjugate surrogate message for each constrained interface. The surrogate graph can then use ordinary conjugate BP while an outer loop refreshes the projected parameters.
- **Relationship to nearby methods:** VMP averages the log-factor over neighboring beliefs before constructing an outgoing message. NCVMP takes one natural-gradient projection of that tilted VMP message, and PVMP iterates the complete edge projection. Expectation propagation projects a tilted marginal and divides out the cavity. NGMP instead projects the exact factor-to-edge cavity log-message.
- **Practical regime:** NGMP is most useful when uncertainty entering a non-conjugate factor persists and approximate updates are repeatedly composed, as in smoothing across missing stretches or sequential posterior reuse. When neighboring beliefs concentrate, its updates approach their VMP counterparts.
- **Stabilization:** Damping should be applied in natural/message coordinates. Momentum can accelerate difficult hierarchies, but unconstrained momentum may leave a family's valid natural-parameter domain.

## Important Papers

- [[papers/information-geometry-of-message-passing|Information Geometry of Message Passing]]: derives the edge-constrained Bethe stationary condition, the projected factor-to-edge message, its surrogate implementation, and empirical comparisons with VMP, PVMP, and NCVMP.
- Knowles and Minka (2011), "Non-conjugate Variational Message Passing for Multinomial and Binary Regression": an important precursor using the receiving marginal's Fisher information for projected VMP updates.
- Khan and Lin (2017), "Conjugate-Computation Variational Inference": develops the conjugate-surrogate interpretation of natural-gradient contributions in non-conjugate variational inference.
- Şenöz et al. (2021), "Variational Message Passing and Local Constraint Manipulation in Factor Graphs": provides the local constrained-free-energy framework used by NGMP.

## Related Concepts

- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: learns a shared inference map, whereas NGMP solves local variational stationarity through model-structured messages.
- [[concepts/forecast-combination|Forecast Combination]]: precision-gated forecast ensembles are one application in which NGMP preserves probabilistic scale as well as relative expert weights.
