---
title: "Births are difficult to predict even with rich survey and full-population register data"
type: paper
authors:
  - Elizaveta Sivak et al.
year: null
source_job_id: "a08f9526-9a00-405a-ad40-55e3442cbcad"
tags:
  - fertility
  - life-outcome-prediction
  - administrative-data
  - survey-data
  - predictive-uncertainty
---

## TL;DR

In the Predicting Fertility in the Netherlands (PreFer) challenge, 147 researchers used rich longitudinal surveys and full-population registers to predict which Dutch residents aged 18-45 would have a child within three years. The best survey and register models reached F1 scores of 0.76 and 0.59, respectively; gradient-boosted trees beat or matched more elaborate sequence and language models, and the much larger register data did not outperform the survey. A reproductive-process simulation placed the corresponding predictive ceilings around 0.86-0.94 and 0.88-0.96, depending mainly on assumptions about contraceptive failure, indicating both substantial room for better data and methods and a non-trivial limit from chance.

## Research Question

How predictable is individual childbearing within a three-year horizon when researchers have unusually rich survey or full-population administrative data, and how much predictive error may remain because conception, pregnancy progression, and contraceptive failure are stochastic?

## Motivation

Failure to predict life outcomes can arise from incomplete theory, missing or poorly measured predictors, inadequate algorithms, limited samples, or irreducible chance. Fertility is a useful test because births are clearly observed, theoretically important predictors are available, and reproductive evidence permits an explicit simulation of some stochastic mechanisms. Comparing competitive models with a simulation-based ceiling helps separate current empirical performance from perfect prediction without claiming that the entire gap has one cause.

## Contributions

- Organizes the PreFer mass collaboration: 69 valid survey submissions from 41 teams and 11 valid register submissions from 12 teams, spanning logistic regression, tree ensembles, neural networks, transformers, and a fine-tuned language model.
- Compares high-quality LISS survey data with Dutch population registers covering about 5.88 million eligible residents, including evaluation on a shared linked holdout.
- Shows that direct fertility intentions carry unusually strong signal: a one-variable intentions baseline reaches F1 0.64, and removing intentions lowers the two examined survey models from 0.76 to 0.65 and from 0.71 to 0.54.
- Estimates a [[Predictive Ceilings for Life Outcomes|predictive ceiling]] by simulating time to conception, fetal survival, and births attributed to contraceptive failure.
- Tests alternative explanations through learning curves, model aggregation, linked-data experiments, prevalence adjustments, and an audit of potential register leakage.

## Method

### Prediction Challenge

The target is at least one new biological or adopted child during 2021-2023 among Dutch residents aged 18-45 at the end of 2020. Household-level splitting assigns 70% to training and 30% to holdout. The register population contains 5,878,530 people after excluding residents whose outcomes could not be reliably observed; the survey analysis has outcomes for 1,382 respondents, with 987 in training and 395 in holdout. The primary metric is positive-class F1, and threshold choice is part of model submission.

Survey inputs combine ten LISS modules and monthly background data from 2007-2020. Register inputs cover demographic, household, partnership, education, employment, income, assets, housing, neighborhood, and network information, mostly from 1995 onward. The strongest models for both sources are boosted-tree ensembles. The survey winner uses XGBoost with theory-guided features, time-shifted training examples, partner information, and constructed scales; the register winner uses CatBoost on roughly 100 manually selected variables.

### Predictive Ceiling

The simulation assumes that age, partnership status, and stable fertility intentions are fully known. Partnered agents intending a birth attempt conception, with agent-level fecundability and age at sterility drawn from empirical distributions; conception timing and fetal survival are stochastic. Births among partnered agents without positive intentions are randomly assigned according to an assumed contraceptive-failure share. Logistic regression using age, age squared, partnership, and intentions is trained and tested on simulated outcomes, with 100 bootstrap repetitions. A tuned random forest gives nearly identical estimates.

