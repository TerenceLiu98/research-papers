---
title: "CAST: A Cross-Asset State-Space Trading System for Drawdown Control in Stock Markets"
type: paper
authors:
  - Yu Peng
  - Matloob Khushi
  - Josiah Poon
year: null
tags:
  - algorithmic-trading
  - kalman-filtering
  - model-predictive-control
  - drawdown-control
  - online-learning
---

## TL;DR

CAST combines a cross-asset collaborative Kalman filter with [[concepts/uncertainty-aware-model-predictive-trading|uncertainty-aware model predictive trading]]. Three integrated-random-walk orders are weighted online for each asset, while a joint process-noise covariance shares innovations across correlated assets. A receding-horizon controller then penalizes positions in proportion to forecast uncertainty. In frictionless 2010-2025 backtests on four 30-stock baskets, CAST remains on the reported final-value/maximum-drawdown Pareto frontier, but the evidence does not include transaction costs, slippage, market impact, or live trading.

## Research Question

Can an online state-space predictor and a forecast-uncertainty-aware trading controller adapt to changing and correlated equity markets while limiting maximum drawdown without requiring periodic model retraining?

## Motivation

Offline stock forecasters can degrade when temporal distributions and cross-asset relationships change after training. Optimizing predictive error or return alone also leaves the conversion from forecasts to risk-controlled trades underspecified. CAST separates these concerns: an online predictor updates latent market states, and a controller converts its forecast path and uncertainty into constrained trades. This design targets [[concepts/concept-drift-in-time-series|concept drift in time series]] at the prediction layer and drawdown at the decision layer.

## Contributions

- Adapts collaborative Kalman filtering to financial prices by combining order-1, order-2, and order-3 integrated-random-walk filters with per-asset credibility weights derived from recent multi-step forecast errors.
- Introduces the Cross-Asset Collaborative Kalman Filter (CoKF), which couples asset states through a process-noise covariance built from pre-test correlations of daily price changes.
- Connects CoKF to a receding-horizon model predictive controller whose objective balances predicted trading profit against an uncertainty-scaled position penalty.
- Keeps the predictor-controller interface limited to predicted price paths and uncertainty, allowing either component to be replaced independently.
- Evaluates long-window performance, crisis drawdowns, forecast-error drift, component ablations, and risk-penalty sensitivity across four equity baskets.

## Method

For each asset, CAST runs Kalman filters based on integrated random walks of orders 1, 2, and 3. The orders correspond locally to constant, linear, and parabolic price paths. At each date, a filter's credibility is the normalized inverse power of the squared error from the multi-step forecast issued one horizon earlier. Their weighted forecasts form an asset-level future price path.

CoKF stacks all assets' latent states for each order. State transitions and observation noise remain block diagonal, while the process-noise covariance couples the leading price-state components using the empirical correlation of daily price changes and asset-specific innovation scales. If this correlation matrix is the identity, the joint recursion decomposes into independent collaborative Kalman filters.

Each asset has a separate account and model predictive controller. The controller plans trades across an $L$-step horizon, constrains each transaction to a fraction of current account value, and requires the planned sequence to unwind the current trade by the horizon end. Its linear-program objective maximizes forecast profit minus a penalty proportional to absolute trade size, an explicit risk coefficient $\lambda$, and horizon-dependent forecast standard deviation. Only the first action is executed before the system updates and replans at the next close.

## Experiments

The evaluation uses four 30-stock baskets: NASDAQ, CSI300, TPX100, and Global30. Data from 2005-2010 calibrate CAST and train or validate baselines; 2010-April 2025 is held out for testing. Parameters calibrated before 2010 remain fixed, although the Kalman states and order weights update online. The frictionless backtest starts each account at $1,000, prohibits leverage, caps each trade at 50% of account value, and carries terminal positions. Metrics are final value, maximum drawdown, Calmar ratio, annualized Sharpe ratio, and Sortino ratio.

