---
title: Anchor-Relative Rotation Fields
type: concept
aliases:
  - Local Axis-Angle Transition Representations
  - Anchor-Relative Rotational Coordinates
tags:
  - geometric-representations
  - stochastic-dynamics
  - micromagnetics
---

## Overview

Anchor-relative rotation fields represent the change between two spatial fields of unit vectors as a local rotation at every position. Instead of predicting an absolute future vector or an unconstrained Cartesian displacement, a model predicts how each anchor vector should rotate. Applying the rotations reconstructs a future field that remains on the unit sphere by construction.

## Key Ideas

- **Local coordinates depend on the anchor.** For unit vectors $m_s$ and $m_t$, the principal rotation axis follows $m_s\times m_t$, while its angle is computed from their cross-product norm and dot product. The rotation vector combines that axis and angle.
- **Geometry is enforced during decoding.** Rodrigues' formula maps any finite rotation vector to an element of $SO(3)$. Acting on a unit anchor therefore returns another unit vector without projecting an unconstrained prediction back to the sphere.
- **The representation is a transport space.** [[papers/flare-flow-matching-with-local-axis-angle-representations-for-stochastic-micromagnetic-evolution|FLARE]] learns a Euclidean [[concepts/flow-matching|Flow Matching]] path over entire rotation fields while conditioning on the anchor, controls, and physical horizon. This differs from defining the generative path intrinsically on the sphere, as in [[concepts/riemannian-flow-matching|Riemannian Flow Matching]].
- **Corner cases need explicit conventions.** Nearly identical vectors admit a continuous small-angle limit. Near-antipodal vectors do not determine a unique shortest rotation axis, so implementations require a stable deterministic tangent-axis rule.
- **Composition changes the coordinate frame.** In multi-segment prediction, each generated endpoint becomes the anchor for the next rotation field. Errors in one segment therefore alter both the next state and the coordinates in which its change is represented.

## Important Papers

- [[papers/flare-flow-matching-with-local-axis-angle-representations-for-stochastic-micromagnetic-evolution|FLARE: Flow Matching with Local Axis-Angle Representations for Stochastic Micromagnetic Evolution]]: uses local rotation fields for stochastic, horizon-conditioned magnetization endpoint prediction and compares them with Cartesian, fixed-tangent, and Riemannian transport controls.
- Lewis and Nigam (2003), "Geometric integration on spheres and some interesting applications": develops sphere-preserving geometric integration cited by FLARE.
- Grassia (1998), "Practical parameterization of rotations using the exponential map": describes rotation-vector parameterizations and their numerical treatment.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]
- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]
- [[concepts/normalizing-flows|Normalizing Flows]]
