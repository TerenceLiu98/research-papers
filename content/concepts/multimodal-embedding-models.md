---
title: Multimodal Embedding Models
type: concept
aliases:
  - Cross-Modal Embedding Models
  - Omnimodal Embeddings
tags:
  - multimodal-learning
  - representation-learning
  - information-retrieval
---

## Overview

Multimodal embedding models map text, images, audio, video, or other media into a vector space where related inputs can be compared across modality boundaries. They support cross-modal retrieval, classification, clustering, semantic matching, and document search without requiring every candidate pair to be processed jointly.

## Key Ideas

- A shared vector space can be learned with separate contrastive towers or by projecting perceptual features into a common language-model backbone. The architectural choice changes which parameters and representations are shared.
- Cross-modal similarity does not guarantee that modality distributions occupy the same region or use the same feature directions. [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]] therefore matters even when retrieval metrics are strong.
- Perceptual encoders can be connected through learned projectors or adapters. In [[papers/jina-embeddings-v5-omni-geometry-preserving-embeddings-via-locked-aligned-towers|jina-embeddings-v5-omni]], frozen language-aligned vision and audio encoders feed a frozen text embedding backbone through task-specific projectors.
- Preserving an existing text path can keep deployed vector indexes compatible, but non-text quality still depends on encoder choice, interface capacity, training data, and the downstream modality.
- Video may reuse an image encoder over sampled frames, yet temporal retrieval and classification are not equivalent to static-image embedding. Audio likewise spans speech, music, environmental sound, and cross-modal matching with distinct failure modes.
- Aggregate scores can hide major task differences. Evaluation should separate modalities and workloads, report active-path parameters, and distinguish controlled comparisons from comparisons among independently trained systems.
- Nested dense prefixes, such as Matryoshka representations, can vary storage and retrieval cost after training. Prefix quality must be checked separately for each modality because truncation behavior need not transfer from text or images to video.

## Important Papers

- [[papers/jina-embeddings-v5-omni-geometry-preserving-embeddings-via-locked-aligned-towers|jina-embeddings-v5-omni: Geometry-preserving Embeddings via Locked Aligned Towers]] freezes both perceptual towers and the text backbone, training small interfaces to add image, video, and audio support while preserving text embeddings.
- Radford et al. (2021), "Learning Transferable Visual Models From Natural Language Supervision": establishes the widely used contrastive image-text dual-tower paradigm.
- Girdhar et al. (2023), "ImageBind: One Embedding Space To Bind Them All": extends joint embedding to multiple non-text modalities.
- Liang et al. (2022), "Mind the Gap: Understanding the Modality Gap in Multi-modal Contrastive Representation Learning": analyzes distributional separation between modalities in shared embedding spaces.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]
- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]
