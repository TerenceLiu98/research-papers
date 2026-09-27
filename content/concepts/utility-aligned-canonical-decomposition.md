---
title: Utility-Aligned Canonical Decomposition
type: concept
aliases:
  - UACD
tags:
  - multivariate-analysis
  - experimental-design
  - cost-aware-evaluation
---

## Overview

Utility-Aligned Canonical Decomposition (UACD) compares the dominant covariance-adjusted direction of an experimental treatment effect with a pre-specified utility direction. In the originating agent-evaluation study, reasoning effort can change model quality, cost, and process complexity simultaneously. UACD describes which response composite changes most relative to residual variation and whether that composite points toward the chosen quality-cost preference.

## Key Ideas

**Separate three questions.** A MANOVA omnibus test asks whether treatment changes the response vector in any direction. A directed regression tests whether the treatment improves a fixed scalar utility. UACD describes the shape and utility alignment of the multivariate effect. These are different statistical targets.

**Use the treatment and residual covariance structure.** For multivariate regression response matrix $Y$, let $H_f$ be the full-model projection and $H_r$ the reduced-model projection that omits treatment terms. Define

$$
S_H=Y^\top(H_f-H_r)Y,\qquad
S_E=Y^\top(I-H_f)Y.
$$

The leading direction maximizes $a^\top S_Ha/(a^\top S_Ea)$, equivalently solving $S_Ha=\lambda S_Ea$. With two effort contrasts, the hypothesis effect has rank at most two. When their eigenvalue sum is positive, $\pi=\lambda_1/(\lambda_1+\lambda_2)$ measures concentration in the leading canonical direction.

**Orient before interpreting alignment.** Normalize $a_1$ to Euclidean unit length and choose its sign so $a_1^\top\hat\beta_L>0$, where $\hat\beta_L$ is the linear treatment coefficient vector. For unit-length utility vector $u$, $\eta=a_1^\top u$ is a signed cosine. The source uses $u=(1/2,1/2,-1/2,-1/2,0,0,0,0)^\top$ on standardized quality, cost, and process responses. Negative alignment describes a leading direction opposed to this preference. If the orientation dot product is zero, this sign convention does not resolve the direction's sign.

**Do not equate alignment with a utility effect.** The actual linear utility slope is $u^\top\hat\beta_L$. In a rank-one linear-effect analysis, $a_1$ is proportional to $\hat\Sigma^{-1}\hat\beta_L$, so covariance adjustment generally changes the direction. Inference about utility should use the directed slope and its uncertainty, not the cosine alone.

**Respect estimation and preference uncertainty.** Small samples relative to response dimension can make canonical directions unstable. Near-unit concentration does not establish a precisely estimated direction or a significant omnibus effect. Utility weights and standardization also determine the meaning of alignment. In the source study, weak bootstrap identification leads the authors to interpret alignment signs descriptively; the shared design makes an across-stratum sign test only approximate.

## Important Papers

- [[papers/an-experimental-design-approach-to-evaluating-agentic-ais-autonomous-model-discovery|An Experimental Design Approach to Evaluating Agentic AI's Autonomous Model Discovery]] introduces UACD in Section 4.2. Its eight strata have leading canonical shares of 0.84-0.99 and negative alignment throughout, while formal utility inference comes from a separate pre-specified directed contrast.

## Related Concepts

- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]] motivates the quality-cost preference used to interpret a multivariate effect.
