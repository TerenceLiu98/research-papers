---
title: Quantitative Prediction of Critical Transitions
type: concept
aliases:
  - Critical Transition Threshold Prediction
tags:
  - critical-transitions
  - early-warning
  - network-dynamics
---

## Overview

Quantitative prediction of critical transitions estimates the control-parameter value or time at which a dynamical system will change regime. It extends early-warning analysis from detecting approaching instability to locating a transition. These targets must be distinguished: a critical parameter value does not specify a date without information about how the parameter evolves.

## Key Ideas

- **Warning signals and numerical targets differ.** Critical slowing down describes slower recovery from perturbations near a transition; rising variance or autocorrelation can signal this behavior without directly identifying the transition threshold.
- **Define the horizon in the appropriate units.** Parameter-space lead distance $|\varepsilon_s-\varepsilon_c|$ measures distance from the current parameter to the critical value. A nonlinear parameter trajectory breaks any simple equivalence with elapsed time.
- **Separate inference inputs from training knowledge.** A predictor can operate on node observations alone while relying on known dynamical models and transition labels to construct its training set.
- **Preserve trajectory independence.** Sliding windows from one simulation share dynamics and observations. Splitting by simulation prevents these overlapping examples from leaking across train and test sets.
- **Normalize errors transparently.** Dividing absolute threshold error by the swept parameter range yields a range-relative error, not an error relative to the threshold itself. The choice of range affects comparisons across systems.
- **Match evidence to deployment.** Robustness to randomly hidden nodes, Gaussian noise, or selected transient regimes is specific to those tests. Spatial transition patterns and temporal warning systems also require different interpretations.

## Important Papers

- [[papers/early-predictor-for-the-onset-of-critical-transitions-in-networked-dynamical-systems|Early Predictor for the Onset of Critical Transitions in Networked Dynamical Systems]] uses pooled node representations and GRUs to regress transition thresholds, with synthetic evaluations and fine-tuned transfer to spatial vegetation observations.
- Heßler and Kamps (2022), "Bayesian on-line anticipation of critical transitions," is a quantitative anticipation approach discussed in that paper (reference 34).
- Fan et al. (2021), "Anticipating synchronization with machine learning," is its parameter-aware reservoir-computing comparator in the literature discussion (reference 37).

## Related Concepts

- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]] concerns coexistence of stable regimes and history-dependent transitions.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]] predicts future abnormal status, whereas threshold regression predicts where a dynamical regime change occurs.
