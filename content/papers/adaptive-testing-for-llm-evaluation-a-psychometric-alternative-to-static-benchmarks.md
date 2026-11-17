---
title: "Adaptive Testing for LLM Evaluation: A Psychometric Alternative to Static Benchmarks"
type: paper
authors:
  - Peiyu Li
  - Xiuxiu Tang
  - Si Chen
  - Ying Cheng
  - Ronald Metoyer
  - Ting Hua
  - Nitesh V. Chawla
year: null
tags:
  - llm-evaluation
  - item-response-theory
  - adaptive-testing
---

## TL;DR

ATLAS applies computerized adaptive testing to LLM benchmarks, selecting questions by Fisher information and stopping at a target uncertainty. On HellaSwag it estimates whole-bank IRT ability with MAE 0.157 using 41 items, against a filtered bank of 5,600 items. Its strongest evidence concerns ability-estimation efficiency, rather than uniformly superior prediction of raw accuracy.

## Research Question

Can calibrated item characteristics guide model-specific question selection to recover whole-bank latent ability with substantially fewer responses?

## Motivation

Raw accuracy gives every item equal weight and can conceal differences in response patterns. Fixed subsets also spend questions on items that provide little information for a particular model. ATLAS uses [[concepts/item-response-theory|Item Response Theory]] to separate item characteristics from model ability and [[concepts/computerized-adaptive-testing|Computerized Adaptive Testing]] to allocate questions sequentially.

## Contributions

- A precision-controlled adaptive evaluation procedure with randomized selection among highly informative items.
- Partitioned 3PL calibration and common-person linking, with model-fit diagnostics.
- Comparisons with random sampling, TinyBenchmarks, and two MetaBench subsets across five benchmarks, plus subject-level MMLU experiments.
- Analysis of how ability rankings differ from accuracy rankings, including models with equal accuracy.

## Method

Responses come from the Hugging Face Open LLM Leaderboard. The authors retain complete model response records, remove the extreme low-ability tail, and use a stratified 90/10 calibration/test split. Items are removed for near-zero variation, accuracy above 95%, or point-biserial correlation below 0.1.

The three-parameter logistic response model is

$$
p_i(\theta)=c_i+\frac{1-c_i}{1+\exp[-a_i(\theta-b_i)]},
$$

where discrimination, difficulty, and guessing are represented by $a_i,b_i,c_i$. Item partitions are calibrated independently and aligned through mean–sigma linking using shared models as common persons. Weighted likelihood estimation supplies whole-bank reference abilities; adaptive updates instead use expected a posteriori estimation.

Starting at ability zero, ATLAS first chooses an item with nearby difficulty. Subsequent items are sampled from the five remaining items with highest Fisher information, $I_i(\theta)=[p_i'(\theta)]^2/[p_i(\theta)(1-p_i(\theta))]$. It updates ability after every response and stops when inverse-square-root total information falls below a chosen SE threshold, subject to 30–500 item bounds in the main experiments. Thresholds are 0.1, 0.2, and 0.3.

For accuracy reconstruction, p-IRT averages observed outcomes on administered items and predicted correctness probabilities on unobserved items (Appendix F).

## Experiments

Calibration uses 3,467–4,680 models per benchmark, with 386–521 held-out models. Tables 2 and 6 report the following at SE threshold 0.1; MAE is in latent-ability units, not accuracy percentage points.

| Benchmark | Filtered bank (Table 5) | Average items | Ability MAE ± SE |
|---|---:|---:|---:|
| WinoGrande | 1,045 | 70 | 0.155 ± 0.012 |
| TruthfulQA | 627 | 48 | 0.064 ± 0.002 |
| HellaSwag | 5,600 | 41 | 0.157 ± 0.010 |
| GSM8K | 1,306 | 70 | 0.150 ± 0.011 |
| ARC | 839 | 89 | 0.084 ± 0.006 |

An ATLAS variant obtains the lowest ability-space Information Efficiency Score on each benchmark. This score multiplies MAE relative to Random100 by item count divided by 100. MetaBench-S nevertheless has lower GSM8K ability MAE (0.096), using 249 items. On WinoGrande, MetaBench-P obtains 0.152 with 133 items, close to ATLAS's 0.155 with 70.

Accuracy reconstruction at threshold 0.1 has MAE 0.048, 0.023, 0.020, 0.039, and 0.032 respectively. These errors are competitive but not uniformly best. Ability rankings move more than 10 places for 23% of GSM8K models and 31% of HellaSwag models. This demonstrates a different measurement ordering, without independently establishing which ordering better captures general capability.

Reported average RMSEA values for ATLAS range from 0.0438 to 0.0690. Appendix G reports adaptive selection-loop times of roughly 9–76 seconds per model; these are not demonstrated live LLM inference runtimes. Subject-level MMLU results show an additional precision–length tradeoff: Anatomy uses 100 items at MAE 0.099 versus 20.49 items at MAE 0.235 when the threshold changes from 0.1 to 0.3.

## Limitations

The reference outcome is whole-bank IRT ability under the calibrated model, not an independent capability ground truth. Calibration requires extensive historical responses; reduced administration cost does not eliminate that upfront requirement. Generalization to shifted model populations and content-balanced selection require further validation. The discussion explicitly identifies content coverage as a constraint for reduced benchmarks.

The supplied text contains reporting inconsistencies: bank sizes differ between Tables 5 and 8, and MMLU test lengths fall below the main experiment's stated 30-item minimum. The prose claim of reconstruction MAE consistently below 5% also has exceptions in Table 3 (0.051). These settings and claims should not be treated as uniform guarantees. The supplied manuscript labels itself a preprint but does not establish its publication year or a stable paper identifier; the year is left unknown.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: models response probabilities through item parameters and latent ability.
- [[concepts/computerized-adaptive-testing|Computerized Adaptive Testing]]: selects each question from the evolving ability estimate and controls test length through uncertainty.

## Related Papers

The manuscript contrasts ATLAS with *tinyBenchmarks: Evaluating LLMs with Fewer Examples* (Polo et al., 2024) and *metabench – A Sparse Benchmark of Reasoning and Knowledge in Large Language Models* (Kipnis et al., 2025), both static subset approaches. It also discusses *Fluid Language Model Benchmarking* (Hofmann et al., 2025), which uses adaptive evaluation during pretraining with fixed test length, whereas ATLAS studies post-training evaluation with precision-based stopping.
