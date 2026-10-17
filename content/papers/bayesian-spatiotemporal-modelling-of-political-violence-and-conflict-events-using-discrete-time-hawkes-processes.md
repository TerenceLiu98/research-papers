---
title: "Bayesian spatiotemporal modelling of political violence and conflict events using discrete-time Hawkes processes"
type: paper
authors:
  - Raiha Browning
  - Hamish Patten
  - Judith Rousseau
  - Kerrie Mengersen
year: null
source_job_id: "b33a5972-a08f-40de-9629-7486367d7200"
tags:
  - hawkes-processes
  - bayesian-inference
  - spatial-statistics
  - conflict-risk
---

## TL;DR

A Bayesian discrete-time Hawkes model separates spatially varying background conflict activity from excitation by earlier events, with zero inflation for sparse weekly counts. Applied separately to six ACLED event types in four South Asian countries, it supports subnational risk monitoring and reveals substantial differences in excitation patterns. Spatial triggering is selected for every Nepal scenario but none in Pakistan. Three-month predictive checks generally encompass observed counts, while missing parts of the surge during Bangladesh's 2015 political crisis; illustrative warning thresholds are smoother than those based on historical averages.

## Research Question

Can Bayesian spatiotemporal Hawkes models explain recorded conflict patterns, distinguish background activity from temporal and spatial excitation, and provide useful uncertainty-aware tools for humanitarian risk monitoring?

## Motivation

Historical moving averages can produce unstable anomaly thresholds and provide limited insight into how past events and nearby activity relate to present risk. The paper emphasizes interpretable monitoring for anticipatory action, using a common statistical framework for local risk estimates, longer-term warning thresholds, and short-term predictions (Sections 1 and 4).

## Contributions

- Combines a spatially varying baseline, temporal excitation, optional spatial triggering, and a zero-inflated Poisson observation model within a Bayesian framework.
- Compares models across 24 country/event-type combinations, distinguishing spatial heterogeneity in baseline rates from spatial propagation of excitation.
- Demonstrates subnational risk maps, posterior predictive checks, and an early-warning illustration benchmarked against historical moving averages.
- Examines maximum excitation lag, kernel choice, prior sensitivity, and intensity-estimation behavior in a supplementary simulation study.

## Method

For weekly count $Y_{t,r}$ in administrative region $r$, the spatially exciting specification of [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]] uses

$$
\lambda_{t,r}=\exp(\mu_0+\mu_r)
+\alpha\sum_{u=1}^{52}\sum_l Y_{t-u,l}g(u)h(z_r,z_l).
$$

The alternative, `nospatialSE`, retains only the region's own past counts in the excitation term. Both models use an intrinsic conditional autoregressive (ICAR) prior over regional log-baselines, borrowing information across adjacent regions. This represents [[concepts/spatial-autocorrelation|Spatial Autocorrelation]] in background activity independently of the optional triggering kernel (Section 2.3).

The observation model is a mixture of a structural zero with probability $\pi$ and a Poisson count with probability $1-\pi$. Thus $\lambda_{t,r}$ is the Poisson-component rate; the full conditional mean is $(1-\pi)\lambda_{t,r}$. The temporal kernel is a geometric probability mass function truncated and renormalized over 52 weeks. The source defines its spatial kernel as $h(z_r,z_l)=\exp[-d(z_r,z_l)/(2\sigma^2)]$, with $d$ the Euclidean distance between latitude-longitude centroids (Equations 5-8). This expression uses distance, not squared distance.

Stan's No-U-Turn Sampler estimates the posterior. Weakly informative priors produced convergence problems, so non-spatial parameters receive priors centered on maximum-likelihood estimates obtained with R's `optim`; regional effects retain the ICAR prior. Excitation magnitude $\alpha$ must be interpreted jointly with zero inflation and spatial weights: $\alpha>1$ alone does not establish explosive dynamics (Section 2.3; Appendix B).

