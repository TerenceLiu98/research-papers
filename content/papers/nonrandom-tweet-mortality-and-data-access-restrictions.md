---
title: "Nonrandom Tweet Mortality and Data Access Restrictions: Compromising the Replication of Sensitive Twitter Studies"
type: paper
authors:
  - Andreas Küpfer
year: 2024
doi: 10.1017/pan.2024.7
tags:
  - computational-social-science
  - reproducibility
  - social-media
---

## TL;DR

Tweet-ID archives do not preserve the data needed to reproduce sensitive Twitter studies. Küpfer finds much lower availability for sensitive datasets and shows that selective disappearance changes descriptive patterns and regression findings in a study of violent political rhetoric.

## Research Question

How does nonrandom tweet disappearance affect the ability to reconstruct political-science datasets and reproduce their substantive findings?

## Motivation

Under the platform policies described in the paper, researchers could share identifiers but faced restrictions on sharing tweet text. Recollecting those identifiers retrieves only surviving content. This makes replication depend on later user actions and platform moderation, even when analysis code remains available.

## Contributions

- Audits tweet-sharing practices in 50 political-science papers that analyze tweet content.
- Compares subsequent availability across 16 sensitive and nonsensitive datasets.
- Demonstrates how attrition changes textual features, temporal patterns, political-account mentions, and regression estimates in Kim’s 2023 study.

## Method

The literature audit screens 151 papers mentioning Twitter, published from January 2015 through September 2022 in seven major political-science journals, retaining 50 content-analysis studies. Fifteen study sensitive content. The availability audit recrawls up to 10,000 randomly sampled tweets per dataset on May 17, 2023; one dataset instead requires checking user accounts.

The case study reconstructs Kim’s violent-tweet dataset, compares available aggregate reference statistics with the recrawl, tests word-frequency differences using Welch’s t-test, repeats Fightin’ Words comparisons, and re-estimates negative binomial models of violent mentions of political accounts. A 1,000-iteration resampling exercise restores original party and gender distributions to examine compositional explanations for changed coefficients.

## Experiments

| Analysis | Reported finding |
| --- | --- |
| Sharing audit | 60% of the 50 studies share neither tweet IDs nor content; 20% share IDs only. |
| Availability audit | Mean availability is 78.34% across ten nonsensitive datasets and 36.02% across six sensitive datasets. |
| Kim case study | On November 15, 2022, 35,552 of 215,923 violent tweets remain retrievable: 16.47%. |
| Text and timing | Word and hashtag frequencies differ; the recrawl fails to preserve important early-January 2021 temporal patterns. |
| Regression replication | The female-account coefficient approaches zero and its 95% interval includes zero; Republican, senator, and governor coefficients also shrink. |

The rebalanced female coefficient is compatible with the original estimate, but uncertainty is much wider. This supports composition as a relevant mechanism without establishing complete recovery of the original data-generating process. The paper identifies account suspension as a major source of unavailability alongside user deletion, protection, and deactivation.

## Limitations

The detailed replication concerns one sensitive dataset and text-based analyses, not the original study’s full follower-network analysis. The initial population of over 300 million tweet IDs is unavailable, so comparisons rely partly on published aggregates and a document-frequency matrix. The cross-dataset audit is restricted to studies sharing identifiers and is descriptive rather than a causal estimate of sensitivity’s effect on removal.

The supplied text contains inconsistent directional language about gender-specific removal; the changed distributions and model estimates are more reliable summary targets than that sentence. API prices and policies are historical conditions reported by the article. Data donation, institutional archives, and protected-data approaches are proposals, not evaluated solutions; the discussion of hashing does not demonstrate a general text-analysis pipeline over hashes.

## Related Concepts

- [[concepts/social-media-data-persistence-bias|Social Media Data Persistence Bias]]: selective survival changes the dataset available for later analysis.
- [[concepts/paper-derived-computational-reproduction|Paper-Derived Computational Reproduction]]: reconstructing methods also requires usable underlying data; this study isolates a failure caused by changing data availability.

## Related Papers

- Kim (2023), *Violent Political Rhetoric on Twitter*: the substantive study whose text-based findings are re-examined.
- Elmas (2023), *The Impact of Data Persistence Bias on Social Media Studies*: earlier evidence of differential persistence in controversial datasets.
- Zubiaga (2018), *A Longitudinal Assessment of the Persistence of Twitter Datasets*: a comparison point on persistence and representativeness in more general datasets.
