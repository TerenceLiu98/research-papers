---
title: Topic Sampling
type: concept
aliases:
  - Topic-Sampling Designs
definition: "Topic sampling varies experimental implementations across a collection of topics to estimate average effects and heterogeneity beyond any single selected implementation."
tags:
  - experimental-design
  - causal-inference
  - generalizability
---

## Overview

Topic sampling runs conceptually related experiments across multiple policy issues, stimuli, interventions, control conditions, or contexts. It treats the choice of experimental implementation as a source of variation relevant to the theoretical claim. These topics are experimental design features, not latent themes inferred from text.

## Key Ideas

- Generalizing across respondents and generalizing across topics are separate problems. Random assignment within one topic does not establish an average effect across a population of topics.
- Under random topic sampling and within-topic randomization, averaging topic-specific differences in means estimates the typical effect. Uncertainty must include topic sampling.
- When treatment and control have distinct topics, define the target as the difference between their topic-population average outcomes.
- Hierarchical models describe the effect distribution and partially pool noisy topic estimates. Pooling can improve average precision while biasing unusual topics toward the conditional mean.
- Topic-level predictors explain systematic variation. The remaining heterogeneity SD is conditional on those predictors, rather than the overall spread of effects.
- A diverse convenience collection does not inherit the design-based guarantees of a probability sample; broader inference requires modeling assumptions.

A single-topic interval omits uncertainty from topic selection. In the stylized random-topic setting, the variance for inference about the typical effect adds between-topic variance to within-topic sampling variance. More respondents alone cannot remove this source of uncertainty. Deliberately selecting a high-effect topic instead shifts the estimate relative to the typical effect.

## Important Papers

- [[papers/estimators-for-topic-sampling-designs|Estimators for Topic-Sampling Designs]]: develops design-based average-effect estimators and hierarchical heterogeneity models, with an empirical resampling evaluation.
- Clifford, Leeper, and Rainey (2023), “Generalizing Survey Experiments Using Topic Sampling: An Application to Party Cues”: introduces the design motivating the estimator paper.

- [[papers/the-limits-and-strengths-of-single-topic-experiments|The Limits (and Strengths) of Single-Topic Experiments]]: quantifies undercoverage when topic-specific intervals are interpreted as intervals for the typical effect, while explaining the value of initial single-topic studies.

## Related Concepts

- [[concepts/candidate-attractiveness|Candidate Attractiveness]]: effects of selected political images or edits illustrate why broader stimulus sampling matters for generalizing a presentation effect.
