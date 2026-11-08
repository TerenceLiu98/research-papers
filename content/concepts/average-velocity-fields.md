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

Conditional mean flows additionally treat the context as fixed along each trajectory. Composing their finite-time maps gives a density through exact stepwise Jacobian determinants, while independently masking target coordinates during training can identify conditional marginal densities for observed coordinates. The learned finite-step maps are not numerical refinements of an ODE: using more maps need not monotonically improve an approximate model.

## Important Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: derives the identity, implements JVP-based training, and incorporates guidance into the learned average field.
- [[papers/bifm-bidirectional-flow-matching-for-few-step-image-editing-and-generation|BiFM: Bidirectional Flow Matching for Few-Step Image Editing and Generation]]: learns average velocities in both generation and inversion directions and regularizes the paired predictions for approximate reversal.
- [[papers/wfr-mfm-one-step-inference-for-dynamic-unbalanced-optimal-transport|WFR-MFM: One-Step Inference for Dynamic Unbalanced Optimal Transport]]: extends finite-interval velocity learning with a mean mass-growth field for one- or few-step unbalanced dynamics.
- [[papers/how-i-learned-to-stop-worrying-and-love-stopgrads|How I Learned to Stop Worrying and Love StopGrads]]: proves uniqueness of the true MeanFlow stationary point and gives an idealized functional semi-gradient convergence result.
- [[papers/functional-mean-flow-in-hilbert-space|Functional Mean Flow in Hilbert Space]]: extends finite-interval velocity learning to Hilbert-space function distributions and introduces an endpoint-prediction parameterization.
- [[papers/conditional-mean-flows-few-step-densities-for-simulation-based-inference|Conditional Mean Flows: Few-Step Densities for Simulation-Based Inference]]: adapts mean flows to conditional posterior and likelihood estimation with stepwise density evaluation and masked marginal likelihoods.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: models instantaneous transport velocities.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: permits changing mass alongside finite-interval transport.
- [[concepts/functional-mean-flow|Functional Mean Flow]]: adapts the construction to function-space transport.
- [[concepts/normalizing-flows|Normalizing Flows]]: continuous transformations between distributions.
- [[concepts/diffusion-models|Diffusion Models]]: related generative dynamics whose numerical sampling motivates few-step alternatives.
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: uses conditional mean flows as posterior and likelihood estimators.
