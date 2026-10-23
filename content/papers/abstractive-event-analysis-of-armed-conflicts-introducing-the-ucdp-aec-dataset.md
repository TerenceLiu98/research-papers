---
title: "Abstractive Event Analysis of Armed Conflicts: Introducing the UCDP-AEC Dataset"
type: paper
authors:
  - Étienne Simon
  - Helene Bøsei Olsen
  - Ramón Carreño
  - Rahul Mishra
  - Nikolay Arefyev
  - Mert Can Yilmaz
  - Lilja Øvrelid
  - Erik Velldal
year: 2025
tags:
  - event-extraction
  - armed-conflict
  - dataset
  - information-extraction
  - computational-social-science
---

## TL;DR

UCDP-AEC pairs 11,363 English source documents with expert-coded UCDP conflict-event records, framing extraction as document-level generation of 14 structured fields whose values may be implicit, dispersed, normalized, or inferred rather than copied from text. Fine-tuned generative baselines reach at most 72.3% aggregate exact-match accuracy, with event dates, fine-grained locations, unseen actors, and temporal uncertainty remaining difficult.

## Research Question

Can [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]] be reformulated as abstractive structured prediction over expert event records, and how well do adapted generative extraction models recover those records from source documents?

## Motivation

Most NLP event-extraction benchmarks annotate explicit spans, whereas political event databases record what domain experts conclude happened. Producing those records can require resolving relative dates, linking surface descriptions to canonical actors, combining casualty reports across sentences, normalizing locations, and inferring values that never occur verbatim in the source. UCDP's Georeferenced Event Dataset (GED) contains such expert annotations, but its original source documents cannot be redistributed indiscriminately.

## Contributions

- Introduces UCDP-AEC, a corpus of 11,363 document-event pairs covering fatal organized violence in 88 countries.
- Defines abstractive event analysis as predicting a complete 14-field record for actors, dates, locations, and deaths from one document and its publication date.
- Links GED records to redistributable document identifiers in the HPLT v2 web archive using MinHash matching; manual assessment found 96.9% of 130 sampled substitutions to be perfect document matches.
- Provides temporally separated train, validation, and test splits and analyzes each field's domain openness and distribution shift.
- Establishes fine-tuned Text2Event, DEGREE, Flan-T5 large, and Llama-3.2-Instruct baselines, including minimal adaptations of extractive event-generation systems.

## Method

The dataset filters UCDP candidate events to obtain a one-to-one mapping between a single English document and a single, one-day event. Each target contains Side A and Side B; start and end dates; country, region, subregion, and point; deaths attributed to each side, civilians, and unknown parties; and low and high total-death estimates. Every instance assigns one value to every field, including values inferred from context.

Because the UCDP source texts are not generally redistributable, the authors match them against HPLT v2 documents with MinHash and retain approximate Jaccard similarity of at least 0.5. The resulting split contains 10,064 training documents from before 2021, 651 validation documents from 2021, and 648 test documents from 2022 onward. This temporal split exposes models to newly emerging actors and unseen dates and locations.

The baselines generate structured records. Text2Event's restriction to arguments copied from the input is removed; DEGREE receives fuzzy template matching based on Levenshtein distance; Flan-T5 uses a formal template; and the Llama models generate JSON from an instruction. Exact-match accuracy is reported by field and aggregated into actors, dates, locations, and deaths. For actor and location strings, BERT nearest-neighbor precision at one is also reported as a semantic diagnostic.

## Experiments

Llama-3.2-Instruct 3B obtains the best aggregate exact-match accuracy at 72.3%, followed by DEGREE at 70.9%, Flan-T5 large at 70.2%, Llama-3.2-Instruct 1B at 69.4%, and Text2Event at 43.9%. Llama 3B performs best on dates at 73.8%; Flan-T5 large leads actors at 73.9%; DEGREE leads locations at 64.5% and deaths at 81.3%. Text2Event's much lower 14.1% location accuracy shows that removing its copy constraint is not sufficient to make the sentence-oriented architecture effective in this setting.

The temporal split reveals specific generalization failures. About 5% of test Side A actors are unseen during training; Flan-T5 identifies 32.3% of these correctly and Llama 3B identifies 25.8%. When start and end dates differ, which occurs in 8.6% of samples, date accuracy falls to 37.5% for Llama 3B and 33.8% for DEGREE. Both models also degrade when the event date differs from the publication date. Semantic P@1 remains close to exact accuracy for the stronger models, suggesting that most errors are not merely alternative surface forms.

## Limitations

- UCDP-AEC contains only 3.3% of GED events and inherits selection effects from event filtering and HPLT availability; 84% of its events occurred in the last ten years represented by the source data.
- Country coverage differs substantially from GED: Syria accounts for 40% of UCDP-AEC events versus 19% in GED, while Brazil contributes only four UCDP-AEC events despite more than 12,000 GED records.
- Restricting sources to English reinforces linguistic and media-coverage biases and excludes potentially more precise local reporting.
- The dataset cannot be fully reproduced without privileged access to the original UCDP documents, and the HPLT substitution evaluation depends on those private sources.
- Encoder-decoder baselines truncate documents beyond 512 tokens, and Text2Event and DEGREE are evaluated outside their intended extractive setting.
- News-source bias, uncertain casualty reporting, hallucinated records, surveillance risks, and other harmful uses make human review necessary; the dataset is not intended to replace expert coding or directly represent the full distribution of armed conflict.

## Related Concepts

- [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]]
- [[concepts/multilingual-entity-linking|Multilingual Entity Linking]]
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]

## Related Papers

- [[papers/challenges-and-applications-of-automated-extraction-of-socio-political-events-at-the-age-of-large-language-models|Challenges and Applications of Automated Extraction of Socio-political Events at the Age of Large Language Models]]: places LLM-based political event extraction in a broader technical and governance context.
- Simon et al. (2024), "Generative Approaches to Event Extraction: Survey and Outlook": motivates moving generative extraction beyond text-bound arguments.
- Olsen et al. (2024), "Socio-Political Events of Conflict and Unrest: A Survey of Available Datasets": describes the abstraction gap between NLP corpora and political event databases.
- Sharif et al. (2024), "Explicit, Implicit, and Scattered: Revisiting Event Extraction to Capture Complex Arguments": studies arguments that cannot be handled as simple local spans.
- Semnani et al. (2025), "LEMON-ADE: A Large Multilingual Expert-Annotated Abstractive Event Dataset for the Real World": provides a concurrent multilingual abstractive benchmark derived from ACLED.

[[index|Library home]]
