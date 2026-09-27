---
title: Time Series Foundation Models for Multivariate Financial Time Series Forecasting
type: paper
authors:
  - Ben Asher Marconi
year: 2025
tags:
  - time-series-forecasting
  - foundation-models
  - transfer-learning
  - financial-forecasting
---

## TL;DR

This July 2025 report evaluates Tiny Time Mixers (TTM) and a model identified as Chronos-Bolt-Small on three financial forecasting tasks. Pretrained TTM generally learns with less target data than the same architecture initialized randomly, but this transfer advantage does not imply superiority over conventional models: TTM leads the reported Treasury-yield comparison, while simpler models win on FX volatility and an error correction model leads the equity-spread comparison. Chronos fails to consistently beat naive forecasts in the tested setup. Possible pretraining look-ahead bias, tuning around one reference date, and inconsistent model descriptions limit broader conclusions.

## Research Question

Do pretrained time series models improve accuracy and sample efficiency in multivariate financial forecasting, and do those gains survive comparison with naive and task-specific models across changing market conditions?

## Motivation

Daily financial histories provide relatively few observations for training neural networks, especially for newly listed instruments or infrequently measured variables. Pretraining might supply useful temporal patterns, but financial noise, regime changes, and cross-variable dependencies can make transfer unreliable. The study separates the benefit of pretrained initialization from the practical question of which forecaster performs best.

## Contributions

- Evaluates two pretrained model families on yield changes, persistent volatility, and mean-reverting equity spreads.
- Combines learning curves over increasing training histories with rolling comparisons of pretrained and randomly initialized models, both with and without target-task training.
- Reports task-dependent transfer gains, conventional baseline comparisons, and an exploratory Treasury ETF backtest.

## Method

The datasets span January 2005 to January 2025 at daily frequency. Inputs combine technical indicators with market and macroeconomic variables from sources including Yahoo Finance, US Treasury, FRED, Macrosynergy, and the ECB (Sections 3.2-3.12).

| Task | Evaluated target and horizon | Naive forecast |
| --- | --- | --- |
| US 10-year Treasury yield | Cumulative percentage yield change, 21 business days ahead | Zero change |
| EUR/USD volatility | Log realized volatility, 21 business days ahead | Last observed target |
| EWA/EWC equity spread | Log-price difference standardized over a trailing 42-day window, 5 or 10 business days ahead | Last value at 5 days; zero at 10 days |

The spread target follows Equation (4); the opening of Section 3.12 also calls it a daily change, which is inconsistent with that formula. Stationarity and cointegration checks are reported as preprocessing steps.

TTM uses a pretrained MLP mixing architecture with full fine-tuning, AdamW, a learning-rate range test, OneCycleLR, dropout 0.2, and batch size 64. Context/output lengths are 90/30 for yields, 512/48 for volatility, and 512/96 for spreads. These configured output lengths differ from the evaluated horizons above. Training uses 25, 50, and 4 epochs respectively, with MSE as the objective and evaluation metric (Section 4.1.1).

The Chronos experiments use AutoGluon, full fine-tuning, batch size 32, and a reported weighted quantile loss objective; median predictions are evaluated with MSE. Table 9 lists context/output lengths of 90/21, 90/21, and 360/10. The report's descriptions of Chronos variants and covariate handling are insufficiently consistent to establish the exact implementation from the text alone.

For [[concepts/transferability-evaluation|Transferability Evaluation]], the study compares pretrained and randomly initialized versions of the same architecture. For either zero-shot (ZS) or fine-tuned (FT) evaluation, it defines

$$
\Delta_r = \frac{E_{\mathrm{random},r}-E_{\mathrm{pretrained},r}}
{E_{\mathrm{random},r}},\qquad r\in\{\mathrm{ZS},\mathrm{FT}\}.
$$

Positive gain means lower error than the random-initialization control in that regime. It is not an improvement relative to the naive or best conventional forecast. The paper uses 10% as a practical gain threshold (Sections 2.8.2-2.8.3).

## Experiments

The sample-efficiency probe trains on 2-14 years preceding 22 January 2021 and evaluates subsequent observations into late 2024 or early 2025. An elbow in these learning curves determines the history length for rolling evaluation. Rolling origins advance every six months, each using a trailing training window and a two-year evaluation window, with additional context where specified (Sections 4.3-4.4). Conventional comparisons include linear and Ridge regression, gradient boosting, random forests, and task-dependent sequential baselines including VAR, LSTM, and ECM.

**TTM transfer gains.** Tables 10-12 report the following relative MSE reductions against the corresponding randomly initialized TTM control. Limited data means under ten years of target history.

| Task | Fine-tuned, full data | Fine-tuned, limited data | Zero-shot |
| --- | --- | --- | --- |
| Treasury yield, 21 days | 1.73% | 29.32% | -74.16% |
| FX volatility, 21 days | 30.62% | 50.90% | 34.40% |
| Equity spread, 5 days | 31.68% | 25.36% | 57.35% |
| Equity spread, 10 days | 14.65% | 22.29% | 34.89% |

