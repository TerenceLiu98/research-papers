---
title: "Graphon games: A statistical framework for network games and interventions"
type: paper
authors:
  - Francesca Parise
  - Asuman Ozdaglar
year: null
tags:
  - network-games
  - graphons
  - targeted-interventions
---

## TL;DR

A continuum game indexed by a graphon approximates equilibria of large sampled networks under regularity and contraction conditions. For linear-quadratic games, the same framework yields asymptotically optimal interventions without observing every edge. Finite-rank structure reduces the intervention problem to a small spectral optimization.

## Research Question

Can a stochastic network formation model replace a realized adjacency matrix when predicting strategic behavior and allocating welfare-improving interventions?

## Motivation

Individual-level network interventions require costly relational data and optimization whose dimension grows with population size. Graphons retain heterogeneous interaction patterns while allowing equilibrium analysis and policy design at the level of population types.

## Contributions

- Defines continuum graphon games and establishes conditional equilibrium existence, uniqueness, and continuity.
- Embeds finite network games as step-function graphon games and proves high-probability approximation bounds and almost-sure equilibrium convergence for sampled networks.
- Derives asymptotically optimal graphon interventions for linear-quadratic strategic-complement games, including a finite-rank computational reduction.
- Demonstrates intervention design using aggregated relational data and census information in simulated villages.
- Extends the framework to suitably sparse networks, degree-normalized interactions, directed networks, and incomplete information.

## Method

An agent indexed by $x\in[0,1]$ chooses $s(x)$ with payoff $U(s(x),z(x),\theta(x))$, where

$$
z(x)=\int_0^1 W(x,y)s(y)\,dy.
$$

Equilibrium is a fixed point of the graphon aggregation operator followed by best response. Strong concavity in own action and Lipschitz sensitivity to the aggregate give a contraction when $(\ell_U/\alpha_U)\lambda_{\max}(\mathbb W)<1$ in the symmetric setting. Existence also has a separate compactness-based argument. Piecewise Lipschitz regularity and concentration of sampled graph operators then transfer equilibrium stability to finite networks (Sections 2–5).

For sparse sampling, edges have probability $\kappa_N W(t^i,t^j)$ and neighbor sums are normalized by $N\kappa_N$. The convergence regime requires $N\kappa_N/\log N\to\infty$; it does not include bounded expected degree. Degree normalization additionally requires a positive lower bound on graphon degrees. Directed extensions use operator norms rather than the symmetric spectral characterization.

The planner changes standalone marginal returns in

$$
U(s,z,\theta+\hat\theta)=-\tfrac12s^2+s(\alpha z+\theta+\hat\theta)
$$

subject to a squared intervention budget. Under the stated positivity and spectral conditions, equilibrium welfare is half the squared equilibrium norm. Sampling and rescaling an optimal continuum intervention yields a feasible finite intervention with a vanishing welfare gap, provided the optimal intervention is bounded and piecewise Lipschitz (Theorem 6).

A rank-$R$ graphon reduces the continuum optimization to $R+1$ coefficients: its nonzero eigendirections plus the component of baseline returns in the operator kernel. The block-constant case study reduces further to four community variables (Section 6.2).

Appendix C establishes exact equivalence with symmetric Bayesian Nash equilibrium for the specified linear-quadratic incomplete-information model. For more general Lipschitz payoffs, it establishes an approximate equilibrium under additional assumptions. Appendix D proposes equilibrium-matching parameter estimation conditional on identifiability.

## Experiments

Section 7 simulates 80 independent four-community networks for each population size. The planner estimates block interaction probabilities from aggregated relational surveys and uses census information on community membership, baseline strategies, and standalone marginal returns. This is synthetic evidence, not an intervention conducted in real villages.

Mean welfare improvement relative to an equal-allocation intervention (Table 1):

| Policy | N = 300 | N = 600 | N = 1200 |
| --- | --- | --- | --- |
| Network optimal | 25.6% | 23.0% | Not computed |
| Graphon optimal | 22.8% | 20.8% | 20.6% |
| Dominant-eigenvector network heuristic | 12.6% | 4.5% | 2.8% |
| Average degree | 18.5 | 21.6 | 24.9 |

The graphon policy approaches the computed network optimum and exceeds the heuristic on average. The heuristic can perform worse than equal allocation in individual realizations. The authors could not obtain the full network optimum for $N\geq1000$ with their implementation; this is a reported computational limitation, not an impossibility result.

## Limitations

The approximation guarantees depend on payoff regularity, spectral contraction, graphon regularity, and appropriate sampling and normalization. Intervention tractability relies on finite rank; asymptotic optimality also assumes regularity of the optimizer. The case study assumes a known four-community model class, observable community identities and baseline returns, and noiseless data for the detailed-network regression. Aggregated surveys reduce edge-information requirements but do not eliminate census or model-estimation requirements. General peer-effect identification remains conditional on identifiability.

The supplied manuscript does not state its publication year or a definitive identifier for this version; the year is left unset. Its references identify an earlier 2018 “Graphon games” preprint, which is not treated as version metadata here.

## Related Concepts

- [[concepts/graphons|Graphons]]: continuum interaction kernels and stochastic network formation.
- [[concepts/network-games|Network Games]]: strategic actions coupled through local aggregates.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: related dynamic models with graphon-weighted state distributions; the present core framework concerns static aggregative games.
- [[concepts/finite-state-graphon-games|Finite-State Graphon Games]]: controlled state-transition models, distinct from the continuous-action static formulation here.

## Related Papers

- [[papers/what-is-a-graphon|What Is ... a Graphon?]]: mathematical background on graph-limit representations.
- Galeotti et al. (2017), “Targeting interventions in networks”: the detailed-network intervention benchmark and spectral heuristic discussed in this manuscript.
