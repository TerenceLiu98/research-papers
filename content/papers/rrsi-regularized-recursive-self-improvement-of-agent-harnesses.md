---
title: "RRSI: Regularized Recursive Self-Improvement of Agent Harnesses"
type: paper
authors:
  - Peng Xia
  - Rujun Han
  - Zifeng Wang
  - Yanfei Chen
  - Yufan Zhuang
  - Yoonho Lee
  - Chengsong Huang
  - Han Yu
  - Zhongying CuiZhu
  - Yifei Ming
  - Huaxiu Yao
  - Burak Gokturk
  - Tomas Pfister
  - Chen-Yu Lee
year: 2026
source_job_id: ac3a7696-83b1-4e35-bdbd-59b0323b5d86
tags:
  - llm-agents
  - agent-harnesses
  - recursive-self-improvement
  - regularization
  - agent-evaluation
---

## TL;DR

RRSI regularizes iterative agent-harness evolution without limiting which harness components may change. It anneals the number of edits per proposal, retains cross-round evidence, explores underused component types, screens benchmark-specific edits, and accepts candidates only when their measured benefit is stable and proportionate to inference cost. Across coding, agentic-workspace, and engineering-design evaluations, the evolved harnesses improve every reported held-out split, with gains up to 4.7 points out of distribution. In the agentic-workspace ablation, RRSI trades a smaller evolve-set gain for a higher OOD average and 36% fewer policy tokens than unregularized evolution.

## Research Question

How can recursive improvement of an editable agent harness use repeated feedback from a finite evolve set without preserving benchmark-specific, noise-driven, or unnecessarily expensive changes?

## Motivation

Harness evolution repeatedly proposes and selects changes to prompts, control flow, tools, memory, skills, and context management while keeping model weights fixed. Because each round reuses the same evolve set, this is adaptive empirical optimization over a broad program space: measured gains can reflect task memorization, stochastic winners, or accumulated inference cost rather than reusable mechanisms. The paper therefore treats transfer, not evolve-set score alone, as the central test of improvement.

## Contributions

- Frames adaptive overfitting as a central problem in harness-level recursive self-improvement.
- Introduces [[concepts/regularized-harness-evolution|Regularized Harness Evolution]], combining proposal-side edit control and evidence-aware exploration with selection-side leakage, stability, and cost checks.
- Evaluates unchanged evolved harnesses on eight benchmarks across coding, agentic workspace, and engineering design, including out-of-distribution and cross-policy transfer.
- Separates evolve-set gains, held-out performance, inference cost, trajectory length, and validity guards instead of treating benchmark score as the only objective.

## Method

RRSI keeps the harness edit space open but constrains the path through it. Its proposal process uses a cosine-annealed edit-cardinality budget that decreases toward one edit per candidate. Each evaluated edit is recorded with its component, hypothesis, source diff, score and cost changes, and acceptance outcome. When recent progress remains within an empirically estimated noise band, proposal slots are reserved for component types not yet exercised. Components with no recent positive measured gain become pruning targets.

Before evaluation, a critic rejects candidates that encode evolve-task names, values, answers, or inert machinery. A candidate must remain above a running-best score minus the noise tolerance. Gains above the noise band face a gain-dependent inference-cost ceiling; changes within the band need sufficient evidence from score, cost reduction, or previously unused structural components. Engineering-design runs add non-compensatory guards against degraded valid-output and submission rates. The highest-scoring admissible candidate replaces the incumbent; otherwise the incumbent remains.

The paper describes the $L_0$, Lasso/$L_1$, and Ridge/$L_2$ labels as functional analogies. The procedure constrains discrete edits and measured resource growth; it does not optimize conventional norm-penalized objectives over a shared parameter vector.

## Experiments

RRSI is evolved on Terminal-Bench 2.1, the Harvey LAB evolve split, and EngDesign, then evaluated unchanged on SWE-bench Verified; Harvey LAB held-out, JobBench, GDPval, and APEX-Agents; and Frontier-Eng. The main Claude Opus 4.8 runs report evolve-set gains of 6.0 points on Terminal-Bench, 1.1 on Harvey LAB, and 4.9 on EngDesign. Held-out gains are 1.8 on SWE-bench Verified, 2.3 on Harvey LAB held-out, 3.5-4.7 across the three agentic OOD benchmarks, and 4.3 Medal points on Frontier-Eng.

On agentic workspace tasks, RRSI reaches an OOD average of 43.6 versus 39.7 for the base harness and 40.3 for unregularized evolution. It uses 2.42 million policy tokens per trial, compared with 3.80 million for unregularized evolution, while the base harness uses 1.56 million. Removing proposal or acceptance regularizers raises evolve-set score but reduces OOD performance; removing both produces the highest evolve score and nearly loses the transfer gain.

Independent coding evolution with Gemini 3.5 Flash raises Terminal-Bench from 64.6 to 78.7 and SWE-bench Verified from 76.8 to 79.0. Running that evolved harness unchanged with the unseen Gemini 3.1 Flash Lite raises Terminal-Bench from 11.2 to 14.6, supporting transfer across policy scale within the tested setting.

## Limitations

- The method improves harnesses around frozen policies; it does not test joint evolution of model weights and harness code.
- All selection still depends on finite evolve sets, empirical noise estimates, fixed search budgets, and domain-specific hyperparameters.
- The component-level history assigns a bundled candidate's score and cost change to every included edit, so causal attribution is weakest early in a run when edit budgets are larger.
- Broader agent architectures, tool ecosystems, and longer-running improvement processes remain untested.
- RRSI remains more expensive than the unevolved base harness, despite being cheaper than the compared evolved harnesses.
- The supplied source gives project and code websites but no stable DOI or arXiv identifier for this paper.

## Related Concepts

- [[concepts/regularized-harness-evolution|Regularized Harness Evolution]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- [[concepts/objective-hacking|Objective Hacking]]
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]

## Related Papers

**Library papers:**

- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]]: evolves an AI-research harness through a nested empirical loop; RRSI focuses on regularizing proposal and acceptance to improve cross-benchmark transfer.
- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: uses trace-local repairs and a held-out rollback gate within task families, providing a complementary form of regression control.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: preserves alternative self-modifying lineages in an archive, whereas RRSI regularizes transitions along an incumbent harness trajectory.
- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: combines scaffold revision with score and resource use, but reports a narrower coding-centered evolution setting.

**Works cited by the source:**

- Lee et al. (2026), "Meta-Harness: End-to-End Optimization of Model Harnesses"; Lin et al. (2026), "Agentic Harness Engineering"; Nie et al. (2026), "Test-Time Harness Evolution"; and Chen et al. (2026), "HarnessX": the four harness-evolution baselines used in the comparison.
- Dwork et al. (2015), "Generalization in Adaptive Data Analysis and Holdout Reuse": motivates conservative selection under repeated adaptive measurements.
- Zhang et al. (2026), "HarnessCompass": concurrent work that targets generalizable harness evolution as an explicit search objective.

[[index|Library home]]
