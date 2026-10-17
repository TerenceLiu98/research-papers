---
title: Dynamic Estimation of Latent Opinion Using a Hierarchical Group-Level IRT Model
type: paper
authors:
  - Devin Caughey
  - Christopher Warshaw
year: 2015
venue: Political Analysis
volume: 23
issue: 2
pages: "197-211"
doi: "10.1093/pan/mpu021"
jstor: "24572968"
url: https://www.jstor.org/stable/24572968
source_job_id: "96884db1-16ad-46e7-b1f4-504ba12f018e"
source_version: "Original manuscript, 2014-08-03"
tags:
  - item-response-theory
  - public-opinion
  - political-methodology
  - bayesian-measurement
---

## TL;DR

Caughey and Warshaw estimate changing group-level opinion from surveys in which each respondent may answer only one relevant question. Their Bayesian model combines a marginalized IRT response model, hierarchical pooling across demographic and geographic groups, temporal smoothing, and population weighting. Applied to U.S. state policy liberalism in 1972-2012, temporal pooling modestly improves held-out response prediction relative to estimating hierarchical coefficients separately each year, though it can obscure abrupt opinion changes.

## Research Question

How can sparse, heterogeneous historical surveys support comparable annual estimates of latent opinion within states and demographic groups when individual-level scaling is infeasible?

## Motivation

Historical surveys often contain too few policy items per person for individual ideal-point estimation, while national samples leave small or empty state-demographic cells. Ideological self-identification and elected officials' votes are imperfect substitutes for citizens' policy preferences. [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]] shifts the target from individual scores to population distributions, making more of these surveys usable.

## Contributions

- Integrates group-level [[concepts/item-response-theory|Item Response Theory]] with hierarchical and temporal pooling in one Bayesian measurement framework.
- Adjusts item-group counts for survey weights and repeated answers by the same respondent.
- Poststratifies group means to geographic populations while propagating posterior uncertainty.
- Estimates annual state policy liberalism and evaluates temporal pooling through repeated held-out prediction and construct comparisons.

## Method

This summary follows the August 3, 2014 manuscript supplied by MIT's repository, whose cover identifies the 2015 journal publication. Section and appendix references below refer to that manuscript.

The individual normal-ogive response model is $\Pr(y_{ij}=1)=\Phi((\theta_i-\kappa_j)/\sigma_j)$, with item threshold $\kappa_j$ and item error scale $\sigma_j$. Assuming normally distributed individual traits within each group gives the marginalized response model (Sections 4.1 and 4.5; Appendix A):

$$
s^*_{gjt}\sim\operatorname{Binomial}(n^*_{gjt},p_{gjt}),\qquad
p_{gjt}=\Phi\left(\frac{\bar\theta_{gt}-\kappa_j}{\sqrt{\sigma_{\theta,t}^2+\sigma_j^2}}\right).
$$

Here $\bar\theta_{gt}$ is group $g$'s mean in year $t$, and $\sigma_{\theta,t}$ is the within-group standard deviation, shared across groups in a given year. This differs from models that estimate a separate dispersion for every group. The starred counts are adjusted summaries rather than raw response counts.

Group means follow a hierarchical model,

$$
\bar\theta_{gt}\sim\mathcal N(\xi_t+x_{g,t}^{\mathsf T}\gamma_t,\sigma_{\bar\theta,t}^2).
$$

The intercept and demographic coefficients evolve through random-walk priors, for example $\gamma_{pt}\sim\mathcal N(\gamma_{p,t-1},\sigma_\gamma^2)$. Geographic effects can also depend on geographic covariates and a lag coefficient. Standard deviations evolve on a log scale. Thus temporal smoothing acts on hierarchical parameters; group means are re-estimated each period. Sparse and empty groups borrow information through the hierarchy.

Survey-weight variation yields a group-year design effect $d_{gt}=1+[\operatorname{sd}(w)/\operatorname{ave}(w)]^2$. If respondent $i$ answers $r_i$ questions, the adjusted sample size is $n^*_{gjt}=\lceil\sum_i1/(r_i d_{gt})\rceil$. Responses are averaged using weights $w_i/r_i$, and adjusted successes are rounded to the nearest integer. This reduces the influence of repeated answers and accounts for unequal weights (Section 4.4).

All items are coded in the same substantive direction with positive discrimination. Rescaling difficulties to mean zero and discriminations to product one identifies location and scale. Item thresholds and error scales are held constant across time to put annual estimates on a common metric. The authors estimate the model in Stan through R. For every posterior draw, demographic group means are weighted by population shares to obtain state means and their uncertainty (Sections 4.6-4.7).

### Proposed Extensions

Section 6 sketches random-walk item difficulties, group-specific within-group variances, and multiple latent dimensions. Item drift requires restrictions on its innovation scale relative to opinion change and complicates temporal comparisons. A lognormal variance-function regression could model differences in group heterogeneity. Multidimensionality increases identification and computational demands. These are proposed extensions, not demonstrated improvements in the reported validation. Appendix D supplies Stan code, including priors and options for changing difficulties and separate-period estimation.

