---
title: Bin-Conditional Conformal Prediction of Fatalities from Armed Conflict
type: paper
authors:
  - David Randahl
  - Jonathan P. Williams
  - Håvard Hegre
year: 2025
tags:
  - conformal-prediction
  - conflict-forecasting
  - uncertainty-quantification
---

## TL;DR

Bin-conditional conformal prediction (BCCP) calibrates prediction sets separately within user-defined outcome ranges. In the conflict-fatality application, standard conformal prediction covers 92% of observations overall but only 52% of nonzero outcomes; two-bin BCCP reaches 90% in both zero and nonzero groups, at the cost of wider sets.

## Research Question

Can model-agnostic uncertainty estimates maintain nominal coverage across substantively important ranges of a severely skewed, zero-inflated outcome?

## Motivation

Aggregate accuracy and marginal interval coverage can obscure failures on rare, high-fatality events. Policymakers need uncertainty estimates that represent these outcomes as well as the much more frequent peaceful country-months.

## Contributions

- Extends label-conditional (Mondrian) conformal prediction to bins of real-valued outcomes.
- Compares unions of bin-specific intervals with contiguous intervals spanning their outer endpoints.
- Evaluates coverage and width in log-normal simulations and a ViEWS conflict-fatality application.

## Method

Train a predictor on a training partition and calculate nonconformity scores on a separate calibration partition. Group calibration scores by observed outcome bin. For each test input, evaluate hypothetical outcomes within each bin using that bin’s calibration scores, then unite the accepted candidates. The unknown test outcome does not need to be assigned to a bin in advance.

Under within-bin exchangeability, the conformal construction targets coverage conditional on membership in each specified outcome bin. This is distinct from coverage conditional on every covariate value. The union may be discontiguous; filling its gaps preserves inclusion but can create overcoverage. One bin recovers standard conformal prediction. More bins require enough calibration observations and generally produced wider sets in the reported experiments. The authors provide an implementation in the R package `pintervals`.

## Experiments

### Log-normal simulation

Two independent uniform predictors determine the log-scale mean, with log-scale standard deviation 0.5. The study generates 10,000 observations, split into 5,000 training, 2,500 calibration, and 2,500 test cases. Linear regression predicts log outcomes; exponentiated predictions and absolute errors support conformal calibration. Two, four, and six outcome bins are compared at 90% nominal coverage.

Table 1 reports 90% aggregate coverage for standard conformal prediction, but 64% in the highest outcome quartile. Four-bin discontiguous BCCP achieves 90% in each quartile. Two-bin BCCP still covers only 80% in the highest quartile: coverage within a chosen bin does not imply coverage in every finer subset. Six-bin BCCP also retains undercoverage at the most extreme outcomes (Figure 1).

### Conflict fatalities

The ViEWS broad-topics constituent model uses 64 features, including news-topic features, to predict country-month state-based conflict fatalities during 2000–2022. Approximately 86.7% of outcomes are zero; the largest 1% account for nearly 75% of fatalities. A random forest predicts log1p fatalities over 1,000 random 70/20/10 training/calibration/test splits. Predictions and interval bounds are transformed back to counts, with bounds rounded to integers.

Reported coverage at a 90% target (Table 2):

| Method | Overall | Zeros | Nonzeros |
| --- | --- | --- | --- |
| Standard conformal | 0.92 | 0.98 | 0.52 |
| BCCP, 2 bins | 0.90 | 0.90 | 0.90 |
| BCCP, 4 bins | 0.90 | 0.90 | 0.91 |
| BCCP, 7 bins | 0.90 | 0.90 | 0.90 |
| Bootstrap on log scale | 0.92 | 0.98 | 0.51 |
| Quantile regression | 0.99 | 1.00 | 0.89 |

Seven-bin boundaries distinguish 0, 1–2, 3–7, 8–20, 21–54, 55–148, and 149+ fatalities. Four bins combine adjacent nonzero ranges; two bins distinguish zeros from nonzeros. BCCP produces wider intervals than the alternatives in this application. Parametric and bootstrap comparators generally under-cover nonzero outcomes despite near-nominal aggregate coverage.

## Limitations

- Validity depends on exchangeability within bins; temporal changes in conflict processes can violate this assumption. Random splits do not establish prospective temporal calibration.
- Coverage is guaranteed at the chosen bin level, not at every outcome value or covariate value. Extreme-tail undercoverage can remain within bins.
- Bin choice trades local calibration against width and calibration-sample precision. The application’s boundaries are exploratory, not demonstrated optimal choices.
- Discontiguous sets can be harder to communicate; contiguizing them can inflate coverage and width.

## Related Concepts

- [[concepts/bin-conditional-conformal-prediction|Bin-Conditional Conformal Prediction]]: outcome-stratified calibration underlying the method.
- [[concepts/conformal-prediction|Conformal Prediction]]: model-agnostic calibration and exchangeability assumptions.
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]: distinguishes outcome-bin guarantees from covariate-conditional guarantees.

## Related Papers

- Shafer and Vovk (2008), “A Tutorial on Conformal Prediction”: foundational conformal framework cited by the authors.
- Toccaceli and Gammerman (2019), “Combination of Inductive Mondrian Conformal Predictors”: label-conditional precedent.
- Hegre et al. (2022), “Forecasting Fatalities”: source of the ViEWS forecasting application.

Replication data identifier supplied by the paper: [10.7910/DVN/BZC110](https://doi.org/10.7910/DVN/BZC110).
