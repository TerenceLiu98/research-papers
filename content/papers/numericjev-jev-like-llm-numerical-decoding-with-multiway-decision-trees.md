---
title: "NumericJev: Jev-like LLM Numerical Decoding with Multiway Decision Trees"
type: paper
authors:
  - Weiwei Ye
  - Hangchen Liu
  - Renhe Jiang
year: 2026
source_job_id: "ee44e01f-dfa9-421b-9407-ad76b7a17e27"
tags:
  - numerical-decoding
  - structured-decision-models
  - large-language-models
  - regression-through-classification
  - llm-evaluation
---

## TL;DR

NumericJev turns a fixed Jev-like choice interface into a numerical decoder by repeatedly asking which subinterval contains the target. The method requires no parameter updates or hidden-state access and reaches a requested finite-grid resolution in at most $\lceil\log_K N\rceil$ decisions. On 256 generated arithmetic expressions, interval trees reduce range-normalized mean absolute error from 5.18% for direct 100-value selection to 1.60-1.84%, but their MAPE improvements are uncertain and results vary sharply with scale, sign, branching factor, and numerical representation.

## Research Question

Can a language model that exposes only structured categorical choices produce useful numerical values by composing range-selection decisions, without training a regression head or accessing internal representations?

## Motivation

[[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]] return selections over caller-defined alternatives, not arbitrary numerical values at a requested precision. Learned numerical heads require training and internal representations, while isolated numeral probes can remove the linguistic context needed to interpret a question. NumericJev instead treats locating a value within a bounded range as a sequence of contextual decisions and leaves interval arithmetic to an external decoder.

## Contributions

- Defines a training-free reduction from finite-grid numerical readout to balanced multiway interval choices.
- Proves a depth bound of $\lceil\log_K N\rceil$ and exact grid recovery when every selected interval retains the target.
- Gives a first-divergence error bound showing why early wrong branches can dominate later precision and why greedy refinement need not improve error monotonically.
- Compares direct values, binary, quaternary, and ten-way trees, sequential decimal grid-index digits, and independent binary grid-index bits under matched grids and order controls.
- Separates point decoding from probability-distribution construction and shows that isotonic repair of threshold outputs enforces CDF shape without establishing calibration.

## Method

The evaluator supplies a half-open range $[L,U)$, resolution $\epsilon$, and branching factor $K$, with $N=(U-L)/\epsilon$ grid cells. The decoder maintains an integer-index interval $[a,b)$ and partitions it into $k=\min(K,b-a)$ balanced children. At each level, the Jev-like model receives the original question and descriptions of the current numerical subintervals. Its selected label determines the next interval. When one cell remains, the decoder returns that cell's lower endpoint and retains the decision trace.

If every choice keeps the target in the selected interval, the returned value is within $\epsilon$ and is exact for a grid-valued target. The guarantee is conditional on the path: an early divergence is unrecoverable, and the model's returned categorical probabilities are not treated as calibrated numerical uncertainty. Known bounds and resolution are required; the method has no out-of-range branch.

## Experiments

### Fixed Affine-Grid Evaluation

The main evaluation uses Jev `jev-1.13-20260917` and 64 generated base expressions, 16 each for addition, subtraction, multiplication, and division. Four affine transformations produce 256 expressions on 100-cell grids: unshifted integers, values scaled by 0.01, values shifted by -50, and values scaled by $10^4$. Each expression is tested with arithmetic alone and with the result supplied, in ascending and reversed option insertion order. The resulting design contains 1,024 condition/order jobs and 512 outputs per decoder and condition.

The comparison includes direct selection among 100 values; interval trees with $K=2,4,10$; two sequential decimal grid-index digits; and seven independently queried binary grid-index bits. Uncertainty intervals use 10,000 bootstrap resamples over the 64 base-expression families, keeping transformations, orders, and input conditions together.

### Numerical Accuracy

