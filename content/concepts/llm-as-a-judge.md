---
title: LLM-as-a-Judge
type: concept
aliases:
  - LLM Judge
tags:
  - llm-evaluation
  - automated-evaluation
---

## Overview

LLM-as-a-Judge uses a language model to evaluate responses under a natural-language rubric, for example by selecting a preferred answer or assessing factual support. The judge's output format and the semantic task are separate: a decision-only interface can evaluate free text, and a structured verdict alone establishes neither correctness nor reliable confidence.

## Key Ideas

- **Specify the judgment target.** Preference, final-answer correctness, derivation validity, and evidence support can disagree. A trusted reference may be intentionally visible for adjudication but must be absent from a reference-blind extraction task.
- **Separate validity from accuracy.** A schema-valid judgment can be wrong. Report operational failures in overall accuracy while keeping valid-only probability metrics and their denominators explicit.
- **Audit presentation effects.** Candidate reversal, rubric paraphrasing, and answer elaboration probe different failure modes. A nearly balanced first-position rate can coexist with frequent semantic reversals.
- **Treat confidence empirically.** Native probability distributions and verbalized confidence have different mechanisms. Error ranking, probability calibration, and verdict accuracy require separate evaluation.
- **Validate the reference labels.** Agreement with benchmark labels is not identical to substantive correctness. Selected disagreement audits can reveal label problems without estimating their prevalence across a benchmark.
- **Match evidence to deployment.** Strong performance on evidence-grounded questions or ordinary preferences does not establish reliability on reference-free prose, difficult derivations, or style-adversarial answers.

## Important Papers

- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: measures the accuracy, confidence, validity, and cost of a decision-only judge and its escalation policies.
- Zheng et al. (2023), "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena": cited by the JEV study as background on LLM evaluation and presentation biases.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: compares pointwise and pairwise judgments for scalar measurement, illustrating metric-dependent performance and reference-label uncertainty.

## Related Concepts

- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
- [[concepts/epistemic-modesty|Epistemic Modesty]]: an evidence-sensitive normative standard for information mediation, distinct from statistical calibration of judge probabilities.
