---
title: Estimating Voter Preference Distributions from Individual-Level Voting Data
type: paper
authors:
  - Jeffrey B. Lewis
year: 2001
venue: Political Analysis
volume: 9
issue: 3
pages: "275-297"
jstor: "25791649"
url: https://www.jstor.org/stable/25791649
source_job_id: "bf3a1718-fa80-492d-bff2-bdc732d4456d"
tags:
  - ideal-point-estimation
  - item-response-theory
  - political-methodology
  - voting-behavior
---

## TL;DR

Lewis estimates the means and variances of predetermined groups' voter preferences by integrating individual ideal points out of a one-dimensional probit model. Under the model assumptions, group parameters can be consistently estimated as the number of voters increases even with a fixed, small number of items. Simulations favor roughly six informative items in the tested setting. Applications locate Perot supporters toward the center-right in 1992 Los Angeles County and show substantially greater partisan separation on abortion in Congress than in the public.

## Research Question

How can researchers infer differences in the location and dispersion of voter preferences when each person supplies only a few binary votes or survey answers?

## Motivation

Estimating a separate ideal point for every voter introduces additional parameters as the sample grows, while each position remains informed by very few choices. Many substantive questions instead concern group medians, heterogeneity, or overlap. [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]] changes the estimation target to those population features, drawing on marginal likelihood methods from [[concepts/item-response-theory|Item Response Theory]].

## Contributions

- A random-effects spatial voting model with both means and variances varying across predetermined groups.
- Marginal maximum likelihood estimation using response-pattern counts, Gauss-Hermite quadrature, and an EM algorithm.
- Monte Carlo evidence on how the number of items affects group estimates and standard errors.
- Applications to individual ballots, congressional roll calls, and survey responses that distinguish group locations from within-group dispersion.

## Method

Quadratic spatial utilities with independent normal shocks imply the response model

$$
\Pr(V_{lk}=1\mid\theta_l)=\Phi(\alpha_k+\beta_k\theta_l),
\qquad \theta_l\mid g(l)=g\sim\mathcal N(\mu_g,\sigma_g^2).
$$

Here $\sigma_g$ denotes a standard deviation, $\alpha_k$ is an item intercept, and $\beta_k$ describes its relationship to the latent dimension. Responses are conditionally independent given the ideal point. The cutpoint is $-\alpha_k/\beta_k$ for nonzero slopes. The likelihood integrates over each voter's unobserved position:

$$
L=\prod_l\int\prod_k
\Phi(\alpha_k+\beta_k\theta)^{V_{lk}}
[1-\Phi(\alpha_k+\beta_k\theta)]^{1-V_{lk}}
\phi(\theta;\mu_{g(l)},\sigma_{g(l)}^2)\,d\theta.
$$

Voters with identical response patterns and group membership contribute the same likelihood term, so counting such patterns reduces computation without changing the objective. Gauss-Hermite quadrature approximates integration; EM supplies the parameter estimates. Standard errors come from gradient- or Hessian-based calculations on the full marginal log likelihood, rather than directly from EM updates (Section 3.2).

Setting one group's mean to zero and standard deviation to one fixes location and scale; substantive information fixes orientation. The consistency claim holds with a fixed number of groups as voter counts grow, under identification and model assumptions. It does not imply consistent individual ideal points from a fixed number of responses. Section 3.3 argues that more than one item is needed; this item-count argument should not be treated as a guarantee for uninformative or degenerate item configurations.

## Experiments

### Monte Carlo

The main experiment uses 2,500 voters divided equally into five groups, 2-12 items, and 500 trials per item count (Section 4). More items improve group mean and dispersion estimates particularly strongly; gains begin to flatten around 6-7 items. With only two items, estimated group-parameter standard errors average less than 80% of observed sampling uncertainty. With three or more, the reported average standard errors are within 10% of that uncertainty. Extreme groups and lopsided items remain harder to estimate.

The paper also reports reasonable estimates with 200 observations per group and five quadrature points, plus robustness to mild nonnormality and conditional-independence violations. Detailed ancillary evidence is referred to a separate technical appendix, not included in the supplied Markdown.

