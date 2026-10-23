---
title: Functional Registration
type: concept
aliases:
  - Curve Registration
  - Functional Data Registration
tags:
  - functional-data-analysis
  - curve-alignment
  - phase-variation
  - time-warping
---

## Overview

Functional registration aligns curves by transforming their domains so that corresponding features occur at comparable locations. It separates phase variation, such as differences in event timing or progression rate, from amplitude variation in the observed values. Registration can improve averaging, comparison, and prediction, but an unsuitable alignment objective can also remove scientifically meaningful differences.

## Key Ideas

- A warping function is typically monotone and boundary preserving, so temporal order is maintained while local regions of the domain may expand or contract.
- Landmark methods align selected features, while metric-based methods optimize a distance between entire curves and model-based methods place distributions or structural assumptions on the amplitude and phase components.
- Elastic functional data analysis often represents curves with square-root velocity functions. Under this representation, reparameterized curves can be compared while accounting for the geometry of time warping.
- Registration and downstream learning need not be separate. Label-aware or task-aware registration can preserve variation useful for [[Functional Data Classification|classification]], although it also changes the estimand from label-independent alignment to alignment optimized for prediction.
- Evaluation is easiest in simulations with known warpings. On real data, within-class dispersion, total variation, landmark agreement, and downstream performance are proxies and should not be treated as proof that the true warping was recovered.
- Registration differs from [[Dynamic Time Warping]], which aligns discrete sequences through a minimum-cost path. Functional methods typically impose smooth transformations and explicitly model curves as continuous objects.

## Important Papers

- [[DeepFRC: An End-to-End Deep Learning Model for Functional Registration and Classification]]
- Ramsay and Li (1998), "Curve Registration."
- Srivastava et al. (2011), "Registration of Functional Data Using Fisher-Rao Metric."
- Marron et al. (2015), "Functional Data Analysis of Amplitude and Phase Variation."
- Chen and Srivastava (2021), "SrvfRegNet: Elastic Function Registration Using Deep Neural Networks."
- Tang et al. (2022), "Model-Based Joint Curve Registration and Classification."

## Related Concepts

- [[Functional Data Classification]]
- [[Functional Principal Component Analysis]]
- [[Functional Neural Networks]]
- [[Dynamic Time Warping]]
- Basis expansion
- Elastic shape analysis
