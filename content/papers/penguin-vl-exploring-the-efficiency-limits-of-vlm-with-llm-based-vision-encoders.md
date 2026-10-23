---
title: "Penguin-VL: Exploring the Efficiency Limits of VLM with LLM-based Vision Encoders"
type: paper
authors:
  - Boqiang Zhang
  - Lei Ke
  - Ruihan Yang
  - Qi Gao
  - Tianyuan Qu
  - Rossell Chen
  - Dong Yu
  - Leoweiliang
year: 2026
source_job_id: "19eddfc0-a2d3-43db-a614-b13bd9b0a8c4"
repository: "https://github.com/tencent-ailab/Penguin-VL"
tags:
  - vision-language-models
  - visual-representation-learning
  - multimodal-learning
  - video-understanding
  - knowledge-distillation
---

## TL;DR

Penguin-VL builds compact 2B and 8B vision-language models around Penguin-Encoder, a roughly 400M-parameter visual backbone initialized from Qwen3-0.6B rather than a contrastively pretrained vision transformer. The encoder replaces causal attention with bidirectional attention, adds 2D rotary position embeddings, and learns visual features through language-model supervision plus feature reconstruction. Across the reported image and video evaluations, Penguin-VL is especially strong on documents, charts, long videos, and temporal grounding. A controlled integration study reports a 49.3 average over five image benchmarks, compared with 45.9 for the strongest tested SigLIP2 configuration, but the evidence does not isolate every contribution of the much broader data and training pipeline or establish real-time deployment efficiency.

## Research Question

Can a text-only LLM provide a better initialization for a compact VLM vision encoder than conventional contrastive vision-language pretraining, particularly when downstream tasks require fine-grained spatial and temporal information?

## Motivation

CLIP- and SigLIP-style encoders are trained primarily to discriminate paired from unpaired image-text examples through pooled representations. Penguin-VL argues that this objective can favor category-level invariance over the patch-level detail needed for OCR, charts, diagrams, and temporal reasoning. The paper therefore tests whether an encoder derived from the architecture and weights of a generative language model can begin closer to the downstream decoder's representation space while retaining dense visual information.

## Contributions

- Introduces [[concepts/llm-initialized-vision-encoders|LLM-Initialized Vision Encoders]] through Penguin-Encoder, which adapts Qwen3-0.6B weights to visual patch sequences with bidirectional attention and 2D rotary position embeddings.
- Combines caption-based language-model supervision with teacher-feature reconstruction at the amplitude, direction, and inter-patch relation levels; the reconstruction branch also permits use of unlabeled charts and diagrams.
- Presents a three-stage curriculum: low- and high-resolution encoder training, joint VLM pretraining, and two-stage supervised fine-tuning that shifts from mixed image-video instruction data toward video reasoning.
- Introduces temporal redundancy-aware (TRA) compression, which preserves higher resolution for frames with greater temporal change and progressively compresses more redundant frames under a global token budget.
- Reports broad comparisons for 2B and 8B models across document, chart, mathematical, general-image, short-video, long-video, and temporal-grounding benchmarks.

## Method

Penguin-VL contains Penguin-Encoder, a two-layer MLP vision-language projector, and a Qwen3 language model. Penguin-Encoder removes parameters unrelated to visual processing from Qwen3-0.6B, leaving about 400M parameters. It changes causal self-attention to full bidirectional attention and uses 2D-RoPE for variable-resolution patch sequences. Unlike [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]], the inherited model is trained as the visual backbone rather than inserted as a fixed block.

During low-resolution encoder training, a frozen language decoder supplies cross-entropy supervision while a teacher vision encoder supplies three reconstruction terms. Amplitude loss matches feature values, direction loss aligns feature directions, and relation loss matches normalized patch-to-patch correlation matrices. Training uses about 200M low-resolution samples in total, including image-text pairs and unlabeled structured imagery. A subsequent roughly 40M-sample high-resolution phase removes reconstruction and raises the cap from 2,048 to 10,240 visual tokens. Joint VLM pretraining then mixes images, documents, charts, multiple images, and videos, followed by general multimodal SFT and video-focused SFT.

For video, TRA classifies sampled frames as key or intermediate frames using temporal similarity. If native-resolution tokens exceed the budget, both classes are downscaled while intermediate frames retain substantially fewer tokens; after intermediate frames reach a minimum resolution, only key frames are compressed further. Absolute timestamp strings accompany frame tokens. The projector changes feature dimensionality but does not itself merge or spatially compress tokens.

