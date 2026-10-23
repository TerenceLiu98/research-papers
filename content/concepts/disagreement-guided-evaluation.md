---
title: Disagreement-Guided Evaluation
type: concept
aliases:
  - Disagreement-Targeted Re-Evaluation
  - Claim-Level Disagreement Routing
tags:
  - llm-evaluation
  - multi-agent-systems
  - uncertainty
  - active-evaluation
---

## Overview

Disagreement-guided evaluation uses conflicts among evaluators to decide where additional judging effort should be spent. In an [[concepts/llm-as-a-judge|LLM-as-a-Judge]] panel, the method can operate below the response level: decompose a response into claims, measure the distribution of verdicts for each claim, and re-evaluate the most contested claims instead of collapsing all judgments immediately into a majority vote.

## Key Ideas

- **Preserve disagreement before aggregation.** A vote identifies the winning verdict but erases which claims divided the panel. Keeping per-claim judgments makes conflict available as a routing signal.
- **Distinguish disagreement from correctness.** High entropy identifies divided judgments, not necessarily errors. Low entropy can conceal correlated consensus failures, especially when judges share models, data, or biases.
- **Use structure to extend corrections carefully.** Similarity in evaluation dimensions or claim meaning can identify related claims for re-evaluation. Loose propagation can amplify an incorrect correction, so thresholds must be evaluated jointly for quality and cost.
- **Separate selection from adjudication.** A selector can identify the issue that deserves attention without assigning its label. The reviewing model or human then performs evidence-based adjudication.
- **Retain reusable lessons with controls.** Corrections can update future rubrics, but deduplication alone does not prevent criteria drift, contradictory entries, or unbounded rubric growth.
- **Test evaluator diversity.** Disagreement is more informative when panel members have genuinely different error patterns. Prompt personas within one model may reproduce shared blind spots.

## Important Papers

- [[papers/juryflow-disagreement-guided-human-in-the-loop-multi-agent-evaluation|JuryFlow: Disagreement-Guided Human-in-the-Loop Multi-Agent Evaluation]]: builds a claim graph from verdict entropy and semantic structure, then combines focal re-evaluation, propagation, and rubric induction.
- Seung, Opper, and Sompolinsky (1992), "Query by Committee": foundational active-learning approach that selects examples through committee disagreement.
- Verga et al. (2024), "Replacing Judges with Juries": establishes the value of diverse LLM judge panels while using aggregation rather than claim-level correction.
- Jung, Brahman, and Choi (2025), "Trust or Escalate": a related instance-level selective-evaluation approach.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/confidence-based-judge-cascades|Confidence-Based Judge Cascades]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
