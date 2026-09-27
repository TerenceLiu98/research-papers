---
title: Financial Market Stylized Facts
type: concept
aliases:
  - Stylized Facts of Financial Returns
tags:
  - financial-markets
  - financial-time-series
  - simulation-validity
---

## Overview

Financial market stylized facts are recurring statistical patterns used to characterize market data and evaluate financial models. In agent-based simulation, reproducing these patterns tests whether interacting agents generate plausible aggregate dynamics. Such agreement is distinct from predicting a particular price path or identifying the behavioral mechanism that produced observed returns.

## Key Ideas

| Pattern | Meaning | Measurement consideration |
| --- | --- | --- |
| Fat-tailed returns | Extreme moves occur more frequently than under a Gaussian reference. | TwinMarket reports ordinary kurtosis, for which the Gaussian reference is 3, rather than excess kurtosis. |
| Leverage effect | Negative returns are associated with increased subsequent volatility. | Negative-return autocorrelation, used by TwinMarket, measures a different relationship and is only a proxy for this target. |
| Volume-return relationship | Trading activity is associated with price fluctuations. | Specify signed or absolute returns and report effect size; a p-value threshold alone cannot rank correspondence across models. |
| Volatility clustering | Periods of high or low volatility persist. | GARCH alpha plus beta summarizes persistence; values near one require care, and a sum above one does not satisfy the usual finite-variance stationarity condition. |

- **Evaluate a collection of targets.** Matching one statistic can leave other market properties poorly represented. Comparison should use the same definitions and compatible sampling windows.
- **Measure uncertainty.** Return moments and fitted volatility parameters can vary substantially across runs. Report the distribution of estimates rather than treating a single realization as a stable model property.
- **Distinguish pattern reproduction from causal validation.** Multiple mechanisms can generate similar return statistics. Component ablations support attribution within a simulator, but transfer to real investors needs independent evidence.
- **Keep forecasting separate.** A retrospective simulation conditioned on historical information can reproduce observed statistics without establishing prospective predictive performance.

## Important Papers

- Cont (2001), "Empirical properties of asset returns: Stylized facts and statistical issues": cited by TwinMarket as the background for using statistical regularities to assess market realism.
- [[papers/twinmarket-a-scalable-behavioral-and-social-simulation-for-financial-markets|TwinMarket: A Scalable Behavioral and Social Simulation for Financial Markets]] compares LLM-driven markets with real data and two rule-based baselines using kurtosis, negative-return autocorrelation, volume-return significance, and GARCH persistence. Table 4 favors TwinMarket on three numerical targets but reports the same significance threshold for all systems on the fourth.

## Related Concepts

- [[concepts/temporal-leverage-effect|Temporal Leverage Effect]]: examines differences in the strength and timing of extreme-event responses after losses versus gains.
- [[concepts/economic-world-models|Economic World Models]]: uses aggregate empirical targets alongside agent and market-level validation.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: aggregate fit alone does not establish population-level behavioral fidelity.
