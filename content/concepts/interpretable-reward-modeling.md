---
title: Interpretable Reward Modeling
type: concept
aliases:
  - Interpretable Reward Models
  - Steerable Reward Models
tags:
  - reward-modeling
  - reinforcement-learning-from-human-feedback
  - mechanistic-interpretability
  - preference-steering
---

## Overview

Interpretable reward modeling seeks to expose why a reward model prefers one response over another and, in steerable variants, to provide understandable controls over those preferences. Approaches differ in what they make visible: named attribute scores, a distribution of possible judgments, natural-language rationales, or feature-level contributions to a scalar reward.

## Key Ideas

- A scalar score alone does not reveal whether a reward reflects intended human values, dataset artifacts, or spurious correlations. Interpretation therefore requires an intermediate representation whose contribution to the output can be inspected.
- Multidimensional reward models predict attributes such as helpfulness or verbosity and aggregate them, but require attribute-level supervision and may leave each attribute's internal computation opaque.
- Feature-attributed reward models can express a reward as $r(x,y)=\sum_i z_iw_i$, where $z_i$ is an interpretable feature activation and $w_i$ is its learned reward contribution. This gives a local decomposition for each evaluated response.
- [[concepts/sparse-autoencoders|Sparse Autoencoders]] offer one route to such a feature basis without multidimensional preference labels. Sparse activation supports concise attribution, but unsupervised features may be dead, ambiguous, entangled, or difficult to label.
- Interpretability and control are separate claims. A readable feature is steerable only when an intervention on its contribution changes relevant judgments while preserving unrelated behavior; broad tests and negative controls are needed to establish selectivity.
- [[concepts/distributional-reward-modeling|Distributional Reward Modeling]] addresses a complementary problem by retaining judgment variation and uncertainty. A reward model can be distributional without explaining its internal factors, or feature-interpretable while still returning one deterministic scalar.

## Important Papers

- [[papers/interpretable-reward-model-via-sparse-autoencoder|Interpretable Reward Model via Sparse Autoencoder]]: introduces SARM, which learns a scalar head over sequence-level sparse features and changes reward preferences by editing feature weights.
- Wang et al. (2024), "Interpretable Preferences via Multi-Objective Reward Modeling and Mixture-of-Experts": decomposes preferences into supervised reward objectives.
- Wang et al. (2024), "HelpSteer2: Open-source dataset for training top-performing reward models": provides multidimensional attribute supervision for reward modeling.
- Li et al. (2025), "SAFER: Probing Safety in Reward Models with Sparse Autoencoder": uses sparse features to analyze safety behavior in reward models.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/distributional-reward-modeling|Distributional Reward Modeling]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
