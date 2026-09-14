---
title: Autoregressive Dense Perception
type: concept
tags:
  - autoregressive-models
  - instance-segmentation
  - visual-grounding
---

## Overview

Autoregressive dense perception represents a variable set of localized objects as a generated sequence. A compact sequence can identify each instance while specialized heads produce its high-dimensional spatial output. [[papers/falcon-perception|Falcon Perception]] implements this with repeated coordinate, size, and segmentation tokens conditioned on an image and a text query.

## Key Ideas

- **Coarse-to-fine conditioning:** Predicting location and extent before the segmentation token supplies instance identity to the mask head. Falcon reports that a segmentation-token-only variant instead tends to merge instances into one semantic mask.
- **Sequential instances, parallel pixels:** The number of generated objects controls sequence length, but masks need not be serialized pixel by pixel. Falcon computes each mask from a segmentation-token projection and upsampled image features.
- **Ordering is an inductive bias:** A set must be serialized for sequence training. Falcon's raster ordering reduces ambiguity and improves detection over random and size-based orderings in its ablations.
- **Absence requires supervision:** An explicit presence decision and negative queries teach a generative model when to produce no instances. Good localization on positive examples does not guarantee calibrated rejection of absent concepts.
- **Long contexts require adaptation:** Removing a fixed query count does not remove practical limits. Training length, memory, resolution, and sequential decoding cost constrain crowded-scene performance.
- **Best-of-k measures candidate quality:** Selecting the best sampled localization using ground truth shows that useful candidates exist. It does not supply a way to choose them at inference time without ground truth.

## Important Papers

- [[papers/falcon-perception|Falcon Perception]]: develops the coordinate-size-mask sequence and trains for up to 600 masks per expression.
- Chen et al. (2022), *Pix2Seq: A Language Modeling Framework for Object Detection*: cited by Falcon as a precedent for representing detection through an autoregressive token interface.
- Kolesnikov et al. (2022), *UViM: A Unified Modeling Approach for Vision with Learned Guiding Codes*: cited by Falcon as a related strategy for handling high-dimensional vision outputs.

## Related Concepts

- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]: one backbone design supporting both visual context and task-token generation.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: provides the visual initialization used in Falcon's dense segmentation experiments.
