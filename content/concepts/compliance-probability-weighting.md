---
title: Compliance Probability Weighting
type: concept
aliases:
  - CPW
definition: "Compliance probability weighting reweights randomized assignment groups by pre-treatment estimates of complier probability to target assignment effects averaged over the complier covariate distribution."
tags:
  - causal-inference
  - noncompliance
---

## Overview

Compliance probability weighting estimates an outcome contrast between randomized assignment groups, weighting each observation by its estimated probability of belonging to the complier principal stratum. It adjusts the covariate distribution toward that of compliers while retaining the randomized assignment comparison.

## Key Ideas

- Normalize estimated complier probabilities separately within treatment and control arms. These are probability weights, not inverse-probability weights.
- The limit averages conditional assignment effects over the complier covariate distribution. Residual differences between complier and population effects within covariate strata remain.
- A nonnegative average residual difference makes the limit a lower bound on the complier effect. Common-sign, within-stratum effect ordering gives a bound in magnitude. Neither result alone point identifies the complier effect.
- Consistent estimation and positive complier probabilities are essential. Avoiding exclusion in the final theorem does not make latent compliance probabilities identifiable without assumptions.
- With constant compliance probabilities the procedure reduces to the unweighted assignment contrast. Predictive pre-treatment covariates determine its practical benefit.

## Important Papers

- [[papers/estimating-the-local-average-treatment-effect-without-the-exclusion-restriction|Estimating the Local Average Treatment Effect Without the Exclusion Restriction]]: establishes conservative-limit results and applies the method to political advertising.

## Related Concepts

Principal-score methods are the broader family: they model membership in strata defined by potential treatment receipt. CPW's conservative interpretation uses effect-ordering restrictions in place of the principal ignorability assumptions used for point identification.
