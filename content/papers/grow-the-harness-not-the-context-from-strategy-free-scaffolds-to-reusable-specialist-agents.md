---
title: "Grow the Harness, Not the Context: From Strategy-Free Scaffolds to Reusable Specialist Agents"
type: paper
authors:
  - Laizhen Li
  - Jiarui Li
  - Juanjuan Zhao
  - Kejiang Ye
  - Ye Li
  - Cheng-zhong Xu
  - Xitong Gao
year: null
source_job_id: "d79dd41f-fbce-4ae2-895b-be0450dd17db"
tags:
  - llm-agents
  - agent-harnesses
  - program-synthesis
  - inference-efficiency
---

## TL;DR

Growing Harness learns an agent's executable harness from failures on a stream of related tasks. It starts from a strategy-free scaffold with fixed model and tool interfaces, uses function-level execution traces to constrain repairs, jointly repairs a bounded window of failures, and accepts updates only when a held-out gate does not regress. Across BrowseComp-Plus and WebArena-Verified, the learned harness has the highest mean success in five of six benchmark-model settings and reduces deployed-agent LLM calls by 76.0-91.8% and online cost by 74.4-98.6% relative to Tool-Calling. The results support moving recurring control into reusable code while retaining LLM calls for task-specific semantic reasoning.

## Research Question

Can a strategy-free agent scaffold use task feedback to grow a reusable executable controller that transfers across tasks in one family, reduces repeated model inference, and preserves previously acquired capability?

## Motivation

Agents that repeatedly serve one task family often reconstruct the same query refinement, observation filtering, progress checking, error recovery, and stopping decisions inside each task context. This repeated delegation increases calls, context length, and cost. Existing agents commonly specify their control loop in advance or store experience as text, workflows, skills, or tools. Growing Harness instead treats the shared harness itself as the persistent artifact and asks which recurring control can become code without replacing semantic reasoning by brittle rules.

The approach targets three constraints: reuse across unseen tasks, context-efficient execution, and low prior commitment at initialization. It is motivated in part by deployments with smaller or resource-constrained models, where moving repeated control from inference into code may be especially valuable.

## Contributions

- Formulates agent learning as reusable program growth from task feedback under fixed LLM and tool interfaces.
- Introduces trace-local program growth: function-level execution traces identify an edit surface, a bounded failure window encourages shared repairs, and an edit budget limits each candidate.
- Uses success-first held-out gate validation with transactional rollback to reject repair sequences that reduce earlier capability.
- Evaluates the learned harnesses on BrowseComp-Plus and WebArena-Verified with deployment models ranging from 4B to 120B parameters, including efficiency and ablation measurements.

## Method

**Strategy-free scaffold.** The initial harness exposes the task entry point and fixed model and tool interfaces but does not contain a complete task-solving controller. The model and tools remain fixed; the executable harness is the learned object.

**Function-level traces.** Each execution records a dynamic graph of harness-function calls, LLM calls, tool calls, returns, errors, inputs, outputs, and durations. For a failure window, the optimizer may modify the entry function and existing functions invoked by the supplied traces, add reusable helpers, and modify at most `L` functions. It must preserve signatures and runtime interfaces, may not delete existing functions, and may not encode task identifiers or expected answers.

**Failure-window curriculum.** The runtime fills a bounded window with failures from unseen training tasks. An offline optimizer receives the current harness, the latest traces, and diagnostic artifacts, then produces a complete executable candidate. The candidate is re-executed on every active failure. Solved tasks leave the window; unresolved tasks receive fresh traces and incremented attempt counts, while tasks reaching `R_max` are retired. Joint repair is intended to favor behavior shared across failures rather than instance-specific patches.

**Code and model roles.** The method directs deterministic, reusable operations such as parsing, validation, state updates, query refinement, recovery, and stopping into code. It retains LLM calls for semantic interpretation, synthesis, fuzzy comparison, and answer generation.

**Gate validation and rollback.** The initial harness is evaluated on a held-out gate set. After repairs solve the configured number of active tasks, the current harness is evaluated again. A candidate is accepted only if gate success is no lower than the latest accepted checkpoint. Otherwise, rollback restores code and training state, including the task cursor, failure window, counters, and records. The final harness is evaluated once on the held-out final set, with online cost reported separately from offline optimization cost.

## Experiments

**Setup.** The paper evaluates 200 training tasks, 50 gate tasks, and 50 final-evaluation tasks for each benchmark. BrowseComp-Plus represents deep-search retrieval and evidence synthesis; WebArena-Verified represents multi-step interaction on shopping, Reddit, and map sites. Deployment models are gpt-oss-120b, gpt-oss-20b, and Qwen3.5-4B. Each configuration receives three independent final-evaluation runs, with task-level cluster bootstrap intervals based on 10,000 replicates.

**Main results.** Growing Harness has the best mean success in five of six benchmark-model settings and is 0.7 percentage points below the best mean in the remaining setting. Success rates for Growing Harness versus Tool-Calling are:

