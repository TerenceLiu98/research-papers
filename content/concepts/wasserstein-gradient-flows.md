---
title: Wasserstein Gradient Flows
type: concept
aliases:
  - Wasserstein Gradient Flow
  - WGF
tags:
  - optimal-transport
  - probability
  - generative-models
---

## Overview

A Wasserstein gradient flow evolves a probability distribution along the steepest descent direction of an energy functional in Wasserstein geometry. It describes dynamics of distributions; using those dynamics to train a neural generator requires an additional approximation procedure.

## Key Ideas

For a sufficiently regular energy $\mathcal F$, the flow has the continuity-equation representation

$$
\partial_tq_t+\nabla\cdot(q_tV_t)=0,
\qquad V_t(x)=-\nabla\frac{\delta\mathcal F}{\delta q}(q_t)(x).
$$

- **Energy determines the field.** A KL energy yields a difference of target and current score functions. Squared [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] yields kernel-gradient interactions. Quadratic-cost [[concepts/sinkhorn-divergence|Sinkhorn Divergence]] yields a difference of transport barycenters.
- **Discretization matters.** Explicit Euler updates move particles by $x\leftarrow x+\eta V(x)$. The Jordan-Kinderlehrer-Otto scheme instead uses an implicit variational step. Their computational and approximation requirements differ.
- **Training time differs from sampling time.** W-Flow regresses a fixed-size generator onto stopped particle-update targets during training. Its inference map uses one generator evaluation even though the prescribed distributional training evolution has many steps.
- **Consistency differs from global convergence.** Approximating a population flow on a finite interval does not establish that the flow reaches a global energy minimum, or that a neural network realizes the ideal updates. W-Flow's theorem separates empirical initial error, empirical target error, and time-discretization error; its Sinkhorn assumption verification uses bounded supports.
- **Representation changes the implementation.** Computing updates in pretrained feature spaces can improve practical generation, but introduces a gap between direct particle dynamics in the theorem and optimization of the neural generator.

## Important Papers

- Jordan, Kinderlehrer, and Otto (1998), "The Variational Formulation of the Fokker-Planck Equation": the variational discretization cited in W-Flow.
- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: Sinkhorn-driven training of static generators and finite-time particle consistency.
- Hardion and Lacombe (2026), "The Wasserstein Gradient Flow of the Sinkhorn Divergence between Gaussian Distributions": a Gaussian-case convergence result cited by W-Flow.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: supplies the geometry on probability measures.
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]: one possible energy functional.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: another distributional energy.
- [[concepts/flow-matching|Flow Matching]]: learns transport vector fields from conditional interpolation targets; a continuity equation alone does not make a flow a Wasserstein gradient flow.
