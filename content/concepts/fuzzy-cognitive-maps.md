---
title: Fuzzy Cognitive Maps
type: concept
aliases:
  - FCMs
  - Fuzzy Cognitive Mapping
tags:
  - fuzzy-cognitive-maps
  - mental-models
  - causal-language
  - social-ecological-systems
---

## Overview

Fuzzy cognitive maps represent causal mental models as signed, weighted directed graphs. Nodes describe factors in natural language, and an edge indicates that an increase in its source increases or decreases its target. They organize stakeholder or scientific accounts of a system, including feedback relationships; the represented causal beliefs require separate evidence before being interpreted as established causal effects.

## Key Ideas

- **Distinguish order, sign, and weight.** Edge orientation identifies the proposed cause and effect; sign identifies an increasing or decreasing relationship; a weight encodes its strength. Extracting signed triples from text does not by itself estimate numerical weights.
- **Node wording carries meaning.** Two annotations can use different phrases for similar factors, while small changes in wording can alter what a factor means. Exact string identity is therefore an incomplete measure of map agreement.
- **Extraction needs a scope rule.** Berijanian et al.'s annotation protocol favors text-grounded, descriptive node names and excludes inferred transitive links unless the passage states them. A map extracted under this rule records a passage's expressed relationships rather than all implications of a proposed system model.
- **Evaluate useful errors separately.** A paraphrased endpoint, a reversed edge, and an incorrect sign are different failures. Soft matching can recognize partial overlap, but its credit scheme must still distinguish substantively misleading relations.
- **Separate representation from downstream performance.** A readable causal map may facilitate comparison of perspectives. Successful extraction alone does not demonstrate accurate simulation, better collective decisions, or reliable intervention predictions.

## Important Papers

- Kosko (1986), "Fuzzy cognitive maps": foundational representation, cited in the ingested extraction study.
- Gray, Zanre, and Gray (2013), "Fuzzy cognitive maps as representations of mental models and group beliefs": cited background on mental-model interpretation.
- [[papers/soft-measures-for-extracting-causal-collective-intelligence|Soft Measures for Extracting Causal Collective Intelligence]]: extracts signed triples with LLMs and tests soft graph scores against human annotation preferences.

## Related Concepts

- [[concepts/causal-text-mining|Causal Text Mining]]: supplies textual causal assertions from which a map can be constructed.
- [[concepts/soft-edge-based-graph-evaluation|Soft Edge-Based Graph Evaluation]]: compares text-labeled edges while accommodating endpoint variation and relation-attribute errors.
