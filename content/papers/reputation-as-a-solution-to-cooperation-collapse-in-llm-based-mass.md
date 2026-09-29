---
title: "Reputation as a Solution to Cooperation Collapse in LLM-based MASs"
type: paper
authors:
  - Siyue Ren
  - Wanli Fu
  - Xinkun Zou
  - Chen Shen
  - Yi Cai
  - Chen Chu
  - Zhen Wang
  - Shuyue Hu
year: 2026
doi: "10.65109/UEHN4980"
venue: "AAMAS 2026"
tags:
  - llm-agents
  - cooperation
  - reputation
  - adaptive-networks
---

## TL;DR

RepuNet couples LLM-generated self- and peer-reputations with gossip and directed network adaptation. In three simulated social dilemmas with 20 GPT-4o mini agents, the full system sustains final cooperation-related rates of 0.93, 0.85, and 0.98, compared with 0.09, 0.19, and 0.17 without RepuNet. Reputation removal causes much larger declines than gossip removal. These results support the mechanism in the tested simulations, without establishing general prevention of cooperation collapse.

## Research Question

Can reputations formed through direct encounters and indirect gossip guide partner selection and sustain cooperation among LLM agents whose individual incentives conflict with collective welfare?

## Motivation

Repeated-game and resource-sharing studies have observed persistent retaliation or overexploitation by LLM agents. The paper distinguishes these social dilemmas from coordination tasks with shared objectives. It implements [[concepts/reputation-based-cooperation|Reputation-Based Cooperation]] so that behavior changes both perceived trustworthiness and access to future interaction partners.

## Contributions

- Introduces an event-driven framework linking agent-level reputation updates to system-level network evolution.
- Implements reputation assessments and connection decisions through LLM prompts rather than fixed numerical update rules.
- Compares the complete system with gossip and reputation ablations across three dilemmas, and examines cooperative clustering and gossip sentiment.

## Method

Each agent maintains a local database containing reputations and outgoing connections. A directed edge marks another agent as a potential future partner. Reputation records contain the evaluated agent, scenario, role, a natural-language assessment, and a score from -1 to 1; there is no single global reputation score (Section 3).

After direct encounters, agents update peer-reputations from current behavior and previous assessments. They also update self-reputations, representing their perception of how others evaluate them, using their profiles and interaction history. Satisfaction or dissatisfaction can prompt gossip; listeners use it to form or revise assessments of the absent target.

Revised peer-reputations inform decisions to create or maintain directed ties after direct encounters. Gossip can cause reconsideration of ties to previously encountered agents, but cannot create a new tie to a stranger. These choices change subsequent interaction opportunities, linking reputation to [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]. The authors interpret cooperative clustering and exclusion of exploitative agents as a feedback mechanism sustaining cooperation.

## Experiments

The main experiments initialize 20 isolated GPT-4o mini agents with a mixture of prosocial and self-interested profiles. Each scenario is repeated five times and stops when cooperation rates stabilize, so horizons vary. The baseline retains profile, memory, action, and evolving-network interaction, but removes reputation evaluation and gossip (Section 4.1).

| Scenario | Task and outcome |
| --- | --- |
| Prisoner's Dilemma | Pairwise cooperate/defect choices; payoffs are 3/3 for mutual cooperation, 1/1 for mutual defection, and 5/0 for unilateral defection. Outcome: cooperation rate. |
| Voluntary participation | Participation in an energy-reduction program trades personal convenience for collective benefit; agents can revise participation every five interaction rounds. Outcome: participation rate. |
| Trading investment | Investor and trustee negotiate an allocation; invested funds double and the trustee can honor or violate the agreement. Agents start with 10 units and receive randomly assigned roles. Outcome: investment success/adherence. |

Table 1 reports averages over the final five rounds across five runs. The supplied text does not define the uncertainty statistic accompanying the means.

| Treatment | Prisoner's Dilemma | Voluntary participation | Trading investment |
| --- | --- | --- | --- |
| Full RepuNet | 0.93 (+/- 0.04) | 0.85 (+/- 0.03) | 0.98 (+/- 0.02) |
| Without gossip | 0.90 (+/- 0.04) | 0.81 (+/- 0.04) | 0.96 (+/- 0.01) |
| Without reputation | 0.46 (+/- 0.21) | 0.29 (+/- 0.07) | 0.26 (+/- 0.34) |
| Without RepuNet | 0.09 (+/- 0.07) | 0.19 (+/- 0.06) | 0.17 (+/- 0.08) |

Removing gossip lowers mean outcomes by 2-4 percentage points; removing reputation has a much larger effect. No significance test for these treatment differences is supplied. Figure 2 reports positive reputation-behavior correlations in all scenarios with p < 0.001, using agent behavior averaged over the last ten rounds. These correlations do not independently establish the direction of causation.

Figure 3 illustrates cooperative clusters and isolation of low-reputation agents using snapshots from one run per scenario. In the voluntary-participation scenario, sentiment classification with twitter-roberta-base-sentiment labels approximately 90% of gossip positive. This is a finding about the tested agents and scenario, not a general human-LLM comparison.

## Limitations

- **Scale and duration:** the main evidence uses 20 agents, five runs, and a stabilization-based stopping rule. It does not establish persistence over fixed long horizons, larger populations, or real deployments.
- **Missing supplementary evidence:** the source refers to prompts, gossip details, and experiments with three additional LLMs in arXiv-only appendices A-C. Those appendices are absent from the supplied Markdown, so their methods and robustness results cannot be assessed here.
- **Mechanism isolation:** the ablations separate gossip from reputation generation, but do not independently remove self-reputation, peer-reputation, or network adaptation. The results do not isolate every component's causal contribution.
- **Reporting inconsistency:** Section 4.3 describes removing reputation or all of RepuNet as producing rates below 20%. Table 1 instead gives 26-46% without reputation; only the complete-removal condition is below 20% in all scenarios. The table values are retained above.
- **Evidence boundaries:** network snapshots and reputation-behavior correlations support the proposed interpretation descriptively. The supplied experiments do not establish robustness to deceptive gossip or other adversarial manipulation, nor do simulated profiles validate behavior in human populations.

## Related Concepts

- [[concepts/reputation-based-cooperation|Reputation-Based Cooperation]]: assessments of past conduct inform future treatment and partner access.
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]: behavior and interaction structure evolve together.
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]]: controlled game experiments with model agents and limited external validity.

## Related Papers

- Piatti et al. (2024), "Cooperate or Collapse: Emergence of Sustainable Cooperation in a Society of LLM Agents": cited motivation concerning overexploitation of shared resources (reference 37).
- Akata et al. (2025), "Playing Repeated Games with Large Language Models": cited evidence of persistent defection following betrayal (reference 1).
- [[papers/solving-repeated-games-with-large-language-model|Solving Repeated Games with Large Language Model]]: a library comparison using opponent modeling and policy adaptation; not a RepuNet baseline or source citation.
- [[papers/coevolution-of-relationship-and-interaction-in-cooperative-dynamical-multiplex-networks|Coevolution of Relationship and Interaction in Cooperative Dynamical Multiplex Networks]]: a library comparison adapting relationship weights rather than LLM-generated reputations and edge creation/deletion; not cited in this paper.

Source: [published paper](https://doi.org/10.65109/UEHN4980). The paper lists a [code repository](https://github.com/RGB-0000FF/RepuNet); this summary uses only the supplied manuscript.

[[index|Library home]]
