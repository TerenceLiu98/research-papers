---
title: Temporal Leverage Effect
type: concept
tags:
  - financial-time-series
  - hawkes-processes
  - extreme-value-theory
---

## Overview

The temporal leverage effect is a proposed refinement of the financial leverage effect: extreme losses are associated with both stronger and more immediate subsequent extreme-event activity than extreme gains. In a two-tailed Hawkes model, branching strengths describe the total expected excitation and decay rates describe how quickly it dissipates. The temporal claim concerns the latter asymmetry as well as the former.

## Key Ideas

For a normalized exponential triggering kernel, the contribution from a source-tail event has the form

$$
g_s(\tau)=\gamma_s\beta_s e^{-\beta_s\tau}\kappa_s,
\qquad \tau>0,\quad s\in\{-,+\},\quad \mathbb E[\kappa_s]=1.
$$

- **Total excitation:** The expected integral is $\gamma_s$. A ratio $\gamma_-/\gamma_+>1$ means a loss event triggers more direct offspring on average under the fitted model.
- **Temporal concentration:** The characteristic decay time is $1/\beta_s$. A ratio $\beta_-/\beta_+>1$ makes loss-driven excitation dissipate faster and concentrate closer to the source event. Faster decay alone does not imply greater total excitation.
- **Both tails can respond:** In the common-intensity 2T-POT model, a loss or gain can raise the future probability of extremes from either tail. The asymmetry concerns the source of excitation rather than exclusively the direction of the next return.
- **Evidence is model dependent:** The 2022 six-index study finds broadly similar asymmetry across many threshold choices, with exceptions such as Hang Seng's branching ratio approaching symmetry at a 10% threshold level. These findings support a pattern in the examined equity indices, not a universal causal law.
- **Forecast comparisons are incomplete isolation tests:** The asymmetric model also permits differences in tail shapes and other parameters. Better forecasts than a fully symmetric model therefore support the asymmetric specification collectively; they do not isolate decay asymmetry as the sole source of improvement.

## Important Papers

- [[papers/2t-pot-hawkes-model-for-left-and-right-tail-conditional-quantile-forecasts-of-financial-log-returns-out-of-sample-comparison-of-conditional-evt-models|2T-POT Hawkes model for left- and right-tail conditional quantile forecasts of financial log-returns]]: tests parameter stability across six indices and 20 threshold levels and compares asymmetric and symmetric forecasts (Section III.B, Figure 3, and Section IV).
- Tomlinson, Greenwood, and Mucha-Kruczynski (2021), "Asymmetric excitation of left- and right-tail extreme events probed using a Hawkes model: Application to financial returns": the preceding S&P 500 study. As reported in the 2022 manuscript, it estimated loss/gain branching and decay ratios of $2.2\pm0.5$ and $4.6\pm1.2$, respectively, at a 2.5% mirrored threshold.

## Related Concepts

- [[concepts/peaks-over-threshold-hawkes-processes|Peaks-Over-Threshold Hawkes Processes]]: the timing-and-magnitude framework used to estimate these asymmetries.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: another treatment of excitation time scales, with changing receiving-community responsiveness rather than fixed loss/gain decay parameters.
