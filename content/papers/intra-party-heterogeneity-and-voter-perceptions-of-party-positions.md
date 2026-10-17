---
title: Intra-party heterogeneity and voter perceptions of party positions
type: paper
authors:
  - Michael Imre
year: null
tags:
  - party-cohesion
  - political-measurement
  - voter-perceptions
  - issue-salience
---

## TL;DR

Economic disagreement among a party's candidates is associated with greater distance between voters' perceived left-right positions and benchmark party positions. Across 27 European elections, a two-standard-deviation increase in economic heterogeneity predicts 0.51 points more distance on a 0-10 scale, against an average distance of 1.92. The association strengthens with parties' economic issue emphasis. Sociocultural heterogeneity has a smaller negative association in the main specification but changes sign under alternative benchmarks, preventing a general conclusion for that dimension.

## Research Question

Does intra-party preference heterogeneity explain voters' perceptions of party positions, and does the salience of the corresponding policy dimension condition that relationship?

## Motivation

Voters encounter candidates and party branches with different preferences, rather than a single uniform party position. They can also assign different weights to the positions they observe. Consequently, distance from a party-level benchmark need not simply indicate voter ignorance. The paper connects [[concepts/party-preference-cohesion|Party Preference Cohesion]] to perceptions while distinguishing internal disagreement from deliberate [[concepts/strategic-ambiguity-in-party-competition|Strategic Ambiguity in Party Competition]].

## Contributions

- Measures economic and sociocultural heterogeneity using candidate policy responses, independently of the voter perceptions being explained.
- Tests whether party issue emphasis moderates the association between internal disagreement and perceived left-right positions.
- Compares manifesto, expert, candidate, and mass-survey benchmarks, establishing a consistent positive economic association while exposing benchmark sensitivity for sociocultural heterogeneity.

## Method

The study links CSES modules 3-5, CCS waves 1-2, and Manifesto Project data using PartyFacts and manual code corrections. The main sample contains 176,444 party placements by 33,521 respondents concerning 85 parties in 27 elections across 13 European countries, representing 143 party-election combinations. Respondents placing every rated party at the same point are excluded.

The outcome is the absolute distance between a respondent's 0-10 left-right placement and a manifesto-derived party position. The latter uses Lowe et al.'s alternative scaling of manifesto categories, with endpoints estimated from the sample distribution before rescaling to 0-10. This is an operational benchmark for [[concepts/party-position-measurement|Party-Position Measurement]], not an independently known ideological truth.

Following Steiner and Mader (2019), candidate responses form additive economic and sociocultural indices rescaled to 0-1. Within-party standard deviations, themselves standardized to 0-1, measure heterogeneity. Three economic items and four sociocultural items are used; one sociocultural item absent from CCS wave 2 is omitted throughout. Scores are retained when at most one item per dimension is unavailable. Party salience is the percentage of manifesto quasi-sentences in the corresponding issue categories.

Multilevel linear regressions include random intercepts for respondents and elections. Model 1 contains controls; Model 2 adds both heterogeneity measures; Model 3 adds party salience and its dimension-specific interactions with heterogeneity. Controls include government participation, vote share, positional change, extremism, age, gender, education, party liking, voter-party ideological distance, and the effective number of electoral parties.

## Experiments

The evidence comes from observational survey and manifesto analyses. Main results are reported in Table 1 and Figures 2-3.

| Quantity | Reported result |
| --- | --- |
| Mean absolute placement distance | 1.92 points on the 0-10 scale |
| Economic heterogeneity, Model 2 | Coefficient 3.46, SE 0.05; two-SD increase predicts +0.51 points |
| Sociocultural heterogeneity, Model 2 | Coefficient -1.85, SE 0.10; two-SD increase predicts -0.15 points |
| Economic heterogeneity x party salience, Model 3 | 0.13, p < 0.001 |
| Sociocultural heterogeneity x party salience, Model 3 | -0.06, SE 0.01, p < 0.001 |
| Marginal R-squared, Models 1 / 2 / 3 | 0.073 / 0.101 / 0.111 |

The two-SD comparisons hold other covariates at their means or modes. Economic heterogeneity has the largest reported marginal effect in this comparison. Party size remains associated with placement distance after heterogeneity enters the model, questioning its adequacy as a proxy for internal disagreement.

**Alternative benchmarks (Appendix D).** In the noninteraction models, economic heterogeneity remains positive using expert, candidate, and average citizen placements, with coefficients 0.72, 1.02, and 0.28 respectively. Sociocultural coefficients become positive at 0.62, 0.63, and 0.44. These checks change some samples and controls: positional change is omitted, expert-based models cover 19 elections, and candidate-based models cover 26. Salience interactions are tested only for the expert alternative. Thus robustness concerns the direction of the economic association, not an invariant magnitude or identical specification.

**Additional checks (Appendix E).** Excluding elections with candidate response rates below 30%, and then also those with unknown response rates, preserves the positive economic association. Its interaction with district magnitude is negative, consistent with a weaker association in larger districts. A voter-salience analysis covers nine elections, 10,837 respondents, and 60,344 placements: economic heterogeneity x voter economic salience is 0.43 (SE 0.20, p < 0.05), while the sociocultural interaction is not significant. This distinguishes [[concepts/voter-issue-salience|Voter Issue Salience]] from party emphasis.

## Limitations

- Observational regressions do not establish that heterogeneity causes placement errors or directly verify which candidates voters observe. Intentional ambiguity and candidate disagreement remain distinct mechanisms.
- Manifesto and voter scales are generated differently. Aggregate voter placements correlate with manifesto scores at 0.67, but this does not establish a unique correct party position. Sociocultural findings are particularly sensitive to benchmark choice.
- Candidate self-reports may be selective: reported election-level response rates average 41.8% and range from 16.2% to 70.6%. Excluding low-response elections does not resolve possible within-party nonresponse bias.
- Data availability restricts coverage, item sets vary somewhat across elections, and voter-salience evidence relies on a reduced sample and coded issue mentions.
- Model 3 interactions require conditional interpretation. Although the text describes the economic association as positive at every salience level, the rounded coefficients imply a slope of -0.64 + 0.13 times economic salience, which is not positive at the reported minimum of 2.50. The supported summary is that the slope increases with salience.
- The supplied Markdown omits publication year and a paper-specific DOI; these are not inferred. The paper states that data are available on request.

## Related Concepts

- [[concepts/party-preference-cohesion|Party Preference Cohesion]]
- [[concepts/party-position-measurement|Party-Position Measurement]]
- [[concepts/strategic-ambiguity-in-party-competition|Strategic Ambiguity in Party Competition]]
- [[concepts/voter-issue-salience|Voter Issue Salience]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]

## Related Papers

- [[papers/measuring-and-comparing-party-ideology-and-heterogeneity|Measuring and comparing party ideology and heterogeneity]]: cited work on recovering internal preference dispersion from elite surveys.
- Steiner and Mader (2019), "Intra-party heterogeneity in policy preferences and its effect on issue salience: developing and applying a measure based on elite survey data": the source of the dimension-specific heterogeneity approach.
- [[papers/strategic-ambiguity-of-party-positions-in-multi-party-competition|Strategic Ambiguity of Party Positions in Multi-Party Competition]]: cited explanation of deliberate platform ambiguity, distinguished here from candidate preference dispersion.
- [[papers/party-ambiguity-and-individual-preferences|Party ambiguity and individual preferences]]: cited use of perceptual disagreement to measure ambiguity; this paper instead measures heterogeneity independently through candidate responses.

[[index|Library home]]
