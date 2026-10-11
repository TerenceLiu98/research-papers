---
title: Thompson Sampling
type: concept
aliases:
  - Posterior Sampling
tags:
  - adaptive-randomization
  - bayesian-inference
  - multi-armed-bandits
---

## Overview

Thompson sampling is a Bayesian adaptive allocation rule that assigns an arm according to its posterior probability of being optimal. Uncertainty keeps multiple arms eligible for exploration, while accumulated evidence shifts allocation toward promising arms. An experimental design can use the same principle to search for a minimum as well as a maximum.

## Key Ideas

- For Bernoulli outcomes with a $\operatorname{Beta}(\alpha_0,\beta_0)$ prior, an arm with $s$ successes and $f$ failures has posterior $\operatorname{Beta}(\alpha_0+s,\beta_0+f)$.
- Draw one parameter value from each arm's posterior and assign the arm with the largest draw. Under the posterior model, this assigns each arm in proportion to its probability of being the maximum. Select the smallest draw to search for a minimum.
- Equivalently, estimate optimal-arm probabilities with many posterior draws and then sample an arm categorically using those probabilities. The conjoint application uses this form to record assignment probabilities explicitly.
- A fixed warm-up can provide initial evidence before adaptive allocation. Updating may occur after completed responses or between batches.
- A posterior probability of optimality measures model-based uncertainty about selection; it is not a confidence interval for the selected arm's outcome probability.
- Adaptive observations and selection complicate ordinary inference. A separate fixed-allocation validation phase is one way to estimate selected arms without the winner's curse; it does not prove optimal-arm selection.

## Important Papers

- Thompson (1933), "On the Likelihood that One Unknown Probability Exceeds another in View of the Evidence of Two Samples": the foundational reference cited by the conjoint paper.
- [[papers/adaptive-randomization-in-conjoint-survey-experiments|Adaptive Randomization in Conjoint Survey Experiments]]: uses posterior sampling to search for minimum and maximum focal-attribute choice probabilities across contexts.

## Related Concepts

- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]
- [[concepts/exploratory-causal-inference|Exploratory Causal Inference]]