The paper supplies [implementation code](https://github.com/RaihaTuiTaura/st-hawkes-thesis). The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier for this manuscript.

## Experiments

### Data and Model Selection

Weekly ACLED counts cover 2010-2014 in Bangladesh, Nepal, Pakistan, and Sri Lanka. Each country and each of six event types is fitted separately: battles, explosions/remote violence, protests, riots, strategic developments, and violence against civilians. Administrative units are GADM level 2 in Nepal and Pakistan and level 1 in Bangladesh and Sri Lanka. The fitting period begins in 2011, using 2010 as event history for the 52-week lag (Sections 2.1 and 3).

Maximum-likelihood/BIC comparisons favor a 52-week excitation window over 12 and 26 weeks. Baseline-only models underperform overall, while more complex power-law kernels do not consistently justify their additional parameters. Neither temporal-only nor spatiotemporal excitation wins across all scenarios (Appendix A).

For the Bayesian fits, convergence diagnostics are checked first. The temporal-only model fails these checks for battles and protests in Nepal. Otherwise, spatial triggering is selected only if it wins more than half of six criteria covering predictive coverage, residual behavior, zeros, and BIC. Table 1 gives:

| Event type | Bangladesh | Nepal | Pakistan | Sri Lanka |
| --- | --- | --- | --- | --- |
| Battles | Spatial | Spatial | Temporal only | Spatial |
| Explosions/remote violence | Temporal only | Spatial | Temporal only | Spatial |
| Protests | Spatial | Spatial | Temporal only | Temporal only |
| Riots | Temporal only | Spatial | Temporal only | Temporal only |
| Strategic developments | Temporal only | Spatial | Temporal only | Temporal only |
| Violence against civilians | Temporal only | Spatial | Temporal only | Temporal only |

All entries retain spatially varying baselines; "Spatial" denotes additional spatial triggering.

### Reported Findings

- **Temporal and spatial patterns:** Bangladesh and Pakistan generally show longer excitation memories than Nepal and Sri Lanka, especially for battles, explosions/remote violence, and strategic developments. Estimated spatial influence is relatively localized in Bangladesh, while several Nepal event types have broader spatial kernels (Section 3, Figure 9).
- **Predictive checks:** Using 100 posterior samples, the authors simulate the first three months of 2015 without updating forecasts with held-out observations. Reported 95% intervals usually encompass observed counts, but miss unusually high riots, protests, and explosions/remote violence in Bangladesh during the political crisis. The preceding year had low activity, leaving little endogenous excitation from which to anticipate the surge (Figure 10; Appendix E).
- **Warning illustration:** The historical comparator flags counts more than two standard deviations above a rolling 12-month mean. The proposed illustration instead uses a rolling average of posterior-median Poisson 97.5% quantiles. Pakistan protest plots show smoother thresholds and different responses to isolated events. The 97.5% level is illustrative, not an optimized operational threshold (Section 4, Figure 11).
- **Simulation:** Appendix G fits MLEs, rather than full Bayesian posteriors, to 10 simulated series at each length of 50, 100, 250, 500, and 1,000 intervals, using Pakistan's regional structure and a 12-interval lag. Intensity residuals become more stable from about 250 intervals, with decreasing variability at longer lengths. This is a finite simulation result, not a posterior-consistency theorem.

## Limitations

- Countries and event types are fitted independently; cross-border and cross-type excitation are not estimated. Event counts also do not directly quantify fatalities or humanitarian impact.
- The model misses some extreme counts and responds to new events only in the following interval. Exogenous warning signals, overdispersed likelihoods, and richer regime dynamics remain proposed extensions.
- MLE-centered priors address observed convergence difficulties, but uncertainty is conditional on this data-dependent prior construction. The supplementary simulation evaluates MLE intensity recovery rather than Bayesian interval calibration.
- Weekly aggregation excludes within-week excitation and can shift apparent activity into the baseline. Spatial aggregation and centroid distances likewise affect interpretation; Euclidean latitude-longitude distances become problematic over larger domains or at higher latitudes.
- Fitted excitation describes event-history dependence; it does not by itself identify causal transmission. The warning comparison supplies illustrative behavior rather than measured intervention benefits or a head-to-head forecast evaluation against CAST.
- The source sums regional quantiles for some national summaries and notes inflated upper bounds; sums of marginal quantiles should not be interpreted automatically as quantiles of the joint total. Figure 6's prose specifies 90% intervals while its caption says 95%, so no single coverage level is assigned to that figure here.

## Related Concepts

- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: self-exciting models for interval counts, with aggregation and zero-inflation considerations.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: dependence in regional baseline activity represented through the ICAR prior.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: related Bayesian kernel inference; this study uses fixed parametric kernels.
- [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]]: an alternative representation of spatially varying latent intensity discussed in the manuscript.

## Related Papers

- Browning et al. (2021), "Simple discrete-time self-exciting models can describe complex dynamic processes: A case study of COVID-19": a cited discrete-time modeling precedent.
- Jun and Cook (2024), "Flexible multivariate spatiotemporal Hawkes process models of terrorism": a cited spatial Hawkes approach using maximum likelihood.
- [[papers/dynamic-hawkes-processes-for-discovering-time-evolving-communities-states-behind-diffusion-processes|Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes]]: cited neural modeling of evolving community dynamics; not evaluated as a baseline here.
- [[papers/spatiotemporal-patterns-of-conflict-related-sexual-violence-in-colombia|Spatiotemporal patterns of conflict-related sexual violence in Colombia]]: related library work illustrating how baseline specification and time resolution affect inferred excitation; not an evaluated comparator.

[[index|Library home]]
