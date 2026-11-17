---
title: Text Quantification
type: concept
aliases:
  - Document Category Proportion Estimation
definition: "Text quantification estimates the proportions of documents belonging to specified categories in a target collection, using labeled examples without necessarily assigning individual document labels."
tags:
  - text-as-data
  - quantification
---

## Overview

Text quantification targets aggregate category prevalence in a document collection. Its loss concerns errors in proportions, so selecting a model for individual classification accuracy may optimize the wrong quantity. Categories should have substantive meaning and reliable labels.

## Key Ideas

- **Classification and aggregation:** Counting predicted labels works when misclassification errors cancel appropriately; high classification accuracy alone does not ensure this.
- **Direct estimation:** Category-conditional feature means and target feature means form a mixture system whose coefficients are category proportions. Estimation needs identifiable category profiles and transportable conditional information.
- **Changing prevalence:** Labeled and target category proportions may differ even when conditional feature means remain stable.
- **Changing language:** Emergent or vanishing discourse can violate transportability. Matching may reduce mismatch, but cannot replace missing category-specific support.
- **Task-specific representation:** Features useful for prevalence estimation should distinguish categories while contributing nonredundant information. Readme2 optimizes continuous feature projections for this purpose.

## Important Papers

- [[papers/an-improved-method-of-automated-nonparametric-content-analysis-for-social-science|An Improved Method of Automated Nonparametric Content Analysis for Social Science]]: combines optimized continuous features with matching to improve direct multicategory quantification.
- Hopkins and King (2010), “A Method of Automated Nonparametric Content Analysis for Social Science”: develops readme for direct estimation from text.

## Related Concepts

- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: shares the challenge of transporting learned information over time; text quantification specifically targets aggregate category proportions.
