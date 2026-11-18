---
title: Accumulating Context Changes the Beliefs of Language Models
type: paper
authors:
  - Jiayi Geng
  - Howard Chen
  - Ryan Liu
  - Manoel Horta Ribeiro
  - Robb Willer
  - Graham Neubig
  - Thomas L. Griffiths
year: null
tags:
  - llm-evaluation
  - context-accumulation
  - belief-shift
  - ai-safety
---

## TL;DR

Accumulated conversation and reading context can change both language models' expressed positions and their choices in synthetic action tasks. GPT-5 changes 54.7% of stated positions after debate; Grok-4 changes 27.2% after reading political texts. These are immediate, context-conditioned response changes, not evidence of persistent internal beliefs.

## Research Question

How do deliberate persuasion and ordinary reading or research alter models' stated beliefs and behavior as context accumulates?

## Motivation

Longer contexts and persistent assistants expose models to increasing amounts of material. Evaluating their initial answers alone can miss changes that emerge during use. The paper examines [[concepts/context-induced-belief-shifts|Context-Induced Belief Shifts]] without requiring an explicit jailbreak or a demographic persona.

## Contributions

- A before–task–after protocol separating binary stated positions, agreement ratings, and action choices.
- Comparison of debate, five persuasion strategies, in-depth reading, and autonomous research.
- Analyses of conversation length, reading length, political direction, and removal or isolation of topic-relevant sentences.

## Method

The same query is evaluated before and after accumulated context. Debate pairs models with opposing initial positions; one-sided persuasion uses information, values, norms, empathy, or elite cues over ten rounds. Reading supplies documents and requests summaries. Research uses LangChain's Open Deep Research workflow to gather information and produce a report.

Binary position changes yield shift percentages. Agreement is rated from 0 to 100; differences are signed so positive values indicate movement against the initial position. These percentage-point changes are distinct from binary flip rates. Behavior is elicited through proposed actions or synthetic tool calls; GPT-5-mini judges the implied stance. No model-weight update is part of this protocol.

Intentional tasks use 30 safety queries and 30 moral dilemmas per model pair, with three seeds. Safety examples are selected for initial disagreement; moral dilemmas are generated from principles extracted from Sandel's *Justice*. Non-intentional tasks use 51 political survey questions and 14 publications or figure-centered topics, evenly divided between conservative and progressive sources.

## Experiments

Selected aggregate shift rates from Table 1; persuasion here corresponds to the information strategy in Table 2:

| Model | Task | Stated belief shift (%) | Behavior shift (%) |
| --- | --- | ---: | ---: |
| GPT-5 | Debate | 54.7 | 40.6 |
| GPT-5 | Information persuasion | 72.7 | 43.3 |
| Claude-4-Sonnet | Debate | 24.9 | 40.0 |
| GPT-OSS-120B | Debate | 24.4 | 17.8 |
| DeepSeek V3.1 | Debate | 44.4 | 23.9 |
| GPT-5 | Reading | 13.5 | 10.1 |
| Claude-4-Sonnet | Reading | 18.4 | 17.8 |
| Gemini-2.5-Pro | Reading | 13.0 | 25.6 |
| Grok-4 | Reading | 27.2 | 23.3 |
| GPT-5 | Research | 1.7 | 9.9 |
| Grok-4 | Research | 10.8 | 24.7 |

Stated shifts emerge early in persuasion, whereas behavioral shifts grow with further rounds. Reading-length comparisons use 5k, 20k, and 80k tokens: conservative texts generally produce larger shifts with greater exposure, while progressive-text effects often appear earlier or remain absent. Initial progressive leanings leave asymmetric room for movement.

Research produces smaller stated shifts than reading in the aggregate. The authors suggest that research agents' short excerpts and summaries reduce sustained exposure; this is an interpretation rather than an isolated causal mechanism.

In a smaller analysis using six texts and ten survey topics, masking the top 10–200 semantically relevant sentences does not consistently eliminate shifts, and concatenating those sentences does not consistently reproduce full-text effects. This supports a role for broader framing, without establishing its precise mechanism. Stated and behavioral shifts are not interchangeable: Gemini's reading behavior shifts exceed its stated shifts, for example.

## Limitations

The study covers limited domains, seeds, model versions, and four activity types. Selected initial-disagreement examples are not a representative sample of ordinary interactions. Synthetic actions and model-judged stances are proxies for deployed behavior. Effects are measured immediately; persistence after context removal or across sessions remains untested. Sentence similarity is an imperfect measure of informational relevance, and mechanisms remain unresolved.

The supplied Markdown does not state a publication year or stable paper identifier. Its setup paragraph reverses open/closed model labels relative to its tables, and the reading cap is described in words while the length analysis uses tokens. The summary retains table-specific results without assuming these descriptions are equivalent.

## Related Concepts

- [[concepts/context-induced-belief-shifts|Context-Induced Belief Shifts]]: changes in responses and actions under accumulated context.
- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: expressed positions depend on the elicitation setting.
- [[concepts/persistent-sycophancy|Persistent Sycophancy]]: distinct evidence is needed for durable memory-mediated changes across sessions.

## Related Papers

- [[papers/selective-agreement-not-sycophancy-investigating-opinion-dynamics-in-llm-interactions|Selective agreement, not sycophancy]] studies opinion transitions in pairwise LLM debates; this paper additionally tests reading and research and separates stated positions from action proxies.

Source: Cognitio parsed Markdown, job `8af82188-b83f-4d98-9f78-015c8ebb8ee8`. [Project website](https://lm-belief-change.github.io/) · [Code](https://github.com/JiayiGeng/lm-belief-change).
