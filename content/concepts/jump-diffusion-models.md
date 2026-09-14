---
title: Jump-Diffusion Models
type: concept
aliases:
  - Jump Diffusion
tags:
  - stochastic-processes
  - time-series-forecasting
  - jump-processes
---

## Overview

Jump-diffusion models combine continuous stochastic fluctuations with discontinuous state changes. Drift controls predictable local movement, diffusion scales continuous noise, and a jump mechanism specifies event frequency and jump sizes. Hidden regimes can affect these components, requiring state inference alongside forecasting.

## Key Ideas

- A representative uncompensated formulation is $dX_t=\mu_t\,dt+\sigma_t\,dW_t+\int\gamma(t,z)N(dt,dz)$. A compensated jump formulation subtracts the predictable jump contribution; its drift must be interpreted accordingly.
- Jump intensity describes event frequency, while the mark distribution and jump-size map determine displacement. Forecasting a conditional event probability does not identify the exact time of an inaccessible future jump.
- Under partial observation, [[concepts/zakai-filtering|Zakai Filtering]] can maintain a belief over hidden states governing drift, volatility, or intensity. Predictive distributions then average over latent uncertainty.
- A short-step no-jump/one-jump approximation simplifies likelihood evaluation, but omits multiple-jump events. Its usefulness depends on the intensity relative to the step length.
- Approximating compensated small jumps by Gaussian noise with matching moments can reduce simulation cost under suitable conditions, while retaining larger jumps explicitly. This is an approximation to a stochastic model, not a universal description of all abrupt data changes.
- Distributional evaluation matters alongside point error: CRPS, log-likelihood, and interval coverage can reveal differences hidden by similar MAE. Measured coverage should not be confused with a guarantee of [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]].

## Important Papers

- [[papers/deep-zakaij-structured-filtering-for-jump-diffusion-time-series-forecasting|Deep ZakaiJ: Structured Filtering for Jump-Diffusion Time Series Forecasting]]: conditions learned jump-diffusion dynamics on an explicit latent-state belief.
- Merton (1976), "Option pricing when underlying stock returns are discontinuous": classical reference [3] in Deep ZakaiJ.
- Gao, Yan, Leng, and Liao (2025), "Neural MJD: Neural non-stationary Merton jump diffusion for time series prediction": neural comparator, reference [43] in Deep ZakaiJ.
- Asmussen and Rosinski (2001), "Approximations of small jumps of Levy processes with a view towards simulation": small-jump approximation reference [57] in Deep ZakaiJ.

## Related Concepts

- [[concepts/zakai-filtering|Zakai Filtering]]
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]
