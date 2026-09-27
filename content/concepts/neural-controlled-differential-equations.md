---
title: Neural Controlled Differential Equations
type: concept
aliases:
  - NCDE
  - Neural CDE
tags:
  - continuous-time-modeling
  - irregular-time-series
  - neural-differential-equations
---

## Overview

Neural controlled differential equations represent a sequence through continuous latent dynamics driven by an observation-derived control path. Interpolation converts irregularly timed observations into a path $X(t)$, and a learned vector field determines how its increments change the latent state. A decoder can then produce outputs at requested timestamps.

## Key Ideas

- The defining form is $z(t)=z(0)+\int_0^t f_\theta(z(u))\,dX(u)$. This differs from an autonomous neural ODE driven only by elapsed time: the control path carries the observed sequence into the evolution.
- Initialization, vector-field dynamics, and readout are distinct trainable components. Diff-MN pretrains and freezes a channel-wise encoder/decoder so subsequent optimization concentrates on dynamics and routing.
- A dense mixture $f_s(z)=\sum_i s_i f_{\theta_i}(z)$ allows shared dynamics experts to be combined differently for each sequence. In Diff-MN, a diffusion model later generates these mixture coefficients jointly with new sequences.
- Arbitrary-time evaluation makes the representation useful for imputation and [[concepts/continuous-time-series-generation|Continuous Time Series Generation]], but does not ensure that unobserved values are correct. Results depend on the interpolation path, learned dynamics, and numerical solution.
- Nonlinear dynamics can transform a smooth control into rapidly varying trajectories. Rapid variation alone does not establish mathematical nonsmoothness; regularity depends on the control and vector field.
- Reconstruction of observed samples and generation of new samples are separate tasks. Reusing a trained continuous decoder on synthetic sequences requires checking that its dynamics transfer to those sequences.

## Important Papers

- Kidger, Morrill, Foster, and Lyons (2020), "Neural controlled differential equations for irregular time series": foundational reference cited by Diff-MN.
- [[papers/diff-mn-diffusion-parameterized-moe-ncde-for-continuous-time-series-generation-with-irregular-observations|Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations]]: combines decoupled training, mixture dynamics, and joint sequence/weight diffusion for generation.

## Related Concepts

- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]
- [[concepts/diffusion-models|Diffusion Models]]
