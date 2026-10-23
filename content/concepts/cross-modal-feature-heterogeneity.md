---
title: Cross-Modal Feature Heterogeneity
type: concept
aliases:
  - Cross-Modal Directional Heterogeneity
tags:
  - representation-alignment
  - vision-language-models
  - sparse-autoencoders
  - multimodal-representations
---

## Overview

Cross-modal feature heterogeneity occurs when two modalities encode the same semantic concept along different directions in a nominally joint embedding space. Semantic correspondence therefore does not guarantee geometric identity. For [[concepts/sparse-autoencoders|Sparse Autoencoders]], this matters because one latent coordinate is tied to one decoder direction: faithfully reconstructing distinct image and text directions may require different coordinates even when both express the same concept.

## Key Ideas

- A modality split can be a faithful response to representation geometry rather than merely a latent-indexing failure. A shared SAE can assign corresponding image and text features to different coordinates to reconstruct both directions accurately.
- Forcing nonidentical directions into one shared coordinate creates a reconstruction-alignment tradeoff. The learned direction may become a compromise between the modality-specific features.
- Limited dictionary capacity can also collapse directions, but geometric proximity does not guarantee semantic correspondence, so capacity pressure is not a reliable alignment mechanism.
- Correspondence and geometry should be estimated separately. Paired-example coactivation can suggest which independently learned features share semantics, while cosine distance measures whether their decoder directions coincide.
- One response is to preserve modality-specific dictionaries and align their indices post hoc. A correlation-based assignment can make latent codes comparable without rotating or merging the learned directions.
- A nontrivial modality gap implies that at least some corresponding feature directions differ under a shared-latent linear representation model, but that implication depends on the model assumptions.

## Important Papers

- [[papers/same-concept-different-directions-cross-modal-feature-heterogeneity-in-sparse-autoencoders|Same Concept, Different Directions: Cross-Modal Feature Heterogeneity in Sparse Autoencoders]] defines the phenomenon, connects it theoretically to modality split, and evaluates modality-specific SAEs with post-hoc alignment.
- Papadimitriou et al. (2025), "Interpreting the Linear Structure of Vision-Language Model Embedding Spaces": documents modality split in vision-language SAE latents.
- Liang et al. (2022), "Mind the Gap: Understanding the Modality Gap in Multimodal Contrastive Representation Learning": studies the separation of image and text embeddings in joint spaces.
- Kaushik, Barch, and Fanelli (2026), "Decomposing Multimodal Embedding Spaces with Group-Sparse Autoencoders": uses a training-time activation-alignment objective.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]
- [[concepts/model-steerability|Model Steerability]]
- Representational alignment
- Modality gap
- Linear representation hypothesis

