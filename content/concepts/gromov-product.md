---
title: Gromov Product
type: concept
aliases:
  - Rooted Gromov Product
tags:
  - hyperbolic-geometry
  - hierarchical-representations
  - identifiability
---

## Overview

The Gromov product measures how much of the route from a reference root two points share. For a metric $d$ and root $o$,

$$
(z\mid w)_o=\frac{d(o,z)+d(o,w)-d(z,w)}{2}.
$$

In an exact rooted tree metric it equals the depth of the lowest common ancestor. In hyperbolic representations it provides a shared-ancestry interpretation whose accuracy depends on how well the geometry represents the tree metric.

## Key Ideas

- **Root dependence:** Raw products depend on the root. For a row-by-column matrix $G_{ij}=(z_i\mid w_j)_o$, changing the root adds only a row term plus a column term.
- **Identified interaction:** In a binary response model with unrestricted row and column effects, the root-invariant quantity is $\mathcal H=\lambda\mathsf P_{\mathcal A^\perp}G$, where $\mathcal A$ is the additive matrix subspace. For a complete rectangular matrix, this projection subtracts row and column means and adds the grand mean.
- **Distance equivalence:** The identity $-\gamma d(z_i,w_j)=-\gamma d(o,z_i)-\gamma d(o,w_j)+2\gamma G_{ij}$ makes distance and shared-ancestry predictors likelihood-equivalent after shifting unrestricted main effects. Radial depth alone is therefore not identified by that likelihood.
- **Collapse:** If both node types lie on one root-directed geodesic ray and every point of one type is deeper than every point of the other, the Gromov matrix is additive and its projected signal vanishes. This does not assert collapse for every possible arrangement on a ray.
- **Interpretation needs conditions:** Identification of the projected interaction does not imply recovery of a unique tree, coordinates, or interaction coefficient. Curvature rescaling and weak branch separation introduce further ambiguities.
- **Observation design matters:** Complete-matrix projection is a population target. Accurate prediction on a partially observed design does not automatically identify or recover the full matrix under informative missingness.

These modeling consequences are developed in Sections 2-4 and 6 of the HELPI paper.

## Important Papers

- [[papers/hyperbolic-latent-position-models-for-hierarchical-bipartite-data|Hyperbolic Latent Position Models for Hierarchical Bipartite Data]]: establishes distance equivalence, the projected hierarchy signal, collapse, and conditional local branch identification for bipartite response models.
- Bridson and Haefliger (1999), *Metric Spaces of Non-Positive Curvature*: geometric reference cited by HELPI for Gromov products and hyperbolic approximation.

## Related Concepts

- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: choosing a latent metric to represent structural hypotheses.
- [[concepts/geodesic-distance|Geodesic Distance]]: intrinsic distances used to form the product.
- [[concepts/item-response-theory|Item Response Theory]]: additive respondent and item effects that can absorb radial contributions.
