---
title: Analyzing the Impact of Electricity Price Forecasting on Energy Cost-Aware Scheduling
type: paper
authors:
  - Diarmuid Grimes
  - Georgiana Ifrim
  - Barry O'Sullivan
  - Helmut Simonis
year: null
tags:
  - electricity-price-forecasting
  - energy-cost-aware-scheduling
  - forecast-evaluation
  - mathematical-optimization
---

## TL;DR

Electricity forecasts with lower prediction error can produce more expensive schedules. On historical Irish market prices, tuning support-vector forecasts jointly for price magnitude and daily price ranking improves scheduling costs in simulated feedmill and home energy management applications. Gains over the original FM1 forecast are small and not uniformly statistically significant; weights learned for feedmill scheduling do not transfer equally well to household scheduling.

## Research Question

Which forecast properties matter for the realized cost of a day-ahead energy schedule, and can inexpensive combinations of forecasting metrics guide model selection better than MSE alone?

## Motivation

Consumers exposed to variable market prices can shift energy-intensive work into cheaper periods, but must commit to schedules before actual prices are known. Forecast errors matter through the decisions they induce: underestimating an expensive period can attract costly work, while incorrect rankings can misallocate demand even when average prediction error is low. Evaluating the resulting schedule at actual prices connects forecast quality to the operational objective.

## Contributions

- Compares price estimation, over- and underestimation, and daily Spearman rank correlation against realized scheduling costs.
- Introduces two scheduling-driven parameter-selection criteria: a joint MAE/rank-correlation criterion and a weighted combination of ranking and asymmetric estimation errors.
- Evaluates simplified and variable-duration feedmill scheduling plus household scheduling with appliance, electric-vehicle, and thermal-comfort constraints.
- Reports a negative result for direct schedule-cost tuning in the simplified feedmill case and shows that useful metric weights depend on the scheduling application.

## Method

**Forecasting.** FM1 directly predicts half-hourly prices using RBF-kernel support-vector regression. Features include historical prices, shadow prices, demand, wind, generator bids, planned outages, and estimates of the market operator's forecast quality. FM2 predicts deviations from a local historical average and adds that average back. Model parameters are selected by validation grid search. Missing half-hours are filled from the closest half-hour, and inputs are aligned to half-hourly resolution (Sections 3.2-3.3).

**Scheduling and evaluation.** A schedule is optimized using forecast prices, then evaluated using actual prices without continuous rescheduling. Feedmill optimization assigns tasks to four press lines subject to machine, duration, deadline, and power constraints. Household optimization minimizes a weighted sum of electricity expenditure and appliance/temperature discomfort, including vehicle charging, discharging, and heating losses. Consequently, household energy consumption can change with prices, whereas each feedmill instance has fixed total consumption (Sections 4 and 7).

**Scheduling-driven tuning.** FM1geom jointly favors low MAE and high average daily Spearman correlation. The text describes a geometric mean involving negative MAE, but does not provide a reproducible real-valued transformation; the criterion is retained descriptively here. FM1convex combines scaled MAE-over, MAE-under, and ranking criteria, with weights learned by regressing observed percentage scheduling-cost gaps on forecast metrics. Reported normalized importance weights are 0.122, 0.305, and 0.573 respectively. These feedmill-derived weights are reused in the other applications, not relearned for households (Section 6.1.2).

This is [[concepts/scheduling-driven-price-forecasting|Scheduling-Driven Price Forecasting]] through proxy-based parameter tuning. It avoids solving a full scheduling problem for every candidate forecast during tuning.

## Experiments

**Data and protocol.** Models train on 2010 Irish Single Electricity Market data; January, March, and May 2011 provide validation, and February, April, and June provide 88 test days. Features respect the four-day delay before actual market values become available. Feedmill-single uses 100 random instances per test day, with a ten-instance comparison; every task lasts one half-hour and sorting solves the simplified problem. Feedmill-across uses ten instances per day, task durations of 25-100 minutes, five-minute scheduling resolution, and CPLEX. The household experiment reports 40 test days (Sections 3, 6, and 7).

