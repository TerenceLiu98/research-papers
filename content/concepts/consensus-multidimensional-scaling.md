---
title: Consensus Multidimensional Scaling
type: concept
aliases:
  - CoMDS
  - Consensus Dimension Reduction
  - Consensus Ideal Points
tags:
  - multi-view-learning
  - multidimensional-scaling
  - latent-variable-models
  - ideal-point-estimation
---

## Overview

Consensus multidimensional scaling (CoMDS) learns a shared coordinate system from several representations of the same observations. Instead of concatenating their coordinates, it compares pairwise dissimilarities within each source and finds a consensus embedding whose weighted distances approximate all sources. This makes the target a common geometry rather than an average of coordinate values.

## Key Ideas

- **Sources are views, not columns:** Each source contributes a distance structure as one group. A high-dimensional source therefore does not automatically receive more influence merely because it contains more coordinates.
- **Coordinates may be arbitrary:** Distance-based fitting is invariant to shifts and rotations. Diagonal source weights accommodate coordinate-wise rescaling in the stated CoMDS formulation.
- **Dimensions can differ:** Input sources may have different latent dimensions, while the analyst chooses the dimension of the consensus output.
- **Missingness is handled pairwise:** A source contributes to the objective only when both observations in a pair have estimates in that source. This avoids a required imputation step but does not model why values are missing.
- **Optimization uses MDS stress:** The method minimizes squared discrepancies between source distances and source-weighted distances in the common space. The cited implementation uses SMACOF majorization with constrained updates.
- **Projection separates shared and residual structure:** Projecting a source coordinate matrix onto the learned consensus subspace yields its consensus-aligned component. The orthogonal residual describes variation not represented by the consensus, without establishing what generated it.
- **Relative error measures alignment:** A source's normalized reconstruction error shows how much it disagrees with the shared geometry. It is not an accuracy score because latent constructs generally lack a known ground truth.
- **Leave-one-source-out analysis measures stability:** Re-estimating the embedding without each source reveals whether the consensus depends strongly on one view. Correlation applies to a one-dimensional output; subspace correlation handles multiple dimensions.
- **Consensus is input-relative:** Adding, duplicating, grouping, or omitting sources can change what counts as shared. Stability checks support interpretation but cannot validate the construct by themselves.
- **Missing values can still move cases:** When an observation lacks a source value, its position is determined by fewer pairwise constraints. The direction of movement depends on how the unobserved source would have differed from its observed views.

## Important Papers

- An and Tang (2025), "Consensus Dimension Reduction via Multi-View Learning": methodological work cited as the source of CoMDS.
- [[papers/estimating-consensus-ideal-points-using-multi-source-data|Estimating Consensus Ideal Points Using Multi-Source Data]]: applies CoMDS to roll-call, campaign-finance, and campaign-platform estimates and develops projection and stability tools for substantive use.
- Carroll and Chang (1970), "Analysis of Individual Differences in Multidimensional Scaling via an N-Way Generalization of Eckart-Young Decomposition": cited psychometric foundation for source-weighted multidimensional scaling.

## Related Concepts

- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: jointly estimates domain-specific latent positions and cross-domain equality from observed responses rather than aggregating pre-estimated representations.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: concerns how many axes organize political conflict, while CoMDS asks which geometry is shared across measurements.
- [[concepts/item-response-theory|Item Response Theory]]: produces many latent coordinates that can serve as CoMDS inputs.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: explicitly models observation selection, which pairwise omission in CoMDS does not do.
