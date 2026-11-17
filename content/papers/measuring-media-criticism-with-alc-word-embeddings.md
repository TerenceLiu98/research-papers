---
title: "Measuring Media Criticism with ALC Word Embeddings"
type: paper
authors:
  - Christopher Barrie
  - Neil Ketchley
  - Alexandra Siegel
  - Mossaab Bagdouri
year: 2025
doi: "10.1017/pan.2025.10012"
tags:
  - text-as-data
  - word-embeddings
  - media-freedom
  - political-measurement
---

## TL;DR

Context-specific embeddings of political leaders, compared with a support–opposition semantic axis, provide granular measures of media criticism. Across Arabic news from five countries, the measure tracks major political transitions; a synthetic difference-in-differences application estimates an approximately one-standard-deviation decline after Egypt’s 2013 coup. Criticism is an indicator of media freedom, not a direct measure of press autonomy.

## Research Question

Can news text yield inexpensive, temporally granular measures of criticism of political executives, including when target mentions are sparse?

## Motivation

Expert-coded democracy indicators typically aggregate to country-years and may miss smaller changes within stable authoritarian regimes. Repeated observations of news coverage could complement these assessments, while allowing outlet-level and weekly analysis.

## Contributions

- An unsupervised measurement pipeline combines contextual leader embeddings with a semantic criticism dimension.
- Validation spans political transitions, sparse-data sensitivity tests, and synthetic multilingual news.
- Changepoint detection and counterfactual estimation illustrate descriptive and causal uses of the resulting outcome measure.

## Method

The corpus contains 8.5 million unique articles from 335 news sources in Algeria, Egypt, Morocco, Saudi Arabia, and Tunisia, collected over 2008–2019. Country samples are capped at roughly 1.7 million articles. A shared GloVe reference space is trained on up to 1.5 million pooled articles, using 300 dimensions, a six-word window, and approximately 30,000 vocabulary items after preprocessing.

[[concepts/a-la-carte-embeddings|À La Carte Embeddings]] induce leader representations for each country-week from averaged context vectors and a learned transformation matrix. The reference vectors and transformation are reused across periods, avoiding separately trained, unaligned spaces. The reported transformation weighting is 100.

The semantic axis is constructed as support minus opposition. Cosine comparison places leader contexts relative to these poles; proximity to opposition denotes greater criticism, so the raw axis direction must be distinguished from a criticism-oriented display score. Criticism includes protest reporting, critical editorials, and quoted criticism by others. This operationalization measures coverage as well as a newspaper’s own editorial position.

## Experiments

| Analysis | Reported evidence |
| --- | --- |
| Expert-score comparison | Spearman correlations with V-Dem are 0.85 for Egypt and 0.93 for Tunisia. Stable autocracies exhibit more variation in text scores than expert scores. |
| Sparse-data sensitivity | Basic trends can survive two leader mentions per period and a 1,000-word vocabulary. Training on 10,000 articles is less reliable for Tunisia; transformation weighting of 100,000 departs markedly from other settings. These are empirical sensitivity findings, not universal minimum requirements. |
| Changepoints | Weekly structural-change diagnostics broadly locate Egypt’s July 2013 coup and Tunisia’s late-2010/early-2011 transition. Timing varies across training sizes, with the smallest training corpus especially problematic in Tunisia. |
| Coup effect | A weekly panel of ten Egyptian and ten Tunisian newspapers, beginning in February 2011, supports synthetic difference-in-differences estimation. The reported decline is roughly one pre-coup standard deviation, with p < .001, and persists after the coup. |
| Multilingual simulation | GPT-3.5-turbo and GPT-4o generate 500 critical and 500 noncritical articles per language in Arabic, Chinese, English, French, Japanese, Korean, Russian, and Spanish. The method detects the imposed midpoint shift across all eight languages for both generators. |

The paper reports supplementary human-label comparisons, design-based supervised learning, and alternative indices, targets, and normalization checks. Their detailed results are not supplied in this Markdown. Synthetic multilingual tests use pretrained resources rather than fitting a new embedding space for each language.

## Limitations

Leader popularity and economic performance can change criticism independently of press autonomy. Publicly available outlets may be selectively represented or censored. Coded dissent and nuanced self-censorship are not directly captured, and the support–opposition vocabulary is assumed sufficiently stable over time. Multilingual synthetic results do not establish validity on real news in every tested language. The coup estimate additionally depends on the suitability of Tunisian newspapers as counterfactual controls; embedding measurement alone does not identify a causal effect. Raw news text cannot be shared under the data agreement.

## Related Concepts

- [[concepts/a-la-carte-embeddings|À La Carte Embeddings]]: supplies the reusable context-based induction procedure for weekly leader representations.

## Related Papers

- [[papers/multilanguage-word-embeddings-for-social-scientists|Multilanguage Word Embeddings for Social Scientists]]: supplies pretrained multilingual resources used in the synthetic validation.
- Khodak et al. (2018), “A La Carte Embedding: Cheap but Effective Induction of Semantic Feature Vectors”: foundational induction method.
- Rodriguez, Spirling, and Stewart (2023), “Embedding Regression: Models for Context-Specific Description and Inference”: context-specific embedding framework used by the application.
- Arkhangelsky et al. (2021), “Synthetic Difference-in-Differences”: counterfactual estimator used for the coup analysis.

Source: supplied parsed article, published online August 26, 2025. [Replication materials](https://doi.org/10.7910/DVN/NXESQQ). Ingest job: `23c108bc-0714-446d-8a4b-e6e8c7c4d869`.
