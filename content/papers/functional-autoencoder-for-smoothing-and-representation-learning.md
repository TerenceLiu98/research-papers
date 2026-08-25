---
title: "Functional Autoencoder for Smoothing and Representation Learning"
type: paper
authors:
  - Sidi Wu
  - Cédric Beaulac
  - Jiguo Cao
year: 2024
doi: "10.1007/s11222-024-10501-w"
tags:
  - functional-data-analysis
  - functional-autoencoders
  - representation-learning
  - curve-smoothing
  - neural-networks
---

## TL;DR

This paper proposes a functional autoencoder (FAE) for discretely observed functional data. A deterministic feature layer projects observations onto basis functions before the neural network, while a deterministic coefficient layer reconstructs a continuous curve from learned basis coefficients. The same model therefore learns a low-dimensional representation and smooths noisy, regularly or irregularly sampled curves without a separate preprocessing step.

## Research Question

Can a neural-network autoencoder learn nonlinear representations from discretely observed functional data while simultaneously recovering smooth curves, including when observations are irregularly spaced or substantially incomplete?

## Motivation

Functional data are often collected as noisy snapshots rather than fully observed curves. Conventional workflows first smooth these observations and then reduce their dimension with basis coefficients or functional principal component (FPC) scores. Basis expansion and FPCA are primarily linear representations, while a conventional vector autoencoder ignores the functional structure and only reconstructs values at the input time points. The paper targets a single model that preserves the functional structure, captures nonlinear relationships, and avoids preemptive smoothing.

## Contributions

- Introduces a discrete FAE whose input and output layers use basis-expanded functional weights rather than unrestricted scalar network weights.
- Adds a deterministic feature layer that computes numerical inner products between observed values and input basis functions. This reduces the effective network input dimension and gives irregularly sampled curves a common feature representation.
- Adds a deterministic coefficient layer whose basis expansion reconstructs a continuous output curve, so the model performs smoothing as part of representation learning.
- Shows that a one-hidden-layer linear FAE is approximately connected to FPCA under an orthonormal weight constraint, while nonlinear activations extend the learned mapping beyond linear projections.
- Supports a second-difference roughness penalty on output coefficients and reports lower computational cost than a comparable dense autoencoder when the input basis dimension is much smaller than the number of observed time points.

## Method

For regularly sampled observations $X(t_j)$, the feature layer computes

$$
f_m = \sum_j \omega_j X(t_j)\phi_m^{(I)}(t_j),
$$

where $\omega_j$ are numerical integration weights and $\phi_m^{(I)}$ are preselected input basis functions. The resulting features are passed through ordinary fully connected hidden layers. The final hidden representation is mapped to output coefficients $b_m$, and the decoder evaluates

$$
\hat{X}(t_j) = \sum_m b_m\phi_m^{(O)}(t_j).
$$

The output basis functions can be evaluated anywhere in the observation interval, making the reconstruction continuous rather than limited to the observed timestamps. Training minimizes reconstruction MSE over subjects and observed time points. When many output basis functions are used, the objective can include a second-difference penalty on the coefficients to control roughness.

For irregularly sampled curve $i$, the feature layer uses that curve's observed timestamps and integration weights to compute the same basis-projected features. The hidden network therefore receives a fixed-size feature vector even when the number and locations of observations differ across curves.

## Experiments

The simulations generate functional curves by mapping Gaussian-mixture representations to B-spline coefficients. In a linear, regularly sampled setting with 6,000 observations at 21 time points, identity and softplus FAEs have prediction errors comparable to FPCA; for five representations, identity FAE reaches MSEp 0.0019 and FPCA 0.0021. In a nonlinear, regularly sampled setting with 3,000 observations at 51 time points, the sigmoid FAE improves over linear FAE and FPCA: with five representations, MSEp is 0.0026 and classification accuracy is 92.42%, compared with 0.0035 and 86.62% for identity FAE.

Against a conventional sigmoid autoencoder in the same nonlinear regular setting, the FAE obtains lower reconstruction error at three, five, and ten representations, while the conventional autoencoder is slightly better for classification at five and ten representations. The FAE also produces smooth curves over the full interval, whereas the conventional autoencoder predicts only at its discrete input coordinates.

In irregular-data simulations, measurements are removed at 25 interior time points per curve and models are trained with either 80% or 20% of the observations. The softplus FAE converges faster and reconstructs more smoothly than the comparable autoencoder, especially with only 20% training data. In the El Niño application, 267 annual curves of 12 monthly sea-surface-temperature observations are evaluated with 20 random 80/20 train-test splits. With five representations, sigmoid FAE obtains MSEp 0.0226 and classification accuracy 86.52%; identity FAE obtains 0.0211 and 85.18%, while FPCA obtains 0.0242 and 84.38%.

## Limitations

The method has several architecture and optimization hyperparameters, and grid search can be time-consuming. Results vary with the network configuration and random initialization. The current architecture handles one-dimensional functional data rather than multidimensional functional inputs. The simulations and the El Niño example compare selected representation sizes, activation functions, and training settings, so they do not establish that FAE dominates conventional autoencoders in every downstream task; in some experiments the conventional autoencoder has slightly higher classification accuracy. Future extensions proposed by the authors include multivariate functional data, functional-to-functional regression, and functional normalizing flows.

## Related Concepts

- [[Function-Space Autoencoders]]
- Functional data analysis
- Functional principal component analysis
- Basis expansion
- Curve smoothing
- Representation learning

## Related Papers

- [[Autoencoders in Function Space]]
- Hsieh, Sun, Wang, and Honavar (2021), "Functional autoencoders for functional data representation learning."
- Wang and Cao (2024), "Functional nonlinear learning."
- Yao, Mueller, and Wang (2021), "Deep learning for functional data analysis with adaptive basis layers."
- Wu, Beaulac, and Cao (2023), "Neural networks for scalar input and functional output."
- Ramsay and Silverman (2005), "Functional Data Analysis."
