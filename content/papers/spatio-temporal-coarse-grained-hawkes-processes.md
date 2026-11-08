---
title: Spatio-temporal coarse-grained Hawkes processes
type: paper
authors:
  - Tomoya Uda
  - Shinsuke Koyama
year: 2026
source_job_id: 19d11747-8edf-4cff-9295-5db81c1d0575
tags:
  - hawkes-processes
  - point-processes
  - spatiotemporal-statistics
  - aggregated-data
  - earthquake-forecasting
---

## TL;DR

Uda and Koyama construct a [[concepts/coarse-grained-hawkes-processes|Coarse-Grained Hawkes Process]] for counts aggregated over time intervals and spatial regions. Averaging the continuous temporal and spatial triggering kernels over bins, including excitation within the current time bin, gives a tractable count model whose stationary mean and autocovariance approximate those of the aggregated continuous-time process more accurately than a conventional binned Poisson approximation. Simulations support the asymptotic analysis, and an aggregated ETAS application trades some earthquake-forecast accuracy for much cheaper estimation from counts alone.

## Research Question

How can a spatio-temporal Hawkes process be approximated and estimated when observations contain only counts by time interval and spatial region, rather than individual event times and locations?

## Motivation

Exact Hawkes likelihoods require event-level times and locations and can be expensive for large catalogs. Regional time-bin counts are often the only available observations, but ordinary discretizations omit events that trigger further events inside the same time bin. Latent-event methods can reconstruct missing configurations but require repeated sampling or imputation. The paper instead seeks a direct count model that retains the underlying process's first- and second-order dependence without reconstructing latent events.

## Contributions

- Extends temporal coarse-grained Hawkes modeling to joint temporal and spatial aggregation, with effective kernels averaged over both dimensions (Section 3.1).
- Includes intra-bin excitation explicitly and derives the stationary mean and autocovariance of the resulting discrete-time process (Section 3.1).
- Establishes asymptotic approximation errors relative to aggregated continuous-time Hawkes counts and shows higher temporal orders than the binned Poisson approximation (Section 3.2).
- Develops a moment-based parameter objective for aggregated counts and applies it to an ETAS-type earthquake model (Section 4).

## Method

For spatial cells $S_i$ and time-bin width $\Delta t$, the observed variable is the count $X_{i,k}$ in cell $i$ during interval $k$. Conditional event times are approximated as uniform within a temporal bin, while locations in source cell $S_j$ follow a prescribed density $p_j$. Integrating the continuous temporal kernel over pairs of bins gives coefficients $\phi_r$; integrating the spatial triggering density over source and destination cells gives a matrix $F$.

The coefficient $\phi_0$ represents excitation among events in the same temporal bin. Moving this contemporaneous term to the left yields an effective kernel involving $(I-\phi_0F)^{-1}$. The model is specified through conditional first and second moments rather than a full count distribution, so the estimation criterion is not an exact likelihood. Instead, the authors use the resulting $\operatorname{AR}(\infty)$ representation to form a weighted moment loss. Its current-bin term retains intra-bin excitation, and a log-determinant term prevents a degenerate contemporaneous solution (Section 4.1).

Under subcriticality and regularity conditions, the stationary mean error is

$$
O\!\left(\Delta t\,|S|^{1/q}|S_i|\right).
$$

Choosing each $p_j$ proportional to the stationary intensity within its cell makes the coarse-grained and aggregated Hawkes stationary means coincide exactly. For non-diagonal or nonzero-lag covariance terms, the temporal component of the proposed model's error is order $(\Delta t)^3$, compared with order $(\Delta t)^2$ at zero lag and $(\Delta t)^{5/2}$ at positive lags for the binned Poisson approximation (Section 3.2). These claims concern moments in the joint fine-bin limit, not equality of the complete process distributions.

## Experiments

### Approximation Study

