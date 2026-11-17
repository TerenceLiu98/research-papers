---
title: A Text-As-Data Approach for Using Open-Ended Responses as Manipulation Checks
type: paper
authors:
  - Jefrey Ziegler
year: 2022
doi: 10.1017/pan.2021.2
tags:
  - survey-methodology
  - text-as-data
  - experimental-design
---

## TL;DR

Prompt–response text similarity turns open-ended recall checks into continuous attention measures. In a reanalysis of a news-selection experiment, similarity tracks human judgments and reveals treatment-effect differences obscured by analyses that ignore attention.

## Research Question

Can automated comparison of experimental prompts and respondents’ recollections measure attention and diagnose how inattentiveness affects estimated treatment effects?

## Motivation

Binary checks compress differences in attention and allow guessing. Human coding of open-ended checks costs time and introduces coding variation. Continuous similarity scores offer a reproducible alternative while retaining variation between respondents.

## Contributions

- Operationalizes [[concepts/open-ended-manipulation-checks|Open-Ended Manipulation Checks]] using lexical and semantic similarity.
- Compares full-sample, human-coded exclusion, and attention-weighted estimates.
- Proposes varying attention thresholds to investigate effect heterogeneity among respondents classified as likely attentive or inattentive, with accompanying R software.

## Method

Respondents recall a text prompt in their own words. Character trigrams represent each prompt and response; Jaccard overlap and cosine similarity provide bounded scores. The application combines similarity measures with a nonlinear weighting transformation using parameter $k=3$. Embedding-based document distances offer an alternative when paraphrases share meaning but little vocabulary.

The diagnostic procedure compares regressions using all respondents, excluding human-coded failures, and weighting by similarity. It then draws attention cutoffs uniformly between zero and a user-defined upper threshold, estimates effects above and below each cutoff, and repeats for 100 draws. These are sensitivity distributions over classifications. The paper describes the resulting effects using complier and LATE terminology; similarity-based classification alone does not establish an instrumental-variable identification design.

## Experiments

The application reanalyzes Kane (2020), a US news-selection experiment. A Trump headline describes Republican unity, disunity, or neutral biographical content alongside three apolitical alternatives. Respondents choose a story and then recall the Trump headline; 742 respondents answered both the outcome and manipulation check.

- Jaccard and cosine scores correlate at $r=0.98$; correlations with human-coded correctness range from $0.68$ to $0.74$.
- Full-sample logistic regression reproduces the original finding that partisans prefer opposing-party disagreement, without clear support for own-party agreement.
- Attention weighting reveals greater Republican selection under unity relative to disunity. Threshold analyses suggest attentive Republicans prefer unity while inattentive Republicans favor disunity, pulling estimates in opposite directions.
- Attentive Democrats prefer Republican disunity; attentive Independents are less likely to select partisan stories. Low-attention effect distributions vary more widely.

The article reports supplementary Brazil and Mexico applications, but the supplied main text does not provide their detailed results.

## Limitations

The method requires textual prompts, including a text-bearing control condition. Character overlap can miss accurate paraphrases; human validation and context-appropriate semantic measures remain useful. Attention must not be differentially affected by treatment, and attrition between exposure and checking requires examination. Here the check follows the outcome, requiring stable recall across those stages. Older, more educated, and white respondents score higher in the application, so attention weighting changes sample composition and does not automatically recover population effects. The supplied Markdown has damaged mathematical notation; the weighting formula is therefore not reconstructed here.

## Related Concepts

- [[concepts/open-ended-manipulation-checks|Open-Ended Manipulation Checks]]: content-based measurement of treatment recall.
- [[concepts/survey-response-time-and-attentiveness|Survey Response Time and Attentiveness]]: an alternative behavioral proxy for engagement.
- [[concepts/text-as-treatment|Text as Treatment]]: distinguishes assigned textual exposure from its reception.

## Related Papers

- Kane (2020), “Fight Clubs: Media Coverage of Party (Dis)unity and Citizens’ Selective Exposure to It”: source experiment reanalyzed here.
- [[papers/using-cross-encoders-to-measure-the-similarity-of-short-texts-in-political-science|Using Cross-Encoders to Measure the Similarity of Short Texts in Political Science]]: related measurement work on contextual text-pair similarity, rather than the trigram method used here.

Published in *Political Analysis* 30, 289–297 (2022); first published online 23 April 2021. [Article](https://doi.org/10.1017/pan.2021.2). [Replication data](https://doi.org/10.7910/DVN/WXIRQN).
