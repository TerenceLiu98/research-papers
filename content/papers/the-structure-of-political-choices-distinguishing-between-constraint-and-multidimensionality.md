---
title: "The Structure of Political Choices: Distinguishing Between Constraint and Multidimensionality"
type: paper
authors:
  - William Marble
  - Matthew Tyler
year: 2022
doi: 10.1017/pan.2021.3
source_job_id: edc016c8-3334-40be-9fcd-5ece2e723382
tags:
  - ideal-point-estimation
  - public-opinion
  - cross-validation
---

## TL;DR

Constraint and dimensionality answer different questions: how predictable political choices are from common preferences, and how many shared axes those preferences require. Cell-level cross-validation favors a one-dimensional approximation in the studied American datasets, while showing substantially weaker constraint among citizens than politicians. Low public predictability does not itself establish multidimensional preferences.

## Research Question

How can ideal point models distinguish weak ideological constraint from multiple shared dimensions, and how do these properties differ between politicians and citizens?

## Motivation

Additional latent dimensions can fit idiosyncratic responses without predicting new choices. In-sample fit consequently risks overstating both dimensionality and constraint. A useful assessment must compare held-out predictions against an item-specific baseline rather than interpret raw classification accuracy as ideological organization.

## Contributions

- Separates [[concepts/ideological-dimensionality|Ideological Dimensionality]] from [[concepts/ideological-constraint|Ideological Constraint]] within a quadratic-utility spatial model.
- Develops cell-level holdout validation that retains information for estimating every actor and item parameter.
- Compares public and elite data, including matched agendas and parallel surveys, to investigate the source of their predictive gap.

## Method

The probit model is $P(y_{ij}=1)=\Phi(\alpha_j+\beta_j^\top\gamma_i)$, with a shared D-dimensional ideal point for each actor. Dimensionality counts systematic axes; constraint measures the predictive contribution of those positions relative to an item-intercept-only model. Under standard multivariate Normal ideal points, integrating over positions gives the item baseline $\Phi(\alpha_j/\sqrt{1+\|\beta_j\|^2})$.

Randomly hide actor-item cells, rather than entire actors or questions, so both sets of parameters remain estimable. A 90/10 split compares dimensions 0–25 for Senate and ANES data. Ten-fold cell cross-validation compares dimensions 0–5 across datasets. Classification uses a 0.5 probability threshold, with reported confidence intervals clustered by respondent. MultiScale implements fast estimation based largely on Imai, Lo, and Olmsted's formulas. Ordered survey answers are binarized at the mean.

## Experiments

The data include the 109th Senate (102 actors, 645 votes), NPAT (12,794 candidates, 225 items, 79% missing), state legislators (225 respondents, 31 items), a paired public survey (997 respondents), 2012 ANES (2,054 respondents, 28 items), and 2012 CCES (54,068 respondents, 10 items).

| Dataset | Reported one-dimensional held-out accuracy | Comparison |
| --- | --- | --- |
| 109th Senate | Nearly 90% | About 20 percentage points above baseline |
| State legislator survey | Roughly 83% | More than 20 points above baseline |
| NPAT | About 75% | Less than 10 points above baseline; second dimension adds about 2 points |
| ANES | About 69% | Baseline about 62% |
| CCES | About 71% | Baseline about 63% |

Higher dimensions overfit especially strongly in ANES; the Senate's one-dimensional model is statistically no worse than the alternatives. The authors summarize error reduction relative to the null as roughly two-thirds for national/state elites versus one-fifth for the public, with NPAT a weaker elite result. These are classification-error reductions, not direct variance decompositions.

Constraint varies within the public: explicitly ideological ANES respondents reach about 73% accuracy versus a 60% baseline. More knowledgeable, engaged, older, educated, and richer respondents generally show larger gains. Matching CCES respondents to Senate demographics raises accuracy to about 79% from a 63% baseline but leaves an elite-public gap. Common-question comparisons and anonymous parallel surveys also retain the gap, supporting the authors' constraint interpretation over agenda or survey-context explanations (Sections 5–6).

## Limitations

The dimensionality conclusion concerns predictive performance under the specified model, observed agendas, and American samples; it does not prove that all political preferences have one true axis. Cell holdouts assess missing choices for represented actors and items, not generalization to new people or new issues. Binarization discards response detail, and substantial NPAT missingness complicates comparison. Predictive residuals do not identify their psychological cause. Demographic matching explains part of the public-elite difference; the comparisons are not randomized tests of all possible mechanisms. The small NPAT gain from a second dimension qualifies a blanket claim that additional dimensions never help.

Published online April 13, 2021; the journal issue is Political Analysis 30 (2022), 328–345. The supplied Markdown contains damaged notation; the summary uses intact model statements and reported prose results.

## Related Concepts

- [[concepts/ideological-constraint|Ideological Constraint]]: held-out predictive improvement from shared preferences.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: number of shared axes, distinct from their explanatory strength.
- [[concepts/item-response-theory|Item Response Theory]]: joint actor-item response framework.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: supplies the canonical quadratic-utility probit framework.
- [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]]: computational foundation for repeated model fitting.
- Converse (1964), “The Nature of Belief Systems in Mass Publics”: conceptual starting point for constraint as prediction across attitudes.
- Lauderdale, Hanretty, and Vivyan (2018), “Decomposing Public Opinion Variation into Ideology, Idiosyncrasy and Instability”: related distinction between systematic and idiosyncratic public attitudes.
