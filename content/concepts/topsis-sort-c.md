---
title: TOPSIS-Sort-C
type: concept
aliases:
  - TOPSIS Sort-C
  - Characteristic-Profile TOPSIS Sorting
tags:
  - TOPSIS
  - multi-criteria-decision-making
  - classification
  - clustering
---

## Overview

TOPSIS-Sort-C is an ordered multi-criteria sorting method that assigns alternatives to predefined categories using characteristic profiles. It extends the idea of choosing alternatives close to an ideal solution by comparing each alternative's closeness coefficient with profiles representing ordered performance levels.

## Key Ideas

- Alternatives and profiles are placed in a common decision matrix with indicator domains, normalized values, and criterion weights.
- Euclidean distances to ideal and anti-ideal solutions produce a closeness coefficient. Alternatives are assigned to the profile whose coefficient is the appropriate nearest match under the ordered-class rules.
- Profile placement is consequential: manually chosen profiles can introduce decision-maker bias or irregular gaps between classes.
- The OC-TOPSIS-Sort-C variant uses clustering to derive profiles and compares candidate algorithms with silhouette coefficients. The paper evaluates K-Means, agglomerative hierarchical clustering, OPTICS, Gaussian mixture models, and STING before selecting the OC result.
- Sorting is not the same as causal explanation. A class label summarizes the supplied indicators and profiles; it does not establish that changing one indicator will cause an account to move classes.

## Important Papers

- [[A Novel Multi-Criteria Evaluation Method for Rumor-Refutation Effectiveness of Rumor-Refutation Accounts on Social Media Platforms Integrating Social Network Analysis]]
- Silva and Filho (2020), "Sorting with TOPSIS through Boundary and Characteristic Profiles."
- Roy, Shaw, and Ishizaka (2023), "Developing an Integrated Fuzzy Credit Rating System for SMEs Using Fuzzy-BWM and Fuzzy-TOPSIS-Sort-C."

## Related Concepts

- [[Multi-Criteria Decision Making]]
- [[Social Network Analysis]]
- Classification
- Clustering
- Sensitivity analysis

