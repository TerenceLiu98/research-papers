---
title: How Bad is Forming Your Own Opinion?
type: paper
authors:
  - David Bindel
  - Jon Kleinberg
  - Sigal Oren
year: 2014
tags:
  - opinion-dynamics
  - game-theory
  - network-design
---

## TL;DR

Interpreting anchored opinion averaging as a game reveals a sharp distinction between reciprocal and asymmetric influence. Equilibrium social cost is at most 9/8 of optimal on undirected networks, but the ratio can grow polynomially with network size on directed networks, even with bounded degree. Carefully chosen additional ties can reduce equilibrium cost.

## Research Question

How inefficient is individually optimal opinion formation relative to jointly minimizing disagreement and deviation from internal beliefs, and which network changes reduce that inefficiency?

## Motivation

Consensus-based averaging omits persistent internal beliefs. Friedkin–Johnsen averaging retains those beliefs and can sustain disagreement. A quadratic cost interpretation makes it possible to measure the externality of individual compromise: a player ignores part of the cost her expressed opinion imposes on others.

## Contributions

- Proves a tight 9/8 price-of-anarchy bound for undirected weighted networks, including extensions with heterogeneous anchoring weights and fixed opinion sources (Section 3).
- Characterizes worst-case internal opinions through Laplacian eigenvectors; extends computation to directed graphs using a generalized eigenvalue problem (Theorem 4.2).
- Gives unbounded directed examples and degree- and expansion-dependent bounds for unweighted Eulerian networks (Section 4).
- Establishes hardness for constrained edge additions, a 9/4 approximation through reciprocating edges, and polynomial-time optimization of additional weight on one specified edge (Section 5).

## Method

Player i chooses an expressed opinion z_i with fixed internal opinion s_i and cost

$$
c_i(z)=(z_i-s_i)^2+\sum_j w_{ij}(z_i-z_j)^2.
$$

An edge i → j means i listens to j. Best response is the weighted average of s_i and neighbors’ expressed opinions. With L = D − W, simultaneous averaging is a contraction and converges to the unique equilibrium x = (I + L)⁻¹s. Social cost is the sum of individual costs, so an undirected edge contributes twice.

For undirected networks, c(z) = ‖z − s‖² + 2zᵀLz and the social optimum is y = (I + 2L)⁻¹s. Simultaneously diagonalizing the equilibrium and optimum cost forms bounds c(x)/c(y) by 9/8. Equality requires a nonzero component in the Laplacian eigenvalue-1 eigenspace, with optional constant shifts on connected components.

For directed networks, the social-cost matrix A is the Laplacian of the symmetrized weights w_ij + w_ji. The equilibrium and optimum costs remain quadratic forms in s, but no longer share a simple spectral basis. Restricting to nonconstant opinions permits generalized eigenvalue maximization, component by component when necessary.

Adding edges increases the cost at every fixed opinion profile and cannot lower optimal social cost. It can nevertheless move the equilibrium enough to lower its cost. The improvement factor is bounded by the original price of anarchy. For one weighted edge, a Sherman–Morrison update reduces optimization to a scalar quadratic over a bounded transformed interval, including its infinite-weight limit.

## Experiments

The evidence consists of proofs and constructed examples; no empirical dataset or benchmark experiment is reported.

| Setting | Result |
| --- | --- |
| Three-node undirected path, internal opinions 0, 1/2, 1 | Equilibrium cost 3/8 versus optimum 1/3; ratio 9/8 |
| Directed star with n−1 followers | Equilibrium cost (n−1)/2; optimum at most 1 |
| Bounded-degree tree oriented toward root | Polynomially growing price of anarchy; branching factor 8 gives Θ(n^(1/3)) |
| Unweighted Eulerian graph | Price of anarchy at most Δ + 1, with Δ the maximum in-degree/out-degree |
| Directed cycle | Worst-case ratio approaches 2 as size grows |

Hardness results cover adding edges from a specified node when its cost is excluded, adding edges to a specified node, and selecting exactly k arbitrary edges. Adding missing reverse edges gives the 9/4 approximation for unrestricted additions.

## Limitations

The welfare measure is quadratic dissonance, not factual accuracy or a validated measure of human well-being. Internal opinions are fixed, influence weights are nonnegative, and expressed opinions are scalar. Directed results use uniform anchoring weights; heterogeneous weights can cause unbounded inefficiency even with two nodes. The paper leaves open exact hardness for unrestricted, unbudgeted edge additions and whether an Eulerian graph can have price of anarchy above 2. The year records the supplied manuscript date, June 10, 2014; no publication venue or identifier is inferred.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: persistent anchoring prevents averaging from necessarily reaching consensus.
- [[concepts/price-of-anarchy|Price of Anarchy]]: measures the social-cost gap between individual equilibrium and collective optimization.

## Related Papers

- Friedkin and Johnsen (1990), “Social influence and opinions” (reference 15), supplies the anchored averaging model.
- DeGroot (1974), “Reaching a consensus” (reference 12), supplies the earlier repeated-averaging framework.
- [[papers/social-power-games-for-parallel-friedkin-johnsen-models|Social Power Games for Parallel Friedkin-Johnsen Models]] studies strategic stubbornness allocation to maximize influence; here players choose expressed opinions to minimize dissonance.