This construction is an assumption-dependent ceiling, not a decomposition that identifies every instance of aleatoric uncertainty. Some simulated variation may become predictable with genetic, environmental, or cycle-level data, while chance operating through health, employment, and partnerships is omitted.

## Experiments

The best register model obtains F1 0.59 (95% CI 0.589-0.593), precision 0.55, and recall 0.64. The best survey model obtains F1 0.76 (95% CI 0.68-0.83), precision 0.91, and recall 0.66. Transformer and fine-tuned LLM register submissions both reach F1 0.57, below the CatBoost winner. Averaging submissions or learning another ensemble over their predictions does not improve the winning scores.

The raw survey-register comparison is affected by positive-outcome prevalence, 22% versus 15%. After expanding survey outcomes through register linkage, the survey model reaches F1 0.68 on the original holdout; after also matching holdout prevalence, it reaches 0.63, still above 0.59. On the same linked survey holdout, register predictions have 0.03 higher mean squared error (95% CI 0.01-0.05). Combining register predictions with the survey model raises F1 from 0.63 to 0.68; follow-up experiments attribute the gain to both the full register sample and variables absent from the survey model.

With 1% of births attributed to contraceptive failure, the simulated ceiling is F1 0.963 for register-like data and 0.94 for survey-like data. At 17%, the ceilings fall to 0.881 and 0.86. Thus modeled reproductive chance explains a meaningful part of the distance from perfect prediction but not the full distance between submitted models and the ceiling.

Learning curves provide limited support for sample size as the dominant bottleneck. Matching the register training size to the survey lowers its winner to F1 0.50, but register performance changes little until severe reductions; expanding the survey training sample yields only modest gains. Twenty-one percent of positive register cases are missed by all five leading models, and recall declines for births occurring later in the three-year outcome window.

## Limitations

- The predictive ceiling depends on simplified, stable intentions shared by couples, immediate and continuous attempts among those intending a child, zero births for unpartnered agents, and uncertain estimates of contraceptive-failure births.
- Variation treated as stochastic can include unmeasured genetic, environmental, behavioral, or biological factors. Conversely, the simulation excludes chance affecting partnership, employment, health, and other pathways into fertility.
- Survey outcomes are selectively observed because of attrition, and their base rate differs from the register population. Prevalence adjustments and linked evaluation reduce but do not eliminate comparability concerns.
- The restricted register environment constrained compute, model development, and GPU access. The result does not establish that every future sequence model, language model, or richer feature set must underperform boosted trees.
- Medical, genetic, and some sensitive information was unavailable. The conclusion concerns the supplied Dutch data, 2021-2023 horizon, submitted methods, and F1-oriented decision thresholds.
- A household-type variable may contain information derived partly from early-2021 births for 0.6% of the register holdout. Excluding potentially affected cases lowers the winning F1 from 0.59 to 0.58, but the analysis cannot fully distinguish leakage from subgroup predictability.

## Related Concepts

- [[Predictive Ceilings for Life Outcomes]]

## Related Papers

- Salganik et al. (2020), *Measuring the predictability of life outcomes with a scientific mass collaboration*: motivates the mass-collaboration design for measuring achievable prediction.
- Lundberg et al. (2024), *The origins of unpredictability in life outcome prediction tasks*: frames missing information, sample size, and other sources of predictive limits.
- Sivak et al. (2024), *Combining the strengths of Dutch survey and register data in a data challenge to predict fertility (PreFer)*: describes the challenge design and data integration.
- Savcisens et al. (2024), *Using sequences of life-events to predict human lives*: supplies a related foundation-model approach to registry life-course sequences.

Source note: Synthesized from the supplied parsed Markdown for Cognitio job `a08f9526-9a00-405a-ad40-55e3442cbcad`. The focal paper's publication year, venue, DOI, and arXiv identifier are not stated in that source. The source lists more than 100 authors; the frontmatter abbreviates this as “Elizaveta Sivak et al.” while preserving the named lead author.

[[index|Library home]]
