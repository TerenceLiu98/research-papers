---
title: Multi-step ahead carbon credit price forecasting using time series foundation models
type: paper
authors:
  - Lian Lian Jiang
  - Wei Soon Cheong
  - Jamie Suat Ling Ng
year: null
tags:
  - time-series-forecasting
  - foundation-models
  - carbon-markets
  - financial-forecasting
---

## TL;DR

This EU ETS benchmark compares five time series foundation models with eleven statistical, machine learning, deep learning, and decomposition-based baselines. Model choice depends on horizon and frequency: ARIMA leads average daily MAPE through 40 days, MOIRAI leads beyond 40 days, random forests lead monthly MAPE overall, and Lag-Llama leads beyond eight months. The results support selective use of pretrained forecasters rather than uniform superiority of foundation models.

## Research Question

Can pretrained time series models improve multi-step carbon allowance price forecasts across daily and monthly resolutions, especially at long horizons where conventional models may deteriorate?

## Motivation

Carbon allowance prices combine nonstationary market dynamics with regulatory and energy-market influences. Short-term trading and longer-term compliance planning require different forecast horizons. The paper tests whether cross-domain pretraining supplies useful temporal patterns for this setting without extensive task-specific feature engineering. Its empirical target is EU ETS allowance prices, despite the broader term "carbon credit" in the title.

## Contributions

- Benchmarks TTM, TimeGPT-1, MOMENT, MOIRAI, and Lag-Llama against eleven conventional models at 22 daily and ten monthly horizons.
- Compares historical-price-only inputs with selected exogenous features and considers zero-shot and fine-tuned foundation-model variants.
- Reports horizon-specific errors, average ranks, top-three frequencies, and residual dispersion, revealing substantial changes in model ordering across time scales.

## Method

**Data and preprocessing.** The dataset spans 13 November 2012 to 31 October 2024, with a reported 60%/20%/20% training/validation/test split. The authors assemble 105 variables covering prices, macroeconomic conditions, carbon allowance supply and demand, energy, and other economic indicators. Daily inputs are averaged for monthly forecasting; lower-frequency variables are repeated to match finer frequencies. Missing values use linear interpolation and edge forward/backward filling (Sections 3.4 and 3.7).

Daily experiments compare historical prices alone with the top 4, 8, or 12 selected features; monthly experiments consider the top 20% of features or prices alone. Daily lookback is fixed while feature count varies with horizon; monthly lookback and feature count vary with horizon. Exact lookback values and a complete feature-selection protocol are not supplied. Instance normalization uses the mean and standard deviation of a preceding input window (Section 3.5).

**Models and adaptation.** Baselines are ARIMA, BPNN, SVR, RF, XGBoost, LSTM, 1D-CNN, EMD-LSTM, EEMD-LSTM, CEEMDAN-LSTM, and Wavelet-LSTM. MOIRAI, MOMENT, TTM, and TimeGPT-1 are evaluated in zero-shot and fine-tuned modes; Lag-Llama uses historical prices only. Reported results retain the best-performing configuration for each case, including adaptation regime. Section 4.1.1 states that zero-shot MOIRAI without additional features outperforms its fine-tuned variants in the daily analysis. The parsed tables do not preserve the italic formatting that originally distinguished individual zero-shot results.

Neural training generally uses MSE, Adam at 0.001, batch size 16, up to 100 epochs, and early-stopping patience 10, with model-specific exceptions. Appendix A lists ARIMA(1,1,1), TTM R2 variants selected by horizon, MOMENT-1-large, and MOIRAI 1.0 R large. MOIRAI and Lag-Llama use means of 100 predictive samples as point forecasts.

**Evaluation.** Daily horizons are 1, 2, 3, 4, 5, 7, 14, 21, 28, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 180, 365, and 545 days. Monthly horizons are 1, 2, 4, 6, 8, 10, 12, 14, 16, and 18 months. MAPE, MAE, and RMSE measure point error; ranks summarize performance across the selected horizons. The paper's "uncertainty" is the standard deviation of residuals across samples at each forecast step, averaged over steps (Equations 9-10). It does not measure predictive-interval coverage or probabilistic calibration.

## Experiments

Tables 8 and 10 report the following mean MAPE values within each horizon group. Lower is better; these are averages over the tested horizons, not every day or month in the range.

| Frequency and horizon group | Leading model | Mean MAPE (%) | Selected comparisons, MAPE (%) |
| --- | --- | --- | --- |
| Daily, at most 40 days | ARIMA | 5.18 | TTM 5.35; MOIRAI 5.59; LSTM 5.69 |
| Daily, over 40 days | MOIRAI | 12.38 | BPNN 14.90; RF 14.99; ARIMA 15.02 |
| Monthly, at most 8 months | RF | 11.22 | XGBoost 12.11; BPNN 12.29; Lag-Llama 13.69 |
| Monthly, over 8 months | Lag-Llama | 18.18 | RF 19.86; SVR 21.13; BPNN 22.50 |

