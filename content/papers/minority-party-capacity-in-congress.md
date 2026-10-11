---
title: "Minority Party Capacity in Congress"
type: paper
authors:
  - Andrew O. Ballard
  - James M. Curry
year: 2021
doi: "10.1017/S0003055421000381"
source_job_id: "cde377c1-3541-4c40-8a0a-ae3b185055ac"
tags:
  - legislative-politics
  - political-parties
  - congressional-agenda-setting
---

## TL;DR

Congressional minorities can influence legislation when the majority is constrained, the minority is cohesive, and the minority is motivated to legislate. Ballard and Curry examine substantive House bills and joint resolutions introduced in 1985-2006, finding that issue-specific combinations of these conditions predict floor consideration and enactment. Evidence is weaker after conditioning on House passage. Three legislative cases illustrate influence over policy content, including under unified government; the statistical findings are observational associations.

## Research Question

When can congressional minority parties shape the floor agenda, enactment, and policy substance despite the majority's procedural advantages?

## Motivation

Majority-centered accounts and explanations based on minority control of veto points leave variation across issues and bills underexplained. Majority disunity can create bargaining opportunities even in the House, but the minority must coordinate its votes and choose policy engagement over electoral opposition to exploit them.

## Contributions

- Develops a theory of [[concepts/minority-party-capacity|Minority Party Capacity]] combining opportunity, cohesion, and motivation.
- Constructs issue-specific party heterogeneity measures rather than assuming that aggregate ideological polarization captures every policy conflict.
- Examines agenda access, enactment, and policy substance separately, revealing differences across legislative stages.
- Complements [[concepts/conditional-party-government|Conditional Party Government]] by emphasizing minority cohesion alongside majority cohesion.

## Method

The quantitative study covers the 99th-109th Congresses, excluding nonsubstantive measures such as building namings and small land transfers. Floor access means receiving a final passage vote, regardless of its outcome; enactment means becoming public law. Logistic regressions model floor access, enactment among introduced bills, and enactment among bills already passed by the House.

The authors estimate separate W-NOMINATE positions for each of 20 Comparative Agendas Project major issue topics. Votes are pooled within two periods of stable House majority control: Democratic control in 1985-1994 and Republican control in 1995-2006. A member has a static position on each issue within each period. **Majority spread** and **minority spread** are the within-party standard deviations of those positions: greater majority spread proxies constraints, while lower minority spread proxies cohesion.

**Minority priority** proxies motivation under divided government. A bill receives this indicator when its policy subtopic, among 220 subtopics, appears in either State of the Union address during that Congress and the president belongs to the House minority's party. Models using this indicator cover seven of the eleven Congresses. Two-way and three-way interactions test how the conditions combine.

Controls include party median distance, chamber seat balances, White House control where applicable, overall majority unity, majority priorities, cosponsor proximity to the minority, related Senate legislation, election year, and sponsor characteristics including [[concepts/legislative-effectiveness|Legislative Effectiveness]]. Qualitative accounts draw primarily on CQ Magazine coverage and select cases with majority disunity, minority cohesion, and motivation to legislate.

## Experiments

These are observational regressions and illustrative case studies, not randomized experiments. Predicted probabilities below are the paper's reported model-based comparisons, with high and low spread defined as one standard deviation above and below the party median.

| Analysis | Sample | Reported evidence |
| --- | --- | --- |
| Floor access, Table 1 models 1-2 and Figure 3 | 58,181 bills | The majority-spread by minority-spread interaction is negative and significant at 1%. Bills dividing the majority and unifying the minority have about a 5% predicted chance of a floor vote, comparable to the reverse configuration. |
| Floor access with motivation, model 3 and Figure 4 | 37,705 bills under divided government | The three-way interaction is significant at 1%. The favorable constraint-cohesion pattern appears among minority-priority bills; no clear spread interaction appears among other bills. |
| Enactment, model 4 and Figure 5 | 37,705 bills under divided government | For minority-priority bills with a cohesive minority, predicted enactment is about 2% with high majority spread versus 1% with low majority spread. The three-way coefficient itself is not statistically significant at the table's reported thresholds. |
| Enactment conditional on House passage, model 5 and Figure 6 | 3,503 bills | Minority cohesion adds little apparent influence. Majority disunity is associated with nearly twice the enactment probability for minority-priority bills, regardless of minority cohesion; support for the full theory is partial. |

The authors report similar, if anything stronger, agenda results for minority-sponsored bills in the appendix. Those supplementary analyses are described in the supplied text but are not reproduced there.

Three cases connect bargaining conditions to policy substance:

- **K-12 education, 1999-2000:** Republican divisions and Democratic cohesion, supported by President Clinton, limited Republican reforms and enabled education spending gains.
- **NAFTA implementation, 1993:** A relatively unified and motivated Republican minority supplied crucial votes while the Democratic majority split. Republicans helped preserve the trade agreement negotiated under President Bush and obtained minor tax concessions despite unified Democratic government.
- **Voting Rights Act reauthorization, 2005-2006:** Unified Democrats helped defeat changes favored by a majority of Republicans and secured a largely unchanged 25-year extension under unified Republican government.

## Limitations

- Roll-call positions reflect strategic voting, party pressure, and agenda selection as well as preferences. Party spreads are noisy proxies for cohesion and constraints, not direct measures of bargaining leverage.
- Pooling votes within long majority-control periods assumes stable member positions and limits the study to 1985-2006. The evidence does not directly establish applicability to later Congresses.
- Presidential issue mentions capture only one source of minority motivation. The full quantitative interaction is tested under divided government, while unified-government support comes from selected cases.
- Associations between issue-level spreads and bill outcomes do not isolate causal effects. Floor access and enactment also do not directly measure how much policy content the minority changed.
- Cases are selected for favorable theoretical conditions and illustrate mechanisms rather than estimate their prevalence. Conditional-on-passage results offer only partial support, and individual interaction-coefficient significance should not be conflated with predicted-probability comparisons.
- The supplied Markdown contains duplicated introductory text and missing footnote bodies. This page uses the readable main text and Table 1 without reconstructing absent notes or supplementary results.

## Related Concepts

- [[concepts/minority-party-capacity|Minority Party Capacity]]: opportunity, cohesion, and motivation jointly shape policy bargaining.
- [[concepts/conditional-party-government|Conditional Party Government]]: related theory centered on majority cohesion and interparty separation.
- [[concepts/legislative-effectiveness|Legislative Effectiveness]]: sponsor-level advancement is a control here, distinct from collective minority influence.

## Related Papers

- [[papers/legislative-effectiveness-in-the-american-states|Legislative Effectiveness in the American States]]: related library work on partisan effectiveness gaps and majority cohesion across state legislatures; not a citation in this source.
- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: related library comparison of cohesion and coalition voting in a different institutional setting; not a citation in this source.
- Aldrich and Rohde (2000), "The Consequences of Party Organization in the House: The Role of the Majority and Minority Parties in Conditional Party Government": a theoretical antecedent discussed by the authors.
- Cox and McCubbins (2005), *Setting the Agenda*: the majority-centered procedural cartel account against which the paper frames its agenda-setting contribution.

Article: [DOI](https://doi.org/10.1017/S0003055421000381). Replication data and code, as identified in the source: [APSR Dataverse](https://doi.org/10.7910/DVN/3DRQOB).

[[index|Library home]]
