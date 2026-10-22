---
title: SQUAREM
type: concept
aliases:
  - Squared Iterative Methods
  - Squared Extrapolation Methods
tags:
  - convergence-acceleration
  - fixed-point-iteration
  - expectation-maximization
  - majorization-minimization
---

## Overview

SQUAREM accelerates a smooth, contractive fixed-point iteration by extrapolating from two consecutive applications of its update map. It was designed for slowly and linearly convergent EM-like algorithms, but its interface only requires a map $F(\theta)$ and can therefore wrap EM, ECM, ECME, GEM, MM, or another suitable fixed-point method. An optional objective function safeguards extrapolated proposals.

## Key Ideas

- **Wrap one update:** The application supplies a function implementing $\theta_{n+1}=F(\theta_n)$ rather than derivatives, an information matrix, or a model-specific acceleration derivation.
- **Estimate local motion:** Two base updates define a first difference $r=F(\theta)-\theta$ and a change in that difference $v=F(F(\theta))-2F(\theta)+\theta$.
- **Squared extrapolation:** The proposal $\theta_{\mathrm{sq}}=\theta-2\alpha r+\alpha^2v$ approximates a squared error transformation. The commonly used step length in Du and Varadhan is $\alpha=-\lVert r\rVert/\lVert v\rVert$.
- **Safeguard the proposal:** When a merit function is available, an extrapolated step that violates the allowed objective change is replaced by the second ordinary fixed-point iterate. Accepted proposals receive a stabilization update.
- **Count base evaluations:** One SQUAREM iteration normally calls the original update two or three times. Comparisons should therefore report fixed-point evaluations, not only outer iterations.
- **Preserve scope conditions:** The intended setting is a smooth contraction with linear convergence. Acceleration does not cure non-identification, guarantee a global optimum for a multimodal objective, or ensure improvement over a specialized solver.
- **Balance safeguards and cost:** Objective checking supports global behavior but can waste work when a proposal is rejected. The wrapper is most attractive when the objective is cheaper than the base update.

## Important Papers

- [[papers/squarem-an-r-package-for-off-the-shelf-acceleration-of-em-mm-and-other-em-like-monotone-algorithms|SQUAREM: An R Package for Off-the-Shelf Acceleration of EM, MM and Other EM-Like Monotone Algorithms]]: presents the R interface and benchmarks across mixture estimation, interval censoring, ancestry estimation, logistic regression, and factor analysis.
- Varadhan and Roland (2008), "Simple and Globally Convergent Methods for Accelerating the Convergence of Any EM Algorithm": establishes the SQUAREM methodology cited by Du and Varadhan.
- Roland and Varadhan (2005), "New Iterative Schemes for Nonlinear Fixed Point Problems, with Applications to Problems with Bifurcations and Incomplete-Data Problems": develops earlier squared iterative schemes.

## Related Concepts

- Expectation-maximization: a monotone fixed-point procedure whose local rate is governed by the fraction of missing information.
- Majorization-minimization: optimization by repeatedly minimizing a tractable surrogate that touches and bounds the target objective.
- Fixed-point iteration: repeated application of a map until the residual $\lVert F(\theta)-\theta\rVert$ is small.
- Convergence acceleration: transformations that reduce the error of an existing iterative sequence while retaining appropriate safeguards.
