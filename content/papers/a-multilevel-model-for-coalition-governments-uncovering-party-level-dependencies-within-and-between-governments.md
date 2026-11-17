---
title: "A Multilevel Model for Coalition Governments: Uncovering Party-Level Dependencies Within and Between Governments"
type: paper
authors:
  - Benjamin Rosche
year: 2026
journal: Political Analysis
doi: 10.1017/pan.2026.10039
tags:
  - coalition-politics
  - multilevel-modeling
  - bayesian-inference
---

## TL;DR

Rosche extends multiple-membership models to estimate how recurring parties jointly shape coalition outcomes. Shared party random effects capture dependence across governments, while covariate-dependent weights model unequal contributions within coalitions. Simulations expose undercoverage from ignoring this structure; an application associates member-dependent party financing with shorter government survival.

## Research Question

How can party-level explanations of government outcomes account simultaneously for recurring parties across governments and interdependent contributions within each coalition?

## Motivation

Governments nest within countries but belong to several parties, each of which can participate repeatedly. Aggregating party attributes in advance imposes an aggregation rule and leaves residual party dependence untreated. Duplicating a government outcome across its parties creates observations without new outcome realizations and can distort both coefficients and uncertainty.

## Contributions

- Represents shared-party dependence using [[concepts/multiple-membership-multilevel-models|Multiple-Membership Multilevel Models]].
- Aggregates systematic party contributions and random effects jointly, with estimable aggregation weights.
- Separates structural coefficients from coefficients describing how party attributes become government-level predictors.
- Provides simulation evidence and a Bayesian Weibull survival application, implemented through the accompanying R package `bml` and JAGS.

## Method

The government outcome combines government and country components with the party contribution

$$
\theta_i^{(p)}=\sum_{k\in p[i]}w_{ik}\left(\beta^{(p)\top}x_{ik}^{(p)}+u_k^{(p)}\right).
$$

The same party random effect recurs in every government that party joins. Conditional on weights, its contribution to covariance between governments is $\sigma_p^2\sum_k w_{ik}w_{i'k}$, which vanishes when they share no parties.

The proposed weight function uses a modified logistic transformation centered at $1/n_i$ for a zero predictor. Weights are then normalized within governments when a weighted mean is intended. Weight covariates must vary across coalition members. Structural coefficients describe the outcome association; weight coefficients describe aggregation, rather than an ordinary interaction modifying the structural coefficient. Alternative specifications can emphasize extreme members or relax normalization to investigate sums.

The application uses a Weibull accelerated failure time model with country and party random effects. Bayesian estimation uses three JAGS chains of 10,000 iterations, with 5,000 burn-in iterations and no thinning. The paper reports convergence and prior robustness checks in supplementary material.

## Experiments

### Simulation

The main design retains the membership structure of 312 parties, 628 governments, and 29 countries. It generates 1,000 datasets per condition, varying party random-effect standard deviation across 0, 0.1, 1, 2, 4, and 8. Comparators use aggregation or disaggregation with conventional, heteroskedasticity-consistent, or country-clustered standard errors.

For aggregated Gaussian outcomes, single-level coefficients are unbiased but less efficient. Nominal 95% coverage falls to about 40% for party/country covariates and 60% for government covariates with conventional or heteroskedasticity-consistent errors; country clustering improves coverage to about 90%. In reported supplementary scenarios, cluster-robust bias disappears with at least 200 countries. Disaggregation produces coefficient bias and near-zero party-effect coverage. These are design-specific findings, not a general impossibility result for cluster-robust inference.

### Coalition survival

The application combines WKB government histories, Comparative Manifestos Project positions, and Political Party Database financing measures: 628 coalition governments, 312 parties, 29 countries, 1944–2014. Intraparty cohesion is proxied by ideological reversals relative to continuous directional changes.

| Model | Member-financing coefficient | 95% credible interval | DIC |
| --- | --- | --- | --- |
| Pre-aggregated single-level specification | −0.25 | [−0.39, −0.11] | 3844 |
| Multiple membership, equal weights | −0.37 | [−0.62, −0.13] | 3878 |
| Multiple membership, estimated weights | −0.37 | [−0.60, −0.12] | 3869 |

Negative coefficients indicate shorter survival in the accelerated failure time parameterization. The estimated cohesion weight coefficient is −0.93, with 95% credible interval [−1.92, −0.12], assigning greater relative influence to less cohesive parties. The reported average linear approximation associates ten percentage points more member funding with about 154 fewer days of coalition duration. Estimated weights improve DIC relative to equal weights, although the pre-aggregated specification has the lowest DIC overall.

The intercept-only variance decomposition assigns 13.8% to aggregated party differences, 12.4% to country differences, and 73.8% to government-level variation. This is a model-based variance partition, not a causal ranking of institutions and parties.

## Limitations

Complex weight functions require enough data and careful identification. Incorrect random-effect structure, covariate dependence, or omitted confounders can bias estimates. Weight-measurement robustness is demonstrated in specified simulations without omitted-variable bias, not universally. Observational financing associations and a proxy for cohesion do not independently establish causal mechanisms.

The supplied Markdown contains inconsistencies: Figure 6’s caption names a different true weight coefficient than its surrounding text, and one prose DIC comparison mislabels a model. The table above follows Table 2. Supplementary materials and replication code were not evaluated.

## Related Concepts

- [[concepts/multiple-membership-multilevel-models|Multiple-Membership Multilevel Models]]: shared random effects and weighted membership represent the nonhierarchical party–government relationship.
- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: relevant to the paper’s discussion of covariate–random-effect dependence and within-between specifications.

## Related Papers

- [[papers/refining-gamson-the-isometric-log-ratio-transformation-and-portfolio-proportionality-in-multiparty-governments|Refining Gamson]]: complementary treatment of coalition-data dependence through compositional portfolio allocations; the present paper focuses on recurring membership and government-level outcomes.
- Albarello (2024), “Coalition Policy in Multiparty Governments: Whose Preferences Prevail”: discussed as a related aggregation measurement model without party random effects.
- Goldstein (2011), *Multilevel Statistical Models*: foundational multiple-membership framework extended here.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/OB2GXR). Summary based on the supplied parsed article.
