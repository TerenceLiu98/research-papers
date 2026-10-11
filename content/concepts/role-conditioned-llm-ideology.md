---
title: Role-Conditioned LLM Ideology
type: concept
aliases:
  - Expressed LLM Ideology
tags:
  - political-ideology
  - llm-evaluation
  - political-measurement
---

## Overview

Role-conditioned LLM ideology describes patterns of political positions a model expresses under a specified elicitation protocol. Asking a model to respond as a voter, legislator, or judge defines different conditional behaviors. An estimated position summarizes those responses; it does not establish internal beliefs or a context-independent political identity.

## Key Ideas

- **Specify the measurement context.** Model version, role, question wording, answer options, decoding settings, and handling of refusals help define the measured object.
- **Use explicit reference groups.** Joint scaling with human responses gives a relative political location. Legislators, judges, and survey respondents supply different agendas and comparison distributions; their scales are not automatically interchangeable.
- **Inspect issue profiles.** A moderate aggregate can arise from centrist answers, nonresponse, or opposing partisan positions. A single score cannot distinguish these possibilities.
- **Separate coherence from uncertainty.** Variance of conservative-coded binary responses measures the balance of liberal and conservative answers. Posterior uncertainty depends on the measurement model and item information. Neither alone establishes a human-like belief system.
- **Report coverage with stability.** Prompt variants can change refusals as well as substantive positions. Agreement among models that answer most questions can overstate robustness for the full roster.
- **Do not infer persuasion from position.** A partisan answer is a property of model output; a causal effect on users requires a separate design. The ingest paper detects influence under explicit advocacy but not under its unsteered conversational condition.

## Important Papers

- [[papers/the-political-ideology-of-large-language-models-measurement-inconsistency-and-persuasive-influence|The Political Ideology of Large Language Models: Measurement, Inconsistency, and Persuasive Influence]]: compares role-conditioned responses with U.S. political actors and voters, tests framing sensitivity, and separately measures influence on users.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: latent measurement from response patterns.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: how many axes summarize political variation.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: a formal approach to domain-dependent human preferences; distinct from claiming models possess human beliefs.
- [[concepts/llm-political-persuasion|LLM Political Persuasion]]: downstream effects of model interactions on human attitudes.
