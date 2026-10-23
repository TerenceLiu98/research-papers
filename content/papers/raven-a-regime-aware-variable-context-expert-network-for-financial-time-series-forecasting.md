---
title: "RAVEN: A Regime-Aware Variable-context Expert Network for Financial Time Series Forecasting"
type: paper
authors:
  - Cheng He
  - Zhenyu Guan
  - Xijie Liang
  - Defu Lian
  - Jiajia Li
  - Enhong Chen
  - Patrick P. C. Lee
  - Geng Hu
  - Zehao Chen
year: null
tags:
  - financial-time-series
  - time-series-forecasting
  - mixture-of-experts
  - adaptive-context
  - nonstationarity
---

## TL;DR

RAVEN replaces one fixed look-back window with sample-dependent, nested windows routed to temporal-scale experts. A parallel full-context branch preserves global information, while correlation-aware weighting reduces redundancy caused by overlapping expert inputs. The paper reports the best aggregate results among its tested baselines on HS300 and S&P500 return prediction, an 18.2% average MSE reduction over MLF on fund sales, and the best result in 14 of 16 PEMS traffic metrics.

## Research Question

Can a forecasting model adapt its effective historical context to each sample and market regime, rather than treating look-back length as a fixed hyperparameter, while retaining useful full-history information and avoiding redundant multi-scale representations?

## Motivation

Financial log-returns are noisy, heavy-tailed, and nonstationary. A short context can miss longer regime structure, whereas a long context can introduce stale observations. Existing multi-period methods use predefined horizons, and token-routed mixture-of-experts models specialize by local patch content rather than by contiguous temporal scale. RAVEN treats context length itself as a learned, sample-dependent routing decision.

## Contributions

- Introduces [[concepts/adaptive-temporal-context-routing|Adaptive Temporal-Context Routing]], which converts learned patch-importance scores into nested recent-history windows through cumulative importance thresholding (CIT).
- Uses scale-specialized experts for short-, intermediate-, and long-horizon contexts while preserving temporal contiguity within every routed window.
- Combines a Global Compressed Representation (GCR) branch with shape-aligned pooling and Correlation-Aware Weighting (CAW) to retain full-context information and suppress overlap-induced redundancy.
- Evaluates the architecture on equity return, mutual-fund sales, and traffic forecasting, with component ablations, efficiency measurements, hyperparameter studies, and routing case studies.

## Method

**Input and patching.** Each multivariate look-back window is normalized over time, processed channel-independently, and split into non-overlapping patches ordered from most recent to oldest. A shared projection and sinusoidal positional encoding produce the patch sequence. For equities, the target is the cumulative log-return over the next 10 days.

**Adaptive local branch.** A two-layer MLP scores each patch, and a softmax produces normalized importance. Reverse-chronological cumulative importance is compared with ordered thresholds. With the default three thresholds $(0.3, 0.6, 0.9)$, this creates three nested, contiguous prefixes anchored at the latest patch. Independent three-layer encoders process the variable-length prefixes, so expert specialization is defined by temporal scale rather than patch content.

**Fusion and global context.** Average pooling maps each expert sequence to a fixed-dimensional vector. CAW combines routing confidence with an exponential penalty based on positive pairwise cosine similarity, downweighting expert outputs that duplicate information. In parallel, self-attention and average pooling compress the entire patch sequence into the GCR vector. An MLP predicts from the concatenated local and global representations.

**Training.** Mean squared error is augmented with negative-entropy regularization on patch importance to prevent all experts receiving nearly identical short prefixes, and a cosine-similarity diversity loss to discourage representation collapse. The reported default uses three experts, patch length 16, embedding dimension 128, and AdamW training for 60 epochs on one NVIDIA A100 40 GB GPU.

## Experiments

