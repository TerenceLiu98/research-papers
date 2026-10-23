---
title: "Non-linear Functional Modeling using Neural Networks"
type: paper
authors:
  - Aniruddha Rajendra Rao
  - Matthew Reimherr
year: null
tags:
  - functional-data-analysis
  - functional-neural-networks
  - scalar-on-function-regression
  - basis-expansion
  - nonlinear-regression
---

## TL;DR

This paper introduces two [[Functional Neural Networks|functional neural-network]] architectures for nonlinear scalar-on-function regression that preserve function-valued representations through their hidden layers. The Functional Direct Neural Network (FDNN) learns discretized functional weights on common grids, while the Functional Basis Neural Network (FBNN) learns basis coefficients for greater parsimony and support for irregular sampling. In the reported simulations and three applications, the proposed models are competitive in simple settings and usually improve prediction when nonlinearities and interactions are more complex.

## Research Question

Can a neural network predict a scalar response from one or more functional predictors while retaining functional structure across all hidden layers and learning nonlinear relations without assuming an additive, index, or quadratic form?

## Motivation

Standard scalar-on-function models impose specific structures: continuously additive models capture pointwise nonlinearities but omit interactions, index models compress curves into a few projections, and quadratic models encode a fixed interaction form. Earlier functional neural networks apply functional inner products only in the first layer and then use ordinary scalar hidden layers. The paper seeks a more flexible architecture in which intermediate representations remain functions, allowing the network to exploit continuity and interactions across the predictor domain.

## Contributions

- Defines continuous hidden neurons that map function-valued inputs to function-valued outputs through learned integral operators and pointwise nonlinear activations.
- Introduces FDNN, which directly learns sampled intercept and weight functions for dense curves observed on a common grid.
- Introduces FBNN, which expands functional parameters in bases and learns their coefficients, reducing parameter count and accommodating irregular grids more naturally.
- Derives functional-gradient backpropagation updates using Frechet derivatives for direct functional parameters and ordinary coefficient gradients for basis-expanded parameters.
- Evaluates continuous and binary responses under six simulated relationships and on spectroscopy, growth-curve, and phoneme datasets.

## Method

For hidden layer $l$ and continuous neuron $k$, the architecture computes

$$
H_k^{(l)}(s)=\sigma\left(b_k^{(l)}(s)+\sum_j\int w_{j,k}^{(l)}(s,t)H_j^{(l-1)}(t)\,dt\right),
$$

where $H_j^{(0)}=X_j$. The final functional neuron integrates the last hidden functions against univariate weight functions to produce a scalar prediction. Linear output activation is used for continuous responses and sigmoid activation for binary responses.

FDNN represents the functional parameters directly on grids and applies numerical integration. Its layer grids may differ in resolution, but it is primarily designed for dense, regularly sampled inputs. FBNN instead uses finite expansions for intercept functions and tensor-product expansions for bivariate weights. It learns the expansion coefficients, with B-splines used in the experiments. Both variants are trained by backpropagation; validation-based early stopping is used to limit overfitting.

## Experiments

The simulation study draws 1,500 curves from a Matern Gaussian process on 200 equally spaced points. Each of six relationships is repeated 100 times with 1,000 training observations, including 500 used for validation by neural methods, and 500 test observations. The relationships are linear, continuously additive, single-index, multiple-index, quadratic, and complex quadratic. Comparisons include functional linear regression (FLM), a continuously additive model (CAM), an ordinary neural network (NN), and an earlier functional neural network (FNN).

For continuous responses, FDNN and FBNN are close to the best specialized methods in the linear and additive settings. Their advantage is larger for structured nonlinearities: in the multiple-index setting, test RMSE is 1.100 for FDNN and 1.060 for FBNN, versus 1.290 for the strongest listed baseline, FNN. In the complex-quadratic setting, the corresponding RMSEs are 1.232 and 1.202, versus 1.414 for CAM. Binary-response results are more modest: the proposed methods have the lowest listed classification errors for the single-index, multiple-index, and quadratic settings, while several methods are nearly tied for logistic, additive, and complex-quadratic settings.

The three real-data tasks use near-infrared meat spectra to predict fat content, childhood growth curves to classify gender, and speech log-periodograms to distinguish two phonemes. FDNN and FBNN achieve the two lowest listed errors on all three tasks. FDNN reports RMSE 0.822 on the fat-spectrum task, versus 1.197 for FBNN and 1.249 for the strongest listed baseline, NN. Both proposed models report classification error 0.100 on growth curves; their phoneme errors are 0.156 and 0.160, versus 0.187 for FLM.

## Limitations

- The simulations use one dense, regularly sampled functional predictor, so they do not test the claimed flexibility with multiple predictors or irregular observations directly.
- FDNN is intended for dense common grids. FBNN can accommodate irregular grids but depends on basis selection and imputation quality; genuinely sparse functional data is left for future work and may require nontrivial extensions.
- Layer counts, neuron counts, layer grids, basis families, and basis counts require tuning. The experiments use shallow networks and grid search over selected configurations.
- Early stopping improves the reported results, but the method can still overfit when networks are too deep or trained too long.
- The paper derives optimization gradients but leaves statistical theory, including estimation and generalization properties, for future research.
- The empirical evidence covers six synthetic mappings and three selected datasets; it does not establish universal superiority over other functional regression methods.

## Related Concepts

- [[Functional Neural Networks]]
- [[Functional Principal Component Analysis]]
- Functional data analysis
- Scalar-on-function regression
- Basis expansion
- Continuously additive models
- Functional gradient descent

## Related Papers

- [[Modern Non-Linear Function-on-Function Regression]]
- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- Rossi, Conan-Guez, and Fleuret (2002), "Functional data analysis with multi layer perceptrons."
- Wang et al. (2019), "Multilayer perceptron for sparse functional data."
- Yao and Muller (2010), "Functional quadratic regression."

[[index|Library home]]
