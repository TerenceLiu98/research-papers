---
title: Matryoshka Sparse Autoencoders
type: concept
aliases:
  - Matryoshka SAEs
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - hierarchical-representations
---

## Overview

Matryoshka sparse autoencoders are [[concepts/sparse-autoencoders|Sparse Autoencoders]] trained so that several increasingly large prefixes of one ordered latent dictionary must each reconstruct the input. The nested objectives encourage smaller prefixes to retain broad features while later latents add finer distinctions.

## Key Ideas

- **One dictionary, multiple usable widths.** A single encoder produces the full sparse code, while reconstruction losses are computed from multiple prefixes of that code.
- **Early latents carry broader structure.** Because early coordinates participate in every larger prefix and must also reconstruct without later coordinates, they receive pressure to encode widely useful features.
- **Specialization without replacement.** Later coordinates can refine the representation without giving the smaller prefix access to their capacity. This is intended to reduce feature splitting, feature absorption, and feature composition as dictionary width grows.
- **Hierarchy is induced, not guaranteed.** Prefix ordering and multi-scale reconstruction bias the dictionary toward levels of abstraction, but individual latents still require empirical interpretation and causal evaluation.
- **Feature quality trades against reconstruction.** Nested constraints prevent the full dictionary from optimizing reconstruction as freely as a standard SAE. Reported experiments find a small reconstruction penalty and additional training cost alongside stronger concept-isolation metrics.
- **Design choices matter.** Equal loss weighting and a moderate number of fixed prefixes performed better overall in the initial study than emphasizing large prefixes, isolating gradients, using many groups, or randomly sampling prefix lengths.

## Important Papers

- [[papers/learning-multi-level-features-with-matryoshka-sparse-autoencoders|Learning Multi-Level Features with Matryoshka Sparse Autoencoders]] introduces the method and evaluates it on synthetic hierarchical data, TinyStories, and Gemma-2-2B.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Hierarchical representation learning
- Feature disentanglement
- Feature absorption
- Feature splitting
- Feature composition
