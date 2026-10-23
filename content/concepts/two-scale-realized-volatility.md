---
title: Two-Scale Realized Volatility
type: concept
aliases:
  - Two-Scales Estimator
  - TSRV
tags:
  - financial-econometrics
  - high-frequency-finance
  - multiscale-estimation
  - volatility-estimation
---

## Overview

Two-scale realized volatility is a noise-robust estimator of latent integrated volatility from high-frequency prices. It averages [[concepts/realized-volatility|Realized Volatility]] across sparse subgrids and subtracts a bias estimate derived from the full observation grid. The two scales serve different roles: slow subgrids control [[concepts/market-microstructure-noise|Market Microstructure Noise]], while the fast grid estimates its leading contribution.

## Key Ideas

- **Use all observations through subgrids:** Partition $n+1$ observations into $K$ interlaced, nonoverlapping grids. Each grid samples sparsely, but averaging their realized variances recovers information that a single sparse grid discards.
- **Estimate and remove noise bias:** If $\bar n$ is the average number of increments per subgrid, the averaged statistic has leading bias $2\bar nE\epsilon^2$. Since full-grid realized variance divided by $2n$ estimates $E\epsilon^2$, the correction is

$$
\widehat{IV}_T=[Y,Y]_T^{(avg)}-\frac{\bar n}{n}[Y,Y]_T^{(all)}.
$$

- **Balance two variance sources:** More subgrids reduce noise variation but make each subgrid coarser, increasing discretization variation. Under additive iid noise and a continuous Itô latent price, balancing these terms gives $K=O(n^{2/3})$.
- **Convergence is slower than noiseless realized variance:** With optimal scaling, estimation error is $O_p(n^{-1/6})$. The asymptotic distribution is mixed normal because the discretization component depends on the latent volatility path.
- **Finite-sample rescaling:** Multiplying by $(1-\bar n/n)^{-1}$ gives a higher-order bias adjustment without changing the first-order asymptotic law.
- **Scope matters:** The foundational result assumes noise independent of the latent process and iid across observations. Consistency extends to total quadratic variation with jumps, but diffusion-based inference and optimal tuning require additional work when jumps or dependent noise are present.

## Important Papers

- [[papers/a-tale-of-two-time-scales-determining-integrated-volatility-with-noisy-high-frequency-data|A Tale of Two Time Scales]]: introduces the two-scale estimator, derives its asymptotic distribution and tuning rate, and validates it in Heston-model simulations.
- Zhou (1996), "High-Frequency Data and Volatility in Foreign-Exchange Rates": an earlier noise-bias correction based on return autocovariances.
- Hansen and Lunde (2004), "An Unbiased Measure of Realized Variance": contemporaneous work on correcting realized variance under microstructure noise.

## Related Concepts

- [[concepts/realized-volatility|Realized Volatility]]: supplies both the sparse-grid estimates and the full-grid bias estimate.
- [[concepts/market-microstructure-noise|Market Microstructure Noise]]: motivates the multiscale construction and determines one component of its asymptotic variance.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: determines the integrated variance target and the discretization component of uncertainty.
