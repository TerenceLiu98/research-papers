---
title: "Measuring party positions and issue salience with mass media and manifesto data: Comparing PolDem with Manifesto Project data"
type: paper
authors:
  - Theresa Gessler
  - Swen Hutter
year: 2026
tags:
  - party-competition
  - political-measurement
  - issue-salience
---

## TL;DR

PolDem newspaper coverage and Manifesto Project data give broadly convergent party positions on economic, cultural, and European integration issues, but substantially weaker agreement on issue salience within each domain. Agreement depends on what communication source and level of aggregation researchers measure. Published in *Party Politics* (2026), 1–14.

## Research Question

How closely do parties’ positions and issue priorities in mass-mediated election campaigns correspond to their election manifestos, and which issue, party, and contextual characteristics predict divergence?

## Motivation

Manifestos express party-controlled programs with both internal and external audiences. Newspaper coverage reflects journalists’ selection, competitors’ interventions, and campaign events. Neither source is a gold standard: their convergence tests whether different manifestations of party competition support similar measurements.

## Contributions

- Introduces an expanded PolDem dataset covering 111 campaigns in 15 European countries, from the 1970s through 2022, with more than 240,000 core sentences.
- Compares four harmonized issue domains across media and manifesto data, extending earlier comparisons beyond European integration and Northwestern Europe.
- Separates pooled correlations from within-domain agreement and models relative salience divergence.

## Method

PolDem samples two newspapers per country during the two months before elections, excluding editorials and opinion pieces. Newspaper selection differs by region: quality/tabloid combinations in Northwestern Europe and center-left/center-right combinations elsewhere. Chronological sampling distributes observations through campaigns. Coding generally covers the headline, lead, and first paragraph; short articles or articles without clear paragraph structure are capped at 20 sentences. For early elections, the observation window begins at the election announcement (notes 5–6).

Core-sentence analysis codes relations between actors and issues or between actors, rather than treating grammatical sentences as indivisible units. Directions range from opposition to support, with intermediate categories used sparingly. Roughly two-thirds of observations are actor–issue relations. The data offer 17 broad and 105 detailed issue categories. Reported reliability exceeds 0.90 for aggregated issue domains and party affiliations after training and monitoring.

The comparison maps categories to economic, new cultural, European integration, and political issues (democracy, corruption, and related institutional questions). It retains 2,016 party–election–issue combinations for 149 parties across 98 elections. France is excluded because PolDem covers presidential campaigns while the manifesto data cover parliamentary elections. Unmatched parties and cases with fewer than 30 observations are removed.

Linear regressions use absolute log salience ratios:

$$
D = |\ln(S_{\mathrm{Manifesto}}/S_{\mathrm{PolDem}})|.
$$

This treats reciprocal proportional discrepancies equally; zero salience cannot enter the measure. Eight specifications add issue salience, party visibility, incumbency, ideological extremeness, vote share, nicheness, fragmentation, and polarization.

## Experiments

Table 3 reports the following correlations for the matched comparison:

| Domain | Position | Salience |
|---|---:|---:|
| Pooled domains | 0.57 | 0.60 |
| Economic | 0.58 | 0.18 |
| European integration | 0.54 | 0.35 |
| New cultural | 0.63 | 0.38 |
| Political | 0.18 | 0.33 |

The high pooled salience correlation partly reflects differences between domains; it does not establish close agreement about which parties emphasize a given domain. Political positions have little manifesto variation because parties generally endorse democracy and good government, whereas media coverage differentiates them more.

In Table 4, non-economic domains show larger relative salience divergence than economic issues. Greater public salience predicts less divergence. Visibility and vote share have negative associations in separate specifications, but vote share is not significant in the joint models. Nicheness remains positively associated with divergence in the full model (0.204, SE 0.064). Polarization also has a positive coefficient (0.043, SE 0.019), indicating greater divergence. Fragmentation is not statistically significant. Model 8 uses 1,669 observations and has R-squared 0.111; incumbency is significant only at the 10% level, and extremeness loses significance.

## Limitations

- Newspaper selection, historical availability, and different regional sampling strategies constrain source comparability. Two outlets do not represent every communication channel.
- Matching democracy and corruption positions is difficult because manifesto categories are often unidirectional or substantively ambiguous. Alternative mappings reportedly preserve the broad conclusion.
- Excluding sparse observations, unmatched parties, and zero-salience ratios restricts the analyzed population. Regression associations do not identify causal effects.
- The supplied text contains conflicting polarization descriptions: its abstract says divergence is larger in less polarized settings, while Table 4 and the conclusion support greater divergence in more polarized settings. The results paragraph also inconsistently describes its positive divergence coefficient as convergence. This summary follows the table and conclusion.
- Table 3 gives a European-integration position correlation of 0.54, while prose gives 0.55. The table value is retained here. The DOI is visibly corrupted in the supplied Markdown and is omitted rather than reconstructed.
- Note 1 distinguishes the 111-campaign version analyzed here from the then-public 83-campaign release; the expanded release was scheduled with the special issue.

## Related Concepts

- [[concepts/party-position-measurement|Party-Position Measurement]]: source-specific observations require separate validity assessments for positions and priorities.
- [[concepts/party-issue-salience|Party Issue Salience]]: party-controlled emphasis and media-visible emphasis can diverge systematically.

## Related Papers

- [[papers/party-positions-from-wikipedia-classifications-of-party-ideology|Party Positions from Wikipedia Classifications of Party Ideology]]: another source-based measurement study, using Wikipedia classifications and expert benchmarks instead of campaign newspapers and manifestos.
