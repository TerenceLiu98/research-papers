---
title: Estimating Individuals’ Political Perceptions While Adjusting for Differential Item Functioning
type: paper
authors:
  - Stephen A. Jessee
year: 2021
doi: 10.1017/pan.2019.47
source_job_id: "4ad8de16-be76-4302-9936-94c102ea6290"
tags:
  - political-measurement
  - bayesian-measurement
  - survey-methodology
---

## TL;DR

Anchoring hypothetical policy profiles lets researchers adjust ideological ratings for individual scale use while allowing people to perceive real political actors differently. In the 2016 CCES application, partisan differences in perceptions of Democratic actors and the Supreme Court remain substantial after adjustment; perceptions of Trump and the Republican Party show little partisan divergence.

Published in *Political Analysis* 29 (2021), 1–18; first published online January 16, 2020. [Paper](https://doi.org/10.1017/pan.2019.47).

## Research Question

Do partisan differences in ideological ratings reflect different uses of response scales or different perceptions of political actors, and how can these sources be separated?

## Motivation

Standard [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]] assumes common perceptions of political anchors. Consequently, systematic disagreement about those actors enters estimated scale-use parameters. That assumption prevents the model from independently assessing whether perceptual disagreement exists.

## Contributions

- Uses [[concepts/anchoring-vignettes|Anchoring Vignettes]] to calibrate individual shifts and stretches without imposing identical perceptions of real politicians.
- Transforms each respondent’s actor ratings into individual DIF-adjusted perceptions with posterior uncertainty.
- Shows that the common-perception assumption is substantively consequential in American ideological ratings, with asymmetric partisan differences across political actors.

## Method

For respondent $i$ and vignette $j$, the model is

$$
z_{ij}=\alpha_i+\beta_i\zeta_j+\varepsilon_{ij},\qquad
\varepsilon_{ij}\sim N(0,\tau_j^2).
$$

The shift $\alpha_i$ and stretch $\beta_i$ have normal hierarchical priors, allowing partial pooling. Negative stretches permit reversed scale use. Vignette locations are standardized to mean zero and variance one. The common-perception assumption applies to hypothetical profiles described through policy positions.

For real actor $k$, each posterior draw of the scale-use parameters yields

$$
x_{ik}=\frac{z_{ik}-\alpha_i}{\beta_i}.
$$

This undoes individual shifting and stretching while preserving variation in perceptions of actors (Section 2). The paper compares the same underlying model calibrated with political actors versus vignettes. JAGS estimation discards 50,000 burn-in iterations and saves every 50th of 250,000 subsequent iterations, yielding 5,000 retained draws per fit.

## Experiments

The University of Texas module of the 2016 CCES surveyed 1,000 respondents. Respondents rated Obama, Clinton, Trump, both major parties, and the Supreme Court on a seven-point ideology scale. Six randomized-order vignettes described hypothetical people through five policy positions each, ranging from consistently liberal to consistently conservative.

Table 1 regresses estimated scale-use parameters on seven-point party identification, increasing toward Republican identification. Parentheses contain reported standard errors; these regressions use 828 respondents.

| Outcome | Political anchors: PID coefficient | Vignette anchors: PID coefficient |
| --- | ---: | ---: |
| Shift | -0.19 (0.01) | -0.06 (0.01) |
| Stretch | 0.10 (0.02) | 0.01 (0.01) |

Thus vignette calibration finds smaller partisan differences in shift and essentially no partisan relationship with stretch. This supports the interpretation that political-anchor estimates absorb substantive perceptual differences into apparent DIF.

Table 2 regresses posterior-median adjusted actor perceptions on party identification:

| Actor | PID coefficient (SE) | Respondents |
| --- | ---: | ---: |
| Obama | -0.16 (0.03) | 809 |
| Clinton | -0.19 (0.03) | 804 |
| Trump | -0.01 (0.04) | 705 |
| Democratic Party | -0.16 (0.03) | 805 |
| Republican Party | -0.00 (0.03) | 796 |
| Supreme Court | -0.11 (0.02) | 751 |

Republican respondents perceive Democratic actors and the Court as more liberal even after adjustment. The near-zero Trump and Republican Party coefficients are not statistically significant.

An ANES comparison from 1972 onward finds similar asymmetry in raw party ratings. The Democratic Party PID slope changes from -0.13 in 1972 to -0.25 in 2016. These historical results lack vignette adjustment and therefore do not independently establish stable perceptual differences net of DIF (Section 4).

[Replication data and code](https://doi.org/10.7910/DVN/MCXXBS) are identified in the source.

## Limitations

- Common perceptions of vignettes remain an identifying assumption. Receiving identical policy descriptions makes it more plausible, but does not prove equivalence.
- Applying vignette-derived parameters to actors requires scale use to transfer across these tasks; the linear Gaussian model approximates an ordinal response scale.
- Historical ANES comparisons cannot distinguish perception from scale use without additional assumptions. Small partisan DIF in 2016 need not generalize across years or contexts.
- The analysis does not establish the mechanism behind partisan asymmetry. Expressive responding and negative connotations of ideological labels are proposed explanations, not demonstrated causes.
- The supplied Markdown references supplementary analyses and footnotes whose full contents are absent. Claims about those analyses are not independently reconstructed here.

## Related Concepts

- [[concepts/anchoring-vignettes|Anchoring Vignettes]]: hypothetical shared stimuli identify response-scale differences.
- [[concepts/differential-item-functioning|Differential Item Functioning]]: here, identical perceived positions can produce different expected ratings across respondents.
- [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]]: provides the shift-and-stretch framework whose anchors are changed.

## Related Papers

- Aldrich and McKelvey (1977), “A Method of Scaling with Applications to the 1968 and 1972 Presidential Elections”: original common-perception scaling framework.
- Hare et al. (2015), “Using Bayesian Aldrich-McKelvey Scaling to Study Citizens’ Ideological Preferences and Perceptions”: Bayesian predecessor.
- King et al. (2004), “Enhancing the validity and cross-cultural comparability of measurement in survey research”: anchoring-vignette foundation cited by the paper.
- [[papers/hierarchical-bayesian-aldrich-mckelvey-scaling|Hierarchical Bayesian Aldrich-McKelvey Scaling]]: related library work addressing pooling and scale reversal; Jessee instead focuses on freeing individual perceptions of political actors through external anchors.
