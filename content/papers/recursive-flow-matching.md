---
title: "Recursive Flow Matching"
type: paper
authors:
  - Jiahe Huang
  - Sihan Xu
  - Sharvaree Vadgama
  - Rose Yu
year: null
source_job_id: cfdadbe9-25e9-4d96-a50e-5d2b204f25a6
tags:
  - flow-matching
  - few-step-generation
  - scientific-machine-learning
  - spatiotemporal-forecasting
---

## TL;DR

Recursive Flow Matching (RecFM) trains one scale-conditioned velocity network on several time-rescaled trajectories that meet at the same interpolated state. Supervision at each scale and a cross-scale consistency loss favor velocity fields that tolerate large Euler steps. On sea-surface temperature, Navier-Stokes, and Helmholtz benchmarks, the reported one- and two-step models are substantially faster than a diffusion-based emulator and improve several accuracy and calibration metrics, with the largest gains on the more deterministic physics tasks.

## Research Question

Can [[concepts/flow-matching|Flow Matching]] support accurate one- or few-step forecasting of complex spatiotemporal dynamics by aligning its learned trajectories across discretization scales, without distillation or explicit PDE-residual supervision?

## Motivation

Diffusion emulators can preserve fine physical structure but require many sequential denoising evaluations. Flow matching removes simulation from training and can reduce inference evaluations, yet coarse numerical integration may introduce large truncation errors and unstable long-horizon rollouts. Existing consistency and distillation methods are mostly developed for static generation, while physics-constrained methods may require governing equations that are unavailable for observational systems such as sea-surface temperature.

## Contributions

- Introduces a scale-conditioned flow-matching objective in which primary and recursively rescaled trajectories share an interpolated spatial state.
- Combines direct velocity supervision at every scale with a consistency loss tying secondary predictions to scaled primary predictions.
- Relates the consistency constraint to reduced temporal variation of the velocity field and gives an Euler-error bound in terms of trajectory acceleration.
- Evaluates one- and two-step probabilistic forecasting on real-world climate data and two simulated physics systems, plus an image-generation extension.

## Method

Given data $x_0$, noise $x_1$, and $t\in[0,1]$, RecFM starts from the usual linear path

$$
x_t=(1-t)x_0+tx_1, \qquad v^*=x_1-x_0.
$$

For recursion depth $D$, it samples a base scale $\alpha\in[t,1]$ and defines $\alpha^{(i)}=\alpha^{i-1}$ and $\tau^{(i)}=t/\alpha^{(i)}$. All scale-time pairs are evaluated at the same $x_t$. A network $v_\theta(x,t,\alpha)$ predicts $\hat v^{(i)}$, with each trajectory supervised toward $\alpha^{(i)}v^*$ and each secondary prediction regularized toward $\alpha^{(i)}\hat v^{(1)}$:

$$
\mathcal L_{\mathrm{total}}
=\sum_{i=1}^{D}\|\hat v^{(i)}-\alpha^{(i)}v^*\|_2^2
+\lambda\sum_{i=2}^{D}\|\hat v^{(i)}-\alpha^{(i)}\hat v^{(1)}\|_2^2.
$$

The scale input is a training scaffold; inference uses $\alpha=1$ and ordinary Euler integration. The main experiments use $D=2$ and $\lambda=1$. The paper argues that nearby-scale consistency constrains temporal velocity variation, one component of trajectory acceleration, thereby tightening a standard global Euler-error bound. Its optimum analysis also shows that the secondary trajectories preserve the corresponding linear-interpolant marginals under the stated expressivity and Lipschitz assumptions.

Unlike Shortcut Models, RecFM compares scaled velocities at the same spatial point. Shortcut consistency instead composes steps and evaluates the field at a forward-updated point. The constraints are therefore distinct even though both encourage locally straighter trajectories.

## Experiments

**Setup.** The evaluation covers seven-day sea-surface-temperature forecasting from one input day, 64-step Navier-Stokes reconstruction, and 49-step Helmholtz staircase reconstruction. The models generate 50-member ensembles and are assessed with CRPS, ensemble-mean MSE, spread-skill ratio (SSR), and single-L40S rollout time. RecFM and vanilla flow matching use the same pixel-level hierarchical video diffusion transformer backbone as VideoPDE.

