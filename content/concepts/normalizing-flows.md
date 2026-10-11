---
title: Normalizing Flows
type: concept
aliases:
  - Normalizing Flow
tags:
  - density-estimation
  - variational-inference
  - generative-models
---

## Overview

Normalizing flows represent a probability distribution by transforming a simple random variable through a differentiable invertible map. They pair sampling with density evaluation through a change-of-variables formula. A Gaussian base distribution does not force the transformed distribution to be Gaussian.

## Key Ideas

- **Density transformation:** If $z\sim p_0$ and $x=h_\eta(z)$, then $p_\eta(x)=p_0(h_\eta^{-1}(x))|\det D h_\eta^{-1}(x)|$. The determinant accounts for the map's local expansion or contraction of volume.
- **Conditional flows:** A map $g_\phi(y,\epsilon)$ can condition a distribution on observed data $y$ while remaining invertible in $\epsilon$ for each fixed $y$. Shared parameters enable [[concepts/amortized-variational-inference|Amortized Variational Inference]].
- **Prior and posterior are separate choices:** A flow prior learns population heterogeneity. A conditional posterior flow approximates uncertainty given an observation. Making one flexible does not automatically make the other accurate.
- **Tractable density is not exact inference:** Evaluating the flow density can be tractable while the model's marginal likelihood remains intractable. Variational inference still depends on the approximation family and optimization quality.
- **Capacity and identification:** Richer transformations can capture more complex shapes but introduce tuning and computational costs. Within latent measurement models, distributional flexibility does not itself identify the location, scale, or orientation of latent coordinates.

## Important Papers

- [[papers/multidimensional-item-response-theory-under-general-latent-distributions|Multidimensional Item Response Theory under General Latent Distributions]]: jointly learns a flow prior and conditional posterior for multidimensional binary item responses, reporting recovery gains in most tested non-Gaussian settings and some losses under Gaussian data.
- Rezende and Mohamed (2015), "Variational inference with normalizing flows": methodological foundation cited by the MIRT paper.
- Durkan et al. (2019), "Neural spline flows": architecture cited for its prior-density implementation.

## Related Concepts

- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: shares a learned observation-to-posterior mapping across cases.
- [[concepts/item-response-theory|Item Response Theory]]: a measurement setting in which flows can relax latent distribution assumptions while retaining a logistic response model.
- [[concepts/random-effects-distribution-misspecification|Random Effects Distribution Misspecification]]: motivates assessing distributional assumptions separately for each inferential target.
