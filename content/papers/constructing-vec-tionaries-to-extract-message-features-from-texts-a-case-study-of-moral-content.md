---
title: "Constructing Vec-tionaries to Extract Message Features from Texts: A Case Study of Moral Content"
type: paper
authors:
  - Zening Duan
  - Anqi Shao
  - Yicheng Hu
  - Heysung Lee
  - Xining Liao
  - Yoo Ji Suh
  - Jisoo Kim
  - Kai-Cheng Yang
  - Kaiping Chen
  - Sijia Yang
year: 2025
doi: 10.1017/pan.2025.6
venue: Political Analysis
tags:
  - computational-text-analysis
  - moral-psychology
  - word-embeddings
---

## TL;DR

Vec-tionaries fit semantic axes to validated dictionary ratings and use word embeddings to measure text beyond literal dictionary matches. In COVID-19 tweets, moral Strength rankings agree better with crowdsourced judgments than eMFD for three of five foundations. Additional Valence and Ambivalence measures improve retweet model fit, without establishing causal effects or universal superiority across foundations.

## Research Question

Can weighted dictionary knowledge be transferred into embedding-space axes to improve measurement of latent message features and distinguish their strength, direction, and internal variation?

## Motivation

Fixed dictionaries miss relevant words outside their vocabulary, especially in short messages. Averaged dictionary vectors and antonym axes extend coverage but do not directly fit the graded relevance ratings supplied by a validated dictionary. The proposed method retains those ratings as targets for axis estimation.

## Contributions

- Introduces constrained optimization of semantic axes from dictionary weights and word embeddings.
- Separates moral Strength, Valence, and Ambivalence at the document level.
- Validates Strength with crowdsourced pairwise comparisons and demonstrates incremental explanatory value in retweet regressions.
- Releases the [vMFD implementation](https://github.com/ZeningDuan/vMFD).

## Method

For each of five foundations in the extended Moral Foundations Dictionary (eMFD), the authors combine a word's relevance probability with the sign of its sentiment score. Sentiment magnitude is discarded because it comes from VADER rather than the crowdsourced relevance ratings. With normalized word vectors, the fitted unit axis minimizes squared differences between word-axis projections and these signed targets (Section 3.1). The implementation uses 300-dimensional word2vec embeddings, 3,270 dictionary words, and the Ipopt solver.

For a document's word-axis cosine similarities, Strength is the mean absolute similarity, Valence the signed mean, and Ambivalence the variance around that document's own mean (Equations 5–7). Opposing virtue and vice signals can cancel in Valence while retaining Strength and Ambivalence. Words outside the seed dictionary can contribute when represented in the embedding vocabulary. Liberty/Oppression is not included in the five fitted foundations.

## Experiments

### Crowdsourced validation

The source corpus contains 2,285,379 unique English COVID-19 tweets from June 15–July 12, 2020. Each foundation's validation pool contains 2,000 tweets: 800 from high-virtue strata, 800 from high-vice strata, and 400 low-scoring controls selected using eMFD. A total of 3,473 qualified annotators perform pairwise judgments. A hierarchical probit model estimates virtue and vice scores; their squared sum defines the benchmark Strength ranking.

Rank-biased overlap (RBO) compares rankings across depths and weights, with 5,000 bootstrap resamples for confidence intervals. Vec-tionary improves agreement for Care/Harm, Loyalty/Betrayal, and Authority/Subversion. Differences for Fairness/Cheating and Sanctity/Degradation do not reach conventional significance (Section 4.2).

For Care/Harm at depth 200 and weight 0.80, Table 1 reports RBO of 0.16 for vec-tionary versus 0.12 for eMFD, with a reported relative improvement of 33.24% calculated from underlying scores. At depth 1,600 and the same weight, scores are 0.61 and 0.59, with 3.96% reported improvement. These are ranking-agreement gains, not classification accuracy. The authors also report superiority over SemAxis in supplementary comparisons.

### Retweet application

Retweet counts use equal 14-day observation windows; 78.69% are zero. Section 5 describes zero-inflated negative-binomial models controlling for metadata, emotion, and eMFD scores. Adding Strength, then Valence and Ambivalence, improves likelihood-based fit. The full model's AIC is 84,331,949 versus 84,797,304 for the model adding Strength alone (Table 2).

In the full specification, greater Ambivalence for Fairness/Cheating and Sanctity/Degradation is positively associated with retweet counts, whereas the other three foundations have weaker negative associations. These are observational associations and in-sample fit comparisons, not evidence of causal diffusion effects or held-out prediction gains.

## Limitations

- Validation is concentrated on English COVID-19 tweets, with eMFD-stratified stimuli; transfer to other languages, topics, and latent features needs new validation.
- Direct crowdsourced validation concerns Strength. Predictive associations do not independently validate Valence or Ambivalence as psychological constructs; projection variance only suggests moral conflict.
- Static word embeddings extend vocabulary coverage but do not themselves resolve sentence composition or contextual word senses. Dictionary and embedding choices remain consequential.
- The paper does not establish superiority to fine-tuned BERT-style models and notes that downstream inference should account for measurement error.
- The supplied text contains inconsistencies: embedding coverage is described as both roughly three million and 300 million items; Table 2 labels coefficients as Poisson despite the stated negative-binomial specification. The Fairness Valence sign in prose also conflicts with its negative interval and table entry. These details should be checked against replication materials before reuse.

## Related Concepts

- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: supplies the substantive dimensions being measured.
- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: related semantic-axis summaries; FrameAxis intensity uses a background mean, whereas vec-tionary Ambivalence uses the document's own mean.

## Related Papers

- [[papers/frameaxis-characterizing-microframe-bias-and-intensity-with-word-embedding|FrameAxis: Characterizing Microframe Bias and Intensity with Word Embedding]]: cited precursor using opposing semantic poles and complementary directional and intensity measures.
- Hopp et al. (2021), “The Extended Moral Foundations Dictionary (eMFD)”: supplies the validated weighted seed vocabulary.
- Garten et al. (2018), “Dictionaries and Distributions”: distributed dictionary representations supply the averaging-based comparison motivating weighted axis fitting.

Source: supplied parsed Markdown, Cognitio job `d2bc71aa-0641-456f-bd9f-bafebd69ac75`. [Published paper](https://doi.org/10.1017/pan.2025.6).
