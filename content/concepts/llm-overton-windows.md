---
title: LLM Overton Windows
type: concept
aliases:
  - Political Overton Windows of Large Language Models
tags:
  - political-ideology
  - llm-evaluation
  - political-bias
---

## Overview

An LLM Overton Window is an operational map of the political positions a language model expresses under a specified family of elicitation prompts. Unlike a default ideological score, the window represents a region of induced outputs: its center, shape, and area can distinguish a model's usual response from the broader range of positions it will articulate.

## Key Ideas

- **Defaults and expressive range are different.** A model can default to one part of an ideological space while producing arguments across a much broader region when assigned other roles.
- **The window is protocol-dependent.** Survey items, personas, prompt wording, decoding settings, refusal handling, response scoring, and the geometry used to join elicited points all affect the estimated boundary.
- **Coverage is not endorsement.** Producing an argument under role prompting does not establish a model's belief or approval. Conversely, failure to match a requested persona can reflect refusal, weak role fidelity, limited task performance, or alignment constraints.
- **Area hides location.** Two windows can cover the same percentage of an ideological space while occupying different quadrants. Report shape and position alongside area.
- **Boundaries require uncertainty analysis.** A window estimated from one deterministic response per prompt is a snapshot rather than a stable frontier. Repeated sampling and prompt variation are needed to characterize boundary uncertainty.

## Important Papers

- [[papers/pow-political-overton-windows-of-large-language-models|POW: Political Overton Windows of Large Language Models]] adapts the Overton Window to persona-conditioned Political Compass responses from a multi-provider model panel.
- Azzopardi and Moshfeghi (2024), "PRISM: A methodology for auditing biases in large language models": introduces the indirect essay-based elicitation protocol used by POW.

## Related Concepts

- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: positions expressed by a model depend on the role and elicitation context.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the selected axes determine which distinctions the window can represent.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: an automated assessor can translate essays into survey responses, but its validity must be established separately.
