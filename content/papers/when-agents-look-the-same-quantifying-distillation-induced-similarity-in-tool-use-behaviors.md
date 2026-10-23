---
title: "When Agents Look the Same: Quantifying Distillation-Induced Similarity in Tool-Use Behaviors"
type: paper
authors:
  - Chenghao Yang
  - Yuning Zhang
  - Zhoufutu Wen
  - Tao Gong
  - Jiaheng Liu
  - Qi Chu
  - Nenghai Yu
year: 2026
tags:
  - llm-agents
  - tool-use
  - knowledge-distillation
  - behavioral-similarity
  - agent-evaluation
---

## TL;DR

The paper measures whether tool-using LLM agents share non-mandatory behavioral patterns rather than merely the actions required to solve a task. Response Pattern Similarity (RPS) compares verbal behavior within aligned interaction stages, while Action Graph Similarity (AGS) compares optional tool choices, local action sequences, and dependencies between tool outputs and later calls. Across 18 models from eight providers on tau-Bench and tau2-Bench, Kimi-K2 (thinking) is the most similar non-Anthropic model to Claude Sonnet 4.5 (thinking), with AGS 82.7% and RPS 3.65. A controlled distillation experiment provides stronger evidence for the metrics than this observational cross-model comparison: AGS rises by 0.13 toward the teacher and falls by 0.05 toward a non-teacher control.

## Research Question

Can behavioral similarity between tool-using LLM agents be measured while separating task-mandated actions from optional choices that may reflect shared training signals or distillation?

## Motivation

Agents can converge because a task admits only one successful path, or because they share optional habits such as redundant checks, retry strategies, response templates, and patterns of reusing tool outputs. Conventional response similarity and whole-graph measures mix these sources. This makes it difficult to determine whether apparent convergence reflects common task constraints, general capability improvement, or behavioral inheritance from a teacher. The paper frames these optional choices as behavioral degrees of freedom and connects their measurement to [[concepts/knowledge-distillation|Knowledge Distillation]].

## Contributions

- Introduces [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]] as a trajectory-level measurement problem that separates mandatory from non-mandatory behavior.
- Defines Response Pattern Similarity (RPS), which aligns trajectory messages to five interaction stages and uses an [[concepts/llm-as-a-judge|LLM-as-a-Judge]] to score style, structure, alignment, and overall verbal similarity.
- Defines Action Graph Similarity (AGS), which represents tool calls as a directed graph and compares optional tool selection, sequential habits, and output-dependency patterns.
- Evaluates 18 models from eight providers and validates AGS with a controlled teacher-student distillation experiment.

## Method

Each trajectory contains user-visible responses, tool calls, and tool-related messages. RPS first assigns messages to authentication, elicitation, execution, verification, or notification. It compares only stages shared by both trajectories and asks an LLM judge for 1-5 scores on style, structure, alignment, and overall similarity. The final RPS is the mean overall score across shared stages.

AGS constructs an action-flow graph whose nodes contain a tool name, arguments, and result. Sequential edges connect temporally adjacent calls; dependency edges indicate that a later call uses a value derived from an earlier result. Candidate dependency edges begin with string overlap and are semantically checked by an LLM judge. A dependency edge replaces a sequential edge between the same consecutive calls.

AGS averages three components:

- **Optional tool agreement ($S_{node}$):** For each task, mandatory tools are the intersection of tools used by all successful models. The metric compares whether a pair uses or skips the remaining optional tools.
- **Sequential pattern similarity ($S_{seq}$):** Cosine similarity over post-write verification, pre-write confirmation, and error-retry rates.
- **Dependency pattern similarity ($S_{dep}$):** Cosine similarity over output reuse rate, longest dependency-chain length, and output fan-out rate.

The main evaluation uses Claude Sonnet 4.5 (thinking) as the reference. It samples 50 tasks from each of three English-language customer-service domains: airline and retail from tau-Bench and telecom from tau2-Bench. Baselines are response semantic equivalence, bigram overlap, BERTScore, and graph edit distance (GED). The controlled experiment fine-tunes Qwen2.5-14B-Instruct with LoRA on 200 Claude trajectories and compares similarity changes toward Claude and toward DeepSeek R1, which supplies no training trajectories.

