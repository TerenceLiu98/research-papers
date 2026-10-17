---
title: Partisan Sorting
type: concept
aliases:
  - Partisan-Ideological Sorting
tags:
  - partisan-sorting
  - political-polarization
  - political-measurement
---

## Overview

Partisan sorting is the alignment of party identification with ideological preferences. It concerns how beliefs and party membership fit together. Between-party ideological distance, within-party diversity, demographic alignment, and hostility toward opponents capture related but distinct features of political division.

## Key Ideas

- **Separation and homogeneity can diverge.** Parties' average opinions can move farther apart while opinions within a party become more varied. Measuring only party means cannot establish increasing ideological coherence.
- **Operational definitions matter.** In Ojer et al.'s ANES analysis, a smaller within-party radius of gyration in a shared opinion embedding indicates greater homogeneity and is interpreted as more sorting. This distributional indicator does not directly measure party switching or establish the direction of influence between identity and opinions.
- **Alignment can be separated from population dispersion.** Jocker et al. remove modeled age, period, and cohort means from orientations and party identification, scale residuals by predicted absolute deviations, and estimate their association with interactions for those groups. Their sorting measure adjusts for modeled divergence; it is distinct from within-party homogeneity and does not establish the direction of influence between attitudes and identities.
- **Rising sorting need not come from generational replacement.** Jocker et al. find strong period increases across issues, but no consistent increase across successive US generations. This conclusion is conditional on the restrictions used in their [[concepts/age-period-cohort-analysis|Age-Period-Cohort Analysis]].
- **Demographic alignment is a separate quantity.** Similarity between racial or income-group opinion gradients and a party gradient measures alignment in issue space. It need not imply that distances between those demographic groups are increasing.
- **Time comparisons need common measurement.** Pooling identical items across survey waves supports comparisons within one embedding. Its fixed battery also restricts which emerging political divisions can be represented.
- **Distributional summaries complement means.** For covariance matrix $\Sigma$, radius of gyration $\sqrt{\operatorname{tr}(\Sigma)}$ summarizes dispersion. Distributional distances and density plots can reveal shifts concealed by a centroid between clusters. Conclusions remain conditional on the chosen items and embedding geometry.

## Important Papers

- [[papers/growing-up-in-a-polarized-party-system-ideological-divergence-and-partisan-sorting-across-generations|Growing Up in a Polarized Party System: Ideological Divergence and Partisan Sorting Across Generations]] (Jocker et al., 2024): separates sorting from ideological dispersion in GSS and ANES data; finds period increases dominate generational differences.
- [[papers/charting-multidimensional-ideological-polarization-across-demographic-groups-in-the-usa|Charting multidimensional ideological polarization across demographic groups in the USA]] (Ojer et al., 2025): finds growing partisan separation alongside increased Democratic dispersion in the later ANES waves; interprets that dispersion as reduced sorting under its homogeneity measure.
- Levendusky (2009), *The Partisan Sort: How Liberals Became Democrats and Conservatives Became Republicans*: cited by Ojer et al. for the alignment of ideological preferences and party identification.
- Baldassarri and Gelman (2008), "Partisans without constraint: political polarization and trends in American public opinion": cited by Ojer et al. in distinguishing sorting from relationships among issue attitudes.

## Related Concepts

- [[concepts/political-polarization|Political Polarization]]: sorting is one dimension of political division, with a different empirical target from affective hostility.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: multiple issue dimensions can sustain diversity within partisan coalitions.
- [[concepts/geodesic-distance|Geodesic Distance]]: supplies the nonlinear geometry used in the ANES embedding application.
