---
title: "Alignment Matters Inside and Out in Equivariant Graph Flow Matching"
type: paper
authors:
  - Moritz Piening
  - Christian Wald
year: 2026
source_job_id: 9e6cf7b5-2634-49a2-bbf7-d5cc3c02e273
tags:
  - flow-matching
  - graph-generation
  - equivariance
  - optimal-transport
  - gromov-wasserstein
---

## TL;DR

Piening and Wald show that permutation-equivariant graph flow matching has two distinct coupling problems: **inner alignment** chooses compatible node labelings within a paired graph orbit, while **outer alignment** chooses which source and target graphs to pair. They connect exact inner alignment to transport on a graph quotient space and to Gromov-Monge distance, prove that quotient couplings can be lifted to aligned representatives without added quadratic cost, and show that diagonal symmetrization yields equivariant flow-matching minimizers. Approximate Gromov-Wasserstein alignment gives the strongest few-step results in their controlled graph and molecular experiments, although its advantage shrinks with more integration steps and comes at substantial computational cost.

[[index|Library home]]

## Research Question

How should source-target couplings account for node-permutation symmetry in graph flow matching, and how do node-level representative alignment and graph-level batch assignment affect transport geometry, computation, and few-step generation?

## Motivation

An equivariant network transforms consistently under node relabeling, but equivariance alone does not decide which labeled representatives should be connected by a conditional flow path. Randomly paired labelings can create long or structurally destructive interpolations even when their endpoints represent the same unordered graph. Optimal-transport coupling can also choose better source-target graph pairs, creating a second alignment problem. Treating these decisions separately clarifies which gains come from node correspondence and which come from minibatch assignment.

## Contributions

- Formalizes transport on quotients $Q=\mathbb R^D/G$ and proves that a quotient coupling has an aligned representative-space lift with the same quadratic cost. For an optimal coupling, the projected interpolation is a constant-speed Wasserstein geodesic on the quotient.
- Proves that diagonal group symmetrization preserves the flow-matching objective on equivariant fields and produces an equivariant minimizer. The argument also covers coordinatewise categorical endpoint prediction.
- Identifies graph inner alignment with a hard Gromov-Monge node-matching problem and separates it from outer assignment between graphs in a minibatch.
- Compares random augmentation, permutation-blind minibatch optimal transport (MBOT), finite best-of-augmentation (BoA), approximate Gromov-Wasserstein (GW) alignment, and combined inner-outer variants.
- Quantifies the trade-off between spending computation on more candidate node permutations and on larger outer assignment batches.

## Method

### Quotient formulation

An $N$-node graph is encoded as a tensor whose simultaneous row-column permutations represent the same unordered graph. The quotient distance between graph orbits minimizes Euclidean representative distance over node permutations; with vector-valued edge and diagonal node features, this is an unnormalized Gromov-Monge objective. The representative-lift theorem shows that quotient-space transport can be realized by aligned Euclidean representatives without increasing cost.

The paper then symmetrizes any representative coupling by applying the same randomly sampled group action to both endpoints. For equivariant vector fields, this leaves the regression objective unchanged. An equivariant minimizer therefore exists even when the initial aligned lift itself is not invariant.

### Inner and outer alignment

[[concepts/graph-quotient-alignment|Inner alignment]] selects a node permutation for each source-target graph pair. Exact search is a quadratic assignment problem, so the experiments use either:

- **GW alignment:** solve a vector-valued Gromov-Wasserstein relaxation with Frank-Wolfe iterations, then round its soft plan to a permutation with the Hungarian algorithm.
- **Best-of-Augmentation:** sample $A$ node permutations and retain the one with minimum squared representative distance. $A=1$ is random augmentation.

Outer alignment forms a pairwise cost matrix for $B$ source and $B$ target graphs of the same node count and solves a Hungarian assignment over graph pairs. Standard flow-matching training then uses the chosen graph pairing and its chosen target relabeling; the model architecture and loss otherwise remain unchanged.

### Computational trade-off

Joint BoA alignment evaluates $A$ node permutations for each of $B^2$ graph pairs. Its stated complexity is

$$
O\!\left(B^2A(C_eN^2+C_vN)+B^3\right).
$$

Thus inner search grows linearly in $A$, whereas outer assignment includes a cubic term in $B$. Classical iterative GW costs $O(KCN^3)$ per graph pair, limiting practical outer GW batch sizes.

