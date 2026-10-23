---
title: "Alexandria: A Library of Pluralistic Values for Realtime Re-Ranking of Social Media Feeds"
type: paper
authors:
  - Akaash Kolluri
  - Renn Su
  - Farnaz Jahanbakhsh
  - Dora Zhao
  - Tiziano Piccardi
  - Michael S. Bernstein
year: 2026
tags:
  - social-media
  - recommender-systems
  - value-pluralism
  - user-control
  - llm-classification
---

## TL;DR

Alexandria operationalizes 78 individual and community values as LLM-based post classifiers and lets users up-rank or down-rank those values in their X/Twitter feeds. Its construction pipeline filters 146 constructs from six value systems to 111 post-level values, then merges correlated constructs into a 78-value library. A qualitative study (N=12) and a randomized quantitative study (N=257) suggest that a pluralistic library gives users more precise feed controls than access to a single value system, but the implementation remains limited to posts already selected by X/Twitter, relies on zero-shot third-party classifiers, and may enable value-based filter bubbles.

## Research Question

How can a plurality of human and community values be translated into scalable ranking objectives, exposed as end-user controls, and used to re-rank social-media feeds in real time?

## Motivation

Engagement optimization embeds a narrow platform-centered objective in feed ranking and can conflict with well-being, inclusion, and democratic discourse. Prior alternatives commonly operationalize one value chosen by researchers or platforms. Because users and communities hold heterogeneous and sometimes competing values, a single framework cannot provide sufficiently specific controls. [[concepts/value-based-feed-ranking|Value-Based Feed Ranking]] instead treats ranking objectives as configurable choices that users can inspect and adjust.

## Contributions

- Constructs a pluralistic library from six general-purpose and social-media-specific value systems.
- Presents a pipeline for filtering values to those identifiable in individual posts, rewriting their definitions for platform-agnostic classification, and merging constructs that frequently co-occur.
- Implements Alexandria, a browser extension that labels posts with GPT-4o-mini and reorders an X/Twitter feed from user-selected value weights.
- Evaluates the classifiers against human annotations and evaluates the interface through qualitative and randomized quantitative user studies.
- Shows that users employ a wide range of values and can express more specific preferences when offered the combined library rather than one source taxonomy.

## Method

The authors begin with 146 constructs from the Rokeach Value Survey, Maslow's hierarchy of needs, Hofstede's cultural dimensions, a recommender-system values synthesis, a Reddit community-values taxonomy, and a Weibo co-creation taxonomy. Two researchers retain constructs that apply to post content, can be inferred from an individual post, and do not depend primarily on personal subjectivity, leaving 111 values. Definitions are standardized without changing their intended abstraction.

For classifier validation, the study samples two values from each source system and 30 posts per value. Five annotators label each post as expressing a value not at all, weakly, or strongly; their rounded mean is the ground truth. The LLM classifiers achieve 81.2% binary presence accuracy and 0.45 mean absolute error on the three-point scale. The comparison is limited to 12 of the 111 pre-merge values. To reduce redundancy, the authors label posts drawn from the feeds of 100 X/Twitter users and greedily merge pairs whose occurrence has Pearson correlation at least 0.6, retaining 78 values.

Alexandria first presents five values chosen using embedding-based clustering, then recommends additional values by similarity to a weighted embedding of the user's selections. Users can assign each value a weight from -1 to 1. The extension gathers about 70 posts already selected for the user's "For You" feed. GPT-4o-mini scores each activated value in each post from 0 to 2, and Alexandria ranks post $i$ by the dot product $s_i = \sum_v r_{i,v}w_v$. The process repeats on further scrolling or when settings change and reportedly takes five to ten seconds.

The qualitative study recruits 12 U.S. adult X/Twitter users for interviews in which each participant tries one value system and then the full library. The quantitative study randomly assigns 257 eligible U.S. users to the full library (N=44) or one of six single-system conditions (combined N=213); participants configure and use the reranked feed for ten minutes before answering a questionnaire.

