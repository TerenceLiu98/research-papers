---
title: Probabilistic Record Linkage Using Pretrained Text Embeddings
type: paper
authors:
  - Joseph T. Ornstein
year: 2025
doi: 10.1017/pan.2025.10016
tags:
  - record-linkage
  - text-embeddings
  - political-methodology
---

## TL;DR

The fuzzylink procedure combines pretrained embedding similarity, lexical similarity, and LLM-labeled active learning to estimate record-match probabilities. Four political science applications show gains when names differ through nicknames, acronyms, organizational renaming, or language; multilingual errors and proprietary-model dependence remain consequential.

## Research Question

Can semantic similarity improve probabilistic linkage of datasets with one noisy identifying string, particularly when true matches have little lexical overlap?

## Motivation

Edit-distance measures can prefer a different entity with a similar spelling over the same entity under a nickname or acronym. Embeddings capture some of these semantic relationships, while estimated match probabilities support uncertainty-aware merging rather than a fixed similarity cutoff.

## Contributions

- Integrates semantic and lexical predictors into supervised probabilistic linkage.
- Uses zero-shot LLM labels and uncertainty sampling to reduce manual training-label requirements.
- Demonstrates single-field linkage across candidate names, city names, organizations, and multilingual political parties, with an accompanying fuzzylink R package.

## Method

1. Embed unique strings using 256-dimensional OpenAI embeddings, preserving natural spelling and capitalization.
2. Compute pairwise cosine similarity, restricting comparisons to exact blocking-variable matches where available.
3. Label the 500 highest-similarity pairs with GPT-4o using application-specific entity-matching instructions.
4. Fit logistic regression with embedding cosine similarity and Jaro–Winkler similarity as predictors.
5. Sample 100 additional pairs per iteration using a Gaussian uncertainty kernel centered at match probability 0.5. Relabel and refit until no estimated probability changes by more than 0.01.
6. Use remaining labeling budget on records without identified matches. Return pairwise probabilities, optionally thresholded to maximize expected F1.

Pairwise comparison scales with the product of dataset sizes; blocking is therefore important. The method permits multiple matches and does not itself enforce one-to-one linkage.

## Experiments

| Application | Evaluation and reported results |
| --- | --- |
| California candidates to voter records | 9,025 candidate names against roughly 22 million voters, blocked by surname and city. Validation in three counties reports 95.8% precision and recall, versus fastLink's 93.3% precision and 63.1% recall. |
| PPP city names to Census places | 7,118 noisy names against 28,889 places, blocked by state. AFSM identifies 705 true matches at 65.6% precision; adding embeddings gives 1,049 at 84.1%; fuzzylink gives 2,451 at 98.0% (Table 2). These are true-match counts, not measured recall percentages. |
| Amicus organizations to DIME | Among 1,388 organizations from 2012, fuzzylink recovers scores for 437 versus 376 in the earlier linkage, searching a contribution-filtered subset of DIME. The paper reports 99.6% precision and three false positives among 939 proposed matches; these rounded figures are not exactly arithmetically consistent. Chapters and subsidiaries count as matches. |
| Native-language to English party names | 4,972 observations across 32 countries and 30 languages, fitted by country and blocked by election date. Reports 4,855 correct pairs, 97.6% recall, and 91.5% precision. Downstream seat-weighted ideology correlates 0.964 with the true values. |

The author reports each application took at most a few hours on a personal computer and under $10 in API fees under the study's conditions.

## Limitations

- Validation reveals unequal errors: 26 of 32 false positives in the candidate application involve Asian, Hispanic, or African American names.
- Multilingual precision varies substantially, including 68.9% for Israel and 79.1% for Japan. Historical party mergers can produce anachronistic matches and biased ideology estimates.
- Semantic association is not entity identity; labeling instructions determine whether subsidiaries, neighborhoods, or former names qualify as matches.
- Proprietary embeddings and labelers constrain exact reproducibility. The paper reports weaker results with GPT-3.5 and Mistral 8x22B; this is evidence about the tested models, not a permanent restriction on open models.
- Large administrative merges with many identifying fields may favor fastLink's efficiency. Pure typographical discrepancies may not benefit from embeddings.
- Multi-field extensions are proposed but not established experimentally. Clerical review remains necessary where model knowledge or labels fail.

## Related Concepts

- [[concepts/probabilistic-record-linkage|Probabilistic Record Linkage]]: estimates pairwise identity probabilities from imperfect identifiers.
- [[concepts/text-embedding-models|Text Embedding Models]]: supply semantic similarity alongside lexical predictors.

## Related Papers

- Kaufman and Klevs (2022), *Adaptive Fuzzy String Matching: How to Merge Datasets with Only One (Messy) Identifying Field*: the active-learning predecessor and city-linkage comparator.
- Enamorado, Fifield, and Imai (2019), *Using a Probabilistic Model to Assist Merging of Large-Scale Administrative Records*: fastLink comparator for unsupervised linkage.
- Arora and Dell (2023), *LinkTransformer: A Unified Package for Record Linkage with Transformer Language Models*: related embedding-based entity resolution, distinguished here by probabilistic match modeling.

Source: supplied parsed article, Sections 2–4 and Table 2. [Article and supplementary material](https://doi.org/10.1017/pan.2025.10016); [replication data](https://doi.org/10.7910/DVN/7U5KEJ).
