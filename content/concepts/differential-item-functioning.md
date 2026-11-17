---
title: Differential Item Functioning
type: concept
aliases:
  - DIF
definition: "Differential item functioning occurs when an item's response function differs across respondent groups, undermining comparisons based on a shared measurement model."
tags:
  - bayesian-measurement
  - item-response-theory
---

## Overview

Differential item functioning is a violation of measurement invariance: the relationship between a latent trait and an observed response differs across groups. Giving everyone the same question does not establish that their answers measure the same trait on a comparable scale.

## Key Ideas

- Differences in response frequencies alone do not establish DIF; groups may simply have different latent-trait distributions. DIF concerns the response function conditional on the trait.
- Group-specific discrimination or difficulty parameters allow heterogeneous mappings. In political joint scaling, this can prevent voter–legislator comparisons even when both answer corresponding policy items.
- Groups can be predefined or inferred from response patterns. The multiple policy space model infers respondent clusters with shared item parameters and holds membership constant across items.
- Mixture components need not be substantively distinct populations. Similar components can require post-processing before interpreting how many measurement regimes exist.
- Accounting for DIF within groups does not automatically align latent scales across groups.

Substantive DIF can also reflect different issue–ideology relationships across countries, rather than response artifacts alone. Binding, Koedam, and Steenbergen separate country-varying discrimination and party–issue deviations from national scale use and expert noise, conditional on a common ideological dimensionality.

## Important Papers

- [[papers/a-nonparametric-bayesian-model-for-detecting-differential-item-functioning-an-application-to-political-representation-in-the-us|Shiraito, Lo, and Olivella (2023)]]: uses a Dirichlet process prior over item response functions to discover comparable subsets of voters and legislators.

- [[papers/the-comparative-meaning-of-political-space-a-comprehensive-modeling-approach|The comparative meaning of political space]]: models substantive and measurement-related variation jointly in repeated expert ratings of parties.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: models the trait-to-response mapping whose invariance is at issue.
- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: allow unknown groups to be inferred without fixing their substantive count beforehand.
