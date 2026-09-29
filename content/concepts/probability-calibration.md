---
title: Probability Calibration
type: concept
aliases:
  - Predictive Probability Calibration
tags:
  - uncertainty-quantification
  - model-evaluation
  - decision-theory
  - selective-prediction
---

## Overview

Probability calibration asks whether a model's reported probabilities have the numerical meaning they claim. For a binary event, a calibrated probability $p$ should correspond to an event frequency of $p$ under the relevant conditioning scheme. For structured probabilistic interfaces, calibration can also require pointwise agreement with a known target distribution, consistent semantics across output primitives, and invariance across equivalent representations.

## Key Ideas

- **Confidence is not the whole distribution.** Top-label accuracy and expected calibration error focus on the predicted class. Decision-theoretic systems may need every option probability to compute expected utility, rank risks, or choose whether to defer.
- **Use proper distributional comparisons when targets are known.** Brier and logarithmic scores evaluate predictive distributions in expectation. When a target probability is known pointwise, absolute probability error or total variation can directly measure recovery; Distributional Overlap is a corresponding soft-accuracy form.
- **Separate calibration from ranking.** A score can rank errors or uncertain cases without being a numerically calibrated probability. Calibration tests and error-detection tests answer different questions.
- **Check representation sensitivity.** Equivalent wording, tables, counts, or prompt formats can produce different probabilities. Aggregated calibration can conceal this instability.
- **Represent unresolved mass when decisions permit it.** A model may be forced to output True or False while retaining uncertainty. A calibrated binary correction and an explicit defer or abstain state support different downstream actions.
- **Validate the deployment interface.** Calibration can differ across primitives, tasks, model versions, and data regimes. A result on a synthetic benchmark or one model interface does not establish calibration under deployment shift.

## Important Papers

- [[papers/jev-thinks-i-dont-know-but-doesnt-say-it-introducing-sys1cal-v1-dataset-for-probability-calibration|Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration]]: constructs exact probability targets, compares Jev's Noul, Choice, and Score outputs, and fits a latent uncertainty correction for Choice.
- Gneiting and Raftery (2007), "Strictly proper scoring rules, prediction, and estimation": establishes the proper-scoring framework cited by the Sys1Cal-v1 paper.
- Guo et al. (2017), "On calibration of modern neural networks": a reference for confidence calibration and expected calibration error.
- Dawid (1982), "The well-calibrated bayesian": an early account of probabilistic calibration.

## Related Concepts

- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]: routes uncertain judgments to a fallback, so calibration of the gate signal matters for coverage and risk.
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]: evaluates whether prediction sets contain outcomes at their target rates, with a different object of calibration.
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]: uses output probabilities to estimate scalar judgments rather than primarily testing their calibration.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: a structured evaluation setting where confidence, validity, and correctness should be measured separately.
