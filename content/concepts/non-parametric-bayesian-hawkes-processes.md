---
title: Non-parametric Bayesian Hawkes Processes
type: concept
aliases:
  - Bayesian Nonparametric Hawkes Processes
tags:
  - hawkes-processes
  - bayesian-inference
  - gaussian-processes
  - temporal-point-processes
---

## Overview

A non-parametric Bayesian Hawkes process learns a flexible, nonnegative triggering kernel and uncertainty about that kernel. Its conditional intensity separates background arrivals from self-excitation by earlier events:

$$
\lambda(t)=\mu+\sum_{t_i<t}\phi(t-t_i).
$$

In the constructions studied by Zhang (2022, Chapters 3-4), a squared Gaussian process supplies the triggering kernel, while latent branching assignments connect Hawkes inference to Poisson-process inference.

## Key Ideas

- **Branching augmentation:** Each event is assigned either to the background or to a previous event. Conditional on these assignments, offspring sequences can be aligned relative to their parents and used to estimate a shared kernel.
- **Positive GP transformations:** Squaring a latent GP ensures a nonnegative kernel. Chapter 3 uses $\phi=f^2/2$ and a finite eigenfunction approximation; Chapter 4 uses $\phi=f^2$ and inducing points. Continuous event locations are retained despite finite computational representations.
- **Two approximation strategies:** Gibbs-Hawkes samples branching structures and model quantities with a Laplace approximation inside the sampler. VBHP instead factorizes the variational posterior and uses EM-like updates. These are approximate posterior methods.
- **Bounded parent search:** Restricting non-negligible triggering to a compact region reduces event-pair calculations. Linear runtime in event count additionally assumes a bounded number of candidate parents and fixed approximation size; a finite time window alone does not ensure that bound.
- **Model selection and evaluation:** VBHP uses CELBO for variational updates and the thesis's proposed TELBO for hyperparameter/support selection. Held-out likelihood and recovery of a known kernel measure different properties: a correctly specified parametric exponential kernel can win kernel-recovery comparisons.
- **Interpretation limits:** A fitted parent assignment or decay curve expresses a model of excitation. Content-longevity interpretations of social-media kernels do not themselves establish causal mechanisms.

## Important Papers

- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: Chapters 3-4 compare Laplace/Gibbs and sparse variational approaches, with synthetic and Twitter-cascade evaluations.
- Zhang et al. (2019), "Efficient non-parametric Bayesian Hawkes processes," and Zhang, Walder, and Rizoiu (2020), "Variational inference for sparse Gaussian process modulated Hawkes process," are the corresponding component studies identified in the thesis.

## Related Concepts

- [[concepts/quantile-propagation|Quantile Propagation]]: A GP inference method discussed as a future extension to Hawkes processes; the thesis does not implement that extension.
- [[concepts/kernel-maximum-moment-restriction|Kernel Maximum Moment Restriction]]: A broader estimation framework proposed for possible point-process applications, but evaluated on IV regression in this thesis.
