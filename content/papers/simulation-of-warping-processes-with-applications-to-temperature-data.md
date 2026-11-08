---
title: "Simulation of Warping Processes with Applications to Temperature Data"
type: paper
authors:
  - Nolwenn Le Méhauté
  - Jean-François Coeurjolly
  - Marie-Hélène Descary
year: null
source_job_id: "cec2c137-b2b5-40cc-a67e-0bd59ea8fbed"
tags:
  - functional-data-analysis
  - functional-registration
  - warping-processes
  - dirichlet-distribution
  - temperature-distributions
---

## TL;DR

This paper studies how to simulate continuous [[Warping Processes]] with a prescribed pointwise mean and controllable variance. It analyzes the Bharath-Kurtek (BK) method, modifies a geometric Karhunen-Loeve method, and introduces a randomized empirical-CDF method. The BK and CDF constructions have asymptotically targeted means and variances, while the geometric method controls Frechet rather than pointwise moments. A Canadian temperature application uses the CDF method for bootstrap confidence bands around changes in period-specific temperature distributions.

## Research Question

How can one generate continuous, strictly increasing, boundary-preserving warping functions whose pointwise expectation approaches a chosen target and whose variability is controlled by an interpretable parameter?

## Motivation

[[Functional Registration]] separates amplitude variation from phase variation, but evaluating registration procedures and building stochastic phase models requires realistic simulated warpings. Existing work offered two materially different constructions, yet their operational details and moment behavior were not fully aligned with the paper's pointwise objectives. The authors therefore compare them under common criteria and develop an alternative based on cumulative distribution functions.

## Contributions

- Gives operational descriptions of three warping-process simulators and corrects typographical ambiguities in the published description of the BK algorithm.
- Derives explicit first and second pointwise moments for the BK and new CDF algorithms, including $O(1/n)$ convergence of their means and variances.
- Introduces the CDF algorithm, which polygonally smooths a randomly weighted empirical distribution function and uses a Dirichlet concentration parameter to control variability.
- Reparameterizes the Ma-Zhou-Wu (MZW) construction around a target warping and establishes control of its Frechet mean and variance in its intrinsic geometry.
- Develops moment-based concentration-parameter estimators and uses the CDF simulator in a parametric bootstrap analysis of Canadian hourly temperature distributions.

## Method

All three procedures return monotone maps of $[0,1]$ onto itself. The BK algorithm samples uniform interpolation knots, draws Dirichlet increments whose parameters depend on the target warping $\varphi$, cumulatively sums those increments, and linearly interpolates the resulting points. The CDF algorithm instead transforms uniform order statistics by $\varphi^{-1}$, assigns Dirichlet weights with common parameter $\theta/n$, and applies polygonal interpolation controlled by a parameter $p$.

For both algorithms, the pointwise mean approaches $\varphi(t)$ at rate $O(1/n)$ and the variance approaches

$$
\frac{\varphi(t)(1-\varphi(t))}{1+\theta}
$$

at rate $O(1/n)$. A refined CDF expansion adds a $\varphi(t)(1-\varphi(t))/n$ term away from the boundaries, motivating a finite-$n$ correction when estimating $\theta$.

The modified MZW algorithm maps a truncated Karhunen-Loeve expansion into a differentiable warping space through a nonlinear isometry. Centering the expansion at the transformed target gives $\varphi$ as the Frechet mean and $(1+\theta)^{-1}\sum_{i=1}^m \nu_i$ as the Frechet variance. Because the inverse map is nonlinear, these geometric guarantees do not imply pointwise mean matching.

## Experiments

The numerical study simulates warpings around four targets using BK, CDF, and MZW. For BK and CDF, empirical means approach the targets as the interpolation count increases, and dispersion declines as $\theta$ increases. The MZW pointwise empirical mean can remain separated from its target even at large truncation orders, consistent with its different geometric objective. Across the reported Monte Carlo $L^2$ risks, BK and CDF show no clear accuracy ordering; the authors favor CDF for its simpler constant Dirichlet parameters and greater numerical stability. Simulations do not identify a uniformly best polygonal parameter $p$, so subsequent analyses use $p=0.5$.

The concentration-parameter study compares an estimator based only on the limiting variance with a finite-$n$ corrected estimator. The correction matters when $n$ and $\theta$ have similar magnitude; neither estimator is reliable when $n\ll\theta$ because interpolation-order variation dominates the concentration term.

For the application, hourly temperatures spatially averaged over Canada are grouped into overlapping 30-year periods from 1951-1980 through 2001-2025. Annual empirical quantile functions are expressed relative to the 1951-1980 reference distribution as warping functions. The fitted CDF models have estimated concentration parameters near 350 and annual sample sizes near 8,760. Parametric-bootstrap 95% simultaneous bands for 1981-2010, 1991-2020, and 2001-2025 remain above the identity reference, which the authors interpret as increasingly upward-shifted temperature distributions.

## Limitations

- BK and CDF produce continuous piecewise-linear paths; smoother warpings require an additional construction whose properties are not developed here.
- The MZW method controls moments in its intrinsic geometry, not the pointwise criteria used to favor BK and CDF, so the comparison reflects different modeling objectives.
- The proposed estimators for the target mean and concentration parameter do not receive a complete asymptotic analysis.
- The temperature analysis treats annual warping curves as independent and models spatially averaged national data; temporal dependence and regional spatial structure remain unmodeled.
- The bootstrap uses 100 replications and a common within-period interpolation count, including for leap years.
- No publication year or stable article identifier appears in the supplied source.

## Related Concepts

- [[Warping Processes]]
- [[Functional Registration]]
- [[Functional Principal Component Analysis]]
- Karhunen-Loeve expansion
- Dirichlet distribution

## Related Papers

- Bharath and Kurtek (2020), "Distribution on Warp Maps for Alignment of Open and Closed Curves."
- Ma, Zhou, and Wu (2024), "A Stochastic Process Representation for Time Warping Functions."
- Marron et al. (2015), "Functional Data Analysis of Amplitude and Phase Variation."
- [[Sequential Bayesian Registration for Functional Data]]

[[index|Library home]]
