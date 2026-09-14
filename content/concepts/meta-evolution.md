---
title: Meta-Evolution
type: concept
aliases:
  - Trainable Improvers
tags:
  - ai-for-ai
  - meta-evolution
  - llm-agents
---

## Overview

Meta-evolution returns experience from an evolutionary search process to the model that proposes future modifications. Candidate programs improve through execution and selection, while training updates the generator's ability to produce useful changes. The distinction is whether the improver learns from those trajectories, beyond changes to the candidate population or its external memory.

## Key Ideas

- AI for AI names the target activity: AI systems participate in building or improving AI artifacts. Evolution names a feedback-driven optimization process; meta-evolution additionally trains the proposer from that process.
- A shared operator interface can connect training to inference. Frontis-MA1 learns Draft, Improve, Debug, and Crossover as local program transformations that an external controller composes during [[concepts/experience-guided-program-evolution|experience-guided program evolution]].
- Verified complete programs and useful revisions provide complementary supervision. Execution-grounded RL can then favor stronger candidates under task-specific scores.
- Model learning and harness improvements require separate evaluation. Holding the harness fixed tests a model change; holding the model fixed tests a search change.
- Sustained recursive self-improvement is a stronger claim: upgraded systems must repeatedly improve the process producing their successors. One post-training pipeline followed by better search does not establish that loop.

## Important Papers

- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: connects executable MLE experience, operator training, and evolutionary inference; Sections 2 and 8 distinguish this contribution from full recursive self-improvement.
- Jiang et al. (2026), "Self-Improving Agents in the Era of Experience: A Survey of Self- to Meta-Evolution," cited by Frontis-MA1 for its conceptual framing.

## Related Concepts

- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]
- AI for AI
- Recursive self-improvement
- Execution-grounded post-training
