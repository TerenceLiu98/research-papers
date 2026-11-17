---
title: Political Advertising Online and Offline
type: paper
authors:
  - Erika Franklin Fowler
  - Michael M. Franz
  - Gregory J. Martin
  - Zachary Peskowitz
  - Travis N. Ridout
year: 2020
doi: 10.1017/S0003055420000696
tags:
  - political-advertising
  - political-communication
  - audience-targeting
---

## TL;DR

Comparing candidate-sponsored Facebook and television advertising in the 2018 US elections, the authors find broader participation on Facebook, especially down ballot. Within candidates, Facebook ads are more positive, less issue-focused, and more ideologically distinctive. These patterns support an interpretation of digital advertising as oriented toward mobilizing supporters, while observed audience segmentation cannot distinguish campaign targeting from platform delivery algorithms.

## Research Question

How do differences in advertising costs and audience-targeting precision relate to which candidates advertise, when and where they advertise, and what messages they present?

## Motivation

Television-centered research misses candidates unable to afford broadcast advertising and messages delivered selectively online. Lower production costs and finer geographic targeting could expand access, while narrower audiences could change incentives for persuasion, mobilization, negativity, and policy discussion.

## Contributions

- Combines Facebook Ad Library data with Wesleyan Media Project television tracking across federal, statewide, and state legislative contests.
- Separates differences in advertiser composition from differences in the same candidate's messages across media.
- Measures tone, issues, partisanship, and ideological presentation using common multimodal features.
- Connects message content to observed audience demographics without equating delivered impressions with targeting intentions.

## Method

The dataset contains 7,298 advertising candidates: 1,032 using both media, 242 television only, and 6,024 Facebook only. Facebook records include creatives, approximate spending and impressions, dates, and aggregate audience demographics. Television records provide creatives, airing locations and times, and estimated costs. Spending comparisons cover May 24, 2018, through Election Day.

Features extracted from text, transcribed audio, images, and faces feed supervised models of tone and issue content trained on human-coded ads. Additional models predict sponsor party and campaign-finance ideology scores (CFscores). Expenditure-weighted predictions summarize each candidate's messaging. Party distinctiveness is measured by distance of predicted Republican probability from 0.5; ideological extremity uses absolute predicted CFscore.

Candidate fixed effects compare media within campaigns; candidate-week and candidate-election specifications address timing and primary/general-election composition. Standard errors are clustered by candidate. Audience analyses regress ad-level content predictions on demographic impression shares with candidate fixed effects.

## Experiments

This is an observational comparison, not a randomized advertising experiment.

| Dimension | Reported finding |
| --- | --- |
| Access | Fewer than 10% of state house and senate candidates advertise on television, versus roughly 40% on Facebook. |
| Spending | Aggregate television spending is about ten times Facebook spending; down-ballot candidates rely relatively more on Facebook. The incumbency interaction in spending differences is not statistically significant. |
| Timing | Within candidates, television spending accelerates faster near Election Day. Aggregate Facebook spending appears later because the advertiser mix changes over time. |
| Geography | Table 2 reports a 7.3-percentage-point higher in-state impression share on Facebook in the candidate-medium comparison. Greater district–media-market congruence predicts relatively more television spending. |
| Tone | Facebook ads are more positive and less likely to attack or contrast with opponents, including within candidate-week comparisons. |
| Issues | Facebook ads are about 10 percentage points less likely to mention a measured issue. Economy, health care, immigration, and education differences are roughly 3–6 points. Issue concentration declines slightly despite lower overall issue content. |
| Ideology | Absolute predicted CFscore increases by about 0.125 within candidates. The party-distinctiveness estimate is about 0.02, but its confidence interval overlaps zero. Within-candidate variability also increases. |
| Segmentation | Issue content varies with audience age and gender; male audiences see more right-leaning presentations. The ideology–age relationship is weak. |

## Limitations

Fixed effects remove stable candidate differences but do not randomly assign media or isolate targeting precision from other platform characteristics. Observed audience composition reflects both advertiser choices and Facebook's delivery system. Predicted sponsor ideology measures message presentation, not voters' attitudes or policy effects.

Coverage concerns candidate-sponsored Facebook and television ads in one election cycle. Claims about other digital platforms, voter knowledge, turnout, or polarization are implications rather than measured effects. The supplied text identifies 2020 in its publication notice; the year above follows that source. Replication materials are identified as DOI 10.7910/DVN/IR9XGC.

## Related Concepts

- [[concepts/political-advertising-audience-segmentation|Political Advertising Audience Segmentation]]: connects selective delivery to variation in messages within a campaign.

## Related Papers

- [[papers/competing-activists-political-polarization|Competing Activists–Political Polarization]]: offers a theoretical model of strategic audience positioning and polarization; the present paper supplies observational evidence on campaign messages, without testing that model's opinion dynamics.
