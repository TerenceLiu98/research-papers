---
title: Party ambiguity and individual preferences
type: paper
authors:
  - Danielle Martin
year: null
tags:
  - party-competition
  - strategic-ambiguity
  - voting-behavior
  - political-methodology
---

## TL;DR

Across election surveys in eight European democracies, greater ambiguity in a voter's ideological distance to a party is associated with lower party sympathy, particularly among politically interested voters. Ambiguity is also associated with a shorter perceived distance, suggesting a competing route to greater sympathy. These observational results concern party evaluations rather than actual electoral gains.

## Research Question

Does party ambiguity reduce individual party sympathy, and is that relationship more negative among voters with greater political interest?

## Motivation

Parties may benefit electorally from broad appeals even when individuals dislike uncertain options. Aggregate electoral success and individual preferences therefore need separate analysis. Moreover, a party's imprecision on different policy dimensions need not create the same uncertainty for every voter.

## Contributions

- Defines ambiguity at the voter-party level as the standard deviation of ideological distance to a distribution of perceived party positions.
- Uses a two-dimensional policy space to preserve differences in how party-position dispersion affects differently located voters.
- Introduces constrained resampling to attenuate distortions from political knowledge and projection of preferred parties toward voters' own positions.
- Separately examines party sympathy, perceived proximity, and moderation by political interest.

## Method

The surveys cover Austria 2013, Belgium 1995, Denmark 2011, Germany 2013, Ireland 2002, the Netherlands 2012, Switzerland 2007, and the United Kingdom 2010. Country-specific principal component analyses of respondents' self-placements on at least three issues define two-dimensional spaces. Applying the same loadings to respondents' party placements gives a distribution of positions for each party.

For voter position $z_v$ and distributed party position $Z_p$, the ambiguity measure is

$$
A_{vp}=\operatorname{SD}\!\left(\lVert z_v-Z_p\rVert_2\right).
$$

Two voters equally far from a party's mean can have different ambiguity scores if the party's dispersion is larger along one policy dimension. This operationalization assumes that disagreement across respondents approximates uncertainty relevant to an individual voter; it does not directly elicit that voter's subjective distribution.

The author excludes placements judged to invert the ideological scale and draws 100 samples with replacement, constraining supporter composition and political-knowledge distributions. The procedure equalizes knowledge distributions across parties' supporters and makes supporter shares more uniform, while retaining a distinction between large and small parties. Ambiguity is computed for every voter-party pair from each sample and then averaged over samples.

Party-sympathy regressions use voter-party observations, restrict the analysis to respondents who voted, and include individual and country random effects. The paper describes sympathy on a 0-10 scale. Controls include respondent-perceived Euclidean distance, government and single-issue-party status, age, gender, and education. An additional model adds political interest, scaled 0-1, its interaction with ambiguity, and political knowledge. A separate regression explains perceived distance while controlling for distance to the mean perceived party position, termed "objective" distance in the paper.

## Experiments

These are observational survey analyses. Sample sizes below count voter-party pairs, not distinct voters. Parentheses contain reported standard errors.

| Analysis | Ambiguity-related coefficient | Observations |
| --- | --- | --- |
| Sympathy, Table 2 Model 1 | -0.721 (0.047), p < 0.001 | 51,110 |
| Sympathy, Table 2 Model 3, full controls | -0.819 (0.049), p < 0.001 | 49,274 |
| Perceived distance, Table 3 | -0.449 (0.037), p < 0.001 | 58,031 |
| Sympathy, Table 4, political interest = 0 | -0.471 (0.082), p < 0.001 | 48,061 |
| Ambiguity x political interest, Table 4 | -0.645 (0.115), p < 0.001 | 48,061 |
| Sympathy with mean-position distance, appendix Model 3 | -0.122 (0.052), p < 0.05 | 62,766 |

Table 3 implies that a one-standard-deviation increase in ambiguity (0.44) corresponds to approximately 0.20 units less perceived distance; perceived distance has a standard deviation of 2.85. The author interprets this proximity association as a possible positive indirect route to sympathy alongside the negative conditional association in Table 2. The regressions do not establish a causal mediation decomposition.

In Table 4, the estimated ambiguity slope becomes more negative with political interest. Even the reference group at zero interest has a negative coefficient, so this result does not demonstrate that low-interest voters benefit from ambiguity.

The paper reports similar results when omitting each country in turn. Ambiguity and perceived distance correlate at 0.40, with reported variance inflation factors between 1.23 and 1.27 for these terms. Replacing perceived distance with distance to the mean party position preserves the negative sign but substantially reduces the coefficient; the sample also changes. The appendix's comparison with van der Eijk's agreement measure is generally negative as expected, but almost flat for Belgium.

## Limitations

- Cross-sectional survey associations and constrained resampling do not eliminate endogeneity or identify deliberate strategic ambiguity. Disagreement may reflect heterogeneous information or projection as well as party communication.
- The measure assumes voters recognize the uncertainty represented by other respondents' placements. Collective disagreement and individual subjective uncertainty are distinct quantities.
- Country-specific issue availability, omitted issues with extensive missing data, and the two-dimensional representation constrain comparability. The selected issues are assumed to capture the main political agenda.
- The outcome is party sympathy among voters, not vote choice, strategic voting, or aggregate vote share. Political interest is not the same construct as issue-specific salience.
- The appendix describes a 0-3 constructed preference ranking for Belgium and different original rating scales elsewhere. The supplied Markdown omits footnote bodies needed to fully reconstruct harmonization and some implementation details. It also supplies no publication year or paper DOI; neither is inferred here.

## Related Concepts

- [[concepts/strategic-ambiguity-in-party-competition|Strategic Ambiguity in Party Competition]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
- [[concepts/party-position-measurement|Party-Position Measurement]]
- [[concepts/voter-issue-salience|Voter Issue Salience]]: a distinct moderator of ambiguity responses, useful for comparison with general political interest.

## Related Papers

- [[papers/strategic-ambiguity-of-party-positions-in-multi-party-competition|Strategic Ambiguity of Party Positions in Multi-Party Competition]]: cited by Martin; models leaders' incentives to balance voters and party members. Its manifesto-dispersion measure differs from Martin's voter-specific distance dispersion.
- [[papers/who-refuses-ambiguity-voters-issue-salience-and-the-electoral-effect-of-party-position-ambiguity|Who refuses ambiguity? Voters' issue salience and the electoral effect of party position ambiguity]]: a related Wiki study of issue-specific expert disagreement and voting propensity, whereas Martin studies respondent placements, party sympathy, and general political interest.

[[index|Library home]]
