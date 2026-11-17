---
title: Entropy Balancing
type: concept
aliases:
  - ebal
definition: Entropy balancing constructs nonnegative normalized weights that match specified target covariate moments while minimizing relative entropy from base weights.
tags:
  - causal-inference
  - weighting
---

## Overview

Entropy balancing reweights a comparison sample toward specified target moments. For ATT estimation, controls are weighted to match treated-group covariate moments, and their weighted outcome mean supplies the comparison. The objective minimizes Kullback–Leibler divergence from positive base weights subject to normalization and moment constraints.

## Key Ideas

- Exact balance applies to specified features, not automatically to the full covariate distribution or unobserved confounders.
- Adding powers and interactions can reduce dependence on simple functional forms, but too many exact constraints can cause infeasibility or concentrated weights.
- The dual parameterization yields exponentially tilted base weights. Penalizing dual multipliers relaxes associated balance conditions.
- Hierarchically regularized entropy balancing groups features and applies separate ridge penalties, preserving exact level balance by default while allowing approximate higher-moment balance. Cross-validation evaluates held-out balance.
- Outcome augmentation can address remaining imbalance when the outcome model is correctly specified. Identification and model conditions remain distinct from achieving sample balance.

## Important Papers

- Hainmueller (2012), “Entropy Balancing for Causal Effects”: original exact-balancing method, as described in Xu and Yang.
- [[papers/hierarchically-regularized-entropy-balancing|Hierarchically Regularized Entropy Balancing]]: expands the feature space and introduces group-specific regularization.

## Related Concepts

- [[concepts/weighting-diagnostics-for-causal-estimation|Weighting Diagnostics for Causal Estimation]]: evaluates weight concentration and balance beyond the constrained moments.
