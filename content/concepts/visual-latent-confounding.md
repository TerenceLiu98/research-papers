---
title: Visual Latent Confounding
type: concept
aliases:
  - Image-Based Latent Confounding
  - Visual Confounding
tags:
  - causal-machine-learning
  - latent-confounding
  - computer-vision
  - proxy-variables
  - representation-learning
---

## Overview

Visual latent confounding occurs when an unannotated factor affects both a visual concept and an outcome while also leaving a signature in the observed image. The image can then act as a high-dimensional proxy for the omitted common cause, but using it for causal adjustment requires stronger reasoning than treating image features as ordinary observed covariates.

## Key Ideas

- Examples include demographics, scanner hardware, acquisition protocols, anatomy, and labeling processes that affect both concept visibility and an outcome or model prediction.
- Ignoring the latent factor leaves an open backdoor path and biases observational estimates of [[concepts/causal-concept-effects|Causal Concept Effects]].
- Directly conditioning on high-dimensional image features may weaken overlap and destabilize estimation. A learned lower-dimensional adjustment representation can be preferable when it captures the relevant common causes.
- Proxy information is useful only when the confounder manifests in the image. Nonvisual common causes cannot be recovered from pixels by an image-only method.
- Latent adjustment requires identification assumptions. [[papers/identifiable-estimation-of-causal-concept-effects-under-visual-latent-confounding|UnCoVAEr]] uses observed concepts and outcomes as auxiliary variables to identify adjustment coordinates up to component-wise invertible transformations under a structured latent model.
- Visual predictive association does not itself establish that a representation is an adequate adjustment set; overlap, causal structure, model specification, and the proxy relationship remain substantive assumptions.

## Important Papers

- [[papers/identifiable-estimation-of-causal-concept-effects-under-visual-latent-confounding|Identifiable Estimation of Causal Concept Effects under Visual Latent Confounding]]: formalizes the setting and proposes identifiable latent adjustment from a single rich image proxy.
- Jerzak, Johansson, and Daoud (2023), "Estimating Causal Effects under Image Confounding Bias with an Application to Poverty in Africa": treats images as observed high-dimensional adjustment covariates.
- Louizos et al. (2017), "Causal Effect Inference with Deep Latent-Variable Models": learns latent confounders from proxies without the visual factorization used by UnCoVAEr.
- Tchetgen Tchetgen et al. (2020), "An Introduction to Proximal Causal Learning": develops identification using treatment- and outcome-inducing proxies under completeness conditions.

## Related Concepts

- [[concepts/causal-concept-effects|Causal Concept Effects]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/causal-overlap|Causal Overlap]]
- Proxy variables
- Latent confounding
- Backdoor adjustment
