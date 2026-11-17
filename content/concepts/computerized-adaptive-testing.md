---
title: Computerized Adaptive Testing
type: concept
aliases:
  - CAT
  - Adaptive Testing
definition: "Computerized adaptive testing selects successive items using an examinee's responses and evolving ability estimate, with test length controlled by a budget or precision target."
tags:
  - adaptive-testing
  - psychometrics
  - llm-evaluation
---

## Overview

Computerized adaptive testing adapts the questions administered to a respondent, including an LLM, as evidence accumulates. A calibrated item bank makes responses to different question sequences comparable under a shared measurement model.

## Key Ideas

- **Information-based selection:** Item information depends on current ability, so the most informative question can change after each response.
- **Sequential estimation:** Update latent ability after every answer; Bayesian estimators can stabilize early estimates from sparse response records.
- **Precision-based stopping:** Stop after enough information accumulates, subject to minimum and maximum lengths. Reaching the maximum does not guarantee the target precision.
- **Exposure and coverage:** Random selection among informative candidates spreads item use, but substantive content balance requires additional constraints.
- **Calibration dependence:** Precision and comparability depend on the item-response model and its fit to the evaluated population.

## Important Papers

- [[papers/adaptive-testing-for-llm-evaluation-a-psychometric-alternative-to-static-benchmarks|Adaptive Testing for LLM Evaluation]]: ATLAS combines 3PL calibration, top-five randomesque selection, EAP updates, and uncertainty-controlled stopping for LLM evaluation.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: provides the response probabilities and item information used in adaptive selection.
