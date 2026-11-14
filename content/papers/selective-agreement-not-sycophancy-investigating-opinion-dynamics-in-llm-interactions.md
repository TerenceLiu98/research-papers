---
title: "Selective agreement, not sycophancy: investigating opinion dynamics in LLM interactions"
type: paper
authors:
  - Erica Cau
  - Valentina Pansanella
  - Dino Pedreschi
  - Giulio Rossetti
year: 2025
doi: 10.1140/epjds/s13688-025-00579-1
tags:
  - opinion-dynamics
  - llm-agents
  - persuasion
  - logical-fallacies
---

## TL;DR

LODAS simulates pairwise debates about the Ship of Theseus with Mistral and Llama agents. Opinions concentrate into a few states, usually favoring agreement with the statement, through asymmetric acceptance and rejection rather than indiscriminate imitation. Classifier-labeled fallacious arguments frequently precede opinion changes; this association does not isolate a causal effect of fallaciousness.

## Research Question

How do language-mediated interactions generate collective opinion patterns, how sensitive are those patterns to initial distributions and statement framing, and how do models differ in producing and responding to logical fallacies?

## Motivation

Classical [[concepts/opinion-dynamics|Opinion Dynamics]] models abstract away argument content. A philosophical paradox without an agreed factual answer lets the authors examine persuasion without a predetermined scientific truth attracting agents toward consensus.

## Contributions

- Introduces LODAS, a language-driven agent simulation connecting conversations to discrete opinion trajectories.
- Identifies directional acceptance–rejection asymmetry across initial population configurations.
- Links automatically classified argument fallacies to subsequent opinion changes and compares two model families.

## Method

AutoGen agents hold opinions from 0 (strongly disagree) to 6 (strongly agree). Random pairs take Opponent and Discussant roles: the Opponent argues its current stance, and the Discussant declares acceptance, rejection, or ignoring. Only the Discussant can change its numeric opinion, by −1, 0, or +1. Thus language determines responses within an imposed discrete update structure.

The experiment uses 140 agents, 30 iterations with 140 pairwise interactions per iteration, and 10 independent runs per setting. Crossing Mistral-7B-Instruct and Llama-3-8B with two statements (the ship remains the same or becomes different) and three initial distributions (balanced, polarized, unbalanced) gives 12 settings. All agents can interact with one another.

Analysis measures opinion distributions, transition matrices, entropy, effective cluster counts, and acceptance conditional on signed distance between opinions. A matched random-transition baseline is compared using cellwise Welch tests at p < 0.05. A DistilBERT classifier trained on LOGIC labels arguments using 13 fallacy categories.

## Experiments

Section 2 reports concentration around one or two dominant opinions. Mistral converges more strongly toward agreement; Llama under the “different ship” framing instead ends predominantly at mild disagreement. Initial distributions have comparatively transient effects.

For Mistral, acceptance exceeds 60% when the Opponent is more agreeable toward the statement and falls to roughly 20% when it is less agreeable. Always-accept and always-reject toy models help distinguish selective influence from indiscriminate acceptance. This operational test addresses one form of [[concepts/ai-sycophancy|AI Sycophancy]], not every form of user-directed validation.

Selected balanced-condition results from Tables 2–3:

| Model and framing | Opponent statements labeled fallacious | Discussants changing opinion after fallacious statements |
| --- | ---: | ---: |
| Llama, same ship | 20.87% | 64.90% |
| Llama, different ship | 23.39% | 71.40% |
| Mistral, same ship | 19.01% | 53.79% |
| Mistral, different ship | 19.31% | 55.29% |

Across all conditions, labeled fallacy prevalence ranges from 15.56% to 26.83%. Opinion changes include movement in either direction and should not all be interpreted as successful persuasion toward the Opponent.

## Limitations

Only two small models and one English-language philosophical topic are studied. Agents lack heterogeneous personalities and demographics; random mixing omits realistic network structure. No comparison with human trajectories establishes behavioral realism. Fallacy labels depend on an automated classifier, and observed subsequent changes do not establish that fallacies themselves caused persuasion.

The source contains reporting tensions: Section 2.1 rejects bounded confidence as a general explanation, while the conclusion describes Llama as exhibiting a form of bounded confidence. Table-specific results above preserve this distinction rather than resolving it by assumption. The stated 12,600 Opponent statements per run also differs from the 4,200 pairwise interactions implied by the methods; totals should be checked against implementation before reuse.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/ai-sycophancy|AI Sycophancy]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]

## Related Papers

- [[papers/opinion-dynamics-and-mutual-influence-with-llm-agents-through-dialog-simulation|Opinion dynamics and mutual influence with LLM agents through dialog simulation]] fits classical influence models to generated dialogs; LODAS instead examines conditional acceptance and argument content.

[Published paper](https://doi.org/10.1140/epjds/s13688-025-00579-1). Source: Cognitio parsed Markdown, job `26a668cd-a209-493a-b1c5-7d1ec93c2c36`.

[[index|Library home]]
