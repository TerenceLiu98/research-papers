---
title: Indirect influence in social networks as an induced percolation phenomenon
type: paper
authors:
  - Jiarong Xie
  - Xiangrong Wang
  - Ling Feng
  - Jin-Hua Zhao
  - Wenyuan Liu
  - Yamir Moreno
  - Yanqing Hu
year: 2022
tags:
  - percolation
  - social-contagion
  - network-dynamics
  - critical-transitions
---

## TL;DR

Across four scientific collaboration networks, persistence in an established research field is more strongly associated with an indirect-neighbor index than with the direct-neighbor measures examined. Motivated by this pattern, the authors introduce [[concepts/induced-percolation|induced percolation]]: an active neighbor sustains a node only if that neighbor has enough active contacts of its own. The studied model has continuous transitions on undirected networks, discontinuous transitions on directed networks for threshold $m>1$, and hybrid transitions in mixed networks.

## Research Question

How can influence mediated by neighbors' neighbors be represented as a percolation process, and how does link directionality change its macroscopic transitions?

## Motivation

Direct-neighbor counts do not distinguish a collaborator embedded in an active research community from one with little support in that community. An indirect index captures this difference. The paper asks whether such a local mechanism changes the survival of large connected active populations, beyond what direct-interaction percolation models describe.

## Contributions

- Defines an empirical induced index and compares its association with research-field persistence against direct active-neighbor counts and neighbor-degree measures.
- Introduces a deterministic pruning process governed by a supporting neighbor's active neighborhood, with self-consistency equations for directed and undirected random networks and a multilayer treatment of mixed links.
- Shows directionality-dependent transition order in the studied networks, including coexistence of continuous onset and a discontinuous jump for mixed networks.
- Reports nonmonotonic small-cluster size distributions near undirected criticality, without changing the asymptotic power-law behavior or the reported critical exponents.

## Method

**Empirical measures.** Coauthorship defines an undirected edge. Scientists with at least two old-field publications in APS, or five in Web of Science, and no new-field publications are labeled focused scientists, or state 1. For a focal scientist $i$, the induced index $m_i$ is the maximum number of state-1 neighbors of any state-1 neighbor of $i$, excluding $i$ itself. It is a maximum over intermediaries, not the total number of distinct second-nearest neighbors. The direct index $\tilde{k}_i$ counts state-1 neighbors; the degree index $d_i$ is the maximum degree among those neighbors. Subsequent persistence is measured over three years as

$$
Q_i=\frac{P_i^{\mathrm{old}}}{P_i}.
$$

**Pruning rule.** The theoretical model starts with every node active. A node $i$ remains active if some active incoming neighbor $j$ has at least $m$ active incoming neighbors of its own; otherwise $i$ becomes inactive. Repeat until no states change. For an undirected edge, the supporting neighbor's count excludes the focal node. The deterministic threshold idealizes the empirical association rather than estimating an individual response probability.

**Order parameter and analysis.** The main order parameter $P_\infty$ is the fraction in the giant out-component (GOUT), defined through reachability from the giant strongly connected component. On undirected networks this becomes the giant connected component. For random directed networks, $x$ is the probability that the source of a random edge is active, while $y$ is the probability that the edge can sustain its target. Equations 3 and 4 jointly determine these quantities, distinguishing activity from the ability to support another node. Equation 5 gives

$$
P_\infty=\sum_{k_{\mathrm{in}},k_{\mathrm{out}}}
P(k_{\mathrm{in}},k_{\mathrm{out}})
\left[1-(1-y)^{k_{\mathrm{in}}}\right].
$$

The undirected analysis uses six conditional probabilities to account for reciprocal support and giant-component connectivity (Methods, Equations 8-14).

## Experiments

**Behavioral associations (Table 1; Figure 1).** The four field pairs are:

