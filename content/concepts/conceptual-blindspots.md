---
title: Conceptual Blindspots
type: concept
aliases:
  - Conceptual Blind Spots
  - Generative Model Concept Blindspots
tags:
  - generative-model-evaluation
  - concept-discovery
  - image-generation
  - distribution-shift
---

## Overview

Conceptual blindspots are systematic differences between how often a fine-grained concept appears in a reference data distribution and in a generative model's outputs. A concept may be **suppressed**, appearing less strongly or less often in generated samples, or **exaggerated**, appearing more strongly or more often. This framing evaluates distributions in an interpretable feature space rather than reducing performance to whole-image realism or prompt similarity.

## Key Ideas

- Blindspots are relative to a baseline distribution, prompt sample, representation model, and concept dictionary. They are not context-free properties of a generator.
- Paired evaluation can hold captions fixed: compare a natural image-caption sample with an image generated from that caption, then aggregate differences in a shared concept representation.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]] can provide an unsupervised concept basis, avoiding a fixed human vocabulary but inheriting the encoder's coverage, geometry, stability, and interpretability limitations.
- Distribution-level differences identify broadly suppressed or exaggerated concepts. Datapoint-level distances can locate individual mismatches, but additional evidence is needed to separate model inability, caption ambiguity, and memorization.
- Pairwise co-activation matrices extend the analysis beyond marginal frequencies. A model can preserve coarse sparsity and spectral structure while changing which concepts co-occur.
- Rare concepts may show larger discrepancies than frequent concepts. This association does not by itself distinguish insufficient training exposure from architectural, optimization, or prompt-distribution effects.
- Thresholds used to name blindspots are analytical choices. Ranking by a monotone transform of an energy gap can be calibration-free, while categorical labels still depend on selected cutoffs.

## Important Papers

- [[papers/uncovering-conceptual-blindspots-in-generative-image-models-using-sparse-autoencoders|Uncovering Conceptual Blindspots in Generative Image Models Using Sparse Autoencoders]] formalizes concept-level suppression and exaggeration and evaluates four text-to-image models with DINOv2 and a 32,000-feature RA-SAE.
- Bau et al. (2019), "Seeing What a GAN Cannot Generate," analyzes omitted objects and modes in GANs at a coarser granularity.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- Generative model evaluation
- Mode collapse
- Distribution coverage
