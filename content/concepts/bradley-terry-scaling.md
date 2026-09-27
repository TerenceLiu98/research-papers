---
title: Bradley-Terry Scaling
type: concept
aliases:
  - Bradley-Terry Model
  - Bradley-Terry Pairwise Comparison Model
tags:
  - pairwise-comparisons
  - latent-trait-estimation
  - text-as-data
---

## Overview

Bradley-Terry scaling estimates relative item scores from pairwise judgments. In text measurement, each judgment identifies which text expresses more of a specified construct. The model aggregates these comparisons into a latent scale, whether the judgments come from human coders or language models.

## Key Ideas

- **Model differences in latent strength.** For scores $z_i$ and $z_j$, $P(i\succ j)=e^{z_i}/(e^{z_i}+e^{z_j})=\sigma(z_i-z_j)$. Maximum-likelihood estimation relates observed wins and losses to these probabilities.
- **Identify the location.** Adding the same constant to all scores leaves comparison probabilities unchanged. A reference item or sum-to-zero constraint fixes the location. Display rescaling should be distinguished from the fitted scores used in the probability model.
- **Inspect the comparison graph.** Items are vertices and observed comparisons are edges. The sampling schedule determines which relative positions are informed by data; sparse observations and separation can complicate estimation. Licht et al. hold out vertices rather than merely edges to evaluate scoring of unseen texts.
- **Separate aggregation from learned scoring.** Fitting item parameters aggregates comparisons for observed items. A reward model instead learns a function of text with the loss $-\log\sigma(r_\theta(x_h)-r_\theta(x_l))$, allowing single-item scoring of new texts at inference.
- **Validate the construct and reference labels.** A coherent latent scale is not proof of semantic validity. Noisy human labels, biased LLM comparisons, or a poorly specified dimension can produce misleading scores. Additional human judgments can challenge the reference itself.
- **Distinguish prompting from supervision.** Pairwise labels can support data-efficient fine-tuning even when pairwise prompting fails to improve ranking over [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]].

## Important Papers

- Bradley and Terry (1952), "Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons": foundational model cited in the scalar-measurement study.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: uses Bradley-Terry models for human reference scores, aggregation of LLM comparisons, and the pairwise fine-tuning objective.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: uses a Bradley-Terry model to check consistency between human placements and pairwise judgments of political speeches.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
