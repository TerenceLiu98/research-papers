---
title: "Optimizing the Measurement of Sexism in Political Surveys"
type: paper
authors:
  - Brian F. Schafner
year: 2022
doi: "10.1017/pan.2021.6"
source_job_id: "007cbe2c-c21a-4370-81f7-b03283b373fa"
tags:
  - survey-methodology
  - sexism
  - measurement
---

## TL;DR

A comparison of hostile, benevolent, and modern sexism items recommends a two- to five-item hostile sexism battery. Selected items combine strong factor loadings, prediction of gender discrimination in conjoint choices, and relatively low perceived political content. Shorter batteries retain similar predictive associations but distinguish respondents less precisely at the scale extremes.

## Research Question

Which sexism items efficiently measure prejudice toward women while predicting discriminatory choices and avoiding direct overlap with political outcomes?

## Motivation

Political surveys use inconsistent sexism batteries, limiting comparability. Long inventories consume scarce questionnaire time, while politically explicit items can overlap with the attitudes researchers want to explain.

## Contributions

- Evaluates items jointly on convergent validity, predictive validity, and perceived proximity to politics.
- Uses randomized gender cues in boss and politician conjoint choices as behavioral validation criteria.
- Selects nested short batteries using graded-response item information rather than survey length alone.

## Method

The primary Lucid survey includes 1,103 respondents answering the 22-item Ambivalent Sexism Inventory and four modern sexism items. Maximum-likelihood exploratory factor analysis with oblique rotation uses 1,072 observations. Hostile and modern items primarily share one dimension; benevolent sexism forms another. Respondents complete three paired conjoint trials in either a boss or congressional-representative setting. Gender is signaled through first names; politician party labels are held constant within respondents. OLS interactions test whether measured sexism conditions the female-name treatment effect, with clustered standard errors.

A separate Lucid survey of 833 American adults on May 26, 2020 compares randomly paired statements for how likely they are to occur in political debate. Each respondent makes two comparisons. Five hostile sexism items combine high loadings, predictive validity, and relative political distance. A graded-response model from [[concepts/item-response-theory|Item Response Theory]] ranks their information and constructs nested batteries (Section 8, Table 4):

| Battery | Items, identified by the paper's codes and paraphrased content |
| --- | --- |
| Two items | hs6: women controlling men to gain power; hs7: women exaggerating workplace problems |
| Three items | Adds hs8: women restricting committed male partners |
| Four items | Adds hs3: women being easily offended |
| Five items | Adds hs5: women insufficiently appreciating men's contributions |

These descriptions summarize item content; they are not a verbatim administration instrument.

## Experiments

Hostile, benevolent, and four-item modern sexism batteries have Cronbach's alpha values of 0.86, 0.76, and 0.48, respectively. Positively scored hostile items load at least 0.66 on the first factor. Reverse-worded items generally load less strongly.

In the pooled conjoint analysis, the female-name × hostile/modern factor interaction is −0.069 (SE 0.015); separate boss and politician estimates are −0.095 and −0.042. Benevolent sexism does not significantly condition gender effects in these tasks. This does not imply irrelevance to all outcomes: the paper reports some policy associations in supplementary analyses.

| Reduced battery | Female-name × sexism interaction | Cluster-robust SE |
| --- | ---: | ---: |
| Five items | −0.062 | 0.014 |
| Four items | −0.063 | 0.014 |
| Three items | −0.060 | 0.014 |
| Two items | −0.053 | 0.014 |

Table 5 uses 6,618 profile observations, not independent respondents. All four interactions are negative and statistically significant. The two-item estimate is about 15% smaller than the five-item estimate, but their difference is not statistically significant. Four- and three-item scores correlate 0.990 and 0.960 with the five-item score.

Published in *Political Analysis* 30, 364–380 (2022); first published online April 14, 2021. Replication materials are identified in the source as [Harvard Dataverse](https://doi.org/10.7910/DVN/WVP5LE).

## Limitations

The primary sample is demographically balanced but unweighted, and results do not establish generality across countries or survey contexts. Randomizing profile gender does not randomize respondents' sexism: predictive moderation is not a causal effect of changing sexism. Political distance reduces a particular measurement-overlap concern without establishing exogeneity. Nonsignificant differences between battery coefficients are not equivalence tests.

Short batteries lose resolution: nearly 11% of respondents receive the lowest two-item score and nearly 5% the highest. The supplied text reports inconsistent two-item/five-item correlations (0.872 in Table 4 versus 0.866 in prose), so neither is treated as uniquely authoritative. The author name above follows the supplied Markdown spelling. Supplementary reliability findings are reported by the article but were not independently examined here.

## Related Concepts

- [[concepts/hostile-sexism|Hostile Sexism]]: the prejudice and resentment dimension targeted by the recommended battery.
- [[concepts/item-response-theory|Item Response Theory]]: graded-response information guides short-form selection.

## Related Papers

- [[papers/does-conjoint-analysis-mitigate-social-desirability-bias|Does Conjoint Analysis Mitigate Social Desirability Bias?]]: examines reporting bias in conjoint designs, a distinct issue from using conjoint choices to validate an attitude scale.
- Glick and Fiske (1996), “The Ambivalent Sexism Inventory: Differentiating Hostile and Benevolent Sexism”: source of the inventory evaluated here.
- Swim et al. (1995), “Sexism and Racism: Old-Fashioned and Modern Prejudices”: foundational modern sexism measurement, discussed in the source.
