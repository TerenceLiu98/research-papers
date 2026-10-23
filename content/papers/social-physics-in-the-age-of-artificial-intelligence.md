---
title: "Social Physics in the Age of Artificial Intelligence"
type: paper
authors:
  - The Anh Han
  - Joel Z. Leibo
  - Tom Lenaerts
  - Iyad Rahwan
  - Fernando Santos
  - Matjaž Perc
  - Valerio Capraro
year: 2026
tags:
  - social-physics
  - human-ai-interaction
  - evolutionary-game-theory
  - ai-governance
---

## TL;DR

This perspective defines a six-part social-physics research agenda for [[concepts/hybrid-human-ai-societies|Hybrid Human-AI Societies]]: social behavior, machine culture, language and behavior, AI delegation, epistemic pipelines, and AI development and regulation. It argues that evolutionary games, cultural-evolution models, behavioral experiments, and LLM-based simulations should be combined to study feedback between human and machine behavior. The paper proposes questions and study designs rather than presenting new experiments or quantitative results.

## Research Question

How should social physics model, measure, and help govern the co-evolution of humans and increasingly autonomous AI systems?

## Motivation

Models developed for human-only populations do not directly capture hybrid societies in which artificial agents can adapt rapidly, operate at scale, coordinate under common ownership, mediate information, and alter the data used to train later systems. The paper argues that this creates feedback among behavior, expectations, institutions, and technical development. Even simple artificial agents have affected coordination and cooperation in prior experiments, while more capable systems add heterogeneity, language, delegation, and governance dynamics.

## Contributions

- Organizes the problem into six connected research directions, each with explicit questions and candidate study designs.
- Extends evolutionary analysis from observable strategies to the cognitive and epistemic processes that generate behavior.
- Treats AI as both a participant in social interaction and an infrastructure that generates, transmits, and selects cultural content.
- Connects individual human-AI interaction to firm, user, and regulator incentives in AI development races.
- Calls for iterative links between formal population models, behavioral experiments, field data, and [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]].

## Method

The article synthesizes work from evolutionary game theory, statistical physics, cultural evolution, behavioral science, principal-agent theory, AI governance, and generative-agent simulation. Its organizing framework treats humans and artificial agents as heterogeneous, co-adapting populations embedded in changing networks and institutions.

The six proposed programs are:

1. **Social behavior:** model cooperation, fairness, trust, reputation, and coordination when human and AI strategies, expectations, and institutional constraints change together.
2. **Machine culture:** study AI systems as generators, transmitters, and selectors of cultural traits, including the effects of recommendation and human-feedback training on diversity and norm formation.
3. **Language and behavior:** formalize how linguistic framing affects strategic choice and how language and behavior evolve jointly in mixed populations.
4. **AI delegation:** model when principals hand decisions to artificial agents and how commitment, exploitation, inequality, dishonesty, and trust affect long-run adoption.
5. **Epistemic pipelines:** represent agent types by mechanisms such as grounding, causal reasoning, confidence, verification, and abstention rather than only by their outputs.
6. **Development and regulation:** analyze strategic interaction among developers, users, and regulators under racing, cooperation, open-source coexistence, auditing, and benefit-sharing arrangements.

The proposed toolkit includes [[concepts/replicator-dynamics|Replicator Dynamics]], stochastic population processes, network and hierarchical models, laboratory and online experiments, A/B tests, scenario analysis, and LLM-agent societies.

## Experiments

The paper reports no original experiment. Instead, Table 1 maps each research direction to possible evidence:

| Direction | Proposed empirical or computational design |
| --- | --- |
| Hybrid social behavior | Calibrate evolutionary and statistical-physics models with experiments or field data; vary AI prevalence, transparency, and coordination. |
| Machine culture | Compare recommender objectives in network models and A/B tests; use generative systems as cultural innovators; analyze human feedback as cultural selection. |
| Language and behavior | Run framing experiments, language-based games, LLM-agent simulations, and meta-analyses linking linguistic features to choices. |
| AI delegation | Compare simple and LLM-based delegates in repeated human-AI laboratory, online, and simulation settings. |
| Epistemic pipelines | Vary grounding, causal reasoning, confidence, abstention, and incentives for verification versus persuasion. |
| Development and regulation | Model firms, regulators, and users under arms races and cooperation; test standards, audits, and benefit-sharing through scenarios and simulations. |

Prior findings are used as motivation, including studies in which small fractions of simple bots changed coordination or stabilized cooperation, and delegation studies reporting both stronger group performance and risks such as inequality, exploitation, or dishonesty. These cited findings are not replications conducted by this paper.

## Limitations

- The agenda is prospective: it does not validate the six-part framework with new data, simulations, or comparative model results.
- The proposed directions are broad and do not specify common outcome measures, calibration criteria, or protocols for comparing models across domains.
- LLM-agent simulations are presented as a fast way to explore co-evolution, but simulated behavior is not evidence of human population dynamics without external validation; see [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- Several motivating claims depend on stylized games or small artificial-agent populations, so their transfer to heterogeneous institutions and deployed systems remains open.
- The treatment of AI epistemic pipelines draws sharp contrasts with human cognition, but the proposed dimensions and their measurement are not yet operationalized.
- The source manuscript contains at least one unresolved citation placeholder in its discussion of framing and provides no stable paper identifier.

## Related Concepts

- [[concepts/hybrid-human-ai-societies|Hybrid Human-AI Societies]]
- [[concepts/replicator-dynamics|Replicator Dynamics]]
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]
- [[concepts/reputation-based-cooperation|Reputation-Based Cooperation]]
- [[concepts/language-mediated-negotiation|Language-Mediated Negotiation]]
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]

## Related Papers

- [[papers/reputation-as-a-solution-to-cooperation-collapse-in-llm-based-mass|Reputation as a Solution to Cooperation Collapse in LLM-based MASs]] studies reputation and adaptive partner selection in simulated LLM populations.
- [[papers/solving-repeated-games-with-large-language-model|Solving Repeated Games with Large Language Model]] examines strategic adaptation by language-model agents in repeated games.
- [[papers/llms-for-social-network-modeling-from-network-generation-to-dynamic-processes|LLMs for Social Network Modeling: From Network Generation to Dynamic Processes]] surveys uses of LLMs in network generation and social-process simulation.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] develops complementary cautions about what social simulations with language models can establish.

[[index|Library home]]
