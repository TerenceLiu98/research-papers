---
title: Coarse-Grained Hawkes Processes
type: concept
aliases:
  - Coarse-Grained Hawkes Process
  - Spatio-Temporal Coarse-Grained Hawkes Process
tags:
  - hawkes-processes
  - point-processes
  - aggregated-data
  - spatiotemporal-statistics
---

## Overview

A coarse-grained Hawkes process is a discrete-time count model designed to approximate a continuous-time Hawkes process observed only through aggregated bins. Its defining feature is an effective excitation kernel that averages triggering over the unobserved event configurations inside bins while retaining excitation between events in the same temporal interval.

## Key Ideas

- **Aggregation changes the process:** Counts obtained by binning a continuous-time Hawkes realization are not automatically a standard [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Process]]. Their dependence includes unobserved event ordering within each bin.
- **Intra-bin excitation matters:** A conventional binned Poisson approximation uses only earlier bins, so an event cannot trigger another event in its own interval. Coarse-graining introduces a lag-zero excitation coefficient and resolves the contemporaneous dependence through an effective kernel.
- **Spatial kernels can also be averaged:** For spatio-temporal counts, excitation is integrated over destination cells and an assumed distribution of parent locations within each source cell. This avoids imputing individual locations but makes the approximation depend on that within-cell distribution.
- **Moment fidelity is the target:** The construction can be defined through conditional means and covariances without specifying a complete count distribution. Stationary mean and autocovariance comparisons therefore do not imply equality of likelihoods or full process laws.
- **Stationary intensity guides spatial averaging:** When the within-cell location density is proportional to stationary intensity, the spatio-temporal construction can match the aggregated Hawkes stationary mean exactly under the model assumptions.

## Important Papers

- Koyama (2025), "Coarse-grained Hawkes processes": introduces the temporal coarse-graining construction and analyzes its spectral approximation.
- [[papers/spatio-temporal-coarse-grained-hawkes-processes|Spatio-temporal coarse-grained Hawkes processes]]: extends coarse-graining to joint temporal and spatial aggregation, derives moment-error orders, and applies a moment estimator to aggregated earthquake counts.

## Related Concepts

- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: related count-process formulations whose handling of the current bin depends on their construction.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: spatial aggregation and reaggregation alter what variation is identifiable.
- [[concepts/event-time-uncertainty-in-point-processes|Event-Time Uncertainty in Point Processes]]: models uncertain event times explicitly rather than integrating them into an effective count kernel.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: flexible event-level kernel inference, contrasting with coarse-grained moment approximation.
