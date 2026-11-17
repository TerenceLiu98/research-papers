---
title: "Moral Foundations Twitter Corpus: A Collection of 35k Tweets Annotated for Moral Sentiment"
type: paper
authors:
  - Joe Hoover
  - Gwenyth Portillo-Wightman
  - Leigh Yeh
  - Shreya Havaldar
  - Aida Mostafazadeh Davani
  - Ying Lin
  - Brendan Kennedy
  - Mohammad Atari
  - Zahra Kamel
  - Madelyn Mendlen
  - Gabriela Moreno
  - Christina Park
  - Tingyee E. Chang
  - Jenna Chin
  - Christian Leong
  - Jun Yen Leung
  - Arineh Mirinjian
  - Morteza Dehghani
year: 2020
doi: 10.1177/1948550619876629
venue: Social Psychological and Personality Science
tags:
  - moral-psychology
  - computational-text-analysis
  - dataset
---

## TL;DR

The Moral Foundations Twitter Corpus (MFTC) provides a reported 35,108 tweets from seven discourse domains, annotated by at least three trained raters for ten moral virtue/vice categories. Annotator metadata and classification baselines make it useful for studying both moral-language measurement and subjective annotation. A multitask LSTM reaches pooled moral-versus-nonmoral F1 of 0.80, but performance varies sharply by domain and foundation.

## Research Question

How can researchers obtain reusable human annotations and comparative computational baselines for measuring document-level moral sentiment across heterogeneous discourse domains?

## Motivation

Moral expressions are sparse, context-dependent, overlapping, and often implicit. Training annotators requires substantive expertise, while limited shared data and measurement baselines make independent studies costly and difficult to compare.

## Contributions

- A multi-domain corpus covering All Lives Matter, Black Lives Matter, Baltimore protests, the 2016 US election, hate/offensive speech, Hurricane Sandy, and #MeToo.
- Separate virtue and vice annotations, allowing overlapping moral concerns and a nonmoral label.
- Psychological and demographic metadata for 13 undergraduate annotators, collected after annotation.
- A coding guide and comparisons of dictionary, embedding-based, and neural classification approaches.

## Method

The taxonomy follows [[concepts/moral-foundations-theory|Moral Foundations Theory]]: care/harm, fairness/cheating, loyalty/betrayal, authority/subversion, and purity/degradation. Annotators receive repeated training but retain independent judgments; the guide discourages speculative inference about authorial intent and artificially forcing agreement.

The general sampling procedure uses distributed dictionary representation (DDR) to score tweets for ten poles, selects the 500 highest-scoring tweets for each pole, and samples another 500 from a specified near-zero-score subset before removing duplicates. This enriches morally relevant material rather than estimating natural Twitter prevalence.

Aggregated positive labels require at least 50% agreement, so ties count as positive. Baselines collapse virtue and vice into five foundations and also predict any moral content. Three linear SVM pipelines use original Moral Foundations Dictionary counts, MFD2 counts, or DDR similarity features; the fourth uses a multitask LSTM. Evaluation uses ten-fold cross-validation separately within domains and on the pooled corpus. Pooled evaluation is not a held-out-domain transfer test.

## Experiments

Table 7 reports pooled moral-versus-nonmoral performance, with means across folds:

| Model | F1 | Precision | Recall |
|---|---:|---:|---:|
| SVM–MFD | 0.61 | 0.52 | 0.75 |
| SVM–MFD2 | 0.66 | 0.58 | 0.75 |
| SVM–DDR | 0.71 | 0.70 | 0.73 |
| LSTM | 0.80 | 0.81 | 0.79 |

Each pooled F1 has a reported fold standard deviation of 0.01. The LSTM's domain-level F1 ranges from 0.14 on Davidson hate-speech data to 0.89 on BLM. Foundation prediction is harder: pooled LSTM F1 is 0.63 for care, 0.70 for fairness, 0.43 for loyalty, 0.47 for authority, and 0.41 for purity (Tables 8–12). The LSTM does not dominate every foundation/domain combination; for example, Sandy fairness F1 is 0.10 versus 0.59 for SVM–MFD2.

Table 6 reports overall Fleiss's kappa of 0.27 and prevalence/bias-adjusted kappa of 0.29. Individual virtue/vice adjusted scores are substantially higher, illustrating the importance of label prevalence when interpreting agreement. Metadata enables future study of annotator effects; the paper does not establish causal effects of annotator ideology on labels.

## Limitations

- Topic selection and moral-score enrichment limit population representativeness. Domain-specific meanings require validation before transfer; the authors suggest adding annotations from the target domain.
- Annotators come from one university undergraduate population and skew liberal. Consensus labels summarize subjective judgments, with ties included as positives.
- Rare categories remain difficult even with neural models. Aggregate moral detection can conceal poor foundation-specific recall.
- The supplied source has inconsistent corpus counts: the headline reports 35,108, Table 2 lists Davidson as 4,873, and Table 4 lists it as 4,961. Neither table's domain totals reproduces the headline exactly. Retain the reported headline without treating these counts as reconciled.

## Related Concepts

- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: supplies the annotation taxonomy; separating virtues from vices preserves distinctions later collapsed by the baselines.

## Related Papers

- [[papers/constructing-vec-tionaries-to-extract-message-features-from-texts-a-case-study-of-moral-content|Constructing Vec-tionaries to Extract Message Features from Texts: A Case Study of Moral Content]]: a complementary approach to measuring moral strength and direction with weighted semantic axes.
- Garten et al. (2018), “Dictionaries and distributions”: supplies the DDR approach used in sampling and SVM features.
- Mooijman et al. (2018), “Moralization in social networks and the emergence of violence during protests”: uses the Baltimore annotations in a downstream application.

Source: supplied parsed Markdown, Cognitio job `bed97529-52fe-4253-b763-7872375d25f8`. [Published paper](https://doi.org/10.1177/1948550619876629).
