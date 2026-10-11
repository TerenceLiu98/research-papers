---
title: Biographical Ideology Profiling
type: concept
tags:
  - political-measurement
  - political-ideology
  - llm-evaluation
---

## Overview

Biographical ideology profiling measures relative ideological patterns through how models describe politically relevant people. Descriptions are scored for favorability and aggregated over the ideological attributes associated with those people. This is an indirect operational measure of expressed behavior, not a direct observation of internal beliefs or a universal neutrality score.

## Key Ideas

- **Separate elicitation from assessment.** An open-ended description can resemble ordinary information seeking even when a subsequent sentiment judgment uses a restricted answer scale. The first stage's naturalness does not validate the entire measurement pipeline.
- **Specify who judges.** When the describing model also scores the text in a new conversation, the result combines its portrayal and interpretive behavior. A common external judge instead introduces a shared evaluative perspective; these designs estimate different objects.
- **Treat person-to-ideology mapping as a measurement choice.** A favorable biography does not imply endorsement of every position associated with its subject. Tag sources, annotation reliability, historical context, and sample composition constrain interpretation.
- **Preserve missingness and coverage.** Identity checks, refusals, and language support determine which observations enter a profile. Filtering can remove politically informative cases as well as unusable descriptions.
- **Check comparability before interpreting distances.** Identical sentiment labels can have different usage across languages or models. Numerical coding and centering support summaries but do not prove a common measurement scale.
- **Distinguish association from explanation.** Developer-region differences may be compatible with training, alignment, or moderation mechanisms without identifying any one of them. Effects on human attitudes require separate evidence.

## Important Papers

- [[papers/large-language-models-reflect-the-ideology-of-their-creators|Large language models reflect the ideology of their creators]]: applies a two-stage protocol to 19 models and six languages, combining political-person descriptions with 61 ideological tags and reporting relative regional and within-region differences.

## Related Concepts

- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: a complementary approach using explicit roles and human comparison groups.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: the assessor is part of the measurement design.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: dimensional reduction of political profiles.
- [[concepts/llm-political-persuasion|LLM Political Persuasion]]: a distinct outcome concerning changes in users' attitudes.
