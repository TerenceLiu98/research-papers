---
title: Statistical Shape Analysis of Shape Graphs with Applications to Retinal Blood-Vessel Networks
type: paper
authors:
  - Aditi Basu Bal
  - Xiaoyang Guo
  - Tom Needham
  - Anuj Srivastava
year: null
tags:
  - statistical-shape-analysis
  - graph-matching
  - retinal-vessel-networks
---

## TL;DR

The paper develops an object-based framework for comparing networks whose edges are curves. Weighted elastic edge shapes support interpretable deformations, while resistance-based coarsening brings graphs of different complexities to comparable resolutions. Demonstrations on simulated and retinal blood-vessel graphs cover registration, mean shapes, tangent PCA, and clustering.

## Research Question

How can networks be compared and statistically summarized while retaining node locations, connectivity, and full edge geometry, even when their numbers of nodes and edges differ substantially?

## Motivation

Morphological feature vectors typically cannot be inverted into complete objects, making it difficult to visualize population means or modes of variation. Graph connectivity alone omits vessel curvature, while tree-specific registration relies on a hierarchy that general shape graphs lack. Joint registration of nodes and points along edges is the central computational obstacle.

## Contributions

- A weighted edge-shape space that separates edge existence from curve geometry and gives a geodesic interpretation to edges appearing or disappearing.
- A multiscale representation combining hierarchical node clustering with elastic averaging of intercluster curves.
- Approximate graph registration and statistical tools for graph means, tangent PCA, and distance-based clustering, demonstrated on STARE and DRIVE retinal networks.

## Method

### Weighted edges and registration

Each graph consists of node positions and an adjacency function valued in weighted curve shapes. A curve is represented by its square-root velocity function, with elastic comparison optimizing over reparameterizations. An edge is a pair $([q],w)$; all pairs with zero weight are identified as a single absent-edge state. Equation (4) defines

$$
d_\eta\bigl(([q_0],w_0),([q_1],w_1)\bigr)
=\min\left\{d_{\mathrm{SRV}}([q_0],[q_1])+\eta|w_0-w_1|,\;\eta(w_0+w_1)\right\}.
$$

The alternatives correspond to direct shape deformation with weight interpolation, or a path through the absent-edge state. Theorem 1 establishes a geodesic metric on the weighted edge space. Graph comparison minimizes a weighted sum of squared edge discrepancies and node-position discrepancies over node permutations. Null-node padding accommodates unequal node counts.

Factorized Graph Matching (FGM) approximately solves an affinity-based surrogate; the paper explicitly notes that this surrogate is not equivalent to the original distance minimization. Dynamic programming registers points along edge curves. Experiments use edge lengths as weights, $\eta=1$, $\lambda=0.5$, and a real-to-null matching parameter selected from $\{0.5,0.7,0.9\}$.

### Multiscale comparison and statistics

[[concepts/effective-resistance-graph-coarsening|Effective Resistance Graph Coarsening]] groups nodes using complete-linkage hierarchical clustering, with inverse edge lengths serving as conductances. Cluster centroids become coarse nodes. Curves joining two clusters are replaced by their elastic Karcher mean, rotated and rescaled to the new endpoints. The resolution controls the number of clusters; searching resolutions of the more complex graph minimizes its distance to a fixed target.

A graph mean is estimated by alternating registration to a template with averaging of aligned representations. Tangent PCA of aligned deviations provides Euclidean coefficients and visualizable deformation directions. A separate mode-clustering procedure consumes pairwise graph distances to estimate clusters and identify outliers (Sections 3-4).

## Experiments

Retinal graphs are extracted from segmented STARE and DRIVE images using Vessel tech, cleaned of small disconnected pieces, and split into top and bottom components by a Fiedler-vector partition. Segmentation itself is outside the paper's scope.

| Evaluation | Reported finding |
| --- | --- |
| Registration of perturbed graphs with known correspondences | Computed distances are within 0.001 of distances under ground-truth registrations in the illustrated examples (Section 2.4.5). |
| Resolution matching | In Figure 9, graph distances change from 3029.1 to 1823.8 and from 3329.1 to 2138.3 after simplifying the more complex graph. These compare different representations, rather than measuring registration error against a fixed target correspondence. |
| Mean of five graphs | Figure 10 reports sums of squared distances to the mean of $1.6833\times10^7$ at full resolution and $9.3984\times10^6$ at matched resolutions, with a visually cleaner coarse mean. |
| Tangent PCA | Simulated small, medium, and large distortions yield interpretable variation modes. Six real retinal graphs show more complex, correlated variation and less clean separation of effects. |
| Clustering 30 retinal components | For 15 top and 15 bottom components, the procedure selects two clusters and flags two outliers (Section 4.2). |

For sparse graphs, the reported matching complexity is $O(tn^3+n^2\ell^2)$, where $n$ is the padded node count, $\ell$ the samples per edge, and $t$ the FGM iteration count. The runtime illustration uses $\ell=30$ on an Intel i9-10940X server with 125 GB RAM.

## Limitations

Registration is heuristic, can settle in local minima, and becomes expensive for large graphs. Coarsening changes the object being compared and discards fine detail. The authors report preferring effective resistance to Euclidean and shortest-path clustering, but present only the resistance results rather than a quantitative comparison of all three choices.

Real-network geodesics have no ground-truth registration for evaluation. Low-weight edges are suppressed in some PCA visualizations, which can make connected structures appear disconnected. Disease regression and diagnostic evaluation are future directions, not demonstrated outcomes.

The supplied Markdown contains inconsistent mathematical notation: the zero-weight case of Theorem 1 omits the weight factor present in Equation (4), and the resistance expression refers to an inverse of the graph Laplacian without clarifying how its singularity is handled. The summary uses Equation (4) and does not reproduce these ambiguous formulas. Publication year and a stable identifier for this paper are not supplied.

## Related Concepts

- [[concepts/statistical-shape-graphs|Statistical Shape Graphs]]: joint analysis of connectivity, node placement, and curve geometry.
- [[concepts/effective-resistance-graph-coarsening|Effective Resistance Graph Coarsening]]: construction of comparable graph resolutions.
- [[concepts/geodesic-distance|Geodesic Distance]]: shortest deformations in the edge-shape and graph representations.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: related structural matching with probabilistic correspondences, discussed as prior work rather than used as the solver.

## Related Papers

- Guo, Bal, Needham, and Srivastava (2020), "Statistical shape analysis of brain arterial networks (BANs)," arXiv:2007.04793: predecessor shape-graph framework, cited as reference [19].
- Jain and Obermayer (2009), "Structure spaces": metric-space attributed graphs underlying the construction, reference [23].
- Sukurdeep, Bauer, and Charon (2021), "A new variational model for shape graph registration with partial matching constraints": alternative weighted registration framework, reference [33].
- Zhou and De la Torre, "Factorized graph matching": registration solver, references [45]-[46].

[[index|Library home]]
