---
title: "Statistical Learning for Functional Data"
type: paper
authors:
  - Jiguo Cao
  - Sidi Wu
  - Muye Nanshan
  - Haolun Shi
  - Liangliang Wang
year: 2026
doi: 10.1146/annurev-statistics-042424-052503
tags:
  - functional-data-analysis
  - statistical-learning
  - deep-learning
  - functional-regression
  - functional-classification
---

## TL;DR

This review organizes statistical learning for functional data around representation, regression, and classification. It connects classical basis expansions and [[Functional Principal Component Analysis|FPCA]] with functional autoencoders, [[Functional Neural Networks|functional neural networks]], and operator-learning ideas, arguing that neural methods are most useful when nonlinear structure, interactions, or high-dimensional functional inputs defeat simpler models. Its demonstrations also show that no architecture dominates universally: performance depends on sampling density, task structure, regularization, tuning, and data scale.

## Research Question

How do classical and modern statistical-learning methods represent functional observations and solve scalar-on-function, function-on-scalar, function-on-function, and classification problems, and what practical trade-offs determine when deep learning is preferable?

## Motivation

Functional observations are curves, surfaces, or more general functions over continuous domains. Treating them as ordinary vectors discards smoothness and dependence, while classical FDA often relies on linear projections, additive structure, or prespecified bases. The review assesses how neural networks and other machine-learning methods extend this toolkit to nonlinear, multivariate, high-dimensional, sparse, and irregular settings without losing sight of interpretability and computation.

## Contributions

- Provides a unified account of basis expansion and FPCA as linear representations and functional autoencoders as nonlinear generalizations.
- Relates functional representation learning to implicit neural representations and [[Neural Operators|neural operators]], emphasizing the shared problem of learning maps involving function spaces.
- Organizes functional regression by response and predictor type: scalar-on-function, function-on-scalar, and function-on-function.
- Compares regression-based, discriminant-analysis, tree, SVM, and neural approaches to [[Functional Data Classification|functional classification]].
- Uses several empirical demonstrations to contrast classical and neural methods and identifies open problems in multidimensional data, irregular sampling, functional time series, interpretability, scalability, causal inference, and multimodal data fusion.

## Method

This is a comparative methodological review rather than a new estimator. For representation, it contrasts fixed basis expansions and covariance-driven FPCA with functional autoencoders whose encoder uses functional inner products and whose decoder reconstructs curves. It also discusses implicit coordinate networks and operator-learning architectures as adjacent approaches to function-valued representation.

For regression, the review uses the type of predictor and response as its main taxonomy. Scalar-on-function neural networks replace the first vector dot product with integrals against learned functional weights. Function-on-scalar networks predict basis coefficients or principal-component scores and reconstruct a curve-valued response. Function-on-function methods range from basis and kernel estimators to networks that learn nonlinear maps between function spaces. Regularization includes roughness, sparsity, orthogonality, dropout, and early stopping.

For classification, the review covers generalized functional linear models, functional linear and quadratic discriminant analysis, trees and random forests, SVMs, first-layer functional neural networks, and FPCA-score-based neural Bayes classifiers.

## Experiments

The review includes illustrative comparisons rather than one standardized benchmark. On El Nino sea-surface temperature curves, a functional autoencoder gives lower reconstruction error than FPCA at latent dimensions two and three, while FPCA is better at dimension four; the authors interpret this as evidence that nonlinear compression can be more efficient at small latent dimensions.

For scalar-on-function regression on diffusion-tensor imaging data, the functional neural network reports train/test MSEs of 8.95/61.27. The compared FPCA linear model reports 97.63/121.43, the penalized-spline linear model 101.07/82.79, and the additive model 96.51/85.68. For function-on-scalar regression on fertility trajectories from 92 countries, the reviewed neural approach is reported to have the lowest mean and variability of prediction error and to recover a nonlinear relationship between age at first marriage and a response-basis coefficient more closely than the linear model.

On the five-class Phoneme dataset, 10-fold cross-validation compares eight classifiers. The SVM has the highest mean accuracy, followed closely by the functional neural network and then a conventional neural network; the multiclass neural Bayes classifier performs worse in this example. This ranking reinforces the review's broader conclusion that deep functional architectures should be compared with strong task-specific classical and machine-learning baselines.

## Limitations

- As a broad review, the paper synthesizes heterogeneous studies whose datasets, metrics, validation schemes, and implementations are not directly comparable.
- Its new demonstrations are illustrative and relatively limited; they do not establish general superiority of neural FDA methods.
- Some reported advantages require dense enough observations for numerical integration or preprocessing, whereas extreme sparsity and irregularity remain open problems.
- Neural methods add architecture and regularization choices, computational cost, and weaker interpretability relative to many classical models.
- The review identifies but does not resolve uncertainty quantification, causal inference, streaming computation, multimodal integration, and scalable analysis of multidimensional functional data.

## Related Concepts

- [[Functional Principal Component Analysis]]
- [[Function-Space Autoencoders]]
- [[Functional Neural Networks]]
- [[Functional Data Classification]]
- [[Adaptive Basis Layers]]
- [[Neural Operators]]

## Related Papers

- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Modern Non-Linear Function-on-Function Regression]]
- [[Non-linear Functional Modeling using Neural Networks]]
- [[Nonlinear Functional Principal Component Analysis Using Neural Networks]]

[[index|Library home]]
