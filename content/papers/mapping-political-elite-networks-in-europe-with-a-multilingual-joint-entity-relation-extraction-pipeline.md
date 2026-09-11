---
title: "Mapping Political-Elite Networks in Europe with a Multilingual Joint Entity-Relation Extraction Pipeline"
type: paper
authors:
  - Kirill Solovev
  - Jana Lasser
year: null
tags:
  - political-elite-networks
  - relation-extraction
  - multilingual-nlp
  - entity-linking
  - signed-networks
---

## TL;DR

The VALPOP pipeline converts multilingual news into typed, directed, signed, temporal political networks using open-weight models, a fixed ontology, and Wikidata entity linking. A model-judged check of 606 extracted relations reports 68.2% strict and 93.7% lenient textual correctness; these are rubric-dependent scores, not confidence bounds or recall-aware F1. Austrian and Polish case studies recover recognizable political structures after anchor verification and graph consolidation, but sparse linking, erroneous office and party assignments, and news-selection bias limit interpretation.

## Research Question

Can a modular extraction system recover comparable political-elite relationships from large multilingual news corpora, including informal economic ties, conflict, and temporal change that formal office-holder datasets omit?

## Motivation

Elite-network theories connect patterns of affiliation and resource control to governance, but manually coding informal ties is expensive. Document classification and simple co-occurrence cannot reliably distinguish support, criticism, employment, or ownership. Cross-national measurement also requires stable entity identities across abbreviations, inflections, and languages. The paper connects [[Ontology-Constrained Relation Extraction]] with [[Multilingual Entity Linking]] to construct networks suitable for subsequent [[Social Network Analysis]].

## Contributions

- A streaming pipeline with replaceable recognition, linking, extraction, and ontology components, using 109 entity types and 99 relationship types.
- A multilingual Wikidata linking cascade that supplies candidate identifiers for constrained selection instead of free-form identifier generation.
- Separate entity-detection and relation-quality evaluations, with an error taxonomy that distinguishes extraction failures from incomplete annotations and matching failures.
- Two large news-based applications: the Austrian BZO party lifecycle and Polish state-linked economic networks and partisan conflict.

## Method

Articles are split at sentence boundaries into approximately 4,800-character chunks. GLiNER-X-Large detects seven coarse entity categories at a 0.5 confidence threshold; structural filters and ontology-term and language-specific blocklists remove recurring false positives. Fine-grained types are assigned downstream.

The offline Wikidata index contains 14.8 million entities and 37 million aliases across 36 languages. Linking proceeds through exact alias lookup, fuzzy matching, and dense retrieval using Qwen3-Embedding-0.6B and Qdrant. Morphological normalization supports inflected names. Up to five candidates are passed to the extractor, which selects an integer index or a no-match option. This prevents invented QIDs but does not prevent choosing the wrong existing entity. Canonical-name lookup and low-prominence entity coverage are important engineering constraints (Sections 3 and 7.1).

Qwen3.6-35B-A3B-FP8 runs in non-thinking mode through vLLM, with DSPy and typed Pydantic signatures. Guided decoding constrains ontology labels. Each output specifies subject, object, entity types, relationship type, per-instance positive/neutral/negative valence, event/state/property temporal scope, and optional dates. Post-processing resolves identifiers and repairs direction violations when swapping endpoints satisfies type constraints. The resulting Neo4j graph retains provenance and supports multiplex layers. Registry-based linking extensions are described but were not used in the reported runs.

## Experiments

### Extraction Quality

The relation reference set contains 3,491 relations across 502 Polish articles, covering 77 relationship types, with a 250/252 development/test split. Three model families propose annotations and a fourth model adjudicates candidates against quoted article evidence. It is an LLM-built reference set, not human relation ground truth. Entity detection is evaluated separately against 100 human-annotated German articles.

| Evaluation | Reported result | Interpretation |
| --- | --- | --- |
| German entity detection | Precision 85.5%, recall 82.3%, F1 83.8% | Surface-span evaluation after filtering |
| Polish relation spot-check | 68.2% strict, 93.7% lenient | All 606 extracted relations in 100 sampled test articles judged under two scoring rubrics |
| Strictly correct extractions | 244 exact matches and 169 valid relations absent from gold | 413/606 supports the 68.2% strict score |
| Unmatched gold relations | 161/610 had actually been extracted | Matching errors affect measured recall |
| Genuine misses | 258 LLM omissions, 176 NER misses, 15 direction errors | 449 misses after excluding matcher failures |

The strict rubric rejects type near-misses, direction flips, and inferable relations; the lenient rubric accepts a real connection under a reasonable reading. The scores do not measure the same target as closed-benchmark triple F1. The source reports post-adjudication type Krippendorff's alpha of 0.926 and coverage alpha of 0.146; alpha should not be interpreted as a raw percentage agreement.

### Austrian Case Study

