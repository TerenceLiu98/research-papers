---
title: "The Butterfly Defects: Tracing Cooperation in LLM Agent Networks"
type: paper
authors:
  - Maria Sampani
  - Maria Lymperaiou
  - Angeliki Dimitriou
  - Giorgos Filandrianos
  - Chrysoula Zerva
  - Giorgos Stamou
year: null
tags:
  - llm-agents
  - cooperation
  - network-games
  - prompt-sensitivity
---

## TL;DR

Cooperation among LLM agents depends on their partners, network positions, and prompt wording. In networked Iterated Prisoner's Dilemma experiments, mixing models can undermine cooperation observed among identical agents; a cue given to one agent can accompany behavioral changes ten hops away; and reversing action-label order can reverse an intervention's welfare effects. These are controlled simulation findings rather than stable model traits or evidence about human cooperation.

## Research Question

How do heterogeneous model populations, global or localized uncertainty framing, and action-label ordering affect cooperation and the distribution of costs in LLM agent networks?

## Motivation

Dyadic evaluations cannot establish whether cooperative agents form cooperative networks. When one action applies to every neighbor, interactions become coupled, and prompt-induced changes can enter other agents' histories. Measuring both cooperation and costs distinguishes collective improvements from benefits obtained at another agent's expense.

## Contributions

- A controlled networked game varying topology, population composition, and exposure location.
- Matched comparisons between homogeneous and heterogeneous populations, including hub and leaf roles.
- Separate analysis of behavioral spillovers, cost redistribution, and sensitivity to action ordering.

## Method

Agents play 100 rounds on undirected lines, cycles, or stars, observing at most ten previous rounds of their own and neighboring actions. Each broadcasts one C or D action to all neighbors. Pairwise costs are 1 each for mutual cooperation, 2 each for mutual defection, and 0 for a defector versus 3 for its cooperating neighbor. Lower cost is better. Defection is individually dominant in the stage game, while mutual cooperation minimizes joint cost.

Homogeneous populations use a single model; heterogeneous populations alternate small and large models along paths and cycles or reverse their hub/leaf assignments in stars. A textual cue questions neighbor predictability without changing payoffs or environmental randomness. It is supplied globally or to one agent. Separate prompt variants reverse the order of the response labels.

Cooperation is measured over each agent's valid actions. Costs use only rounds in which every agent outputs a valid action; social cost is normalized by nodes and evaluable rounds, not edges. Invalid responses remain in histories without retry or replacement. The sensitivity index is the absolute difference in aggregate cooperation between label orders; it can conceal opposing node-level changes.

## Experiments

The eight instruction-tuned models comprise Qwen2.5 3B, 7B, 14B, and 32B; Llama 3.1 8B and 70B; Mistral 7B v0.2; and Mixtral 8×7B v0.1. Networks contain 4, 10, or 20 nodes, with an additional three-node line. Four within-family heterogeneous pairings are evaluated. Greedy decoding uses three seeds; stochastic dyadic opponents use ten. The horizon is undisclosed. Fixed-policy dyadic references include unconditional cooperation/defection, random play, and history-dependent policies.

| Comparison | Reported finding |
| --- | --- |
| Homogeneous Llama-70B, C-first, cue absent | From 4 to 20 nodes, cooperation falls from 0.96 to 0.05 in cycles but rises from 0.51 to 0.91 in stars (Table 5). |
| Qwen-32B with Qwen-3B, four-node cycle, C-first | Cooperation is 0.015 versus 1.000 in the matched homogeneous baseline; global cue exposure raises it to 0.460 (Table 10). |
| Global cue, same mixed cycle | Qwen-32B individual cost rises from 4.030 to 4.920 while Qwen-3B cost falls from 3.940 to 2.160; social cost per node falls from 3.985 to 3.540 (Table 10). |
| Local cue to Llama-70B hub with 8B leaves | Mean unexposed cooperation changes by +0.411 under C-first but −0.144 under D-first; social cost changes by −0.458 and +0.228 respectively, averaged equally over sizes (Table 11). |
| Label reversal, homogeneous Qwen-32B, 20-node star | Cooperation falls from 1.00 to 0.02 without the cue (Table 5). |
| Homogeneous Qwen-14B order sensitivity | Mean sensitivity rises from approximately 0.001 without the cue to 0.990 with global exposure (Tables 5 and 7). |

Local cue effects need not involve behavioral changes by unexposed agents: Qwen-3B/32B cycles exhibit cost benefits for unexposed nodes with zero mean cooperation change (Table 11). Selected 20-node mixed Llama networks show nonzero cooperation changes ten hops from the exposed agent: +0.010 in a line and −0.020 in a cycle (Table 1). Temporal reach is descriptive and does not prove causal transmission along a particular path.

## Limitations

Evidence covers three canonical topologies, at most 20 agents, selected within-family pairings, one uncertainty cue, and one prompt-order perturbation. Agents neither communicate nor choose neighbor-specific actions. Dyadic and network settings also differ in opponent type and prompt, preventing attribution of their differences solely to network structure.

Greedy seed repetitions often reproduce identical trajectories rather than independent samples. Invalid-output filtering conditions findings on valid actions; some Mistral D-first cost estimates use only one or two jointly valid rounds. Degree affects costs, so matched topology–size comparisons are more informative than raw cross-topology comparisons. The uncertainty cue does not measure subjective uncertainty, and proposed interpretations in terms of trust or risk are hypotheses.

The supplied Markdown does not establish a publication year or stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/network-games|Network Games]]
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]]
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]

## Related Papers

- [[papers/multi-agent-strategic-games-with-llms|Multi-Agent Strategic Games with LLMs]]: a library comparison of controlled strategic interactions and communication treatments; not a baseline in this paper.
- [[papers/reputation-as-a-solution-to-cooperation-collapse-in-llm-based-mass|Reputation as a Solution to Cooperation Collapse in LLM-Based MASs]]: a library comparison using reputation and evolving ties rather than fixed interaction graphs; not a source citation.
- Han et al. (2025), “Static network structure cannot stabilize cooperation among large language model agents”: cited antecedent on networked cooperation.

[[index|Library home]]
