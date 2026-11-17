---
title: "Congressional Oratory Research Archive: A Comprehensive Data Set for Analyzing the U.S. Congressional Record, 1873–2025"
type: paper
authors:
  - Shahid Rabbani
  - Aaron R. Kaufman
year: 2026
tags:
  - text-as-data
  - congressional-speech
  - datasets
---

## TL;DR

CORA harmonizes 15,215,977 attributed congressional utterances spanning 1873–2025, with speaker metadata, legislative references, source links, and automated policy topics. Speaker matching reaches 96.2% accuracy in a deliberately difficult 500-record benchmark; topic labels provide useful but imperfect signals, with blind human–model agreement of 50.1% and 44.9% for two annotators.

## Research Question

How can historical and contemporary Congressional Record sources be unified into a traceable corpus supporting longitudinal analysis of legislative rhetoric and issue attention?

## Motivation

Historical speech collections and modern speaker-aligned corpora differ in coverage and processing. CORA combines them under a shared schema, reducing the work needed to connect speech text to legislators, legislation, and original proceedings.

## Contributions

- A year-partitioned JSONL and CSV corpus covering both chambers and separately identified Extensions of Remarks.
- Bioguide speaker linkage, standardized demographic and institutional metadata, and speech-local extraction of bills and several resolution types.
- Comparative Agendas Project (CAP) topic assignments and human validation of attribution and classification.
- Reproducible data distribution through [Figshare](https://doi.org/10.6084/m9.figshare.33321423) and [compilation and validation code](https://github.com/Shahid0201/CORA-code). The DOI identifies the dataset, not the article.

## Method

The corpus combines Gentzkow, Shapiro, and Taddy’s parsed records for 1873–1878, Aroyehun et al.’s recomputed corpus for 1879–1994, and govinfo daily editions for 1995–2025. Harmonization standardizes dates, chambers, parties, and source-document references.

Speaker resolution narrows Bioguide candidates by Congress and available attributes, prioritizes matching surnames, and compares SentenceTransformer name embeddings. Matches require cosine similarity of at least 0.80; below-threshold candidates remain available for audit rather than becoming accepted identifiers. Regular expressions extract legislative references from each utterance itself.

Llama-3.1-405B generates ranked CAP topics for 50,000 training speeches. The highest-ranked topic supervises DeBERTa-v3-base, trained for seven epochs with an 80/20 stratified split, AdamW, learning rate 2 × 10⁻⁵, and weight decay 0.01. The classifier assigns one topic to every record. This is an application of [[concepts/weakly-supervised-learning|Weakly Supervised Learning]].

The observational unit is a contiguous attributed utterance, not necessarily a substantive address. Median length is 23 words, mean length 124, and 5,031,129 records contain at least 50 words. Inserted Extensions of Remarks can be excluded through the chamber field. These choices make [[concepts/corpus-selection-for-text-analysis|Corpus Selection for Text Analysis]] central to downstream interpretation.

## Experiments

| Validation | Reported finding |
| --- | --- |
| Speaker linkage, 500 manually checked records | 481 correct; 96.4% precision and 96.2% recall; nineteenth-century accuracy 92.0% |
| Legislative-reference audit | 38/38 extracted references correct, 95% CI 90.8–100%; this small audit does not establish corpus-wide recall |
| Blind topic coding, 1,000 speeches | Exact agreement 50.1% and 44.9% with two annotators; human–human agreement 67.4% |
| Topic baselines and ranked alternatives | Majority baseline 25.5%; first-annotator κ = 0.48; top-three agreement 79.5% and 77.4% |
| Label verification | First annotator accepts 402/462 labels (87.0%); second accepts 70.9% of 1,000, or 74.7% on the shared 462 |
| Speech divergence versus roll-call party distance | Pearson r = 0.61 across 77 overlapping Congresses |

The evidence-minus-intuition reconstruction reproduces the benchmark’s qualitative trajectories. Gender-language validation reproduces directions, but the feminine-language effect is attenuated (d ≈ −0.030 versus −0.081 in Windsor et al.); the masculine-language effect is closer (0.060 versus 0.074). Open lexica replace proprietary LIWC measures, so this is a conceptual replication rather than an identical measurement exercise.

## Limitations

- Source segmentation is heterogeneous. Around 1994/1995, Bioguide match rates rise from 34.7% to 74.7% in adjacent five-year windows, potentially affecting metadata-dependent trends.
- Short procedural turns dominate record counts. The authors recommend a 50-word threshold for substantive rhetoric and delegation-size normalization for state-level House comparisons.
- Single-label topics simplify multi-issue speeches. Verification acceptance is a different task from independent classification and should not be reported as classification accuracy.
- Speaker errors concentrate in historical material and colloquy. The deliberately stratified benchmark is not a simple representative corpus sample.
- Committee hearings and other proceedings outside the Record are excluded. Missing citation fields usually indicate no explicitly named instrument; missing speaker fields can indicate failed linkage.
- The supplied article-in-press text gives a placeholder publication date and reports both 1873–2025 and 43rd–118th Congress coverage. These coverage labels should be checked against the released files for precise sample construction; no article DOI is supplied in the parsed text.

## Related Concepts

- [[concepts/corpus-selection-for-text-analysis|Corpus Selection for Text Analysis]] — utterance length, inserted remarks, and source era determine the analytical population.
- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]] — model-generated labels scale annotation, while independent human judgments test their validity.

## Related Papers

- Gentzkow, Shapiro, and Taddy (2018), *Congressional Record for the 43rd–114th Congresses: Parsed Speeches and Phrase Counts* — provides the earliest source segment.
- Aroyehun et al. (2025), *Computational Analysis of US Congressional Speeches Reveals a Shift from Evidence to Intuition* — supplies the recomputed historical corpus and an external rhetorical benchmark.
- Bochenek and Williams (2025), *You Have the Floor: A Speaker-Aligned Corpus Derived from the Congressional Record* — a modern-era comparator covering 1995–2024.
