---
title: Embedding Empirical Distributions for Computing Optimal Transport Maps
type: paper
authors:
  - Mingchen Jiang
  - Peng Xu
  - Xichen Ye
  - Xiaohui Chen
  - Yun Yang
  - Yifan Chen
year: 2025
arxiv: "2504.17740"
source_job_id: c8c7c3dc-f086-4b6a-a49a-0c3f71d40e17
tags:
  - optimal-transport
  - hypernetworks
  - distribution-embeddings
---

## TL;DR

HOTET embeds an empirical distribution with a transformer and uses hypernetworks to generate neural transport potentials. It learns maps from many source distributions to one fixed reference, then predicts maps for unseen sources. Gaussian-mixture experiments show substantially lower prediction error than Meta OT in dimensions 4–64, although Meta OT performs better in dimension 2 and error still grows with dimension.

## Research Question

Can shared distribution embeddings and parameter-generating networks replace separate optimization of every source-to-reference optimal transport map?

## Motivation

Repeated distribution alignment requires many related transport problems. Conventional neural solvers train potential networks separately for each pair. Sharing training across source distributions could amortize this work and expose reusable distribution representations.

## Contributions

- HOTET combines variable-size empirical-distribution embeddings with two hypernetworks generating transport-potential parameters.
- Joint training supports forward and inverse maps against a fixed reference without explicitly embedding that reference at inference.
- Gaussian-mixture benchmarks, WikiArt color transfer, and an embedding ablation evaluate map quality and generalization.

## Method

A transformer without positional encodings processes source samples. Its final block lifts the hidden dimension to the context dimension, and mean pooling produces a permutation-invariant embedding. Two hypernetworks transform this vector into parameters of input-convex neural networks. Gradients of the learned convex potentials approximate transport maps under quadratic cost.

For many-to-one training, both potential networks are conditioned on the source embedding. Losses from a base neural OT solver are aggregated across source/reference pairs; reference samples enter the training objective, so the fixed target is represented implicitly in the trained parameters. Experiments use MM-B or MMv2 according to stability. Small hypernetwork weight initialization and residual ICNN connections replace an explicit identity-map pretraining stage (Section III).

This is a form of [[concepts/amortized-optimal-transport|Amortized Optimal Transport]]. Its fixed-reference task is narrower than general paired [[concepts/measure-to-measure-regression|Measure-to-Measure Regression]].

## Experiments

**Unseen Gaussian mixtures (Table III).** Training uses 500 three-component mixtures and one reference; testing uses 100 new mixtures. Values below are forward-map L2 unexplained variance percentage, mean ± standard deviation over ten runs; lower is better.

| Dimension | HOTET prediction | Meta OT prediction |
| --- | --- | --- |
| 2 | 3.13 ± 0.47 | 2.63 ± 0.45 |
| 4 | 3.37 ± 0.27 | 20.27 ± 2.11 |
| 16 | 10.59 ± 0.25 | 73.70 ± 0.82 |
| 64 | 28.29 ± 0.83 | 93.14 ± 0.25 |

At dimension 64, inverse-map prediction error is 26.49 ± 0.35 for HOTET versus 94.11 ± 0.41 for Meta OT.

**Individual-map benchmark (Tables I–II).** With identical ICNN architectures, HOTET improves on Meta OT but does not uniformly outperform directly trained MM-B. At dimension 64, forward error is 37.62 ± 0.84 for HOTET and 23.63 ± 0.25 for MM-B. These experiments test representational capacity rather than the main amortization advantage.

**Embedding ablation (Table IV).** Removing the embedding module raises dimension-64 prediction error from 28.29 to 83.71 for forward maps and from 26.49 to 69.54 for inverse maps.

**Color transfer (Section IV-D).** Images are empirical RGB distributions. Qualitative examples cover single-pair and multiple-source transfer. Unseen-image adaptation uses 50 fine-tuning steps rather than a full 5,000-step run; this experiment is not zero-shot prediction.

## Limitations

- The demonstrated generalization setting fixes the reference distribution. The authors identify many-to-many distribution pairs as unresolved.
- Prediction error increases with dimension, and single-map fitting does not consistently beat direct optimization.
- The supplied text defers timing evidence, implementation details, and several comparisons to appendices in the referenced extended version; those appendices are absent here.
- Color-transfer evidence is qualitative and includes adaptation. It does not establish universal out-of-distribution generalization or measured end-to-end speedups.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: quadratic-cost maps recovered from convex potentials.
- [[concepts/amortized-optimal-transport|Amortized Optimal Transport]]: shares computation across distribution-specific transport problems.
- [[concepts/measure-to-measure-regression|Measure-to-Measure Regression]]: broader learning problem with paired distribution-valued observations.

## Related Papers

- Amos et al. (2023), “Meta Optimal Transport”: amortized map prediction and the main predictive baseline (source reference 27).
- Bunne et al. (2022), “Supervised Training of Conditional Monge Maps”: context-conditioned transport learning (reference 26).
- Korotin et al. (2021), “Do Neural Optimal Transport Solvers Work? A Continuous Wasserstein-2 Benchmark”: benchmark and base solvers (reference 30).
- [[papers/ot-transformer-a-continuous-time-transformer-architecture-with-optimal-transport-regularization|OT-Transformer]]: uses transport to regularize transformer dynamics, whereas HOTET uses transformers to generate transport maps (reference 22).

Code reported by the paper: [HOTET](https://github.com/JiangMingchen/HOTET).
