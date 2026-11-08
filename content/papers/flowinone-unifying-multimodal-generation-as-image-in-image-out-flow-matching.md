---
title: "FlowInOne: Unifying Multimodal Generation as Image-In, Image-Out Flow Matching"
type: paper
authors:
  - Junchao Yi
  - Rui Zhao
  - Jiahao Tang
  - Weixian Lei
  - Linjie Li
  - Qisheng Su
  - Zhengyuan Yang
  - Lijuan Wang
  - Xiaofeng Zhu
  - Alex Jinpeng Wang
year: null
homepage: https://csu-jpg.github.io/FlowInOne.github.io/
tags:
  - flow-matching
  - multimodal-generation
  - image-editing
  - visual-prompting
  - controllable-generation
---

## TL;DR

FlowInOne renders text, layouts, markers, and editing instructions into image canvases, then uses a single [[concepts/flow-matching|Flow Matching]] model to transport those visual-instruction latents into target-image latents. Trained jointly on the 5.36M-pair VisPrompt-5M collection, the 1.2B-parameter model leads the evaluated open-source baselines on VP-Bench and is especially strong on spatial and physics-related controls, but it remains limited to 256 x 256 outputs, single-turn interaction, and weaker generalization in complex unconstrained scenes.

## Research Question

Can heterogeneous generation conditions, including text, spatial layouts, visual markers, doodles, and physical force or trajectory cues, be represented as images and handled by one image-in, image-out generative model without separate text encoders or task-specific conditioning branches?

## Motivation

Conventional multimodal generation usually treats language embeddings as the main control channel and adds specialized interfaces for images, masks, layouts, or other spatial constraints. This separates semantic and geometric conditions across representations and architectures. FlowInOne instead asks whether rendering every condition into a visual canvas can turn multimodal generation into a single intra-modal transport problem, keeping instructions and desired outputs in aligned visual spaces.

## Contributions

- Introduces an image-in, image-out formulation in which textual and spatial instructions are rendered into a unified visual prompt rather than supplied through modality-specific encoders.
- Develops FlowInOne, a latent flow-matching architecture that transports a visual-instruction state to a target-image state and uses Dual-Path Spatially-Adaptive Modulation to preserve source structure during editing.
- Constructs VisPrompt-5M, reported as approximately 5.36M curated pairs spanning class-to-image, text-to-image, text-in-image editing, structured editing, bounding-box editing, visual-marker editing, doodles, force understanding, and trajectory understanding.
- Introduces VP-Bench, whose automated and human evaluations assess instruction faithfulness, content consistency, visual realism, and spatial precision across the unified task set.

## Method

All conditions are first converted to images. A text-only request becomes a rendered text canvas, while editing inputs combine a source or condition image with rendered instructions, boxes, arrows, markers, or doodles. A visual encoder based on Janus-Pro-1B extracts unified tokens. A trainable text-image VAE maps these tokens to a source distribution, while a frozen latent-diffusion VAE maps the target image to an isomorphic target latent.

The model learns a time-dependent velocity field along a linear path between the instruction latent and target-image latent. At inference, it samples the encoded instruction state, integrates the learned ordinary differential equation from $t=0$ to $t=1$, and decodes the endpoint through the frozen image VAE. Unlike conventional flow generation from Gaussian noise, the source distribution carries the visual instruction.

For pure generation from rendered text, the Transformer uses its semantic path without an external structural reference. For image editing, Dual-Path Spatially-Adaptive Modulation adds cross-attention to the encoded source image and predicts token-wise gates that regulate how much structural information enters each layer. Training combines flow-matching, KL-divergence, and contrastive alignment losses. The 1.2B-parameter model is initialized from CrossFlow and jointly trained for 240,000 steps at 256 x 256 resolution with balanced sampling across task categories.

## Experiments

