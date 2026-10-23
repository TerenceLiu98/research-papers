---
title: "LLM Multi-Agent Systems: Challenges and Open Problems"
type: paper
authors:
  - Shanshan Han
  - Qifan Zhang
  - Yuhang Yao
  - Weizhao Jin
  - Zhaozhuo Xu
  - Chaoyang He
year: 2024
arxiv: "2402.03578"
tags:
  - llm-agents
  - multi-agent-systems
  - agent-planning
  - agent-memory
---

## TL;DR

This perspective survey organizes [[concepts/llm-multi-agent-systems|LLM multi-agent systems]] around four structural forms and two core engineering problems: planning across specialized agents and managing layered memory. It argues that effective systems must align global task allocation, local reasoning, inter-agent context, and shared objectives, while distinguishing private, transient, persistent, episodic, and consensus information. Its blockchain examples are proposed application directions rather than experimentally validated systems.

## Research Question

Which challenges distinguish LLM multi-agent systems from single-agent systems, particularly in system structure, task planning, context alignment, and memory management, and how might those capabilities be applied to blockchain systems?

## Motivation

Single-agent planning methods decompose a task within one model context. Multi-agent systems add heterogeneous roles, communication paths, intermediate outputs, and shared state. The authors argue that these additions create system-level problems that cannot be reduced to better local reasoning alone: work must be assigned according to specialization, intermediate results may require iterative debate, and every agent must reconcile its local context with information from peers and the overall objective.

## Contributions

- Distinguishes equi-level, hierarchical, nested, and dynamic multi-agent structures according to roles, authority, and whether membership or relationships can change during execution.
- Separates global planning, which decomposes and allocates the overall workflow, from local planning inside each agent.
- Frames iterative discussion among subsets of agents and game-theoretic equilibrium as possible coordination mechanisms, while identifying payoff design and efficient equilibrium computation as unresolved problems.
- Classifies memory as short-term, long-term, external, episodic, or consensus memory and identifies access control, integrity, communication, and retrieval as central management challenges.
- Proposes blockchain-oriented applications in smart-contract analysis, consensus monitoring, fraud detection, and agent-mediated node participation.

## Method

The paper is a narrative survey and research agenda rather than a systematic review. It first classifies multi-agent organization. Equi-level systems coordinate peers; hierarchical systems place followers under a leader; nested systems combine peer and leader-follower substructures; and dynamic systems can change roles, relations, or active agents over time.

For planning, the paper separates **global planning** from **single-agent task decomposition**. Global planning maps subtasks to agent capabilities and may introduce discussion loops to refine intermediate outputs. Local planning can use chain-, tree-, table-, program-, graph-, or ensemble-based reasoning, but must also align the agent's task with system-wide goals and context received from other agents. The paper uses Nash and Stackelberg equilibria as conceptual tools for analyzing strategic interaction, not as a complete coordination algorithm.

For memory, the taxonomy separates transient conversational state, persistent interaction history, retrieved external knowledge, records of prior multi-agent episodes, and consensus memory shared across agents. The associated design questions concern which agents can access which information, how shared knowledge is protected and updated, and how relevant portions of past interactions are retrieved for a new task.

## Experiments

The paper reports no original experiments, benchmark comparisons, ablations, or implemented blockchain case study. Evidence consists of examples and findings synthesized from cited work. Consequently, the proposed taxonomy and open problems should be read as an organizing perspective rather than an empirically tested architecture or ranking of design choices.

## Limitations

- The literature synthesis does not report a search strategy, inclusion criteria, coverage period, or quality-assessment procedure, so its completeness cannot be evaluated as a systematic review.
- The structural and memory categories are conceptual and can overlap in deployed systems; the paper does not operationalize measurements for comparing architectures.
- Debate and game-theoretic coordination are motivated through prior work, but the paper does not establish when added agents or loops improve accuracy enough to offset communication and inference costs.
- The memory discussion identifies privacy, integrity, and access-control risks without specifying a threat model or evaluating a concrete protection mechanism.
- The blockchain section presents possible uses. It does not demonstrate secure smart-contract analysis, consensus improvement, fraud detection, negotiation, or gas optimization in a running blockchain network.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]
- [[concepts/federated-multi-agent-systems|Federated Multi-Agent Systems]]
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]

## Related Papers

- Du et al. (2023), "Improving Factuality and Reasoning in Language Models through Multiagent Debate": cited as evidence for iterative multi-agent debate.
- Li et al. (2023), "CAMEL: Communicative Agents for 'Mind' Exploration of Large Scale Language Model Society": cited as a role-playing, communicative-agent framework.
- Park et al. (2023), "Generative Agents: Interactive Simulacra of Human Behavior": cited for interactive agents with memory and reflection.
- Jinxin et al. (2023), "CGMI: Configurable General Multi-Agent Interaction Framework": cited for configurable interactions, working memory, and a shared skill library.
- [[papers/privacy-enhancing-paradigms-within-federated-multi-agent-systems|Privacy-Enhancing Paradigms within Federated Multi-Agent Systems]] develops an execution-time privacy mechanism for a narrower version of the access-control problem identified by this survey; it is a library comparison, not a citation in the survey.

[[index|Library home]]
