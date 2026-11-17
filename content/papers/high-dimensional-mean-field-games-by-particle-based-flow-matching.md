---
title: High-dimensional Mean-Field Games by Particle-based Flow Matching
type: paper
authors:
  - Jiajia Yu
  - Junghwan Lee
  - Yao Xie
  - Xiuyuan Cheng
year: null
tags:
  - mean-field-games
  - flow-matching
  - optimal-transport
---

## TL;DR

A particle-based solver alternates trajectory optimization with velocity-field regression to solve deterministic, finite-horizon mean-field games without a spatial mesh. Exact flow matching preserves time marginals while reducing kinetic cost. The paper proves convergence rates for an idealized optimal-control scheme and demonstrates non-potential games and latent image transport empirically.

## Research Question

Can particle optimization and neural flow matching make continuous-state mean-field games computationally tractable in high dimensions, including games without a population-level potential objective?

## Motivation

Mean-field equilibrium requires consistency between individual best responses and the population distribution they induce. Exact best responses are expensive, naive fixed-point iteration may diverge, and spatial PDE grids scale poorly with dimension. Neural approaches that differentiate through ODE solvers also incur substantial training cost.

## Contributions

- A proximal best-response scheme combines particle trajectories in Lagrangian coordinates with a learned Eulerian velocity field.
- Flow matching supplies a marginal-preserving representation whose kinetic cost cannot exceed that of the original trajectories (Lemma 4.1).
- Under velocity regularity, Eulerian solutions induce Lagrangian solutions; potential games additionally admit equality of optimal values and recovery of Eulerian optima from Lagrangian optima (Theorem 4.3).
- Optimal-control convergence analysis accompanies experiments on relaxed transport and a non-potential game.

## Method

For a fixed population path, the individual objective combines expected quadratic velocity cost, population-dependent running cost, and terminal cost. Each outer iteration samples trajectories from the current velocity field, evaluates population couplings, optimizes particle trajectories, and fits the field to their velocities.

The ideal particle step minimizes the current individual objective plus squared trajectory and endpoint distances to the previous iterate, weighted by the inverse proximal step size. Flow matching then regresses particle velocities onto positions and time. Its exact minimizer averages velocities conditional on location, preserving marginal densities and decreasing or preserving kinetic energy; distribution-dependent running and terminal costs stay unchanged for a fixed population argument.

The implementation uses finite-difference trajectory gradients and intermittent neural regression rather than exact proximal minimization. For KL-relaxed terminal transport, a classifier estimates the density ratio needed for the terminal coupling. Neural regression avoids differentiating through simulation, but resampling trajectories still uses an ODE solver.

Theorem 4.6 concerns population-independent costs: it gives sublinear decay of a proximal-step measure and linear convergence under additional strong convexity. These results do not establish convergence to equilibrium for general interacting games.

## Experiments

- **Two-dimensional transport:** maps a 4 × 4 checkerboard distribution toward an isotropic Gaussian using a KL terminal penalty; density plots show the interpolation.
- **Non-potential game:** a two-dimensional asymmetric exponential interaction kernel and a quadratic terminal cost drive agents toward a target line. The first-order residual reaches approximately 0.1. This checks a necessary stationarity condition, not a certified Nash exploitability bound.
- **Image translation:** handbags to shoes and CelebA male to female use a VAE latent space of shape 8 × 12 × 12 (1,152 coordinates). The compared flow baselines share the velocity architecture; the paper trains those baselines for 400,000 steps.

Table 1 reports FID (lower is better):

| Method | Handbags → shoes | Male → female |
| --- | ---: | ---: |
| Proposed | 12.44 | 9.68 |
| Q-Flow | 12.34 | 9.66 |
| OT-CFM | 13.01 | 12.88 |
| Stochastic Interpolants | 15.87 | 16.39 |
| Rectified Flow | 13.91 | 14.01 |
| SB-CFM | 12.70 | 11.55 |

The proposed method is close to, but numerically behind, Q-Flow and improves on the other listed flow baselines. Q-Flow results are taken from its published paper; they are not a matched rerun. Appendix D reports VAE reconstruction FIDs and evaluation splits separately.

## Limitations

Trajectory storage grows with particle count and time resolution. General-game convergence remains open, and the idealized analysis excludes sampling, finite-difference, and neural regression errors. High-dimensional demonstrations concern relaxed transport; the non-potential experiment is two-dimensional. FID measures image distribution quality rather than equilibrium accuracy or exact transport optimality.

The supplied Markdown does not identify the paper's publication year or a stable paper identifier; the year is left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: turns optimized particle velocities into a marginal-preserving field.
- [[concepts/optimal-transport|Optimal Transport]]: dynamic transport with a KL-relaxed endpoint is a potential-game application.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: a distinct extension retaining network labels, whereas this paper uses a common population distribution.

## Related Papers

- Yu, Cheng, Liu, and Zhao, *Convergence analysis and acceleration of fictitious play for general mean-field games via the best response* (2024), reference 49: best-response learning motivates the proximal updates.
- Xu, Cheng, and Xie, *Computing high-dimensional optimal transport by flow neural networks* (2025), reference 47: Q-Flow is the closest reported image-FID comparator.
- Lipman et al., *Flow matching for generative modeling* (2023), reference 33: supplies the velocity-regression foundation adapted here to optimized trajectories.
