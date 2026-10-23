---
title: "A Tale of Two Time Scales: Determining Integrated Volatility With Noisy High-Frequency Data"
type: paper
authors:
  - Lan Zhang
  - Per A. Mykland
  - Yacine Aït-Sahalia
year: 2005
doi: 10.1198/016214505000000169
tags:
  - high-frequency-finance
  - integrated-volatility
  - market-microstructure-noise
  - realized-volatility
  - subsampling
---

## TL;DR

Naive [[concepts/realized-volatility|Realized Volatility]] becomes increasingly biased when high-frequency prices contain [[concepts/market-microstructure-noise|Market Microstructure Noise]]. The paper develops [[concepts/two-scale-realized-volatility|Two-Scale Realized Volatility]]: average realized variances over sparse subgrids, then use the full observation grid to estimate and remove the remaining noise bias. Under the paper's additive iid-noise model, the estimator is consistent, converges at rate $n^{-1/6}$ with an optimal number of subgrids of order $n^{2/3}$, and substantially reduces simulation RMSE relative to naive or sparsely sampled alternatives.

## Research Question

How can integrated volatility be estimated nonparametrically from all available high-frequency price observations when transaction prices are contaminated by market microstructure noise?

## Motivation

Without observation noise, increasingly fine sums of squared returns converge to the latent price process's integrated variance. In transaction data, however, realized variance often rises or becomes unstable at the highest sampling frequencies. The common response is to sample every 5 to 30 minutes, discarding most observations without explicitly estimating the contamination. The paper seeks an estimator that retains the full dataset while separating latent price variation from observation noise.

## Contributions

- Models observed log prices as a latent Itô process plus additive, mean-zero iid observation noise and derives the resulting bias and variance of realized volatility.
- Shows that full-grid realized volatility is dominated by noise: its leading term is $2nE\epsilon^2$, so finer sampling worsens rather than resolves the problem.
- Derives an MSE-optimal sparse sampling frequency for settings where the noise becomes asymptotically small.
- Introduces multiple-grid subsampling and averaging, which uses all observations while reducing noise-induced bias and variance.
- Constructs a two-scale bias correction that combines the averaged sparse-grid estimator with full-grid realized volatility.
- Establishes stable asymptotic normality, extends the estimator to multiple periods, proposes asymptotic-variance estimation, and discusses consistency in the presence of jumps.

## Method

The latent log price follows

$$
dX_t=\mu_tdt+\sigma_tdB_t,
$$

and is observed at discrete times with additive noise,

$$
Y_{t_i}=X_{t_i}+\epsilon_{t_i}.
$$

The target is integrated volatility, $\langle X,X\rangle_T=\int_0^T\sigma_t^2dt$. Full-grid realized volatility $[Y,Y]_T^{(all)}$ has conditional expectation $[X,X]_T^{(all)}+2nE\epsilon^2$ and therefore diverges with the number of observations when noise variance is fixed.

The paper partitions the full observation grid into $K$ nonoverlapping regular subgrids, computes realized volatility on each, and averages them:

$$
[Y,Y]_T^{(avg)}=\frac{1}{K}\sum_{k=1}^K[Y,Y]_T^{(k)}.
$$

If $\bar n$ is the average number of increments per subgrid, its leading noise bias is $2\bar nE\epsilon^2$. Full-grid realized volatility estimates the noise variance through $[Y,Y]_T^{(all)}/(2n)$, yielding the two-scale estimator

$$
\widehat{\langle X,X\rangle}_T
=[Y,Y]_T^{(avg)}-\frac{\bar n}{n}[Y,Y]_T^{(all)}.
$$

A finite-sample adjustment multiplies this expression by $(1-\bar n/n)^{-1}$. Balancing noise and discretization variance gives $K=cn^{2/3}$ and an $n^{-1/6}$ convergence rate. The asymptotic variance combines a noise term, $8c^{-2}(E\epsilon^2)^2$, and a discretization term, $c\eta^2T$.

## Experiments

The Monte Carlo study simulates 25,000 one-day paths from a Heston stochastic-volatility model at one-second intervals. A trading day contains 6.5 hours, and Gaussian observation noise has standard deviation $0.0005$, or 0.05% of the asset price. Five estimators are compared: full-grid realized volatility, arbitrary five-minute sparse sampling, optimally sparse sampling, averaged subgrids, and the adjusted two-scale estimator.

The asymptotic approximations closely match the simulated biases and variances. The naive estimator has RMSE about $1.17\times10^{-2}$. Five-minute sparse sampling, optimally sparse sampling, and averaged subgrids reduce RMSE to approximately $5.44\times10^{-5}$, $4.54\times10^{-5}$, and $3.62\times10^{-5}$, respectively. The adjusted two-scale estimator reaches simulated RMSE $9.4\times10^{-6}$, with essentially zero simulated bias ($2\times10^{-8}$). The largest practical gains come from using all subgrids and applying the two-scale bias correction, rather than merely fine-tuning one sparse sampling interval.

## Limitations

- The main theory assumes additive observation noise that is iid across observation times, independent of the latent price process, and constant in variance within an estimation period.
- The latent process is primarily developed as a continuous Itô process. The discussion establishes consistency for semimartingales with jumps, but the stated diffusion-based asymptotic distribution does not directly provide jump-robust inference.
- Optimal tuning and feasible variance estimation require nuisance quantities such as noise variance and integrated quarticity; the proposed spread estimator is developed for equally spaced observations with regular grid allocation.
- The empirical evidence is a Monte Carlo study under one Heston calibration and small Gaussian noise, not an application to transaction data with endogenous, dependent, or irregular microstructure effects.
- The $n^{-1/6}$ rate is slow, reflecting the cost of estimating integrated volatility nonparametrically in fixed-size noise.

## Related Concepts

- [[concepts/realized-volatility|Realized Volatility]]: the squared-return estimator and latent integrated-volatility target considered by the paper.
- [[concepts/market-microstructure-noise|Market Microstructure Noise]]: the observation error that makes full-grid realized volatility diverge.
- [[concepts/two-scale-realized-volatility|Two-Scale Realized Volatility]]: the paper's averaged-subgrid estimator with full-grid bias correction.

## Related Papers

- Zhou (1996), "High-Frequency Data and Volatility in Foreign-Exchange Rates": an earlier autocovariance-based bias correction under constant volatility.
- Andersen, Bollerslev, Diebold, and Labys (2001), "The Distribution of Exchange Rate Realized Volatility": a foundational empirical use of realized volatility.
- Barndorff-Nielsen and Shephard (2002), "Econometric Analysis of Realized Volatility and Its Use in Estimating Stochastic Volatility Models": develops realized-volatility asymptotics used in the discretization analysis.
- Aït-Sahalia, Mykland, and Zhang (2005), "How Often to Sample a Continuous-Time Process in the Presence of Market Microstructure Noise": studies optimal sampling and likelihood estimation under microstructure noise.
- Hansen and Lunde (2004), "Realized Variance and IID Market Microstructure Noise" and "An Unbiased Measure of Realized Variance": contemporaneous work on noise-robust realized variance.

Source: DOI:10.1198/016214505000000169.

[[index|Library home]]
