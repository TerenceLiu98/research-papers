---
title: "Dimensions, Issues, and Bills: Appropriations Voting on the House Floor"
type: paper
authors:
  - Michael H. Crespin
  - David W. Rohde
year: null
source_job_id: "cb45d9ad-6b3f-42c9-8d52-04678a1c327b"
tags:
  - legislative-behavior
  - ideal-point-estimation
  - ideological-dimensionality
  - roll-call-voting
---

## TL;DR

Crespin and Rohde separately scale House votes on 13 appropriations jurisdictions across eight Congresses. Legislators' rankings are strongly correlated across jurisdictions, yet many move substantially, including members near chamber and party medians. Aggregate low-dimensional fit therefore does not guarantee that an overall ideological score identifies the relevant ordering for a particular bill. Defense appropriations exhibit especially pronounced departures.

## Research Question

Does the low dimensionality of aggregate congressional roll-call voting persist when votes are grouped by policy jurisdiction, particularly in the ordering of legislators and identification of medians?

## Motivation

Theories of legislative organization and gridlock rely on chamber medians, party medians, and pivotal legislators. Using an overall voting score for an issue-specific question assumes that the aggregate ordering remains informative on that issue. Legislators can instead represent different constituency interests, follow party priorities selectively, or hold personal positions that vary across domains. The paper examines this measurement problem without identifying which mechanism causes it.

## Contributions

- Uses recurring appropriations bills with stable subcommittee jurisdictions to assemble sufficiently large issue-specific vote sets.
- Compares ordinal positions across independently estimated scales, avoiding direct comparisons of their unanchored numerical scores.
- Documents changes near medians and throughout the membership using grouped ranks, pairwise correlations, and classification diagnostics.
- Distinguishes the adequacy of aggregate roll-call summaries from their suitability for bill-specific measurement.

## Method

The data cover House floor roll calls on appropriations bills in the 100th-107th Congresses, spanning 1987-2003. Table 1 reports 1,761 roll calls across 13 jurisdictions, including amendment, procedural, and final-passage votes. Jurisdiction totals range from 53 for Military Construction to 236 for Interior.

The authors concatenate each member's votes across Congresses and mark periods outside Congress as unavailable. They estimate W-NOMINATE separately for 14 matrices: one per jurisdiction and one pooling all appropriations. Because these fits lack common anchors, the analysis compares liberal-to-conservative rankings rather than numerical distances between scores.

For median comparisons, 437 members with scores on all 14 scales are divided into 11 approximately equal groups. Group 6 represents the chamber median group; groups 3 and 9 serve as Democratic and Republican median groups. The authors track these members' group placements on other issues. A separate analysis uses 10 groups, or deciles, to compare all 78 jurisdiction pairs; these deciles should not be confused with the 11-group median analysis.

Additional diagnostics include scree plots, Spearman rank correlations and their eigenvector decomposition, and two-dimensional classification rates compared with standard DW-NOMINATE estimates for the same votes.

## Experiments

This is an observational measurement study. The classification comparisons are reported fit diagnostics, not held-out forecasting results.

| Diagnostic | Reported result | Source |
| --- | --- | --- |
| Aggregate-median members on Defense | Mean group 6.2, standard deviation 1.9, range 2-9, despite starting in group 6 overall | Table 2 |
| Aggregate-median members across jurisdictions | Group-placement standard deviation at least 1 in 8 of 13 jurisdictions | Table 2 and accompanying text |
| Agriculture versus Defense | 42.0% of members differ by more than one decile | Table 5 |
| D.C. versus Labor | 10.0% differ by more than one decile, despite being a closely aligned pair | Tables 4B and 5 |
| All 78 jurisdiction pairs | 38 pairs have at least 25% of members more than one decile apart; another 16 have 20-24.9% | Table 5 discussion |
| Spearman correlations | 47 pairs fall in 0.90-1.00, 25 in 0.80-0.899, and 6 in 0.70-0.799 | Table 6 discussion |
| Defense classification | Separate W-NOMINATE: 88.3%; standard DW-NOMINATE: 55.8% | Table 7 |
| All appropriations classification | Pooled W-NOMINATE: 85.8%; standard DW-NOMINATE: 70.3% | Table 7 |

Chris Shays illustrates the substantive size of rank changes: he belongs to the aggregate median group but falls in group 10 on Agriculture and group 2 on Defense. The strong pairwise correlations thus coexist with consequential individual departures. Defense is also an outlier in the eigenvector visualization of the correlation matrix.

The authors interpret the pooled appropriations scree plot as suggesting at least three dimensions, unlike the sharp one-dimensional pattern for all votes in the 104th Congress. This is a visual diagnostic rather than a formal selection test. Their central recommendation is to use finer-grained measures when the research question concerns specific bills or pivots, while retaining aggregate scores for broad voting patterns.

## Limitations

- Pooling eight Congresses increases issue-specific sample sizes but can mix temporal change with cross-issue variation. Stable jurisdictions do not establish stable individual preferences.
- Military Construction has only 53 roll calls; the authors explicitly caution against strong inferences for that jurisdiction.
- Grouping ranks reduces reliance on exact estimated scores, but does not itself propagate estimation uncertainty or test whether every observed rank difference reflects a preference difference.
- Unanchored scales permit ordinal comparisons, not comparisons of absolute ideological distances across jurisdictions. The 437-member median analysis is a pooled complete-case subset, not a single contemporaneous House.
- Agenda control is offered as an explanation for why aggregate voting can hide cross-cutting interests; the analysis does not causally identify that mechanism or recover preferences on issues that never receive recorded votes.
- The source gives an acceptance date of 8 June 2010 but no explicit publication year, venue, or stable identifier. Publication year is therefore left null. Footnote markers lack their corresponding notes. The Energy-Defense share more than one decile apart is 39.2% in the Table 4A discussion but 39.0% in Table 5; this minor inconsistency is not resolved by the supplied text.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: aggregate low-dimensional fit can coexist with issue-dependent orderings.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: a related modeling approach to domain-specific positions; unlike that approach, this paper compares separately fitted ordinal scales.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: models departures from a general position using policy content, addressing a measurement concern exposed here.

## Related Papers

- Poole and Rosenthal (1997), *Congress: A Political-Economic History of Roll Call Voting*, and (2007), *Ideology and Congress*: cited foundations for NOMINATE and aggregate low-dimensional voting patterns.
- Hurwitz, Moiles, and Rohde (2001), "Distributive and Partisan Issues in Agriculture Policy in the 104th House": cited evidence of cross-cutting distributive votes within an issue area.
- Lewis and Poole (2004), "Measuring Bias and Uncertainty in Ideal Point Estimates via the Parametric Bootstrap": cited motivation for avoiding reliance on a single estimated median member.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: a library comparison using topic-weighted offsets and held-out voting evaluation; not a citation in the supplied paper.
- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: a library comparison that jointly estimates domain positions and their equality on a common scale; not a citation in the supplied paper.

[[index|Library home]]
