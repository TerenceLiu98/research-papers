---
title: Evaluating Echo Chambers, Rabbit Holes, and Radicalization Pathways on YouTube
type: paper
authors:
  - Megan A. Brown
  - James Bisbee
  - Angela Lai
  - Richard Bonneau
  - Jonathan Nagler
  - Joshua A. Tucker
year: 2026
doi: 10.1080/10584609.2026.2671765
tags:
  - algorithmic-auditing
  - political-communication
  - recommendation-systems
---

## TL;DR

A real-account YouTube audit conducted in fall 2020 finds that recommendations track recently watched videos strongly, while modest partisan separation appears mainly when users choose their next video. Across twenty steps, recommendations become less ideologically diverse and converge toward moderately conservative content, rather than pushing Democrats and Republicans toward opposite extremes.

## Research Question

Does YouTube independently generate ideological echo chambers, content rabbit holes, or increasingly extreme recommendation pathways when immediate user choice is constrained but account personalization remains available?

## Motivation

Watch histories mix user selection with algorithmic supply. Anonymous or artificial-account audits can omit the histories that personalize recommendations. The study combines real accounts with assigned browsing rules to examine recommendation behavior while limiting contemporaneous self-selection.

## Contributions

- Distinguishes static ideological alignment, serial dependence of recommendations, and increasingly extreme and homogeneous trajectories.
- Develops a real-user audit with randomized starting videos and traversal rules.
- Shows that content dependence and narrowing recommendation diversity can coexist without average partisan radicalization pathways.

## Method

The study recruited 1,639 US YouTube users through Facebook advertisements from October 2 to December 7, 2020. Participants installed a desktop Chrome-compatible extension and were instructed to remain signed into their accounts. Each received one of 24 randomized seed videos: 15 News & Politics videos and nine nonpolitical videos.

Half entered a preference condition and clicked whichever recommendation interested them. The audit group received a fixed rank rule: always select the first, second, third, fourth, or fifth recommendation. Participants completed twenty traversals, with approximately twenty recommendations recorded at each step. Optional watch-history donation supplied additional covariates. Analysis samples vary by specification; recruitment totals should not be read as regression sample sizes.

Video ideology uses the method in [[papers/estimating-the-ideology-of-political-youtube-videos|Estimating the Ideology of Political YouTube Videos]]: correspondence analysis of Reddit video-sharing and voting patterns supplies labels, and BERT predicts scores from video text metadata. Positive scores indicate more conservative content.

Regressions separate user characteristics from seed and current-video ideology, include controls and fixed effects appropriate to each specification, and cluster standard errors by user. Main analyses emphasize political seeds and recommendations categorized as News & Politics or People & Blogs. Trajectory analyses model recommendation means and variances using interactions among traversal step, seed ideology, and partisanship.

## Experiments

| Test | Reported evidence |
| --- | --- |
| Partisan separation, Table 1 | GOP coefficient is 0.162 (SE 0.035) in the preference condition versus 0.012 (0.033) in the audit condition; these specifications include 476 and 467 users respectively. |
| Current-content dependence, Table 2 | Combined models yield current-video coefficients of 0.409 (0.019) for preference and 0.399 (0.018) for audit; seed coefficients are 0.025 (0.016) and −0.0007 (0.014). |
| Recent history, Figure 6 | Only the two most recently watched videos significantly predict final-step recommendation ideology when prior videos enter together. |
| Trajectories, Figures 7–8 | Recommendation diversity declines, with convergence toward moderately conservative content across partisan groups rather than divergence toward opposing extremes. |

The evidence supports the paper's operationalization of rabbit holes as serial dependence. It does not establish an exact memoryless algorithm. Curvilinear checks described by the authors suggest that conservative movement is strongest early and then tapers. Supplementary descriptive evidence on content supply and popularity offers possible explanations for conservative skew, without identifying its cause.

## Limitations

- Findings describe fall 2020, a convenience sample, desktop browsing, and one twenty-step session; they do not establish present-day or long-run platform behavior.
- Participants watched for only seconds and followed artificial instructions. These actions may themselves alter personalized recommendations. Seed-only checks reportedly preserve the main conclusions.
- Ideology is a one-dimensional proxy grounded in Reddit homophily and metadata, rather than direct measurement of audiovisual meaning or extremist attitudes.
- Outcomes concern recommended content, not changes in beliefs. Average trajectory findings do not exclude harmful individual pathways.
- User choice and algorithms interact in ordinary use. The constrained audit does not absolve recommendation systems of reinforcing chosen echo chambers.
- Privacy restrictions prevent public linkage of raw ideology scores to anonymized video IDs; supporting data are available from the corresponding author upon reasonable request.

## Related Concepts

- [[concepts/echo-chambers|Echo Chambers]]: the study distinguishes user-aligned exposure at a moment in time from dynamic dependence on recent content.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: relational homophily motivates the underlying ideology measurement, although this application scores videos rather than political elites.

## Related Papers

- [[papers/estimating-the-ideology-of-political-youtube-videos|Estimating the Ideology of Political YouTube Videos]]: provides the two-stage scoring method used for recommendation outcomes.
- Ribeiro et al. (2020), “Auditing Radicalization Pathways on YouTube”: cited antecedent for studying recommendation trajectories; this paper emphasizes real-account personalization and constrained choice.
- Hosseinmardi et al. (2021), “Examining the Consumption of Radical Content on YouTube”: cited observational consumption study illustrating the challenge of separating selection from algorithmic supply.
