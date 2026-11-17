---
title: Symbolic Regression
type: concept
aliases:
  - SR
definition: "Symbolic regression infers a mathematical expression, including its structure and numerical constants, from observed input–output pairs."
tags:
  - symbolic-regression
  - scientific-discovery
---

## Overview

Symbolic regression searches for an explicit mathematical formula that explains observed data. Both the composition of operators and the numerical parameters are unknown, coupling discrete structural search with continuous fitting.

## Key Ideas

- An operator vocabulary and expression representation define the candidate space. Tree-based expressions can also be serialized for autoregressive generation.
- Numerical constants affect which structures fit well. Predicting structure and constants jointly can inform decoding and provide useful optimization initializations.
- Supervised neural generators can amortize search through synthetic pretraining, while local refinement adapts candidate constants to new observations.
- Numerical fit, expression simplicity, exact formula recovery, and extrapolation are different evaluation targets. Near-perfect fit over a finite domain need not identify the generating expression.

Panel datasets can share an expression structure while retaining panel-specific constants. This pools evidence for common interactions without requiring identical trajectories. Complexity penalties and domain-specific bases constrain discovery, but neither guarantees causal identification.

## Important Papers

- [[papers/symformer-end-to-end-symbolic-regression-using-transformer-based-architecture|SymFormer]]: jointly predicts symbols and constants, then refines constants with local gradient search; its evidence concerns univariate and bivariate functions.

- [[papers/ai-assisted-discovery-of-quantitative-and-formal-models-in-social-science|AI-Assisted Discovery of Quantitative and Formal Models in Social Science]]: extends OccamNet with complexity controls and panel-shared equation discovery; illustrates sensitivity to priors and preprocessing.

## Related Concepts

- [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]]: extends the formula-discovery task to inference over uncertainty in structures and parameters.
