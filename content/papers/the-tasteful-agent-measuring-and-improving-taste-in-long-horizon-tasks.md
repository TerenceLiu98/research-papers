---
title: "The Tasteful Agent: Measuring and Improving Taste in Long-Horizon Tasks"
type: paper
authors:
  - Wenbo Pan
  - Zhichao Liu
  - Shujie Liu
  - Jingying Zeng
  - Chin-Yew Lin
  - Xianfeng Tang
  - Yan Lu
  - Qi He
  - Xiaohua Jia
year: null
source_job_id: de679a2e-87a1-46e4-bdcb-c78ba731d6e3
tags:
  - llm-agents
  - agent-evaluation
  - long-horizon-reasoning
  - benchmark
  - knowledge-distillation
---

## TL;DR

The paper defines an agent's "taste" as its ability to choose the better direction at a long-horizon decision fork before the later outcome is visible. Taste-Bench contains 502 binary questions mined from parallel attempts and self-correcting detours in software-engineering and AI-research trajectories. The best evaluated model reaches 59.7% accuracy under a two-order protocol; accuracy falls from 62.3% on forks whose evidence is already in the prefix to 21.0% when more later work is required, and additional reasoning budget does not improve accuracy. Distilling outcome-informed teacher reasoning into a student improves held-out engineering-question accuracy from 30.0% to 47.9% and raises held-out SWE-bench Pro task success from 14.6% without advice to 33.7% with student advice.

The authors release the benchmark code at https://github.com/wbopan/tastebench and the dataset at https://huggingface.co/datasets/wenbopan/taste-bench.

## Research Question

Can an agent's quality of long-horizon decisions be measured automatically from existing trajectories, without expert annotation, and can the resulting supervision train better decisions on unseen tasks?

## Motivation

End-to-end agent benchmarks reveal whether a long task was completed but not whether the intermediate decisions were well chosen. A poor direction can look reasonable when selected and incur its cost only after substantial later work. The paper treats later trajectory evidence as hindsight supervision and seeks comparable decision forks where two plausible directions lead to distinguishable outcomes.

## Contributions

- Formalizes agent taste as selecting the candidate with the higher expected outcome at a decision fork, before branch evidence is available.
- Builds Taste-Bench with 502 questions across software engineering and machine-learning research, using parallel-trajectory and detour-trajectory constructions.
- Filters trivial and undecidable questions, evaluates candidate-order sensitivity, and reports a human review with 98.8% agreement between explicit judgments and mined labels.
- Shows that current frontier models have limited taste, that longer decision horizons are harder, and that more reasoning budget does not improve the measured accuracy.
- Distills a teacher's outcome-informed reasoning into a student evaluated without the privileged direction, then injects the student's judgments as advice into an independent executor.

## Method

### Decision-fork formulation

For a task $q$, trajectory prefix $h_t$, and two candidate directions $c_1$ and $c_2$, the evaluated model sees only $x=(q,h_t,c_1,c_2)$. Each branch is then completed and produces evidence $E_i$; an outcome function $U$ identifies the supported candidate as the branch with the better observed outcome. The benchmark label is therefore

$$
y = \arg\max_{i \in \{1,2\}} U(E_i).
$$

The construction is intended to compare decisions under a shared or comparable prefix. It does not treat every branch outcome as causal proof: the mining rubric rejects forks dominated by generic execution quality, crashes, missing dependencies, or other factors unrelated to the selected approach.

### Taste-Bench construction

Parallel forks align independent attempts at the same task that diverge into different directions and receive opposite native outcomes. Detour forks come from a single trajectory: the agent commits to an approach, encounters an observed failure, and later recovers with a different approach that completes the task. A generator proposes candidate forks and neutralizes the branch descriptions; four separate judge models filter questions whose answers are obvious from the candidates alone or whose labels are not supported by the full record.

The final benchmark has 502 questions: 390 from engineering trajectories and 112 from research trajectories. It crosses parallel versus detour construction with engineering versus research domains. Questions are evaluated in a fixed order and the exact reverse order; primary accuracy requires both presentations to be correct, making random guessing 25% and exposing position-dependent answers.

### Distillation and advice

The distillation experiments use Qwen3.6-27B with LoRA adapters and split the 390 engineering questions into task-disjoint folds. A teacher receives a demonstration naming the supported candidate and generates reasoning; the student receives only the benchmark question and is trained to match the teacher's reasoning and final choice. The student is then calibrated on its own reasoning traces. For end-to-end evaluation, the student's decision at each fork is rendered as task-specific advice for a fixed Qwen3.6-27B executor on held-out SWE-bench Pro tasks.