### Los Angeles County Ballots, 1992

Twelve propositions measure preferences in 20 groups defined by presidential vote and voting patterns in other federal races. The application covers roughly 2.8 million ballots. The scale puts Clinton-voting straight Democrats at mean -1 and Bush-voting straight Republicans at +1.

| Presidential supporters | Estimated mean | Estimated standard deviation |
| --- | --- | --- |
| Clinton | -0.74 | 1.23 |
| Bush | 0.77 | 1.13 |
| Perot | 0.38 | 1.03 |

Table 6 places Perot supporters closer to Bush supporters on average and shows less dispersion than either major candidate's supporters. Ticket splitters are intermediate between straight-ticket Democrats and Republicans. These are descriptive preference estimates, not causal estimates of whose votes Perot took. Table 4 reports 2,752,683 voters, while Table 5 reports 2,795,083; the supplied text does not explicitly reconcile the counts.

### Partisan Differences on Abortion

For the 93rd-106th U.S. Houses (1973-2000), each Congress supplies 4-21 abortion roll calls. Democrats' mean and standard deviation are fixed at 0 and 1 separately in each Congress. Absolute positions therefore cannot be compared across Congresses. Relative overlap can: Table 7 places the median Democrat at the Republican distribution's 28th percentile in the 95th Congress and approximately its first percentile in the 103rd-106th Congresses.

The public analysis uses six repeated General Social Survey items from 1973-1998. Holding item parameters constant across surveys creates a common scale, anchored to Democrats in 1973-1974. The median Democrat stays between the 32nd and 60th percentiles of the Republican distribution across periods (Table 9), indicating much more overlap than in recent Congresses. Increasing within-party dispersion also complicates a simple partisan-sorting account. The findings support congressional polarization more strongly than an equally extensive mass realignment.

## Limitations

- The model assumes one dimension, normal preferences within groups, common item parameters across groups, and conditional independence. Reported robustness to mild violations does not establish validity under arbitrary misspecification.
- Six items is a simulation-specific practical result. Item informativeness, extreme groups, and sample size matter; mathematical identification does not ensure precise estimation.
- The Los Angeles application lacks demographic covariates and concerns one county. Fine-grained within-county estimates do not establish national representativeness.
- Congressional temporal comparisons concern relative party separation, not identified absolute ideological movement. Public temporal comparisons depend on stable item parameters, not merely repeated question wording.
- The supplied text contains internal inconsistencies: Table 6 calls its dispersion entries variances although the entries are labeled $\sigma$ and discussed as standard deviations; Table 7 reverses the cutpoint ratio in its header; Table 9's note claims period-specific Democratic normalization although the prose and varying entries specify a 1973-1974 anchor. The summary follows the model and accompanying substantive discussion.
- Some footnotes and the referenced technical appendix are absent from the supplied Markdown, limiting verification of implementation and ancillary robustness details.

## Related Concepts

- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: targets group location, dispersion, and overlap with few responses per person.
- [[concepts/item-response-theory|Item Response Theory]]: the latent respondent-item measurement framework.
- [[concepts/heteroskedastic-ideal-point-estimation|Heteroskedastic Ideal Point Estimation]]: a distinct source of variance, representing individual voting unpredictability rather than dispersion of preferences within groups.

## Related Papers

- Bock and Aitkin (1981), "Marginal Maximum Likelihood Estimation of Item Parameters: Application of the EM Algorithm": the cited computational foundation.
- Bailey (2001), "Ideal Point Estimation with a Small Number of Votes": the cited covariate-based random-effects comparison; Lewis additionally models group dispersion differences.
- Adams (1997), "Abortion: Evidence of an Issue Evolution": the substantive analysis revisited using full group distributions.
- [[papers/uncertainty-aware-ideal-point-estimation-via-variational-em|Uncertainty-Aware Ideal Point Estimation via Variational EM]]: a library comparison, not a citation in Lewis; integrates random bill parameters while retaining fixed individual positions, reversing which side of the voting matrix is marginalized.

[[index|Library home]]
