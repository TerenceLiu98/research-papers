---
title: Transformer Injectivity
type: concept
aliases:
  - Injective Transformer Representations
  - Language Model Injectivity
tags:
  - language-models
  - representation-learning
  - model-inversion
  - machine-learning-theory
---

## Overview

Transformer injectivity is the property that distinct discrete input sequences map to distinct internal representations. The property depends on which representation is observed, the prompt domain, and assumptions about architecture and parameters. Injectivity makes exact inversion well-defined, but it does not by itself supply an efficient inverse or a numerically stable recovery procedure.

## Key Ideas

- **The domain matters.** A component can be many-to-one on a continuous embedding space while the complete model remains injective on the finite set of token sequences allowed by a fixed vocabulary and context window.
- **Almost-sure injectivity is parameter-dependent.** For a real-analytic model, the collision condition for a fixed prompt pair can form a measure-zero parameter set if at least one parameter setting separates that pair. Continuous random initialization then avoids the set with probability one.
- **Mathematical uniqueness differs from numerical separation.** Two states may be unequal yet extremely close under finite precision or observation noise. A recovery method needs a positive separation margin and a tolerance calibrated below that margin.
- **Training preservation needs explicit assumptions.** Arguments based on absolute continuity and locally nonsingular gradient-update maps apply to finite training horizons and specified analytic losses and updates; they do not automatically cover arbitrary optimizers, quantization, tying, or non-smooth operations.
- **Access determines practical invertibility.** Full per-position hidden states and causal masking support sequential token recovery. Injectivity of a last-token state establishes uniqueness in principle but does not ensure efficient recovery from that state alone.

## Important Papers

- [[papers/language-models-are-injective-and-hence-invertible|Language Models Are Injective and Hence Invertible]]: proves almost-sure injectivity for a class of decoder-only Transformers and introduces SIPIT for exact sequential recovery from hidden-state sequences.
- Morris et al. (2023), "Text Embeddings Reveal (Almost) As Much As Text": empirically studies reconstruction from text embeddings with trained inversion models.
- Morris et al. (2023), "Language Model Inversion": reconstructs prompts from language-model output distributions.

## Related Concepts

- [[concepts/model-inversion-attacks|Model Inversion Attacks]]: studies reconstruction under different model-access and output assumptions.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: concerns equivalence of representations across learned solutions rather than uniqueness of prompts within one model.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: measures how internal states move across depth or context rather than whether the input-state map is one-to-one.
- [[concepts/normalizing-flows|Normalizing Flows]]: impose architectural invertibility on continuous transformations, unlike almost-sure injectivity restricted to a discrete prompt domain.
