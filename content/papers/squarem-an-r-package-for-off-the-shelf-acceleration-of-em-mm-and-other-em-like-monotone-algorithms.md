---
title: "SQUAREM: An R Package for Off-the-Shelf Acceleration of EM, MM and Other EM-Like Monotone Algorithms"
type: paper
authors:
  - Yu Du
  - Ravi Varadhan
year: 2020
source_job_id: "fddfd26b-7c9a-47a4-85b7-29d922fe4a40"
tags:
  - convergence-acceleration
  - expectation-maximization
  - majorization-minimization
  - fixed-point-iteration
  - statistical-computing
---

## TL;DR

Du and Varadhan present the R package SQUAREM, which accelerates smooth, contractive fixed-point iterations with linear convergence, including EM, ECM, ECME, GEM, and MM algorithms. A user supplies one update of the original iteration and, optionally, an objective function; a squared extrapolation step then seeks faster progress while an objective-based safeguard controls non-monotone moves. Across Poisson mixtures, interval-censored survival estimation, ancestry estimation, logistic regression, and factor analysis, the reported examples require substantially fewer base-algorithm evaluations. The evidence is a collection of application benchmarks rather than a general guarantee of speedup, and the method can still fail on poorly identified problems.

## Research Question

Can a general-purpose extrapolation scheme accelerate slowly and linearly convergent EM-like algorithms without requiring model-specific derivatives or extensive tuning?

## Motivation

EM and MM replace difficult direct optimization with simple monotone updates, but their linear convergence can be prohibitively slow when missing information is large or parameter dimension is high. Model-specific accelerators can be difficult to derive and maintain. The paper therefore treats an existing update as a fixed-point map and asks whether [[concepts/squarem|SQUAREM]] can wrap that map with little additional implementation work.

## Contributions

- Describes SQUAREM as a reusable accelerator for smooth, contractive fixed-point maps with linear convergence.
- Presents the `squarem()` interface: users provide an initial parameter vector, a function implementing one fixed-point update, and optionally an objective function used to safeguard extrapolation.
- Demonstrates the same wrapper on EM, ECME, and quadratic-majorization updates across five statistical applications.
- Distinguishes SQUAREM iterations from evaluations of the underlying fixed-point map, using the latter for computational comparisons because one accelerated iteration typically invokes the map two or three times.

## Method

Let the base iteration be $\theta_{n+1}=F(\theta_n)$. Starting from $\theta_0$, SQUAREM evaluates

$$
\theta_1=F(\theta_0), \qquad \theta_2=F(\theta_1),
$$

forms $r=\theta_1-\theta_0$ and $v=(\theta_2-\theta_1)-r$, and extrapolates

$$
\theta_{\mathrm{sq}}=\theta_0-2\alpha r+\alpha^2v.
$$

The default step-length choice described in the paper is $\alpha=-\lVert r\rVert/\lVert v\rVert$. If an objective $L$ is supplied, the extrapolated point is accepted when it meets the permitted objective-change condition; otherwise the method falls back to $\theta_2$. An accepted extrapolation receives a further stabilization update $F(\theta_{\mathrm{sq}})$. This safeguard is what connects fast local extrapolation to the desired global, nearly monotone behavior.

In the R package, `fixptfn` implements one base update and `objfn` supplies the merit function. The objective is optional, but the authors recommend it when inexpensive because it guards the extrapolated step. The tolerance checks the fixed-point residual. The package also exposes the step-length method, extrapolation order, and permitted objective increase; the paper reports that the defaults generally work well.

## Experiments

### Poisson Mixture

For a two-component Poisson mixture fitted to London Times mortality counts, EM uses 2,696 fixed-point evaluations and 0.039 seconds, while SQUAREM uses 54 evaluations and about 0.002 seconds from the reported starting point. Across 5,000 random starts, the median counts are 3,140 for EM and 101 for SQUAREM; median times are 0.039 and 0.003 seconds, respectively (Table 2).

### Interval Censoring

