---
title: Gradient Synchronization
type: concept
aliases:
  - GS
  - Gradient Synchronisation
tags:
  - functional-data-analysis
  - synchronization-measures
  - dynamic-functional-connectivity
  - derivative-based-association
---

## Overview

Gradient synchronization is a derivative-based association measure for paired functional data. It records whether two smooth curves are locally moving in the same or opposite directions, then aggregates that concordance over time. A complementary measure, gradient synchronization fluctuation (GSF), counts how often the relationship switches between concordance and discordance.

## Key Ideas

- For differentiable curves $X(t)$ and $Y(t)$, the synchronization function is $S_{XY}(t)=\operatorname{sign}\{X'(t)Y'(t)\}$: positive for joint increases or decreases and negative for motion in opposite directions.
- Subject-level GS integrates $S_{XY}(t)$ over time and lies between -1 and 1. Its population counterpart is the expected subject-level value.
- GSF counts sign changes of $S_{XY}(t)$. GS therefore describes average directional agreement, while GSF describes the temporal stability of that agreement.
- Local centered correlations on progressively finer time segments converge to the synchronization function under differentiability and nonzero-derivative conditions, connecting GS to the limiting behavior of sliding-window correlation.
- Discrete estimators use signs of adjacent first-difference products. This avoids explicit curve smoothing, but measurement noise can cause spurious derivative sign changes and may require filtering.
- Observation density matters especially for GSF: switches that occur inside a grid interval are unobserved, producing downward bias relative to the grid-independent target.
- Population inference relies on smoothness, finite derivative zero crossings, and additional moment and nondegeneracy assumptions; grid-independent asymptotics require the grid to become dense with sample size.

## Important Papers

- [[Gradient Synchronization for Multivariate Functional Data, with Application to Brain Connectivity]]
- Dubin and Mueller (2005), "Dynamical correlation for multivariate longitudinal data."
- Chang and Glover (2010), "Time-frequency dynamics of resting-state brain connectivity measured with fMRI."
- Lindquist et al. (2014), "Evaluating dynamic bivariate correlations in resting-state fMRI: A comparison study and a new approach."

## Related Concepts

- [[Neuroimaging Data Analysis]]
- [[Nonstationary Functional Time Series]]
- Functional data analysis
- Dynamic functional connectivity
- Functional correlation
- Zero-crossing processes
