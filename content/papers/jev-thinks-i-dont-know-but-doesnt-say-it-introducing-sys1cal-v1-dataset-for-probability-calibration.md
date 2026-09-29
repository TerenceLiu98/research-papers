---
title: "Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration"
type: paper
authors:
  - Riccardo Porcedda
year: null
source_job_id: "ecf7def2-44e5-4a0c-b70c-1d760ea59bfd"
tags:
  - probability-calibration
  - uncertainty-quantification
  - selective-prediction
  - structured-decision-models
  - llm-evaluation
---

## TL;DR

Sys1Cal-v1 is a synthetic benchmark of 365 rendered examples from 92 probability problems whose target distributions are known exactly. It evaluates the structured outputs of Jev, a System One model, through its Noul, Choice, and Score primitives, and compares Choice with the SemIf baseline. Jev-Noul and Jev-Score are substantially closer to the constructed probabilities than Jev-Choice. A fitted latent uncertainty component explains much of the nonlinear Score-to-Choice relationship and improves binary Choice calibration when used as a post-hoc correction. The evidence supports a useful uncertainty representation, but does not prove that Jev internally implements a third truth value.

## Research Question

Do the probabilities returned by structured decision interfaces have the intended numerical meaning across primitives and equivalent prompt representations, and can Jev's Choice distortion be explained by an unresolved uncertainty component?

## Motivation

Downstream decisions often depend on a full predictive distribution rather than only its most probable label. Proper scoring rules, expected utility, and selective or deferred decisions therefore require probabilities whose numerical semantics are reliable. Standard confidence calibration tests whether the predicted class is calibrated on realized labels, but does not directly test every returned option probability, invariance across equivalent representations, or agreement between different output primitives.

## Contributions

- Introduces Sys1Cal-v1, a benchmark whose exact proposition probabilities are available by construction.
- Defines total variation distance and Distributional Overlap (OVL) as pointwise measures of probability recovery, and uses pairwise TV to measure representation sensitivity.
- Evaluates Jev's Noul, Choice, and Score interfaces alongside the SemIf Choice-style baseline.
- Fits a latent True/Uncertain/False model to explain the systematic nonlinear distortion in Jev-Choice probabilities.
- Shows two uses of the fitted uncertainty: inverse-map calibration for a binary probability and an interval-valued T/U/F representation for uncertainty-aware deferral.

## Method

### Sys1Cal-v1

Each item defines a proposition $A$ with a generated target $p^*=P(A)$ and $P(\neg A)=1-p^*$. The six problem families are explicit probabilities, frequencies from counts, compound probabilities, conditional probabilities, Bayes' rule, and sequential Bayesian updates. The 92 latent problems are rendered in equivalent forms including direct statements, ratios, prose, tables, counts, nested states, and distractor-augmented states, producing 365 examples.

### Primitive projections and metrics

Noul directly returns probabilities for $A$ and $\neg A$. Choice returns a categorical distribution over True and False. Score returns ten ordered truth levels; the paper maps level $j$ to $z_j=j/9$ and summarizes its distribution $q_j$ with

$$
\mu_S=\sum_{j=0}^{9}q_jz_j.
$$

For each item, the model is queried ten times and the returned probabilities are averaged. For binary targets, total variation reduces to $\mathrm{TV}(\hat p,p^*)=|\hat p-p^*|$, and the paper defines

$$
\mathrm{OVL}(\hat p,p^*)=1-|\hat p-p^*|.
$$

Equivalent renderings are grouped by latent problem and compared with pairwise TV to measure representation sensitivity.

### Latent uncertainty model

The proposed observational model has latent masses $\pi_T$, $\pi_U$, and $\pi_F$ for True, Uncertain, and False. Choice is modeled as renormalizing the committed states:

$$
P_{Choice}(True)=\frac{\pi_T}{\pi_T+\pi_F}.
$$

The fitted construction sets $\hat\pi_T=\mu_S$ and models uncertainty as

$$
\hat\pi_U(\mu_S)=\lambda\mu_S^\alpha(1-\mu_S)^\beta,
$$

with $\hat\pi_F=1-\hat\pi_T-\hat\pi_U$. It induces an inverse-correctable Score-to-Choice map and a compatible truth-probability interval $[T,T+U]$.

## Experiments

### Primitive calibration

The reported mean total variation and OVL are:

