---
title: Measurement Error Correction in Ranking Questions
type: concept
aliases:
  - Ranking Response Contamination Correction
definition: "Design-based correction of ranking statistics that separates preference-independent responses from substantive rankings using randomized item order and an anchor question with known correct answers."
tags:
  - survey-methodology
  - measurement
  - ranking-data
---

## Overview

Full-ranking survey data can mix meaningful preferences with arbitrary positional patterns. Randomizing item presentation makes preference-independent responses uniform over substantive rankings under this framework, but does not eliminate their contribution. The observed distribution remains pulled toward indifference.

## Key Ideas

- **Identify distribution and prevalence separately.** Item-order randomization supplies the uniform contamination distribution; a randomized anchor ranking with a known answer estimates its share after adjusting for chance success.
- **Transfer requires comparability.** The anchor and target must have equal random-response proportions. Similar format, content, and adjacent placement support this assumption without requiring the same individuals to respond randomly to both.
- **Correct the mixture.** For mean ranks and ranking probabilities, subtract the estimated uniform contribution and divide by the estimated non-random share. Ranking-profile frequency ratios also provide weights for downstream models, though parametric correction is not generally exact.
- **Distinguish two uniformities.** Random substantive rankings become uniform after presentation randomization. In contrast, positional response patterns should be uniform among non-random responders; non-uniform positional patterns can diagnose contamination.
- **Specify the population.** Recovering statistics among non-random responders does not identify counterfactual preferences of random responders. Generalization requires additional assumptions about those preferences.

## Important Papers

- [[papers/addressing-measurement-errors-in-ranking-questions-for-the-social-sciences|Atsusaka and Kim (2025)]] — develops direct and weighted correction and illustrates the method with identity rankings in a survey of American adults.

## Related Concepts

- [[concepts/acquiescence-response-bias|Acquiescence-Response Bias]] — a distinct response tendency in assertion-based questions; both problems motivate explicit survey designs to separate response behavior from the measured construct.
