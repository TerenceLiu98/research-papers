---
title: Suppression Effects in Regression
type: concept
aliases:
  - Suppressor Variables
  - Regression Suppression
definition: "Control-variable-induced increases in the magnitude of a focal regression coefficient, with broad treatments also encompassing sign reversals."
tags:
  - regression
  - research-transparency
  - causal-inference
---

## Overview

Suppression occurs when adding covariates reveals a stronger focal association than a simpler specification suggests. Broad definitions include sign reversals as well as magnitude increases without a reversal. The statistical pattern does not by itself identify a causal mechanism or establish whether adjustment improves an estimate.

## Key Ideas

- **Distinguish coefficient changes from precision gains.** A smaller p-value can result from a larger coefficient, a smaller standard error, or both; only the coefficient channel diagnoses suppression in this usage.
- **Explain the mechanism.** Correlated predictors can mask a substantively meaningful relationship, but adjustment can also introduce or amplify bias. Covariate timing and the causal structure matter.
- **Use an appropriate comparison.** A minimal specification may need to retain design-required terms. An unadjusted estimate is not automatically a valid causal benchmark.
- **Disclose sensitivity.** Present minimal and adjusted estimates and explain why influential controls belong in the model. A few selected specifications may conceal substantial variation across control combinations.
- **Separate dependence from invalidity.** Crossing a significance threshold after adjustment is evidence of specification dependence, not proof of a false positive or intentional manipulation.

## Important Papers

- [[papers/achieving-statistical-significance-with-control-variables-and-without-transparency|Achieving Statistical Significance with Control Variables and Without Transparency]] — audits suppression and disclosure in AJPS studies, separating coefficient changes from standard-error changes and recommending minimal-model transparency.

## Related Concepts

- [[concepts/publication-bias|Publication Bias]] — significance incentives can favor specifications that increase effect estimates, although suppression does not itself prove selective publication.
- [[concepts/endogenous-research-design|Endogenous Research Design]] — analyst choices can make control selection part of the process generating reported findings.
