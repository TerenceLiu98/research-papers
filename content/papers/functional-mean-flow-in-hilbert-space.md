---
title: Functional Mean Flow in Hilbert Space
type: paper
authors:
  - Zhiqi Li
  - Yuchen Sun
  - Greg Turk
  - Bo Zhu
year: null
source_job_id: ec86977b-f985-4974-b7c2-27453bef27a0
tags:
  - generative-models
  - flow-matching
  - function-spaces
  - one-step-generation
---

## TL;DR

Functional Mean Flow (FMF) extends MeanFlow from finite-dimensional vectors to distributions over functions in Hilbert space. It learns either a finite-interval mean velocity or an extrapolated endpoint, permitting one-step sampling with function-to-function networks. Across functional data, Navier-Stokes fields, coordinate-based images, and signed-distance fields, FMF outperforms the tested one-step functional baselines, but usually trails the strongest multistep method on at least some metrics. The endpoint-prediction variant is essential for the SDF experiments because velocity prediction collapses during training.

## Research Question

Can [[concepts/average-velocity-fields|Average Velocity Fields]] be defined and trained consistently in infinite-dimensional Hilbert spaces so that functional generative models require only one network evaluation at inference?

## Motivation

[[concepts/flow-matching|Flow Matching]] and diffusion in function space can train and sample on coordinate subsets, decoupling the learned function from a fixed discretization. Their iterative samplers remain expensive. Directly averaging sample-conditional flow maps does not solve this problem: the resulting marginal conditional flow generally differs from the two-parameter flow induced by the marginal velocity field. FMF instead derives a differential identity for the marginal flow and uses conditional instantaneous velocities only inside an equivalent regression objective.

## Contributions

- A Hilbert-space formulation of finite-interval mean velocity based on the Frechet derivative of a two-parameter flow.
- Conditional training losses for both mean-velocity prediction and extrapolated endpoint ($x_1$) prediction, each shown equal to its marginal loss up to a parameter-independent constant under the paper's assumptions.
- One-step sampling algorithms implemented with Jacobian-vector products and function-to-function architectures.
- Evaluations spanning five one-dimensional functional datasets, Navier-Stokes fields, coordinate-based image generation, and conditional 3D SDF reconstruction.

## Method

Let a marginal velocity field $u_t$ transport a Gaussian measure $\mu_0$ to a target measure on a separable Hilbert space $\mathcal F$. For the two-parameter flow $\phi_{t\to r}=\phi_r\circ\phi_t^{-1}$, FMF defines

$$
\bar u_{t\to r}=\frac{\phi_{t\to r}-\operatorname{Id}_{\mathcal F}}{r-t}.
$$

The paper first shows why averaging the corresponding sample-conditional flow maps is generally inconsistent with this marginal flow. Under differentiability and integrability assumptions, it derives

$$
\partial_t\phi_{t\to r}(g)=-D\phi_{t\to r}(g)[u_t(g)],
$$

which yields a trainable identity for $\bar u_{t\to r}$. The intractable marginal instantaneous velocity is replaced by the closed-form conditional velocity from [[concepts/functional-flow-matching|Functional Flow Matching]], while the derivative term uses the current network prediction inside a stop-gradient target. A Jacobian-vector product computes the time and functional directional derivatives without materializing the full operator-valued Jacobian.

The $x_1$ variant predicts the endpoint obtained by extending the interval's mean-velocity line to time one:

$$
\hat f_{1,t\to r}(g)=(1-t)\bar u_{t\to r}(g)+g.
$$

This is not a prediction of the true future state at time $r$, as in a consistency or flow-map model. At inference, velocity prediction uses $f_1=f_0+\bar u_{0\to1}^\theta(f_0)$; endpoint prediction uses $f_1=\hat f_{1,0\to1}^\theta(f_0)$. The initial random function comes from a Gaussian measure, since white noise itself is not a function in the infinite-dimensional setting. Implementations use [[concepts/neural-operators|Neural Operators]], a sparse-dense operator, or a point-based functional network according to the domain.

