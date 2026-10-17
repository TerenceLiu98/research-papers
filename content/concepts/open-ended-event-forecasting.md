---
title: Open-Ended Event Forecasting
type: concept
aliases:
  - Open-Ended Future Event Prediction
tags:
  - event-forecasting
  - large-language-models
  - retrieval
---

## Overview

Open-ended event forecasting generates natural-language descriptions of future developments without restricting outcomes to a fixed candidate set or taxonomy. A forecast is conditioned on a question, background, a prediction timestamp, and a future window; its eventual reference outcome is collected afterward. Questions may concern an event's development, consequences, location, or stakeholders' responses.

## Key Ideas

- **Freeze the information boundary.** Forecasts must use information available at prediction time. Scoring against later news is appropriate, but allowing that news into retrieval changes forecasting into retrospective answering.
- **Separate relevance from analogy.** Current reports sharing actors or context supply direct evidence. Historical events with comparable roles or development patterns supply analogues. Role abstraction can widen retrieval, but analogy alone does not establish a shared causal mechanism.
- **Organize evidence before generation.** Stakeholder-guided query expansion can expose missing perspectives; deduplication and clustered summaries can reduce repeated information in the prediction context.
- **Evaluate more than plausibility.** Accuracy, coverage, relevance, specificity, and reasonableness measure different properties. A coherent answer can be vague or incomplete, and a forecast containing one correct aspect can still be misleading overall.
- **Keep answerability visible.** Restricting evaluation to questions with documented outcomes changes the target population. Event non-occurrence, missing reporting, and unresolved annotation are distinct reasons a question may lack an answer.
- **Check the operational task.** A benchmark described as open-ended may still discretize selected question types. OpenEP evaluates time questions with fixed intervals while leaving other outcomes free-form.
- **Report temporal resolution.** Time-prediction accuracy depends on the interval partition and the treatment of non-occurrence. OpenEP reports lower GPT-3.5 accuracy with six intervals, but does not fully specify that alternative partition; scores from different temporal resolutions require separate interpretation.

## Important Papers

- [[papers/openep-open-ended-future-event-prediction|OpenEP: Open-Ended Future Event Prediction]]: introduces OpenEPBench and stakeholder-enhanced retrieval with historical analogues; reports improved aggregate scores but persistent incompleteness and only moderate human agreement with automated evaluation.

## Related Concepts

- [[concepts/temporal-leakage-in-language-models|Temporal Leakage in Language Models]]: prediction timestamps must constrain both model knowledge and retrieved evidence.
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: forecasts over predefined relational fields provide a contrasting task formulation.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: semantic evaluation of free-form forecasts requires a validated rubric and reference outcomes.
