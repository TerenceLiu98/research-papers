---
title: Continuous Time Series Generation
type: concept
aliases:
  - Continuous TSG
tags:
  - time-series-generation
  - continuous-time-modeling
  - irregular-time-series
---

## Overview

Continuous time series generation learns a distribution over trajectories that can be sampled at flexible temporal resolutions. Input observations may be sparse or irregular, while outputs can include intermediate timestamps within the modeled interval. Generating a new trajectory and choosing its observation grid are distinct parts of the task.

## Key Ideas

- Irregular-to-regular generation produces new samples on a fixed grid. Irregular-to-continuous generation additionally supplies a mechanism for evaluating those samples at arbitrary times; a longer output sequence need not cover a longer time horizon.
- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]] can supply a continuous decoder driven by an interpolated path. Diff-MN first generates regular-grid values and sample-specific dynamics weights, then uses their combination to evaluate intermediate points.
- Joint data-and-parameter generation can maintain a statistical relationship between a generated sequence and its decoding dynamics. Diff-MN uses [[concepts/diffusion-models|Diffusion Models]] to learn that joint distribution rather than assuming training-sample mixture weights fit new sequences.
- Evaluation must assess the added points, not only the original grid. Diff-MN tests whether refined histories improve final-step forecasting and whether coefficients recovered from synthetic polynomial curves preserve their generating distributions.
- These are partial tests of fidelity: better forecasting does not determine the entire trajectory distribution, and agreement on a polynomial family need not generalize to other dynamics.
- Artificially removing known observations permits direct checks but differs from naturally irregular sampling, where intermediate ground truth may never have been observed. Interpolation quality and missingness mechanisms therefore constrain interpretation.

## Important Papers

- [[papers/diff-mn-diffusion-parameterized-moe-ncde-for-continuous-time-series-generation-with-irregular-observations|Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations]]: studies irregular-to-continuous generation with diffusion-generated mixture weights and evaluates temporal refinement.
- Naiman et al. (2024), "Generative modeling of regular and irregular time series data via Koopman VAEs": irregular-generation baseline evaluated with standard NCDE refinement in Diff-MN.
- Jeon et al. (2022), "GT-GAN: General purpose time series synthesis with generative adversarial networks": related generator evaluated under the same refinement comparison.

## Related Concepts

- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]]
- [[concepts/diffusion-models|Diffusion Models]]
