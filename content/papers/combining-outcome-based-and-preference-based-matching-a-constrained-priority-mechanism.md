---
title: "Combining Outcome-Based and Preference-Based Matching: A Constrained Priority Mechanism"
type: paper
authors:
  - Avidit Acharya
  - Kirk Bansak
  - Jens Hainmueller
year: 2022
doi: 10.1017/pan.2020.48
tags:
  - market-design
  - constrained-assignment
  - predictive-policy
---

## TL;DR

A priority mechanism assigns agents to their preferred available locations only when the remaining assignment can still meet a planner’s minimum average outcome score. It is strategy-proof and constrained Pareto-efficient under the paper’s preference assumptions. Refugee and school assignment illustrations quantify the trade-off between predicted outcomes and inferred preferences; they are not evaluations of realized effects from deployment.

## Research Question

Can preference-based assignment preserve truthful reporting and efficiency while guaranteeing a minimum aggregate score derived from predictive models?

## Motivation

Outcome-maximizing assignment uses heterogeneous predicted agent–location outcomes but ignores private preferences. Preference-only allocation gives agents agency without ensuring a planner’s employment or educational objective. An explicit outcome floor makes the compromise adjustable.

## Contributions

- Introduces [[concepts/outcome-constrained-priority-matching|Outcome-Constrained Priority Matching]], combining capacity constraints, a minimum average score, and sequential preference-based choices.
- Establishes strategy-proofness and Pareto efficiency within the set of assignments meeting the floor, allowing ties only among worst-ranked locations.
- Shows that varying priority orders does not recover every constrained-efficient assignment.
- Examines preference–outcome trade-offs and ways to select priority orders independently of reported preferences.

## Method

For assignment μ, capacity at location l is q_l and the planner requires the average of g_i(μ(i)) across agents to be at least a threshold. First compute the largest feasible average score and reject thresholds above it. Fix an agent order independently of their reports. For each agent, examine strictly ranked locations in preference order; accept the first with spare capacity for which an outcome-maximizing completion, including previously held agents, can still meet the floor. If none qualifies, place the agent on hold. Finally assign held agents to maximize the remaining outcome sum.

Feasibility checks are linear sum assignment problems with polynomial-time algorithms (§2). The guarantee concerns supplied scores, which may be predictions. Constrained efficiency does not maximize the number of top-three placements. Selecting the best order using current reported preferences can destroy strategy-proofness; the paper instead explores predicted preferences and increasing cross-location outcome variance as report-independent ordering rules (§5).

## Experiments

Simulations assign 100 agents to 100 single-seat locations under nine combinations of within-agent preference–outcome alignment and between-agent preference similarity. Top-ten choices are retained and remaining options tied. Greater similarity between agents’ preferences makes desirable placements more competitive; better alignment with outcomes delays the trade-off (§4.1).

The refugee illustration uses historical records for 33,782 working-age refugees and reassigns 561 eligible families arriving in 2016 Q3. Earlier arrivals train employment and outmigration prediction models. Lower predicted outmigration defines stronger inferred preference. The education illustration assigns 1,000 students among 33 Tennessee STAR schools, predicting summed kindergarten reading, math, and listening scores and inferring preferences from later transfers. Both preserve observed location capacities and retain ten ranked choices.

| Illustration | Preference-dominant assignment | Outcome-maximizing assignment | Observed baseline |
| --- | --- | --- | --- |
| Refugee families | 41% predicted employment; about 25% top-three placement | Just below 52% predicted employment; about 15% top-three placement | 34% observed employment |
| Kindergarten students | Predicted score 1,502; about 42% top-three placement | Predicted score 1,519; about 10% top-three placement | Observed score about 1,490; SD 86 |

These comparisons juxtapose model-based counterfactual scores with observed baselines (§§4.2–4.3). Reordering simulations produce maximum-minus-minimum top-three shares of 0.05–0.18, median 0.13. Accurate pseudo-preferences and increasing outcome-variance ordering recover some gains in the illustrated settings, without a universal optimality guarantee (§5).

## Limitations

- Preferences are inferred from migration or transfers rather than elicited; ability and cost to move can confound their interpretation. A relocation-cost adjustment preserves the broad refugee trade-off but lowers top-three placement shares.
- Outcome guarantees apply to modeled scores, not realized employment or test scores. The applications are simulated reallocations using observational data.
- Preference ties are permitted only at the bottom; arbitrary indifference structures are outside the stated result.
- The mechanism neither spans all constrained-efficient allocations nor optimizes aggregate preference satisfaction. Priority rules based on observable characteristics may create disparate impacts.
- A simple outcome-constrained top-trading-cycles modification fails strategy-proofness; this counterexample does not establish impossibility for every alternative design (§6).

## Related Concepts

- [[concepts/outcome-constrained-priority-matching|Outcome-Constrained Priority Matching]]: feasibility-preserving sequential allocation reconciles preferences with an aggregate outcome floor.

## Related Papers

- Bansak et al. (2018), “Improving Refugee Integration Through Data-Driven Algorithmic Assignment”: supplies the outcome-based matching foundation and prediction methodology.
- Narita (2019), “Experiment-as-Market: Incorporating Welfare into Randomized Controlled Trials”: related constrained design balancing subject welfare with scientific information.
- Delacrétaz, Kominers, and Teytelboym (2016), “Refugee Resettlement”: related refugee allocation mechanisms based on trading cycles.

Published in *Political Analysis* 30:89–112 (2022), online 8 March 2021. Replication identifiers reported by the paper: Code Ocean 10.24433/CO.3735899.v1 and Harvard Dataverse 10.7910/DVN/ZEV0WX. Refugee microdata are subject to the provider’s nondisclosure agreement.
