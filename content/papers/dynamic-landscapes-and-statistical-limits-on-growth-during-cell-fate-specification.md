---
title: Dynamic Landscapes and Statistical Limits on Growth during Cell Fate Specification
type: paper
authors:
  - Gautam Reddy
year: 2025
doi: "10.1103/63d2-4wq6"
tags:
  - cell-fate-specification
  - optimal-transport
  - stochastic-control
  - epigenetic-landscapes
  - stochastic-thermodynamics
---

## TL;DR

The paper formulates cell-fate specification as stochastic control of a growing cell population. When regulatory effort has a quadratic growth cost and its cost tensor is inversely matched to gene-expression noise, the growth-maximizing control is gradient flow on a time-dependent [[concepts/waddington-epigenetic-landscapes|Waddington epigenetic landscape]]. The framework yields an explicit landscape for growth from one known cell and a sharp growth-rate penalty, expressed through a divergence from the unconstrained growth-maximizing population.

## Research Question

Under which physiological trade-offs does the Waddington landscape become a mathematically precise description of cell-fate control, and how much population growth must be sacrificed to reach a prescribed distribution of cell states in finite time?

## Motivation

[[concepts/optimal-transport|Optimal transport]] can infer transformations between observed cell-state distributions, but its transport costs do not automatically have a physiological interpretation. Existing developmental transport models also often conserve mass or treat growth as a relaxed marginal constraint. This paper instead makes regulatory control directly affect cell growth, so the cost of changing state arises from a growth-control trade-off.

## Contributions

- Derives an analog of the Benamou-Brenier result for growing populations: under a specific noise-cost relation, the growth-maximizing regulatory field is the gradient of a time-dependent potential.
- Factorizes the optimally controlled population density into forward and backward fields satisfying linear Kolmogorov equations, with an exponent that depends on the growth-control parameter.
- Gives an explicit potential landscape when the process starts from a single cell in a known state, reducing computation to the transition density of an uncontrolled growing process.
- Demonstrates a late bifurcation and separated growth-then-differentiation phases in a one-dimensional two-fate model.
- Derives an upper bound on average growth. For a single-cell initial condition, the growth penalty is a scaled Renyi divergence between the prescribed target and the terminal distribution obtained by unconstrained growth maximization; the Kullback-Leibler limit is recovered as the trade-off parameter tends to zero.

## Method

Each cell state follows a controlled diffusion with passive drift $f$, regulatory control $v$, and noise covariance $\Sigma$. The cell's division rate is modeled to second order in control, with a negative-definite quadratic term $h$. Dynamic programming gives the optimal control from a future-reward field $w$. The substitution $\psi=w^{1+1/\alpha}$ linearizes the resulting nonlinear equation when

$$
h\Sigma=-\alpha I.
$$

Under this condition, $v^*=(1+\alpha)^{-1}\Sigma\nabla\log\psi$, hence the control is gradient flow on a time-dependent potential. A companion forward field $\hat\psi$ gives the unnormalized controlled density as

$$
\rho=\hat\psi\,\psi^{1/(1+\alpha)}.
$$

For an initial delta distribution, the terminal constraint determines $\psi$ explicitly from the target density and the uncontrolled transition density. The paper then compares constrained optimal growth with growth maximization that imposes no terminal distribution.

## Experiments

The paper provides an analytical and numerical illustration rather than an empirical biological evaluation. A one-dimensional Ornstein-Uhlenbeck-like state process starts at $g=0$ and must reach a two-Gaussian mixture representing fast- and slow-growing cell types. The computed landscape is smooth and undergoes a saddle-node bifurcation from one stable state to two at about $t/T=0.8$ in the displayed setting. Simulated terminal samples match the specified mixture. With a small control-cost parameter $\alpha$, the instantaneous growth curves show a distinct early growth phase followed by late differentiation.

## Limitations

- Growth maximization is assumed to be the regulatory objective. The paper argues this may suit microbial bet hedging or wound healing, but not development generally, where robustness, evolvability, or unknown constraints may dominate.
- The central condition $h\Sigma=-\alpha I$ requires a full-rank noise covariance, state-independent control-cost tensor, and a single scale linking noise to regulatory cost. The authors state that living systems need not satisfy it.
- Cells are noninteracting, and the model omits intercellular communication, spatial structure, and mechanics.
- Existence of solutions for arbitrary initial and terminal distributions is not established for the general growing-population equations; deriving a Sinkhorn-like procedure is left open.
- The illustrative model is one-dimensional and synthetic. It does not test inferred landscapes or growth bounds against experimental lineage or single-cell data.
- The framework clarifies conditions for a transport-based potential landscape; its noise-cost relation is not a claim about microscopic irreversibility.

## Related Concepts

- [[concepts/waddington-epigenetic-landscapes|Waddington Epigenetic Landscapes]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]
- [[concepts/stochastic-thermodynamics|Stochastic Thermodynamics]]

## Related Papers

- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: also connects transport geometry to learned distributional dynamics, but targets generative modeling rather than growing cell populations.
- [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]]: studies when transport costs beyond the standard quadratic form generate a prescribed gradient-flow limit.

[[index|Library home]]
