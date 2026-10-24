---
title: Structure-Centric Graph Foundation Model via Geometric Bases
type: paper
authors:
  - Xiaodong He
  - Haolan He
  - Ruiyi Fang
  - Ming Sun
  - Zhao Kang
year: null
tags:
  - graph-foundation-models
  - graph-representation-learning
  - optimal-transport
  - few-shot-learning
---

## TL;DR

SCGFM represents heterogeneous graphs by their distances to a learned dictionary of geometric bases. It uses sliced [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] alignment to produce shared structural coordinates and transport plans to project incompatible node features into a common, structure-conditioned representation.

## Research Question

Can a graph foundation model transfer across graph domains with different topologies, graph sizes, and node-feature spaces without dataset-specific adapters or feature preprocessing?

## Motivation

Graphs lack the shared coordinate system available to text tokens or image grids: node identities are arbitrary, topology varies across domains, and feature dimensions or semantics may be incompatible. Feature projections align attributes but not intrinsic graph structure, while graph tokenization can introduce order into permutation-invariant objects. The paper therefore treats graph topology as the primary transferable signal and models each graph as a metric measure space.

## Contributions

- Introduces a structure-centric [[concepts/graph-foundation-models|Graph Foundation Model]] whose learned geometric bases form a common coordinate system for heterogeneous graphs.
- Defines structural coordinates by softmax-normalizing each graph's Gromov-Wasserstein discrepancies to the bases, with a Lipschitz stability result under bounded GW perturbations.
- Re-encodes node features through GW transport plans, permitting feature dimensions and semantics to differ across datasets without dataset-specific preprocessing.
- Reports fixed-encoder few-shot graph and node classification, retrieval, ablation, geometry-alignment, interpretability, and scalability studies across 12 datasets from five domains.

## Method

Each geometric base is a finite metric measure space with $M$ points, a learned symmetric, hollow, bounded pseudo-metric matrix, and a uniform measure. An input graph uses its adjacency matrix as the structural kernel and a degree-normalized node measure. Sliced Gromov-Wasserstein (SGW) estimates the discrepancy $\delta_k$ between the graph and each of $K$ bases, and a temperature-scaled softmax converts these discrepancies into structural coordinates $\mathbf{w}$.

Training combines three objectives: an SGW reconstruction loss between the input graph and the linear surrogate $\sum_k w_k\mathbf{B}_k$; mean-squared reconstruction of degree, clustering, and motif statistics from $\mathbf{w}$; and a margin loss that discourages basis collapse. The linear combination is explicitly presented as a tractable surrogate rather than an exact GW barycenter.

For transfer, the GW coupling $\mathbf{T}_{ik}$ projects input features onto each base. The weighted projection $\mathbf{H}(G)$ is concatenated with $\mathbf{w}$ and a frozen nonlinear decoding $f(\mathbf{w})$. Graph classification uses this frozen representation with a prototypical classifier. Node classification is converted into graph classification by extracting fixed Personalized PageRank ego-subgraphs around target nodes.

## Experiments

Under a unified 5-shot protocol with 50 runs, SCGFM reports an average graph-classification accuracy of 51.70% across the ten settings in Table 1, compared with 45.70% for the strongest listed baseline average. Its largest graph-transfer advantage is on COLORS-3, where it obtains 26.31% and 26.97% from the two source groups while listed baselines remain at or below 15.65%.

For node classification, SCGFM reports a 65.90% average across ten in-domain and cross-domain settings. On Reddit it obtains approximately 84.17% from either source group, and on Cora it obtains approximately 70.55%. The authors attribute this source stability partly to the high-dimensional structure-conditioned feature representation; the ablation supports the dependence, since removing $\operatorname{vec}(\mathbf{H})$ on Cora reduces accuracy from 70.54% to 29.49%.

The representation components behave differently by domain. On MUTAG, structural coordinates alone reach 80.42%, while features alone reach 73.50%; on PROTEINS, removing projected features slightly improves performance from 68.70% to 68.86%. Retrieval experiments on MUTAG and COX2 report higher P@10, MAP@10, and kNN@10 than GCN, GAT, and GIN. Latent Euclidean and exact GW distances correlate at $\rho=0.7005$ on NCI1, while SGW and exact GW distances correlate at $\rho=0.7576$ on 500 PROTEINS pairs.

The scalability stress test reports that SCGFM is the only compared method to complete the 5-million-node setting within 24 GB of GPU memory, taking 19.96 seconds and approximately 12 GB peak memory. A separate diagnostic reports that the linear reconstruction surrogate changes average SGW error from 0.018739 to 0.018776 while reducing per-graph inference from 1.47 ms to 0.04 ms.

## Limitations

- The finite-cover motivation assumes real-world graphs occupy a totally bounded subset of metric-measure space; the experiments do not establish that assumption for arbitrary graph domains.
- The bases use bounded pseudo-metrics without enforcing the triangle inequality, so their matrices need not be literal metrics despite the metric-space framing.
- The linear reconstruction is not an exact GW barycenter, and SGW is an approximation to exact GW; the reported correlations are substantial but imperfect.
- Node-level transfer relies on a graph-to-subgraph reduction and is sensitive to sampling strategy and subgraph size. In the reported CiteSeer-to-Cora study, PPR performs best for SCGFM and performance generally saturates around 64--128 nodes.
- Feature and structural components contribute unevenly across datasets. The paper proposes a support-set Fisher ratio for component weighting, but the main representation concatenates all components rather than resolving this dependence universally.
- The experiments cover classification and retrieval on the listed benchmarks; they do not demonstrate broad transfer to graph generation, regression, link prediction, or dynamic graphs.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/graph-foundation-models|Graph Foundation Models]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/deep-metric-learning|Deep Metric Learning]]

## Related Papers

- Vayer et al. (2019), "Sliced Gromov-Wasserstein": supplies the scalable approximation used for structural alignment.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": motivates the barycentric reconstruction setting that SCGFM approximates with a linear surrogate.
- Vincent-Cuaz et al. (2021), "Online Graph Dictionary Learning": a related graph-dictionary approach distinguished by SCGFM's intrinsic structural bases.
- Wang et al. (2025), "Multi-Domain Graph Foundation Models: Robust Knowledge Transfer via Topology Alignment": a cross-domain GFM baseline included in the supplementary comparison.

[[index|Library home]]
