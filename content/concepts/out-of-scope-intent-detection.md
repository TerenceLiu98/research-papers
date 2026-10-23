---
title: Out-of-Scope Intent Detection
type: concept
aliases:
  - OOS Intent Detection
  - Unknown Intent Detection
  - Open Intent Detection
tags:
  - intent-recognition
  - open-set-recognition
  - out-of-distribution-detection
  - conversational-ai
---

## Overview

Out-of-scope intent detection decides whether an utterance belongs to any intent class known to a system. It complements ordinary intent classification, which assumes that every input must receive one of the predefined labels. In open conversations, OOS examples include both ordinary turns that are irrelevant to the chosen taxonomy and intentions that the taxonomy does not yet represent.

## Key Ideas

- **Reject option:** A system predicts a known intent only when its score clears a confidence or class-specific threshold; otherwise it returns OOS.
- **Outlier exposure:** Training on representative OOS samples with noncommittal targets can improve rejection without treating diverse unknowns as one coherent semantic class.
- **K+1 classification:** Modeling OOS as one additional class is simple, but can distort known-class boundaries because unknown examples need not form a single cluster.
- **Evaluation trade-off:** Known-intent accuracy and OOS recall must be reported together. A model can obtain a strong OOS score by rejecting too many valid inputs.
- **Dataset shift:** Detecting held-out utterances from the same sources is distinct from detecting examples from new speakers, programs, domains, or cultures.

## Important Papers

- [[papers/mintrec2-0-a-large-scale-benchmark-dataset-for-multimodal-intent-recognition-and-out-of-scope-detection-in-conversations|MIntRec2.0: A Large-Scale Benchmark Dataset for Multimodal Intent Recognition and Out-of-Scope Detection in Conversations]]: studies OOS detection with multimodal, contextual dialogue data and compares outlier exposure with K+1 classification.
- Larson et al. (2019), "An Evaluation Dataset for Intent Classification and Out-of-Scope Prediction": provides a widely used text benchmark with explicit OOS queries.
- Shu et al. (2017), "DOC: Deep Open Classification of Text Documents": uses class-specific rejection thresholds for open classification.
- Hendrycks, Mazeika, and Dietterich (2018), "Deep Anomaly Detection with Outlier Exposure": trains models with auxiliary outliers to improve unknown detection.

## Related Concepts

- [[concepts/multimodal-intent-recognition|Multimodal Intent Recognition]]
- Open-set recognition
- Out-of-distribution detection
- Selective classification
