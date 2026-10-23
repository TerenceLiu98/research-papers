---
title: Numerical Decoding through Structured Choices
type: concept
aliases:
  - Choice-Based Numerical Decoding
  - Interval-Tree Numerical Decoding
tags:
  - numerical-decoding
  - structured-decision-models
  - regression-through-classification
  - large-language-models
---

## Overview

Numerical decoding through structured choices reduces bounded numerical prediction to a sequence of categorical decisions. An external decoder partitions a finite numerical grid into intervals, asks a fixed model which interval contains the target in the context of the original question, and recursively refines the selected interval. This can add a numerical readout to [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]] without training a regression head, but its requested resolution is not evidence of accuracy or calibrated uncertainty.

## Key Ideas

- **Separate contextual judgment from numerical bookkeeping.** The model chooses among natural-language interval descriptions; the external procedure maintains exact integer grid indices, boundaries, and the final numerical value.
- **Branching controls depth, not reliability.** A balanced $K$-way tree over $N$ cells needs at most $\lceil\log_K N\rceil$ sequential choices. Increasing $K$ shortens the dependency chain but presents more alternatives and does not guarantee lower error.
- **Path correctness determines the resolution guarantee.** If every selected interval contains the target, the terminal lower endpoint is within one grid step and exactly recovers grid-valued targets. Once a greedy path excludes the target, later refinement cannot restore it.
- **Early mistakes carry larger numerical cost.** A first divergence near the root can move the output across a large fraction of the range. Consequently, more refinement can make a wrong-path estimate farther from the target even as the terminal cell becomes narrower.
- **Representation is part of the task.** Direct values, interval choices, decimal grid indices, and binary grid indices are mathematically convertible but need not be equally usable by a learned model. Scale, sign, option order, and prompt construction require direct controls.
- **Choose loss functions for the numerical use case.** Relative error can be dominated by targets near zero, while range-normalized error measures displacement across the supplied support. Reporting both can reveal rankings hidden by either metric alone.
- **Do not turn path scores into unvalidated uncertainty.** A selected path is a point readout. Multiplying choice probabilities or repairing threshold probabilities into a monotone CDF does not establish calibration; that requires outcome-based validation under the intended interface.
- **State the imposed support.** The caller supplies the containing range and resolution. Without an escape option, unknown-scale or out-of-range targets can produce precise-looking but invalid outputs.

## Important Papers

- [[papers/numericjev-jev-like-llm-numerical-decoding-with-multiway-decision-trees|NumericJev: Jev-like LLM Numerical Decoding with Multiway Decision Trees]]: develops balanced multiway interval decoding, proves its conditional depth and error properties, and evaluates representation, scale, and order sensitivity on Jev.
- Torgo and Gama (1997), "Regression using classification algorithms": studies interval discretization and misclassification costs for regression.
- Langford, Oliveira, and Zadrozny (2006), "Predicting conditional quantiles via reduction to classification": gives a classification reduction for numerical quantile prediction.
- Lukasik et al. (2024), "Regression-aware inference with LLMs": motivates selecting outputs according to numerical loss rather than textual likelihood alone.

## Related Concepts

- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]]: supplies the constrained choice operation used at each refinement level.
- [[concepts/probability-calibration|Probability Calibration]]: distinguishes a structured option score from a validated numerical probability.
- [[concepts/model-reprogramming|Model Reprogramming]]: also repurposes fixed pretrained computation, but commonly learns transformations around the model.
- Regression through classification
- Discretized regression
- Hierarchical classification
