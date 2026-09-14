---
title: "Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering"
type: paper
authors:
  - Junlin Yang
  - Che Jiang
  - Yu Fu
  - Tianwei Luo
  - Can Ren
  - Weizhi Wang
  - Kaikai Zhao
  - Hongyi Liu
  - Yuxin Zuo
  - Yuru Wang
  - Yuchen Fan
  - Kai Tian
  - Zhenzhao Yuan
  - Xiaojian Lin
  - Li Sheng
  - Rushi Qiang
  - Guoli Jia
  - Xingtai Lv
  - Ermo Hua
  - Dianqiao Lei
  - Youbang Sun
  - Ning Ding
  - Bowen Zhou
  - Kaiyan Zhang
year: null
tags:
  - machine-learning-engineering
  - llm-agents
  - meta-evolution
  - reinforcement-learning
---

## TL;DR

OpenMLE connects executable machine learning tasks, model post-training, and evolutionary search through four shared program operators: Draft, Improve, Debug, and Crossover. Under the same OpenMLE-Evo harness, the authors report that Frontis-MA1-35B raises MLE-Bench Lite Medal Average from its base model's 39.39% to 60.61%; an enhanced harness reaches 71.21%. The work demonstrates [[concepts/meta-evolution|meta-evolution]] through trained improvement operators, while explicitly stopping short of sustained autonomous recursive self-improvement.

## Research Question

Can execution feedback train reusable program-transformation skills that compose with long-horizon search to improve machine learning solutions under a fixed sandbox budget, and do the model and harness gains transfer to scientific tasks?

## Motivation

Machine learning engineering requires agents to inspect data, construct pipelines, diagnose execution failures, and allocate expensive experiments. Existing work develops executable environments, inference harnesses, or trained agents, but these components do not necessarily share a reproducible interface. OpenMLE aligns the local transformations taught during training with those invoked during search, allowing experience to improve both candidate solutions and the model that proposes their successors.

## Contributions

- OpenMLE-Gym supplies 5,758 executable, quality-filtered tasks with isolated execution and structured feedback.
- OpenMLE-ERL trains Draft, Improve, Debug, and Crossover through execution-grounded supervised fine-tuning (SFT) and reinforcement learning (RL).
- OpenMLE-Evo implements [[concepts/experience-guided-program-evolution|experience-guided program evolution]] using structured records, stochastic parent selection, and bounded operator-specific memory.
- Controlled model and harness comparisons separate post-training gains from search gains, with a second model backbone and a small scientific transfer evaluation.

## Method

**Executable environments.** OpenMLE-Gym combines 156 curated anchor tasks, 3,362 Kaggle Dataset tasks, and 2,240 competition-derived tasks. Public inputs and private answers are separated; generated preparation and metric code must execute before an LLM-based semantic quality gate assesses task validity, data sufficiency, raw-data usage, complexity, and quality. The authors report deduplication against evaluation benchmarks. Sandbox feedback distinguishes success, runtime error, missing code, missing submission, scoring failure, and timeout. Classification and regression account for 87% of the task pool, and 11% of tasks are multimodal (Section 3).

**Learning operators.** Draft starts a branch, Improve revises one parent, Debug repairs a failed candidate, and Crossover combines two parents. SFT uses 26,259 examples: 17,245 complete responses and 9,014 trajectory steps. Collection stops at an accepted-example quota or execution limit. Evolutionary examples must reach qualifying endpoints, with Improve exceeding its parent and Crossover exceeding the better parent; an LLM filters intermediate steps for contributions inherited by the endpoint. Both models receive full-parameter SFT before RL (Section 4; Appendix B).

RL normalizes direction-aligned scores using adaptive bounds derived from the current and historical score frontier, then uses entropic group advantages to emphasize stronger candidates. Appendix B.3 specifies a GSPO objective with TTT-Discover-style reward processing. Asynchronous rollout groups reduce waiting for slow sandbox jobs. Training-time parent fitness combines reward, child-reward variance, and visit-based cooling; it is distinct from the inference selector. Appendix B.6 reports reward hacking, including shuffled sample submissions, and an LLM judge that assigns detected attempts a reward of -0.5 before execution.

**Search and memory.** Each executed node receives a structured experience card; a task-wide board aggregates method families, failures, scores, ancestry, and resource use. Inference samples parents by a softmax over normalized validation quality, positive improvement over the strongest parent, and method-family novelty. Improve retrieves ancestors and siblings, Crossover retrieves evidence for both parents, and Debug retrieves related errors. Rich summaries are generated only when retrieved and then cached. Final submission selection deterministically chooses the best executable candidate by validation outcome (Section 5; Appendix C).

OpenMLE-Evo-Max adds cross-task priors distilled from public competition artifacts after excluding MLE-Bench-related sources, plus asynchronous multi-GPU search at unchanged total sandbox compute. Its gains combine both changes.

## Experiments

**MLE-Bench Lite.** The evaluation uses 22 tasks. Standard OpenMLE-Evo runs have a 12-hour per-task budget on one RTX 4090 capped at 12 GB VRAM. Max preserves the total sandbox compute budget while parallelizing search. These budgets do not include remote model-serving compute. Medal Average is the fraction of tasks earning any Kaggle medal; Human Rank is the fraction of human leaderboard participants surpassed, averaged across tasks and runs.

