---
title: Belief-Desire-Intention Architecture
type: concept
aliases:
  - BDI
  - BDI Framework
tags:
  - agent-architecture
  - llm-agents
  - agent-based-models
---

## Overview

The Belief-Desire-Intention (BDI) architecture organizes an agent around its representation of the environment, the goals it considers, and the actions it commits to pursuing. It provides a structure for relating perception and deliberation to action and subsequent revision. In LLM simulations, these components can be expressed through prompts, stored states, retrieval operations, and constrained action outputs.

## Key Ideas

- **Beliefs represent perceived conditions.** They can combine observations, history, and subjective interpretation. An agent's belief is not necessarily a correct description of the environment.
- **Desires specify goals.** In TwinMarket, this stage includes proactively querying market and news information to refine possible investment decisions.
- **Intentions commit to feasible actions.** The selected plan depends on beliefs, goals, and constraints such as available capital or holdings. The environment still determines the consequences of execution.
- **Close the feedback loop.** Perception, goal generation, planning, execution, environmental response, and belief revision create an evolving agent rather than a sequence of isolated prompts.
- **Separate architectural structure from cognitive validity.** Readable belief narratives and explicit stages make a simulation easier to inspect, but do not establish that its internal reasoning or behavior matches human cognition.
- **Test components separately.** TwinMarket's belief-update and information-seeking ablations worsen retrospective price fit. They provide evidence about those components in that simulator, rather than proving that BDI is necessary for all realistic agent models.

## Important Papers

- Rao and Georgeff et al. (1995), "BDI agents: From theory to practice": the foundational reference cited by TwinMarket.
- [[papers/twinmarket-a-scalable-behavioral-and-social-simulation-for-financial-markets|TwinMarket: A Scalable Behavioral and Social Simulation for Financial Markets]] implements a BDI cycle for investors who retrieve information, trade, interact socially, and update beliefs. Appendix E.2 specifies the cycle; Table 9 ablates belief revision and active information seeking.

## Related Concepts

- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: combines language-based cognition with explicit environment dynamics.
- [[concepts/economic-world-models|Economic World Models]]: embeds agent decisions in market mechanisms and resource constraints.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: constrains inferences from an implemented cognitive architecture to human populations.
