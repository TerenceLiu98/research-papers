---
title: "2T-POT Hawkes model for left- and right-tail conditional quantile forecasts of financial log-returns: out-of-sample comparison of conditional EVT models"
type: paper
authors:
  - Matthew F. Tomlinson
  - David Greenwood
  - "Marcin Mucha-Kruczy\u0144ski"
year: 2022
source_date: "2022-10-14"
source_job_id: "1f1a755b-268f-4781-8922-9d21750a9a51"
tags:
  - hawkes-processes
  - extreme-value-theory
  - financial-time-series
  - quantile-forecasting
---

## TL;DR

An improved two-tailed peaks-over-threshold (2T-POT) Hawkes model forecasts extreme losses and gains using their shared, self-exciting arrival process and separate magnitude distributions. Across six equity indices, its asymmetric version generally has fewer extreme-quantile backtest rejections than GARCH-EVT when results are aggregated across thresholds. The advantage is not uniform: a well-chosen GARCH-EVT threshold wins some left-tail coverage comparisons, and GARCH-EVT often performs better on right-tail conditional violation expectations. Fitted excitation asymmetries support a temporal leverage effect within these data: losses have a larger and more immediate association with subsequent extremes.

## Research Question

Do asymmetric, self-exciting arrivals of extreme returns provide better one-day tail forecasts than conditional-volatility dynamics, and do loss/gain excitation asymmetries persist across markets and exceedance thresholds?

## Motivation

Extreme returns cluster in time, and their magnitudes tend to increase when extremes are frequent. GARCH-EVT models these dynamics through volatility estimated from the full return series. [[concepts/peaks-over-threshold-hawkes-processes|Peaks-Over-Threshold Hawkes Processes]] instead let past extremes determine future extreme-event intensity. Modeling both tails matters because large gains and losses cluster together, while their effects on later activity need not have the same strength or duration (Section I).

## Contributions

- Reparameterizes the exceedance model using expected intensity instead of background intensity, and fixes the expected rate from the training-sample threshold frequency to remove one fitted parameter.
- Adds a bulk distribution whose location and scale depend on Hawkes exceedance probabilities, completing the return distribution when a forecast quantile falls between the thresholds.
- Studies six equity indices at 20 mirrored threshold levels, extending an earlier single-index, single-threshold analysis.
- Compares left- and right-tail quantiles and conditional violation expectations across 60 coverage levels, with an explicitly symmetric Hawkes comparator to assess the value of asymmetry.

## Method

### Shared Arrivals, Asymmetric Excitation

For daily log-return $X_t$, thresholds are the training-sample $a_u$ and $1-a_u$ quantiles. An exceedance from either tail enters one common arrival process. In simplified notation, its intensity is

$$
\lambda(t)=\mu+\gamma_-\chi_-(t)+\gamma_+\chi_+(t),
\qquad
\chi_s(t)=\sum_{k:t_{s,k}<t}\beta_s e^{-\beta_s(t-t_{s,k})}\kappa_s(M_{s,k}\mid t_{s,k}).
$$

Here $s\in\{-,+\}$ identifies the source tail, $M_{s,k}$ is excess magnitude, and the mark function $\kappa_s$ has unit expectation and can assign larger impacts to larger extremes. The normalized kernels make $\gamma_s$ the expected number of directly triggered events per source event; $1/\beta_s$ controls their time scale. The aggregate branching ratio $(\gamma_-+\gamma_+)/2$ must be below one (Section II.B.1).

Each arrival is assigned to either tail with probability one half. Consequently,

$$
p_{-,t}=p_{+,t}=\tfrac12\left[1-\exp\left(-\int_{t-1}^{t}\lambda(v)\,dv\right)\right].
$$

This enforces mutually exclusive daily tail outcomes and nonnegative bulk probability. Equal tail probabilities do not imply equal triggering strength, decay, or excess distributions. Excess magnitudes follow separate generalized Pareto distributions, with scales that can increase with endogenous intensity. Constraining all paired parameters to equality gives the symmetric $H_1$ model; the asymmetric version is $H_2$.

### Full Distribution and Estimation

The bulk distribution is matched to the tail probabilities at both thresholds. Its conditional location and scale therefore follow the Hawkes process. A Student-t bulk is selected over a normal bulk using likelihood comparisons. This supplies quantile forecasts even when the requested tail coverage $a_q$ exceeds the current threshold-exceedance probability, so the target quantile lies inside the bulk (Section II.B.2).

The exceedance likelihood combines event arrivals and generalized Pareto magnitudes and is optimized with SLSQP. Remaining bulk parameters are fitted afterward. Expected intensity is constrained to twice the per-tail threshold frequency per trading day; Appendix B reports only one significant in-sample fit penalty among 120 comparisons. Reproducing the earlier single calibration with the reparameterization reduced optimization time by 53%; imposing the rate constraint reduced total optimization time for this study by another reported 12%. These timings refer to different comparisons, not an additive speedup (Section II.B.1; Appendix B).

### Forecast Targets and Comparators

For a conditional return CDF $F_t$, the left and right quantiles are $F_t^{-1}(a_q)$ and $F_t^{-1}(1-a_q)$. Conditional violation expectations are the expected return below or above these respective quantiles. Thus, left-tail VaR is expressed as a return quantile, and left-tail expected shortfall as a tail-conditional return, rather than converting them into positive loss amounts.

The main comparison is Student-t-bulk asymmetric Hawkes $H_2^{\mathcal S}(a_u)$ versus GJR-GARCH-EVT $G_1^{\mathcal S}(a_u)$, which attaches separate Pareto tails to standardized innovations. Other baselines are symmetric Hawkes, normal GARCH, Student-t GARCH, and Student-t GJR-GARCH without EVT tails (Sections II.C and IV).

