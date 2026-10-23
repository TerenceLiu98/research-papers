---
title: Statistical Acceptance Gates
type: concept
aliases:
  - Statistical Edit Acceptance
  - Regression-Aware Acceptance Gates
tags:
  - llm-agents
  - self-evolving-agents
  - statistical-testing
  - regression-control
  - model-selection
---

## Overview

A statistical acceptance gate decides whether an adaptively proposed change should replace an incumbent system using comparative evidence and an explicit uncertainty threshold. In self-evolving agents, the change may be an edit to a persistent skill, prompt, or harness. The gate separates proposal quality from commit quality: a strong optimizer can still produce candidates whose apparent validation gains come from noise or from trading away behavior the incumbent already performs correctly.

## Key Ideas

- **Compare candidates item by item.** Evaluating incumbent and candidate on identical items exposes wins and regressions that an aggregate score collapses into one number.
- **Treat discordant outcomes as the evidence.** Items both systems solve or both miss do not distinguish them; candidate-only successes and incumbent-only successes form a paired ledger.
- **Price regressions explicitly.** A weighted gain can make breaking an already-solved item cost more than solving a previously missed one, while a separate cap limits the fraction of incumbent successes that may be lost.
- **Require evidence beyond a positive point estimate.** A one-sided paired test can reject edits whose apparent advantage is compatible with finite-sample noise. Abstention preserves the incumbent when evidence is insufficient.
- **Control the scope of the guarantee.** A valid test for one incumbent-candidate comparison does not automatically control false commits across an adaptive sequence that repeatedly reuses validation data.
- **Match the statistic to the verifier.** Exact binomial or McNemar-style tests fit binary outcomes; continuous or graded outcomes require statistics that retain magnitude information.
- **Keep boundary behavior explicit.** A conservative gate should state when its constraints reduce to the underlying score-improvement rule, making the cost of additional safeguards interpretable.

## Important Papers

- [[papers/sage-a-statistical-acceptance-gate-for-self-evolving-agents|SAGE: A Statistical Acceptance Gate for Self-Evolving Agents]]: compares skill edits through paired wins and regressions, uses an asymmetric exact conditional binomial test plus a regression cap, and reports lower regression in 19 of 20 evaluated settings.
- [[papers/rrsi-regularized-recursive-self-improvement-of-agent-harnesses|RRSI: Regularized Recursive Self-Improvement of Agent Harnesses]]: uses noise, leakage, cost, and validity checks in a broader regularized harness-evolution process rather than a single paired hypothesis test.
- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: applies held-out rollback as a practical acceptance safeguard for localized harness changes.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/regularized-harness-evolution|Regularized Harness Evolution]]
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]
- [[concepts/objective-hacking|Objective Hacking]]
