---
title: Higher-order interactions shape collective human behaviour
type: paper
authors:
  - Federico Battiston
  - Valerio Capraro
  - Fariba Karimi
  - Sune Lehmann
  - Andrea Bamberg Migliano
  - Onkar Sadekar
  - "Angel S\u00e1nchez"
  - "Matja\u017e Perc"
year: 2025
tags:
  - higher-order-networks
  - social-network-analysis
  - social-contagion
  - cooperation
---

## TL;DR

This Nature Human Behaviour Perspective argues that explicit group interactions reveal social structure and dynamics lost when every encounter is represented as pairwise ties. It combines a synthesis of higher-order network research with an illustrative analysis of arXiv collaborations from 2007 to 2022. Group structure, temporal memory, and nonlinear social influence can change predictions about contagion and cooperation, but the authors identify substantial gaps in behavioral validation and strategic-game experiments on hypergraphs.

## Research Question

When does representing social interactions as groups, rather than collections of dyads, improve the description and modeling of collective human behavior, and what evidence and experiments are needed to assess these mechanisms?

## Motivation

A triangle in a coauthorship graph can represent one three-author paper or three separate two-author papers. Projecting both situations into pairwise ties erases the distinction and can inflate apparent transitivity. Likewise, repeated group gatherings, peer pressure, and multiplayer payoffs depend on who participates together. These mechanisms motivate extending [[concepts/social-network-analysis|Social Network Analysis]] with [[concepts/hypergraphs|Hypergraphs]] that retain group membership, overlap, and timing.

## Contributions

- Explains what hypergraphs, simplicial complexes, pairwise projections, and bipartite incidence representations preserve or assume about group interactions.
- Illustrates higher-order measures using collaboration hypergraphs from physics, computer science, statistics, and mathematics, including motifs, nestedness, persistent teams, and transitions between team sizes.
- Synthesizes empirical contact patterns and models of group formation, contagion, cooperation, and truth-telling, distinguishing group structure from the rules governing behavior on that structure.
- Proposes a research agenda covering computational methods and null models, group inequalities, team dynamics, cumulative culture, language evolution, and policymaking.

## Method

The article is a narrative Perspective with an empirical illustration, not a systematic review or a new unified behavioral model. Its basic representation is a hypergraph $\mathcal H=(V,E)$, where actors are nodes and each hyperedge records an interacting group. Hyperedges may have different sizes, overlap, and recur over time. A simplicial complex additionally requires every subset of a simplex to be present, which can impose unobserved subgroup interactions. A bipartite actor-group incidence graph preserves group memberships; its distinction from a hypergraph is representational, unlike the information loss of a pairwise clique projection (Figure 1).

Box 1 constructs discipline-specific coauthorship hypergraphs from arXiv papers uploaded during 2007-2022, with each paper represented by its coauthor set. Analyses compare group-size distributions, unique collaborators relative to publication counts, three-author motifs, nesting of smaller groups within larger ones, and statistically significant recurring collaborations against a null model preserving author activity. Further analyses examine gendered mixing, transitions between successive team sizes, and a contagion model on the collaboration structure.

The reviewed process models add separate behavioral assumptions. Temporal group-formation models use past encounters, time spent in a group, or group attractiveness. [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]] assigns influence to explicit groups and can generate critical-mass effects. Multiplayer evolutionary games assign payoffs to joint strategy configurations; nonlinear synergy and discounting can make these payoffs irreducible to sums of dyadic contributions. None of these mechanisms follows from choosing a hypergraph representation alone.

## Experiments

### Original illustrative analysis

Box 1 reports the following qualitative comparisons; the supplied text does not provide a numerical results table or exact sample counts.

| Analysis | Reported finding | Source |
| --- | --- | --- |
| Team-size distributions | Mathematics has the smallest typical teams; physics has a more slowly decaying distribution with larger collaborations. | Box Figure 1a |
| Unique coauthors at a fixed publication count | Mathematicians have fewer distinct collaborators. The ordering of physics and computer science reverses relative to team size, interpreted as more persistent collaborations in physics. | Box Figure 1b |
| Three-author motifs and nestedness | Statistics and mathematics more often combine larger teams with underlying pairwise collaborations. Physics and computer science more often contain groups without those dyadic subgroups. | Box Figure 1c-d |
| Recurring groups | Activity-preserving null comparisons identify statistically significant co-occurring coauthor groups across disciplines. | Box Figure 1e |
| Team-size transitions | Physics authors in larger collaborations rarely return to smaller teams; the text reports more frequent switching across sizes in mathematics. | Box Figure 1g and caption |
| Contagion on collaboration hypergraphs | Incorporating group peer pressure can promote modeled spreading of ideas and innovation. This is a simulation result, not observed adoption behavior. | Box Figure 1h |

