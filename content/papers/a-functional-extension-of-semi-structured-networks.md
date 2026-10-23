---
title: "A Functional Extension of Semi-Structured Networks"
type: paper
authors:
  - David Rügamer
  - Bernard X. W. Liew
  - Zainab Altai
  - Almond Stöcker
year: 2024
arxiv: "2410.05430"
tags:
  - functional-data-analysis
  - semi-structured-networks
  - function-on-function-regression
  - functional-neural-networks
  - interpretable-deep-learning
---

## TL;DR

This paper introduces a semi-structured [[Functional Neural Networks|functional neural network]] that adds an interpretable function-on-function regression branch to an arbitrary deep branch. Tensor-product bases and mini-batch array operations make the structured component practical for large discretized functional datasets, while post-hoc orthogonalization reallocates linear signal absorbed by the deep network back to the structured branch. Simulations show similar recovery to classical functional regression with better memory scaling, and biomechanical experiments report competitive or improved prediction, although additional applications do not show uniform error improvements.

## Research Question

Can a model combine an interpretable function-on-function regression with a flexible deep network while preserving identifiable functional effects and scaling to datasets with many curves, predictors, and observation points?

## Motivation

Classical functional additive models expose how predictor curves affect response curves, but their expressiveness and full-batch implementations can become limiting on large sensor datasets. Deep functional models can capture nonlinearities and interactions, yet a deep branch can also reproduce the linear effects assigned to an interpretable branch. Without a constraint, the allocation between branches is non-identifiable and the structured weight surfaces cannot be read as stable effect summaries.

## Contributions

- Defines a semi-structured functional model that adds a basis-expanded function-on-function regression predictor to an arbitrary deep functional predictor.
- Derives a discretized implementation using numerical integration, tensor-product bases, and an integrated pointwise loss for function-valued outcomes.
- Extends post-hoc orthogonalization to functional inputs and outputs so linear signal captured by the deep branch is transferred to corrected structured coefficients.
- Avoids explicit construction of the large combined design matrix through array computation, reuse of the response basis, and recycling of predictor bases on shared grids.
- Evaluates signal recovery, memory scaling, and prediction on simulated data, biomechanical sensor datasets, and three additional functional prediction tasks.

## Method

For functional predictors $X$ and response domain $t$, the model is

$$
\mu(t)=\tau\left(\lambda^+(X)(t)+\lambda^-(X)(t)\right),
$$

where $\lambda^+$ is an interpretable function-on-function regression and $\lambda^-$ is a flexible deep model. For predictor $j$, the structured weight surface is expanded as $w_j(s,t)=\psi(t)^\top\Theta_j\phi_j(s)$. After numerical integration over the observed predictor grid, its contribution is computed as $\Phi_j^*\Theta_j\Psi$, without explicitly forming the full tensor-product design matrix. The deep branch may share the basis encoder and decoder or use a separate architecture with a matching functional output; the biomechanics experiments use InceptionTime.

The deep branch can absorb effects representable by the structured design, making the decomposition non-identifiable. The paper stacks the structured basis products into $\Omega$ over all training curves and response time points, then applies post-hoc orthogonalization:

$$
\widetilde\theta=\theta+\Omega^\dagger\lambda^-,
\qquad
\lambda^\perp=P_\Omega^\perp\lambda^-.
$$

The corrected coefficients contain the component of the deep prediction lying in the structured span, while the corrected deep predictions lie in its orthogonal complement. The overall fitted values are preserved, but the resulting structured weight surfaces can be interpreted independently of signal leakage into the deep branch.

## Experiments

In 30 simulation runs across sample sizes 320, 640, and 1,280 and signal-to-noise ratios 0.1 and 1, the neural implementation, additive model, and boosting recover the function-on-function relationship with only minor estimation and prediction differences. The neural approach performs better in the noisier setting and slightly worse at higher signal-to-noise ratios. Memory experiments varying observations, predictors, and grid points show more favorable scaling for the array-based neural implementation than the evaluated additive-model and boosting implementations.

On the combined Fukuchi and Liew running datasets, the selected-feature relative RMSE is 0.36 for the additive model, 0.31 for the structured FNN, and 0.30 for the semi-structured FNN. With all features, the semi-structured model reports 0.25 versus 0.30 for boosting. On the Camargo biomechanics dataset with 21,787 observations, 24 predictors, and 101 input and output time points, the mean functional relative-MSE score is 0.872 for the structured model, 0.923 for the deep model, and 0.955 for the semi-structured model.

The appendix broadens the evaluation. On EEG-to-EMG prediction, the structured FNN has the lowest reported relative RMSE, while one semi-structured variant has the highest correlation. On air-quality prediction, the structured FNN has the highest correlation and the semi-structured variants have slightly lower relative RMSE. On hot-water profiles, the structured FNN has the lowest relative RMSE, whereas semi-structured variants have higher correlation but worse relative RMSE. These results support flexibility across domains but not consistent dominance on every metric.

## Limitations

- The corrected structured effects are identified relative to the chosen basis span and the empirical training design; they are predictive decompositions rather than causal effects.
- Post-hoc orthogonalization requires stacking the structured design and deep predictions across observations and response points, and the paper does not provide a statistical uncertainty procedure for corrected surfaces.
- The main biomechanical comparisons vary feature sets and available baselines because classical implementations do not scale to the largest data, limiting like-for-like comparisons.
- The additional experiments use a fixed, untuned deep architecture and show mixed metric tradeoffs rather than universal gains from the semi-structured branch.
- High-dimensional functional feature selection is not built into the proposed model; the authors identify functional sparsity penalties as future work.
- The nonlinear functional additive extension discussed by the authors would be harder to interpret than the linear structured branch evaluated here.

## Related Concepts

- [[Functional Neural Networks]]
- Function-on-function regression
- Functional data analysis
- Semi-structured neural networks
- Post-hoc orthogonalization
- Tensor-product basis expansion
- Statistical identifiability

## Related Papers

- [[Modern Non-Linear Function-on-Function Regression]]
- [[Deep Learning with Functional Inputs]]
- [[Non-linear Functional Modeling using Neural Networks]]
- Rügamer (2023), "A New PHO-rmula for Improved Performance of Semi-Structured Networks."
- Scheipl, Staicu, and Greven (2015), "Functional additive mixed models."
- Brockhaus, Rügamer, and Greven (2020), "Boosting functional regression models with FDboost."

[[index|Library home]]