## Experiments

The controlled studies use the same permutation-equivariant graph-transformer backbone across coupling conditions and vary only the training coupling.

- **Translated 12-node cycles:** Random alignment deforms rings and blurs edges along intermediate paths. Inner GW attains roundness $0.7$ (reported after multiplication by $10^2$), versus $12.9$ for Random; inner-outer GW attains $0.0$ and the exact target mean degree of $2.0$. Small BoA can underperform Random, while larger search budgets improve it.
- **Alignment scaling:** On QM9 with $N=9$, joint $\mathrm{BoA}^{64}+\mathrm{BoA}^{512}_{\mathrm{out}}$ matches the aligned distance of $\mathrm{MBOT}^{32768}$ while running 12 times faster. Random permutation search becomes ineffective for larger ZINC250k graphs, where GW gives better alignment.
- **Few-step molecular generation:** At five Euler steps on QM9, Random obtains validity $0.8849$ and FCD $1.731$, compared with $0.9356/1.278$ for inner GW and $0.9421/1.232$ for inner-outer GW. On ZINC250k, five-step validity rises from $0.5641$ for Random to $0.6431$ for GW and $0.7280$ for inner-outer GW; the corresponding FCD values are $18.448$, $15.024$, and $15.377$, so outer assignment improves validity but not FCD there.
- **Integration budget:** Coupling differences narrow at 25 and 125 Euler steps. Distilled flow maps also show smaller coupling differences, with GW-based methods generally advantaged at two or five steps rather than uniformly at one step.
- **Full-budget model:** GW-CatFlow with inner GW alignment and 500 Euler steps reports $99.34\%$ validity and $0.115$ FCD on QM9, and $99.01\%$ validity and $0.966$ FCD on ZINC250k.
- **Continuous stochastic block models:** At five Euler steps, inner-outer GW reduces FGW nearest-neighbor accuracy from $0.796$ to $0.568$ toward its ideal $0.5$, degree MMD from $0.114$ to $0.018$, and clustering MMD from $0.179$ to $0.034$.

## Limitations

- Exact inner graph alignment is NP-hard; the GW solver is non-convex and its rounded permutation need not be globally optimal.
- Stronger alignment is computationally expensive. In the reported CPU measurements, inner GW costs 48 to 78 times as much per training batch as MBOT, and adding outer GW multiplies the inner-GW cost by about 5.4.
- Outer alignment provides smaller and dataset-dependent gains. On ZINC250k it improves five-step validity over inner GW but slightly worsens FCD.
- Alignment matters most at low integration budgets; differences shrink with more Euler steps and are smaller after flow-map distillation.
- BoA depends strongly on graph size: near-exhaustive random permutation search is plausible for small QM9 graphs but ineffective in the much larger permutation spaces of ZINC250k.
- The molecular comparisons use same-node-count batches and draw node counts from the empirical training distribution at generation time; the method does not itself learn transport between graphs of different sizes.
- The supplied manuscript does not provide a stable paper identifier or publication venue.

## Related Concepts

- [[concepts/graph-quotient-alignment|Graph Quotient Alignment]]: separates representative selection within graph orbits from assignment across graph pairs.
- [[concepts/flow-matching|Flow Matching]]: the conditional vector-field regression framework whose source-target coupling is modified.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: supplies the relaxed relational matching objective used for approximate node alignment.
- [[concepts/optimal-transport|Optimal Transport]]: provides the coupling and Wasserstein-geometric foundation.

## Related Papers

- Mémoli and Needham (2024), "Comparison Results for Gromov-Wasserstein and Gromov-Monge Distances": supplies the hard-alignment geometry connected to the graph quotient metric.
- Klein et al. (2023), "Equivariant Flow Matching": prior treatment of flow matching under symmetry.
- Eijkelboom et al. (2024), "Variational Flow Matching for Graph Generation": supplies the categorical CatFlow setting used in the molecular experiments.
- Tong et al. (2023), "Improving and Generalizing Flow-Based Generative Models with Minibatch Optimal Transport": supplies the permutation-blind MBOT baseline.
- Hou et al. (2026), "GGFlow: Graph Generation with Structure-Aware Flow Matching": concurrent graph flow work that optimizes graph pairing.
