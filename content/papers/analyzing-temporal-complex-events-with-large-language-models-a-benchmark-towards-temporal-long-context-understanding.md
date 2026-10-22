---
title: "Analyzing Temporal Complex Events with Large Language Models? A Benchmark towards Temporal, Long Context Understanding"
type: paper
authors:
  - Zhihan Zhang
  - Yixin Cao
  - Chenchen Ye
  - Yunshan Ma
  - Lizi Liao
  - Tat-Seng Chua
year: null
source_job_id: "17e12720-a12e-40eb-a11f-8e8439aeeace"
tags:
  - temporal-reasoning
  - long-context
  - event-forecasting
  - retrieval-augmented-generation
  - benchmarks
---

## TL;DR

The paper introduces TCELongBench, an 88,821-question benchmark built from 2,289 evolving news stories, to test detailed reading, chronological ordering, and future-event forecasting over long, timestamped contexts. Experiments compare retrieval-augmented 4K-context models with 16K-128K models: retrieval quality is a major bottleneck, suitable retrieval can rival long-context processing, and models remain particularly weak at temporal ordering and open-ended forecasting.

## Research Question

How well can large language models understand [[concepts/temporal-complex-events|Temporal Complex Events]] that span many dated news articles, and how do retrieval-augmented models compare with models that ingest long contexts directly on evidence location, temporal sequencing, and forecasting?

## Motivation

A developing real-world story can comprise dozens of related articles published over days or weeks. An average event in the paper's source corpus contains 29.31 articles across 17.44 days, while the introduction reports an average input length of 18,589 tokens. Analyzing such material requires more than topic clustering: a model must locate dispersed evidence, associate claims with timestamps, recover event order, and reason about possible next developments. Structured extraction pipelines can make this material easier to query, but introduce cost and extraction error. The paper therefore studies LLMs directly over news text and derived event outlines.

## Contributions

- Defines an LLM-based pipeline that turns daily news collections into chronological outlines of concise event key points.
- Constructs TCELongBench with 61,053 detail questions, 21,164 ordering questions, and 6,604 forecasting questions after filtering and deduplication.
- Compares short-context models with sparse, dense, and hybrid retrieval against models with context windows from 16K to 128K tokens.
- Analyzes retrieval recall, input length and evidence position, temporal retrieval strategies, and failure modes in open-ended forecasting.

## Method

### Temporal Complex Event Outlines

A temporal complex event contains news grouped by timestamp. The pipeline first summarizes every article, summarizes those article summaries into a daily summary, and prompts `gpt-3.5-turbo-instruct` to split each daily summary into independent, concise key points. It removes later key points when either a supervised SimCSE similarity score or a Quora-trained DistilRoBERTa duplication score exceeds 0.8. It also removes isolated noisy points whose similarity to every other point in the event is below 0.2.

### Benchmark Tasks

- **TLB-detail:** four-choice reading comprehension whose supporting article occurs before the final timestamp.
- **TLB-order:** rank three shuffled key points sharing an entity into chronological order.
- **TLB-forecast:** answer a multiple-choice or open-ended question about the final timestamp, while evaluation exposes only earlier articles.

Question-answer pairs are generated from outline points and articles. Distractors follow the STARC scheme: a plausible misunderstanding, an answer grounded in an article from another date, and an invented answer. Verification checks evidence and distractor plausibility for detail questions; forecasting questions additionally require an uncertain but tractable future inference; ordering questions are checked for temporal validity and storyline coherence. LLM-based checks run three times and retain an item when at least two runs pass it.

### Retrieval and Long-Context Conditions

The retrieval condition supplies three 512-token chunks to 4K-context Vicuna, Llama 2, or GPT-3.5 models. Retrievers are BM25, `text-embedding-ada-002`, and a hybrid with reranking. Long-context conditions feed accessible articles and timestamps directly to models with 16K, 32K, or 128K windows, applying task-specific truncation when necessary.

For ordering, the paper contrasts retrieving once with all three choices concatenated against retrieving separately for each choice and selecting the earliest timestamp among its top three chunks. The latter exploits repeated reporting of events in later news articles.

## Experiments

### Data and Evaluation

TCELongBench derives from 2,289 MidEast-TE event clusters sourced from GDELT. Events shorter than five days or longer than one month are excluded. The split contains 1,602 training, 343 development, and 344 test events. Closed-form detail and forecast tasks use accuracy; ordering uses accuracy, weighted F1, and Levenshtein distance; open-ended forecasts use BLEU and METEOR.

