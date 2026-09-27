---
title: Environment-Grounded Agent Memory
type: concept
tags:
  - agent-memory
  - llm-agents
  - computer-use
  - autonomous-exploration
---

## Overview

Environment-grounded agent memory retains procedures, constraints, and failure lessons derived from interaction with software or other executable environments. A fixed-weight model can adapt by consulting and revising this persistent knowledge across attempts. Grounding means that entries refer to observed outcomes and applicable conditions; an evaluator's acceptance alone does not establish that a remembered rule is generally correct.

## Key Ideas

- Separate temporary interaction history from durable knowledge. Memory can contain reusable scripts, application conventions, unsuccessful approaches, and artifact checks that remain available after an environment reset.
- Make experience selection depend on uncertainty. RSIAgent first explores diverse prerequisites and variants, then selects focused practice around failures or uncertain successes. Target-conditioned exploration and practice on the exact target must be distinguished from learning for unseen tasks.
- Separate execution, verification, and consolidation authority. RSIAgent's verifier inspects candidate evidence independently, while the actor that produced the experience writes and reconciles memory. Separate contexts reduce shared information but do not guarantee correct judgments.
- Preserve failures and their conditions. A rejected attempt can teach a useful lesson without becoming a successful precedent. New evidence should revise contradicted advice, rather than merely append another episode.
- Coordinate parallel acquisition explicitly. RSIAgent gives parallel projects a common immutable memory snapshot, then reconciles their updates sequentially against the latest canonical memory. This preserves a defined update order while collecting diverse experience concurrently.
- Distinguish a local verdict from the official task score. A verifier can accept an artifact that still misses a scoring requirement; unsupported memory updates may then propagate the error into later practice.
- Freeze memory to measure reuse. Resetting the environment, disabling writeback, and checking memory integrity separate final execution from ongoing learning. These controls do not remove prior target exposure or unequal exploration budgets.
- Evaluate applicability as well as recall. RSIAgent's case studies show agents checking current artifact identity, layout, and native application settings before applying retained procedures. Such checks bound a lesson's scope without proving general causal validity.

## Important Papers

- [[papers/rsiagent-autonomous-exploration-for-recursive-self-improvement-in-new-environments|RSIAgent]]: combines broad and deep exploration with actor-owned memory reconciliation and frozen-memory evaluation. Appendices A-B specify role boundaries; Section 4.6 documents how weak verification and overgeneralized memory interact. Its reported gains concern target-conditioned runs and mixed benchmark aggregates.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: memory can guide subsequent learning without changing the learning mechanism itself.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: similarly uses retained outcomes to guide future proposals, but searches over executable candidate programs.
