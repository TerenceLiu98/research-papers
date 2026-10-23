---
title: "Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability"
type: paper
authors:
  - Kunpeng Xu
  - Lifei Chen
  - Shengrui Wang
year: null
tags:
  - time-series-forecasting
  - kolmogorov-arnold-networks
  - concept-drift
  - interpretable-machine-learning
---

## TL;DR

This paper adapts [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]] to univariate and multivariate time-series forecasting. T-KAN uses learnable edge-wise spline functions to expose relationships between lagged observations and forecasts and proposes tracking changes in those functions as evidence of [[concepts/concept-drift-in-time-series|concept drift]]. MT-KAN flattens histories from several variables so the same architecture can learn cross-variable relationships. On one financial-volatility dataset, the reported MT-KAN has the lowest MSE and MAE in the comparison table, while T-KAN matches the best reported RMSE with far fewer parameters than a similarly accurate LSTM. The experiments do not evaluate drift detection or extracted symbolic formulas, and the authors report that KAN training is about ten times slower than MLP training at equal parameter count.

## Research Question

Can edge-wise learnable univariate functions provide compact and interpretable models for univariate and multivariate time-series forecasting while exposing changing temporal relationships?

## Motivation

Accurate forecasting models can obscure how past observations and other variables determine their predictions. This is especially problematic when the data-generating process changes over time. The paper explores KAN as an alternative to node-activated MLPs because its learned spline functions can be inspected and approximated with symbolic expressions.

## Contributions

- Introduces T-KAN, a sliding-window KAN formulation for univariate forecasting that treats changes in learned edge functions and network structure as signals of changing temporal patterns.
- Adds symbolic regression over learned activation functions to express lag-to-forecast relationships in human-readable form.
- Introduces MT-KAN, which stacks the histories of multiple variables and jointly forecasts them through a KAN to capture temporal and cross-variable relationships.
- Compares compact T-KAN and MT-KAN configurations with MLP, RNN, and LSTM baselines on financial volatility forecasting.

## Method

In a KAN layer, each connection carries a learned univariate function rather than a scalar weight. The implementation parameterizes these functions with B-splines; deeper networks compose multiple such layers. This follows the architecture described in [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]], while using lagged observations as supervised inputs.

T-KAN maps an $h$-step univariate history to a future value through sums and compositions of edge functions. A sliding window produces training examples and an evolving sequence of fitted networks. The paper proposes interpreting similar learned functions as the same temporal concept and changes in them as concept drift. It also fits symbolic expressions to the learned functions, although the supplied text does not specify the symbolic-regression algorithm or a formula-selection criterion.

MT-KAN flattens and stacks the histories of several series. All variables and lags therefore enter the KAN jointly, and the output contains forecasts for all grouped variables. Individual outputs can be traced through their learned edge functions to the historical variables and steps that contribute to them. This architecture supplies a representation of nonlinear cross-variable association, not a causal identification procedure.

## Experiments

The dataset contains daily open, high, close, low, and volume records from January 4, 2012 through June 22, 2022 for 503 stocks. The target is a realized-volatility proxy computed from squared log returns. Models receive four 21-step windows, or 84 observations, and predict the next 21 days. T-KAN uses the configuration $[84,5,21]$; MT-KAN groups five variables and uses $[84\times5,5,21\times5]$. Training consists of 20 iterations, pruning at a threshold of $5\times10^{-2}$, and another 20 iterations.

The reported aggregate results are:

| Model | Configuration | MSE | MAE | RMSE | Parameters |
| --- | --- | ---: | ---: | ---: | ---: |
| MLP | $[84,200,21]$ | $8.92\times10^{-5}$ | 0.0072 | 0.0088 | 21,221 |
| RNN | $[84,200,21]$ | $8.03\times10^{-5}$ | 0.0069 | 0.0083 | 44,821 |
| LSTM | $[84,200,21]$ | $6.52\times10^{-5}$ | 0.0064 | 0.0075 | 166,621 |
| T-KAN | $[84,5,21]$ | $6.91\times10^{-5}$ | 0.0069 | 0.0078 | 193 |
| MT-KAN | $[84\times5,5,21\times5]$ | $6.37\times10^{-5}$ | 0.0062 | 0.0075 | 2,132 |

In the full table, MT-KAN has the lowest reported MSE and MAE and ties the lowest RMSE. T-KAN's RMSE matches that of the 11,671-parameter $[84,50,21]$ LSTM while using 193 parameters. Forecast plots for six stocks visually track the observed series, but the paper reports no uncertainty estimates, repeated-run variability, or statistical tests.

## Limitations

- The empirical study uses one financial dataset and classical MLP, RNN, and LSTM baselines rather than the contemporary forecasting methods discussed in the introduction.
- The supplied text does not describe chronological train, validation, and test boundaries, normalization, stock grouping, hyperparameter selection, or repeated runs in enough detail to assess leakage or variability.
- Concept drift is illustrated through changes in learned KAN functions, but there is no labeled or synthetic drift benchmark, detection metric, threshold, delay measurement, or comparison with drift-adaptation methods.
- Symbolic regression is proposed as the interpretability mechanism, but no recovered expression, fidelity score, stability analysis, or comparison with other explanation methods is reported.
- Joint dependence on all variables can reveal predictive associations but does not establish causal or structurally stable relationships.
- The authors state that KAN is typically about ten times slower to train than an MLP with the same number of parameters because heterogeneous edge functions do not fully exploit batch computation.
- No publication year, DOI, venue, or arXiv identifier appears in the supplied Markdown, so none is inferred here.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: the learnable edge-function architecture underlying both variants.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: the changing predictive relationships that T-KAN aims to expose.
- Symbolic regression: used to approximate learned spline functions with mathematical expressions.

## Related Papers

- Liu et al. (2024), "KAN: Kolmogorov-Arnold Networks," arXiv:2404.19756: the cited base architecture.
- Vaca-Rubio et al. (2024), "Kolmogorov-Arnold Networks (KANs) for Time Series Analysis," arXiv:2405.08790: contemporaneous KAN time-series work cited by the paper.
- Genet and Inzirillo (2024), "TKAN: Temporal Kolmogorov-Arnold Networks," arXiv:2405.07344: a separate temporal KAN architecture cited by the paper.
- Wen et al. (2024), "OneNet: Enhancing Time Series Forecasting Models under Concept Drift by Online Ensembling": a cited drift-adaptation method.
- Pham et al. (2022), "Learning Fast and Slow for Online Time Series Forecasting," arXiv:2202.11672: the cited FSNet approach to changing temporal patterns.

[[index|Library home]]
