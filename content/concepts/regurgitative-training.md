---
title: Regurgitative Training
type: concept
aliases:
  - Training on LLM-Generated Data
  - Recursive Synthetic-Data Training
tags:
  - large-language-models
  - synthetic-data
  - model-collapse
  - data-quality
---

## Overview

Regurgitative training is the training or fine-tuning of a generative model with data produced at least partly by itself or by other generative models. It includes deliberate synthetic-data pipelines and incidental reuse of generated content that has entered a training corpus. The concept is broader than strict recursive self-training because the data generator and the trained model may differ.

## Key Ideas

- Synthetic-data scale does not guarantee useful learning. If generated targets contain errors or omit meaningful variation, adding more of them can plateau or reduce downstream performance.
- Generator capability matters. Data from a stronger model can be less harmful or modestly beneficial, while outputs from a weak model can actively degrade the trained model.
- Real and synthetic data are not interchangeable distributions. Retaining even a small share of curated real data can materially improve performance over synthetic-only training.
- Data quality and diversity interact. Mixing generators can broaden lexical coverage, but diversity gains may be outweighed when one source has substantially worse task accuracy.
- Mitigation can rank examples by estimated quality or resemblance to human data, mix sources, or retain real data. Such procedures depend on the quality of their scoring models and do not necessarily eliminate the gap.
- Subjective tasks require a separate analysis. Human preferences over model-generated candidates can improve the explicitly optimized outcome, but preference optimization may reduce other valued outcomes.

## Important Papers

- [[papers/regurgitative-training-the-value-of-real-data-in-training-large-language-models|Regurgitative Training: The Value of Real Data in Training Large Language Models]] evaluates the phenomenon across translation, question answering, and product ideation, and tests three mitigation strategies.
- Shumailov et al. (2023), "The Curse of Recursion: Training on Generated Data Makes Models Forget," studies model collapse under repeated model-generated training data.
- Gerstgrasser et al. (2024), "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data," shows why preserving accumulated real data can change recursive-training outcomes.
- Bertrand et al. (2023), "On the Stability of Iterative Retraining of Generative Models on Their Own Data," analyzes conditions involving real-data share and approximation quality that can prevent collapse.

## Related Concepts

- Model collapse
- Self-training
- Synthetic data
- [[Instruction-Tuning Data Diversity]]
- [[concepts/curse-of-ambiguity|Curse of Ambiguity]]
- Direct Preference Optimization