**Forecast accuracy versus cost.** Table 3 gives MSEs of 1086.25 for SEMO, 821.01 for FM1, and 781.72 for FM2. Despite having the lowest MSE, FM2 has the highest cost among these three in both feedmill settings.

The following are reported mean per-instance, per-day percentage cost gaps relative to schedules built with actual prices, labeled **%Worse** in Tables 6, 10, and 12. They are averages of percentages, not percentages computed from aggregate mean costs.

| Forecast | Feedmill-single | Feedmill-across | Household |
| --- | --- | --- | --- |
| SEMO | 3.10% | 2.87% | 6.50% |
| FM1 | 2.97% | 2.82% | 4.69% |
| FM2 | 3.28% | 3.07% | 4.06% |
| FM1geom | 2.92% | 2.77% | 3.70% |
| FM1convex | 2.88% | 2.76% | 4.24% |

For feedmill-single, FM1convex reduces mean cost from EUR 521.95 with SEMO to EUR 520.63; the actual-price reference costs EUR 505.90. Its percentage gap improves by 0.22 percentage points over SEMO. A monthly historical-average forecast gives a 4.19% gap, versus 8.48% for a day/night schedule evaluated at actual prices (Tables 4 and 6).

For feedmill-across, FM1geom has slightly lower mean euro cost than FM1convex (EUR 521.98 versus EUR 522.04), although FM1convex has the slightly lower average percentage gap. Both improve over SEMO in the reported paired tests (p = 0.014 and 0.016), but neither comparison with FM1 reaches 0.05 (p = 0.054 and 0.33; Table 11).

For households, FM1geom gives the lowest reported mean cost, EUR 2.04 versus EUR 2.10 for SEMO and EUR 1.97 for the actual-price reference. Its improvement over SEMO is significant in the reported test (p = 0.0032), while its comparison with FM1 is not (p = 0.099). The feedmill-derived FM1convex does not outperform FM1geom (Tables 12-13).

**Negative result.** Direct schedule-cost parameter tuning, FM1scost, produces a 4.35% feedmill-single gap, worse than all five forecasts above. The authors suggest that identical forecast orderings can induce identical schedules while leaving price magnitudes poorly constrained. This is an explanation for the observed tuning result, not a general proof that direct decision-cost optimization fails (Section 6.1.2).

## Limitations

- Evidence uses historical prices from one market and generated scheduling instances, rather than a prospective deployment. Continuous rescheduling is excluded, and unusual overnight spikes remain costly failure cases.
- Household scheduling includes comfort penalties and energy losses, so its actual-price reference and forecast sensitivity differ from the fixed-energy feedmill problem. Learned metric weights are not universal.
- Many feedmill runs share the same daily price forecast. Reported paired-test significance should not be interpreted as thousands of independent market-day observations.
- The supplied description leaves the FM1geom transformation and details of metric scaling/weight-learning sample separation insufficiently explicit for exact reproduction. Section 7 also describes its 40 household days as ten weeks of Monday-Friday operation, which is inconsistent as written; the tables are summarized using the explicitly reported 40 days.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for this manuscript. These are left unspecified.

## Related Concepts

- [[concepts/scheduling-driven-price-forecasting|Scheduling-Driven Price Forecasting]]: evaluates prediction through its effect on downstream schedule cost.
- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]]: a conceptual connection through scaling and weighting several forecast-quality criteria, rather than an additional method evaluated in this paper.

## Related Papers

The following works are cited in the supplied manuscript and have no matching paper pages in the library:

- Ifrim, O'Sullivan, and Simonis (2012), "Properties of energy-price forecasts for scheduling": prior study establishing the mismatch between MSE and manufacturing schedule cost (reference 1).
- Simonis (2007), "Models for global constraint applications": source of the adapted feedmill scheduling problem (reference 20).
- Grimes, Simonis, Pratt, and Sheridan (2012), "Automated Energy Usage Optimization for the Residential Sector: Impact of Price Tariffs": household scheduling scenario used in the evaluation (reference 28).

[[index|Library home]]
