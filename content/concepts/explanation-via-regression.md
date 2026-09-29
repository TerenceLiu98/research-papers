---
title: Explanation via Regression
type: concept
aliases:
  - EVR
tags:
  - mechanistic-interpretability
  - representation-learning
  - regression
---

## Overview

Explanation via Regression (EVR) fits neural activations as linear combinations of interpretable functions of input tokens. Explained variance measures how much the chosen functions account for, while the residuals expose activation structure that remains unexplained. It is a method for decomposing representations on a specified prompt distribution.

## Key Ideas

- **Predict activations from explanatory variables.** Unlike [[concepts/linear-probing|Linear Probing]], which predicts a property from activations, EVR regresses activations on known functions such as one-hot input identities or sine/cosine encodings of a task variable.
- **Inspect residuals iteratively.** Fit a current set of explanatory functions, visualize residual activations, and add functions suggested by their structure. Regression coefficients identify activation-space directions associated with the selected functions.
- **Remove obscuring variance.** In Mistral 7B's weekday task, subtracting components explained by starting-day and offset indicators reveals a circle organized by the answer day in layer-25 final-token residuals. Raw leading PCs do not make that output representation obvious.
- **Visualize task structure.** For tasks with two inputs, map the top three residual PCs to RGB colors on an input-by-input grid. Stripes can suggest dependence on an input or on their modular sum.
- **Respect explanatory limits.** High explained variance is conditional on the dataset and chosen functions. It does not independently establish causal use, recover a unique algorithm, or guarantee that low-variance components are behaviorally unimportant. A circular residual is evidence consistent with trigonometric computation, not proof of a particular implementation.

## Important Papers

- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] introduces EVR in Appendix K and uses it alongside patching to investigate calendar arithmetic.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
