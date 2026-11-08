---
title: Joint Energy-Based Models
type: concept
aliases:
  - JEM
tags:
  - energy-based-models
  - generative-classification
---

## Overview

A joint energy-based model represents inputs and labels with a shared unnormalized density. Classifier logits can define $p(x,y)\propto\exp f(x)[y]$, coupling ordinary softmax prediction to an energy-based input distribution.

## Key Ideas

- **Shared normalization preserves classification.** The global partition function cancels when computing $p(y\mid x)$; separately normalized class-conditional energies generally require their relative normalizers to recover this posterior.
- **Logit offsets carry density information.** Adding an input-dependent scalar to every logit leaves softmax unchanged but changes the input density through the log-sum-exp of logits.
- **Training can separate exact and approximate terms.** Cross-entropy trains the label conditional directly, while approximate sampling trains the input marginal. An ordinary discriminatively trained classifier does not thereby become a useful learned input-density model.
- **Sampling quality matters.** Persistent contrastive divergence saves computation but introduces finite-chain bias and can produce instability or replay-buffer artifacts.
- **Benefits require evaluation.** Generation, calibration, OOD detection, and robustness can share a model, but gains in one metric need not imply gains in another.

## Important Papers

- [[papers/your-classifier-is-secretly-an-energy-based-model-and-you-should-treat-it-like-one|Your Classifier is Secretly an Energy Based Model and You Should Treat It Like One]] introduces JEM and evaluates the benefits and costs of joint training.

## Related Concepts

- [[concepts/generative-classification|Generative Classification]]: joint densities induce conditional label predictions.
- [[concepts/probability-calibration|Probability Calibration]]: evaluates the reliability of those predictions.
