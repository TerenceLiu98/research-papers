---
title: Uncertainty-Aware Model Predictive Trading
type: concept
aliases:
  - Uncertainty-Aware MPC Trading
  - Forecast-Uncertainty-Aware Trading Control
tags:
  - algorithmic-trading
  - model-predictive-control
  - uncertainty-quantification
  - risk-management
---

## Overview

Uncertainty-aware model predictive trading converts a forecast path and its uncertainty into a constrained sequence of planned trades, executes only the first trade, and replans after the next market observation. The approach separates prediction from decision-making: the forecaster estimates possible price evolution, while the controller expresses trading objectives, risk aversion, and operational constraints.

## Key Ideas

- **Receding-horizon decisions:** The controller optimizes several future actions but commits only to the first. Replanning lets later decisions absorb new observations and updated forecasts.
- **Uncertainty enters the objective:** Penalizing exposure or trade size by horizon-dependent forecast uncertainty can reduce risk when predictions become less reliable. This is a design choice, not a guarantee of bounded drawdown or calibrated tail risk.
- **Constraints are explicit:** Position, leverage, turnover, cash, sector, and transaction-size constraints can be represented in the optimization problem when the chosen solver and formulation support them.
- **Prediction and control have a narrow interface:** A price path and uncertainty estimate can connect different forecasting models to different controllers. Practical interchangeability still requires compatible horizons, units, timing, and uncertainty semantics.
- **Evaluation must include execution frictions:** A frictionless controller can trade more frequently or aggressively than a deployable system. Transaction costs, slippage, liquidity, market impact, and delayed execution belong in both the objective and the backtest.
- **Forecast uncertainty is not portfolio risk:** Per-asset predictive variance does not automatically represent cross-asset loss dependence, liquidity shocks, parameter uncertainty, or maximum drawdown. Portfolio-level constraints may still be necessary.

## Important Papers

- [[papers/cast-a-cross-asset-state-space-trading-system-for-drawdown-control-in-stock-markets|CAST: A Cross-Asset State-Space Trading System for Drawdown Control in Stock Markets]]: combines online cross-asset Kalman forecasts with an uncertainty-weighted linear-program controller and evaluates drawdown over four equity baskets.
- Mayne et al. (2000), "Constrained model predictive control: Stability and optimality": establishes core constrained MPC principles outside the trading application.
- Borrelli, Bemporad, and Morari (2017), *Predictive Control for Linear and Hybrid Systems*: a general reference for finite-horizon optimization and receding-horizon control cited by CAST.

## Related Concepts

- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: supplies predictive distributions or uncertainty summaries that a controller may consume.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: motivates repeated forecasting and adaptation rather than frozen deployment under changing market dynamics.
