---
title: "Dissent and rebellion in the House of Commons: a social network analysis of Brexit-related divisions in the 57th Parliament"
type: paper
authors:
  - Carla Intal
  - Taha Yasseri
year: 2021
doi: "10.1007/s41109-021-00379-2"
source_job_id: "a6e7d609-ef26-4c42-9e5f-f6c7f4c799da"
tags:
  - legislative-behavior
  - signed-networks
  - brexit
---

## TL;DR

Intal and Yasseri identify individual parliamentary dissent by subtracting party or ideological expectations from pairwise voting similarities, then combining centralities from positive and negative networks. Across 639 MPs and 414 divisions, Brexit votes show more within-party conflict than other votes. The authors report 94% accuracy for a later Brexit timetable vote; the calculation details are in a supplement not included in the supplied Markdown.

## Research Question

Can network analysis identify individual rebels and cross-party alliances during Brexit, and anticipate subsequent departures from expected voting behavior?

## Motivation

Party-level cohesion scores obscure which MPs disagree with colleagues or align with opponents. Pairwise voting relationships provide an individual-level account, while distinguishing ordinary cooperation between ideologically allied parties from departures across broader ideological camps.

## Contributions

- Constructs party- and ideology-adjusted voting networks to separate within-group conflict from cross-group alliance.
- Combines eigenvector centralities from two sign-specific networks into an individual rebellion score.
- Compares Brexit and non-Brexit divisions and checks the scores against a subsequent parliamentary vote.

## Method

Hansard records cover 21 June 2017–10 April 2019: 192 manually classified Brexit divisions and 222 other divisions. The analysis excludes the Speaker, three Deputy Speakers, and seven Sinn Féin abstentionists, leaving 639 MPs. Unrecorded votes are treated as nonparticipation.

The method computes cosine similarities between MPs' voting vectors separately for each division group, then subtracts a reference matrix expressing shared versus different party membership. It repeats this procedure using two ideological camps. Negative adjusted edges represent within-group conflict; positive edges represent cross-group alignment. The network visualizations retain extreme edges at scores of at least 1 or at most −1.

The supplied text loses minus signs in several encoding and range descriptions. Its explicit signed-edge interpretation supports opposite signs for Aye/No and same/different membership, but those damaged passages should not be treated as exact transcription of the coding specification.

Eigenvector centrality is calculated separately on positive edges and on the absolute weights of negative edges. The two centralities are added to obtain each MP's score. This is a descriptive use of [[concepts/signed-political-networks|Signed Political Networks]] to detect outliers, rather than a causal model of rebellion.

## Experiments

| Analysis | Reported finding |
| --- | --- |
| Distribution comparison | Kolmogorov–Smirnov tests distinguish Brexit and non-Brexit adjusted similarities in both party and ideology specifications at the reported <0.001 level. |
| Party networks | Brexit divisions exhibit more within-party conflict and more interaction across the main clusters. |
| Ideology networks | Extreme dissent edges disappear for non-Brexit divisions after regrouping into two camps, but remain for Brexit divisions. This refers to the thresholded visualization. |
| Centrality scores | Mean 0.16, median 0.14; the ten highest scores exceed 0.9. Lady Hermon and Kenneth Clarke each score 1.0. |
| Later vote | Of the ten highest-ranked MPs, nine vote and eight depart from the assigned expectation on the 22 October 2019 accelerated Brexit timetable. The reported full-model accuracy is 94%. |

The timetable vote is distinct from the vote approving the Withdrawal Agreement Bill in principle. The paper explicitly notes that Kenneth Clarke supported the bill but opposed its accelerated timetable. Accuracy calculations for the full model are deferred to Additional file 1. Data and replication instructions are linked at [the supplied data DOI](https://doi.org/10.7910/DVN/OR05MA).

## Limitations

The authors emphasize that the approach is noncausal and computationally less transparent than a single cohesion score. It cannot establish why an MP dissents or whether they will leave a party. Party-derived ideological labels, including manually assigned labels for Independents, shape the reference network. Missing voting records do not distinguish deliberate abstention from absence. The supplied main text provides neither a full confusion matrix nor the decision rule behind the 94% accuracy claim, so that figure alone cannot establish improvement over a majority-class baseline. The parsed title also contains a stray “Chor,” omitted here as an extraction artifact.

## Related Concepts

- [[concepts/signed-political-networks|Signed Political Networks]]: the sign represents deviation from expected group alignment.
- [[concepts/agreement-index|Agreement Index]]: a complementary aggregate cohesion measure that explicitly accommodates abstention as an expressed option.

## Related Papers

- [[papers/identifying-intraparty-voting-blocs-in-the-uk-house-of-commons|Identifying Intraparty Voting Blocs in the U.K. House of Commons]]: a library comparison using probabilistic voting blocs to characterize intraparty heterogeneity, rather than centrality relative to a group reference matrix.

[[index|Library home]]
