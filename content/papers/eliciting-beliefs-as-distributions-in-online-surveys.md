---
title: "Eliciting Beliefs as Distributions in Online Surveys"
type: paper
authors:
  - Lucas Leemann
  - Lukas F. Stoetzer
  - Richard Traunmüller
year: 2021
venue: Political Analysis
doi: 10.1017/pan.2020.42
source_job_id: 86ee7f27-c23c-4745-bbe8-63ea3a890223
tags:
  - belief-elicitation
  - survey-methodology
---

## TL;DR

Across four experimentally induced belief distributions, a five-question format attributed to Manski best recovers average beliefs overall. Quantile questions perform better in symmetric scenarios, while Manski performs best in asymmetric scenarios. The comparison shows that survey format affects measured uncertainty as well as expected outcomes.

## Research Question

Which easily implemented online survey format most accurately elicits nonexperts’ full subjective probability distributions?

## Motivation

Point expectations omit uncertainty. Measuring both the center and spread of citizens’ beliefs can improve studies of political expectations and provide subjective priors, but intensive expert-elicitation protocols do not scale readily to ordinary surveys.

## Contributions

- Compares five formats against known distributions in a randomized between-subjects design.
- Fits parametric belief distributions to elicited answers and compares distributional accuracy rather than only means.
- Demonstrates the formats on preexisting beliefs about Trump’s 2020 popular vote share.

## Method

The experiment presents 100 simulated election outcomes, each for about half a second. Four beta benchmarks cross symmetry and variance: Beta(60,60), Beta(60,30), Beta(30,30), and Beta(30,15). Respondents receive one randomized format:

- Wide or narrow interval questions: a most-likely value and tail probabilities at 40%/60% or 45%/55%.
- Quantile questions: median and quartiles, followed by an adequacy check permitting correction.
- Manski questions: most-likely value, expected lower and upper bounds, and probabilities associated with those bounds.
- Bins and Balls: allocate 100 balls across value bins with immediate visual feedback.

The authors fit beta distributions by maximum likelihood. For the interval model, the reported central value and tail probabilities have Gaussian measurement errors around the beta mean and implied tail probabilities. This modeling of the central response as a mean should be distinguished from the question’s “most likely” wording. The principal evaluation compares fitted average beliefs against the benchmark using KL divergence; individual results are referred to the appendix.

## Experiments

Approximately 3,600 MTurk participants took part in the experiments. Main analyses retain those passing both attention checks, about 60% of the initial sample; the authors report unchanged substantive rankings using all respondents.

| Format | Summed KL across four conditions, reported in text |
| --- | ---: |
| Manski | 0.28 |
| Quantile | 0.65 |
| Bins and Balls | 0.91 |
| Wide interval | 1.31 |
| Narrow interval | 1.48 |

Table 2 shows Quantile winning both symmetric conditions (KL 0.04 and 0.01), and Manski winning both asymmetric conditions (0.06 and 0.04). Interval formats tend to yield excessively wide distributions; Quantile sometimes yields overly narrow distributions. The reported aggregate KL values use more precision than the rounded table entries, whose sums can differ slightly.

Median completion times were 170 seconds for Manski, 200 for Quantile, 199 for Bins and Balls, and 149/157 for the interval formats; differences were not statistically significant.

A separate 500-person MTurk application elicited expectations for Trump’s 2020 popular vote share. Section 5 reports Manski expectations of 52.3% among Republicans and 44.1% among Democrats, with standard deviations of 8.1 and 4.7 percentage points. There is no known true subjective distribution in this application, so plausibility cannot establish measurement accuracy.

## Limitations

- Benchmark distributions are experimentally instilled rather than naturally held beliefs; recall and learning enter the evaluation.
- Both benchmark generation and fitting use beta distributions. The study assumes unimodal beliefs; multimodal elicitation would require an adapted estimator, potentially using Bins and Balls.
- Primary comparisons concern average fitted beliefs, not a guarantee of accurate individual elicitation.
- MTurk recruitment and attention filtering constrain generalization, although reported attention and political-interest checks preserve relative rankings.
- Incentivized methods and intensive researcher-assisted protocols are outside the comparison.
- The introduction and application report slightly different rounded dispersions (overall Manski 5.5 versus 5.4 percentage points; Democrats 4.6 versus 4.7). Application figures above follow Section 5.

## Related Concepts

- [[concepts/subjective-probability-elicitation|Subjective Probability Elicitation]]: converting respondents’ uncertain judgments into distributions while accounting for question format and fitting assumptions.

## Related Papers

- Garthwaite, Kadane, and O’Hagan (2005), “Statistical Methods for Eliciting Probability Distributions”: methodological foundation for setup, elicitation, fitting, and adequacy assessment.
- Goldstein and Rothschild (2014), “Lay Understanding of Probability Distributions”: source for the visual Bins and Balls approach and distribution-exposure design.
- [[papers/diversity-efficiency-and-incentives-in-political-prediction-markets|Diversity, Efficiency, and Incentives in Political Prediction Markets]]: studies financially weighted aggregation of political expectations, complementing direct survey measurement of subjective beliefs.
