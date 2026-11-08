---
title: "DistDF: Time-Series Forecasting Needs Joint-Distribution Wasserstein Alignment"
type: paper
authors:
  - Hao Wang
  - Licheng Pan
  - Yuan Lu
  - Zhixuan Chu
  - Xiaoxi Li
  - Shuting He
  - Zhichao Chen
  - Qingsong Wen
  - Haoxuan Li
  - Zhouchen Lin
year: null
source_job_id: "22970bfb-afc6-4780-b022-167664f7c5b6"
tags:
  - time-series-forecasting
  - distribution-matching
  - optimal-transport
  - learning-objectives
---

## TL;DR

DistDF augments mean squared error with a minibatch estimate of the Bures-Wasserstein discrepancy between the joint distributions of history-label and history-forecast sequences. The joint discrepancy upper-bounds the expected conditional Wasserstein discrepancy that the method seeks to reduce but cannot estimate from one future sequence per history. Across ETTm1, ETTh1, ECL, and Weather, DistDF reports the lowest average MSE among seven training objectives for both TimeBridge and Fredformer, while adding training-only computation and leaving model inference unchanged.

## Research Question

Can a forecasting model align its conditional forecast distribution with the label distribution without relying only on a likelihood estimate that ignores dependence among future time steps?

## Motivation

Direct multi-step forecasters commonly minimize pointwise MSE. The paper argues that interpreting this objective as conditional negative log-likelihood is biased when future labels are conditionally autocorrelated: the Gaussian likelihood uses a conditional precision-weighted quadratic form, whereas MSE implicitly uses an identity covariance. Fourier and principal-component transformations guarantee marginal rather than conditional decorrelation, so they need not remove this mismatch.

Directly estimating a conditional distribution discrepancy is also impractical in the standard supervised dataset, where each history has one observed future and one model forecast. DistDF therefore moves from conditional distributions to joint history-future distributions, which can be estimated across a minibatch.

## Contributions

- Formalizes the discrepancy between pointwise MSE and a covariance-aware Gaussian conditional likelihood as autocorrelation bias.
- Uses a joint-distribution Wasserstein discrepancy that upper-bounds the expected conditional Wasserstein discrepancy and vanishes when the corresponding joint distributions agree.
- Gives a differentiable Gaussian implementation based on means and covariances under [[concepts/bures-wasserstein-geometry|Bures-Wasserstein geometry]].
- Evaluates the objective across forecasting architectures, discrepancy alternatives, direct and autoregressive settings, probabilistic forecasting, multiple history lengths, and five random seeds.

## Method

For a minibatch of histories $X$, labels $Y$, and forecasts $\hat Y=g(X)$, DistDF constructs

$$
Z=[X,Y], \qquad \hat Z=[X,\hat Y].
$$

The paper uses [[concepts/optimal-transport|Optimal Transport]] to relate the target conditional discrepancy to a joint one:

$$
\int W_p(P_{Y\mid X},P_{\hat Y\mid X})\,dP(X)
\leq W_p(P_{X,Y},P_{X,\hat Y}).
$$

Assuming the two joint distributions are Gaussian, their squared $W_2$ discrepancy has the closed-form Bures-Wasserstein expression

$$
\mathcal L_{\mathrm{Dist}}
=\lVert\mu_Z-\mu_{\hat Z}\rVert_2^2
+\operatorname{Tr}\!\left(\Sigma_Z+\Sigma_{\hat Z}
-2(\Sigma_Z^{1/2}\Sigma_{\hat Z}\Sigma_Z^{1/2})^{1/2}\right).
$$

Because this moment loss discards the known samplewise pairing between each history and label, it is used as a regularizer rather than a standalone replacement for pointwise error:

$$
\mathcal L_{\mathrm{DistDF}}
=\gamma\mathcal L_{\mathrm{Dist}}+(1-\gamma)\mathcal L_{\mathrm{MSE}}.
$$

Only the training objective changes; the forecasting architecture and inference procedure remain intact.

## Experiments

The main evaluation uses ETTm1, ETTh1, ECL, and Weather with history length 96 and forecast lengths 96, 192, 336, and 720. TimeBridge and Fredformer serve as the principal forecasting models. Comparators include direct forecasting with MSE, Time-o1, FreDF, Koopman, DILATE, and Soft-DTW. The reported values below average the four forecast lengths.

