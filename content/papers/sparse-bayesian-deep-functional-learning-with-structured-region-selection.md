---
title: "Sparse Bayesian Deep Functional Learning with Structured Region Selection"
type: paper
authors:
  - Xiaoxian Zhu
  - Yingmeng Li
  - Shuangge Ma
  - Mengyun Wu
year:
tags:
  - functional-data-analysis
  - bayesian-deep-learning
  - functional-region-selection
  - structured-sparsity
  - scalar-on-function-regression
---

## TL;DR

This paper introduces sBayFDNN, a Bayesian [[Functional Neural Networks|functional neural network]] for nonlinear scalar-on-function regression with explicit [[Functional Region Selection|region selection]]. It projects curves onto locally supported B-splines, places a group-wise continuous spike-and-slab prior on columns of the first neural layer, and maps thresholded plug-in inclusion scores back to intervals on the functional domain. The paper proves approximation, posterior-contraction, and selection-consistency results under a functional single-index truth and reports strong prediction and region recovery in simulations and four real datasets, while noting that its MAP-based scores are approximate and that correlated functional domains can prevent unique support interpretation.

## Research Question

Can a deep model capture nonlinear relationships between a functional predictor and a scalar response while selecting scientifically interpretable active regions, quantifying selection strength, and retaining statistical guarantees?

## Motivation

Classical functional linear models offer smooth coefficient functions but can miss nonlinear response relationships. More flexible functional models often depend on prespecified links or kernels, while neural methods emphasize prediction and generally lack structured selection over the continuous input domain. Scalar feature-selection mechanisms also ignore the local dependence and continuity of functional observations. The paper targets applications such as ECG waveforms and spectra, where predictive information may be concentrated in contiguous time or wavelength intervals.

## Contributions

- Combines local B-spline projections with a Bayesian deep network for nonlinear scalar-on-function prediction.
- Applies a column-wise continuous spike-and-slab prior to the first layer so each projected functional feature is selected or suppressed as a group.
- Converts feature-level plug-in posterior inclusion probabilities into unions of active intervals using B-spline support.
- Establishes an approximation bound, posterior contraction, and asymptotic feature and region-selection consistency under stated smoothness, sparsity, prior-rate, and identifiability assumptions.
- Evaluates prediction and region recovery against FNN, AdaFNN, cFuSIM, BFRS, and SLoS in simulations and on ECG, Tecator, bike-rental, and household-power data.

## Method

The assumed data-generating model is a functional single-index regression,

$$
Y_i=g^*\left(\int_{\mathcal T}X_i(t)\beta(t)\,dt\right)+\varepsilon_i.
$$

The coefficient function is approximated with $J_n$ locally supported B-splines. Projecting each curve onto those bases produces a finite feature vector $\eta(X_i)$. A ReLU network $F_\theta(\eta(X_i))$ then estimates the composite nonlinear response rather than explicitly recovering the single-index architecture.

For each spline feature $j$, the model places a group-wise continuous spike-and-slab prior on the entire first-layer weight column $W_{1,*j}$. A small-variance Gaussian spike shrinks the column toward zero, while a larger-variance slab allows that input feature to affect all first-layer units. Other weights and biases receive Gaussian priors.

Inference integrates out the binary inclusion indicators and optimizes the marginal posterior to obtain a local MAP estimate. Bayes' rule then converts each fitted first-layer column norm into a plug-in inclusion score $\hat q_j$; thresholding these scores selects spline features. The estimated active region is the union of their B-spline supports, with adjacent components merged. Multiple random restarts are aggregated, and the spline dimension is chosen by validation error or a stabilized Laplace-type score. The authors explicitly characterize the resulting inclusion scores as approximate selection scores, not exact posterior marginals.

Under a sparse functional single-index truth, the approximation theorem bounds uniform error by

$$
H_n^{-2\min(\alpha_g,1)}+J_n^{-\alpha_\beta\min(\alpha_g,1)},
$$

separating neural approximation of the link from spline approximation of the coefficient. Further results establish posterior contraction and, with an identifiability condition excluding prediction-equivalent sparse supports, asymptotically exact feature and region recovery.

## Experiments

Simulations vary the active coefficient shape, linear and nonlinear link functions, and response SNR. The paper reports that sBayFDNN generally has the strongest or most stable F1 and the lowest or near-lowest RMSE, with larger advantages for nonlinear links and difficult localization. Additional studies cover SNR 2 and 3, a misspecified functional-additive mean, and heavy-tailed errors. A sensitivity study shows the expected basis-resolution trade-off: moderate $J_n$ values balance localization and continuity, while large values can fragment selected regions and lower recall. The evidence-based selector chooses a candidate within 15% of oracle F1 in 73.5% of the reported runs and within 30% in 97.1%, but selects the oracle-ranked candidate only 17.6% of the time.

On ECG QRS-duration prediction, sBayFDNN reports RMSE 12.069 and region F1 0.634, versus the next-best listed region F1 of 0.501. On Tecator water-content prediction it reports RMSE 2.138 and region F1 0.339, with recall 1.000 but precision 0.204. It also reports the lowest RMSE on bike demand (0.618) and household power (0.536), although its household-power MAE of 0.409 ties FNN. The ECG and Tecator reference intervals are scientifically motivated silver standards rather than exact support labels, and the selected intervals extend beyond them.

## Limitations

- The B-spline family and dimension $J_n$ must be chosen; resolution affects region width, fragmentation, recall, and precision.
- Optimization produces local MAP solutions. Plug-in inclusion scores approximate posterior selection strength but do not provide full posterior sampling or exact marginal uncertainty.
- The theory assumes a single functional predictor, a single-index truth, smoothness and minimum-signal conditions, controlled network and prior growth, and an identifiability condition. It does not guarantee unique support recovery under strongly correlated neighboring features.
- The current architecture uses one projection direction within each selected region. Multiple functional predictors or richer region-wise subspaces require additional identifiability and regularization machinery.
- Precision is low against the ECG and Tecator silver-standard intervals, so selected regions should be interpreted with domain knowledge rather than as oracle-exact boundaries.
- Scalar covariates in the ECG study are handled through response residualization rather than joint modeling, and the squared-error formulation is not designed specifically for heavy-tailed outcomes.

## Related Concepts

- [[Functional Region Selection]]
- [[Functional Neural Networks]]
- [[Functional Multiple-Index Models]]
- [[Adaptive Basis Layers]]
- Functional data analysis
- Scalar-on-function regression
- B-spline basis expansion
- Spike-and-slab priors
- Posterior contraction

## Related Papers

- [[Deep Learning with Functional Inputs]]
- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Functional Autoencoder for Smoothing and Representation Learning]]
- Nie, Wang, and Cao (2023), "Estimating Functional Single Index Models with Compact Support."
- Sun, Song, and Liang (2022), "Consistent Sparse Deep Learning: Theory and Computation."
- Zhu, Sun, and Lee (2025), "Bayesian Functional Region Selection."

[[index|Library home]]