## Experiments

**One-dimensional functions and Navier-Stokes (Tables 1-2).** Fourier neural operators use a Matern Gaussian-process source. On AEMET, Genes, population, GDP, and labor-force data, FMF uses one function evaluation versus 290-2,000 for the multistep baselines. It is the strongest tested one-step model overall, but no variant dominates every statistic. On Navier-Stokes, endpoint FMF records density MSE $8.0\times10^{-5}$ and spectrum MSE $5.6\times10^2$, compared with $2.5\times10^{-3}$ and $3.2\times10^4$ for one-step GANO. Multistep FFM-OT is better at $3.7\times10^{-5}$ and $9.3\times10^1$.

**Coordinate-based images (Tables 3-4).** Models see random one-quarter pixel subsets from 256 x 256 training images. One-step FMF reports FID_CLIP 9.17 on CelebA-HQ 256, 11.37 on FFHQ 256, and 26.57 on LSUN-Church 256. The listed one-step comparators are worse where reported, while 100-step Infty-Diff scores 3.87 on FFHQ and 10.36 on LSUN-Church. The same FMF model evaluates at multiple resolutions; CelebA-HQ FID_CLIP rises from 3.48 at 64 x 64 to 10.96 at 1024 x 1024.

**Conditional 3D reconstruction (Table 5).** Given 64 ShapeNet surface points, endpoint FMF reconstructs an SDF in one step with Chamfer distance 0.060, F-score 0.584, and boundary loss 0.011. The 64-step Functional Diffusion baseline reports 0.101, 0.707, and 0.012, respectively: FMF improves Chamfer and boundary loss but has a lower F-score. The velocity variant is not used because its output variance collapses in SDF experiments, including a diagnostic MNIST-SDF study.

## Limitations

- The loss-equivalence theorems assume regularity of the marginal velocity and flow, finite second moment of the data measure, and positive terminal smoothing; the experiments set the smoothing floor to zero in some implementations.
- Stop-gradient regression with a learned Jacobian-vector product approximates the exact identities. The theory does not establish convergence of neural optimization or quantify approximation error.
- The velocity and endpoint variants are not uniformly interchangeable: velocity prediction fails in the point-based SDF framework even at small learning rates.
- Resolution-agnostic evaluation does not imply constant quality. Image FID_CLIP generally worsens as evaluation resolution rises beyond the training resolution.
- Comparisons mix one-step and multistep methods and several domain-specific architectures. FMF reuses those architectures, so results do not isolate the transport objective from the backbone.
- The 3D metrics disagree: the one-step method has the best reported Chamfer and boundary values but a lower F-score than both multistep baselines.
- The supplied Markdown states no publication year, venue, DOI, arXiv identifier, or uncertainty intervals; `year` is therefore left null.

## Related Concepts

- [[concepts/functional-mean-flow|Functional Mean Flow]]: the function-space extension and its two prediction parameterizations.
- [[concepts/functional-flow-matching|Functional Flow Matching]]: the underlying transport of probability measures on function spaces.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval displacement fields and the MeanFlow identity.
- [[concepts/neural-operators|Neural Operators]]: discretization-flexible function-to-function backbones used by the experiments.
- [[concepts/flow-matching|Flow Matching]]: the finite-dimensional conditional-regression foundation.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: the finite-dimensional one-step formulation extended by FMF.
- Kerrigan, Migliorini, and Smyth (2023), "Functional Flow Matching": supplies the conditional Hilbert-space transport framework.
- Bond-Taylor and Willcocks (2024), "Infinity-Diff: Infinite Resolution Diffusion with Subsampled Mollified States": supplies the sparse-dense image architecture and multiresolution comparison.
- Zhang and Wonka (2024), "Functional Diffusion": supplies the point-based SDF framework and 3D baseline.

[[index|Library home]]
