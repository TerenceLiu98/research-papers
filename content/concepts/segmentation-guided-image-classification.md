---
title: Segmentation-Guided Image Classification
type: concept
aliases:
  - Segmentation-Assisted Image Classification
definition: "Image classification that uses an explicit spatial segmentation to select or represent relevant image regions before predicting an image-level label."
tags:
  - image-segmentation
  - medical-image-analysis
---

## Overview

Segmentation-guided image classification uses predicted spatial regions as an intermediate representation for an image-level decision. It introduces an explicit localization stage whose errors and retained information affect the downstream classifier.

## Key Ideas

- A segmentation stage can focus a classifier on anatomical structure or candidate pathology. Vessel segmentation and lesion segmentation expose different information and should not be treated as equivalent.
- Comparing a full pipeline against a version without segmentation tests the contribution of that stage, provided the remaining evaluation conditions are comparable.
- Higher classification accuracy alone does not establish accurate segmentation. Spatial overlap or boundary metrics and image-level classification metrics evaluate different outputs.
- Removing an entire segmentation module does not isolate the effects of its attention mechanisms, connections, or supervision scheme.

## Important Papers

- [[papers/deepretnet-retinal-disease-classification|DeepRetNet]] combines attention UNet++ vessel segmentation with an optimized GoogLeNet-derived classifier and reports improved classification accuracy relative to its segmentation-free variant.

## Related Concepts

- [[concepts/synthetic-retinal-fundus-image-generation|Synthetic Retinal Fundus Image Generation]] can supply images with known vessel structure for studying segmentation; synthesis quality and downstream classification benefit require separate evaluation.
