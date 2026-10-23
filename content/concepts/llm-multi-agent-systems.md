---
title: LLM Multi-Agent Systems
type: concept
aliases:
  - LLM-Based Multi-Agent Systems
  - Large Language Model Multi-Agent Systems
tags:
  - llm-agents
  - multi-agent-systems
  - agent-planning
  - agent-memory
---

## Overview

LLM multi-agent systems coordinate multiple language-model agents toward an individual or shared objective. Agents may have different roles, tools, information, or strategies, and their outputs become inputs to other agents or to a system-level decision. The defining problem is therefore not merely producing several model responses, but organizing authority, task allocation, communication, shared state, and stopping conditions so that local work contributes coherently to the overall task.

## Key Ideas

- **Organization shapes interaction.** Peers can deliberate at the same level, leaders can assign work to followers, nested groups can solve subtasks, and [[concepts/dynamic-agent-structure|dynamic structures]] can change roles or membership during execution.
- **Global and local planning are coupled.** A coordinator must decompose the overall workflow and match subtasks to agent capabilities. Each agent must then decompose its own assignment while preserving dependencies and the system objective.
- **Context has layers.** An agent may need the global task, its local instructions, peer outputs, external evidence, and shared conventions. Passing more context does not itself guarantee alignment; the system must determine which information is relevant and authoritative.
- **Discussion loops need explicit control.** Debate, critique, and revision can explore alternatives or repair intermediate results, but require selection rules, termination conditions, and accounting for added inference and communication costs.
- **Memory has distinct scopes.** Short-term state supports a current interaction; long-term and episodic memory preserve prior work; external stores supply retrieved knowledge; consensus memory represents shared information. Access, update, provenance, and retrieval policies differ across these scopes.
- **Security follows information flow.** Role-specific access and data minimization become important when agents hold private information. [[concepts/federated-multi-agent-systems|federated multi-agent systems]] focus on these execution-time boundaries.
- **More agents are not automatically better.** Claims of improvement require comparisons against strong single-agent or simpler workflow baselines, along with measurements of quality, latency, token use, robustness, and failure propagation.

## Important Papers

- [[papers/llm-multi-agent-systems-challenges-and-open-problems|LLM Multi-Agent Systems: Challenges and Open Problems]] organizes the field around structural forms, global and local planning, layered context, and a taxonomy of memory, then identifies open problems in coordination and memory management.
- Du et al. (2023), "Improving Factuality and Reasoning in Language Models through Multiagent Debate," studies iterative debate as a reasoning scaffold.
- Li et al. (2023), "CAMEL: Communicative Agents for 'Mind' Exploration of Large Scale Language Model Society," develops role-conditioned communication between agents.
- Park et al. (2023), "Generative Agents: Interactive Simulacra of Human Behavior," combines observation, memory, reflection, and planning in an interactive multi-agent environment.

## Related Concepts

- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]
- [[concepts/federated-multi-agent-systems|Federated Multi-Agent Systems]]
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]]

