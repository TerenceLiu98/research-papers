---
title: "JEV-as-a-Judge: Accept When Confident, Escalate When Unsure"
type: paper
authors:
  - Yubo Li
  - Yidi Miao
  - Ramayya Krishnan
  - Rema Padman
year: null
tags:
  - llm-evaluation
  - selective-prediction
  - confidence-calibration
  - model-cascades
---

## TL;DR

The paper evaluates TypeSafe JEV, a proprietary decision-only judge, against sixteen generative and reward-model configurations. JEV is competitive with GPT-6 Astra on ordinary preference and evidence-grounded factuality at much lower measured fees, but substantially weaker on difficult correctness and misleading answer style. A frozen, two-order confidence cascade scores 92.5% versus GPT-6's 93.1% on 510 held-out preference pairs at 56.8% of its estimated fee. These are offline simulations; confidence routing fails to transfer reliably across all fallbacks and workloads.

## Research Question

Can an inexpensive judge provide both a useful first verdict and a confidence signal that identifies judgments worth escalating to a stronger model?

## Motivation

[[concepts/llm-as-a-judge|LLM-as-a-Judge]] scales contextual evaluation, but repeated reasoning, API fees, and unreliable confidence complicate large evaluation workloads. A typed verdict is operationally convenient without necessarily being correct or calibrated. The paper tests these properties separately and asks when [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]] can connect reliability with cost savings.

## Contributions

- Establishes an empirical operating profile for JEV 1.13.0 across preference, factuality, final-answer adjudication, style, and answer-format tasks; it does not introduce a new routing algorithm.
- Separates correctness, output validity, probability quality, presentation stability, and measured operating costs.
- Evaluates frozen escalation thresholds on disjoint examples and contrasts them with post-hoc single-order simulations.
- Uses blinded human adjudication to examine benchmark-label noise and the gap between JEV and GPT-6.

## Method

JEV receives structured inputs, natural-language instructions, and a Choice output type. Generative judges receive the same task content and a verdict-and-probabilities contract without a rationale. The study uses maximum label probability, $q=\max_k p_k$, for confidence; JEV's proprietary native confidence is examined separately. No model is trained or fine-tuned.

Outputs are checked for schema compliance, valid labels, finite normalized probabilities, and verdict-argmax consistency. Invalid outputs count as accuracy errors; probability metrics condition on valid outputs. Metrics include accuracy, macro-F1, multiclass Brier score, clipped NLL, ten-bin ECE, and error-detection AUROC using $1-q$. Confidence intervals use 2,000 source-question cluster bootstrap resamples, preserving correlated answers and presentation variants.

For the frozen pairwise cascade, the same pair is judged in both orders. With $p_1(x,y)$ denoting the probability assigned to the first candidate, the aligned probability is

$$
\bar p(A)=\frac{p_1(A,B)+1-p_1(B,A)}{2}.
$$

The gate accepts the order-averaged verdict when its maximum probability meets a threshold; otherwise it uses the fallback's verdict. Invalid first-stage outputs defer. Thresholds maximize coverage on 96 pilot selection pairs while keeping selection accuracy within two percentage points of the fallback. They are then frozen for evaluation; exact ties receive half-credit (Section 7, Tables 3 and 11).

## Experiments

### Design and Main Results

The 1,312 base items comprise 400 balanced RewardBench pairs, all 350 pairs of JudgeBench's GPT-4o split, 240 HaluEval judgments from 120 questions, 150 previously labeled replies, 108 reference-correct GSM8K trajectory replies, and 64 synthetic evidence controls. The 642-item pilot includes selection/test partitions; the 670-item extension was frozen before pilot accuracy was inspected. Model-family expansion followed inspection of initial results, making those comparisons exploratory despite the extension's exclusion from fitting.

Selected reported accuracies are below (Sections 5-7; Tables 1, 8, and 19). Samples are study-specific rather than official benchmark aggregates.

| Workload | Judgments | JEV (%) | Comparator (%) |
| --- | ---: | ---: | --- |
| Ordinary preference, RewardBench | 400 | 92.2 | GPT-6: 93.5 |
| Difficult correctness, JudgeBench | 350 | 78.6 | GPT-6: 93.1 |
| Evidence-grounded QA, HaluEval | 240 | 87.5 | GPT-6: 86.7 |
| Existing final-answer labels | 150 | 94.0 | GPT-6: 96.7 |
| Four-way selection, RewardBench 2 | 100 | 73.0 | GPT-6: 75.0; Skywork: 79.0 |
| Matched-style RM-Bench pairs | 480 | 84.0 | GPT-6: 93.3 |
| Style-adversarial RM-Bench pairs | 480 | 74.8 | GPT-6: 94.6 |
| Document-grounded summaries | 80 | 71.2 | GPT-5.4: 72.5 |
| Reference-free general responses | 80 | 52.5 | GPT-5.4: 55.0 |

The JudgeBench JEV-minus-GPT-6 difference is -14.6 percentage points (95% interval [-18.9, -10.3]); reasoning and coding account for particularly large gaps. RM-Bench uses 80 source prompts with correlated style/order variants: JEV loses 9.2 points when the rejected answer is more elaborate than the preferred answer, relative to matched styles. The style-adversarial gap to GPT-6 is -19.8 points [-27.7, -12.7].

JEV produces valid outputs on all 1,312 base items, as do several generative configurations. Its error-detection AUROC is 0.869, 0.745, and 0.863 on RewardBench, JudgeBench, and HaluEval. Probability quality and error ranking differ: on HaluEval JEV has a better Brier score than GPT-6 (0.176 versus 0.245), while GPT-6 has better error AUROC (0.899). Both comparisons inherit the benchmark labels.

