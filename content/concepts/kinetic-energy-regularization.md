---
title: Kinetic-Energy Regularization
type: concept
aliases:
  - Kinetic Regularization
tags:
  - neural-differential-equations
  - optimal-transport
  - regularization
---

## Overview

Kinetic-energy regularization penalizes the integrated squared velocity of a learned continuous-time trajectory. For hidden states satisfying $\dot X=f_\theta(X,t)$, a typical penalty is $\lambda\int_0^T\|f_\theta(X(t),t)\|_F^2dt/2$. It complements an endpoint task loss by constraining the motion used to reach the prediction.

## Key Ideas

- The penalty is a time integral of squared speed, rather than simply squared geometric arc length. For fixed endpoints and duration in unconstrained Euclidean space, a constant-speed straight path minimizes this energy; parameterized dynamics and task losses can prevent that ideal path.
- [[concepts/optimal-transport|Optimal Transport]] motivates favoring low-cost motion. Adding a kinetic penalty to supervised learning does not by itself establish that the learned map is an optimal transport map between prescribed distributions.
- OT-Transformer normalizes the penalty by hidden-state dimension $dn$ and accumulates it alongside ODE integration. Its classification experiments show that sufficient regularization can prevent observed gradient explosions and improve accuracy.
- A quadratic control cost makes the unrestricted Hamiltonian finite and gives a unique maximizing velocity for a fixed adjoint variable when $\lambda>0$. This local control property does not imply a unique neural-network optimizer.
- Smoother learned trajectories may tolerate fewer inference steps, but this is an empirical tradeoff. OT-Transformer's MNIST accuracy changes little from twenty to eight steps and falls sharply at one step.

## Important Papers

- [[papers/ot-transformer-a-continuous-time-transformer-architecture-with-optimal-transport-regularization|OT-Transformer: A Continuous-time Transformer Architecture with Optimal Transport Regularization]]: applies dimension-normalized kinetic regularization to transformer-driven hidden-state ODEs.
- Finlay et al. (2020), "How to Train Your Neural ODE: The World of Jacobian and Kinetic Regularization": prior work cited in OT-Transformer's discussion of continuous normalizing flows.
- Onken et al. (2021), "OT-Flow: Fast and Accurate Continuous Normalizing Flows via Optimal Transport": transport-based regularization of continuous flows.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/normalizing-flows|Normalizing Flows]]
