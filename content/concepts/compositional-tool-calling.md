---
title: Compositional Tool Calling
type: concept
aliases:
  - Compositional Tool Use
  - Multi-Call Tool Use
tags:
  - tool-calling
  - language-model-agents
  - structured-prediction
  - workflow-execution
---

## Overview

Compositional tool calling is the construction of a multi-call solution in which a model must select functions, instantiate their arguments, and preserve the structure connecting the calls. A solution can be represented as a directed acyclic graph: nodes are function calls, while edges indicate that a later call consumes an earlier call's output. This separates call-set construction from dependency tracking and distinguishes compositional workflows from isolated API invocation.

## Key Ideas

- **Composition has more than one form.** Independent calls may execute in parallel and have no dependency edges. Sequential or nested workflows additionally constrain ordering and bind intermediate outputs to later arguments.
- **Candidate count is not call count.** In BFCL, the Multiple category supplies several candidate tools but requires one call. Parallel and Parallel-Multiple are the categories that require multiple generated calls.
- **Errors occur at node and edge levels.** A model can choose the wrong function, ground an argument incorrectly, emit too many or too few calls, order calls incorrectly, or reference the wrong intermediate output.
- **Benchmarks expose complementary structure.** API-Bank primarily tests individual API selection and argument grounding; BFCL tests function selection and independent call sets; NESTful tests explicit output-to-input dependencies in hierarchical workflows.
- **Additional latent computation can refine structure.** [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]] reports that recurrent depth helps multi-call and nested tasks more consistently than isolated calls, with examples of corrected call sets and dependency bindings.
- **Execution metrics complement structural matching.** Function and parameter scores can reward locally correct calls, while full-sequence matching and execution win rate test whether the complete workflow remains usable.

## Important Papers

- [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]]: formalizes tool solutions as call-and-dependency graphs and evaluates recurrent computation across isolated, parallel, and nested tool use.
- Basu et al. (2025), "NESTful: A Benchmark for Evaluating LLMs on Nested Sequences of API Calls": focuses on executable workflows whose later arguments consume earlier outputs.
- Patil et al. (2025), "Berkeley Function Calling Leaderboard": separates function selection, single calls, and independent parallel call sets.
- Li et al. (2023), "API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs": evaluates API selection and argument generation in conversational contexts.
- Kim et al. (2024), "An LLM Compiler for Parallel Function Calling": constructs dependency-aware execution graphs for sequential and parallel calls.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]: internal recurrent computation can refine a structured tool plan without externalizing every intermediate step.
- [[concepts/adaptive-computation|Adaptive Computation]]: a model can vary the computation used to produce tool calls according to prediction difficulty.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: shared blocks provide one mechanism for increasing computation without adding distinct parameters.
