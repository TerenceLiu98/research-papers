---
title: Controlling percolation with limited resources
type: paper
authors:
  - Malte Schröder
  - Nuno A. M. Araújo
  - Didier Sornette
  - Jan Nagler
year: 2017
doi: 10.1103/PhysRevE.96.062302
tags:
  - percolation
  - network-control
  - phase-transitions
---

## TL;DR

Selective rejection of rare, large cluster mergers delays random-network percolation with a small intervention budget. In the constant-cost model, tuning control so that the budget lasts exactly to the transition maximizes delay but produces a discontinuous onset of connectivity. Exhausting resources earlier leaves a continuous transition in the random-percolation universality class.

## Research Question

How should a finite budget be allocated to delay giant-component formation, and how does that control change the nature of the transition?

## Motivation

Competitive percolation rules implicitly permit indefinite intervention. Real control must balance the benefit of rejecting a link now against preserving resources for later, consequential mergers. Delaying connectivity can also accumulate the conditions for an abrupt transition.

## Contributions

- Introduces a budget-constrained rejection protocol based on the rarity of a proposed merger's resulting cluster size.
- Relates budget exhaustion to transition order and estimates efficient intervention parameters using an effective rejection rate.
- Demonstrates that optimal timing depends on intervention costs: later intervention can help with constant costs, while cluster-size-dependent costs favor early action in the reported extensions.

## Method

Start with $N$ isolated nodes and sample links uniformly at random. Accepted links define density $p=L/N$; rejected links consume budget but do not increase $p$. The main model uses cost $c=1$ and budget $B=bN$. Track the largest-component fraction $S_1/N$.

For a proposed merger of size $S_{ij}=S(i)+S(j)$, estimate the probability $q$ that another sampled link would merge clusters into a component at least that large. Equation 1 uses the current cluster-size distribution, accounting separately for equal-size and unequal-size cluster pairs. Reject the proposed link when $q<\epsilon$, provided resources remain. The reciprocal $1/q$ approximates the waiting time for a similarly large merger; spending resources on rare events should therefore buy more delay.

The realized rejection rate fluctuates as new cluster sizes appear. The authors approximate it by an empirical effective rate, giving the budget relation

$$
b\approx\int_{p_{\mathrm{start}}}^{p_{\mathrm{last}}}
\frac{\epsilon_{\mathrm{eff}}(p)}{1-\epsilon_{\mathrm{eff}}(p)}\,dp.
$$

Setting exhaustion at the threshold estimates efficient control parameters. The optimality argument concerns the studied protocol and objective, not a proof over all possible policies. Appendix D reverses the rarity criterion to accelerate percolation and again finds exhaustion at the threshold most effective.

## Experiments

Numerical experiments study random network growth, budget and intensity sweeps, delayed intervention starts, and finite-size scaling (Sections I and Appendices A–C).

| Setting | Reported finding |
| --- | --- |
| $b=0.05$, $\epsilon=0.1$, $N=2^{25}$ | Threshold shifts from $0.5$ without control to approximately $0.67$; transition remains continuous (Figure 2). |
| $\epsilon=0.1$, budget sweep | Estimated critical budget $b_c\approx0.058$; simulations show continuous transitions at $b\leq0.05$ and discontinuous ones at $b\geq0.06$ (Figure 3). |
| $b=0.05$, intensity/start-time sweep | Optimal parameter combinations reach approximately $p_c=0.72$, about one rejection per 15 accepted links; $N=2^{20}$, 128 realizations (Figure 4). |
| Finite-size analysis | Sizes $2^{20}$–$2^{30}$ with 1,024–64 realizations support random-percolation exponent ratios near $-1/3$ and $1/3$ for continuous cases (Table I, Figure 7). |
| Product-rule comparison | At approximately matched rejection budget $b=0.88$, the proposed rule with $\epsilon=0.62$ delays onset further while retaining a continuous random-percolation transition (Appendix A). |

For discontinuous cases the largest single-link jump remains macroscopic as system size grows. The mechanism resembles a progressively relaxed cluster-size cap: suppressing large mergers until the threshold removes the uncontrolled interval that otherwise restores continuous behavior.

## Limitations

- Evidence concerns an idealized uniformly growing random graph, not empirical financial, epidemic, or infrastructure interventions.
- The protocol uses current cluster-size information. “Limited observability” is modeled through delayed intervention onset, rather than noisy or incomplete component measurements.
- The effective-rate approximation is empirical and becomes less accurate for large intervention intensities, late starts, and very small budgets.
- Constant intervention cost is consequential. The paper reports that size-dependent costs require superlinear budgets for discontinuity; a linear budget does not imply the same result under those costs.
- Supplemental comparisons of alternative costs and strategies are referenced but are not included in the supplied Markdown. The parsed equations contain extraction artifacts; the summary retains only unambiguous relations.

## Related Concepts

- [[concepts/resource-limited-percolation-control|Resource-Limited Percolation Control]]: allocates finite intervention resources during network growth.
- [[concepts/induced-percolation|Induced Percolation]]: offers a distinct route to discontinuous connectivity through support-dependent pruning.

## Related Papers

- [[papers/indirect-influence-in-social-networks-as-an-induced-percolation-phenomenon|Indirect influence in social networks as an induced percolation phenomenon]]: a library comparison of transition mechanisms; its discontinuity depends on support rules and directionality, rather than budget exhaustion. This is not a citation in the 2017 source.
- Achlioptas, D’Souza, and Spencer, *Science* 323, 1453 (2009): cited as the product-rule comparator, which rejects one candidate per accepted link.

Source: *Physical Review E* 96, 062302, published 4 December 2017; DOI: 10.1103/PhysRevE.96.062302.
