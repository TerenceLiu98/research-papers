---
title: "LLMs for Social Network Modeling: From Network Generation to Dynamic Processes"
type: paper
authors:
  - Shikha Mallick
  - Alex Thomo
  - Akrati Saxena
year: 2026
tags:
  - llm-agents
  - social-networks
  - network-generation
  - opinion-dynamics
  - information-diffusion
---

## TL;DR

This survey organizes [[LLM-Based Social Network Modeling]] into network generative models and dynamic process models. Generative approaches either select edges directly from structural or attribute context or derive ties from repeated interaction. Dynamic approaches simulate opinion change, information diffusion, or rumor propagation. Across these areas, language models add context-sensitive communication and decisions, but behavioral realism, scalability, bias, reproducibility, causal validity, and validation against human social systems remain unresolved.

## Research Question

How are LLM agents used to generate social-network structure and simulate networked social processes, what mechanisms distinguish the resulting methods, and which technical and empirical limitations constrain their use?

## Motivation

Classical network models provide interpretable rules for tie formation and diffusion but simplify users and communication. Deep graph models learn structural patterns from data but usually represent actors and interactions latently. LLM agents can instead express personas, messages, memory, and context-dependent choices in natural language. The relevant work is distributed across graph learning, computational social science, and multi-agent research, motivating a mechanism-centered synthesis focused on the network itself and the processes unfolding over it.

## Contributions

- Separates LLM-based social network modeling into **network generative models**, which create or infer edges, and **dynamic process models**, which update node states and actions through networked interaction.
- Divides network generators into **selection-based** methods, conditioned primarily on structure or attributes, and **interaction-based** methods, in which ties emerge from repeated behavior.
- Classifies dynamic models into [[Opinion Dynamics]], information diffusion, and [[Misinformation Spreading Models|rumor propagation]], then distinguishes their mechanisms: dialogue, exposure, theory, and co-evolution for opinions; content and adoption for diffusion; and belief, transformation, and intervention for rumors.
- Compares the reviewed systems by LLM backbone, fine-tuning, real datasets, evaluation, and code availability.
- Identifies research priorities in validation, scale, fairness, co-evolving networks, theory-guided models, and hybrid human-LLM networks.

## Method

The paper is a structured literature survey rather than a new simulation or benchmark. Its organizing unit is the mechanism by which an LLM affects a network:

1. **Selection-based network generation:** an agent chooses connection targets from a fixed set, using topology such as degree and neighborhoods, attributes such as demographics and political affiliation, or both.
2. **Interaction-based network generation:** repeated communication or actor-item activity produces, strengthens, or weakens edges over time.
3. **Dynamic process modeling:** agents observe network-local messages or exposures and update opinions, adoption decisions, beliefs, content, or retransmission behavior.

The survey also records model backbones, fine-tuning choices, datasets, and reported code for the reviewed methods in two supplementary tables. Its analysis emphasizes that final network statistics alone do not validate the edge-formation process, and plausible aggregate trajectories do not establish human behavioral or causal fidelity.

## Experiments

The survey does not report a new controlled experiment or meta-analysis. Instead, it synthesizes reported findings across representative systems. Selection-based generators can recover clustering, modularity, heavy-tailed degree patterns, triadic closure, and homophily, but results vary with prompt design, candidate sets, model scale, culture, and language; several studies report exaggerated political or religious homophily. Interaction-based systems generate evolving ties and actor-item networks but require many model calls and calibration of relationship updates.

For dynamic processes, dialogue and exposure studies produce consensus, fragmentation, echo chambers, polarization, selective persuasion, and majority dominance under different prompts and network conditions. Hybrid theory-guided systems combine LLM-generated language or cognition with formal opinion or diffusion rules. Rumor models additionally represent belief change, semantic degradation, poisoning, censorship, and fact-checking. Scaling strategies include group agents, distributed execution, and selective LLM reasoning near behaviorally important boundaries, each trading individual heterogeneity for computational reach.

## Limitations

- The survey reports a rapidly changing literature with heterogeneous tasks, datasets, models, and evaluation protocols; its taxonomy is a synthesis, not evidence that methods within a category are directly comparable.
- Many reviewed studies validate plausible outputs rather than causal mechanisms or correspondence with human behavior. Individual plausibility can coexist with excessive consensus, homophily, or polarization at population level.
- Results are sensitive to prompts, model families, personas, update rules, network structure, and simulation configuration, while complete reproducibility details and computational costs are often missing.
- Per-agent, multi-round inference limits scale. Group agents and hybrid behavioral rules reduce cost but may conceal within-group variation or replace the mechanism under study.
- LLM bias can distort connectivity, exposure, influence, and inferred social behavior. Simulations grounded in real profiles also introduce privacy and harmful-persuasion risks.
- Most systems model only part of the feedback among ties, identities, memory, content, opinions, and platform recommendations. Long-horizon co-evolution and mixed human-AI networks remain lightly validated.

## Related Concepts

- [[LLM-Based Social Network Modeling]]
- [[Hybrid LLM Agent-Based Simulation]]
- [[LLM Multi-Agent Systems]]
- [[Social Network Analysis]]
- [[Opinion Dynamics]]
- [[Misinformation Spreading Models]]
- [[Validity Boundaries for LLM Social Simulations]]
- [[Social-Semantic Coevolution]]

## Related Papers

- [[Public opinion dissemination simulation based on large language model multi-agent systems]] is a reviewed theory-guided opinion-dynamics system that combines probabilistic behavioral rules with LLM cognition and text generation.
- [[Social opinions prediction utilizes fusing dynamics equation with LLM-based agents]] is a hybrid opinion model reviewed by the survey.
- Chang et al. (2025), "LLMs Generate Structurally Realistic Social Networks but Overestimate Political Homophily," studies attribute-conditioned network generation and documents a recurring realism failure.
- Chuang et al. (2024), "Simulating Opinion Dynamics with Networks of LLM-Based Agents," studies dialogue-based belief updating, consensus, and prompted confirmation bias.
- Gao et al. (2023), "S3: Social-network Simulation System with Large Language Model-empowered Agents," grounds content diffusion agents in social-network data.
- Hu et al. (2025), "Simulating Rumor Spreading in Social Networks Using LLM Agents," models belief and retransmission across synthetic and real networks.

[[index|Library home]]
