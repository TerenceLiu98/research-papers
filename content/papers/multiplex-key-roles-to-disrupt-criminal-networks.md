---
title: "Multiplex key roles to disrupt criminal networks"
type: paper
authors:
  - Alex S. O. Toledo
  - Laura C. Carpi
  - Allbens P. F. Atman
  - Antônio P. B. Scarpelli
year: 2023
tags:
  - multiplex-networks
  - criminal-networks
  - network-disruption
---

## TL;DR

A simulation study of a Brazilian criminal network combines cross-layer node diversity, betweenness, and degree into a targeting ranking. This combined strategy reaches the study's disruption criterion in 57 steps, versus 62 for the next-best tested strategy and 77 for random selection. The evidence concerns a particular network and replacement model, rather than observed crime reduction.

## Research Question

Can heterogeneous connectivity across crime layers improve identification of structurally important actors beyond conventional centrality rankings?

## Motivation

Aggregating different offenses can obscure actors whose connections differ across activities. Replacing removed actors can also restore connectivity, so initial structural importance alone may not predict simulated disruption performance.

## Contributions

- Represents seven offense categories as a multiplex and applies node diversity to actor ranking.
- Interleaves diversity, betweenness, and degree rankings into a combined key-role strategy.
- Compares eleven strategies under a common removal-and-replacement simulation and examines a smaller layer-focused intervention.

## Method

The police database contains 152,973 records, 34,505 individuals, 46,239 edges, and 7,609 networks. The selected Belo Horizonte case contains 92 individuals; the text reports 132 edges while Figure 2 reports 123. Its multiplex representation includes 77 individuals and 223 layer-specific links across ideological falsehood, arms trafficking, kidnapping, weapon carrying, homicide, theft, and drug trafficking. Fifteen co-offenders are excluded from that representation.

Baselines use degree, betweenness, [[concepts/katz-centrality|Katz Centrality]], multiplexity, and diversity. Multiplexity here is the fraction of layers in which an actor participates. [[concepts/multiplex-node-diversity|Multiplex Node Diversity]] measures differences in connectivity patterns across layers using Jensen–Shannon distances on node-distance and transition distributions.

The combined strategy scans rank positions in diversity, betweenness, then degree order, retaining each actor only on first occurrence (Figure 5; Algorithm 6). During simulation, a removed actor is replaced by the next ranked actor, who inherits its links. Network efficiency is measured after removal and replacement. Termination occurs when removing the central actor of a star leaves the remaining actors isolated.

## Experiments

Table 1 reports steps to disruption:

| Strategy | Steps |
| --- | ---: |
| Degree | 73 |
| Betweenness | 64 |
| Katz–Bonacich | 71 |
| Multiplexity | 71 |
| Diversity | 68 |
| Multiplexity/degree | 62 |
| Multiplexity/Katz–Bonacich | 68 |
| Multiplexity/betweenness | 66 |
| Multiplexity/diversity | 67 |
| Random | 77 |
| Combined key roles | 57 |

The best result belongs to the combined ranking, not diversity alone. The target network's degree assortativity is −0.233; all 239 examined database networks with more than 30 individuals have negative coefficients. This is a property of the sampled networks, not proof that all criminal networks are disassortative.

A separate intervention using the first 12 ranked actors, or fewer when a layer is smaller, eliminates the arms-trafficking and ideological-falsehood layers in the simulation. Figure 8 reports 37 remaining individuals and 54 layer-specific links; other layers fragment into smaller groups.

## Limitations

- Disruption comparisons center on one case and a prescribed link-inheritance mechanism. They do not establish field effectiveness or generalization across criminal organizations.
- The authors consider even the 57-step strategy impracticably costly in human and material resources.
- Table 1 supplies no uncertainty intervals or repeated-run variability for random selection.
- The source has inconsistent target-edge counts (132 versus 123). Equation 7 sums over unordered pairs but uses the normalization for ordered pairs, despite describing a maximum efficiency of one; numerical replication should check the implementation.
- Trust and adaptive capacity are interpretations of structural measures, not independently measured outcomes.

## Related Concepts

- [[concepts/multiplex-node-diversity|Multiplex Node Diversity]]: distinguishes connectivity variation from merely participating in many layers.
- [[concepts/katz-centrality|Katz Centrality]]: walk-based influence baseline.

## Related Papers

- Carpi et al. (2019), “Assessing diversity in multiplex networks”: source of the diversity measure.
- Duijn, Kashirin, and Sloot (2014), “The relative ineffectiveness of criminal network disruption”: cited foundation for disruption and resilience modeling.
- Toledo, Carpi, and Atman (2020), “Diversity analysis exposes unexpected key roles in multiplex crime networks”: earlier application cited by the authors.
