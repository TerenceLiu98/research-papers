---
title: "JuryFlow: Disagreement-Guided Human-in-the-Loop Multi-Agent Evaluation"
type: paper
authors:
  - Mufeng Yang
  - Junwei Yu
  - Yepeng Ding
year: 2026
doi: 10.1145/3841580.3841619
source_job_id: "ad2c5f38-6157-48d2-a251-da5c56fa78b3"
tags:
  - llm-evaluation
  - multi-agent-systems
  - disagreement
  - human-in-the-loop
  - rubric-induction
---

## TL;DR

JuryFlow turns disagreement among LLM judges into a claim-level allocation signal rather than resolving it by voting alone. It extracts atomic claims, ranks conflicting verdicts by entropy, re-evaluates selected claims, propagates corrections to related claims and historical cases, and converts corrections into shared rubric entries. On MT-Bench and LLMBar, the full system reports higher gold-label agreement than single-judge and majority-vote baselines. However, every experiment replaces the proposed human selection with automatic entropy ranking, so the study validates disagreement-guided re-evaluation rather than the human-in-the-loop interaction it motivates.

## Research Question

Can claim-level disagreement among heterogeneous LLM judges identify where additional evaluation is most valuable, and can propagating the resulting corrections improve accuracy beyond panel aggregation?

## Motivation

Single LLM judges exhibit position, verbosity, and self-preference biases. Diverse panels can reduce model-specific error, but majority voting discards information about where judges conflict. Instance-level escalation also sends an entire response for additional review. JuryFlow instead treats local disagreement as a structured signal: it identifies contested claims, concentrates re-evaluation there, and retains corrections for later cases. This design connects [[concepts/llm-as-a-judge|LLM-as-a-Judge]] with [[concepts/disagreement-guided-evaluation|Disagreement-Guided Evaluation]].

## Contributions

- Formulates verdict disagreement as an actionable claim-level uncertainty signal rather than residual noise from aggregation.
- Introduces a five-stage pipeline combining heterogeneous judging, a weighted disagreement graph, focal selection, correction propagation, and incremental rubric induction.
- Recasts the proposed human role as selecting a disagreement to resolve rather than assigning the final label, while providing entropy ranking as an automatic substitute.
- Evaluates focal re-evaluation, propagation, rubric induction, propagation cost, and panel heterogeneity through controlled baselines and ablations.

## Method

### Structured Judging and Disagreement Graph

Five heterogeneous judge agents independently decompose each response into atomic claims and assign `accept`, `reject`, or `uncertain` verdicts plus tags from a fixed set of five to seven evaluation dimensions. For claim $c_i$, JuryFlow measures panel disagreement by verdict entropy,

$$
d_i=-\sum_{v\in\mathcal V}p_i(v)\log p_i(v).
$$

Claims become graph nodes. An edge between claims combines Jaccard similarity over their evaluation tags with cosine similarity over claim embeddings,

$$
w_{ij}=\alpha\,\operatorname{sim}_{\mathrm{tag}}(c_i,c_j)
+(1-\alpha)\,\operatorname{sim}_{\mathrm{emb}}(c_i,c_j).
$$

The selected configuration uses disagreement threshold $\tau=0.7$, tag weight $\alpha=0.4$, propagation threshold $\beta=0.5$, focal budget $m=3$, and five judges (Sections 3-4).

### Focal Re-Evaluation and Propagation

The interface is designed to let a human select one high-entropy focal claim without supplying a label or justification. In all reported experiments, entropy ranking makes this selection automatically. A reviewer then re-judges the focal claim using evidence from the original question and response. Claims connected above $\beta$ are also re-evaluated, while nearest-neighbor retrieval queues historically similar, high-disagreement claims. Revised high-disagreement judgments receive priority in the final response score.

### Rubric Induction

The system abstracts each correction into a criterion with positive and negative examples. Embedding similarity merges near-duplicate entries, and all judges receive the evolving rubric on later instances. This gives corrections an effect beyond the current response, but also creates risks of rubric growth and drift.

## Experiments

The evaluation uses 300 MT-Bench pairwise-preference instances and all 419 LLMBar instances. Each candidate response is processed independently, and per-claim verdicts are reduced to a response score with a weakest-link rule. The five-member panel comprises GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama-3.1-70B-Instruct, and Qwen2.5-72B-Instruct. The strongest panel model also serves as reviewer and tie-breaking single-judge baseline. Results are averaged over three seeds.

| Method | MT-Bench accuracy | MT-Bench $\kappa$ | LLMBar accuracy | LLMBar $\kappa$ |
| --- | ---: | ---: | ---: | ---: |
| Best single judge | 0.804 +/- 0.011 | 0.59 | 0.679 +/- 0.014 | 0.36 |
| Majority-vote panel | 0.828 +/- 0.009 | 0.64 | 0.718 +/- 0.012 | 0.44 |
| JuryFlow | **0.857 +/- 0.008** | **0.71** | **0.784 +/- 0.010** | **0.57** |

On LLMBar, focal re-evaluation alone reaches 0.748 accuracy at 1.3 re-evaluation calls per instance. Removing rubric induction yields 0.772 at 3.0 calls; removing propagation yields 0.756 at 1.9 calls; the full system reaches 0.784 at 3.6 calls. Sweeping $\beta$ produces an inverted-U trade-off: accuracy peaks at 0.784 for $\beta=0.5$, while propagating nearly everywhere ($\beta=0$) costs 8.7 calls and lowers accuracy to 0.761.

Panel composition matters. With five judges, prompt-persona diversity within one model reaches only 0.726 on LLMBar, compared with 0.779 for multiple models and 0.784 for mixed model and prompt diversity. The reported evidence therefore favors genuine model heterogeneity over ensemble size alone.

## Limitations

- The human-guided mode is not evaluated. All reported gains come from automatic entropy selection, so claims about human contribution remain prospective.
- Entropy cannot detect correlated, confidently wrong consensus. Shared training data and self-preference can therefore hide important errors.
- Propagation can transfer incorrect corrections across weakly related claims. The threshold sweep demonstrates that more propagation is not monotonically better.
- Cross-instance retrieval and an accumulating rubric increase inference cost and create unresolved risks of unbounded growth and criteria drift.
- The experiments cover two English text benchmarks. Other languages, modalities, and long-form responses are untested.
- Re-evaluation uses only the original question and response rather than independently retrieved evidence.

## Related Concepts

- [[concepts/disagreement-guided-evaluation|Disagreement-Guided Evaluation]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]: JuryFlow proposes a narrowly scoped selection role, but does not empirically test human oversight.
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]: routes uncertain whole instances to a fallback, whereas JuryFlow targets contested claims and propagates corrections.

## Related Papers

- Verga et al. (2024), "Replacing Judges with Juries": motivates heterogeneous panels but aggregates their votes rather than structuring disagreement for re-evaluation.
- Chen, Saha, and Bansal (2024), "ReConcile": resolves multi-model disagreement through discussion and confidence-weighted voting.
- Jung, Brahman, and Choi (2025), "Trust or Escalate": routes low-confidence evaluations to stronger judges at the instance level.
- Min et al. (2023), "FActScore": supplies the atomic-claim perspective used for fine-grained factuality evaluation.
- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: tests confidence-based escalation and shows that confident judge errors can limit routing.

[[index|Library home]]
