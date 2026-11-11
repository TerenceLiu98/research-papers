---
title: Invisibilization in Language Models
type: concept
tags:
  - algorithmic-fairness
  - language-models
  - belief-updating
---

## Overview

Invisibilization is the exclusion of a person’s information from a model’s judgment when the person’s description triggers non-assessment. It can produce demographic disparities even when assessed members of a protected group receive equal or higher credibility.

## Key Ideas

- Separate whether testimony is used from how much it is trusted when assessed. API refusals and numerical assignments of zero information weight are different observable behaviors.
- In the two-urn operationalization, reliability 0.5 makes testimony uninformative. Lower reliability is not necessarily less informative: a reliably false report can be inverted.
- If a group has decline rate $\pi$ and assessed mean reliability $d$, its reliability-scale deficit is $\Delta=\pi(d-0.5)$. Differences in this deficit can offset assessed-trust differences in an aggregate audit.
- This decomposition is descriptive; interpreting assessed trust causally requires attention to selection. It is not itself a log-odds measure of information loss.
- Scoring accompanied by verified outcomes can support evidence-based trust. Scoring instructions alone need not do so, and fairness reminders can increase non-assessment.

## Important Papers

- [[papers/invisibilization-as-a-source-of-probability-bias-in-language-models|Invisibilization as a Source of Probability Bias in Language Models]]: defines the deficit and tests description-dependent evidence exclusion using controlled urn tasks.

## Related Concepts

- [[concepts/probability-calibration|Probability Calibration]]: evaluates whether stated reliability matches outcomes, complementing audits of whose information is counted.
