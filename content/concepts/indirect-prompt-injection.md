---
title: Indirect Prompt Injection
type: concept
aliases:
  - Prompt Injection
  - Indirect Instruction Injection
tags:
  - llm-security
  - agent-security
  - prompt-injection
  - tool-use
---

## Overview

Indirect prompt injection occurs when attacker-controlled instructions are embedded in external content that an AI system later reads as part of a legitimate task. The content may come from a webpage, document, email, retrieval result, or tool response. The attack exploits the model's exposure to untrusted data rather than requiring the attacker to edit the user's direct instruction.

## Key Ideas

- **Separate trust domains.** A user task, tool definition, and retrieved or returned content may have different authority. Treating all text as equally directive makes instruction-data confusion possible.
- **Measure influence, not only final failure.** A fixed action may remain selected while malicious content shifts its probability or changes the model's margin between safe and unsafe actions.
- **Typed outputs do not remove the threat.** Restricting a model to declared actions limits the output space, but an attacker-target action can still be one of those declarations.
- **Evaluate the first security-critical decision.** Snapshot endpoints can isolate whether untrusted content changes an action choice without claiming that a complete harmful workflow was executed.
- **Test adaptive attackers.** If an attacker can observe scores or other feedback, fixed attack strings may underestimate the available attack surface. Screening outcomes should be separated from validation on fresh calls.
- **Preserve scope conditions.** Attack success depends on the model, action set, observation structure, benchmark, and validation rule. Associations such as small decision margins are not universal causal guarantees.

## Important Papers

- [[papers/decision-hijacking-prompt-injection-attacks-on-jevs-typed-probabilistic-decisions|Decision Hijacking: Prompt Injection Attacks on Jev's Typed Probabilistic Decisions]]: reconstructs 510 InjecAgent direct-harm cases as typed Jev decisions and measures probability shifts, target selection, and score-guided adaptive attacks.
- Zhan et al. (2024), "InjecAgent: Benchmarking indirect prompt injections in tool-integrated large language model agents": provides paired user tasks, attacker goals, tool-response templates, and attacker-target tools.
- Debenedetti et al. (2024), "AgentDojo: A dynamic environment to evaluate prompt injection attacks and defenses for LLM agents": evaluates attacks and defenses in stateful tool environments.
- Yi et al. (2025), "Benchmarking and defending against indirect prompt injection attacks on large language models": studies indirect prompt injection across tasks involving external content.
- Greshake et al. (2023), "Not what you've signed up for: Compromising real-world LLM-integrated applications with indirect prompt injection": documents the threat in LLM-integrated applications.
- Zhan et al. (2025), "Adaptive attacks break defenses against indirect prompt injection attacks on LLM agents": shows why defenses should also be evaluated against attacks adapted to observed behavior.

## Related Concepts

- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]]: restricts the available output actions but does not itself establish that untrusted content cannot influence selection.
- [[concepts/llm-assisted-web-retrieval|LLM-Assisted Web Retrieval]]: a common pathway through which external web content enters an LLM workflow.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: a structured evaluation setting where content, rubric, and output authority must also be distinguished.
