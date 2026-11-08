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
- **Velocity averaging can matter in heterogeneous data.** Under squared error, incompatible target velocities at nearby states are summarized by a conditional mean. [[papers/prismflow-residual-dynamics-for-flow-matching-in-time-series-generation|PrismFlow]] studies how a finite-capacity time-series estimator can turn this aggregation into spectral contraction, then adds hard-routed residual experts. This is an estimator-level diagnosis; it is not evidence that the exact flow-matching transport field is inherently mode-collapsed.
- **Geometric paths.** Straight-line interpolation can be replaced by paths on the data space. [[concepts/lie-group-flow-matching|Lie Group Flow Matching]] uses exponential curves on groups with surjective exponential maps, giving directly computable conditional training states. These curves need not be Riemannian geodesics; generation still requires integration.
- **Spherical latent paths.** [[concepts/spherical-latent-flow-matching|Spherical Latent Flow Matching]] projects each VAE token and its Gaussian source direction onto a fixed-radius sphere, then trains on slerp geodesics with tangent velocities. This removes radial prediction from the objective, but requires evidence that radius is dispensable for the chosen tokenizer and a decoder compatible with the projected latent.
- **Mean at initial time.** At the ideal minimizer for independent noise and data, $v^*(\epsilon,0)=\mathbb E[X]-\epsilon$. Averaging over zero-mean noise therefore recovers the target mean. A single learned-field evaluation is only an estimate.
- **Flow sensitivity.** With $J_t=\partial\phi_t/\partial\epsilon$, differentiation of the flow ODE gives $dJ_t/dt=J_v(\phi_t,t)J_t$ and $J_0=I$. Value Flows uses this relation to compute a first-order approximation to return variance. The sensitivity equation is distinct from the approximation that turns sensitivities into a distribution-wide variance estimate.
- **Bootstrapped targets.** In [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]], returns are not simply a fixed dataset of labels. Value Flows constructs temporal-difference targets and combines distributional consistency with bootstrapped conditional flow matching; ordinary flow matching alone does not impose Bellman consistency.
- **Source distributions and constraints.** Flow matching does not require a Gaussian source, and feasibility corrections can be inserted into numerical sampling. [[papers/flowplace-flow-matching-for-chip-placement|FlowPlace]] uses a uniform canvas prior for [[concepts/chip-placement|Chip Placement]] and repeatedly projects predicted endpoints onto non-overlapping layouts; this application-specific projection is separate from the flow-matching objective itself.
- **Trajectory-valued targets.** [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA]] treats a complete future latent sequence as one flow state, conditioning its vector field on the current observation and action sequence. This removes autoregressive rollout inside the dynamics model, but its experiments do not isolate joint trajectory prediction from stochastic interpolation training.
- **Stateful denoising for recurrent computation.** [[papers/thinking-with-looped-flows|Thinking with Looped Flows]] augments each denoising step with a recurrent hidden state. Ordered noise levels and a shared source-target pair align locally supervised steps, while inference advances both the probability-flow state and hidden recurrence. This uses flow matching as a training curriculum for iterative reasoning rather than only as a generative sampler.
- **Learned reasoning-code transport.** [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]] conditions a rectified flow on a question and transports Gaussian noise to a VAE code for an entire symbolic chain of thought. Its ablations favor training times concentrated near noise, multiple target solutions per question, and an answer reader exposed to generated endpoints; verified end-to-end rollouts further adapt generation and readout.
- **Condition-aware coupling.** Minibatch optimal transport can shorten source-target paths, but in conditional generation it can also make source noise depend on the condition during training. [[papers/the-curse-of-conditions-analyzing-and-improving-optimal-transport-for-conditional-flow-based-generation|The Curse of Conditions]] adds a condition-distance term to the assignment so inference can continue to use the full source prior for every condition.
- **Interacting conditional paths.** [[concepts/dynamic-quadratic-form-optimal-transport|Dynamic Quadratic-Form Optimal Transport]] lifts conditional paths to a two-particle space. Travelling-pair velocities can then be marginalized into a single-particle field, allowing pairwise structural interactions to influence a simulation-free regression target.

## Important Papers

- [[papers/lewam-end-to-end-world-and-action-modeling-with-jepas|LeWAM: End-to-End World and Action Modeling with JEPAs]] uses conditional flow matching to model multimodal action chunks while jointly training action-conditioned latent dynamics and the visual encoder.

