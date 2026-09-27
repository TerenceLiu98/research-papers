---
title: "BattleAgent: Multi-modal Dynamic Emulation on Historical Battles to Complement Historical Analysis"
type: paper
authors:
  - Shuhang Lin
  - Wenyue Hua
  - Lingyao Li
  - Che-Jui Chang
  - Lizhou Fan
  - Jianchao Ji
  - Hang Hua
  - Mingyu Jin
  - Jiebo Luo
  - Yongfeng Zhang
year: null
source_job_id: "ce588c8f-1186-437e-b5c7-2288201fd399"
tags:
  - llm-agents
  - multi-agent-systems
  - historical-simulation
  - vision-language-models
  - simulation-validity
---

## TL;DR

BattleAgent combines language and vision-language agents with a spatial sandbox to emulate four medieval battles. Agents observe terrain, select actions, and split, merge, or leave the active simulation, while a GPT-4 observer estimates casualties. Five runs per battle and model show substantial dependence on the backbone: some final casualty estimates resemble the paper's historical reference values, but English casualties are consistently overestimated at Crecy, Agincourt, and Poitiers. The evidence supports a demonstration of dynamic simulation, with limited validation of historical fidelity.

## Research Question

Can LLMs and VLMs generate plausible spatial, tactical, and organizational dynamics in historical battle simulations, and how closely do their final casualty estimates match historical records?

## Motivation

The paper positions BattleAgent as a finer-grained extension of WarAgent's simulation of nations and governments. Historical maps and army profiles provide a setting for exploring local decisions, terrain interactions, and evolving military units. The authors propose uses in historical visualization, education, and game engines, but do not evaluate learning outcomes, empathy, or conflict prevention.

## Contributions

- Integrates textual environment descriptions and, for multimodal backbones, map images into a two-dimensional battle sandbox.
- Uses [[concepts/dynamic-agent-structure|Dynamic Agent Structure]] to change the population of autonomous units through forking, merging, and pruning.
- Couples agent decisions with an LLM observer that estimates losses from unit state, actions, terrain, and weapon information.
- Demonstrates the system on Crecy, Agincourt, Poitiers, and Falkirk, comparing casualties with historical reference figures and inspecting movement and action traces manually.

## Method

### State and Space

Each simulation starts with two opposing army agents. Profiles contain a unique identifier, command structure, morale and discipline, strategy, equipment, force size and composition, and location. Maps from historical sources supply terrain and initial positions. One army position becomes the coordinate origin; one coordinate unit represents 10 yards, with landmark positions and distances estimated from the map (Sections 2-3).

### Decision Cycle

Time advances in 15-minute intervals. Agents observe the environment, select actions, update their locations and properties, and receive casualty updates before the next cycle. Section 2.2 describes an action space of 51 actions grouped into repositioning, preparation, attack, defense, observation, and retreat. Agents may choose combinations of actions, interact with terrain, and produce destination coordinates for the next interval.

Forking allocates part of a force to a new autonomous unit with a mission, position, soldier count, and soldier type, while inheriting its army's profile. Merging combines forces with a nearby allied agent. Pruning removes an overwhelmed or retreating agent from the active force. Unit missions, positions, and force sizes can change over time (Section 3.3).

### Casualty Observer

A GPT-4 evaluator estimates losses when agents engage. Inputs include force composition and command structure, action names and descriptions, relative positions and terrain, and weapon parameters such as range and damage (Section 3.4). Although the authors describe this observer as objective, the estimates remain model-generated; the paper does not establish an independently calibrated combat model.

