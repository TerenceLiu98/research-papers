---
title: "Political opinion formation: Initial opinion distribution and individual heterogeneity of tolerance"
type: paper
authors:
  - Cheng Jin
  - Yifu Li
  - Xiaogang Jin
year: 2016
tags:
  - opinion-dynamics
  - bounded-confidence
  - adaptive-networks
  - political-polarization
  - agent-based-models
---

## TL;DR

This simulation study extends an adaptive-network [[Bounded Confidence Models|bounded-confidence model]] with structured initial opinion distributions and heterogeneous willingness to change opinions. Across stylized one-party, two-party, multiparty, and nonpartisan distributions, initial conditions alter whether the population reaches fragmentation, polarization, or consensus. Mildly stubborn agents mainly delay convergence, whereas agents with effectively fixed extreme opinions can change the final distribution. The paper also proposes the average ratio of opinion-near neighbors as a local indicator of the population's formation stage.

## Research Question

How do the initial distribution of political opinions and individual heterogeneity in willingness to revise those opinions affect fragmentation, polarization, consensus, and convergence in an adaptive social network?

## Motivation

Many models of [[Opinion Dynamics|opinion dynamics]] initialize opinions uniformly and assign agents the same update behavior. Political populations instead begin with clustered party-like positions and include individuals who differ in willingness to compromise. The paper asks whether these initial and individual differences change outcomes even when the network and interaction mechanism remain otherwise similar.

## Contributions

- Embeds four stylized initial opinion distributions and opinion-dependent stubbornness in an adaptive-network bounded-confidence model.
- Compares stable and transient outcomes across distributions representing a single mainstream peak, two polarized peaks, three peaks, and a uniform nonpartisan population.
- Separates mildly stubborn agents, who primarily slow convergence in the simulations, from effectively immovable extremists, who can alter final cluster structure.
- Introduces the average ratio of nearest neighbors, defined by the share of each non-isolated node's neighbors within its confidence bound, to characterize fragmentation, polarization, and consensus.
- Examines how party variance, relative size, and mean position affect a refined two-party simulation.

## Method

The authors modify the Kozma-Barrat coevolution model. Each agent has an opinion in $[0,1]$. At every time step, each node selects a neighbor; an isolated node first receives a random connection. With probability $w$, sufficiently dissimilar pairs rewire their edge to a randomly selected non-neighbor. Otherwise, pairs within confidence bound $d$ update their opinions according to agent-specific parameters $\mu_i$. The implementation updates all nodes at each step rather than sampling one node or pair.

Opinion-dependent heterogeneity is imposed by assigning agents near either endpoint of the opinion interval a smaller $\mu_{ex}$ than the common-agent value $\mu=0.5$. The endpoint regions are controlled by `nRange`. The four initial distributions are a truncated normal single peak (Norm), a two-peaked Zipf-based distribution (Pole), a symmetric three-peaked distribution (ThrP), and a uniform distribution (Rand). Stable-state analysis generally uses $N=5000$, $k=5$, and 200 simulation runs; a transient illustration tracks 250 sampled agents from a network of $N=1000$.

The primary stable-state outcomes are the sizes of the largest and second-largest opinion clusters, $S1$ and $S2$. Opinion clusters require both network connectivity and neighbor opinions within $d$. The proposed local statistic averages, over non-isolated nodes, the fraction of each node's neighbors whose opinions lie within its confidence bound.

## Experiments

- Increasing $d$ generally moves simulations from fragmentation through polarization toward consensus, but the transition points depend strongly on the initial distribution. The reported ordering of difficulty in reaching consensus is Norm, Rand, ThrP, then Pole; the two-peaked Pole condition remains polarized in the tested range.
- For uniformly initialized opinions, changing the extremist range affects $S1$ only beyond small confidence bounds. Rewiring probability has little effect on stable opinion-cluster size below approximately $w=0.9$, while the simulations show a sharp increase in consensus above that value.
- Under Rand and ThrP initializations, agents with $\mu_{ex}=0.1$ do not materially change the final state relative to homogeneous $\mu=0.5$ agents, while $\mu_{ex}=0.01$ or $0$ can change the stable distribution. The reported effect is conditional on placing stubborn agents only near opinion endpoints.
- In a representative ThrP trajectory, three clusters persist for $0.27 \le d \le 0.31$; at $d=0.32$, the center dissolves into a left- or right-leaning majority; near $d=0.37$, the three groups approach global consensus. These are selected typical trajectories rather than estimated universal thresholds.
- The average ratio of nearest neighbors tracks the simulated formation stage and distinguishes the four initial-distribution conditions.
- In the refined two-party simulations, larger within-party variance makes consensus harder, smaller minority groups reach consensus more easily, and endpoint stubbornness shifts the reported consensus threshold for changes in mean position from roughly $d=0.5$ to $d=0.6$.

## Limitations

The party systems are abstract distributions on a one-dimensional opinion interval, not calibrated representations of observed parties or voters. Stubbornness is assigned deterministically to agents near the endpoints, so results about extremists depend on that modeling assumption. The study reports simulations under selected parameter settings and does not validate the mechanisms or thresholds against political behavior data.

Several claims rely on visual comparisons of simulation figures, and the supplied text does not report uncertainty intervals or formal tests for the phase boundaries. The selected transient trajectories are described as typical cases found through repeated simulation rather than as ensemble summaries. Some notation and update equations in the parsed source are internally difficult to interpret, so this page preserves the authors' qualitative model description without resolving those transcription or specification ambiguities.

## Related Concepts

- [[Opinion Dynamics]]
- [[Bounded Confidence Models]]
- [[Political Polarization]]
- [[Co-Adaptive Political Polarization]]
- [[Voter Model]]

## Related Papers

- [[The dynamics of political polarization]]
- [[Political Polarization as a Co-Adaptive Process]]
- [[A Modified Hegselmann-Krause Model for Interacting Voters and Political Parties]]
- Kozma and Barrat, "Consensus formation on adaptive networks."
- Deffuant et al., "How can extremism prevail? A study based on the relative agreement interaction model."

[[index|Library home]]
