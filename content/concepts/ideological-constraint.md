---
title: Ideological Constraint
type: concept
aliases:
  - Political Attitude Constraint
definition: "The degree to which shared political preferences make an actor's attitudes on some issues predictive of their attitudes on other issues."
tags:
  - public-opinion
  - political-ideology
---

## Overview

Ideological constraint describes how strongly choices are organized by shared preferences. It concerns predictive strength, whereas ideological dimensionality concerns the number of shared axes. A population can have weak constraint within a one-dimensional space or strong constraint across multiple dimensions.

## Key Ideas

- Compare predictions using actor positions with an item-specific baseline that does not distinguish actors. Raw accuracy alone can be high because one answer is broadly popular.
- Evaluate held-out choices: additional dimensions can improve training fit by absorbing idiosyncrasy without improving predictions.
- In joint actor-item models, hiding individual cells retains data for estimating both actors and items. This assesses prediction within the observed population and agenda.
- Report accuracy gains and proportional error reductions distinctly. Neither is automatically a decomposition of latent preference variance.
- Weak constraint is model- and agenda-relative; it does not alone establish irrationality, instability, or additional common dimensions.

## Important Papers

- [[papers/the-structure-of-political-choices-distinguishing-between-constraint-and-multidimensionality|The Structure of Political Choices]]: formalizes the distinction and compares held-out predictive gains among American citizens and politicians.
- Converse (1964), “The Nature of Belief Systems in Mass Publics”: foundational account of prediction across political attitudes, discussed by Marble and Tyler.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: counts shared axes rather than their predictive strength.
- [[concepts/item-response-theory|Item Response Theory]]: estimates actor traits and item characteristics jointly.
- [[concepts/heteroskedastic-ideal-point-estimation|Heteroskedastic Ideal-Point Estimation]]: models actor-specific residual variability; such variability is distinct from a population-level held-out constraint measure.
