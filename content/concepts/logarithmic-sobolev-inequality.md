---
title: Logarithmic Sobolev Inequality
type: concept
tags:
  - functional-inequalities
  - markov-processes
---

## Overview

A logarithmic Sobolev inequality (LSI) bounds entropy by gradient energy. In the rate convention used here,

$$
\mathbb E_\pi\|\nabla f\|^2\ge\frac{\lambda}{2}\operatorname{Ent}_\pi(f^2),
\qquad \operatorname{Ent}_\pi(g)=\mathbb E_\pi[g\log g]-\mathbb E_\pi[g]\log\mathbb E_\pi[g].
$$

## Key Ideas

For reversible overdamped Langevin diffusion with noise coefficient $\sqrt2$, LSI gives relative-entropy decay at rate $2\lambda$ for finite initial entropy. It implies PI with rate at least $\lambda$, Gaussian concentration of Lipschitz observables, and hypercontractivity under the usual semigroup assumptions.

Uniform strong log-concavity with curvature $\rho>0$ gives $\lambda\ge\rho$. Products preserve the smallest component rate, and bounded perturbations and Lipschitz transports permit extensions beyond strong log-concavity. PI alone does not imply LSI. Initial point masses require smoothing before entropy decay can be applied, and coupling contraction alone does not guarantee entropy contraction.

## Important Papers

- [[papers/geometric-functional-inequalities-for-markov-processes-an-invitation-via-the-langevin-diffusion|Geometric Functional Inequalities for Markov Processes: An Invitation via the Langevin Diffusion]]: tutorial deriving the inequality’s dynamical meaning and transfer principles (Sections 2.2–2.6).

## Related Concepts

- [[concepts/poincare-inequality]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
