---
title: "CivRealm: A Learning and Reasoning Odyssey in Civilization for Decision-Making Agents"
type: paper
authors:
  - Siyuan Qi
  - Shuo Chen
  - Yexin Li
  - Xiangyu Kong
  - Junqi Wang
  - Bangcheng Yang
  - Pring Wong
  - Yifan Zhong
  - Xiaoyuan Zhang
  - Zhaowei Zhang
  - Nian Liu
  - Wei Wang
  - Yaodong Yang
  - Song-Chun Zhu
year: 2024
source_job_id: "5b8843a3-4181-464e-a7b5-81c1e026ede1"
tags:
  - reinforcement-learning
  - llm-agents
  - multi-agent-systems
  - game-playing
  - generalization
---

## TL;DR

CivRealm turns the open-source strategy game Freeciv into a benchmark for agents that must combine learning with reasoning under partial observability, stochastic dynamics, multiple victory conditions, changing state and action spaces, and diplomacy. It exposes tensor and language interfaces, ten families of procedurally generated mini-games, and a full game. A PPO-based tensor agent learns some short-horizon mini-games, while the BaseLang and hierarchical Mastaba language agents make limited full-game progress; none of the reported baselines solves the long-horizon strategic challenge.

## Research Question

Can a Civilization-style environment evaluate whether decision-making agents generalize by learning from limited interaction while reasoning through novel, long-horizon, multi-agent situations?

## Motivation

Many interactive benchmarks emphasize policy learning in environments whose state and action spaces remain comparatively fixed. Civilization instead couples economic development, technology, warfare, and diplomacy over games lasting hours or days. As civilizations develop, the number of entities and available decisions grows, early choices can affect outcomes hundreds of turns later, and agents must adapt to incomplete information, random events, shifting alliances, and changing player populations.

## Contributions

- Wraps Freeciv in an agent-architecture-agnostic server-proxy-client framework with both tensor and natural-language APIs.
- Defines a full-game benchmark with imperfect information, stochastic dynamics, multiple victory paths, dynamically changing spaces, explicit communication, and mixed cooperative-competitive incentives.
- Provides procedurally generated development, battle, and diplomacy mini-games, with 10,000 instances per reported type and easy, normal, and hard configurations.
- Implements three baselines: a hierarchical PPO agent, the AutoGPT-like BaseLang agent, and Mastaba, which adds a nationwide advisor and broader multiscale map observations to local language-model workers.
- Reports that current tensor and language baselines remain substantially weaker on the full game than on narrower mini-games.

## Method

CivRealm connects agents to a Freeciv server through a proxy that converts game state into observations and valid actions. Tensor observations cover the map, units, cities, government, technology, and diplomacy. Variable numbers of entities are embedded into fixed-size tensors by truncating excess entries and masking absent ones. Actions are organized into unit, city, diplomacy, government, and technology groups; parameterized actions use masks to accommodate changing entity sets.

The tensor baseline encodes vectors, sequences, and map-like inputs with MLPs, Transformers, and CNNs, integrates entities with another Transformer, and carries history through an RNN. A hierarchical actor first selects an action category and then a target and concrete action, while a shared value head supports PPO training. The reported configuration uses eight parallel environments and episodes of 125 action-level steps.

BaseLang assigns a separate language-model instance and context history to each controlled unit. Each instance observes a local 5 by 5 tile window, produces thought, reasoning, and command stages, and either retrieves Freeciv manual or interaction-history information from a vector database or selects a valid action.

Mastaba adds hierarchical coordination. A nationwide advisor summarizes cities, units, other players, and threats, then sends turn-level guidance to local workers. Each worker retains detailed local observations while receiving a compressed 15 by 15 view represented as nine 5 by 5 blocks. This design is an instance of hierarchical coordination within [[concepts/llm-multi-agent-systems|LLM multi-agent systems]].

## Experiments

For each selected mini-game and difficulty level, the tensor baseline is trained for more than 40,000 steps with three random seeds. It reaches about 90% success on the comparatively immediate-reward CityTileWonder task, but performance varies considerably across tasks. Sparse and delayed rewards and longer planning horizons remain difficult, and the paper reports shortcut learning on the hard SettlerBuildCity setting.

In the full game, the tensor agent is trained for more than two million steps. Its score improves largely through unit production, but the authors characterize this as myopic: founding additional cities can reduce short-term population and score while supporting longer-term technological and economic growth.

BaseLang and Mastaba are compared on ten distinct maps, with five full games per method on each map. Mastaba develops larger populations and militaries, reaches higher scores, and explores and settles more territory earlier than BaseLang. The global advisor and multiscale observation therefore improve coordination over isolated local workers. However, Mastaba still achieves only moderate expansion and fails to defend against pirate invasions; BaseLang sometimes survives longer because its slower growth delays the score threshold that triggers those invasions.

## Limitations

- None of the baselines demonstrates strong full-game play or reaches a reported victory condition, so CivRealm is primarily established as a difficult benchmark rather than a solved environment.
- Mini-game success does not establish long-horizon competence: some tasks provide immediate feedback, while the full game has sparse, delayed, asynchronous rewards and interacting objectives.
- The tensor agent's higher score is driven mainly by short-term unit production rather than a strategically balanced development policy.
- BaseLang and Mastaba use GPT-3.5-turbo and remain constrained by context length, local observation selection, retrieval quality, and weak grounding of general knowledge in the current game state.
- The language-agent comparison covers two related architectures in one environment; it does not isolate the advisor, larger observation, specialist prompts, and other Mastaba changes through ablation.
- The estimated state and action-space sizes are illustrative lower-bound calculations based on assumed game configurations, not empirical measures of the reachable space.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: Mastaba coordinates an advisor with specialized local workers and separates global guidance from entity-level action selection.

## Related Papers

- [[papers/integrating-large-language-models-with-reinforcement-learning-for-generalization-in-strategic-card-games|Integrating Large Language Models with Reinforcement Learning for Generalization in Strategic Card Games]]: combines language representations and reinforcement learning in a narrower strategic game, with emphasis on transfer to unseen cards rather than open-ended, dynamically expanding play.
- Vinyals et al. (2019), "Grandmaster Level in StarCraft II Using Multi-Agent Reinforcement Learning": motivates the tensor architecture, while CivRealm emphasizes turn-based long-horizon reasoning and diplomacy.
- Bakhtin et al. (2022), "Human-Level Play in the Game of Diplomacy by Combining Language Models with Strategic Reasoning": provides a related benchmark for strategic communication and negotiation.
- Wang et al. (2023), "Voyager: An Open-Ended Embodied Agent with Large Language Models": represents the paper's comparison class of language agents that accumulate experience in open-ended environments.

[[index|Library home]]
