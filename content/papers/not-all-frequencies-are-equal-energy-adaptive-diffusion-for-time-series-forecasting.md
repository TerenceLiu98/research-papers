---
title: "Not All Frequencies Are Equal: Energy-Adaptive Diffusion for Time Series Forecasting"
type: paper
authors:
  - Zining Qin
  - Huiling Qin
  - Chenhao Wang
  - Jianxiong Guo
  - Tian Wang
  - Weijia Jia
year: null
tags:
  - time-series
  - diffusion-models
  - wavelets
---

[[index|Library home]]

## TL;DR

EADiff forecasts in wavelet space using instance-specific noise levels derived from each band's relative energy. Its strongest reported results are on Exchange under six-step autoregressive rollout; performance varies across datasets and horizons.

## Research Question

Can adapting diffusion noise to unequal frequency-band energies improve multiscale time-series forecasting?

## Motivation

Uniform noise gives low-energy detail bands a lower signal-to-noise ratio than high-energy trends. Wavelet decomposition exposes this imbalance and permits separate corruption strengths without repeatedly converting domains during denoising.

## Contributions

- Learnable per-instance, per-feature, per-band noise modulation.
- Wavelet-domain conditional generation with trend conditioning and differentiated history/future corruption.
- Ablations of scheduling and representation, plus analyses of decomposition depth and wavelet basis selection.

## Method

Concatenate history with an initial future guess, then apply a discrete wavelet transform. Section 3 uses last-value repetition; the detailed algorithms also allow linear extrapolation. For each feature and band, compute the logarithm of coefficient standard deviation plus a small stabilizer, and center it across bands. The noise multiplier is exp(gamma × tanh(centered log-energy / C)); multiply this by an EDM base noise schedule. Positive gamma amplifies noise in higher-energy bands, while gamma near zero approaches uniform corruption.

A mask identifies coefficients influenced by the future because wavelet filters cross the temporal boundary. Training applies light history augmentation and stronger future corruption, supervising future-associated coefficients against the transform of the actual complete sequence. Low-frequency coefficients from the history-plus-guess input condition a diffusion Transformer through adaptive layer normalization. Band-specific patch tokenization and normalized overlap-add decoding preserve multiscale structure. The objective weights squared reconstruction error by (sigma² + 1) / sigma², with clipping in the detailed algorithm.

Inference computes the adaptive schedule from the initialized sequence, noises the future-associated region, and uses Heun denoising with replacement of unmasked coefficients. Inverse transformation produces the forecast. Appendix C specifies 20 Heun steps and six-step predictions rolled forward for longer horizons.

## Experiments

Table 1 covers Beijing Air, Weather, ETTh1, ETTh2, and Exchange, comparing seven baselines: TabDiff, TimeMixer, iTransformer, TabSyn, PatchTST, FEDformer, and CSDI. All models predict six steps during training and roll out autoregressively; these results are not standard direct multi-horizon comparisons. Selected Table 1 values follow (lower is better).

| Dataset / horizon | EADiff MAE / RMSE | Comparator MAE / RMSE |
| --- | --- | --- |
| Exchange / 96 | 0.4060 / 0.5004 | CSDI: 0.4873 / 0.7101 |
| Exchange / 720 | 0.8505 / 1.0534 | TabDiff: 1.0192 / 1.0927 |
| Weather / 720 | 0.6102 / 0.9325 | iTransformer: 0.6167 / 0.9248 |
| ETTh2 / 96 | 0.3941 / 0.5177 | iTransformer: 0.3409 / 0.4546 |
| Beijing Air / 720 | 0.4360 / 0.7986 | PatchTST: 0.4133 / 0.7860 |

EADiff has the lowest reported MAE and RMSE on all listed Exchange horizons, but iTransformer beats it on both metrics at every listed ETTh2 horizon. Weather entries include out-of-memory failures for TabDiff and NaNs for TabSyn.

Table 2's horizon-96 ablation raises Exchange RMSE from 0.500 to 0.840 without adaptation and 1.301 without wavelets. Beijing Air RMSE rises from 0.681 to 1.028 without adaptation. These are ablation-table values; some full-model entries differ from Table 1.

Table 3 favors shallow decomposition for Beijing Air (RMSE 0.681 at level 1 versus 1.106 at level 5) and level 5 for Exchange (0.500 versus 1.397 at level 1). Exchange's improvement is not monotonic across intermediate depths. Table 4 finds that the sparsest tested basis, bior3.1, can forecast substantially worse than sym2, motivating attention to numerical conditioning as well as compression.

## Limitations

- Evaluation emphasizes MAE/RMSE, without establishing predictive calibration or distributional quality.
- The six-step rollout protocol and omission of RevIN constrain comparison with conventional forecasting benchmarks.
- The supplied text contains reporting inconsistencies: introductory dataset counts and baseline counts exceed Table 1; Weather's narrated horizon-720 RMSE confuses MAE with RMSE; the claimed 16.9% Exchange improvement is not supported by Table 1's best baseline. This page uses table entries.
- Normalization is described as uniformly Z-score in the main setup but dataset-specific Z-score/MinMax in Appendix C. Algorithms include WaveletScaler although the preprocessing prose says wavelet coefficients are not normalized. Initialization and starting-noise descriptions also vary.
- Wavelet choice is data-dependent, and Transformer attention retains quadratic cost in the joint token-feature count. No publication year or stable paper identifier is explicit in the supplied Markdown.

## Related Concepts

- [[concepts/energy-adaptive-diffusion|Energy-Adaptive Diffusion]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]

## Related Papers

- [[papers/simdif-simpler-yet-better-diffusion-model-for-time-series-point-forecasting|SimDif]]: a library comparison addressing diffusion point forecasting through normalization and sample aggregation; not an EADiff experimental baseline.
- Karras et al. (2022), “Elucidating the Design Space of Diffusion-Based Generative Models”: source of preconditioning, noise scheduling, and sampling components.
- Tashiro et al. (2021), “CSDI: Conditional Score-Based Diffusion Models for Probabilistic Time Series Imputation”: diffusion baseline.

Source: supplied parsed manuscript, Sections 3–4 and Appendices B–D. Ingest job: `835585a3-d83d-4b15-a9b1-a9de3a4790cf`.
