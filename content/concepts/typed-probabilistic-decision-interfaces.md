---
title: Typed Probabilistic Decision Interfaces
type: concept
aliases:
  - Typed Decision Interfaces
  - Structured Probabilistic Decisions
tags:
  - structured-decision-models
  - uncertainty-quantification
  - llm-evaluation
  - llm-security
---

## Overview

Typed probabilistic decision interfaces map a state and a caller-defined set of options to a structured action and a probability distribution over those options. They differ from free-form generation because the returned action must belong to the declared output space. The constraint can improve integration and auditing, but it does not by itself guarantee that the selected action is appropriate or that the probabilities are calibrated.

## Key Ideas

- **Separate action validity from task safety.** A schema-valid action can still be harmful or contrary to the user's task when an attacker-target action is available.
- **Treat probabilities as behavior, not decoration.** Reported probabilities can support calibration, selective routing, and utility calculations; they can also reveal feedback to an adaptive attacker.
- **Keep the action set fixed when testing input influence.** Holding option identifiers, descriptions, order, and safe-action labels constant makes changes in selection or probability attributable to the changed state content within the tested design.
- **Distinguish probability shifts from target selection.** A malicious input may move probability mass without changing the returned action. Both outcomes matter for security and downstream routing.
- **Use fresh validation calls.** Screening a candidate on the same call that selected it can overstate reliability when the interface is stochastic. Majority rules over separate calls provide a defined, though finite, validation criterion.
- **Do not infer internal semantics from output structure.** A typed response describes an interface contract. It does not prove how the underlying model represents uncertainty or follows instructions.

## Important Papers

- [[papers/decision-hijacking-prompt-injection-attacks-on-jevs-typed-probabilistic-decisions|Decision Hijacking: Prompt Injection Attacks on Jev's Typed Probabilistic Decisions]]: tests whether indirect prompt injection changes Jev's probabilities and choices when the action set is declared and fixed.
- [[papers/jev-thinks-i-dont-know-but-doesnt-say-it-introducing-sys1cal-v1-dataset-for-probability-calibration|Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration]]: compares Jev's structured output primitives against constructed probability targets and studies representation sensitivity.
- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: evaluates a decision-only Jev interface for judgment accuracy, probability quality, confidence, and escalation.
- [[papers/decide-dont-generate-competitive-dimensional-absa-with-jevs-typed-decisions|Decide, Don't Generate: Competitive Dimensional ABSA with Jev's Typed Decisions]]: composes SCORE, CHOICE, and NOUL decisions with learned calibration and reranking for dimensional ABSA.

## Related Concepts

- [[concepts/indirect-prompt-injection|Indirect Prompt Injection]]: untrusted content can influence a typed choice even when no undeclared action can be returned.
- [[concepts/probability-calibration|Probability Calibration]]: asks whether reported probabilities have the numerical meaning needed for decisions.
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]: uses confidence or probability signals to decide when to accept a decision or defer it.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: applies structured decisions to evaluation tasks while separating validity, accuracy, and confidence.
