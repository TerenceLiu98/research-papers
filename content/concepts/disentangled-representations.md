---
title: Disentangled Representations
type: concept
aliases:
  - Disentanglement
  - Disentangled Representation Learning
tags:
  - disentanglement
  - representation-learning
  - latent-variable-models
  - interpretability
---

## Overview

Disentangled representations aim to organize learned coordinates so that separate dimensions or groups encode distinct generative factors of variation. Typical evaluations distinguish modularity, explicitness, and compactness: whether each learned coordinate focuses on one source, whether the sources are captured, and whether each source is concentrated in a small number of coordinates.

## Key Ideas

- Disentanglement is a structural goal, not merely a measure of similarity between two learned representations. It therefore depends on assumptions about the data-generating factors and on the chosen equivalence class.
- Unsupervised disentanglement is impossible in full generality without inductive biases or additional information. The relevant assumptions may concern the decoder, the data-generating process, augmentations, supervision, sparsity, or independence.
- [[Independent Component Analysis]] provides a simple post-processing route when a representation is already near-identifiable and the latent sources are independent and non-Gaussian. It can reduce rotational ambiguity while leaving signs and permutations unresolved.
- The paper by Nelson et al. tests this recipe with vanilla autoencoders whose latent spaces are followed by ICA, rather than relying on a specialized disentanglement regularizer. The result is competitive on several synthetic benchmarks, but not uniformly superior across datasets.
- Disentanglement metrics can disagree. High explicitness does not imply that each coordinate is modular, and a gain in a benchmark score does not establish that the learned factors are scientifically meaningful.
- In microscopy, disentangling biological variation from technical batch effects is treated as a practical structural-identification problem. Improved held-out-batch prediction supports the application, but it does not prove complete factor recovery.

## Important Papers

- [[Statistical and Structural Identifiability in Representation Learning]]
- Locatello et al. (2019), "Challenging Common Assumptions in the Unsupervised Learning of Disentangled Representations."
- Higgins et al. (2017), "beta-VAE: Learning Basic Visual Concepts with a Constrained Variational Framework."
- Hsu et al. (2023), "Disentanglement via Latent Quantization."
- Whittington et al. (2023), "Disentanglement with Biological Constraints: A Theory of Functional Cell Types."

## Related Concepts

- [[Structural Identifiability]]
- [[Statistical Identifiability]]
- [[Independent Component Analysis]]
- [[Concept Bottleneck Models]]
- Factor models
- Batch-effect correction
