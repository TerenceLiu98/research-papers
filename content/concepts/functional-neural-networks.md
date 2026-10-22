---
title: Functional Neural Networks
type: concept
aliases:
  - FNNs
  - Neural Networks with Functional Inputs
tags:
  - functional-data-analysis
  - neural-networks
  - scalar-on-function-regression
  - basis-expansion
---

## Overview

Functional neural networks accept curves or other function-valued observations as covariates. A common scalar-on-function design replaces the first layer's ordinary dot product with functional inner products between each input function and learned functional weights. These operations turn infinite-dimensional inputs into scalar activations, after which conventional nonlinear layers can model the response.

## Key Ideas

- A functional neuron computes an activation from terms of the form $\int_{\mathcal T}\beta(t)x(t)\,dt$, optionally combined with ordinary scalar covariates.
- Representing $\beta(t)$ in a finite basis converts functional-weight learning into optimization over basis coefficients. Numerical quadrature evaluates the resulting inner products on sampled curves.
- If a curve has $P$ sampled values but its weight uses $M<P$ basis functions, a first layer with $n$ neurons uses $(M+1)n$ rather than $(P+1)n$ parameters for that input and its biases.
- The basis family and basis count impose smoothness and control capacity. Too few basis functions restrict the learned effect, while too many weaken the intended compression and may fit noise.
- Learned functional weights can show which portions of the domain contribute to first-layer activations. In a deep nonlinear model they are partial diagnostics, not complete effect estimates or causal explanations.
- Related architectures differ in what is learned. Fixed-basis FNNs optimize coefficients over prespecified bases; [[Adaptive Basis Layers]] parameterize the basis functions themselves with neural networks; [[Function-Space Autoencoders]] learn unsupervised representations or reconstructions in function space.

## Important Papers

- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- Rossi and Conan-Guez (2005), "Functional multi-layer perceptron: A non-linear tool for functional data analysis."

## Related Concepts

- [[Adaptive Basis Layers]]
- [[Function-Space Autoencoders]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Functional regression
- Scalar-on-function regression
- Basis expansion
