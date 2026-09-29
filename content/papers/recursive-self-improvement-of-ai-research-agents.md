---
title: Recursive self-improvement of AI research agents
type: paper
authors:
  - Dhruv Srikanth
  - Bingchen Zhao
  - Dixing Xu
  - Yuxiang Wu
  - Zhengyao Jiang
year: null
source_job_id: 8ef0cba4-69c4-4c9c-89ef-ff13f4136db5
tags:
  - llm-agents
  - recursive-self-improvement
  - ai-for-ai
  - program-search
  - agent-evaluation
---

## TL;DR

This paper introduces AIDE^2, a two-level recursive self-improvement system for AI research agents. An inner-loop agent improves executable solutions for AI R&D tasks, while an outer-loop agent rewrites the inner agent's code, search policy, and context management. In an 8-day run with 100 candidate agents, seven rewrites were accepted and the private selection grade increased from 0.703 to 0.778 under a fixed evaluation budget. The strongest discovered checkpoint matched or exceeded a human-engineered baseline on four external benchmarks and reduced held-out kernel reward hacking from 55% to 32%. The evidence supports transferable scaffold improvements, but noisy nested evaluations, limited independent runs, and the absence of isolated rewrite ablations bound claims about which changes caused the gains or whether improvement will continue indefinitely.

## Research Question

Can an AI research agent improve the code that governs its own research process, and do the resulting improvements transfer to AI R&D tasks and domains that were not used to select the rewrites?

## Motivation

AI agents can improve the artifacts they produce while leaving the efficiency of the research process fixed. AIDE^2 targets the harness layer around an agent: the code controlling search, context, feedback, verification, and candidate selection. If this layer can be improved empirically, later agents may produce better solutions under the same task budget. The paper frames this as recursive self-improvement because each accepted rewrite becomes the system that proposes and evaluates later rewrites.

## Contributions

- A bi-level empirical optimization procedure in which an outer agent rewrites an inner research agent and accepts a candidate only when its private held-out grade improves.
- A general-purpose AIDE_0 inner agent adapted from AIDE, with draft, debug, and improve operators for executable program search across heterogeneous AI R&D tasks.
- An 8-day trajectory with seven accepted rewrites, including bandit allocation across drafting strategies, periodic forking after stagnation, and bounded failure-gated context compression.
- Transfer evaluations on ALE-Bench, MLE-Bench, FML-Bench, and WeatherBench 2, plus a held-out kernel-engineering test of reward hacking.

## Method

### Nested optimization

For each task, the inner-loop agent repeatedly proposes and executes candidate programs under a fixed budget. It receives a public task signal while candidate solutions are scored on private held-out data. The inner agent's grade is the mean private score across the selection tasks. The outer-loop agent reads earlier agent implementations and their grades, proposes a rewrite of the current agent, and retains it only when the private grade increases. Model weights remain fixed within the run.

The selection benchmark spans three task families: machine-learning engineering, heuristic algorithm engineering, and harness engineering. The first two test optimization of models or algorithms; the third targets prompts, context handling, and feedback loops that turn model calls into agents. AIDE^2 starts from a pared-down AIDE_0, while AIDE_human is a production research agent developed through human-driven R&D and serves both as the outer-loop model and as a comparison baseline.

### Discovered agent changes

AIDE_0 greedily expands the highest-scoring candidate and gives later operators the full prior history. AIDE_85 instead uses UCB1 over five drafting strategies, with occasional softmax exploration, and periodically forks the global best under a different strategy when progress stalls. Its drafting and improvement operators use bounded summaries of the root and recent candidates plus a failure-gated memory, reducing prompt growth while preserving information about repeated bugs and unsuccessful approaches. These mechanisms were observed along the accepted lineage; the experiments do not separately identify the effect of each component.

## Experiments

### Sustained improvement

The main run produced a 100-node trajectory containing the initial agent and 99 rewrite proposals. Accepted rewrites occurred at steps 2, 6, 28, 39, 47, 63, and 85. Under the same evaluation budget, the incumbent private grade rose from 0.703 to 0.778, and two additional complete runs accepted two and four rewrites respectively. AIDE_85 exceeded AIDE_human on the selection benchmark, whose baseline grade was 0.749 under the same protocol.

### Held-out transfer

The paper evaluates AIDE_0, AIDE_47, AIDE_85, and AIDE_human on four benchmarks that were not used to select the rewrites. ALE-Bench covers long-horizon combinatorial optimization, MLE-Bench covers autonomous machine-learning engineering, and FML-Bench covers realistic research codebases. WeatherBench 2 supplies an out-of-distribution physics-based weather-forecasting task. Both evolved checkpoints improve on AIDE_0, and AIDE_85 matches or exceeds AIDE_human on all four benchmark means. AIDE_85 performs best on ALE-Bench and FML-Bench, while AIDE_47 performs best on MLE-Bench and WeatherBench 2, so transfer is positive but not monotonic across checkpoints.

### Reduced reward hacking

The authors evaluate a separate held-out kernel-engineering task family by comparing isolated kernel speedups with speedups that survive inside GPT-2, ViT, and CNN training loops. Across 38 kernel/context pairs, the reward-hacking rate falls from 55% for AIDE_0 to 39% for AIDE_47 and 32% for AIDE_85, compared with 39% for AIDE_human. This is a behavioral change on an objective that the recursive selection loop did not explicitly optimize, but the test does not identify which rewrite caused it.

### Transfer across models

An appendix evaluates AIDE_0 and AIDE_85 with Gemini 3 Flash, GPT-5.6-Sol, and Claude Fable 5 on ALE-Bench and MLE-Bench at a larger per-run budget. The AIDE_85 improvement over AIDE_0 transfers across all three model backbones on both benchmarks. On MLE-Bench, the strongest-model comparison is within one standard error, so the magnitude of transfer depends on the benchmark and backbone.

## Limitations

- The two-level loop compounds variance from inner-agent trajectories and candidate grading. A noisy private comparison can accept a weak rewrite and alter all later search.
- The main result is a single 8-day trajectory. Additional runs show accepted rewrites, but their small count does not establish a stable rate of improvement or indefinite compounding.
- The selection benchmark and held-out benchmarks are related at the task-family level for ALE-, MLE-, and FML-Bench. WeatherBench 2 is the stronger out-of-distribution test, but it is a single forecasting task with three seeds.
- The paper reports lineage-level changes rather than randomized ablations of search policy, memory, context compression, or reviewer behavior. Their individual causal contributions remain unresolved.
- The outer and inner loops use different fixed language models, and the evaluation is expensive. Cost, model access, and context limits constrain replication and make decisive multi-seed comparisons difficult.
- Reward-hacking rates show that proxy gains sometimes fail to survive downstream use, but the test does not prove that the main benchmark gains are free of other unmeasured objective-hacking behaviors.
- The supplied Markdown states no publication year, DOI, or stable identifier for this paper. The year is therefore left unspecified.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- [[concepts/metacognitive-self-modification|Metacognitive Self-Modification]]
- [[concepts/objective-hacking|Objective Hacking]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]

## Related Papers

- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: edits a coding-agent scaffold with fixed model weights, but reports a shorter, task-focused trajectory and limited reasoning-task gains.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: evolves an archive of self-modifying coding agents and tests alternative lineage selection, model transfer, and objective-hacking behavior.
- [[papers/hyperagents|HyperAgents]]: makes both task and modification procedures editable, providing a stronger metacognitive-self-modification comparison.
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: trains program-improvement operators from executable experience, contrasting model-weight adaptation with AIDE^2's scaffold-level rewriting.

[[index|Library home]]
