---
title: Cluster-Polarization Coefficient
type: concept
aliases:
  - CPC
  - Cluster Polarization Coefficient
tags:
  - political-polarization
  - political-measurement
  - variance-decomposition
---

## Overview

The cluster-polarization coefficient (CPC) measures how much of the total variation in observed positions is attributable to differences between groups. It operationalizes polarization as the combination of intergroup heterogeneity and intragroup homogeneity, accommodating multiple groups and dimensions. Its interpretation depends on the chosen group partition and position variables.

## Key Ideas

- **Separation relative to dispersion.** With total, between-group, and within-group sums of squares satisfying $TSS=BSS+WSS$, the coefficient is $CPC=BSS/TSS=1-WSS/TSS$. For positive TSS, its unadjusted value lies in $[0,1]$.
- **Cohesion matters.** Moving group means apart raises CPC when within-group dispersion is held fixed. Reducing within-group dispersion also raises CPC when between-group variation is held fixed. Difference-in-means misses the second change; total variance may move in the opposite direction.
- **Multiple dimensions and groups.** Squared deviations are summed across position dimensions and group memberships. Groups can be supplied by the researcher or assigned through clustering; the resulting statistic must be interpreted relative to that choice.
- **Adjustment is distinct from the raw ratio.** Mehlhaff proposes $CPC_{adj}=1-(1-CPC)(N-J)/(N-JK)$ for $N$ observations, $J$ dimensions, and $K$ groups. It addresses upward bias in the raw measure. As an algebraic consequence, this expression need not remain nonnegative and is undefined at $N=JK$; the raw coefficient's range is not an adjusted-score guarantee.
- **Measurement choices remain substantive.** Input scaling, outliers, group-size imbalance, and group definitions affect interpretation. A correction for degrees of freedom does not make different substantive constructs interchangeable.
- **Choose the construct first.** CPC is useful when cohesion within groups belongs to the definition of polarization. A study concerned only with dispersion among aggregate party positions may instead require a party-system dispersion measure.

## Important Papers

- [[papers/a-group-based-approach-to-measuring-polarization|A Group-Based Approach to Measuring Polarization]] (Mehlhaff, 2023): introduces CPC and its adjustment, with congressional, comparative elite, and party-affect applications. The congressional validation includes a weak two-dimensional Senate correlation of 0.089 with party unity.

## Related Concepts

- [[concepts/political-polarization|Political Polarization]]: the broader family of ideological, affective, and group-based divisions.
- [[concepts/party-system-polarization|Party-System Polarization]]: party-position dispersion need not incorporate within-party cohesion.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes the dimensions of political positions from the degree of polarization on them.
- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: concerns estimating the group locations and dispersions relevant to separation and cohesion.
