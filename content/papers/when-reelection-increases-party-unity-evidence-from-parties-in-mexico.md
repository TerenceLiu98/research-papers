---
title: "When Reelection Increases Party Unity: Evidence from Parties in Mexico"
type: paper
authors:
  - Lucia Motolinia
year: 2024
year_basis: acceptance year; publication year not specified in supplied text
doi: 10.1017/S0007123424000693
source_job_id: "0223f645-c2a8-4862-8732-750e6fd7794c"
tags:
  - party-unity
  - electoral-reform
  - mexican-politics
  - legislative-speech
---

## TL;DR

Mexico’s introduction of consecutive reelection increased legislators’ alignment with party leaders in speeches, while leaving already high roll-call unity statistically unchanged. The proposed explanation is that leaders control both renomination and the resources legislators need to cultivate personal votes, making electoral ambition a source of dependence on the party.

## Research Question

When does introducing reelection strengthen rather than weaken party unity?

## Motivation

Personal-vote accounts often assume politicians can independently obtain the resources needed to appeal to constituents. Where party leaders allocate committee positions, staff, funds, and ballot access, seeking a personal reputation can instead increase incentives to accommodate leadership.

## Contributions

- Develops a conditional account connecting personal-vote incentives to party control over particularistic benefits.
- Uses staggered implementation of Mexico’s 2014 reform to compare changes in legislative behavior.
- Combines 14,517 roll calls across fourteen states with over half a million speeches across twenty states during 2012–2018, distinguishing voting unity from public position-taking.

## Method

The difference-in-differences design compares the 2012/13–2015/16 and 2015/16–2017/18 legislative periods. Treated legislators could seek consecutive reelection in 2017/18; control legislators remained term-limited. The speech sample includes seventeen treated states and three controls: Puebla, Nayarit, and Mexico City. Treatment is eligibility, not actual reelection candidacy or victory.

Monthly voting unity is the proportion of roll calls on which a legislator agrees with their parliamentary coordinator. For speeches, correspondence analysis scales legislator-month word counts after removing procedural speeches and cleaning and lemmatizing text. Two dimensions are interpreted as government–opposition positioning and targeted versus general discussion of policy. Euclidean distance to the party leader measures divergence in expressed positions; it is not a direct measure of private ideological preferences.

Models include state and month-year fixed effects, with optional party effects. Inference uses 1,000 state-clustered block-bootstrap resamples. Identification requires parallel counterfactual trends; calendar fixed effects do not themselves absorb arbitrary state-specific trends.

## Experiments

The evidence is quasi-experimental, not randomized.

| Outcome or subgroup | Reported result |
| --- | --- |
| Roll-call agreement, Table 2 | No statistically significant effect; prereform agreement averaged 98.5%. |
| Voting absences, Table 2 | No statistically significant effect. |
| Speech distance, Table 3 | Baseline estimate −0.389, SE 0.076; 11,847 observations. The paper interprets this as almost 0.40 standard deviations less dispersion. |
| SMD versus PR legislators, Table 4 | Similar reductions: −0.409 versus −0.391. |
| Plurality versus other parties, Table 4 | −0.455 versus −0.370, consistent with greater leadership resource control. |
| Close versus non-close races, Table 5 | −0.721 versus −0.401. |
| Coalition versus non-coalition candidates, Table 5 | −0.343 versus −0.456. |

Pretreatment placebo estimates are reported as insignificant at the 95% level. The article reports robustness to party-centroid distances and estimators accommodating heterogeneous treatment effects. Additional checks address legislator composition, gubernatorial election timing, parliamentary group size, and leader movement. Speaking becomes approximately ten percentage points more likely, arguing against selective silence as the explanation for convergence.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/3VJTZG). Appendix robustness findings above are reported by the article; the appendix was not supplied separately.

## Limitations

Implementation timing partly reflects gubernatorial political incentives, so causal interpretation depends on the comparison design and parallel trends. Insignificant pretrends support but cannot prove that assumption. There are few state clusters, especially untreated states.

Resource allocation is a proposed mechanism supported by institutional description and subgroup patterns, not a directly identified mediation effect. Subgroup point-estimate differences alone do not establish statistically significant differences between effects. Speech similarity measures expressed positioning, and near-ceiling voting agreement limits sensitivity to further increases. Findings concern a setting with strong party gatekeeping, rather than all electoral reforms.

The supplied text records acceptance in October 2024 but does not identify the publication year; frontmatter uses the acceptance year explicitly.

## Related Concepts

- [[concepts/personal-vote|Personal Vote]]: incentives to build a reputation depend on access to resources.
- [[concepts/party-discipline|Party Discipline]]: leaders can condition resources and renomination on alignment.
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]: underlying agreement differs from public behavioral convergence.

## Related Papers

- [[papers/candidacy-eligibility-criteria-and-party-unity|Candidacy Eligibility Criteria and Party Unity]]: complementary library comparison of nomination-related screening and socialization with the resource-dependence mechanism here.
- [[papers/measuring-and-comparing-party-ideology-and-heterogeneity|Measuring and comparing party ideology and heterogeneity]]: cited work on measuring intraparty heterogeneity, relevant to distinguishing preference dispersion from behavioral unity.
