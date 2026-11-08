---
title: Flow Matching on General Geometries
type: paper
authors:
  - Ricky T. Q. Chen
  - Yaron Lipman
year: null
source_job_id: "9370458d-661e-4e44-bf69-5aee53972071"
tags:
  - flow-matching
  - riemannian-geometry
  - generative-models
  - continuous-normalizing-flows
---

[[index|Library home]]

## TL;DR

Riemannian Flow Matching trains continuous normalizing flows directly on manifolds by regressing tractable conditional tangent vector fields. Closed-form geodesics make training simulation-free on simple geometries; on general meshes, truncated spectral distances provide efficiently evaluated premetrics whose gradient fields define conditional flows. Across spherical, toroidal, mesh, hyperbolic, and positive-definite-matrix experiments, the method is competitive with or improves on the reported manifold-generative baselines, while general geometries still require ODE simulation during training.

## Research Question

Can [[concepts/flow-matching|Flow Matching]] train scalable generative models on both analytically tractable and general Riemannian manifolds without likelihood training, score approximation, or divergence estimation in the training objective?

## Motivation

Data such as geographic locations, molecular torsion angles, covariance matrices, and points on curved surfaces live on non-Euclidean spaces. Earlier manifold continuous normalizing flows often require simulation during training, while manifold diffusion methods require stochastic simulation or approximate conditional scores. Existing simulation-free manifold flows can also scale poorly with dimension and do not readily extend to arbitrary curved meshes or spaces with boundaries. The paper seeks one conditional flow-matching construction that respects the state-space geometry across these settings.

## Contributions

- Extends conditional flow matching to Riemannian manifolds by comparing learned and target tangent vectors with the manifold metric.
- Defines conditional vector fields through a premetric: a nonnegative, point-separating function with nonvanishing spatial gradient away from its target.
- Shows that choosing [[concepts/geodesic-distance|Geodesic Distance]] recovers constant-speed geodesic paths and closed-form, simulation-free training on manifolds with analytic exponential and logarithm maps.
- Uses truncated diffusion or biharmonic spectral distances to make target fields practical on general manifolds represented by triangular meshes.
- Handles manifold boundaries by using Laplace-Beltrami eigenfunctions with Neumann boundary conditions, making the induced target field tangent to the boundary rather than outward-pointing.
- Evaluates the framework on earth and climate events, protein and RNA torsion angles, high-dimensional tori, curved meshes, mazes, hyperbolic space, and symmetric positive-definite matrices.

## Method

Given a base density $p$, data density $q$, and manifold $(\mathcal M,g)$, the model learns a tangent vector field $v_t(x)$ for a [[concepts/normalizing-flows|Continuous Normalizing Flow]]. Direct regression against the marginal target field is replaced by Riemannian conditional flow matching:

$$
\mathcal L_{\mathrm{RCFM}}(\theta)
=\mathbb E_{t,x_1,x_0}\left[\left\|v_t(x_t)-\dot x_t\right\|_g^2\right],
$$

where $x_1\sim q$, $x_0\sim p$, and $x_t$ follows a conditional path ending at $x_1$. The paper verifies that this tractable conditional objective has the same parameter-dependent terms as the marginal Riemannian flow-matching objective.

To construct the path, choose a scheduler $\kappa(0)=1$, $\kappa(1)=0$ and a premetric $d$. The target vector field is the minimum-norm field that decreases $d(x,x_1)$ at the prescribed rate:

$$
u_t(x\mid x_1)
=\frac{\kappa'(t)}{\kappa(t)}d(x,x_1)
\frac{\nabla_x d(x,x_1)}{\|\nabla_x d(x,x_1)\|_g^2}.
$$

With $d$ equal to geodesic distance and $\kappa(t)=1-t$, the path is the constant-speed geodesic

$$
x_t=\operatorname{Exp}_{x_1}\!\left((1-t)\operatorname{Log}_{x_1}(x_0)\right),
$$

which is directly computable on spheres, flat tori, hyperbolic space, and the considered SPD geometry. For general manifolds, the paper uses a truncated Laplace-Beltrami expansion

$$
d_w(x,y)^2=\sum_{i=1}^{k}w(\lambda_i)\bigl(\varphi_i(x)-\varphi_i(y)\bigr)^2,
$$

with diffusion weights $w(\lambda)=e^{-2\tau\lambda}$ or biharmonic weights $w(\lambda)=\lambda^{-2}$. Eigenfunctions are computed once; conditional paths are then obtained by integrating the target ODE without differentiating through the solver.

## Experiments

On four spherical earth and climate datasets, the geodesic variant reports the best test negative log-likelihood among the compared methods for volcanoes ($-7.93\pm1.67$) and fires ($-1.86\pm0.11$), but not earthquakes or floods. On toroidal protein data, it reports the best value on General, Glycine, Pre-Pro, and 7D RNA, while Riemannian Diffusion is slightly better on Proline. The RNA result is $-5.20\pm0.067$ versus $-3.70\pm0.592$ for the reported diffusion baseline.

The high-dimensional-torus study reports stable log-likelihood as dimension increases and attributes this behavior to exact, simulation-free targets without divergence estimation. On Stanford Bunny and Spot the Cow meshes, both diffusion and biharmonic premetrics produce tractable models; neither spectral distance wins every configuration in Table 4. The biharmonic choice avoids tuning the diffusion-time parameter and is used with 200 eigenfunctions for the displayed mesh samples.

On maze-shaped manifolds with boundaries, trajectories generated by the learned field remain within the mesh and reach separated target modes. Additional studies show geometry-respecting flows on the Poincare disk and evaluate covariance generation on SPD manifolds up to 1,770 dimensions. In the SPD experiments, using the Riemannian norm is necessary for all generated samples to remain valid in the two larger settings; the best reported NLL depends on dimension and on the geodesic/norm combination.

## Limitations

- Simulation-free training applies only when the chosen conditional path is available in closed form. General spectral-premetric paths use hundreds of projected Euler steps during training and are substantially slower in the paper's runtime comparison.
- Spectral distances require a one-time eigendecomposition, truncation level selection, and a discretized manifold. Diffusion distance additionally requires tuning $\tau$.
- Several experimental claims rely on qualitative mesh and maze visualizations rather than broad quantitative comparisons; the maze experiments do not report a baseline table.
- The authors use their own random splits because prior data splits were unavailable, limiting exact comparability with published baseline numbers.
- Training paths concentrate near, rather than exactly at, the target by stopping at $1-10^{-5}$ to avoid the target field's endpoint singularity.
- Likelihood evaluation still requires divergence computation, even though the training objective does not.
- The supplied Markdown does not state the paper's publication year, venue, DOI, arXiv identifier, or a usable code URL, so those metadata are not inferred here.

## Related Concepts

- [[concepts/riemannian-flow-matching|Riemannian Flow Matching]]: the paper's manifold-valued conditional velocity-regression framework.
- [[concepts/flow-matching|Flow Matching]]: the Euclidean conditional-flow foundation generalized by the method.
- [[concepts/geodesic-distance|Geodesic Distance]]: supplies closed-form conditional paths on simple manifolds.
- [[concepts/normalizing-flows|Normalizing Flows]]: the learned vector field defines a continuous invertible transport.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: the broader use of curved geometry in learned representations.

## Related Papers

- Lipman et al. (2023), "Flow Matching for Generative Modeling": supplies the conditional flow-matching construction generalized to manifolds.
- Ben-Hamu et al. (2022), "Matching Normalizing Flows and Probability Paths on Manifolds": a simulation-free manifold-flow baseline that the paper contrasts with RFM's dimensional scalability and general geometries.
- De Bortoli et al. (2022), "Riemannian Score-Based Generative Modeling": a diffusion baseline using denoising or implicit score matching.
- Huang et al. (2022), "Riemannian Diffusion Models": a manifold diffusion baseline using an ELBO-based objective.
- [[papers/flow-matching-on-lie-groups|Flow Matching on Lie Groups]]: replaces geodesic or premetric paths with group exponential curves.
- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling Over Families of Distributions]]: specializes the premetric construction to Wasserstein space.
