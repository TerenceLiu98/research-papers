---
title: "DyERNIE: Dynamic Evolution of Riemannian Manifold Embeddings for Temporal Knowledge Graph Completion"
type: paper
authors:
  - Zhen Han
  - Peng Chen
  - Yunpu Ma
  - Volker Tresp
year: 2020
doi: 10.18653/v1/2020.emnlp-main.593
anthology_id: 2020.emnlp-main.593
tags:
  - temporal-knowledge-graphs
  - knowledge-graph-completion
  - riemannian-representation-learning
  - product-manifolds
  - hyperbolic-embeddings
---

## TL;DR

DyERNIE represents each entity as a constant-velocity trajectory on a product of constant-curvature manifolds and scores timestamped facts with relation-specific transformations and geodesic distance. On ICEWS14, ICEWS05-15, and GDELT, its product-manifold variant achieves higher filtered link-prediction scores than the paper's static, temporal, single-manifold, and Euclidean comparisons; the gains are largest on ICEWS05-15, where 100-dimensional filtered MRR reaches 73.9 versus 66.2 for the Euclidean variant and 49.8 for the strongest listed temporal baseline.

## Research Question

Can [[concepts/temporal-knowledge-graph-completion|Temporal Knowledge Graph Completion]] benefit from modeling entity evolution on products of curved spaces rather than in a single Euclidean latent space?

## Motivation

Temporal knowledge graphs can combine hierarchical, cyclic, and approximately flat structures while their entities and relations change over time. A Euclidean embedding may distort hierarchical structure, while one constant-curvature space may be too restrictive for heterogeneous geometry. DyERNIE therefore combines manifold components and makes entity representations time-dependent without learning a separate embedding for every timestamp.

## Contributions

- Introduces temporal entity embeddings whose initial positions and entity-specific velocity vectors define trajectories on Riemannian manifolds.
- Extends the representation to product manifolds assembled from hyperbolic, Euclidean, and spherical constant-curvature components.
- Uses estimated sectional-curvature distributions to initialize the number and type of components, then selects component dimensions and curvatures by validation performance.
- Defines a relation-aware geodesic score and evaluates the resulting model on three temporal knowledge graph completion benchmarks.
- Analyzes the effects of geometry, temporal dynamics, score design, embedding dimension, node degree, and velocity norm.

## Method

### Dynamic Entity Representations

For entity $e_j$ and product component $i$, DyERNIE maps an initial manifold point to the tangent space at the origin, adds a learned constant velocity scaled by time, and maps the result back:

$$
\mathbf e_j^{(i)}(t)=\exp_{\mathbf 0}^{K_i}\left(\log_{\mathbf 0}^{K_i}(\bar{\mathbf e}_j^{(i)})+\mathbf v_j^{(i)}t\right).
$$

The initial embedding captures stationary structure and the velocity captures a linear temporal trend. Concatenating component embeddings yields a point on a product manifold; squared product distance is the sum of squared component distances. Hyperbolic, Euclidean, and spherical components respectively supply negative, zero, and positive constant curvature. This is an instance of [[concepts/riemannian-representation-learning|Riemannian Representation Learning]].

### Relation-Aware Scoring and Learning

Each relation has a diagonal transformation for the subject and a translation for the object in every component. The quadruple score sums negative squared geodesic distances between these relation-adjusted embeddings, plus entity biases. Training adds reciprocal relations, corrupts subjects or objects for negative samples, minimizes binary cross-entropy, and updates manifold parameters with Riemannian stochastic gradient descent.

The model estimates graph-curvature histograms from temporal slices using deviations from the parallelogram law. These estimates initialize candidate signatures, but do not determine them by themselves: Bayesian optimization and validation MRR select dimensions and fixed curvatures. The reported ICEWS configurations use hyperbolic components, whereas GDELT uses spherical components.

## Experiments

