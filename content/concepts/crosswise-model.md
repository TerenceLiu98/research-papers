---
title: Crosswise Model
type: concept
aliases:
  - Crosswise Survey Model
definition: "An indirect survey design that estimates sensitive prevalence from joint answers to a sensitive statement and an independent private nonsensitive statement with known prevalence."
tags:
  - survey-methodology
  - sensitive-questions
---

## Overview

The crosswise model asks whether two statements are both true or both false, versus exactly one being true. Neither answer reveals the sensitive statement's truth on its own. Known nonsensitive prevalence and independence of the statements allow aggregate sensitive prevalence to be recovered.

## Key Ideas

- **Identification:** if $p$ is nonsensitive prevalence and $\lambda$ the combined-answer probability, sensitive prevalence is $(\lambda+p-1)/(2p-1)$; $p=0.5$ does not identify it.
- **Random-response contamination:** equiprobable random answers pull the conventional estimate toward 0.5, potentially inflating rare sensitive attributes.
- **Anchor correction:** a matched question with known sensitive prevalence can estimate attention. Transferring this estimate requires equal attentive proportions and no carryover, alongside the random-pick assumption.
- **Uncertainty:** estimating attention adds uncertainty; bootstrap inference accompanies the bias correction. Privacy protection does not itself guarantee valid measurement.

## Important Papers

- [[papers/a-bias-corrected-estimator-for-the-crosswise-model-with-inattentive-respondents|Atsusaka and Stevenson (2023)]] — develops anchor-based correction and extensions to weighting, regression, and sensitivity analysis.

## Related Concepts

- [[concepts/measurement-error-correction-in-ranking-questions|Measurement Error Correction in Ranking Questions]] — another anchor-calibrated contamination model, with different observed responses and population-inference requirements.
