---
title: Population-Aware Physics-Informed Neural Particle Flow for Robust Spacecraft Bayesian Navigation
type: paper
authors:
  - Batu Candan
  - Simone Servadio
tags:
  - bayesian-inference
  - particle-flow
  - spacecraft-navigation
  - physics-informed-learning
  - set-modeling
---

## TL;DR

Candan and Servadio augment physics-informed neural particle flow (PINPF) with a permutation-invariant summary of the evolving particle population. On 100 randomized TDOA localization tasks, the feature-population variant reduces mean energy distance from 0.0533 to 0.0076 relative to particle-wise PINPF. On 100 range-and-field-of-view tasks, it gives the best median energy and sliced Wasserstein distances among the tested transport methods and reduces the fraction of particles outside the field of view from 58.85% to 11.25%, although it does not enforce feasibility exactly.

## Research Question

Can a learned Bayesian particle flow improve nonlinear, multimodal, and constrained spacecraft-navigation posteriors by conditioning each particle's velocity on the complete empirical particle population rather than only on local particle features?

## Motivation

PINPF transports prior particles through pseudo-time by learning a velocity field constrained by the log-homotopy continuity equation. Its standard particle-wise network sees a particle's state, measurement, likelihood, and score information but not the population's spread, mode coverage, skewness, or imbalance. Two populations can therefore assign similar local features to one particle while requiring different global transport behavior. This matters when a posterior is curved or multimodal and when probability mass must be allocated across modes or kept near constrained support.

## Contributions

- Introduces [[concepts/population-aware-neural-particle-flow|Population-Aware Neural Particle Flow]], which supplies every particle velocity with a shared Deep Sets context computed by mean pooling over the population.
- Develops PA-PINPF-State, which summarizes particle positions, and PA-PINPF-Feature, which summarizes complete local PINPF features including likelihood and density-score information.
- Retains the unsupervised PINPF residual derived from the probability-evolution equation, requiring neither posterior samples nor labeled transport trajectories for training.
- Evaluates both variants on randomized time-difference-of-arrival (TDOA) localization and range sensing under a field-of-view constraint.

## Method

The method follows a Bayesian homotopy $p_\lambda(x) \propto p_0(x)l(x)^\lambda$ from prior to posterior and transports particles through $dx_\lambda/d\lambda=v_\lambda(x_\lambda)$. Baseline PINPF predicts each velocity from a local vector containing the state, pseudo-time, measurement, log likelihood, intermediate-density score, and likelihood score. Training minimizes the squared residual between the homotopy-induced log-density change and the compression-plus-advection change induced by the learned velocity.

The population-aware variants embed either each state $x_j$ or each full local feature vector $c_j$ with a shared MLP, average the embeddings, and transform the result into one context vector. Concatenating this context with every local feature preserves invariance to particle ordering while allowing velocities to depend on the empirical population. The feature variant exposes the encoder to population-level Bayesian geometry; the state variant exposes only the particle cloud in state space.

For the hard field-of-view support constraint, the paper replaces the discontinuous indicator with a finite-slope hyperbolic-tangent relaxation. This makes the homotopy density positive and differentiable, but changes exact support enforcement into a soft approximation.

## Experiments

Both task families use 100 independently randomized evaluation tasks, with task parameters sampled separately for training and evaluation. Distributional accuracy is measured with energy distance (ED), sliced Wasserstein distance (SWD), posterior mean error, and covariance error.

In planar TDOA localization, PA-PINPF-Feature improves mean ED from $0.0533 \pm 0.1431$ for PINPF to $0.0076 \pm 0.0258$, mean SWD from $0.2732$ to $0.1467$, mean error from $0.3020$ to $0.0993$, and covariance error from $0.5065$ to $0.2856$. PA-PINPF-State also improves all four reported metrics, but by less. Both population-aware variants take about 1.67 seconds per task versus 1.52 seconds for PINPF.

In range sensing with a field-of-view constraint, PA-PINPF-Feature obtains median ED 0.351, median SWD 0.998, 11.25% particles outside the field of view, and a 17.7-degree violation angle. The corresponding PINPF values are 1.669, 2.183, 58.85%, and 32.8 degrees. The state-only variant is inconsistent: it reduces the infeasible fraction to 39.29% but has worse median ED than PINPF (1.992 versus 1.669) and a larger violation angle (47.7 versus 32.8 degrees). SVGD has a slightly worse median ED of 0.398 and 15.92% infeasible particles, but a lower mean ED than PA-PINPF-Feature (1.350 versus 2.006), indicating sensitivity to difficult tasks or outliers.

## Limitations

- The field-of-view relaxation does not guarantee constrained support: even the best learned method leaves 11.25% of particles outside the field of view.
- Population awareness alone is insufficient; the state-only context can worsen distributional and angular metrics on the constrained task.
- Evaluation is limited to two planar, single-update task families with 100 tasks each. Sequential filtering, time-varying geometry, and higher-dimensional navigation are not tested.
- Reference posterior samples are used for evaluation even though they are not required by the training objective.
- The reported aggregate results do not isolate the effect of context dimension, pooling choice, particle count, or constraint-relaxation sharpness.

## Related Concepts

- [[concepts/population-aware-neural-particle-flow|Population-Aware Neural Particle Flow]]: the paper's set-conditioned extension of particle-wise PINPF.
- [[concepts/flow-matching|Flow Matching]]: another continuity-equation-based learned transport framework, but with a different training objective and source-target construction.
- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]: a canonical representation of multimodal distributions that illustrates the need to allocate particle mass across modes.
- [[concepts/normalizing-flows|Normalizing Flows]]: invertible learned distribution transport with explicit change-of-variables density evaluation, unlike the residual-trained particle flow studied here.

## Related Papers

- Csuzdi, Becsi, and Toro (2026), "Physics-informed neural particle flow for the Bayesian update step": supplies the particle-wise PINPF baseline and its physics-informed residual.
- Zaheer et al. (2017), "Deep Sets": supplies the permutation-invariant encode-pool-transform construction.
- Chen, Dai, and Song (2019), "Particle Flow Bayes' Rule": develops a related learned particle-flow treatment of Bayesian updating.
- Craft and DeMars (2024), "Nonlinear Particle Flow for Constrained Bayesian Inference": motivates the smooth approximation used for the field-of-view support constraint.

[[index|Library home]]
