---
title: Game Theory Driven Multi-Agent Framework Mitigates Language Model Hallucination
type: paper
authors:
  - Runzhe Liu
  - Biquan Bie
  - Zihao Wang
  - Yuchao Ma
  - Yexin Liu
  - Xinghai Li
  - Harry Yang
  - Wenbo Yang
  - Jinzhe Cao
  - Shengyang Tao
year: null
tags:
  - llm-agents
  - scientific-language-models
  - hallucination-mitigation
---

## TL;DR

G-Frame combines role-constrained data-generation agents with feedback-driven control of inference concurrency and training. Its chemistry model, OmniChem-7B, achieves 49.82% on ChemBench and a 4.71% ChemJudge hallucination rate. The reported 79.46% relative reduction uses the main comparison's Qwen2.5-7B rate of 22.93%; the supplementary ablation uses a different base-model value. The supplied manuscript does not explicitly identify its publication year or arXiv identifier.

## Research Question

Can coordinated synthetic-data generation and adaptive training improve factual chemistry reasoning in a locally deployable 7B language model?

## Motivation

Specialized scientific models need both domain knowledge and reliable instruction following. The paper targets limited chemistry training data, noisy source text, and forgetting during full-parameter training, using multi-agent verification and checkpoint feedback to improve the training pipeline.

## Contributions

- Introduces a hierarchy of decisional, task, and executive agents, framed through cooperative team games and Bayesian decision-making.
- Produces a five-billion-token pretraining corpus, 363,045 chemical reasoning traces, and 199,589 QA pairs.
- Trains OmniChem and evaluates chemistry accuracy, hallucinations, adaptive concurrency, and application case studies.
- Provides an eight-configuration ablation of domain pretraining, synthetic QA/reasoning data, and adaptive training.

## Method

At the micro level, task agents coordinate specialized executive agents for cleaning, augmentation, and question generation. Teacher, student, and supervisor roles iteratively generate, critique, revise, and adjudicate answers grounded in chemical literature. Reasoning data also use distillation from DeepSeek-R1-Distill-Qwen-32B.

At the macro level, a decisional agent receives synchronized task-progress and inference-server telemetry. It adjusts concurrency using queue length, KV-cache occupancy, and resource use. The paper formalizes this as belief updating and expected-utility optimization in a partially observable decision process; its concrete implementation describes prompt-driven policy proposals rather than an explicit numerical Bayesian solver.

Training mixes chemistry and general-domain text, initially at 8:2. Pretraining uses AdamW with an initial learning rate of 3e-5, early stopping in the second round, and a later shift to a 6:4 chemistry/general mixture. Two full-parameter supervised stages each run 24,000 steps at an initial learning rate of 5e-5. DeepSeek-R1 checkpoint judgments provide feedback on accuracy, hallucination, and output structure.

## Experiments

ThChem 1.0 contains 253 chemistry multiple-choice questions. ThChem 2.0 removes the correct option from approximately half of them to test behavior on unanswerable questions. ChemJudge uses 471 open-ended chemistry questions: responses start with ten points and lose points for hallucinations, with irrelevant responses losing all points. Thus its reported rate is a deduction-based metric, not simply the fraction of answers containing an error. Final judgments use Gemini 3.1 Pro with expert review and human decisions overriding disagreements.

Main comparison (Figure 4):

| Model | ThChem 1.0 ↑ | ThChem 2.0 ↑ | ChemJudge rate ↓ | ChemBench ↑ |
| --- | ---: | ---: | ---: | ---: |
| OmniChem | 79.45 | 62.08 | 4.71 | 49.82 |
| Qwen2.5-7B | 72.76 | 47.05 | 22.93 | 47.63 |
| GPT-4o-mini | 76.94 | 54.93 | 6.75 | 50.36 |
| GPT-o3 | 81.91 | 70.83 | 4.54 | 62.20 |

The complete model is strongest on ThChem 1.0 and ChemBench within the ablation, but removing synthetic QA/reasoning data gives a higher ThChem 2.0 score (63.36 versus 62.08). Removing adaptive training while retaining the other two stages reduces ThChem 1.0 to 2.56. The authors attribute this collapse to forgetting.

Adaptive concurrency reportedly improves throughput about 22-fold over synchronous processing, 25% over fixed concurrency 50, and 6.5% over fixed concurrency 100. DeepResearch reports average judge scores of 85.7 versus 96.0 for both compared commercial systems. Molecular examples include a calculated 709 nm absorption transition for a proposed BODIPY derivative and a conventional two-step lidocaine synthesis route.

## Limitations

- Evidence is concentrated in chemistry; transfer to other scientific domains is proposed rather than demonstrated.
- The theoretical reduction in divergence from a true distribution is a modeling argument, not a measured guarantee of factuality or game-theoretic convergence.
- The main comparison and ablation report different base-model scores: ChemJudge 22.93 versus 21.68, and ThChem 1.0 72.76 versus 33.82. They should not be combined into a single baseline comparison.
- Ablation failures include output-format failures and severe training degradation, complicating attribution specifically to reasoning quality. The full system does not dominate every metric.
- Molecular-design evidence is computational and illustrative; the supplied text does not establish experimental synthesis or broad prospective discovery performance.
- DeepResearch retrieval depends on institutional access; unsubscribed sources may provide only abstracts.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: nested roles and coordination for training-data generation and runtime control.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: checkpoint feedback and expert-audited final hallucination scoring.

## Related Papers

- [[papers/llm-multi-agent-systems-challenges-and-open-problems|LLM Multi-Agent Systems: Challenges and Open Problems]] provides a broader framework for hierarchical coordination and planning; this is a library connection, not a claimed citation in the manuscript.

## Resources

The manuscript lists [G-Frame code](https://github.com/Billy-Liu-DUT/G-Frame), [OmniChem weights](https://huggingface.co/Billy-Liu-DUT/OmniChem-7B-v1), and the [training dataset](https://huggingface.co/datasets/Billy-Liu-DUT/OmniChem). Its supporting-data DOI is [10.5281/zenodo.18446987](https://doi.org/10.5281/zenodo.18446987), not a paper DOI.

[[index|Library home]]
