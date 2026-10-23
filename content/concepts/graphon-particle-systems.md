---
title: Graphon Particle Systems
type: concept
aliases:
  - Graphon mean-field systems
tags:
  - graphons
  - interacting-particle-systems
  - mean-field-limits
  - stochastic-processes
---

## Overview

Graphon particle systems are heterogeneous interacting-particle models in which a [[concepts/graphons|graphon]] weights the influence of one continuum label on another. They extend classical mean-field systems by replacing a single population average with label-specific interaction measures, while finite systems use discretized graphon weights between particles.

## Key Ideas

- **A continuum of interaction types.** Each label $u\in[0,1]$ has a graphon section $G(u,\cdot)$ that determines how strongly it responds to the distribution of every other label.
- **Local mean fields need not be probability measures.** The interaction measure $\int_0^1G(u,v)\mu_v\,dv$ has total mass equal to the graphon degree of $u$. It may therefore be a positive finite measure with mass below one, including zero.
- **Finite systems discretize the kernel.** An $n$-particle approximation replaces the continuum integral by $n^{-1}\sum_jG^n_{ij}\delta_{X_j^n}$. Convergence requires both stochastic averaging and control of the graphon approximation.
- **Common noise changes the limit object.** With a shared shock, the label-specific limits are conditional laws given that shock and remain random. Conditional independence, rather than unconditional independence, drives the law of large numbers.
- **Process laws are stronger than time marginals.** Convergence on continuous-path space controls whole trajectories and implies corresponding fixed-time statements; proving rates there is harder because bounded subsets of path space are not generally totally bounded.
- **Graphon regularity determines the guarantee.** Broad qualitative convergence can be extended by graphon approximation, while uniform particlewise rates generally need stronger sectional regularity and a compatible discretization.

## Important Papers

- [[papers/graphon-particle-systems-with-common-noise|Graphon Particle Systems with Common Noise]]: proves process-law and graphon-weighted interaction-measure convergence under shared noise and provides finite-dimensional state convergence rates.
- Bayraktar, Chakraborty, and Wu (2023), "Graphon mean field systems": foundational convergence analysis for graphon-indexed particle systems.
- Coppini, De Crescenzo, and Pham (2025), "Nonlinear graphon mean-field systems": develops nonlinear dependence on graphon-weighted empirical measures without common noise.

## Related Concepts

- [[concepts/graphons|Graphons]]: kernels representing heterogeneous interaction structure and dense graph limits.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: controlled strategic systems built from label-specific graphon-weighted state distributions.
- [[concepts/optimal-transport|Optimal Transport]]: supplies Wasserstein metrics for convergence of probability laws and extensions used for finite positive measures.
