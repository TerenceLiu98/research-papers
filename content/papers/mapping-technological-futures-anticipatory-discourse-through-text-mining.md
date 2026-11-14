---
title: "Mapping technological futures: anticipatory discourse through text mining"
type: paper
authors:
  - Maciej Skórski
  - Alina Landowska
  - Krzysztof Rajda
year: 2025
doi: "10.1057/s41599-025-05083-5"
source_job_id: "965eb1d0-5f09-4450-babe-a202c95bdcd8"
tags:
  - anticipatory-discourse
  - topic-modeling
  - social-media
  - emotion-analysis
---

## TL;DR

An analysis of 1,458,018 X posts from 400 technology opinion leaders identifies 100 topics and finds predominantly neutral sentiment alongside higher constructed Hope than Anxiety scores. The study maps technological expectations and emotional framing; its post-volume measures do not establish effects on audiences.

## Research Question

Which technological futures do key opinion leaders anticipate on X, how do their themes evolve and intersect, and what sentiments and anticipatory emotions accompany them?

## Motivation

[[concepts/anticipatory-discourse|Anticipatory Discourse]] connects imagined technological change to present concerns. Mapping influential accounts can reveal which futures receive attention, but requires distinguishing thematic prominence, emotional framing, and actual social influence.

## Contributions

- Combines contextual topic modeling, keyword analysis, and sentiment and emotion classification in a large technology-discourse corpus.
- Organizes 100 topics into 21 thematic clusters and describes their temporal patterns and concentration among authors.
- Operationalizes Hope, Anxiety, Optimism, and Pessimism through sums of predicted emotion scores, linking computational description to theories of anticipation.

## Method

The corpus covers January 1, 2021–March 31, 2023, with 400 expert-selected accounts, 1,200,003 unique texts, and 1,458,018 unique timestamp–text posts. Posts are primarily English; preprocessing removes URLs, email addresses, and user handles.

Online BERTopic uses all-MiniLM-L6-v2 embeddings, IncrementalPCA, MiniBatchKMeans, and OnlineCountVectorizer with batches of 100,000. The authors explore 25–150 topics and select 100 using coherence and human inspection. Lemmatized keywords and class-based TF-IDF support interpretation. Account prominence is measured by post volume.

Brand24 classifies positive, neutral, and negative sentiment. A Cardiff NLP model supplies emotion predictions. The study constructs Hope as Anticipation + Trust, Anxiety as Anticipation + Fear, Optimism as Anticipation + Joy, and Pessimism as Anticipation + Sadness, averaging scores by topic. These sums are operational measures, not direct measurements of psychological states. Spearman correlations use Bonferroni correction; paired sentiment and emotion comparisons use one-sided Wilcoxon tests.

## Experiments

This is an observational corpus study rather than a comparative model benchmark.

| Analysis | Reported result |
| --- | --- |
| Topic structure | 100 topics, 21 clusters; coherence value approximately 0.66 |
| Sentiment | 68.9% neutral, 21.5% positive, 9.6% negative |
| Mean topic sentiment | Approximately 0.116; positive-versus-negative Wilcoxon p = 2 × 10⁻¹⁸ |
| Hope versus Anxiety | Topic medians 0.6345 versus 0.5751; Wilcoxon p = 5.58 × 10⁻⁷ |
| Optimism versus Pessimism | Topic medians 0.9979 versus 0.5830 |
| Author concentration | Top 10 accounts contribute 187,645 posts, approximately 13% of the corpus |

On 500 manually annotated, stratified technology posts, reported sentiment precision/recall/F1 are 0.87/0.85/0.86 and emotion detection scores are 0.84/0.81/0.83; Cohen’s kappa is 0.82. The supplied text does not specify the metric averaging convention.

AI, machine learning, IoT, climate, and geopolitical discussion are prominent. The authors associate selected activity peaks with WEF and COP27 events. These temporal alignments are descriptive, not causal estimates. Data and results are linked in the paper at [OSF](https://osf.io/z925y).

## Limitations

Expert-selected, primarily English technology accounts do not represent the wider public. Likes, shares, and comments were unavailable, so activity volume cannot establish audience engagement or influence. Automated scores may miss contextual nuance and domain-specific meanings; the authors recommend qualitative analysis and domain adaptation.

The source has inconsistencies in topic identifiers and labels, and describes climate-related Anxiety differently in its abstract and detailed results. Its prose also reverses the positive/negative labels next to the sentiment equation. These inconsistencies warrant caution in reusing topic-specific rankings. The authors themselves question the Anticipation–Joy combination as a measure of Optimism. Correlations among component emotions do not independently validate the constructed psychological measures.

## Related Concepts

- [[concepts/anticipatory-discourse|Anticipatory Discourse]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]] — coherence and manual inspection support topic interpretation but do not validate causal claims about influence.

## Related Papers

- [[papers/topic-modeling-for-short-texts-via-optimal-transport-based-clustering|Topic Modeling for Short Texts via Optimal Transport-Based Clustering]] — a methodological comparison in the library addressing short-text topic separation; it is not a baseline evaluated here.
- Grootendorst (2022), “BERTopic: Neural topic modeling with a class-based TF-IDF procedure,” is the modeling reference cited by the study.

[Published article](https://doi.org/10.1057/s41599-025-05083-5) · [[index|Library home]]
