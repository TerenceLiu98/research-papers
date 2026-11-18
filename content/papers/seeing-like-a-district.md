---
title: "Seeing Like a District: Understanding What Close-Election Designs for Leader Characteristics Can and Cannot Tell Us"
type: paper
authors:
  - Andrew Bertoli
  - Chad Hazlett
year: 2025
doi: "10.1017/pan.2025.5"
tags:
  - causal-inference
  - regression-discontinuity
  - political-leadership
---

## TL;DR

Close-election designs identify the local effect of a district electing its type A candidate rather than its type B candidate, under continuity assumptions. They do not isolate the effect of changing an attribute of a fixed politician. Bertoli and Hazlett formalize this distinction and develop diagnostics that preserve the substantive value of the bundled electoral choice.

## Research Question

What causal quantity can politician characteristic regression discontinuity designs identify, and which diagnostics distinguish threats to identification from differences that help interpret the treatment?

## Motivation

Candidate gender, party, ideology, and education correlate with other characteristics. Narrow victories do not separate these attributes. The authors find inconsistent estimand language in 17 of 28 PCRD articles they identified in APSR, AJPS, and JOP since 2020, motivating explicit definitions of units and counterfactuals.

## Contributions

- Distinguishes district-level electoral contrasts from within-politician attribute contrasts using potential outcomes.
- Explains why candidate selection and compensating differentials matter for mechanisms and generalization without inherently invalidating the district-level estimand.
- Extends balance diagnostics to predetermined characteristics of both candidates and to predicted treatment probabilities and potential outcomes.
- Discusses gradient PCRDs, which dichotomize continuous traits and sometimes restrict elections to sufficiently different candidates.

## Method

For district $i$, let $D_i=1$ denote a type A victory and let $Y_i(1)$ and $Y_i(0)$ denote outcomes under its actual type A and type B candidates. The target is

$$
\tau_{\mathrm{districts}}=\mathbb{E}[Y_i(1)-Y_i(0)\mid mov=0].
$$

Continuity of conditional potential-outcome expectations at the victory-margin cutoff identifies this contrast. A counterfactual that changes a fixed leader from type A to B is a different quantity, potentially ill-defined and unidentified by close elections. Bundled attributes belong to the electoral treatment; the comparison remains meaningful even when bundles differ across districts.

Diagnostics include density tests, predetermined district covariate balance, and within-type comparisons of candidate characteristics across narrow victories and losses. Whether the female candidate was an incumbent is predetermined; whether the winner was an incumbent selects a candidate through the election outcome and need not balance. Differences between type A and B winners can suggest mechanisms but do not identify those mechanisms.

The authors also test discontinuities in predicted treatment probabilities and in each predicted potential outcome. The latter target observable imbalance relevant to outcome bias; oppositely signed potential-outcome discontinuities can offset. Models must avoid overfitting. For gradient designs, broader samples improve diagnostic power, while varying the minimum candidate-trait gap reveals sensitivity to sample selection.

## Experiments

The empirical illustration reanalyzes Hall (2015), using U.S. House primaries from 1980–2010. The restricted sample contains 252 elections whose top-two candidates differ at least as much ideologically as the sample median; the full sample contains 504 elections.

Separate cubic regressions on either side of the cutoff estimate that narrowly nominating the more extreme candidate reduces the party's subsequent general-election win probability by approximately **45 percentage points** (standard error approximately 18 points; $p\approx0.011$). These are reported reanalysis results, not newly reproduced estimates. The paper reports similar findings with rdrobust in its appendix.

McCrary density tests yield $p\approx0.96$ in the restricted sample and $p\approx0.44$ in the full sample. A Northeast covariate imbalance in the restricted sample ($p\approx0.004$) disappears in the full sample. Predicted treatment probabilities raise more concern in the full sample. Predicted potential-outcome imbalances in the restricted sample are individually nonsignificant and point in opposing directions, suggesting possible cancellation of observable sorting bias rather than establishing its absence.

## Limitations

- Identification remains conditional on cutoff continuity; diagnostic nonrejection does not prove validity.
- Effects concern close contests and their selected candidate pairs. Compensating differentials constrain generalization and interpretation of mechanisms.
- Gradient labels can be relative within a district; a younger candidate in one race may be older than an older candidate elsewhere. Dichotomization can obscure nonmonotonic relationships.
- Candidate diagnostics require data on losers as well as winners, often unavailable. Prediction-based diagnostics address observed covariates and depend on modeling choices.
- The supplied text references supplementary derivations and robustness analyses that are not included in the Markdown.

## Related Concepts

- [[concepts/politician-characteristic-regression-discontinuity|Politician Characteristic Regression Discontinuity]]: the electoral design and its district-level estimand.
- [[concepts/regression-discontinuity-design|Regression Discontinuity Design]]: continuity-based identification and cutoff diagnostics.

## Related Papers

- Hall (2015), *What Happens When Extremists Win Primaries?*: empirical application and an example of appropriate electoral-treatment interpretation.
- Marshall (2024), *Can Close Election Regression Discontinuity Designs Identify Effects of Winning Politician Characteristics?*: develops concerns about selection and bundled attributes; this paper disputes the conclusion that those concerns undermine the district-level contrast's value.
- [[papers/the-role-of-majority-status-in-close-election-studies|The Role of Majority Status in Close Election Studies]]: a complementary account of treatment bundling through legislative majority status.

Published online 27 March 2025. Replication archive: https://doi.org/10.7910/DVN/SCTVOF.
