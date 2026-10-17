---
title: "MODGIRT: Multidimensional Dynamic Scaling of Aggregate Survey Data"
type: paper
authors:
  - Elissa Berwick
  - Devin Caughey
year: 2025
doi: 10.1017/pan.2024.25
source_job_id: "34a8d310-c261-47c9-af65-da11d2e6e42d"
tags:
  - item-response-theory
  - public-opinion
  - bayesian-measurement
  - multidimensional-scaling
---

## TL;DR

MODGIRT estimates multidimensional, changing group preferences from aggregate survey counts without estimating individual ideal points. It combines an analytically marginalized probit response model with temporal smoothing and posterior rotation. Simulations recover parameters under the assumed model; British and European applications show how joint estimation can recover individual-level factor structure and reveal cross-loadings hidden by separate domain scales.

## Research Question

How can sparse surveys support multidimensional estimates of aggregate public opinion when individuals answer too few common items for individual-level scaling, and how can the resulting posterior dimensions be identified?

## Motivation

Earlier group-level IRT models estimate one latent dimension. Fitting separate models to predefined issue domains assumes the assignment of items to dimensions in advance. Pooling surveys can provide many items and respondents, making exploratory multidimensional measurement possible even when each respondent supplies little information. The inferential target is the group distribution, as in [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]].

## Contributions

- Derives multidimensional ordinal dynamic group-level item response theory (MODGIRT) from an individual probit model and multivariate normal within-group traits.
- Combines within-estimation normalization with post-estimation rotation, sign, and permutation alignment of posterior draws.
- Evaluates parameter recovery and sensitivity to dependence and unequal within-group variances, then reanalyzes British redistribution attitudes and European policy ideology.
- Provides Stan estimation and an accompanying R package, with extensions for overdispersion, differential item functioning, and group covariates.

## Method

### Aggregate Response Model

For individual $i$ in group $g$ at time $t$, assume a latent vector $\theta_i\sim\mathcal N_D(\bar\theta_{gt},\Sigma_\theta)$ and response probability $\Phi(\beta_q^\top\theta_i-\alpha_q)$. Integrating out the individual trait gives

$$
p_{gqt}=\Phi\left(\frac{\beta_q^\top\bar\theta_{gt}-\alpha_q}{\sqrt{1+\beta_q^\top\Sigma_\theta\beta_q}}\right),\qquad
s_{gqt}\sim\operatorname{Binomial}(n_{gqt},p_{gqt}).
$$

Here $\Phi$ is the standard normal CDF, $\alpha_q$ is an item threshold, and $\beta_q$ is its discrimination vector. The base model shares the within-group covariance $\Sigma_\theta$ across groups. Conditional independence supports the count likelihood. An ordinal cumulative extension handles ordered response categories (Section 2.1; its detailed derivation is referred to the supplement).

Group means follow a multivariate random walk,

$$
\bar\theta_{gt}\sim\mathcal N_D(\bar\theta_{g,t-1},\Omega).
$$

The Bayesian specification uses normal priors for item parameters and initial group means, LKJ(2) correlation priors, and half-Cauchy scale priors. Stan performs Hamiltonian Monte Carlo through cmdstanr. Population-weighted averages of group means are computed within posterior draws for national or demographic estimates.

### Identification and Interpretation

During estimation, group means are centered and whitened in a single reference period, fixing location, scale, and inter-factor correlations there. Remaining [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]] is handled with the Rotation-Sign-Permutation (RSP) algorithm of Papastamoulis and Ntzoufras (2022). Each loading draw receives a varimax rotation, then sign and permutation adjustments that align draws to a common mode. The corresponding transformations also act on group means and covariance matrices (Section 2.2).

If $Q=RSP$ denotes a draw's combined orthogonal transformation, group means represented as rows transform as $\bar\Theta=\bar\Theta^*Q$, and innovation covariance transforms as $\Omega=Q^\top\Omega^*Q$. Further target or oblique rotations can serve substantive interpretations. Varimax encourages simple loadings but does not require each item to measure only one dimension.

### Extensions

Section 5 describes a Dirichlet-multinomial response model for overdispersion; changing thresholds or group-specific threshold effects for differential item functioning; and hierarchical predictors of group means for sparse populations. These are extensions to the base specification, not separately demonstrated robustness results in the main text.

