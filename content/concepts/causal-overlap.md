---
title: Causal Overlap
type: concept
aliases:
  - Positivity Assumption
  - Treatment Overlap
tags:
  - causal-inference
  - propensity-scores
  - representation-learning
---

## Overview

Causal overlap requires that the treatment states being compared remain possible at the covariate values relevant to the target population. For binary treatment and adjustment variables $Z$, the usual condition is $0<P(T=1\mid Z=z)<1$. Stronger versions bound these probabilities away from zero and one. Overlap supports treated-control comparisons and limits reliance on extrapolation; it does not establish that confounding has been removed.

## Key Ideas

- **Overlap depends on the adjustment variables.** Treatment may overlap conditional on relevant confounders but become deterministic after conditioning on information that directly encodes treatment. For a linguistic feature determined by a document's words, full-text conditioning creates precisely this problem.
- **Estimated extremes require diagnosis.** True lack of support and propensity-model behavior are distinct. Estimated probabilities of zero or one can arise even in a constructed design with underlying overlap, and make ordinary inverse-weighted calculations undefined.
- **Representation quality is not prediction accuracy alone.** An embedding can predict treatment well while making causal comparisons difficult. Conversely, a compact representation can preserve overlap while omitting confounders. Both conditions matter.
- **Trimming and winsorization have limits.** Trimming removes observations with extreme estimated scores; winsorization clips the scores used for weighting. These operations change the analyzed population or weights and do not recover confounding information missing from a representation.
- **Design can supply comparisons.** In a valid paired text-editing design, both treatment states occur for each original's preserved non-treatment content. Unequal numbers of edits still require an estimator that respects original-text groups.

## Important Papers

- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: demonstrates extreme estimated propensities in text-based neural causal estimators and proposes paired editing under preservation assumptions.
- Crump et al. (2009), "Dealing with limited overlap in estimation of average treatment effects": cited by that paper for handling extreme propensity scores.
- D'Amour et al. (2021), "Overlap in observational studies with high-dimensional covariates": cited by that paper in discussing the relationship between adjustment dimensionality and overlap.

## Related Concepts

- [[concepts/text-as-treatment|Text as Treatment]]: makes treatment encoding in the observed data especially explicit.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: must preserve the information and support needed for its intended causal query.
- [[concepts/double-machine-learning|Double Machine Learning]]: cross-fitting and orthogonal scores retain overlap assumptions.
- [[concepts/structured-treatments|Structured Treatments]]: requires support for the treatment comparisons being interpreted.
