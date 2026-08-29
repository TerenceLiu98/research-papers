---
title: "Gradient Synchronization for Multivariate Functional Data, with Application to Brain Connectivity"
type: paper
authors:
  - Yaqing Chen
  - Shu-Chin Lin
  - Yang Zhou
  - Owen Carmichael
  - Hans-Georg Müller
  - Jane-Ling Wang
year: null
tags:
  - functional-data-analysis
  - dynamic-functional-connectivity
  - fmri
  - alzheimers-disease
  - synchronization-measures
---

## TL;DR

This paper introduces gradient synchronization (GS), which measures how often two smooth random curves increase or decrease together, and gradient synchronization fluctuation (GSF), which counts switches between concordant and discordant gradients. The estimators are asymptotically normal under regularity conditions and, in an ADNI resting-state fMRI analysis, distinguish cognitive groups more strongly than temporal Pearson correlation, although GSF can be substantially biased when the observation grid is too coarse and both measures are sensitive to unfiltered noise.

## Research Question

Can association between components of multivariate functional data be measured through their local rates of change, and do derivative-based measures reveal dynamic brain connectivity patterns that static or sliding-window Pearson correlations miss?

## Motivation

Temporal Pearson correlation remains a common measure of fMRI functional connectivity, but it summarizes an entire pair of signals and does not directly describe how their relationship changes over time. Sliding-window correlations add temporal localization but depend on the chosen window and still estimate local level correlation. The paper instead asks whether concordance and discordance between curve derivatives can provide an individual-level, time-dynamic measure of functional association without assuming temporal stationarity.

## Contributions

- Defines the gradient synchronization function as the sign of the product of two curve derivatives and shows that it is the limiting local correlation as segment width approaches zero.
- Defines GS as the time integral of derivative-sign concordance and population GS as its expectation.
- Defines GSF as the number of switches between concordant and discordant gradients, providing a complementary measure of synchronization stability.
- Gives estimators based on first differences on an observation grid and establishes consistency and asymptotic normality under smoothness, zero-crossing, moment, and grid-density conditions.
- Evaluates finite-sample behavior in simulations and applies static and sliding-window versions of GS and GSF to resting-state fMRI connectivity across cognitive groups in the Alzheimer's Disease Neuroimaging Initiative (ADNI).

## Method

For paired differentiable curves $X(t)$ and $Y(t)$, the local synchronization function is

$$
S_{XY}(t)=\operatorname{sign}\{X'(t)Y'(t)\}.
$$

It equals $1$ when the curves locally move in the same direction, $-1$ when they move in opposite directions, and $0$ when either derivative is zero. Subject-level GS integrates this function over the time domain,

$$
R=\int_0^1 S_{XY}(t)\,dt,
$$

so its population value summarizes the expected balance between gradient concordance and discordance. GSF counts sign changes of $S_{XY}$ and therefore measures how often synchronization switches direction.

With observations on a grid, derivatives are replaced by adjacent difference quotients. GS becomes a grid-width-weighted sum of derivative-product signs, while GSF counts sign changes between adjacent intervals. Sample means estimate population GS and either a grid-dependent or grid-independent population GSF. The asymptotic results require continuously differentiable paths and finite zero crossings; inference for GSF imposes stronger moment, nondegeneracy, and zero-crossing-frequency conditions. Targeting grid-independent quantities also requires the maximum grid spacing to shrink faster than $n^{-1/2}$.

## Experiments

The simulation study uses 1,000 replications with sample sizes $n=50,200,1000$ and grids of $J=100,200,500$ intervals. The GS estimator approaches its target as sample size and grid density increase, and its reported 95% confidence-interval coverage ranges from 0.930 to 0.956. Coverage for grid-dependent GSF ranges from 0.932 to 0.957. Estimating grid-independent GSF is harder: the reported bias is -88.130 at $J=100$ and -23.060 at $J=500$ for $n=50$, because changes inside observation intervals cannot be detected. Additional simulations show poor GS and GSF estimation from raw noisy curves, especially on dense grids, while band-pass filtering substantially reduces bias and variance.

The fMRI study includes 533 ADNI participants in six groups: cognitively normal, subjective memory concerns, early mild cognitive impairment, mild cognitive impairment, late mild cognitive impairment, and Alzheimer's dementia. Each selected scan has 197 time points. After standard preprocessing and 0.01-0.1 Hz band-pass filtering, the analysis averages signals within 11 default-network regions, producing 55 region pairs.

For mean connectivity magnitude across the 55 pairs, Kruskal-Wallis p-values across the six groups are 0.63 for temporal Pearson correlation, $2.1\times10^{-61}$ for GS, and $2.3\times10^{-36}$ for GSF. After Bonferroni correction across the 15 group-pair comparisons, GS distinguishes 14 pairs and GSF distinguishes 10, while temporal Pearson correlation distinguishes none. Sliding-window analyses likewise find larger group differences for dynamic GS and GSF than for dynamic Pearson correlation. Test-retest analyses report broadly comparable individual stability; GSF is as stable as Pearson correlation across the larger 190-pair network analysis, while GS is slightly less stable there.

## Limitations

The theoretical results depend on smooth sample paths, finite and sufficiently well-behaved derivative zero crossings, nondegeneracy conditions, and increasingly dense observation grids. Coarse grids systematically miss within-interval synchronization switches, so grid-based GSF can severely underestimate its grid-independent target; the paper leaves bias correction for future work. Both proposed measures perform poorly on unfiltered noisy observations in the reported simulations, making preprocessing consequential despite the method not requiring a smoothing-parameter choice. The ADNI evidence is observational, uses selected scans with a common number of time points, and has strongly unequal cognitive-group sizes, so the discrimination results do not by themselves establish causal disease mechanisms or external generalization.

## Related Concepts

- [[Gradient Synchronization]]
- [[Neuroimaging Data Analysis]]
- [[Nonstationary Functional Time Series]]
- Functional data analysis
- Dynamic functional connectivity
- Resting-state fMRI

## Related Papers

- [[Statistical Opportunities in Neuroimaging]]
- Dubin and Mueller (2005), "Dynamical correlation for multivariate longitudinal data."
- Lindquist et al. (2014), "Evaluating dynamic bivariate correlations in resting-state fMRI: A comparison study and a new approach."
- Choe et al. (2017), "Comparing test-retest reliability of dynamic functional connectivity methods."

[[index|Library home]]
