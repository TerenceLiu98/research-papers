---
title: Contextualized Recommendation Explanations
type: concept
aliases:
  - Personalized Recommendation Explanations
tags:
  - recommender-systems
  - explainable-ai
  - personalization
  - large-language-models
---

## Overview

Contextualized recommendation explanations justify a recommended item by explicitly connecting it to user-specific evidence, such as prior consumption, expressed preferences, or interaction history. Unlike a generic description of the item, a contextualized explanation tells the user how their context shaped the recommendation. Large language models can express these links fluently, but fluency does not ensure that the underlying preference inference is correct.

## Key Ideas

- **Context makes the rationale inspectable.** References to recognizable history can help users understand the basis of a recommendation, assess whether the system understood them, and decide whether to accept or reject the suggestion.
- **Explanation quality has multiple goals.** Transparency, trust, and scrutability concern cognitive needs; persuasion and satisfaction concern affective needs; effectiveness, efficiency, and helpfulness concern practical decision support. Improvement on one group does not guarantee improvement on another.
- **Behavior is not preference.** A click, view, or completed item is an ambiguous signal. Explanations that state inferred tastes too confidently can misrepresent users and eventually weaken trust.
- **More context has diminishing value.** Additional history can strengthen perceived relevance, but irrelevant references, repetition, spoilers, and excessive detail create cognitive load. Systems should select a small amount of diagnostic context rather than enumerate all available history.
- **Recommendation and explanation are jointly judged.** In subjective domains, users may rate an explanation poorly because the item itself mismatches their taste. Evaluation designs should distinguish recommendation relevance, explanation faithfulness, perceived usefulness, and downstream behavior.

## Important Papers

- [[papers/contextualizing-recommendation-explanations-with-llms-a-user-study|Contextualizing Recommendation Explanations with LLMs: A User Study]] compares no explanation, generic LLM explanations, and viewing-history-grounded LLM explanations in a preregistered movie-recommendation experiment.
- Kunkel et al. (2019), "Let Me Explain: Impact of Personal and Impersonal Explanations on Trust in Recommender Systems," studies effects of personalized versus impersonal explanations.
- Balog and Radlinski (2020), "Measuring Recommendation Explanation Quality: The Conflicting Goals of Explanations," formalizes multiple user-facing goals for evaluating recommendation explanations.
- Lu et al. (2023), "User Perception of Recommendation Explanation: Are Your Explanations What Users Need?" examines whether explanation design aligns with user needs.

## Related Concepts

- Explainable recommender systems connect recommendation outputs to human-understandable reasons.
- Preference elicitation collects explicit or behavioral evidence about user tastes before ranking and explaining items.
- Cold-start recommendation operates when reliable user history is sparse, increasing both the value and the risk of contextual inference.
