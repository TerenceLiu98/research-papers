---
title: "SpectFlow: Long-term forecasting using flow matching with 89k parameters"
type: paper
authors:
  - Seyed Mohamad Moghadas
  - Adrian Munteanu
year: null
tags:
  - time-series
  - flow-matching
  - traffic-forecasting
---

[[index|Library home]]

## TL;DR

SpectFlow combines complex-valued spectral interpolation with a flow-matching residual head for multivariate traffic forecasting. The authors report 89k parameters and the lowest horizon-averaged RMSE and MAE among their evaluated baselines on three datasets. Publication year and a stable identifier are not established in the supplied manuscript.

## Research Question

Can spectral structure and residual flow matching deliver accurate forecasts with substantially fewer parameters than diffusion and foundation-model baselines?

## Motivation

Traffic series contain correlated periodic patterns, trends, and residual variation. Fourier representations compactly encode amplitude and phase, while iterative diffusion forecasting can be computationally expensive.

## Contributions

- Combines spectral interpolation for trend and seasonality with a flow-matching residual head.
- Uses a complex linear interpolation layer, low-pass filtering, and cross-series attention in a lightweight architecture.
- Evaluates accuracy, latency, and component ablations on PeMS04, PeMS08, and proprietary Brussels traffic data.

## Method

Reversible instance normalization removes input means, and multi-head attention captures cross-series relationships. An rFFT transforms inputs into complex frequency coefficients. Low-pass filtering retains selected harmonics, and a complex linear layer interpolates the spectrum to the combined history and forecast length. Zero padding, DC restoration, and inverse rFFT produce time-domain outputs.

The interpolation branch models trend and seasonality; a residual head uses [[concepts/flow-matching|Flow Matching]] velocity regression. Training combines reconstruction and forecast supervision, flow loss, and L2 regularization. Both backcast and forecast windows receive supervision. Reported optimized reconstruction and flow weights are 0.276 and 0.721.

The text describes deterministic ODE sampling, but Algorithm 2 specifies spectral filtering, upsampling, inverse transformation, and DC restoration without an explicit ODE solver or residual-head integration. The precise inference integration scheme is therefore unclear from the supplied pseudocode.

## Experiments

PeMS04, PeMS08, and Brussels contain 307, 170, and 365 nodes respectively, sampled every five minutes. The authors use a 70/10/20 train/validation/test split, per-node standardization, and forward-backward filling for missing entries. Adam training uses learning rate 0.001, batch size 32, up to 150 epochs, and early stopping with patience 20 on an RTX 4090. Section 3.6 describes medians over ten executions.

Table 2 reports errors averaged across 2-, 4-, and 8-hour horizons:

| Dataset | SpectFlow RMSE | SpectFlow MAE | Moirai-MoE RMSE | Moirai-MoE MAE |
| --- | ---: | ---: | ---: | ---: |
| Brussels | 11.42 | 6.78 | 12.27 | 7.05 |
| PeMS08 | 24.50 | 16.08 | 25.16 | 17.01 |
| PeMS04 | 31.71 | 21.11 | 32.16 | 22.28 |

Other baselines include GCRDD, DiffSTG, PriSTI, and SpecSTG. SpectFlow leads all six Table 2 columns. For PeMS04 MAE, SpecSTG at 21.53 is the closest comparator, despite the prose emphasizing Moirai-MoE. Section 3.5 reports 0.89 ms inference latency versus 3.0 ms for DiffSTG on Brussels.

Table 4 reports RMSE degradation of 11.1–16.3% without the flow head and 6.0–9.0% for a time-domain replacement. Removing attention, backcast supervision, normalization, or low-pass filtering also worsens the tabulated results.

## Limitations

- Evidence covers three traffic datasets, including proprietary data; evaluation in other domains remains future work.
- The model assumes correlated variables and uses a heuristic frequency cutoff. Aggressive filtering can discard useful signal.
- The relationship between flow training and inference is underspecified in the pseudocode.
- Table 4 labels horizons 2, 4, and 6, unlike the main 2-, 4-, and 8-hour evaluation. Its surrounding prose reports MSE degradation ranges that differ from the table's RMSE/MAE values; this summary follows the table.
- Table 3's Brussels DiffSTG MAE values do not average to its Table 2 value. Aggregate comparisons should be interpreted with this inconsistency in mind.
- Point-error metrics do not establish uncertainty calibration. Latency figures apply to the reported experimental setup.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the velocity-regression objective used for residual learning.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time-Series Forecasting]]: related generative forecasting setting; SpectFlow evaluates point accuracy.

## Related Papers

- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: a library comparison using structured temporal priors and conditional flows rather than compact spectral interpolation.
- SpecSTG (Lin et al., 2024): the cited spectral diffusion baseline.
- Diffusion-based Decoupled Deterministic and Uncertain Framework for Probabilistic Multivariate Time Series Forecasting (Li et al., 2025): cited motivation for assigning generative modeling to residual components.