### Evidence synthesized from prior work

The contact-network discussion reviews the Copenhagen Networks Study, described as observing about 1,000 students at five-minute intervals over 36 months. Repeated gatherings support analysis of social trajectories beyond isolated dyads. Other cited studies find bursty group interactions, long-term correlations, and incremental group assembly and disassembly (sections on contact networks and group formation; references 36, 38, 39, and 70-72).

Reviewed contagion models can exhibit abrupt adoption and coexistence of stable low- and high-adoption states when group reinforcement is sufficiently strong. Initial adoption then determines whether spreading persists, connecting higher-order influence to [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]] (social contagion section; references 124-128). Reviewed cooperation models find benefits under particular payoff rules, group structures, and initial conditions; one mixed two- and three-player prisoner's dilemma requires both enough three-player interactions and a minority of initially committed cooperators (cooperation section; reference 155).

The article reports no new laboratory experiment. At the time of writing, the authors state that they know of no strategic-game experiments on hypergraphs. They propose testing whether participants understand the group structure and varying group size, information presentation, heterogeneity, and connectivity. Their review of truth-telling and other moral behavior likewise emphasizes limited higher-order evidence rather than an established general theory.

## Limitations

- **Representation is not causal identification.** Coauthorship and proximity data describe participation or co-presence; they do not establish the behavioral mechanism behind cooperation, homophily, or influence. Model predictions require empirical validation.
- **Results depend on dynamics.** Abrupt contagion and enhanced cooperation are conditional outcomes of particular transmission or payoff rules, not universal consequences of larger groups.
- **Missing group information.** Reconstructing hyperedges from dyadic data requires additional timing information or inference assumptions. A projected triangle alone cannot identify the original events, and simplicial closure may impose inappropriate subgroup structure.
- **Scaling and null models.** Larger configuration spaces increase storage, computation, and sampling demands. The authors identify structure-preserving reduction and adequately explored randomized baselines as open problems.
- **Limited experimental support.** Proposed applications to culture, language, and policy extend beyond the evidence established here. The absence of known strategic-game experiments is the authors' time-bounded assessment, not a claim about all subsequent work.
- **Source detail.** The parsed text supports the qualitative Box 1 comparisons but lacks exact sample counts, plotted numerical values, and a full reproducibility specification. These are not reconstructed from image placeholders.

The year follows the stated online publication date, 17 December 2025. The supplied Markdown identifies the journal in its peer-review information but contains no article DOI or arXiv identifier; identifiers in the bibliography belong to cited works.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: explicit groups, overlap, temporal events, and the limits of pairwise projections.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: group-specific reinforcement and critical mass.
- [[concepts/social-network-analysis|Social Network Analysis]]: the dyadic measures and representations extended by the Perspective.
- [[concepts/network-games|Network Games]]: strategic interaction structure, generalized here to multiplayer payoffs.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: coexistence and dependence on initial conditions in reviewed contagion models.

## Related Papers

The following works are cited in the supplied Perspective:

- Battiston et al. (2020), "Networks beyond pairwise interactions: structure and dynamics," Physics Reports 874, 1-92: foundational review (reference 17).
- Benson et al. (2018), "Simplicial closure and higher-order link prediction," PNAS 115, E11221-E11230: group closure and prediction (reference 28).
- Iacopini et al. (2019), "Simplicial models of social contagion," Nature Communications 10, 2485: reinforcement and bistability (reference 124).
- Alvarez-Rodriguez et al. (2021), "Evolutionary dynamics of higher-order interactions in social networks," Nature Human Behaviour 5, 586-595: public-goods dynamics and the well-mixed replicator limit (reference 147).
- Civilini et al. (2024), "Explosive cooperation in social dilemmas on higher-order networks," Physical Review Letters 132, 167401: cooperation in mixed two- and three-player games (reference 155).

[[papers/coevolution-of-relationship-and-interaction-in-cooperative-dynamical-multiplex-networks|Coevolution of Relationship and Interaction in Cooperative Dynamical Multiplex Networks]] is a library comparison, not a citation in this Perspective. It studies adaptive relationship weights and dyadic strategic encounters, providing a distinct account of how interaction structure and cooperation influence each other.

[[index|Library home]]
