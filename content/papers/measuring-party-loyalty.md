---
title: Measuring party loyalty
type: paper
authors:
  - Adam J. Ramey
year: 2026
venue: Political Science Research and Methods
doi: 10.1017/psrm.2025.10083
source_job_id: "da82ed07-36a6-46b0-80a6-d6c8c163f4f8"
tags:
  - legislative-behavior
  - party-loyalty
  - ideal-point-estimation
  - bayesian-measurement
---

## TL;DR

Ramey combines House roll calls with party leaders' floor speeches to estimate legislator-specific, time-varying loyalty alongside fixed ideological positions. Speech positions identify when and in which direction leaders request support. The resulting loyalty measure fits Freedom Caucus membership and the 2015 Boehner rebellion better than Party Unity or Minozzi-Volden loyalty scores, while estimated ideal points remain highly correlated with standard IRT estimates. The separation is conditional on the speech-based measurement model.

## Research Question

How can roll-call analysis distinguish agreement arising from shared preferences from loyalty to party leaders, while allowing loyalty to differ across legislators, parties, and time?

## Motivation

High party unity can coexist with rebellion against leaders: 23 of the 25 Republicans voting against Boehner in the opening example had unity scores comparable to or higher than his supporters. Unity measures conflate ideological agreement with loyalty. Approaches that designate close votes as party-influenced also require assumptions about which votes leaders care about and can obscure asymmetric party effects.

## Contributions

- Uses observed leader speeches to identify party-specific voting directions on selected roll calls.
- Extends Bayesian probit IRT with legislator-time loyalty parameters that can be positive or negative.
- Compares the measure with conventional loyalty scores and standard ideal-point estimation across the 101st-113th Congresses.
- Documents variation in loyalty by majority status and within individual legislators' careers.

## Method

The speech data, credited to Asmussen and Ramey (2018), record positions expressed by the Speaker, Majority Leader, and Minority Leader. For legislator $i$ and roll call $j$, let $s_{ij}$ equal $+1$ when the member's party leadership favors yea, $-1$ when it favors nay, and $0$ when no position is expressed. Equation 8 specifies

$$
\Pr(y_{ij}=1)=\Phi\left(\beta_j x_i-\alpha_j+\delta_{i,t[j]}s_{ij}\right).
$$

Here $x_i$ is a time-invariant ideological position, $\beta_j$ and $\alpha_j$ are vote discrimination and difficulty parameters, and $\delta_{i,t[j]}$ is loyalty for the member and period. Positive loyalty shifts voting toward the leader's position; negative loyalty represents systematic opposition conditional on ideology. Equal-magnitude yea and nay signals have opposite effects on the probit index.

The speeches function as fixed discrimination parameters for an additional loyalty dimension. Variation in whether either party speaks and in its desired direction supplies information beyond party membership alone. Republican and Democratic leader speeches cover 4.7% and 5.9% of roll calls respectively (Table 1). The statistical estimator is developed in an online appendix absent from the supplied Markdown.

For comparison with percentage scales, the paper reports $L_{it}=100\Phi(\delta_{it})$. At ideological indifference between the voting alternatives, this is the modeled probability, in percent, of supporting the leader's stated position. A score of 50 is neutral; it is not the member's observed percentage of party-line votes. Classification as a loyalist or rebel depends on uncertainty relative to 50.

## Experiments

### Rebellion and Freedom Caucus Membership

Table 2 compares logistic regressions with ideology and one loyalty measure, using 203 observations per model. Lower AIC indicates better penalized fit.

| Outcome | IRT loyalty AIC | Party Unity AIC | Minozzi-Volden AIC | IRT predicted count | Observed count |
| --- | --- | --- | --- | --- | --- |
| Joining the Freedom Caucus | 106.57 | 184.49 | 183.37 | 31 | 34 |
| Rebelling against Boehner | 90.95 | 137.98 | 125.06 | 9 | 22 |

The IRT loyalty coefficient is -0.11 (SE 0.02) for both outcomes. Party Unity predicts 0 caucus joiners and 2 Boehner rebels; Minozzi-Volden predicts 3 and 4. The IRT model improves fit and predicted counts but still substantially underpredicts Boehner rebellion. These are reported fitted-model comparisons, without a held-out evaluation described in the supplied text. The opening example's 25 rebels and Table 2's 22 belong to different reported counts; the supplied text does not explain the sample difference.

### Roll-Call Fit and Loyalty Patterns

Relative to a standard IRT model fitted by the Imai et al. (2016) EM approach, the paper reports higher log likelihood, classification accuracy, geometric mean probability, and aggregate proportion reduction in error, with lower AIC. Aggregate numerical values are not supplied in the main text. Ideal points correlate 0.99 overall, 0.978 among Democrats, and 0.967 among Republicans across models.

Table 3 illustrates classification gains on selected votes: 24 additional correct classifications for the 1990 budget reconciliation vote, 28 for GATT, 30 for the Homeland Security Act, and 29 for Export-Import Bank reauthorization. These examples show where the added loyalty term improves fitted voting behavior, rather than estimating how many votes leaders causally changed.

The pooled IRT loyalty scores are reported as uncorrelated with ideological extremism, unlike the strong relationships in the comparison measures. Conditional patterns remain: majority-party loyalty follows an inverted U over ideology, with members near their party mean more loyal than moderates or extremists. Both parties have higher average loyalty in the majority, especially Republicans; individual trajectories can depart from this aggregate pattern.

A placebo substitutes leader voting positions on randomly sampled roll calls for actual speeches. The paper reports distinct results from the speech-based estimates, but the detailed design and numerical findings are deferred to the missing appendix.

## Limitations

- Speeches reveal a selective subset of leadership priorities. Agenda control, rules, private persuasion, and other party influence can operate without a floor speech; the author explicitly acknowledges this in Section 2.
- Ideology is fixed over time, loyalty varies over time, and speech directions impose fixed loadings of -1, 0, or +1. Interpretation depends on these modeling restrictions and the information in sparse speech observations.
- The observational fit comparisons support measurement usefulness but do not independently identify a causal effect of giving a speech. Negative loyalty is consistent with strategic dissent; it does not establish individual motives.
- The supplied Markdown lacks the online appendix and footnote bodies. Priors, temporal specification, computation, convergence checks, and placebo details cannot be reconstructed from this source alone.

## Related Concepts

- [[concepts/party-loyalty-measurement|Party Loyalty Measurement]]: separates leadership responsiveness from agreement driven by preferences.
- [[concepts/item-response-theory|Item Response Theory]]: the latent actor-item framework extended by the speech term.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: an alternative representation of party dependence through group-specific item thresholds.

## Related Papers

- Asmussen and Ramey (2018), *When loyalty is tested: do party leaders use committee assignments as rewards?*: source of the leadership-speech data.
- Clinton, Jackman, and Rivers (2004), *The statistical analysis of roll call data*: Bayesian ideal-point framework underlying the estimator.
- Minozzi and Volden (2013), *Who heeds the call of the party in Congress?*: comparison approach that iteratively classifies votes as party-influenced or party-free.
- [[papers/understanding-complex-legislative-and-judicial-behaviour-via-hierarchical-ideal-point-estimation|Understanding complex legislative and judicial behaviour via hierarchical ideal point estimation]]: related library work modeling party dependence using allysets, rather than leader-speech signals.

Source identifiers: [article DOI](https://doi.org/10.1017/psrm.2025.10083); [replication material](https://doi.org/10.7910/DVN/JXVSP4). The year follows the source's final citation line.

[[index|Library home]]
