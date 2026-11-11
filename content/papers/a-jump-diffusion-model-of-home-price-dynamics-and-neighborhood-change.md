---
title: A Jump-Diffusion Model of Home Price Dynamics and Neighborhood Change
type: paper
authors:
  - Ashley Peake
  - Adam Gilbert-Diamond
  - A. E. Hosoi
year: 2026
tags:
  - housing-markets
  - jump-diffusion
  - neighborhood-change
  - optimal-transport
---

## TL;DR

A neighborhood-specific, time-varying jump-diffusion model connects individual property appreciation and shocks to the full distribution of home values. Fitting Boston assessments from 2004–2025 yields internally consistent reconstructions and geographically clustered appreciation/jump regimes; the study does not establish future forecasting performance or causal economic drivers.

## Research Question

How can individual home-price fluctuations explain changing neighborhood price distributions and city-wide spatial heterogeneity?

## Motivation

Hedonic regressions describe prices conditional on property attributes, while repeat-sales indices summarize typical appreciation over broad areas. Neither directly describes how entire neighborhood distributions evolve through steady appreciation and discrete shocks. The paper extends housing jump-diffusion models with parameters varying by both neighborhood and time.

## Contributions

- A parcel-level geometric jump-diffusion and its population-level Fokker–Planck partial integro-differential equation (PIDE).
- Analytical mean and density solutions separating continuous appreciation from jumps.
- Pairwise Wasserstein-2 comparisons of neighborhood log-price distributions.
- A Boston case study reconstructing assessment distributions and identifying three spatially clustered parameter regimes.

## Method

For inflation-adjusted property value $Y_t^{(n)}$, define $X_t^{(n)}=\log Y_t^{(n)}$. The model is

$$
dX_t^{(n)}=r_n(t)dt+\sigma_n(t)dW_t^{(n)}+G_t^{(n)}dN_t^{(n)},
$$

where the Poisson intensity is $\lambda_n(t)$ and Gaussian log-jumps have mean $m_n(t)$ and standard deviation $s_n(t)$. The original value-space drift is $a_n=r_n+\sigma_n^2/2$. These are [[concepts/jump-diffusion-models|Jump-Diffusion Models]] with externally specified time-varying coefficients.

The log-price density obeys (Section 3.3)

$$
\partial_t\rho_n=-r_n\partial_x\rho_n+\frac{\sigma_n^2}{2}\partial_{xx}\rho_n+\lambda_n(\rho_n*g_n-\rho_n).
$$

Its solution convolves the initial density with a translated Gaussian kernel and a compound-Poisson jump kernel. Mean property value satisfies

$$
\frac{d\mu_n}{dt}=\mu_n\left[r_n+\frac{\sigma_n^2}{2}+\lambda_n\left(e^{m_n+s_n^2/2}-1\right)\right].
$$

Maximum likelihood fits a Poisson-weighted Gaussian mixture to parcel log-value changes, using BFGS and parameters constant within each reassessment interval. Renovation/rebuild records help initialize estimation; they do not directly label every inferred jump. Cubic splines smooth parameters for mean-value reconstruction, while density reconstruction retains interval-wise constants.

City-wide heterogeneity is summarized by pairwise Wasserstein-2 distances between **log-price** distributions, computed from squared differences of quantile functions (Equation 11). This [[concepts/optimal-transport|Optimal Transport]] comparison captures distributional differences beyond mean prices. The signed quantity $\lambda m$ denotes expected jump contribution to log appreciation, rather than a general variance measure.

## Experiments

**Data.** Boston residential property assessments at full reassessment years 2004, 2007, 2010, 2013, 2016, 2021, and 2025 provide parcel-level trajectories. Planning districts smaller than 0.5 square miles are merged with adjacent neighborhoods, producing 16 neighborhoods. Assessment values serve as proxies for market prices.

**Internal fit.** Quantile comparisons and multiplicity-adjusted KS tests reportedly find no significant disagreement for fitted log changes or reconstructed distributions. Bootstrap uncertainty around empirical means supports chi-squared goodness-of-fit checks, also without reported significant disagreement across the 16 neighborhoods. These are checks on reconstruction from fitted data, not held-out prediction tests; exact test statistics and adjusted p-values are not supplied in the prose.

**Synthetic behavior.** Four scenarios illustrate growth–decay cycles, steady growth, gentrification-like change, and collapse. Experiments with 20 synthetic neighborhoods vary correlations of initial mean log-price with drift and jump contribution. Faster growth in cheaper neighborhoods can initially reduce distances, then increase them after those neighborhoods overtake initially expensive areas.

**Boston patterns.** Three qualitative trajectory groups distinguish persistently weak jumps downtown, earlier jump activity followed by appreciation around the downtown periphery, and a large later jump spike toward the city edge. These groupings emerge without using geographic location in parameter fitting. Associations with the housing crash, redevelopment, and pandemic provide economic context, not causal identification (Sections 5.5–5.6).

## Limitations

- Parameters are estimated from realized changes; future prediction requires a separate model linking economic conditions to parameter dynamics.
- The case study assumes approximately fixed neighborhoods and housing stock. Substantial parcel creation or destruction would require extending the density dynamics.
- Tax assessments are estimated values observed at irregular multi-year intervals, rather than continuous transaction prices.
- Gaussian log-jumps and within-interval constant parameters constrain the fitted dynamics. Non-rejection of fitted-distribution tests does not prove the proposed mechanisms are uniquely identified.
- Gentrification and displacement interpretations remain hypotheses; resident income dynamics and causal policy analysis are proposed extensions.
- The supplied manuscript is dated November 9, 2026; no DOI, arXiv identifier, or publication venue is established by the supplied text.

## Related Concepts

- [[concepts/jump-diffusion-models|Jump-Diffusion Models]]: separates continuous appreciation from discrete shocks and connects trajectories to density evolution.
- [[concepts/optimal-transport|Optimal Transport]]: compares neighborhood log-price distributions through Wasserstein-2 distance.

## Related Papers

- Webb, Yang, and Zhang (2016), “Price Jump Risk in the US Housing Market”: housing jump-risk precedent, reference [27].
- McMillen (2008), “Changes in the distribution of house prices over time: Structural characteristics, neighborhood, or coefficients?”: distribution-sensitive hedonic precedent, reference [22].
- [[papers/neural-mjd-neural-non-stationary-merton-jump-diffusion-for-time-series-prediction|Neural MJD: Neural Non-Stationary Merton Jump Diffusion for Time Series Prediction]]: a library comparison using learned time-varying jump-diffusion parameters for forecasting; not a cited work in this manuscript.

[[index|Library home]]
