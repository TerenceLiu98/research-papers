---
title: "Beyond Binning: Soft Task Reformulation for Deep Regression"
type: paper
authors:
  - Lawrence Stewart
  - Francis Bach
  - Quentin Berthet
year: null
tags:
  - deep-regression
  - task-reformulation
---

[[index|Library home]]

## TL;DR

A learnable target encoder maps continuous regression labels to soft class distributions, and a linear decoder maps predicted distributions back to continuous outputs. Jointly optimizing target reconstruction, distribution matching, and regression improves reported performance across tabular and image tasks. On Open Street View 5M, test MAE falls from 0.073 to 0.051 compared with least squares.

## Research Question

Can smooth, learnable target representations improve neural regression beyond hard binning, and does combining classification and regression objectives improve prediction further?

## Motivation

Prior regression-as-classification methods can improve neural-network training despite discarding continuous target information through discretization. Hard assignments and fixed bin representatives limit that approach. This paper replaces them with a differentiable target codec whose representations and decoded values can adapt during training.

## Contributions

- A soft target codec generalizing hard binning to distributions over representatives, including multivariate targets.
- A target-only pretraining option using reconstruction, followed by classification against frozen soft labels.
- Joint optimization of the codec and predictor with reconstruction, KL divergence, and prediction losses.
- Comparisons against least squares, Huber loss, hard binning, and a softmax-plus-linear architecture trained only with square loss.

## Method

The encoder is a linear map followed by softmax, $\psi_w(y)=\operatorname{softmax}(W^T y+b)$. Initialization can use weights proportional to $\exp(-\|y-c_i\|^2/(2\sigma^2))$, corresponding to Gaussian cluster responsibilities with equal priors. The predictor produces $\pi_\theta(x)$ on the same simplex; inference returns $\hat y=\mu^T\pi_\theta(x)$.

Equation (8) jointly minimizes weighted target reconstruction, $\mathrm{KL}(\psi_w(y)\|\pi_\theta(x))$, and decoded prediction error. The reconstruction term is written as $L(y-\mu^T\psi_w(y))-\alpha H(\psi_w(y))$. The supplied text describes this as avoiding near-uniform encodings, but the displayed negative-entropy sign favors higher entropy when minimized; this discrepancy should not be silently resolved. Scalar representatives are initialized uniformly; clustering is suggested for multivariate targets, while the geolocation experiment uses a grid.

See [[concepts/soft-task-reformulation-for-regression|Soft Task Reformulation for Regression]].

## Experiments

Seven tabular datasets (Wine Quality, Ailerons, Bike Sharing, Superconductivity, Elevators, Computer Activity, Diamonds) and Retina MNIST use MLPs and a CNN respectively. Labels are scaled to [0, 1]. Experiments evaluate 5, 15, and 25 codes over 10 seeds, reporting MAE, RMSE, and R². The authors report an overall advantage for soft encodings and joint training; adding a softmax layer under square loss alone is inconsistent and sometimes substantially harmful.

For example, at 25 codes, Bike Sharing MAE is 0.111 for least squares, 0.107 for hard binning, and 0.074 for joint training. Retina MNIST illustrates that joint training does not win every metric/configuration: its R² at 25 codes is 0.350 versus 0.360 for the pretrained encoder.

Open Street View 5M predicts two-dimensional GPS coordinates using ViT-L features and a 12-layer MLP head, with 625 codes initialized on a 25 × 25 grid. Table 2 reports five-seed results:

| Metric | Least squares | Joint training |
| --- | --- | --- |
| MAE | 0.073 ± 0.002 | 0.051 ± 0.002 |
| RMSE | 0.114 ± 0.003 | 0.099 ± 0.000 |
| R² | 0.749 ± 0.006 | 0.806 ± 0.001 |

The uncertainty values reproduce the source's reported 2σ intervals and rounding. This large experiment compares against least squares, rather than the full baseline suite.

## Limitations

The paper offers no theoretical explanation for the benefit of reintroducing regression loss, nor an asymptotic analysis of code count. Code count and loss weights require dataset-dependent selection. Predictions lie within the convex hull of learned decoder representatives. The supplied version marks reproducibility code as pending publication. Its publication year and stable identifier are not stated, so these are not inferred from cited works.

## Related Concepts

- [[concepts/soft-task-reformulation-for-regression|Soft Task Reformulation for Regression]]: continuous targets represented as trainable soft labels.

## Related Papers

The source cites Stewart et al. (2023), *Regression as classification: Influence of task formulation on neural network features*, as the direct hard-binning predecessor. It also connects to Imani and White (2018), *Improving regression performance with distributional losses*, and Farebrother et al. (2024), *Stop regressing: Training value functions via classification for scalable deep RL*. These titles are retained as source-cited references rather than links to nonexistent library pages.
