---
title: Estimators for Topic-Sampling Designs
type: paper
authors:
  - Scott Clifford
  - Carlisle Rainey
year: 2024
tags:
  - experimental-design
  - causal-inference
  - hierarchical-modeling
---

## TL;DR

The paper develops a design-based estimator of the average treatment effect across sampled experimental topics and a hierarchical model of between-topic heterogeneity. Resampling a large democracy-intervention study shows that pooling reduces topic-specific RMSE by about 20% on average, while introducing bias and sometimes worsening estimates for unusual topics.

## Research Question

How can experiments estimate effects that generalize across policy issues, stimuli, interventions, or other design details, and characterize how those effects vary across topics?

## Motivation

Randomizing respondents within one experimental topic identifies an effect for that topic. It does not establish that the effect holds across other implementations of the theoretical claim. [[concepts/topic-sampling|Topic Sampling]] makes that additional dimension of generalization part of the design.

## Contributions

- A nonparametric estimator and uncertainty calculation for the typical effect under random topic sampling and randomized assignment.
- Extensions for multiple treatments sharing one control, multiple controls sharing one treatment, and distinct sets of treatment and control topics.
- A hierarchical framework estimating heterogeneity, individual topic effects, and associations with topic-level predictors.
- An empirical resampling evaluation comparing nonparametric estimation, REML, and full posterior simulation.

## Method

For the baseline design, each topic has treatment and control observations. Estimate its effect by a difference in means, then weight topics equally:

$$
\widehat{\bar\delta}=\frac{1}{J}\sum_{j=1}^J\hat\delta_j,
\qquad
\widehat{\mathrm{Var}}(\widehat{\bar\delta})=\frac{s^2(\hat\delta_1,\ldots,\hat\delta_J)}{J}.
$$

The paper uses a t interval with J−1 degrees of freedom. Its design-based justification includes random sampling of topics and random assignment of respondents to topics and conditions; uncertainty includes topic selection, not only respondent allocation (§2).

When topics occur only within treatment or control arms, the estimand becomes a difference between average potential outcomes across the respective topic populations. For many treatments sharing a control, the variance combines the variance of treatment-topic means divided by their count with the respondent-level variance of the common control mean. The extensions use Welch–Satterthwaite degrees of freedom (§3).

The baseline hierarchical model is a normal outcome regression with correlated topic-specific intercepts and treatment slopes. Topic effects are modeled as exchangeable, optionally conditional on topic-level predictors. Without predictors, the slope mean and SD summarize typical effects and heterogeneity. With predictors, the mean is conditional and the SD describes residual heterogeneity around that conditional mean. Repeated observations can add respondent-level varying parameters (§4).

The authors prefer full posterior simulation because it propagates variance-component uncertainty into topic estimates and avoids the zero heterogeneity estimates that REML sometimes produces.

## Experiments

The Strengthening Democracy Challenge supplies 32,059 individuals and 25 interventions. The evaluation treats full-data estimates as approximate truth and repeatedly samples 10 interventions, 100 respondents per intervention, and 700 control respondents: 1,700 respondents per replicate. The outcome is partisan animosity; topic predictors measure references to partisan animosity and correction of misperceptions about out-partisans (§4.5).

| Quantity | Reported result |
| --- | --- |
| Typical-effect coverage, nominal 90% | 95% nonparametric; 92% REML; 94% posterior simulation |
| Conditional heterogeneity SD | Full-data reference 1.99; posterior point estimate biased upward about 30% with 10 topics |
| SD coverage, nominal 90% | About 85% REML; 93% posterior simulation |
| Topic-specific estimates | Mean absolute bias about 0.6 points on a 100-point scale; average RMSE reduction about 20% |
| Topic-specific posterior intervals | Coverage about 90% on average, ranging from 84% to 95% |

The Economic Interests intervention is an important exception: its effect is far from the conditional expectation, pooling substantially worsens RMSE, and interval coverage is 84%.

## Limitations

Random sampling supports design-based generalization to a specified topic population. A deliberately diverse collection instead requires stronger modeling assumptions. Conditional exchangeability and the adequacy of topic predictors matter for hierarchical estimates, especially for unusual topics. With few topics, uncertainty about heterogeneity remains large. Repeated exposure can introduce order or spillover effects that need application-specific assessment.

The SDC evaluation uses estimated full-data quantities as approximate truth and a selected collection of promising interventions, rather than a random sample from every possible intervention. Its performance results therefore describe this resampling exercise, not universal coverage or error guarantees.

## Related Concepts

- [[concepts/topic-sampling|Topic Sampling]]: the design underlying cross-topic estimands and uncertainty.

## Related Papers

- Clifford, Leeper, and Rainey (2023), “Generalizing Survey Experiments Using Topic Sampling: An Application to Party Cues”: the design proposal whose estimators this paper develops.
- Tappin (2023), “Estimating the Between-Issue Variation in Party Elite Cue Effects”: an application of between-topic heterogeneity analysis discussed in the paper.
- Voelkel et al. (2023), “Megastudy Identifying Effective Interventions to Strengthen Americans’ Democratic Attitudes”: source of the evaluation data.

Replication data identifier reported in the paper: `10.7910/DVN/YBV9Z8`.
