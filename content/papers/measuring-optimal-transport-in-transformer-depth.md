---
title: Measuring Optimal Transport in Transformer Depth
type: paper
authors:
  - Alexandre Quemy
year: null
source_job_id: "f33d6d29-d9a1-4f71-9a17-1f994eff07ba"
tags:
  - optimal-transport
  - transformers
  - representation-geometry
  - mechanistic-interpretability
---

## TL;DR

This paper tests whether consecutive transformer layers move clouds of token states with the cost and token pairing prescribed by exact [[concepts/optimal-transport|Optimal Transport]]. In Pythia-160m and Pythia-410m, the measured cost is consistent with an optimal coupling wherever the experiment has sufficient resolution, except for the Pythia-160m exit, whose token-specific motion costs 14-27% more. Agreement with the optimal map rises through depth and reaches Spearman rank correlations of 0.89 and 0.88 at the two model exits, but much of the Pythia-410m exit is explained by a linear Gaussian transport map.

## Research Question

Does a trained transformer move its cloud of token representations between consecutive layers at minimum squared-distance cost, and does each token move toward the destination selected by the corresponding optimal transport map?

## Motivation

Treating a layer's input and output states as distributions makes the network's own token correspondence one feasible transport coupling. Comparing it with the minimum-cost coupling supplies a label-free measure of excess motion and tests whether a layer can be summarized by a convex-potential map. This complements path-based [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: the object here is the coupling between whole layer clouds, not only the shape of individual hidden-state paths.

## Contributions

- Poses a direct empirical test of a trained transformer's layer-to-layer coupling, separating minimum transport cost from agreement with the token-level transport map.
- Introduces a measurement protocol with an empirical sampling-floor correction, calibration on known optimal couplings, separation of common cloud translation from token-specific motion, and a sliced-Wasserstein lower bound.
- Measures Pythia-160m and Pythia-410m on WikiText-103 and Pile-derived state clouds, reporting which transitions are resolvable rather than treating low-resolution estimates as negative results.
- Uses a Gaussian Brenier map to distinguish agreement caused by a global linear transformation from nonlinear token-specific rearrangement.

## Method

For a layer transition, the network pairs each state $x_i^{(\ell)}$ with its continuation $x_i^{(\ell+1)}$. Its squared movement cost is compared with

$$
W_2^2(\mu_\ell,\mu_{\ell+1})
=\min_{\pi}\mathbb E_{(x,y)\sim\pi}\lVert x-y\rVert^2.
$$

The paper removes the mean displacement $\Delta m_\ell$ before evaluating token-specific efficiency. With $P_\ell=\mathbb E_i\lVert d_i-\Delta m_\ell\rVert^2$ and centered clouds $\bar\mu_\ell$, it defines

$$
\bar e_\ell=
\frac{W_2^2(\bar\mu_\ell,\bar\mu_{\ell+1})}{P_\ell}.
$$

A value of one means that the network coupling has minimum cost. The translation is analyzed separately because a shared shift is already optimal and dominates several raw transition costs.

The exact experiment samples 4,000 source tokens and 4,000 independent destination tokens in a 16-dimensional PCA camera, then solves the balanced assignment with the network simplex implementation in Python Optimal Transport. It subtracts an assignment cost between independent samples of the same layer to estimate the sampling floor. A transition is declared unresolvable when this floor exceeds 30% of the cost under study. Shift and radius-matched expansion couplings, both optimal by construction, calibrate what efficiency one looks like through the same finite-sample instrument. Pythia-160m uses three seeds; Pythia-410m uses one.

As a calibration-free check, 2,000 random one-dimensional projections over all token types produce a sliced lower bound on centered efficiency. Map agreement is measured by pooled-component Spearman correlation and median cosine between the network displacement and the exact-assignment displacement. A fitted Gaussian Brenier map provides the linear control.

The main object is a mean flow with one point per token type, averaged over contexts. The paper also checks raw occurrence states. WikiText contributes 242,015 positions and 25,268 mean-flow token types for Pythia-160m; the Pile sample contributes 46,542 mean trajectories. Pythia-410m has 11,937 WikiText token types in its sliced analysis.

## Experiments

### Transport cost

For Pythia-160m, the centered token-specific cost is measurable at four single-layer transitions. The entry, 3 to 4, and 10 to 11 readings are consistent with their known-optimal calibrations. At the 11 to 12 exit, efficiency is 0.86 while the calibration reads 1.00, implying 14-27% excess cost across the reported uncertainty. Its sliced lower bound is 0.73. Most middle-layer movements are smaller than the empirical sampling gap and are therefore not resolved.

Longer blocks accumulate enough motion to measure. The 3 to 9 block has centered efficiency 0.97 against a 0.95 calibration, and the 8 to 11 block reads 0.96. For Pythia-410m, every reported resolvable single transition is consistent with its calibration; the 4 to 20 block reads 0.96 against 1.03 and has a calibration-free lower bound of 0.86. These measurements support near-minimum cost only for resolvable transitions and blocks.

### Transport-map agreement

Agreement with the exact optimal assignment rises with depth. On Pythia-160m, the WikiText mean-flow rank correlation is 0.41 at 0 to 1, ranges from 0.38 to 0.62 through most middle transitions, reaches 0.80 at 10 to 11, and reaches 0.89 with median cosine 0.95 at the exit. Pile mean flows and raw WikiText states reach exit correlations of 0.85 and 0.74. Pythia-410m reaches 0.88 with median cosine 0.95. The largest reported shuffled-pairing null correlation is 0.08 for Pythia-160m and 0.10 among the displayed Pythia-410m transitions.

At the Pythia-160m exit, the Gaussian Brenier map explains 39% of token-specific motion. The remaining 61% still agrees with exact transport at correlation 0.83 and median cosine 0.94, supporting a nonlinear transport component. At the Pythia-410m exit the linear map explains 90%; its remainder is below the sampling floor, so nonlinear agreement is not established there.

### Training progression

For a fixed Pythia-160m document sample, exit agreement rises from 0.64 at initialization to 0.67 at step 4,000 and 0.86 after training; median cosine rises from 0.74 to 0.75 to 0.94. The 10 to 11 transition similarly rises from 0.18 to 0.42 to 0.77. Entry agreement moves in the opposite direction, from 0.52 before training to 0.37 after training. The result is therefore localized: training increases exit agreement rather than pushing every layer uniformly toward optimal transport.

## Limitations

- The 4,000-token exact assignments resolve only four of twelve Pythia-160m transitions and five of twenty-four Pythia-410m transitions. Most middle-layer single-step costs cannot support a positive or negative verdict.
- Evidence covers two small models from one family and two corpora. It does not establish that the pattern generalizes to larger language models, other architectures, or trained transformers outside language modeling.
- Exact assignments are measured in a 16-dimensional projection. Full-space translation-to-token-specific energy ratios show a similar qualitative pattern, but map and efficiency estimates are still camera-dependent.
- Context averaging strengthens agreement: raw occurrence states have lower exit correlation than mean token trajectories.
- The Pythia-160m exit is nonlinear beyond the fitted Gaussian map, but the resolvable Pythia-410m exit is largely linear. The experiment cannot determine whether the smaller model's excess cost or nonlinear behavior persists with scale.
- The supplied manuscript gives no publication year, venue, DOI, arXiv identifier, or code repository, so these metadata are not inferred.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: defines both the minimum-cost coupling and the Brenier map used as comparison targets.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: studies hidden-state motion across depth; this paper adds a distribution-level coupling test between adjacent layers.
- [[concepts/kinetic-energy-regularization|Kinetic-Energy Regularization]]: explicitly penalizes hidden-state motion in related continuous-depth models, whereas this paper measures unregularized trained transformers after the fact.

## Related Papers

- [[papers/ot-transformer-a-continuous-time-transformer-architecture-with-optimal-transport-regularization|OT-Transformer]]: imposes a kinetic transport penalty during training; the present paper instead asks whether ordinary trained transformer layers already approximate optimal couplings.
- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]]: a thematic library connection that measures individual hidden-state paths rather than whole-cloud transport cost and assignment.
- Biderman et al. (2023), "Pythia: A Suite for Analyzing Large Language Models Across Training and Scaling": supplies the model family and checkpoints.
- Sander et al. (2022), "Sinkformers: Transformers with Doubly Stochastic Attention": interprets constrained attention through Wasserstein geometry inside a layer, rather than testing the coupling between consecutive layer clouds.
- Finlay et al. (2020), "How to Train Your Neural ODE: The World of Jacobian and Kinetic Regularization": provides the excess-motion motivation cited by the manuscript.

[[index|Library home]]
