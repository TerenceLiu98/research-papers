---
title: "Cooperate or Collapse: Emergence of Sustainable Cooperation in a Society of LLM Agents"
type: paper
authors:
  - Giorgio Piatti
  - Zhijing Jin
  - Max Kleiman-Weiner
  - Bernhard Schölkopf
  - Mrinmaya Sachan
  - Rada Mihalcea
year: 2024
tags:
  - llm-agents
  - cooperation
  - social-dilemmas
---

## TL;DR

GOVSIM evaluates whether LLM agents can sustain a regenerating shared resource while pursuing individual income. Across three scenarios, GPT-4o achieves the strongest reported baseline survival rate, 53.3%. Communication supports restraint, and prompts that make the consequences of universal adoption salient improve average survival time by four months in the reported comparison.

## Research Question

Can interacting LLM agents negotiate sustainable resource-use norms, and what reasoning capabilities and communication mechanisms support those norms?

## Motivation

Individual reward seeking can exhaust a resource that everyone needs for future income. Static question-answering evaluations miss this feedback between decisions, collective outcomes, and negotiation. [[concepts/common-pool-resource-dilemmas|Common-Pool Resource Dilemmas]] provide an observable test of cooperation without relying solely on human judgments of acceptable behavior.

## Contributions

- Introduces three mathematically equivalent resource-sharing scenarios with natural-language interaction.
- Benchmarks instruction-tuned open- and closed-weight models using survival, gain, efficiency, equality, and over-usage.
- Tests universalization prompts, communication removal, a selfish newcomer, and individual reasoning subskills.

## Method

Five agents share fish, pasture, or clean water. Resource capacity is 100 units; after harvesting, the remaining stock doubles up to capacity. At full stock, total extraction of 50 units permits regeneration to 100, corresponding to 10 units per agent under equal sharing. Collapse occurs when the stock falls below five units.

Agents submit desired extraction privately and simultaneously. If demand exceeds supply, resources are randomly allocated unit by unit until exhausted or demands are met. Actions become public, and agents discuss subsequent behavior. The architecture adapts generative-agent memory, reflection, planning, and moderated group conversation to these structured phases. Agents are instructed to maximize long-run income.

Universalization adds a memory statement describing resource decline if everyone exceeds a sustainable extraction level. This intervention supplies an explicit consequence cue; it does not train the models or establish that they independently derive a moral principle.

## Experiments

Runs last up to 12 months, with five seeds per scenario and temperature zero. Table 1 aggregates three scenarios; its survival-time intervals are labeled 95% confidence intervals.

| Model | Survival rate (%) | Survival time (months) |
| --- | --- | --- |
| GPT-4o | 53.3 | 9.3 ± 2.2 |
| Claude-3 Opus | 46.7 | 6.9 ± 2.9 |
| GPT-4-turbo | 40.0 | 6.6 ± 2.6 |
| Qwen-110B | 20.0 | 4.5 ± 2.3 |
| Llama-3-8B | 0.0 | 1.0 ± 0.0 |

Fishery is easier than the other framings despite equivalent dynamics. GPT-4o and GPT-4-turbo survive every fishery run, but no model survives all runs across all scenarios.

**Universalization (Section 3.4).** Excluding Claude-3 Opus for cost and two combinations already at maximum survival, the reported average improvements are four months of survival, 29 resource units of gain, and 24% efficiency, with reported t-test p-values below 0.001.

**Newcomer (Section 3.3).** A selfish newcomer joins four agents after three months. For GPT-4o, aggregate survival falls from 53.3% to 33.3%, mean survival from 9.3 to 6.6 months, and equality from 94.4 to 71.7 on the reported percentage scale.

**Communication (Section 3.5 and Appendix D.5).** Removing discussion increases reported over-usage by 22%. The appendix reports no conventionally significant aggregate improvement in survival, gain, or efficiency, so the over-usage finding should not be generalized to every outcome. Some model–scenario combinations also improve without communication.

**Reasoning (Section 3.7).** Four templated subskill tests contain 150 problems each. Across models, survival correlates with dynamics reasoning, sustainable choices, and threshold calculation; reported regression R² values are 0.69, 0.92, 0.76, and 0.82. These associations do not identify a causal mechanism.

## Limitations

The environments have simple regeneration rules, small populations, short horizons, and no human participants. Robustness to larger heterogeneous populations, richer institutions, and adversarial behavior remains open. Five seeds give limited precision, and temperature-zero API calls can remain nondeterministic.

The supplied text contains reporting inconsistencies: the introduction gives 21% for the communication effect and 62% negotiation utterances, whereas Sections 3.5–3.6 give 22% and 54%. The dialogue classifier agrees with one author on 72% of 100 sampled subcategory labels. The sustainability-threshold notation also shifts between collective extraction and individual limits; the full-stock example above distinguishes the two explicitly. No missing identifier or image-only result is reconstructed.

## Related Concepts

- [[concepts/common-pool-resource-dilemmas|Common-Pool Resource Dilemmas]]: shared extraction changes future resource availability.
- [[concepts/public-goods-games|Public Goods Games]]: a related collective-action setting centered on contributions to shared benefits.

## Related Papers

- [[papers/solving-repeated-games-with-large-language-model|Solving Repeated Games with Large Language Model]]: complementary work on opponent modeling and policy adaptation in repeated interactions; not a GOVSIM baseline.
- Park et al. (2023), “Generative Agents: Interactive Simulacra of Human Behavior”: foundation for the agent architecture.
- Levine et al. (2020), “The logic of universalization guides moral judgment”: source of the universalization motivation.
