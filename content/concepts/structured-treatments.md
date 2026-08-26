---
title: Structured Treatments
type: concept
aliases:
  - Structured Treatment Effects
tags:
  - causal-inference
  - structured-data
  - treatment-effect-heterogeneity
  - causal-representation-learning
---

## Overview

Structured treatments are causal treatments whose values are rich objects rather than binary or scalar variables. Examples include images, graphs, and other spatially or relationally organized observations. Causal estimation therefore requires a representation of the treatment and a definition of how changes between two treatment objects translate into outcome differences.

## Key Ideas

- A treatment representation $\phi(S)$ maps a high-dimensional structured object into a lower-dimensional feature space while retaining information relevant to the outcome.
- Under a product-effect model, the treatment contribution can be expressed as an inner product between treatment features $\phi(S)$ and covariate-dependent effect features $\psi(X)$.
- A generalized Robinson decomposition residualizes both the outcome and treatment representation against observed covariates, reducing bias from treatment-confounder associations.
- For two structured treatments, a conditional effect can be written as $\psi(x)^\top [\phi(\bar{s}) - \phi(s)]$, making the estimand depend on the chosen representation and the covariate context.
- Identification still depends on causal assumptions such as conditional unconfoundedness and positivity. Learned representations do not remove bias from omitted confounders, and sensitivity analyses are needed when those assumptions are doubtful.
- The treatment encoder can be modular: convolutional networks, pretrained remote-sensing encoders, or other models can be used according to the structure of the treatment data.

## Important Papers

- [[Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]
- Kaddour et al. (2021), "Causal effect inference for structured treatments."
- Harada and Kashima (2021), "GraphITE: Estimating individual effects of graph-structured treatments."
- Thorat, Kolla, and Pedanekar (2024), "I see, therefore I do: Estimating causal effects for image treatments."

## Related Concepts

- [[Spatial Causal Inference]]
- [[Unstructured Outcome Causal Inference]]
- [[Double Machine Learning]]
- Treatment-effect heterogeneity
- Causal representation learning
