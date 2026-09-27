---
title: "From Economic Agents to Agentic Economies: A Systems Blueprint for Economic World Models"
type: paper
authors:
  - Jiale Han
  - Xiang Li
  - Jing Qian
  - Wenyuan Gu
  - Pin Gao
  - Ye Luo
  - Hongyuan Zha
  - Dacheng Tao
  - Benyou Wang
  - Lin William Cong
year: null
tags:
  - economic-world-models
  - agent-based-models
  - llm-agents
  - economic-simulation
  - simulation-validity
---

## TL;DR

The paper proposes an implementation architecture for [[concepts/economic-world-models|Economic World Models]]: heterogeneous agents generate actions, explicit market mechanisms produce economic outcomes, and adaptation and empirical correction update the running system. Its LLM-assisted survey identifies 737 qualifying papers, mostly at lower capability levels; only two meet its criterion for repeated sim-to-real alignment. The contribution is a systems roadmap and literature classification, with illustrative interfaces rather than an experimentally validated end-to-end economic twin. More capable agents do not by themselves establish realistic behavior or valid policy counterfactuals.

## Research Question

How can economic agents, market mechanisms, evolving institutions, and empirical correction be organized into executable economic worlds, and which of these capabilities have existing systems actually implemented?

## Motivation

Predicting an individual actor's next action leaves its economic consequences unspecified. The proposed agentic economy closes this loop: actors observe the world, choose feasible actions, interact through institutions, and encounter the resulting prices, allocations, and constraints in later decisions. This connects [[concepts/world-models|World Models]] to economic simulation while making beliefs, strategic responses, accounting identities, and potentially changing institutions explicit.

The authors distinguish this systems agenda from the equilibrium and counterfactual-validity theory in Cong's EWM/DDGE framework. They propose economic worlds as policy and strategy sandboxes, planning tools for agents, and reinforcement-learning environments. These are intended applications, not demonstrated benefits of the blueprint.

## Contributions

- Four engineering desiderata: endogenous economic outcomes, behavioral fidelity, evolving dynamics, and continued alignment with observations.
- A six-level implementation taxonomy, supported by a literature search and LLM-assisted full-text classification with manual review of flagged cases.
- A modular protocol covering agents, executable environments, co-evolution, online empirical alignment, and trajectory-level evaluation.
- A research agenda connecting richer agent capabilities to economic closure, scalability, behavioral validation, and counterfactual consistency.

## Method

### Economic State and Transitions

The proposed state combines aggregate conditions $x_t$, each agent's private resources and obligations $z_t^i$, subjective beliefs $b_t^i$, and institutions $\mathcal{I}_t$:

$$
s_t = \left(x_t, \{z_t^i\}_{i=1}^{N_t}, \{b_t^i\}_{i=1}^{N_t}, \mathcal{I}_t\right).
$$

Under an intervention $u_t$, a transition updates beliefs, generates actions, updates agent states, aggregates interactions through market mechanisms, and optionally changes institutions. Endogenous closure means that relevant outcomes arise at least partly from agent interaction and then affect later behavior. Pure forecasts, isolated decision agents, and static games do not qualify under the survey's inclusion rules (Section 2; Appendix A.2).

### Capability Taxonomy

| Level | Defining implementation evidence |
| --- | --- |
| L1: Fixed-rule agent worlds | Heterogeneous agents generate economic outcomes under predetermined decision and institutional rules. |
| L2: Adaptive agent worlds | Non-LLM agents revise strategies during interaction through learning, search, or adaptive rules. |
| L3: LLM-based autonomous agent worlds | Language-based cognition supports beliefs, memory, communication, and contextual decisions, with a fixed capability substrate. |
| L4: Self-evolving agent worlds | Experience persistently changes the agent's repertoire, such as strategy libraries, skills, or behavioral routines. |
| L5: Evolving economic worlds | Institutions or governing rules change endogenously in response to behavior and outcomes. |
| L6: Sim-to-real economic twins | Repeated correction against newly observed external evidence updates the running model. |

The levels combine three axes: agent capability, institutional evolution, and empirical alignment. They are not a strictly cumulative checklist of increasingly capable LLM agents. L5 can use non-LLM agents; classification gives alignment priority over institutional evolution and then agent capability. A high level records implementation features, not verified economic validity (Section 3.1; Appendix A.2.3).

### Proposed Runtime

Agents have roles, objectives, private states, information permissions, feasible action spaces, memory, and tools. They submit typed actions. The environment validates budgets, inventories, permissions, and exposure limits; schedules actions when order matters; executes clearing and settlement; and records the resulting state and events (Section 4.2).

The illustrative public interface constructs and resets a world, collects decisions through `world.run_agents`, and advances it through `world.step`. `world.coevolve` updates selected agent and environment components using simulated feedback. `world.align` compares simulated states with external observations, diagnoses excessive discrepancies, and applies bounded corrections. Internal adaptation and external correction serve distinct purposes: a coherent simulated economy can still diverge from reality.

The proposed evaluator reads complete trajectories and reports agent validity and calibration, market and accounting consistency, adaptation and stability, empirical discrepancies and correction magnitudes, and computational cost. These are evaluation targets; the paper does not report benchmark scores for a completed implementation.

