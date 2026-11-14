---
title: AI Agents Alone Are Not (Yet) Sufficient for Social Simulation
type: paper
authors:
  - Yiming Li
  - Dacheng Tao
year: null
tags:
  - social-simulation
  - llm-agents
  - simulation-validity
---

## TL;DR

This position paper argues that plausible LLM role-playing is insufficient evidence for reliable social simulation. It proposes an environment-involved Markov-game formulation that makes information exposure, scheduling, incentives, initialization, and state transitions explicit and auditable. The contribution is methodological; no new empirical validation is reported.

## Research Question

What must an LLM-agent simulator specify and validate before its collective outcomes can support mechanistic or counterfactual claims about human society?

## Motivation

Coherent conversations and aggregate patterns can conceal incorrect decision processes. Institutions, recommendation systems, resource constraints, and asymmetric awareness shape outcomes alongside individual behavior. Treating these mechanisms as implementation details can confuse prompt or scheduling artifacts with substantive social effects (Sections 3.1–3.2).

## Contributions

- Distinguishes two mismatches: role-playing plausibility versus human behavioral validity, and agent messaging versus agent–environment dynamics.
- Identifies gaps in evaluation, interaction and state updates, and population initialization and information priors.
- Provides a unified simulator specification and an agenda for mechanism audits, counterfactual evaluation, and uncertainty reporting.

## Method

Definition 4.1 separates environment, network, and exogenous context from each agent's mental state, observations, actions, LLM policy, mental-state update, and reward function. An initial distribution specifies population composition, attribute correlations, network structure, and epistemic priors.

Three explicit mechanisms govern execution: **Vis** determines observations and exposure; **Sch** selects active agents; **Tr** updates the environment and network. Each step obtains observations, selects active agents, generates their actions, updates mental states, and transitions the shared environment. Incentive functions represent institutional consequences. This separation allows interventions on mechanisms instead of relying solely on prompt edits.

The proposed evaluation agenda tests behavior under constraints, sensitivity to targeted mechanism changes, and stability across seeds and prompt paraphrases. Mechanism ablations, negative controls, and counterfactual sweeps should report distributions and uncertainty rather than selected trajectories (Section 4).

Initialization also carries substantive assumptions: matching demographic marginals need not preserve their joint distribution; reducing population size can change cascades and rare-group influence; placing an announcement in every prompt conflates information availability with universal awareness.

## Experiments

The manuscript reports no original experiments, benchmark comparisons, or quantitative gains. It synthesizes prior examples such as Generative Agents, OASIS, AgentSociety, HiSim, and ElectionSim to motivate its diagnosis. Proposed robustness tests are recommendations, not completed evaluations.

## Limitations

The formulation does not guarantee human validity, and application-specific implementations are outside scope. Explicit environments may introduce restrictive assumptions; the authors argue that approximate but inspectable mechanisms still support better diagnosis than hidden defaults. Learned environment dynamics are allowed if intermediate states and uncertainty remain accessible. The discussion concerns agents used as human proxies for collective inference, not all AI-agent applications or a comprehensive survey.

The supplied Markdown does not establish this paper's publication year, venue, or stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] — complements distributional validation with audits of environment mechanisms and counterfactual stability.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]] — connects expressive agent decisions to explicit simulation dynamics.

## Related Papers

- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] — a related library perspective on aligning validation and claim scope; not presented as a citation in this manuscript.

[[index|Library home]]