| Benchmark | Model | Growing Harness SR (%) | Tool-Calling SR (%) |
| --- | --- | ---: | ---: |
| BrowseComp-Plus | gpt-oss-120b | 49.3 | 40.0 |
| BrowseComp-Plus | gpt-oss-20b | 39.3 | 40.0 |
| BrowseComp-Plus | Qwen3.5-4B | 29.3 | 12.0 |
| WebArena-Verified | gpt-oss-120b | 45.3 | 30.0 |
| WebArena-Verified | gpt-oss-20b | 44.7 | 12.7 |
| WebArena-Verified | Qwen3.5-4B | 45.3 | 6.7 |

The learned harness uses 5.5-6.0 calls per task on BrowseComp-Plus and 1.8-5.4 on WebArena-Verified, compared with 24.8-32.7 and 22.3-37.8 for Tool-Calling in the corresponding model blocks. Its online cost is lower in all six settings. On WebArena-Verified, success remains between 44.7% and 45.3% across deployment scales, while Tool-Calling declines to 6.7% with Qwen3.5-4B. These comparisons use the source's reported means; the paper reports normal-approximation 95% bootstrap confidence-interval half-widths in its full table.

**Harness growth.** BrowseComp-Plus produces a shared retrieval and evidence-verification pipeline. WebArena-Verified produces specialized handlers for Shopping, Reddit, and Map tasks around a general LLM-guided browser loop. The contrast is consistent with task feedback shaping the executable structure, but it is an interpretation of the observed learned programs rather than an isolated causal test.

**Ablations.** On a single 10-step BrowseComp-Plus run with gpt-oss-20b, final success on the 50-task evaluation set is 36% for the full method, 18% without function-level guidance, 22% without gate validation, and 28% without the failure window. Removing function-level guidance stalls gate progress early; removing gate validation allows an initially improved gate score to regress; and using a one-failure window lowers final success by 8 percentage points relative to the full method.

## Limitations

- The supplied paper is marked as a preprint and provides no explicit publication year, DOI, or arXiv identifier; the year is therefore left unspecified.
- Evidence covers two benchmarks and a restricted WebArena-Verified subset, with fixed model and tool interfaces. Broader task-family and environment transfer is not established.
- The final evaluation uses 50 tasks per benchmark and the ablations use one optimization run each, so the component comparisons are narrower than the three-run main evaluation.
- Offline optimization, diagnostic artifacts, and evaluator calls are excluded from the reported online cost. The practical benefit therefore depends on reusing a learned harness enough to amortize its training expense.
- A success-preserving gate does not by itself prove that a repair is broadly reusable or free of benchmark-specific behavior. The paper reports transfer within each task family, not a test of unrelated task distributions.
- Generated code requires sandboxing, explicit permission boundaries, and validation before deployment. The experiments do not establish those operational guarantees.

## Related Concepts

- [[concepts/trace-local-program-growth|Trace-Local Program Growth]]: function-level traces, joint failure repair, and gate rollback as a reusable pattern for growing an executable harness.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: uses execution outcomes to guide revisions of executable programs; Growing Harness grows one shared harness rather than searching an archive of parent programs.
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: retains procedures and failure lessons as persistent memory, whereas Growing Harness compiles recurring control into executable paths.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: the paper changes a task harness under a fixed model and does not establish improvement of the mechanism that produces future harness revisions.

## Related Papers

**Library papers:**

- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: revises an existing coding-agent scaffold through archived versions; Growing Harness instead starts from a strategy-free task scaffold and uses trace-local failure repair.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: searches over self-modifying agent lineages, providing a broader archive-based contrast to one accumulating harness.
- [[papers/hyperagents|HyperAgents]]: makes task and meta-agent procedures editable within archive search, whereas Growing Harness keeps the model and optimizer interfaces fixed.

**Works cited by the source:**

- Yao et al. (2023), "ReAct: Synergizing Reasoning and Acting in Language Models": an example of a predefined reasoning-and-acting control loop.
- Wang et al. (2023), "Voyager: An Open-Ended Embodied Agent with Large Language Models," and Yuan et al. (2023), "CRAFT: Customizing LLMs by Creating and Retrieving from Specialized Toolsets": executable skills and tools as persistent experience artifacts.
- Hu, Lu, and Clune (2024), "Automated Design of Agentic Systems," and Zhang et al. (2024), "AFlow: Automating Agentic Workflow Generation": code-represented workflow and agent-system search.
- Lou et al. (2026), "AutoHarness: Improving LLM Agents by Automatically Synthesizing a Code Harness," and Lee et al. (2026), "Meta-Harness: End-to-End Optimization of Model Harnesses": direct harness optimization approaches.
- Wang, Kattakinda, and Feizi (2026), "Do Agent Optimizers Compound? A Continual-Learning Evaluation on Terminal-Bench 2.0": evidence motivating explicit regression control in continual agent optimization.

[[index|Library home]]
