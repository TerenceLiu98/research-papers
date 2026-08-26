---
title: "A Novel Multi-Criteria Evaluation Method for Rumor-Refutation Effectiveness of Rumor-Refutation Accounts on Social Media Platforms Integrating Social Network Analysis"
type: paper
authors:
  - Aijie Li
  - Jinyu Ma
  - Wei Zhu
  - Zhongyong Wan
year: 2026
tags:
  - rumor-refutation
  - social-media
  - social-network-analysis
  - multi-criteria-decision-making
  - TOPSIS
  - information-diffusion
  - Weibo
---

## TL;DR

This paper proposes OC-TOPSIS-Sort-C, a multi-criteria method for evaluating the rumor-refutation effectiveness (RRE) of social-media accounts rather than individual rumor-refutation posts. It combines an 18-indicator system grounded in [[Social Network Analysis]], information credibility, trust propagation, and diffusion theory with fuzzy BWM, CRITIC, game-theoretic combination weighting, EFAST sensitivity-based adjustment, and clustering-based characteristic profiles. In a 2024 Weibo case study of 42 accounts, 7 accounts are classified as good, 31 as satisfactory, and 4 as fair; no account is classified as excellent or poor.

## Research Question

How should rumor-refutation accounts be evaluated across content, account characteristics, audience behavior, and network context; how can those accounts be classified with less subjective bias; and which account features should managers improve to raise RRE?

## Motivation

Prior research largely evaluates rumor-refutation information or studies factors affecting its spread. The authors argue that this leaves the accounts that produce and distribute the information under-evaluated. It also leaves open how to combine indicators grounded in several theories and how to define classification profiles without relying entirely on decision-maker judgment. Weibo provides a large, interactive platform on which professional agencies, government departments, news media, and self-media accounts can be compared within one dissemination environment.

## Contributions

- Constructs an SNA-based RRE indicator system with six criteria: edge feature, node feature, node behavior, sub-node feature, sub-node behavior, and context.
- Combines subjective fuzzy best-worst method (BWM) weights with objective CRITIC weights through game theory, then uses EFAST to account for indicator interactions when obtaining final weights.
- Replaces manually specified TOPSIS-Sort-C characteristic profiles with profiles selected through the OC clustering procedure, reducing sensitivity to a single clustering algorithm and to subjective profile placement.
- Applies the framework to account-level Weibo data and derives account-category-specific recommendations from classification, network, community, and comment-keyword analyses.

## Method

The 18 indicators are mapped to six parts of a rumor-refutation network. Edge features cover information content quality, information dimension richness, category abundance, and originality. Node features cover subject authority, popularity, and debunking function; node behavior covers post timeliness and activity. Sub-node features cover audience interactive ability, emotional attitude, and cognitive literacy; sub-node behavior covers audience participation, influence, and reading. Context covers subject PageRank-like core degree, big-V followers, and cooperative units.

For weighting, five experts compare the best and worst indicators using a triangular fuzzy linguistic term set. Fuzzy BWM produces subjective weights, while CRITIC uses indicator dispersion and inter-indicator conflict for objective weights. Game theory chooses the combination coefficients between the two weight vectors; the reported normalized coefficients are approximately 0.509 and 0.491. EFAST then modifies the combination weights using output-variance sensitivity to indicator interactions.

OC-TOPSIS-Sort-C defines five ordered RRE classes from excellent to poor. K-Means, agglomerative hierarchical clustering, OPTICS, Gaussian mixture modeling, and STING are compared as candidate profile-generating procedures. The OC procedure selects characteristic profiles using the clustering results and silhouette-based comparison. The resulting decision matrix combines account observations, profiles, and indicator domains; normalized weighted distances to ideal and anti-ideal solutions produce closeness coefficients, which assign each account to the nearest class profile.

## Experiments

The case study uses public Weibo data collected in January 2025 for 42 verified rumor-refutation accounts covering professional agencies, government departments, news media, science self-media, and individual self-media. The 2024 account corpus contains 338,872 articles, of which 17,427 are identified as rumor-refutation articles. The study also collects 141,259 comments and follower information used to derive the 18 indicators.

The five target classes are excellent, good, satisfactory, fair, and poor. The final classification assigns 7 accounts (16.67%) to good, 31 (73.81%) to satisfactory, and 4 (9.52%) to fair, with no accounts in the excellent or poor classes. The paper reports that OC has the strongest silhouette-based clustering performance among the compared procedures and produces more concentrated, orderly characteristic profiles. Sensitivity analysis that varies the subjective-weight coefficient from 0 to 1 changes only a small number of boundary cases, while most account classifications remain unchanged.

The account-level analysis shows that authority alone does not determine RRE. CCTV News has the strongest overall account profile and a central network position but is held below the excellent class by its low debunking specialization and post activity. Professional agencies generally benefit from authority and dedicated debunking functions; news-media accounts benefit from reach, timeliness, and network centrality; and some self-media accounts compensate for lower authority with original, focused rumor-refutation content. Community and TF-IDF analyses point to the importance of cooperation with authoritative accounts, practical health and safety information, and evidence-based responses to public concerns.

## Limitations

The study evaluates one platform, one year of activity, and 42 selected accounts. Several indicators depend on Weibo-specific functions and account metadata, so the framework cannot be transferred directly to platforms with different interaction, verification, or audience data. The account sample is restricted to verified accounts with at least 10,000 followers and is therefore not representative of all rumor-refutation actors. The authors recommend adapting indicator definitions and testing the method across platforms and social-media contexts.

## Related Concepts

- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]
- [[Multi-Criteria Decision Making]]
- [[TOPSIS-Sort-C]]

## Related Papers

- Li, Zhang, Du, Ma, and Wan (2021), "Social Media Rumor Refutation Effectiveness: Evaluation Modelling and Enhancement."
- Li, Zhao, and Hajiyev (2021), "Multi-Criteria Evaluation of Rumor Refuting Platform's Refuting Capacity with Hesitant Fuzzy Judgments."
- Silva and Filho (2020), "Sorting with TOPSIS through Boundary and Characteristic Profiles."
- Rezaei (2016), "Best-Worst Multi-Criteria Decision-Making Method: Some Properties and a Linear Model."
- Gao et al. (2022), "Strategies and Effectiveness of the Chinese Government Debunking COVID-19 Rumors on Sina Weibo: Evaluating from Emotions."

[[index|Library home]]
