---
title: Evidence-Conditioned Agent Communication
type: concept
aliases:
  - Evidence-Gated Agent Communication
tags:
  - llm-agents
  - multi-agent-systems
  - agent-communication
  - evidence-verification
---

## Overview

Evidence-conditioned agent communication uses checkable evidence, rather than message arrival or stated confidence alone, to decide how one agent's answer should affect another's. A communication edge can keep the receiver's candidate, adopt the sender's candidate, or invoke a bounded revision according to the relative support for the two versions.

## Key Ideas

- **Bind evidence to candidate versions.** Test results, retrieval records, and other checks apply only to the artifact and environment version they evaluated. A revision creates a new version and must discard evidence that no longer applies.
- **Authenticate and deduplicate records.** Copying a result does not create an additional verification event, and a textual claim that a test passed is not equivalent to an authenticated test record.
- **Use an explicit decision rule.** CollabFlow compares coarse evidence levels with a margin: a decisive advantage causes adoption, a decisive disadvantage keeps the receiver, and an ambiguous difference triggers one bounded revision.
- **Separate topology from protocol.** A graph determines who can communicate; edge protocols determine whether exchange is final-only, one-way, or interactive and how many evidence gates can run.
- **Measure both correction and harm.** The same gate can repair an incorrect receiver or overturn a correct one. Evaluation should distinguish true adoption, false adoption, revision success, and revision error under the actual pair-selection process.
- **Bound stateful effects.** Read-only advisors can supply evidence and proposed next steps to one mutable executor. This controls conflicting writes but does not establish correctness or safety.

## Important Papers

- [[papers/collabflow-recursive-self-improvement-of-agent-collaboration|CollabFlow: Recursive Self-Improvement of Agent Collaboration]] introduces a version-filtered evidence gate and jointly learns communication protocols with team structure.
- Du et al. (2023), "Improving Factuality and Reasoning in Language Models through Multiagent Debate": studies iterative multi-agent debate without CollabFlow's version-bound evidence rule.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/collaborative-trajectory-balance|Collaborative Trajectory Balance]]
- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]
