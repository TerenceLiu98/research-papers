---
title: "How the refugee crisis and radical right parties shape party competition on immigration"
type: paper
authors:
  - Theresa Gessler
  - Sophia Hunger
year: 2021
doi: "10.1017/psrm.2021.64"
tags:
  - party-competition
  - immigration
  - political-communication
  - text-as-data
---

## TL;DR

During the 2015 refugee crisis, mainstream parties increased immigration attention without generally adopting radical-right positions. Monthly press-release measures from Austria, Germany, and Switzerland show positive contemporaneous associations between radical-right and mainstream-party attention, with weaker and heterogeneous positional responses. Attention largely subsided after the crisis.

## Research Question

How do an external crisis and radical-right challengers jointly shape mainstream parties’ immigration emphasis and policy positions over short time intervals?

## Motivation

Election-based snapshots can miss both rapid agenda shifts and their subsequent reversal. The paper separates the decision to engage with an issue from the decision to accommodate, oppose, or retain distance from a challenger’s position.

## Contributions

- Extends mainstream–niche party strategy theory into a two-step account of issue emphasis and positional response.
- Constructs monthly immigration attention and position measures from routine party press releases.
- Shows that salience responsiveness predates the crisis, persists afterward, and need not imply positional convergence.

## Method

Section 2 describes press releases collected from party headquarters and parliamentary groups from January 2013 through March 2018, with up to 63 months per party. The abstract instead describes 2013–2017; the detailed methods window is used here. The authors report approximately 120,000 releases overall.

A small immigration and integration dictionary identifies relevant releases. Monthly salience is their share of all party releases. Validation uses more than 750 randomly selected, author-annotated releases; the dictionary reportedly outperforms earlier dictionaries and performs comparably to an SVM classifier.

Wordscores estimates immigration positions using election-campaign reference positions assigned to the corresponding election-month press releases. Preprocessing removes stopwords and rare words, stems tokens, and selects immigration-relevant vocabulary using keyness. Position estimation includes parties with more than 100 immigration releases.

Arellano–Bond dynamic panel models exclude radical-right parties as outcome units and include lagged outcomes, concurrent and lagged radical-right attention or positions, asylum applications, radical-right polling, and Google Trends attention to refugees. The pooled regression sample contains 646 party-months across 14 mainstream parties. Country-specific crisis periods are defined using above-average refugee searches: July 2015–July 2016 in Austria, August 2015–November 2016 in Germany, and August 2015–February 2017 in Switzerland.

## Experiments

This is an observational comparative study, with descriptive trajectories and country, period, and party-family regression comparisons.

| Result | Reported evidence |
| --- | --- |
| Concurrent salience association | Pooled coefficient 0.16, robust SE 0.04; Austria 0.32 (0.04), Germany 0.06 (0.04), Switzerland 0.23 (0.05). Germany is not statistically significant. |
| Salience across periods | Coefficients before, during, and after the crisis are 0.22, 0.15, and 0.12; the last is significant only at the 10% level. |
| Center-right responsiveness | Additional concurrent salience association 0.14 (0.06), with a lagged interaction of 0.10 (0.05). |
| Positional response | Pooled concurrent coefficient 0.00 (0.03); Germany shows an adversarial association of −0.08 (0.03), while the crisis-period pooled association is positive, 0.16 (0.07). |

Tables 2–3 supply these estimates. Most parties’ positions remain comparatively stable, and the pooled center-right positional interaction does not support general accommodation. Descriptive attention increases are followed by substantial declines for most mainstream parties. The crisis raises baseline attention without uniquely creating the competitive relationship.

## Limitations

- Contemporaneous observational associations cannot fully separate challenger influence from shared events or reciprocal responses.
- Monthly models may miss slower positional adjustments; the three German-language cases differ in coalition politics and radical-right party histories.
- Press releases measure party-controlled communication rather than policy implementation or media coverage. Wordscores depends on reference texts and vocabulary.
- The supplied text contains an apparent reversal in its description of serial-correlation test rejections while claiming the Arellano–Bond assumptions are satisfied. The referenced appendix is not included here, so those diagnostics cannot be independently resolved from this input.
- Corpus totals and date descriptions differ across parts of the supplied text; the reported headline corpus size should not be treated as a reconciled count of Table 1.

## Related Concepts

- [[concepts/party-issue-agendas|Party Issue Agendas]]: routine communication reveals short-term shifts in attention.
- [[concepts/party-issue-salience|Party Issue Salience]]: emphasis can change independently of policy position.
- [[concepts/party-position-measurement|Party-Position Measurement]]: Wordscores supplies a separate immigration stance measure.

## Related Papers

- [[papers/the-partypress-database-a-new-comparative-database-of-parties-press-releases|The PARTYPRESS Database]] extends this study’s immigration-attention application to a broader country sample.
- Meguid (2005), “Competition between unequals,” provides the mainstream-party strategy framework adapted here into separate salience and position decisions.

The year above records first online publication, 15 November 2021, as stated in the supplied article.
