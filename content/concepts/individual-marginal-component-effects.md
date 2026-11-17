---
title: Individual Marginal Component Effects
type: concept
aliases:
  - IMCE
  - IMCEs
definition: "Individual marginal component effects are respondent-specific effects of conjoint attribute contrasts, averaged over the randomized distribution of other profile attributes."
tags:
  - conjoint-experiments
  - preference-measurement
---

## Overview

Individual marginal component effects quantify the direction and strength of a particular respondent's preference for one attribute level over another. Repeated randomized profiles supply within-respondent observations, making individual estimation possible under conjoint identification assumptions.

## Key Ideas

- A respondent-specific OLS slope on a binary attribute equals the difference in that respondent's mean ratings across its levels. Other attributes are averaged over their randomized distribution.
- Stability, absence of carryover and profile-order effects, and independent randomization support identification. Observing both contrast levels is necessary for estimation.
- Rating scales, fewer attribute levels, and more profiles improve feasibility. Each respondent's sample size is the number of profiles they rate, not the total experiment size.
- Uncertain point estimates should not be treated as known preferences. Normal-approximation or within-respondent bootstrap draws can feed repeated downstream analyses, pooled using multiple-imputation rules.
- Confidence intervals containing zero are not proof of indifference. Empirical distributions of estimates also contain estimation noise.

## Important Papers

- [[papers/estimating-and-using-individual-marginal-component-effects-from-conjoint-experiments|Estimating and Using Individual Marginal Component Effects from Conjoint Experiments]]: develops independent OLS estimation, practical design recommendations, and plausible-value uncertainty propagation in an immigrant-admission application.

## Related Concepts

- [[concepts/multiple-imputation|Multiple Imputation]]: supplies pooling rules for analyses across plausible-effect datasets.
- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]: targets heterogeneity across profile contexts, a distinct scope from respondent-specific effects.
