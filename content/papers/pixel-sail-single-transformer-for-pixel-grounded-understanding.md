---
title: "Pixel-SAIL: Single Transformer for Pixel-Grounded Understanding"
type: paper
authors:
  - Tao Zhang
  - Xiangtai Li
  - Zilong Huang
  - Yanwei Li
  - Weixian Lei
  - Xueqing Deng
  - Shihao Chen
  - Shunping Ji
  - Jiashi Feng
year: null
source_job_id: "8d689650-5581-4e7d-b732-c5f179566e7d"
tags:
  - pixel-grounding
  - multimodal-large-language-models
  - referring-segmentation
  - visual-prompts
  - knowledge-distillation
---

## TL;DR

Pixel-SAIL adapts an [[concepts/encoder-free-vision-language-models|Encoder-Free Vision-Language Model]] to [[concepts/pixel-grounded-understanding|Pixel-Grounded Understanding]] without retaining a separate vision encoder, prompt encoder, segmentation backbone, or mask decoder at inference. It adds learnable feature upsampling, spatial injection of visual-prompt tokens, and training-time feature distillation from Mask2Former and SAM2. The 3B model reports 75.7 cIoU on RefCOCO+, 78.7 on RefCOCOg, 80.8 on RefCOCO, and 67.7 on gRefCOCO validation splits. It also introduces PerBench, a 1,500-example benchmark spanning detailed object captioning, visual-prompt multiple-choice questions, and visual-text referring segmentation.

## Research Question

Can a single Transformer jointly process image and text tokens and produce competitive pixel-level masks and region descriptions without the multiple pretrained visual encoders and segmentation modules used by existing pixel-grounded multimodal language models?

## Motivation

Pixel-grounded MLLMs commonly combine an LLM, a CLIP-like image encoder, a segmentation expert, prompt-processing modules, and a mask decoder. This modular design increases system complexity and can make performance depend on bottlenecks in several separately pretrained components. Encoder-free MLLMs already show that one Transformer can learn image and language representations for image-level tasks; Pixel-SAIL tests whether that simpler architecture can extend to referring segmentation and visual-prompt understanding.

## Contributions

- Extends encoder-free MLLMs to mask prediction and region-level language tasks using one Transformer as the inference backbone.
- Introduces a lightweight learned upsampling path that converts reshaped visual-token features into quarter-resolution mask features.
- Encodes each visual prompt with a learned special-token embedding placed at the prompt's spatial mask and adds it to the corresponding image tokens before Transformer processing.
- Distills high-resolution Mask2Former mask features and low-resolution SAM2 image features during training without requiring those teachers at inference.
- Builds PerBench with 500 examples for each of detailed object captioning, visual-prompt multiple-choice QA, and visual-text referring segmentation.

## Method

The starting point is a pretrained encoder-free MLLM such as SOLO or EVEv2. For segmentation, hidden states corresponding to image tokens are reshaped into a spatial feature map. Hidden states of generated `[SEG]` tokens act as mask queries, and their products with the image features produce masks.

Pixel-SAIL addresses the baseline's coarse masks with upsampling blocks composed of transposed convolution and depth-wise convolution. The resulting mask feature map has one-quarter of the input image's spatial resolution. For visual prompts, the model adds a vocabulary of prompt-specific tokens. Each token embedding is spatially broadcast over its associated mask and added to the image-token grid, giving the shared Transformer access to prompt identity and location through early fusion.

Training uses next-token prediction, segmentation, and feature-distillation losses. Mask2Former supervises the upsampled mask features, while SAM2 supervises the reshaped low-resolution visual features; spatial and channel mismatches are handled by bilinear interpolation and a learned linear projection. The distillation loss has weight 0.5. Mixed co-training combines referring and panoptic segmentation data, visual-prompt datasets, generated detailed object captions, and LLaVA-1.5 instruction data.

