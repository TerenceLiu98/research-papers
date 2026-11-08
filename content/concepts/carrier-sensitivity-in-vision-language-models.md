---
title: Carrier Sensitivity in Vision-Language Models
type: concept
aliases:
  - Cross-Carrier Sensitivity
tags:
  - vision-language-models
  - multimodal-alignment
  - robustness
  - representation-learning
---

## Overview

Carrier sensitivity is a vision-language model's dependence on the modality used to present otherwise equivalent semantic content. A carrier-sensitive model may answer a written question correctly when it arrives as text tokens but fail when the same question is rendered legibly as an image. The phenomenon differs from ordinary OCR failure when performance changes systematically with the representational separation between matched text and pixel inputs.

## Key Ideas

- **Semantics and carrier can be varied separately.** A controlled test holds the wording, task, and referenced image fixed while replacing text tokens with an image of the same text.
- **Training roles can create a shortcut.** Many multimodal datasets use text for instructions and images for evidence. A model can exploit these stable roles without making equivalent textual and visual content interchangeable.
- **Representation distance provides a diagnostic.** Comparing hidden states for paired tokenized and rendered inputs tests whether equivalent content occupies nearby regions, while task accuracy tests whether that difference affects behavior.
- **Alignment is not identical to OCR.** Reading pixels is necessary, but carrier invariance additionally requires the recognized content to participate in reasoning similarly to tokenized text.
- **Data curation can target the problem.** Local substitution places a rendered span inside textual context, making successful prediction depend on integrating both carriers without changing the model or its inference procedure.
- **Robustness should be tested beyond the training transformation.** Improvements on rendered prompts are direct evidence for the targeted substitution, but broader claims require varied layouts, capture conditions, scripts, domains, and naturally occurring mixed-media inputs.

## Important Papers

- [[papers/lomo-local-modality-substitution-for-deeper-vision-language-fusion|LoMo: Local Modality Substitution for Deeper Vision-Language Fusion]]: diagnoses carrier sensitivity in two VLMs and trains on text-image-text prompt substitutions to reduce it.
- Liang et al. (2022), "Mind the Gap: Understanding the Modality Gap in Multi-Modal Contrastive Representation Learning": characterizes separated image and text embedding distributions in contrastive vision-language models.
- Huang et al. (2024), "Deciphering Cross-Modal Alignment in Large Vision-Language Models with Modality Integration Rate": measures the distribution gap between visual and textual tokens across decoder layers.

## Related Concepts

- [[concepts/visual-text-compression|Visual-Text Compression]]: uses rendered text as a dense carrier, usually for efficiency rather than invariance.
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]: studies how related concepts can remain encoded differently across modalities.
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: integrates modalities through a shared modeling stack.