The authors provide a [code and data repository](https://github.com/agiresearch/battleagent). The supplied Markdown does not state this paper's publication year, venue, DOI, or arXiv identifier, so those details are not inferred.

## Experiments

### Design

Section 4 compares Claude-3-opus, GPT-4-1106-preview, and GPT-4-vision on four battles, with five runs under the same settings per battle-model combination. Runs continue until both armies' casualty totals stabilize. Evaluation comprises final casualty agreement with historical figures, human analysis of unit movement, and human analysis of actions. The latter two assessments use visualizations and examples rather than a reported numerical benchmark.

### Reported Casualties

Table 2 reports means and standard deviations across runs. All values below are in thousands of casualties; historical figures are the paper's reference values, not independently verified estimates. France is the opposing side in the first three battles and Scotland in Falkirk.

| Battle | Model | France/Scotland, mean +/- SD | Historical France/Scotland | England, mean +/- SD | Historical England |
| --- | --- | ---: | ---: | ---: | ---: |
| Crecy | Claude-3 | 19.2 +/- 8.3 | 10-30 | 7.7 +/- 2.5 | 0.1-0.3 |
| Crecy | GPT-4 | 10.1 +/- 2.5 | 10-30 | 3.8 +/- 2.0 | 0.1-0.3 |
| Crecy | GPT-4-vision | 14.0 +/- 2.5 | 10-30 | 4.5 +/- 2.0 | 0.1-0.3 |
| Agincourt | Claude-3 | 27.5 +/- 5.0 | 4-10 | 5.7 +/- 0.1 | 0.1-1.5 |
| Agincourt | GPT-4 | 5.3 +/- 0.4 | 4-10 | 2.8 +/- 0.1 | 0.1-1.5 |
| Agincourt | GPT-4-vision | 8.3 +/- 0.1 | 4-10 | 2.9 +/- 0.1 | 0.1-1.5 |
| Poitiers | Claude-3 | 10.1 +/- 2.3 | 5-7 | 3.6 +/- 1.3 | 0.04 |
| Poitiers | GPT-4 | 6.8 +/- 1.0 | 5-7 | 1.9 +/- 0.7 | 0.04 |
| Poitiers | GPT-4-vision | 4.8 +/- 1.8 | 5-7 | 2.3 +/- 0.5 | 0.04 |
| Falkirk | Claude-3 | 5.4 +/- 0.4 | 2 | 8.1 +/- 1.6 | 2 |
| Falkirk | GPT-4 | 2.2 +/- 1.0 | 2 | 1.9 +/- 0.7 | 2 |
| Falkirk | GPT-4-vision | 2.0 +/- 1.3 | 2 | 1.9 +/- 0.9 | 2 |

Claude-3 produces the highest mean casualties for both sides in every battle. GPT-4 and GPT-4-vision approximate both sides' reference totals at Falkirk, but all models overestimate mean English losses in the other three battles. For Poitiers, for example, GPT-4 reports 1,900 English casualties against a reference of 40. These comparisons do not show a consistent casualty-accuracy advantage for the vision model.

### Qualitative Observations

Appendix A illustrates a GPT-4 Crecy run in which armies split into smaller units and some English longbow units keep their distance while attacking. Another example contrasts cautious English actions with aggressive French actions. These are illustrative generated trajectories, not independently recovered historical sequences. Section 4 explicitly reports that current models have a limited understanding of distance, affecting movement decisions.

## Limitations

- Final casualty agreement cannot establish the authenticity of intermediate decisions or movements; detailed historical documentation is scarce, and process evaluation is primarily manual.
- Large errors, especially for English losses in three battles, constrain claims of faithful reconstruction. The historical reference ranges also vary considerably in precision.
- Casualties are generated by GPT-4 across the evaluated backbones. Outcome comparisons therefore depend on a shared model-based adjudicator whose independent accuracy is not established.
- The four scenarios are two-sided medieval battles. Transfer to other periods, more factions, or broader social events is not demonstrated.
- No isolated ablation establishes the benefit of dynamic structure or map input, and the paper does not report sensitivity tests for the 15-minute interval or map-coordinate estimates.
- Expert systems for observation and casualty estimation are proposed as future work. Educational benefits and game-engine potential remain proposed applications.

## Related Concepts

- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]: changes the active units and their resource allocation during a simulation.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: connects validation evidence to the scope of historical and behavioral claims.
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]]: a related use of artificial agents to examine strategic choices, with limits on inference about real actors.

## Related Papers

- Hua et al. (2023), "War and peace (waragent): Large language model-based multi-agent simulation of world wars," arXiv:2311.17227: the cited predecessor at the level of nations and governments.
- Liu et al. (2023), "Dynamic llm-agent network: An llm-agent collaboration framework with agent team optimization," arXiv:2310.02170: cited background for dynamic agent organization.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]]: a library comparison on aligning claim scope with validation evidence; not a citation in BattleAgent.
- [[papers/multi-agent-strategic-games-with-llms|Multi-Agent Strategic Games with LLMs]]: a library comparison using controlled security-dilemma games rather than historical battle reconstruction; not a citation in BattleAgent.

[[index|Library home]]
