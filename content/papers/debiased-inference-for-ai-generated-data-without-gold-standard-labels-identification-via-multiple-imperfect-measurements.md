---
title: "Debiased Inference for AI-Generated Data without Gold-Standard Labels: Identification via Multiple Imperfect Measurements"
type: paper
authors:
  - Naoki Egami
  - Sooahn Shin
year: null
tags:
  - measurement-error
  - semiparametric-inference
  - large-language-models
  - political-methodology
---

## TL;DR

Debiased inference with multiple imperfect measurements (DMM) uses at least three informative proxies to estimate downstream parameters without gold-standard labels. Identification requires conditional independence given the latent label and observed information, rank conditions, and an anchoring rule. An orthogonal bridge then corrects downstream moments. Simulations under correctly specified assumptions attain near-nominal coverage; a real annotation study improves on naive regression but reports only 86.2% coverage of a fixed expert-label benchmark for nominal 95% intervals.

## Research Question

When can multiple imperfect AI annotations replace gold-standard validation labels for inference about regression parameters involving an unobserved categorical outcome or predictor?

## Motivation

High classification accuracy does not ensure valid downstream inference: annotation errors can depend on the variables entering the analysis. Majority voting can improve prediction while leaving regression bias intact. Design-based supervised learning (DSL) and prediction-powered inference (PPI) correct such errors using a validation sample. DMM instead trades that requirement for explicit assumptions about the joint measurement process.

## Contributions

- Connects classical latent-class identification to general downstream moment equations, including linear and logistic regression with latent predictors or outcomes.
- Constructs a symmetric bridge using pairs and triples of proxies to remove first-order nuisance-estimation bias, extending earlier three-proxy constructions.
- Derives consistency, asymptotic normality, sandwich inference, and conditions under which additional proxies improve precision.
- Develops measurement-design guidance, specification diagnostics, and a DMM-assisted DSL correction when some gold-standard labels are available.

## Method

### Identification

For a latent binary predictor $X^*$, let $X^{(1)},\ldots,X^{(J)}$ be observed proxies and $\widetilde D=(D,W,Y)$ contain auxiliary features, downstream covariates, and the observed outcome. The model assumes mutual independence of the proxies conditional on $(X^*,\widetilde D)$. Conditional misclassification rates may therefore vary across both annotators and observations (Section 3.1).

[[concepts/multiple-imperfect-measurement-identification|Multiple Imperfect Measurement Identification]] uses a three-block CP decomposition to recover latent prevalence and class-specific response probabilities. It requires positive class probabilities, sufficient Kruskal ranks, and a prespecified rule assigning recovered components their substantive labels. The bridge additionally requires proxy class contrasts bounded away from zero. In the latent-outcome setting, conditioning information excludes the unobserved outcome and contains $(D,W)$.

### Orthogonal Downstream Moments

Define $\eta_{j,a}(d)=P(X^{(j)}=1\mid X^*=a,\widetilde D=d)$ and

$$
M_j=\frac{X^{(j)}-\eta_{j,0}(\widetilde D)}{\eta_{j,1}(\widetilde D)-\eta_{j,0}(\widetilde D)}.
$$

Each bridge satisfies $E[M_j\mid X^*,\widetilde D]=X^*$. If $\overline H_2$ and $\overline H_3$ average products over distinct proxy pairs and triples, the robust bridge is

$$
H^R=3\overline H_2-2\overline H_3.
$$

[[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]] solves the sample version of

$$
E\left[(1-H^R)\psi^F(Y,0,W;\beta)+H^R\psi^F(Y,1,W;\beta)\right]=0.
$$

The bridge reproduces the oracle moment and cancels terms linear in nuisance errors. It is not a predicted probability and need not lie in $[0,1]$. Simply inserting a recovered class or posterior label into a regression is not this correction (Sections 3.2-3.3).

The general estimator uses cross-fitting, as in [[concepts/double-machine-learning|Double Machine Learning]]. With fixed numbers of proxies and folds, identification and regularity conditions, and maximum nuisance $L_2$ error $o_p(n^{-1/4})$, the paper establishes root-$n$ asymptotic normality and sandwich confidence intervals. Consistency can survive one misspecified proxy-specific nuisance model when the others are consistent; this claim does not establish the same inference guarantee under that misspecification. Multicategory extensions require class-specific bridges and stronger rank and anchoring conditions (Section 4).

### Diagnostics and Implementation

Three binary proxies with two latent classes are generically just identified. Four or more supply overidentifying restrictions; subset-estimate comparisons offer a target-specific specification diagnostic. Neither nonrejection nor agreement proves conditional independence. Grouping dependent annotators is allowed if at least three groups are conditionally independent and have adequate measurement-matrix ranks. A validation sample with known sampling probabilities permits DSL correction of DMM's imputed moments even when conditional independence fails (Section 5).

