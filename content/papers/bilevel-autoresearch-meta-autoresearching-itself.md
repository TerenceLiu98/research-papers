---
title: "Bilevel Autoresearch: Meta-Autoresearching Itself"
type: paper
authors:
  - Yaonan Qu
  - Meng Lu
year: 2026
source_job_id: dc576838-da70-4b09-b052-37029a68b7d8
tags:
  - autoresearch
  - llm-agents
  - bilevel-optimization
  - recursive-self-improvement
  - program-search
---

## TL;DR

Bilevel Autoresearch uses an outer language-model loop to generate Python mechanisms that alter how an inner autoresearch loop searches. On one 50M-parameter GPT pretraining benchmark, the full three-level system improved validation bits per byte by $-0.045 \pm 0.030$, compared with $-0.009 \pm 0.002$ for the inner loop alone. Generated tabu-search, bandit, and orthogonal-exploration mechanisms helped some runs escape repetitive proposals, but the evidence comes from three repeats per group on one hardware-specific task. The study demonstrates one bounded step of mechanism-level improvement, not recursive improvement of the outer loop itself.

## Research Question

Can an LLM improve an autoresearch system's search procedure, rather than only propose better task-level configurations, by inspecting the procedure and generating executable mechanisms that change subsequent search behavior?

## Motivation

Autoresearch systems can repeatedly propose, execute, evaluate, and retain task-level changes while leaving their proposal, acceptance, memory, and exploration rules fixed by human designers. This work treats those rules as an optimization target. Its central distinction is between adjusting parameters inside a fixed search procedure and changing the mechanism that generates and selects future adjustments.

## Contributions

- A bilevel formulation in which the inner loop optimizes a training configuration and an outer loop modifies the inner loop's search mechanism.
- A four-round mechanism-research dialogue that explores candidates, critiques them, specifies an interface, and generates Python code for runtime injection.
- A four-group ablation separating the inner loop, parameter-level search guidance, the full mechanism-research system, and mechanism research without the intermediate guidance loop.
- Trace evidence connecting high-performing runs to mechanisms that disrupted repetitive proposals and exposed a batch-size decrease that the default search path missed.
- A representation-agnostic interpretation of mechanisms: code is the tested carrier, while prompts, skills, workflows, evaluators, and memory schemas are proposed but unevaluated alternatives.

## Method

### Three levels of search

Level 1 runs 30 iterations of LLM-guided hyperparameter search. Each iteration edits a working copy of `train.py`, trains for 300 seconds, and retains the change only when validation bits per byte improves. Level 1.5 runs every five inner iterations and can freeze repeatedly unsuccessful parameters, unfreeze parameters after the search moves, and add guidance toward under-explored dimensions. It cannot change proposal logic, acceptance, or loop structure.

Level 2 runs every two Level 1.5 cycles. In four model calls it reads the runner and trace, surveys mechanisms from adjacent optimization fields, critiques candidates, specifies an interface, and emits complete Python code. The implementation dynamically imports the patch before activation and restores the prior runner when validation fails. All levels use `deepseek-chat`; the outer level therefore adds inference and wall-clock cost without relying on a stronger model.

### Experimental groups

The ablation compares Level 1 alone (Group A), Levels 1 and 1.5 (Group B), all three levels (Group C), and Levels 1 and 2 without Level 1.5 (Group D). Each group has three repeats. The benchmark trains a roughly 50M-parameter GPT model on an RTX 5090 under fixed 300-second evaluations.

## Experiments

Group A achieved a mean change of $-0.009 \pm 0.002$ in validation bits per byte. Group B reached $-0.006 \pm 0.006$, so parameter-level redirection increased search diversity without producing a reliable gain. Group C reached $-0.045 \pm 0.030$: two repeats improved sharply ($-0.065$ and $-0.058$), while the third reached only $-0.011$. Thus the reported mean improvement is five times Group A's by absolute magnitude, but it is also highly variable.

Five of six Group C artifacts passed import validation. The active named mechanisms were a Tabu Search Manager, a Multi-Scale Bandit Proposer, and Systematic Orthogonal Exploration; a Gaussian-process mechanism was reverted because `sklearn` was unavailable. The strongest runs reduced `TOTAL_BATCH_SIZE` from $2^{19}$ to $2^{17}$ or $2^{18}$, increasing the number of optimization steps possible within the fixed wall-clock budget. Groups A and B instead repeated or froze the initially unsuccessful direction of increasing batch size.

Group D reached $-0.034 \pm 0.031$, but its mechanism patches were not successfully applied or validated. Its strong repeats therefore do not isolate successful Level 2 injection, making this ablation suggestive rather than clean evidence about whether Level 1.5 is necessary.

## Limitations

- Each group has only three repeats, and Group C's standard deviation is 67% of the magnitude of its mean.
- The evaluation covers one small GPT pretraining task, one GPU setup, and a fixed wall-clock training budget; generalization to other tasks and compute regimes is unknown.
- Baseline validation values vary from 1.094 to 1.114 across repeats, and the experiments do not use fixed random seeds.
- The outer prompt names broad candidate domains, so the discovered mechanisms are autonomous within a human-shaped search space.
- Runtime code injection is fragile. A preliminary loading bug invalidated an earlier run, and dependency failures remain possible despite rollback.
- The experiments evaluate Python code as the mechanism carrier; claims about prompts, skills, workflows, evaluators, principles, or memory schemas remain conceptual.
- The outer loop improves the inner loop once. It is not itself recursively improved, and the study provides no stability or indefinite-compounding guarantee.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: distinguishes the demonstrated bounded improvement of an inner search mechanism from the untested recursive improvement of the meta-level loop.
- [[concepts/automatic-prompt-optimization|Automatic Prompt Optimization]]: optimizes one possible behavior-shaping artifact while generally retaining a fixed optimizer.
- [[concepts/meta-evolution|Meta-Evolution]]: changes or trains the operators that generate later candidates rather than only optimizing candidates themselves.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: uses execution traces to guide later program modifications.

## Related Papers

- Karpathy (2026), "autoresearch: LLM-guided hyperparameter search for GPT pretraining": supplies the single-track keep/discard loop used as Level 1.
- AIMing Lab (2026), "AutoResearchClaw: Multi-batch parallel autoresearch": extends autoresearch through parallel candidate evaluation while retaining a human-designed search mechanism.
- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]]: a library comparison that also uses an outer loop to rewrite an AI research harness, but evaluates longer scaffold lineages and held-out transfer.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: a library comparison that evolves self-modifying coding agents across archived lineages rather than injecting mechanisms into one hyperparameter-search runner.

[[index|Library home]]
