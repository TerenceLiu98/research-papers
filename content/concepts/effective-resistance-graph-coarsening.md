---
title: Effective Resistance Graph Coarsening
type: concept
tags:
  - graph-coarsening
  - statistical-shape-analysis
  - multiscale-analysis
---

## Overview

Effective-resistance graph coarsening uses an electrical-network distance to cluster nodes and construct lower-resolution graphs. For networks with curved edges, combining these clusters with elastic curve averaging retains a geometric representation at each scale, supporting comparison of objects with substantially different complexities.

## Key Ideas

- In the retinal shape-graph construction, edge lengths act as resistances and their reciprocals as conductances. Resistance distance supplies the within-graph dissimilarity for complete-linkage hierarchical clustering.
- A resolution parameter chooses the number of clusters as a fraction of the original node count. Each cluster is represented by the centroid of its node positions.
- An edge between coarse nodes exists when their clusters have connecting edges. Their elastic mean curve is rotated and rescaled to connect the new centroids; absent intercluster connections remain absent.
- Searching over resolutions of a complex graph can produce a closer and more interpretable comparison with a simpler target. This is a comparison of coarsened objects, not proof that the original graphs are equivalent.
- Coarsening removes fine structure. In the source paper, resistance clustering is preferred empirically to Euclidean and shortest-path alternatives, but only resistance-based results are shown.

## Important Papers

- [[papers/statistical-shape-analysis-of-shape-graphs-with-applications-to-retinal-blood-vessel-networks|Statistical Shape Analysis of Shape Graphs with Applications to Retinal Blood-Vessel Networks]]: combines resistance-based clustering and elastic intercluster edge means for multiscale shape statistics.
- Ellens et al. (2011), "Effective graph resistance": resistance reference cited by the shape-graph paper.

## Related Concepts

- [[concepts/statistical-shape-graphs|Statistical Shape Graphs]]
- [[concepts/geodesic-distance|Geodesic Distance]]: shortest-path node distance is an alternative clustering input in the source paper, distinct from the distance between whole graph shapes.
