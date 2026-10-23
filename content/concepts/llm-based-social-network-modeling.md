---
title: LLM-Based Social Network Modeling
type: concept
aliases:
  - LLM Social Network Modeling
  - Large Language Model-Based Social Network Modeling
tags:
  - llm-agents
  - social-networks
  - network-generation
  - social-simulation
---

## Overview

LLM-based social network modeling uses language-model agents as participants in the formation or evolution of a network. Agents may create social ties, generate and interpret messages, update opinions, adopt behaviors, or believe and retransmit rumors. Unlike using an LLM only as a classifier over static graph data, the model is part of an iterative process: one agent's output changes the network or information environment encountered by later agents.

## Key Ideas

- **Network generation and dynamic processes are distinct targets.** Network generators produce or infer edges; dynamic models hold or evolve a network while changing node states, actions, or content.
- **Edges can be selected or emerge through interaction.** Selection-based generators ask agents to choose ties using structural context, attributes, or both. Interaction-based generators infer changing relationships from communication or actor-item activity over multiple rounds.
- **Language makes influence content-sensitive.** In [[Opinion Dynamics]], information diffusion, and [[Misinformation Spreading Models|rumor propagation]], agents can respond to arguments, framing, personas, memory, and semantic changes rather than only fixed probabilities or scalar states.
- **Topology and language form a feedback loop.** Connections determine exposure, generated content changes later decisions, and co-evolutionary models allow beliefs, topics, and ties to reshape one another. This connects the field to [[Social-Semantic Coevolution]].
- **Hybrid models expose some mechanisms.** [[Hybrid LLM Agent-Based Simulation]] assigns structured choices to equations or probabilistic rules and semantic tasks to an LLM. This can improve interpretability, but conclusions still depend on both the formal model and the LLM behavior.
- **Structural realism is not behavioral validity.** Matching clustering, modularity, cascade size, or an aggregate trajectory does not establish that individual choices, causal mechanisms, or population heterogeneity resemble humans. [[Validity Boundaries for LLM Social Simulations]] ties the claim scope to the evidence actually validated.
- **Scale changes the model.** Group agents, distributed execution, and selective LLM reasoning can support much larger populations, but aggregation and proxy rules may suppress precisely the heterogeneity or interaction mechanism being studied.
- **Bias is network-forming.** Prompt and model biases can alter who connects, which content is seen, and who exerts influence. Repeated findings of exaggerated homophily show that bias can become a property of the generated topology rather than only of isolated text.

## Important Papers

- [[papers/llms-for-social-network-modeling-from-network-generation-to-dynamic-processes|LLMs for Social Network Modeling: From Network Generation to Dynamic Processes]] develops a mechanism-centered taxonomy spanning network generation, opinion dynamics, information diffusion, and rumor propagation.
- Chang et al. (2025), "LLMs Generate Structurally Realistic Social Networks but Overestimate Political Homophily," compares global, local, and sequential persona-based network generation.
- Chuang et al. (2024), "Simulating Opinion Dynamics with Networks of LLM-Based Agents," demonstrates dialogue-based opinion updating and its sensitivity to prompted cognitive bias.
- Ji et al. (2025), "LLM-Based Multi-Agent Systems Are Scalable Graph Generative Models," generates evolving actor-item networks from repeated agent activity.
- Gao et al. (2023), "S3: Social-network Simulation System with Large Language Model-empowered Agents," simulates content creation and forwarding with agents grounded in social-network data.
- [[Public opinion dissemination simulation based on large language model multi-agent systems]] combines explicit action and target-selection rules with LLM-generated personas and content.

## Related Concepts

- [[Social Network Analysis]]
- [[LLM Multi-Agent Systems]]
- [[Hybrid LLM Agent-Based Simulation]]
- [[Opinion Dynamics]]
- [[Misinformation Spreading Models]]
- [[Social-Semantic Coevolution]]
- [[Validity Boundaries for LLM Social Simulations]]
