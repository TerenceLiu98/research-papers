---
title: "jina-embeddings-v5-omni: Geometry-preserving Embeddings via Locked Aligned Towers"
type: paper
authors:
  - Florian Hönicke
  - Michael Günther
  - Andreas Koukounas
  - Scott Martens
  - Saba Sturua
  - Mohammad Kalim Akram
  - Han Xiao
year: null
source_job_id: "c233fa56-8cf1-4439-a3a0-0555d6d57a64"
tags:
  - multimodal-embeddings
  - representation-learning
  - parameter-efficient-training
  - information-retrieval
---

## TL;DR

GELATO extends a frozen text embedding model to images, video, and audio by connecting frozen, language-aligned modality encoders to the text backbone and training only replacement projectors and a few delimiter embeddings. The resulting jina-embeddings-v5-omni Small and Nano models preserve the parent models' text embeddings exactly while updating 0.35% of the joint weights. Small obtains a 53.93 average across the paper's text, image, video, and audio aggregates, narrowly exceeding the 4.70B-parameter LCO-Embedding-Omni-3B at 53.83, and reaches 79.08 on the ViDoRe-in-MIEB document-retrieval subset with 0.92B active text-and-image parameters. Its generic image retrieval and video results remain substantially weaker than leading larger baselines, and its audio clustering score is low.

## Research Question

Can a pretrained [[concepts/text-embedding-models|Text Embedding Model]] gain useful image, video, and audio capabilities by aligning frozen modality encoders through small trainable interfaces, without changing its established text embedding geometry?

## Motivation

Vector indexes and downstream pipelines depend on stable text embeddings, so jointly retraining a multimodal model can impose migration costs even when it improves non-text support. VLM-style systems already translate perceptual encoder outputs into language-model token space, but commonly adapt the language model, the perceptual encoders, or both. GELATO asks whether language-aligned perceptual towers and a frozen embedding backbone can instead be joined through a much smaller learned interface, preserving existing text behavior while adding new modalities.

## Contributions

- Introduces Geometry-preserving Embeddings via Locked Aligned Towers (GELATO), a modular recipe that freezes the text backbone and non-text encoders while training modality projectors and delimiter embeddings.
- Builds the jina-embeddings-v5-omni Nano and Small model families for text, images, video, and audio, with separate retrieval, classification, clustering, and text-matching variants.
- Preserves the Jina Embeddings v5 Text path exactly, including its task-specific LoRA adapters, last-token pooling, and normalized output geometry.
- Evaluates the models on MMTEB, MIEB, MMEB-Video, MAEB, and ViDoRe-derived document retrieval, including parameter-count and per-modality comparisons.
- Studies projector scope, encoder unfreezing, Matryoshka truncation, throughput, and peak memory through targeted ablations.

## Method

The architecture attaches Qwen3.5 vision encoders and the Qwen2.5-Omni audio encoder to frozen Jina Embeddings v5 Text backbones. The perceptual encoders were selected from language-aligned multimodal systems rather than used directly from their original SigLIP2 and Whisper-large-v3 precursors.

For vision, GELATO retains the source visual projector's LayerNorm, fixed $2 \times 2$ spatial merge, and first fully connected layer. It replaces only `fc_vision_2`, mapping the retained features into the Jina text hidden width: $4096 \to 1024$ for Small and $3072 \to 768$ for Nano. For audio, a new `fc_audio` maps each 1,280-dimensional encoder state to the corresponding 1,024- or 768-dimensional text space. Projected modality features overwrite placeholder-token positions inside start and end delimiters; a video is serialized as a sequence of frame segments, optionally preceded by its audio segment.

Training is separate for retrieval, classification, clustering, and text matching. Each run keeps the text transformer, inherited task LoRA adapter, modality encoder, and the early vision-projector components frozen. It updates `fc_vision_2`, `fc_audio`, and the applicable delimiter embeddings with bidirectional in-batch InfoNCE summed over Matryoshka prefix dimensions. The reported recipe uses a temperature of 0.02, global batch size 256, 15,000 optimizer steps, and four H100 GPUs per task-specific run.

## Experiments

