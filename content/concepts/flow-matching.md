---
title: Flow Matching
type: concept
aliases:
  - Conditional Flow Matching
tags:
  - generative-models
  - vector-fields
  - ordinary-differential-equations
---

## Overview

Flow matching learns a time-dependent vector field that transports a simple noise distribution into a target distribution through an ordinary differential equation. Conditioning that field on a state, action, or other context makes it a conditional generative model. Its application can be a policy, a return critic, or a future-observation predictor; these uses have different learning targets.

## Key Ideas

For the linear-interpolation conditional objective presented in Appendix A.3 of [[papers/value-flows|Value Flows]], sample independent $x\sim p_{\mathrm{data}}$ and $\epsilon\sim\mathcal N(0,I)$, then set $x_t=(1-t)\epsilon+tx$. Training minimizes

$$
\mathbb E_{t,x,\epsilon}\left[\|v_\theta(x_t,t)-(x-\epsilon)\|^2\right].
$$

Sampling solves $d\phi_t/dt=v_\theta(\phi_t,t)$ with $\phi_0=\epsilon$. The associated density and vector field satisfy a continuity equation. Numerical solvers approximate the continuous flow; a low step count can change downstream performance.

- **Conditional regression.** Training uses sampled interpolation targets rather than directly regressing an intractable marginal vector field. The learned field aggregates the conditional displacements.
- **Mean at initial time.** At the ideal minimizer for independent noise and data, $v^*(\epsilon,0)=\mathbb E[X]-\epsilon$. Averaging over zero-mean noise therefore recovers the target mean. A single learned-field evaluation is only an estimate.
- **Flow sensitivity.** With $J_t=\partial\phi_t/\partial\epsilon$, differentiation of the flow ODE gives $dJ_t/dt=J_v(\phi_t,t)J_t$ and $J_0=I$. Value Flows uses this relation to compute a first-order approximation to return variance. The sensitivity equation is distinct from the approximation that turns sensitivities into a distribution-wide variance estimate.
- **Bootstrapped targets.** In [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]], returns are not simply a fixed dataset of labels. Value Flows constructs temporal-difference targets and combines distributional consistency with bootstrapped conditional flow matching; ordinary flow matching alone does not impose Bellman consistency.

## Important Papers

- Lipman et al. (2023), "Flow matching for generative modeling": conditional flow-matching foundation, cited in Value Flows.
- Liu, Gong, and Liu (2023), "Flow straight and fast: Learning to generate and transfer data with rectified flow": related flow-based generative formulation, cited in Value Flows.
- [[papers/value-flows|Value Flows]]: return-distribution modeling, initial-field mean estimation, and flow-sensitivity-based weighting.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: supports a flow-matching prediction objective, although its reported objective comparisons do not establish a numerical advantage for flow matching.

## Related Concepts

- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: a use of conditional flows for discounted-return distributions.
- [[concepts/diffusion-models|Diffusion Models]]: related generative methods based on reversing noise corruption; the objectives and sampling formulations should be distinguished.
