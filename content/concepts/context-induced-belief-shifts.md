---
title: Context-Induced Belief Shifts
type: concept
aliases:
  - Contextual Belief Drift
definition: Changes in a language model's expressed positions or stance-implying actions after conversation or reading material accumulates in its context, measured relative to an initial response under a specified protocol.
tags:
  - llm-evaluation
  - context-accumulation
  - belief-shift
---

## Overview

Context-induced belief shifts describe changes in observable model responses after exposure to additional text. They can arise during deliberate persuasion or during reading and research without an explicit request to adopt a position. The term operationalizes output behavior; it does not establish human-like belief or lasting parameter change.

## Key Ideas

- **Separate stance from action.** A binary answer, a numerical agreement rating, and a tool selection measure different outcomes and can shift by different amounts.
- **Specify the exposure.** Conversation rounds, text length, source orientation, summarization, and task instructions define the conditioning context.
- **Distinguish change from persuasion success.** A flip need not demonstrate better reasoning or movement toward a justified conclusion. Signed ratings require an explicit reference direction.
- **Separate immediate adaptation from persistence.** Reassessment with accumulated context does not establish survival after its removal or storage in durable memory.
- **Treat framing mechanisms as hypotheses.** Topic-relevant sentence ablations can probe exposure effects, but embedding similarity alone does not isolate causal informational content.

## Important Papers

- [[papers/accumulating-context-changes-the-beliefs-of-language-models|Accumulating Context Changes the Beliefs of Language Models]] compares debate, persuasion, reading, and research, documenting immediate changes in stated positions and action proxies with partially divergent magnitudes.

## Related Concepts

- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]] concerns elicitation-dependent political positions; accumulated context is a separate source of response variation.
- [[concepts/ai-sycophancy|AI Sycophancy]] concerns alignment with a user's expressed view; reading-induced shifts need not involve user-directed agreement.
- [[concepts/persistent-sycophancy|Persistent Sycophancy]] requires durable state and later reuse, beyond an immediate context effect.
- [[concepts/llm-political-persuasion|LLM Political Persuasion]] measures influence on human attitudes rather than changes in the model's own outputs.
