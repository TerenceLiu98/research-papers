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
- **Geometric paths.** Straight-line interpolation can be replaced by paths on the data space. [[concepts/lie-group-flow-matching|Lie Group Flow Matching]] uses exponential curves on groups with surjective exponential maps, giving directly computable conditional training states. These curves need not be Riemannian geodesics; generation still requires integration.
- **Mean at initial time.** At the ideal minimizer for independent noise and data, $v^*(\epsilon,0)=\mathbb E[X]-\epsilon$. Averaging over zero-mean noise therefore recovers the target mean. A single learned-field evaluation is only an estimate.
- **Flow sensitivity.** With $J_t=\partial\phi_t/\partial\epsilon$, differentiation of the flow ODE gives $dJ_t/dt=J_v(\phi_t,t)J_t$ and $J_0=I$. Value Flows uses this relation to compute a first-order approximation to return variance. The sensitivity equation is distinct from the approximation that turns sensitivities into a distribution-wide variance estimate.
- **Bootstrapped targets.** In [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]], returns are not simply a fixed dataset of labels. Value Flows constructs temporal-difference targets and combines distributional consistency with bootstrapped conditional flow matching; ordinary flow matching alone does not impose Bellman consistency.
- **Source distributions and constraints.** Flow matching does not require a Gaussian source, and feasibility corrections can be inserted into numerical sampling. [[papers/flowplace-flow-matching-for-chip-placement|FlowPlace]] uses a uniform canvas prior for [[concepts/chip-placement|Chip Placement]] and repeatedly projects predicted endpoints onto non-overlapping layouts; this application-specific projection is separate from the flow-matching objective itself.
- **Trajectory-valued targets.** [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA]] treats a complete future latent sequence as one flow state, conditioning its vector field on the current observation and action sequence. This removes autoregressive rollout inside the dynamics model, but its experiments do not isolate joint trajectory prediction from stochastic interpolation training.
- **Condition-aware coupling.** Minibatch optimal transport can shorten source-target paths, but in conditional generation it can also make source noise depend on the condition during training. [[papers/the-curse-of-conditions-analyzing-and-improving-optimal-transport-for-conditional-flow-based-generation|The Curse of Conditions]] adds a condition-distance term to the assignment so inference can continue to use the full source prior for every condition.

## Important Papers

- Lipman et al. (2023), "Flow matching for generative modeling": conditional flow-matching foundation, cited in Value Flows.
- Liu, Gong, and Liu (2023), "Flow straight and fast: Learning to generate and transfer data with rectified flow": related flow-based generative formulation, cited in Value Flows.
- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: applies rectified flow to unconditional time-series generation and reuses the trained model for forecasting and imputation through masked inference.
- [[papers/value-flows|Value Flows]]: return-distribution modeling, initial-field mean estimation, and flow-sensitivity-based weighting.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: supports a flow-matching prediction objective, although its reported objective comparisons do not establish a numerical advantage for flow matching.
- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]]: shows that equivariant graph models still require choices of node representatives and graph pairings, and studies their effect on few-step generation.
- [[papers/flowplace-flow-matching-for-chip-placement|FlowPlace: Flow Matching for Chip Placement]]: combines a graph-conditioned velocity field with a uniform geometric prior and progressive legalization, reporting 20-50 sampling steps and zero-overlap macro layouts on two benchmark suites.
- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]]: applies conditional flow matching to action-conditioned future latent trajectories and reports improved clean and perturbed planning over an autoregressive JEPA baseline, with higher iterative-inference cost.
- [[papers/the-curse-of-conditions-analyzing-and-improving-optimal-transport-for-conditional-flow-based-generation|The Curse of Conditions: Analyzing and Improving Optimal Transport for Conditional Flow-Based Generation]]: diagnoses the source-condition skew created by ordinary minibatch OT and introduces C^2OT for discrete and continuous conditions.

## Related Concepts

- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: a use of conditional flows for discounted-return distributions.
- [[concepts/diffusion-models|Diffusion Models]]: related generative methods based on reversing noise corruption; the objectives and sampling formulations should be distinguished.
- [[concepts/graph-quotient-alignment|Graph Quotient Alignment]]: adapts coupling selection to data defined only up to node permutation.
- [[concepts/chip-placement|Chip Placement]]: a constrained geometric application in which the generated state must satisfy boundaries and non-overlap while supporting downstream physical-design objectives.