In the arithmetic condition, direct selection has 21.68% MAPE and 5.18% range-normalized MAE. Trees with $K=2,4,10$ have MAPE of 16.88%, 17.25%, and 19.73%, and range-normalized MAE of 1.76%, 1.60%, and 1.84%. The paired MAPE intervals include zero, so the experiment does not establish a population MAPE advantage for a tree. The paired range-normalized error differences favor all three trees. Ten-way decoding places 83.40% of outputs within 5% relative error versus 80.47% for direct choice, but this threshold statistic is post hoc.

Sequential grid-index digits and independent bits perform substantially worse, with arithmetic MAPE of 84.43% and 95.13%. Supplying the answer reduces tree MAPE to 0-2.93% and direct-choice MAPE to 3.79%, while digit and bit MAPE remain 59.82% and 77.90%. Explicit access to the target therefore does not remove errors introduced by the requested representation conversion.

### Sensitivity and Additional Studies

Performance reverses across affine domains. Direct selection has 0% MAPE on unshifted integers and 0.52% on the large-scale domain, while the ten-way tree has 0.50% and 30.96%, respectively. No branching factor is uniformly preferred. Ordering and affine-consistency diagnostics likewise show that mathematically equivalent grids need not produce equivalent learned readouts.

A separate three-date S&P 500 historical recall study reports 4.58% mean relative error under ten-way decoding and 0% when the values are supplied. It contains only three unique dates and tests recall, not forecasting. An altered prompt with binary branching raises recall MAPE to 31.17%, but changes two factors at once and is not a branching-factor ablation.

Four spline or Beta continuous heads on 4B and 9B Qwen3.5 backbones, trained on structural-causal distribution tasks rather than arithmetic, achieve only 2.73-6.25% of arithmetic outputs within 5% error. Backbone, training, and interface differences prevent interpreting this transfer comparison as an isolated advantage of choice decoding over continuous heads.

## Limitations

- The controlled evaluation covers one proprietary hosted model version, simple generated arithmetic, and a three-date historical recall example.
- The evaluator must know a containing range and resolution; unknown scales and out-of-range values are not handled.
- Endpoint-valued arithmetic removes quantization error and does not establish performance on arbitrary real targets, open-ended problems, or forecasting data.
- Relative and range-normalized errors yield different rankings, especially near zero; aggregate results hide large domain reversals.
- The digit and bit findings concern specific prompts and grid-index encodings, not free-form numerical generation in general.
- The continuous-head systems use different backbones and prior training, so their transfer results are not a controlled output-head comparison.
- Fine resolution and a narrow terminal interval do not imply accuracy or calibrated uncertainty. Threshold probabilities violate monotonicity in 25 of 48 archived query groups, and isotonic shape repair does not validate a predictive distribution.
- Bootstrap intervals cover sampled expression families, not backend changes, all model randomness, or the population of numerical tasks.

## Related Concepts

- [[concepts/numerical-decoding-through-structured-choices|Numerical Decoding through Structured Choices]]: the finite-grid reduction implemented by NumericJev.
- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]]: the constrained model interface used for each interval decision.
- [[concepts/probability-calibration|Probability Calibration]]: necessary before returned option probabilities can be interpreted as numerical uncertainty.
- [[concepts/model-reprogramming|Model Reprogramming]]: a related strategy for reusing fixed pretrained computation, usually with learned input or output mappings rather than a training-free decision protocol.

## Related Papers

- [[papers/jev-thinks-i-dont-know-but-doesnt-say-it-introducing-sys1cal-v1-dataset-for-probability-calibration|Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration]]: evaluates the numerical semantics and representation sensitivity of Jev's structured probabilities.
- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: studies accuracy, probability quality, and routing with the same broader decision-interface family.
- Torgo and Gama (1997), "Regression using classification algorithms": early interval-discretization approach to numerical prediction through classification.
- Langford, Oliveira, and Zadrozny (2006), "Predicting conditional quantiles via reduction to classification": classification reduction for conditional quantile prediction with regret analysis.
- Lukasik et al. (2024), "Regression-aware inference with LLMs": distinguishes likely textual outputs from decisions optimized for numerical loss.

Source scope: supplied parsed Markdown for job `ee44e01f-dfa9-421b-9407-ad76b7a17e27`. The manuscript supplies no venue, DOI, or arXiv identifier.

[[index|Library home]]
