---
title: "Conformal Prediction with Large Language Models for Multi-Choice Question Answering"
type: paper
authors:
  - Bhawesh Kumar
  - Charles Lu
  - Gauri Gupta
  - Anil Palepu
  - David Bellamy
  - Ramesh Raskar
  - Andrew Beam
year: null
tags:
  - conformal-prediction
  - large-language-models
  - uncertainty-quantification
  - question-answering
---

## TL;DR

The paper applies [[Conformal Prediction]] to LLaMA-13B multiple-choice answers, using calibrated softmax-derived scores to produce answer sets with a target marginal coverage rate. On 16 MMLU subjects, same-subject calibration attains the requested coverage on average, and prediction-set size is negatively associated with top-1 accuracy. Cross-subject calibration can miss the target substantially, illustrating that the guarantee depends on exchangeability between calibration and evaluation data.

## Research Question

Can conformal prediction turn an LLM's answer-choice scores into useful uncertainty sets with user-specified error rates, and what happens when calibration and test questions come from different subjects?

## Motivation

Softmax confidence can be miscalibrated and does not itself provide a finite-sample error guarantee. This is especially problematic when an LLM is used in high-stakes settings and its confident-looking answers may be wrong. Conformal prediction offers a model-agnostic wrapper that requires only held-out calibration data, making it applicable when retraining or direct access to model internals is impractical.

## Contributions

- Adapts least-ambiguous set-valued conformal classification to four-option multiple-choice question answering with LLaMA-13B.
- Evaluates prediction-set size as an uncertainty signal for selective classification.
- Compares conformal prediction sets with fixed top-$k$ answer sets and examines coverage stratified by set size.
- Tests the exchangeability requirement by calibrating and evaluating on different MMLU subjects.

## Method

For each question, the model supplies logits for answer tokens A, B, C, and D. The authors take a softmax over these logits and average the probability vectors from ten one-shot prompts whose demonstration questions differ. The main experiments use GPT-4-generated demonstrations that were manually checked; after controlling prompt length to 700 tokens, these prompts had similar accuracy to demonstrations drawn from MMLU.

For the true answer $Y$, the nonconformity score is the least-ambiguous-classification score

$$
S(X,Y)=1-[f(X)]_Y.
$$

Given $n$ calibration scores, the threshold is the finite-sample adjusted $(1-\alpha)$ quantile

$$
\hat q_\alpha=\operatorname{Quantile}\left(\{s_1,\ldots,s_n\},\frac{\lceil(n+1)(1-\alpha)\rceil}{n}\right),
$$

and the answer set is $\mathcal C(X)=\{y:S(X,y)\leq\hat q_\alpha\}$. Its marginal coverage guarantee requires calibration and test examples to be exchangeable. Set size serves as a per-question uncertainty indicator, but the formal guarantee concerns average coverage rather than correctness of every individual set or every set-size subgroup; see [[Conditional Prediction Coverage]].

## Experiments

The study uses 16 MMLU subjects spanning computer science, medicine, and business, each with at least 100 questions. For every subject and each of 100 random trials, half the examples form the calibration set and half the evaluation set, leaving at least 50 calibration examples.

At target coverage levels of 90% and 80%, empirical same-subject coverage meets or exceeds the target for every subject in the reported aggregate table. At the 90% target, coverage ranges from 91% to 94%; mean answer-set sizes range from 2.4 for marketing to 3.7 for formal logic. At the 80% target, coverage ranges from 81% to 83%, with mean set sizes from 1.6 to 3.2.

Prediction-set size is negatively associated with top-1 accuracy across all subjects, and singleton conformal sets have higher accuracy than unfiltered top-1 predictions. Fixed top-$k$ sets do not reproduce conformal coverage: their coverage falls sharply at smaller $k$, whereas the paper reports conformal coverage remaining near the target across set sizes for most subjects.

The cross-subject experiment exposes the exchangeability boundary. Calibration and evaluation on the same subject remain close to the 90% target, but some off-diagonal transfers under-cover. In the reported example, calibration on high-school computer science followed by evaluation on business ethics yields about 83% coverage rather than 90%. Transfers among clinical knowledge, anatomy, and high-school biology deviate less.

The raw softmax probabilities are reasonably calibrated on average in these experiments: expected calibration error ranges from 1% for high-school biology to 7% for marketing. Maximum calibration error remains substantial for most subjects, indicating local overconfidence or underconfidence even when average calibration appears acceptable.

## Limitations

- Evidence is limited to LLaMA-13B, four-choice MMLU questions, 16 subjects, and one-shot prompting; it does not establish performance for other models, datasets, or free-form generation.
- The coverage guarantee depends on exchangeability. The cross-subject results show that distribution shift can reduce coverage below the requested level.
- Calibration sets contain at least 50 examples. Coverage holds on average, while individual random splits can vary; the authors note that larger calibration sets would reduce this variance.
- Prediction-set size correlates with accuracy in the reported experiments, but this does not turn marginal conformal coverage into an input-conditional guarantee.
- The supplied paper text mentions a released code repository but does not provide its URL, and it does not state a DOI or arXiv identifier.

## Related Concepts

- [[Conformal Prediction]]
- [[Conditional Prediction Coverage]]

## Related Papers

- Angelopoulos and Bates (2021), "A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification": methodological background for calibration and coverage.
- Sadinle, Lei, and Wasserman (2019), "Least Ambiguous Set-Valued Classifiers with Bounded Error Levels": source of the nonconformity score used for answer sets.
- Kadavath et al. (2022), "Language Models (Mostly) Know What They Know": prior evidence on calibration in language-model multiple-choice tasks.
- Jiang et al. (2021), "How Can We Know When Language Models Know? On the Calibration of Language Models for Question Answering": prior work on question-answering calibration.
- [[Generative Score Inference for Multimodal Data]]: a later model-dependent approach to conditional score generation that also studies LLM uncertainty.

[[index|Library home]]