On 46 interval-censored observations, EM uses 216 updates and SQUAREM 40, with reported elapsed times of 0.009 and 0.002 seconds. In simulations, mean fixed-point counts are 6,746 versus 446 at $n=200$ and 13,398 versus 792 at $n=2{,}000$ (Table 5). The specialized EM-ICM method is also competitive and is fastest in the larger-sample timing comparison; unlike SQUAREM, it is tailored to interval censoring.

### Genetics Admixture

For a simulated ancestry problem with 150 individuals, 100 markers, and three ancestral populations, EM takes 1,115 fixed-point evaluations and 203.040 seconds. SQUAREM takes 270 evaluations and 48.869 seconds. The authors note that their R implementation is still slower than a specialized block-relaxation implementation, so this example demonstrates acceleration of the supplied EM map rather than state-of-the-art ancestry estimation.

### Logistic Regression by MM

On cancer-remission data, squared uniform-bound quadratic majorization reduces the reported update count from 1,127 to 118 and elapsed time from 0.055 to 0.011 seconds. Squared non-uniform majorization reduces 442 updates to 88 and time from 0.030 to 0.009 seconds. Across 500 random starts, mean update counts are 2,068 versus 273 for uniform-bound MM and 419 versus 80 for non-uniform-bound MM (Table 6).

### Factor Analysis

For the Joreskog factor-analysis example, EM, ECME, SQUAREM-accelerated EM, and SQUAREM-accelerated ECME require 14,659, 6,408, 876, and 400 base updates, respectively. The corresponding single-run times reported in the text are 2.834, 1.409, 0.233, and 0.117 seconds. A simulation with 200 observations, 32 variables, and four factors reports at least a tenfold advantage for SQUAREM over EM in most cases shown in Figure 5.

## Limitations

- SQUAREM assumes a smooth, contractive fixed-point map with linear convergence; the examples do not establish gains outside that setting.
- The paper explicitly warns that SQUAREM is not guaranteed to work on poorly identified problems where the underlying EM algorithm may itself fail.
- Objective-based safeguarding adds evaluations and may reject extrapolated steps. Its overhead matters when the objective is expensive relative to the fixed-point update.
- Runtime comparisons were made on one quad-core 2.3 GHz Intel Core i7 Mac and use small elapsed times in several examples. Fixed-point evaluation counts are more portable than the timing ratios.
- The demonstrations compare selected datasets, simulations, starts, and tolerances. Specialized solvers can outperform the general wrapper, as acknowledged for interval censoring and ancestry estimation.
- The convergence criterion is parameter based and described as stringent for high-dimensional problems; alternative objective-based criteria were left for future package versions.

## Related Concepts

- [[concepts/squarem|SQUAREM]]: squared extrapolation with a merit-function safeguard for EM-like fixed-point iterations.
- Expectation-maximization: the principal monotone, linearly convergent algorithm family accelerated in the paper.
- Majorization-minimization: a broader optimization-transfer family demonstrated through quadratic logistic-regression updates.
- Fixed-point iteration: the abstraction that lets the same acceleration wrapper apply beyond missing-data models.

## Related Papers

- Varadhan and Roland (2008), "Simple and Globally Convergent Methods for Accelerating the Convergence of Any EM Algorithm": the cited methodological foundation for SQUAREM.
- Roland and Varadhan (2005), "New Iterative Schemes for Nonlinear Fixed Point Problems, with Applications to Problems with Bifurcations and Incomplete-Data Problems": an earlier squared-iteration development.
- Zhou, Alexander, and Lange (2011), "A Quasi-Newton Acceleration for High-Dimensional Optimization Algorithms": a related accelerator discussed by the authors.
- Dempster, Laird, and Rubin (1977), "Maximum Likelihood from Incomplete Data via the EM Algorithm": the foundational EM reference.
- Lange, Hunter, and Yang (2000), "Optimization Transfer Using Surrogate Objective Functions": the cited MM reference.

Source: Du and Varadhan (2020), supplied paper text. The supplied Markdown does not state a DOI, journal volume, issue, or page range.

[[index|Library home]]
