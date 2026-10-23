---
title: Online Tool-Use Policy Refinement
type: concept
aliases:
  - Online Prompt Policy Adaptation
  - Tool-Use Policy Self-Evolution
tags:
  - llm-agents
  - tool-use
  - prompt-optimization
  - online-adaptation
---

## Overview

Online tool-use policy refinement adapts the natural-language procedure that governs an agent's tool selection, evidence gathering, verification, risk controls, and action construction from feedback collected during deployment. The policy changes between decision batches while the underlying language-model parameters and tool interfaces can remain fixed. The target of adaptation is therefore the reusable operating procedure, not an individual answer or trade.

## Key Ideas

- **Treat instructions as policy parameters.** A system prompt can specify when to call tools, which measurements to compute, how to cross-check signals, and how to convert evidence into actions. Rewriting it changes the action distribution induced jointly by the frozen model, context, and tools.
- **Join decisions to delayed outcomes.** Feedback is more interpretable when an outcome is paired with the action and rationale that produced it. This pairing can reveal procedural candidates for revision, but noisy outcomes do not establish causal credit.
- **Separate acting from updating.** An operational agent acts under the current policy; a policy agent reviews a batch of completed trajectories and rewrites the policy for the next batch. Holding the policy fixed within a batch prevents future outcomes from leaking into earlier decisions.
- **Balance adaptation and stability.** Very frequent updates can overfit individual outcomes, while infrequent updates can leave a stale procedure in place. Update timing is part of the method rather than an incidental implementation detail.
- **Measure behavioral change directly.** Performance alone cannot show what adaptation changed. Tool-call frequencies, invoked computations, evidence dependencies, and allocation or action traces provide intermediate evidence that the revised policy altered behavior.
- **Keep the system boundary explicit.** Updating prompts with frozen model weights is scaffold-level adaptation. It is related to, but weaker than, claims that the mechanism producing future improvements has itself become more capable under [[concepts/recursive-self-improvement|Recursive Self-Improvement]].
- **Audit failure modes.** An adaptive policy can become overly conservative, accumulate redundant instructions, or exploit noisy feedback. Negative regimes, policy-length trajectories, transaction costs, and fixed-policy controls help bound claims of improvement.

## Important Papers

- [[papers/evolvetrade-experience-driven-policy-refinement-for-self-evolving-llm-trading-agents|EvolveTrade]]: periodically rewrites a trading agent's complete operational policy from decision rationales and realized portfolio feedback, and measures changes in tool use, computed metrics, allocations, and returns.
- Pryzant et al. (2023), "Automatic Prompt Optimization with Gradient Descent and Beam Search": uses textual feedback to revise prompts, illustrating instruction optimization outside continuous deployment.
- Yao et al. (2023), "ReAct: Synergizing Reasoning and Acting in Language Models": establishes the interleaving of reasoning and external actions whose governing procedure later work seeks to adapt.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: distinguishes editable behavior from improvement of the improvement mechanism itself.
- [[concepts/metacognitive-self-modification|Metacognitive Self-Modification]]: makes the procedure that proposes later revisions part of the editable system.
- [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]]: provides trajectory-level ways to examine optional tool choices and output dependencies.
- [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|Decoupled Scientific Reasoning and Tool Orchestration]]: similarly separates operational tool execution from a component that evaluates evidence and directs subsequent work.
