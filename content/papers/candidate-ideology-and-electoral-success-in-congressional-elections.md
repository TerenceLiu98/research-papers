---
title: Candidate ideology and electoral success in congressional elections
type: paper
authors:
  - Jamie L. Carson
  - Ryan D. Williamson
year: 2018
journal: Public Choice
volume: 176
pages: 175–192
url: https://www.jstor.org/stable/10.2307/48719916
tags:
  - congressional-elections
  - ideological-congruence
  - political-polarization
---

## TL;DR

Across U.S. House general elections, losing candidates tend to be more ideologically extreme than winners. In models of 1992–2012 elections, candidate–district ideological distance predicts lower chances of victory, while candidate extremism has no statistically significant penalty in the most extreme district quartile. The central distinction is between ideological extremism and constituency fit.

## Research Question

Are candidates less likely to win when their ideological positions diverge from those of their prospective constituencies, and does district extremism condition the electoral penalty for candidate extremism?

## Motivation

Roll-call measures largely restrict comparisons to candidates who have served in Congress, excluding persistent losers. Contribution-based ideology estimates allow the authors to examine unsuccessful candidates alongside winners and ask whether challengers' ideological mismatch helps explain incumbent success.

## Contributions

- Includes winning and losing candidates using Bonica's campaign-finance ideology estimates.
- Distinguishes distance from a constituency from distance from the ideological center.
- Compares electoral outcomes across experience levels and district-extremism quartiles.
- Offers an electoral-selection interpretation of polarization: elected representatives can be more moderate than the available losing alternatives even as Congress becomes more polarized.

## Method

The descriptive comparisons cover 1980–2012; logistic regressions analyze House general-election candidates during 1992–2012. Bonica's contribution-based CF scores place candidates and districts in a common ideological space. Absolute scores measure extremism, while candidate–district distance measures ideological incongruence.

The binary outcome is election victory. Controls include incumbency, prior elective experience among challengers, spending differences, candidate and district partisanship, gender, and year fixed effects. Amateurs are the experience reference category. Separate models divide districts into quartiles of absolute district ideology and estimate the relationship between candidate extremism and victory within each group.

## Experiments

This is an observational election study, with descriptive comparisons and regression robustness checks.

| Analysis | Reported finding |
| --- | --- |
| Descriptive comparisons, 1980–2012 | Losers are generally more extreme than winners in both parties; amateurs are more extreme than experienced challengers, who are more extreme than incumbents. |
| Pooled logistic regression, Table 2 | Ideological distance coefficient −2.89 (SE 0.13), with 7,073 observations. Incumbency and prior elective experience have positive coefficients. |
| District quartiles, Table 3 | Candidate-extremism coefficients are −1.70, −0.67, −0.68, and +0.32 from the most moderate to the most extreme quartile; the final estimate is not statistically significant. |
| Competitive-district restrictions, Table 4 | Negative distance coefficients persist under presidential-vote and district-partisanship definitions of competition. |
| District-clustered standard errors, Table 5 | The substantive pattern across district types persists. |

The text reports conditional incumbent victory probabilities of 0.99 at zero ideological distance, 0.56 at distance 1.5, and below 0.02 at distance 3. These are model predictions holding other conditions fixed, not observed win rates or causal treatment effects.

## Limitations

The regressions establish conditional associations rather than experimentally identified effects of repositioning. Competitive-district checks address concerns about strategic candidate entry but do not eliminate selection or unobserved confounding. Contribution-based ideology is a measurement strategy rather than direct observation of every voter's preferences.

The most extreme quartile's insignificant coefficient does not establish a positive benefit of extremism. The broader claim that institutions mitigate polarization is an interpretation of electoral selection, not a direct causal test of primary rules or redistricting. Senate and primary elections remain questions for future research.

The supplied source reports slightly different samples in main and appendix tables: Table 2 has 7,073 observations, whereas Table 4's full-sample specification has 7,075. Results above retain each table's own values. Publication year follows the 2018 journal issue; the article appeared online in December 2017.

## Related Concepts

- [[concepts/mass-elite-congruence|Mass-Elite Congruence]]: candidate–district distance is a point-based fit measure, distinct from comparing full voter and elite distributions.
- [[concepts/ideological-voting|Ideological Voting]]: proximity provides the behavioral rationale, although aggregate election outcomes do not directly identify individual voting mechanisms.
- [[concepts/political-polarization|Political Polarization]]: selection among candidates can moderate the elected pool relative to unsuccessful alternatives.

## Related Papers

- [[papers/a-new-measure-of-congruence-the-earth-movers-distance|A New Measure of Congruence: The Earth Mover's Distance]]: a complementary measurement perspective on distributional congruence, rather than candidate-level electoral success.
- Bonica (2014), “Mapping the ideological marketplace”: provides the contribution-based ideology measurement used here.
- Ansolabehere, Snyder, and Stewart (2001), “Candidate positioning in U.S. House elections”: the candidate-positioning study whose roll-call-based coverage this paper extends.
- Canes-Wrone, Brady, and Cogan (2002), “Out of step, out of office”: prior electoral-accountability evidence that motivates distinguishing extremism from constituency mismatch.

[[index|Library home]]
