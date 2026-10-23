---
title: Dynamics of Measure-Valued Agents in the Space of Probabilities
type: paper
authors:
  - Giacomo Borghi
  - Michael Herty
  - Andrey Stavitskiy
year: 2025
doi: "10.1137/24M1675515"
arxiv: "2407.06389"
source_job_id: "336da139-64d4-4caf-8e44-7d7142cd6b0c"
tags:
  - multi-agent-systems
  - wasserstein-space
  - consensus-dynamics
  - measure-differential-inclusions
  - consensus-based-optimization
---

## TL;DR

This paper formulates continuous-time consensus among probability-measure-valued agents: each agent moves along a 2-Wasserstein geodesic toward a weighted [[concepts/wasserstein-barycenters|Wasserstein barycenter]] of the ensemble. Using [[concepts/measure-differential-inclusions|Measure Differential Inclusions]], it proves existence for arbitrary compactly supported initial measures, constructs solutions directly for bounded absolutely continuous agents, and illustrates a particle discretization for black-box optimization over probability measures.

## Research Question

How can consensus dynamics be defined directly on the 2-Wasserstein space of probability measures, including measures for which barycenters or optimal couplings are nonunique, and when do such dynamics admit solutions?

## Motivation

Many objects of interest, including point clouds, images, data sets, and noisy observations, are naturally represented as probability measures rather than finite-dimensional vectors. Existing Wasserstein consensus algorithms were primarily discrete-time procedures or pairwise interactions. The paper seeks a representation-independent, continuous-time model in which an ensemble of measure-valued agents moves toward a common weighted barycenter.

## Contributions

- Defines a continuous-time consensus system on $\mathcal P_2(\mathbb R^d)$ whose velocity sends each agent toward a weighted Wasserstein barycenter through an optimal transport map or coupling.
- Shows that exponentially reparameterized Wasserstein geodesics solve the associated measure differential inclusion, connecting displacement interpolation to the proposed dynamics.
- Proves existence for compactly supported, bounded absolutely continuous initial agents through an explicit time-discrete construction.
- Extends existence to arbitrary compactly supported initial measures by mollification and closedness of the solution set.
- Adapts consensus-based optimization to objectives over probability measures and demonstrates the resulting particle method on two-dimensional target-measure approximation tasks.

## Method

For agents $\mu_t^1,\ldots,\mu_t^N$, the dynamics first select a barycenter $\bar\mu_t$ minimizing the weighted sum $\sum_i \lambda(\mu_t^i)W_2^2(\mu_t^i,\nu)$. Each agent then moves toward $\bar\mu_t$ with displacement $y-x$ under an optimal coupling between the agent and barycenter. When the agent is absolutely continuous, the coupling is induced by an optimal transport map and the evolution becomes a measure differential equation; otherwise, the possibly set-valued choices of barycenter and coupling produce an MDI.

The constructive existence argument alternates barycenter computation with a geodesic Euler step. The convex hull of the initial supports remains invariant, yielding uniform support and Lipschitz bounds. Compactness then provides a limiting curve, while upper semicontinuity of the optimal-coupling and barycenter maps identifies it as a solution. For general compactly supported measures, the authors mollify the initial data, invoke existence for the absolutely continuous approximations, and pass to a solution using closedness of the solution set.

For optimization, the weights become $\lambda^\alpha(\mu)=\exp[-\alpha\mathcal E(\mu)]$, favoring agents with smaller objective values. Atomic agents are updated using free-support barycenters, optimal couplings, and an added stochastic perturbation intended to support exploration.

## Experiments

The numerical illustration minimizes $\mathcal E(\mu)=W_2(\mu,\nu^M)$ for three target shapes represented by 2,000 points in $\mathbb R^2$. It uses 30 agents, particle counts of 32, 64, and 128 per agent, step size $0.1$, stochastic parameters $0.3$ and $0.1$, $\alpha=10^6$, and 3,000 iterations. The reported final barycenters qualitatively approximate all three targets at each tested particle count, and objective traces show the best agent improving during the iterations. This is a small validation example rather than a comparative benchmark.

## Limitations

- The analysis establishes existence, not uniqueness; discrete measures can admit multiple barycenters and optimal couplings, leading to different solution trajectories.
- Constructive convergence of the explicit scheme is proved only for bounded absolutely continuous agents. Convergence of the generalized discretization for arbitrary initial measures is left open.
- The theory assumes compactly supported initial agents and does not establish long-time consensus, rates, or stability of stationary states.
- The optimization argument is heuristic in Wasserstein space: the paper does not prove convergence to a global minimizer, and the experiment has no baseline comparison or systematic sensitivity analysis.
- Each update requires $O(N)$ optimal transport solves, which limits scalability; kinetic limits, random batches, and stochastic continuous-time dynamics are proposed as future work.

## Related Concepts

- [[concepts/measure-differential-inclusions|Measure Differential Inclusions]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]

## Related Papers

- [[papers/simple-approximative-algorithms-for-free-support-wasserstein-barycenters|Simple approximative algorithms for free-support Wasserstein barycenters]]
- [[papers/heterogeneous-federated-reinforcement-learning-using-wasserstein-barycenters|Heterogeneous Federated Reinforcement Learning Using Wasserstein Barycenters]]
- [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]]

[[index|Library home]]
