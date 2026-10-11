---
title: Stick-Breaking Multinomial Models
type: concept
aliases:
  - Continuation Logit Models
tags:
  - categorical-data
  - item-response-theory
  - bayesian-measurement
---

## Overview

A stick-breaking multinomial model represents a categorical outcome through conditional binary stopping decisions. Each category receives part of the probability remaining after earlier categories, and the last category receives the remainder. Logistic stopping probabilities provide a tractable response model for categorical latent-trait measurement.

## Key Ideas

- **Probability factorization:** For $K$ categories and stopping probabilities $\sigma_k$, $p_k=\sigma_k\prod_{n<k}(1-\sigma_n)$ for $k<K$, while $p_K=\prod_{n<K}(1-\sigma_n)$. These probabilities sum to one. An observed category contributes decisions only up to its stopping point.
- **Latent-trait specification:** Setting $\operatorname{logit}(\sigma_{ij}^k)=\kappa_j^k+(\beta_j^k)^\top x_i$ shares a respondent position across items while permitting category-specific intercepts and slopes. Items can have different category counts.
- **Representation versus functional form:** A categorical distribution can be factorized in any order, but imposing linear logits on its factors creates a model whose behavior can depend on that order. It is not generally equivalent to imposing linear softmax logits.
- **Ordering constraints:** In one dimension, the first category's probability is monotone under a linear logit, while later categories can have interior peaks. A substantively plausible extreme category can therefore be a useful first choice. Empirical robustness to reordering is evidence for a particular application, not a theorem of invariance.
- **Tractable augmentation:** Polya-Gamma augmentation makes each logistic decision quadratic in its predictor, supporting Gaussian conditional updates and exact conditional expectations for EM. Subsequent use of variational inference would introduce a separate approximation.
- **Sparse categories and nonresponse:** Rare categories can yield poorly determined item parameters. A nonresponse category can reveal association with a latent trait without assigning it an ordinal rank, but does not establish why a response was withheld.

## Important Papers

- [[papers/a-multinomial-framework-for-ideal-point-estimation|A Multinomial Framework for Ideal Point Estimation]]: combines this representation with Polya-Gamma augmentation for ideal-point estimation and explores ANES nonresponse.
- Linderman, Johnson, and Adams (2015), "Dependent multinomial models made easy: Stick-breaking augmentation": the methodological antecedent cited by Goplerud for tractable dependent multinomial modeling.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: supplies shared latent positions and item-specific response parameters.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: an application when nonresponse is an informative category.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal position priors can be combined with stick-breaking response probabilities.