**Aggregate multimodal comparison.** Nano scores 65.52 on text, 44.36 on image, 26.87 on video, and 44.00 on audio, for a 45.19 average at 0.95B loaded parameters. Small scores 67.00, 56.05, 41.20, and 51.46, respectively, for a 53.93 average at 1.57B. Among the displayed omni models, Small is just above LCO-Embedding-Omni-3B at 53.83 and below LCO-Embedding-Omni-7B at 54.43. These averages combine different benchmark suites rather than constituting one controlled training comparison.

**Documents and modality detail.** On the ViDoRe-in-MIEB subset, Small reaches 79.08 with 0.92B active text-and-image parameters, compared with 78.24 for LCO-Embedding-Omni-3B and 85.64 for Omni-Embed-Nemotron-3B. Nano reaches 70.05 with 0.31B active parameters. In the broader tables, Small is strongest among the compared Jina models and selected open-weight baselines on image classification and clustering, but its generic MIEB retrieval score is 38.53 versus 46.29 for the listed strongest baseline. Its full MMEB-Video score is 39.83 versus 67.15 for Qwen3-VL-Embedding-8B. On MAEB, Small reaches 50.77 overall and 55.89 for classification, but only 5.99 for clustering.

**What to train.** In a two-task vision ablation, training only `fc_vision_2` scores 0.158; training both fully connected projector layers from the start scores 0.153, and unfreezing the vision encoder from the start falls to 0.079. A second stage that also unfreezes the encoder reaches 0.159, only 0.001 above the projector-only run. On an eight-task audio subset, `fc_audio` alone reaches 0.398. Unfreezing the encoder from the start reaches 0.367, while a second-stage encoder continuation reaches 0.419. The released recipe favors the simpler frozen encoder despite that 0.022 audio gain.

**Truncation and efficiency.** Image prefixes lose roughly 0.18-0.21 nDCG@10 at 32 dimensions, audio retains most of its score at 256 dimensions, and video degrades more sharply at small widths. At 15,000 steps, projector-only vision training is about 1.8 times faster than the paper's full-training comparison. Projector-only audio training is about 3.2-3.9 times faster. Every reported projector run also uses less peak GPU memory; for Small audio, the table reports 6.06 GiB and 154.3 minutes versus 19.53 GiB and 497.3 minutes for full training.

## Limitations

- Strong results are uneven across modalities and tasks. Video, generic image retrieval, and audio clustering lag the strongest listed baselines, so the aggregate average obscures important deployment-specific weaknesses.
- The vision trainability ablation uses only CIRR-IT2I and NIGHTS-I2I; the audio ablation uses eight MAEB tasks. These reduced suites do not establish that projector-only training is optimal across the full evaluation set.
- The audio continuation improves the reduced-suite score from 0.398 to 0.419, meaning the selected frozen recipe trades measurable quality for simplicity and a smaller artifact set.
- Comparisons combine independently trained models and task-path-specific parameter counts. The strongest-baseline column changes by benchmark and is not a unified controlled ladder.
- The paper reuses published text scores because the text computation path is identical. This supports exact behavioral preservation by construction but does not provide a newly rerun text evaluation in the reported multimodal experiments.
- Encoder selection is not explored systematically, joint projector training across modalities is left open, and the paper does not establish generalization beyond the two Jina backbone scales and chosen Qwen encoders.
- The supplied Markdown gives no publication venue, publication year, or stable identifier for this paper, so those metadata are not asserted here.

## Related Concepts

- [[concepts/multimodal-embedding-models|Multimodal Embedding Models]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]]
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]

## Related Papers

- Akram et al. (2026), "jina-embeddings-v5-text: Task-Targeted Embedding Distillation": supplies the two frozen text backbones and their task-conditioned LoRA adapters (reference 1).
- Liang et al. (2022), "Mind the Gap: Understanding the Modality Gap in Multi-modal Contrastive Representation Learning": motivates concern about modality-specific regions in nominally shared spaces (reference 21).
- Zhai et al. (2022), "LiT: Zero-Shot Transfer With Locked-image Text Tuning": provides a related frozen-tower precedent in a CLIP-style architecture (reference 39).
- Nussbaum, Duderstadt, and Mulyar (2024), "Nomic Embed Vision: Expanding the Latent Space": adapts a visual path while retaining a text encoder in another frozen-tower design (reference 25).
- [[papers/beyond-matryoshka-revisiting-sparse-coding-for-adaptive-representation|Beyond Matryoshka: Revisiting Sparse Coding for Adaptive Representation]] studies a post-training sparse alternative to nested dense embedding prefixes.

[[index|Library home]]
