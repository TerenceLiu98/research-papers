---
title: Opinion Dynamics on Signed Graphs and Graphons
type: paper
authors:
  - Raoul Prisant
  - Federica Garin
  - Paolo Frasca
year: null
arxiv: "2404.08372"
tags:
  - graphons
  - signed-networks
  - opinion-dynamics
  - continuum-limits
  - sparse-random-graphs
---

## TL;DR

Repelling and opposing [[concepts/opinion-dynamics|opinion dynamics]] on large signed networks admit well-posed continuum formulations on signed [[concepts/graphons|graphons]]. Explicit finite-to-continuum error bounds imply almost-sure convergence for graphon-sampled signed graphs whose expected average degree grows faster than $\log n$, after scaling interaction speed by the inverse expected degree.

## Research Question

When do opinion trajectories on large, possibly sparse signed graphs approximate continuum dynamics on a signed graphon, for both repelling and opposing models of antagonistic interaction?

## Motivation

Negative ties can make opinions diverge or move toward opposite values, so results for nonnegative consensus dynamics do not directly apply. Graphons offer an analytic representation of large networks, but their relevance to signed opinion systems requires well-posed continuum equations, quantitative approximation bounds, and sampling conditions that include networks sparser than the usual dense graphon regime.

## Contributions

- Defines graphon versions of the repelling model and the opposing, or Altafini, model and proves existence and uniqueness of classical solutions for bounded signed kernels and bounded initial opinions.
- Bounds the $L^2$ trajectory error between finite signed-graph dynamics and graphon dynamics using initial-condition error, graphon operator-norm error, and the sampled graph's maximum absolute degree.
- Proves operator-norm convergence for graphon-sampled graphs under minimal graphon regularity with stochastic latent variables and under almost-everywhere continuity with deterministic latent variables.
- Establishes almost-sure upper and lower degree bounds for sampled graphs, allowing the approximation theorem to cover sparsity parameters $\varepsilon_n=\omega(\log n/n)$.
- Combines these results into almost-sure, uniform-on-bounded-time convergence of both signed opinion models when $\alpha_n=(n\varepsilon_n)^{-1}$.

## Method

A signed graph has symmetric weights in $\{-1,0,1\}$. Positive edges attract opinions. Under the repelling rule, a negative edge reverses the sign of the difference term and pushes neighboring states apart. Under the opposing rule, a negative neighbor attracts an agent toward the neighbor's sign-reversed state.

The continuum network is a symmetric measurable kernel $W:[0,1]^2\to[-1,1]$. For an opinion field $u(x,t)$, the repelling model is

$$
\partial_t u(x,t)=\int_0^1 W(x,y)\bigl(u(y,t)-u(x,t)\bigr)\,dy,
$$

while the opposing model is

$$
\partial_t u(x,t)=\int_0^1W(x,y)u(y,t)\,dy
-u(x,t)\int_0^1|W(x,y)|\,dy.
$$

Finite graphs are embedded as step-function graphons. Their interaction speed $\alpha_n$ appears in the effective kernel as $n\alpha_nW_n$. Energy estimates and Gronwall's inequality bound the trajectory discrepancy in terms of $\|g-g_n\|_2$, the operator-norm discrepancy between the effective finite kernel and $W$, and $n\alpha_n\|d_{|W_n|}\|_\infty$. For the opposing model, positive and negative kernel parts are controlled separately.

For sampled graphs, an edge between latent positions $X_i$ and $X_j$ receives sign $\operatorname{sign}W(X_i,X_j)$ and is present with probability $\varepsilon_n|W(X_i,X_j)|$. Concentration bounds yield operator-norm convergence and control maximum and average degrees. Choosing $\alpha_n=(n\varepsilon_n)^{-1}$ normalizes influence by the expected degree and keeps the error-bound factors finite.

## Experiments

The paper provides an illustrative simulation rather than an empirical evaluation. It plots the $L^2$ approximation error over time for both dynamics across graph sizes and sparsity choices. Error decreases with graph size and is smaller for larger $\varepsilon_n$. In the chosen example, repelling trajectories and their approximation errors can grow without bound, whereas opposing trajectories converge to zero and their errors eventually decline. The displayed behavior is consistent with the theoretical sampling fluctuation rate $O((n\varepsilon_n)^{-1/2})$ identified in the proof.

## Limitations

- Convergence is established on every fixed bounded time interval; it does not provide a uniform-in-time approximation or characterize long-run graphon dynamics.
- The models are linear, use scalar opinions, symmetric networks, and static interaction kernels.
- Stochastic latent variables permit measurable graphons, but deterministic latent variables require the graphon and initial condition to be almost everywhere continuous, with the initial condition also bounded.
- The main sampled-graph result assumes nonzero interaction mass and $\varepsilon_n=\omega(\log n/n)$; it does not cover bounded expected degree or arbitrary observed sparse networks.
- The simulations illustrate the theory in one constructed setting and do not test empirical social-network data.

## Related Concepts

- [[concepts/graphons|Graphons]]: continuum kernels, step-function graph embeddings, and sampled finite networks used in the approximation argument.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: the broader family containing the repelling and opposing signed-interaction models.
- [[concepts/political-polarization|Political Polarization]]: a possible social outcome associated with antagonistic influence, although this paper proves approximation rather than empirical polarization claims.
- [[concepts/social-trust-networks|Social Trust Networks]]: networks where positive and negative relations encode trust and antagonism.

## Related Papers

- [[papers/what-is-a-graphon|What Is ... a Graphon?]]: introduces graphons as limits of large finite graphs and explains graphon sampling.
- [[papers/contagion-in-graphons|Contagion in graphons]]: studies a different social dynamic on graphons and gives qualified finite-network approximation results.
- [[papers/a-unified-view-on-neural-message-passing-with-opinion-dynamics-for-social-networks|A Unified View on Neural Message Passing with Opinion Dynamics for Social Networks]]: connects attractive and repulsive opinion interactions to graph message passing.
- Medvedev (2014), "The nonlinear heat equation on dense graphs and graph limits": a foundational continuum-limit analysis whose $L^2$ kernel control is strengthened here to operator-norm control for sampled graphs.
- Prisant, Garin, and Frasca (2024), "Opinion dynamics on signed graphs and graphons: Beyond the piece-wise constant case": the authors' preliminary conference account, extended here with sparse sampling and interaction-speed parameters.

[[index|Library home]]
