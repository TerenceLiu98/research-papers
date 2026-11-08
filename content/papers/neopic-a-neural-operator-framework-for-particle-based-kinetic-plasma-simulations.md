---
title: "NEOPIC: A Neural Operator Framework for Particle-based Kinetic Plasma Simulations"
type: paper
authors:
  - Sriramkrishnan Muralikrishnan
  - Chelsea Maria John
  - Jefrey Kelling
  - Michael Bussmann
  - Robert Speck
  - Paul Gibbon
year: null
tags:
  - neural-operators
  - kinetic-plasma-simulation
  - particle-methods
  - scientific-machine-learning
  - fourier-neural-operators
---

## TL;DR

NEOPIC replaces only the field solve in a particle-based kinetic plasma simulation with a [[nonuniform-fourier-neural-operators|Nonuniform Fourier Neural Operator]] that maps the particles' empirical charge measure directly to electric fields at particle positions. The construction is mesh-free, permutation-invariant, representation-equivalent at any particle count, and linear in the number of particles for a fixed architecture. Its simulations reproduce several two- and three-dimensional electrostatic benchmarks and remain stable beyond the training window, although the current implementation is substantially slower than optimized particle solvers at equal particle counts.

## Research Question

Can one learn a single plug-and-play field operator from particle-in-cell, particle-in-Fourier, and tree-code data that works directly on arbitrary particle configurations without depositing them onto a mesh?

## Motivation

Particle-in-cell (PIC) schemes are efficient and scalable, but grid deposition aliases unresolved particle noise and can cause finite-grid instability unless the mesh resolves relevant physical scales. Particle-in-Fourier (PIF) and tree methods avoid some grid limitations but have different accuracy, boundary, and computational trade-offs. Because these methods differ primarily in how they map particle attributes to fields, the paper isolates that map as the learning target while retaining the original particle dynamics and time integrator.

## Contributions

- Introduces NEOPIC, a learned particle-field-particle interface that can replace the field solver in an otherwise standard particle code and can be trained from several teacher methods.
- Defines a [[nonuniform-fourier-neural-operators|Nonuniform Fourier Neural Operator]] (NUFNO) on empirical particle measures, using nonuniform Fourier transforms to couple arbitrary particle locations globally without a mesh or tree.
- Proves representation equivalence: direct discrete evaluation equals evaluation of the continuum operator on the same empirical measure, up to NUFFT tolerance when approximate transforms are used, so particle noise is not aliased onto retained modes.
- Separates trajectory and field error into Monte Carlo sampling, learned-operator, teacher-discretization, and time-stepping components.
- Shows analytically that sampling noise in training acts as an implicit regularizer, producing an accuracy-robustness trade-off governed by the relation between training and inference particle counts.
- Establishes $\mathcal{O}(N_p)$ inference time and memory for fixed architecture and transform tolerance.

## Method

For particle positions $x_p$ and normalized weights $w_p$, NEOPIC represents the input as the empirical measure

$$
\mu_X = \sum_{p=1}^{N_p} w_p\delta_{x_p}.
$$

It learns the instantaneous map from this measure to the self-consistent electric field evaluated at the same particle locations. Particle sampling, characteristic evolution, external fields, and explicit or implicit time integration remain outside the learned model. Exact field Jacobians for implicit nonlinear solvers are obtained through automatic differentiation.

The NUFNO normalizes each particle cloud to a torus, lifts coordinates pointwise, applies four Fourier layers in the main experiments, and projects features pointwise to field components. Each layer performs a type-1 nonuniform transform from particles to a fixed set of Fourier modes, spectral mixing, and a type-2 transform back to particle locations, alongside a pointwise linear path and nonlinearity. Since the transforms integrate against the empirical measure, the model is invariant to particle ordering and can use a different number of particles at inference.

The analysis assumes regularity of the continuum and learned field operators and derives convergence for leapfrog trajectories and empirical distributions. A separate expansion of the training loss shows how finite-particle fluctuations penalize mismatch between the model's and teacher's responses to sampling noise. It suggests training near the smallest intended inference particle count, subject to retaining adequate signal-to-noise in relevant modes.

## Experiments

- In 2D-2V weak Landau damping, five models trained with 50,000 to 800,000 particles were evaluated with up to 1.6 million particles. Along matched training and inference counts, teacher-forced field error fell from $2.3\times10^{-3}$ to $7.3\times10^{-4}$. Training with more particles than used at inference was the unfavorable direction.
- A single 2D model trained on five mini-apps from PIF, PIC, and Barnes-Hut teachers reproduced damping and instability growth rates to about 1%, matched first saturation timing closely, and maintained teacher-level energy behavior on periodic cases through an extrapolation window equal to the training horizon.
- The open-boundary cyclotron case was harder: field error was 1-4% through training but rose to about 20% later, yielding roughly 14% excess spiral-arm winding over the measured radial range.
- Two 3D models trained on four or five mini-apps reproduced the main field-energy dynamics. Adding a teacher produced a consistent intermediate response to particle noise rather than simply selecting one teacher's discretization.
- Implicit midpoint integration in 1D remained stable and nearly energy-conserving beyond leapfrog's stability limit, demonstrating compatibility with implicit solvers.
- Measured NUFFT inference scaled linearly, but cost roughly 120-200 times more per particle than optimized FFT-based PIC and about six times more than Barnes-Hut in one reported large-particle comparison. NEOPIC was therefore not competitive at equal particle counts in the tested implementation.

## Limitations

- The work covers collisionless electrostatic models; electromagnetic, Darwin, and collisional systems are future extensions.
- Formal error bounds rely on regularity and Lipschitz assumptions, and the sampling-noise analysis includes linear-teacher assumptions that do not cover every possible field equation.
- Accuracy is limited by both the learned model and its teachers; mixing teachers can also blend their discretization responses to particle noise.
- Per-sample min-max normalization and the demonstrated boundary treatments do not establish general performance for complex geometries or arbitrary boundary conditions.
- The most difficult open-boundary cyclotron example accumulates substantial out-of-window field and phase error.
- Training used up to 12 NVIDIA A100 GPUs, and the current single-GPU solver is much slower than optimized production particle codes at equal particle counts.
- The parsed source supplies no publication year, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[nonuniform-fourier-neural-operators|Nonuniform Fourier Neural Operators]]
- [[neural-operators|Neural Operators]]
- Particle-in-cell methods
- Particle-in-Fourier methods
- Vlasov-Poisson system
- Representation-equivalent neural operators
- Sampling noise regularization

## Related Papers

- Lingsch et al., "Beyond Regular Grids: Fourier-Based Neural Operators on Arbitrary Domains": provides the direct spectral layer used by NUFNO, but treats point clouds as sampling locations rather than as the input measure itself.
- Bartolucci et al., "Representation Equivalent Neural Operators: A Framework for Alias-Free Operator Learning": supplies the representation-equivalence framework used to analyze aliasing.
- Li et al., "Fourier Neural Operator for Parametric Partial Differential Equations": introduces the grid-based Fourier neural operator architecture that NUFNO adapts to particle measures.
- Lyu and Zhong, "Latent Residual-Closure Fourier Neural Operator for Robust Multi-Field Solving in Particle-in-Cell Simulations": learns a grid-based field solver after particle deposition, whereas NEOPIC learns the complete particle-to-field map.
- Evstatiev and Shadwick, "Variational Formulation of Particle Algorithms for Kinetic Plasma Simulations": provides relevant structure-preserving particle-method context.

Source: supplied parsed Markdown for Cognitio job `b066fcb2-9924-4203-8f64-b6e9ac203b52`.

[[index|Library home]]