PerBench tests three complementary capabilities. Detailed object captions are evaluated with METEOR; 500 manually authored visual-prompt multiple-choice questions use accuracy; and 500 visual-text referring segmentation cases use cIoU and gIoU. The reported overall score averages the three normalized task scores.

## Experiments

**Referring segmentation.** Without task-specific fine-tuning, Pixel-SAIL-3B reports validation cIoU of 75.7 on RefCOCO+, 78.7 on RefCOCOg, 80.8 on RefCOCO, and 67.7 on gRefCOCO. Against Sa2VA-4B, the paper reports gains of 1.4 points on RefCOCO+ and 2.0 points on RefCOCOg. Pixel-SAIL-0.5B reaches 70.8, 75.4, 77.9, and 63.9 cIoU on the same validation sets.

**Visual prompts and PerBench.** On zero-shot RefCOCOg region captioning, the 3B model reaches 17.6 METEOR, versus 17.3 for Sa2VA-4B, 16.6 for Osprey-7B, and 16.2 for GLaMM-7B. On PerBench, Pixel-SAIL-3B scores 24.2 METEOR, 74% MCQ accuracy, 33.4 cIoU, 23.5 gIoU, and 42.2 overall. Sa2VA-4B scores 19.2, 71%, 31.9, 21.9, and 39.0, respectively.

**General VQA.** Pixel-SAIL-0.5B improves over its SOLO baseline on the four reported benchmarks, including an MMBench increase from 13.8 to 31.8. At 3B and 7B, performance is mostly comparable to the base MLLMs rather than consistently improved.

**Ablations.** On the 0.5B system, learned upsampling and expanded segmentation data account for the largest referring-segmentation gains. Visual-prompt injection raises RefCOCOg region-caption METEOR from 1.4 to 16.1. Distillation produces smaller average cIoU gains: using both teachers improves RefCOCO, RefCOCO+, and RefCOCOg by 0.6, 0.3, and 0.5 points while adding about 5% training time.

## Limitations

- Co-training uses 1.7 million examples, which the authors identify as a limitation relative to the scale of available mask data.
- The model still depends on Mask2Former and SAM2 during training, so the single-Transformer claim describes the inference architecture rather than a teacher-free training pipeline.
- For segmentation evaluation, the procedure forces a `[SEG]` token when the model does not generate one, which does not measure end-to-end abstention or output-format reliability.
- PerBench contains 500 examples per task. Its captions partly originate from large-model generation before manual selection and correction, and the paper does not report broader validation across domains.
- The distillation contribution is modest in the reported ablation, and the larger 3B and 7B variants do not consistently improve general VQA over their base MLLMs.
- Points and boxes in qualitative examples are converted to mask prompts with SAM, so those interactions are not processed from their raw geometric form by Pixel-SAIL alone.

## Related Concepts

- [[concepts/pixel-grounded-understanding|Pixel-Grounded Understanding]]: unifies region-level language understanding with mask-producing dense perception.
- [[concepts/encoder-free-vision-language-models|Encoder-Free Vision-Language Models]]: supplies the single-Transformer architectural starting point.
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: describes joint processing of image and text representations near the model input.
- [[concepts/autoregressive-dense-perception|Autoregressive Dense Perception]]: uses generated task tokens together with spatial feature heads for variable dense outputs.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfers dense visual representations from segmentation teachers during training.

## Related Papers

- [[papers/falcon-perception|Falcon Perception]] also uses a shared Transformer and specialized spatial heads for grounded dense prediction, with a different autoregressive object representation and training design.
- Lai et al. (2024), *LISA: Reasoning Segmentation via Large Language Model*, generates segmentation tokens but relies on separate visual and segmentation components.
- Rasheed et al. (2024), *GLaMM: Pixel Grounding Large Multimodal Model*, combines grounded conversation and mask prediction through a modular vision-language pipeline.
- Yuan et al. (2025), *Sa2VA: Marrying SAM2 with LLaVA for Dense Grounded Understanding of Images and Videos*, integrates explicit vision and segmentation experts rather than removing them at inference.

[[index|Library home]]
