---
title: Computational Visual Semiotics
type: concept
aliases:
  - Quantitative Visual Semiotics
  - Computational Semiotic Image Analysis
tags:
  - visual-semiotics
  - computer-vision
  - digital-humanities
  - image-retrieval
---

## Overview

Computational visual semiotics operationalizes theories of visual meaning as quantities that computer-vision systems can extract from image collections. It supports large-scale comparison and exploratory analysis while preserving a conceptual distinction between what an image depicts, how its forms are arranged, and how it positions viewers and depicted subjects.

## Key Ideas

- **Plastic level:** Shapes, lines, colors, brightness, texture, and spatial organization contribute to meaning independently of the objects an image depicts.
- **Figurative level:** People, objects, settings, actions, and emotions describe recognizable entities and events in the represented world.
- **Enunciational level:** Camera position, framing, depth, body and head pose, and gaze help construct the relationship among the image, its depicted subjects, and its viewer.
- **Theory-guided measurement:** Semiotic categories can be mapped to detection, segmentation, depth, pose, gaze, tagging, captioning, and image-processing tasks. The mapping makes assumptions visible but remains limited by each model's training data and label space.
- **Interpretable similarity:** Comparisons can retain separate scores for colors, composition, subjects, scenes, and gaze rather than collapsing every property into one opaque embedding distance.
- **Validation at two levels:** Component accuracy and cross-model agreement test whether features are extracted consistently. They do not by themselves establish that those features support a valid cultural or humanistic interpretation.
- **Presence is not enough:** Meaning can depend on omissions, contrasts, and cultural conventions. Systems restricted to visible content need external or commonsense knowledge before they can represent those relations.

## Important Papers

- [[for-a-semiotic-ai-bridging-computer-vision-and-visual-semiotics-for-computational-observation-of-large-scale-facial-image-archives|For a Semiotic AI: Bridging Computer Vision and Visual Semiotics for Computational Observation of Large Scale Facial Image Archives]]: introduces FRESCO and an interpretable, multilevel similarity score.
- Mannisto et al. (2022), "Automatic Image Content Extraction: Operationalizing Machine Learning in Humanistic Photographic Studies of Large Visual Archives": maps visual grammar to machine-learning analysis of photographic archives.
- Arnold and Tilton (2019), "Distant Viewing: Analyzing Large Visual Corpora": develops a general framework for computational analysis of large visual corpora.

## Related Concepts

- [[visual-structural-topic-models|Visual Structural Topic Models]]
- [[visual-political-bias|Visual Political Bias]]
- Image embeddings