## Experiments

### Benchmark composition and label review

The source pools contain 2,677 graded engineering rollouts on 517 SWE-bench Pro tasks and 1,132 research runs on 47 AI R&D tasks from RE-Bench and HCAST, with research trajectories drawn from MALT. The generator proposes 4,657 candidate forks; 502 pass the filtering pipeline. In a 100-question human review, 170 of 172 explicit A/B judgments agree with the mined label, or 98.8%. The two reviewers agree on 73 of 74 questions for which both make an explicit A/B judgment, reported as Cohen's $\kappa=0.973$.

### Current-model evaluation

Fourteen contemporary models answer all 502 questions under a common interface and token budget. GPT-5.6 Sol is the strongest model at 59.7% Average accuracy, followed by GPT-5.5 at 59.5%. Detour forks are harder than parallel forks in both domains. Mean accuracy over the 14 models declines from 62.3% for in-prefix forks to 42.9% for inferable forks, 31.5% for next-step forks, and 21.0% for more-work forks.

### Reasoning budget

Two models are evaluated under three reasoning-effort settings, producing 6,024 responses. Moving from the lowest to highest setting changes accuracy by -0.2 percentage points for GPT-5.6 Sol and +2.2 points for GPT-5.6 Luna. Accuracy remains low on the more-work cases even though models spend the most reasoning tokens there.

### Transfer and end-to-end success

On held-out engineering questions, the distilled student reaches 47.9% two-order accuracy versus 30.0% for the base model, while mean two-order accuracy rises from 42.7% to 62.4%. On 41 held-out SWE-bench Pro tasks, no advice yields 14.6% success, correct advice yields 39.0%, and student advice yields 33.7%. These comparisons support transfer of judgment to unseen tasks under the reported task-disjoint protocol, but the end-to-end result remains tied to the specified executor, advice format, benchmark tasks, and evaluation harness.

## Limitations

- Hindsight labels are derived from realized branch outcomes, so later execution quality and environment conditions can still complicate attribution even after filtering and review.
- The benchmark measures a binary supported direction and its particular mining procedure; it does not establish a general scalar ability called taste across arbitrary tasks or domains.
- The strongest results depend on the two-order scoring rule, model panel, prompt, token budget, and the benchmark's 502 mined questions. Model rankings may change under other interfaces or outcome definitions.
- Research coverage is smaller than engineering coverage, and the engineering pool and held-out end-to-end evaluation are both based on SWE-bench Pro task trajectories.
- Distillation gains are evaluated with Qwen3.6-27B, LoRA, task-disjoint folds, and a fixed executor. They do not establish transfer to other model families, task distributions, or advice interfaces.
- The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier; those metadata remain unasserted.

## Related Concepts

- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: the durable decision-quality construct formalized by the paper.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: the paper uses separate judges to filter candidate questions and audit whether mined labels are supported.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: the student matches privileged teacher reasoning and final choices.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: task-disjoint folds test whether judgment transfers to unseen tasks.
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: a related outcome-grounded way to retain lessons from agent interaction, with a different deployment point.

## Related Papers

- Liu et al. (2024), "AgentBench: Evaluating LLMs as Agents": evaluates multi-step interaction at the task level, whereas Taste-Bench evaluates intermediate direction choices.
- Jimenez et al. (2024), "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?": the software-agent benchmark lineage used as context for the engineering evaluation.
- Deng et al. (2026), "SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?": supplies the engineering tasks and native outcomes used in the benchmark and held-out experiment.
- Huang, Vora, Liang, and Leskovec (2024), "MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation": an end-to-end machine-learning-agent benchmark contrasted with decision-level evaluation.
- Wijk et al. (2025), "RE-Bench: Evaluating Frontier AI R&D Capabilities of Language Model Agents against Human Experts": source domain for research trajectories.
- Rein et al. (2025), "HCAST: Human-Calibrated Autonomy Software Tasks": another source of research-task trajectories.
- Parikh and Wijk (2025), "MALT: A Dataset of Natural and Prompted Behaviors that Threaten Eval Integrity": public transcript source used for research runs.
- Hinton, Vinyals, and Dean (2015), "Distilling the Knowledge in a Neural Network": foundational teacher-student distillation work cited by the paper.

[[index|Library home]]
