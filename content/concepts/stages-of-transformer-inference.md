---
title: Stages of Transformer Inference
type: concept
tags:
  - mechanistic-interpretability
  - transformer-dynamics
---

## Overview

The stages-of-inference hypothesis organizes computation across decoder-only transformer depth into four overlapping regimes. It connects local specialized circuits with iterative refinement of the residual stream, using depth-dependent intervention sensitivity and representation measurements.

## Key Ideas

1. **Detokenization:** early attention integrates nearby subword tokens and local context into coherent representations.
2. **Feature engineering:** intermediate layers construct contextual semantic features that can be accessible to probes before producing confident vocabulary-space predictions.
3. **Prediction ensembling:** overlapping components promote candidate outputs, offering a possible explanation for tolerance to middle-layer deletion or reordering.
4. **Residual sharpening:** late components suppress candidate tokens or obsolete features and adjust the output distribution.

These regimes are hypotheses about aggregate behavior, not fixed layer boundaries or a universal per-token execution trace. Layer interventions supply causal evidence about sensitivity; probes and neuron statistics help interpret that sensitivity but do not uniquely identify its mechanism. Lower prediction entropy alone does not establish better accuracy, and agreement with an unmodified model is distinct from correctness.

## Important Papers

- [[papers/the-remarkable-robustness-of-llms-stages-of-inference|The Remarkable Robustness of LLMs: Stages of Inference?]] proposes the four-stage account using layer deletion, adjacent swaps, semantic probes, attention measurements, and layer repetition across several model families.

## Related Concepts

- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/linear-residual-stream-transport|Linear Residual-Stream Transport]] concerns cross-layer predictability of representations, a complementary measurement rather than a test that directly identifies stage boundaries.
