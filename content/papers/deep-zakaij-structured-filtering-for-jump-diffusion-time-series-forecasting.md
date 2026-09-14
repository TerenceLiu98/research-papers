---
title: "Deep ZakaiJ: Structured Filtering for Jump-Diffusion Time Series Forecasting"
type: paper
authors:
  - Yan Leng
  - Thibaut Mastrolia
  - Hao Wang
year: null
tags:
  - time-series-forecasting
  - nonlinear-filtering
  - jump-diffusion
  - uncertainty-quantification
---

## TL;DR

Deep ZakaiJ couples a grid-based latent-state filter inspired by the Zakai equation with a learned jump-diffusion decoder. It separates prior propagation, continuous-observation updates, and jump-observation updates, then forecasts using prior propagation alone. Across one synthetic and two real datasets, it reports stronger distributional forecasts than the evaluated baselines, with competitive point accuracy. Its first-order accuracy result concerns an idealized filtering operator; real-data latent-regime interpretations remain qualitative.

## Research Question

Can explicitly updating a probability distribution over hidden regimes improve forecasting and uncertainty quantification for partially observed time series with abrupt jumps?

## Motivation

Continuous fluctuations and discontinuous shocks can depend on an unobserved state. Classical jump-diffusion models impose restrictive parametric dynamics, while neural forecasting models may represent history without an explicit nonlinear Bayesian belief update. The paper uses [[concepts/zakai-filtering|Zakai Filtering]] to connect latent-state inference directly to a structured predictive distribution over future increments.

## Contributions

- A differentiable encoder with a symmetric splitting sequence for prior propagation, diffusion innovation, and jump innovation.
- A [[concepts/jump-diffusion-models|Jump-Diffusion Models]] decoder whose drift, volatility, jump intensity, and jump sizes depend on the current observation and filtered latent belief.
- A reported local approximation bound and first-order global bound for the idealized split filter under stability and bounded-intensity assumptions.
- Forecasting experiments and synthetic ablations examining filtering, decoder specification, splitting components, and latent-grid resolution.

## Method

The model maintains a density over a fixed latent grid, normalizes it to a posterior $\pi_k$, and extracts a summary $\beta_k=\int\varphi(\theta)\pi_k(d\theta)$. With $h=\Delta t/2$, Equation (4) defines the encoder update as

$$
q_{k+1}\approx\mathcal C_h\circ\mathcal B_h\circ\mathcal A_{\Delta t}\circ\mathcal B_h\circ\mathcal C_h(q_k).
$$

The A-step propagates the latent prior using a nonnegative, mass-preserving transition kernel, adds a learned zero-mass residual correction, clips negative values, and normalizes. The B-step reweights the belief using a local Gaussian increment likelihood. The C-step reweights it using a mixture of no-jump and one-jump hypotheses, integrating over jump marks. The latter approximation assumes short intervals with a small probability of multiple large jumps.

The decoder conditions on time, the current observation, the belief summary, and a candidate latent state. Volatility and intensity are constrained to be positive. Small jumps are absorbed into effective continuous coefficients through a Gaussian moment approximation, while large jumps are modeled explicitly. Joint training maximizes expected stepwise log-likelihood over context and forecast segments, with a KL penalty between posterior and propagated prior during the context segment (Section 4.2).

At forecast time, future observations are unavailable: the belief evolves only through the A-step. The decoder samples increments to generate an ensemble of 100 trajectories per window. The real-data decoder uses hidden width 32, two transformer layers, and two attention heads; the main synthetic experiment uses a correctly specified linear decoder and a 401-point latent grid on $[-2,2]$ (Appendix B.2).

Theorems 5 and Corollary 7 report local error $O(\Delta t^2+(\Lambda_\varepsilon\Delta t)^2)$ and fixed-horizon global error $O((1+\Lambda_\varepsilon^2)\Delta t)$, where $\Lambda_\varepsilon$ bounds the large-jump intensity. These claims require filtering stability and regularity; normalization also requires mass bounded away from zero. Finite-grid and learned-residual effects are evaluated empirically rather than included in the stated idealized bound.

## Experiments

All datasets use 300 context steps, a 100-step forecast horizon, stride 100, and chronological splits. The synthetic series has 20,000 steps, a mean-reverting scalar latent process, and latent-dependent observation drift and jump intensity; it uses a 60/20/20 split. Real data comprise XAU/USD 10-minute closing prices from January-November 2025 and NOAA/NDBC station 44027 wave heights from 2023-2025. Both real series are trained and evaluated in relative log-space, $X_t=\log S_t-\log S_0$, so their reported errors are not in dollars or meters.