The evaluation uses ICEWS14, ICEWS05-15, and a January 2018 GDELT subset. For each held-out quadruple, subject and object queries rank every entity under the filtered protocol. Metrics are MRR and Hits@1/3/10. Baselines include static TransE, DistMult, and ComplEx on time-collapsed graphs and temporal TTransE, TDistMult, TComplEx, and HyTE. The paper parameter-matches the listed baselines to the 100-dimensional DyERNIE setting and tunes models using validation MRR.

| Dataset | DyERNIE-Prod MRR | DyERNIE-Sgl MRR | DyERNIE-Euclid MRR | Best listed temporal baseline MRR |
| --- | ---: | ---: | ---: | ---: |
| ICEWS14 | 66.9 | 65.7 | 63.3 | 34.4 (TTransE) |
| ICEWS05-15 | 73.9 | 71.2 | 66.2 | 49.8 (TDistMult) |
| GDELT | 45.7 | 45.4 | 42.6 | 30.6 (TComplEx) |

These are filtered percentages at the paper's 100-dimensional DyERNIE setting. The product model also leads the single-manifold and Euclidean variants at dimensions 10, 20, and 40 on all three datasets, though its advantage over the single-manifold model is sometimes small: at dimension 100 on GDELT, MRR differs by 0.3 points.

On ICEWS14 with one hyperbolic component, dimension 40, and curvature $-1$, the proposed linear trajectory obtains 55.87 MRR, compared with 52.50 for a periodic trajectory and 53.52 for their combination. On ICEWS05-15 at dimension 20, removing the dynamic component lowers MRR from 63.8 to 38.6 and Hits@1 from 55.9 to 28.3. The score-function ablation reports its largest loss when the relation translation is removed.

## Limitations

- Entity motion is a constant-velocity line in one tangent space. The tested sinusoidal alternatives perform worse in one ICEWS14 setting, but this does not establish that linear evolution is generally sufficient.
- Curvatures and component dimensions are fixed hyperparameters selected using validation performance after a data-derived initialization. Geometry is therefore not recovered uniquely from the graph, and the search adds model-selection cost.
- The evaluation is transductive link completion over three event datasets. It does not test unseen entities, extrapolation beyond the observed time range, forecasting under distribution shift, or other knowledge-graph domains.
- The product-space gains over a single curved manifold are consistent but can be modest, especially on GDELT. The experiments do not isolate whether each component learns a distinct interpretable structure.
- The model assigns one velocity per entity, so parameter count scales with the entity vocabulary. Reported non-Euclidean variants also run more slowly than the Euclidean variant in the appendix.
- Visual correlations between node degree, radius, and velocity support a hierarchical interpretation but do not identify the true latent geometry or a causal mechanism.

## Related Concepts

- [[concepts/temporal-knowledge-graph-completion|Temporal Knowledge Graph Completion]]: prediction of missing subjects or objects in timestamped relational facts.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: uses curved latent spaces as structural inductive biases.
- [[concepts/geodesic-distance|Geodesic Distance]]: supplies the component-wise plausibility measure in the score function.

## Related Papers

- Dasgupta, Ray, and Talukdar (2018), "HyTE: Hyperplane-based Temporally aware Knowledge Graph Embedding": a temporal Euclidean baseline that associates timestamps with hyperplanes.
- Balazevic, Allen, and Hospedales (2019), "Multi-relational Poincare Graph Embeddings": the source of relation-specific hyperbolic transformations adapted by DyERNIE.
- Gu, Sala, Gunel, and Ré (2019), "Learning Mixed-Curvature Representations in Product Spaces": motivates mixed-curvature product representations and curvature-based signature estimation.
- Goel et al. (2020), "Diachronic Embedding for Temporal Knowledge Graph Completion": a contemporary temporal embedding approach discussed by the paper but not included in its reported baseline table.

Publication metadata: EMNLP 2020, ACL Anthology ID 2020.emnlp-main.593, DOI 10.18653/v1/2020.emnlp-main.593.

[[index|Library home]]
