---
title: "Spikes and Variance: Using Google Trends to Detect and Forecast Protests"
type: paper
authors:
  - Joan C. Timoneda
  - Erik Wibbels
year: 2022
doi: "10.1017/pan.2021.7"
tags:
  - protest-forecasting
  - google-trends
  - political-methodology
---

## TL;DR

Repeated overlapping Google Trends queries reveal the consistency of search interest, which can predict protests better than isolated index spikes. The authors report ROC AUCs of 0.92 for event-level logistic classification and 0.90 for daily gradient boosting in US metropolitan areas.

## Research Question

Can variation in normalized search interest detect protests and forecast them before they occur, despite Google Trends sampling noise and window-dependent indexing?

## Motivation

An index peak of 100 need not indicate substantial absolute interest: even a low-volume query can reach its within-window maximum. Search activity offers a complementary signal to the documentary sources used in [[concepts/protest-event-analysis|Protest Event Analysis]], but requires a measurement strategy adapted to this normalization.

## Contributions

- Explains why sampling and normalization complicate comparisons of Google Trends scores.
- Introduces overlapping weekly collection and a coefficient-of-variation signal that captures sustained interest.
- Evaluates event-level and daily forecasting using independently recorded protest labels.

## Method

For the search term “protest,” collect hourly observations from weekly windows shifted one day at a time across a three-month period. Average overlapping observations for each hour, calculate standard deviations in 12-hour intervals, and form the coefficient of variation, σ/μ. Lower relative variability is interpreted as more consistent interest. This is the paper's [[concepts/search-interest-variability-for-event-forecasting|Search-Interest Variability for Event Forecasting]] approach.

The event-level logistic classifier uses maxima and minima of this coefficient in windows 1–3, 3–5, and 5–7 weeks before an event, leaving a one-week forecasting gap. A second model uses gradient boosting with logged coefficient-of-variation values lagged 1–14 days to predict daily protest occurrence. Evaluation uses ten-fold cross-validation; an additional in-sample model includes metro-area fixed effects.

## Experiments

The Baltimore protests in April 2015 illustrate the signal. The main sample covers January 2017–May 2019 and contains a reported 130 protests from the Crowd Counting Consortium and 133 constructed nonevents. Approximately 3.623 million raw observations become 568,080 city-hour observations after averaging.

| Evaluation | Reported result |
| --- | --- |
| Event-level logistic classifier, 263 observations | ROC AUC 0.92; accuracy 0.85 |
| Daily gradient boosting, 15,780 observations | ROC AUC 0.90; F1 0.88 |
| Daily protest detection | 78.4% of protest days identified; no false positives on average |

These are reported results, not independently reproduced measurements. Comparisons with Twitter studies concern different datasets and forecast settings, rather than a common benchmark. Replication materials are identified as [Harvard Dataverse, DOI 10.7910/DVN/WXZH8C](https://doi.org/10.7910/DVN/WXZH8C).

## Limitations

- The approach targets normally low-volume queries; the authors do not establish applicability to consistently popular terms. Wording, media attention, platform changes, and access to Google affect interpretation.
- Evidence comes from selected US metropolitan events and constructed nonevents. Random-fold validation does not itself establish performance on a prospective chronological deployment.
- The supplied text contains numerical inconsistencies: protest size strata sum to 129 rather than 130, the control construction mentions 130 despite the reported total of 133, and event-level confusion counts do not reconcile with the stated class totals. The reported daily confusion averages also require clarification against the stated dataset size. Aggregate metrics above are retained as author-reported values.
- Overlapping windows require attention to what information would actually be available at forecast time; retrospective collection alone does not verify a live forecasting pipeline.

## Related Concepts

- [[concepts/search-interest-variability-for-event-forecasting|Search-Interest Variability for Event Forecasting]]: the core measurement strategy.
- [[concepts/protest-event-analysis|Protest Event Analysis]]: supplies event definitions and validation labels.
- [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]]: a complementary approach based on interpreting reports rather than search activity.

## Related Papers

- Choi and Varian (2012), “Predicting the Present with Google Trends”: earlier search-based prediction and nowcasting.
- Lazer et al. (2014), “The Parable of Google Flu: Traps in Big Data Analysis”: motivates caution about search-based proxies.
- Bahrami et al. (2018), “Twitter Reveals: Using Twitter Analytics to Predict Public Protests”: a social-media forecasting comparison discussed by the authors.

Published in *Political Analysis* 30:1–18 (2022); first published online 8 April 2021.
