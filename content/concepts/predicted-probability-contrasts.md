---
title: Predicted Probability Contrasts
type: concept
aliases:
  - Predicted Probability Differences
definition: "Predicted probability contrasts compare model-implied probabilities of a specified outcome across covariate scenarios, with uncertainty calculated for the contrast itself."
tags:
  - statistical-inference
  - categorical-data
---

## Overview

A predicted probability contrast measures how an outcome's model-implied probability differs between specified scenarios. For category $k$, a binary-covariate contrast is $\Delta_k=P(Y=k\mid X=1,Z=z)-P(Y=k\mid X=0,Z=z)$. Researchers may instead average such differences over a stated distribution of $Z$. These choices define different summaries; causal interpretation requires an appropriate research design and assumptions.

## Key Ideas

- **Match the hypothesis to the scale.** In multinomial logit, coefficients describe log odds relative to a reference category. Their significance does not test whether a particular category's probability changes.
- **Propagate uncertainty to the contrast.** Use simulation or approximation to obtain uncertainty for the probability difference, accounting for the shared fitted model rather than treating its two predictions as independent.
- **Reference-category invariance.** Reparameterizing an equivalent multinomial logit model changes coefficient contrasts but leaves predicted probabilities and their uncertainty unchanged.
- **Inspect underlying probabilities.** Increased odds of one category relative to another can arise from a decline in the denominator category alone.
- **State the scenario.** Fixing other covariates at means, selecting meaningful profiles, and averaging over observed cases need not produce the same answer.

## Important Papers

- [[papers/predicted-probabilities-and-inference-with-multinomial-logit|Predicted Probabilities and Inference with Multinomial Logit]]: demonstrates missed and misleading inferences when coefficient tests substitute for category-probability contrasts.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: averages causal effects within moderator-defined populations; probability contrasts can instead be descriptive and evaluated at fixed profiles.
- [[concepts/stick-breaking-multinomial-models|Stick-Breaking Multinomial Models]]: an alternative categorical probability parameterization, distinct from baseline-category multinomial logit.
