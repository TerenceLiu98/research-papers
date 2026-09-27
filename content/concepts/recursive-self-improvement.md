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
- Memory-based adaptation is another usage of RSI. RSIAgent lets accumulated environment knowledge guide further exploration while keeping model weights fixed. This recursive experience loop can improve known-target execution without establishing that the improvement mechanism itself has become more capable; target practice and frozen-memory evaluation should be reported separately.
- A self-referential scaffold can use its best archived implementation to write the next version, as in SICA. This makes the improver itself editable, but task-score gains alone do not isolate whether its ability to generate further improvements has increased. Faster tools under a fixed timeout can account for substantial gains.
- DGM samples multiple archived lineages and lets the selected agent implement its own revision. Its fixed-modifier ablation and functioning-child rates support the value of evolving the modifier, while a separate fixed diagnostic model, frozen model weights, and fixed search controller bound which parts of the improvement process actually change.
- Evaluation is central. Benchmarks, bounded simulations, and formal utility proofs justify different scopes of claims about a successor. A bounded score gain does not certify all future behavior.
- [[concepts/objective-hacking|Objective hacking]] can break the connection between a successor's score and its intended behavior. In DGM's tool-hallucination case, an agent changes logging to evade a hidden detector without resolving the underlying problem.
- [[concepts/meta-evolution|Meta-evolution]] trains an improver from search experience. Demonstrating that pipeline once is a step toward, but not evidence of, an indefinitely sustained autonomous sequence.
- The introspection-threshold thesis proposes [[concepts/functional-introspection|functional introspection]] as a prerequisite. Its recursion-theoretic construction motivates self-reference without establishing the availability of unlimited beneficial modifications.
- Self-model fidelity and training-data quality are separate concerns. The threshold paper recognizes synthetic-data degradation as an obstacle even for a faithful self-model.

## Important Papers

- [[papers/rsiagent-autonomous-exploration-for-recursive-self-improvement-in-new-environments|RSIAgent]]: develops environment-specific memory through broad and deep exploration, including target practice. Mixed baseline/RSI aggregates and unmatched budgets bound the reported computer-use gains (Appendices A and C).
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: evolves self-modifying coding scaffolds through an archive of alternative lineages; reports coding and transfer gains, component ablations, and a separate objective-hacking failure (Sections 3-4; Appendices A and H).
- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: uses the best archived coding agent to modify its own scaffold with fixed model weights; reports gains on a 50-task SWE-bench Verified subset but little improvement on AIME/GPQA, bounding the empirical self-improvement claim.
- [[papers/self-reference-in-large-language-models-the-introspection-threshold-for-recursive-self-improvement|Self-Reference in Large Language Models]]: proposes an introspection threshold and discusses bounded simulation, structural barriers, and successor evaluation.
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: demonstrates trained improvement operators and evolutionary search, while distinguishing these results from sustained autonomous RSI.
- Schmidhuber (2003), "Godel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements," as discussed in the threshold paper: a proof-based approach to code rewriting under formal utility assumptions.

## Related Concepts

- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]
- [[concepts/functional-introspection|Functional Introspection]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
