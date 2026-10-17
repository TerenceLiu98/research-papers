---
title: Understanding complex legislative and judicial behaviour via hierarchical ideal point estimation
type: paper
authors:
  - Ying Lu
  - Xiaohui Wang
year: 2011
venue: "Applied Statistics, 60(1), 93-107"
source_job_id: "d624429f-5ae8-497f-889d-6a6ba249c9da"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - judicial-behavior
  - bayesian-measurement
---

## TL;DR

Lu and Wang extend probit ideal-point estimation with actor groups (allysets) and item groups (votesets), allowing party-specific item thresholds and correlated issue-specific preferences. Simulations show improving parameter recovery with larger samples. Applications find better fit after accounting for party membership in the 109th U.S. House and favor separating civil liberties from economic and political cases in Supreme Court voting.

## Research Question

How can ideal-point models represent dependence among political actors and among their decisions on related issues, while retaining interpretable ideological positions?

## Motivation

A single ideological position can confound preferences with party coordination and overlook systematic issue differences. The proposed hierarchy uses observed actor and item characteristics to represent these dependencies directly, rather than treating every departure from a common voting pattern as independent error.

## Contributions

- Introduces a unified allyset/voteset framework for dependence across actors and items.
- Estimates correlations among issue-specific ideal points and among group-specific item thresholds within a Bayesian model.
- Demonstrates parameter recovery and applies the framework to legislative party patterns and judicial issue differences.
- Describes extensions for independent actors, deviations from a general ideal point, and temporary coalitions; identifies the companion IPE R package.

## Method

For actor $i$, item $j$, voteset $k=d(j)$, and allyset $l=p(i)$, the model is

$$
\Pr(y_{ij}=1)=\Phi(a_j\theta_{ik}-b_{lj}).
$$

Here $\theta_{ik}$ is an issue-specific ideal point, $b_{lj}$ is the allyset-specific item threshold, and $a_j$ is a signed discrimination parameter. Larger thresholds lower the probability of a yea vote; discrimination can be positive or negative. One voteset and one allyset recover the conventional model.

The vectors of actor positions and item thresholds have multivariate Normal distributions, $\boldsymbol\theta_i\sim N(0,\Sigma_K)$ and $\mathbf b_j\sim N(\boldsymbol\mu^b,\Psi_L)$. Discriminations also have a Normal hierarchical distribution. The covariance matrices encode dependence across issue areas and actor groups. Identification uses centered ideal points, a scale-setting prior, and ordering constraints on selected actors within each voteset (Section 4.1).

Data augmentation and Gibbs sampling use closed-form conditional posteriors. Model assessment combines posterior predictive checks, latent-residual diagnostics, deviance information criterion (DIC), and mean absolute predictive error (MAPE). Each empirical application uses four chains, with 10,000 burn-in and 10,000 subsequent iterations per chain, retaining every tenth draw. Missing votes are treated as missing at random, primarily because actors serve for finite terms.

## Experiments

### Simulated Recovery

Three settings contain 100, 200, or 400 actors and the same number of items, with four equally sized votesets and two equally sized allysets. Each setting has 100 simulated datasets. Table 3 reports that ideal-point mean-square errors fall from 0.122-0.130 at size 100 to 0.031-0.032 at size 400. Discrimination MSE falls from 0.142 to 0.034. Small-sample voteset variances and correlations shrink toward the prior; recovery improves with sample size (Table 2).

### Party Dependence in the House

The 109th House application uses 1,038 non-unanimous votes from 440 representatives: 203 Democrats and 237 Republicans. Two party allysets are fitted with one ideological dimension.

| Model | DIC | MAPE |
| --- | --- | --- |
| Null | 145248 | 0.167 |
| Party allysets | 140100.5 | 0.159 |

Table 4 favors the party model on both measures. Estimated allyset variances are 6.7 (posterior SD 0.78) for Democrats and 2.8 (0.32) for Republicans. The authors interpret the greater modeled within-party dependence among minority Democrats as stronger party influence. Adjusting for allysets also introduces some overlap between the parties' estimated ideological distributions, which are completely separated in the null model. These are model-based interpretations of observed voting, not experimentally identified party effects.

### Issue Dependence in the Supreme Court

Section 6.2 describes 29 justices and 3,069 non-unanimous cases over 1953-2003. Among five candidate voteset specifications, the text identifies the best model as combining economic activities and political institutions while keeping civil liberties separate. Its Table 5 DIC is 20988.9 and MAPE is 0.2297.

Estimated ideal-point variance is 1.17 for civil liberties and 0.36 for the combined economic/political voteset. Rank orders correlate at 0.8, but some justices change position substantially across domains. For example, Reed and Minton are described as conservative on civil liberties and moderate on economic/political matters.

## Limitations

- Actor and item groupings are substantively specified. Fit comparisons assess these candidate structures, not an unrestricted discovery of ideological dimensions or a causal identification of party pressure.
- Missing-at-random assumptions and identification constraints condition the interpretation. The small-sample simulation results show prior shrinkage in voteset covariance estimates.
- The reported empirical predictive errors are not presented as a held-out evaluation. Detailed posterior checks are referred to an external appendix absent from the supplied Markdown; coalition/tactset simulations are explicitly not shown.
- Source inconsistencies affect the Court sample description: the introduction gives 1919-1996, whereas Section 6.2 gives 1953-2003. The listed issue counts (543, 1,180, and 325) sum to 2,048, not 3,069; the text does not reconcile the difference. Table 5 loses its grouping boxes in Markdown, so the preferred grouping above follows the accompanying prose.
- The simulation prose gives an allyset correlation of positive 0.5, but its covariance matrix and Table 2 specify negative 0.5. Several equations and reference entries are damaged in the supplied text; no missing identifier or numerical result is inferred from them.

## Related Concepts

- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: allysets and votesets represent two sources of dependence.
- [[concepts/item-response-theory|Item Response Theory]]: the respondent-item measurement framework underlying the probit voting model.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: issue-specific orderings and their covariance qualify a single-axis interpretation.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: a related formulation using offsets from a general position.

## Related Papers

- Clinton, Jackman, and Rivers (2004), *The statistical analysis of roll call data*: cited baseline for conventional ideal-point estimation.
- Bradlow, Wainer, and Wang (1999), *A Bayesian random effects model for testlets*: cited connection to the paper's general-position-plus-voteset-deviation extension.
- [[papers/the-issue-adjusted-ideal-point-model|The Issue-Adjusted Ideal Point Model]]: a library comparison using bill-topic mixtures and ideological offsets; it is not cited in this source.
- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology]]: a library comparison showing how party separation can obscure preference dimensionality, distinct from this paper's explicit group-dependent thresholds; it is not cited in this source.

[[index|Library home]]
