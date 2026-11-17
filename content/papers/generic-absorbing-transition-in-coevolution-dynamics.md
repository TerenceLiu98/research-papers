---
title: Generic Absorbing Transition in Coevolution Dynamics
type: paper
authors:
  - Federico Vazquez
  - Víctor M. Eguíluz
  - Maxi San Miguel
year: 2008
doi: 10.1103/PhysRevLett.100.108702
tags:
  - opinion-dynamics
  - adaptive-networks
  - phase-transitions
---

## TL;DR

A coevolving voter model explains network fragmentation through competition between neighbor imitation and homophilic rewiring. Mean-field theory predicts an active-to-absorbing transition at $p_c=(\mu-2)/(\mu-1)$, but simulations with mean degree $\mu=4$ locate it near $0.38$, substantially below the theoretical $2/3$. Finite networks eventually freeze on both sides: typically in one large consensus component below the transition and two large opposing components above it.

## Research Question

How does competition between state copying and network rewiring generate fragmentation, and how are infinite-system activity, finite-system absorbing configurations, and convergence times related?

## Motivation

Interaction networks often change in response to the states of their members. A minimal analytically tractable model can isolate why several coevolution models exhibit a transition from connected consensus to disconnected, internally homogeneous groups.

## Contributions

- Introduces a binary-state coevolving voter model with copying and same-state rewiring.
- Derives a closed mean-field equation for active-link density and a degree-dependent transition threshold.
- Connects the absorbing transition to finite-network fragmentation using simulations and a random-walk representation.
- Explains slow convergence near the transition through competing diffusion and rewiring time scales.

## Method

Initially, a degree-regular random graph has $N$ nodes, each independently assigned either state with probability $1/2$. An update selects a node and a random neighbor. If their states differ, the selected node rewires the edge to a randomly chosen same-state nonneighbor with probability $p$, or copies the neighbor with probability $1-p$. Equal-state pairs cause no update. Total edge count and mean degree $\mu$ remain fixed, although individual degrees change.

Let $\rho$ be the fraction of edges joining opposite states. Approximating the number of active edges incident to a degree-$k$ node by a binomial distribution gives (Eq. 2)

$$
\frac{d\rho}{dt}=\frac{2\rho}{\mu}\left[(1-p)(\mu-1)(1-2\rho)-1\right].
$$

The positive stationary solution is $\rho_s=(p_c-p)/[2(1-p)]$ below the mean-field threshold; above it, $\rho_s=0$ is stable. The order parameter vanishes continuously with mean-field exponent one.

A second description tracks link magnetization $m=\rho_{++}-\rho_{--}$ and activity $\rho$. Below the transition, simulated trajectories fluctuate around $\rho_p(m)=\xi_p(1-m^2)$ before reaching an endpoint near $m=\pm1$. Above it, trajectories move toward $\rho=0$ near $m=0$, corresponding to fragmentation before global ordering.

## Experiments

Figure 3 reports simulations on initially regular graphs with $\mu=4$, $N=250,1000,4000$, and averages over $10^4$ realizations. Observables include largest-component size, final absolute link magnetization, absorption time, and activity conditioned on survival.

- Below $p_c\simeq0.38$, the largest final component contains nearly all nodes; above it, its average size is approximately $N/2$, with two large components and additional much smaller ones.
- Surviving runs retain positive, size-independent activity below the transition, whereas activity vanishes with increasing size above it. The activity and fragmentation thresholds approximately coincide.
- For $\mu=4$, the mean-field threshold $2/3$ overestimates the observed value near $0.38$. The authors attribute this discrepancy to correlations induced by rewiring.
- Figure 4 illustrates trajectories for $N=10^4$, including subcritical $p=0,0.35$ and supercritical $p=0.4$.

The time-scale argument predicts $\tau\sim N/(p_c-p)$ below the transition and $\tau\sim(p-p_c)^{-1}\ln[\mu(p-p_c)N]$ above it, in the corresponding near-critical scaling regimes. These are asymptotic arguments, not exact finite-size formulas at criticality.

## Limitations

The homogeneous binomial closure neglects correlations and does not accurately predict the numerical threshold. Every finite system eventually absorbs, so positive activity in surviving runs must be distinguished from an indefinitely active finite-system stationary state. Numerical evidence emphasizes initially regular graphs with degree four and symmetric binary initialization; the proposed generic mechanism is not a proof for arbitrary adaptation rules. Similarity to the contact-process mean-field equation motivates a directed-percolation conjecture, but the paper does not establish that universality class and highlights its many absorbing configurations.

## Related Concepts

- [[concepts/voter-model|Voter Model]]: copying supplies the neutral state dynamics.
- [[concepts/adaptive-network-fragmentation|Adaptive Network Fragmentation]]: rewiring can eliminate cross-state contact before consensus develops.

## Related Papers

- [[papers/the-physics-of-news-rumors-and-opinions|The Physics of News, Rumors, and Opinions]]: a broader review covering coevolving networks and opinion dynamics; provides thematic context rather than a result tested here.