**Forecasting.** On SST, one-step RecFM reports CRPS/MSE/SSR of 0.217/0.162/0.984 in 0.4310 seconds; two-step RecFM reaches 0.216/0.161/1.004 in 0.7353 seconds. VideoPDE reports 0.216/0.162/0.746 in 19.753 seconds, so RecFM's accuracy is comparable in this more stochastic setting while calibration and runtime improve.

On Navier-Stokes, one-step RecFM reports 0.031 CRPS, 0.0064 MSE, and 0.959 SSR, versus vanilla flow matching's 0.036/0.0076/0.911 and VideoPDE's 0.033/0.0068/0.205. On Helmholtz, two-step RecFM reports 0.0027 CRPS and $2.7\times10^{-5}$ MSE, versus VideoPDE's 0.026 and $5.6\times10^{-4}$. The appendix's physics-aware evaluation also reports better kinetic-energy agreement on Navier-Stokes and a lower Helmholtz PDE residual than the listed baselines.

**Ablations.** On Navier-Stokes, $\lambda=1$ is best among the tested consistency weights for one-step prediction; setting it to $10^6$ sharply degrades all metrics. Depth two slightly outperforms depth three while using less training memory. One- or two-step inference is best in the reported step sweep, and additional steps can accumulate error. Even the zero-consistency configuration benefits from secondary trajectory supervision, so the results do not attribute the entire gain to the consistency term alone.

**Image generation.** RecFM-XL reports ImageNet-1k FID 2.49 with 16 steps and classifier-free guidance 1.5, compared with 2.53 at 128 steps and 3.22 at eight steps. This is a secondary extension rather than the paper's main scientific-emulation evaluation.

## Limitations

- The largest forecasting gains occur on the more deterministic PDE benchmarks; improvements over VideoPDE on stochastic SST accuracy are small, although runtime and calibration improve.
- The main baseline tables combine methods with different architectures or reported configurations. The cleanest objective comparison is vanilla flow matching with the shared backbone.
- RecFM requires $D$ forward/backward gradient evaluations per training iteration. The authors reduce training iterations by the same factor for cost comparability, but depth three still increases memory.
- Performance is sensitive to the consistency weight, and more inference steps can worsen results because the training objective emphasizes the few-step regime.
- The trajectory-straightening argument constrains one component of acceleration under stated regularity assumptions; it does not guarantee low finite-model error after optimization.
- Helmholtz time evolution is analytically separable and periodic, making it a controlled but less dynamically complex benchmark.
- The manuscript identifies realistic high-complexity video as an open challenge and provides only preliminary static image-generation evidence.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those fields are not inferred.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the simulation-free vector-field objective extended with scale-conditioned trajectories.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: another route to one-step generation, based on finite-interval average velocity rather than same-point scale consistency.
- [[concepts/diffusion-models|Diffusion Models]]: iterative probabilistic generators used by several scientific-emulation baselines.
- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: models ordered trajectories and their temporal couplings, whereas RecFM aligns multiple scales of a generative path through the same state.

## Related Papers

- Lipman et al. (2023), "Flow Matching for Generative Modeling": supplies the conditional vector-field regression framework.
- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: learns finite-interval average velocities for one-step sampling rather than recursively scaled instantaneous velocities.
- Frans et al. (2024), "One Step Diffusion via Shortcut Models": enforces compositional step-size consistency at forward-updated states; the manuscript contrasts this with RecFM's same-point scale constraint.
- Li et al. (2025), "VideoPDE: Unified Generative PDE Solving via Video Inpainting Diffusion Models": supplies the shared hierarchical backbone and leading diffusion baseline.
- Baldan et al. (2026), "Physics vs Distributions: Pareto Optimal Flow Matching with Physics Constraints": adds explicit PDE residuals, unlike RecFM's data-space consistency objective.
- [[papers/trajectory-flow-matching-with-applications-to-clinical-time-series-modeling|Trajectory Flow Matching with Applications to Clinical Time Series Modeling]]: preserves observation-history information for irregular stochastic trajectories rather than targeting coarse solver stability.

Project page: https://jhhuangchloe.github.io/RecFM/

Source: supplied parsed manuscript, Cognitio job `cfdadbe9-25e9-4d96-a50e-5d2b204f25a6`.

[[index|Library home]]
