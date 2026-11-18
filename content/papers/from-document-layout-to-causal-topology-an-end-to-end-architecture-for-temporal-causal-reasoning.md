---
title: "From Document Layout to Causal Topology: An End-to-End Architecture for Temporal Causal Reasoning"
type: paper
authors:
  - Zhifeng Yang
  - Wei Luo
  - Yongjian Chen
  - Shiqi Ou
year: null
tags:
  - temporal-reasoning
  - causal-reasoning
  - neuro-symbolic-reasoning
---

## TL;DR

TCR-Agent extracts and edits event graphs before answering temporal questions; TCR-Former transfers temporal structure into a learned encoder and attention masks. On the authors' TempoCausal-Bench, the approximately 8.6B-parameter TCR-Former reports 75.7% semantic accuracy, compared with 70.4% for GPT-5.4 TCR-Agent and 59.2% for GPT-5.4 TISER. These are benchmark results, not evidence that attention masking identifies real-world causal effects.

## Research Question

Can temporal dependencies and intervention operations be incorporated into model computation to improve reasoning over implicit intervals, concurrent states, and counterfactual narratives?

## Motivation

Chronological ordering does not establish causal dependence. External graphs can improve organization while leaving rule application unreliable. The paper draws an architectural analogy to document reading-order reconstruction: recover structured dependencies from fragments instead of treating their presentation order as logical order.

## Contributions

- TempoCausal-Bench reconstructs 6,000 questions from 1,500 TimeQA-Hard source samples across five dimensions: implicit windows, concurrent states, lagged dependencies, counterfactual cascades, and delayed amplification.
- TCR-Agent combines graph extraction, symbolic intervention, and reasoning over both original text and graph descriptions.
- TCR-Former combines learned event anchors, mixed attention visibility, temporal biases, and a factual-text bypass.

## Method

**TCR-Agent.** An LLM extracts event descriptions, timestamps, numerical attributes, and justified dependency edges. A symbolic constructor enforces a DAG and checks temporal consistency. Counterfactual queries trigger node removal or outgoing-edge deletion. A second reasoning step uses both the original narrative and the serialized graph, with checking, reasoning, and reflection stages.

**TCR-Former.** A Qwen-3-0.6B encoder appends learned event queries to text. Text tokens attend bidirectionally; event queries attend to all text and earlier query slots. Learned query–text biases and timestamp regression provide temporal supervision. A projector aligns event latents to a Qwen-3-8B decoder, which also receives the original text. Counterfactual queries select event anchors whose attention connections are intended to be blocked.

Training proceeds through encoder-side anchor/bias training, projector alignment, and decoder LoRA tuning with the encoder and projector frozen. The stages use 60,000 annotated narratives, 40,000 timeline targets, and 4,000 agent-generated instruction examples, respectively (Appendix F). Thus “end-to-end” describes the architecture, not simultaneous updating of every component.

## Experiments

TempoCausal uses a 4:1 train/test split grouped by original source sample. Results average three runs. LLM-Acc averages binary judgments from DeepSeek-V3.2 and Gemini-3.1-flash; reported inter-judge kappa is 0.826, with a 1.5-percentage-point absolute discrepancy from human accuracy on 200 reviewed instances.

| System | EM | Token F1 | LLM-Acc |
|---|---:|---:|---:|
| GPT-5.4 TISER | 37.6 | 52.1 | 59.2 |
| GPT-5.4 TCR-Agent | 46.9 | 65.6 | 70.4 |
| Qwen-3-8B TCR-Agent + LoRA | 49.1 | 60.4 | 67.4 |
| Qwen-3-8B TCR-Former | 55.9 | 68.9 | 75.7 |

Table 1 therefore gives gains of 16.5 percentage points over GPT-5.4 TISER and 8.3 points over the trained agent baseline. Removing the mixed attention mask reduces TCR-Former LLM-Acc to 67.0%; removing temporal biases gives 72.3%, and removing the factual bypass gives 71.4% (Table 2). The trained decoder alone reaches 58.6%.

Reported transfer EM is 95.4% on TempReason L3 and 91.9% on TGQA. Appendix F also draws encoder-training narratives from those dataset families, so these evaluations should not be interpreted as wholly unseen-domain evidence without further split information. At batch size one on two A100-40G GPUs, TCR-Former reports 62% lower latency and approximately 44% fewer output tokens than TCR-Agent.

## Limitations

The authors identify graph-extraction hallucinations, a complex training pipeline, Qwen-focused validation, and text-only evaluation. Narrative graph extraction does not establish causal identifiability; formal connections to structural causal models are listed as future work.

The supplied Markdown has intervention ambiguities: Section 2 describes incoming-edge cutting but Equation 4 deletes outgoing edges; Equation 9 multiplies mask entries by indicators although the prose requires setting selected entries to negative infinity. These formulations should not be treated as interchangeable executable specifications. Publication year and a stable paper identifier are not stated in the supplied text; year is left unset.

## Related Concepts

- [[concepts/temporal-causal-reasoning|Temporal Causal Reasoning]]: joint reasoning about temporal constraints and directed dependencies.
- [[concepts/explicit-belief-state-control-for-abductive-reasoning|Explicit Belief-State Control for Abductive Reasoning]]: a related use of external structured state, oriented toward revisable explanations rather than temporal intervention.

## Related Papers

- Xiong et al. (2024), *Large Language Models Can Learn Temporal Reasoning*: source of TG-LLM and TGQA, used as baseline and evaluation resource.
- Bazaga et al. (2025), *Learning to Reason Over Time: Timeline Self-Reflection for Improved Temporal Reasoning in Language Models*: introduces the TISER comparison method.
- Wei et al. (2026), *DeepSeek-OCR 2: Visual Causal Flow*: cited architectural inspiration for restructuring attention around logical order.

Source: supplied parsed manuscript, especially Sections 2–6 and Appendices B–I. [Author-listed code and data repository](https://github.com/Translab-SCUT/TCR-Former).