The experiments use low-dimensional logistic latent-class models fitted by EM, with six starts, at most 500 iterations, and a bridge denominator floor of 0.05. Unlike the general cross-fitted theory, these implementations fit EM once on each analysis sample or resample, invoking parametric regularity. The Pan-Chen measurement model excludes the downstream outcome and additionally assumes proxy-outcome independence conditional on the true label and covariates (Appendix C.2).

## Experiments

### Political Advertising Simulation

The authors hold covariates for 12,973 advertisements fixed and simulate a latent Promote indicator and conditionally independent proxies using calibrated logistic models. The target Facebook coefficient is approximately 1.314; each proxy-count setting uses 500 replications. Conditional independence and nuisance-model specification hold by construction (Section 6.1).

| Estimator | Proxies | Bias | RMSE | 95% interval coverage |
| --- | ---: | ---: | ---: | ---: |
| Majority vote | 3 | 0.186 | 0.191 | 0.018 |
| DMM | 3 | 0.002 | 0.063 | 0.948 |
| Majority vote | 15 | 0.085 | 0.096 | 0.538 |
| DMM | 15 | 0.002 | 0.047 | 0.946 |

The oracle RMSE is 0.045. Across the evaluated proxy sets, DMM coverage ranges from 0.946 to 0.962. Proxy sets are retrospectively ranked using expert-label F1, so both proxy quality and count change. Expert labels also calibrate the simulation, although they do not enter the feasible DMM estimator.

Appendix C.3 includes less prevalent Attack and Contrast outcomes. For Contrast, three-proxy DMM has RMSE 0.598 versus oracle RMSE 0.050, despite coverage 0.958; five proxies reduce DMM RMSE to 0.155. This shows that acceptable coverage need not imply precise estimation.

### Chinese Citizen Complaints

The empirical study analyzes 1,412 complaints with latent prefecture-level wrongdoing as a predictor of upward reporting. Proxies are GPT-4.1 5-shot, GPT-4 5-shot, and Llama-4 0-shot. Weighted F1 scores are 0.942-0.949, but positive-class F1 is only 0.492-0.545 and wrongdoing prevalence is 0.055 (Section 6.2; Table C.3).

| Estimator | Expert labels used in estimation | Coefficient | Fixed-benchmark interval coverage |
| --- | ---: | ---: | ---: |
| Expert benchmark | 1,412 | -1.039 | Not reported |
| Naive single-proxy regressions | 0 | -1.869 to -0.388 | 0.154-0.572 |
| DSL | 500 | -1.279 | 0.981 |
| DMM | 0 | -0.844 | 0.862 |

Both DSL and DMM full-sample intervals contain the expert benchmark. The coverage statistic counts intervals containing that fixed full-sample coefficient over 500 bootstrap resamples; it is not coverage against a known population parameter. Conditional independence is not imposed or established in this empirical exercise.

## Limitations

- Shared unobserved error sources can invalidate identification. Rich covariates, diverse models, and varied prompts are design suggestions, not guarantees of independence.
- Weak proxy contrasts make bridges unstable. Adding weak proxies can increase variance for the symmetric estimator; the precision comparison concerns population bridges and fixed-$J$ designs.
- The empirical 0.862 coverage falls below the nominal 0.95 level. The examples use simplified working regressions rather than exact replications of the original substantive analyses.
- The general theory allows flexible nuisance learners and rich conditioning features, but the reported implementations use low-dimensional logistic EM. The denominator floor is a finite-sample safeguard, not part of population identification.
- Regression coefficients can be projection parameters under downstream model misspecification; measurement correction alone does not establish a causal interpretation.
- The supplied Markdown states no publication year, DOI, or arXiv identifier for this manuscript. Some equations are damaged, and the file ends inside the final bootstrap formula; metadata are left unspecified and the summary uses intact prose and equations.

## Related Concepts

- [[concepts/multiple-imperfect-measurement-identification|Multiple Imperfect Measurement Identification]]
- [[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]]
- [[concepts/double-machine-learning|Double Machine Learning]]

## Related Papers

- Allman, Matias, and Rhodes (2009), "Identifiability of Parameters in Latent Structure Models with Many Observed Variables": identification foundation through three-way decomposition.
- Guo et al. (2026), "Proximal Causal Inference for Hidden Outcomes": prior three-proxy robust bridge for latent outcomes.
- Egami et al. (2023), "Using imperfect surrogates for downstream inference: Design-based supervised learning for social science applications of large language models": validation-based alternative.
- Angelopoulos et al. (2023), "Prediction-powered inference": prediction-and-correction inference using gold-standard labels.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: related library work on annotation quality and imperfect human benchmarks, rather than categorical downstream correction; not cited by this manuscript.

[[index|Library home]]
