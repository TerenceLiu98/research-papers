---
title: SHAP Feature Attribution
type: concept
aliases:
  - SHAP
  - Shapley Additive Explanations
tags:
  - explainable-ai
  - feature-attribution
  - model-interpretability
---

## Overview

SHAP feature attribution explains a fitted model's prediction by assigning each input feature a contribution derived from Shapley values. The attributions compare model outputs across coalitions of features and sum to the explained prediction relative to a baseline. They describe how a particular model uses its inputs; they are not estimates of causal effects.

## Key Ideas

- A feature's Shapley value averages its marginal change in the model output over possible feature coalitions, weighted so that different coalition sizes contribute appropriately.
- Local accuracy requires the feature contributions plus the baseline to reproduce the explained model output. Missingness and consistency provide additional attribution properties under the SHAP framework.
- Summary plots aggregate local attributions to show magnitude and direction across observations. A positive SHAP value means that the feature value raises the model output relative to the chosen baseline, not that the feature increases the real-world outcome causally.
- Results depend on the fitted model, output scale, background distribution, and treatment of dependent features. Correlated inputs can make an apparently precise division of credit substantively ambiguous.
- TreeSHAP computes SHAP-style attributions efficiently for tree ensembles, making it useful for random forests and gradient-boosted trees.

## Important Papers

- Lundberg and Lee (2017), "A Unified Approach to Interpreting Model Predictions": presents SHAP as a unified additive feature-attribution framework.
- Shapley (1953), "A Value for N-Person Games": provides the cooperative-game allocation principle underlying Shapley values.
- [[papers/analysis-of-main-risk-factors-causing-stroke-in-shanxi-province-based-on-machine-learning-models|Analysis of Main Risk Factors Causing Stroke in Shanxi Province Based on Machine Learning Models]]: uses TreeSHAP to describe the direction and magnitude of variables in a random-forest stroke-risk classifier.

## Related Concepts

- Permutation importance: measures global performance deterioration after feature disruption rather than decomposing individual predictions.
- Feature importance: tree impurity reduction supplies a global ranking but does not directly give the direction of a feature's contribution.
- [[concepts/and-or-interaction-primitives|AND-OR Interaction Primitives]]: offers an interaction decomposition that can connect feature interactions to Shapley allocations.
