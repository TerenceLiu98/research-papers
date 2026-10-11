---
title: Contagion in graphons
type: paper
authors:
  - Selman Erol
  - Francesca Parise
  - Alexander Teytelboym
year: 2023
doi: 10.1016/j.jet.2023.105673
tags:
  - graphons
  - social-contagion
  - optimal-seeding
  - stochastic-block-models
---

## TL;DR

A continuum threshold process on a [[concepts/graphons|graphon]] predicts contagion in large networks sampled from that graphon under regularity and strict-margin conditions. This enables seeding based on the network formation model: stochastic block models reduce to a small auxiliary network, while selected continuous-type models admit analytical solutions for interval seeds. Threshold ties remain a source of unresolved finite-network behavior.

## Research Question

Can statistical knowledge of network formation predict who becomes infected and guide effective seeding without observing every realized link in a large network?

## Motivation

Deterministic [[concepts/threshold-contagion|threshold contagion]] is sensitive to seed placement, and selecting seeds in a large realized network is computationally difficult. Detailed network data may also be unavailable. Graphons represent interaction probabilities across heterogeneous types, allowing the planner to study a continuum population before implementing a policy in sampled networks.

## Contributions

- Defines irreversible threshold contagion for a continuum of labels and establishes high-probability approximation results for sampled networks, including fixed-time infected and exposed sets.
- Formulates max-reach and min-seed optimization, distinguishing achieved optima from limit-optimal seeds when a strict threshold prevents attainment.
- Represents contagion in a stochastic block model with $k$ communities and community-specific thresholds by a weighted auxiliary network with $2k$ nodes. Seeding decisions then involve $k$ community allocations rather than individual choices among $n$ agents.
- Characterizes interval contagion through endpoint dynamics and derives interval-seeding solutions for structured graphons, including growing uniform attachment and a location model.

## Method

Sample labels $u_i$ independently and uniformly from $[0,1]$, then realize links with Bernoulli probabilities $W(u_i,u_j)$. The framework allows asymmetric interaction kernels. For the continuum process, define

$$
d(u,X)=\int_X W(u,v)\,dv,\qquad d(u)=d(u,[0,1]).
$$

Starting with a measurable seed set $C_0$, update

$$
C_t=C_{t-1}\cup\{u:d(u,C_{t-1})>\tau(u)d(u)\},
\qquad C_\infty=\bigcup_{t\geq0}C_t.
$$

Infection is permanent and equality does not trigger adoption. Sampled agents inherit thresholds from their labels and are seeded when their labels belong to $C_0$.

**Approximation.** Theorem 1a predicts infection for labels in a subset of $C_\infty$ whose omitted measure can be made arbitrarily small as population size increases. Theorem 1b predicts noninfection on strictly cohesive subsets $D$ of the uninfected region, satisfying $d(u,D^c)<\tau(u)d(u)$ for every $u\in D$. Full outcome approximation requires the remaining unresolved region to have zero measure. Appendix A extends the main continuity assumptions to specified piecewise-continuous kernels and thresholds, accommodating block models. Its fixed-time propositions give infection and exposure inclusion guarantees, rather than an unconditional uniform-in-time error bound.

**Seeding.** With reach $f(C_0)=\mu(C_\infty)$, max-reach takes the supremum of $f$ subject to $\mu(C_0)\leq\rho$; min-seed takes the infimum of seed measure subject to $f(C_0)\geq m$. The full-contagion infimum is called resilience. A limit-optimal seed is the intersection of decreasing feasible seed sets whose measures approach the infimum; that intersection need not itself achieve the target.

**Finite types.** Split each community into initially seeded and unseeded parts to form the $2k$ auxiliary nodes. Edges weight block connection probabilities by the mass of the influencing part. Unseeded members of a community adopt together, and continuum contagion settles within $k$ iterations. Optimize community seed masses $c_i$ with $0\leq c_i\leq\pi_i$, then randomly select the corresponding numbers of agents within each sampled community (Section 6).

**Continuous types.** Under interval preservation, the infected interval evolves through two endpoint cutoff functions. Normalized homophily supplies a sufficient condition for this structure. With the additional single-crossing property, outcomes are no expansion, expansion to the left boundary only, expansion to the right boundary only, or complete contagion. The resulting optimization concerns interval seeds; it does not establish unrestricted optimality over arbitrary measurable seeds (Section 7; Appendix B).

## Experiments

The evidence combines mathematical results with synthetic network simulations; no empirical network dataset is used.

- **Constant graphon:** Figure 1 averages 50 realizations per setting. Larger sampled networks increasingly resemble the continuum transition from no further spread to complete contagion as seed mass exceeds the common threshold.
- **Five-community dynamics:** Figure 7 uses $\tau=0.16$ and $C_0=[0,0.1]$, seeding half of community 1. Ten repetitions at each network size illustrate increasing agreement with the graphon trajectory.
- **Block-model seeding:** Section 6.3 uses a total budget of 6% of the population, allocating 4% to community 1 and 2% to community 4. Across 300 sampled networks per population size, Figure 8 reports medians and quantiles. The authors report reach tightly concentrated near one for $n>100$ under this policy, whereas greedy marginal-gain and uniform random policies deteriorate with size in this example.
- **Continuous-type examples:** Growing uniform attachment, $W(u,v)=1-\max\{u,v\}$, is evaluated over 50 networks per size; the location kernel, $W(u,v)=\min\{u,v\}(1-\max\{u,v\})$, over 20. Figures 11 and 13 compare graphon-based, greedy, and random seeding using medians and 0.2-to-0.8 quantiles. For the attachment example, $\tau=0.75$ and comparator seed counts match the graphon policy in each realization.

## Limitations

- The approximation concerns networks sampled from a fixed dense graphon model. It does not supply a corresponding guarantee for arbitrary sparse or misspecified networks.
- Labels exactly at a threshold can remain unresolved even asymptotically. In the constant-graphon example, seed mass equal to the threshold is the critical exception.
- The planner needs the relevant interaction model, thresholds, and community or label information. The paper does not estimate these inputs from noisy observations.
- Computational reductions rely on block structure or additional continuous-type regularity. A $k$-variable optimization is useful when $k$ is small, but is not a general efficient algorithm for every graphon.
- Interval-seeding restrictions and the distinction between an infimum and an attained minimum matter at critical budgets. Simulation success in selected examples is not a universal finite-network optimality guarantee.
- The supplied Markdown contains Appendices A and B and references supplementary proofs in Appendix C and a random-threshold example in Appendix D, neither of which is included. Several displayed expressions have extraction artifacts; the summary avoids relying on ambiguous boundary formulas.

## Related Concepts

- [[concepts/graphons|Graphons]]: represent both a stochastic formation model and a continuum interaction kernel.
- [[concepts/threshold-contagion|Threshold Contagion]]: the irreversible adoption rule, cohesive nonadopting sets, and seed-budget problems.
- [[concepts/network-games|Network Games]]: threshold dynamics connect to binary coordination, beyond smooth games with unique equilibria.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: a related approach to modeling heterogeneous link probabilities; this paper assumes its block-model inputs are given.

## Related Papers

- Granovetter (1978), "Threshold models of collective behavior": foundational threshold formulation cited by the authors.
- Morris (2000), "Contagion": cohesive sets underpin the noninfection argument.
- Jackson and Storms (2019), "Behavioral communities and the atomic structure of networks": related analysis of binary coordination in stochastic block models.
- Parise and Ozdaglar (2023), "Graphon games: a statistical framework for network games and interventions": related continuum approximation and intervention framework; its smooth-game assumptions do not directly cover these discrete dynamics.

[[index|Library home]]
