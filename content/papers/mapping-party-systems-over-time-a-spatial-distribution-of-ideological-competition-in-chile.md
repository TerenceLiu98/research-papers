---
title: "Mapping party systems over time: a spatial distribution of ideological competition in Chile"
type: paper
authors:
  - Kenneth Bunker
year: 2026
doi: "10.1080/13569317.2025.2452179"
tags:
  - party-competition
  - political-measurement
  - chile
  - synthetic-data
---

## TL;DR

Bunker combines source-based left-right scores with simulations constrained by political families to map Chilean electoral competition from 1989 to 2023. The dataset covers 4,157 election-coalition-party combinations from 5,195 district-level contests across 27 elections. The resulting maps suggest fragmentation beginning around 2009, a leftward trend among left-leaning parties, and greater consolidation on the right. These are descriptive findings conditional on the original scoring rules; the simulations assess stability around those rules.

Published in *Journal of Political Ideologies* 31(3), 905-922 (2026), with online publication on 31 January 2025. [Article DOI](https://doi.org/10.1080/13569317.2025.2452179).

## Research Question

How can ideological positions be assigned across an entire multiparty electoral system, including coalitions, small parties, and independents, and used to track competition over time?

## Motivation

Common approaches to [[concepts/party-position-measurement|party-position measurement]] cover different subsets of political actors. Roll-call methods require legislative representation, while surveys and manifesto analysis may miss small or short-lived parties. Including district-level and lower-profile elections can reveal changes before they become visible in national legislative competition.

## Contributions

- Compiles electoral lists across multiple levels of Chilean government, including independent candidacies and changing coalition-party combinations.
- Combines a source-based scoring stage with repeated synthetic draws constrained by ideological families.
- Compares fixed and variable coalition-dispersion specifications and presents density maps, ideological trends, and vote-share-weighted visualizations.
- Identifies descriptive asymmetries in the timing and location of party-system fragmentation.

## Method

### Original Scores

All lists receive scores on a 0-10 left-right scale. Traditional coalitions are anchored to averages from CEP and CERC public opinion polls and checked against prior studies. Newer coalitions draw on available surveys and secondary sources, including press reports. Survey evidence takes precedence when sources conflict; ambiguous cases are reconciled through averaging or triangulation.

Parties are located within coalition-specific dispersion ranges. The fixed standard deviation model (FSDM), used for the main results, specifies a two-point deviation from the coalition mean. The variable standard deviation model (VSDM) allows greater dispersion as coalition composition and list size expand (note 26). Coalition-backed independents inherit coalition scores, party-backed independents inherit party scores, and fully unaffiliated independents receive 5.

### Synthetic Scores and Maps

The FSDM scores seed 1,000 simulations. Initial noise ranges from -0.25 to 0.25. Lists are grouped into seven political families, whose score means, standard deviations, minima, and maxima constrain simulated positions. Repeated synthetic scores are averaged for each observation. The paper describes this procedure verbally without supplying the full sampling function in the provided text.

Original and synthetic scores are compared through residual, influence, normality, and density diagnostics. High-density-region maps exclude fully unaffiliated independents to focus on party competition. A separate spatial map includes independents and scales circles by electoral vote shares; jitter distinguishes contests held in the same year.

## Experiments

### Coverage and Descriptive Findings

Table 1 reports 173,617,029 votes across the covered contests. Fully unaffiliated independents account for 3,378 of the 4,157 observations but only about 4% of votes. Thus, list counts and electoral weight give substantially different impressions of their importance.

| Analysis | Reported finding |
| --- | --- |
| Density map, Figure 1 | Increased party entry and fragmentation around 2009, preceding the 2015 electoral reform |
| Left-leaning lists, Figure 2 | Negative time trend, coefficient -0.04 with p < 0.001 |
| Right-leaning lists, Figure 2 | Nearly flat slope with no statistically significant time trend |
| Vote-share map, Figure 3 | Diversification on the left and concentration among fewer dominant parties on the right |

The author interprets the last pattern as asymmetric fragmentation and polarization. The nonsignificant right-wing time trend should be retained alongside that interpretation: consolidation does not itself establish increasing ideological extremity.

### Reported Robustness Checks

Synthetic-original differences are reported as less than one point in either direction. Regression diagnostics show no major outliers, and kernel density comparisons are described as similar. Note 29 reports meaningful positional shifts only when noise approaches or exceeds one point. Note 30 reports no significant difference across 100, 1,000, 10,000, and 100,000 simulations. The FSDM produces more cohesive distributions than the VSDM. These appendix results are described in the text and notes; the supplied Markdown does not contain the appendix tables or plots themselves.

## Limitations

The scores depend on heterogeneous sources, coalition-dispersion assumptions, and the assignment of all unaffiliated independents to the midpoint. Simulation consistency with those scores is an internal stability check, not independent evidence that the scores recover actors' true positions. Averaging simulations cannot by itself remove systematic source bias.

Despite discussion of multidimensional competition, the implemented scale is one-dimensional. Aggregate leftward movement can reflect both new entrants and repositioning of existing parties; the reported trend does not separate those mechanisms. Fragmentation before 2015 is descriptive evidence about timing, not a causal estimate of electoral reform effects.

The supplied source has unresolved reporting discrepancies: the abstract states 12 electoral systems, while Section 3 states seven and lists seven election types. The prose describes the center bin as 4.5-5.5, whereas Table 1 labels it 4.51-6.49. The missing appendix also prevents checking the exact regression time coding and full specifications behind the reported coefficient.

## Related Concepts

- [[concepts/party-position-measurement|Party-Position Measurement]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/effective-number-of-parties|Effective Number of Parties]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

- [[papers/party-system-polarization-and-the-effective-number-of-parties|Party system polarization and the effective number of parties]]: a complementary library paper relating party counts to weighted ideological dispersion; it is not cited by Bunker.
- Downs (1957), "An economic theory of political action in a democracy": spatial-competition foundation cited by the paper.
- Hooghe et al. (2010), "Reliability and validity of measuring party positions: The Chapel Hill expert surveys of 2002 and 2006": cited work on expert-survey measurement.
- Gamboa and Morales (2016), "Chile's 2015 electoral reform: Changing the rules of the game": cited institutional context for the fragmentation timeline.

[[index|Library home]]
