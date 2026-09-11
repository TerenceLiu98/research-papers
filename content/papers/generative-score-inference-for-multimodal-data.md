---
title: Generative Score Inference for Multimodal Data
type: paper
authors:
  - Xinyu Tian
  - Xiaotong Shen
year: null
tags:
  - uncertainty-quantification
  - prediction-sets
  - generative-models
  - multimodal-learning
---

## TL;DR

[[Generative Score Inference]] (GSI) learns the conditional distribution of prediction discrepancies and samples from it to construct input-dependent prediction sets. The paper reports shorter intervals than two conformal baselines on five tabular datasets and greater detection or selection power in question answering and image captioning. Its [[Conditional Prediction Coverage]] guarantee depends on accurate conditional generation; practical experiments additionally calibrate decisions on validation data.

## Research Question

Can a generative model of task-specific discrepancy scores provide useful prediction sets and decision probabilities across tabular, text, and image tasks, with coverage error explicitly tied to generation accuracy and Monte Carlo sampling?

## Motivation

An overall coverage rate can conceal poor coverage for particular inputs or subgroups. Multimodal outputs also make direct outcome-distribution estimation difficult. GSI reduces each prediction-reference comparison to a scalar discrepancy and models its conditional distribution. In question answering, historical verified answers supply error patterns that may not be captured by diversity among an LLM's own responses.

## Contributions

- Introduces a predictor- and generator-agnostic procedure for constructing prediction sets from synthetic conditional discrepancy scores.
- States a conditional-coverage error bound separating generation error from finite Monte Carlo error, with diffusion-specific theory in Appendix B.
- Applies the framework to regression intervals, LLM hallucination detection, and selection of reliably captioned images.
- Compares conditional diffusion with VAE, GAN, and affine Gaussian flow generators, including computational costs.

## Method

Split data to fit a predictor $\hat f$ and compute held-out discrepancies $s_i=s(y_i,\hat f(x_i))$. Fit a conditional generator to the pairs $(x_i,s_i)$. For a new input $x$, draw $m$ synthetic scores and take their empirical $(1-\alpha)$ quantile $\hat q_{1-\alpha,m}(x)$. The prediction set is

$$
\mathcal C_\alpha(x)=\{y:s(y,\hat f(x))\leq\hat q_{1-\alpha,m}(x)\}.
$$

The experiments use conditional [[Diffusion Models]] and $m=1000$. With a pretrained predictor, the predictor-training split is unnecessary. The discrepancy score being generated is distinct from the log-density gradient learned by diffusion score matching.

Under Assumption 3.1, the estimated conditional score law is within total variation distance $\tau$ of the true law with probability at least $1-\beta(\tau,n_s)$. Theorem 3.2 states that absolute conditional-coverage error is at most $\varepsilon+\tau$, with probability at least $1-2\exp(-2m\varepsilon^2)-\beta(\tau,n_s)$. This is a model-dependent asymptotic guarantee, rather than a distribution-free finite-sample guarantee. Appendix B imposes smoothness and density assumptions for its diffusion generation-error rate. Experiments use a further validation split to compensate for residual bias.

For hallucination detection, the score is one minus cosine similarity between reference and generated-answer embeddings from text-embedding-3-small. A score above $c=0.7$ defines the evaluation label. GSI estimates the probability of exceeding this threshold, with its decision threshold calibrated on validation examples. Reference answers are required offline, but not for a new question at decision time.

For image selection, the discrepancy is one minus ROUGE-L, again with $c=0.7$. Conditional generation uses BLIP image embeddings. The procedure combines estimated score-tail probabilities with validation-based conformal p-values and the Benjamini-Hochberg procedure; raw generator probabilities alone do not constitute the complete FDR-control pipeline.

## Experiments

**Tabular regression (Section 4.1, Table 1).** Five datasets use an 85:15 train/test split, with the training portion divided equally for predictor fitting and score calibration. All methods use a gradient-boosting predictor. At nominal 90% coverage, GSI reports:

| Dataset | Marginal coverage | Mean interval length | Worst subgroup coverage |
| --- | ---: | ---: | ---: |
| MEPS-20 | 0.91 | 0.98 | 0.80 |
| Bio | 0.89 | 2.19 | 0.88 |
| Kin8nm | 0.90 | 1.82 | 0.85 |
| Naval | 0.89 | 0.96 | 0.85 |
| Blog | 0.90 | 1.66 | 0.80 |

GSI intervals are shorter than both split conformal prediction and conformalized unconditional quantile regression (CUQR) on all five datasets. Worst coverage across ten k-means subgroups matches or exceeds CUQR, but remains below 0.90 on every dataset. Table 1 reproduces baseline results from Alaa et al. (2023); these subgroup measurements do not verify pointwise conditional coverage.

**Hallucination detection (Section 4.2).** LLaMA-3.1-8B-Instruct answers 1,473 WikiQA questions, split into 1,040 calibration, 140 validation, and 293 test instances. Baselines are Semantic Entropy (ten candidate answers plus logistic calibration) and Conformal Alignment (an XGBoost classifier). Figure 3 is reported to show greater GSI power at practically relevant nominal Type I error levels. The supplied text does not tabulate the power curves, so no exact power advantage is assigned here.

**Image-caption selection (Section 4.3).** BLIP captions the first 10,000 COCO 2014 validation images, split 8,000/1,000/1,000 for calibration, validation, and testing. Figure 4 is reported to show greater power than Conformal Alignment across target FDR levels from 0 to 0.5, with realized FDR close to the target.

**Generator and runtime comparison (Appendix C).** Conditional GANs undercover on all five tabular datasets. Diffusion improves over the affine flow's worst-subgroup coverage on MEPS-20 (0.80 versus 0.40), but is slightly worse on Bio and Naval and tied on Blog. The comparison supports a dataset-dependent tradeoff rather than uniform diffusion dominance. Reported QA inference time is 67.49 seconds for GSI versus 14,400.18 seconds for Semantic Entropy; Conformal Alignment takes less than 0.01 seconds. For image selection, GSI inference takes 333.21 seconds versus less than 0.01 seconds for Conformal Alignment. These are reported experiment timings, not per-query latencies.

## Limitations

- Increasing synthetic sample count reduces Monte Carlo error but cannot remove generator bias. Validation calibration does not by itself establish conditional coverage for every input.
- Hallucination labels depend on an embedding-similarity threshold, and caption quality depends on ROUGE-L. These proxy criteria do not exhaust factual correctness or semantic adequacy.
- Text and image studies each use one dataset and one base model. Reliability depends on representative, verified historical references; fully reference-free deployment is not demonstrated.
- Diffusion training and reverse-process sampling cost more than conformal calibration or the tested lighter score generators. The flow baseline is specifically an affine conditional Gaussian, limiting conclusions about richer flow architectures.
- The supplied Markdown contains damaged mathematical notation and ambiguities in its testing descriptions. In particular, the text's identification of prediction-set exclusion with a tail-probability rule should not be treated as an implementation specification without clarification. Figure-only performance claims are retained qualitatively.
- The supplied source does not state this paper's publication year, venue, DOI, or arXiv identifier. The year is left null rather than inferred from cited works.

## Related Concepts

- [[Generative Score Inference]]
- [[Conditional Prediction Coverage]]
- [[Diffusion Models]]

## Related Papers

- Alaa, Hussain, and Sontag (2023), "Conformalized unconditional quantile regression": tabular comparison and validation calibration.
- Farquhar et al. (2024), "Detecting hallucinations in large language models using semantic entropy": candidate-diversity baseline.
- Gui, Jin, and Ren (2024), "Conformal alignment: Knowing when to trust foundation models with guarantees": detection and selection baseline.
- Jin and Candes (2023), "Selection by prediction with conformal p-values": selection procedure used in the captioning application.

[[index|Library home]]
