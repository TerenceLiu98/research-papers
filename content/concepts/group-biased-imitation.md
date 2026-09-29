---
title: Group-Biased Imitation
type: concept
aliases:
  - Group-Biased Rule
  - GB Imitation
tags:
  - social-learning
  - cooperation
  - higher-order-networks
  - evolutionary-game-theory
---

## Overview

Group-biased imitation (GB) is a social-learning rule for overlapping group interactions. A focal individual first selects one of its groups with probability proportional to group success, then selects a member of that group uniformly as a role model. In the model studied by Wang et al., the role model's behavior and imitation rule are copied together when an update occurs.

## Key Ideas

- **It separates group and individual success.** Individual-biased (IB) imitation weights the role model by individual fitness, while group-and-individual-biased (GIB) imitation weights both stages. GB uses group-level fitness but neutral member selection.
- **Group averages can favor cooperation.** In a public goods game, a defector can receive a higher individual payoff than a cooperator in the same group, while a cooperator-rich group can have a higher average payoff than a defector-rich group. GB uses the latter signal.
- **The result is model-dependent.** In Wang et al.'s hypergraph model, GB has the lowest cooperation threshold among the three rules and cooperators preferentially adopt it when rules coevolve. This is not a general theorem about every social-learning environment.
- **Structure controls visibility.** A single well-mixed group offers no competing groups for group-biased selection. Shared nodes or shared groups can anchor several populations and let successful group-level behavior travel between them.
- **Evolutionary and heuristic preferences can differ.** The paper's six LLM families favor GIB in pairwise prompts, even though the evolutionary simulations favor GB for spreading cooperation. The comparison is descriptive rather than a test of LLM adaptation.

## Important Papers

- [[papers/when-groups-attract-coevolutionary-dynamics-of-cooperation-and-individual-and-group-based-imitating-rules|When groups attract: coevolutionary dynamics of cooperation and individual- and group-based imitating rules]]: formalizes IB, GB, and GIB on hypergraphs and reports their coevolution with cooperation.
- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: reviews how explicit group structure changes models of collective behavior.
- Kido and Takezawa (2025), "Empirical evidence for the spread of cooperation through copying successful groups": cited empirical motivation for copying successful groups.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: represent the overlapping groups in which the rule operates.
- [[concepts/public-goods-games|Public Goods Games]]: provide the collective-action setting in which group and individual payoffs diverge.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: related group-based transmission dynamics.
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]: studies feedback between strategic behavior and the environment of interaction or imitation.
