---
title: Functional Neural Networks
type: concept
aliases:
  - FNNs
  - Neural Networks with Functional Inputs
  - Functional Neural Network
tags:
  - functional-data-analysis
  - neural-networks
  - scalar-on-function-regression
  - function-on-function-regression
  - basis-expansion
---

## Overview

Functional neural networks use curves or other function-valued observations as inputs, hidden representations, or outputs. A common scalar-on-function design replaces the first layer's ordinary dot product with functional inner products between each input function and learned functional weights. These operations turn infinite-dimensional inputs into scalar activations, after which conventional nonlinear layers can model the response. Function-on-function variants can instead preserve function-valued states across hidden layers by learning integral operators between continuous neurons.

## Key Ideas

- A functional neuron computes an activation from terms of the form $\int_{\mathcal T}\beta(t)x(t)\,dt$, optionally combined with ordinary scalar covariates.
- A continuous functional neuron can produce an entire function, applying a nonlinear activation to $b(s)+\sum_j\int w_j(s,t)H_j(t)\,dt$. Stacking these neurons supports nonlinear function-on-function regression without collapsing every hidden representation to a scalar.
- Representing $\beta(t)$ in a finite basis converts functional-weight learning into optimization over basis coefficients. Numerical quadrature evaluates the resulting inner products on sampled curves.
- In function-valued layers, direct grid parameterization is straightforward for dense regular curves, while tensor-product basis expansions reduce parameter count and better accommodate irregular observation grids.
- If a curve has $P$ sampled values but its weight uses $M<P$ basis functions, a first layer with $n$ neurons uses $(M+1)n$ rather than $(P+1)n$ parameters for that input and its biases.
- The basis family and basis count impose smoothness and control capacity. Too few basis functions restrict the learned effect, while too many weaken the intended compression and may fit noise.
- Roughness penalties on functional biases and bivariate connection weights can improve smoothness, but smooth parameter surfaces are not a complete explanation of a deep nonlinear predictor.
- Learned functional weights can show which portions of the domain contribute to first-layer activations. In a deep nonlinear model they are partial diagnostics, not complete effect estimates or causal explanations.
- Related architectures differ in what is learned. Fixed-basis FNNs optimize coefficients over prespecified bases; [[Adaptive Basis Layers]] parameterize the basis functions themselves with neural networks; [[Function-Space Autoencoders]] learn unsupervised representations or reconstructions in function space.

## Important Papers

- [[Nonlinear Functional Principal Component Analysis Using Neural Networks]]
- [[Non-linear Functional Modeling using Neural Networks]]
- [[Deep Learning with Functional Inputs]]
- [[Modern Non-Linear Function-on-Function Regression]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- Rossi and Conan-Guez (2005), "Functional multi-layer perceptron: A non-linear tool for functional data analysis."

## Related Concepts

- [[Adaptive Basis Layers]]
- [[Function-Space Autoencoders]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Functional regression
- Function-on-function regression
- Scalar-on-function regression
- Basis expansion