| Established field | Emerging field | Authors | Coauthorship edges |
| --- | --- | ---: | ---: |
| Chaos | Complex networks | 1,833 | 3,128 |
| Phase transitions | Complex networks | 1,265 | 2,864 |
| Electrical properties of low-dimensional structures | Optical properties of low-dimensional structures | 2,069 | 5,900 |
| Carbon nanotubes | Graphene | 20,011 | 110,041 |

The authors report increasing $Q_i$ with $m_i$ across all four pairs, with much weaker patterns for the direct and degree indices. Comparisons splitting scientists into upper and lower halves of the induced-index distribution retain differences in old-field publication shares. These are observational associations.

**Random-network simulations (Figure 3).** Directed and undirected Erdos-Renyi and scale-free networks are evaluated for $m=2,\ldots,6$, alongside the $m=1$ bond-percolation comparison in the directed case. Numerical results agree with the analytical curves: directed cases exhibit jumps and undirected cases continuous transitions.

**Empirical network substrates (Figure 4).** For $m=3$, random edge removal varies the surviving-link fraction. Simulated pruning on collaboration networks, directed citation-network portions, and mixed citation networks generally gives continuous, discontinuous, and hybrid transitions, respectively. These are simulations on empirical graphs, not observed behavioral transitions.

**Mixed networks and critical scaling (Figure 5).** Assigning a fraction $p$ of directed links to an undirected Erdos-Renyi substrate with $10^6$ nodes produces continuous, hybrid, and discontinuous regimes. Near the point where a jump first appears, its height scales as $(p-p^*)^{1/2}$. At $p=p^*$, the deviation of GOUT from its critical value scales as $|\langle k\rangle-k^*|^{1/3}$.

**Finite clusters (Figure 6).** For $m=4$, simulations average $10^3$ realizations of undirected Erdos-Renyi networks with $10^6$ nodes. Small-cluster probabilities oscillate with cluster size near criticality. Large-size behavior retains the reported exponent $\tau=5/2$, and the continuous transition retains $\beta=1$.

## Limitations

- The collaboration analysis does not identify causal peer influence separately from selection into collaborations or shared research interests. The authors' interpretation of dominant indirect influence is stronger than the descriptive association alone establishes.
- The model assumes an initially fully active population and deterministic pruning. It does not directly model adoption from a small seed or estimate stochastic individual behavior.
- Empirical motivation concerns four physics field pairs and influence within two degrees. Extensions to other social behaviors and the broader three-degrees hypothesis are proposed possibilities.
- The authors explicitly leave the macroscopic implications of the nonmonotonic small-cluster pattern unresolved.
- The supplied Markdown contains extraction artifacts and refers to an SI Appendix that is not included. Supplementary robustness tests and mixed-network derivations are mentioned in the main text but cannot be independently assessed from this source. No DOI or article identifier is supplied; the year follows the stated 2022 acceptance date.

## Related Concepts

- [[concepts/induced-percolation|Induced Percolation]]: indirect support and directionality-dependent pruning transitions.
- [[concepts/threshold-contagion|Threshold Contagion]]: compares a focal node's direct exposure against a threshold; the present rule instead thresholds its supporting neighbor's active contacts.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: explicitly represents group interactions, whereas this model operates through length-two paths on a graph.

## Related Papers

- [[papers/contagion-in-graphons|Contagion in graphons]]: a library comparison for irreversible threshold adoption and optimal seeding; induced percolation instead studies pruning from full activity. This is a conceptual comparison, not a citation in the source.
- Granovetter (1978), "Threshold models of collective behavior": cited as a direct-threshold foundation.
- Zhao, Zhou, and Liu (2013), "Inducing effect on the percolation transition in complex networks": cited in the discussion of earlier k-core-related work; the similar name should not be taken to imply the same update rule.
- Baxter et al. (2015), "Critical dynamics of the k-core pruning process": cited for related critical exponents, which are not exclusive to induced percolation.

[[index|Library home]]
