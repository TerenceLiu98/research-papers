---
title: Economic World Models
type: concept
aliases:
  - Economic World Model
  - EWM
tags:
  - economic-world-models
  - agent-based-models
  - economic-simulation
  - simulation-validity
---

## Overview

An economic world model is a computable dynamical system in which heterogeneous economic agents interact under market mechanisms and institutional constraints to generate subsequent economic states. Agents respond to information, beliefs, and resources; their actions produce outcomes such as prices and allocations that influence later decisions. In Han et al.'s implementation-oriented definition, the defining property is this endogenous feedback, not the use of an LLM or a particular neural architecture.

## Key Ideas

- **Represent both resources and beliefs.** State can include aggregate conditions, private cash and inventories, contracts and obligations, subjective expectations, and institutional rules. Observable market variables alone do not specify every input needed to execute the next transition.
- **Separate decisions from consequences.** Agents propose typed actions; the environment checks feasibility, executes mechanisms such as auctions or matching, settles accounts, and emits the next state. Economic outcomes must arise at least partly from interaction, rather than being supplied only as an external price series.
- **Distinguish adaptation from institutional change.** Updating a decision policy, acquiring persistent new skills, and changing a tax or market rule affect different parts of a model. Han et al.'s L1-L4 levels describe agent capabilities; L5 marks endogenous institutional evolution and can involve non-LLM agents.
- **Distinguish internal learning from empirical correction.** Co-evolution uses feedback generated inside the simulation. Sim-to-real alignment repeatedly compares the running world with external observations and corrects relevant states, behaviors, or mechanisms. A one-time calibration does not meet the blueprint's L6 criterion.
- **Evaluate at multiple levels.** Agent behavior, population diversity, budget and accounting consistency, market execution, adaptation stability, observed trajectories, and runtime cost each test different failure modes. Fluent economic reasoning does not establish a faithful economy.
- **Keep capability separate from counterfactual validity.** A high taxonomy level does not guarantee credible intervention effects. When behavior changes training data and therefore a learned environment, consistency also requires closing that behavior-data-model feedback loop. Han et al. refer this problem to Cong's data-driven generative equilibrium framework.

The proposed applications include human policy and strategy experiments, agent planning rollouts, and reinforcement-learning environments. Their usefulness depends on validation for the intended population, mechanisms, and intervention; the implementation blueprint alone does not demonstrate these benefits.

## Important Papers

- Cong (2025), "Economic world models and data-driven generative equilibria": the foundational working paper cited by Han et al.; it supplies the economic framework to which the implementation roadmap defers equilibrium and counterfactual-validity questions.
- [[papers/from-economic-agents-to-agentic-economies-a-systems-blueprint-for-economic-world-models|From Economic Agents to Agentic Economies: A Systems Blueprint for Economic World Models]] develops the systems definition, capability taxonomy, modular runtime proposal, and survey of 737 qualifying papers. Its reported scarcity of repeated empirical correction is bounded by the survey's coverage and classification procedure.

## Related Concepts

- [[concepts/world-models|World Models]] share the use of environment transitions for prediction and planning; economic implementations make strategic interaction and institutional constraints explicit.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]] combines language models and specified dynamics. Economic world models can use this design, but also include non-LLM systems and require endogenous economic outcomes.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] provide a complementary account of behavioral validation and limits on population-level inference.
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]] studies controlled interactions among artificial agents; transferring findings to human economies requires additional evidence.
