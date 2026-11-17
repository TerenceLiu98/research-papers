---
title: "Acquiescence Bias Inflates Estimates of Conspiratorial Beliefs and Political Misperceptions"
type: paper
authors:
  - Seth J. Hill
  - Margaret E. Roberts
year: 2023
doi: "10.1017/pan.2022.28"
venue: Political Analysis
tags:
  - survey-methodology
  - political-beliefs
  - measurement
---

## TL;DR

Across six surveys in the United States and China, reversing the key of political-belief questions substantially changes estimated endorsement and its relationship with ideology. Hill and Roberts propose randomized positive/negative question wording and statistical corrections for [[concepts/acquiescence-response-bias|Acquiescence-Response Bias]], conditional on symmetric bias across keys.

## Research Question

How much does a tendency to agree with survey assertions distort estimates of conspiratorial beliefs, factual misperceptions, and their demographic and ideological correlates?

## Motivation

Agree/Disagree, Yes/No, and True/False instruments can conflate substantive belief with a disposition to endorse assertions. Among 28 reviewed studies that asked about conspiratorial or false statements, 27 used these formats. If the disposition varies with ideology or education, it also contaminates estimated relationships between characteristics and beliefs.

## Contributions

- Documents wording sensitivity across 53 questions in six surveys, spanning rumors, conspiracies, democratic norms, and objective political facts.
- Shows that acquiescence varies across respondents and changes estimated ideological associations.
- Develops corrections for population means and covariate associations using randomized question keys.

## Method

Randomization occurs at the respondent–question level: each respondent receives a mix of original positive-keyed and negated negative-keyed items. Both responses are recoded toward endorsement of the same underlying proposition. Positive-keyed means agreement endorses the original claim, not that the statement is factually true or grammatically affirmative.

Section 5 models responses as $Y_i=Y_i^*+D_i\delta_i$, where $D_i\in\{-1,1\}$ indicates key, $Y_i^*$ is acquiescence-free belief, and $\delta_i$ is bias. Random assignment and symmetric average bias imply that the midpoint of the two key-specific means estimates mean belief; half their difference estimates average bias. Equivalently, regress $Y$ on an intercept and $D$.

For correlates, regress $Y$ on covariates, $D$, and their interactions. Covariate coefficients recover the modeled belief associations under the assumptions; interactions capture heterogeneity in bias. Alternatively, weighted least squares gives each key half the total weight, using $N/(2N_p)$ and $N/(2N_n)$ without survey weights. With poststratification weights, balance weighted totals and multiply the adjustment by the original weights. These are corrections of associations, not causal effects of ideology.

## Experiments

The six surveys use Lucid, Qualtrics, NORC, and Mechanical Turk samples. The December 2020 U.S. Lucid survey includes 2,055 respondents; the March–April 2021 China Qualtrics survey uses population-targeted quotas. Instruments include binary responses, Likert scales, and subjective probabilities, with and without accuracy incentives. Attention-check failures are excluded.

| Finding | Reported evidence |
| --- | --- |
| Wording sensitivity | 52 of 53 question comparisons show greater endorsement with the positive key. |
| Large individual-item gap | The FBI/Clinton email item yields 64% versus 22% endorsement after recoding. |
| Democratic norms | Acceptance of a narrow election loss is endorsed by 80% with original wording versus 52% with reversed wording. |
| Ideological alignment | Table 1 coefficients are 0.094 versus 0.069 overall, and 0.150 versus 0.083 for “Big Fake” headlines; the latter association is about 45% smaller. |
| Robustness | All 35 unambiguously negated items retain the positive-key advantage. |

The paper reports greater bias among very conservative and very liberal respondents, younger respondents, and those with lower numeracy or education. Monetary accuracy incentives do not eliminate the pattern. For half the questions plotted in Figure 2, significance of the very-conservative coefficient depends on wording. Descriptive endorsement analyses pool uncertainty with nonendorsement; the headline regressions instead code “don’t know” as 0.5. Wording gaps are not themselves identified overestimates relative to true belief: under the symmetric model, the correction from either key is half the gap.

## Limitations

The correction relies on an untested symmetry assumption. Logical equivalence of alternative wording is sometimes difficult, although the unambiguous subset supports the main pattern. There is no absolute benchmark for respondents’ true beliefs. U.S. and Chinese covariate regressions are not pooled; differences in familiarity and sampling limit cross-country interpretation. The tested multiple-choice alternative does not demonstrate superiority. The authors recommend reporting key-specific estimates alongside corrected estimates.

## Related Concepts

- [[concepts/acquiescence-response-bias|Acquiescence-Response Bias]] — an agreement tendency that can affect both prevalence estimates and covariate associations.

## Related Papers

- Allcott and Gentzkow (2017), *Social Media and Fake News in the 2016 Election* — source of refielded headlines and the ideological-alignment analysis.
- Oliver and Wood (2014), *Conspiracy Theories and the Paranoid Style(s) of Mass Opinion* — source of refielded conspiracy questions.
- Clayton et al. (2021), *Elite Rhetoric Can Undermine Democratic Norms* — source of democratic-norm items whose estimates change with key.

## Source

Published in *Political Analysis* 31, 575–590. [Article DOI](https://doi.org/10.1017/pan.2022.28). [Replication data](https://doi.org/10.7910/DVN/TVJCTX). Summary based on the supplied parsed article; supplementary analyses are described as reported in the main text.