| Output | Mean TV | Mean OVL |
| --- | ---: | ---: |
| Jev-Choice | 0.236 | 0.764 |
| Jev-Noul | 0.0817 | 0.918 |
| Jev-Score | 0.1139 | 0.886 |
| SemIf-Choice | 0.371 | 0.629 |

Jev-Choice is shifted toward high True probabilities when $P(A)\geq0.5$ and is fuzzier below 0.5. Noul and Score expectation are more closely aligned with the target and with each other.

### Uncertainty fit and correction

Fitting the uncertainty map gives $\alpha=0.530$, $\beta=1.011$, and $R^2=0.834$ for predicting Choice probabilities. The mean absolute-error reduction is 0.110, with a 95% confidence interval excluding zero. The global uncertainty scale is $\hat\lambda=0.978$ with bootstrap 95% CI $[0.789,1.000]$; the latent-problem estimate is 0.821 with CI $[0.760,0.882]$ and $p=2.94\times10^{-44}$ against zero uncertainty.

Raw Choice has mean OVL 0.764 and median OVL 0.771. Inverting the fitted map raises these to 0.880 and 0.903. Retaining the uncertainty mass instead yields mean T/U/F interval OVL 0.931, median 0.978, and mean uncertainty width 0.292. Interval OVL is not directly interchangeable with binary OVL because wider intervals are more permissive.

In the paper's decision example, raw Choice assigns 0.632 to True and favors acting as if the proposition is true when error costs 100 and deferral costs 45. The calibrated binary probability is approximately 0.400 and favors acting as if it is false. The T/U/F representation $(0.400,0.367,0.233)$ favors deferral under a robust criterion because the compatible interval is $[0.400,0.767]$.

### Representation sensitivity

Mean pairwise TV is 0.0441 for Noul, 0.0656 for Score expectation, 0.0998 for Jev-Choice, and 0.117 for SemIf-Choice. Thus equivalent renderings can change the returned probabilities, with Choice being less invariant than Noul and Score.

## Limitations

- Sys1Cal-v1 uses controlled probability families and templated renderings. It tests probability semantics, not broad natural-language competence; richer language, adversarial paraphrases, and domain-specific decisions remain future extensions.
- Score is reduced to a one-dimensional expectation, which may discard information in the full ordinal distribution.
- The uncertainty model is observational. The results show that Choice behaves as if a richer state were collapsed into a binary output, but do not establish Jev's internal mechanism or a literal third truth value.
- OVL for T/U/F intervals is permissive when uncertainty intervals are wide and must be reported with interval width; it is not the same metric as binary OVL.
- The supplied manuscript reports a median T/U/F OVL of 0.978 in the main evaluation and Table 3, but its conclusion states 0.971. This summary follows the detailed evaluation and table while retaining the discrepancy.
- Jev and SemIf outputs are stochastic and the benchmark is synthetic. The reported repeated-query averages and fitted mappings do not establish calibration on deployed tasks or under distribution shift.

## Related Concepts

- [[concepts/probability-calibration|Probability Calibration]]: evaluates whether reported probabilities have the numerical meaning required for decisions, beyond top-label accuracy.
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]: uses uncertainty signals to decide when to defer to a stronger evaluator; Sys1Cal instead studies the probability semantics of the first interface.
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]: also aggregates a distribution over ordered outputs, but targets scalar measurement rather than binary probability calibration.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: a neighboring structured-evaluation setting in which validity, accuracy, and confidence must be assessed separately.

## Related Papers

- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: related library work evaluating JEV confidence and escalation, with a different benchmark and research question; it is not cited by the supplied manuscript.
- Gneiting and Raftery (2007), "Strictly proper scoring rules, prediction, and estimation": the proper-scoring foundation cited for evaluating predictive distributions (reference [9]).
- Guo et al. (2017), "On calibration of modern neural networks": the confidence-calibration reference contrasted with pointwise probability semantics (reference [10]).
- Dawid (1982), "The well-calibrated bayesian": an early calibration reference cited by the manuscript (reference [6]).
- Xin et al. (2021), "The art of abstention: Selective prediction and error regularization for natural language processing": the selective-prediction connection for using uncertainty to defer decisions (reference [16]).

Source scope: supplied parsed Markdown for job `ecf7def2-44e5-4a0c-b70c-1d760ea59bfd`. The manuscript identifies the author but supplies no stable identifier or explicit publication year.

[[index|Library home]]
