---
title: Automatic Prompt Optimization
type: concept
aliases:
  - Automated Prompt Optimization
  - Prompt Search
tags:
  - prompt-optimization
  - language-models
  - black-box-optimization
  - teacher-student-learning
---

## Overview

Automatic prompt optimization treats natural-language instructions as editable control variables for a fixed language model. An optimizer proposes revised prompts, evaluates the model induced by each prompt on task feedback, and uses the results to choose or generate later revisions. The optimized artifact can be deployed through inference alone, but its effectiveness depends jointly on the target model, task distribution, feedback signal, and evaluation harness.

## Key Ideas

- **Prompts parameterize behavior without changing weights.** Optimization changes the instructions supplied to a model while leaving its learned parameters fixed, making the result easier to deploy or transfer than a task-specific adapter.
- **Feedback can be scalar or trajectory-rich.** Some methods condition proposals on prompt-score pairs; others expose errors, textual critiques, execution traces, or per-rollout rewards so a reviser can diagnose procedural failures.
- **Search complexity varies.** Optimizers may follow one iterative lineage, keep a beam or candidate pool, use Bayesian optimization, or select candidates by instance-level Pareto performance. Added search is useful only when it improves results under a comparable evaluation budget.
- **Teacher capability and search are interacting resources.** A stronger reviser with richer feedback may produce useful edits without maintaining many prompt candidates, while weaker revisers may benefit more from explicit exploration and selection.
- **Transfer is empirical, not automatic.** A prompt optimized for one student can improve another, particularly within a model family, but tokenizer, instruction-following, scale, and family differences can change or reverse the effect.
- **Evaluation must separate policy quality from harness artifacts.** Matched task instances, held-out evaluation, format controls, and leakage checks reduce the risk that gains come from easier samples, invalid-output penalties, or memorized answers.
- **Optimization can overfit or expose data.** Long prompts may encode training examples, and trajectory feedback sent to an external teacher may contain sensitive information.

## Important Papers

- Yang et al. (2024), "Large Language Models as Optimizers": proposes OPRO, where an LLM generates improved solutions from previous candidates and scores.
- Pryzant et al. (2023), "Automatic Prompt Optimization with Gradient Descent and Beam Search": uses textual gradients and beam search to revise prompts.
- Opsahl-Ong et al. (2024), "Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs": combines generated candidates with Bayesian optimization in MIPRO.
- Agrawal et al. (2026), "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning": maintains a candidate pool using reflection and Pareto-based selection.
- [[papers/naive-prompt-optimization-rethinking-the-need-for-complex-prompt-search|Naive Prompt Optimization]]: tests whether one lineage with rich rollout feedback can match more complex prompt search and whether the resulting prompts transfer between students.
- [[papers/evolvetrade-experience-driven-policy-refinement-for-self-evolving-llm-trading-agents|EvolveTrade]]: applies prompt-policy revision to a deployed trading agent using realized trajectory feedback.

## Related Concepts

- [[concepts/online-tool-use-policy-refinement|Online Tool-Use Policy Refinement]]: a deployment-oriented subtype that revises the operational policy of a tool-using agent over time.
- [[concepts/in-context-learning|In-Context Learning]]: changes model behavior through context without updating weights, but does not necessarily include an optimization loop.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: a stronger system-level claim than optimizing an editable prompt with a fixed reviser.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: also transfers teacher capability, usually by training student parameters rather than revising student instructions.
