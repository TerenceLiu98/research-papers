---
title: Normal Mode Copulas
type: concept
aliases:
  - Normal Mode Copula
definition: "A family of bivariate copulas that adds a separable sinusoidal term to the independence copula, using integer mode numbers to represent monotonic or nonmonotonic dependence."
tags:
  - copulas
  - dependence-modeling
---

## Overview

Normal mode copulas separate marginal distributions from dependence while allowing dependence patterns to change direction. They are a simplified member of Chesneau's trigonometric copula construction, with a continuous amplitude and two positive integer mode numbers.

## Key Ideas

For $u,v\in[0,1]$,

$$
C(u,v)=uv+\frac{\theta\sin(\kappa_1\pi u)\sin(\kappa_2\pi v)}{\kappa_1\kappa_2\pi^2},
\qquad -1\leq\theta\leq1.
$$

The density is $c(u,v)=1+\theta\cos(\kappa_1\pi u)\cos(\kappa_2\pi v)$. The amplitude controls the departure from independence; $\theta=0$ gives the product copula. Integer mode numbers govern alternating regions of higher and lower density. The (1,1) case accommodates monotonic dependence, while higher modes can capture reversals. Mode numbers are selected as model specifications.

This is useful when latent groups have oppositely signed relationships, so their aggregate dependence is poorly represented by a monotonic family. A flexible copula remains a distributional assumption; it does not automatically identify causal effects under unobserved confounding.

## Important Papers

- [[papers/normal-mode-copulas-for-nonmonotonic-dependence|Normal Mode Copulas for Nonmonotonic Dependence]]: names the simplified family and applies it to joint government formation and duration modeling.
- Chesneau (2021), “On New Types of Multivariate Trigonometric Copulas”: introduces the broader trigonometric construction.

## Related Concepts

- [[concepts/meta-gaussian-distributions|Meta-Gaussian Distributions]]: another way to combine arbitrary continuous margins with a specified copula; the Gaussian dependence restriction differs from the oscillating patterns available here.
