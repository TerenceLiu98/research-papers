---
title: "Neural MJD: Neural Non-Stationary Merton Jump Diffusion for Time Series Prediction"
type: paper
authors:
  - Yuanpei Gao
  - Yan Leng
  - Qi Yan
  - Renjie Liao
year: null
tags:
  - time-series-forecasting
  - jump-diffusion
  - stochastic-processes
  - probabilistic-forecasting
---

## TL;DR

Neural MJD predicts time-varying Merton jump-diffusion parameters from historical observations and context, then simulates future values with no further neural evaluations. A truncated mixture likelihood enables training without labeled jumps, and an Euler-Maruyama solver with periodic restarts reduces forecast variance. Results favor Neural MJD over the main neural and statistical baselines, especially on stocks, but additional deterministic baselines in the appendix achieve lower stock MAE and MSE.

## Research Question

Can a neural parameterization of continuous fluctuations and discrete jumps provide accurate, efficient forecasts for non-stationary time series without observed jump labels?

## Motivation

Classical [[concepts/jump-diffusion-models|Jump-Diffusion Models]] represent abrupt changes explicitly but often impose stationary parameters and require separate calibration. Neural sequence models can share information across series and contextual features, but do not necessarily specify a stochastic mechanism for jumps. Here, non-stationarity means time-varying process parameters, rather than only input normalization or adaptation to distribution shift.

## Contributions

- A history- and context-conditioned network that predicts drift, diffusion scale, jump intensity, and log-normal jump-size parameters across the forecast horizon in one forward pass.
- A piecewise-constant parameter approximation and finite jump-count mixture for tractable likelihood training, with a reported truncation-error bound (Theorem 4.1).
- An Euler-Maruyama restart strategy using analytical conditional expectations, with a reported weak-error bound and empirical variance reduction (Proposition 4.2).
- Synthetic, business-spending, and stock-price experiments, including training and solver ablations and repeated-sampling runtime comparisons.

## Method

Given history and optional context $\mathcal C$, a shared network predicts $\mu_t,\sigma_t,\lambda_t,\nu_t,\gamma_t$. The positive-valued process combines multiplicative Brownian noise with Poisson jumps whose multipliers satisfy $\log Y_t\sim\mathcal N(\nu_t,\gamma_t^2)$. The drift subtracts $\lambda_t k_t$, where $k_t=\exp(\nu_t+\gamma_t^2/2)-1$, to compensate for the expected jump contribution (Section 4.1). Its conditional mean is

$$
\mathbb E[S_T\mid\mathcal C]=S_0\exp\left(\int_0^T\mu_t\,dt\right).
$$

Parameters are held constant within each observation interval. Conditional on the number of jumps, log-values have a Gaussian density, yielding a Poisson-weighted Gaussian mixture. Training truncates the sum at five jumps per interval. Theorem 4.1 reports super-exponential truncation-error decay, stated as $O(\kappa^{-\kappa})$; this is a reported asymptotic result, not a uniform accuracy guarantee for a fixed cap under arbitrary jump intensities.

The training objective substitutes the model's conditional mean for the previous ground-truth state in the stepwise likelihood and adds squared-error regularization on the mean, with weight 1.0. This modified objective avoids teacher forcing and can be evaluated in parallel over forecast steps (Section 4.2; Appendix D.1). The experiments use transformer backbones, with Graphormer-inspired context encoding for graph data.

At inference, parameters are computed once, followed by arithmetic simulation of drift, Brownian noise, and compound Poisson increments at arbitrary temporal resolution. The restarted solver periodically replaces the simulated state with an analytical expectation. Proposition 4.2 reports the same $O(1/M)$ weak-error order as standard Euler-Maruyama, but replaces a horizon-dependent exponential factor with one depending on time since the last restart. Appendix C.2 acknowledges that restarting affects path stochasticity; the variance reduction should not be interpreted as evidence that the original process's full trajectory distribution is preserved.

## Experiments

The synthetic dataset contains 10,000 scalar MJD paths with 100 simulation steps, using 10 input frames to predict 10 and a 60/20/20 split. SafeGraph&Advan uses Texas business spending, static attributes, dynamic features, and ten-neighbor ego graphs; it trains on January-December 2023, validates on January 2024, and tests on February-April 2024. S&P 500 uses daily prices with a fully connected company graph, training on January-December 2016, validating on January 2017, and testing on February-April 2017. Both real datasets use 14 input days to predict seven. Normalization uses training-set statistics (Appendix D.2).

