---
title: A Mathematical Perspective on Transformers
type: paper
authors:
  - Borjan Geshkovski
  - Cyril Letrouit
  - Yury Polyanskiy
  - Philippe Rigollet
year: 2025
source_job_id: 8e9ff4d6-553c-48ee-a22d-303c5778b174
tags:
  - transformers
  - self-attention
  - interacting-particle-systems
  - mean-field-limits
  - token-clustering
  - metastability
---

## TL;DR

The paper models normalized self-attention as an interacting-particle system on the unit sphere and lifts the finite-token dynamics to a nonlinear continuity equation on probability measures. For a simplified attention model, it proves generic convergence to one token cluster in several temperature and dimension regimes, quantifies high-dimensional convergence, and identifies a long-lived multi-cluster phase that precedes eventual collapse. It also connects attention dynamics to Wasserstein geometry, Kuramoto synchronization, spherical energy minimization, and control of measure-valued flows.

## Research Question

How can continuous-time interacting-particle and measure-valued dynamics explain clustering, collapse, and metastability in normalized self-attention?

## Motivation

Residual network depth can be viewed as a time discretization of a dynamical system. For Transformers, however, the evolving state is a sequence of mutually coupled tokens rather than one vector. Recasting tokens as particles makes attention a state-dependent interaction law and lets the empirical token distribution evolve as a flow on probability measures. This framework makes long-depth behavior accessible to tools from dynamical systems, optimal transport, collective behavior, and statistical mechanics.

## Contributions

- Formulates a continuous-time Transformer model in which layer normalization constrains tokens to the sphere and Softmax self-attention supplies the nonlinear particle coupling.
- Shows that empirical token measures solve a nonlinear continuity equation, so the Transformer acts as a measure-to-measure flow; it also introduces an unnormalized surrogate with a standard [[concepts/wasserstein-gradient-flows|Wasserstein gradient-flow]] structure.
- Proves generic single-cluster convergence at zero and sufficiently small inverse temperature, at sufficiently large inverse temperature, and for every inverse temperature in dimension at least three.
- Proves exponential convergence when the initial particles lie in an open hemisphere; random initializations satisfy this almost surely when the ambient dimension is at least the number of particles.
- Reduces orthogonal initial configurations to a scalar ODE for their common pairwise angle and shows that high-dimensional random configurations track this equiangular evolution with high probability.
- Relates the circle dynamics to the homogeneous Kuramoto model and formulates further problems involving metastability, BBGKY closures, general query/key/value matrices, repulsive attention, singular limits, diffusion, approximation, and control.

## Method

For normalized tokens $x_i(t)\in\mathbb S^{d-1}$, the principal model is

$$
\dot x_i(t)=\mathbf P_{x_i(t)}^\perp
\left(
\frac{\sum_j e^{\beta\langle x_i(t),x_j(t)\rangle}x_j(t)}
{\sum_k e^{\beta\langle x_i(t),x_k(t)\rangle}}
\right),
$$

where the tangent projection represents idealized layer normalization and $\beta$ is an inverse temperature. The empirical measure $\mu_t=n^{-1}\sum_i\delta_{x_i(t)}$ satisfies a distribution-dependent continuity equation, connecting the model to [[concepts/transformer-pdes|Transformer PDEs]]. An unnormalized variant replaces the row-wise partition function by $n$ and becomes the Wasserstein gradient ascent of an exponential interaction energy. The normalized model admits a related interpretation under an energy-weighted transport metric.

The clustering analysis combines analytic gradient-flow convergence, center-stable manifold arguments, energy-landscape analysis, hemisphere invariance, concentration of measure, and stability with respect to initial data. In high dimension, random points are nearly orthogonal, allowing comparison with an exactly equiangular system governed by one scalar ODE. On the circle, angular parametrization turns the dynamics into a nonlinear Kuramoto-type synchronization system.

## Experiments

The work is primarily theoretical and uses numerical evidence to expose behavior not yet covered by its theorems.

- Pairwise token-similarity histograms from ALBERT XLarge v2 become increasingly concentrated near one across layers, illustrating token uniformity in a trained model.
- Simulations with random particles map the probability of near-consensus over time and inverse temperature. As dimension grows, the observed phase boundary approaches the equiangular prediction.
- At large inverse temperature, trajectories rapidly form several clusters and remain there before much slower pairwise mergers produce one final cluster.
- Simulations with several random query, key, and value matrix ensembles retain sharp transitions and metastable regions, suggesting that the identity-matrix theory captures a broader phenomenon.

These studies illustrate the mathematical picture; they are not downstream evaluations of trained Transformers.

## Limitations

- The main model omits feed-forward blocks, multi-head attention, positional or causal structure, residual details, and most learned normalization parameters.
- Most complete theorems assume identity query, key, and value matrices. The numerical results for general matrices are not matched by comparable proofs.
- Single-cluster convergence is an asymptotic statement and may occur on a time scale far beyond practical network depth. The multi-cluster metastable regime is observed numerically but not theoretically characterized here.
- The relationship between particle clusters and semantic or task-relevant token structure remains interpretive; the model does not establish downstream benefits or harms.
- The strongest quantitative high-dimensional comparison fixes the particle count while dimension grows and assumes uniformly random initialization, which need not describe learned representations.
- Several sections intentionally pose open problems rather than closed results, including BBGKY closure, noisy dynamics, general-matrix limit shapes, and control or approximation guarantees for the normalized model.
- The supplied source does not state a DOI, arXiv identifier, or venue, so none is inferred here.

## Related Concepts

- [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]: interprets residual layers as time steps of a continuous dynamical system.
- [[concepts/transformer-pdes|Transformer PDEs]]: describes the measure-valued continuity equation induced by interacting tokens.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: provides the variational structure of the unnormalized attention model and motivates a weighted geometry for normalized attention.
- [[concepts/attention-as-message-passing|Attention as Message Passing]]: offers a complementary view of attention as state-dependent aggregation among tokens.
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]: a neighboring representation-collapse phenomenon linked to repeated attractive interactions.

## Related Papers

- [[papers/the-mean-field-dynamics-of-transformers|The Mean-Field Dynamics of Transformers]]: extends the particle and mean-field account with later results on metastability, normalization, and long-context scaling.
- [[papers/a-unified-perspective-on-the-dynamics-of-deep-transformers|A Unified Perspective on the Dynamics of Deep Transformers]]: studies a broader family of attention PDEs, including well-posedness and Gaussian covariance dynamics, mostly without layer normalization.
- Geshkovski et al. (2024), "The Emergence of Clusters in Self-Attention Dynamics": analyzes clustering for pure self-attention without the spherical projection.
- Markdahl, Thunberg, and Goncalves (2017), "Almost Global Consensus on the n-Sphere": supplies a sphere-synchronization result used in the arbitrary-temperature clustering theory.
- Criscitiello et al. (2024), "Synchronization on Circles and Spheres with Nonlinear Interactions": provides related consensus results used to sharpen the dimensional and circle cases.

[[index|Library home]]
