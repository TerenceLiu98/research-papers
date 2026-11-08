---
title: Patch-Token Decoding Explainability
type: concept
aliases:
  - Patch-Decoding Interpretability
  - Patch-Token Decoding
  - Zero-Shot Patch Decoding
tags:
  - vision-transformers
  - model-interpretability
  - token-decoding
  - spatial-localization
---

## Overview

Patch-token decoding explainability applies a Vision Transformer's existing output head to intermediate spatial tokens as though each patch were the final class token. The resulting class logits or image-text similarities form a spatial map. This is a zero-shot diagnostic: it reads native representations without fitting a probe, but it also applies a head outside the role for which that head may have been trained.

## Key Ideas

- **Decoding and attribution answer different questions.** A decoded score reports what a fixed head reads from a patch representation. It does not by itself show that the patch caused the prediction, that information originated at that location, or that the class token uses the same representation in the same way.
- **Spatial contrast defines useful empirical regimes.** With an object mask, a map is aligned when object patches score above background patches, inverted when the ordering reverses, and unexplainable by this diagnostic when the two sets are not separated. These labels describe the map, not overall model quality.
- **A head can be valid for one token role and unreliable for another.** Many ViT classifier heads are optimized only on a class token. Applying them to patch tokens is an extrapolation, especially at layers whose patch representations receive no direct loss.
- **Accuracy does not validate localization.** Models with similar or high task performance can occupy different decoding regimes. Output supervision constrains predictions without necessarily identifying a unique internal spatial code.
- **Training conditions create implicit biases.** Architecture, objective, data statistics, optimization, layer, class subset, and random seed can all influence whether zero-shot maps align or invert. A recurring regime across a model family is evidence of a bias, not an architectural guarantee.
- **Validation should match the intended use.** Object-mask benchmarks can test spatial alignment. Causal claims require stronger evidence such as interventions, while a learned translator or [[concepts/linear-probing|Linear Probe]] answers a different question about recoverable information.

## Important Papers

- [[papers/the-explainability-illusion-must-vits-exhibit-patch-decoding-interpretability|The Explainability Illusion: Must ViTs Exhibit Patch-Decoding Interpretability?]] systematically distinguishes aligned, inverted, and unexplainable regimes and proves that identical optimal predictions can coexist with all three.
- Belrose et al. (2023), "Eliciting Latent Predictions from Transformers with the Tuned Lens," replaces direct intermediate decoding with learned layer-specific translators.
- Li et al. (2023), "A Closer Look at the Explainability of Contrastive Language-Image Pre-training," analyzes inverted similarity maps in CLIP and develops a dense-inference correction.
- Vilas et al. (2023), "Analyzing Vision Transformers for Image Classification in Class Embedding Space," decodes ViT representations in the classifier's class-embedding space.

## Related Concepts

- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]]
