---
title: "Extractive versus Generative Language Models for Political Conflict Text Classification"
type: paper
authors:
  - Patrick T. Brandt
  - Sultan Alsarra
  - Vito D’Orazio
  - Dagmar Heintze
  - Latifur Khan
  - Shreyas Meher
  - Javier Osorio
  - Marcus Sianan
year: 2026
doi: "10.1017/pan.2025.10027"
tags:
  - political-event-data
  - text-classification
  - language-models
---

## TL;DR

Domain-trained ConfliBERT outperforms the tested general-purpose generative models on political-conflict classification at substantially lower inference time. GTD macro F1 is 0.74, versus 0.65 for the strongest fine-tuned ConflLlama variant and 0.40 for Qwen. The advantage is task-dependent: Gemma leads strict entity-level NER F1, while ConfliBERT obeys the entity schema without invalid labels.

Published in *Political Analysis*; the supplied citation gives 2026, with online publication on 31 December 2025.

## Research Question

When should political scientists use a domain-specific extractive encoder rather than a prompted or fine-tuned generative model for filtering reports, classifying conflict events, and extracting entities?

## Motivation

Event datasets require reliable extraction of actors, actions, targets, and attributes from large news corpora. Classification errors can distort cumulative event counts and downstream time-series inference. Accuracy, schema compliance, and processing cost therefore matter jointly.

## Contributions

- Compares domain-specific encoders with zero-shot generative models and a supervised generative alternative.
- Evaluates binary classification, strict entity-level NER, and multi-label terrorism-event classification.
- Connects model errors to cumulative event-count distortions and reports substantial inference-time differences.

## Method

ConfliBERT uses BERT representations pretrained on a curated 33.7 GB political-conflict corpus, followed by task-specific supervised adaptation. General-purpose Llama 3.1 (8B), Gemma 2 (9B), and Qwen 2.5 (14B) receive structured classification or entity-extraction prompts. The methodology describes local Ollama instruction-tuned models with 4-bit quantization.

For GTD, ConflLlama adapts Llama-3 8B through QLoRA and generates attack-type labels as text, rather than adding a classification head. Appendix C reports rank 8, alpha 16, roughly 41.9 million trainable parameters, and 1,000 training steps. This provides a supervised generative comparison, although architecture and adaptation procedures are not experimentally isolated.

GTD training uses years through 2016, primarily available summaries from 1998 onward, and evaluation uses 2017–2020. Predictions cover nine attack types, with up to three labels per event. The narrative describes 37,709 evaluation texts. NER requires both exact entity span and correct label.

## Experiments

BBC classification (Table 2) reports conflict-class F1 of 0.6806 for ConfliBERT, 0.2883 for Gemma, and 0.3220 for Llama. ConfliBERT has conflict recall 0.9245 but precision 0.5385, reflecting a substantial filtering trade-off. Weighted F1 is 0.8706, 0.7590, and 0.7614 respectively.

On re3d NER (Table 3), weighted F1 is 0.2659 for ConfliBERT, 0.4009 for Gemma, and 0.3489 for Llama. ConfliBERT's micro precision is highest at 0.4706, but recall is only 0.1956. Generative models output invalid entity categories despite explicit prompts; ConfliBERT produces none. Perfect Money extraction covers only two gold entities.

GTD results from Table 5:

| Model | Macro precision | Macro recall | Macro F1 | Reported total inference time |
| --- | ---: | ---: | ---: | ---: |
| ConfliBERT | 0.79 | 0.71 | 0.74 | 27.6 s |
| ConflLlama Q4KM | 0.66 | 0.54 | 0.57 | 49.9 min |
| ConflLlama Q8 | 0.70 | 0.62 | 0.65 | 52.3 min |
| Gemma 2 | 0.26 | 0.21 | 0.21 | 3.1 h |
| Llama 3.1 | 0.22 | 0.24 | 0.21 | 3.3 h |
| Qwen 2.5 | 0.43 | 0.42 | 0.40 | 5.8 h |

ConflLlama timings use Delta HPC resources and are explicitly not directly comparable with the other timings. Table 6 reports ConfliBERT subset accuracy of 79.38% and Hamming loss of 0.035, versus 72.40% and 0.052 for ConflLlama Q8. Cumulative event counts show category-specific over- and underprediction, including undercounting bombings by the general-purpose models.

Table 4 reports BBC classification times of 3.52 s for ConfliBERT, 575.23 s for Llama, and 730.14 s for Gemma; NER times are 1.42 s, 489.39 s, and 866.23 s. These are implementation-specific inference comparisons. Appendix D reports average GTD F1 of 0.7441 for ConfliBERT versus 0.6001 for a fine-tuned ModernBERT variant, with particularly large gaps for rare attack types.

## Limitations

The comparison mixes domain pretraining, supervised adaptation, zero-shot prompting, architecture, and quantization. It establishes practical performance for these configurations rather than an isolated causal effect of encoder architecture. The abstract's broad superiority claim does not hold for aggregate NER F1. Inference timings exclude the substantial original pretraining investment and depend on hardware and serving configuration.

The supplied text contains unresolved reporting inconsistencies: BBC is described with 735 test records while Table 2 totals 322; GTD total times and per-document times do not reconcile with the narrative's 37,709 texts; and Figure 4's caption says 2017–2021 while the evaluation narrative says 2017–2020. Model descriptions also alternate between base and instruction-tuned variants and between 7B and 8B Llama; this summary follows the methodology and result tables where possible. These ambiguities limit exact replication from the manuscript alone.

## Related Concepts

- [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]]: helps distinguish adaptation of pretrained representations from evaluation of frozen features or prompted models; ConflLlama instead uses parameter-efficient adapters.

## Related Papers

- [[papers/on-finetuning-large-language-models|On Finetuning Large Language Models]]: demonstrates that the ConfliBERT adaptation setup can reverse comparisons with dictionary methods in conflict regression.
- Hu et al. (2022), “ConfliBERT: A Pre-Trained Language Model for Political Conflict and Violence”: introduces the underlying domain-specific encoder evaluated here.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/KDO5AM).
