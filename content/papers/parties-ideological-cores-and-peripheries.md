---
title: "Parties' Ideological Cores and Peripheries: Examining How Parties Balance Adaptation and Continuity in Their Manifestos"
type: paper
authors:
  - Annika Werner
  - Fabian Habersack
year: null
doi: "10.1017/S0007123425101154"
tags:
  - party-competition
  - party-change
  - ideological-positioning
  - political-communication
  - manifesto-analysis
  - text-classification
---

## TL;DR

This paper argues that party manifestos should be analysed as containing an ideological core and a policy periphery rather than as homogeneous documents. Across 137 parties in 17 Western European countries from 1946 to 2022, core sections are more ideologically extreme and more stable than peripheral sections. The electoral-performance analyses are inconclusive: vote-share changes do not produce a consistent direct effect on extremity or positional change.

## Research Question

How do political parties adjust their positions and the distinctiveness of their policy stances across their ideological core and policy periphery?

## Motivation

Party-position research commonly treats one manifesto as one observation, even though manifestos contain statements with different relationships to party identity. The authors distinguish core policies that signal a party family's fundamental commitments from peripheral policies that address necessary or timely issues without being tightly tied to that identity. This distinction creates a way to study adaptation without assuming that every platform shift represents a change in the party's ideological identity.

## Contributions

- Defines a party-manifesto core as the policy area associated with the party family's ideological identity, with all other manifesto content treated as its periphery.
- Shows that parties take more extreme positions in their cores and change their peripheral positions more than their core positions.
- Demonstrates that the core--periphery distinction matters for niche and mainstream parties: niche parties have more extreme peripheral positions and are generally more cautious about positional change.
- Argues that party responsiveness, party--citizen congruence, and comparisons between manifesto, expert, and citizen measures should account for where within a platform a shift occurs.

## Method

The study uses Manifesto Project Corpus text from 17 Western European countries, covering 1946--2022 and retaining parties with at least three elections and at least 2 percent vote share. It assigns each manifesto quasi-sentence to the core or periphery of one of eight party families: Christian Democrat, Conservative, Green, Ethnic and Regional, Radical Left, Liberal, Radical Right, or Social Democrat. Green, ethnic and regional, radical-left, liberal, and radical-right parties are coded as niche; the remaining families are coded as mainstream.

For policy classification, the authors use Manifestoberta, a multilingual XLM-RoBERTa model fine-tuned on Manifesto Project annotations. Rather than retaining only one label per quasi-sentence, they keep the ten highest-probability categories and aggregate the probabilities within each core or peripheral section. Economic and cultural left--right positions are computed from weighted category shares. Ideological extremity is the Euclidean distance from the two-dimensional centre, while positional change is the Euclidean distance between successive elections and is analysed after log transformation. Models include country and election-date fixed effects, clustered standard errors, party type, electoral performance, incumbency, and economic and cultural salience controls.

## Experiments

The analysis supports the core--periphery distinction. In descriptive comparisons, economic cores are 14 percentage points farther from the centre than economic peripheries, and cultural cores are 22 percentage points farther away. Regression models show a positive and statistically significant core effect on combined ideological extremity across specifications (p < 0.001). Position-change models show lower change in core sections than in peripheral sections, with the core coefficient statistically significant in all but one specification (p < 0.01 in the significant models).

Niche parties do not have clearly more extreme cores than mainstream parties; instead, the interaction is explained by niche parties having more extreme peripheries. Niche parties are also generally more cautious about changing their positions, while mainstream parties show more flexibility in peripheral policy areas. Vote-share changes, including lagged measures and their interactions with core status, do not show a direct and automatic effect on positional change, and the reported extremity response to electoral fortunes is heterogeneous rather than systematic.

## Limitations

The measured positions can reflect changes in the salience of policies within the economic and cultural dimensions, not only changes in policy stance. The authors control for the salience of the two dimensions but cannot eliminate this possibility. The analysis is also limited to Western European parties with sufficient electoral histories and uses model-predicted policy classifications; the language model performs less well for very rare categories and non-European cases. Manifesto positions describe how parties present themselves, not necessarily their complete or enacted policy commitments.

## Related Concepts

- [[Ideological Core and Policy Periphery]]
- [[Party Issue Agendas]]
- Party competition
- Party change
- Political representation
- Manifesto-based party positioning

## Related Papers

- Habersack and Werner (2023), "How non-radical right parties strategically use nativist language: Evidence from an automated content analysis of Austrian, German, and Swiss election manifestos."
- Habersack (2025), "Carrots and sticks: How voter loyalty and electoral opportunities shape parties' policy priorities in Europe."
- Budge, Ezrow, and McDonald (2010), "Ideology, party factionalism and policy change: An integrated dynamic theory."
- Mair and Mudde (1998), "The party family and its study."
- [[The PARTYPRESS Database A New Comparative Database of Parties Press Releases]]
