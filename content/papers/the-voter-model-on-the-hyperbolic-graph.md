---
title: The voter model on the hyperbolic graph
type: paper
authors:
  - John Fernley
  - Christian Hirsch
year: 2026
tags:
  - stochastic-processes
  - network-science
  - opinion-dynamics
---

## TL;DR

On the giant component of a sparse hyperbolic random graph, the standard voter model has quenched expected consensus time of order $n^{2-1/\alpha}$ in probability. Degree-dependent update rates produce three consensus regimes, including a critical $n/\log n$ law. The proof establishes mean-field consensus orders despite spatial structure and slow mixing.

## Research Question

How do hyperbolic network geometry and degree-dependent copying rates determine the time to consensus, and when does the heterogeneous mean-field prediction remain valid?

## Motivation

Degree heterogeneity can accelerate consensus, but a degree-based prediction alone does not control spatial bottlenecks or repeated encounters of ancestral random walks. Hyperbolic graphs combine heavy-tailed degrees, clustering, and a polynomially small spectral gap, testing the prediction beyond expander-like networks.

## Contributions

- Theorem 1.6 gives matching asymptotic orders for every fixed update exponent $\varphi\geq0$ in the sparse regime $1/2<\alpha<1$.
- Product-chain electrical flows bound the probability that two walkers mix before meeting again, converting stationary return estimates into meeting-time bounds.
- A critical aggregate flow combines many degree-ranked sources to obtain the logarithmic improvement at the transition.
- Appendix A establishes giant-component degree-moment estimates supporting all three regimes.

## Method

The Poissonised graph has mean vertex count $n$, radius $R=2\log(n/\nu)$, fixed $\nu>0$, and edges between points at hyperbolic distance less than $R$. Work is restricted to its giant component $\mathcal G$. A vertex $v$ copies a uniformly chosen neighbour at total rate $d(v)^\varphi$, giving dual generator and stationary law

$$
Q_{vw}=d(v)^{\varphi-1}\mathbf1_{v\sim w},\qquad
\pi(v)=\frac{d(v)^{1-\varphi}}{M_{1-\varphi}},\qquad
M_s=\sum_{v\in\mathcal G}d(v)^s.
$$

The [[concepts/voter-model|Voter Model]] duality relates consensus to coalescing ancestral random walks. The candidate time scale is

$$
\left(\sum_v\pi(v)^2d(v)^\varphi\right)^{-1}
=\frac{M_{1-\varphi}^2}{M_{2-\varphi}}.
$$

A stationary meeting-time inequality supplies the lower bound. For $\varphi\leq2-2\alpha$, the authors short the meeting diagonal in the two-walker electrical network and construct finite-energy flows to a fixed target. Separated multiscale flows prevent premature diagonal returns; delayed target hitting ensures mixing before remeeting. At criticality, harmonic weighting over a polynomial family of sources yields energy $O(n/\log n)$. Above criticality, a random-target hitting-time bound yields an $O(n)$ coalescence bound instead.

## Experiments

This is a theoretical paper; it reports proofs rather than an empirical benchmark. Figure 1 illustrates graph realisations, not consensus-time validation.

For independent Bernoulli($u$) initial opinions with fixed $u\in(0,1)$, Theorem 1.6 gives:

| Update exponent | Order of $\mathbb E_{\mu_u}[T_{\mathrm{cons}}\mid\mathcal G]$ | Graph-probability guarantee |
| --- | --- | --- |
| $0\leq\varphi<2-2\alpha$ | $n^{2-1/\alpha+\varphi/(2\alpha)}$ | Two-sided order in probability |
| $\varphi=2-2\alpha$ | $n/\log n$ | Two-sided order with high probability |
| $\varphi>2-2\alpha$ | $n$ | Two-sided order with high probability |

In the first row, bounding constants may depend on an arbitrarily small allowed exceptional probability. The latter rows use fixed constants with probability tending to one. These are quenched expectations, not exact constants or graph-averaged expectations. Increasing the update exponent reduces hub influence through $\pi(v)$ and removes the sublinear consensus advantage.

## Limitations

The theorem assumes fixed $\alpha\in(1/2,1)$, $\nu>0$, $\varphi\geq0$, and nondegenerate independent initial opinions. It does not establish the same result for arbitrary initial configurations, other geometric graph models, or parameter sequences approaching regime boundaries. On the disconnected full graph, absorption means componentwise consensus. The paper explicitly notes that mixing faster than the proposed consensus scale does not alone guarantee a mean-field law on general random graphs.

## Related Concepts

- [[concepts/voter-model|Voter Model]] — copying dynamics and ancestral-walk duality.
- [[concepts/hyperbolic-random-graphs|Hyperbolic Random Graphs]] — spatial heavy-tailed network environment.

## Related Papers

- Sood, Antal, and Redner (2008), *Voter models on heterogeneous networks* [SAR08] — heterogeneous mean-field prediction tested here.
- Kiwi, Schepers, and Sylvester (2024), *Cover and hitting times of hyperbolic random graphs* [KSS24] — resistance flows and random-target estimates adapted by the proof.
- Fernley (2025), *The phase transition of the voter model on evolving scale-free networks* [Fer25] — related escape-before-remeeting argument on dynamic networks.

Source: supplied manuscript dated September 2, 2026; ingestion job `58073ed8-afa3-4541-b8de-e96195afcc09`. No identifier for this paper is stated in the supplied text.
