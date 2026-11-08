---
title: "FLARE: Flow Matching with Local Axis-Angle Representations for Stochastic Micromagnetic Evolution"
type: paper
authors:
  - Pengyu Li
  - Renjie Tong
  - Xuanlue Jiang
  - Jianmin Li
  - Yuanyuan Zhou
year: 2026
source_job_id: "f6de9bdb-0efa-488a-bd67-ca99db779da9"
tags:
  - flow-matching
  - micromagnetics
  - stochastic-dynamics
  - scientific-machine-learning
---

## TL;DR

FLARE directly samples finite-temperature magnetization fields at requested physical horizons instead of advancing the Landau-Lifshitz-Gilbert dynamics through many physical time steps. It applies [[concepts/flow-matching|Flow Matching]] to [[concepts/anchor-relative-rotation-fields|Anchor-Relative Rotation Fields]], then decodes rotations with Rodrigues' formula so every predicted magnetic moment has unit norm. On the paper's two-segment benchmark, FLARE improves the strongest external single-checkpoint distributional baselines while providing a reported 448x batch-one and 3,062x best-batch speedup over MuMax3; its advantages concern endpoint distributions, not dense trajectories.

## Research Question

Can a learned generative surrogate predict the distribution of full magnetization fields at arbitrary supported future horizons, preserve their spherical geometry, and compose predictions across changing controls without stepwise physical-time integration?

## Motivation

Finite-temperature micromagnetic simulation requires repeated numerical integration of the stochastic Landau-Lifshitz-Gilbert equation. Long horizons and ensembles are therefore expensive. Existing learned systems mostly remain deterministic, predict reduced observables, or accelerate components while retaining sequential integration. The paper instead treats a future magnetization field as a conditional distribution indexed by the current field, physical controls, and requested horizon.

## Contributions

- Represents each local transition by the principal axis-angle rotation from the anchor spin to the target spin, rather than by an unconstrained Cartesian displacement.
- Trains a horizon-conditioned flow model over the resulting rotation field and uses rotation-based decoding to preserve pointwise unit norm.
- Generates full-field stochastic endpoints directly and composes control segments by feeding each generated endpoint into the next conditional prediction.
- Evaluates realization error, ensemble fidelity, physical-observable distributions, out-of-distribution controls and temperatures, composition, and complete-output latency under one protocol.

## Method

For every spatial cell, FLARE encodes the transition from anchor magnetization $m_s$ to target $m_t$ as a local rotation vector $\omega^\star$. Its direction is the rotation axis and its magnitude is the principal angle. A Gaussian rotation field is linearly interpolated to this target field, and a conditional U-Net learns the corresponding velocity with the standard conditional flow-matching objective. Flow time and physical prediction horizon are embedded separately; the anchor field and spatial conditions enter at native resolution, while global controls modulate the network through adaptive group normalization.

At inference, a ten-step Heun solver integrates the learned vector field in rotation space. Rodrigues decoding applies the sampled rotation to each anchor spin. Since the decoder is an element of $SO(3)$, it preserves unit length by construction. For a protocol with multiple constant-control segments, FLARE makes one endpoint query per segment and uses each sampled endpoint as the next anchor.

The training corpus contains 7,770 MuMax3 trajectories from 1,000 base conditions on a $256\times256$ thin-film grid, with five current-mask families and temperatures of 30, 150, and 300 K. Splits keep all repeats, frames, and segments from a base condition together.

## Experiments

On the complete two-segment path, FLARE reports a Distribution Score of 0.762, angular energy distance of 15.30 degrees, and fair energy score of 0.393. Relative to the strongest external single-checkpoint baseline for each metric, these correspond to 7.9% higher Distribution Score, 29.9% lower angular energy distance, and 37.3% lower fair energy. CNO-FM has the better repeat-paired angle, 34.43 versus 36.72 degrees, showing that FLARE's main advantage is distributional rather than realization-level accuracy.

Matched controls support both parts of the design. Across three seeds, the axis-angle model outperforms Cartesian conditional flow matching, Riemannian flow matching, and direct U-Net regression on all four reported complete-path metrics. Removing target-horizon conditioning increases error at held-out 1.5- and 2.5-ns interpolation horizons by 8.91 and 8.31 degrees. Supported one-segment accuracy degrades gradually from 1 to 3 ns; requests beyond 3 ns lack exact one-segment targets in the held-out saved-frame data.

The standardized 5-ns workload takes 995.2 ms at batch one on an H200, versus 446.125 seconds for MuMax3, for a 448x speedup; the best supported batch yields 3,062x. A held-out ring current-mask family increases single-segment and autoregressive angle by about 3%. At unseen in-range temperatures of 90 and 225 K, no evaluated metric shows statistically resolved adverse degradation relative to interpolation references. At 400 K, angular energy distance worsens by 44.24% relative to the matched 300 K endpoint, exposing the limit of temperature extrapolation.

## Limitations

FLARE predicts endpoints, not dense physical trajectories, so it does not replace numerical integration for transient dynamics, first-passage times, conservation accounting, or new physical laws. Autoregressive composition accumulates boundary error, and mixed exposure to generated rollout states does not beat an equal-budget ground-truth-only continuation control. The evidence covers one material system, two-dimensional thin films, a limited control and temperature range, and at most five simulator repeats per condition. The claimed distributional resolution is bounded by those repeats, and the main confidence intervals condition on a fixed checkpoint. More ODE steps slightly improve charge error but worsen angular error and cost.

## Related Concepts

- [[concepts/anchor-relative-rotation-fields|Anchor-Relative Rotation Fields]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]

## Related Papers

- [[papers/flow-matching-on-general-geometries|Flow Matching on General Geometries]]: defines conditional flow matching intrinsically on Riemannian manifolds; FLARE instead transports Euclidean local rotation coordinates and enforces the sphere constraint during decoding.
- [[papers/flow-matching-for-scalable-simulation-based-inference|Flow Matching for Scalable Simulation-Based Inference]]: another conditional-flow application in scientific inference, focused on amortized posterior distributions rather than physical endpoint fields.

[[index|Library home]]
