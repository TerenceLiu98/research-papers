---
title: "V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning"
type: paper
authors:
  - Lorenzo Mur-Labadia
  - Matthew Muckley
  - Amir Bar
  - Mido Assran
  - Koustuv Sinha
  - Mike Rabbat
  - Yann LeCun
  - Nicolas Ballas
  - Adrien Bardes
year: 2026
tags:
  - self-supervised-learning
  - video-representation-learning
  - dense-prediction
  - joint-embedding-predictive-architectures
  - world-models
---

## TL;DR

V-JEPA 2.1 modifies masked latent prediction so that visible context tokens, not only masked tokens, receive a prediction loss, and it applies supervision at multiple encoder depths. With modality-specific image and video tokenizers, larger mixed data, and scaling to a 2B-parameter ViT-G, the resulting frozen representations improve sharply over V-JEPA 2 on depth, segmentation, tracking, anticipation, and action recognition while retaining strong global features. The paper reports 0.307 RMSE on NYUv2, 7.71 mAP on Ego4D short-term anticipation, and 40.8 Recall@5 on EPIC-KITCHENS action anticipation.

## Research Question

Can a video [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] learn spatially precise and temporally consistent patch features without sacrificing the global semantics and dynamics needed for recognition, anticipation, and planning?

## Motivation

V-JEPA 2 predicts latent targets only at masked positions. Its visible context tokens can therefore aggregate global information without being required to preserve their local spatio-temporal meaning. The paper reports that these features are difficult to use for dense tasks: a frozen V-JEPA 2 encoder reaches 22.2 mIoU on ADE20K and 0.682 RMSE on NYUv2 in the authors' initial analysis. Image-centered self-supervised models produce stronger dense features but do not directly learn video dynamics. V-JEPA 2.1 aims to combine both properties in one image-video encoder.

## Contributions

- A dense predictive objective that supervises both masked and visible context tokens, with context weights based on distance from masked regions.
- Deep self-supervision that predicts normalized targets from four equally spaced encoder depths through a shared multi-level predictor.
- Modality-specific 2D image and 3D video patch tokenizers feeding one shared encoder, together with separate modality embeddings.
- A scaled image-video pretraining recipe using VisionMix-163M and models up to ViT-G (2B parameters), plus distillation into ViT-L and ViT-B students.
- Frozen-backbone evaluation across dense vision, action recognition and anticipation, VideoQA, robot manipulation, and navigation planning.

## Method

**Dense predictive loss.** Standard V-JEPA trains a context encoder on visible patches and a predictor to match exponential-moving-average target-encoder features at masked positions. V-JEPA 2.1 adds an L1 context loss over visible tokens. Tokens nearer a masked region receive larger weights, intended to discourage local information leakage while still grounding each visible token in its location. The context-loss coefficient is 0.7 for images and 0.5 for videos.

**Deep self-supervision.** Features from four evenly spaced encoder blocks are normalized, concatenated, and fused before entering the predictor. The predictor emits a corresponding multi-level target, so intermediate encoder layers receive direct latent-prediction supervision. In the ViT-L ablation, this recovers global classification performance lost after adding context supervision while further improving dense prediction.

**Unified image-video training.** Images use a learned 2D convolutional patch embedding and videos use a 3D convolutional tubelet embedding. Modality embeddings identify the input type, while a shared encoder uses factorized 3D rotary position encodings. Training combines video data with VisionMix-163M, a curated 142M-image subset. A high-resolution cooldown raises video resolution from 256 to 384 pixels and image resolution to 512 pixels.

**Scale and distillation.** The main family includes ViT-L, ViT-g, and ViT-G encoders. Smaller ViT-L and ViT-B students are trained with the same masked JEPA objective against a frozen ViT-G teacher; deep self-supervision is omitted during distillation.

## Experiments

**Dense vision.** Frozen final-layer linear probes from ViT-G obtain 0.307 RMSE on NYUv2 and 2.461 on KITTI depth estimation, plus 47.9, 73.5, and 85.0 mIoU on ADE20K, Cityscapes, and VOC12. Non-parametric patch matching reaches 69.0 J&F on DAVIS and 72.7 on YouTube-VOS. Relative to V-JEPA 2, the semantic-segmentation gains are 23.4 points on ADE20K, 27.6 on Cityscapes, and 20.7 on VOC12. DINOv3 remains stronger on ADE20K, Cityscapes, DAVIS, and YouTube-VOS in the reported comparison.

**Prediction and recognition.** ViT-G reaches 7.71 mAP on Ego4D short-term object-interaction anticipation, 40.8 action Recall@5 on EPIC-KITCHENS-100 anticipation, and 77.7% top-1 accuracy on Something-Something-v2. It also reports 87.7% on Kinetics-400 and 85.5% on ImageNet-1K under attentive-probe evaluation.

**Robotics and planning.** With an action-conditioned predictor and model-predictive control, V-JEPA 2.1 raises grasp success from 60% for V-JEPA 2 to 70% at the matched one-step planning setup and to 80% with an eight-step horizon; each condition contains ten tasks. In navigation, a conditional diffusion model over V-JEPA 2.1 features reduces planning time from 103.2 to 10.6 seconds while slightly improving average trajectory errors over the reported Navigation World Models baseline.

**Ablations and distillation.** Context supervision produces the largest initial dense-task gain but reduces action classification; deep self-supervision improves both. Larger image data, modality-specific tokenization, model scale, and the high-resolution cooldown add further gains. Distilling ViT-G into ViT-L raises Something-Something-v2 accuracy from 74.2% to 76.5% and ADE20K mIoU from 42.0 to 46.7.

**VideoQA.** With a Llama 3.1 8B language backbone and the paper's filtered alignment data, V-JEPA 2.1 averages 57.9 across seven VideoQA benchmarks versus 57.8 for the retrained V-JEPA 2. It improves PerceptionTest, Minimal Video Pairs, TVBench, and MVBench but performs worse on TempCompass, TemporalBench, and TOMATO.

## Limitations

- Several headline comparisons use different probe architectures, training data, model sizes, or parameter counts; they do not isolate the effect of the dense objective alone.
- The component ablation begins from ViT-L, while the strongest reported results also incorporate substantially more data, a 2B-parameter encoder, and higher-resolution training.
- The paper attributes weaker ADE20K and Cityscapes results to the composition of VisionMix, but does not experimentally isolate that explanation.
- Robot manipulation uses ten tasks per skill in one laboratory setup. The small evaluation does not establish broad zero-shot robustness, and failures remain in gripper-action planning.
- VideoQA gains are mixed and nearly neutral on the seven-benchmark average; the authors also use less alignment data than the published V-JEPA 2 comparison.
- The work evaluates learned representations and downstream predictive models, but does not demonstrate that dense self-supervision alone produces a generally accurate or action-sensitive [[concepts/world-models|World Model]].

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/world-models|World Models]]

## Related Papers

- Assran et al. (2025), "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning": the direct predecessor whose masked-only objective and downstream results provide the main baseline.
- Bardes et al. (2024), "Revisiting Feature Prediction for Learning Visual Representations from Video": introduces the earlier V-JEPA latent video-prediction approach.
- Siméoni et al. (2025), "DINOv3": the principal dense-feature comparison and source of several linear-probe protocols.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]] tests V-JEPA 2.1 as a fixed latent space and reports action-insensitive PushT rollouts for its particular checkpoint and training recipe.

[[index|Library home]]
