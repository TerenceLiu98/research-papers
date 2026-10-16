---
title: Zador's Theorem
type: concept
aliases:
  - Zador Theorem
  - High-Resolution Quantization Asymptotics
tags:
  - quantization
  - asymptotic-analysis
---

## Overview

Zador's theorem describes the best achievable large-codebook distortion when a probability distribution on $\mathbb R^d$ is approximated by finitely many representatives. It relates the $n^{-1/d}$ scale of the optimal $L^r$ mean error to the density of the distribution's absolutely continuous component. This is a population approximation result as the number of representatives grows, distinct from statistical consistency as training sample size grows.

## Key Ideas

For Euclidean loss, define

$$
e_{r,n}(P)=\inf_{1\leq|\Gamma|\leq n}
\left(\int\min_{a\in\Gamma}|x-a|^r\,P(dx)\right)^{1/r}.
$$

If $r>0$, $h=dP^a/dx$, and $P$ has a finite $(r+\delta)$ moment for some $\delta>0$, the classical formula is

$$
\lim_{n\to\infty}n^{r/d}e_{r,n}(P)^r
=Q_{r,d}\left(\int h(x)^{d/(d+r)}\,dx\right)^{(d+r)/d},
$$

where $Q_{r,d}$ is the corresponding asymptotic constant for the uniform distribution on the unit cube. The mean error scales as $n^{-1/d}$ when the constant is positive; the expected $r$th-power distortion scales as $n^{-r/d}$. For purely singular distributions the displayed constant is zero, so a different normalization may be needed to describe the leading error.

- **Density and geometry:** Classical Euclidean quantization weights the density through the exponent $d/(d+r)$. In the Bregman extension of Boutoille and Pagès, the constant becomes $2^{-r/2}Q_{r,d}\|\det(\nabla^2F)^{r/(2d)}h\|_{L^{d/(d+r)}}$ for the objective based on $\phi_F^{r/2}$.
- **Conditions matter:** The Bregman equality requires a $C^2$ potential with positive-definite Hessian, appropriate integrability, and compact support inside its open convex domain or a bounded Hessian on a suitable interior region containing the support. It does not automatically cover support reaching a singular boundary of KL-type or Itakura-Saito potentials.
- **Normalization:** Taylor expansion gives $\phi_F(x,a)\approx\tfrac12(x-a)^T\nabla^2F(a)(x-a)$. For $F(x)=|x|^2$, the Hessian is $2I$, and its determinant factor cancels $2^{-r/2}$, recovering the classical formula.
- **Localization:** Firewall arguments add finitely many boundary representatives to control assignments between cells. They let local quadratic estimates yield a global lower bound even when the loss lacks a triangle inequality.
- **Scope:** An asymptotic optimum does not establish a finite-$n$ error bound for a computed codebook or prove that a local clustering algorithm reaches the optimum. Existence of exact minimizers is also a separate question.

## Important Papers

- [[papers/zador-theorem-for-optimal-quantization-with-respect-to-bregman-divergences|Zador Theorem for optimal quantization with respect to Bregman divergences]]: extends the asymptotic constant to Hessian-weighted Bregman geometry and provides a universal lower bound.
- Graf and Luschgy (2000), *Foundations of Quantization for Probability Distributions*: classical rigorous treatment, cited as the proof template by Boutoille and Pagès.
- Zador (1982), "Asymptotic quantization error of continuous signals and the quantization dimension": foundational reference listed in the ingested paper.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: codebooks and weighted discrete approximations of distributions.
- [[concepts/bregman-divergences|Bregman Divergences]]: the loss family whose Hessian changes the asymptotic constant.