VP-Bench compares FlowInOne with Nano Banana, OmniGen2, FLUX.1-Kontext-dev, and Qwen-Image-Edit-2509. Baselines receive extracted and expanded text prompts alongside their native image inputs. Evaluation uses Gemini 3, GPT-5.2, Qwen3.5, ten human evaluators on 250 stratified samples, and task-specific CLIP-IQA, CLIP Score, directional CLIP, and directional DINOv3 measures.

Across the eight task categories, FlowInOne's total pass rates are 54.0% with Gemini 3, 39.2% with GPT-5.2, 50.3% with Qwen3.5, and 44.9% with human evaluation. These totals exceed all evaluated open-source baselines. Relative to Nano Banana, FlowInOne is slightly lower under Gemini 3, Qwen3.5, and human judgments, and essentially tied under GPT-5.2 (39.2% versus 39.1%).

FlowInOne has the best spatial-precision score under each VLM evaluator: 3.42, 3.24, and 3.30 out of 5. Its average directional DINOv3 similarity is 0.487, compared with 0.473 for Nano Banana, with particularly strong results on force, trajectory, and text-bounding-box tasks. Nano Banana retains higher visual realism, with CLIP-IQA of 0.688 versus 0.684 and higher realism ratings from all three VLM judges.

Ablations support three design choices. MLP projection of both sequence length and feature dimension outperforms truncation or deeper-VAE alternatives in the controlled setting. Dual-Path Spatially-Adaptive Modulation reaches a 23.1% average pass rate versus 21.4% for ungated dual-path cross-attention and 18.2% without cross-attention. Joint training on all tasks reaches 47.8%, compared with 29.1% for a two-stage schedule. The full model's best reported configuration uses 50 sampling steps, classifier-free guidance of 7, KL weight 0.01, and contrastive-loss weight 1.

Human failure analysis identifies instruction fidelity as 56.2% of tagged errors, followed by spatial precision at 20.5%, visual realism at 13.5%, and content consistency at 9.7%. Robustness tests report stability to changes in text style, length, and blur, but performance degrades under corrupted instruction text.

## Limitations

- Outputs are fixed at 256 x 256 pixels, limiting use in high-fidelity workflows.
- The model is designed for single-turn execution; continuous multi-turn editing is not evaluated.
- The authors report limited generalization in complex, unconstrained scenarios and attribute this partly to the 1.2B model capacity and training-data scale.
- FlowInOne trails the commercial Nano Banana model in aggregate under three of four evaluator groups and has lower visual-realism scores despite stronger spatial metrics.
- Instruction fidelity remains the largest observed failure category, and robustness falls when rendered text is corrupted.
- VP-Bench supplies evaluators with text extracted from visual prompts, so the reported automated evaluation is not a test of evaluator OCR alone.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] provides the learned velocity field, but FlowInOne transports an instruction-derived latent rather than starting from independent Gaussian noise.
- [[concepts/diffusion-models|Diffusion Models]] are the principal contrasting family; FlowInOne replaces iterative noise removal and separate conditioning channels with direct latent transport.
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]] describes the representation mismatch that the paper seeks to avoid by converting heterogeneous controls into one visual modality.

## Related Papers

- Lipman et al. (2023), "Flow Matching for Generative Modeling": supplies the flow-matching foundation.
- Liu et al. (2025), "Flowing from Words to Pixels: A Noise-Free Framework for Cross-Modality Evolution": supplies the CrossFlow initialization and related transport formulation.
- Chen et al. (2025), "Janus-Pro: Unified Multimodal Understanding and Generation with Data and Model Scaling": supplies the visual encoder used by FlowInOne.
- Black Forest Labs et al. (2025), "FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space": an evaluated flow-matching editing baseline.
- Wu et al. (2025), "OmniGen2: Exploration to Advanced Multimodal Generation": an evaluated unified multimodal-generation baseline.

Source: [project homepage](https://csu-jpg.github.io/FlowInOne.github.io/). No stable paper identifier was present in the supplied Markdown.

[[index|Library home]]
