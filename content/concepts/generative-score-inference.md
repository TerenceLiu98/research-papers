---
title: Generative Score Inference
type: concept
aliases:
  - GSI
tags:
  - uncertainty-quantification
  - generative-models
  - prediction-sets
---

## Overview

Generative Score Inference estimates a task-specific discrepancy distribution conditional on the input, then draws synthetic scores to calculate prediction-set thresholds or decision probabilities. It models the error score rather than generating the full response, allowing a common construction across regression, question answering, and image captioning.

## Key Ideas

- Fit a predictor separately from the data used to learn its discrepancy distribution. A pretrained predictor can be used directly.
- Learn $\hat P_{s\mid x}$ from input-score pairs, sample scores at a new input, and invert their upper quantile to obtain $\{y:s(y,\hat f(x))\leq\hat q_{1-\alpha}(x)\}$.
- Absolute residuals yield symmetric regression intervals; semantic or caption discrepancies support task-specific decisions. The chosen score determines which errors are represented.
- [[Conditional Prediction Coverage]] depends on both conditional-generation accuracy and Monte Carlo error. More synthetic samples address only the latter.
- [[Diffusion Models]] are one generator option. The generated discrepancy score must be distinguished from the log-density gradient used in diffusion training.
- Verified references can supply offline training scores without being available at deployment. Their quality and representativeness remain essential.
- Tail probabilities used for detection or multiple selection require the relevant validation and testing procedure; a learned probability is not automatically a valid p-value.

## Important Papers

- [[Generative Score Inference for Multimodal Data]]: introduces the framework, states its generation-dependent coverage bound, and evaluates tabular intervals, hallucination detection, and caption selection.

## Related Concepts

- [[Conditional Prediction Coverage]]
- [[Diffusion Models]]
