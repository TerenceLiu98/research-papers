---
title: Attribution Patching
type: concept
tags:
  - mechanistic-interpretability
  - activation-patching
  - linear-response
---

## Overview

Attribution patching approximates the effect of replacing or perturbing an internal activation by taking the inner product of the activation displacement with the gradient of a chosen output observable. It predicts many candidate intervention effects from local derivatives, reducing the need for separate forward passes for every direction.

## Key Ideas

For activation $r$, displacement $\Delta r$, and scalar observable $y$, the local approximation is

$$
y(r+\Delta r)-y(r)\approx\nabla_r y^\top\Delta r.
$$

- The gradient must correspond to the baseline trajectory, intervention site, and observable being evaluated. A high score is specific to those choices.
- Direct activation patching measures the effect of an intervention; attribution patching estimates it by a first-order expansion. Finite displacements can leave the local linear regime.
- With a fixed Euclidean perturbation budget, the gradient direction maximizes the first-order increase, and the gradient norm measures the site's maximal local sensitivity under that budget.
- Absolute prediction errors, amplitude sweeps, and superposition tests help calibrate the approximation. Relative errors can be misleading when the measured response is near zero.
- [[concepts/transformer-green-operators|Transformer Green Operators]] describe forward propagation of a perturbation, while the observable gradient summarizes how that propagation affects a particular readout.

## Important Papers

- Nanda (2023), "Attribution Patching: Activation Patching at Industrial Scale": the gradient-displacement approximation discussed in Transformer Field Theory.
- Syed, Rager, and Conmy (2024), "Attribution Patching Outperforms Automated Circuit Discovery": attribution-based localization, cited by Transformer Field Theory.
- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] interprets the gradient as an adjoint sensitivity field and tests a bounded response regime in GPT-2-style models.

## Related Concepts

- [[concepts/transformer-green-operators|Transformer Green Operators]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
