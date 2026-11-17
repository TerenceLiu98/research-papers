---
title: A Bias-Corrected Estimator for the Crosswise Model with Inattentive Respondents
type: paper
authors:
  - Yuki Atsusaka
  - Randolph T. Stevenson
year: 2023
doi: 10.1017/pan.2021.43
tags:
  - survey-methodology
  - measurement-error
---

## TL;DR

Random answers pull conventional crosswise estimates toward 0.5. Atsusaka and Stevenson use a matched anchor question with known sensitive-item prevalence to estimate attention and correct this distortion without classifying or dropping individual respondents. Simulations report lower bias and root-mean-square error, at the cost of additional estimation uncertainty.

## Research Question

Can an additional privacy-preserving survey question identify and correct the bias caused by inattentive responses to sensitive crosswise questions?

## Motivation

The crosswise format conceals individual sensitive answers by combining them with private nonsensitive information. Its cognitive demands can induce random responding, producing false positives when sensitive attributes are rare. Deleting respondents who fail attention checks can change the population being studied, while corrections based on direct questions inherit those questions' potential sensitivity bias.

## Contributions

- Derives the bias from a mixture of attentive and random responses.
- Proposes a known-prevalence anchor to estimate attention and correct prevalence estimates.
- Extends correction to sensitivity analysis, survey weighting, latent-trait regressions, and simulation-based design planning, implemented in CWISE.

## Method

Respondents report whether two statements are both true or both false, rather than disclose the sensitive statement alone. Let $\pi$ be sensitive prevalence, $p$ known nonsensitive prevalence, and $\lambda$ the probability of this combined answer. Independence of the statements yields $\lambda=\pi p+(1-\pi)(1-p)$ and

$$
\widehat\pi_{CM}=\frac{\widehat\lambda+p-1}{2p-1},\qquad p\ne 0.5.
$$

With attentive share $\gamma$ and equiprobable random answers, the response probability becomes $\lambda=\gamma[\pi p+(1-\pi)(1-p)]+(1-\gamma)/2$. A zero-prevalence sensitive anchor with nonsensitive prevalence $p'$ gives

$$
\widehat\gamma=\frac{\widehat\lambda'-0.5}{0.5-p'},\qquad
\widehat\pi_{BC}=0.5+\frac{\widehat\lambda-0.5}{(2p-1)\widehat\gamma}.
$$

This is an algebraic restatement of the paper's correction. It requires random picking with probability 0.5, equal attentive proportions across anchor and target, and no carryover between questions. Randomizing answer order supports the first assumption; matching question format and sensitivity and randomizing question order support the latter assumptions. Confidence intervals use the bootstrap.

Extensions replace response proportions with weighted estimates, vary assumed attention when no anchor exists, and model sensitive prevalence and attention jointly as functions of covariates. The regression likelihood additionally assumes conditional independence of target and anchor responses.

## Experiments

The main finite-sample study uses 8,000 simulation repetitions with sensitive prevalence drawn from $(0.1,0.45)$, nonsensitive prevalences from $(0.088,0.333)$, and attention from $(0.5,1)$. Sample sizes are 200, 500, 1,000, 2,000, and 5,000. The authors report lower bias and RMSE and improved 95% interval coverage relative to the conventional estimator.

A further simulation reports robustness when sensitive prevalence differs by attentiveness. This is a reported simulation result, not independent evidence that unobserved sensitive attributes are identifiable under arbitrary dependence on attention.

Sensitivity analysis considers 49 estimates from 21 earlier studies. Many comparisons with direct questioning would cease to be statistically distinguishable unless fewer than about 20% of respondents were inattentive. This is a sensitivity threshold, not an estimate of those studies' actual inattention rates.

## Limitations

Correction depends on a credible known-prevalence anchor and transferable attention rates. It increases uncertainty and divides by estimated attention, making weak anchor information consequential. The baseline setup assumes complete responses and simple random sampling; weighting is an extension. Nonbinary sensitive questions, multiple anchors, and improved missing-data handling are left for future work.

The supplied parsed text contains damaged mathematical notation and figure-caption parameters. The equations above use the clearly stated response identities; corrupted figure parameters are not reproduced. The supplied material does not include the online appendices, so their detailed derivations and additional results are not independently assessed here.

## Related Concepts

- [[concepts/crosswise-model|Crosswise Model]] — privacy-preserving joint answers and anchor-based attention correction.
- [[concepts/measurement-error-correction-in-ranking-questions|Measurement Error Correction in Ranking Questions]] — shares anchor calibration but concerns a different response format and estimand.

## Related Papers

- [[papers/addressing-measurement-errors-in-ranking-questions-for-the-social-sciences|Addressing Measurement Errors in Ranking Questions for the Social Sciences]] — later work using known-answer anchors to correct random-response contamination in rankings.

Published in *Political Analysis* 31, 134–148. Replication: [Harvard Dataverse](https://doi.org/10.7910/DVN/AHWMIL). Software: [CWISE](https://github.com/YukiAtsusaka/cWise).
