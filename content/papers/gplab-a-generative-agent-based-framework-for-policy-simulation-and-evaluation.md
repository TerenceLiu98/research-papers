---
title: "GPLab: A Generative Agent-Based Framework for Policy Simulation and Evaluation"
type: paper
authors:
  - Shuhan Zhang
  - Zifan Peng
  - Yinwang Ren
year: 2026
doi: "10.18564/jasss.5933"
source_job_id: "f2c37cc4-eddf-4dfe-886f-92d1983fee85"
tags:
  - llm-agents
  - agent-based-models
  - policy-simulation
  - computational-social-science
  - bounded-rationality
---

## TL;DR

GPLab is a modular framework for simulating policy effects with LLM-driven social agents connected to configurable social subsystems. In two 500-agent case studies, its simulated populations respond to consumption vouchers and green-vehicle incentives with intensity-dependent, subgroup, emotional, and network effects. Additional consistency metrics and five policy-domain demonstrations show internally coherent behavior, but the study does not validate simulated responses against observed human outcomes or directly compare GPLab with a matched rule-based agent-based model.

## Research Question

Can LLM-driven agents with memory, emotion, and heterogeneous profiles be combined with modular social subsystems to simulate cross-domain policy transmission and support evaluation across different policy scenarios?

## Motivation

Conventional statistical policy evaluation is often designed for comparatively static aggregate relationships, while traditional agent-based models can represent interactions and emergence but depend heavily on hand-crafted behavioral rules. Existing LLM social simulations are frequently broad societal replicas or fixed-domain systems. GPLab instead targets bounded policy questions with reusable agent cognition, configurable subsystem boundaries, and feedback between individual decisions and system-level indicators.

## Contributions

- A three-layer architecture comprising social agents, modular social subsystems, and simulation-and-evaluation services.
- An LLM-based agent design that combines static profiles with time-weighted memory retrieval, memory reflection, emotional state extraction, environmental perception, and structured decisions.
- A decoupled subsystem interface and shared message board for representing policy interventions and cross-domain feedback without rebuilding the full simulator for each scenario.
- Two detailed policy demonstrations using profiles derived from the 2018 Chinese General Social Survey, plus consistency measurements and transfer experiments across five additional policy domains.

## Method

### Architecture

GPLab organizes simulation into three layers. The social-agent layer converts profile attributes, retrieved memories, emotional state, and current subsystem observations into JSON-formatted actions. The social-subsystem layer contains independently operating modules, such as economic behavior and public-opinion transmission, whose state-update rules consume agent actions. The simulation-and-evaluation layer schedules time steps, coordinates subsystem state, parallelizes model calls, summarizes trajectories, and applies scenario-specific evaluation rubrics.

### Agent cognition

Each agent has static demographic, psychological, social, and economic attributes. Its dynamic cognition contains a memory system and an emotion system. Memory retrieval scores entries by a weighted combination of exponential recency and semantic similarity; periodic LLM-generated reflections are stored as higher-level memories. An LLM extracts emotional state from prior memories and actions. The decision prompt then combines these components with current subsystem perceptions and an action schema. This is a simulation-specific cognitive design rather than evidence that the generated decisions reproduce human cognitive processes.

### Agent-subsystem feedback

At every time step, agents receive textual observations from all active subsystems and return decisions to them. Each subsystem updates from its previous state and the current population of actions. Subsystems remain operationally separate but exchange information through shared state, allowing economic, opinion, and environmental mechanisms to be recombined for different policies.

### Evaluation

The framework evaluates aggregate policy trajectories and agent consistency. Cross-temporal behavioral consistency uses a coefficient of variation after removing population-level trends. Personality stability is estimated by having an LLM infer Big Five traits from profiles and decision rationales, producing a drift index and stability rate. Behavior-trait coherence is also LLM-judged. A separate DeepSeek-R1 rubric scores goal consistency, trend rationality, subsystem coordination, heterogeneity, and indicator correlation for transfer scenarios.

## Experiments

### Consumption vouchers during a public-health event

