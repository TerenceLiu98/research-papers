---
title: "Learning from Predictions: Fusing Training and Autoregressive Inference for Long-Term Spatiotemporal Forecasts"
type: paper
authors:
  - P. R. Vlachas
  - P. Koumoutsakos
year: null
tags:
  - spatiotemporal-forecasting
  - recurrent-neural-networks
  - exposure-bias
  - fluid-dynamics
---

## TL;DR

Scheduled Autoregressive BPTT (BPTT-SA) gradually replaces ground-truth inputs with model predictions while retaining gradients through those predictions. This addresses [[concepts/exposure-bias|Exposure Bias]] in recurrent forecasting. The authors report improved long-horizon cylinder-flow forecasts with convolutional and autoencoder-based RNNs, but little or no improvement on two scalar time-series benchmarks.

## Research Question

Can a training curriculum that differentiates through autoregressive feedback improve long-term spatiotemporal forecasts relative to teacher forcing and scheduled sampling without feedback gradients?

## Motivation

Teacher forcing optimizes predictions conditioned on observed histories, whereas deployment repeatedly feeds predictions back into the model. Small errors can therefore change subsequent inputs and accumulate. Merely exposing a model to its predictions does not give the same gradient as differentiating through the feedback path. The paper examines both the input-distribution mismatch and this difference in temporal credit assignment.

## Contributions

- Derives the additional feedback path in autoregressive BPTT relative to teacher-forced BPTT.
- Introduces [[concepts/scheduled-autoregressive-bptt|Scheduled Autoregressive BPTT]], transitioning from teacher forcing toward differentiable autoregressive training.
- Compares teacher forcing (BPTT-TF), scheduled sampling (BPTT-SS), and BPTT-SA on scalar time series and spatial fluid fields, identifying substantially stronger benefits in the latter setting.

## Method

The recurrent model computes $h_t=f(u_t,h_{t-1};w_h)$ and $\hat x_{t+1}=g(h_t;w_o)$. Teacher forcing uses $u_t=x_t$; autoregressive operation uses $u_t=\hat x_t$. In BPTT-SA, each timestep draws $k_t\sim\mathrm{Bernoulli}(p)$ and selects

$$
u_t=(1-k_t)x_t+k_t\hat x_t.
$$

An inverse-sigmoid schedule increases $p$ from near zero toward one over training. The Bernoulli choice selects the computational path; predictions on the selected autoregressive path remain differentiable. The local hidden-state Jacobian consequently includes

$$
\frac{d h_t}{d h_{t-1}}
=\frac{\partial f}{\partial h_{t-1}}
+k_t\frac{\partial f}{\partial u_t}\frac{\partial g(h_{t-1})}{\partial h_{t-1}}.
$$

The second term carries gradients through the previous output back into the recurrent computation. The BPTT-SS comparator omits this feedback gradient. Training uses squared prediction error and truncated BPTT with carried hidden states; validation uses fully autoregressive inputs ($p=1$) to select models for rollout accuracy. All experiments use Adam and validation-based early stopping on a single Tesla P100 GPU (Sections 2-3).

## Experiments

| Task | Evaluation | Reported result |
| --- | --- | --- |
| Mackey-Glass chaotic series | 896-step forecasts, 100 test initial conditions, SNR 60 and 10; RMSE and power-spectrum error | Similar RMSE across methods. BPTT-SA has small spectrum-error and seed-variability advantages at SNR 60; no clear advantage at SNR 10. |
| Darwin monthly sea level pressure | 1,400 samples; first 600 for training and next 400 for validation; 100-step forecasts from 32 test initial conditions | Neither BPTT-SA nor BPTT-SS improves RMSE or power-spectrum error over teacher forcing. |
| Two-dimensional cylinder flow, $Re=200$ | Velocity and pressure on a $160\times32$ grid; 200 training, 200 validation, and 2,000 test timesteps; 1,000-step forecasts from 10 initial conditions | BPTT-SA lowers RMSE and increases SSIM for both CNN-RNNs and ConvRNNs, with slower error accumulation and better preservation of flow structure. |

The cylinder flow is periodic and has low intrinsic dimension despite its spatially large observations. CNN-RNNs compress snapshots to five latent dimensions and predict with a 24-unit LSTM; ConvRNNs evolve spatial fields using convolutional LSTM operations. Appendix D specifies four CNN-RNN seeds and three ConvRNN seeds, with BPTT windows of 20 and 50 steps respectively. CNN-RNNs perform better on the reported forecasting metrics, consistent with the suitability of a reduced representation for this flow.

Figures 6-9 show that decreasing teacher-forced training loss can coexist with poor autoregressive validation, whereas BPTT-SA improves rollout validation and test performance. The parsed text does not provide numerical aggregate test scores from Figure 8, so no percentage gain is inferred from those plots.

## Limitations

- The spatial experiment covers one periodic cylinder-flow regime; it does not establish performance on turbulent flows, climate data, or systems with high intrinsic dimension.
- Gains on low-dimensional series are marginal or absent. Autoregressive training is not uniformly better than teacher forcing.
- The authors report no additional training time or memory cost, but the supplied text provides no quantitative runtime or memory comparison.
- Alternative curricula and error-dependent sampling are proposed as future work rather than evaluated improvements.
- The supplied Markdown contains inconsistent notation in the Bernoulli endpoint statement and appendix recurrence, and calls the Darwin series temperature in some places despite identifying it as pressure in Section 3.2. This summary follows the explicit sampling definition and experimental description.
- Publication year, venue, DOI, and the paper's own arXiv identifier are not stated in the supplied text; no values are inferred.

## Related Concepts

- [[concepts/exposure-bias|Exposure Bias]]: mismatch between training histories and generated rollout histories.
- [[concepts/scheduled-autoregressive-bptt|Scheduled Autoregressive BPTT]]: a curriculum with differentiable prediction feedback.
- [[concepts/latent-space-time-series-forecasting|Latent-Space Time Series Forecasting]]: the CNN-RNN variant predicts dynamics in a compressed representation.

## Related Papers

- Bengio et al. (2015), "Scheduled sampling for sequence prediction with recurrent neural networks": the curriculum inspiration and BPTT-SS baseline; BPTT-SA retains gradients through continuous predictions.
- Teutsch and Mäder (2022), "Flipped classroom: Effective teaching for time series forecasting": cited related curriculum work on low-order chaotic systems.
- Vlachas et al. (2022), "Multiscale simulations of complex systems by learning their effective dynamics": cited context for reduced representations of complex dynamics.

[[index|Library home]]