Against 15 forecasting baselines, CAST reports final values of \$1,633, \$1,272, \$1,152, and \$1,133 and maximum drawdowns of 0.114, 0.158, 0.134, and 0.031 on NASDAQ, CSI300, TPX100, and Global30, respectively. The paper reports that no tested baseline has both higher final value and lower drawdown on any market. CAST and the asset-independent CKF both have positive Calmar, Sharpe, and Sortino ratios on all four markets.

Crisis tests cover the 2020 COVID-19 crash and the 2022 rate-hike period. Across the eight market-period combinations, CAST's reported maximum drawdown ranges from 0.009 to 0.103; it is not best in every case. In a forecast-decay test, the authors normalize each method's relative MAE in five consecutive test subperiods by its first-period value. CAST and CKF remain near 1, while several selected baselines rise substantially, including 8-20-fold increases for ALSTM, RSR, and DDG-DA on TPX100.

Ablations show that the controller's uncertainty penalty is consequential. Setting $\lambda=0$ raises maximum drawdown to 0.806 on NASDAQ and 0.816 on CSI300, compared with 0.114 and 0.158 for CAST. Removing the multi-step forecast or the full MPC also worsens risk-adjusted performance. Fixed order-2 and order-3 Kalman filters have negative Sharpe ratios and drawdowns above 0.40 on the two ablation markets; collaborative order weighting substantially improves both, with cross-asset coupling providing a further but market-dependent change.

## Limitations

- The backtest assumes zero transaction costs and slippage and does not model liquidity, market impact, execution delay, borrowing constraints, or taxes. Reported investment results therefore do not establish deployable net performance.
- Each market contains only 30 selected stocks, and all four datasets use one shared historical split. Results do not establish robustness to different constituent selection, asset classes, frequencies, or genuinely prospective trading.
- The empirical correlation matrix is calibrated before the test period and then fixed. Online state updates address changing prices, but they do not update the cross-asset dependence structure itself.
- CoKF's dense correlation matrix has quadratic parameter growth and can become poorly identified as the number of assets exceeds the calibration-window rank. The paper proposes hierarchical low-rank coupling as future work but does not test it.
- Per-asset accounts isolate risk attribution but do not optimize portfolio-wide covariance, capital allocation, sector exposure, or a joint drawdown constraint.
- The source Markdown does not establish a publication venue, year, DOI, or arXiv identifier. The paper reports three-run averages for deep baselines but does not provide uncertainty intervals for the main investment metrics.

## Related Concepts

- [[concepts/uncertainty-aware-model-predictive-trading|Uncertainty-Aware Model Predictive Trading]]: the reusable predictor-controller pattern that converts a forecast path and uncertainty into repeatedly replanned trades.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: motivates online state and model-order adaptation as market dynamics change.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: provides the broader distinction between point forecasts and uncertainty representations, although CAST evaluates uncertainty through trading outcomes rather than calibration scores.

## Related Papers

- [[papers/storm-a-spatio-temporal-factor-model-based-on-dual-vector-quantized-variational-autoencoders-for-financial-trading|STORM: A Spatio-Temporal Factor Model Based on Dual Vector Quantized Variational Autoencoders for Financial Trading]]: another cross-sectional and temporal financial model, evaluated with portfolio and trading metrics but trained offline.
- [[papers/neural-mjd-neural-non-stationary-merton-jump-diffusion-for-time-series-prediction|Neural MJD: Neural Non-Stationary Merton Jump Diffusion for Time Series Prediction]]: models time-varying financial dynamics probabilistically but does not provide CAST's receding-horizon trading controller.
- Niedzwiecki (2012), "Locally adaptive cooperative Kalman smoothing and its application to identification of nonstationary stochastic systems": the collaborative Kalman-filtering precedent adapted by CAST.
- Mayne et al. (2000), "Constrained model predictive control: Stability and optimality": a foundational constrained MPC reference used by the paper.

Code URL supplied by the paper: [FanBroWell/CAST](https://github.com/FanBroWell/CAST).

[[index|Library home]]
