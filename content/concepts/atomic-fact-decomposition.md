---
title: Atomic Fact Decomposition
type: concept
aliases:
  - Claim Decomposition
  - Atomic Hypothesis Decomposition
tags:
  - natural-language-inference
  - factuality-evaluation
  - compositional-reasoning
  - explainable-nlp
---

## Overview

Atomic fact decomposition rewrites a sentence or longer claim as a set of minimal, self-contained propositions that can be evaluated separately. In natural language inference and factuality evaluation, it changes the unit of judgment from a compound statement to its component claims, making it possible to localize which information is supported, contradicted, or absent.

## Key Ideas

- **Atomicity is task-dependent.** A useful atom expresses one checkable proposition, but decomposition quality also depends on preserving entities, relations, modifiers, and references needed to interpret it.
- **Composition is a separate problem.** Correctly splitting a hypothesis does not determine how atomic labels should become a sentence label. A common rule requires every atom for entailment, any contradictory atom for contradiction, and otherwise assigns neutral when at least one atom is neutral.
- **Hard rules amplify local errors.** One false contradiction can veto an entire hypothesis, while one missed entailment can reject it. This produces conservative entailment and sensitive contradiction behavior as the number of atoms grows.
- **Soft aggregation trades logic for error tolerance.** Summing class probabilities across atoms preserves confidence and reduces single-error failures, but it need not obey the semantics of conjunction or model dependence among atoms.
- **Interpretability comes from localization.** Atomic labels can show precisely which proposition supports or defeats a decision, even when final sentence-level accuracy is similar to a direct classifier.
- **Data quality is inherited.** Decomposition mistakes, synthetic claim artifacts, classifier-based filtering, and unresolved coreference can all become label noise or misleading explanations.
- **Evaluation should stratify by atom count.** Single-atom examples do not test composition, while estimates for long decompositions can be unstable when such examples are rare.

## Important Papers

- [[papers/atomic-snli-fine-grained-natural-language-inference-through-atomic-fact-decomposition|Atomic-SNLI: Fine-Grained Natural Language Inference through Atomic Fact Decomposition]]: builds an atomic NLI dataset and compares hard logical rules with probability aggregation.
- Min et al. (2023), "FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation": evaluates long-form factual precision through atomic claims.
- Stacey et al. (2024), "Atomic Inference for NLI with Generated Facts as Atoms": studies fact generation as an atomic basis for NLI.
- Srikanth and Rudinger (2025), "NLI under the Microscope: What Atomic Hypothesis Decomposition Reveals": analyzes consistency and composition in atomic NLI.
- Huang (2025), "DecMetrics: Structured Claim Decomposition Scoring for Factually Consistent LLM Outputs": formalizes dimensions of decomposition quality and trains a specialized decomposition model.

## Related Concepts

- Natural language inference
- Claim verification
- Compositional reasoning
- Factuality evaluation
- Rationale-based explanation
