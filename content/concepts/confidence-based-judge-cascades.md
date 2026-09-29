---
title: Confidence-Based Judge Cascades
type: concept
aliases:
  - Selective Judge Escalation
tags:
  - llm-evaluation
  - selective-prediction
  - model-cascades
---

## Overview

A confidence-based judge cascade accepts an inexpensive evaluator's verdict when its confidence exceeds a threshold and otherwise delegates the judgment to a stronger fallback. It applies selective prediction to [[concepts/llm-as-a-judge|LLM-as-a-Judge]] workflows, trading first-stage coverage against residual errors and fallback cost.

## Key Ideas

- **The gate needs an observable signal.** Error complementarity gives an oracle upper bound, but actual routing must use information available before the correct label is known, such as maximum label probability.
- **Separate ranking from calibration.** A score may identify relatively uncertain cases without representing correct numerical probabilities. Conversely, aggregate probability metrics do not establish safe behavior in a high-confidence subset.
- **Control pair presentation.** Aligning and averaging probabilities across both candidate orders can reduce presentation dependence. Both first-stage calls belong in the cost calculation.
- **Freeze and validate thresholds.** Selecting a threshold on one set and testing it on disjoint source groups is stronger evidence than reporting the best threshold on the evaluated items. A selection-set error tolerance is not automatically a held-out guarantee.
- **Account for all outcomes.** Invalid first-stage outputs should trigger fallback; evaluation should retain failed final outcomes. Fees include first-stage calls on every item and fallback calls on deferred items, with missing usage handled explicitly.
- **Check the workload.** Confident errors caused by misleading style or missing factual evidence can defeat escalation. Risk-coverage curves, source-cluster uncertainty, and comparisons with random routing help establish whether the gate is informative.
- **Measure live operation separately.** An offline simulation can estimate verdicts and fees from retained outputs, but cannot establish sequential latency, throughput, or future provider reliability.

## Important Papers

- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: a frozen two-order cascade reaches 92.5% versus 93.1% fallback accuracy on 510 extension pairs at 56.8% of estimated fallback fees; other threshold transfers fail.
- Jung, Brahman, and Choi (2025), "Trust or Escalate: LLM Judges with Provable Guarantees for Human Agreement": prior judge-cascade work cited by the JEV study.
- Xu et al. (2025), "Ask a Strong LLM Judge When Your Reward Model Is Uncertain": cited prior work routing uncertain reward-model judgments to an LLM.
- Geifman and El-Yaniv (2017), "Selective Classification for Deep Neural Networks": selective-prediction background cited by the JEV study.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]: uses probability distributions to compute scalar judgments rather than decide which evaluator should act.
