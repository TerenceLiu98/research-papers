---
title: "Modern Non-Linear Function-on-Function Regression"
type: paper
authors:
  - Aniruddha Rajendra Rao
  - Matthew Reimherr
year: 2021
arxiv: "2107.14151"
tags:
  - functional-data-analysis
  - function-on-function-regression
  - functional-neural-networks
  - basis-expansion
  - roughness-penalization
---

## TL;DR

This paper extends [[Functional Neural Networks]] to nonlinear function-on-function regression by keeping every hidden representation function-valued. Its direct implementation, FFDNN, learns discretized functional weights on a grid; its basis implementation, FFBNN, learns coefficients of basis-expanded weights. Across six simulations and two real datasets, both variants improve predictive RMSE over the evaluated linear, additive, ordinary neural-network, and earlier functional-neural-network baselines in nonlinear settings, while roughness penalties trade a small amount of predictive accuracy for smoother parameter functions.

## Research Question

Can a neural network map one or more functional predictors to a functional response while preserving the functional structure throughout all hidden layers, learning nonlinear relations and within-function interactions without imposing a linear, additive, index, or quadratic model form?

## Motivation

Classical function-on-function regression often specifies a linear, additive, single-index, multiple-index, or quadratic relation. These structures can be effective when correctly specified but restrict which nonlinearities and interactions can be learned. Earlier functional neural networks generally convert functional inputs into scalar hidden activations and then use ordinary layers; even prior extensions to functional responses preserve function-valued structure only at the input and output. The paper instead proposes continuous hidden neurons so that functions flow through the entire network.

## Contributions

- Defines a multilayer architecture whose hidden neurons, biases, and pairwise connection weights are functions, producing a continuous mapping from functional predictors to a functional response.
- Introduces Function-on-Function Direct Neural Networks (FFDNN), which discretize the functional parameters and optimize them with functional gradients and backpropagation.
- Introduces Function-on-Function Basis Neural Networks (FFBNN), which represent the functional parameters in a finite basis and optimize basis coefficients for a more parsimonious model that can accommodate irregularly observed curves.
- Adds roughness penalties based on integrated squared second derivatives for intercept functions and the squared Laplacian for bivariate weight functions.
- Evaluates the methods under six data-generating relations and on electricity-demand and bike-rental datasets.

## Method

For hidden layer $l$ and continuous neuron $k$, the proposed architecture computes

$$
H_k^{(l)}(s)=\sigma\left(b_k^{(l)}(s)+\sum_j\int w_{j,k}^{(l)}(s,t)H_j^{(l-1)}(t)\,dt\right),
$$

with input functions $H_j^{(0)}=X_j$ and final functional output $H^{(L)}=\widehat Y$. Each connection therefore applies an integral operator with a learned bivariate weight function, followed by a pointwise nonlinear activation. The model minimizes integrated squared prediction error.

FFDNN evaluates the functions on grids and directly learns their sampled values. It is intended for dense, regularly observed curves and permits different grid sizes across layers. FFBNN expands intercepts and bivariate weights in bases such as B-splines, wavelets, or Fourier functions, then learns the basis coefficients. This reduces the number of free parameters and makes irregular observation grids easier to handle.

To control overfitting and improve smoothness, the authors compare validation-based early stopping with roughness penalization. The penalized objective adds integrated squared curvature for each functional intercept and the integrated squared Laplacian for each bivariate weight. FFDNN approximates these derivatives numerically, whereas FFBNN differentiates the basis functions.

## Experiments

The simulation study generates 1,100 Gaussian-process predictor curves on 100 grid points and response curves on 75 points. Each of six settings is repeated 100 times, with 600 observations allocated to training and 500 to testing; early-stopped neural models use 100 of the training observations for validation. The settings are linear, continuously additive, single-index, multiple-index, quadratic, and complex quadratic. Comparisons include a function-on-function linear model (FFLM), a continuously additive model (CAM), an ordinary neural network (NN), and a prior functional neural network (FNN).

All methods are close to the noise-level RMSE of 1 in the linear setting. In the five nonlinear settings, the best result is always from FFDNN or FFBNN. Their respective RMSEs are 1.225 and 1.213 for CAM, 1.019 and 1.047 for single index, 1.422 and 1.552 for multiple index, 1.025 and 1.052 for quadratic, and 2.293 and 2.633 for complex quadratic. In the complex quadratic case, the strongest listed baseline is FNN at 3.575, compared with 2.293 for FFDNN.

Roughness-penalized versions yield visibly smoother intercept and bivariate weight functions. Their RMSE is usually slightly worse than early stopping, although penalized FFDNN improves from 2.293 to 2.133 in the complex quadratic setting. The appendix compares several five-fold cross-validation rules for choosing an early-stopping iteration and finds no consistently best rule, with greater instability for FFBNN.

The Adelaide application predicts half-hourly Saturday electricity demand from temperature for 508 days. FFDNN and FFBNN report test RMSEs of 126.219 and 128.049, compared with 140.917 for the strongest listed baseline, CAM. The Washington, D.C. application predicts hourly Saturday casual-bike rentals from temperature for 105 days; FFDNN and FFBNN report 33.141 and 33.113, compared with 36.002 for CAM. These results support improved prediction on the two selected datasets, not universal dominance beyond the evaluated settings.

## Limitations

- The experiments are limited to one simulated predictor function and two modest real datasets with one temperature predictor; broader evidence for multiple functional predictors is not reported.
- The framework assumes completely observed dense functions. FFBNN can accommodate irregular grids, but genuinely sparse functional data is left for future work and may require substantial extensions.
- Architecture, layer grids, neuron counts, basis families, basis counts, and smoothing strengths require tuning. The cross-validated early-stopping rules show inconsistent behavior.
- The paper derives optimization gradients but does not provide a deeper statistical theory for estimation, approximation, or generalization of the proposed architecture.
- Smoother parameter functions do not by themselves make a multilayer nonlinear model interpretable. The paper presents roughness penalization as a step toward interpretation rather than a complete explanation method.
- The reported runtime comparisons use R on one laptop and are tied to the selected architectures, so they do not establish general computational scaling.

## Related Concepts

- [[Functional Neural Networks]]
- [[Functional Principal Component Analysis]]
- Function-on-function regression
- Functional data analysis
- Basis expansion
- Roughness penalization
- Continuously additive models

## Related Papers

- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- Rossi, Conan-Guez, and Fleuret (2002), "Functional data analysis with multi layer perceptrons."
- Kim, Staicu, Maity, Carroll, and Ruppert (2018), "Additive function-on-function regression."
- Sun and Wang (2020), "Function-on-function quadratic regression models."
- Wang, Wang, Gupta, Rao, and Khorasgani (2020), "A non-linear function-on-function model for regression with time series data."

[[index|Library home]]
