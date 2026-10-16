---
title: Representation Autoencoders
type: concept
aliases:
  - Representation Autoencoder
tags:
  - representation-learning
  - generative-models
  - computer-vision
---

## Overview

Representation autoencoders pair a pretrained visual representation encoder with a decoder trained to reconstruct images from its features. They provide semantic latents that can also be decoded, supporting representation analysis and latent-space generation within the same system.

## Key Ideas

- **Semantic features become decodable.** A pretrained visual encoder supplies representations; a corresponding decoder maps them back to images. In the RAEv2 configuration used by SAGE, DINOv3-L features are combined across layers and retain a spatial token layout.
- **Spatial detail supports editing.** SAGE learns same-shape common and salient maps whose sum is passed to the frozen decoder. Keeping spatial maps allows localized attributes to retain their location and appearance before generation conditioning pools them.
- **Reconstruction does not guarantee factor separation.** The unfactorized latent mixes target attributes and shared content. A high-quality decoder makes edits observable but does not determine which information belongs in each factor.
- **Generation can reuse the representation space.** SAGE fine-tunes a pretrained diffusion transformer using conditional flow matching in the frozen RAE latent. Pooling only salient factors reduces reference copying relative to conditioning on full features in its experiments.

## Important Papers

- Zheng et al. (2026), "Diffusion transformers with representation autoencoders": RAE foundation cited by SAGE.
- Singh et al. (2026), "Improved baselines with representation autoencoders": RAEv2, used by SAGE for frozen reconstruction and generation initialization.
- [[papers/sage-salient-factor-discovery-and-generation-with-visual-foundation-representations|SAGE: Salient Factor Discovery and Generation with Visual Foundation Representations]]: factorizes the spatial latent for discovery, manipulation, and generation.

## Related Concepts

- [[concepts/contrastive-analysis|Contrastive Analysis]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/diffusion-models|Diffusion Models]]
