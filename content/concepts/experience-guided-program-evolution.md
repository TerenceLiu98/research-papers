---
title: Experience-Guided Program Evolution
type: concept
tags:
  - program-search
  - llm-agents
  - agent-memory
  - machine-learning-engineering
---

## Overview

Experience-guided program evolution searches over executable programs while using accumulated outcomes to choose parents and construct revision context. A language model proposes changes, an evaluator measures their results, and structured records preserve evidence for later selection, repair, and recombination. The model can remain fixed during this inference process; training it from the resulting experience adds [[concepts/meta-evolution|meta-evolution]].

## Key Ideas

- Separate evidence storage from generated summaries. Deterministic records preserve scores, failures, ancestry, method families, and resource use; natural-language summaries interpret retrieved evidence when an operator needs it.
- Current score is only one selection signal. OpenMLE-Evo also considers positive gain over the strongest parent and underexplored method families, using stochastic selection to keep promising alternatives available.
- Match context to the transformation. Improve benefits from ancestors and siblings, Crossover from complementary branches, and Debug from attempts with related errors.
- Bounded retrieval and cached summaries prevent growing histories from being replayed on every call. Failures remain useful evidence about approaches to avoid or repairs to reuse.
- Distinguish training-time state selection from inference-time search. Frontis-MA1's training selector uses reward, child-reward variance, and visit cooling; OpenMLE-Evo's inference selector uses quality, progress, and novelty.
- Evaluate both final outcomes and resource use. Validation gains per token describe search productivity, while held-out evaluation tests whether the selected programs generalize. A full-harness comparison does not isolate the benefit of any one memory or selection component.

## Important Papers

- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: OpenMLE-Evo instantiates structured experience cards, a task-global board, three-factor parent selection, and lazy operator-specific memory (Section 5; Appendix C).
- Jiang et al. (2025), "AIDE: AI-Driven Exploration in the Space of Code" (arXiv:2502.13138), and Toledo et al. (2025), "AI Research Agents for Machine Learning: Search, Exploration, and Generalization in MLE-Bench" (arXiv:2507.02554): cited predecessors for executable program search.

## Related Concepts

- [[concepts/meta-evolution|Meta-Evolution]]
- Evolutionary search
- Agent memory
- Inference-time compute allocation
