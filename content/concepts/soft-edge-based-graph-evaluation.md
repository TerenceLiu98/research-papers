---
title: Soft Edge-Based Graph Evaluation
type: concept
aliases:
  - Soft F1 for Graph Extraction
tags:
  - graph-evaluation
  - relation-extraction
  - semantic-similarity
  - human-validation
---

## Overview

Soft edge-based graph evaluation compares extracted and reference graphs while allowing approximate matches between natural-language node labels. It is useful when multiple wordings can express a similar relationship and when an edge may be partly correct. The matching rule and treatment of relation attributes define what the resulting score actually rewards.

## Key Ideas

- **Compare corresponding endpoints.** Berijanian et al. require source-to-source and target-to-target textual similarities to exceed a threshold. Lexical measures such as BLEU and learned measures such as BLEURT provide different notions of endpoint resemblance.
- **Separate endpoint and relation agreement.** In their signed-edge formulation, matching endpoints with the correct sign yield a true positive, while matching endpoints with the wrong sign yield a partial positive. Edges lacking endpoint matches supply false positives or false negatives.
- **Inspect the normalization.** Their score is $(2\,\mathrm{TP}+\mathrm{PP})/(2\,\mathrm{TP}+\mathrm{PP}+\mathrm{FP}+\mathrm{FN})$. Partial positives contribute less than true positives to both numerator and denominator; they are not an independent fixed half-credit penalty. With only partial positives and no unmatched edges, the formula returns one despite sign disagreements.
- **Specify matching multiplicity.** An existential rule asks whether any acceptable partner exists. It does not enforce a one-to-one assignment, so several predicted edges can potentially match the same reference edge. Results depend on this choice as well as on the text similarity measure.
- **Validate against human judgments.** Passage-specific pairwise preferences can produce a ranking against which automatic scores are compared. The FCM study obtains mean Spearman correlation 0.415 for BLEU-E versus 0.016 for exact-match F1 across 20 passages, supporting improved but incomplete agreement.
- **Separate calibration from validation.** Selecting thresholds for maximum agreement with human rankings and reporting performance on those rankings does not establish generalization. Held-out passages and explicit treatment of reference ambiguity are needed to assess transfer.

## Important Papers

- [[papers/soft-measures-for-extracting-causal-collective-intelligence|Soft Measures for Extracting Causal Collective Intelligence]]: defines BLEU-E, ROUGE-E, METEOR-E, and BLEURT-E and evaluates them with human Elo rankings of FCM annotations.

## Related Concepts

- [[concepts/fuzzy-cognitive-maps|Fuzzy Cognitive Maps]]: signed causal mental models that motivate approximate edge comparison.
- [[concepts/causal-text-mining|Causal Text Mining]]: extraction tasks where span wording, source-target order, and relation meaning create distinct evaluation errors.
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: enforces a structured output inventory, while soft evaluation addresses agreement between that output and a reference.
