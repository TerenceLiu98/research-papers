---
title: Trace-Local Program Growth
type: concept
aliases:
  - Trace-Scoped Program Growth
tags:
  - llm-agents
  - agent-harnesses
  - program-search
  - continual-learning
---

## Overview

Trace-local program growth learns an executable agent controller from failures while restricting each repair to code implicated by the relevant execution traces. A bounded group of failures supplies joint supervision, and a held-out success gate rejects updates that damage earlier capability. The pattern is intended for repeated task families: recurring control becomes reusable code while an LLM remains available for task-dependent semantic decisions.

## Key Ideas

- **Start with low prior commitment.** A strategy-free scaffold exposes the task, model, and tool interfaces without committing to a complete task-solving loop. The fixed model and tools remain outside the learned harness.
- **Localize the edit surface.** A function-level execution DAG records harness calls, model calls, tools, returns, errors, and durations. The optimizer can modify the entry function and traced functions, add reusable helpers, and stay within an edit budget.
- **Repair failures jointly.** A bounded failure window keeps unresolved tasks active, re-traces them after accepted repairs, and retires tasks that exhaust their attempt budget. Joint windows encourage control shared across failures instead of task-specific patches.
- **Split deterministic control from semantic judgment.** Parsing, validation, state updates, query refinement, recovery, and stopping can be implemented as code; interpretation, synthesis, fuzzy comparison, and answer generation remain LLM-mediated when they require open-ended judgment.
- **Make acceptance transactional.** Held-out gate evaluation compares each candidate with the latest accepted checkpoint. Rollback restores code and training state when gate success falls, enforcing a success-first rule even when a candidate fixes active failures.
- **Measure reuse and cost together.** The learned harness should be evaluated on unseen tasks from the family and compared on model calls, context tokens, time, and online cost. Offline optimization cost and operational code-sandboxing requirements remain separate deployment concerns.

## Important Papers

- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: introduces Growing Harness and evaluates trace-local repair on BrowseComp-Plus and WebArena-Verified. Its reported ablations support contributions from function-level guidance, failure windows, and gate rollback, but the ablations are single-run results.

## Related Concepts

- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: the broader family of using execution outcomes to guide executable-program revisions; trace-local growth accumulates one harness rather than primarily selecting among archived parents.
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: stores reusable procedures and failure lessons in persistent memory, while trace-local growth compiles recurring control into the executable harness.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: trace-local harness adaptation can use fixed model weights and a fixed optimizer, so it should not be conflated with improving the mechanism that generates future improvements.
