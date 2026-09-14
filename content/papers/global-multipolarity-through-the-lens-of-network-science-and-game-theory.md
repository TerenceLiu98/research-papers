---
title: "Global multipolarity through the lens of network science and game theory"
type: paper
authors:
  - Jacobo Aguirre
  - Javier M. Buldú
  - Jaime Iranzo
  - Federico Pablo-Martí
year: 2026
doi: "10.1038/s44260-026-00082-2"
tags:
  - international-relations
  - network-science
  - game-theory
  - cooperation
---

## TL;DR

The article uses the [[theory-of-competing-networks|Theory of Competing Networks]] to interpret geopolitical realignment through competition for eigenvector centrality. It summarizes prior model results in which coalitions of weaker networks can sustain cooperation if their combined strength exceeds that of the strongest competitor. The geopolitical application is a qualitative interpretation, with no new datasets or empirical validation of the proposed global transition.

## Research Question

How do network structure and strategic connection choices shape the incentives of nations and geopolitical blocs, and under what conditions can cooperation be more stable and collectively beneficial than dependence on a dominant actor?

## Motivation

Debates about [[international-polarity|International Polarity]] often emphasize the capabilities of individual powers. The authors argue that indirect interactions and the structure of cross-bloc ties also matter: a locally advantageous decision can reorganize the wider system, and an actor's relative share of influence need not track its absolute gains. They use contemporary alliance tensions to motivate this perspective rather than to test it.

## Contributions

- Synthesizes earlier network-competition results into an interpretive account of international cooperation and hierarchy.
- Connects spectral measures of network strength and connector-node centrality to strategic incentives and the speed of network dynamics.
- Distinguishes competition between whole networks from a merging process driven by individual nodes, which can restore hub dominance even after peripheral actors initiate integration.
- Discusses European integration as a possible response to emerging hub-to-hub connections, while explicitly acknowledging uncertainty in geopolitical network construction.

## Method

The article combines network science with [[network-games|Network Games]], drawing on prior studies rather than introducing a new fitted model. In the framework, a network's largest adjacency-matrix eigenvalue measures its strength, and the associated eigenvector gives node centralities. Summing node centralities within a constituent network measures its importance in the interconnected system. Strong connections through central nodes accelerate dynamics; peripheral connectors can create bottlenecks.

At the whole-network level, the authors consider more than two networks choosing another network to connect to or declining to connect. They summarize two equilibrium types from prior work: a hierarchy centered on the strongest network, and cooperation among weaker networks. The cooperative equilibrium requires the weaker coalition to become stronger than the strongest network, creating an incentive for that network to join. In the cases described, a smaller network can initiate a transition from hierarchy to cooperation, whereas no single actor can reverse the cooperative configuration. The authors further argue that greater overall growth can benefit a dominant actor despite a reduced relative share; this is a model-based argument rather than a measured geopolitical payoff.

A separate node-level model starts with two isolated networks whose nodes form and rewire cross-network links for individual benefit. Peripheral nodes initiate connections, increasingly central nodes subsequently participate, and the process culminates in a Nash equilibrium with a connected core of the original hubs. Connections shift from disassortative to assortative, leaving the pioneering peripheral nodes relatively peripheral again. This internal hierarchy concerns a different decision-making level from the cooperative equilibrium between competing networks.

## Experiments

No new experiments, simulations, or quantitative performance comparisons are reported. The data-availability statement says that no datasets were generated or analyzed. Earlier applications to rural financial networks and OECD economic networks during the 2008 crisis are cited as background, not reproduced here.

Figure 1 is explicitly a conceptual, non-exhaustive diagram of countries within blocs and connections between blocs. The authors map postwar alliances, European integration, and possible renewed great-power coordination onto the stages of network merging. Their suggestion that the system may be approaching the final stage is an interpretive scenario, not an estimated or validated forecast.

## Limitations

- The authors explicitly position this geopolitical application as qualitative and conceptual rather than strictly predictive or fully quantitative.
- Trade, finance, military alliances, and diplomacy produce different adjacency matrices. Link weights and bloc membership are uncertain and constrained by incomplete data.
- Countries can cooperate in one domain and compete in another, requiring attention to overlapping and interdependent network layers.
- Equilibrium and transition claims depend on the modeled players, permitted connection choices, and coalition-strength condition. They do not establish that every international cooperative arrangement is stable.
- The historical analogy does not independently identify a causal mechanism or show that current countries maximize eigenvector centrality. Nor does the article empirically establish that greater connectivity produces absolute gains for every country.

## Related Concepts

- [[theory-of-competing-networks|Theory of Competing Networks]]
- [[international-polarity|International Polarity]]
- [[network-games|Network Games]]
- [[social-network-analysis|Social Network Analysis]]

## Related Papers

The supplied article cites the following foundations:

- Aguirre, Papo, and Buldú (2013), "Successful strategies for competing networks." Introduces the network-competition framework (reference 8).
- Iranzo, Buldú, and Aguirre (2016), "Competition among networks highlights the power of the weak." Supports the discussion of hierarchical and cooperative equilibria (reference 10).
- Buldú, Pablo-Martí, and Aguirre (2019), "Taming out-of-equilibrium dynamics on interconnected networks." Cited for earlier work on interconnected economic networks (reference 11).
- Iranzo, Pablo-Martí, and Aguirre (2020), "Emergence of complex socioeconomic networks driven by individual and collective interests." Supplies the node-driven network-merging account (reference 14).

Within the library, [[asian-multipolarity-and-the-future-of-the-liberal-international-order-lio|Asian Multipolarity and the Future of the Liberal International Order (LIO)]] offers a complementary institutional interpretation of dispersed power. This is a thematic comparison, not a citation in the supplied article.

Source: [Published article](https://doi.org/10.1038/s44260-026-00082-2), published online 15 June 2026. This summary uses the supplied parsed Markdown.

[[index|Library home]]