| Backbone | Dataset | DistDF MSE | MSE objective | Best non-DistDF MSE |
| --- | --- | ---: | ---: | ---: |
| TimeBridge | ETTm1 | 0.383 | 0.387 | 0.383 (Time-o1) |
| TimeBridge | ETTh1 | 0.434 | 0.442 | 0.439 (Time-o1/FreDF) |
| TimeBridge | ECL | 0.172 | 0.176 | 0.173 (Soft-DTW) |
| TimeBridge | Weather | 0.248 | 0.252 | 0.250 (Time-o1) |
| Fredformer | ETTm1 | 0.378 | 0.387 | 0.379 (Time-o1) |
| Fredformer | ETTh1 | 0.430 | 0.447 | 0.431 (Time-o1) |
| Fredformer | ECL | 0.173 | 0.191 | 0.178 (Time-o1) |
| Fredformer | Weather | 0.255 | 0.261 | 0.255 (Time-o1) |

The ablation reports that aligning both mean and covariance produces lower average MSE than MSE alone on ETTm1 (0.379 versus 0.387), ETTh1 (0.430 versus 0.447), ECL (0.172 versus 0.176), and Weather (0.248 versus 0.252). In the discrepancy comparison, the Bures-Wasserstein implementation is best in 14 of 16 reported MSE/MAE cases; linear- and RBF-kernel MMD, KL, and empirical Earth Mover's Distance generally also improve on MSE.

Additional studies apply DistDF to TQNet, TimeBridge, Fredformer, iTransformer, PatchTST, DLinear, TimeMixer, SCINet, autoregressive variants, and the probabilistic D3U model. Gains are not universal at every individual horizon or metric, but the reported averages generally improve. Five-seed experiments on ECL and Weather report average standard deviations below 0.005. A timing study with batch size 128 and 21 variables reports that the added forward and backward computation remains below 1 ms through forecast length 1024; no inference overhead is introduced. The authors provide [code](https://github.com/Master-PLC/DistDF), which was not executed for this Wiki entry.

## Limitations

- The tractable discrepancy assumes Gaussian joint distributions and matches only first and second moments. Equal means and covariances do not characterize general non-Gaussian forecast distributions.
- The theoretical zero-discrepancy alignment statement concerns the joint Wasserstein discrepancy, while the implementation substitutes a minibatch Gaussian moment approximation and optimizes it jointly with MSE.
- The distribution term loses samplewise history-label correspondence; the method retains MSE specifically to restore pointwise supervision. Hyperparameter results also show that using the discrepancy alone ($\gamma=1$) is worse than mixed objectives on the tested datasets.
- The paper argues that MSE is a biased likelihood estimate under conditional autocorrelation, but MSE remains a valid point-prediction loss for a conditional mean; the critique depends on treating it as a sequence likelihood objective.
- Main-table results are averages across four horizons and do not include uncertainty intervals. Five-seed variation is reported only for ECL and Weather, and some architecture-horizon combinations do not improve.
- The supplied manuscript does not state a publication venue, year, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: provides the Wasserstein discrepancy and the bound connecting joint and expected conditional discrepancies.
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]: gives the closed-form mean-and-covariance loss used for Gaussian joint distributions.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time-Series Forecasting]]: the broader task of representing forecast uncertainty rather than only pointwise predictions.

## Related Papers

- Kim, Lee, and Paik (2022), "Conditional Wasserstein Generator": cited for the bound from joint to expected conditional distribution discrepancy.
- Peyre and Cuturi (2019), "Computational Optimal Transport": supplies the optimal-transport background and Gaussian $W_2$ formula.
- Wang et al. (2025), "FreDF: Learning to Forecast in the Frequency Domain": transforms labels into frequency components before applying pointwise errors.
- Wang et al. (2025), "Time-o1: Time Series Forecasting Needs More than MSE": uses principal-component transformations to reduce label dependence.
- [[papers/kd2m-a-unifying-framework-for-feature-knowledge-distillation|KD2M: A Unifying Framework for Feature Knowledge Distillation]]: another supervised-learning framework that regularizes empirical or Gaussian feature distributions with Wasserstein discrepancies.

Source: supplied parsed manuscript, Cognitio job `22970bfb-afc6-4780-b022-167664f7c5b6`. Publication metadata is unspecified in the source.

[[index|Library home]]
