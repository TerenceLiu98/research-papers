---
title: Symplectic Latent Dynamics
type: concept
aliases:
  - Symplectic World Models
  - Hamiltonian Latent Dynamics
tags:
  - dynamical-systems
  - latent-dynamics
  - symplectic-geometry
  - world-models
---

## Overview

Symplectic latent dynamics constrain a learned transition to preserve the canonical symplectic form on paired position-like and momentum-like coordinates. This makes the transition volume-preserving and invertible by construction. In a [[concepts/world-models|world model]], the constraint targets inference-time rollout behavior rather than only the encoder distribution learned during training.

## Key Ideas

- **Structure applies at every step.** A symplectic integrator such as leapfrog composes maps whose Jacobian determinant is one, so phase-space volume is preserved for every input and parameter setting.
- **Some collapse modes become impossible.** An invertible, volume-preserving map cannot uniformly contract all directions, merge distinct states, or have an asymptotically stable fixed point. It can still stretch and shear states, so these facts do not bound prediction error.
- **Position and momentum form the state.** Second-order dynamics require both configuration and motion. A learned representation can enforce this split by estimating a momentum-like coordinate from temporal derivatives of a position-like encoder trajectory.
- **Actuation need not break symplecticity.** Conditioning the Hamiltonian on an action held fixed within each integration step changes the energy but retains the geometric property of the step.
- **Regularization remains complementary.** Distribution regularizers shape encoder outputs during training; symplecticity preserves the volume of the distribution passed into the rollout. Neither substitutes for the other.
- **Dissipation changes the appropriate geometry.** Friction and other dissipative effects contract physical phase-space volume, motivating port-Hamiltonian or other structured extensions instead of a purely symplectic transition.

## Important Papers

- [[papers/lehami-symplectic-latent-dynamics-for-world-models|LeHami: Symplectic Latent Dynamics for World Models]] applies an exactly symplectic, action-conditioned leapfrog predictor to a JEPA world model and evaluates volume, velocity prediction, time re-stepping, reversal, and planning.
- Greydanus, Dzamba, and Yosinski (2019), "Hamiltonian Neural Networks," learns a scalar Hamiltonian whose gradients define continuous dynamics.
- Chen et al. (2019), "Symplectic Recurrent Neural Networks," combines Hamiltonian parameterization with symplectic integration for learned physical dynamics.
- Hairer, Lubich, and Wanner (2003), "Geometric Numerical Integration Illustrated by the Stormer-Verlet Method," develops the numerical properties of the leapfrog/Stormer-Verlet integrator.

## Related Concepts

- [[concepts/world-models|World Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/latent-vector-fields|Latent Vector Fields]]
- [[concepts/dynamical-systems-reconstruction|Dynamical Systems Reconstruction]]
