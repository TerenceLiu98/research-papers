---
title: Geography, Uncertainty, and Polarization
type: paper
authors:
  - Nolan McCarty
  - Jonathan Rodden
  - Boris Shor
  - Chris Tausanovitch
  - Christopher Warshaw
year: null
tags:
  - political-polarization
  - political-geography
  - legislative-representation
---

## TL;DR

Ideologically moderate districts can contain sharply divided electorates. Across US state senate districts, greater within-district ideological heterogeneity is associated with a larger gap between Democratic and Republican legislators representing similar constituencies. A model of policy-motivated parties explains this pattern through uncertainty about the election-day median voter. Matching estimates put partisan divergence at 1.45 in high-heterogeneity districts versus 1.15 in low-heterogeneity districts (Table 2).

## Research Question

Why do districts with moderate average preferences elect polarized legislators, and does internal ideological heterogeneity predict partisan differences in representation beyond district average ideology?

## Motivation

District medians have a largely unimodal distribution even though legislator positions are sharply separated by party. Concentrating only on average preferences misses the distinction between a district populated by moderates and one whose opposing ideological groups average to the center. Suburban and geographically mixed districts exemplify the latter possibility.

## Contributions

- Connects within-district preference heterogeneity to candidate divergence through uncertainty about the decisive voter.
- Combines policy preferences from over 350,000 survey respondents with comparable state legislative roll-call ideal points.
- Distinguishes intradistrict divergence—how different parties would represent the same constituency—from sorting of parties across constituencies.
- Tests the heterogeneity relationship with multilevel regression, matching, and comparisons within districts represented by both parties.

## Method

Two policy-seeking parties commit to platforms on a single dimension. Voters prefer the nearer platform, and both parties share beliefs about the uncertain median voter. Under the model's assumptions, equilibrium platform separation is the inverse density at the median of that belief distribution. For a symmetric scale family, greater uncertainty increases separation.

The bridge to observable heterogeneity is sampling uncertainty: when few voters lie near the electorate's median, a poll estimates that median less precisely. Turnout fluctuations can further magnify uncertainty. The empirical standard deviation of voter preferences proxies this mechanism; it does not directly measure candidates' beliefs.

The study combines bridged survey ideal points with multilevel regression and poststratification estimates of district opinion. State senate districts balance respondent counts against the number of legislators available for analysis. Party-specific multilevel models relate legislator ideology to district ideology and heterogeneity, with census-division or state effects. Bias-corrected matching estimates average intradistrict divergence (AIDD), comparing high- and low-heterogeneity districts split at the national median. Additional analyses compare parties within the same district across time or within a year.

## Experiments

These are observational analyses, not randomized experiments. Table 1 covers unique legislators serving during 2003–2012.

| Table 1 estimate | Republicans | Democrats |
| --- | ---: | ---: |
| Heterogeneity coefficient | 0.44 | -0.32 |
| Standard error | 0.10 | 0.10 |
| Citizen ideology coefficient | 0.84 | 0.85 |
| Legislators | 1,501 | 1,322 |

Both heterogeneity coefficients have reported p-values below 0.01. Holding district opinion constant, a one-standard-deviation increase in heterogeneity predicts approximately 0.05 units of rightward movement for Republicans and 0.04 units of leftward movement for Democrats. The resulting 0.09-unit increase in divergence is about 24.2% of the mean within-state standard deviation of legislator ideology. The difference in the parties' heterogeneity effects is not statistically significant at conventional levels.

Table 2 reports matched AIDD of 1.27 overall (SE 0.02), 1.45 in high-heterogeneity districts (SE 0.04), and 1.15 in low-heterogeneity districts (SE 0.04). The authors describe the high-heterogeneity gap as roughly 25% larger. Within-district comparisons also show greater partisan divergence in more heterogeneous constituencies.

The text reports similar results for state lower chambers and the US House, alternative heterogeneity measures, and presidential vote share controls. Those supplementary analyses are described but their appendices are not included in the supplied Markdown.

## Limitations

- Matching and multilevel models do not eliminate omitted-variable bias or establish that uncertainty causes the observed relationship.
- Preference dispersion is an imperfect proxy for uncertainty about the median voter; the relationship depends on distributional and turnout assumptions.
- The main analysis concerns elected legislators, not the platforms of both competing candidates.
- The evidence does not establish that increasing district heterogeneity caused the historical rise in congressional polarization. Demographic changes motivate that hypothesis rather than identify it.
- The supplied text contains damaged mathematical typography and lacks explicit publication-year and identifier metadata. The year is left unset rather than inferred from references.

## Related Concepts

- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: uncertainty and policy motivation alter the incentives for median convergence.
- [[concepts/political-polarization|Political Polarization]]: separates within-district preference dispersion from legislative partisan distance.

## Related Papers

- [[papers/how-do-voters-matter-evidence-from-us-congressional-redistricting|How Do Voters Matter? Evidence from US Congressional Redistricting]]: complementary evidence on constituency composition, party selection, and incumbent responsiveness.
- Gerber and Lewis (2004), “Beyond the Median: Voter Preferences, District Heterogeneity, and Political Representation”: earlier analysis of preference distributions and representation in California.
- Calvert (1985), “Robustness of the Multidimensional Voting Model: Candidate Motivations, Uncertainty, and Convergence”: theoretical foundation for policy-seeking competition under uncertainty.
- Tausanovitch and Warshaw (2013), “Measuring Constituent Policy Preferences in Congress, State Legislatures, and Cities”: source of the bridged constituent preference measurements.