The first case uses 500 agents sampled from CGSS 2018 profiles and driven by `glm-4-9b-chat`. Across 12 monthly steps, an adverse public-health news sequence begins before consumption vouchers are issued in months 4-6 at 100, 1,000, or 2,000 CNY per person. Agents report consumption willingness, saving preference, work willingness, and social-media actions to economic and opinion subsystems.

Consumption willingness falls before intervention, rebounds immediately during voucher issuance, and declines afterward while remaining above the simulated control trajectory. The reported month-4 peaks are 0.53, 0.54, and 0.55 for the 100, 1,000, and 2,000 CNY conditions. Differences narrow later. The simulation also produces stronger responses among younger, higher-income, more educated, and urban groups; gender and marital-status differences are smaller. Reported emotion scores improve during the policy period, while generated discussion shifts from health concerns toward consumption and economic support.

### Carbon policy and green vehicles

The second case again uses 500 `glm-4-9b-chat` agents, coupled to economic and small-world opinion-network subsystems. Policies combine taxes on conventional vehicles, green-vehicle subsidies, enterprise responses, market-price updates, and messages from a high-influence government account.

The simulated green-consumer share rises from 20% to 45.4% in month 1 and stabilizes at 53.4%. Carbon emissions trend downward with fluctuations, and stronger subsidies produce faster increases in green-vehicle purchase intention. These are outcomes of the configured simulation, not estimates of an observed policy's causal effect.

### Consistency and transferability

For the voucher and carbon cases, the reported cross-temporal coefficients of variation are 0.230 and 0.218. Personality drift indices are 0.117 and 0.109, with stability rates of 0.922 and 0.935. Behavior-trait coherence ranges from 0.944 to 0.961 across the two subsystems in each case. Because personality and coherence depend on LLM evaluators, they measure agreement with the evaluation procedure rather than independent behavioral validity.

Five further scenarios cover housing restrictions, medical reform, education equity, health codes, and tax incentives. Across five prompt-order variants, mean rubric scores range from 7.4 to 8.4 for GLM, 7.7 to 8.2 for LLaMA, and 7.5 to 8.2 for Qwen. Small reported standard deviations support robustness to the tested prompt reordering. They do not establish cross-domain correspondence with real policy outcomes.

## Limitations

- The detailed experiments use only 500 agents because long, dense LLM simulations are computationally expensive; the paper reports increasing runtime and token use as agents and subsystems grow.
- LLM hallucinations can create behavior that is inconsistent with the intended scenario and can accumulate into macro-level artifacts.
- There is no matched comparison with a traditional rule-based agent-based model, so the claimed advantage of LLM-driven behavior is not quantitatively isolated.
- The main evidence evaluates internal trajectories, profile-conditioned subgroup patterns, and LLM-scored rationality. It does not compare simulated policy responses with observed individual or population distributions.
- Personality stability, behavior-trait coherence, and transfer scores use LLM inference or judging, creating evaluator dependence and limiting their independence as validation evidence.
- Demonstrating plausible heterogeneity from demographic prompts does not establish that the simulated variance, tails, or subgroup effects match those of the target population. This places the results within the claim constraints described by [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].

## Related Concepts

- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: situates GPLab's combination of LLM decisions and explicit subsystem update rules.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes internal plausibility and consistency from validated population-level fidelity.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: provides the broader context for the small-world diffusion and collective-attitude mechanisms in the green-vehicle case.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: applies to GPLab's personality, coherence, and transferability evaluations.

## Related Papers

- [[papers/policysim-an-llm-based-agent-social-simulation-sandbox-for-proactive-policy-optimization|PolicySim: An LLM-Based Agent Social Simulation Sandbox for Proactive Policy Optimization]] also couples LLM agents to policy interventions, but optimizes social-platform policies through simulated feedback rather than evaluating modular public-policy scenarios.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] supplies a complementary framework for limiting claims when mean, variance, and subgroup fidelity have not been validated against human behavior.
- Ghafarzadegan et al. (2024), "Generative Agent-Based Modeling: An Introduction and Tutorial," provides the GABM framing cited by GPLab.
- Piao et al. (2025), "AgentSociety: Large-Scale Simulation of LLM-Driven Generative Agents Advances Understanding of Human Behaviors and Society," is cited as a broad social-simulation framework against which GPLab motivates its narrower, modular design.

[[index|Library home]]
