---
title: LLM Political Persuasion
type: concept
tags:
  - political-persuasion
  - survey-experiments
  - human-ai-interaction
---

## Overview

LLM political persuasion concerns whether exposure to model-generated communication changes people's political attitudes or choices. It is distinct from classifying the ideology of the text itself. Causal evidence requires a comparison that separates exposure, advocacy direction, and other features of the interaction.

## Key Ideas

- **Separate expressed positions from assigned advocacy.** A model's questionnaire answers need not predict its conversational effect. System prompts that direct advocacy can change influence even when model identity is held fixed.
- **Distinguish natural, steered, neutral, and control conditions.** These comparisons address different questions: whether ordinary discussion moves attitudes, whether explicit steering amplifies influence, and whether balanced discussion differs from no interaction.
- **Define directional outcomes carefully.** A liberal intervention can lower a conservative-coded outcome while successfully persuading. Individual-arm odds ratios, between-direction contrasts, and percentage-point marginal effects are different quantities.
- **Preserve intention-to-treat interpretation.** Keeping assigned participants who never engage estimates the effect of assignment. Dropping silent conversations changes the estimand and is best reported as a sensitivity analysis.
- **Interpret nulls using intervals.** An interval excluding a preregistered meaningful effect constrains plausible magnitudes in that setting. It does not prove zero influence or establish formal equivalence without a specified equivalence test.
- **Separate immediate effects from persistence.** A post-chat policy choice does not establish durable beliefs, later voting, or effects of repeated exposure. Comparisons with campaign advertising need matched outcomes or an explicit qualification.
- **Qualify subgroup findings.** Moderator batteries require multiplicity control. Failure to detect moderation does not prove identical susceptibility across all groups.

## Important Papers

- [[papers/the-political-ideology-of-large-language-models-measurement-inconsistency-and-persuasive-influence|The Political Ideology of Large Language Models: Measurement, Inconsistency, and Persuasive Influence]]: in 1,523 U.S. participants, reports a pooled +3.5-point immediate alignment effect, an unsteered estimate of -0.2 points, and an explicit-minus-unsteered contrast of +10.6 points. These findings concern the tested models, topics, and short conversations.

## Related Concepts

- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: characterizes the political positions expressed under a measurement protocol.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: can classify conversational framing, but such labels do not measure human persuasion.
