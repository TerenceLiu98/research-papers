---
title: "Polls, Context, and Time: A Dynamic Hierarchical Bayesian Forecasting Model for US Senate Elections"
type: paper
authors:
  - Yehu Chen
  - Roman Garnett
  - Jacob M. Montgomery
year: 2023
doi: 10.1017/pan.2021.42
tags:
  - election-forecasting
  - bayesian-inference
  - gaussian-processes
---

## TL;DR

A hierarchical model combines Gaussian-process projections of candidate support with a historical Dirichlet regression of election outcomes. Training separately at each forecast horizon learns how much to trust polls relative to fundamentals. The prospective 2020 evaluation reports 93.75% winner accuracy and 96.9% coverage for nominal 95% intervals on the included Senate races.

Published in *Political Analysis* 31, 113–133 (2023); first published online January 18, 2022. [Paper DOI](https://doi.org/10.1017/pan.2021.42).

## Research Question

How can sparse, changing Senate polls and electoral fundamentals produce accurate vote-share forecasts with calibrated uncertainty at different distances from Election Day?

## Motivation

Senate races often have few polls and substantial candidate-specific variation. Treating projected public opinion as the election outcome misses additional uncertainty about turnout and other unmodeled influences. Historical election results can teach both the poll-to-vote relationship and its uncertainty.

## Contributions

- Connects a dynamic candidate-support model to an election-level model trained across historical cycles.
- Uses a linear trend with smooth GP deviations to support extrapolation when polling is sparse while allowing nonlinear movement when data justify it.
- Selects GP hyperparameters for election-result predictive likelihood and retrains the complete hierarchy at each horizon.

## Method

The candidate layer uses [[concepts/gaussian-process-regression|Gaussian Process Regression]] with support modeled as an intercept, a linear time trend, and a Matérn-3/2 GP deviation. A regression on party, lagged Cook PVI, and prior elected-office experience supplies the intercept prior. Poll proportions have an approximate Gaussian likelihood with sampling variance plus shared extra noise. Conditional GP inference is analytic under this approximation; it yields a distribution for Election Day support rather than only a point estimate.

The election layer maps uncertain support, party-coded PVI, experience, and party-coded year random effects into nonnegative Dirichlet concentration parameters, with a common nonnegative offset. Vote shares sum to one across included candidates. Stan's No-U-Turn sampler estimates the election-level posterior. This layer represents outcome uncertainty beyond uncertainty in latent opinion.

Training uses only polls available at each horizon: 56, 42, 28, 21, 14, 7, or 0 days before the election. A search over 100 Sobol-sequence hyperparameter settings maximizes leave-one-year-out vote-share log likelihood on 1992–2016. Full hyperparameter selection requires 27,300 posterior chains across settings, horizons, and held-out cycles; the reported approximately five-minute fit applies after hyperparameter selection.

## Experiments

The historical dataset includes 501 election results and over 7,900 polls in the post-1992 period through 2018. Party- and candidate-sponsored polls are excluded. Baselines are an adapted Bayesian random walk (BRW), a linear-support model plus Dirichlet regression (LM+DR), and a standalone GP.

Table 2 reports the following **1992–2016 leave-one-year-out Election Day** results:

| Model | Vote-share RMSE | 95% interval coverage | Winner accuracy |
| --- | --- | --- | --- |
| GP+DR | 0.053 | 0.946 | 0.951 |
| LM+DR | 0.055 | 0.950 | 0.932 |
| BRW | 0.060 | 0.527 | 0.898 |
| GP | 0.075 | 0.747 | 0.936 |

At 56 days, GP+DR has RMSE 0.082 and coverage 0.919. LM+DR is a close competitor; nonlinear deviations contribute primarily near Election Day. These validation cycles also guide hyperparameter selection, so they are not an untouched test set.

**2018:** Held out during development. Figure 4 reports that all modeled outcomes fall within 95% intervals at the seven-day horizon; Arizona and Nevada are incorrect winner calls. The parsed text's Election Day summary repeats Table 2 values, so those numbers are retained above under the table's explicit historical label rather than treated as independent 2018 estimates.

**2020:** Forecasts were made before the election, retaining selected GP hyperparameters and refitting the election layer on 1992–2018. Louisiana and the Georgia special election are excluded, and no third-party candidates are modeled. Table 3 reports RMSE 0.0316, winner accuracy 93.75%, 80% coverage 0.875, and 95% coverage 0.969. North Carolina and Maine are incorrect calls; Maine is the only 95% interval miss. The model matches FiveThirtyEight Deluxe's winner calls. Its normalized vote-share RMSE is not directly comparable to FiveThirtyEight's unnormalized-share RMSE.

## Limitations

Historical tuning and evaluation reuse the same cross-validation cycles. Only 2018 and 2020 provide separate-cycle tests, and future cycles are needed to assess sustained calibration. Pollster house effects are not modeled. Runoffs, ranked-choice voting, and ex ante third-party inclusion need further development. The Dirichlet model imposes restrictive compositional dependence assumptions; the authors motivate its use by changing candidate categories across races. Hyperparameters require horizon-specific fitting rather than online updating. Transfer to presidential or House elections changes both polling density and dependence across outcomes.

## Related Concepts

- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: models latent support and propagates projection uncertainty.
- [[concepts/polling-house-effects|Polling House Effects]]: a proposed extension beyond the shared polling-noise term.
- [[concepts/compartmental-election-forecasting|Compartmental Election Forecasting]]: an alternative dynamic approach based on preference-state transitions rather than GP trajectories.

## Related Papers

- Linzer (2013), “Dynamic Bayesian Forecasting of Presidential Elections in the States”: source of the adapted random-walk baseline.
- Jackman (2005), “Pooling the Polls Over an Election Campaign”: related Bayesian poll aggregation, distinguished here from predicting final outcomes.
- Stoetzer et al. (2019), “Forecasting Elections in Multiparty Systems: A Bayesian Approach Combining Polls and Fundamentals”: related integration of polls and contextual information.

Replication resources: [Code Ocean](https://doi.org/10.24433/CO.4154884.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/GNHESM).
