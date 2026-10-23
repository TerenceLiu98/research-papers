---
title: "Lost in Simulation: LLM-Simulated Users are Unreliable Proxies for Human Users in Agentic Evaluations"
type: paper
authors:
  - Preethi Seshadri
  - Samuel Cahyawijaya
  - Ayomide Odumakinde
  - Sameer Singh
  - Seraphina Goldfarb-Tarrant
year: 2026
tags:
  - llm-agents
  - agent-evaluation
  - user-simulation
  - simulation-validity
  - evaluation-fairness
---

## TL;DR

LLM-simulated users do not provide a stable or uniformly valid substitute for human users in tau-Bench retail evaluations. Holding the GPT-4o agent fixed, changing the user model shifts success by nearly 9 percentage points. Against a human study spanning the United States, India, Kenya, and Nigeria, simulation is systematically miscalibrated across task difficulty and demographic groups. Simulated conversations also contain more questions and politeness, and they produce a different distribution of failure attribution than human conversations.

## Research Question

Are LLM-simulated users robust across simulator models, valid proxies for human users, and comparably representative of users from different dialect, age, and country groups in agentic evaluations?

## Motivation

Interactive agent benchmarks use simulated users because they are inexpensive and scalable, but benchmark scores are useful only if the simulator does not determine the apparent capability being measured. A single aggregate score can hide sensitivity to the chosen user model, mismatch with real interaction behavior, and unequal calibration across populations. The paper therefore treats user simulation as a measurement instrument that requires direct human validation, connecting agent evaluation to [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].

## Contributions

- Tests robustness by varying the user LLM while holding the GPT-4o agent fixed on all 115 tau-Bench retail tasks.
- Validates simulation against a human study with participants from the United States, India, Kenya, and Nigeria on an 18-task difficulty-stratified subset.
- Adapts expected calibration error to compare human and simulated success rates across task-difficulty bins.
- Measures differential validity by US English dialect, age, and country, and compares conversational behavior and failure modes between simulated and human interactions.
- Tests reduced-politeness and country-conditioned simulation prompts, finding that prompt interventions change calibration unevenly across groups.

## Method

The study uses tau-Bench retail tasks, where success requires both the correct final database state and all required information in the agent response. For robustness, GPT-4o remains the agent while GPT-4o, Sonnet 3.7, Sonnet 4.5, and Kimi-K2-Thinking each act as the user model over 115 tasks, with three runs per condition.

For human validation, the authors estimate task difficulty from five GPT-4o-agent/GPT-4o-user runs and select three tasks at each of six success levels from 0% to 100%. Each participant completes four of these 18 tasks: two from the 0-40% levels and two from the 60-100% levels. The US sample is stratified by self-reported Standard American English (SAE) or African American Vernacular English (AAVE) and by ages 18-34, 35-54, and 55+; participants from India, Kenya, and Nigeria are ages 18-34. Recruitment targets about 40 participants per age-by-dialect or country group.

The human-LLM expected calibration error is the human-completion-weighted absolute difference between simulated and human success rates over the six difficulty levels. Generalized estimating equations model repeated binary outcomes by participant. The interaction analysis compares turns, agent actions, words per turn, questions, politeness markers, four task-error types, and manually annotated failure attribution.

## Experiments

### Simulator robustness and aggregate validity

| Comparison | Reported result |
| --- | --- |
| User-model sensitivity | Success ranges from 67.0% with Sonnet 3.7 to 75.9% with Sonnet 4.5, a difference of nearly 9 percentage points. |
| Human users in the United States | Agent success is 45.2%; human-LLM ECE is 15.1. |
| Difficulty-dependent error | Simulation underestimates success on the hardest tasks, where human success is 30.8%, and overestimates it on moderately difficult tasks, where human success is 39.0%. |

### Differential validity

Across all US ages, SAE participants have 50.6% success and 11.7 ECE, compared with 39.4% success and 20.3 ECE for AAVE participants. The success difference grows with age: the SAE-AAVE gap is nearly 12 percentage points for ages 35-54 and 19 points for ages 55+. In the age-matched 18-34 comparison, success ranges from 41.0% to 49.2%; cross-country success differences are not statistically significant, but calibration differs. ECE is lowest for SAE participants at 13.0 and highest for AAVE and Indian participants at 18.9.

### Interaction behavior and failures

Simulated users ask questions in 18.8% of turns, versus 9.8% for human users, and use politeness indicators in 39.2% of turns, versus 19.9% for humans. Failed simulated conversations are attributed to the agent 48.9% of the time and the user 40.0% of the time; for human conversations, the corresponding rates are 24.5% and 62.2%. Simulation therefore changes not only measured success but also which failure source appears most important.

Reducing politeness in the simulator moves 11 of 18 tasks to different difficulty bins and lowers overall simulated success from 50.0% to 46.7%. It improves calibration for AAVE, Indian, and Kenyan participants while worsening it for SAE and Nigerian participants. Country-conditioned prompts likewise improve calibration for India, leave Nigeria nearly unchanged, and worsen it for Kenya. These interventions demonstrate sensitivity rather than a general correction.

## Limitations

- The study covers English interactions in one retail customer-service benchmark; other languages, domains, interaction lengths, and evaluation rules may yield different results.
- Age comparisons outside the United States are unavailable because the India, Kenya, and Nigeria samples include only participants aged 18-34.
- GPT-4o is the only evaluated agent. Holding it fixed isolates user-side variation but does not establish whether stronger or weaker agents have the same calibration gaps.
- Difficulty bins are defined using five GPT-4o user-agent runs and can change under small simulator-prompt interventions.
- Country-based prompting uses names and cities as demographic cues; its mixed effects do not establish that generated behavior faithfully represents those populations.
- The supplied Markdown does not state a stable paper identifier or publication venue. The year follows the manuscript context, whose newest cited work and study framing are from 2025.

## Related Concepts

- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]
- [[concepts/probability-calibration|Probability Calibration]]
- [[index|Library home]]

## Related Papers

- Yao et al. (2025), "tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains": provides the retail tasks and success evaluator used in this study.
- Dou et al. (2025), "SimulatorArena: Are User Simulators Reliable Proxies for Multi-Turn Evaluation of AI Assistants?": studies simulator reliability and behavioral realism in multi-turn evaluation.
- Lu et al. (2025), "Can LLM Agents Simulate Multi-Turn Human Behavior? Evidence from Real Online Customer Behavior Data": compares simulated and human action sequences in online shopping.
- Salaudeen et al. (2025), "Measurement to Meaning: A Validity-Centered Framework for AI Evaluation": motivates validation of evaluation instruments against their intended interpretations.

