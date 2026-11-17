---
title: "RELATIO: Text Semantics Capture Political and Economic Narratives"
type: paper
authors:
  - Elliott Ash
  - Germain Gauthier
  - Philine Widmer
year: 2024
doi: 10.1017/pan.2023.8
tags:
  - text-as-data
  - narrative-mining
  - political-discourse
---

## TL;DR

RELATIO compresses text into interpretable agent–verb–patient statements using semantic role labeling and entity clustering. Applied to the 1994–2015 U.S. Congressional Record, it reduces 17.3 million sentences to 1,638 recurring narratives. Narrative features predict party affiliation with 81% held-out accuracy, compared with 74% for entity features.

## Research Question

Can an automated text representation preserve who does what to whom while remaining compact enough to measure political narratives, their evolution, and partisan differences?

## Motivation

Entity mentions and topic frequencies do not specify the relationships speakers assert. Parties can discuss the same entities while connecting them through different actions. [[concepts/semantic-role-based-narrative-mining|Semantic Role-Based Narrative Mining]] makes those directed relationships measurable.

## Contributions

- Combines pretrained linguistic tools with unsupervised entity reduction to produce recurring narrative statements.
- Provides the open-source RELATIO implementation and a congressional application covering dynamics, sentiment, and partisanship.
- Represents statements as directed multigraphs, connecting individual claims into a broader discourse structure.

## Method

Semantic role labeling extracts agents, verbs, and patients while accommodating active and passive constructions. Negation modifies the verb; verb tense is normalized. Frequent named entities receive canonical labels. Remaining agent and patient phrases are encoded using weighted averages of word vectors and grouped with K-means. Clusters initially receive their most frequent phrase as a label. Choosing entity granularity requires inspection as well as clustering diagnostics.

The resulting statement belongs to an entity × verb × entity space. Verbs are not clustered because embedding-based grouping can merge antonyms. Counts by speaker and year support descriptive analyses and prediction. In narrative graphs, entities are nodes and verbs label directed edges; multiple relations can connect the same entities.

The congressional application selects 1,000 named entities and 1,000 entity clusters, retains complete agent–verb–patient statements occurring at least 50 times, and removes procedural or otherwise irrelevant entities. Some cluster labels are manually revised. The method is therefore automated but still requires application-specific judgment.

## Experiments

| Analysis | Reported evidence |
| --- | --- |
| Corpus reduction | 17.3 million sentences yield 1,638 retained narrative types (Section 3.1). |
| Final narrative network | 353 entities connected through 140 verbs (Section 3.2.4). |
| Party prediction | Held-out accuracy of 81% for narrative features versus 74% for entity features (Section 3.2.3). |
| Historical dynamics | Hussein threat and weapons narratives spike around 2002; invocations blessing America rise after September 11, and troop-related invocations rise with the Iraq invasion. |
| Sentiment | Narratives are ranked by mean VADER sentiment of their source sentences. |
| Partisan framing | Relative party usage reveals different relations involving shared entities, such as oil profits versus reliance on oil. |

The network visualization displays the 100 most frequent narratives with frequency and partisan coloring. These results support descriptive usefulness and the reported entity-feature comparison; they do not establish broad superiority over topic models, n-grams, or dependency parsing. The supplied text references supplementary analyses without supplying their complete experimental details.

## Limitations

SRL errors increase with OCR noise and grammatical complexity. Filtering failed extractions may select differentially across parties if their speech complexity differs. Entity clustering can collapse contradictory phrases such as tax increases and cuts, while named and clustered entities can remain split despite overlapping meanings. Implicit references and coreference remain difficult. Restricting analysis to complete, frequent statements omits other discourse. Extracted relations record textual representations rather than verified events or causal effects. Systematic comparisons with alternative feature representations remain future work.

## Related Concepts

- [[concepts/semantic-role-based-narrative-mining|Semantic Role-Based Narrative Mining]]: the reusable extraction and aggregation approach.
- [[concepts/narrative-polarization|Narrative Polarization]]: related concern with differences in how groups represent actors and relationships; RELATIO measures partisan narrative usage.
- [[concepts/causal-text-mining|Causal Text Mining]]: a neighboring extraction task; agent–action–patient relations need not express causal explanations.

## Related Papers

- [[papers/measuring-narrative-polarization-in-online-discourse|Measuring Narrative Polarization in Online Discourse]]: a library comparison using actantial roles and actor-goal distributions rather than RELATIO's semantic-role triples; not a benchmark evaluated here.

Published in *Political Analysis* 32, 115–132 (2024), with online publication on April 28, 2023. Source: DOI 10.1017/pan.2023.8. Replication identifier: 10.7910/DVN/3BRWKK.
