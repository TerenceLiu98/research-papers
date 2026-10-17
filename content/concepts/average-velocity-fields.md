---
title: Average Velocity Fields
type: concept
aliases:
  - MeanFlow
  - MeanFlow Identity
tags:
  - generative-models
  - flow-matching
  - one-step-generation
---

## Overview

An average velocity field describes displacement per unit time over a finite interval of a flow trajectory. In generative modeling, learning this quantity allows a network to predict an entire transport step without numerically integrating an instantaneous velocity field at inference.

## Key Ideas

For an ODE $dz_t/dt=v(z_t,t)$ and $r<t$, define

$$
u(z_t,r,t)=\frac{1}{t-r}\int_r^t v(z_\tau,\tau)\,d\tau,
\qquad z_r=z_t-(t-r)u(z_t,r,t).
$$

This is a trajectory average, not an average of velocities evaluated at a fixed spatial point. It can differ from the instantaneous tangent even when sample-conditional interpolation paths are straight, because the marginal flow can curve.

Differentiation with $r$ held fixed gives the MeanFlow identity

$$
u=v-(t-r)(D_z u\,v+\partial_t u).
$$

The derivative term is a Jacobian-vector product over $(z,r,t)$ with tangent $(v,0,1)$. Under regularity at the diagonal, $u(z_t,t,t)=v(z_t,t)$, and the displacement vanishes at $r=t$. This boundary behavior removes the integration constant when recovering the integral definition from the identity.

The exact field also satisfies interval composition:

$$
(t-r)u(z_t,r,t)=(s-r)u(z_s,r,s)+(t-s)u(z_t,s,t)
$$

for $r<s<t$ along the same trajectory. Thus composition consistency follows from integration. A learned approximation need not satisfy it exactly.

MeanFlow trains with sample-conditional instantaneous velocities and a stopped target containing the model's JVP. At zero interval, the correction disappears and training reduces to flow matching. With noise at time one and data at zero, one-step sampling is $z_0=\epsilon-u_\theta(\epsilon,0,1)$. The exact identity motivates this objective but does not by itself guarantee practical optimization or distributional accuracy.

## Important Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: derives the identity, implements JVP-based training, and incorporates guidance into the learned average field.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: models instantaneous transport velocities.
- [[concepts/normalizing-flows|Normalizing Flows]]: continuous transformations between distributions.
- [[concepts/diffusion-models|Diffusion Models]]: related generative dynamics whose numerical sampling motivates few-step alternatives.
