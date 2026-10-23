---
title: "Naive Prompt Optimization: Rethinking the Need for Complex Prompt Search"
type: paper
authors:
  - Yuan Chang
  - Xiaoqi Chen
year: null
source_job_id: 2a0c6aa5-fbae-4e74-83af-bd4a62c53be9
tags:
  - prompt-optimization
  - llm-agents
  - teacher-student-learning
  - reinforcement-learning
  - constrained-decoding
---

## TL;DR

Naive Prompt Optimization (NPO) repeatedly asks a teacher model to revise one prompt lineage from recent student rollouts and rewards. On IFBench and HotpotQA, it is broadly comparable to or better than the multi-candidate GEPA search procedure at slightly lower rollout budgets, and it benefits more consistently from stronger teachers. Across 22 TextArena games, NPO and GEPA are broadly comparable while GRPO is stronger on some tasks. Prompts optimized for one student usually improve other students without re-optimization, especially within the same model family, but the study is preliminary and does not establish the same result for long-horizon environments or frontier closed-model students.

## Research Question

Can a single-lineage, feedback-rich [[concepts/automatic-prompt-optimization|Automatic Prompt Optimization]] procedure match more elaborate prompt search, and do its optimized prompts transfer across student models?

## Motivation

Prompt optimization can adapt a frozen model through ordinary inference APIs, avoiding task-specific weight serving. Recent methods add beam search, Bayesian optimization, candidate pools, or Pareto selection, but it is unclear whether this optimizer-side complexity is necessary when a capable teacher receives complete rollout traces and rewards. The paper tests a deliberately simple baseline against GEPA and against weight-based GRPO.

## Contributions

- Introduces NPO, which maintains one prompt lineage and revises it from a sliding window of complete rollouts and rollout-specific rewards.
- Builds a controlled comparison using shared environment seeds and constrained action decoding to reduce instance and formatting noise.
- Compares NPO with GEPA on IFBench, HotpotQA, and 22 TextArena games, and with GRPO on the game suite.
- Tests whether prompts optimized on Qwen3-8B or Llama-3.1-8B transfer unchanged to larger and cross-family students.
- Checks optimized prompts for overlap with held-out HotpotQA answers as a diagnostic for evaluation-answer leakage.

## Method

At iteration $i$, NPO samples a task minibatch, runs the fixed student under prompt $P^{(i)}$, and records full rollout traces and rewards. A teacher receives the current prompt plus a sliding window covering the most recent $W$ iterations and produces $P^{(i+1)}$. Unlike GEPA, NPO neither maintains a candidate pool nor performs Pareto-based parent selection; unlike OPRO, it conditions revision on trajectory-level feedback rather than only prompts and scalar scores.

The evaluation reuses pseudorandom environment seeds across methods. For actions drawn from finite legal sets, token-level constraints enforce a reasoning segment followed by one legitimate action. Local renormalization over a token-prefix trie gives mechanically forced formatting tokens probability one, reducing the influence of format compliance on the relative probabilities of legal actions.

Teacher variation holds Qwen3-8B fixed as the main student while comparing Qwen3-8B, DeepSeek-V4-Flash-preview-0424, and GPT-5.5 as revisers. Transfer experiments apply optimized prompts verbatim to other Qwen, Llama, and StepFun students. The GRPO baseline instead trains task-specific LoRA parameters on Qwen3-8B.

## Experiments

### IFBench and HotpotQA

NPO uses minibatch/iteration settings of 50/10 on IFBench and 40/20 on HotpotQA, with each revised prompt evaluated on a separate 300-example validation set. Its reported budgets are 3,500 and 6,800 rollouts, compared with 3,593 and 6,871 for GEPA. NPO is broadly comparable to or better than GEPA, and the gap favors NPO more strongly as teacher capability increases; GPT-5.5 gives NPO its fastest convergence and highest validation performance on both tasks.

### Cross-student transfer

Prompts optimized on Qwen3-8B are evaluated unchanged on Qwen3-14B, Qwen3-32B, Llama-3.1-70B-Instruct, and Llama-3.3-70B-Instruct. Prompts optimized on Llama-3.1-8B are transferred to larger Llama models, Qwen3-32B, and StepFun-3.7-Flash. Most tested settings retain positive gains. Same-family transfer is stronger and more consistent than cross-family transfer, which has a few negative cases.

### Interactive games and GRPO

NPO and GEPA each receive 408 complete episodes on 22 TextArena games. GRPO uses roughly 800-1,200 training rollouts per game, although the main comparison plots all methods over the shared 0-408 rollout range. There is no universal winner: NPO and GEPA show broadly similar gains, while GRPO performs better on some games that are less responsive to prompt optimization.

### Leakage and group-size checks

Across successive HotpotQA prompt versions, overlap with training answers grows while overlap with held-out validation answers remains negligible. Manual inspection attributes the small nonzero validation overlap to training and validation questions sharing answers rather than direct validation exposure. A Minesweeper study with GRPO group sizes from 6 to 48 finds similar improvement under a fixed rollout budget rather than a clear benefit from larger groups.

## Limitations

- The task set is limited, and the results do not establish NPO's relative advantage in more complex or longer-horizon agent environments.
- Frontier closed models such as GPT-5.5 are tested as teachers, not students, partly because their APIs do not expose the token-level logits and decoding control required by the evaluation.
- RL remains unstable on some games, and conclusions about GRPO depend on task-specific algorithms and reward design.
- Longer trajectories enlarge the feedback context required by NPO and may weaken the practicality of its sliding-window design.
- Transfer is less consistent across model families than within them, and a few tested combinations do not improve.
- The leakage analysis tests answer-string overlap; it does not rule out every form of benchmark contamination.
- Sharing student trajectories with an externally hosted teacher creates a privacy risk and requires masking or sanitization for sensitive tasks.
- The supplied manuscript does not state a publication venue, year, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/automatic-prompt-optimization|Automatic Prompt Optimization]]
- [[concepts/online-tool-use-policy-refinement|Online Tool-Use Policy Refinement]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[index|Library home]]

## Related Papers

- Agrawal et al. (2026), "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning": the multi-candidate, Pareto-selected prompt optimizer used as the main search baseline.
- Yang et al. (2024), "Large Language Models as Optimizers": introduces OPRO, an LLM-as-optimizer approach based on previous prompts and scores.
- Pryzant et al. (2023), "Automatic Prompt Optimization with Gradient Descent and Beam Search": combines textual gradients with beam search.
- Shao et al. (2024), "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models": provides the GRPO method used as the weight-based comparison.
- [[papers/evolvetrade-experience-driven-policy-refinement-for-self-evolving-llm-trading-agents|EvolveTrade]]: adapts an operational prompt from deployed trajectory feedback in a specialized tool-using setting.
