---
title: Event-Time Uncertainty in Point Processes
type: concept
aliases:
  - Uncertain Event Times
  - Time-Uncertain Point Processes
tags:
  - temporal-point-processes
  - hawkes-processes
  - event-time-uncertainty
  - interval-censoring
---

## Overview

Event-time uncertainty occurs when an individual event is known to have happened within a time window but its exact timestamp is unavailable. Examples include conditions detected by delayed tests and incidents discovered after they occur. This is an observation problem: it differs from uncertainty about fitted parameters, from systematic clock offsets, and from ordinary binned count data in which several events may occur in each interval.

## Key Ideas

- **Observation windows define the information set:** Inference should condition on the observed intervals rather than silently replace each event with a midpoint or endpoint. The resulting filtration contains coarser information than exact event history.
- **Assumptions determine the likelihood:** Ordered, nonoverlapping windows with one event each support a survival-based likelihood. Interval-censored count methods instead permit multiple events per bin and solve a different observation problem.
- **Discretization can preserve point-process semantics:** When uncertainty windows align with a grid, integrated continuous-time intensity determines interval event probabilities. For a unit interval with integrated intensity $h\Lambda_t$, the event probability is $1-e^{-h\Lambda_t}$, not an arbitrary logistic or identity link.
- **Resolution trades information for tractability:** A grid converts functional kernel estimation into matrix or tensor estimation, but events within the same interval cannot excite one another and the number of nonstationary parameters grows with temporal resolution.
- **Timing error and process dynamics can be confounded:** A flexible observation-aware model can reduce timestamp misspecification, but time-varying baselines, kernels, reporting delays, and measurement schedules may still produce similar observed patterns.
- **Network extensions add location uncertainty structure:** Node-labeled events permit source-target influence tensors, yet learned predictive edges require additional assumptions before they can be interpreted causally.

## Important Papers

- [[papers/point-processes-with-event-time-uncertainty|Point Processes with Event Time Uncertainty]]: derives continuous- and discrete-time Hawkes formulations for event windows and gives VI-based recovery guarantees for time-only and network models.
- Ogata (1999), "Estimating the hazard of rupture using uncertain occurrence times of paleoearthquakes": an early Bayesian treatment using prior distributions over uncertain times.
- Rizoiu et al. (2022), "Interval-censored Hawkes processes": models aggregated interval counts using a mean-behavior Poisson process.
- Schneider and Weber (2023), "Estimation of self-exciting point processes from time-censored data": estimates Hawkes processes from interval-count observations with EM.

## Related Concepts

- [[concepts/discrete-time-hawkes-processes|Discrete-Time Hawkes Processes]]: represent excitation on a temporal grid; their observation model may use counts or binary events.
- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]]: studies errors induced by clocks or streams that are shifted relative to one another.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: represent changing excitation dynamics rather than uncertain observation times.