Processing 499,851 Factiva articles from 2005-2017 yields 402,316 article nodes, 616,623 entity nodes, and 1,369,655 relations. Only 21.9% of entity nodes have QIDs. The authors consolidate party aliases into 12 canonical parties and inspect a 29-person BZO cohort. Reported patterns align with the party's 2005 formation, the founder's death in 2008, the December 2009 Carinthian fracture, and the 2013 electoral defeat. Personnel trajectories use dominant press co-mentions and can lag formal membership by about a year.

Against a press-matched control cohort, a three-type legal-jeopardy proxy has 3.87 times the density, with paired Wilcoxon p = 0.006. Adding the more common `criticizes` relation reduces the ratio to 1.37-1.43 and removes two-sided significance. This is a measure of extracted news relations, not an estimate of criminal conduct. Date-qualified Wikidata membership checks report precision 1.000, but cover only three of the 29 people.

### Polish Case Study

The 1997-2025 corpus spans 34 outlets and produces 626,628 entity nodes, 408,692 article nodes, and 1,392,150 relations. Node-level QID coverage is 18.4%, compared with 52-55% relation-level fill. Economic and Governance relations account for 32.54% and 24.03% of edges; their order reverses in political-outlet text, showing sensitivity to financial-wire composition.

Governance/economic participation overlaps for 72,677 entities. Among QID-linked nodes, overlap reaches 59.9% of governance participants and 41.5% of economic participants. State-linked institutions dominate politician-firm ties. The paper reports 273 leadership-role transitions in 2024, versus 185 in the next-highest year, and treats this as one transition episode rather than a general time-series law.

In a 6,043-node political subgraph, unsigned community detection groups opposing leaders together because conflict creates dense connectivity. [[Signed Political Networks]] expose predominantly negative cross-camp relations: 95-98% of PO-PiS ties among membership-grounded anchors are negative, while within-camp ties are 2-14 times more likely to be positive. Coverage-normalized antagonism rises 2.6-3.9 times between the compared early and late periods. Party assignments use Wikidata and structural membership because extracted party-membership edges are contaminated.

### Engineering Findings

Section 7 reports that guided decoding removes 25.6% off-ontology output while improving throughput by about 10%. Moving relationship identifiers from an 86-value output enum to deterministic lookup increases throughput from 0.78 to 1.86 articles per second. These are reported implementation comparisons, not a comprehensive hardware-normalized benchmark.

## Limitations

- Relation annotation and judging are entirely model-based, with no human relation benchmark or inter-judge statistic. The strict/lenient range represents scoring choices, not statistical uncertainty.
- The error presentation needs care: Table 4 labels 122/606 strict errors (20.1%) as hallucinations, whereas Section 4.4 reports 6.3% under the lenient reading. The supplied text does not give a full category crosswalk, so these should not be collapsed into one hallucination rate.
- Sparse and incorrect linking fragments nodes and distorts analysis. Verified anchors, alias consolidation, excluded mislinks, and externally grounded camp assignments are substantive parts of the case-study workflow.
- Austrian person-office extraction precision is only 6.2%, largely because candidacy is confused with office holding. Individual extracted allegations require source verification; a graph edge is not a verified fact about a person.
- Explicit start and end dates cover 58.4% and 34.4% of relations, respectively. Other edges rely on article publication dates, and news attention is not equivalent to relationship timing or formal affiliation.
- Case studies provide face validity for selected structures, not causal identification of patronage, rent-seeking, or effects on public goods. Media visibility, source composition, and Wikidata prominence constrain cross-country comparisons.
- The Austrian corpus is described as ending in 2017, yet Section 5.4 also claims recovery of a 2022 presidential trajectory without explaining the additional temporal coverage. That trajectory is not treated here as an established result of the stated corpus.
- Reproducibility claims are qualified: Factiva is licensed, pipeline access requires researcher vetting, and the Data Availability section describes ontology and gold release in the future tense despite earlier release claims. No release URL is supplied.

The supplied Markdown gives no explicit publication year, venue, DOI, or identifier for this paper. The year is therefore left unknown rather than inferred from cited works or model names.

## Related Concepts

- [[Multilingual Entity Linking]]
- [[Ontology-Constrained Relation Extraction]]
- [[Signed Political Networks]]
- [[Social Network Analysis]]
- [[Political Polarization]]
- [[Key Information Extraction]]

## Related Papers

- Bro (2025), "A Frustratingly Easy Way of Extracting Political Networks from Text." Cited predecessor for LLM-based political-network extraction.
- De Cao et al. (2022), "Multilingual Autoregressive Entity Linking." Cited multilingual linking approach.
- Geng et al. (2023), "Grammar-Constrained Decoding for Structured NLP Tasks without Finetuning." Cited foundation for constrained outputs.
- Nyrup and Bramwell (2020), "Who Governs? A New Global Dataset on Members of Cabinets." Formal-role data contrasted with extracted informal relationships.
- [[A Real-Time System to Populate FRA Form 57 from News]]: Related Wiki reading on schema-based news extraction; not cited by this manuscript.
- [[The dynamics of political polarization]]: Related Wiki reading on polarization and network mechanisms; not cited by this manuscript.

[[index|Library home]]
