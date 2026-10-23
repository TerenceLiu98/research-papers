---
title: Functional Calibration
type: concept
aliases:
  - Functional Calibration for Asynchronous Regression
  - FCAR
tags:
  - longitudinal-data
  - functional-data-analysis
  - measurement-error
  - regression-calibration
---

## Overview

Functional calibration reconstructs a latent longitudinal covariate at outcome observation times when noisy covariate measurements are collected on a different schedule. It combines a model of the covariate trajectory with regression calibration: sparse [[concepts/functional-principal-component-analysis|FPCA]] estimates subject-specific trajectories, and predictions from those trajectories replace unavailable synchronized covariates in a downstream regression.

## Key Ideas

- Separate observation schedules are treated as a trajectory-reconstruction problem rather than by matching nearby response and covariate measurements.
- A smooth mean and covariance estimated from pooled sparse observations define a low-rank FPCA representation. Best linear unbiased FPC score predictions borrow information across all covariate measurements from a subject.
- Reconstructed trajectories can be evaluated at arbitrary response times and used in time-invariant or varying-coefficient regression.
- Calibration reduces bias from asynchronous, error-prone observations, but it does not make predicted covariates known. Inferential variance must include latent-trajectory prediction error and error from estimating the FPCA model.
- A subject-level bootstrap should repeat both trajectory calibration and downstream regression. For local varying-coefficient estimation, undersmoothing the first-stage covariance estimator controls calibration bias.
- Multivariate FPCA extends the idea to several asynchronously observed covariates, but its cross-covariance burden grows quickly with the number of processes.

## Important Papers

- [[papers/asynchronous-and-error-prone-longitudinal-data-analysis-via-functional-calibration|Asynchronous and Error-prone Longitudinal Data Analysis via Functional Calibration]]
- Yao, Muller, and Wang (2005), "Functional data analysis for sparse longitudinal data."
- Li and Hsing (2010), "Uniform convergence rates for nonparametric regression and principal component analysis in functional/longitudinal data."
- Carroll et al. (2006), "Measurement Error in Nonlinear Models: A Modern Perspective."

## Related Concepts

- [[concepts/functional-principal-component-analysis|Functional Principal Component Analysis]]
- Regression calibration
- Sparse functional data
- Varying-coefficient models
- Measurement error
