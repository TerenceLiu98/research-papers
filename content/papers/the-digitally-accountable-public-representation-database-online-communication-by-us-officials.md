---
title: "The digitally accountable public representation database: online communication by U.S. officials"
type: paper
authors:
  - Yuehong Cassandra Tai
  - Nitheesha Nakka
  - Khushi Navin Patni
  - Sarah Rajtmajer
  - Kevin Munger
  - Yu-Ru Lin
  - Bruce A. Desmarais
year: 2025
tags:
  - political-communication
  - social-media
  - research-data
---

## TL;DR

The Digitally Accountable Public Representation (DAPR) database links U.S. elected officials’ metadata to weekly X/Twitter and Facebook activity, engagement, and textual features. The described release includes 28,834 officials, 5,769,904 X posts, and 450,972 Facebook posts. Its overall January 2020–December 2024 span does not imply continuous or equivalent coverage across platforms: Facebook covers 2020–2021, and later X collection uses sampling.

## Research Question

How can a reusable database connect elected officials’ identities, political positions, and demographics with their online communication across platforms and levels of government?

## Motivation

State and local officials receive less research and media attention than members of Congress, despite the importance of their public communication. Linking official metadata with social-media activity supports studies of responsiveness, policy attention, political networks, and information sharing.

## Contributions

- Integrates an officials metadata file with two collections of official-by-week platform records using a common identifier.
- Releases post volumes, mean engagement metrics, post links, and TF-IDF term matrices without distributing raw document-level content restricted by API terms.
- Documents metadata collection, manual verification, and sampled validation, using state legislators as the principal worked example.

## Method

The authors collect names, offices, districts, party affiliations, and social accounts from Ballotpedia and supplement them through official websites and manual research. Open Civic Data division identifiers standardize districts. Name matching combines automated matching, fuzzy matching, and manual identity checks. Race is manually coded; gender coding combines the R gender package with existing hand-coded records and manual completion.

X collection initially queried the preceding seven days daily and removed duplicates. API changes around June 2023 interrupted this approach; collection resumed in May 2024 with sampled state and local officials’ posts rather than a census. Facebook collection used CrowdTangle in April 2022, March 2023, and April 2023, with some accounts already inaccessible.

Weekly records contain post totals, average per-post engagement, and TF-IDF features for words, hashtags, and mentions. Preprocessing expands contractions, describes emojis, replaces URLs, removes HTML, splits CamelCase, removes English stopwords and digits, normalizes whitespace and repeated characters, and filters malformed features. The authors intentionally avoid lowercasing, stemming, and lemmatization to retain stylistic information.

Join metadata using `official_id`; cross-platform weekly joins also require the time identifier. Historical follower/following counts for selected officials were collected before June 2023 and are static.

## Experiments

This is a data descriptor; its empirical evaluation validates metadata rather than testing a predictive model or identifying causal effects.

| Validation | Reported result |
| --- | --- |
| Names and states, 500 sampled entries | No incorrect entries found |
| Party and district name | Intercoder reliability κ = 0.99 |
| District type | Agreement = 0.98; discrepancies involved nine chamber changes |
| Race, 500 sampled entries | Agreement = 0.96 |
| Gender, 200 sampled entries after coding | No mislabeling found |

The authors also check field types and admissible numeric ranges. Gender-package precision and recall of 0.93–1 are attributed to an earlier ten-state evaluation, rather than a new full-database test. Previously published substantive studies using DAPR are examples of reuse, not new experiments in this descriptor.

## Limitations

Coverage depends on platform access, account survival, and collection period. Facebook’s 2020–2021 window coincides with the pandemic and election; X sampling after May 2024 differs from earlier collection. The database does not cover all platforms, and broader official/platform coverage is an expansion goal.

State legislators’ party and office metadata primarily describe 2020–2022 and may summarize the longer-held affiliation or position. They should not be treated as fully time-varying covariates. Some federal and local demographic fields remain missing. Validation samples chiefly concern state legislators and do not establish equal accuracy throughout the database.

Post links cannot recover deleted or unavailable posts. Released aggregates preserve selected summaries but do not replace raw text for arbitrary analyses. Name-based gender inference has uneven coverage across naming traditions; human checks address missing values without making name inference a direct observation of identity.

The supplied manuscript gives a 2025 copyright and acceptance date but leaves the publication date as a placeholder and supplies no article DOI. The dataset DOI below identifies the data, not the article.

## Related Concepts

- [[concepts/social-media-data-persistence-bias|Social Media Data Persistence Bias]]: unavailable accounts and deleted posts constrain later rehydration; DAPR does not estimate the resulting selection bias.

## Related Papers

- [[papers/nonrandom-tweet-mortality-and-data-access-restrictions|Nonrandom Tweet Mortality and Data Access Restrictions]]: demonstrates why identifier-based archives may fail to reproduce original datasets, a relevant concern for DAPR’s post links.
- Denny and Spirling (2018), *Text preprocessing for unsupervised learning: Why it matters, when it misleads, and what to do about it*: cited motivation for preserving textual distinctions during preprocessing.

## Resources

- [DAPR dataset](https://doi.org/10.7910/DVN/A9EPYJ).
- [Supporting code](https://doi.org/10.17605/osf.io/2HBA5).
