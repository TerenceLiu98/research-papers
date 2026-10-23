---
title: Regularized Harness Evolution
type: concept
aliases:
  - Regularized Agent Harness Evolution
tags:
  - llm-agents
  - agent-harnesses
  - program-search
  - regularization
  - evaluation
---

## Overview

Regularized harness evolution improves an agent's editable prompts, control flow, tools, memory, skills, and context management while constraining how repeated benchmark feedback becomes persistent code. It addresses adaptive overfitting: when many proposals are generated and selected against the same finite task set, apparent progress can come from benchmark-specific rules, evaluation noise, or unjustified resource growth rather than transferable mechanisms.

## Key Ideas

- **Regularize the search trajectory, not the component vocabulary.** The harness remains broadly editable while proposal and acceptance rules limit how finite feedback steers successive versions.
- **Anneal edit cardinality.** Larger early updates permit coordinated discovery; later candidates approach single, attributable edits. This is an update-sparsity constraint, not conventional parameter regularization.
- **Preserve positive and negative evidence.** Cross-round records connect hypotheses and component types to diffs, score changes, cost changes, and acceptance outcomes, reducing repeated tests of rejected mechanisms.
- **Explore structurally when progress stalls.** Reserved proposals can exercise underused component types instead of repeatedly rewriting the same prompt surface.
- **Screen before scoring.** A leakage critic rejects task names, answers, task-specific values, and inert machinery before they can receive an inflated evolve-set score.
- **Use non-compensatory acceptance.** A noise-adjusted performance floor prevents sequences of small regressions, while cost ceilings and domain guards stop score gains from automatically compensating for excessive inference or degraded execution validity.
- **Prune persistent complexity.** Components without recent positive evidence become deletion targets, so mechanisms must continue to justify their place in the retained harness.
- **Measure transfer and cost together.** Evolve-set score is insufficient evidence; unchanged held-out execution and policy-token use test whether the retained mechanisms are reusable and operationally justified.

## Important Papers

- [[papers/rrsi-regularized-recursive-self-improvement-of-agent-harnesses|RRSI: Regularized Recursive Self-Improvement of Agent Harnesses]]: introduces proposal- and selection-side regularization for open-ended harness edits. Across its reported evaluations, smaller evolve-set gains accompany stronger held-out transfer and lower cost than unregularized evolution.
- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: constrains repairs to trace-implicated code and rolls back updates that regress on a held-out gate, a local alternative for controlling harness growth.
- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]]: uses private held-out grades to accept harness rewrites, illustrating both empirical scaffold evolution and the attribution challenges of nested evaluation.

## Related Concepts

- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/trace-local-program-growth|Trace-Local Program Growth]]
- [[concepts/objective-hacking|Objective Hacking]]
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]
