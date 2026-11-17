---
title: "Meritocracy as Authoritarian Co-Optation: Political Selection and Upward Mobility in China"
type: paper
authors: [Hanzhang Liu]
year: 2023
doi: 10.1017/S000305542300120X
tags: [authoritarian-politics, meritocracy, social-mobility, redistribution]
---

## TL;DR

Opening civil-service recruitment to competitive examinations can co-opt citizens through perceived opportunities for advancement. Liu finds that eligibility when China introduced provincial examinations increased college graduates’ perceived mobility and reduced demand for redistribution. The evidence concerns perceptions and attitudes, not demonstrated improvements in actual mobility or regime survival.

## Research Question

Can meritocratic political recruitment stabilize authoritarian rule by offering ordinary citizens a credible chance of advancement, even when few receive government jobs?

## Motivation

Accounts of authoritarian co-optation commonly emphasize immediate rents, offices, or policy concessions. China’s combination of high inequality and limited redistribution motivates examining whether recruitment institutions can instead shape expectations about future socioeconomic gains.

## Contributions

- Identifies a mechanism of [[concepts/authoritarian-co-optation-through-mobility|Authoritarian Co-Optation through Mobility]] that reaches potential applicants beyond successful recruits.
- Connects entry-level political selection to mass redistributive preferences, extending approaches centered on elite bargaining or bureaucratic competence.
- Combines spatial-cohort variation in exam eligibility with exploratory evidence about government-career preferences.

## Method

Provincial implementation of the National Civil Service Examination system occurred between 1999 and 2009. Implementation dates come from official documents adopting the principle that all entries require examination. The treatment indicates whether respondents were younger than 35 at introduction in their province, giving them at least one opportunity to compete; it does not indicate exam participation or success.

The main analysis pools the 2010–2013 Chinese General Social Survey, focusing on college-educated respondents aged 18–60. A generalized difference-in-differences model includes province, cohort, and survey-year fixed effects, with standard errors clustered by province–cohort. Retrospective mobility is current minus recalled status ten years earlier; prospective mobility is anticipated status ten years ahead minus current status. Both are subjective measures.

Two-stage least squares instruments perceived mobility with eligibility at introduction to estimate effects on attitudes. This requires eligibility to influence attitudes only through perceived mobility. Narrower age windows improve comparability but do not independently establish that exclusion restriction.

A separate logit analysis uses the 2009 Beijing College Students Panel Survey: 4,752 students at 15 universities. Years since exam introduction in the home province proxy institutionalization; outcomes measure preferences for government workplaces and civil-service careers.

## Experiments

These are observational analyses, not randomized experiments.

| Reported estimate | Coefficient (SE) | Interpretation |
| --- | --- | --- |
| Eligibility → retrospective mobility, full sample | 0.323 (0.086), N = 4,623 | Higher perceived past mobility |
| Eligibility → prospective mobility, full sample | 0.325 (0.091), N = 4,612 | Greater optimism about future status |
| Eligibility → redistribution preference, reduced form | −0.194 (0.092), N = 2,666 | Less support for taxing the rich to help the poor |
| Instrumented retrospective mobility → redistribution preference | −0.595 (0.284), N = 2,653 | Lower preference on a five-point scale, conditional on IV assumptions |

Table 1’s prospective coefficient remains positive after controlling for current eligibility (0.240, SE 0.091). Table 2 finds no statistically significant reduced-form or IV effects on perceived political influence, participation rights, or trust in central government, local government, and cadres. Thus, reduced redistributive demand does not establish general attitudinal support for the regime.

Reported robustness checks include narrower age windows, placebo introduction dates shifted by five years, alternative controls, and exclusions addressing migration and postgraduate eligibility exceptions. In the narrowest IV window, the first-stage F statistic falls to 6.95, compared with 14.20 in the full sample.

Table 3 associates longer implementation with stronger government-career preferences, especially among students without a parent who is a state official. Adjusted logit coefficients near 0.10 imply roughly 10% higher odds per additional year, not a ten-percentage-point increase in probability. This analysis offers exploratory mechanism evidence rather than a causal test.

## Limitations

Actual recruitment-linked mobility outcomes are unavailable. Retrospective status assessments may capture changing perceptions rather than realized advancement. The main identification strategy relies on comparability across province–cohort groups; the IV analysis additionally requires an exclusion restriction and is weaker in the narrowest window. Career-preference evidence is observational and comes from students attending Beijing universities. Fiscal capacity and sustained credibility of recruitment constrain the proposed mechanism. Regime stability is a theoretical implication rather than a measured outcome.

## Related Concepts

- [[concepts/authoritarian-co-optation-through-mobility|Authoritarian Co-Optation through Mobility]]: credible advancement opportunities can temper opposition without immediate rewards to every participant.
- [[concepts/relative-intergenerational-mobility|Relative Intergenerational Mobility]]: distinguishes population-level openness across generations from this paper’s subjective individual mobility measures.
- [[concepts/outcome-based-meritocracy|Outcome-Based Meritocracy]]: a distinct allocation concept; Liu studies access and credibility of rule-based recruitment rather than treating past success as a pure measure of talent.

## Related Papers

- Bénabou and Ok (2001), “Social Mobility and the Demand for Redistribution: The POUM Hypothesis”: cited foundation connecting expected advancement to redistributive preferences.
- Lazarev (2007), “Political Labor Market, Government Policy, and Stability of a Non-Democratic Regime”: cited account of loyalty sustained by deferred access to rent-paying positions.
- Rosenfeld (2021), “State Dependency and the Limits of Middle Class Support for Democracy”: cited comparison concerning actual state employment; Liu extends attention to opportunities to obtain it.

The source identifies the article with a 2023 copyright date, used here as the year. Replication data: https://doi.org/10.7910/DVN/R1S5RP.
