---
title: "A Real-Time System to Populate FRA Form 57 from News"
type: paper
authors:
  - Chansong Lim
  - Haz Sameen Shahgir
  - Jia Chen
  - Yue Dong
  - Evangelos E. Papalexakis
year: 2026
doi: "10.1145/3773966.3779406"
tags:
  - railway-safety
  - key-information-extraction
  - visual-language-models
  - question-answering
  - information-retrieval
---

## TL;DR

This paper presents a real-time pipeline for extracting information from news articles to populate the Federal Railroad Administration's Highway-Rail Grade Crossing Accident/Incident Report (Form 57). It combines vision-language-model transcription of the irregular form with sample aggregation and a human-centric subfield schema, then performs grouped question answering over news articles to reduce field ambiguity. On a linked California news and FRA-record dataset, grouped questioning improves retrieval coverage relative to per-field and all-in-one baselines, while retaining competitive accuracy.

## Research Question

Can a system provide timely, structured railway-incident information from noisy news coverage by first modeling the layout and semantics of a complex government form, then retrieving its fields with context-aware question answering?

## Motivation

FRA investigations can take days to weeks, while news articles may be the only publicly available source of early incident details. Form 57 is difficult for conventional parsers because its cells mix labels, choice lists, units, checkboxes, and free-text areas, and many field names are ambiguous without their neighboring fields. The paper therefore treats form interpretation and news retrieval as connected problems: the form supplies the schema and context needed to ask better questions of the article.

## Contributions

- Constructs a dataset of railway-accident news articles linked to official FRA records, including manual annotations of which fields are answerable from the news.
- Introduces a task-specific vision-language-model formulation for transcribing the 66 fields of Form 57 into structured JSON.
- Uses sample aggregation to reduce omitted or hallucinated form elements and a human-centric schema that represents each writable or markable subfield.
- Groups fields by visual layout and semantic meaning before querying news articles, so related fields can disambiguate one another.
- Evaluates the pipeline with field-level retrieval accuracy and coverage, where coverage measures the share of answerable fields for which the system attempts an answer rather than returning `Unknown`.

## Method

The key information extraction stage prompts a vision-language model to produce a predefined JSON representation of Form 57. Each field can contain answer places with an answer type (text, digit, or single choice) and, for choice fields, the available codes and labels. The system samples multiple independent transcriptions, validates their schema format, and asks the model to merge them into a more complete transcription. It then asks the model to group the transcribed fields using both their visual arrangement and semantic relationships, with example groups covering time and location, highway users, trains, hazardous materials, casualties, and the environment.

For information retrieval, the system asks a language model questions for each group using a news article as context. Answers follow the field's type, and fields that cannot be answered from the article receive `Unknown`. The evaluation dataset was built by querying for articles using an FRA record's state, county, city, and a date window from the incident date through seven days afterward. Multiple news extraction tools and both direct requests and active crawling were used to handle client-side rendering and lazy-loaded content. Articles were matched to FRA records using temporal, spatial, highway-user, and casualty information.

## Experiments

The initial crawl collected 1,707 articles, most of which were irrelevant; the final dataset contains 266 matched news-record pairs focused on recent train-vehicle and train-pedestrian collisions. Fifty pairs were manually annotated for field answerability so that coverage could be measured.

For form transcription, AWS Textract produced 25 erroneous fields out of 66. ChatGPT o4-mini averaged 4.75 errors with sample aggregation alone, 2.75 with the human-centric schema alone, and 1.25 with both strategies. Gemini 2.5 Flash averaged 1.25 errors with the schema strategy and 1 error when both strategies were used.

For retrieval, the simple FRA-field baseline reached 0.52 accuracy and 0.91 coverage. Per-field questioning over the VLM transcription reached 0.55-0.57 accuracy and 0.88-0.89 coverage across the reported model settings. Asking all fields in one prompt reached 0.67-0.71 accuracy but 0.85-0.90 coverage. The proposed grouped questioning reached 0.65-0.67 accuracy and 0.89-0.96 coverage, trading a modest amount of accuracy for broader retrieval. In the answer-type analysis, grouped questioning reached 0.69 accuracy for single-choice fields, 0.64 for digit fields, and 0.64 for free-text fields in the reported Gemini 2.5 Flash setting.

Digit fields were harder because news reports often contain tentative or updated numbers and lack the predefined choices that help disambiguate single-choice fields. The least accurate fields were the fine-grained equipment fields: "24. Type of Equipment Consist" reached 0.48 accuracy and "17. Equipment" reached 0.56, partly because their detailed choice sets rarely appear explicitly in news articles.

## Limitations

The evaluation is centered on California railway-crossing incidents and a curated set of matched news reports, so it does not establish nationwide coverage or performance on underreported incidents. The dataset construction also required aggressive filtering because nearly two-thirds of the initially scraped articles were irrelevant. Numerical details in news can change over time, and fine-grained equipment categories remain difficult to map from partial descriptions. The grouped strategy improves coverage at a modest accuracy cost, so its operational value depends on whether early access to more potentially answerable information is preferred to narrower, more precise retrieval. The authors identify broader data sources and nationwide deployment as future work.

## Related Concepts

- [[Key Information Extraction]]
- [[LLM-Assisted Web Retrieval]]
- Visual-language models
- Document understanding
- Question answering
- Information retrieval

## Related Papers

- Appalaraju et al. (2021), "DocFormer: End-to-End Transformer for Document Understanding." [arXiv:2106.11539](https://arxiv.org/abs/2106.11539)
- Bai et al. (2025), "Qwen2.5-VL Technical Report." [arXiv:2502.13923](https://arxiv.org/abs/2502.13923)
- Cheng et al. (2022), "TRIE++: Towards End-to-End Information Extraction from Visually Rich Documents." [arXiv:2207.06744](https://arxiv.org/abs/2207.06744)
- Hong et al. (2022), "BROS: A Pre-trained Language Model Focusing on Text and Layout for Better Information Extraction from Documents." [arXiv:2108.04539](https://arxiv.org/abs/2108.04539)
- Huang et al. (2022), "LayoutLMv3: Pre-training for Document AI with Unified Text and Image Masking." [arXiv:2204.08387](https://arxiv.org/abs/2204.08387)
- Lee et al. (2023), "Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding." [arXiv:2210.03347](https://arxiv.org/abs/2210.03347)

[[index|Library home]]
