---
title: Graph-Structured Trajectory Extraction from Travelogues
type: paper
authors:
  - Aitaro Yamamoto
  - Hiroyuki Otomo
  - Hiroki Ouchi
  - Shohei Higashiyama
  - Hiroki Teranishi
  - Hiroyuki Shindo
  - Taro Watanabe
year: null
source_job_id: "a4b0792a-f569-413b-a254-250404fc0239"
tags:
  - trajectory-extraction
  - relation-extraction
  - geographic-information
  - japanese-nlp
---

## TL;DR

The paper represents travelogue trajectories with geographic inclusion edges and visit-order edges, and introduces ATD-VSO, a 100-document Japanese benchmark. Fine-tuned Swallow reaches 0.896 entity visit-status accuracy and 0.514 inclusion F1. With gold visited entities and inclusion relations, the best transition F1 is 0.763, close to a mention-order heuristic's 0.758. Recovering geographic hierarchy remains a bottleneck, and these component scores do not establish end-to-end extraction accuracy.

## Research Question

How can a system recover both the locations a traveler visited and their visiting order when those locations have different geographic granularities and the narrative does not always follow chronological order?

## Motivation

A city and a station within it are not successive stops simply because both are mentioned. [[concepts/visiting-order-graphs|Visiting Order Graphs]] separate containment from temporal movement. Visit detection also requires distinguishing actual experience from plans, distant views, past trips, factual descriptions, and explicit non-visits. The location-centric formulation accommodates scene changes expressed without movement verbs.

## Contributions

- Defines a graph representation with inclusion relations and transitions between entities sharing a geographic parent.
- Extends the existing ATD-MCL mention, coreference, and geographic-link annotations with visit status and visiting order in ATD-VSO.
- Benchmarks rule-based methods, LUKE classifiers, and two Japanese-adapted Llama 3 8B models, identifying hierarchy prediction and reverse narrative order as difficult cases.

## Method

### Visit Status Prediction

Geo-entities are coreference clusters that may contain proper names, general noun phrases, and deictic expressions. Mention-level classification uses six labels: Visit, PlanToVisit, See, Visit-Past, Visit-Future, and UnkOrNotVisit. Entity-level labels are Visit and Other. The mention-label aggregation rule assigns Visit if any mention is classified as Visit or PlanToVisit, and Other otherwise. This is a task-specific aggregation rule, not a general guarantee that a stated plan was realized.

### Visiting Order Prediction

Inclusion relation prediction selects a parent for each entity from the other entities or a synthetic ROOT. Directed inclusion edges run from container to contained location. Transition relation prediction selects a subsequent entity among siblings with the same parent, or EOS when no successor exists. Thus, a transition between cities can order their contained locations without a direct transition edge between those locations.

Appendix A handles repeated visits by splitting an entity into visit-specific sub-entities, excludes UnknownTime entities from the graph, and records Overlap when locations intersect without containment, selecting a representative for other relations. These conventions bound what the graph records.

### Systems

LUKE predicts mention labels or classifies entity pairs using representative mentions and their intervening context. Inclusion representatives prioritize proper nouns; transition representatives prioritize visit-status evidence. The paper describes sequence-sorting decoding intended to arrange each sibling group into a single sequence.

ELYZA and Swallow use task prompts in zero-shot and fine-tuned settings. Appendix B specifies first-token label logits for classification, a maximum spanning tree for inclusion prediction, and greedy transition ordering. Fine-tuning uses a QLoRA-style setup with 4-bit NF4 quantization, rank 8, alpha 16, and five epochs. These systems classify supplied candidates rather than generating an unrestricted trajectory from raw text.

## Experiments

### Data and Protocol

Table 3 reports 100 travelogues, 6,324 sentences, 5,389 mentions, 3,354 entities, and 3,369 inclusion/transition relations, with a 70/10/20 document train/development/test split. The data comes from one travelogue website and covers domestic travel across Japan's prefectures. Five documents received independent double annotation: visit-status agreement is F1 0.80 and kappa 0.68 for mentions, and F1 0.89 and kappa 0.81 for entities. Relation agreement is F1 0.94 for inclusion and 0.74 for transition.

