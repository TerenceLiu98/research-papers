---
title: Equilearning Law
type: concept
aliases:
  - Law of Equilearning
tags:
  - large-language-models
  - representation-learning
  - linear-probing
  - scaling-laws
---

## Overview

The equilearning law is an empirical pattern in pretrained autoregressive language models: the next-token prediction residual of a linear probe decreases approximately geometrically across successive hidden layers. Equivalently, log prediction residual is approximately linear in layer depth, so each layer supplies a similar multiplicative rather than additive improvement in probe-accessible next-token information.

## Key Ideas

- **Geometric layerwise change:** If $\mathrm{PR}_{\ell}\approx\rho^{\ell-1}\mathrm{PR}_1$ for $0<\rho<1$, adjacent layers reduce residual by an approximately constant factor. The decay ratio depends on the model, data, depth, representation dimension, and training state.
- **Probe-defined evidence:** Prediction residual is one minus the coefficient of determination for least-squares prediction of the next token's vocabulary index from a hidden representation. The law concerns information accessible to that probe, not a decomposition of the model's own logits or a proof that layers implement equivalent operations.
- **Emergence through training:** The pattern need not hold at initialization. In the reported Pythia study it becomes apparent after training progresses, and data-repetition experiments indicate that both training volume and token diversity matter.
- **Objective alignment:** The pattern is strongest when the probe target matches autoregressive next-token pretraining. Masked-language-model probes show a noisier version for BERT and RoBERTa, while T5 span-corruption experiments do not show the law.
- **Measurement conditions matter:** Token-index order, layer normalization, and probing-corpus choice materially affect clarity. The law should therefore be evaluated as a conditional empirical regularity rather than a representation-invariant universal law.
- **Directional information flow:** Related probes suggest that deeper representations progressively improve access to future tokens while losing linear access to present and previous token identity. This finding is associated with, but distinct from, the equilearning equation itself.

## Important Papers

- [[papers/a-law-of-next-token-prediction-in-large-language-models|A law of next-token prediction in large language models]] (He and Su, 2025): introduces the law and evaluates it across Transformer, RWKV, and Mamba families, training regimes, objectives, and probe conditions.
- He and Su (2023), "A law of data separation in deep learning": establishes the related equiseparation phenomenon for multilayer perceptrons in classification settings.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]: supplies the operational layerwise measurement; its accessibility and use-versus-availability qualifications apply directly.
- Neural scaling laws: relate model resources to aggregate performance, whereas equilearning describes the distribution of a probe score across depth within a model.
- Neural collapse: another empirical geometric regularity in learned representations, developed primarily for supervised classification.
- Contextualized token representations: the layerwise objects evaluated by the prediction-residual probe.
