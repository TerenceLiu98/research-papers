---
title: Anisotropic opinion dynamics
type: paper
authors:
  - Juan Neirotti
year: 2016
venue: Physical Review E
doi: 10.1103/PhysRevE.94.012309
source_job_id: 48faba5f-1525-4f84-994b-832263f9f35d
tags:
  - opinion-dynamics
  - online-learning
  - dynamic-hysteresis
---

## TL;DR

In Neirotti's model, an agent who disagrees with a fixed social rule can maintain that opinion if enough neighbors agree with the agent. As peer influence grows, clusters around agents who still follow the rule delay the population's shift into opposition. When peer influence falls again, these clusters take time to re-form. The resulting hysteresis is strongest, relative to the width of the sweep, when neighbors exert similar levels of influence.

## Research Question

How do the mean and variability of peer influence affect a population's alignment with an established rule as agents learn from a sequence of new issues?

## Motivation

Two people can agree on an issue either because both follow a shared rule or because they reinforce each other's dissent. Representing the rule as a fixed direction makes these sources of agreement distinguishable even when everyone gives the same answer.

## Contributions

- The model distinguishes an agent's alignment with the social rule from agreement between neighbors on issues where the rule is neutral.
- In the two-agent analysis, one agent with incoming peer strength below the model's threshold of 2 suffices to bring both into alignment with the rule. If both strengths exceed 2, both agents eventually oppose it.
- On a regular tree, an agent whose total incoming influence falls below 2 can sustain alignment across successive shells of neighbors, even when the population average exceeds that threshold.

## Method

A fixed perceptron with weight vector $B$ assigns a binary label to each random issue vector $S$. Each agent has an adaptive vector $J_a$ and labels the same issue by the sign of $J_a\cdot S$. Agreement with the rule reinforces its label. When the agent disagrees, the summed influence of neighbors sharing the agent's answer reduces the update toward the rule and can reverse its direction. Influence is directional, so two neighbors can give each other's opinions different weights.

The normalized overlap $R_a=(J_a\cdot B)/(|J_a||B|)$ measures alignment with the rule. The population mean $\mu$ ranges from unanimous opposition at $-1$ to unanimous alignment at $+1$. Averaging over issues in the large-dimension, small-learning-step limit gives equations for the overlaps. For larger networks the paper uses a reduced equation derived from an upper bound on the rate of change of $R_a$ (Eq. 19 and Appendix B).

## Experiments

Neirotti integrates Eq. 19 on a periodic $100\times100$ square lattice with four neighbors per agent. Peer strengths have Gaussian mean $\eta$ and standard deviation $\Delta$. Each step in $\eta$ is about $\Delta/10$. The system evolves for 100 time units at each step, and its final state initializes the next step on the outward and return sweeps.

At the same $\eta$, alignment is higher on the sweep that starts in consensus. Near the transition, lattice snapshots usually show one large rule-aligned cluster for $\Delta\lesssim1.8\times10^{-3}$ and several smaller clusters at larger disorder (Figs. 4 and 5). Across $10^{-4}\leq\Delta\leq10^{-1}$, the reported power-law fit is for the **normalized loop area** $A/\Delta\propto\Delta^{-\lambda}$, with $\lambda=0.50\pm0.02$. The normalization accounts for the sweep width growing with $\Delta$.

## Limitations

The network reduction assumes a loop-free graph and neglects a neighborhood correction when estimating agreement on neutral issues. The simulated square lattice contains loops. The return-path delay concerns finite integration times, and the author reports a single stable solution of the reduced dynamics. The fixed rule, binary issue labels, and simulated agents limit the conclusions to a model of social learning. The terms *conservative* and *liberal* describe how agents weight the rule and their peers.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] provides the framework for relating local updates to collective agreement.
- [[concepts/dynamic-hysteresis|Dynamic Hysteresis]] describes the separation of the two sweep paths while rule-aligned clusters recover.
- [[concepts/random-field-ising-model|Random-Field Ising Model]] provides the paper's statistical-physics analogy for disorder-dependent collective switching. Here the disorder enters through peer influence on the links.

## Related Papers

- [[papers/consensus-polarization-and-nonlinear-response-in-a-two-layer-voter-model-with-intra-agent-cross-layer-reconciliation|Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]] studies a second source of lag in collective opinion. It varies the frequency of an external field, while Neirotti measures how the spread of peer strengths changes the loop.
