---
title: "Spatial Causal Inference in the Presence of Preferential Sampling to Study the Impacts of Marine Protected Areas"
type: paper
authors:
  - Dongjae Son
  - Brian J. Reich
  - Erin M. Schliep
  - Shu Yang
  - David A. Gill
year: null
tags:
  - spatial-causal-inference
  - preferential-sampling
  - causal-inference
  - spatial-statistics
  - marine-protected-areas
  - bayesian-modeling
---

## TL;DR

The paper develops a Bayesian spatial causal inference model for observational environmental data in which sampling locations are preferentially selected according to the policy and outcome processes. Policy-specific log-Gaussian Cox processes share latent spatial confounders with potential-outcome models, allowing the method to estimate local and average policy effects while accounting for informative sampling. The parameters are shown to be identifiable and the posterior weakly consistent. Simulations find lower bias, mean squared error, and better interval coverage than models that ignore preferential sampling, especially as preferential sampling strengthens. In Australian marine survey data, the method finds evidence that MPA and non-MPA sites were sampled differently and estimates a larger average effect of MPAs on fish biomass than the naive model.

## Research Question

How can causal effects of a spatial policy be estimated from observational environmental data when spatial dependence, unmeasured spatial confounding, and treatment-dependent preferential sampling occur together?

## Motivation

Marine protected areas (MPAs) are costly to maintain and can affect commercial fishing, so their conservation effects need to be evaluated. Randomized policy assignment is generally unavailable in environmental studies, while spatial dependence creates unmeasured confounding and preferential sampling can make survey locations depend on the processes being studied. Ignoring either source of dependence can bias causal effect estimates.

## Contributions

- Introduces a unified spatial causal inference framework that jointly models potential outcomes and policy-specific sampling locations.
- Uses shared latent spatial processes to represent unmeasured confounders affecting both outcomes and sampling intensities, with separate residual spatial processes for sampling.
- Derives policy assignment probabilities from the superposition of two Poisson point processes, yielding spatially varying propensity scores.
- Establishes identifiability of the model parameters and weak posterior consistency under stated rank, prior, and bounded-covariate assumptions.
- Shows through simulation and an Australian MPA application that accounting for preferential sampling can materially change estimated causal effects.

## Method

The framework considers binary policies $a \in \{0,1\}$ over a spatial domain. The potential outcome at location $s$ is modeled as

$$
Y_a(s) = \alpha_a + X(s)^T \beta_a + U_a(s) + \epsilon_a(s),
$$

where $U_a(s)$ is a policy-specific latent spatial process that can act as an unmeasured confounder. The local causal effect is the difference between the two potential outcomes, and the average policy effect (APE) averages that local effect over the spatial domain.

Sampling locations for each policy follow policy-specific doubly stochastic Poisson processes. Their log intensities combine observed covariates, a residual spatial process $V_a(s)$, the shared latent process through a preferential-sampling coefficient $phi_a$, and an additional nonspatial random effect:

$$
log(lambda_a(s)) = \eta_a + X(s)^T \delta_a + V_a(s) + \phi_a U_a(s) + \psi_a(s).
$$

The bivariate latent processes are constructed with a linear model of coregionalization, so the policy-specific processes can be correlated while retaining policy-specific variation. The policy assignment probability at a sampled location follows from Poisson-process superposition:

$$
P(A(s)=1 | X(s), U(s), V(s)) = \lambda_1(s) / (\lambda_0(s) + \lambda_1(s)).
$$

The model relies on SUTVA, latent ignorability conditional on observed covariates and latent spatial processes, and positivity of both sampling intensities. Stochastic integrals are approximated on equal-sized grid cells. Bayesian inference uses a mixture of Gibbs sampling, Metropolis random-walk updates, and Hamiltonian Monte Carlo; missing potential outcomes are imputed during MCMC.

## Experiments

The simulation study compares the proposed full model with a naive outcome-only model, a shared-process model, and two-stage propensity-score adjustments using BART or spatial generalized linear models. Ten scenarios vary preferential-sampling strength, spatial dependence, expected sample size, stationarity, Gaussianity, and the correlation between potential outcomes. Each scenario contains 200 simulated data sets.

When preferential sampling is absent, the full and naive models perform similarly. As preferential sampling increases, the naive model's bias and mean squared error grow and its coverage falls, while the full model remains comparatively stable. The propensity-score adjustment competitors generally perform similarly to the naive model. The full model also performs better under the nonstationary and non-Gaussian scenarios considered and across different levels of cross-policy spatial correlation.

The Australian application uses 3,553 survey sites: 2,609 in MPAs and 944 non-MPA sites. The outcome is log fish biomass density. The analysis uses seven covariates, including shoreline distance, depth, chlorophyll-a, temperature, human population, market distance, and habitat type, over a domain represented by 465 grid cells. The full model estimates positive effects of depth, temperature, and market distance on biomass, while depth and human population significantly affect sampling intensity. The posterior mean APE is 0.71 with a 95% credible interval of (-0.24, 1.71), compared with 0.27 (-0.32, 0.87) for the naive model. Both estimates favor MPAs, but neither interval excludes zero. The estimated preferential-sampling coefficients differ between MPA and non-MPA sites, with an estimated difference of -1.70 and a 95% credible interval of (-5.67, 1.26).

## Limitations

The causal interpretation depends on SUTVA, latent ignorability, positivity, and the adequacy of the measured covariates and latent-process specification. Fish movement may still create interference despite excluding non-MPA sites near MPA boundaries. The response and sampling-intensity models are linear, propensity scores are treated as constant within grid cells, and the method adjusts for unmeasured spatial confounding through outcome regression rather than directly modeling all propensity-score imbalances. The approach currently assumes binary treatments and needs sensitivity analysis for remaining social, political, and ecological confounding. The theoretical guarantees also rely on model and prior assumptions that may not hold in every environmental application.

## Related Concepts

- [[Spatial Causal Inference]]
- [[Preferential Sampling]]
- [[Marine Protected Areas]]
- Spatial confounding
- Potential outcomes
- Propensity scores

## Related Papers

- Diggle, Menezes, and Su (2010), "Geostatistical inference under preferential sampling."
- Pati, Reich, and Dunson (2011), "Bayesian geostatistical modelling with informative sampling locations."
- Reich et al. (2021), "A review of spatial causal inference methods for environmental and epidemiological applications."
- Gill et al. (2017), "Capacity shortfalls hinder the performance of marine protected areas globally."
- Gill et al. (2024), "A diverse portfolio of marine protected areas can better advance global conservation and equity."

[[index|Library home]]
