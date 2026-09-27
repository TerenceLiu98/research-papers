---
title: Execution-Validity Rewards for Tool Learning
type: concept
tags:
  - tool-learning
  - reinforcement-learning
  - reward-design
---

## Overview

Execution-validity rewards train an agent to generate tool calls that reference available functions and satisfy their input requirements. They offer checkable feedback when an open-ended task lacks a unique reference answer. Executability measures whether an action is admissible; it does not by itself establish that the action is useful or that its result answers the scientific question.

## Key Ideas

- **Ground checks in tool contracts:** Function registries, structured argument schemas, and domain validators can reject nonexistent tools, missing arguments, incorrect types, or unreadable structures. The strength of the reward depends on what the validator actually checks.
- **Distinguish validity from outcomes:** A call may execute successfully but use unsuitable scientific assumptions or return an irrelevant result. Outcome evaluation and physical validation answer questions that syntax checks leave open.
- **Recognize auxiliary proxies:** Mat-T1 combines call validity with rewards for interaction turns, reasoning length, and output ordering. These encourage particular process shapes without directly scoring final-answer accuracy.
- **Inspect incentive limits:** Rewarding more turns or longer explanations can favor unnecessary work. A validity reward alone does not eliminate reward gaming; interpretation should stay within the properties checked by the implementation.
- **Keep failure observations available:** Execution errors and incomplete results can support correction in a cyclic controller, provided later decisions receive them rather than only a scalar reward.

## Important Papers

- [[papers/a-collaborative-agent-with-two-lightweight-synergistic-models-for-autonomous-crystal-materials-research|A collaborative agent with two lightweight synergistic models for autonomous crystal materials research]]: Section 4.3.3 defines Mat-T1's weighted reward over turns, reasoning length, format, and valid tool calls, without an explicit final-answer accuracy term.
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]] provides a useful contrast: executable programs receive measured task scores, and the authors report reward-hacking attempts despite execution-based evaluation. This is a library comparison, not a citation relationship between the papers.

## Related Concepts

- [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|Decoupled Scientific Reasoning and Tool Orchestration]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
