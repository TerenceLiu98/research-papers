---
title: "CAMAR: Continuous Actions Multi-Agent Routing"
type: paper
authors:
  - Artem Pshenitsyn
  - Aleksandr Panov
  - Alexey Skrynnik
year: null
tags:
  - multi-agent-reinforcement-learning
  - continuous-control
  - benchmarking
---

## TL;DR

CAMAR is a JAX-based continuous multi-agent navigation benchmark combining fast simulation, heterogeneous dynamics, and three levels of generalization testing. MAPPO leads the reported random-map success rates, while independently planned RRT* paths with PD control perform best on mazes. Planning features help some learned policies but hurt others.

## Research Question

How can continuous multi-agent navigation be benchmarked at high throughput while testing coordination and generalization across map geometry and team size?

## Motivation

Discrete grid benchmarks omit continuous motion, while detailed robotics simulators can be too expensive for large reinforcement-learning experiments. CAMAR targets the middle ground: lightweight continuous dynamics and structured navigation tasks with repeatable evaluation.

## Contributions

- A vectorized simulator with holonomic and differential-drive dynamics, heterogeneous agent radii, and procedural and imported maps.
- Easy, Medium, and Hard evaluation tiers separating new start–goal configurations, within-family map changes, and unseen MovingAI street layouts.
- Comparisons of six learning algorithms, two planning baselines, and six planning–learning hybrids, plus simulator throughput measurements.

## Method

Agents and obstacles are represented by circles; complex walls use collections of circles. Repulsive contact forces handle overlaps. Local observations retain a bounded number of nearby-object vectors and an ego-centric goal vector, avoiding ray tracing. Rewards combine individual goal attainment, collective completion, collision penalties, and distance-based shaping.

The benchmark instantiates [[concepts/continuous-multi-agent-pathfinding|Continuous Multi-Agent Pathfinding]]. Independent learning variants and centralized-critic variants share policy parameters in the main experiments. Classical baselines generate individual RRT or RRT* paths and track them with PD control. Hybrids augment observations with RRT* samples and estimated costs generated at episode initialization rather than replanning every step.

Evaluation reports success rate, flowtime, makespan, and coordination, aggregated with interquartile means and bootstrap 95% confidence intervals. Coordination measures collision avoidance; a high value alone does not establish task completion.

## Experiments

Training uses 12 configurations across random grids and mazes, with 8 or 32 agents. On-policy methods receive 20 million steps per scenario and off-policy methods 2 million. The authors report approximately 1,000 H100 GPU hours overall.

Selected Table 2 success rates (IQM ± 95% CI):

| Method | Random grid | Maze |
|---|---:|---:|
| IPPO | 0.410 ± 0.001 | 0.213 ± 0.013 |
| MAPPO | 0.830 ± 0.001 | 0.568 ± 0.004 |
| RRT* + IPPO | 0.420 ± 0.001 | 0.511 ± 0.001 |
| RRT* + MAPPO | 0.828 ± 0.001 | 0.556 ± 0.001 |
| RRT* + PD | 0.678 ± 0.002 | 0.692 ± 0.004 |

Planning improves IPPO's maze performance substantially, but does not improve MAPPO's success rate in this table. RRT* + MASAC falls below MASAC on both map families. The authors attribute some centralized-critic difficulties to input dimensionality and credit assignment; this is an interpretation rather than an isolated causal finding.

In the two-agent heterogeneous corridor demonstration, success rates are 0.7 for HetIPPO, 0.5 for IPPO and MAPPO, and 0.0 for HetMAPPO. Throughput depends strongly on configuration: the main scaling study reports around 50,000 steps/s with 32 agents and about 1,400 steps/s at 800 agents. Rates above 100,000 steps/s occur in other configurations and should not be read as uniform performance.

## Limitations

Built-in obstacles are static, landmark-size variation is absent from built-in generators, and there is no built-in communication mechanism. Euler integration requires small internal steps or frameskip for stability. Post-generation connectivity checks are future work, so generated tasks need not all be reachable. Different training budgets constrain direct sample-efficiency comparisons between on-policy and off-policy methods.

The supplied Markdown does not establish a publication year or stable paper identifier; these are left unspecified. Some extracted results conflict with accompanying prose: Appendix D says improved MASAC remains worse than ISAC, whereas Table 4 lists success rates of 0.44 and 0.21, respectively. Table 2 flowtime magnitudes also do not transparently match the stated mean-first-arrival definition and makespan scale; no unit reconciliation is assumed here.

## Related Concepts

- [[concepts/continuous-multi-agent-pathfinding|Continuous Multi-Agent Pathfinding]]: the navigation problem underlying the benchmark.

## Related Papers

- *POGEMA: A Benchmark Platform for Cooperative Multi-Agent Pathfinding* (2025), reference [15]: a discrete-grid benchmark contrasted with CAMAR's continuous control.
- *VMAS: A Vectorized Multi-Agent Simulator for Collective Robot Learning* (2022), reference [16]: the principal matched simulator comparison.
- *Towards a Standardised Performance Evaluation Protocol for Cooperative MARL* (2022), reference [29]: the evaluation framework CAMAR adapts.

Source: supplied parsed manuscript, including Appendices A–H. [Code repository](https://github.com/AIRI-Institute/CAMAR.git).
