---
title: Modelling behaviour in author networks with graphon mean field games
type: paper
authors:
  - Thomas Fabian
  - Christian Fabian
  - Heinz Koeppl
  - Thomas Weitin
year: 2026
doi: 10.1057/s41599-025-06482-4
tags:
  - graphon-games
  - social-networks
  - computational-social-science
---

[[index|Library home]]

## TL;DR

In a German fanfiction network, more connected authors tend to publish more explicit stories. A graphon mean field game reproduces the distribution of age categories across connectedness groups better than a reward-only mean field game, but does not establish which direction the association runs.

## Research Question

Does authors’ connectedness correlate with the explicitness of their writing, and does incorporating network structure improve a mathematical reconstruction of this behavior?

## Motivation

Attention and social capital provide reasons to seek connections, but aggregate popularity alone cannot explain why authors at different network positions publish different content. Fanfiction supplies an interest-based setting with observable reviewing interactions and ordinal content ratings.

## Contributions

- Combines network structure and content ratings in an empirical analysis of author behavior.
- Fits a smooth graphon to reviewing interactions and uses it in a finite-state strategic model.
- Compares network-aware and reward-only reconstructions using the same 40 category-by-connectedness cells.

## Method

The Darmstadt Fanfiction Corpus covers FanFiktion.de during 2020–2023: 67,456 texts, 22,127 authors, and 1,094,937 reviews. A sample of 1,000 users supports graphon estimation with penalized linear B-splines and an EM procedure using MCMC in its E-step.

Authors occupy four states, P6, P12, P16, and P18, representing increasing explicitness through profanity, violence, or sexual content. Authors with several categories are assigned the category receiving the most reviews; users must have published a story to enter this behavioral analysis. Actions maintain, increase, or decrease explicitness. Mean reviews per story define category rewards: 4.09, 7.44, 17.56, and 31.65 respectively.

The [[concepts/graphon-mean-field-games|graphon mean field game]] incorporates the neighborhood measure $G_t^\alpha=\int_0^1 W(\alpha,\beta)\mu_t^\beta\,d\beta$. Equilibrium requires best-response policies and consistency with the distributions those policies generate. The authors use online mirror descent. The comparator uses rewards without network-dependent behavior.

Evaluation divides authors into ten connectedness groups and four ratings. Here graphon index zero denotes the most connected authors; this ordering is specific to the application, not an inherent meaning of graphon coordinates.

## Experiments

The empirical distribution shifts from predominantly P12 among weakly connected authors toward P16 and P18 with increasing connectedness. The reward-only model favors P18 in every group; the graphon model recovers the broad gradient but deviates for the most connected 20%.

| Reported error | Reward-only MFG | Network-aware GMFG |
| --- | --- | --- |
| Normalized L1 | 14.25% | 12.32% |
| Normalized L2 | 18.65% | 15.65% |

Across the 40 paired absolute errors, a two-tailed Wilcoxon signed-rank test reports W = 155 and p < 0.001; reported Cohen’s d is 0.47. These measure reconstruction of empirical cell proportions, rather than demonstrated prospective forecasting.

The estimated topology places highly connected authors in peripheral clusters and weakly connected authors between them. The authors interpret the latter as bridges; information diffusion and creative innovation are not directly tested here.

## Limitations

The observational data lack authors’ longitudinal connectedness, so they cannot distinguish whether explicit writing attracts connections or connections encourage explicit writing. Better model fit does not identify social influence causally or establish the paper’s broader interpretation in terms of identity loss in crowds. Age ratings simplify behavior and reviews simplify motivation. The graphon estimate uses a subset of users, and the authors attribute errors among highly connected authors to possible estimator mismatch with the network topology. Generalization to other interest-based networks remains open.

## Related Concepts

- [[concepts/graphons|Graphons]]: smooth approximation of network structure.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: heterogeneous neighborhood interactions in a continuum game.
- [[concepts/bridging-social-capital|Bridging Social Capital]]: interpretation of connections between dense author clusters.

## Related Papers

- [[papers/graphon-mean-field-games-and-the-gmfg-equations|Graphon Mean Field Games and the GMFG Equations]] supplies foundational equilibrium theory; this paper applies a finite-state computational approach to author behavior.
- Cui and Koeppl (2022), *Learning graphon mean field games and approximate Nash equilibria*: source for the equilibrium formalization.
- Fabian, Cui, and Koeppl (2023), *Learning sparse graphon mean field games*: source for the learning algorithm.

## Source

[Published article](https://doi.org/10.1057/s41599-025-06482-4), published January 12, 2026. [Analysis resources](https://osf.io/8xs3e) are reported in the paper. This note is based on the supplied parsed Markdown.
