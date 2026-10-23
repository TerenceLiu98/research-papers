---
title: Kolmogorov-Arnold Networks
type: concept
aliases:
  - KAN
  - KANs
tags:
  - neural-networks
  - spline-models
  - interpretable-machine-learning
---

## Overview

Kolmogorov-Arnold Networks (KANs) are neural networks whose edges carry learnable univariate functions instead of scalar weights. Inspired by the Kolmogorov-Arnold representation theorem, they construct multivariate functions by summing and composing these edge functions. Common implementations parameterize them with splines, making individual input-output transformations inspectable and refinable.

## Key Ideas

- **Functions on edges:** An MLP places fixed nonlinear activations at nodes and learns scalar connection weights. A KAN learns a univariate function on each connection and sums incoming edge outputs at a node.
- **Compositional layers:** A KAN layer is a matrix of univariate functions, and deeper KANs compose these functional matrices. The theorem motivates this structure but does not by itself guarantee that a finite trained network will recover a unique or interpretable decomposition.
- **Spline parameterization:** B-splines provide a flexible finite representation of each edge function. Grid refinement can increase approximation resolution, while pruning can remove weak connections.
- **Inspection and symbolic approximation:** Plotting edge functions can reveal how individual coordinates affect intermediate and final values. Symbolic regression may approximate those functions with formulas, but interpretability depends on fidelity, stability, and the size of the composed network.
- **Computational tradeoff:** Edge-specific functions can achieve compact parameter counts, yet their heterogeneous evaluation is less amenable to batching than standard dense matrix multiplication.
- **Architecture determines the tradeoff:** KAN layers can replace dense or recurrent transformations, but a favorable result does not follow from the representation theorem alone. In autoencoders, reported reconstruction gains may coincide with much larger parameter counts and additional dense layers, so capacity-matched comparisons are necessary to attribute improvements to edge functions.

## Important Papers

- [[papers/kan-kolmogorov-arnold-networks|KAN: Kolmogorov-Arnold Networks]]: introduces the modern spline-based KAN architecture, grid refinement, pruning, and symbolic snapping.
- [[papers/rational-anova-networks|Rational ANOVA Networks]]: compares spline-based KANs with pole-free rational units arranged as main effects and sparse pairwise interactions.
- [[papers/kolmogorov-arnold-network-autoencoders|Kolmogorov-Arnold Network Autoencoders]]: evaluates KAN layers for image reconstruction and latent KNN classification on MNIST, SVHN, and CIFAR-10.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: develops T-KAN and MT-KAN for temporal forecasting.
- Vaca-Rubio et al. (2024), "Kolmogorov-Arnold Networks (KANs) for Time Series Analysis," arXiv:2405.08790: applies KANs to time-series analysis.

## Related Concepts

- Symbolic regression: approximates learned edge functions with compact mathematical expressions.
- [[concepts/functional-neural-networks|Functional Neural Networks]]: a broader family of neural architectures involving function-valued inputs, parameters, or transformations.
- [[concepts/adaptive-basis-layers|Adaptive Basis Layers]]: related use of learned basis expansions to represent flexible transformations.
