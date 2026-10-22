---
title: "Fully Bayesian estimation of temporal decay in ordinal relational event models"
type: paper
authors:
  - Philip Leifeld
  - Jackie Siaw Tze Wong
year: 2026
doi: 10.1016/j.csda.2026.108428
source_job_id: "25518b47-c7af-4905-a8a1-e6e8ecbb5c5a"
tags:
  - relational-event-models
  - bayesian-inference
  - temporal-decay
  - network-analysis
  - discourse-networks
---

## TL;DR

This paper makes the temporal half-life in an ordinal [[concepts/relational-event-models|Relational Event Model]] an estimable Bayesian parameter instead of a fixed modeling choice. Simulations show that a misspecified fixed half-life biases network-effect coefficients, while joint posterior estimation recovers the generating values. In 6,704 statements from the German pension-policy debate, the estimated half-life is about 107 days under Efron's tie approximation and 111 days under Breslow's, far longer than the previously assumed 20 days. Precomputed event-lag vectors make repeated statistic evaluation feasible, although the implementation remains quadratic in the number of events for the statistics studied.

## Research Question

Can an ordinal relational event model estimate the exponential decay rate of event-history effects jointly with their coefficients, thereby quantifying the temporal horizon and uncertainty of network mechanisms without relying on an externally fixed half-life?

## Motivation

Relational event models often form endogenous statistics from past events after exponentially down-weighting older observations. Fixing the half-life determines those statistics before estimation. If that value is wrong, coefficient magnitudes, uncertainty, and covariance can also be wrong, while substantive theories rarely supply a defensible decay horizon. The paper therefore treats [[concepts/temporal-decay-in-relational-event-models|Temporal Decay in Relational Event Models]] as part of the inferential problem rather than as post-estimation model selection (Sections 1-3).

## Contributions

- Places one or more positive half-life parameters directly in the ordinal REM likelihood and estimates them jointly with network-effect coefficients by Markov chain Monte Carlo.
- Extends the likelihood to tied event times using both Breslow's and Efron's approximations.
- Introduces precomputed sparse vectors of eligible event lags so temporal statistics can be updated without repeatedly scanning the full event history.
- Demonstrates in simulation that fixed, misspecified half-lives bias coefficient estimates and that the Bayesian formulation recovers varied generating half-lives.
- Applies the model to discourse-network data and studies convergence, fixed-decay bias, model fit, and sensitivity to increasingly informative gamma priors.

## Method

For each candidate event, an ordinal REM constructs sufficient statistics from the preceding event sequence and maps their linear predictor to a conditional event probability over the current risk set. Temporal statistics weight each eligible earlier event using exponential decay,

$$
w(t_e,t,T_{1/2})=\frac{\log 2}{T_{1/2}}
\exp\left[-(t-t_e)\frac{\log 2}{T_{1/2}}\right].
$$

The half-life $T_{1/2}$ enters the likelihood alongside the coefficient vector $\boldsymbol\beta$. The sampler alternates random-walk Metropolis-Hastings updates for $\boldsymbol\beta$ and log-scale updates for the positive half-life. The authors consider an improper flat prior and gamma priors with mean 20 and progressively smaller variance. Event ties are handled with either Breslow's shared-risk-set approximation or Efron's correction (Sections 2-4).

To reduce repeated computation, the method first stores, for every candidate event and statistic, only the time gaps to past events satisfying that statistic's eligibility conditions. A proposed half-life then transforms these sparse lag vectors directly. For the single-past-event statistics used here, recomputing statistics costs $O(n^2)$ per MCMC iteration; precomputation lowers constants and memory use but not the asymptotic order (Sections 4 and 6).

## Experiments

### Simulation

The simulation uses 100 bipartite sequences per condition, each with 3,000 events, 20 sender nodes, 10 receiver nodes, fixed coefficients of 6, 5, and 4 for inertia, activity, and popularity, and generating half-lives of 25, 50, 75, or 100. The first 1,000 events are discarded. Maximum-likelihood fits with a fixed half-life of either 20 or 120 become increasingly biased as that assumption moves away from the generating value. The Bayesian model's point estimates place the generating coefficients and half-lives within the reported interquartile ranges across conditions (Section 5).

### German Pension Debate

The empirical sequence contains 6,704 statements by 245 political actors about 69 policy beliefs from 1993-2001, manually coded from 1,842 newspaper articles. The model includes atemporal indicators for government actors, scientific actors, and supportive statements, plus temporally decayed inertia, actor activity, belief popularity, and actor-type homophily sharing one half-life (Section 7.2).

With flat priors, posterior half-life modes are approximately 111 days under Breslow and 107 days under Efron, compared with the earlier fixed choice of 20 days. The fixed-20 frequentist model substantially understates the temporal coefficients: under Breslow, for example, inertia is 9.26 rather than a posterior mean of 17.67, activity is 3.27 rather than 5.13, and popularity is 3.15 rather than 4.81. Frequentist estimates using the posterior half-life are close to the Bayesian point estimates, while Bayesian standard errors are generally larger because they propagate half-life uncertainty (Sections 7.4-7.5).

All reported coefficients have the expected direction: government actors and supportive statements are more active, scientific actors are less active, and inertia, recent actor activity, recent belief popularity, and actor-type homophily increase event odds. The paper interprets positive homophily as short cascades of similar policy statements among actors of the same type. Efron's approximation attains the lowest reported BIC. The reported trace, Gelman-Rubin, Geweke, stationarity, and half-width diagnostics generally support convergence, although two Geweke statistics for inertia are slightly beyond the conventional absolute value of two (Section 7.3 and Appendix A).

The prior-sensitivity analysis shows that diffuse gamma priors yield half-life posteriors close to the flat-prior result. As prior variance shrinks around a mean of 20, the posterior is increasingly pulled toward 20, illustrating how informative priors can stabilize weakly identified settings but can also dominate the data (Section 7.6).

## Limitations

- The proposed MCMC procedure is computationally demanding and has quadratic per-iteration cost for the statistics examined; substantially larger event sequences require further approximation or sampling strategies.
- The application uses one shared half-life for four mechanisms. Mechanism-specific or grouped half-lives may fit better but introduce additional identification and model-selection demands.
- Only exponential decay is evaluated; power-law and other memory kernels may suit some settings better.
- The analysis centers on ordinal-time models and does not establish that the method transfers unchanged to full-likelihood continuous-time, multiplex, or group-heterogeneous REMs.
- The paper does not compare Bayesian half-life estimation with direct maximum-likelihood estimation of the decay parameter.
- The empirical conclusions come from one policy debate and one news source; the estimated 107-111 day horizon should not be generalized to other event systems without estimation.

## Related Concepts

- [[concepts/relational-event-models|Relational Event Models]]: event-history models in which prior relational events determine statistics for the next event's hazard or choice probability.
- [[concepts/temporal-decay-in-relational-event-models|Temporal Decay in Relational Event Models]]: memory weighting whose half-life is estimated jointly with network effects in this paper.

## Related Papers

- Butts (2008), "A relational event framework for social action": foundational formulation of relational event models.
- Arena, Mulder, and Leenders (2022), "A Bayesian semi-parametric approach for modeling memory decay in dynamic social networks": a Bayesian model-averaging precursor for memory decay.
- Arena, Mulder, and Leenders (2023), "How fast do we forget our past social interactions?": develops parametric memory-decay comparisons that motivate estimating rather than fixing decay.
- Leifeld and Brandenberger (2019), "Endogenous coalition formation in policy debates": the earlier analysis whose fixed 20-day half-life motivates the empirical comparison.

[[index|Library home]]
