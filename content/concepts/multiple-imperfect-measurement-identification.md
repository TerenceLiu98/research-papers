---
title: Multiple Imperfect Measurement Identification
type: concept
tags:
  - measurement-error
  - latent-variable-models
  - identification
---

## Overview

Multiple imperfect measurements can identify a latent categorical variable's distribution and annotator-specific error rates without gold-standard labels when their joint distribution has sufficient structure. A central approach assumes conditional independence given the latent class and observed covariates, then identifies a mixture of product distributions through a three-way tensor decomposition.

## Key Ideas

- **Independence is conditional.** Proxies can have different and covariate-dependent error rates. Shared observed causes of error may enter the conditioning set; unobserved common error sources remain a threat.
- **Three informative views supply identifying variation.** Partition measurements into three nonempty blocks with class-conditional probability matrices of Kruskal ranks $k_1,k_2,k_3$. A sufficient uniqueness condition is $k_1+k_2+k_3\geq 2K_*+2$ for $K_*$ latent classes, with positive class probabilities. Three informative binary proxies satisfy this rank condition for two latent classes.
- **Latent classes need semantic anchoring.** Decomposition recovers components up to a common permutation. A substantive rule, such as a designated binary proxy having a higher true-positive than false-positive rate, determines which component represents which class.
- **Identification and stable estimation differ.** Near-indistinguishable class-conditional distributions can yield unstable inverse measurement matrices even when population identification holds. Multicategory bridges require adequate column rank; stable inference additionally needs separation from singularity.
- **More measurements enable diagnostics.** Three binary proxies and two latent classes are generically just identified. With $J\geq4$, the fixed-covariate model has $2^J-2J-2$ overidentifying restrictions. Passing a specification test does not establish the latent independence assumption.
- **Identification is only the first step for downstream inference.** Recovered labels are still generated measurements. [[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]] constructs orthogonal moments rather than treating inferred classes as error-free.

## Important Papers

- Kruskal (1977), "Three-way arrays: rank and uniqueness of trilinear decompositions, with application to arithmetic complexity and statistics."
- Dawid and Skene (1979), "Maximum likelihood estimation of observer error-rates using the EM algorithm."
- Allman, Matias, and Rhodes (2009), "Identifiability of Parameters in Latent Structure Models with Many Observed Variables."
- [[papers/debiased-inference-for-ai-generated-data-without-gold-standard-labels-identification-via-multiple-imperfect-measurements|Debiased Inference for AI-Generated Data without Gold-Standard Labels: Identification via Multiple Imperfect Measurements]]: applies this identification structure to heterogeneous AI annotations and general downstream moments.

## Related Concepts

- [[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]]
- [[concepts/double-machine-learning|Double Machine Learning]]