The synthetic process uses a two-dimensional unit square, an inhomogeneous background, an exponential temporal kernel with branching ratio $0.9$, and a periodic Gaussian spatial kernel. The normalized stationary-mean error of the proposed approximation remains about $5.3\times10^{-3}$ as $\Delta t$ changes at spatial width $\Delta x=0.1$, while the binned Poisson error grows with the temporal bin width. As spatial bins shrink at fixed $\Delta t=0.1$, the proposed mean error approaches zero but the binned Poisson error retains its temporal discretization component (Figures 1-2).

Across the tested temporal and spatial widths, normalized autocovariance errors are approximately one to two orders of magnitude below those of the binned Poisson approximation. Using within-cell densities proportional to stationary intensity gives a modest further improvement for relatively large spatial cells (Figures 3-4).

### Aggregated Earthquake Forecasting

The application coarse-grains a magnitude-dependent ETAS intensity and averages unobserved magnitudes under an empirically fitted Gutenberg-Richter distribution. Parameters are learned from aggregated counts for the Salton Sea and San Jacinto regions of the QTM California earthquake catalog, while test log likelihood is evaluated afterward on complete event-level test catalogs (Section 4.2).

| Region | Coarse-grained | ETAS | NSTPP | DeepSTPP | AutoSTPP |
| --- | ---: | ---: | ---: | ---: | ---: |
| Salton Sea | -2.745 | 0.016 | -3.579 | -1.875 | -1.285 |
| San Jacinto | -5.287 | -4.265 | -7.078 | -5.848 | -5.334 |

The full-data ETAS model has the best reported score in both regions. Despite using aggregated training observations, the proposed method is competitive with or better than the neural point-process baselines in these cases. Reported training times are 44 seconds for 44,042 Salton Sea events and 19 minutes 50 seconds for 18,664 San Jacinto events, versus 7 hours 28 minutes and 32 minutes 40 seconds for ETAS. Hardware differs substantially: the proposed method ran on a 16-core CPU workstation, whereas benchmark timings came from an A100-based HPC system, so these figures do not isolate algorithmic speedups (Tables 1-2).

## Limitations

- The construction approximates unknown within-bin configurations using uniform event times and prescribed spatial densities. Accuracy depends on bin sizes, spatial regularity, and how well these densities represent the stationary intensity.
- The theory characterizes stationary first and second moments under subcriticality and smoothness assumptions; it does not establish equality of likelihoods or full finite-dimensional distributions.
- The moment objective is not an exact likelihood. Its statistical consistency and uncertainty quantification are not established in the supplied manuscript.
- Aggregation discards event times, locations, and earthquake magnitudes. The earthquake model consequently underperforms full-data ETAS, and its evaluation uses only two California regions.
- Runtime comparisons use different hardware and implementations. They demonstrate a practical resource trade-off, not a controlled computational benchmark.

## Related Concepts

- [[concepts/coarse-grained-hawkes-processes|Coarse-Grained Hawkes Processes]]: the effective-kernel construction and its treatment of intra-bin excitation.
- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: the broader family of history-dependent count models on time bins.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: the general problem created when event information is observed or predicted on spatial aggregates.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: an alternative approach to learning flexible excitation kernels from event-level data.

## Related Papers

- Koyama (2025), "Coarse-grained Hawkes processes": the temporal construction extended here to spatio-temporal bins (reference 22).
- Shlomovich et al. (2022), "Parameter estimation of binned Hawkes processes": a cited treatment of estimation from temporally binned observations (reference 17).
- [[papers/continuous-inference-for-aggregated-point-process-data|Continuous inference for aggregated point process data]]: another direct treatment of regional counts, using latent allocation for a log-Gaussian Cox process rather than self-excitation.
- [[papers/bayesian-spatiotemporal-modelling-of-political-violence-and-conflict-events-using-discrete-time-hawkes-processes|Bayesian spatiotemporal modelling of political violence and conflict events using discrete-time Hawkes processes]]: a regional count application that omits within-week excitation.

[[index|Library home]]
