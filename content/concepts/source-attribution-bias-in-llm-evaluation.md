---
title: Source-Attribution Bias in LLM Evaluation
type: concept
aliases:
  - Source Framing in LLM Evaluation
tags:
  - llm-evaluation
  - source-attribution-bias
  - prompt-sensitivity
---

## Overview

Source-attribution bias occurs when an LLM's evaluation of fixed content changes with its purported author. Cues can identify a human, a model, or a nationality. In a controlled attribution experiment, the source label is manipulated independently of the content, allowing comparison with a source-blind baseline. Calling a shift inappropriate additionally requires specifying whether source information is relevant to the evaluation task.

## Key Ideas

- **Hold the evaluated content fixed.** Vary source descriptions across the same texts. Distinguish the actual generator, attributed author, and evaluating model; otherwise content differences can be confused with attribution effects.
- **Name the comparison.** A condition-minus-blind score difference and a nationality-minus-generic-person difference are distinct estimands. State the baseline and whether reported units are raw scores, percentage points, or relative changes.
- **Specify the judgment target.** Agreement with a policy statement differs from factual verification, stylistic quality, and confidence that an attributed author would express that view. Source cues may cause a model to substitute the last task for the first.
- **Inspect heterogeneous effects.** An aggregate nationality penalty can conceal null or reversed effects within topics. Self-attribution can lower agreement, so attribution sensitivity is not equivalent to self-preference.
- **Separate behavior from mechanism.** Explanations invoking national expectations support an interpretation of identity-conditioned judgment, but cannot establish whether training data, alignment procedures, or another internal process caused it. The results concern model behavior, not the characteristics of real national groups.
- **Keep agreement and validity separate.** Shared high ratings across models do not establish correctness or freedom from shared biases. Repeated assessments of fixed texts also require attention to dependence when quantifying uncertainty.

## Important Papers

- [[papers/source-framing-triggers-systematic-bias-in-large-language-models|Source framing triggers systematic bias in large language models]] crosses four generators and evaluators with ten source conditions on 4,800 narratives. It reports high blind agreement, aggregate penalties for Chinese attribution, and important topic-level exceptions.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: source attribution is one presentation variable that can affect automated evaluation.
- [[concepts/scenario-conditioned-claim-verification|Scenario-Conditioned Claim Verification]]: changes the assessor's described context rather than the assessed narrative's author, and evaluates truthfulness performance rather than endorsement.