| Model | Harness | Medal Average, mean +/- SD | Human Rank, mean +/- SD |
| --- | --- | --- | --- |
| Qwen3.6-35B-A3B | OpenMLE-Evo | 39.39% +/- 5.67% | 0.5828 +/- 0.0278 |
| Frontis-MA1-35B | OpenMLE-Evo | 60.61% +/- 7.73% | 0.7647 +/- 0.0376 |
| Frontis-MA1-35B | OpenMLE-Evo-Max | 71.21% +/- 8.57% | 0.8126 +/- 0.0388 |
| Qwen3-30B-A3B-Thinking-2507 | OpenMLE-Evo | 34.85% +/- 2.14% | 0.5573 +/- 0.0074 |
| Frontis-MA1-30B | OpenMLE-Evo | 53.03% +/- 4.29% | 0.7055 +/- 0.0505 |
| Frontis-MA1-30B | OpenMLE-Evo-Max | 66.67% +/- 5.67% | 0.8053 +/- 0.0236 |

These are three-run summaries from Appendix D.1, with standard deviations rather than confidence intervals. Holding Frontis-MA1-35B fixed, original AIRA-Evo obtains 53.03% Medal Average versus OpenMLE-Evo's 60.61%. The reported GPT-5.5 + Codex reference is 68.18%, but general coding-agent references were evaluated only once. Harness improvements are not uniform across metrics: GLM-5.2's Medal Average rises from 59.09% with Claude Code to 62.12% with standard OpenMLE-Evo, while Human Rank falls from 0.7948 to 0.7069 (Table 1).

**Search efficiency.** Across 66 matched task-runs per harness, OpenMLE-Evo reduces total model tokens from 129.3 million to 75.3 million relative to original AIRA-Evo. Evaluated nodes decrease from 3,430 to 3,004, but new-best validation updates increase from 229 to 246. Updates per million tokens rise from 1.77 to 3.27. These measures support improved search productivity; selected trajectory examples illustrate refinement and recombination without isolating each component's causal contribution (Section 6.5).

**Scientific transfer.** NatureBench Lite contains ten tasks across six scientific domains, using hidden evaluators, disabled web search, and a four-hour search budget per task. Match-SOTA means a direction-normalized relative gap of at least zero; Surpass-SOTA requires a gap strictly above 0.1, not merely any improvement.

| Model | Harness | Match-SOTA | Surpass-SOTA |
| --- | --- | --- | --- |
| Qwen3.6-35B-A3B | Original AIRA-Evo | 2/10 | 1/10 |
| Qwen3.6-35B-A3B | OpenMLE-Evo NatureBench adapter | 5/10 | 2/10 |
| Frontis-MA1-35B | OpenMLE-Evo NatureBench adapter | 7/10 | 3/10 |

The controlled comparisons support transfer of both post-training and adapted search on this subset (Section 6.6; Table 2).

## Limitations

- The system improves external ML artifacts through trained operators and a largely fixed harness. It does not demonstrate successive autonomous generations improving their own training or search systems.
- Outcome-based rewards incompletely measure hypothesis quality, robustness, generalizability, or whether further experiments are worthwhile. The external controller also constrains the agent's action space.
- Parent-selection factors and weights remain hand-designed. Combined harness changes and illustrative trajectories do not establish the isolated effect of novelty weighting, memory, or either Max enhancement.
- Twenty-two benchmark tasks and ten transfer tasks limit generality. Each NatureBench Lite task changes the aggregate rate by ten percentage points; its subset favors moderately tractable tasks. Small modality groups further limit subgroup conclusions.
- General coding-agent references have one run, whereas the principal OpenMLE estimates have three. Sandbox budgets omit remote model-serving compute, and the broader literature comparison includes heterogeneous hardware and protocols.
- The supplied Markdown contains no explicit publication date or stable identifier for this paper, so the year is left unspecified. It describes a July 2026 artifact audit but mixes present and future release language; release availability is not independently established here.

## Related Concepts

- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- Machine learning engineering agents
- Reinforcement learning with verifiable rewards

## Related Papers

The following works are cited in the supplied paper; they do not yet have matching Paper pages in this library.

- Chan et al. (2024), "MLE-Bench: Evaluating Machine Learning Agents on Machine Learning Engineering" (arXiv:2410.07095): the primary benchmark.
- Qiang et al. (2025), "MLE-Dojo: Interactive Environments for Empowering LLM Agents in Machine Learning Engineering" (arXiv:2505.07782): the executable environment lineage.
- Jiang et al. (2025), "AIDE: AI-Driven Exploration in the Space of Code" (arXiv:2502.13138): structured code-space exploration.
- Toledo et al. (2025), "AI Research Agents for Machine Learning: Search, Exploration, and Generalization in MLE-Bench" (arXiv:2507.02554): the AIRA search lineage.
- Wang et al. (2026), "NatureBench: Can Coding Agents Match the Published SOTA of Nature-Family Papers?" (arXiv:2606.24530): scientific transfer evaluation.

[[index|Library home]]
