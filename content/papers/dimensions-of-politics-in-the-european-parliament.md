---
title: Dimensions of Politics in the European Parliament
type: paper
authors:
  - Simon Hix
  - Abdul Noury
  - Gerard Roland
year: null
source_job_id: "8fb6f1c4-2165-4859-8754-a29e8cc6235e"
tags:
  - european-parliament
  - roll-call-voting
  - ideal-point-estimation
  - political-measurement
---

## TL;DR

Scaling European Parliament roll calls from July 1979 through December 2001 reveals a dominant left-right dimension and a weaker second dimension associated with government-opposition alignments and European integration. External expert and manifesto measures support the left-right interpretation both between and within European party groups. The second dimension is less stable: integration positions measured by experts become clearer predictors in later parliaments, while manifesto-based integration measures do not support that association in the pooled models.

## Research Question

How many dimensions organize European Parliament voting, what political conflicts do they represent, and how does their substantive meaning change across the first five elected parliaments?

## Motivation

MEPs belong to national parties, transnational party groups, and national constituencies. These overlapping affiliations could generate multiple voting cleavages. A spatial map alone cannot establish whether its axes represent ideology, national interests, integration preferences, or institutional alignments. The paper connects recovered voting positions to independently collected party measures to interpret those axes.

## Contributions

- Applies NOMINATE to the full collected roll-call record for 1979-2001, with standard participation and near-unanimity filters.
- Separates goodness of fit from substantive interpretation of [[concepts/ideological-dimensionality|Ideological Dimensionality]].
- Uses external national-party positions and institutional affiliations to explain both between-group and within-group variation.
- Compares pooled and parliament-specific interpretations and reports robustness to Optimal Classification.

## Method

The authors estimate MEP positions separately for each parliament using NOMINATE. They discard MEPs participating in fewer than ten roll calls in a parliament and votes on which more than 97% vote together. Fit is assessed using correctly classified voting decisions and aggregate proportional reduction in error (APRE), relative to a naive voting benchmark.

For substantive interpretation, the dependent variable is a national party delegation's mean position on each dimension in each parliament. There are 437 potential party-parliament observations; missing external positions reduce the pooled regression samples to 352, 288, or 271, depending on specification. External measures come from the Marks-Steenbergen expert surveys for 1984, 1988, 1992, 1996, and 1999 and the Manifestos Research Group. Manifesto measures distinguish combined, economic, and social left-right positions, alongside net pro-integration statements.

Institutional predictors indicate whether a national party was in government for most of the parliamentary term and whether it supplied a European Commissioner for all, roughly half, or none of the term. Pooled models include parliament indicators and successively add European party-group and country indicators; tables report robust standard errors. Party-group indicators test whether external positions explain differences within transnational groups as well as between them. Separate regressions by parliament assess changes in meaning over time.

## Experiments

The evidence is observational roll-call scaling and regression analysis.

| Parliament | Scaleable votes | Scaleable MEPs | One-dimensional correct classification | Two-dimensional correct classification | APRE, one / two dimensions |
| --- | --- | --- | --- | --- | --- |
| 1979-1984 | 787 | 500 | 86.0% | 91.5% | 46.9 / 67.6 |
| 1984-1989 | 1,690 | 612 | 88.6% | 92.4% | 52.9 / 68.6 |
| 1989-1994 | 2,269 | 586 | 89.9% | 91.8% | 54.8 / 63.5 |
| 1994-1999 | 3,360 | 716 | 87.8% | 90.0% | 48.5 / 58.0 |
| 1999-2001 | 1,914 | 644 | 87.5% | 89.9% | 51.2 / 60.5 |

Table 2 reports APRE on a percentage scale. The second dimension's classification gain falls from 5.5 percentage points in the first parliament to 2.4 in the fifth, with a minimum of 1.9 in the third. Thus its relative contribution declines overall, rather than monotonically. These are fitted classification statistics, not held-out predictive accuracy or percentages of preference variance explained.

For the first dimension, expert left-right coefficients remain positive and significant in every parliament with and without party-group indicators. In pooled Table 4, the expert-based model's adjusted $R^2$ rises from 0.70 to 0.87 when group indicators are added, and to 0.89 with country indicators. Manifesto-based economic and social left-right measures also retain significant associations in the pooled specifications.

For the second dimension, national-government participation is positive and significant in all nine pooled specifications (Table 5). Commissioner affiliation is significant before party-group indicators are added, but not afterward. Expert integration positions remain significant across pooled specifications, whereas manifesto integration positions are not significant in any. In Table 6, expert integration positions are significant in both the fourth and fifth parliaments with and without group indicators; government participation is significant only in the fourth parliament's specification without group indicators.

Returning MEPs' first-dimension correlations across consecutive parliaments range from 0.905 to 0.948; second-dimension correlations range from 0.642 to 0.813 (Table 3). Country indicators provide little systematic additional explanation after party characteristics. The authors report nearly identical substantive conclusions using Optimal Classification, although detailed robustness results are not reproduced in the supplied text.

## Limitations

- Roll calls cover roughly one third of votes in this historical setting and can be requested strategically. Complete roll-call coverage does not establish representativeness of all parliamentary decisions; see [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]].
- External positions are measured at the national-party level, not for individual MEPs. Early expert assessments are retrospective, and manifesto integration measures rely on relatively few statements. Their disagreement matters for interpreting the second axis.
- Independently measured covariates aid interpretation but do not establish causal effects of ideology or government membership. Weak country indicators do not exclude issue-specific national conflicts.
- The second dimension combines institutional and policy differences; it is not a consistently pure integration axis. Its declining fit contribution also does not establish that underlying political preferences became one-dimensional.
- The source reports 3,740 fourth-parliament roll calls in Table 1 but 3,739 in prose. The results above use the separately reported filtered counts in Table 2. Some footnotes and table notes are incomplete in the supplied Markdown.
- The supplied source does not state this article's publication year or stable identifier. These are left unspecified; the dates in the analysis describe data coverage.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes the number of useful voting axes from their substantive content.
- [[concepts/party-position-measurement|Party-Position Measurement]]: expert and manifesto measures provide external evidence for interpreting scaled positions.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: limits generalization from recorded decisions to the full legislative agenda.

## Related Papers

- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: cited companion study of cohesion and coalition patterns over the same historical period.
- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: related library reading on why low-dimensional voting fit need not identify low-dimensional preferences; not a citation in this source.
- [[papers/analysing-political-dynamics-in-the-new-european-parliament-political-cleavages-and-division-lines|Analysing political dynamics in the new European Parliament: Political Cleavages and Division Lines]]: later library comparison relating voting distances to expert party positions. Its period, aggregation, and distance method differ, so its integration-versus-left-right correlations are not a direct replication.

[[index|Library home]]