- [[papers/denoising-with-a-joint-embedding-predictive-architecture|Denoising with a Joint-Embedding Predictive Architecture]] substitutes conditional flow matching for token-wise diffusion in extensions to image, speech, and video generation, reporting faster initial convergence but a later FID plateau in its ImageNet ablation.
- Lipman et al. (2023), "Flow matching for generative modeling": conditional flow-matching foundation, cited in Value Flows.
- Liu, Gong, and Liu (2023), "Flow straight and fast: Learning to generate and transfer data with rectified flow": related flow-based generative formulation, cited in Value Flows.
- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: applies rectified flow to unconditional time-series generation and reuses the trained model for forecasting and imputation through masked inference.
- [[papers/value-flows|Value Flows]]: return-distribution modeling, initial-field mean estimation, and flow-sensitivity-based weighting.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: supports a flow-matching prediction objective, although its reported objective comparisons do not establish a numerical advantage for flow matching.
- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]]: shows that equivariant graph models still require choices of node representatives and graph pairings, and studies their effect on few-step generation.
- [[papers/flowplace-flow-matching-for-chip-placement|FlowPlace: Flow Matching for Chip Placement]]: combines a graph-conditioned velocity field with a uniform geometric prior and progressive legalization, reporting 20-50 sampling steps and zero-overlap macro layouts on two benchmark suites.
- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]]: applies conditional flow matching to action-conditioned future latent trajectories and reports improved clean and perturbed planning over an autoregressive JEPA baseline, with higher iterative-inference cost.
- [[papers/the-curse-of-conditions-analyzing-and-improving-optimal-transport-for-conditional-flow-based-generation|The Curse of Conditions: Analyzing and Improving Optimal Transport for Conditional Flow-Based Generation]]: diagnoses the source-condition skew created by ordinary minibatch OT and introduces C^2OT for discrete and continuous conditions.
- [[papers/aligning-latent-geometry-for-spherical-flow-matching-in-image-generation|Aligning Latent Geometry for Spherical Flow Matching in Image Generation]]: constrains pretrained VAE tokens to a fixed-radius sphere and reports that slerp transport improves matched ImageNet-256 FID across three tokenizer families.
- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]]: combines categorical probability-flow integration with hidden-state recurrence, using temporally aligned local denoising losses for structured reasoning.
- [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]]: applies conditional flow matching to parallel latent reasoning codes and tests how latent-space design, time sampling, readout training, and rollout self-training affect arithmetic reasoning.
- [[papers/prismflow-residual-dynamics-for-flow-matching-in-time-series-generation|PrismFlow: Residual Dynamics for Flow Matching in Time-Series Generation]]: augments a global time-series transport field with winner-take-all Koopman-inspired residual experts to reduce velocity averaging and preserve spectral diversity.
- [[papers/dynamic-generalized-gromov-wasserstein-optimal-transport|Dynamic Generalized Gromov-Wasserstein Optimal Transport]] (Ying, Zeng, Zhou, and Zhang, 2026): develops travelling-pair flow matching for interacting paths and structure-preserving spatial-transcriptomics dynamics.
- [[papers/steering-the-flow-inverting-face-recognition-models-via-gradient-guided-flow-matching|Steering the Flow: Inverting Face Recognition Models via Gradient-Guided Flow Matching]]: uses an unconditional face flow as a reusable prior, then injects normalized target-model gradients through a progressive schedule for white-box model inversion.

## Related Concepts

- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: a use of conditional flows for discounted-return distributions.
- [[concepts/diffusion-models|Diffusion Models]]: related generative methods based on reversing noise corruption; the objectives and sampling formulations should be distinguished.
- [[concepts/latent-reasoning|Latent Reasoning]]: looped flows use stateful denoising to carry task computation through recurrent hidden features.
- [[concepts/graph-quotient-alignment|Graph Quotient Alignment]]: adapts coupling selection to data defined only up to node permutation.
- [[concepts/chip-placement|Chip Placement]]: a constrained geometric application in which the generated state must satisfy boundaries and non-overlap while supporting downstream physical-design objectives.
- [[concepts/dynamic-quadratic-form-optimal-transport|Dynamic Quadratic-Form Optimal Transport]]: extends conditional velocity regression to interacting particle pairs.
