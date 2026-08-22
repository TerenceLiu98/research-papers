---
title: Uniform Design Subsampling
type: concept
aliases:
  - UD Subsampling
tags:
  - subsampling
  - uniform-design
  - low-discrepancy-designs
  - massive-data
---

## Overview

Uniform design subsampling chooses a small working sample by covering the covariate distribution with a space-filling, low-discrepancy design. Unlike uniform random subsampling, the objective is geometric representativeness: selected observations should reproduce empirical averages over important covariate directions while avoiding accidental concentration in dense or imbalanced regions.

## Key Ideas

- A low-discrepancy point set supplies a skeleton in a normalized design space. Discrepancy measures how far empirical integration over this skeleton can deviate from integration over a target distribution for a specified function class.
- Empirical marginal inverse CDFs can map a design on the unit hypercube into the observed covariate distribution. Nearest-neighbor search then replaces synthetic skeleton points with actual records.
- Rotating or reducing covariates before design construction can make geometric search more effective, but the resulting guarantees apply primarily to functions represented by those retained coordinates.
- In observational causal inference, selecting one treated and one control record around every common skeleton point adds a balance objective. The same anchors can control both full-sample representativeness and between-arm discrepancy when matching radii are small.
- Uniform-design selection trades extra preprocessing for a smaller downstream learning problem. Its advantage depends on low discrepancy, dense enough treatment arms, manageable working dimension, and alignment between the retained geometry and the inferential target.

## Important Papers

- Zhang et al. (2023), "Model-Free Subsampling Method Based on Uniform Designs."
- Zhou et al. (2024), "Efficient Model-Free Subsampling Method for Massive Data."
- Zhou, Fang, and Ning (2013), "Mixture Discrepancy for Quasi-Random Point Sets."
- [[UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]

## Related Concepts

- Low-discrepancy designs
- Quasi-Monte Carlo methods
- Mixture discrepancy
- Principal component analysis
- Nearest-neighbor matching
- [[Double Machine Learning]]
