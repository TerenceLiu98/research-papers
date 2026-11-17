---
title: Nonignorable Attrition in Pairwise Randomized Experiments
type: paper
authors:
  - Kentaro Fukumoto
year: 2022
doi: 10.1017/pan.2020.51
tags:
  - causal-inference
  - experimental-design
  - missing-data
---

## TL;DR

Deleting incomplete pairs can offer a clearer causal interpretation and better variance estimation than deleting only missing units. Neither procedure generally recovers the full-population average treatment effect under nonignorable attrition. Under pairwise matched attrition, the pairwise deletion estimator targets always-reporting pairs, with a conservative finite-sample variance estimator that becomes unbiased in the paper's super-population limit.

## Research Question

How do unitwise and pairwise deletion compare in bias, efficiency, causal interpretation, and variance estimation when outcomes are nonignorably missing in pairwise randomized experiments?

## Motivation

Pair matching balances pretreatment characteristics, but retaining that balance after attrition does not guarantee representative treatment effects. Conversely, retaining more observed units need not produce a more efficient estimate. An analysis must account for both the assignment design and selection into observation.

## Contributions

- Derives bias and variance for both deletion estimators under explicit restrictions on potential response patterns.
- Establishes a principal-effect interpretation for pairwise deletion under a weaker matched-attrition restriction than the one used to analyze unitwise deletion.
- Extends the paired variance adjustment to unitwise deletion and characterizes its bias.
- Shows that the conventional paired variance estimator remains conservative in the finite sample and unbiased in the super-population limit under pairwise matched attrition.

## Method

There are two units per pair, with one randomly assigned treatment independently across pairs. Potential outcomes satisfy SUTVA. Let $R_{ij}(x)$ indicate whether unit $i$ in pair $j$ would report under assignment $x$.

The unitwise deletion estimator (UDE) subtracts observed control and treated means, retaining all reporting units. The pairwise deletion estimator (PDE) averages treated-minus-control differences only over complete pairs.

Unitwise matched attrition requires $R_{1j}(x)=R_{2j}(x)$ for each assignment. The weaker pairwise matched attrition condition requires

$$
R_{1j}(1)R_{2j}(0)=R_{1j}(0)R_{2j}(1).
$$

This makes complete-pair membership invariant to assignment. Retained pairs are then always-reporting pairs: both units report under both assignments. PDE is unbiased for their average treatment effect, provided at least one such pair is available. Its bias relative to the full ATE reflects treatment-effect differences between this stratum and the full population. UDE can instead compare differently selected populations across treatment arms (§§2.2, 3.2).

For $m$ complete pairs, define $D_j=Y_{tj}-Y_{cj}$. The adjusted Neyman variance estimator for PDE is

$$
\widehat V_P=\frac{1}{m(m-1)}\sum_{j=1}^{m}(D_j-\bar D)^2,
$$

requiring $m\geq2$. It incorporates covariance between paired treated and control outcomes. Under pairwise matched attrition it is conservative for finite-sample randomization variance. Its bias vanishes as the super-population size grows with sampled pair count fixed, under the paper's sampling and regularity conditions and conditional on at least two complete pairs. This is a variance result, not removal of full-ATE selection bias.

The analogous UDE adjustment uses covariance from complete pairs with a factor depending on complete-pair and arm-specific reporting counts. Its bias need not be nonnegative. Unadjusted Neyman estimators that ignore pairing can be biased in either direction (§§2.4, 3.4).

## Experiments

The supplied article provides analytical propositions rather than numerical simulations or an empirical results table. It refers to proofs, detailed comments, and an application in supplementary material, whose results are not included in the supplied Markdown. The variance comparisons establish that PDE can be more efficient despite discarding more observations; they do not establish universal efficiency dominance.

## Limitations

The matched-attrition assumptions restrict unobserved potential response patterns; random assignment alone does not establish them. Pairwise deletion does not generally identify the full-population ATE, and its always-reporting-pair interpretation depends on the stated restriction. Variance estimation requires at least two complete pairs. Super-population unbiasedness is stated in a population-size limit, distinct from an increasing experimental sample. The recommendation favors PDE on interpretation and variance-estimation grounds rather than a universal bias or mean-squared-error ranking.

## Related Concepts

- [[concepts/block-randomized-designs|Block-Randomized Designs]]: pairwise assignment is blocking with two units per block; outcome attrition can undermine the target population even when matching is retained.
- [[concepts/lee-trimming-bounds|Lee Trimming Bounds]]: an alternative approach to nonignorable outcome selection that bounds an always-responder effect under different assumptions.

## Related Papers

- [[papers/generalizing-trimming-bounds-for-endogenously-missing-outcome-data-using-random-forests|Generalizing Trimming Bounds for Endogenously Missing Outcome Data Using Random Forests]]: related library work on always-responder effects, using conditional monotonicity and bounds rather than matched-attrition point identification.
- Frangakis and Rubin (2002), “Principal Stratification in Causal Inference”: the framework for interpreting the always-reporting-pair effect.
- Imai (2008), “Variance Identification and Efficiency Analysis in Randomized Experiments under the Matched-Pair Design”: paired variance analysis extended here to attrition.
- Imai and Jiang (2018), “A Sensitivity Analysis for Missing Outcomes due to Truncation by Death under the Matched-Pairs Design”: a related matched-design approach cited by the article.

Published in *Political Analysis* 30, 132–141 (2022); first published online 9 March 2021. Replication materials for the supplement: [Fukumoto (2020), Harvard Dataverse](https://doi.org/10.7910/DVN/O9WE06).
