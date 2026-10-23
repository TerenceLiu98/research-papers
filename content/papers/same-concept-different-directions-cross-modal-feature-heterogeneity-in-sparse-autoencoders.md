---
title: "Same Concept, Different Directions: Cross-Modal Feature Heterogeneity in Sparse Autoencoders"
type: paper
authors:
  - Chungpa Lee
  - Jihoon Kwon
  - Kyle Min
  - Jy-yong Sohn
year: null
source_job_id: "192e5228-e317-4c89-8348-7e420dcba810"
tags:
  - sparse-autoencoders
  - vision-language-models
  - representation-alignment
  - mechanistic-interpretability
---

## TL;DR

Semantically corresponding image and text features in a vision-language embedding space can point in different directions, a phenomenon the paper calls [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]. A shared [[concepts/sparse-autoencoders|Sparse Autoencoder]] can therefore preserve reconstruction by assigning the modalities to different latents, producing a modality split, or force them into one latent at the cost of feature recovery. Training modality-specific SAEs and matching their coordinates afterward by paired-data coactivation preserves each modality's geometry while substantially improving cross-modal retrieval in the reported experiments.

## Research Question

Do corresponding semantic features actually share directions across image and text embeddings, and how should sparse autoencoders align their latent codes when those directions differ?

## Motivation

Prior multimodal SAE work treats modality split primarily as a mismatch between latent activations and attempts to align those activations during training. This assumes that the underlying image and text features for a concept have the same direction. If semantic correspondence does not imply directional identity, however, one shared decoder column cannot reconstruct both features exactly. Alignment then conflicts with faithful recovery rather than merely correcting an indexing problem.

## Contributions

- Defines cross-modal feature heterogeneity as directional mismatch between image and text features representing the same latent concept.
- Uses separate modality-specific SAEs and paired-input coactivation correlations to show that likely corresponding features remain directionally separated across CLIP, MetaCLIP, OpenCLIP, and SigLIP-family embeddings.
- Gives sparse linear-model results explaining why reconstruction produces modality split, why limited SAE capacity can collapse distinct directions, and why two alignment-loss families trade reconstruction for shared coordinates.
- Proposes training image and text SAEs separately, then aligning their latent indices with a correlation-based Hungarian assignment.
- Evaluates reconstruction, retrieval, zero-shot classification, concept steering, and monosemanticity on synthetic data and real vision-language embeddings.

## Method

The analysis models paired embeddings as $x=\Phi z$ and $y=\Psi z$: the modalities share a sparse nonnegative concept code $z$, but the image and text feature matrices may contain different directions for the same concept. Decoder columns from separately trained SAEs estimate those directions. Pearson correlations between image and text latent activations on paired examples serve as a proxy for semantic correspondence, while cosine distance measures directional mismatch.

The proposed method trains one SAE on image embeddings and another on text embeddings, without a cross-modal alignment term. It then computes the full cross-modal latent correlation matrix on paired training data and uses the Hungarian algorithm to find a one-to-one permutation maximizing total correlation. Reindexing the text SAE with this permutation aligns the latent coordinates without changing either decoder's learned directions or reconstruction.

The theoretical analysis distinguishes three regimes. With enough shared-SAE capacity, reconstruction can allocate distinct decoder columns to corresponding but nonidentical modality features, creating modality split. With insufficient capacity, geometrically close directions may be collapsed even when they express different concepts. For group-sparse and Iso-Energy alignment objectives, sufficiently strong alignment pressure merges two directions into their normalized sum and introduces reconstruction error proportional to their mismatch; the group-sparse objective also admits an inactive degenerate regime at still larger weight.

## Experiments

The feature-direction analysis trains modality-specific SAEs and groups all image-text latent pairs by coactivation correlation. Across base and larger variants of four VLM families, higher correlation is associated with smaller cosine distance, but even highly correlated pairs do not concentrate at zero. Qualitative examples include baseball and police-related latents with correlations of 0.67 and 0.63 but feature distances of 0.42 and 0.50.

Synthetic experiments use paired sparse embeddings with known feature directions and correspondences. As corresponding directions separate, modality-specific SAEs avoid the feature collapse and recovery error seen in a shared SAE. Post-hoc matching retains that recovery while producing lower latent and feature alignment error than the two training-time alignment baselines in the tested setting.

For real data, SAEs are trained on roughly 2.82 million valid CC-3M image-caption pairs encoded by CLIP ViT-B/32 and evaluated over three runs. On MS-COCO, post-hoc alignment reaches image-to-text Recall@1 of 16.0 and text-to-image Recall@1 of 11.4, compared with 7.1 and 4.3 for the strongest respective training-time baseline. Its reconstruction MSE is 0.089, matching the unaligned modality-specific SAEs and improving on the shared SAE's 0.090. On ImageNet1K it reports 25.1% zero-shot accuracy, below the group-sparse baseline's 26.6% but above the other reported approaches.

The method also has the highest reported mean average precision and mean reciprocal rank in COCO concept-steering retrieval and maintains higher monosemanticity scores across more image and text latents. Additional experiments vary Top-K sparsity, use BatchTop-K, and test CLIP and OpenCLIP base and large backbones; the post-hoc method consistently retains the lowest reported reconstruction error and leads cross-modal retrieval, although it does not always lead zero-shot classification.

## Limitations

- The theory assumes a linear representation model, shared sparse latent codes for paired inputs, and simplified SAE structure; real VLM representations may violate these assumptions.
- Coactivation correlation is a proxy for semantic correspondence, not direct semantic or causal validation, and may be unreliable for noisy or weakly paired data.
- Most real-world analysis concerns CLIP-like contrastive encoders. The paper does not establish the result for autoregressive, LLM-based VLMs.
- The Hungarian step enforces a one-to-one global matching, which may not capture absent, duplicated, split, or many-to-many concepts across modalities.
- Retrieval and steering gains are intervention- and benchmark-specific. The reported zero-shot classification results show that the method is not uniformly best on every downstream task.
- The supplied Markdown provides a code URL but no stable paper identifier; no identifier is recorded here.

## Related Concepts

- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]
- Representational alignment
- Vision-language models

## Related Papers

- [[papers/universal-sparse-autoencoders-interpretable-cross-model-concept-alignment|Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]] aligns several vision models through a shared sparse code during training; the present paper instead argues for preserving modality-specific directions and aligning coordinates afterward.
- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] analyzes how SAE encoder assumptions constrain feature recovery.
- Papadimitriou et al. (2025), "Interpreting the Linear Structure of Vision-Language Model Embedding Spaces": reports modality split in multimodal SAE representations.
- Kaushik, Barch, and Fanelli (2026), "Decomposing Multimodal Embedding Spaces with Group-Sparse Autoencoders": aligns modalities with a group-sparse training objective used as a baseline.
- Dhimoila et al. (2026), "Cross-Modal Redundancy and the Geometry of Vision-Language Embeddings": introduces the Iso-Energy alignment baseline analyzed in the paper.

[[index|Library home]]
