---
title: "Transformers from Diffusion: A Unified Framework for Neural Message Passing"
type: paper
authors:
  - Qitian Wu
  - David Wipf
  - Junchi Yan
year: null
tags: [graph-learning, transformers, neural-diffusion]
---

## TL;DR

The paper interprets neural message passing as discrete diffusion steps that descend a regularized energy, and derives DIFFormer attention layers for observed or latent graphs. DIFFormer-s computes global propagation in linear time in the number of nodes at fixed hidden dimension; DIFFormer-a uses more expressive, quadratic-cost sigmoid attention.

The supplied manuscript extends the ICLR 2023 DIFFormer paper; its own publication year and stable identifier are not established in the supplied text.

[[index|Library home]]

## Research Question

Can one energy-constrained diffusion framework explain propagation in graph neural networks and Transformers while guiding scalable architectures for data with unreliable or absent graph structures?

## Motivation

Observed edges may omit useful interactions or encode misleading ones. Learning arbitrary latent graphs can be expensive and difficult with limited labels. Diffusion supplies a propagation principle, while an energy function specifies which forms of representation consistency that propagation should encourage.

## Contributions

- Connects static diffusion to quadratic energies and familiar graph propagation rules, with step-size conditions and analysis of energy decay.
- Derives adaptive attention from concave, non-decreasing penalties on pairwise embedding distances.
- Introduces two DIFFormer implementations and extensions incorporating feature transformations, observed edges, and source terms against oversmoothing.
- Evaluates observed, partially observed, and unobserved structures across graph, temporal, image, text, and particle tasks.

## Method

The core dynamics are diffusion of node states: each state moves toward other states at rates given by a coupling matrix. Explicit Euler discretization produces residual message passing. For row-normalized coupling, the update is

$$
z_i^{(k+1)}=(1-\tau)z_i^{(k)}+\tau\sum_j s_{ij}^{(k)}z_j^{(k)}.
$$

The adaptive construction uses an energy combining proximity to the current states with a sum of penalties on squared pairwise distances. Coupling weights are proportional to the derivative of a concave, non-decreasing penalty and normalized over senders. The resulting weights decrease with distance, reducing the influence of dissimilar pairs (Sections 3–5).

With unit-normalized representations, DIFFormer-s uses similarity $1+z_i^\top z_j$. Reordering the aggregation avoids constructing the full attention matrix and costs $O(Nd^2)$. DIFFormer-a uses sigmoid similarity and explicitly computes pairwise attention, costing $O(Nd^2+N^2d)$ in the Appendix C implementation. Learned query, key, and value projections support practical feature transformations. Observed graph propagation can be added, and source information can be injected to preserve node distinctions at greater depths.

## Experiments

Reported means and standard deviations include five runs; metrics below follow Tables 2, 3, and 7.

| Dataset | Metric (%) | DIFFormer-s | DIFFormer-a | Comparator |
| --- | --- | --- | --- | --- |
| Cora | Accuracy | 85.9 ± 0.4 | 84.1 ± 0.6 | NodeFormer: 83.4 ± 0.2 |
| Citeseer | Accuracy | 73.5 ± 0.3 | 75.7 ± 0.3 | LDS: 74.8 ± 0.3 |
| Proteins | ROC-AUC | 79.49 ± 0.44 | Not evaluated | NodeFormer: 77.45 ± 1.15 |
| Pokec | Accuracy | 69.24 ± 0.76 | Not evaluated | NodeFormer: 68.32 ± 0.45 |
| SynMol | ROC-AUC | 71.76 ± 0.25 | 73.28 ± 1.65 | NodeFormer: 69.92 ± 0.42 |

Large graphs use minibatch training. Heterophily experiments use revised Chameleon and Squirrel splits intended to remove overlapping-node leakage. Temporal experiments use chronological 2:2:6 training/validation/test splits; omitting observed graphs improves four of six variant–dataset comparisons. Image experiments operate on SimCLR/ResNet-18 features with limited labels, rather than training image recognition from pixels within DIFFormer.

Depth ablations show deterioration without a source term and more stable performance with it. Appendix F reports a batch-size tradeoff on Pokec: accuracy rises from 65.24 ± 0.34 at 5,000 nodes per batch to 69.24 ± 0.76 at 100,000, while memory rises from 1,244 to 2,928 MB.

## Limitations

The energy interpretation has conditions on coupling functions, normalization, and step sizes; it is not a blanket guarantee for arbitrary attention. The paper explicitly notes that original GAT similarity need not decrease with distance, motivating an extended formulation. Adaptive diffusion alone can still oversmooth. DIFFormer-a has quadratic pairwise costs and runs out of memory on Pokec in the reported 16 GB GPU comparison. Small minibatches reduce accuracy, and the more expressive variant does not consistently outperform DIFFormer-s. The evaluations demonstrate performance under the reported datasets and protocols, rather than a universal ranking of graph architectures.

## Related Concepts

- [[concepts/energy-constrained-diffusion|Energy-Constrained Diffusion]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]

## Related Papers

- Wu et al. (2023), “DIFFormer: Scalable (Graph) Transformers Induced by Energy Constrained Diffusion”: the conference predecessor, explicitly distinguished from this expanded manuscript.
- [[papers/transformers-are-graph-neural-networks|Transformers are Graph Neural Networks]]: a complementary architectural connection between attention and graph propagation.
