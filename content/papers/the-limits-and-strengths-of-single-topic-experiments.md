---
title: "The Limits (and Strengths) of Single-Topic Experiments"
type: paper
authors:
  - Scott Clifford
  - Carlisle Rainey
year: 2025
tags:
  - experimental-design
  - external-validity
  - topic-sampling
---

## TL;DR

Confidence intervals for one experimental topic can substantially undercover the average effect across topics. In the paper’s illustrative scenario with 1,000 respondents, a nominal 95% interval covers the typical effect about 72% of the time for a randomly selected topic and 67% for a deliberately high-effect topic. Single-topic studies remain useful for establishing particular effects and building a research program, but broader inference requires information about between-topic variation.

## Research Question

How often does a single-topic experiment’s confidence interval contain the typical treatment effect across a population of possible experimental implementations?

## Motivation

Random assignment captures uncertainty about an effect within a selected topic, not uncertainty from topic selection. A precise estimate for one policy issue or stimulus can therefore support much less precise conclusions about a general theoretical claim.

## Contributions

- Quantifies the gap between topic-specific interval coverage and coverage of the typical effect.
- Separates random topic selection from deliberate selection of a topic expected to produce a large effect.
- Explains both the value of single-topic experiments for initial theory tests and the importance of subsequent multi-topic designs.

## Method

Write the topic effect as $\delta_j=\delta+\psi_j$, where $\delta$ is the mean across topics and the topic deviation has variance $\sigma_\psi^2$. In the stylized balanced two-arm experiment with outcome SD $\sigma_y$ and total sample size $N$, the within-topic standard error is

$$
s=\frac{2\sigma_y}{\sqrt N}.
$$

For a randomly sampled topic, accounting for topic variation gives standard error $\sqrt{s^2+\sigma_\psi^2}$ for inference about the typical effect. The conventional interval is therefore only $1/\sqrt{1+\sigma_\psi^2/s^2}$ as wide as the adjusted interval (§2). Increasing respondent sample size reduces within-topic uncertainty without removing between-topic uncertainty.

The deliberate-selection scenario fixes the topic effect one between-topic SD above the mean, described as the 84th percentile. Its intervals are systematically shifted relative to the typical effect (§3). The recommended broader design is [[concepts/topic-sampling|Topic Sampling]]: sample topics, run parallel experimental arms, and use hierarchical models to estimate typical effects and heterogeneity.

## Experiments

These are stylized calculations and simulated intervals, calibrated using a prior party-cue experiment, rather than a new respondent experiment. The illustration uses $\sigma_y=1.87$ and $\sigma_\psi=0.18$.

| Scenario | Reported result |
| --- | --- |
| Random topic, N = 1,000 | Interval width about 55% of the width needed for nominal coverage; typical-effect coverage about 72% |
| Random topic, N from 100 to 3,000 | Coverage declines from 92% to 51%; relative interval width from 90% to 35% |
| Topic one SD above average, N = 1,000 | About 67% coverage, with almost all misses above the typical effect |
| Topic one SD above average, N from 100 to 3,000 | Coverage declines from 92% to 25% |

Under a null typical effect, the illustrated one-tailed error rates are about 14% for random selection and 33% for high-effect selection, compared with nominal 2.5%. Section 2 reports approximately 72% random-topic coverage; the conclusion gives approximately 71% for the same illustration.

## Limitations

The numerical results depend on the illustrative variance parameters and selection scenarios. A single topic does not supply the between-topic variance needed for the proposed uncertainty adjustment. Smaller respondent samples are not a remedy: precise topic-specific estimates remain valuable inputs to systematic cross-topic research.

Selecting a promising topic can increase power to establish a particular effect. Extending even its direction to other topics still requires an assumption about directional similarity until other topics are studied. The supplied Markdown contains damaged mathematical formatting; the formulas above follow the intact variance relationship and accompanying prose.

## Related Concepts

- [[concepts/topic-sampling|Topic Sampling]]: explicitly represents implementation variability in design and inference.
- [[concepts/sign-congruent-external-validity|Sign-Congruent External Validity]]: distinguishes directional generalization from equality of magnitudes; directional similarity remains an assumption in the single-topic argument.

## Related Papers

- [[papers/estimators-for-topic-sampling-designs|Estimators for Topic-Sampling Designs]] (2024): supplies the framework for typical effects and topic heterogeneity used here.
- Clifford, Leeper, and Rainey (2024), “Generalizing Survey Experiments Using Topic Sampling: An Application to Party Cues”: supplies the design motivation and empirical calibration.
- Tappin (2023), “Estimating the Between-Issue Variation in Party Elite Cue Effects”: another example of estimating effects across topics.

Replication data identifier reported in the source: `10.7910/DVN/QX0BSK`.
