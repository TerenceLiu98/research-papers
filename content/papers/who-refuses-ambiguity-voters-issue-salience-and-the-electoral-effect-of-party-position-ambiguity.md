---
title: "Who refuses ambiguity? Voters' issue salience and the electoral effect of party position ambiguity"
type: paper
authors:
  - Kyung Joon Han
year: 2021
doi: 10.1057/s41295-021-00263-4
tags:
  - party-competition
  - strategic-ambiguity
  - issue-salience
  - voting-behavior
---

## TL;DR

Across the 2009 and 2014 European Election Studies, ambiguous party positions on the economy and immigration are associated with lower voting propensity among respondents who name the corresponding issue as their country's most important problem. The main model finds no statistically significant association among other respondents, so the predicted benefit of ambiguity for low-salience voters is not supported.

## Research Question

Does the electoral consequence of a party's ambiguous position depend on how salient that issue is to an individual voter?

## Motivation

Ambiguity can preserve policy flexibility, accommodate conflicting preferences, or reflect internal disagreement. Yet voters who prioritize an issue may require clear information about both a party's position and its likely policy commitments. Evaluating ambiguity in multidimensional party competition therefore requires distinguishing voters' priorities and parties' positions, emphasis, and clarity on particular issues.

## Contributions

- Develops an issue-specific account of heterogeneous voter responses to party position ambiguity.
- Links individual issue salience and party-specific voting propensities to expert measures of party positions, ambiguity, and emphasis on the economy and immigration.
- Finds support for the predicted penalty among issue-salient voters, but not for the predicted gain among other voters.

## Method

The observational analysis combines the 2009 and 2014 European Election Studies (EES) with the Chapel Hill Expert Survey (CHES). Each observation is a respondent-party pair. The outcome is the respondent's stated propensity to vote for that party on a 0-10 scale, rather than an observed vote. Separate binary salience indicators identify whether the respondent names the economy or immigration as the country's most important problem.

Party ambiguity is the average of expert-rating standard deviations across three items per issue: public services versus tax reduction, market regulation, and redistribution for the economy; immigration policy, immigrant integration, and ethnic minorities for immigration. Party positions and emphasis are corresponding averages of CHES ratings. Expert disagreement is a proxy for ambiguity, not a direct observation of deliberate strategic blurring.

Ordered logistic regressions cluster standard errors by respondent. The main specification interacts ambiguity with voter salience and also interacts party emphasis with voter salience. Controls include position proximity on both issues, gender, age, political interest, prior party vote share, the effective number of parties, their interaction, and governing-party status. The baseline uses CHES waves preceding the EES waves; an alternative timing check matches CHES 2010 to EES 2009.

## Experiments

These are observational regression analyses. Table 1 Model 4 contains 91,454 respondent-party observations, not 91,454 distinct respondents.

| Model 4 term | Economy coefficient (SE) | Immigration coefficient (SE) |
| --- | --- | --- |
| Position ambiguity | -0.01 (0.02) | -0.02 (0.01) |
| Ambiguity x voter salience | -0.09 (0.03), p < 0.01 | -0.14 (0.05), p < 0.05 |
| Party emphasis x voter salience | 0.10 (0.01), p < 0.01 | 0.12 (0.03), p < 0.01 |

These coefficients are on the ordered-logit scale, not probability changes. Figure 1 reports significantly negative conditional ambiguity coefficients for voters who prioritize the relevant issue, and nonsignificant coefficients for other voters. Figure 2 holds other variables at their means: moving ambiguity from its 10th to 90th percentile reduces the predicted probability of answering 10 from approximately 0.07 to 0.04 for issue-salient respondents, for either issue. The reported 42.9% relative reduction corresponds to about three percentage points, and concerns the highest propensity category rather than actual vote share.

The paper reports similar main findings when separating EES waves, using OLS, changing CHES timing, and adding salience interactions with supporter division, issue competence, and party family. Those supplementary tables are not included in the supplied Markdown. As an auxiliary measurement check, party left-right ambiguity correlates with respondents saying they cannot locate a party in EES 2009 (r = 0.1794); this is indirect evidence about perceived uncertainty.

## Limitations

- Observational associations do not isolate a causal response to deliberately chosen ambiguity or establish the proposed credibility and policy-expectation mechanisms.
- Expert disagreement may reflect uneven information or bias, including greater knowledge of larger parties. It is distinct from a voter's own uncertainty and from manifesto inconsistency.
- Naming one national problem provides a binary priority measure, not a continuous measure of personal issue importance. Voting propensity is not realized electoral behavior.
- The predicted positive association among low-salience voters is unsupported; nonsignificance does not establish an exactly zero effect.
- Evidence concerns two issues and two EES waves in the paper's Western European setting. The supplied text omits footnote bodies and supplementary details, so a complete country list and some measurement details cannot be recovered here. The year records the stated online publication date, 6 October 2021.

## Related Concepts

- [[concepts/voter-issue-salience|Voter Issue Salience]]
- [[concepts/strategic-ambiguity-in-party-competition|Strategic Ambiguity in Party Competition]]
- [[concepts/party-position-measurement|Party-Position Measurement]]

## Related Papers

- [[papers/strategic-ambiguity-of-party-positions-in-multi-party-competition|Strategic Ambiguity of Party Positions in Multi-Party Competition]]: cited by Han; models how ambiguity helps leaders balance voters and party members and measures manifesto dispersion. Han instead studies issue-specific expert disagreement and variation in voter responses by salience.

[[index|Library home]]
