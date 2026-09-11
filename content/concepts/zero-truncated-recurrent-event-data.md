---
title: Zero-Truncated Recurrent Event Data
type: concept
tags:
  - recurrent-events
  - zero-truncation
  - sampling-bias
---

## Overview

Zero-truncated recurrent event data contain records only for subjects with at least one event during an observation window. Subjects with no events in that window are entirely absent, potentially including their covariates and observation periods. The observed cohort therefore does not directly represent a target population that includes nonusers or event-free subjects.

## Key Ideas

- Selection is defined by the observation window: $N_i(C_{Ri})-N_i(C_{Li})>0$. A subject omitted from this window may have experienced events earlier or may experience them later.
- Truncation and censoring are distinct. Truncation excludes subjects; left and right censoring restrict the event histories observed for included subjects. Both can occur in administrative records.
- A likelihood conditional on inclusion can connect the selected cohort to a population event model. Ignoring selection can distort baseline and covariate estimates.
- External population counts can approximate missing risk-set contributions when individual records for subjects with zero observed events are unavailable. Their usefulness depends on compatible coverage, covariates, and observation periods.
- In [[history-stratified-recurrent-event-models|History-Stratified Recurrent Event Models]], incomplete pre-window history introduces an additional uncertainty: the first observed event need not be the first lifetime event. Correcting truncation alone does not resolve this uncertainty.

## Important Papers

- [[stratified-regression-analysis-of-zero-truncated-recurrent-event-data|Stratified Regression Analysis of Zero-Truncated Recurrent Event Data]]: combines census augmentation with probabilistic history strata and contrasts it with truncated likelihood.
- Hu and Lawless (1996), "Estimation of rate and mean functions from truncated recurrent event data": foundational use of supplementary population and observation-time information, as discussed in Chen, Hu, and Rosychuk (2025).

## Related Concepts

- [[history-stratified-recurrent-event-models|History-Stratified Recurrent Event Models]]: conditions event intensity on a summary of earlier events while allowing incomplete stratum information.
