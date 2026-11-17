---
title: Bayesian Improved Surname Geocoding
type: concept
aliases:
  - BISG
definition: "Bayesian Improved Surname Geocoding combines surname and residential demographic information using Bayes' rule to estimate individual probabilities of racial or ethnic group membership."
tags:
  - bayesian-inference
  - race-estimation
  - political-methodology
---

## Overview

Bayesian Improved Surname Geocoding estimates race or ethnicity when administrative records lack self-reports. Surname dictionaries and residential demographics supply complementary information. The output is a probability distribution over categories, whose accuracy depends on how informative names and geography are in the population studied.

## Key Ideas

- **Retain probabilities for aggregate composition.** Summing each group's probabilities across individuals estimates its expected count. Assigning everyone their most probable category discards uncertainty and can create clustered aggregate errors.
- **Geographic resolution matters.** ZIP-code implementations reduce geocoding costs, while finer geography can improve accuracy for some groups.
- **Validate the target quantity.** Individual classification accuracy, precinct counts, and district shares are different evaluation targets. Good aggregate estimates do not establish reliable individual labels.
- **Distinguish population from electorate.** Applying BISG to registered voters estimates their composition; estimating turnout or electoral preferences requires additional information.
- **Check transfer across populations.** Racial heterogeneity, residential segregation, and surname informativeness can change error patterns.

## Important Papers

- [[papers/validating-the-applicability-of-bayesian-inference-with-surname-and-geocoding-to-congressional-redistricting|DeLuca and Curiel (2023)]] validates probability summation against plurality assignment in North Carolina and Georgia and finds lower aggregate errors with summation.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]] can evaluate the sensitivity of BISG composition errors to alternative district boundaries.