## Experiments

### Data and Protocol

The six Stooq series are S&P 500, Dow Jones Industrial Average, DAX 30, CAC 40, Nikkei 225, and Hang Seng. The stated calibration window is 1975-01-01 to 2015-01-01, and the forecast window is 2015-01-01 to 2022-09-10. Training samples contain 9,461-10,092 returns; forecast samples contain 1,814-1,962, depending on the index (Table I).

Threshold levels range from 1.25% to 25% in 1.25 percentage-point steps. One-step forecasts cover 0.25%-15% tail probabilities in 0.25 percentage-point steps. Quantile tests assess unconditional coverage (UC), coverage plus lag-one violation independence (CC), and dynamic dependence with four violation lags and the current forecast quantile (DQ4). The zero mean discrepancy (ZMD) test evaluates conditional violation expectations using a dependent circular block bootstrap. Rejection occurs at $p<0.05$ (Section IV).

### Reported Results

The following are rejection proportions from Table II, aggregated across all six indices and threshold levels $a_u\in\{0.05,0.10,0.20\}$. Lower is better under the paper's criterion. These are neither forecast-error percentages nor pairwise significance tests between models.

| Test | Tail coverage band | Left: Hawkes | Left: GARCH-EVT | Right: Hawkes | Right: GARCH-EVT |
| --- | --- | --- | --- | --- | --- |
| UC | 0%-2.5% | 0.35 | 0.48 | 0.36 | 0.47 |
| UC | 2.5%-5% | 0.38 | 0.40 | 0.47 | 0.66 |
| CC | 0%-2.5% | 0.37 | 0.44 | 0.31 | 0.38 |
| CC | 2.5%-5% | 0.43 | 0.42 | 0.37 | 0.53 |
| DQ4 | 0%-2.5% | 0.57 | 0.58 | 0.32 | 0.28 |
| DQ4 | 2.5%-5% | 0.69 | 0.72 | 0.45 | 0.43 |
| ZMD | 0%-2.5% | 0.13 | 0.12 | 0.24 | 0.13 |
| ZMD | 2.5%-5% | 0.27 | 0.46 | 0.29 | 0.24 |

The asymmetric Hawkes model generally improves on symmetric Hawkes, especially for extreme left-tail forecasts. Its coverage results are more favorable than GARCH-EVT after threshold aggregation, but the disaggregated results matter: in the lowest left-tail band, GARCH-EVT at $a_u=0.20$ has UC rejection proportion 0.05, versus 0.28 for asymmetric Hawkes at $a_u=0.05$ (Table III).

Estimated loss/gain branching and decay asymmetries are broadly stable across indices and thresholds, supporting [[concepts/temporal-leverage-effect|Temporal Leverage Effect]]. The earlier study's ratios, 2.2 for branching and 4.6 for decay, are reference values, not pooled estimates from this study. Hang Seng is a notable exception: its branching asymmetry approaches equality around $a_u=0.10$. No sharp parameter transition is found over the tested threshold range (Section III.B; Figure 3).

## Limitations

- **Restricted empirical scope:** Evidence concerns six large-cap equity indices and one temporal split. It does not establish universality across assets, sampling frequencies, or market regimes, nor identify an economic causal mechanism.
- **Substantial remaining miscalibration:** Even the better models have frequent rejections. DQ4 performance worsens for Hawkes at coverage levels above 5%; GARCH-EVT has fewer right-tail ZMD rejections in five of six coverage bands (Section IV.C).
- **Threshold dependence:** Aggregated rankings differ from rankings at individual thresholds. Tuning patterns observed in the forecast period do not themselves establish performance of a separately validated threshold-selection rule.
- **Sparse extreme violations:** Some right-tail ZMD statistics are undefined at the lowest coverage levels because too few violations are available for the bootstrap. Model-specific violation sets also complicate comparison of this test with full-sample coverage tests.
- **Model restrictions:** The evaluated specification uses equal tail-arrival probabilities, exponential decay, fixed fitted parameters, and a bulk distribution driven by extremes. Regime switching, exogenous predictors, and multi-step aggregate forecasts remain proposed extensions (Section V).

## Related Concepts

- [[concepts/peaks-over-threshold-hawkes-processes|Peaks-Over-Threshold Hawkes Processes]]: joint modeling of extreme-event timing and magnitudes.
- [[concepts/temporal-leverage-effect|Temporal Leverage Effect]]: separates asymmetry in excitation strength from asymmetry in decay time.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a related library approach to flexible kernels and uncertainty; this paper uses parametric maximum likelihood.

## Related Papers

- Tomlinson, Greenwood, and Mucha-Kruczynski (2021), "Asymmetric excitation of left- and right-tail extreme events probed using a Hawkes model: Application to financial returns," *Physical Review E* 104, 024112: the preceding 2T-POT model and single-index asymmetry study (reference [34]).
- McNeil and Frey (2000), "Estimation of tail-related risk measures for heteroscedastic financial time series: an extreme value approach," *Journal of Empirical Finance* 7, 271: the GARCH-EVT foundation (reference [4]).
- Chavez-Demoulin, Davison, and McNeil (2005), "Estimating value-at-risk: a point process approach," *Quantitative Finance* 5, 227: an early financial POT point-process approach (reference [27]).
- [[papers/dynamic-hawkes-processes-for-discovering-time-evolving-communities-states-behind-diffusion-processes|Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes]]: a related library paper on changing responsiveness and excitation time scales, not an evaluated comparator here.

Source scope: supplied manuscript dated 14 October 2022, including its supplementary material. The supplied text does not give a stable identifier for this manuscript; identifiers belonging to cited papers are not assigned to it.

[[index|Library home]]
