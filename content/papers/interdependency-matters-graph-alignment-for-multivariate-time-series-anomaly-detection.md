---
title: "Interdependency Matters: Graph Alignment for Multivariate Time Series Anomaly Detection"
type: paper
authors:
  - Yuanyi Wang
  - Haifeng Sun
  - Chengsen Wang
  - Mengde Zhu
  - Jingyu Wang
  - Wei Tang
  - Qi Qi
  - Zirui Zhuang
  - Jianxin Liao
year: null
source_job_id: "97ae34c5-87cf-40d9-aca1-9ab6777b1251"
repository: "https://github.com/wyy-code/MADGA"
tags:
  - time-series-anomaly-detection
  - graph-alignment
  - optimal-transport
  - dynamic-graphs
  - normalizing-flows
---

## TL;DR

MADGA detects multivariate time-series anomalies by representing each window as a dynamic channel-interdependency graph and comparing it with other graphs in the batch. It combines Wasserstein node alignment, Gromov-Wasserstein edge alignment, and conditional normalizing-flow density estimation. On five reported benchmarks, it has the highest mean AUC-ROC among the compared methods, while ablations show that both alignment terms contribute.

## Research Question

Can unsupervised [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]] directly exploit changes in cross-channel relationships by reformulating detection as a [[concepts/graph-alignment|Graph Alignment]] problem over dynamic graphs?

## Motivation

Many multivariate detectors use channel relationships only to improve a forecasting, reconstruction, or density encoder. The paper instead treats a change in those relationships as anomaly evidence in its own right. Each time-series channel becomes a node, learned attention weights become edges, and anomalous windows are expected to align poorly with the predominantly normal windows in an unlabeled batch.

## Contributions

- Recasts multivariate time-series anomaly detection as joint alignment of graph node representations and edge structure.
- Constructs a dynamic graph for every window using self-attention over channels, then conditions node embeddings on the learned adjacency matrix.
- Combines Wasserstein distance for node alignment with Gromov-Wasserstein distance for edge alignment and uses entropic regularization for tractable optimization.
- Integrates graph-alignment distance with a conditional normalizing-flow likelihood in both training and anomaly scoring.
- Evaluates the method on SWaT, WADI, PSM, MSL, and SMD and reports component and hyperparameter ablations.

## Method

### Dynamic graph and conditional representation

For every window, MADGA treats channels as nodes and computes a directed attention matrix as the graph adjacency matrix. An LSTM encodes temporal behavior, after which graph convolution combines the hidden states with the learned adjacency matrix. This makes each node representation conditional on the current graph structure rather than independent of it.

### Joint node and edge alignment

For a graph in a batch, the comparison target is the remaining batch graphs. Node embeddings are compared with a Wasserstein transport cost, while adjacency relations are compared with a [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] cost. The combined graph-alignment term is

$$
\mathcal{D}_{GA}=\mathcal{D}_{WD}+\mathcal{D}_{GWD},
$$

with a weight $\lambda$ balancing the terms. The implementation uses entropy-regularized transport and Sinkhorn iterations to reduce the cost of solving the alignment problems.

### Density estimation and scoring

A graph-conditioned [[concepts/normalizing-flows|Normalizing Flow]] estimates channel likelihoods. Training minimizes graph-alignment distance while maximizing flow log-likelihood. At inference, the window score adds graph-alignment distance to average negative channel log-likelihood; larger values indicate greater abnormality. The decision threshold is the training-score upper quartile plus 1.5 times the interquartile range.

## Experiments

The study uses 60/40 splits of five labeled benchmarks and reports AUC-ROC. The compared methods include DeepSVDD, ALOCC, DROCC, DeepSAD, USAD, DAGMM, GANF, and MTGFlow.

| Dataset | Best compared baseline | MADGA |
| --- | ---: | ---: |
| SWaT | 84.2 +/- 1.4 | 88.9 +/- 0.7 |
| WADI | 91.9 +/- 1.1 | 92.0 +/- 1.0 |
| PSM | 84.9 +/- 2.4 | 87.2 +/- 1.4 |
| MSL | 66.4 +/- 1.8 | 68.1 +/- 1.6 |
| SMD | 91.5 +/- 7.2 | 92.1 +/- 6.7 |

Removing all graph alignment gives AUC-ROC values of 84.9, 83.2, 65.4, 91.5, and 91.9 on PSM, SWaT, MSL, SMD, and WADI, respectively, compared with 87.2, 88.9, 68.1, 92.1, and 92.0 for MADGA. Removing only Gromov-Wasserstein edge alignment hurts more than removing only Wasserstein node alignment on four of the five datasets; the WADI differences are within the reported variation. On SWaT, the best reported batch/window pair is batch size 512 and window length 80, reaching 88.9 +/- 0.7.

## Limitations

- The evaluation uses a 60/40 split of each labeled dataset, but the supplied text does not state whether threshold selection or all preprocessing choices were isolated from test labels.
- AUC-ROC is the only reported detection metric. The paper does not examine precision-recall behavior, event-level scoring, detection delay, or alert burden under severe imbalance.
- Alignment compares one graph with the remaining graphs in a batch, making scores and training behavior sensitive to batch composition. The SWaT sweep confirms material batch-size sensitivity.
- The method assumes that anomalous windows are relatively sparse so that the remaining batch provides an effectively normal reference. Performance under concentrated or correlated anomalies is not tested.
- The study reports training on A100 and A800 GPUs but provides no runtime, memory, throughput, or latency comparison, so the real-time motivation is not empirically established.
- The interdependency analysis is qualitative and limited to SWaT. Attention weights are treated as channel relations, but they are not validated as causal or physically meaningful dependencies.
- The source states that graph-alignment distance should be larger for anomalies, although one theoretical sentence says lower distances indicate anomalies; the scoring equation and surrounding method description support the former interpretation.
- The supplied Markdown gives no publication year, venue, DOI, or arXiv identifier, so none is inferred.

## Related Concepts

- [[concepts/graph-alignment|Graph Alignment]]: the paper's reformulation of anomaly detection as correspondence and discrepancy estimation between dynamic graphs.
- [[concepts/time-series-anomaly-detection|Time-Series Anomaly Detection]]: the broader unsupervised detection task and its evaluation concerns.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the Wasserstein node-matching objective and entropic transport computation.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares graph edge relations through pairwise structural distortion.
- [[concepts/normalizing-flows|Normalizing Flows]]: provides the conditional density component of the anomaly score.

## Related Papers

- Dai and Chen (2022), "Graph-Augmented Normalizing Flows for Anomaly Detection of Multiple Time Series": GANF, the graph-conditioned density-estimation baseline on which MADGA builds.
- Zhou et al. (2023), "Detecting Multivariate Time Series Anomalies with Zero Known Label": MTGFlow, the dynamic-graph normalizing-flow baseline used in the ablations.
- Wang et al. (2024), "Drift Doesn't Matter: Dynamic Decomposition with Diffusion Reconstruction for Unstable Multivariate Time Series Anomaly Detection": related reconstruction-based work cited for temporal modeling under drift.
- Peyre and Cuturi (2019), "Computational Optimal Transport: With Applications to Data Science": supplies the optimal-transport and Sinkhorn background used by the alignment module.

[[index|Library home]]
