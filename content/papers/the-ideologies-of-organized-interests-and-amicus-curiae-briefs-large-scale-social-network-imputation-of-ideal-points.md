---
title: "The Ideologies of Organized Interests and Amicus Curiae Briefs: Large-Scale, Social Network Imputation of Ideal Points"
type: paper
authors:
  - Sahar Abi-Hassan
  - Janet M. Box-Stefensmeier
  - Dino P. Christenson
  - Aaron R. Kaufman
  - Brian Libgober
year: 2023
doi: 10.1017/pan.2022.34
tags:
  - political-methodology
  - ideal-point-estimation
  - social-network-analysis
---

## TL;DR

ACNet extends donation-based ideology scores through the bipartite network of organizations and Supreme Court amicus briefs. Iterative averaging produces scores for 12,549 organizations and 11,731 briefs, including groups without donation histories. Leave-one-out validation yields mean absolute deviation of 0.6 versus 1.00 for a zero-score baseline.

## Research Question

Can coalition relationships recover comparable ideological positions for organized interests that lack campaign contributions or legislative position records?

## Motivation

Existing measures select donors, registered lobbyists, or highly active organizations. Amicus cosigning supplies a broader behavioral record and connects organizations across cases, issues, and historical periods.

## Contributions

- Extends a common donation-based scale to thousands of non-donor organizations and to briefs themselves.
- Develops a network averaging estimator with an absorbing-Markov-chain interpretation and bootstrap uncertainty estimation described in the supplement.
- Uses the resulting scores to describe coalition polarization, donor selection, and historical changes in ideological representation before the Court.

## Method

The input comprises 15,376 organizations signing 14,385 briefs from 1917–2012. Exact and hand-validated fuzzy matching identifies 2,973 organizations with DIME scores. These supply fixed seed values in an organization–brief bipartite graph.

Under the assumption that cosigning expresses ideological affinity, unlabeled nodes repeatedly average their neighbors' scores. In [[concepts/network-based-ideal-point-imputation|Network-Based Ideal-Point Imputation]], seed nodes act as absorbing states. If Q describes transitions among unlabeled nodes and S transitions to seeds, absorption weights are (I − Q)⁻¹S for components that reach seeds. Multiplying these weights by seed scores produces the imputed positions. The implementation uses repeated matrix squaring to approach the limit.

For final organization scores, labeled organizations receive leave-one-out predictions rather than their original DIME values; unlabeled organizations use the full seed set. This makes shrinkage more comparable across the two groups. Scores are static and unidimensional, even though the underlying activity spans decades.

## Experiments

Section 2.3 reports leave-one-out mean absolute deviation of 0.6, compared with 1.00 for always predicting zero. Ideological sign agrees with DIME for 65% of organizations, rising to 74% for those with scores meaningfully different from zero. The article also reports supplementary simulation and alternative-seed checks; their detailed results are not reproduced in the supplied text.

Coalitions form largely polarized liberal and conservative communities, with some cross-ideological connections. Donors have mean score −0.049 (SD 0.597), compared with −0.219 (SD 0.573) for non-donors: they are more conservative relative to non-donors and more evenly distributed across the spectrum. Brief representation is historically more liberal, approaching balance from the mid-1980s onward.

## Limitations

The estimator inherits seed-score assumptions and depends on meaningful ideological affinity in cosigning. Validation on donors does not independently establish validity for non-donors. Static scores cannot recover within-organization ideological change; historical aggregate patterns reflect the composition of activity under this fixed scoring scheme. One dimension cannot capture all issue-specific preferences, and seed-disconnected components cannot be anchored by the procedure.

The supplied article reports 12,549 scored organizations, 2,973 donors, and 9,430 non-donors; these counts do not reconcile arithmetically. The non-donor count should therefore not be treated as a verified partition of the scored total.

## Related Concepts

- [[concepts/network-based-ideal-point-imputation|Network-Based Ideal-Point Imputation]]: propagates externally anchored scores through relational data.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: a related network measurement approach using following relationships rather than cosigning and fixed donor seeds.

## Related Papers

- Bonica (2014), “Mapping the Ideological Marketplace”: supplies the donation-based measurement foundation and seed scores.
- Hansford and Depaoli (2015), “Estimating the Ideal Points of Organized Interests in Legal Policy Space”: earlier amicus-based scaling of 192 active organizations, discussed in the article.

Published in *Political Analysis* 31:396–413. [Article](https://doi.org/10.1017/pan.2022.34). [Replication data](https://doi.org/10.7910/DVN/TOYNMH).
