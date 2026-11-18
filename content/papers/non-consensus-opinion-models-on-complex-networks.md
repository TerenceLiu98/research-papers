---
title: "Non-consensus Opinion Models on Complex Networks"
type: paper
authors:
  - Qian Li
  - Lidia A. Braunstein
  - Huijuan Wang
  - Jia Shao
  - H. Eugene Stanley
  - Shlomo Havlin
year: 2012
tags:
  - opinion-dynamics
  - complex-networks
  - percolation
---

## TL;DR

Binary opinions can coexist under a local majority rule that includes an agent’s own current opinion. Simulations show that stronger self-weight supports minority clusters, whereas targeted inflexible opponents and global-majority influence across coupled networks undermine them. Increasing cross-network coupling changes the reported transition from continuous to a mixture of continuous and abrupt transitions, and finally to purely abrupt behavior.

## Research Question

How do self-influence, network topology, inflexible opponents, and strong ties between communities determine whether a macroscopic minority-opinion cluster survives?

## Motivation

Consensus models miss persistent disagreement. This paper uses [[concepts/network-percolation|Network Percolation]] to characterize the connectivity of surviving opinion groups and extends [[concepts/opinion-dynamics|Opinion Dynamics]] from isolated networks to coupled communities.

## Contributions

- Revisits the non-consensus opinion (NCO) model and its numerical mean-field percolation signatures on random networks.
- Introduces weighted self-influence (NCOW), lowering the initial minority fraction needed for a giant cluster.
- Reviews the inflexible contrarian opinion (ICO) model and compares random with high-degree targeting.
- Introduces alternating local and cross-network updates, showing topology-dependent loss of coexistence as coupling increases.

## Method

Initially, a fraction $f$ of nodes holds the positive opinion and the remainder holds the negative opinion. NCO synchronously updates every node to the majority among itself and its nearest neighbors; ties preserve the current state. NCOW assigns weight $W$ to the node’s current opinion and unit weight to each neighbor, with NCO recovered at $W=1$.

ICO starts from an NCO steady state and converts selected positive-opinion nodes into permanently negative agents. Selection is random or proceeds in descending degree order. The remaining nodes resume NCO updates. These agents are fixed opponents, rather than agents who continually reverse the prevailing opinion.

The coupled model uses two networks with equal size and degree distribution and the same initial opinion fraction. A fraction $q$ of nodes in each network forms random one-to-one cross-network pairs. One synchronous local NCO step alternates with a pair-update step: agreeing pairs retain their opinion; disagreeing pairs adopt the global majority across both networks.

The principal observables are the largest and second-largest positive-opinion cluster sizes, normalized by network size, the total positive-opinion fraction, finite-cluster size distributions, and iterations to steady state. A vanishing giant cluster is distinct from the disappearance of every minority node.

## Experiments

The study uses Erdős–Rényi (ER) and scale-free (SF) networks. Many figures use $N=10{,}000$ and $10^4$ realizations. Coupled ER networks have mean degree 4; coupled SF networks have minimum degree 2 and degree exponent 2.5.

- **Single-network NCO:** at mean degree approximately 5.5, the reported minority threshold is approximately 0.40 for ER and 0.45 for SF networks. Critical finite-cluster distributions have exponent approximately 2.5, and largest-cluster size scales approximately as $N^{2/3}$, supporting mean-field percolation behavior (Section 3, Figures 2–3).
- **Connectivity and self-weight:** increasing mean degree narrows the coexistence region and produces a sharper transition near $f=0.5$. Comparing $W=1$ and $W=4$ on ER networks shows that stronger self-weight lowers the minority threshold (Figures 4–5).
- **Inflexible opponents:** both strategies shrink the rival giant cluster, but high-degree targeting is more effective because hubs concentrate in that cluster. At contrarian fraction 0.2, Figure 10 reports thresholds 0.36 for random selection and 0.45 for targeting. The reported cluster exponent is approximately 2.5; a susceptibility-related exponent approximately 1 is stated but not plotted.
- **Coupled ER networks:** for the tested configuration, positive coupling up to approximately $q=0.5$ combines continuous onset at $f_c(q)$ with an abrupt jump near $f=0.5$. Above this coupling range, the continuous component disappears. The jump grows proportionally to system size in the reported scaling test (Figures 12–14).
- **Coupled SF networks:** continuous-transition signatures disappear at smaller coupling. Figure 16 reports a power-law cluster distribution for $q\leq0.1$ and its loss above that range. These numerical boundaries apply to the tested topologies.

## Limitations

The evidence is numerical and based on stylized binary opinions and synthetic networks. The global-majority rule for disagreeing cross-network pairs is an assumption, not an empirical estimate of interpersonal or media influence. The social interpretation of increasing homogeneity therefore remains a model-based hypothesis.

The authors explicitly do not establish a precise critical mean degree for the change to abrupt behavior. Iteration-count scaling is insufficiently resolved to distinguish competing functional forms. The parsed text and Figure 13 caption also differ in naming those forms. Section 4.1 states $N=10^5$ for ICO simulations, while the associated figure captions state $N=10^4$; the source does not resolve that discrepancy. The universality of the corresponding two-dimensional lattice model is described as disputed.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: self-influence and fixed opponents alter collective outcomes.
- [[concepts/network-percolation|Network Percolation]]: giant opinion clusters and critical scaling characterize minority survival.
- [[concepts/voter-model|Voter Model]]: a contrasting neighbor-copying mechanism; NCO instead uses synchronous local majority including self.

## Related Papers

- Shao, Havlin, and Stanley, Physical Review Letters 103, 01870 (2009), source reference 1: introduces the NCO model revisited here.
- Li, Braunstein, Havlin, and Stanley, Physical Review E 84, 066101 (2011), source reference 2: introduces the ICO model reviewed here.
- [[papers/consensus-polarization-and-nonlinear-response-in-a-two-layer-voter-model-with-intra-agent-cross-layer-reconciliation|Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]: a library comparison in which coupling reconciles two states of the same agent symmetrically, unlike the global-majority rule between distinct agents used here.
