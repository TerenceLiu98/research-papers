---
title: Generalizability of Survey Experiments
type: concept
aliases:
  - Survey Experiment Generalizability
definition: "The extent to which causal effects estimated among survey participants apply to a specified target population under the same treatment and outcome definitions."
tags:
  - survey-experiments
  - generalizability
  - survey-nonresponse
---

## Overview

Random treatment assignment identifies causal effects among experimental participants. Extending those effects to a population additionally requires attention to who participates and whether the characteristics governing participation also moderate treatment effects.

## Key Ideas

- Selection matters for an average treatment effect when inclusion probabilities covary with individual effects. An unrepresentative sample need not produce a biased population effect if effects are homogeneous or selection is unrelated to them.
- Demographic weighting can address observed differences under appropriate assumptions, but cannot automatically repair selection on unobserved moderators.
- Intensive nonresponse follow-up broadens the range of observed participation willingness. Recruitment histories permit direct comparisons between ordinary recruits and harder-to-recruit respondents.
- Similar effects across recruitment groups support generalization within that observed range. They do not reveal effects among people who never participate.
- Generalization across people is one dimension of external validity. It does not establish treatment realism or valid outcome measurement.

## Important Papers

- [[papers/generalizing-toward-nonrespondents|Moniz et al. (2024)]]: compares eager and reluctant recruits across 50 TESS experiments and finds broadly similar standardized effects overall and within demographic groups.
- Miratrix et al. (2018), “Worth Weighting? How to Think about and Use Weights in Survey Experiments”: develops the weighting and effect-heterogeneity perspective used by Moniz et al.

## Related Concepts

- [[concepts/randomized-response-instruments|Randomized Response Instruments]]: uses assigned participation protocols and identifying assumptions to estimate outcomes under non-ignorable selection, rather than merely comparing observed recruitment groups.
- [[concepts/sign-congruent-external-validity|Sign-Congruent External Validity]]: distinguishes stability of effect direction from equality of effect magnitudes across settings.
