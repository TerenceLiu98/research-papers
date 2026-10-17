---
title: Prototype-Guided Flow Matching
type: concept
tags:
  - flow-matching
  - time-series-forecasting
  - conditional-generation
---

## Overview

Prototype-guided flow matching conditions the starting distribution of a generative flow on a structured prediction of the target. In Aurora, text and image representations select a weighted combination of temporal trend and period prototypes. Adding Gaussian noise to that combination provides an initial distribution for future-patch generation.

## Key Ideas

**Condition the source as well as the velocity field.** Ordinary Gaussian initialization leaves the entire forecast structure to the learned dynamics. Aurora constructs $y_0=\tilde P(c)+\epsilon$, where $c$ denotes the context and $\epsilon\sim\mathcal N(0,I)$. The source is thus a context-dependent shifted Gaussian; the prototype alone is not the sampled initial state.

**Retrieve combinations, not a single stored forecast.** A transformer predicts softmax weights over a learnable bank initialized with periodic and trend bases. For each future position, the weighted sum yields a different prototype. The bank supplies trainable inductive structure rather than a collection of retrieved training examples.

**Retain the flow-matching objective.** For target $y_1$, use $y_t=(1-t)y_0+ty_1$ and regress the velocity toward $y_1-y_0$. Sampling numerically integrates the conditioned velocity field from $y_0$. A structured starting point changes the transport problem but does not eliminate integration or stochastic sampling.

**Distinguish motivation from demonstrated effects.** A prototype resembling the future may make transport easier to learn. Aurora's Table 5 shows higher MSE in all nine domain averages when prototype initialization is removed, but Agriculture MAE improves under that ablation. This supports an empirical forecasting benefit under the tested setup, not a general theorem about convergence or a demonstrated reduction in required solver steps.

**Representation is not new evidence.** Aurora's image modality is rendered from historical observations, while text supplies domain context. Their contributions to prototype selection should be distinguished when assessing information access and transfer to unseen domains.

## Important Papers

- [[papers/aurora-towards-universal-generative-multimodal-time-series-forecasting|Aurora: Towards Universal Generative Multimodal Time Series Forecasting]]: introduces multimodal prototype retrieval for future patches and tests Gaussian-source and prototype-bank variants (Section 3.2.2; Tables 5 and 17).

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the underlying velocity-regression and ODE-sampling framework.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: Aurora's cross-domain pretraining and forecasting setting.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: assessing gains while accounting for available modalities and target-data access.
