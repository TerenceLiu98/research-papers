---
title: "Beyond the Median: Voter Preferences, District Heterogeneity, and Political Representation"
type: paper
authors:
  - Elisabeth R. Gerber
  - Jeffrey B. Lewis
year: 2004
source_job_id: "e172c325-718e-4e8e-b629-d6b6cf9c5326"
tags:
  - political-representation
  - median-voter-theorem
  - constituency-preferences
  - ideal-point-estimation
---

## TL;DR

Gerber and Lewis use 2.8 million individual ballots from Los Angeles County's 1992 election to estimate preference distributions in 55 legislative districts, then relate those distributions to legislators' 1993-1994 roll-call positions. District median preference predicts legislators much better in homogeneous constituencies than in heterogeneous ones. Once preference variance is modeled, the median remains influential in homogeneous districts, while legislative party position becomes relatively more important as heterogeneity rises.

## Research Question

Does the ideological heterogeneity of a legislative district condition how closely its representative's roll-call position follows the district median, and does party become more influential when district preferences are dispersed?

## Motivation

Empirical tests of median-voter representation commonly replace constituency preferences with demographics, election returns, surveys, or a single aggregate statistic. Those measures cannot directly distinguish a district's center from its dispersion. If heterogeneous districts give legislators more discretion or strengthen partisan constraints, treating all districts with the same median as equivalent obscures an important condition on representation. The paper combines [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]] with cross-chamber roll-call scaling to test that condition.

## Contributions

- Estimates district means, medians, and variances from individual proposition votes rather than relying only on aggregate demographic proxies.
- Separately estimates the median preferences of Democratic, independent, and Republican voting groups within districts.
- Places California Assembly, California Senate, and U.S. House legislators in a common NOMINATE space using three interest groups as cross-chamber anchors.
- Shows that preference variance conditions the association between the district median and legislative behavior.
- Distinguishes legislative-party position from the preferences of a legislator's partisan electoral constituency, while documenting why the two effects are difficult to separate in this sample.

## Method

The voter data contain all 2.8 million ballots cast in Los Angeles County in the 1992 general election, including statewide propositions and four partisan candidate contests. The authors partition voters by geography and partisan voting pattern. Voters supporting at least three same-party candidates are assigned to that partisan subgroup; the remainder are classified as independents.

For proposition $j$, a quadratic spatial utility model with normally distributed shocks implies

$$
\Pr(V_{ij}=1\mid\theta_i)=\Phi(\alpha_j+\beta_j\theta_i).
$$

Within each subdistrict-party group, ideal points are modeled as normally distributed. The likelihood integrates over individual ideal points to estimate item parameters and each group's mean and variance. District distributions are finite mixtures of these fitted subgroup distributions; their medians are obtained numerically. This is an application of the framework summarized in [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]].

Legislator positions come from nonunanimous 1993-1994 roll calls in the California Assembly, California Senate, and U.S. House. The League of Conservation Voters, Chamber of Commerce, and AFL-CIO supply common voting records across the three chambers and anchor a joint NOMINATE scaling. The first dimension classifies 89.7% of roll-call choices; adding two dimensions raises classification to about 91.3%.

The final analysis consists of four district-level OLS regressions for 55 districts. The dependent variable is the legislator's first-dimension NOMINATE score. Predictors include district median preference, the median NOMINATE score of the legislator's chamber-party delegation, an interaction between district median and preference variance, and the median preference of co-partisan district voters.

## Experiments

### Preference Measurement

Estimated district median preferences range from -1.00 to 1.02, while within-district preference variances range from 1.41 to 3.10. District demographics and Clinton vote share explain substantial variation in the estimated medians, but they do not fully reproduce the preference distributions. Republican median preferences are especially poorly predicted by demographics alone in these 55 districts.

### Representation Models

With district median preference as the only predictor, its coefficient is 0.87 (standard error 0.15) and $R^2=.37$. Adding chamber-party ideology raises $R^2$ to .92; party ideology has a coefficient of 1.12 (0.06), while the median coefficient falls to 0.09 (0.07).

The main specification adds median preference interacted with district variance. Median preference is again positive, 0.75 (0.28), and the interaction is negative, -0.29 (0.12), with $R^2=.93$. The result implies that the association between the district median and the legislator weakens as preference dispersion increases. It does not imply that heterogeneity itself has an independently estimated level effect, because the reported model includes variance through the interaction.

Adding the partisan electorate's median leaves the interaction similar at -0.30 (0.12), but partisan preference is small and statistically insignificant at -0.12 (0.15). Chamber-party ideology remains large. The authors caution that the two party measures correlate at .94 and that auxiliary $R^2$ values exceed .97, so the specification cannot cleanly identify whether partisan influence comes from the legislature or electorate.

## Limitations

- The analysis is observational and cross-sectional. The interaction identifies a conditional association, not a causal effect of making a district more heterogeneous.
- The sample contains 55 Los Angeles County districts observed around one election, limiting geographic and temporal generalization.
- Proposition-based voter preferences and legislators' NOMINATE scores are separately normalized latent scales. Only directional or monotonic relationships are interpretable; coefficient equality cannot represent literal voter-legislator proximity.
- The voter model assumes one-dimensional spatial choice, conditionally independent proposition votes, normal subgroup distributions, sincere voting, and stable item response functions across groups.
- Partisan subgroups are inferred from candidate votes rather than party registration or self-identification.
- The common legislative scale assumes the three interest groups occupy stable positions across chambers. Roll calls also reflect agenda selection, strategy, and party pressure in addition to policy preferences.
- The high collinearity of chamber-party ideology and partisan-voter preference prevents a clean attribution of the reported partisan effect.

## Related Concepts

- [[concepts/electoral-responsiveness|Electoral Responsiveness]]: distinguishes changes in representation from the selection and behavioral channels through which voters may matter.
- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: estimates constituency location and dispersion from sparse individual choices.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: supplies the classical median-convergence benchmark whose empirical scope the paper tests.
- [[concepts/ideological-voting|Ideological Voting]]: connects latent positions to observed electoral and legislative choices.

## Related Papers

- [[papers/estimating-voter-preference-distributions-from-individual-level-voting-data|Estimating Voter Preference Distributions from Individual-Level Voting Data]]: develops the group-distribution estimator applied to the ballot data here.
- [[papers/how-do-voters-matter-evidence-from-us-congressional-redistricting|How Do Voters Matter? Evidence from US Congressional Redistricting]]: later evidence separating party replacement, candidate selection, and incumbent responsiveness after constituency changes.
- Levitt (1996), "How Do Senators Vote? Disentangling the Role of Voter Preferences, Party Affiliation, and Senator Ideology": a cited decomposition of constituency, party, and individual influences.
- Kalt and Zupan (1990), "The Apparent Ideological Behavior of Legislators: Testing for Principal-Agent Slack in Political Institutions": cited evidence connecting constituency heterogeneity to unexplained legislative positioning.
- Goff and Grier (1993), "On the (Mis)Measurement of Legislator Ideology and Shirking": cited study of heterogeneity and differences between same-state senators.

[[index|Library home]]
