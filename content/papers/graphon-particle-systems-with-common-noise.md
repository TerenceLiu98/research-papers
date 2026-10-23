---
title: Graphon Particle Systems with Common Noise
type: paper
authors:
  - Erhan Bayraktar
  - Xihao He
  - Donghan Kim
year: 2026
tags:
  - graphons
  - interacting-particle-systems
  - common-noise
  - wasserstein-distance
  - mean-field-limits
---

## TL;DR

The paper proves laws of large numbers for nonlinear [[concepts/graphon-particle-systems|graphon particle systems]] driven by both particle-specific Brownian motions and common noise. Finite-system empirical process laws converge to their common-noise-conditioned continuum limit, while graphon-weighted interaction measures converge under a Wasserstein-type metric that accommodates unequal finite mass.

## Research Question

Do finite heterogeneous particle systems with graphon-mediated interactions still converge to a continuum McKean-Vlasov system when all particles share a common noise, and how should one compare the resulting graphon-weighted measures when their masses are not normalized?

## Motivation

Classical mean-field limits average interactions uniformly, whereas [[concepts/graphons|graphons]] encode persistent heterogeneity across a continuum of agent labels. Common shocks are also natural in applications such as financial markets and biological populations, but they make the limiting laws random conditional distributions and introduce dependence across agents. In addition, a graphon-weighted law generally has mass $\int_0^1G(u,v)\,dv$, not one, so ordinary Wasserstein distance between probability measures is not directly applicable.

## Contributions

- Establishes laws of large numbers for empirical measures and graphon-weighted interaction measures in the presence of common noise, including convergence of probability laws on path space rather than only time-integrated marginal laws.
- Proves convergence of the finite $n$-particle system to the continuum graphon system in expected squared $W_2$ distance for empirical process laws, even when the limiting graphon is merely measurable under the paper's approximation assumptions.
- Uses the $\mathcal{WOP}_2$ metric to compare positive finite interaction measures without imposing unit-mass normalization or the graphon degree lower-bound conditions required by earlier normalized formulations.
- Derives dimension- and moment-dependent rates for uniform-in-time mean-square state approximation when the graphon is Lipschitz and the discrete weights are point samples $G^n_{ij}=G(i/n,j/n)$.

## Method

For labels $u\in[0,1]$, the continuum dynamics are McKean-Vlasov stochastic differential equations whose drift, idiosyncratic diffusion, and common-noise diffusion depend on

$$
\mu_u^G(t)=\int_0^1G(u,v)\mu_v(t)\,dv,
\qquad
\mu_v(t)=\mathcal L(X_v(t)\mid W),
$$

where $W$ is the common Brownian motion. The finite system replaces this measure by $n^{-1}\sum_jG^n_{ij}\delta_{X_j^n(t)}$. A Fubini extension supplies an essentially pairwise-independent continuum family of idiosyncratic noises while retaining the integration properties needed over agent labels.

For positive finite measures $\mu$ and $\nu$, the analysis uses

$$
\mathcal{WOP}_2^2(\mu,\nu)
=(m_\mu-m_\nu)^2
+W_2^2\!\left((T_{m_\mu})_\#\mu^\circ,
                 (T_{m_\nu})_\#\nu^\circ\right),
$$

which jointly compares mass and the geometry of normalized, mass-rescaled measures. The proof strategy establishes tightness and identifies joint weak limits of empirical and conditional measures on continuous-path space, upgrades weak convergence using moment control, and then couples finite and continuum particles through their shared noises. Approximation arguments relax graphon regularity for the broad convergence results.

## Experiments

The paper is theoretical and contains no numerical or empirical experiments. Its main evidence consists of convergence theorems:

- The continuum empirical process measure converges in expected squared $W_2$ distance to the average conditional law under continuous graphons.
- Graphon-weighted empirical process measures converge in expected squared $\mathcal{WOP}_2$ distance, averaged across labels.
- The empirical process law of the interacting finite system converges to the continuum average conditional law; the paper extends this result to measurable graphons.
- Under Lipschitz graphon regularity and point-sampled discretization, the worst-particle uniform-in-time mean-square state error is bounded by $K_{d,\varepsilon}M_n$, where $M_n$ has the stated regimes $n^{-1/2}$ for $d<4$, $n^{-1/2}\log(1+n)$ for $d=4$, and $n^{-2/d}$ for $d>4$, each combined with the available moment term.
- An appendix verifies that bounded Lipschitz interaction kernels linear in the measure satisfy the nonlinear framework's assumptions.

## Limitations

- The explicit rate theorem requires more than cut-norm convergence: the graphon must satisfy the paper's Lipschitz condition and the discrete graphon must be sampled as $G^n_{ij}=G(i/n,j/n)$.
- The rate controls finite-dimensional time marginals and coupled particle trajectories. The paper does not obtain an analogous quantitative empirical-measure rate directly on the infinite-dimensional continuous-path space.
- Coefficients are assumed bounded and Lipschitz in state and $\mathcal{WOP}_2$, and the initial laws require uniform moments; models outside these regularity conditions are not covered.
- The manuscript establishes laws of large numbers, not the central limit theorems or graphon control and game results mentioned as possible future extensions.
- The supplied manuscript gives an April 28, 2026 date but no DOI, venue, or identifier, so none is inferred here.

## Related Concepts

- [[concepts/graphon-particle-systems|Graphon Particle Systems]]
- [[concepts/graphons|Graphons]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- Bayraktar, Chakraborty, and Wu (2023), "Graphon mean field systems": establishes an earlier graphon particle-system limit without this paper's common-noise setting.
- Coppini, De Crescenzo, and Pham (2025), "Nonlinear graphon mean-field systems": the nonlinear framework extended here to common noise, positive finite interaction measures, and process-law convergence.
- Leblanc, Le Gouic, Liandrat, and Tournus (2023), "Extending the Wasserstein metric to positive measures": introduces the positive-measure Wasserstein construction used by the paper.
- [[papers/graphon-mean-field-games-and-the-gmfg-equations|Graphon Mean Field Games and the GMFG Equations]]: a related controlled graphon system without this paper's nonlinear common-noise convergence analysis.

[[index|Library home]]