## Experiments

### State Policy Liberalism

The application uses 47 domestic policy questions from 350 surveys covering more than 570,000 Americans in 1972-2012. Included questions concern specific policy outcomes for which the liberal response implies greater government spending or activity. This operational definition differs from both symbolic ideological identification and policy mood defined relative to the current policy status quo.

Groups combine states and demographic categories such as race and gender. State evangelical/Mormon population share informs initial state effects; subsequent periods rely on lagged state effects. Census population shares provide poststratification weights. Estimated state rankings are broadly stable, with some Southern states becoming relatively more conservative and New England states relatively more liberal. The maps are standardized separately by year and therefore depict relative state positions.

### Held-Out Prediction

In each of ten replications, 25% of respondents in each group-year form the training sample and the remaining 75% supply validation responses. The pooled model smooths hierarchical parameters across years; the separated model estimates those parameters independently by year. Table 1 reports these mean errors in percentage points:

| Metric | Separated | Pooled |
| --- | ---: | ---: |
| Signed bias | 0.35 | 0.06 |
| MAE | 13.40 | 13.11 |
| RMSE | 18.74 | 18.39 |

Pooling lowers MAE and RMSE in every replication and lowers absolute bias in nine of ten. The table's mean improvement in absolute bias is 0.19 percentage points; that quantity differs from subtracting the two mean signed biases. These results favor pooling for this application, rather than demonstrating that smoothing always improves latent-trait recovery.

### Construct Comparisons

State policy liberalism is strongly associated with Democratic presidential vote share, with the association strengthening over time. The national series correlates 0.67 with Stimson's policy mood, despite differences in construct definition and limited data overlap. Both series are most liberal around 1990 and most conservative around 1980, with a divergence in the early 2000s. These comparisons support interpretation of the estimates but do not provide direct observations of the latent trait.

### Historical Applications

Appendix B estimates New Deal support from 453 question series and 644,370 respondents in quota-sampled Gallup polls fielded from November 1936 through December 1952. Three-quarters of the questions appear in only one year. Estimates show an almost half-standard-deviation conservative shift between 1940 and 1942 and a reversal of the South's relative position between 1937 and 1943. State opinion also covaries with Senate delegation voting records. These aggregates explicitly exclude Black Southerners through population weights, although their responses enter estimation; the authors cite disenfranchisement and severe undersampling. The findings therefore concern that restricted population, not all U.S. adults.

Appendix C uses 72 polls from 1963-2010, approximately 166,000 respondents, and four question series to estimate confidence in the Supreme Court; its state maps cover 1965-2010. Ordinal answers are converted into threshold indicators, with one indicator sampled per respondent. Estimated regional and racial differences change substantially over time. The authors report that their disapproval measure predicts court-curbing sponsorship in both chambers, whereas Clark's comparison measure predicts House sponsorship but not Senate sponsorship. This is construct-validation evidence, not an identified causal effect of opinion on legislation.

## Limitations

- Temporal smoothing can attenuate rapid state or demographic shifts, especially when observations are sparse. The authors suggest the separated model may suit questions about abrupt change better.
- The response model assumes a single latent dimension, normal within-group traits, and common item response functions across groups and time. Temporal comparability depends on measurement stability, not simply repeated wording.
- Empty-cell estimates depend on the hierarchy. Producing an estimate for an unsampled group does not independently validate its value or solve selective nonresponse.
- Held-out response prediction and correlations with related constructs offer different, incomplete evidence about latent opinion. Presidential votes can change for reasons other than policy preferences.
- Quota-sample weighting in the New Deal application addresses observed population discrepancies but does not establish representativeness on unobserved characteristics. Its exclusion of Black Southerners materially restricts the target population.
- The supplied manuscript includes derivations, historical applications, and Stan code, but many footnote bodies are absent and some equations or code fragments have extraction artifacts. The code is documentary evidence here, not a verified executable implementation. The paper claims computational advantages without a systematic runtime benchmark.

## Related Concepts

- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: inference about population traits with few responses per individual.
- [[concepts/item-response-theory|Item Response Theory]]: the response model underlying the group-level likelihood.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: related temporal latent-variable modeling; here smoothing primarily acts on hierarchical coefficients.

## Related Papers

- [[papers/estimating-voter-preference-distributions-from-individual-level-voting-data|Estimating Voter Preference Distributions from Individual-Level Voting Data]]: Lewis (2001), a cited foundation for estimating group distributions by marginalizing individual traits; the present paper adds hierarchical and temporal pooling.
- Mislevy (1983), "Item Response Models for Grouped Data": cited derivation of the group-level normal-ogive representation.
- Park, Gelman, and Bafumi (2004), "Bayesian Multilevel Estimation with Poststratification: State-Level Estimates from National Polls": cited basis for geographic aggregation and pooling.
- McGann (2014), "Estimating the Political Center from Aggregate Data: An Item Response Theory Alternative to the Stimson Dyad Ratios Algorithm": cited national-level group IRT comparison.

[[index|Library home]]
