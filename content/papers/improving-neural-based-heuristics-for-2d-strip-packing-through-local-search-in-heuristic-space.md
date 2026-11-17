---
title: Improving neural-based heuristics for 2D strip packing through local search in heuristic space
type: paper
authors:
  - Mariusz Kaleta
  - Tomasz Śliwiński
year: 2026
source_job_id: "24387426-7835-44fd-901e-c11db52ef6cb"
tags:
  - strip-packing
  - neural-combinatorial-optimization
  - evolutionary-optimization
---

## TL;DR

A neural constructive heuristic for [[concepts/strip-packing|strip packing]] is improved by running instance-specific Sep-CMA-ES search over its weights. The refined heuristic (RCH) reduces average wasted space substantially on larger generated and logistics-inspired instances under a 30-second budget, compared with a 300-second constraint-programming baseline. Constraint programming remains stronger on the smallest instances.

## Research Question

Can a pretrained placement scorer be adapted to an individual packing instance by searching its parameter space, while retaining the feasibility guarantees of a constructive algorithm?

## Motivation

Fixed packing rules perform unevenly across item distributions. Learning can reuse experience across related instances, but greedy decisions can still lead to poor final layouts. Perturbing a scorer changes the ranking of placement candidates and therefore the entire construction trajectory without requiring explicit moves between complete layouts.

## Contributions

- Extends an earlier neural constructive heuristic with instance-specific evolutionary refinement.
- Uses the same black-box optimization framework for distribution-level training and individual-instance adaptation.
- Introduces generated benchmarks based on recurring FMCG item dimensions and evaluates packing quality against heuristic portfolios and constraint programming.

## Method

The task is offline orthogonal rectangular packing into a fixed-width strip with unbounded height, allowing 90-degree rotation. Items have repeated dimensions grouped into types. At each step, the constructor enumerates feasible corner-point placements and orientations, scores them, and applies the highest-scoring candidate.

A feed-forward network has 24 inputs, hidden layers of 32 and 16 units, and one scalar output; the paper reports 1,345 parameters. Features describe item dimensions, remaining demand, the top envelope, alignment, fit, positions, and wasted space. Hidden activations use an approximate tanh. Feasibility follows from candidate generation rather than the learned score.

Sep-CMA-ES trains the scorer through completed-packing objective evaluations, using a diagonal covariance matrix. Training uses batches of 100 instances drawn from 500,000 training instances, with 10,000 validation instances for model selection. The reported population is 192, initial step size 0.4, and training budget approximately 300,000 evaluations.

CH applies the pretrained scorer directly. RCH initializes an evolutionary search around the pretrained weights and evaluates each candidate on the target instance. It retains the best layout, including the initial CH solution, until the time budget expires. Thus search changes the construction rule, while each evaluation constructs a complete feasible packing.

## Experiments

The two benchmark families are 2DCPackGen instances with strip width 1,000 and logistics-inspired instances with width 1,200 mm. Each family covers four shape or size categories, 5/10/15 item types, and demand ranges 1–5, 1–10, or 1–20 per type. Tests use 100 separately seeded instances per configuration. Logistics instances are generated from industry-derived dimensions, not a deployment trial.

Table 8 compares the best MaxRects/Skyline variant for each size and type (MR), OR-Tools CP-SAT with 300 seconds (CP), the pretrained constructor (CH), and refinement with 30 seconds (RCH). Values below are average wasted space percentages; lower is better.

| Dataset and setting | MR | CP | CH | RCH |
| --- | ---: | ---: | ---: | ---: |
| 2DCPackGen small square, 5 types, demand 1–5 | 14.69 | 3.62 | 12.09 | 4.92 |
| 2DCPackGen mixed, 15 types, demand 1–20 | 4.35 | 9.26 | 2.32 | 1.18 |
| Logistics mixed, 15 types, demand 1–20 | 3.49 | 9.25 | 1.30 | 0.21 |

RCH improves on CH across the main table, with especially low waste on larger logistics cases. CH itself does not uniformly beat MR: mixed 2DCPackGen instances with 5 types and demand 1–10 yield 8.32% versus 8.14%. CP outperforms RCH in the smallest configurations. Selected tests expanded to 500 instances preserve the broad pattern; these are not a full expanded benchmark.

## Limitations

- Evaluation assumes recurring item dimensions and representative training distributions; hundreds of unique types and broader aspect ratios remain untested.
- Comparisons do not include direct numerical evaluations against contemporary RL methods or rotation-capable tabu/genetic algorithms. Different online budgets also exclude an equal-time comparison, and training cost is separate.
- Physical stability, weight distribution, and genuinely irregular shapes are outside the evaluated 2D formulation.
- The supplied source has reporting inconsistencies: Equation 15 defines a ratio but describes a percentage deviation; its confidence-interval text is malformed. Table 9 also differs from Table 8 for one logistics entry. These do not support precise reproducibility claims about seed robustness.
- Dataset references are inconsistent: the data-availability statement gives Zenodo identifier 16967616, while reference 48 gives 18030367; a GitHub address remains a placeholder. Neither is treated here as the paper's own identifier.

## Related Concepts

- [[concepts/strip-packing|Strip Packing]]: minimizing occupied strip height under geometric feasibility constraints.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: learned construction rules trained from optimization outcomes, here with evolutionary rather than gradient-based updates.

## Related Papers

- Kaleta and Śliwiński (2025), “Neural-driven heuristic for strip packing trained with black-box optimization”: the precursor constructor extended with refinement here (source reference 3).
- [[papers/one-model-packs-thousands-of-items-with-recurrent-conditional-query-learning|One Model Packs Thousands of Items with Recurrent Conditional Query Learning]]: a cited alternative using reinforcement learning and conditional action decoding rather than the compact evolutionary scorer.
- Ros and Hansen (2008), “A simple modification in CMA-ES achieving linear time and space complexity”: the diagonal evolutionary strategy underlying training and refinement (source reference 42).
