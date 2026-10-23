---
title: Rational-ANOVA Networks
type: concept
aliases:
  - RAN
  - RANs
  - Rational ANOVA Networks
tags:
  - neural-networks
  - functional-anova
  - rational-approximation
  - learnable-activations
---

## Overview

Rational-ANOVA Networks (RANs) are neural networks that combine a low-order functional-ANOVA decomposition with learnable rational functions. A model represents each input coordinate through a main-effect unit and represents selected coordinate pairs through interaction units. The explicit interaction set controls second-order capacity, while rational numerators and strictly positive denominators provide flexible nonlinear transformations without poles.

## Key Ideas

- **Main and pairwise effects:** The architecture sums univariate effects and a sparse, budgeted set of bivariate effects. This makes interaction order explicit, although learned effects remain predictive rather than causal.
- **Pole-free rational units:** Each unit divides a low-degree polynomial numerator by a denominator of the form $1+\operatorname{softplus}(q)+\varepsilon$. The positive lower bound prevents poles and keeps the mapping smooth for finite parameters.
- **Identity-safe gating:** A residual gate interpolates between the identity and the rational map. Initializing the gate near zero helps preserve activation and gradient scales when rational units are composed deeply.
- **Controllable interaction topology:** The pair set can be random, heuristic, or learned and can be expanded to trade computation for second-order expressivity. Sparse connectivity alone may lose capacity; the reported ablations find the best results when it is paired with rational units.
- **Structured influence:** Because parameters belong to main-effect or pairwise groups, the rational-unit portion of the empirical neural tangent kernel decomposes along the same topology. This makes cross-sample coupling more traceable than in a densely mixed MLP, but does not eliminate the global coupling introduced by a shared linear head.
- **Architecture-aligned approximation:** Low-degree rational functions can efficiently represent ratios, saturation, sharp transitions, and some near-singular shapes. This bias is especially useful when the target has rational structure and less universally advantageous for unrelated function classes.

## Important Papers

- [[papers/rational-anova-networks|Rational ANOVA Networks]]: introduces the architecture, positive-denominator units, residual gating, stability analysis, and benchmark suite.
- Molina, Schramowski, and Kersting (2019), "Pade Activation Units: End-to-End Learning of Flexible Activation Functions in Deep Networks," arXiv:1907.06732: develops learned rational activation functions.
- Boulle, Nakatsukasa, and Townsend (2020), "Rational Neural Networks," arXiv:2004.01902: analyzes rational functions as neural-network components.
- Hu et al. (2023), "Interpretable Machine Learning Based on Functional ANOVA Framework: Algorithms and Comparisons," arXiv:2305.15670: provides related functional-ANOVA modeling context.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: also learn nonlinear functions as network primitives, commonly using edge-wise splines rather than rational units in an explicit ANOVA topology.
- Functional ANOVA: supplies the main-effect and interaction decomposition.
- Generalized additive models: the main-effects-only case; adding selected pairwise terms extends it beyond additive separability.
- Rational approximation: supplies compact quotient representations for nonlinear shapes.
- Residual learning: motivates the near-identity gate used for deep optimization.
