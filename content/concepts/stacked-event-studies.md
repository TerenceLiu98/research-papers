---
title: Stacked Event Studies
type: concept
aliases:
  - Stacked Difference-in-Differences
  - Stacked DiD
tags:
  - causal-inference
  - difference-in-differences
  - panel-data
---

## Overview

Stacked event studies construct separate comparisons around treatment cohorts and pool the resulting event windows. Each cohort uses an explicitly defined untreated comparison group. This organization can avoid comparisons against already-treated units that complicate conventional two-way fixed-effects analyses with staggered treatment.

## Key Ideas

- **Cohort construction:** Align observations by time relative to treatment, then combine cohort-specific datasets. Researchers or institutions can appear in multiple stacks, so stacked observation counts need not equal unique unit-year counts.
- **Fixed effects:** Unit-by-cohort effects absorb stable differences within each comparison; time-by-cohort effects absorb common shocks within that stack.
- **Comparison eligibility:** Never-treated and not-yet-treated units are distinct choices. Specify whether controls remain untreated throughout the relevant event window; stacking alone does not guarantee valid comparisons.
- **Identification:** Parallel untreated trends, absence of relevant anticipation, and limits on spillovers remain substantive assumptions. Matching and small pretreatment coefficients are diagnostics rather than proofs.
- **Interpretation and inference:** Cohort composition and weighting determine what a pooled coefficient summarizes. Repeated units and the level at which treatment is assigned matter for uncertainty estimates.
- **Separate questions:** An average treatment effect does not identify a mediation mechanism or an effect on an entire outcome distribution.

## Important Papers

- Cengiz, Dube, Lindner, and Zipperer (2019), "The effect of minimum wages on low-wage jobs": the methodological precedent cited by the sanctions paper for stacking event-specific comparisons.
- [[papers/science-under-sanctions-the-impact-of-the-entity-list-on-chinese-academic-research|Science under sanctions: The impact of the entity list on Chinese academic research]]: stacks four institutional listing cohorts with researcher-by-cohort and year-by-cohort fixed effects, and reports alternative control groups and DiD estimates as robustness checks.

## Related Concepts

- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: asks how treatment changes an outcome law; this differs from pooling average effects across treatment cohorts.
- [[concepts/research-diversification|Research Diversification]]: a behavioral response examined around staggered institutional sanctions.