**Daily forecasts.** Across all 22 horizons, MOIRAI has the lowest reported average MAPE, 8.67%, followed by ARIMA at 9.65% and TTM at 10.09% (Table 7). TTM appears in the top three at 19 horizons, ARIMA at 18, and MOIRAI at 15 (Table 8). ARIMA wins most short horizons, but TTM wins at 35 days. At 545 days, MOIRAI's MAPE is 23.91%, compared with RF's 27.88%, ARIMA's 40.17%, and TTM's 48.44%. Foundation-model advantages therefore differ substantially even within that model category.

**Monthly forecasts.** RF has the best all-horizon MAPE, 15.54%, versus Lag-Llama's 15.93% (Table 9). Lag-Llama wins each tested horizon from 12 through 18 months; RF wins at 10 months. TTM and MOIRAI have overall MAPE of 24.29% and 23.44%, respectively, despite their stronger daily results. The monthly MAE and RMSE appendices favor Lag-Llama overall, at 7.32 and 9.08, illustrating that the overall winner also depends on the error metric (Tables B.16 and C.19).

**Features and adaptation.** The authors report that historical prices alone work best for several models, including MOIRAI and TimeGPT-1 in the daily discussion. TTM and MOMENT can benefit from additional features at short horizons, with diminishing gains at longer horizons. These observations are not presented as a complete controlled feature ablation.

## Limitations

- **Single-market scope:** Only EU ETS data are evaluated. Transfer to other compliance or voluntary markets, policy regimes, and liquidity conditions remains proposed future work.
- **Selection and temporal validity:** Best configurations are reported, but the text does not clearly establish which split governs every feature, lookback, and adaptation choice. Release-time alignment of repeated macroeconomic variables, interpolation boundaries, rolling forecast origins, and pretraining overlap are insufficiently documented to verify prospective evaluation validity.
- **Headline/table discrepancy:** The abstract reports daily long-horizon MAPE reductions of 21.08-21.32% and monthly reductions of 9.24-23.76% against the top three classical baselines. Using conventional baseline-relative reduction on the displayed group means gives approximately 16.9-17.6% for MOIRAI versus BPNN/RF/ARIMA and 8.5-19.2% for Lag-Llama versus RF/SVR/BPNN. The headline ranges are therefore not reproduced by Tables 8 and 10; this page preserves their absolute values.
- **Uncertainty and attribution:** Residual dispersion is distinct from calibrated forecast uncertainty and from uncertainty in differences between models. The results do not isolate whether architecture, pretraining data, tuning, or feature choices cause the ranking differences. Some architectural descriptions also conflict internally, such as describing MOIRAI as both a masked-encoder transformer and an S4/S5 backbone; no such mechanism is inferred here.
- **Reproducibility and metadata:** Data are available on request. Normalization comparisons are omitted, and the supplied bibliography ends at reference [73] despite citing [74]. No publication year, venue, DOI, or arXiv identifier for this paper appears in the supplied Markdown, so none is inferred. Source: Cognitio job `de47b6c7-3430-479a-beb6-7815315ed831`.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: pretrained forecasters tested under different adaptation regimes, sampling frequencies, and horizons.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishes target-market forecast accuracy from evidence about the contribution and generality of pretraining.

## Related Papers

- Woo et al. (2024), "Unified Training of Universal Time Series Forecasting Transformers," reference [31], arXiv:2402.02592: the cited source for the evaluated MOIRAI model.
- Ekambaram et al. (2024), "Tiny Time Mixers (TTMs): Fast Pre-trained Models for Enhanced Zero/Few-Shot Forecasting of Multivariate Time Series," reference [33]: the cited TTM source.
- Rasul et al. (2023), "Lag-Llama: Towards Foundation Models for Probabilistic Time Series Forecasting," reference [35], arXiv:2310.08278: the cited Lag-Llama source.
- [[papers/time-series-foundation-models-for-multivariate-financial-time-series-forecasting|Time Series Foundation Models for Multivariate Financial Time Series Forecasting]]: a thematic library connection examining task-dependent financial forecasting and the distinction between transfer gains and conventional-baseline performance; not a cited experiment in this paper.
- [[papers/moirai-moe-empowering-time-series-foundation-models-with-sparse-mixture-of-experts|MOIRAI-MOE: Empowering Time Series Foundation Models with Sparse Mixture of Experts]]: a related library paper on a different MOIRAI-family architecture; MOIRAI-MOE is not evaluated in this carbon-price benchmark.

[[index|Library home]]
