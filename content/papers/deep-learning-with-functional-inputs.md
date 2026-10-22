---
title: "Deep Learning with Functional Inputs"
type: paper
authors:
  - Barinder Thind
  - Kevin Multani
  - Jiguo Cao
year: 2023
doi: 10.1080/10618600.2022.2097914
tags:
  - functional-data-analysis
  - functional-neural-networks
  - scalar-on-function-regression
  - interpretable-deep-learning
---

## TL;DR

This paper introduces a [[Functional Neural Networks|functional neural network]] for predicting a scalar response from functional and scalar covariates. Its first hidden layer integrates each input curve against a learned, basis-expanded functional weight, after which ordinary neural-network layers can be used. Three real-data applications and four simulation settings report competitive or improved prediction, while the learned weight curves offer a limited view of how regions of the functional domain contribute to the first-layer representation.

## Research Question

Can densely connected neural networks accept one or more functional covariates directly, retain the flexibility of deep nonlinear prediction, and expose smooth first-layer functional weights that are easier to inspect than a vector of pointwise parameters?

## Motivation

Functional observations such as daily temperature trajectories or spectra are curves rather than ordinary finite-dimensional vectors. Feeding every sampled value into a conventional network ignores this structure, preserves observation noise, and makes the first-layer parameter count depend on sampling resolution. Classical functional regression uses smooth coefficient functions and is interpretable, but its standard forms can be too restrictive for nonlinear relationships. The paper combines functional inner products in the first layer with an otherwise conventional feed-forward network.

## Contributions

- Defines a first-layer neuron that accepts multiple functional covariates and scalar covariates, producing a scalar activation that can feed any standard downstream network architecture.
- Represents each functional weight with a finite basis expansion, reducing the first-layer parameter count from one weight per observation point to one coefficient per basis function.
- Trains basis coefficients jointly with ordinary network weights and biases using backpropagation and standard optimizers.
- Proposes visualizing learned functional weights during and after training as an aid to interpretation.
- Evaluates prediction on bike-rental, Tecator spectroscopy, and Canadian-weather data, then studies functional-weight recovery and prediction under four simulated link functions.

## Method

For functional covariates $x_k(t)$, scalar covariates $z_j$, and first-layer neuron $i$, the model computes

$$
v_i^{(1)} = g\left(\sum_{k=1}^{K}\int_{\mathcal T}\beta_{ik}(t)x_k(t)\,dt + \sum_{j=1}^{J}w_{ij}^{(1)}z_j+b_i^{(1)}\right).
$$

Each functional weight is represented in a chosen basis,

$$
\beta_{ik}(t)=\sum_{m=1}^{M_k}c_{ikm}\phi_{ikm}(t),
$$

so the functional contribution becomes a weighted sum of integrals $\int \phi_{ikm}(t)x_k(t)\,dt$. The implementation approximates these integrals numerically; the paper mentions composite Simpson's rule and uses B-spline or Fourier bases as examples. The basis coefficients $c_{ikm}$ are optimized with the other network parameters through mini-batch backpropagation. Because the integral returns a scalar, subsequent layers are ordinary neural layers and can use familiar choices such as dropout and early stopping.

When a covariate connects to multiple first-layer neurons, the paper summarizes its learned functional weights by averaging them across those neurons. This curve can be plotted over training epochs or compared with a coefficient estimated by functional linear regression. The paper also states a one-hidden-layer density result for continuous sigmoidal activations, with the proof placed in its supplement.

## Experiments

On 102 Saturdays from the bike-rental data, the model predicts daily rentals from hourly temperature curves. The reported four-layer FNN has the lowest 10-fold cross-validated MSPE (0.0669) and highest $R^2$ (0.582) among eight listed models; functional partial least squares with second-derivative penalization is close at 0.0701 MSPE and 0.545 $R^2$. The learned FNN weight is positive into the afternoon and tapers toward the end of the day, whereas the authors find the functional-linear weight less readily interpretable.

The Tecator experiment predicts meat fat content from the second derivative of a near-infrared absorbance curve plus water content. Among the listed results, the six-layer FNN has the lowest MEP (0.00883), but its $R^2$ is 0.965; several comparison models report higher $R^2$, reaching 0.997 for a semi-functional partial linear model. Thus the FNN leads on one reported metric but not the other.

For 35 Canadian cities, the model predicts annual precipitation from daily temperature curves. Under leave-one-out validation, the FNN reports MSPE 0.0194 and $R^2$ 0.541, compared with 0.0259 and 0.382 for the next-best listed MSPE, functional principal-component ridge regression. Its learned functional weight resembles the functional-linear estimate most strongly over the second half of the domain.

The weight-recovery study uses 300 observations per replicate and 250 replicates under identity, exponential, sigmoid, and logarithmic response relationships. Functional linear regression has lower root mean IMSE in the linear case (2.27 versus 2.39), while the FNN is lower in the three nonlinear cases (2.36 versus 2.53, 6.43 versus 6.70, and 6.46 versus 7.43). The FNN is substantially slower and has more variable estimates. A separate 100-replicate prediction study compares 14 functional and multivariate methods using relative MSPE; its plots report the FNN as a consistently strong performer across the four scenarios.

## Limitations

- The learned weight curves belong only to the first layer. Downstream nonlinear layers and other parameters also affect predictions, so a plotted weight is not a complete or uniquely causal explanation of the model.
- Averaging weights across first-layer neurons can obscure heterogeneous roles, signs, and interactions among neurons.
- Basis family, basis count, architecture, initialization, and other hyperparameters require selection; the proposed grid search can be costly.
- The FNN is slower and more variable than functional linear regression in the reported simulations, and functional linear regression recovers the coefficient more accurately under the linear scenario.
- The real-data studies are small and use different validation designs. In the Tecator example, the FNN's best MEP does not translate to the best reported $R^2$.
- The reported model predicts scalar responses. Function-on-function settings, explicit smoothness constraints, and additional first-layer penalties are left for future work.

## Related Concepts

- [[Functional Neural Networks]]
- [[Adaptive Basis Layers]]
- [[Functional Principal Component Analysis]]
- [[Function-Space Autoencoders]]
- Functional data analysis
- Scalar-on-function regression
- Basis expansion

## Related Papers

- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Functional Autoencoders for Functional Data Representation Learning]]
- [[Functional Autoencoder for Smoothing and Representation Learning]]
- Rossi and Conan-Guez (2005), "Functional multi-layer perceptron: A non-linear tool for functional data analysis."
- Cardot, Ferraty, and Sarda (1999), "Functional linear model."
- Ramsay and Silverman (2005), "Functional Data Analysis."

[[index|Library home]]
