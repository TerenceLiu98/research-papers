---
title: Adaptive Basis Layers
type: concept
aliases:
  - Adaptive Functional Neural Networks
  - AdaFNN
  - Neural Basis Layers
tags:
  - functional-data-analysis
  - supervised-dimension-reduction
  - representation-learning
  - neural-networks
---

## Overview

Adaptive basis layers turn a functional input into a finite-dimensional representation using basis functions learned from a supervised objective. Instead of selecting B-splines, Fourier functions, or covariance eigenfunctions before fitting the predictor, each basis is parameterized by a small neural network and updated through the downstream prediction loss. The resulting representation is designed to retain variation that is useful for the response, including predictive directions that explain little overall variation in the functional input.

## Key Ideas

- A basis node represents a continuous function $\beta_i(t)$ and outputs the inner product $\langle \beta_i,X\rangle$. On discretely sampled data, numerical quadrature computes this score from the observed values $X(t_j)$.
- The vector of basis scores feeds an ordinary neural predictor. Backpropagation trains the basis micro-networks and downstream layers jointly, combining dimension reduction and prediction in one model.
- Task supervision distinguishes adaptive basis learning from [[Functional Principal Component Analysis|FPCA]]: FPCA prioritizes directions of high functional variance, whereas an adaptive basis can prioritize a lower-variance direction that predicts the response.
- Pairwise cosine-similarity penalties encourage different basis nodes to capture nonredundant directions. Integrated $L_1$ penalties encourage bases with restricted support, making irrelevant regions of the functional domain easier to identify.
- Non-uniform grids can be handled with appropriate integration weights, but sparse observations make the inner products difficult to estimate accurately.
- The learned predictor may be identifiable even when its individual bases are not. Basis shapes should therefore be interpreted as one parameterization of the predictive map rather than uniquely recovered ground-truth functions.

## Important Papers

- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- Rossi and Conan-Guez (2005), "Functional multi-layer perceptron: A non-linear tool for functional data analysis."
- Rossi, Delannay, Conan-Guez, and Verleysen (2005), "Representation of functional data in neural networks."

## Related Concepts

- [[Functional Principal Component Analysis]]
- [[Function-Space Autoencoders]]
- Functional data analysis
- Basis expansion
- Supervised dimension reduction
- Domain selection
