---
title: Randomized Response Instruments
type: concept
aliases:
  - Survey Response Instruments
definition: Randomized response instruments are randomly assigned survey protocols that affect participation without directly affecting the outcome, providing identifying variation for models of non-ignorable nonresponse.
tags:
  - survey-nonresponse
  - missing-data
  - identification
---

## Overview

Randomly varying survey incentives, invitations, or participation options can reveal how outcome distributions change as response propensity changes. A valid response instrument affects whether an answer is observed without directly changing the underlying answer. This is a survey participation design, distinct from randomized-response techniques that protect sensitive answers through deliberate answer randomization.

## Key Ideas

- **Relevance and exclusion:** Assignment must change participation and remain unrelated to the population outcome conditional on covariates.
- **Additional selection restrictions:** In the logit formulation used by Bailey, identification requires no instrument–outcome interaction in response, positivity, and a correctly specified selection-bias function. Random assignment alone is insufficient.
- **Population orthogonality:** Selection can associate the instrument and outcome among respondents even when they are independent in the population. Weighting or imputation restores the population restriction to estimate selection parameters.
- **Conditional double robustness:** Combining MNAR weighting and imputation can tolerate one misspecified component under the identifying assumptions. It does not repair invalid exclusion or arbitrary selection-bias misspecification.
- **Design and precision:** Strong changes in response help precision; low response or rare subgroup outcomes can still leave substantial uncertainty. A response-disfavoring protocol can supply identifying variation just as a response-encouraging protocol can.

## Important Papers

- [[papers/countering-non-ignorable-nonresponse-in-survey-models-with-randomized-response-instruments-and-doubly-robust-estimation|Bailey (2025)]]: illustrates weighting, imputation, and doubly robust estimation using randomized survey-topic choice in a 2019 political survey.
- Sun et al. (2018), “Semiparametric Estimation with Data Missing Not at Random Using an Instrumental Variable”: identification and estimation framework described and applied by Bailey.

## Related Concepts

- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: shares the concern with informative observation but identifies selection through a different modeling structure.
