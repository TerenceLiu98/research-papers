---
title: Warping Processes
type: concept
aliases:
  - Stochastic Warping Functions
  - Random Warp Maps
tags:
  - functional-data-analysis
  - functional-registration
  - phase-variation
  - stochastic-processes
---

## Overview

A warping process is a stochastic process whose realizations are monotone, boundary-preserving transformations of a common domain. In [[Functional Registration]], individual realizations represent phase variation: they change where features occur while preserving their order. A useful simulator must respect these shape constraints while giving the analyst meaningful control over its center, dispersion, and path regularity.

## Key Ideas

- For a normalized domain, a common state space consists of strictly increasing continuous functions $w:[0,1]\to[0,1]$ satisfying $w(0)=0$ and $w(1)=1$.
- Piecewise-linear constructions can sample ordered knots or cumulative random increments. Dirichlet-distributed increments enforce positivity and the unit-sum constraint automatically.
- A cumulative distribution function is itself a monotone map, which connects warping simulation to randomized and smoothed empirical CDFs.
- Mean and variance depend on the geometry being used. Pointwise moments, $L^2$ risk, and intrinsic Frechet moments of a warping-function space are different targets and need not agree under nonlinear transformations.
- Concentration parameters can regulate dispersion, but finite interpolation grids may contribute additional variation. Inference therefore depends on the relative sizes of the grid resolution and concentration parameter.

## Important Papers

- [[Simulation of Warping Processes with Applications to Temperature Data]]
- Bharath and Kurtek (2020), "Distribution on Warp Maps for Alignment of Open and Closed Curves."
- Ma, Zhou, and Wu (2024), "A Stochastic Process Representation for Time Warping Functions."
- Cheng, Dryden, and Huang (2016), "Bayesian Registration of Functions and Curves."

## Related Concepts

- [[Functional Registration]]
- [[Dynamic Time Warping]]
- [[Functional Principal Component Analysis]]
- Karhunen-Loeve expansion
- Dirichlet distribution
