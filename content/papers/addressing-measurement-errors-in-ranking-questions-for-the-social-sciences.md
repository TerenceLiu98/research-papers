---
title: Addressing Measurement Errors in Ranking Questions for the Social Sciences
type: paper
authors:
  - Yuki Atsusaka
  - Seo-young Silvia Kim
year: 2025
doi: 10.1017/pan.2024.24
tags:
  - survey-methodology
  - measurement
  - ranking-data
---

## TL;DR

Random ranking responses can distort substantive conclusions even when item order is randomized. Atsusaka and Kim combine randomized item order with an adjacent ranking question whose correct answer is known to estimate contamination and correct ranking statistics. In a YouGov survey of 1,082 American adults, their anchor implies 31.6% random responding; correction strengthens differences between partisan identity and other identities.

## Research Question

How can researchers identify and correct measurement error from preference-independent responses to full-ranking survey questions?

## Motivation

Arbitrary response patterns, such as following displayed item order, need not reveal preferences. Randomizing presentation order makes these responses uniform over substantive rankings under the paper's framework, but leaves observed preferences diluted toward indifference. More observations alone cannot separate meaningful responses from contamination.

## Contributions

- Formalizes observed rankings as a mixture of non-random and random responses, distinguishing non-random-responder estimands from full-population estimands.
- Identifies the random-response distribution through item-order randomization and its prevalence through a paired anchor question.
- Develops direct correction, ranking-profile weights for downstream analysis, and a diagnostic based on recorded response-pattern uniformity.

## Method

Let $p$ denote the random-response share and $U_J$ the uniform distribution over the $J!$ complete rankings. For mixture-linear quantities such as mean ranks and ranking probabilities, the correction is

$$
\widehat\theta_z=\frac{\widehat g_{obs}-\widehat p\,g(U_J)}{1-\widehat p}.
$$

Both target and anchor item orders are randomized. With one known correct anchor ranking and observed correct-answer share $\bar c$, the estimated contamination share is

$$
\widehat p=\frac{1-\bar c}{1-1/J!}.
$$

This accounts for chance-correct answers. Transferring the estimate to the target requires equal random-response proportions across questions, rather than identical individual responders. The anchor should resemble the target in format and difficulty and appear immediately before or after it. The application asks respondents to order household, neighborhood, city or town, and state by size.

Direct correction is intended for simple nonparametric quantities; bootstrap intervals account for additional estimation uncertainty. The alternative weighting method uses corrected ranking-profile frequency divided by observed profile frequency and can multiply these weights by survey weights. The paper describes this flexible parametric approach as not exact.

The uniformity diagnostic concerns **recorded positional patterns**, not substantive preferences. Under randomized presentation and no random responding, these patterns should be uniform. This differs from the result that random responders' **substantive rankings** become uniform after randomization.

## Experiments

The survey asks respondents to rank party, race/ethnicity, gender, and religion by identity importance; analyses incorporate survey weights.

- **Anchor estimate:** 754 of 1,082 respondents answer correctly, yielding approximately 31.6% random responding under the specified anchor coding and transfer assumption.
- **Diagnostic:** target recorded patterns reject uniformity ($\chi^2=68.45$, $p<0.001$). Correct-anchor respondents do not reject uniformity ($p=0.1066$); incorrect-anchor respondents do ($p<0.001$).
- **Average ranks:** direct correction makes the religion–party gap 1.52 times the unadjusted gap and the party–gender gap 1.55 times as large. Corresponding weighting estimates are 1.36 and 1.41 times as large. Party is rarely ranked first.
- **Regression:** a weighted Plackett–Luce model relates rankings to respondent characteristics. For the specified reference profile, the liberal–conservative predicted-probability contrast for gender–race–party–religion is 0.246 after correction versus 0.157 unadjusted.
- **Alternative screening:** two attention checks correlate only 0.25, illustrating why assuming identical individual response behavior across questions can be demanding.

## Limitations

The framework assumes complete, transitive preferences and full rankings; partial rankings and ties remain extensions. Anchor correctness and equal contamination rates across anchor and target are substantive assumptions. Ambiguous anchor responses can affect estimated contamination, and correction widens uncertainty.

The primary estimand describes non-random responders. Full-population inference additionally requires assumptions about random responders' counterfactual preferences: uniform preferences, independence between preferences and random responding, or conditional independence within covariate strata. These assumptions yield different population estimates. The reported 31.6% is an application-specific estimate, not a universal survey error rate.

## Related Concepts

- [[concepts/measurement-error-correction-in-ranking-questions|Measurement Error Correction in Ranking Questions]] — randomized presentation and anchor calibration identify the contamination correction.
- [[concepts/acquiescence-response-bias|Acquiescence-Response Bias]] — another survey response mechanism requiring design-aware measurement correction; agreement bias differs from arbitrary ranking patterns.

## Related Papers

The paper builds on Horowitz and Manski (1995), *Identification and Robustness with Contaminated and Corrupted Data*, and relates its anchor design to Atsusaka and Stevenson (2023), *A Bias-Corrected Estimator for the Crosswise Model with Inattentive Respondents*. These are cited antecedents, not claims of identical error mechanisms.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/UCTXEF). Software: [rankingQ](https://github.com/sysilviakim/rankingQ).
