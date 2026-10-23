---
title: "Nonlinear Functional Principal Component Analysis Using Neural Networks"
type: paper
authors:
  - Rou Zhong
  - Chunming Zhang
  - Jingxiao Zhang
year: null
tags:
  - functional-data-analysis
  - functional-principal-component-analysis
  - nonlinear-dimension-reduction
  - functional-autoencoders
  - curve-reconstruction
---

## TL;DR

This paper proposes nFunNN, a nonlinear [[Functional Principal Component Analysis|functional principal component analysis]] method implemented as a function-to-vector-to-function autoassociative neural network. B-spline expansions turn its functional weights into trainable coefficients, and a low-dimensional bottleneck represents each curve. Across the reported simulations and two real datasets, nFunNN reconstructs nonlinear curves more accurately than linear FPCA at the same bottleneck dimension, while FPCA remains slightly better in the purely linear simulation.

## Research Question

Can an autoassociative neural network reduce continuously observed functional data to a low-dimensional nonlinear representation and reconstruct the original curves without imposing the linear Karhunen-Loève structure of classical FPCA?

## Motivation

Classical FPCA encodes a curve through linear projections onto covariance eigenfunctions. This is efficient when variation lies near a linear subspace but may require more components when curves follow nonlinear structure. Existing neural approaches to functional data largely address supervised tasks or process only discrete observations. The paper instead targets unsupervised nonlinear dimension reduction while treating both the input and reconstructed output as functions.

## Contributions

- Generalizes an autoassociative neural network to functional inputs and functional outputs, with a finite-dimensional bottleneck interpreted as nonlinear functional principal-component scores.
- Uses functional inner products in the encoder and function-valued hidden neurons in the decoder.
- Converts functional intercepts and weights to B-spline coefficient representations, yielding a finite transformed network trainable with backpropagation and Adam.
- Establishes a universal approximation result for the B-spline-based function-to-scalar encoder class on compact subsets of $L^2(\mathcal T)$.
- Evaluates curve reconstruction against classical FPCA in five simulations and on the Yoga and StarLightCurves datasets.

## Method

For curve $X$, the encoder first computes functional neurons

$$
H_j^{(1)}=\sigma\left(b_j+\int_{\mathcal T}\beta_j(t)X(t)\,dt\right),
$$

then maps them linearly to a $K$-dimensional bottleneck $H_k^{(2)}=\sum_j w_{jk}H_j^{(1)}$. The decoder uses function-valued intercepts and weights,

$$
H_r^{(3)}(t)=\sigma\left(a_r(t)+\sum_k\gamma_{kr}(t)H_k^{(2)}\right),
$$

and reconstructs the curve as $\widehat X(t)=\sum_r u_rH_r^{(3)}(t)$. Expanding $\beta_j$, $a_r$, and $\gamma_{kr}$ in B-spline bases reduces functional estimation to coefficient optimization. In implementation, the integrated reconstruction objective is approximated by a right-hand Riemann sum over an evaluation grid, and the resulting transformed network is optimized with Adam.

## Experiments

The simulation study uses 1,000 training and 1,000 test curves per run, 100 Monte Carlo runs, 51 noisy observations per curve, and 101 reconstruction points. Five two-factor data-generating processes include one linear case, two nonlinear cases, and two cases combining linear and nonlinear terms. With a two-dimensional representation, FPCA is slightly better in the linear case (test RMSE 0.0201 versus 0.0324), but nFunNN is better in all four nonlinear cases. The largest reported gaps occur in the combined cases: test RMSE is 0.2181 versus 1.0065 in Case 4 and 0.2781 versus 0.6628 in Case 5.

The tuning study varies the number of B-spline basis functions $L$, hidden neurons $J=R$, and bottleneck dimension $K$. Changing $L$ or $J$ has relatively modest effects in the tested settings, whereas increasing $K$ materially improves the more complex nonlinear Case 4; its test RMSE falls from 0.1899 at $K=2$ to 0.0405 at $K=4$.

For Yoga, 3,000 training and 300 test curves are drawn in each of 100 random splits. At every tested $K$ from 2 to 8, nFunNN has lower test RMSE than FPCA; at $K=2$, the reported values are 0.2777 and 0.4453, respectively. For StarLightCurves, each split uses 8,000 training and 1,236 test curves, again over 100 runs. nFunNN also leads at every tested $K$; at $K=2$, test RMSE is 0.2074 versus 0.3047. Error decreases for both methods as $K$ grows on both datasets.

## Limitations

- The training objective evaluates only curve reconstruction, so the learned representation is not directly optimized for regression, classification, or clustering.
- The method is developed for ordinary one-dimensional functional data; multivariate and multidimensional functional observations are left for future work.
- Optimization requires smoothed curve estimates, an evaluation grid, a B-spline basis size, hidden-layer widths, and a bottleneck dimension. The experiments suggest that $K$ can materially affect difficult nonlinear settings.
- The empirical comparisons use classical FPCA as the sole baseline and selected synthetic and real datasets, so they do not establish superiority over other nonlinear functional representation methods.
- nFunNN gives up some accuracy relative to FPCA in the purely linear simulation, illustrating that added nonlinear flexibility is not uniformly beneficial.

## Related Concepts

- [[Functional Principal Component Analysis]]
- [[Functional Neural Networks]]
- [[Function-Space Autoencoders]]
- Functional data analysis
- Nonlinear dimension reduction
- Basis expansion
- Curve reconstruction
- Universal approximation

## Related Papers

- [[Functional Autoencoders for Functional Data Representation Learning]]
- [[Functional Autoencoder for Smoothing and Representation Learning]]
- [[Non-linear Functional Modeling using Neural Networks]]
- Kramer (1991), "Nonlinear principal component analysis using autoassociative neural networks."
- Song and Li (2021), "Nonlinear and additive principal component analysis for functional data."
- Rossi and Conan-Guez (2006), "Theoretical properties of projection based multilayer perceptrons with functional inputs."

[[index|Library home]]
