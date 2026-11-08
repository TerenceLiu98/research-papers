---
title: "Time Series Continuous Modeling for Imputation and Forecasting with Implicit Neural Representations"
type: paper
authors:
  - Etienne Le Naour
  - Louis Serrano
  - Leon Migus
  - Yuan Yin
  - Ghislain Agoua
  - Nicolas Baskiotis
  - Patrick Gallinari
  - Vincent Guigue
year: null
openreview: P1vzXDklar
source_job_id: 5ea1e243-4bf8-4cf3-8f46-2926dbca1d8a
tags:
  - implicit-neural-representations
  - time-series-imputation
  - time-series-forecasting
  - irregular-time-series
  - meta-learning
---

## TL;DR

TimeFlow represents each time series as a continuous coordinate network conditioned by a compact, sample-specific code. A second-order meta-learning procedure learns shared network parameters while adapting each code from observed timestamps, giving one model for imputation and forecasting on irregular grids. It is competitive with strong discrete forecasters and generally outperforms the continuous baselines tested, but iterative code optimization makes inference substantially slower and the experiments focus on homogeneous, strongly periodic datasets.

## Research Question

Can a single continuous-time model impute sparsely and irregularly observed values, forecast beyond an observed window, and adapt to unseen series without relying on a fixed sampling grid?

## Motivation

Many high-performing time-series models assume dense, aligned observations. Real sensor collections can instead be irregular, incomplete, and unaligned, while new sensors may appear after training. Continuous models naturally accept arbitrary timestamps, but the continuous baselines considered here lag discrete architectures on standard benchmarks. TimeFlow investigates whether conditional [[concepts/implicit-neural-representations|Implicit Neural Representations]] can close that accuracy gap while retaining sampling flexibility.

## Contributions

- A unified coordinate-based model for time-series imputation and forecasting that can be queried at arbitrary timestamps.
- Per-series shift modulations generated from compact latent codes, separating shared structure from sample-specific information.
- An optimization-based encoder trained through second-order meta-learning, enabling adaptation to unseen series from a few inner-loop gradient steps.
- Evaluation on sparse imputation, long-horizon forecasting, unseen series and time windows, and forecasting from incomplete look-back windows.

## Method

TimeFlow maps a scalar time coordinate to a series value with a feed-forward INR. The coordinate is encoded with 64 fixed Fourier features, and the default network has five hidden layers of width 256 with ReLU activations. A linear hypernetwork maps a 128-dimensional code $z^{(j)}$ for series $j$ to additive bias shifts at each INR layer. Shared INR and hypernetwork parameters capture structure across the collection, while the code conditions the function on one series.

Training uses nested optimization. In the inner loop, each code starts at zero and is updated for three gradient steps using observations in the input grid. The outer loop differentiates through those steps and updates shared parameters. For imputation, its loss uses the observed input grid; for forecasting, it also uses the future horizon. At inference, shared parameters remain fixed and only a new code is optimized from the available observations before the INR is queried at missing or future timestamps.

Ablations favor Fourier-feature ReLU networks over SIREN, second-order auto-decoding over a set encoder or first-order REPTILE, and shift-only modulation over combined shift and scale. These choices are empirical for the studied datasets rather than general guarantees about conditional INRs.

## Experiments

Experiments use Electricity (321 customer series), Traffic (862 locations), and Solar (137 plants), plus an hourly SolarH variant. All series are normalized per sample, and mean absolute error is the primary metric.

**Imputation.** Across observation rates from 5% to 50%, TimeFlow is compared with DeepTime, mTAN, Neural Process, CSDI, SAITS, BRITS, and TIDER. The reported average relative improvement ranges from 18.90% over BRITS to 53.40% over TIDER. It is not best in every cell: DeepTime and BRITS are better on Traffic at 5% observation, and CSDI or BRITS can be better at higher observation rates. Experiments withholding half the series show similar missing-grid errors for known and unseen series, although training on fewer samples reduces overall accuracy.

**Forecasting.** With a look-back length of 512 and horizons of 96, 192, 336, and 720, TimeFlow is the strongest reported continuous method overall. Against PatchTST, it has 3.23% worse aggregate error by the paper's relative-improvement calculation and trails PatchTST on Electricity and Traffic, while performing better on SolarH. Its results remain comparatively stable across adjacent and disjoint test windows and when adapting to held-out series.

**Incomplete histories.** When only 10%, 20%, or 50% of a look-back window is available, TimeFlow jointly reconstructs the missing history and forecasts the horizon. On Electricity and Traffic at horizons 96 and 192, it outperforms DeepTime and Neural Process in every reported imputation and forecast comparison. For Electricity at horizon 96 and 50% observations, forecast MAE rises from 0.228 with a complete history to 0.239, compared with 0.244 to 0.270 for DeepTime.

## Limitations

- Auto-decoding requires gradient optimization for every sample at inference and is reported to be one to two orders of magnitude slower than alternatives.
- The model assumes a collection of homogeneous series. Shift modulation does not fit series with drastically different structures or frequencies without additional mechanisms.
- All three data families have pronounced periodic structure, so the evidence does not establish equal performance on weakly periodic or highly heterogeneous signals.
- Effective training reportedly needs roughly 100 or more samples to separate shared and individual patterns.
- The imputation study creates sparse observations by subsampling dense benchmarks. It therefore does not evaluate naturally missing data or missing-not-at-random mechanisms.
- The supplied Markdown gives an OpenReview forum ID but does not establish a publication year, DOI, or confirmed venue.

## Related Concepts

- [[concepts/implicit-neural-representations|Implicit Neural Representations]]: coordinate networks provide the continuous mapping from time to value.
- Meta-learning: nested optimization trains shared parameters for rapid adaptation of per-series codes.
- Irregular time series: arbitrary timestamp queries avoid committing the model to a common discrete grid.
- Time-series imputation: missing values are inferred by conditioning on the observed timestamp-value pairs.

## Related Papers

- Woo et al. (2022), "DeepTime: Deep Time-Index Meta-Learning for Non-Stationary Time-Series Forecasting": the closest continuous forecasting baseline, using learned basis functions and ridge adaptation.
- Dupont et al. (2022), "COIN++: Neural Compression Across Modalities": supplies the modulated INR and meta-learning precedent adapted by TimeFlow.
- Nie et al. (2022), "A Time Series is Worth 64 Words: Long-term Forecasting with Transformers": introduces PatchTST, the strongest discrete forecasting comparator in these experiments.
- [[papers/towards-robust-real-world-multivariate-time-series-forecasting-a-unified-framework-for-dependency-asynchrony-and-missingness|Towards Robust Real-World Multivariate Time Series Forecasting: A Unified Framework for Dependency, Asynchrony, and Missingness]]: a library comparison that handles channel-specific sampling and missing input patches; it is not cited or evaluated by TimeFlow.

OpenReview forum supplied by the paper: [P1vzXDklar](https://openreview.net/forum?id=P1vzXDklar).

[[index|Library home]]
