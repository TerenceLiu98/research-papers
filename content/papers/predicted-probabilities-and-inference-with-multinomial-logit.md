---
title: Predicted Probabilities and Inference with Multinomial Logit
type: paper
authors:
  - Philip Paolino
year: 2021
doi: 10.1017/pan.2020.35
source_job_id: 6cb1a1c6-8e45-49fb-a35b-f9f5468d7311
tags:
  - political-methodology
  - categorical-data
  - statistical-inference
---

## TL;DR

Multinomial logit coefficients test changes in category odds relative to a baseline, not changes in an individual outcome's probability. Paolino shows through two reanalyses that these tests can miss meaningful probability changes or encourage misleading interpretations of significant relative odds. Inference should target the relevant predicted-probability contrast and its uncertainty.

## Research Question

When do significance tests of multinomial logit coefficients fail to answer substantive questions about category probabilities, and how should researchers present the appropriate quantities?

## Motivation

Changing the reference category changes coefficient contrasts and their standard errors, whereas fitted probabilities and their uncertainty are invariant to this reparameterization. In the author's survey of 2014–2018 publications, 14 of 24 primary MNL analyses in three leading general political-science journals and 15 of 26 in three international-relations journals based inference on coefficients.

## Contributions

- Explains why relative-odds tests and category-probability tests answer different questions.
- Demonstrates missed probability effects in an experiment on Iraq-war attitudes.
- Shows how increasing relative odds of rumor acceptance can reflect declining disbelief with almost unchanged acceptance.
- Recommends reporting uncertainty for substantively relevant probability differences, even when relative odds are themselves of interest.

## Method

With category $A$ as the baseline and a binary covariate $X$, the coefficient for category $B$ represents

$$
\log\left[\frac{P(B\mid X=1)/P(A\mid X=1)}{P(B\mid X=0)/P(A\mid X=0)}\right].
$$

This differs from $\Delta_B=P(B\mid X=1)-P(B\mid X=0)$. If $P(B)$ rises from .25 to .50 while $P(A)$ rises from .01 to .02, the coefficient is zero despite a .25 probability increase. Conversely, relative odds can change because only the baseline probability changes. Exponentiating the coefficient does not resolve this distinction.

Calculate the probability contrasts matching the hypothesis, using simulation or approximation for their standard errors. All estimated category coefficients contribute to a category's probability. Specify the values or averaging distribution of other covariates: evaluating at means and averaging over observed profiles can yield different estimates and uncertainty. See [[concepts/predicted-probability-contrasts|Predicted Probability Contrasts]].

## Experiments

The evidence consists of published-study reanalyses, not a new experiment or simulation benchmark.

| Reanalysis | Reported probability contrast | Implication |
| --- | --- | --- |
| Gelpi (2017), cautious Bush message among respondents somewhat approving of Bush | Strong disapproval of withdrawal timetable: −.177 (SE .073); somewhat disapproval: +.157 (SE .076) | Coefficient-based screening overlooked evidence consistent with the surprising-opinions hypothesis. |
| Greenhill and Oppenheim (2017), Thai coup rumor, lowest to highest perceived threat | Acceptance: +.018 (SE .009), reported $p=.057$ | Significant relative-odds coefficients do not establish an equally strong acceptance-probability result. |
| Greenhill and Oppenheim (2017), Philippine corruption rumor, lowest to highest distrust | Acceptance: +.004 (SE .052) | Higher acceptance odds relative to disbelief arise from declining disbelief, with little estimated acceptance change. |

Table 1 compares each Iraq treatment with no treatment while setting other treatments to zero. Figure 1 presents category probabilities with 95% confidence intervals. The note argues that these analyses qualify the original substantive interpretations.

## Limitations

The note illustrates an inferential mismatch through two applications; it does not estimate its prevalence across all MNL research. Coefficients remain relevant when the research question actually concerns the corresponding relative-odds contrast. Probability-based inference still depends on the chosen covariate profiles and model. The reported reanalyses and uncertainties are summarized from the supplied paper, not independently reproduced here.

Published online on 16 November 2020; the journal issue is Political Analysis 29 (2021), 416–421. Replication data are identified as [Paolino (2020)](https://doi.org/10.7910/DVN/MVP6ID).

## Related Concepts

- [[concepts/predicted-probability-contrasts|Predicted Probability Contrasts]]: aligns category-level hypotheses with estimates and uncertainty.
- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: a distinct causal heterogeneity target that likewise requires explicit conditioning and averaging choices.

## Related Papers

- Gelpi (2017), “The Surprising Robustness of Surprising Events: A Response to a Critique of ‘Performing on Cue’”: source of the Iraq attitudes reanalysis.
- Greenhill and Oppenheim (2017), “Rumor Has It: The Adoption of Unverified Information in Conflict Zones”: source of the rumor-belief reanalysis.
- Hanmer and Kalkan (2013), “Behind the Curve: Clarifying the Best Approach to Calculating Predicted Probabilities and Marginal Effects from Limited Dependent Variable Models”: cited for covariate-profile and averaging choices.
