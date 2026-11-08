---
title: The Mean-Field Dynamics of Transformers
type: paper
authors:
  - Philippe Rigollet
year: null
source_job_id: 5b5b223a-b4c0-4cb1-bc61-f03ccc8ccbad
tags:
  - transformers
  - self-attention
  - mean-field-limits
  - interacting-particle-systems
  - metastability
---

## TL;DR

This paper treats normalized self-attention as an interacting-particle system on the sphere and studies its finite-particle and mean-field limits. Its simplified normalized and unnormalized flows generically converge to a single token cluster, but large inverse temperature creates exponentially long-lived multi-cluster states. An equiangular reduction makes clustering rates explicit, shows that normalization controls contraction speed, and yields a logarithmic attention-scaling phase transition for long contexts.

## Research Question

What do interacting-particle and mean-field models reveal about clustering, metastability, normalization, and long-context scaling in deep self-attention dynamics?

## Motivation

Repeated residual attention can be interpreted as a time-discretized dynamical system, with tokens as particles coupled through similarity-dependent weights. Passing to continuous depth and then to a measure-valued limit makes the long-time geometry of token representations mathematically accessible. The central tension is that asymptotic synchronization produces representation collapse, whereas finite-depth expressivity relies on structured multi-cluster states persisting long enough to be useful.

## Contributions

- Formulates normalized self-attention (SA) and unnormalized self-attention (USA) as continuous-time particle systems on the sphere and connects their empirical measures to nonlinear continuity equations.
- Synthesizes global clustering results: for finite systems in dimension at least three, almost every initialization converges to a single cluster; local hemisphere conditions and small-temperature mean-field assumptions yield exponential rates.
- Describes large-temperature metastability as slow motion near multi-cluster saddle configurations followed by a staircase of pairwise merging events on separated time scales.
- Identifies spherical SA with blurring Mean-Shift for a Gaussian kernel and relates the circle case at zero inverse temperature to the homogeneous Kuramoto model.
- Uses an equiangular reduction to derive exact contraction dynamics, distinguish SA from USA, and compare Post-LN, Pre-LN, and other speed-regulated normalization schemes.
- Establishes a long-context phase transition when the attention scale is $\beta_n=\gamma\log n$: subcritical scaling collapses output directions, supercritical scaling becomes identity-like, and the critical boundary retains nontrivial mixing.

## Method

Tokens $x_i(t)\in\mathbb S^{d-1}$ evolve under similarity-weighted interactions. The normalized SA model projects the Softmax-weighted average onto the tangent space,

$$
\dot x_i=\mathbf P_{x_i}^{\perp}
\left(
\frac{\sum_j e^{\beta\langle x_i,x_j\rangle}x_j}
{\sum_k e^{\beta\langle x_i,x_k\rangle}}
\right),
$$

while USA replaces the Softmax denominator by $n$. For the empirical measure $\mu_t=n^{-1}\sum_i\delta_{x_i(t)}$, USA induces a McKean-Vlasov continuity equation and is a [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flow]] of an exponential interaction energy; SA has a related gradient-flow interpretation under a different metric.

The analysis combines convergence results for synchronization on spheres, gradient-flow and stable-manifold arguments, slow-motion analysis near saddle manifolds, and large-$\beta$ time-scale separation. Under an equiangular initialization, every off-diagonal inner product equals one scalar $\rho(t)$, reducing the particle system and normalization variants to explicit ODEs. The same reduction supports the $\beta_n=\gamma\log n$ long-context asymptotics.

## Experiments

The paper is primarily theoretical and expository. Its empirical evidence consists of reproduced or numerical illustrations rather than downstream model training comparisons.

- Histograms from pretrained ALBERT XLarge v2 layers show pairwise token inner products concentrating near one with depth.
- Simulations with 32 randomly initialized SA particles show a sharpening clustering transition as dimension increases from 8 to 128 to 1,024, approaching the equiangular prediction.
- Random-weight Transformer simulations with $d=512$ compare average cosine-similarity trajectories under normalization schemes and illustrate the predicted difference between fast Post-LN contraction and slower Pre-LN contraction.
- Energy trajectories at large $\beta$ exhibit long plateaus separated by sharp jumps, matching the proposed metastable saddle-to-saddle picture.

These figures illustrate the theory but do not constitute task-level evaluation or a controlled study of trained Transformer architectures.

## Limitations

- The core models omit MLP blocks, learned query/key/value matrices in their main form, multi-head interactions, and causal masking; they are abstractions of attention rather than complete Transformers.
- The strongest finite-particle global theorem applies almost everywhere in dimension $d\geq3$; the circle requires separate results, and quantitative global mean-field convergence is stated only under nonzero initial mean and sufficiently small $|\beta|$.
- The single-cluster limit is asymptotic. The analysis does not establish when the simplified flow's metastable clusters correspond to semantic structure or improve downstream performance in trained networks.
- Exact rate and phase-transition calculations rely on equiangular configurations. High-dimensional random initialization motivates this reduction, but learned representations need not remain equiangular.
- The normalization comparison idealizes layer normalization as spherical projection or scalar speed regulation and does not model all affine parameters and architectural details of deployed normalization layers.
- The noisy extension outlines stationary bifurcations and open problems but does not give a quantitative phase diagram or uniform-in-time propagation-of-chaos theory for general noisy attention.
- The supplied source gives no publication year, venue, DOI, or arXiv identifier, so `year` is left null and no stable identifier is inferred.

## Related Concepts

- [[concepts/transformer-pdes|Transformer PDEs]]: the measure-valued formulation of interacting token dynamics and their mean-field limits.
- [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]: interprets residual layers as time discretizations of learned dynamics.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: provides the variational structure for USA and a point of comparison for SA's alternative metric.
- [[concepts/attention-as-message-passing|Attention as Message Passing]]: another interacting-system view of attention, emphasizing token-to-token aggregation rather than long-time particle dynamics.

## Related Papers

- [[papers/a-unified-perspective-on-the-dynamics-of-deep-transformers|A Unified Perspective on the Dynamics of Deep Transformers]]: develops well-posedness, stability, Gaussian closure, and gradient structures for a broader family of attention PDEs, mostly without layer normalization.
- Geshkovski, Letrouit, Polyanskiy, and Rigollet (2025), "A Mathematical Perspective on Transformers": supplies several normalized spherical-attention clustering and gradient-flow results synthesized here.
- Geshkovski, Koubbi, Polyanskiy, and Rigollet (2024), "Dynamic Metastability in the Self-Attention Model": establishes exponentially long-lived cluster configurations and saddle-to-saddle dynamics.
- Bruno, Pasqualotto, and Agazzi (2025), "A Multiscale Analysis of Mean-Field Transformers in the Moderate Interaction Regime": develops the multiscale coarsening picture and closest-pair merging limit.
- Chen, Lin, Polyanskiy, and Rigollet (2026), "Critical Attention Scaling in Long-Context Transformers": proves the equiangular long-context phase transition summarized in the paper.

[[index|Library home]]