## Experiments

The empirical contribution is a literature survey, not a new simulation experiment. Retrieval covers January 1950 through April 2026 across eight arXiv categories and Web of Science records restricted to UTD-24 journals. Titles and abstracts must match both an economic/financial keyword group and a modeling/simulation/agent keyword group (Section 3.2; Appendix A).

| Screening stage | arXiv | UTD-24 | Total |
| --- | ---: | ---: | ---: |
| Initial keyword matches | 6,028 | 1,828 | 7,856 |
| Candidate pool after deduplication | 6,008 | 1,828 | 7,836 |
| Retained for full-text review | 794 | 87 | 881 |
| Validated EWM corpus | Not separately stated | Not separately stated | 737 |

GPT-5.4-mini screens titles and abstracts for plausible economic agents, endogenous interactions, and dynamic feedback. GPT-5.5 then assesses full-text eligibility and assigns the highest supported level. Authors review cases flagged as borderline, ambiguous, or low-confidence, following the same definitions and checking missing evidence (Appendices A.2-A.3).

The reported landscape is concentrated in L1-L3. Recent arXiv growth centers on adaptive and LLM-based agents, while the UTD-24 subset remains primarily L1-L2. Self-evolving agents, endogenous institutional change, and repeated empirical correction are comparatively sparse. Exact counts for L1-L5 are not stated in the supplied prose and are not inferred from the plotted areas (Section 3.3).

Appendix B.6 explicitly identifies only two L6 papers: Wiesinger et al. (2010), which repeatedly fits heterogeneous trader models to rolling Nasdaq windows before out-of-sample prediction, and Evans et al. (2025), which uses an outer optimizer to compare simulated outcomes with experimental data and update latent parameters. This is a finding within the authors' retrieved and classified corpus, not evidence that only two such systems exist in all research.

## Limitations

- **Architecture versus demonstrated performance.** The protocol and foreign-exchange examples are illustrative. No end-to-end benchmark establishes improved policy decisions, behavioral realism, computational scalability, or economic-twin accuracy. The supplied code also contains malformed syntax and inconsistent signatures, so it should not be treated as executable software.
- **Search coverage.** The arXiv category selection, keyword intersection, UTD-24 restriction, and April 2026 cutoff bound the corpus. Excluded venues, terminology, and early screening errors can affect both coverage and the apparent rarity of higher levels.
- **Classification validation.** Manual review addresses flagged cases, but the supplied text does not quantify the reviewed subset, report independent inter-rater agreement, or estimate errors among unflagged decisions. LLM confidence and author adjudication do not establish a measured classification accuracy.
- **Taxonomy versus fidelity.** LLM cognition, persistent skills, institutional evolution, and empirical correction are implementation properties. Their presence alone does not demonstrate realistic population behavior or superiority to other economic modeling approaches. The broad paradigm comparisons in Section 7 are the authors' architectural framing, not controlled tests.
- **Counterfactual consistency.** Aggregate empirical fit is insufficient when an intervention changes behavior, the data it generates, and a learned model trained on those data. The authors defer the corresponding fixed-point discipline to Cong's EWM/DDGE framework; the implementation ladder does not solve it.
- **Open engineering problems.** Behavioral calibration, scalable market closure, stable co-evolution, and world-level evaluation remain unresolved. Counterfactual economies have no single observed ground-truth trajectory.
- **Metadata.** The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for this paper. These remain unspecified. It lists `economic-world-model.github.io` as a project resource; the site was not consulted for this ingest.

## Related Concepts

- [[concepts/economic-world-models|Economic World Models]]: action-state feedback mediated by economic constraints and institutions.
- [[concepts/world-models|World Models]]: predictive environments for simulated rollout and action evaluation.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: combines language-based decisions with explicit transition rules; an EWM additionally requires economic interactions that generate outcomes.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: a complementary library framework for distinguishing behavioral plausibility from validated population fidelity.

## Related Papers

- Cong (2025), "Economic world models and data-driven generative equilibria": the cited conceptual foundation and source of counterfactual equilibrium discipline.
- Li et al. (2024), "EconAgent: Large Language Model-Empowered Agents for Simulating Macroeconomic Activities": a cited L3 example with LLM households interacting in a macroeconomic environment.
- Zheng et al. (2022), "The AI Economist: Taxation policy design via two-level deep multiagent reinforcement learning": cited economic policy design with adaptive agents and a policy-setting layer.
- Wiesinger, Sornette, and Satinover (2010), "Reverse engineering financial markets with majority and minority games using genetic algorithms": one of the two systems classified L6 in Appendix B.6.
- Evans et al. (2025), "ADAGE: A generic two-layer framework for adaptive agent based modelling": the other L6 example, with repeated environment-level parameter calibration.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]]: a library comparison, not a citation in this paper, examining whether simulated populations preserve the behavioral heterogeneity needed for their research questions.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: a library comparison, not a citation in this paper, separating visual prediction quality from demonstrated usefulness for action-conditioned planning.

[[index|Library home]]
