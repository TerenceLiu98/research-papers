---
title: "Parameter estimation in Conditional Sequential Monte Carlo algorithms through Particle Learning"
type: paper
authors:
  - Alfonso Diz-Lois Palomares
  - Geir Storvik
year: 2026
source_job_id: "0dce4633-0ea9-4803-9cb7-3ae1dd2b8761"
code: "https://github.com/Adizlois/pCSMC-AS"
tags:
  - conditional-sequential-monte-carlo
  - particle-learning
  - particle-gibbs
  - state-space-models
  - bayesian-inference
---

## TL;DR

This paper introduces [[concepts/parameter-conditional-sequential-monte-carlo|Parameter Conditional Sequential Monte Carlo]] (p-CSMC), which moves static parameters inside an extended conditional SMC state and updates them alongside latent trajectories. In branching-process experiments with strong parameter-state dependence, p-CSMC with ancestor sampling mixes much better than standard Particle Gibbs with ancestor sampling. A partially collapsed variant retains the original joint posterior while reducing ancestor-weight evaluation from the full marginal method's reported $O(NT^2)$ cost to $O(NT)$.

## Research Question

Can particle learning be incorporated into conditional sequential Monte Carlo so that static parameters and latent states are updated jointly, avoiding the poor mixing of [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]] when those variables are strongly correlated?

## Motivation

Particle Gibbs alternates between a conditional particle-filter update for latent trajectories and a conditional update for static parameters. This is attractive when the parameter conditional is available, but strong posterior dependence can make the outer Gibbs chain move very slowly. Marginalizing the parameter can improve mixing, yet it creates non-Markovian latent dynamics and can make ancestor sampling cost $O(NT^2)$. The paper seeks an intermediate construction that weakens cross-iteration parameter coupling without paying the full marginal method's backward-weight cost.

## Contributions

- Defines an extended target in which a static parameter $\theta$ becomes a time-indexed sequence $\theta_{1:T}$, with $\theta_T$ retaining the original joint posterior as a marginal.
- Develops p-CSMC with ancestor sampling for jointly proposing latent states and auxiliary parameter values, and proves invariance of the extended target.
- Gives a partially collapsed p-CSMC-AS algorithm that marginalizes intermediate parameter variables but samples the terminal parameter, preserving the desired joint posterior.
- Uses sufficient statistics and conjugate updates to simplify forward and ancestor weights in models where the parameter conditional is tractable.
- Evaluates the methods on synthetic branching processes and on joint inference of an infectivity profile and time-varying reproduction number from Norwegian Alpha-variant hospital admissions.

## Method

### Extended parameter state

The original target is the joint posterior $p(x_{1:T},\theta\mid y_{1:T})$. The paper augments it with $\theta_{1:T}$ and defines an extended target whose terminal value satisfies $\theta_T=\theta$. Auxiliary distributions over $\theta_{1:T-1}$ can be chosen to control dependence along time while leaving the original posterior as a marginal.

In the particle-learning construction, each particle samples $\theta_t$ from its parameter posterior given the preceding latent path, then samples $x_t$ conditional on $\theta_t$. With a bootstrap proposal, the forward importance weight reduces to the observation likelihood. Ancestor sampling reconnects the retained reference suffix to candidate prefixes, with sufficient statistics making the required parameter-posterior terms practical to evaluate.

### Partially collapsed p-CSMC-AS

The partially collapsed algorithm targets $p(x_{1:t}\mid y_{1:t})$ at intermediate times and the full $p(x_{1:T},\theta_T\mid y_{1:T})$ at the terminal step. It simulates marginal latent transitions through a two-step draw of an auxiliary parameter followed by a state draw, but only retains a terminal parameter sample. Its ancestor weight depends on the candidate prefix through $p(\theta_T^*\mid x_{1:t-1})$ and the next-state transition under the reference parameter. For the studied model, this yields $O(NT)$ evaluations rather than the full marginal ancestor sampler's $O(NT^2)$ evaluations.

### Branching-process model

The application models latent infections as Poisson counts driven by a time-varying reproduction number and lag-specific infectivity weights, with observed hospital admissions following a binomial model. Splitting infections into per-lag contributions and placing independent Gamma priors on the weights yields Gamma conditional posteriors summarized by cumulative counts and exposure. These sufficient statistics support the p-CSMC updates.

