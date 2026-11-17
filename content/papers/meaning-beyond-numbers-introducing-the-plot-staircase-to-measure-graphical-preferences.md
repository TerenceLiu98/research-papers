---
title: "Meaning Beyond Numbers: Introducing the Plot Staircase to Measure Graphical Preferences"
type: paper
authors:
  - Talbot M. Andrews
  - Justin Curl
  - Markus Prior
year: 2025
doi: "10.1017/pan.2025.10015"
tags:
  - political-methodology
  - survey-measurement
  - visualization
---

## TL;DR

The plot staircase adaptively compares a fixed rising time series with an adjustable flat series to estimate how much additional benefit makes a respondent accept the flat alternative. Four or five choices bound an individual indifference point. Across vaccine rollout, income growth, and job creation, respondents favor increasing trends, including people whose verbal vaccine preferences favor rapid initial delivery.

## Research Question

How can surveys efficiently quantify individual preferences for graphical properties, and distinguish those preferences from preferences over the underlying outcomes?

## Motivation

Separate ratings of graphs reveal trend preferences but require many stimuli to calibrate their magnitude and depend on respondents remembering axes and using rating scales consistently. Simultaneous comparisons place the tradeoff directly in view.

## Contributions

- An adaptive visual elicitation design that estimates an interval around individual indifference with few questions.
- A flat average equivalent (FAE), expressed in outcome units and standardized by visible graphical area.
- Evidence across three outcome domains, with convergent validity against ratings and a contrast between graphical and verbal vaccine preferences.
- An alternative design that adjusts slope rather than average benefit.

## Method

After a rising-series choice, the next screen raises the flat series; after a flat-series choice, it lowers it. The adjustment halves at each step. Survey 1 uses five choices; Surveys 2 and 3 use four. The switching interval midpoint represents FAE. Always choosing one alternative leaves the threshold outside the tested range; such respondents receive endpoint scores one scale step beyond the outermost midpoint.

Standardized FAE is the ratio of visible area under the flat series to visible area under the rising series at indifference. A value of one indicates equal visible benefit; values above one indicate a premium for the rising series. With a truncated vertical axis, this is a ratio of visible quantities, not total underlying benefits. The vaccine axis runs from 15 to 27 million doses per week.

Bounds, step count, fixed reference sequence, and graphical noise are design parameters. The authors preserve sequence averages and endpoints when adding noise and avoid violating monotonicity. An alternative staircase fixes a flat series at 22 million weekly doses and adjusts the slope of a series averaging 21 million.

## Experiments

Table 1 reports these sample sizes (labeled observations in the source):

| Survey | Date | Domain | Samples |
| --- | --- | --- | --- |
| 1 | April 2021 | Vaccine rollout | MTurk 500; Volunteer Science 652 |
| 2 | December 2021 | Income growth | MTurk 1,181; Volunteer Science 437 |
| 3 | May 2022 | Income growth or job creation | NORC 2,321; MTurk job creation 833 |

Mean standardized FAE exceeds one significantly in every domain and sample. In the probability-based NORC income-growth condition, mean FAE is 1.8 and 20% reach the maximum of three; 15% reach the maximum in the NORC jobs condition. These ratios concern the displayed graphical space. Survey 2 ceiling concentrations of 32% on MTurk and 20% on Volunteer Science motivated expanding the Survey 3 range to 0.45–3.

For convergent validity, higher FAE predicts better ratings of rising vaccine sequences and worse ratings of declining ones; the slope interaction is significant. Verbal questions nevertheless find 54% of MTurk and 53% of Volunteer Science respondents want vaccination immediately. In the nongraphical adaptive task with equal final totals, 81% and 63%, respectively, choose the largest immediate delivery. Even respondents verbally favoring fast delivery have average FAE above one.

Education has no systematic association with FAE; numeracy associations vary across domains. Democratic and Republican FAEs are statistically indistinguishable in the reported models despite partisan differences in verbally stated vaccine preferences. These associations do not identify a causal cognitive mechanism.

## Limitations

The estimate is an interval, with censoring outside the tested range; midpoint and endpoint coding do not recover exact thresholds. Calibration is conditional on the fixed sequence, axes, bounds, and visual presentation. Truncated-axis normalization prevents interpreting every reported ratio as a total-welfare ratio. Very small steps become visually indistinguishable. Sample differences and ceiling effects limit unqualified comparisons. The study measures evaluations, not downstream vaccination behavior; applications beyond the tested sequence characteristics remain proposed extensions.

## Related Concepts

- [[concepts/graphical-preferences|Graphical Preferences]]: visual properties can influence evaluations independently of verbally expressed outcome preferences.

## Related Papers

- Prior and Andrews (2025), *Trend Dominance*: cited evidence on preferences for increasing trends.
- Cornsweet (1962), *The Staircase-Method in Psychophysics*: methodological antecedent for adaptive threshold elicitation.
- Falk et al. (2023), *The Preference Survey Module*: related adaptive elicitation of economic preferences using verbal questions.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/VLFHHR).