### Frozen Cascades and Costs

On 510 extension preference pairs, the frozen GPT-6 cascade at threshold 0.9 accepts 53.7% without fallback and reaches 92.5% accuracy versus 93.1% for GPT-6 alone: -0.59 points [-1.78, 0.59]. Estimated fees, including both JEV orders, are 56.8% of GPT-6's fees, or 62.2% under the conservative usage bound. The approximate 99% retained-accuracy claim describes this ratio, not a guarantee for future inputs.

Threshold transfer is imperfect. The frozen GPT-5.6 policy at 0.7 loses 2.35 points on the extension, exceeding the selection rule's two-point tolerance. GPT-5.4's conservative fee ratio reaches 1.096. The single-order pooled cascade at 0.9 reaches 91.3% versus 91.7% at a reported fee ratio of 0.47, but its threshold is evaluated post hoc on the same items (Table 13).

A separate, isolated 120-judgment timing panel reports median outcome latency of 0.152 seconds and estimated fees of USD 0.044 per 1,000 judgments for JEV, versus 1.885 seconds and USD 12.182 for GPT-6. JEV's fee is approximately 0.36% of GPT-6's on that panel. These collection-time estimates include provider/network conditions and are neither current pricing nor live cascade latency measurements.

### Label Audit and Boundary Cases

The blinded audit covers 183 selected items: 108 disagreements in correctness, 55 shared errors, and 20 shared-correct controls. On JudgeBench disagreements, final human labels favor GPT-6 on 57 of 69 items and JEV on one, with 11 indecisive; the human-adjudicated difference is -16.0 points [-20.0, -12.3]. On RewardBench and HaluEval the differences are -3.0 and -2.5 points. Correcting decisive audited HaluEval labels yields 95.8% for JEV and 98.3% for GPT-6, compared with primary label-based scores of 87.5% and 86.7%. These corrections are sensitivity analyses, not replacements for the primary benchmark results (Appendix I).

JEV changes no verdict across 96 repeated comparisons on 48 examples, but four of 48 rubric paraphrases change its verdict. Candidate reversal changes 3.25% of RewardBench and 11.14% of JudgeBench choices; balanced first-position rates do not imply order consistency. Temperature scaling improves extension HaluEval NLL but worsens it on RewardBench and JudgeBench (Tables 12 and 14).

On natural multiple-choice replies, reference-blind extraction followed by code comparison produces 86.0% downstream agreement versus 91.3% for direct JEV adjudication under the follow-up's four-way rubric. There is no independent option-extraction gold standard. The 100% multiple-choice versus 92.5% free-response result comes from constructed matched controls, not unrestricted natural answers (Appendix J).

On the balanced reference-free prose sample, JEV, GPT-4.1 mini, and GPT-5.4 score only 52.5-55.0% while remaining confident. JEV's error AUROC is 0.518, so confidence supplies little useful routing information. Grounded summaries and reference-free responses differ in content and label provenance; their comparison does not isolate a causal effect of supplying evidence (Appendix K).

## Limitations

- JEV is proprietary; model sizes, reasoning effort, serving systems, context limits, collection windows, and training overlap differ. The comparison evaluates complete configurations rather than isolating architecture or matched compute.
- Calibration and threshold-selection sets are small. Held-out extension items share benchmark families; the expanded comparisons and later follow-ups are exploratory. Confident style-induced errors and reference-free factual judgments limit transfer.
- The audit is selected rather than representative. One team-member human pass plus a Claude pass replaced the planned two human passes; an author resolved disagreements after seeing aggregate results. All final labels are human decisions, but the process is not independent multi-human consensus. Thirty-six labels remain indecisive.
- Existing-label provenance is incomplete, controls are easy or exclusively positive, and specialized professional domains are untested. Human-corrected accuracy and confidence metrics depend on the chosen label treatment.
- Fees are estimates, not invoices; local GPU models have no assigned API-equivalent price. The timing panel is small and location-specific. Offline cascade savings do not establish sequential latency savings.
- The supplied Markdown omits Skywork rows from Tables 1 and 5 despite discussing that baseline in the text. Section 7's RM-Bench AUROCs differ from Table 10's values; this summary does not resolve that discrepancy or use those numbers to support the cascade claim.
- No explicit publication year, venue, DOI, or arXiv identifier for this manuscript is supplied. The source describes September 2026 measurements, but publication metadata remain unspecified.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]: a related use of judgment distributions for scalar estimates, distinct from threshold-based deferral.

## Related Papers

- Jung, Brahman, and Choi (2025), "Trust or Escalate: LLM Judges with Provable Guarantees for Human Agreement": cited prior work on judge cascades; its guarantees are not established for this study's empirical threshold rule.
- Xu et al. (2025), "Ask a Strong LLM Judge When Your Reward Model Is Uncertain": cited prior work on uncertainty-based escalation from reward models.
- Chen, Zaharia, and Zou (2024), "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance": cited background on economical cascades.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: related library work on judgment distributions, presentation averaging, and imperfect human reference labels; not cited in the supplied manuscript.
- [[papers/polistemics-evaluating-llms-as-information-mediators-in-politics-and-elections|Polistemics: Evaluating LLMs as Information Mediators in Politics & Elections]]: related library evidence on reliability under missing or imperfect evidence, in a different evaluation domain; not cited in this manuscript.

[[index|Library home]]