## Experiments

### Synthetic infectivity-profile inference

The authors compare PGAS, p-CSMC-AS, partially collapsed p-CSMC-AS, and a fully marginal sampler with 300 particles. They study $p=2,T=50$ and $p=7,T=100$. The p-CSMC variants and marginal sampler run for 10,000 iterations with 500 burn-in iterations; PGAS runs for 40,000 with 4,000 burn-in iterations.

PGAS mixes slowly for $p=2$ and does not fully converge in useful time for $p=7$. Both p-CSMC variants show substantially better parameter-space mixing, with the partially collapsed version slightly better than uncollapsed p-CSMC. The fully marginal sampler mixes best but has higher computational cost. Early latent time points remain difficult: p-CSMC and the marginal sampler exhibit low effective sample sizes there because their initial proposals are weakly informed. The partially collapsed method reports mixing comparable to the marginal sampler, lower early-time autocorrelation than uncollapsed p-CSMC, and the lower $O(NT)$ evaluation cost.

### Norwegian Alpha-variant application

The real-data analysis uses daily Norwegian COVID-19 hospital admissions from February 1 through March 15, 2021. It alternates partially collapsed p-CSMC-AS for latent infections and eight infectivity lags with a separate CSMC-AS update for the reproduction-number path. The model fixes the final infectivity weight to 0.05 for identifiability, assumes a 4.7% hospitalization probability, and uses a log-scale random-walk standard deviation of 0.15 for the reproduction number.

The p-CSMC procedure runs for 90,000 iterations with 5,000 burn-in iterations, while JAGS runs for 290,000 with 80,000 burn-in iterations. The inferred average hospitalization interval is 3.4 days with a reported interval of 2.8--4.1 days. Autocorrelation is generally lower for partially collapsed p-CSMC-AS, especially for infectivity weights, and posterior predictive intervals cover the observed admissions well. The authors caution that the JAGS comparison is model-specific and that the reproduction-number path is updated by a separate CSMC step.

## Limitations

- The method requires tractable simulation from parameter conditionals or an equivalent sufficient-statistic construction; this is not available in every state-space model.
- Ancestor or backward sampling remains necessary to limit path degeneracy, and weakly informative observations or slowly mixing and non-Markovian dynamics can still collapse early parts of the particle genealogy.
- There is an explicit trade-off between informed, reference-coupled proposals that reduce particle degeneracy and weaker coupling that improves outer-MCMC mixing.
- The synthetic comparison demonstrates severe PGAS mixing failures in the studied branching process, not a universal advantage over all Particle Gibbs implementations.
- The real-data comparison is only against a JAGS slice sampler because the other SMC methods did not converge in the authors' chosen time frame. The paper explicitly says this comparison should not be generalized.
- Several epidemiological quantities are fixed, the infectivity profile is reported as weakly informative, and the analysis covers only the early Alpha-variant growth period in Norway.
- The supplied manuscript is dated August 31, 2026, but provides no DOI, arXiv identifier, or publication venue.

## Related Concepts

- [[concepts/parameter-conditional-sequential-monte-carlo|Parameter Conditional Sequential Monte Carlo]]: the paper's extended-state and partially collapsed approach to joint state-parameter inference.
- [[concepts/sequential-monte-carlo|Sequential Monte Carlo]]: the particle-filtering foundation for the conditional algorithms.
- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]: the principal baseline whose Gibbs coupling can mix poorly under strong state-parameter dependence.

## Related Papers

- Andrieu, Doucet, and Holenstein (2010), "Particle Markov Chain Monte Carlo Methods": establishes Particle Gibbs and the augmented-target argument used in the invariance proof.
- Lindsten, Jordan, and Schon (2014), "Particle Gibbs with Ancestor Sampling": provides the ancestor-sampling construction used by the proposed algorithms.
- Storvik (2002), "Particle Filters for State-Space Models with the Presence of Unknown Static Parameters": supplies the sufficient-statistic particle-learning strategy extended here to conditional SMC.
- Wigren et al. (2019), "Parameter Elimination in Particle Gibbs Sampling": provides the fully marginal alternative and motivates the computational comparison.
- Cardoso et al. (2023), "State and Parameter Learning with PaRIS Particle Gibbs": another approach to state and parameter learning within Particle Gibbs.

[[index|Library home]]
