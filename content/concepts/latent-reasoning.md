---
title: Latent Reasoning
type: concept
aliases:
  - Implicit Reasoning
  - Latent Chain-of-Thought
tags:
  - large-language-models
  - reasoning
  - chain-of-thought
  - mechanistic-interpretability
---

## Overview

Latent reasoning is task-relevant computation carried by a model's hidden representations rather than fully expressed as intermediate natural-language steps. Evidence for it can include correct predictions recoverable before an explicit reasoning trace states the answer, intermediate representations that increasingly favor the correct solution, or successful computation through non-semantic latent tokens. It is broader than any single architecture: some work diagnoses latent computation in ordinary autoregressive models, while other work trains models to reason directly in continuous or recurrent latent spaces.

## Key Ideas

- **Behavioral evidence is indirect.** Producing a correct answer from a short or empty reasoning trace is consistent with latent computation, but it can also reflect memorization, shortcuts, or answer leakage. Controlled perturbations and trace inspection help separate these explanations.
- **Reasoning-trace truncation localizes answer availability.** A model is asked for an answer after progressively longer prefixes of its original trace. Accuracy that rises before the gold answer is written suggests that explicit text is not the sole carrier of computation.
- **Explicit and latent reasoning can coexist.** Hidden states may accumulate partial evidence while generated text externalizes, revises, or validates it. A model can also state the answer early and continue generating, so early correctness alone does not imply hidden-only reasoning.
- **Internal probes require caution.** Logit or tuned lenses decode intermediate states into token distributions, and similarity measures compare representational trajectories. Both can reveal relative dynamics without proving a unique causal algorithm or a human-interpretable internal language.
- **Difficulty and model capacity matter.** Latent answer signals may emerge on short or familiar tasks but disappear when a problem requires extended computation. Larger models can make such signals easier to observe without eliminating language or task disparities.
- **Multilingual behavior tests universality.** Similar layer-wise trajectories across languages can coexist with unequal accuracy and unequal alignment to English. Shared geometry does not by itself establish language-independent reasoning, while English alignment does not prove that the model literally translates every problem internally.

## Important Papers

- [[papers/large-reasoning-models-are-not-yet-multilingual-latent-reasoners|Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners]]: measures answer emergence under trace truncation across 11 languages and compares cross-language hidden-state trajectories.
- Lanham et al. (2023), "Measuring Faithfulness in Chain-of-Thought Reasoning": evaluates whether generated reasoning causally relates to model answers.
- Pfau, Merrill, and Bowman (2024), "Let's Think Dot by Dot: Hidden Computation in Transformer Language Models": shows that transformers can use filler tokens as a computational medium.
- Yang et al. (2024), "Do Large Language Models Latently Perform Multi-Hop Reasoning?": probes whether intermediate factual answers are represented internally.
- Hao et al. (2025), "Training Large Language Models to Reason in a Continuous Latent Space": trains recurrent latent computation rather than requiring every step to be verbalized.

## Related Concepts

- Chain-of-thought reasoning
- Mechanistic interpretability
- Logit lens and tuned lens
- Test-time computation
- Recurrent depth
- Benchmark contamination
