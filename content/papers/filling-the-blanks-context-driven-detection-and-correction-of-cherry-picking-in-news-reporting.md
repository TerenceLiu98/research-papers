---
title: "Filling the Blanks: Context-driven Detection and Correction of Cherry-picking in News Reporting"
type: paper
authors:
  - Israa Jaradat
  - Haiqi Zhang
  - Chengkai Li
year: 2026
doi: "10.1609/icwsm.v20i1.42684"
venue: "Proceedings of the International AAAI Conference on Web and Social Media, 20(1), 1097-1113"
tags:
  - media-bias
  - cherry-picking
  - computational-journalism
  - text-classification
  - large-language-models
---

## TL;DR

The paper treats cherry-picking as the omission of important statements from a news report and detects those omissions by comparing coverage of the same event across outlets. It introduces the 3,346-example Cherry dataset and evaluates supervised transformers, prompted language models, and extractive summarizers for context-conditioned statement-importance classification. Context substantially improves classification; the strongest reported configurations approach 0.90 F1. Adding detected counter-perspective statements increases average embedding similarity to a neutral report from 0.619 to 0.695, while human evaluation finds gains in balance and comprehensiveness but slightly worse redundancy.

## Research Question

Can a system detect important facts omitted from a news story by using coverage from other sources, and can it integrate those facts to produce a report closer to a neutral account? The paper also asks which models and context lengths work best, whether opposing biased sources can replace a neutral source, how finely statement importance can be classified, and whether outlet-level cherry-picking correlates with general bias ratings.

## Motivation

Most computational media-bias methods analyze language that appears in an article, such as framing or lexical choices. [[concepts/cherry-picking-in-news-reporting|Cherry-Picking in News Reporting]] is harder to observe because the relevant evidence is absent. Manual detection requires reading multiple accounts of the same event, motivating a context-driven method that identifies omissions at sentence level.

## Contributions

- Formalizes omission-based cherry-picking as finding statements that are important to an event but absent from a target report.
- Introduces Cherry, a dataset of 3,346 statement-context examples drawn from 82 controversial events and labeled for statement importance.
- Compares fine-tuned BERT and Longformer models, zero- and few-shot GPT models, and unsupervised extractive summarizers under different context conditions.
- Builds a correction pipeline that verifies missing statements and uses an LLM to insert them into the target report.
- Evaluates both statement-importance granularity and the relationship between inferred cherry-picking and external outlet-bias ratings.

## Method

### Data construction

The authors collect non-opinion news from 41 outlets between December 2019 and January 2021. They cluster articles into events with DBSCAN using concatenated BERT and TF-IDF representations of headlines and opening paragraphs, then manually retain 82 controversial-event clusters. Sentences are clustered by semantic similarity; annotators see a least-biased context article and assign one of five importance labels to each cluster. Examples with fewer than three annotators or less than 75% agreement are removed. Labels propagate within sentence clusters, yielding 3,346 examples. The 85/15 train-test split is performed by event to prevent context leakage.

### Detection and correction

For event statement set $S_e$, target document $d_i$, and context $d$, the missing set is

$$
c_i=\{s\in S_e:f(s,d)=1\}-d_i,
$$

where $f$ predicts whether a statement is important. Presence is checked through semantic similarity or an LLM verification prompt. The correction stage inserts statements in $c_i$ into $d_i$ with another LLM prompt while attempting to preserve the report's style and flow.

The classifier families are fine-tuned BERT and Longformer sequence-pair models, zero- and few-shot GPT classifiers, and extractive ranking methods including LexRank, TextRank, a BERT summarizer, and a pairwise GPT-4o ranker. The supervised models receive a candidate statement paired with cross-source context; Longformer applies global attention to the classification and statement tokens.

## Experiments

Adding 100 words of neutral context to BERT-base raises accuracy from 0.619 to 0.846 and macro F1 from 0.617 to 0.870. Across models and context sizes, 10-shot GPT-4o performs best in the context-length comparison, while supervised models become comparable around 500 words. Most methods peak between 400 and 500 words; few-shot GPT variants are more stable across lengths. LLM ranking and LexRank lead the summarization baselines, but extractive methods struggle with important statements that occur infrequently.

Combining and summarizing left- and right-biased reports produces performance comparable to using a least-biased context, suggesting that a neutral source is not strictly required. In the authors' correction experiment, Longformer-large with 500 words of context scores 0.897 accuracy and 0.887 F1. Across 103 report triplets, correction raises mean cosine similarity to a neutral report from 0.619 to 0.695, an approximately 12% relative improvement.

Nine evaluators assess 30 corrected articles, with three evaluations per article. Mean scores are 3.5 for balance of viewpoints, 3.5 for even-handed presentation, and 4.1 for comprehensiveness on five-point scales. Grammatical soundness and coherence average 3.0, indicating little change, while redundancy averages 2.9, indicating a slight deterioration.

Importance classification becomes substantially harder at finer granularity: the four configurations yield F1 scores of 0.887, 0.828, 0.898, and 0.717. The three-class configuration separating "very important," "kind of important," and "not very important" performs worst because the latter two labels are difficult to distinguish.

On 2,453 held-out events containing about 97,000 statements, outlet cherry-picking scores have weak-to-moderate positive correlations with MBFC ($r=0.28$, $p=0.10$) and AllSides ($r=0.32$, $p=0.06$) ratings. Neither reaches the conventional 0.05 significance threshold. Category means generally rise with reported bias intensity, but several categories contain very few outlets.

## Limitations

- Event and sentence clustering depend on similarity thresholds. Misclustered articles can hide relevant coverage, while imperfect sentence clusters can inherit inaccurate labels.
- Importance judgments are subjective despite annotator diversity, source masking, agreement filtering, and the use of least-biased context.
- The correction evaluation treats selected neutral-outlet reports as ground truth, so conclusions depend on those reports actually being neutral and comprehensive.
- Embedding similarity measures semantic convergence, not neutrality by itself. The human study covers only 30 corrected articles and reports grouped averages rather than uncertainty estimates.
- The outlet-level correlation analysis uses 2019-2021 article data against bias ratings that can change over time; the reported correlations are not conventionally significant and some bias-category samples are small.
- The method addresses sentence omission. It does not yet detect event-selection bias, word-level slanting, or over-emphasis.

## Related Concepts

- [[concepts/cherry-picking-in-news-reporting|Cherry-Picking in News Reporting]]: the paper's central omission-based view of media bias and its context-driven detection strategy.
- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: a complementary approach measuring direction and emphasis in language that is present, rather than facts that are missing.
- [[concepts/text-embedding-models|Text Embedding Models]]: used for clustering, semantic presence checks, and evaluating corrected reports against neutral references.

## Related Papers

- Asudeh et al. (2020), "On Detecting Cherry-Picked Trendlines": cited work on detecting selective presentation in numerical trends rather than omissions in prose.
- Lin et al. (2021), "On Detecting Cherry-Picked Generalizations": cited computational work on cherry-picking in generalizations.
- Baly et al. (2020), "We Can Detect Your Bias: Predicting the Political Ideology of News Articles": cited document-level ideological classification that analyzes observed text rather than absent statements.
- Beltagy, Peters, and Cohan (2020), "Longformer: The Long-Document Transformer": supplies the long-context supervised architecture used in the strongest correction configuration.

Source: supplied parsed manuscript, Cognitio job `52d0a9d1-bfb8-4ef5-9dc4-76669b9dac48`. Publication metadata and DOI verified against the official ICWSM record.

[[index|Library home]]