**Equity returns.** Models train on 2009-2019 data and are evaluated by rolling out-of-sample prediction from 2020-2024. On HS300, RAVEN reports Corr 0.0390, ICIR 0.3932, and MSE 0.9905; relative to MLF, the strongest stated baseline, Corr and ICIR improve by 9.2% and 9.9%, while MSE decreases by 0.27%. On S&P500, it reports Corr 0.0363, ICIR 0.5980, and MSE 1.001, corresponding to reported improvements of 20.2% in Corr, 7.2% in ICIR, and 1.5% in MSE over MLF. RAVEN ranks first in all six aggregate dataset-metric combinations and in 21 of 30 year-metric-dataset cells.

**Fund sales and traffic.** Across 1-, 5-, 8-, and 10-day fund-sales horizons, average MSE is 32.42 versus 39.62 for MLF, an 18.2% reduction; average WMA is 81.63 versus 82.73. On PEMS03, PEMS04, PEMS07, and PEMS08 at horizons 12 and 24, RAVEN records the best value in 14 of 16 MSE/MAE comparisons.

**Ablations and sensitivity.** On HS300, overall Corr falls from 0.0390 to 0.0352 without adaptive routing, 0.0358 without CAW, 0.0360 without GCR, 0.0373 without entropy regularization, and 0.0372 without diversity regularization. Three experts outperform two and four in the tested settings. Alternative CIT thresholds and patch lengths vary overall Corr by about 5% or less, while the maximum look-back study peaks around 120 days and degrades at 150 days.

**Efficiency and deployment evidence.** At batch size 512 with a 120-day look-back, RAVEN reports 77.89 ms per training iteration, 26.98 ms per inference iteration, and 3.23 GB peak training memory. These costs exceed MLF and PatchTST but remain below Scaleformer and PathFormer. The paper reports that an offline, transaction-cost-aware backtest beats one production baseline by more than 10% in cumulative return. Live production integration and monitoring were still in progress, so this is not evidence of realized live-trading performance.

## Limitations

- The central financial evaluation covers two equity universes and one fund-sales dataset. Broader asset classes and high-frequency data are proposed as future work rather than evaluated settings.
- Component ablations are reported on HS300, so their contribution is not independently established across the other domains. The routing case studies visualize a small set of stocks and support adaptation behavior descriptively rather than causally.
- RAVEN still requires a designer-chosen maximum look-back, patch length, expert count, and threshold set. Its adaptive routing selects within that predefined envelope; the 150-day result suggests the router does not completely remove stale-context effects.
- The reported financial correlations are small in absolute magnitude, and the supplied source does not report uncertainty intervals or transaction-level live results. Backtest gains are relative to a single unnamed production baseline.
- The system uses overlapping nested windows, so CAW and the diversity loss manage rather than eliminate shared information and additional expert computation.
- The supplied Markdown contains no publication venue, year, DOI, or preprint identifier for RAVEN. The year is left null rather than inferred from cited works. This page summarizes only the supplied source for Cognitio job `32b3957c-0d47-4bc5-a40c-71fb2070cd8f`.

## Related Concepts

- [[concepts/adaptive-temporal-context-routing|Adaptive Temporal-Context Routing]]: sample-dependent selection of contiguous historical context at multiple scales.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: conditional expert computation; RAVEN changes the routing unit from individual tokens to nested temporal windows.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: changing predictive relationships that motivate adapting the effective context.
- [[concepts/financial-market-stylized-facts|Financial Market Stylized Facts]]: empirical properties, including heavy tails and volatility dependence, that distinguish financial series from regular benchmark signals.

## Related Papers

- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE: Empowering Time Series Foundation Models with Sparse Mixture of Experts]]: token-level expert routing for time-series foundation models, contrasted with RAVEN's temporal-scale routing.
- Nie et al. (2023), "A Time Series Is Worth 64 Words: Long-term Forecasting with Transformers": the cited PatchTST basis for channel-independent patch processing.
- Zhang et al. (2025), "Multi-period Learning for Financial Time Series Forecasting": the cited predefined-period baseline and strongest stated financial comparator.
- Corsi (2009), "A Simple Approximate Long-Memory Model of Realized Volatility": an econometric precedent for combining multiple fixed temporal horizons.

[[index|Library home]]
