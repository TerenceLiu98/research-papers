---
title: Measuring and comparing party ideology and heterogeneity
type: paper
authors:
  - Royce Carroll
  - Hiroki Kubo
year: 2019
journal: Party Politics
volume: 25
issue: 2
pages: "245-256"
tags:
  - political-measurement
  - elite-surveys
  - party-cohesion
  - electoral-systems
---

## TL;DR

Carroll and Kubo jointly scale candidate survey responses to measure party elite positions and within-party ideological dispersion across 13 countries. Party medians correlate strongly with expert assessments. In an observational analysis of 78 parties, national control of nominations and stronger policy emphasis are associated with less heterogeneity. Intraparty electoral competition has no statistically significant overall association, but the association with district magnitude reverses across electoral contexts.

## Research Question

How can elite surveys provide comparable measures of party ideology and internal preference heterogeneity, and how does that heterogeneity relate to electoral rules, candidate selection, and party goals?

## Motivation

Manifestos and expert surveys describe party programs or reputations without directly measuring the distribution of candidates' preferences. Roll-call unity can reflect discipline even when members disagree. Measuring individual policy positions therefore permits a distinction between [[concepts/party-preference-cohesion|Party Preference Cohesion]] and coordinated legislative behavior.

## Contributions

- Applies [[concepts/blackbox-scaling|Blackbox Scaling]] to common issue questions in the Comparative Candidate Survey (CCS), recovering a shared latent space for 8,130 candidates in 13 election surveys.
- Summarizes party locations by medians and heterogeneity by within-party standard deviations, retaining 105 parties with at least five respondents.
- Compares party locations with external measures and examines institutional and organizational correlates of heterogeneity.

## Method

The data cover Australia 2007, Austria 2008, Belgium 2007, Denmark 2011, Finland 2011, Germany 2009, Greece 2007, Iceland 2009, Ireland 2007, Netherlands 2006, Norway 2009, Portugal 2011, and Sweden 2010. Fourteen shared policy questions span redistribution, economic intervention, immigration, social policy, and security. Joint scaling estimates respondent coordinates from issue responses using a low-dimensional representation with issue-specific weights and intercepts.

The first dimension explains 41.77% of variation and combines predominantly left-right economic content with security and immigration attitudes. The second explains 11.72% and is most associated with same-sex marriage. The substantive analyses use only the first dimension. Although the prose sometimes refers to variance, the operational heterogeneity measure is the within-party **standard deviation**.

Matching CCS parties to the Democratic Accountability and Linkages Project (DALP) yields 78 parties in 12 country-years for multilevel linear regressions with country-year random effects. Predictors include log median district magnitude, intraparty competition, national candidate selection, policy emphasis, expert-rated left-right position, and vote share. Greece, Finland, Ireland, and Denmark are coded as allowing intraparty competition. National selection is a binary measure based on whether a majority of experts report national leaders controlling nominations; policy emphasis averages expert ratings on a four-point scale.

## Experiments

This is an observational measurement and regression study, not a randomized experiment.

**External agreement.** Party medians correlate at 0.87 with the Chapel Hill Expert Survey (CHES), 0.89 with DALP, and 0.69 with the Comparative Manifestos Project (CMP). CMP is a manifesto measure, despite the source's Figure 4 caption grouping all three comparisons as expert surveys. These comparisons assess aggregate positions, not the accuracy of within-party dispersion.

**Heterogeneity regressions.** Selected Table 3 coefficients are shown below; parentheses contain standard errors.

| Predictor | All parties (78) | No intraparty competition (55) | Intraparty competition (23) |
| --- | --- | --- | --- |
| Log district magnitude | -0.123 (0.135) | -0.262 (0.103) | 1.155 (0.338) |
| Intraparty competition | -0.247 (0.315) | Not included | Not included |
| National candidate selection | -0.864 (0.318) | -0.676 (0.296) | -1.575 (0.892) |
| Party policy emphasis | -1.216 (0.397) | -1.302 (0.406) | -0.763 (0.795) |

In the full sample, national selection and policy emphasis are negatively associated with heterogeneity (both p < 0.01); neither intraparty competition nor district magnitude has a statistically significant coefficient. District magnitude is negatively associated with heterogeneity without intraparty competition (p < 0.05) and positively associated with it under competition (p < 0.001). Note 12 reports a significant interaction test but supplies no coefficient. Neither party size nor left-right position is significant in the full sample; rightward position is associated with greater cohesion in the noncompetitive subsample.

## Limitations

- Cross-national comparability depends on shared interpretations of issue questions. The authors cannot resolve differential item functioning with these data and recommend future anchoring items.
- Survey response rates range from 22.3% to 66.7%; within-party nonresponse bias remains possible. Several elections are excluded for missing common questions or low response rates.
- The first dimension captures only part of ideological variation. Its standard deviation does not characterize all forms of intraparty disagreement.
- The regression covers only 12 country-years, with 23 parties in the intraparty-competition subsample. Associations do not identify causal effects of electoral or organizational rules.
- The supplied Results text says national candidate selection increases heterogeneity, contradicting the negative Table 3 coefficient and the abstract and discussion. The summary follows the table and those consistent passages. The DOI in the supplied Markdown is corrupted and is omitted from metadata rather than guessed.

## Related Concepts

- [[concepts/blackbox-scaling|Blackbox Scaling]]
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]
- [[concepts/party-position-measurement|Party-Position Measurement]]
- [[concepts/personal-vote|Personal Vote]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]

## Related Papers

- Poole (1998), "Recovering a basic space from a set of issue scales": the scaling method used here.
- Saiegh (2009), "Recovering a basic space from elite surveys: Evidence from Latin America": cited precedent for elite-survey scaling.
- Carey and Shugart (1995), "Incentives to cultivate a personal vote: A rank ordering of electoral formulas": the theoretical basis for the conditional district-magnitude hypothesis.
- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: a library comparison studying behavioral cohesion through roll calls, rather than candidate preference dispersion; not a cited source in this paper.

[[index|Library home]]