The main evaluation treats tasks independently with gold preceding annotations. VSP and IRP receive gold entities; TRP receives gold visited entities and inclusion relations. Visit-status scores are accuracy; inclusion and transition scores are pair-extraction F1, with EOS transitions excluded. The paper reports five-seed means for the LUKE baselines unless otherwise specified.

### Reported Results

Tables 6, 8, and 9 report:

| System | Mention VSP accuracy | Entity VSP accuracy | Inclusion F1 | Transition F1 |
| --- | ---: | ---: | ---: | ---: |
| ELYZA, zero-shot | 0.633 | 0.810 | 0.183 | 0.208 |
| Swallow, zero-shot | 0.661 | 0.828 | 0.129 | 0.227 |
| LUKE, fine-tuned | 0.750 | 0.838 | 0.355 | 0.748 |
| ELYZA, fine-tuned | 0.813 | 0.881 | 0.497 | 0.763 |
| Swallow, fine-tuned | 0.823 | 0.896 | 0.514 | 0.742 |

The majority-label baseline reports 0.629 mention and 0.790 entity accuracy. Assigning every entity to ROOT yields 0.244 inclusion F1, exceeding both zero-shot models. Mention-occurrence ordering reaches transition F1 0.730 with earliest mentions and 0.758 with visit-status-prioritized representatives. The latter also scores 0.386 on reverse-order pairs, above all three fine-tuned systems' 0.329-0.366. The fine-tuned models therefore do not consistently improve on this heuristic.

Accuracy masks rare-label failures: Table 7 reports zero Visit-Future F1 for both LUKE and Swallow. Table 8 shows LUKE inclusion F1 of 0.058 for gold ROOT parents versus 0.425 for non-ROOT parents. The best overall inclusion model, Swallow, remains at 0.514 F1.

Appendix C gives a development-document pipeline example with 10/13 correct entity visit labels, 4/7 correct parents among predicted visited entities, and no exact correct transition pairs. This illustrates propagation of upstream errors; it is not an aggregate pipeline score. A separate development ablation finds LUKE mention accuracy of 0.750 with full input, 0.738 with mention text masked, and 0.634 with only mention text, suggesting substantial reliance on context.

## Limitations

- The small, single-source Japanese corpus does not establish transfer to other languages, countries, or narrative genres. Existing mention/coreference annotations are inputs, and automatic extraction and map grounding remain future work.
- Gold-input component evaluation can conceal error propagation. Geographic knowledge injection through coordinates, geospatial pretraining, or Wikidata is proposed, not tested here.
- Representative-mention selection and context truncation can omit evidence. Reverse-order relations and rare visit-status classes remain difficult; prompt and hyperparameter exploration is limited.
- The supplied Markdown has internal inconsistencies. Section 4.2 gives 1,856 inclusion and 1,494 transition relations, whereas Tables 5 and 10 sum to 1,863 and 1,506, matching Table 3's total of 3,369. Sections 4.2 and 5.2 mention an undefined VisitPossibly label absent from the entity-label table. Table 4's test Visit proportions do not match Table 6's majority-baseline accuracies. The results above retain the reported table values without reconciling these discrepancies.
- Section 6.2's ROOT/non-ROOT prose is inconsistent with Table 8; the subgroup figures above follow the table. The limitations section describes fine-tuning as future work despite the reported fine-tuning experiments. No publication year, venue, or paper identifier is supplied, so those metadata are left unknown or omitted.

## Related Concepts

- [[concepts/visiting-order-graphs|Visiting Order Graphs]]: combines geographic containment with sibling visit order.
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: the relation inventory and endpoint constraints define admissible graph structure, while semantic correctness requires separate evaluation.
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: a library comparison for structured temporal representations; visiting order uses relative ordering and geographic nesting rather than timestamped actor-relation events.

## Related Papers

- Higashiyama et al. (2024), "Arukikata travelogue dataset with geographic entity mention, coreference, and link annotation": source annotations extended by ATD-VSO.
- Wagner, Keydar, and Abend (2023), "Event-location tracking in narratives: A case study on holocaust testimonies": cited narrative trajectory task with coarse location categories.
- Kori et al. (2006), "Extraction of visitors typical route and its context from local blogs": cited predecessor using mention order as visiting order.
- Li et al. (2023), "GeoLM: Empowering language models for geospatially grounded language understanding": cited possible foundation for geographic knowledge injection, not an evaluated system in this paper.

[[index|Library home]]
