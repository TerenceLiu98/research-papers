---
title: Estimating the extent and sources of model uncertainty in political science
type: paper
authors:
  - Michael Ganslmeier
  - Tim Vlandas
year: 2025
tags:
  - political-methodology
  - model-uncertainty
  - sensitivity-analysis
---

## TL;DR

Across four political science applications and over 3.6 billion coefficient–standard-error pairs, sampling and outcome measurement contribute more to variation in coefficient sign and significance than control-variable selection. Combining exhaustive specification enumeration with [[concepts/multiverse-analysis|Multiverse Analysis]] exposes sensitivity that covariate-only checks miss. The result concerns these observational applications, not all political science findings.

## Research Question

How much do empirical conclusions vary across modeling choices, and which choices account for the greatest sensitivity?

## Motivation

Extreme bounds analysis systematically varies controls, but researchers also choose samples, outcome measures, fixed effects, and standard errors. Testing these dimensions jointly can reveal significant associations in opposing directions that a narrow robustness exercise would overlook.

## Contributions

- Extends exhaustive covariate enumeration to a multidimensional specification universe.
- Separates the prevalence of sensitivity from the relative importance of its sources.
- Compares local significance switches, multinomial classification, and neural-network feature importance.
- Demonstrates restricted-model and random-subsampling analyses and provides accompanying R software.

## Method

Enumerate combinations of covariate subsets, unit samples, period samples, dependent-variable operationalizations, fixed-effect structures, and standard-error types. For each focal variable, classify estimates as positive significant, negative significant, or nonsignificant, using P < 0.10. Summarize each class's share of the specified model universe.

Three complementary analyses assess the sources of sensitivity:

1. A one-choice perturbation procedure draws a specification, alters one dimension, and records whether the significance class changes, repeating 50,000 times per case and independent variable.
2. Multinomial logistic regression predicts the significance class from binary specification indicators and estimates changes in predicted probabilities using a random sample of 250,000 coefficients.
3. Neural networks use the same sampled estimates, with grid-searched hyperparameters and SHAP importance scores. Accumulated local effects provide an additional feature-effect check.

The first procedure measures full class switches directly; the classifiers capture probability differences, with greater flexibility and lower interpretability for neural networks. These are descriptive or predictive assessments of specification sensitivity, not causal identification of substantive effects.

## Experiments

The applications cover welfare generosity in 33 countries, global democratization, regional public-good provision in China, and institutional trust in European Social Survey data.

| Analysis | Reported result |
| --- | --- |
| Welfare specification universe | 262,143 nonempty variable subsets × 1,512 other combinations = 396,360,216 regressions; approximately 3.57 billion coefficient–SE pairs |
| Welfare robustness | Most variables are significant in only 20–40% of estimates; nearly all have estimates in both directions (Figure 1) |
| Democratization and public goods | Substantial positive and negative significant coefficient shares (Figure 2) |
| Institutional trust | More stable associations for government satisfaction, education, and household-income feelings (Figure 2) |
| Sensitivity sources | Sampling and outcome operationalization generally dominate covariate choice across the three assessment approaches (Figures 3–4) |
| Neural classification | The main text reports precision, recall, accuracy, and F1 consistently above 90%, referring to supplementary evidence |

Welfare robustness checks remove models with focal-variable/covariate absolute correlations above 0.5 and models containing multiple partisanship variables, retain the best-fitting 10% by AIC, or weight estimates by a likelihood-ratio index. The central sensitivity findings persist. Randomly reduced model spaces approximate full-universe significance shares, offering a less expensive alternative to exhaustive computation.

## Limitations

The four selected cases do not establish representativeness across social science. Their classical regressions on observational data primarily assess correlational robustness. A specification universe still requires theoretical and statistical justification; exhaustive enumeration alone cannot ensure valid models. Significance shares depend on the chosen universe and threshold and are not probabilities that a substantive hypothesis is true. Full enumeration grows exponentially with the number of candidate covariates. Supplementary results are summarized from the main text because the supplied Markdown does not include the appendix itself.

## Related Concepts

- [[concepts/multiverse-analysis|Multiverse Analysis]]: jointly varies analytical decisions to characterize robustness.
- [[concepts/endogenous-research-design|Endogenous Research Design]]: addresses how researchers select analytical choices; the present study instead maps the consequences of varying those choices.

## Related Papers

- Leamer (1983), “Let’s take the con out of econometrics,” and Leamer (1985), “Sensitivity analyses would help”: foundations for systematic covariate sensitivity.
- Steegen et al. (2016), “Increasing transparency through a multiverse analysis”: motivates considering multiple analytical dimensions.
- [[papers/ideological-bias-in-the-production-of-research-findings|Ideological bias in the production of research findings]]: a complementary library study of how observed researcher preferences and combinations of design choices relate to divergent findings; not a citation in this paper.

Replication code and welfare-state data: [Zenodo archive](https://doi.org/10.5281/zenodo.15480536). The archive identifier refers to replication materials, not the article DOI.
