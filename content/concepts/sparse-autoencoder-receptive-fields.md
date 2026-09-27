---
title: Sparse Autoencoder Receptive Fields
type: concept
aliases:
  - SAE Receptive Fields
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - concept-geometry
---

## Overview

A sparse autoencoder latent's receptive field is the set of input activations for which that latent has positive output: $\mathcal F_i=\{x:f_i(x)>0\}$. Its shape depends on the encoder architecture. Comparing that shape with the distribution of a target concept helps explain why an SAE may reconstruct activations accurately yet fail to produce a latent selective for the concept.

## Key Ideas

- **Architecture constrains selectivity.** For a single latent to identify a concept, its receptive field must include that concept's inputs while excluding competing ones. An encoder therefore introduces assumptions about concept geometry, beyond the decoder's sparse reconstruction model.
- **Thresholded linear encoders give half-spaces.** ReLU and JumpReLU latents activate on one side of an affine threshold. A concept enclosed by other concepts may lack a selective latent even when the data admit an accurate reconstruction.
- **TopK introduces competition and a shared activity budget.** In the analyzed TopK formulation, receptive fields are unions of cones determined by comparisons between linear scores. A pre-encoder bias shifts their common apex. Angular separation can support some nonlinear concept boundaries, but the fixed budget can underallocate active latents to higher-dimensional concepts.
- **Prototype distances and simplex projection permit local, adaptive representations.** SpaDE projects negative squared distances to learned prototypes onto the probability simplex. Its support size can vary by input, and receptive fields combine local convex polytopes. This design assumes that Euclidean proximity is informative about concept identity.
- **Nonlinear separability and intrinsic dimension are distinct.** A concept can be hard to isolate from other concepts even if it occupies a low-dimensional region. Conversely, a well-separated concept can need many active latents to reconstruct its internal variation. Evaluation should examine both selectivity and concept-specific reconstruction.
- **Co-occurrence has two measurement levels.** Similarities between samples' sparse codes indicate whether inputs use overlapping representations. Similarities between latents' activation profiles across samples indicate whether features activate together. Separating concepts in the first measurement does not ensure specialized features in the second; both should be checked against known concept labels.
- **Monosemanticity is not causal validation.** F1 for concept membership evaluates selectivity on labeled data. It does not establish that the feature mediates the original model's behavior or enables reliable [[Model Steerability]]. Co-occurrence can also be appropriate when the underlying concepts genuinely overlap.

The practical implication is to compare encoder geometry with the intended concepts and evaluate concept-level errors, rather than infer complete concept coverage from aggregate reconstruction and sparsity. The framework diagnoses restrictions; it does not guarantee that training finds every solution an architecture can express.

## Important Papers

- [[Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] derives receptive-field constraints for ReLU, JumpReLU, and TopK, then constructs and evaluates SpaDE using nonlinear separability and heterogeneous concept dimensions as design criteria.

## Related Concepts

- [[Sparse Autoencoders]]
- [[Model Steerability]]
- [[Concept Bottleneck Sparse Autoencoders]]: a complementary approach that adds explicit concept supervision to improve coverage.
