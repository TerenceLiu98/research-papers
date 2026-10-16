---
title: Transformer Green Operators
type: concept
aliases:
  - Sliced Green Operators
tags:
  - mechanistic-interpretability
  - transformer-dynamics
  - linear-response
---

## Overview

A Transformer Green operator describes how an infinitesimal residual-stream intervention propagates from a source site to downstream activations along a fixed model trajectory. In a finite Transformer, its site-to-site blocks are Jacobians. Transformer Field Theory uses this response description to connect activation patching, continuous-depth dynamics, and constrained intervention design.

## Key Ideas

For source site $(\ell',x')$ and downstream target $(\ell,x)$, a component-level slice is

$$
G_{(\ell,x)\leftarrow(\ell',x')}=
\frac{\partial R_\ell(x)}{\partial R_{\ell'}(x')}.
$$

- A slice is a $d_{\mathrm{model}}\times d_{\mathrm{model}}$ linear map. Applied to a sufficiently small source displacement, it predicts the target displacement. It depends on model, prompt, and baseline trajectory.
- A finite patched-minus-clean residual difference probes a direction through the operator. Its norm alone does not recover the full Jacobian, component signs, or mixing geometry.
- In linearized dynamics, full-state propagators compose through intermediate depths. Reinjection of a measured intermediate response is a related empirical check, but should be distinguished from independently estimating and multiplying complete operators.
- [[concepts/attribution-patching|Attribution Patching]] contracts propagation with an output readout. Consequently, sensitivity for one observable can concentrate at a few sites even when component-level response energy is broadly distributed.
- An inverse intervention problem asks for a constrained source $J$ satisfying approximately $GJ=\Delta R_{\mathrm{target}}$. Specifying support, direction, cost, and local validity is necessary before this becomes an operational patch-selection procedure.
- Cross-model response matching additionally requires correspondence information. The shared latent response geometry proposed in Transformer Field Theory is a hypothesis requiring anchors and direct validation.

## Important Papers

- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] defines residual-field response operators and measures directional propagation and component-level slices in GPT-2-style models. It finds structured propagation but also distributed entrywise energy that limits simple magnitude-based compression.

## Related Concepts

- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/model-steerability|Model Steerability]]