**Sample efficiency.** Section 5.1 reports that scratch TTM needs approximately three additional years to match pretrained performance on yields. On volatility, pretrained TTM beats the naive baseline with two years of training data, whereas scratch TTM needs ten. On spreads, the corresponding histories are four and eleven years. Scratch training eventually approaches pretrained performance in the first two learning-curve experiments, but not in the spread experiment. These observations concern the particular reference-date curves rather than universal data requirements.

**Absolute forecasting performance.** Fine-tuned TTM leads the reported yield benchmark comparison, while its zero-shot yield forecasts are poor. Conventional models outperform TTM on volatility despite positive transfer gains. Section 5.3.3 identifies ECM as the strongest spread benchmark. Pretrained zero-shot TTM consistently beats the five-day naive spread forecast in the reported rolling comparison, but the ten-day result is less consistent. Fine-tuning can worsen performance away from the January 2021 tuning date. Pandemic-related windows also expose performance instability. Chronos is excluded from further transfer-gain analysis after failing to consistently exceed naive baselines across the sample-efficiency experiments.

**Exploratory trading evidence.** Appendix A.3 converts yield forecasts into three IEF trading signals with six-month retraining on eight years of history. Table 13 reports CAGR/Sharpe of 3.31%/0.54 for buy-and-hold, 7.35%/1.21 for the EWMA signal, and 6.49%/1.39 for the directional-voting signal. Transaction costs are not specified in the supplied backtest description, and possible pretraining leakage remains unresolved. These results do not establish deployable trading performance.

## Limitations

- **Temporal validity:** Section 6.2 acknowledges that pretrained weights may include data from after historical forecast origins, including correlated financial series. The report does not resolve this potential look-ahead bias.
- **Selection and uncertainty:** Training-history selection uses learning curves evaluated after January 2021; the spread discussion explicitly notes possible overfitting to that reference date. Rolling two-year test windows overlap. Fixed seeds are reported, but no confidence intervals or formal significance procedure accompany the transfer-gain tables. Exceeding the 10% threshold alone does not establish statistical significance.
- **Model attribution:** The report identifies Chronos-Bolt-Small as the tested model but describes quantized, autoregressive Chronos and alternates between language-model adaptation and time-series pretraining from scratch. Reference [66] points to a Chronos-T5-Small model card. Architecture, pretrained weights, and wrapper behavior therefore remain ambiguous; the observed gap cannot isolate tokenization, architecture, or financial pretraining as its cause.
- **Internal inconsistencies:** The conclusion's broad full-data gains exceed the 1.73% yield result in Table 10. Its claim that zero-shot TTM beats all spread benchmarks conflicts with Section 5.3.3's ECM ranking. Section 4.2 excludes VAR/LSTM from the yield task, but Section 5.1.3 discusses them as yield benchmarks. This page retains the exact gain tables and qualifies the benchmark narrative.
- **Scope and utility:** Two models, three tasks, and primarily MSE-based evaluation cannot establish general superiority of any TSFM family or practical financial value. Pretraining corpora and architectures vary simultaneously. The appendix backtest is narrower than a comprehensive economic evaluation.
- **Source completeness:** The supplied text names the author, Imperial College London affiliation, and July 2025 date, but provides no stable identifier or publication venue for this report. It ends during Appendix A.4 after an AR(1) equation. No missing metadata or results are inferred.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable temporal models evaluated through zero-shot use and target-task adaptation.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: separates initialization gains, sample efficiency, and performance against practical baselines.

## Related Papers

- Ekambaram et al. (2024), "Tiny Time Mixers (TTMs): Fast Pre-trained Models for Enhanced Zero/Few-Shot Forecasting of Multivariate Time Series," reference [63]: the TTM source, identified in the bibliography as arXiv:2401.03955.
- Ansari et al. (2024), "Chronos: Learning the Language of Time Series," reference [64]: the cited Chronos source, arXiv:2403.07815; the report's Bolt/T5 ambiguity remains unresolved.
- Fu, Hirano, and Imajo (2024), "Financial Fine-tuning a Large Time Series Model," reference [41], arXiv:2412.09880: cited prior work on financial adaptation of TimesFM.
- [[papers/cpiri-channel-permutation-invariant-relational-interaction-for-multivariate-time-series-forecasting|CPiRi: Channel Permutation-Invariant Relational Interaction for Multivariate Time Series Forecasting]]: a thematic library connection using a frozen temporal foundation model with learned cross-channel interactions. It is not a cited comparison in this report.
- [[papers/multivariate-time-series-forecasting-needs-cross-variable-loss|Multivariate Time Series Forecasting needs Cross Variable Loss]]: a thematic library connection about cross-variable forecasting objectives, rather than pretraining transfer; not a cited baseline here.

[[index|Library home]]
