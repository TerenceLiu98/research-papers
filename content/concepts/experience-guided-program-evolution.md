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

Growing Harness is a related accumulation pattern: instead of selecting among an archive of candidate programs, it keeps one shared agent harness and uses failure traces to localize bounded repairs. Its failure-window curriculum and held-out gate are useful examples of combining reuse pressure with regression control.

## Key Ideas

- Separate evidence storage from generated summaries. Deterministic records preserve scores, failures, ancestry, method families, and resource use; natural-language summaries interpret retrieved evidence when an operator needs it.
- Current score is only one selection signal. OpenMLE-Evo also considers positive gain over the strongest parent and underexplored method families, using stochastic selection to keep promising alternatives available.
- DGM weights eligible parents by sigmoid-scaled task accuracy and the inverse of one plus their functioning-child count. It archives functioning agents even after score declines, preserving lineages that may enable later gains. This underexploration bonus does not directly measure behavioral diversity; its greedy-parent ablation tests the value of retaining alternative branching opportunities.
- DGM-H moves the sigmoid midpoint to the average score of the archive's top three agents and evolves the meta agent's revision procedure alongside the task agent. Its transfer selection scores ancestors by average descendant gains discounted by lineage distance, distinguishing good stepping stones from merely high-scoring candidates. Editable outer selection is tested separately and does not significantly outperform the handcrafted strategy.
- The evolving program can also be the improver. SICA selects the best archived agent using accuracy, cost, and time, then asks that version to revise its own code. Its retained failures inform future proposals, although the authors observe path dependence in which early ideas constrain later exploration.
- Match context to the transformation. Improve benefits from ancestors and siblings, Crossover from complementary branches, and Debug from attempts with related errors.
- Bounded retrieval and cached summaries prevent growing histories from being replayed on every call. Failures remain useful evidence about approaches to avoid or repairs to reuse.
- Treat repair advice as a hypothesis with a history. SOCIA-EVO links strategies to explicit metrics, estimates reliability from success/failure counts, and combines reliability with severity and backlog urgency in token-budgeted knapsack retrieval. Shared metric changes do not isolate the causal contribution of each strategy.
- Keep task constraints separate from changing repair memory. SOCIA-EVO retains a fixed, expert-reviewed specification while updating its Playbook; numerical calibration within each candidate structure reduces, but does not eliminate, confusion between parameter error and structural error.
- Distinguish training-time state selection from inference-time search. Frontis-MA1's training selector uses reward, child-reward variance, and visit cooling; OpenMLE-Evo's inference selector uses quality, progress, and novelty.
- Evaluate both final outcomes and resource use. Validation gains per token describe search productivity, while held-out evaluation tests whether the selected programs generalize. A full-harness comparison does not isolate the benefit of any one memory or selection component.
- Trace-localize repairs when the evolving artifact is one shared harness. Function-level execution traces can constrain the edit surface, while a bounded failure window supplies joint supervision and a held-out gate can roll back a repair sequence that harms prior success.

## Important Papers

- [[papers/hyperagents|HyperAgents]]: combines archive exploration with editable revision procedures and lineage-based transfer selection. Joint paper-review and robotics search supplies modifiers that transfer to math grading; the main parent-selection controller remains fixed (Appendices A.2, D.4, and E.5).
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: combines log-informed self-modification with stochastic archive selection; lower-scoring ancestors appear in successful lineages, and a greedy-parent ablation performs worse in the reported setting (Section 4.4; Appendices A.3 and C).
- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: archives agent versions and benchmark traces to guide scaffold revisions; utility combines task score with resource use, so reported improvements depend on the evaluation budget (Sections 3-5.1).
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]]: OpenMLE-Evo instantiates structured experience cards, a task-global board, three-factor parent selection, and lazy operator-specific memory (Section 5; Appendix C).
- [[papers/socia-evo-automated-simulator-construction-via-dual-anchored-bi-level-optimization|SOCIA-EVO]]: a metric-linked repair Playbook supports simulator evolution. Reported recurrence decreases across iterations, but the Llama backbone experiment shows that avoiding old errors does not guarantee accurate final programs (Section 3.4; Appendix A.5).
- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: grows one agent harness from a strategy-free scaffold using function-level failure traces, a bounded repair window, and success-first gate rollback. It complements archive-based evolution with local continual repair within a task family.
- Jiang et al. (2025), "AIDE: AI-Driven Exploration in the Space of Code" (arXiv:2502.13138), and Toledo et al. (2025), "AI Research Agents for Machine Learning: Search, Exploration, and Generalization in MLE-Bench" (arXiv:2507.02554): cited predecessors for executable program search.

## Related Concepts

- [[concepts/metacognitive-self-modification|Metacognitive Self-Modification]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/bilevel-simulator-construction|Bilevel Simulator Construction]]
- Evolutionary search
- Agent memory
- Inference-time compute allocation
