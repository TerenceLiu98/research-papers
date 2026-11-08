---
title: Stopgrad Regression Principle
type: concept
aliases:
  - Stop-Gradient Regression Principle
  - Stopgrad Fixed-Point Regression
tags:
  - stop-gradient
  - optimization
  - fixed-points
---

## Overview

The Stopgrad Regression Principle characterizes stationary points of self-referential regression objectives whose learned function appears once outside a stop-gradient target. It converts the semi-gradient stationarity question into a fixed-point equation involving the target evaluated at the conditional mean label.

## Key Ideas

Let the stopped target be affine in a random label $y$:

$$
T[f,y](x)=P[f](x)+Q[f](x)y+R(x)y.
$$

For the regression functional

$$
\mathcal L[f]=\frac12\mathbb E\left[\left\|f(x)-\operatorname{SG}\{T[f,y](x)\}\right\|^2\right],
$$

the stop-gradient blocks variations through $T$. Under the principle's support and regularity conditions, the semi-gradient is

$$
g[f](x)=f(x)-T[f,\mathbb E[y\mid x]](x),
$$

and stationarity is equivalent to $g[f]=0$ on the input distribution's support. Thus stationary points are fixed points of the conditional target operator, even when the update field is non-conservative and is not the gradient of any scalar functional.

The principle characterizes the stationary set but does not automatically prove existence, uniqueness, stability, or convergence. A useful sufficient condition is additive label noise: the coefficient multiplying $y$ is independent of $f$. If the ordinary regression loss has an attainable minimizer at its conditional-variance floor, that minimizer is then the unique stationary point. Without additive noise, uniqueness may still follow from problem-specific structure, as in the MeanFlow transport equation.

A unit semi-gradient step formally resembles fixed-point iteration, but practical parameter updates need not implement an exact function-space step. The principle therefore separates three questions that are often conflated: what equations stationary points satisfy, whether those equations have the desired unique solution, and whether a chosen optimization process converges to it.

## Important Papers

- [[papers/how-i-learned-to-stop-worrying-and-love-stopgrads|How I Learned to Stop Worrying and Love StopGrads]]: introduces the principle, formalizes functional semi-gradients, and applies it to flow maps, temporal-difference learning, Q-learning, and diffusion-sampler objectives.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]: MeanFlow is a non-additive-label application whose unique stationary point requires a transport-equation argument.
- [[concepts/flow-matching|Flow Matching]]: supplies velocity labels and boundary behavior in the flow-map applications.
- [[concepts/diffusion-models|Diffusion Models]]: diffusion samplers provide another application of stopped self-referential regression.
