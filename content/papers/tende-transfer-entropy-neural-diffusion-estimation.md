---
title: "TENDE: Transfer Entropy Neural Diffusion Estimation"
type: paper
authors:
  - Simon Pedro Galeano Muñoz
  - Pietro Michiardi
  - Mustapha Bounoua
  - Giulio Franzese
  - Maurizio Filippone
year: null
source_job_id: "ef0565e0-f496-4195-904b-76c98dbdd939"
tags:
  - transfer-entropy
  - diffusion-models
  - information-theory
---

## TL;DR

TENDE estimates [[concepts/transfer-entropy|Transfer Entropy]] through conditional mutual information using learned diffusion scores. Synthetic experiments show useful robustness to extra noise dimensions and improved estimation with larger datasets, but substantial underestimation persists in the hardest 70-dimensional benchmark. The supplied manuscript does not establish its publication year or a stable identifier.

## Research Question

Can score-based diffusion estimate directed predictive information in continuous, high-dimensional time series without specifying restrictive conditional density families?

## Motivation

Nearest-neighbor estimators deteriorate with dimension; variational information bounds face sample-complexity limitations; parametric generative approaches depend on their chosen conditional distributions. TENDE extends score-based information estimation to conditional dependencies and lagged time series.

## Contributions

- Derives four estimators from expected conditional KL divergence, conditional entropy differences, and mutual information differences (§4).
- Shares a single denoising network across the conditional and marginal scores required by these estimators.
- Evaluates sample size, coupling strength, irrelevant dimensions, independent stacked processes, transformed distributions, and physiological signals.
- Analyzes score approximation error and the remaining terminal diffusion divergence (Appendix A.3).

## Method

For source history X, present target Y, and target history Z, transfer entropy is I(Y; X | Z). TENDE constructs these triplets from temporal windows, then learns scores of the target conditioned on both histories, only target history, and, for joint variants, no history.

A KL divergence can be decomposed into an integral of weighted squared score differences along a shared diffusion plus a terminal KL term. TENDE approximates the integral with learned scores and treats the terminal term as negligible after sufficient diffusion. Its direct conditional estimator is nonnegative; difference-based alternatives can propagate errors from their components. Nonnegativity does not make the estimate an upper or lower bound on true information.

The implementation uses a variance-preserving diffusion with a linear noise schedule from 0.1 to 20, a U-Net-style residual MLP, role encodings for conditioning and marginalization, z-score preprocessing, Adam, exponential moving averages, and importance sampling. Conditional variants require two score functions; joint variants require three, amortized within one network. Appendix D reports approximately 20 minutes for both directions of a pair of one-dimensional series with 10,000 observations on one NVIDIA A100.

## Experiments

Synthetic tests use a linear Gaussian autoregressive system and a threshold-dependent joint system with known transfer entropy. Results average five independently generated datasets and retrained seeds. Baselines include AGM, NPEET, a MINE adaptation, TREET, and Tigramite; most tests use 10,000 observations. Sample-size tests range from 500 to 10,000, and Appendix C extends evaluation to 70 dimensions and 50,000 observations.

Selected appendix results, in nats (mean ± standard deviation):

| Setting and direction | Truth | TENDE result | Comparison |
| --- | --- | --- | --- |
| 70-dimensional redundant joint system, X → Y | 0.4152 | TENDE-c: 0.36 ± 0.04 | AGM: 0.31 ± 0.00 |
| 70-dimensional linear Gaussian stacking, Y → X | 4.4660 | TENDE-σ-c: 4.52 ± 0.06 | AGM: 4.45 ± 0.01 |
| 70-dimensional joint stacking, X → Y, 10,000 samples | 14.5314 | TENDE-c: 6.94 ± 0.80 | AGM: 6.79 ± 0.02 |
| Same setting, 50,000 samples | 14.5314 | TENDE-c: 10.86 ± 0.10 | AGM: 6.50 ± 0.01 |

Tables 2–5 support improved scaling in selected settings, rather than uniformly accurate estimation. Table 3 also reports TENDE-c at 4.86 ± 0.02 and a null-direction estimate of 0.39 ± 0.03, qualifying the surrounding prose's stronger accuracy claims.

On Santa Fe dataset B, the authors use indices 2350–3550 of physiological signals sampled at 2 Hz. Respiration-to-heart-rate estimates are roughly two to three times the reverse direction across most examined lags (§6). This is evidence of asymmetric predictive dependence without a known ground-truth information value. AGM is omitted because its available implementation supports only a single lag.

## Limitations

- Learned-score error can bias estimates in either direction; finite diffusion leaves a terminal-divergence approximation.
- Large information values remain underestimated even with 50,000 samples, and some null-direction estimates are positive.
- Window averaging relies on suitable stationary and ergodic behavior. Nonstationary dynamics and amortization across lags are future work.
- Tigramite is excluded beyond 10 stacking dimensions; TREET training is shortened at 50,000 samples because of NaN losses, limiting direct comparisons.
- Neural training is computationally expensive, and the physiological example is a selected segment from one patient.
- Appendix C.2.2 describes a CDF transformation into [0,1] but prints an inverse-CDF formula; that transformation is ambiguous in the supplied text.

## Related Concepts

- [[concepts/transfer-entropy|Transfer Entropy]] — directed conditional predictive information.
- [[concepts/diffusion-models|Diffusion Models]] — denoising scores supply the information estimator.

## Related Papers

- Franzese, Bounoua, and Michiardi (2023), “MINDE: Mutual Information Neural Diffusion Estimation”: the cited score-based KL estimation foundation.
- Kornai, Silva, and Nikolaou (2025), “AGM-TE”: supplies the synthetic benchmark and a generative baseline.
- [[papers/transfer-entropy-as-a-measure-of-information-flow-in-llms-and-vlms|Transfer Entropy as a Measure of Information Flow in LLMs and VLMs]] — a library comparison: uses an activation proxy, whereas TENDE targets conditional information through learned scores.

[[index|Library home]]
