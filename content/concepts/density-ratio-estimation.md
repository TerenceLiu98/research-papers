---
title: Density Ratio Estimation
type: concept
aliases:
  - DRE
  - Direct Density Ratio Estimation
tags:
  - density-ratio-estimation
  - statistical-learning
---

## Overview

Density ratio estimation learns $r^*(x)=p_{\mathrm{nu}}(x)/p_{\mathrm{de}}(x)$ from samples of two distributions. Direct methods fit the ratio without separately estimating both densities. The ratio is defined on the denominator support, which must cover the numerator distribution for importance-weighting identities to apply.

## Key Ideas

- **Change of measure:** $\mathbb E_{\mathrm{nu}}g(X)=\mathbb E_{\mathrm{de}}[r^*(X)g(X)]$ for suitable integrable functions. In particular, $\mathbb E_{\mathrm{de}}r^*=1$.
- **Bregman fitting:** For a suitable convex generator $f$, minimizing expected divergence from $r^*$ to a model $r$ reduces, up to a constant, to $\mathbb E_{\mathrm{de}}[f'(r)r-f(r)]-\mathbb E_{\mathrm{nu}}f'(r)$. A quadratic generator yields the LSIF objective $\tfrac12\mathbb E_{\mathrm{de}}r^2-\mathbb E_{\mathrm{nu}}r$.
- **Flexible-model overfitting:** Separate empirical averages can reward extreme predictions on numerator samples while penalizing only denominator samples. Low training loss need not imply an accurate population ratio.
- **Inlier scoring:** With numerator density from inliers and denominator density from an unlabeled mixture, large ratios indicate greater compatibility with inliers. This setting requires mixture samples as well as inlier examples.
- **PU connection:** If the mixture has positive-class prior $\pi$, then $p(Y=+1\mid x)=\pi p(x\mid Y=+1)/p(x)$ and the unscaled ratio is bounded by $1/\pi$.

## Important Papers

- Kanamori, Hido, and Sugiyama (2009), "A least-squares approach to direct importance estimation": develops least-squares ratio fitting.
- [[papers/non-negative-bregman-divergence-minimization-for-deep-direct-density-ratio-estimation|Non-Negative Bregman Divergence Minimization for Deep Direct Density Ratio Estimation]]: corrects empirical objectives to stabilize flexible neural ratio models.

## Related Concepts

- [[concepts/bregman-divergences|Bregman Divergences]]: unifies multiple ratio-fitting losses.
- [[concepts/non-negative-risk-correction|Non-Negative Risk Correction]]: controls empirical violations of a population sign constraint under a ratio bound.