The data pipeline also contributes materially to the system. The authors construct Penguin-Recap-I from 57.2M curated image-text pairs, Penguin-Recap-V from 3.7M video-text pairs drawn from 29 public datasets, and Penguin-QA from generated temporal-ordering and temporal-grounding questions. Filtering, clustering, deduplication, motion filtering, detailed recaptioning, and hierarchical video annotation supply much of the training supervision.

## Experiments

The full 2B and 8B systems are evaluated on document and chart understanding, OCR, visual mathematics and logic, general visual knowledge, scientific diagrams, fine-grained perception, general video QA, long-video comprehension, and temporal reasoning. Reported 2B results include 59.5 on LongVideoBench, 79.9 on NextQA, and 56.2 on Charades-STA; the last score exceeds InternVL3.5 by more than 34 points. The 8B model reports 96.2 on DocVQA, 90.5 on ChartQA, 67.0 on LongVideoBench, 85.4 on NextQA, and 61.4 on Charades-STA. It does not lead every benchmark: both sizes trail selected competitors on OCRBench, and the 8B model trails Qwen3-VL or InternVL3.5 on some abstract mathematical and logical tasks.

The reduced-data encoder ablation uses about 24M encoder-training examples, DenseFusion-1M for modality alignment, and LLaVA-665k for SFT. Random initialization averages 31.3 over AI2D, MathVista, ChartQA, MMMU-Pro, and RealWorldQA. LLM initialization without reconstruction reaches 32.6, adding amplitude and direction reconstruction reaches 33.3, and the complete loss with relation matching reaches 34.6.

In the controlled encoder-integration comparison, every encoder is connected to Qwen3-1.7B and receives the same DenseFusion-1M alignment and LLaVA-665k SFT. Penguin-Encoder, pretrained on about 240M samples, averages 49.3 across the five benchmarks. SigLIP2 with native resolution scores 39.2 after matched 240M-sample continued training; dynamic-resolution SigLIP2 reaches 45.3 with a 1,024-token cap and 45.9 with a 10,240-token cap. Qwen3VL-32B ViT and VL3-SigLIP-NaViT score 47.3 and 43.0, respectively, but their estimated pretraining scales and recipes are not matched to Penguin-Encoder.

## Limitations

- Penguin-VL is a system-level contribution combining encoder initialization, reconstruction losses, resolution curricula, large curated datasets, TRA compression, and staged SFT. Full-model benchmark gains cannot be attributed solely to LLM initialization.
- The closest controlled comparison continues a pretrained SigLIP2 encoder on Penguin's data; it does not train a contrastive encoder from scratch under equal total compute, initialization conditions, or original pretraining exposure.
- Several baseline pretraining scales are estimates or taken from other reports, weakening claims about exact data efficiency. Training compute and wall-clock cost are not reported in a form that enables a controlled efficiency comparison.
- Results span many benchmarks but are reported from the authors' evaluation pipeline without uncertainty estimates or repeated-run variance.
- The 2B model remains behind stronger baselines on OCRBench and some logic tasks, while the 8B model also trails on selected OCR, chart, and multi-step reasoning evaluations.
- TRA is presented as part of the full video system, but the supplied report does not provide a dedicated ablation isolating its accuracy, latency, or token-saving effects.
- The paper motivates deployment on constrained devices, yet does not report on-device latency, memory, energy use, or real-time throughput. Real-time and streaming inference are explicitly left for future work.
- Model training depends on proprietary captioning and annotation models, limiting exact reproduction of the data pipeline.

## Related Concepts

- [[concepts/llm-initialized-vision-encoders|LLM-Initialized Vision Encoders]]
- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]

## Related Papers

- [[papers/frozen-transformers-in-language-models-are-effective-visual-encoder-layers|Frozen Transformers in Language Models Are Effective Visual Encoder Layers]] inserts fixed blocks from text-only LLMs into modality-specific networks; Penguin instead initializes and trains an entire visual encoder from language-model weights.
- [[papers/levljepa-end-to-end-vision-language-pretraining-without-negatives|LeVLJEPA: End-to-End Vision-Language Pretraining Without Negatives]] also challenges contrastive vision-language learning and reports stronger dense patch features, but uses cross-modal predictive learning rather than an LLM-initialized visual backbone.
- Radford et al. (2021), "Learning Transferable Visual Models from Natural Language Supervision," introduces CLIP, the contrastive paradigm against which Penguin-VL positions its encoder.
- Tschannen et al. (2025), "SigLIP 2: Multilingual Vision-Language Encoders with Improved Semantic Understanding, Localization, and Dense Features," provides the principal encoder family used in the integration comparisons.
- Bai et al. (2025), "Qwen3-VL Technical Report," provides the language-model family and a principal VLM baseline discussed by Penguin-VL.

[[index|Library home]]