## Experiments

Classifier predictions have 0.45 MAE versus 0.61 for an individual human rating relative to the other raters' average, with the LLM comparison favorable for 10 of 12 tested values. The final library labels at least one value in more than 97% of posts used during the merging analysis. These measurements support post-level value recognition for the tested sample, not reliable classification of every value or platform context.

Ten of 12 interview participants preferred the full library to a single value system. Participants described greater perceived control, closer alignment with content preferences, and increased awareness of the values implicit in their feeds. These are short-term self-reports from a small sample rather than evidence of lasting behavioral or attitudinal effects.

Quantitative participants reranked their feeds $6.8 \pm 4.4$ times on average. Full-library users selected $48.9\% \pm 35.3\%$ of available values, compared with $34.5\% \pm 27.8\%$ in the single-system conditions. In the full condition, 23 of 78 values had Benjamini-Hochberg-adjusted mean weights significantly different from zero. Sixteen values were significantly weighted in both conditions; commonly up-ranked examples included cheerfulness, usefulness, content quality, wisdom, and accuracy, while restraint and spam/reposts/bots were down-ranked.

Usage in the full condition ranged from 88.6% for knowledge/informativeness to 31.8% for committing, and 61.5% of values were selected by fewer than half of participants. Of 84 single-system responses naming a missing desired value, two coders agreed that 55 (65.5%) had a counterpart in the full library. For 17 of 18 values whose weights differed significantly between conditions, absolute weights were lower in the full-library condition, consistent with users substituting more specific values or combinations; this displacement is an interpretation rather than a direct test of the substitution mechanism.

## Limitations

Alexandria reorders only the inventory already selected by X/Twitter, so it cannot recover excluded content or implement feed-level values such as overall diversity. The studies concern post-level classification on one desktop platform, and the quantitative interaction lasts only ten minutes. The participant samples are restricted to U.S. adult X/Twitter users who use Chrome and meet recruitment criteria.

The library is neither complete nor neutral: filtering, definition adaptation, the 0.6 merge threshold, greedy merge order, onboarding choices, and taxonomy selection all shape what users can express. The reported classifier evaluation covers only 12 values, and zero-shot LLM classification can be biased or variable. Sending posts to a third-party model creates privacy risks, including for people whose feed content is processed without direct consent.

User control can also intensify ideological selection and create value-based filter bubbles. The work does not measure long-term engagement, polarization, belief change, or whether users eventually return to engagement ranking. Mobile clients and platforms that prevent client-side modification remain outside the implementation's reach, while an expandable marketplace of values would require unresolved moderation and governance decisions.

## Related Concepts

- [[concepts/value-based-feed-ranking|Value-Based Feed Ranking]]
- [[concepts/social-media-news-exposure|Social Media News Exposure]]
- Value pluralism
- User-controllable recommender systems
- Algorithmic choice
- Filter bubbles

## Related Papers

- Jia et al. (2024), "Embedding Democratic Values into Social Media AIs via Societal Objective Functions": operationalizes one family of societal objectives for feed ranking.
- Stray et al. (2022), "Building Human Values into Recommender Systems: An Interdisciplinary Synthesis": contributes one of Alexandria's six source value systems.
- Weld, Zhang, and Althoff (2022), "What Makes Online Communities 'Better'? Measuring Values, Consensus, and Conflict across Thousands of Subreddits": supplies the community-values taxonomy used in the library.
- Piccardi et al. (2025), "Reranking Partisan Animosity in Algorithmic Social Media Feeds Alters Affective Polarization": studies a specific value-oriented reranking intervention.
- [[papers/what-news-do-people-get-on-social-media-analyzing-exposure-and-consumption-of-news-through-data-donations|What News Do People Get on Social Media? Analyzing Exposure and Consumption of News through Data Donations]]: complements feed intervention with measurement of how distinct exposure mechanisms shape users' observed news diets.

[[index|Library home]]
