---
title: Recursive Self-Improvement
type: concept
aliases:
  - RSI
tags:
  - recursive-self-improvement
  - ai-for-ai
  - llm-agents
---

## Overview

Recursive self-improvement concerns a system improving the mechanisms by which it produces further improvements. Better task outputs, revised prompts, or stronger candidate programs alone do not establish this stronger process. Evidence must connect changes in the improver to the ability of successive systems to generate further gains.

## Key Ideas

- Distinguish self-modification from improvement under a fixed optimizer, and both from improvement of the optimization mechanism itself. The reviewed threshold paper calls the latter strong RSI.
- Specify the system boundary. Revising agent scaffolding leaves the underlying model unchanged unless its parameters or training process are also accessible; improving an external artifact is another distinct target.
- Evaluation is central. Benchmarks, bounded simulations, and formal utility proofs justify different scopes of claims about a successor. A bounded score gain does not certify all future behavior.
- [[concepts/meta-evolution|Meta-evolution]] trains an improver from search experience. Demonstrating that pipeline once is a step toward, but not evidence of, an indefinitely sustained autonomous sequence.
- The introspection-threshold thesis proposes [[concepts/functional-introspection|functional introspection]] as a prerequisite. Its recursion-theoretic construction motivates self-reference without establishing the availability of unlimited beneficial modifications.
- Self-model fidelity and training-data quality are separate concerns. The threshold paper recognizes synthetic-data degradation as an obstacle even for a faithful self-model.

## Important Papers

- [[papers/self-reference-in-large-language-models-the-introspection-threshold-for-recursive-self-improvement|Self-Reference in Large Language Models]]: proposes an introspection threshold and discusses bounded simulation, structural barriers, and successor evaluation.
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: demonstrates trained improvement operators and evolutionary search, while distinguishing these results from sustained autonomous RSI.
- Schmidhuber (2003), "Godel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements," as discussed in the threshold paper: a proof-based approach to code rewriting under formal utility assumptions.

## Related Concepts

- [[concepts/functional-introspection|Functional Introspection]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
