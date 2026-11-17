---
title: How Information Flows from the World to China
type: paper
authors:
  - Yingdan Lu
  - Jack Schaefer
  - Kunwoo Park
  - Jungseock Joo
  - Jennifer Pan
year: 2024
doi: 10.1177/19401612221117470
tags:
  - political-communication
  - censorship
  - cross-platform-research
---

## TL;DR

During early Covid-19, 32 of 150 sampled viral China-related English tweets concerned information originating abroad that also appeared on Weibo. This is 21% of all sampled tweets, or approximately 24–28% after excluding outflows and, optionally, cases with unclear direction. Domestic media facilitated 17 inflows, unaffiliated users 12, and foreign entities 3: state-linked gatekeepers were influential but not exclusive.

## Research Question

Can the Chinese state act as the sole gatekeeper of foreign-origin events, actions, ideas, and opinions, or do social media users transmit information outside institutional channels?

## Motivation

Internet blocking and domestic media control constrain international communication, but overseas users, circumvention, and foreign organizations can bridge information environments. Measuring this requires distinguishing shared topics from actual foreign-origin information entering domestic discourse.

## Contributions

- Combines scalable cross-lingual content retrieval with bilingual verification and contextual investigation.
- Separates content co-occurrence from direction of information flow.
- Identifies four transmission mechanisms and shows that noninstitutional users participate alongside domestic media.

## Method

The authors retrieve 14 million tweets from January 21–April 30, 2020, filter to 1.8 million English China-related tweets, and select ten eligible highly retweeted tweets per week for fifteen weeks. Their Weibo corpus contains 6.7 million Covid-19 posts from January 16–April 30. A Chinese BERT relevance filter trained on 5,484 annotations reports accuracy 0.97 and F1 0.99; these are filtering metrics, not end-to-end inflow detection scores.

1. **Retrieve:** Translate each tweet into Chinese, average word2vec embeddings, and retrieve 10,000 Weibo posts by cosine similarity within a ±5-day window.
2. **Rank:** Use multilingual Universal Sentence Encoder representations to select 100 candidates per tweet without translation at this stage.
3. **Verify:** Two bilingual annotators review 15,000 pairs, with disagreements resolved by a third annotator and majority rule. Matching permits different attitudes toward the same specific issue.
4. **Investigate direction:** Examine media reports, search results, metadata, images, and links to establish the origin and transmission route. Inflow includes criticism of a foreign-origin claim; agreement is unnecessary. A Weibo post may precede the viral tweet because the underlying foreign event occurred earlier.

## Experiments

This is a descriptive observational study with a retrieval pipeline and a censorship-coverage robustness check. Searching real-time Weiboscope data for the first six weeks adds two matches to 66 detected in Weibo-COV.

| Classification | Tweets | Share of all 150 |
| --- | ---: | ---: |
| Any matched Weibo content | 68 | 45% |
| Inflow to China | 32 | 21% |
| Outflow from China | 19 | 13% |
| Unclear direction | 17 | 11% |

The headline range uses 32/(150−19) ≈ 24% and 32/(150−19−17) ≈ 28%. Among the 32 inflows, government/state media facilitate 10, commercialized domestic media 7, unaffiliated Weibo users 12, and foreign entities posting directly 3. The authors treat both domestic media categories as CCP gatekeepers, despite differences in commercial incentives.

Twenty-one inflows (66%) are antagonistic toward China; government/state media transmit ten of these. The authors suggest that critical foreign content can reinforce official narratives when reframed domestically, but do not test audience persuasion. Fact-checking searches identify misinformation in 4% of all sampled tweets and 6% of inflows.

## Limitations

The small, selected sample, single domestic platform, English-language source discourse, and unusually salient pandemic period preclude representative estimates of all information entering China. Twitter and Weibo are not measures of representative public opinion. Retrospective Weibo collection can miss deleted posts; the real-time robustness dataset covers only the first six weeks. Retrieval windows and candidate truncation can miss matches. Co-occurrence and reconstructed origin do not establish direct Twitter-to-Weibo transmission or causal effects of censorship.

The supplied text contains inconsistent dates in individual examples and notes, and reports 55 antagonistic tweets in the results versus 56 in a note. These inconsistencies do not change the reported 32 inflows but warrant caution when reusing those details. The journal issue is dated 2024; the article copyright is 2022.

## Related Concepts

- [[concepts/cross-border-information-flows|Cross-Border Information Flows]] — direction requires tracing the origin of specific information, beyond semantic matching.
- [[concepts/media-ecology|Media Ecology]] — transmission involves social platforms, domestic and foreign media, government organizations, and ordinary users together.

## Related Papers

- Chen and Yang (2019), *The Impact of Media Censorship: 1984 or Brave New World?* — cited background on demand for uncensored information.
- Pan and Roberts (2020), *Censorship’s Effect on Incidental Exposure to Information: Evidence From Wikipedia* — cited background on how blocking shapes access.
- Lu, Pan, and Xu (2021), *Public Sentiment on Chinese Social Media During the Emergence of COVID-19* — related use of pandemic-era Weibo data.

Published in *The International Journal of Press/Politics*, 29(2), 305–327. Replication data identified by the paper: https://doi.org/10.7910/DVN/7C7FEI.
