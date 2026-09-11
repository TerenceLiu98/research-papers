---
title: Super-Brownian Motion
type: concept
aliases:
  - SBM
tags:
  - stochastic-processes
  - measure-valued-processes
  - scaling-limits
---

## Overview

Super-Brownian motion is a measure-valued diffusion describing spatially moving, branching mass. In voter model scaling limits, the measure records a suitably normalized population of one type. Spatial diffusion, branching fluctuations, and a linear mass-growth drift survive the rescaling.

## Key Ideas

In the two-dimensional convention used by Cox and Perkins, a process with branching rate $b$, diffusion coefficient $\sigma^2$, and drift $\theta$ satisfies, for smooth bounded test functions $\phi$,

$$
M_t(\phi)=X_t(\phi)-X_0(\phi)
-\int_0^t X_s\left(\frac{\sigma^2}{2}\Delta\phi+\theta\phi\right)ds,
\qquad
\langle M(\phi)\rangle_t=\int_0^t X_s(b\phi^2)ds,
$$

where $M_t(\phi)$ is a continuous martingale. These relations specify the deterministic diffusion and drift together with the size of the random branching fluctuations.

- Two-dimensional voter perturbations require logarithmic corrections: time accelerates by $N$, space contracts by $\sqrt N$, particle mass is $\log N/N$, and perturbation strength is $(\log N)^3/N$ in the cited theorem.
- For asymptotically symmetric finite-range perturbations with convergent finite initial measures, the limit has $b=4\pi\sigma^2$ and $\theta=\Theta_2+\Theta_3$. Two-group coalescing-walk probabilities determine the asymmetry contribution $\Theta_2$; three-group probabilities determine $\Theta_3$.
- Exact interchange symmetry of the two types removes $\Theta_2$. For the [[Q-Voter Model]] approaching $q=1$ from below at the specified rate, strict subadditivity gives $\Theta_3>0$.
- Positive drift supports population growth from sufficiently large initial mass with high probability over suitable time intervals. Coupled block estimates transfer this property to the particle system and help establish [[Complete Convergence with Coexistence]].
- A scaling limit and a long-time convergence theorem are different claims. The general scaling-limit result does not require monotonicity or cancellativity; the complete convergence application uses those additional structural properties.

## Important Papers

- [[A complete convergence theorem for the q-voter model and other voter model perturbations in two dimensions]]: proves a general asymptotically symmetric two-dimensional scaling limit.
- Cox, Durrett, and Perkins (2000), "Rescaled voter models converge to super-Brownian motion": foundational voter-model limit cited by the paper.
- Cox, Merle, and Perkins (2010), "Co-existence in a two-dimensional Lotka-Volterra model": earlier two-dimensional limit and coexistence analysis.

## Related Concepts

- [[Voter Model]]
- [[Q-Voter Model]]
- [[Complete Convergence with Coexistence]]
