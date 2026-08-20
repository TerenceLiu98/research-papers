---
title: LLM-Based Strategic Experimentation
type: concept
aliases:
  - LLM-Based Experiments
  - LLM Agents as Experimental Subjects
tags:
  - llm-agents
  - experimental-methods
  - strategic-interaction
  - computational-social-science
---

## Overview

LLM-based strategic experimentation uses language-model agents as participants in controlled games or simulated institutions. Researchers vary features of the strategic environment, record agent choices, and analyze generated private reasoning or public communication. The method is designed to probe mechanisms and generate hypotheses, not to treat model behavior as direct evidence about humans or organizations.

## Key Ideas

- Repeated runs make it possible to compare treatment conditions while holding prompts, action spaces, stopping rules, and logging procedures fixed.
- Model-generated reasoning and messages provide textual traces alongside behavior. These traces show which strategic arguments the model represents, but they are instructed outputs rather than transparent reports of cognition.
- Multiple model families and within-model treatment comparisons help separate general comparative patterns from model-specific behavioral tendencies.
- Reproducibility depends on preserving prompts, model identifiers, inference settings, parsing rules, raw outputs, and analysis code. Hosted models may still change over time.
- External validity is deliberately limited. A coherent response to incentives in an artificial game does not establish that people, states, or institutions would respond in the same way.
- [[Multi-Agent Strategic Games with LLMs]] illustrates the method by varying polarity, horizon knowledge, and communication in a repeated security dilemma.

## Important Papers

- [[Multi-Agent Strategic Games with LLMs]]
- Akata et al. (2025), ["Playing Repeated Games with Large Language Models"](https://doi.org/10.1038/s41562-025-02172-y).
- Rivera et al. (2024), ["Escalation Risks from Language Models in Military and Diplomatic Decision-Making"](https://doi.org/10.1145/3630106.3658942).
- Park et al. (2023), ["Generative Agents: Interactive Simulacra of Human Behavior"](https://doi.org/10.1145/3586183.3606763).

## Related Concepts

- Agent-based simulation
- Repeated games
- Experimental game theory
- Computational social science
- Multi-agent systems