Stochastic models produce ten samples. The paper distinguishes mean metrics, oracle Best-of-10 metrics, and metrics for the sampled outcome selected by model likelihood. Its "probabilistic" metrics are errors of that selected outcome, rather than proper distributional scores or coverage measurements. Selected mean MAEs from Tables 1-3 are:

| Dataset | Neural MJD | Neural BS | Flow Matching |
| --- | ---: | ---: | ---: |
| Synthetic | 0.09 | 0.15 | Not reported |
| SafeGraph&Advan | 54.1 | 56.4 | 54.5 |
| S&P 500 | 15.4 | 31.6 | 34.9 |

On business spending, Neural MJD's Best-of-10 minMAE is 42.3 versus 47.8 for Flow Matching, but its mean MSE of 41,800 is slightly worse than Neural BS's 41,700. On stocks, Neural MJD reports mean MSE 1,360, Best-of-10 minMAE 4.3, and likelihood-selected MAE 13.6. Appendix Table 6 reports lower deterministic MAE/MSE for N-HiTS (14.1/933), TCN (14.4/973), and N-BEATS (15.3/1,200), qualifying the main-text claim of universal superiority. Appendix D.3 also inconsistently describes default training settings while its table caption refers to tuned steps.

Stock $R^2$ uses an unusual adjustment: Appendix D.2 sets $p=(k-1)(n-1)/k$ with $k=70$ in the adjusted-$R^2$ formula, equivalent to $1-70(1-R^2_{\mathrm{reg}})$. Reported stock scores therefore should not be read as ordinary $R^2$.

With 10% of business training data and the full validation set, mean MAE is 66.7 for the full method, 101.5 with teacher forcing, and 85.6 with standard Euler-Maruyama (Table 4). These numbers use a different protocol from the main test table. Table 5 reports one-/ten-run inference times of 166.8/179.2 ms for Neural MJD versus 275.4/2,696.3 ms for Flow Matching, illustrating the benefit of reusing predicted process parameters across samples.

## Limitations

- Smooth series with few or no jumps can leave the jump component poorly estimated or unused, and simpler continuous models can outperform it (Appendix D.4).
- The formulation assumes positive states and log-normal multiplicative jumps; business spending is clipped to at least 0.01. Contextual graph encoding does not amount to modeling a full correlated multivariate noise process; Appendix A explicitly excludes cross-variable noise correlations.
- Restarts trade trajectory variability for forecast stability. The supplied Algorithm 2 restarts in log-space using an expected log-state, while prose points to the state expectation in Equation (13). Those quantities are not interchangeable, so the exact restart convention is ambiguous in the supplied text.
- Oracle Best-of-10 performance uses the observed target to select a sample and is not an attainable forecast-selection rule. Repeated inference samples do not establish statistical significance across training runs; the checklist substitutes these metrics for conventional error bars.
- Evidence covers one synthetic generator and two application datasets, with short real-data forecast horizons. Proprietary business data restrict independent reproduction. Predictive accuracy alone does not establish calibrated uncertainty or recovery of true physical parameters.
- The supplied Markdown does not establish this paper's publication year, acceptance, DOI, or arXiv identifier. Its NeurIPS checklist is not publication confirmation. The abstract supplies a code URL, while the checklist still promises release upon acceptance; availability was not independently checked.

## Related Concepts

- [[concepts/jump-diffusion-models|Jump-Diffusion Models]]: explicit continuous noise and abrupt jumps, extended here with neural time-varying parameters.

## Related Papers

- Merton (1976), "Option pricing when underlying stock returns are discontinuous": the classical model extended here, reference [3].
- Jia and Benson (2019), "Neural jump stochastic differential equations", and Zhang et al. (2024), "Neural jump-diffusion temporal point processes": event-modeling precedents discussed in Section 2, references [63-64].
- Herrera, Krach, and Teichmann (2021), "Neural jump ordinary differential equations: Consistent continuous-time prediction and filtering": NJ-ODE baseline, reference [85].
- [[papers/deep-zakaij-structured-filtering-for-jump-diffusion-time-series-forecasting|Deep ZakaiJ: Structured Filtering for Jump-Diffusion Time Series Forecasting]]: the existing Wiki note records Neural MJD as a comparator. Deep ZakaiJ adds an explicit latent-state filtering distribution; this is a library connection, not a citation in the supplied Neural MJD manuscript.

Code URL supplied by the paper: [DSL-Lab/neural-MJD](https://github.com/DSL-Lab/neural-MJD).

[[index|Library home]]
