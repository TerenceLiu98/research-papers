---
title: "Are Graph Transformers Necessary? Efficient Long-Range Message Passing with Fractal Nodes in MPNNs"
type: paper
authors:
  - Jeongwhan Choi
  - Seungjun Park
  - Sumin Park
  - Sung-Bae Cho
  - Noseong Park
year: 2025
arxiv: "2511.13010"
tags:
  - graph-neural-networks
  - long-range-dependencies
  - message-passing
---

## TL;DR

Fractal nodes augment message-passing networks with partition-level summaries and shortcuts, optionally mixing summaries across partitions with an MLP-Mixer. They improve several graph and node prediction benchmarks while retaining low measured overhead, offering an alternative to global attention rather than establishing that graph Transformers are universally unnecessary.

## Research Question

Can partition-level representations improve long-range information propagation while preserving the computational efficiency of local message passing?

## Motivation

Local message passing compresses distant information through limited paths and fixed-width representations. Dense global attention can bypass those paths but increases computation. The paper uses fractal self-similarity as motivation for retaining the original graph while adding representatives of its subgraphs.

## Contributions

- Introduces partition-specific fractal nodes as a plug-in for MPNNs.
- Combines mean features with learnably weighted high-frequency residual information.
- Adds an optional final-layer mixer for communication among partition summaries.
- Reports effective-resistance analysis, synthetic expressivity experiments, and graph prediction and large-scale node classification comparisons.

## Method

METIS partitions the graph into subgraphs. Each layer first performs ordinary [[concepts/neural-message-passing|Neural Message Passing]], then updates a fractal node from each partition's features and propagates its representation back to the partition's nodes. Original nodes and edges remain present.

The proposed aggregation combines a low-pass component (the partition mean) and a high-pass component (node features minus that mean), weighted by a learned scalar or vector. The supplied equations leave the reduction of node-specific residuals into one partition vector underspecified; the summary therefore does not infer an implementation.

FN applies these updates at every layer. FN_M additionally applies token and channel mixing to fractal-node representations at the final layer. For graph prediction, FN mean-pools original-node outputs; FN_M mean-pools mixed fractal-node outputs before an MLP.

Section 4 states that augmentation cannot increase pairwise effective resistance. The paper connects this to reduced information bottlenecks and reports supporting propagation experiments. It states FN complexity as O(L(|V| + |E|)) and an additional O(Cd²) term for FN_M, with C partitions and hidden width d. These are the paper's stated complexity expressions.

## Experiments

The evaluation covers six graph-level benchmarks, ogbn-arxiv and ogbn-products node classification, and synthetic long-range and expressivity tasks.

| Comparison | Baseline | Augmented model | Source |
|---|---:|---:|---|
| Peptides-func AP, GINE → GINE + FN_M | 0.6405 ± 0.0086 | 0.7018 ± 0.0074 | Table 2 |
| Peptides-struct MAE, GINE → GINE + FN_M | 0.2780 ± 0.0021 | 0.2446 ± 0.0018 | Table 2 |
| ogbn-arxiv accuracy (%), GCN → GCN + FN | 71.74 ± 0.29 | 73.03 ± 0.37 | Table 3 |
| ogbn-products accuracy (%), GraphSAGE → GraphSAGE + FN_M | 78.29 ± 0.16 | 83.11 ± 0.07 | Table 3 |

On TreeNeighboursMatch, the authors report standard MPNN failure beyond depth four and successful generalization of their methods through depth seven. GatedGCN + FN_M reaches 100% accuracy on SR25 and 96.50% on EXP, compared with 6.67% and 51.25% for GatedGCN (Table 1).

On ogbn-arxiv, GCN, GCN + FN, and GCN + FN_M each report 1.27 seconds per epoch and 16.49 GB memory. GraphGPS uses 1.32 seconds and 38.91 GB; PolyNormer is faster at 0.31 seconds and uses 16.09 GB (Table 5). Thus low augmentation overhead does not imply the fastest model overall. GraphGPS and Exphormer report out-of-memory results on ogbn-products in this setup.

Performance is not uniformly best: GRIT's CIFAR10 accuracy is 0.7647 versus 0.7526 for GatedGCN + FN_M. Adding the mixer also slightly lowers GINE's MNIST mean accuracy relative to FN alone (0.9786 versus 0.9790).

## Limitations

Partition quality and a fixed partition count limit adaptation to different graph structures. The supplied text refers proofs, filter ablations, partition sensitivity, alternative partitioners, and detailed experimental settings to an extended-version appendix that is not included here. Its expressivity discussion draws on subgraph-GNN results; the synthetic results should not be treated as a new general expressivity theorem. The fractal interpretation motivates the architecture but does not establish that every graph partition is self-similar.

## Related Concepts

- [[concepts/fractal-nodes|Fractal Nodes]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]] — feature homogenization is distinct from the information bottlenecks targeted here.

## Related Papers

- [[papers/transformers-are-graph-neural-networks|Transformers are Graph Neural Networks]] — a complementary conceptual account of attention as global message passing, rather than an experimental baseline in this paper.

Source: supplied parsed manuscript. The manuscript identifies [arXiv:2511.13010](https://arxiv.org/abs/2511.13010) as its extended version and provides [implementation code](https://github.com/jeongwhanchoi/MPNN-FN).

[[index|Library home]]
