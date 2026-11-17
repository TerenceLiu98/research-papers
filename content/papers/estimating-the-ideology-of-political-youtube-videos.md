---
title: Estimating the Ideology of Political YouTube Videos
type: paper
authors:
  - Angela Lai
  - Megan A. Brown
  - James Bisbee
  - Joshua A. Tucker
  - Jonathan Nagler
  - Richard Bonneau
year: 2024
tags:
  - ideology-estimation
  - text-as-data
  - social-media
---

## TL;DR

Reddit sharing and voting patterns supply ideological training labels for a BERT regression model that scores political YouTube videos using text metadata. Predictions correlate 0.891 with held-out matrix-based labels and 0.66 with filtered human ideological placements, enabling video-level analysis beyond channel labels.

## Research Question

Can cross-platform audience affinities provide scalable ideological labels for individual political videos, including videos absent from the source platform?

## Motivation

Channel-level labels obscure within-channel variation and require repeated human annotation. The authors define a video's ideology through the ideological affinity of its audience, rather than treating a video as an actor with beliefs. Metadata prediction extends coverage beyond videos sufficiently popular on political Reddit.

## Contributions

- A two-stage pipeline connects relational ideology estimation to supervised text prediction.
- Video-level scores support within-channel comparisons and application to new political videos.
- Human judgments, channel labels, and transcript topics provide complementary validation; browsing histories demonstrate substantive uses.

## Method

Starting from 424 manually identified political subreddits, the authors construct a shared-video network from roughly 31 million Reddit posts spanning December 2011–June 2021. Leiden communities containing seed subreddits yield 856 candidates; correspondence-analysis inspection removes 37 nonpolitical outliers, leaving 819.

Further filtering retains subreddits with at least five unique videos and videos appearing in at least three subreddits. The final matrix contains 74,038 videos and 685 subreddits, derived from 432,115 posts. Entries use logged post scores, ln(x + 1); absent or negatively scored videos receive zero. Correspondence analysis standardizes the matrix relative to its margins and applies singular value decomposition. The first video coordinate supplies the ideological label.

Metadata availability leaves 61,883 videos. BERT with a regression head takes concatenated video title, channel title, description with URLs removed, and tags. Training, validation, and test sets contain 49,970, 2,631, and 9,282 videos respectively. Transcripts support topic-model validation but are not prediction inputs.

## Experiments

| Evaluation | Reported result |
| --- | --- |
| Held-out prediction of matrix labels | Correlation 0.891; R² approximately 0.793; RMSE 0.42; MAE 0.295 |
| Human pairwise ordering | 1,587 pairs from 2,401 videos, including 453 outside the matrix; agreement exceeds 75% when score distance exceeds 1 |
| Human seven-bin placement | Correlation 0.66 after excluding nonpolitical, non-US, and substantial cross-aisle-disagreement cases; 937 initially coded videos yield 535 comparisons |

Aggregated channel scores broadly agree with existing categorical labels, while revealing within-channel variation and a bimodal distribution among channels labeled Left. Transcript structural topic models supply additional substantive checks. Sensitivity analyses reported in the supplementary material examine subreddit omission and video resampling.

The application uses 345 respondents who watched 6,012 unique News & Politics videos with metadata, drawn from a 3,337-person browsing-history study in May–July 2020. Pooled video-ideology medians are −0.36 for Democrats, 0.26 for Independents, and 0.53 for Republicans. These distributions support some preference for congruent content while retaining overlap across parties. More extreme videos attract more comments and likes/dislikes per view; logged view counts show no clear association with ideology.

## Limitations

- Homophily and the interpretation of the first correspondence-analysis dimension are measurement assumptions. Treating nonappearance and poor reception alike additionally assumes a shared universe of available videos.
- Accuracy against matrix labels measures recovery of a proxy; human validation addresses a separate target. Excluding ambiguous and non-US cases narrows the population underlying the 0.66 correlation.
- Training selects videos circulated across political subreddits with available metadata. The external-video validation broadens evidence but does not establish universal transportability.
- A scalar US left–right axis can miss other political dimensions. Metadata can differ from audiovisual content.
- Engagement and media-diet results are observational. They do not identify effects of recommendation algorithms or establish that extremism causes engagement.

## Related Concepts

- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: shared homophily motivation and relational scaling, applied here to video–community affinities rather than user–elite followership.
- [[concepts/text-scaling-models|Text Scaling Models]]: supervised metadata regression transfers relational labels to previously unobserved videos.

## Related Papers

- [[papers/estimating-ideal-points-of-british-mps-through-their-social-media-followership|Estimating Ideal Points of British MPs Through Their Social Media Followership]]: a related correspondence-analysis application to political followership; the measured objects and source relationships differ.
- Barberá (2015), “Birds of the Same Feather Tweet Together”: cited spatial-following foundation for the homophily assumption.
- Hosseinmardi et al. (2020), “Evaluating the Scale, Growth, and Origins of Right-Wing Echo Chambers on YouTube”: supplies aggregated channel labels used for validation.

Replication data cited in the supplied paper: DOI `10.7910/DVN/WZZFTW`.
