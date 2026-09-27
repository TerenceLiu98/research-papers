---
title: Higher-Order Social Contagion
type: concept
aliases:
  - Hypergraph Contagion
  - Simplicial Contagion
tags:
  - social-contagion
  - higher-order-networks
  - critical-transitions
---

## Overview

Higher-order social contagion models the spread of behaviors, norms, or innovations through explicitly represented groups. Transmission can depend on group size and the joint states of group members, allowing collective peer pressure to contribute beyond independent pairwise exposures. Hypergraph and simplicial models specify these groups differently, so their structural assumptions must accompany any behavioral interpretation.

## Key Ideas

- **Multiple exposures and explicit groups are different choices.** A threshold model on a graph can require several adopting neighbors without identifying whether those neighbors act together. Higher-order models preserve which exposures belong to the same group.
- **Reinforcement requires a rule.** Transmission rates can vary with group size, and group effects can supplement pairwise transmission. A hyperedge alone does not determine the strength or direction of influence.
- **Abrupt adoption is conditional.** In models reviewed by Battiston et al., sufficiently strong group reinforcement can turn a gradual transition into an abrupt one. This result depends on the specified dynamics and parameter regime.
- **Critical mass follows from coexistence.** When stable non-adopting and adopting states coexist, the initial number of adopters can determine the eventual outcome. Equal transmission parameters need not imply equal long-run adoption.
- **Model outcomes are not direct behavioral measurements.** Spreading simulated on an empirical collaboration hypergraph remains a model result. Establishing actual social contagion requires evidence about exposure, adoption, and alternative explanations.

## Important Papers

- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: distinguishes simple, complex, and group-explicit contagion in Figure 5 and reviews reinforcement and critical mass.
- Iacopini, Petri, Barrat, and Latora (2019), "Simplicial models of social contagion," Nature Communications 10, 2485: the simplicial reinforcement model discussed as reference 124 in the Perspective.
- de Arruda, Petri, and Moreno (2020), "Social contagion models on hypergraphs," Physical Review Research 2, 023032: hypergraph generalization cited as reference 127 in the Perspective.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: represents the interacting groups while retaining their membership and overlap.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: explains why coexisting stable adoption states make initial conditions consequential.
- [[concepts/social-network-analysis|Social Network Analysis]]: supplies the relational setting in which exposure and influence occur.
