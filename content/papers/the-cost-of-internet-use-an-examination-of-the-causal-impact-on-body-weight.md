---
title: "The Cost of Internet Use: An Examination of the Causal Impact on Body Weight"
type: paper
authors:
  - Miki Kohara
  - Yanni Shen
year: 2026
doi: "10.1007/s00191-026-00983-4"
tags:
  - internet-use
  - health-economics
  - instrumental-variables
  - panel-data
  - china
---

## TL;DR

Using 32,415 person-wave observations from the China Family Panel Studies (2010, 2014, and 2018), Kohara and Shen estimate that Internet use raises the probability of being overweight by 30.1 percentage points (SE 2.8 points). Their fixed-effects instrumental-variable design uses provincial broadband access ports per capita to instrument individual use. The authors interpret the estimate as local to people induced to go online by broadband availability; that interpretation depends on an exclusion restriction threatened by regional shocks and digital spillovers. Behavioral results suggest less sufficient sleep, more fried-food consumption, and more exercise, without establishing a simple causal mediation pathway.

## Research Question

Does individual Internet use increase the probability of being overweight among working-age adults in China, and how do the estimated effects vary across demographic groups and health behaviors?

## Motivation

Internet use may improve access to health information while displacing sleep or other activities and increasing sedentary time. Its net relationship with body weight is therefore ambiguous. Self-control, impatience, and other characteristics can influence both Internet use and health, making observational comparisons difficult to interpret causally. China's expanding broadband infrastructure supplies the variation used in this study.

## Contributions

- Applies [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]] to individual Internet use and overweight in a Chinese adult panel.
- Compares use indicators and duration measures, tests demographic and regional heterogeneity, and examines sleep, diet, and exercise as potential pathways.
- Provides a complementary subjective-well-being analysis and an illustrative extrapolation of medical costs associated with the estimated overweight effect.

## Method

The sample includes adults aged at least 20, with men younger than 60 and women younger than 50. These restrictions exclude retirement ages used by the paper; they do not define a sample of employed people only. The outcome is a binary indicator for BMI greater than 24.9, calculated from self-reported height and weight. Treatment indicates Internet use through computers or smartphones. The sample overweight rate is 24.6%; 39.6% report Internet use.

The outcome and first-stage specifications are:

$$
Y_{ijt}=\beta_0+\beta_1D_{ijt}+X_{ijt}'\beta_2+\alpha_i+\varepsilon_{ijt},
$$

$$
D_{ijt}=\gamma_0+\gamma_1Z_{jt}+X_{ijt}'\gamma_2+\alpha_i+u_{ijt},
$$

where $D$ is Internet use, $Z$ is provincial broadband ports per capita, and $\alpha_i$ is an individual fixed effect. Controls include age dummies, education, marital status, family size, rural residence, and baseline provincial GDP, unemployment, government budget, elderly population share, and health institutions interacted with linear time trends. Standard errors are clustered by province; the authors also report wild cluster bootstrap inference.

The identification argument attributes broadband deployment largely to geography and government planning. The authors interpret $\beta_1$ as a local average treatment effect for people whose Internet participation responds to broadband availability, conditional on the instrument's validity. Subgroup analyses instrument treatment interactions using corresponding interactions with the instrument. Separate recursive bivariate probit models examine overweight jointly with each health behavior, allowing correlated errors (Sections 3 and 4.5).

## Experiments

This is an observational panel study, not a randomized experiment. Table 2 compares specifications on the same 32,415 observations:

| Specification | Internet-use coefficient | Province-clustered SE |
| --- | ---: | ---: |
| OLS | 0.041 | 0.009 |
| Individual fixed effects | 0.037 | 0.011 |
| Fixed effects with IV | 0.301 | 0.028 |

These are probability-scale coefficients: 0.301 means 30.1 percentage points. The preferred model's first-stage F-statistic is 57.52. Its wild bootstrap p-value is displayed as 0.000, a rounded report rather than an exact zero.

**Alternative measures and robustness.** Table 3 reports 0.161 (SE 0.014) per additional daily Internet hour and 0.657 (0.070) for use of at least two hours daily, each on 32,350 observations. These are separate IV specifications, not an identified dose-response curve or a validated safe-use threshold. Table 4 reports 0.303 (0.026) using lagged broadband capacity, 0.271 (0.031) restricting ages to over 25, and 0.301 (0.028) adding a mover indicator.

**Heterogeneity.** Table 5 reports larger effects for men, those younger than 40, and those with fewer than nine years of schooling. The rural interaction is insignificant. The southern-region interaction is negative and significant only at the 10% level, suggesting weaker effects than in the north.

**Mechanisms.** Sufficient sleep means more than eight hours daily; fried-food intake covers the previous month, and exercise the previous week. Internet use has probit coefficients of -0.139, 0.257, and 0.491 in these respective behavior equations (Table 6). These are not marginal probability effects. The Internet coefficient in the overweight equation is insignificant in the sleep specification (0.034, SE 0.031). Fried-food intake has a negative overweight coefficient, contrary to a simple harmful-diet mechanism; the exercise coefficient is insignificant. The authors discuss short-run and compensatory behavior as possible explanations.

**Additional outcomes and extrapolation.** Appendix Table A2 reports an FE-IV effect of -0.454 (SE 0.084) on subjective well-being measured from 1 to 10; OLS and FE estimates are insignificant. Table 7 applies the overweight estimate to national Internet coverage and population, then combines implied additional overweight cases with expenditure assumptions. It reports medical costs of RMB 15.05-17.32 billion in 2010 and RMB 87.67-143.16 billion in 2018. These are back-of-the-envelope scenarios, not directly measured causal expenditure effects.

## Limitations

- Provincial shocks and digital services affecting non-users can violate the exclusion restriction even after trend controls. The paper acknowledges that the direction of resulting bias is unclear. A strong first stage does not resolve this concern.
- Province-level infrastructure does not capture within-province variation. The local estimate for broadband-responsive working-age adults does not automatically generalize to all users, retirees, children, or the national population used in the cost calculation.
- Self-reported anthropometrics may contain measurement error. Broad Internet-use measures do not distinguish detailed content, and the study cannot attribute effects to particular platforms or activities.
- The mechanism analysis supplies suggestive behavioral associations rather than established mediated causal effects. Sleep duration is measured, despite the abstract's reference to sleep quality; recent diet and exercise indicators may reflect responses to existing weight gain.
- The explanation that different stages of Internet development account for disagreement with earlier research is the authors' interpretation, not a directly tested cross-period mechanism.

## Related Concepts

- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]
- [[concepts/internet-use-and-health|Internet Use and Health]]

## Related Papers

The following relationships are described in the supplied paper:

- Chen and Liu (2022), "The effect of Internet access on body weight: evidence from China." Studies an earlier phase of Chinese Internet development and reports a weight-reducing effect, with a different treatment and identification design.
- DiNardi, Guldi, and Simon (2019), "Body weight and Internet access: evidence from the rollout of broadband providers." Reports increased body weight among white women in the United States.
- Cheng and Xu (2025), "The effect of broadband Internet on children's weight: evidence from China." Examines a younger population and reports increased overweight probability.
- Wang et al. (2021), "Health policy and public health implications of obesity in China." Supplies overweight-attributable expenditure assumptions for the illustrative cost calculation.

[[index|Library home]]