Selected results from Tables 1-2 are reproduced below. Lower MAE, RMSE, and CRPS are better; higher LogLik is better; Cov90 is closest to its target at 90%.

| Dataset | Model | MAE | RMSE | CRPS | LogLik | Cov90 (%) |
| --- | --- | --- | --- | --- | --- | --- |
| Synthetic | Deep ZakaiJ | 0.0846 | 0.1344 | 0.0653 | 0.78 | 89.0 |
| Synthetic | NeuralMJD | 0.0921 | 0.1560 | 0.0803 | -5.45 | 65.1 |
| XAU/USD | Deep ZakaiJ | 0.0056 | 0.0081 | 0.0041 | 3.65 | 92.9 |
| XAU/USD | NeuralMJD | 0.0061 | 0.0089 | 0.0045 | 3.37 | 79.8 |
| NDBC | Deep ZakaiJ | 0.3069 | 0.4084 | 0.2175 | -0.38 | 85.3 |
| NDBC | Chronos | 0.3023 | 0.4142 | 0.2424 | -37.54 | 58.8 |

Baselines also include DLinear, LSTM, DeepAR, PatchTST, LatentSDE, LatentODE, NCDSSM, and NJ-ODE, with further models in Appendix B.3. Deep ZakaiJ leads the main synthetic table on point errors, CRPS, and LogLik. On XAU/USD it leads Tables 2 and 4 on point errors, CRPS, LogLik, and closeness to nominal coverage. On NDBC, Chronos and NeuralMJD have lower MAE, but Deep ZakaiJ has lower RMSE and better CRPS and LogLik. GRU-ODE's NDBC coverage of 87.3% is closer to 90% than Deep ZakaiJ's 85.3%, so calibration leadership is not universal. The numerical table supports a narrower point-error comparison than the main-text claim that Chronos has lower point errors generally.

Synthetic ablations (Table 5) raise CRPS from 0.0653 to 0.0795 when removing the encoder and to 0.0764 when replacing its belief update with a GRU. A neural decoder yields CRPS 0.0704, compared with 0.0653 for the correctly specified linear decoder. Removing individual splitting steps lowers coverage to 86.1-86.8%, with smaller changes in point error. Grid sizes 51, 101, and 201 remain competitive with the default 401 points. These are controlled synthetic findings, not real-data component ablations.

## Limitations

- The implementation assumes univariate observations, uses a fixed uniform latent grid, and conditions only on the target's history. High-dimensional latent states, multivariate observations, adaptive support, and exogenous covariates remain extensions (Appendix C).
- The convergence result does not establish posterior accuracy for arbitrary learned coefficients or decoder misspecification, nor does it guarantee calibrated forecasts. Empirical Cov90 does not establish [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]].
- Evaluation covers one synthetic process and two real series. Appendix B.2 specifies seed 42; no variability across training seeds or significance tests accompanies the reported performance differences. Monte Carlo predictive variability does not measure uncertainty in those model comparisons.
- Synthetic latent recovery benefits from a known data-generating mechanism. Real-data regime plots provide qualitative interpretation without independently observed regime labels.
- The supplied manuscript promises code release upon acceptance and describes restrictions on redistributing XAU/USD data. It supplies no confirmed publication year, venue acceptance, DOI, or identifier for this paper; the NeurIPS checklist alone does not establish publication status.

## Related Concepts

- [[concepts/zakai-filtering|Zakai Filtering]]
- [[concepts/jump-diffusion-models|Jump-Diffusion Models]]
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]

## Related Papers

The following relationships are described in the supplied manuscript's related work and references:

- Ceci and Colaneri (2014), "Nonlinear filtering for jump diffusion observations: Zakai equation, existence and uniqueness": filtering foundations, reference [55].
- Bensoussan, Glowinski, and Rascanu (1990), "Approximation of the Zakai equation by the splitting up method": numerical splitting foundation, reference [46].
- Herrera, Krach, and Teichmann (2021), "Neural jump ordinary differential equations: Consistent continuous-time prediction and filtering": implicit filtering through observation-triggered updates, reference [41].
- Gao, Yan, Leng, and Liao (2025), "Neural MJD: Neural non-stationary Merton jump diffusion for time series prediction": neural jump-diffusion comparator, reference [43].
- Ansari, Heng, Lim, and Soh (2023), "Neural continuous-discrete state space models for irregularly-sampled time series": continuous-discrete filtering comparator, reference [14].

[[index|Library home]]
