---
title: Adaptive Test-Time Reasoning Routing
type: concept
aliases:
  - Query-adaptive reasoning routing
  - Adaptive inference routing
tags:
  - llm-reasoning
  - test-time-compute
  - routing
  - adaptive-computation
---

## Overview

Adaptive test-time reasoning routing allocates inference computation per query rather than applying the same reasoning recipe to every input. A routing policy can choose a reasoning protocol, request parallel candidates, compose specialized stages, and stop once a validity or confidence condition is met. The aim is to improve accuracy subject to an expected token, latency, or monetary budget.

This is a form of [[concepts/adaptive-computation|Adaptive Computation]] at the protocol level. The routed units may be prompts, reasoning formats, tools, agents, or [[concepts/language-symbolism-frameworks|Language Symbolism Frameworks]]; the essential feature is that realized computation depends on the query and intermediate history.

## Key Ideas

- **Modes of allocation:** Easy inputs can use one direct call, ambiguous inputs can use parallel proposals and aggregation, and difficult inputs can receive staged composition or iterative refinement.
- **Empirical profiles:** Routing benefits from compact metadata about each candidate protocol's accuracy, token footprint, applicable domains, and failure modes.
- **Early stopping:** A bounded policy checks answer parsing, schema validity, domain constraints, agreement, or confidence after each call and avoids unnecessary later rounds.
- **Budgeted control:** With finite actions and horizon, routing and stopping can be formulated as a constrained Markov decision process. Scalarized accuracy-minus-cost objectives select supported points on the attainable frontier.
- **Complete accounting:** Evaluation should include router, intermediate, aggregation, and solver outputs. Input prefixes, cache behavior, external execution, and offline search costs require separate accounting when the deployment claim concerns total cost.
- **Calibration risk:** A router can under-allocate computation to hard examples or waste budget on easy ones. Strong aggregate results therefore do not establish that its difficulty judgments are calibrated.

## Important Papers

- [[papers/when-llms-develop-languages-symbolic-communication-for-efficient-multi-agent-reasoning|When LLMs Develop Languages: Symbolic Communication for Efficient Multi-Agent Reasoning]] routes among single, aggregate, and composed symbolic-language protocols with adaptive stopping.
- Wang et al. (2023), "Plan-and-Solve Prompting," separates planning from solution generation but uses a fixed natural-language prompting strategy.
- Wang et al. (2025), "Self-Consistency Improves Chain of Thought Reasoning," allocates parallel samples and aggregates them, representing one non-adaptive or partially adaptive routing primitive.
- Yao et al. (2023), "Tree of Thoughts," expands and evaluates multiple reasoning branches, trading additional test-time computation for robustness.

## Related Concepts

- [[concepts/adaptive-computation|Adaptive Computation]] is the broader principle of varying compute according to an input or evolving state.
- [[concepts/language-symbolism-frameworks|Language Symbolism Frameworks]] are one class of reusable experts that a reasoning router can select or compose.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]] provide parallel roles or candidate generators that routing policies can coordinate.
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]] addresses the related problem of selecting models by joint quality and resource criteria.
