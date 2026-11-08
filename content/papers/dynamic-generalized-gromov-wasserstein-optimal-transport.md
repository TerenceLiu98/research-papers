---
title: Dynamic Generalized Gromov-Wasserstein Optimal Transport
type: paper
authors:
  - Junda Ying
  - Zhiwei Zeng
  - Peijie Zhou
  - Lei Zhang
year: 2026
tags:
  - optimal-transport
  - gromov-wasserstein
  - flow-matching
  - spatial-transcriptomics
---

## TL;DR

TP-DATE turns a class of quadratic-form optimal transport (QOT) objectives into continuous dynamics by transporting interacting particle pairs and learning their marginalized velocity with [[concepts/flow-matching|Flow Matching]]. For a distance-variation interaction, the construction interpolates between ordinary [[concepts/optimal-transport|Optimal Transport]] and [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]], and it improves most reported interpolation metrics on synthetic and spatial-transcriptomics benchmarks.

## Research Question

Can structure-aware quadratic transport objectives, including Gromov-Wasserstein transport, be given a general continuous-time formulation and solved without simulation-based training?

## Motivation

Static GW and fused-GW couplings can align structured snapshots, but they do not specify how the structure evolves between endpoints. This matters when snapshots describe the same physical system over time or depth, as in developmental spatial transcriptomics and serial tissue sections. Standard conditional flow matching integrates independent endpoint-conditioned paths, which does not directly represent interactions between paths.

## Contributions

- Defines [[concepts/dynamic-quadratic-form-optimal-transport|Dynamic Quadratic-Form Optimal Transport]] through an action on two-particle paths called travelling pairs.
- Proves equivalence between its static QOT objective and travelling-pair dynamic objective for velocity-convex Lagrangians. Both objectives upper-bound, but are not generally equivalent to, the associated Benamou-Brenier-style two-particle fluid objective.
- Derives pair and particle marginalization results that turn interacting conditional velocities into either a two-particle field or a single-particle transport field.
- Introduces TP-DATE, a simulation-free regression procedure for the marginal velocity, and gives an optional self-driven/interaction decomposition with a controlled mean-field approximation.
- Gives a tractable distance-variation Lagrangian whose interaction weight recovers ordinary OT at zero and GW-OT in the infinite-weight limit. This dynamic fusion is distinct from taking a weighted fused-GW objective at the static level.

## Method

For two endpoint transports $z=(x_0,x_1)$ and $z'=(y_0,y_1)$, the method minimizes a path action over the joint trajectory $(x_t,y_t)$. Integrating this travelling-pair action against two draws from the same coupling produces a quadratic static objective. With a convex Lagrangian, minimizing the conditional paths and the coupling gives the same value in the static and travelling-pair dynamic formulations.

The main experimental Lagrangian combines particle kinetic energy with a penalty on changes in pairwise spatial distance. Gene-expression coordinates use kinetic energy only, while spatial coordinates receive the interaction penalty. TP-DATE samples two transports from a QOT coupling, evaluates their analytic conditional pair velocities, and trains a neural field with a conditional squared-error loss. Marginalization shows that the resulting single-particle velocity transports the endpoint distributions while incorporating the averaged pair interaction.

## Experiments

The evaluation uses five seeds and hold-one-out interpolation between endpoint snapshots.

- On two synthetic 90-degree rotation tasks, TP-DATE has the lowest spatial MSE and balanced fused $W_2$. On plain Rotation, its spatial MSE is $0.02565 \pm 0.00480$, compared with $0.09268 \pm 0.00318$ for the next-best reported baseline, CytoBridge. Its pair distortion is effectively tied with stVCR.
- On developing mouse brain data, TP-DATE is best on all four reported metrics: spatial and expression $W_2$, spatially coupled expression MSE, and balanced fused $W_2$.
- On ARTISTA axolotl brain-regeneration data, TP-DATE is best on expression $W_2$, spatially coupled expression MSE, and fused $W_2$, but not spatial $W_2$; stVCR better recovers the overall tissue shape on that metric.
- On serial tumor sections, TP-DATE is best on expression $W_2$, spatially coupled expression MSE, and fused $W_2$, while ContextFlow has slightly lower spatial $W_2$ ($0.06768$ versus $0.06959$).
- A scaling study from 10,000 to 90,000 cells reports approximately linear TP-DATE training cost and lower time than the two simulation-based baselines. CytoBridge runs out of memory at 90,000 cells in the reported setup.

## Limitations

- The dynamic construction assumes source and target lie in one common metric space; the meaning of a continuous flow between genuinely different spaces remains open.
- Static QOT and the travelling-pair dynamic form are equivalent under the stated convexity condition, but they are only upper bounds on the less constrained Benamou-Brenier-style form. The paper explains why a general three-way equivalence is unavailable.
- Projecting the pair dynamics to a single-particle field loses information: the two-particle dynamics generally cannot be reconstructed from that marginal field.
- The mean-field interpretation uses an independence approximation; its error bound depends on how far the conditional partner distribution is from the particle marginal.
- Velocity decomposition is not unique and requires a domain-supplied gauge. Conditional decompositions also need a conditional mean-independence condition to remain valid after marginalization.
- Empirical evidence is limited to synthetic rotations and three spatial-transcriptomics settings, with method-specific hyperparameters and one reported GPU configuration.

## Related Concepts

- [[concepts/dynamic-quadratic-form-optimal-transport|Dynamic Quadratic-Form Optimal Transport]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/flow-matching|Flow Matching]]

## Related Papers

- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching."
- Benamou and Brenier (2000), "A Computational Fluid Mechanics Solution to the Monge-Kantorovich Mass Transfer Problem."
- Lipman et al. (2023), "Flow Matching for Generative Modeling."
- Tong et al. (2024), "Improving and Generalizing Flow-Based Generative Models with Minibatch Optimal Transport."

[[index|Library home]]
