---
title: Cross-Model Representational Disagreement
type: concept
aliases:
  - Rashomon Representation
  - Representational Disagreement
tags:
  - representational-similarity
  - foundation-models
  - reliability-estimation
---

## Overview

Cross-model representational disagreement describes input-level differences in how multiple models organize the same sample in their respective representation spaces. Unlike a global similarity score, it varies by input: two models may induce similar neighborhoods for one query and substantially different neighborhoods for another. “Rashomon Representation” names this phenomenon in [[papers/predicting-multi-view-rashomon-representation|Predicting Multi-View Rashomon Representation]].

## Key Ideas

- **Compare relations, not raw coordinates.** Independently trained models can have different dimensions and coordinate systems. Their representations can still be compared through relations over a shared reference set, such as nearest-neighbor identities or similarity profiles.
- **Measure at the sample level.** Global methods such as RSA, SVCCA, and CKA summarize representation spaces. Pointwise disagreement instead asks whether a particular input occupies a consistent local position across models.
- **Neighborhood overlap is one operationalization.** For two models, the fraction of shared top-$k$ reference neighbors gives a bounded agreement score. Averaging anchor-to-comparison overlaps extends the measure to a model panel.
- **Agreement is reference-dependent.** The score depends on the reference data, similarity measure, neighborhood size, model panel, and representation extraction choices. It should not be treated as an intrinsic property of the input alone.
- **Disagreement can be a reliability signal without being an error certificate.** Inputs organized differently across models may be harder or less stable downstream, but disagreement does not by itself identify which model is correct or guarantee failure.
- **Prediction amortizes measurement.** A predictor trained on offline multi-model agreement targets can estimate expected disagreement from one representation, trading exact repeated measurement for a learned approximation whose validity may weaken under distribution shift.

## Important Papers

- [[papers/predicting-multi-view-rashomon-representation|Predicting Multi-View Rashomon Representation: Can We Learn Where Models Disagree?]] defines neighborhood agreement across foundation models and predicts it from a single anchor representation.
- Park et al. (2024), “Quantifying Representation Reliability in Self-Supervised Learning Models,” uses neighborhood consistency to study sample-level representation reliability.
- Kolling et al. (2025), “Investigating the Effects of Fairness Interventions Using Pointwise Representational Similarity,” develops pointwise comparison through similarity profiles.
- Kornblith et al. (2019), “Similarity of Neural Network Representations Revisited,” provides CKA, a widely used global comparison baseline.

## Related Concepts

- Representational similarity
- Nearest-neighbor retrieval
- Model disagreement
- Uncertainty estimation
- Distribution shift
