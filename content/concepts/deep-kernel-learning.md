---
title: Deep Kernel Learning
type: concept
aliases:
  - Deep Kernel Gaussian Processes
definition: Deep kernel learning composes a covariance kernel with a trainable neural feature transformation and learns the representation together with the probabilistic model.
tags:
  - gaussian-processes
  - representation-learning
---

## Overview

Deep kernel learning combines neural representations with a kernel-based probabilistic model. A Gaussian process can operate on learned features instead of fixed descriptors, allowing the representation to adapt to observed outcomes.

## Key Ideas

- The composed kernel is $k_{\theta,\phi}(x,x')=k_\theta(g_\phi(x),g_\phi(x'))$, where the neural transformation changes the geometry seen by the kernel.
- Joint marginal-likelihood training balances fit and covariance complexity while propagating gradients into the representation.
- A pretrained encoder can be adapted through a projection, parameter-efficient updates, or both. Frozen embeddings alone do not learn outcome-specific geometry.
- In sequential optimization, representation quality affects both posterior predictions and which experiments are acquired next. Strong prediction fit alone need not identify the best optimization representation.
- Probabilistic outputs do not guarantee empirical calibration under misspecification. Exact GP scaling also remains a constraint despite flexible features.

## Important Papers

- Wilson et al. (2016), “Deep kernel learning”: foundational framework, cited in the GOLLuM paper.
- [[papers/large-language-models-as-uncertainty-calibrated-optimizers-for-experimental-discovery|Large language models as uncertainty-calibrated optimizers for experimental discovery]] adapts language representations through GP marginal likelihood for chemistry and materials optimization.

## Related Concepts

- [[concepts/gaussian-process-regression|Gaussian Process Regression]] supplies the covariance model and posterior predictions.
- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]] uses probabilistic predictions to guide data acquisition; learned kernels can serve as surrogates within such workflows.