A human study covers 84 questions from ten events with three annotators. Mean human accuracy is 77.38%. The reported aggregate ratings are 97.61% for needing context, 86.90% for evidence, 95.67% for question reasonableness, 90.12% for choice plausibility, 77.78% for temporal validity, and 95.56% for storytelling. These dimensions apply to different task subsets, so they are not a single interchangeable quality score.

### Main Results

| Model and context method | TLB-detail accuracy | TLB-order accuracy | TLB-forecast MCQ accuracy |
| --- | ---: | ---: | ---: |
| GPT-3.5-4K + hybrid retrieval | 84.0 | 15.3 / 18.8 | 61.7 |
| GPT-3.5-16K | 82.4 | 19.5 | 61.4 |
| ChatGLM3-6B-32K | 79.4 | 19.8 | 60.3 |
| GPT-4-128K | 91.9* | 29.6 | 72.0 |

The two ordering values for retrieval are retrieve-once and retrieve-one-by-one. The GPT-4 detail result uses a random 1,000-item subsample because of cost. GPT-4-128K leads the reported closed-form results, but even its ordering accuracy is 29.6%.

Retriever diagnostics clarify the bottleneck. On TLB-detail, BM25, dense, and hybrid retrieval find the gold article for 72.8%, 64.9%, and 75.3% of questions, respectively, and the gold date for 85.1%, 79.1%, and 87.5%. On TLB-order, retrieve-one-by-one raises the hybrid retriever's all-dates recall from 1.1% to 26.7%. Directly sorting choices by the retrieved timestamps outperforms the tested LLM-based ordering methods, suggesting that the models fail to use explicit temporal evidence fully.

Longer inputs generally reduce detail accuracy, and most tested long-context models perform better when relevant articles are near the end of the prompt, where the question is also placed. Several open-source long-context variants substantially underperform their retrieval-augmented counterparts, showing that nominal context capacity does not ensure effective long-context use. Open-ended forecasting remains poor under BLEU and METEOR, while manual inspection finds semantically correct answers that lexical metrics miss and many indirect or refusal-like answers.

## Limitations

- The paper evaluates only TCELongBench test sets; its training and development splits are left for future work.
- News may have appeared in model pretraining data. GPT-3.5-4K exceeds 50% multiple-choice accuracy without context, so memorization may inflate results.
- Generated questions and verification depend on LLMs. The human check is limited to 84 items from ten events, and some dimensions have only 24 or 30 evaluated examples.
- Retrieval and truncation use fixed choices such as three 512-token chunks. The study does not establish that these settings are optimal.
- Exact-format scoring counts malformed but potentially meaningful outputs as incorrect. BLEU and METEOR also undercount semantically valid open-ended forecasts.
- GPT-4-128K detail accuracy is based on a 1,000-item subsample rather than the complete test set; the tables report no uncertainty intervals or significance tests.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those metadata are not inferred here.

## Related Concepts

- [[concepts/temporal-complex-events|Temporal Complex Events]]: evolving, timestamped collections of related reports and their chronological outlines.
- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: a graph-based formulation built from the same MidEast-TE lineage, with explicit actors and relations.
- [[concepts/open-ended-event-forecasting|Open-Ended Event Forecasting]]: free-form prediction beyond fixed answer choices, including the temporal information-boundary problem.
- [[concepts/temporal-leakage-in-language-models|Temporal Leakage in Language Models]]: contamination and post-cutoff knowledge can invalidate forecasting evaluations.

## Related Papers

- [[papers/structured-complex-and-time-complete-temporal-event-forecasting|Structured, Complex and Time-complete Temporal Event Forecasting]]: introduces MidEast-TE and forecasts missing objects in timestamped relational event graphs.
- [[papers/openep-open-ended-future-event-prediction|OpenEP: Open-Ended Future Event Prediction]]: evaluates free-form forecasts with retrieval of current evidence and historical analogues.
- Bai et al. (2023), "LongBench: A bilingual, multitask benchmark for long context understanding": cited long-context benchmark.
- Jin et al. (2021), "ForecastQA: A question answering challenge for event forecasting with temporal text data": supplies the forecasting-QA precedent and generation examples.
- Liu et al. (2023), "Lost in the middle: How language models use long contexts": motivates the analysis of evidence position.

[[index|Library home]]
