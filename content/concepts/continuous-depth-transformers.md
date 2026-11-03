---
title: Continuous-Depth Transformers
type: concept
aliases:
  - Continuous-Time Transformers
  - Neural ODE Transformers
tags:
  - transformers
  - neural-ordinary-differential-equations
  - parameter-sharing
  - dynamical-systems
---

## Overview

Continuous-depth Transformers model hidden representations as solutions of an ordinary differential equation whose vector field contains attention and feedforward operations. A numerical solver replaces a fixed stack of discrete blocks with evaluations of that vector field. The formulation exposes integration error and dynamical stability as design questions, while parameter sharing can reduce model size without necessarily reducing the number or cost of attention evaluations.

## Key Ideas

- **Residual depth as integration:** A residual update $x_{n+1}=x_n+h f(x_n)$ is an explicit Euler step for $\dot x=f(x,t)$. This analogy becomes an architecture when a solver evaluates a learned Transformer vector field.
- **Autonomous versus non-autonomous dynamics:** An autonomous model reuses one time-invariant function, while a non-autonomous model conditions on depth or uses different parameters over time. The latter is more expressive but weakens claims about one fixed flow.
- **Parameters and computation differ:** Reusing weights over solver steps reduces distinct parameters. It does not by itself reduce FLOPs, latency, activation storage, or numerical-function evaluations.
- **Solver choices are architectural choices:** Euler, higher-order, fixed-step, and adaptive solvers produce different accuracy-cost tradeoffs. Robustness to moderate step changes is empirical evidence, not solver independence.
- **Well-posedness requires conditions:** Existence and uniqueness results require regularity such as Lipschitz continuity. Standard dot-product attention is not globally Lipschitz on an unbounded domain, so normalization, spectral constraints, or local penalties provide conditional or local control rather than an automatic global guarantee.
- **Trajectories permit additional supervision:** A teacher can constrain intermediate states, not only an endpoint. This connects continuous-depth models to [[concepts/knowledge-distillation|Knowledge Distillation]] and distinguishes trajectory recovery from ordinary output matching.
- **Dynamical diagnostics need evidence boundaries:** Jacobian norms, Lyapunov exponents, path geometry, and perturbation recovery describe sampled dynamics. Finite trajectories and local measurements do not alone prove global attraction, contraction, or robustness.

## Important Papers

- Chen et al. (2018), "Neural Ordinary Differential Equations": establishes the foundational continuous-depth neural-network formulation cited by the ODE-ViT paper.
- Zhong et al. (2022), "A Neural ODE Interpretation of Transformer Layers": studies Transformer layers through a neural-ODE formulation, including the autonomous setting.
- [[papers/ot-transformer-a-continuous-time-transformer-architecture-with-optimal-transport-regularization|OT-Transformer: A Continuous-time Transformer Architecture with Optimal Transport Regularization]] uses a shared Transformer vector field and penalizes integrated squared velocity to regularize hidden-state motion.
- [[papers/ode-vit-plug-and-play-attention-layer-from-the-generalization-of-the-vit-as-an-ordinary-differential-equation|ODE-ViT: Plug & Play Attention Layer from the Generalization of the ViT as an Ordinary Differential Equation]] builds an autonomous ViT attention ODE and uses DINO hidden states as checkpoints for teacher-guided trajectory training.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: repeats parameter-tied blocks in discrete depth and makes the autonomy distinction explicit.
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]: analyzes convergence, perturbation sensitivity, and effective dynamics along network depth.
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: measures hidden-state paths without requiring an ODE architecture.
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: supervises selected points and changes along a discrete Transformer's depthwise trajectory.
- [[concepts/adaptive-computation|Adaptive Computation]]: varies iterative computation or stopping behavior, which continuous-depth solvers can also expose.
