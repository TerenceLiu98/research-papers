---
title: "Automated Text Classification of News Articles: A Practical Guide"
type: paper
authors:
  - Pablo Barberá
  - Amber E. Boydstun
  - Suzanna Linn
  - Ryan McMahon
  - Jonathan Nagler
year: 2021
doi: "10.1017/pan.2020.8"
tags:
  - text-as-data
  - political-methodology
  - sentiment-analysis
---

## TL;DR

Decisions about corpus selection and human annotation materially change automated measures of news tone. In New York Times economic coverage, keyword retrieval produces a larger, more relevant corpus than archive subject categories; segment coding performs nearly as well as sentence coding; and supervised logistic regression outperforms three sentiment dictionaries. The practical recommendation is transparent retrieval and human validation throughout the pipeline.

## Research Question

How do corpus retrieval, coding unit, allocation of annotation effort, and classification method affect the measurement of economic news tone as perceived by human readers?

## Motivation

A classifier cannot repair an unrepresentative corpus. Likewise, inexpensive dictionary scores and highly replicated human labels can conceal poor measurement or inefficient use of annotation budgets. The paper makes these upstream choices explicit and evaluates their downstream consequences.

## Contributions

- Compares keyword and proprietary subject-category retrieval for the same newspaper and period.
- Tests sentence versus segment annotation and simulates the trade-off between more documents and more coders per document.
- Compares supervised classification with dictionaries on accuracy, positive-class precision, discrimination, and training-set size.

## Method

The corpus comparison covers New York Times articles from 1980–2011, retrieved using ProQuest keywords or LexisNexis subject categories. CrowdFlower workers assess relevance in samples of 1,000 articles unique to each corpus and 1,000 shared articles.

Classification experiments draw on articles from 1947–2014. Segments generally comprise the first five sentences. Nine-point tone labels are collapsed into negative (1–4) and positive (6–9), excluding neutral labels. The selected classifier is L2-regularized logistic regression with up to 75,000 stemmed unigram, bigram, and trigram features; stopwords remain, and features must occur in at least three documents and no more than 80% of documents.

The CF Truth benchmark begins with ten crowd judgments per segment and retains 442 segments judged relevant by at least seven coders, omitting neutral mean tone. A separate undergraduate benchmark aggregates sentence judgments. Annotation-allocation simulations generate 20,000 documents from a 50-variable model and compare one to four coders per document under fixed total coding budgets.

## Experiments

**Corpus selection (§2).** Keyword retrieval yields 30,787 articles versus 18,895 for subject categories. Only 13.9% of keyword articles occur in the category corpus. Relevance proportions are 0.44 for shared articles, 0.42 for keyword-only articles, and 0.37 for category-only articles. Monthly tone correlations across corpora are 0.48 with Lexicoder and 0.59 with supervised classification; correlations of changes fall to 0.19 and 0.36.

**Annotation (§3).** Sentence-trained and segment-trained classifiers achieve 0.700 and 0.693 out-of-sample segment accuracy, respectively. Simulations favor more unique documents over repeated labels at fixed effort, while retaining overlapping annotation for coder assessment.

**Classification (§4, Figure 3).** Reported performance against CF Truth:

| Method | Accuracy | Positive-class precision |
| --- | --- | --- |
| Supervised classifier | 71.0% | 71.3% |
| SentiStrength | 60.5% | 37.5% |
| Lexicoder | 58.6% | 45.7% |
| Hopkins 21-word method | 56.9% | 38.5% |

Only the full supervised classifier beats the approximately 63% majority-class accuracy baseline. With 250 training observations, supervised accuracy is about that baseline despite exceeding the dictionaries. ROC AUC is 0.744 for supervised classification versus 0.602 for Lexicoder. Supervised scores also better distinguish relative tone across score deciles.

## Limitations

Evidence comes from one newspaper and one substantive task; transfer across outlets, decades, and domains needs validation. The retrieval comparison also uses different archive providers, and neither corpus reveals the complete relevant population. Both contain substantial irrelevant material. Human consensus is a benchmark based on the assumption of a shared interpretable tone, not an independently observed truth. Segment results do not establish equivalence to coding full articles. The allocation simulation assumes unbiased coders; its recommendation does not remove the need to assess coder quality. Supervised superiority depends on representative, sufficiently informative training data rather than being unconditional.

## Related Concepts

- [[concepts/corpus-selection-for-text-analysis|Corpus Selection for Text Analysis]] — retrieval determines the population represented by downstream measurements.

## Related Papers

- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]] — a complementary human-validation approach for text scaling rather than tone classification.
- Grimmer and Stewart (2013), *Text as Data: The Promise and Pitfalls of Automatic Content Analysis Methods for Political Texts* — methodological foundation cited by this guide.

Published in *Political Analysis* 29:19–42 (2021), online 9 June 2020. [Paper](https://doi.org/10.1017/pan.2020.8). Replication resources reported in the paper: [Dataverse](https://doi.org/10.7910/DVN/MXKRDE) and [Code Ocean](https://doi.org/10.24433/CO.4630956.v1).
