---
title: Dynamics of opinion expression
type: paper
authors:
  - Felix Gaisbauer
  - Eckehard Olbrich
  - Sven Banisch
year: 2020
journal: Physical Review E
doi: 10.1103/PhysRevE.102.042303
tags:
  - opinion-dynamics
  - spiral-of-silence
  - social-networks
---

## TL;DR

A numerical minority can be the only group that speaks in public when its members encounter enough support from one another to cover the cost of speaking. Both groups can also speak at once, but each then needs enough internal support to withstand open disagreement. Both outcomes can exist at the same population shares and with every private opinion fixed.

## Research Question

How do group size, the pattern of social contacts, and the cost of speaking determine whose opinion is publicly audible? When several outcomes are possible, how does experience with agreement and disagreement select among them?

## Motivation

A silent ally contributes no visible agreement. As more allies withdraw, those who still speak encounter a less supportive public and may withdraw in turn. This gives the [[concepts/spiral-of-silence|spiral of silence]] a local mechanism that operates even when individuals have no estimate of population-wide opinion.

## Contributions

The authors derive thresholds for strict pure-strategy Nash equilibria in a two-group silence game. Write $r$ for a group's ratio of expected within-group ties to cross-group ties. For a common speaking cost $0<c<1$, silence by everyone is always an equilibrium. A group speaking alone is also an equilibrium if its $r$ exceeds $c/(1-c)$. For both groups to speak, **each** ratio must exceed $(1+c)/(1-c)$ (Section III). The higher threshold accounts for the disagreement speakers now encounter. These conditions describe which outcomes can persist. The learning model then shows how initial expectations can lead the same population toward different outcomes.

## Method

Each agent holds one of two fixed opinions. At each interaction the network is drawn from a two-block model. For group 1 the tie ratio is $\gamma=(N_1-1)q_{11}/(N_2q_{12})$, where $N_i$ is group size and $q_{ij}$ is a tie probability. Group 2 has the analogous ratio $\delta$. A speaker pays $c$ and samples a neighbor. Agreement adds one unit to the payoff, disagreement subtracts one, and a silent neighbor gives no feedback.

Each speaker updates an estimate $Q$ of the return to speaking using learning rate $\alpha$. The probability of speaking is $1/(1+e^{-\beta Q})$, where $\beta$ controls sensitivity to the estimate. In the continuous-time expected dynamics, the spread of estimates within each group contracts at least exponentially. The authors approximate expression probabilities using one mean $Q$ per group, then analyze the fixed points and their basins of attraction.

## Experiments

Figure 2 illustrates a limit to internal cohesion. With 100 agents, a cross-group tie probability of 0.2, and a speaking cost of 0.2, a group of 20 cannot sustain mutual expression even if every pair of its members is connected. Its maximum tie ratio is $19/(80\times0.2)$, below the required $1.5$.

Figure 4 compares the two-dimensional approximation with 50 simulation runs for 200 agents initialized near a basin boundary. At learning rates 0.01 and 0.001, the mean trajectories approach the predicted fixed point. At 0.1, the mean trajectory crosses the predicted boundary. The cost sweep in Figure 7 shows that with identical group structure ($\gamma=\delta=2.1$, $\beta=10$), lowering the cost can first sustain one vocal group and eventually support both.

## Limitations

The blocks treat members of each group as equally likely contact partners and omit persistent hubs. Fixed opinions isolate changes in expression from persuasion. The threshold calculations and simulations establish possibilities within the model. Testing them against public interaction records is difficult because those records omit people who stay silent.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] includes models of social influence. Here the quantity that changes is the expected reward for speaking.
- [[concepts/echo-chambers|Echo Chambers]] connects the concentration of like-minded contacts to the support available to a speaker in each camp.

## Related Papers

[[papers/modeling-echo-chambers-and-polarization-dynamics-in-social-networks|Modeling Echo Chambers and Polarization Dynamics in Social Networks]], cited in Section VI, studies how like-minded contacts can strengthen convictions. Gaisbauer and colleagues hold convictions fixed to isolate the effect of those contacts on public expression.