The paper links its [replication data and code](https://doi.org/10.7910/DVN/UUPSCM) and the [dbmm implementation](https://github.com/devincaughey/dbmm/tree/modgirt).

## Experiments

### Simulation Recovery

The simulations evaluate a static, binary, two-dimensional model. The baseline has 50 groups, 50 items, 2,000 individuals per group, and 100,000 responses, with each person answering one randomly chosen item. Posterior draws are RSP-aligned and then target-rotated to generating parameters. Table 1 reports:

| Parameter | Mean MSE | Correlation with truth | Mean 90% interval coverage |
| --- | ---: | ---: | ---: |
| Difficulty | 0.007 | 0.997 | 0.902 |
| Group ideal point | 0.003 | 0.999 | 0.950 |
| Discrimination | 0.013 | 0.994 | 0.940 |

Ideal-point and discrimination intervals are conservative in the baseline. With repeated responses per person, ideal-point coverage falls below 90% after more than 20 items and reaches about 85% at 40 items per person. Unequal within-group variances affect coverage for all parameter types; the paper reports anticonservative intervals when within-group standard deviations range more than 50% above or below the average. Fewer responses reduce precision without the same loss of interval coverage under correctly specified assumptions (Sections 3.1-3.2).

### British Redistribution Attitudes

The 2004 British Social Attitudes application uses 32 items and 30 groups defined by income quintile, university education, and country within Great Britain. A two-dimensional MODGIRT model recovers the distinction between redistribution from the rich and redistribution to the poor: discrimination estimates correlate above 0.9 with the individual-level factor loadings reported by Cavaille and Trump (2015) on both dimensions.

For 1986-2011, MODGIRT incorporates changing item sets and poststratifies group draws to income quintiles. It broadly reproduces increasing opposition to redistribution. It also finds that in nearly every year after 1994, the middle income quintile is more conservative on redistribution to the poor than either the highest or lowest quintile, a pattern less clear in the original additive-index analysis (Section 4.1).

### European Policy Ideology

The reanalysis of Caughey, O'Grady, and Warshaw (2019) covers 1999-2016, 27 countries, 100 items, and 1,817,270 individual responses. Groups combine country, sex, and three age categories; time is measured in biennia. About 80% of 158,922 possible group-item-period cells contain no responses.

A joint four-factor model yields a dominant social/immigration factor, a secondary economic factor, and two smaller factors concerning immigration and sexuality. Of 100 items, 86 have discriminations distinguishable from zero on at least two factors. The analysis finds little support for the prior separation of absolute and relative economic items. These results qualify the sharp domain boundaries imposed by the original separate unidimensional models; the factors require joint interpretation because cross-loadings are common (Section 4.2).

## Limitations

- The principal recovery study is static, binary, and two-dimensional; it does not establish calibration for every dynamic or ordinal application.
- Dependence from repeated responses and heterogeneous within-group variances can make credible intervals too narrow. Robustness in the reported scenarios is not unrestricted robustness to misspecification.
- Comparable estimates require overlapping bridging items across groups or periods. Temporal smoothing alone does not establish comparability; coarser periods may be necessary.
- Aggregate estimates do not identify individual-level relationships without ecological assumptions. Individual-level models may be preferable when each respondent answers enough items.
- Bayesian computation can take hours or days. The main text does not provide a systematic runtime benchmark.
- The supplied Markdown refers to supplementary derivations, detailed simulation results, Stan code, and footnotes whose bodies are absent. This summary uses the available main-text evidence.

## Related Concepts

- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: analytically integrates individual traits to target aggregate means.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: alignment makes multidimensional posterior coordinates interpretable.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: random-walk priors connect group positions across time.
- [[concepts/item-response-theory|Item Response Theory]]: item thresholds and discriminations link preferences to responses.

## Related Papers

- [[papers/dynamic-estimation-of-latent-opinion-using-a-hierarchical-group-level-irt-model|Dynamic Estimation of Latent Opinion Using a Hierarchical Group-Level IRT Model]]: Caughey and Warshaw (2015), a cited unidimensional predecessor combining aggregate measurement and temporal pooling.
- [[papers/estimating-voter-preference-distributions-from-individual-level-voting-data|Estimating Voter Preference Distributions from Individual-Level Voting Data]]: Lewis (2001), cited foundation for estimating distributions without individual ideal points.
- Papastamoulis and Ntzoufras (2022), "On the Identifiability of Bayesian Factor Analytic Models": source of the RSP algorithm used for posterior alignment.
- Cavaille and Trump (2015), "The Two Facets of Social Policy Preferences": individual-level British analysis used for validation.
- Caughey, O'Grady, and Warshaw (2019), "Policy Ideology in European Mass Publics, 1981-2016": domain-specific aggregate analysis reexamined with joint multidimensional measurement.

[[index|Library home]]
