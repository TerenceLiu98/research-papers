---
title: A Unified Perspective on the Dynamics of Deep Transformers
type: paper
authors:
  - Valerie Castin
  - Pierre Ablin
  - Jose A. Carrillo
  - Gabriel Peyre
year: null
source_job_id: a6cfc1b6-fd5b-4c6f-aa6e-1fb76a75fbed
tags:
  - transformers
  - self-attention
  - partial-differential-equations
  - optimal-transport
  - mean-field-limits
---

## TL;DR

The paper models residual self-attention across continuous depth as a nonlinear continuity equation on token distributions. It proves global well-posedness and mean-field stability for compactly supported data across several normalized attention variants, including masked and multi-head forms. For Gaussian inputs, several attention fields close to affine dynamics, reducing the PDE to mean and covariance ODEs whose convergent solutions typically become rank-deficient. The proposed gradient-flow interpretation for Softmax attention is formal, and some Gaussian Softmax dynamics instead blow up in finite time.

## Research Question

Can the layerwise evolution of tokens in deep attention-only Transformers be described by one measure-valued dynamical framework that supports well-posedness, mean-field, Gaussian, clustering, and gradient-flow analyses across multiple attention variants?

## Motivation

Repeated self-attention creates coupled token dynamics that are difficult to infer from individual layers. Treating tokens as interacting particles and depth as time connects finite token systems to a Vlasov-type PDE. This makes it possible to ask when the evolution exists uniquely, whether empirical token systems converge to a distributional limit, and how the distribution's anisotropy changes with depth.

## Contributions

- Establishes global weak well-posedness and Wasserstein stability for compactly supported inputs under Softmax, $\ell^2$, Sinkhorn, and Sigmoid attention, including multi-head variants with time-dependent parameters.
- Extends the analysis to causal masked attention through a conditional Wasserstein distance, under a position-marginal assumption requiring positive mass at position zero.
- Shows that Gaussian measures remain Gaussian under Softmax, linear, $\ell^2$, and Sinkhorn dynamics, yielding closed ODEs for their means and covariance matrices.
- Characterizes convergence, rank collapse, infinite-time divergence, and finite-time blow-up in Gaussian covariance dynamics, supported by low-dimensional numerical studies.
- Formally equips Softmax dynamics with a twisted transport metric and expresses Gaussian Sinkhorn covariance dynamics as a [[concepts/bures-wasserstein-geometry|Bures-Wasserstein]] gradient flow.

## Method

The model identifies a token sequence with a probability measure $\mu_t$ and represents continuous layer depth by

$$
\partial_t\mu_t+\operatorname{div}(\mu_t\Gamma_{\mu_t})=0,
$$

where the distribution-dependent velocity $\Gamma_{\mu}$ is determined by the chosen attention kernel. Empirical measures recover finite interacting-token ODEs. Bounds on the velocity, its spatial derivative, and its dependence on $\mu$ support a fixed-point existence proof and Dobrushin-style stability estimates. Masked attention augments tokens with positions and restricts transport plans to preserve the position marginal.

For $\mu_t=\mathcal N(\alpha_t,\Sigma_t)$, the relevant attention fields become affine. In the Softmax case, with $A=K^\top Q$,

$$
\dot\Sigma=V\Sigma A\Sigma+\Sigma A^\top\Sigma V^\top,
\qquad
\dot\alpha=V(I+\Sigma A)\alpha.
$$

The paper analyzes these matrix ODEs directly and studies their geometry under modified transport metrics.

## Experiments

The experiments numerically integrate covariance ODEs rather than train or evaluate Transformers on prediction tasks. In dimension two, trajectories are visualized inside the positive-semidefinite cone for Softmax, multi-head Softmax, $\ell^2$, and Sinkhorn attention. Observed regimes include convergence to zero, convergence to rank-deficient boundaries, infinite-time divergence, finite-time blow-up, and dependence on initialization.

In dimensions three through five, random parameter studies find low-rank limiting covariances for convergent Softmax and $\ell^2$ dynamics, including settings beyond the assumptions of the closed-form theorem. Multi-head attention can retain full-rank limits in some two-dimensional cases. The experiments also distinguish Softmax finite-time blow-up from $\ell^2$ trajectories that diverge while remaining well-posed.

## Limitations

- The model omits MLP blocks and layer normalization, so its dynamics do not describe a complete standard Transformer; layer normalization can qualitatively change the state space and long-time behavior.
- General well-posedness is proved for compactly supported initial measures only for the normalized attention variants covered by the velocity bounds. Unnormalized exponential, linear, and ReLU attention fall outside that theorem.
- Gaussian preservation is analytically tractable but is an idealized model of token distributions. Several convergence claims outside restrictive matrix conditions are numerical observations.
- Masked-attention stability requires the position marginal to have positive mass at zero; the authors identify removal of this condition as open.
- The twisted-metric gradient-flow derivations are explicitly formal, and the associated energy is shown not to be geodesically convex under natural assumptions.
- The numerical study concerns covariance ODEs, not downstream accuracy, learned parameters, or empirical hidden states from trained Transformers.
- The supplied source gives no publication year, venue, DOI, or arXiv identifier; `year` is therefore left null.

## Related Concepts

- [[concepts/transformer-pdes|Transformer PDEs]]: the paper's measure-valued continuous-depth framework.
- [[concepts/continuous-depth-transformers|Continuous-Depth Transformers]]: interprets residual depth as continuous-time dynamics.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: supplies the distributional geometry used for Sinkhorn attention and motivates the twisted Softmax metric.
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]: gives the Gaussian covariance geometry used in the Sinkhorn specialization.
- [[concepts/drifting-models|Drifting Models]]: their Gaussian-kernel fields can be decomposed into normalized fields related to $\ell^2$ attention.

## Related Papers

- Geshkovski et al. (2023), "The Emergence of Clusters in Self-Attention Dynamics": the discrete-token clustering result extended here through Gaussian covariance collapse.
- Sander et al. (2022), "Sinkformers: Transformers with Doubly Stochastic Attention": introduces the Sinkhorn attention dynamics and its Wasserstein gradient-flow structure.
- [[papers/a-mathematical-perspective-on-transformers|A Mathematical Perspective on Transformers]]: analyzes normalized attention dynamics on the sphere, including layer normalization.
- Zhong et al. (2022), "A Neural ODE Interpretation of Transformer Layers": develops the continuous-depth interpretation of Transformer layers.
- [[papers/generative-modeling-via-drifting|Generative Modeling via Drifting]]: a library connection whose normalized Gaussian-kernel fields are analyzed as a side application in this paper.

[[index|Library home]]
