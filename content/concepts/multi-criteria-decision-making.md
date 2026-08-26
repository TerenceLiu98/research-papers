---
title: Multi-Criteria Decision Making
type: concept
aliases:
  - MCDM
  - Multi-Criteria Evaluation
tags:
  - multi-criteria-decision-making
  - decision-support
  - weighting
  - evaluation
---

## Overview

Multi-Criteria Decision Making (MCDM) evaluates alternatives when performance must be considered across several criteria that may differ in scale, meaning, and importance. A typical workflow defines criteria, normalizes observations, determines weights, aggregates performance, and ranks or sorts alternatives.

## Key Ideas

- Weighting can encode expert judgment, observed variation, or both. Fuzzy BWM supplies subjective weights from best-to-others and others-to-worst comparisons, while CRITIC uses dispersion and inter-criterion conflict for objective weights.
- Combining weight vectors can reduce dependence on a single source of importance. The paper uses game theory to choose combination coefficients and EFAST to adjust for interaction sensitivity.
- MCDM may rank alternatives or sort them into ordered classes. TOPSIS-Sort-C compares alternatives with characteristic profiles rather than only producing a global ranking.
- Multi-criteria results remain conditional on indicator definitions, sample selection, normalization, and the relation between criteria and the target construct. Robustness and sensitivity checks are therefore part of responsible evaluation.
- In rumor-refutation evaluation, content, account, audience, behavior, and network-context variables are treated as complementary evidence about account-level effectiveness.

## Important Papers

- [[A Novel Multi-Criteria Evaluation Method for Rumor-Refutation Effectiveness of Rumor-Refutation Accounts on Social Media Platforms Integrating Social Network Analysis]]
- Rezaei (2016), "Best-Worst Multi-Criteria Decision-Making Method: Some Properties and a Linear Model."
- Silva and Filho (2020), "Sorting with TOPSIS through Boundary and Characteristic Profiles."
- Li, He, Martinez, Zhang, Wang, and Liu (2024), "Comparative Analysis of Three Categories of Multi-Criteria Decision-Making Methods."

## Related Concepts

- [[TOPSIS-Sort-C]]
- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]
- [[Consensus Reaching in Group Decision Making]]