## Experiments

### Main comparison

| Finding | Reported result | Interpretation |
| --- | --- | --- |
| Closest non-Anthropic model | Kimi-K2 (thinking): AGS 82.7%, RPS 3.65 | It is the highest-scoring non-Anthropic model on both action and verbal similarity to Claude Sonnet 4.5 (thinking). |
| Optional choices | Kimi-K2 (thinking) $S_{node}$ 82.6%; Claude Opus 4.1 (thinking) 81.0% | Kimi agrees slightly more often with the reference on optional tool use in this evaluation. |
| Dependency behavior | Kimi-K2 (thinking) $S_{dep}$ 94.7%; Claude Opus 4.1 (thinking) 93.7% | Kimi closely matches how the reference reuses tool outputs. |
| Within-family baseline | Opus-Sonnet AGS 87.2%; DeepSeek R1-V3.1 (thinking) 86.7%; cross-family R1-Sonnet 81.1% | The two reported within-family pairs average 5.9 percentage points above the reported cross-family pair. |
| Complementarity | AGS-RPS Pearson r = 0.491, p = 0.054 over 16 non-Anthropic models | Action and verbal similarity are related but do not supply the same signal. |

### Controlled distillation

After fine-tuning, AGS toward Claude increases from 0.59 to 0.72, while AGS toward DeepSeek R1 decreases from 0.64 to 0.59. GED instead rises toward both Claude (0.42 to 0.65) and R1 (0.39 to 0.59), making its teacher-control change gap 0.03 versus 0.18 for AGS. The AGS gain is uneven: $S_{dep}$ increases by 0.27, $S_{seq}$ by 0.08, and $S_{node}$ by 0.05. RPS also rises toward both references, although more toward Claude, so the paper treats AGS as the cleaner directional signal in this experiment.

### Robustness checks

Stage alignment reduces within-case RPS score standard deviation by 44-55% for three tested models. Computing node agreement over all tools instead of optional tools inflates non-family similarity by 12.2 percentage points on average in the reported ablation. Resampling the model pool gives $S_{node}$ coefficients of variation from 1.5% to 2.8%. A 50-edge manual audit reports 96% accuracy for the dependency-edge judge. Rankings among three tested models remain unchanged across judge temperatures, although exact test-retest agreement declines as temperature rises.

## Limitations

- The main analysis reports similarity to one reference model rather than the complete 153-pair matrix for 18 models. High similarity is evidence of behavioral convergence, not proof that one deployed model was distilled from another.
- Evaluation covers 150 sampled tasks in three English-language customer-service domains. Generalization to coding, multi-agent collaboration, other languages, and non-tool-use settings is untested.
- The mandatory-tool set depends on the successful models included in the pool. The resampling analysis supports stability in this experiment but does not remove that dependence.
- RPS requires a domain-specific stage taxonomy and an LLM judge. Judge temperature affects repeatability, and shared stages omit differences in stage coverage.
- AGS summarizes each sequential and dependency pattern with three hand-designed features. Framework instructions can alter behavior: in a preliminary 14-task comparison, OpenHands changes optional-tool similarity much more than dependency similarity.
- The controlled validation uses one Qwen2.5-14B-Instruct student, 200 teacher trajectories, and LoRA. Publicly deployed models with confirmed relevant distillation relationships are not validated.
- The manuscript does not provide a stable paper identifier or explicit publication venue in the supplied Markdown. The year reflects the manuscript's January 2026 reference-access context.

## Related Concepts

- [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[index|Library home]]

## Related Papers

- Lee et al. (2025), "Quantification of Large Language Model Distillation": supplies the response semantic equivalence baseline discussed by this paper.
- Yao et al. (2024), "tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains": supplies the airline and retail tasks.
- Barres et al. (2025), "tau2-bench: Evaluating Conversational Agents in a Dual-Control Environment": supplies the telecom tasks.
