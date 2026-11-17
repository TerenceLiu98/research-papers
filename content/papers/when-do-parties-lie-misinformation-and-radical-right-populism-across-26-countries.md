---
title: "When Do Parties Lie? Misinformation and Radical-Right Populism Across 26 Countries"
type: paper
authors:
  - Petter Törnberg
  - Juliana Chueri
year: 2026
doi: "10.1177/19401612241311886"
tags:
  - misinformation
  - populism
  - political-communication
  - comparative-politics
---

## TL;DR

Across 177 parties in 26 countries, populism combined with right-wing economic ideology is associated with sharing lower-factuality sources on Twitter. Populism and economic ideology alone do not have significant main effects in the interaction model. The outcome measures the average factuality of linked sources, rather than directly establishing false claims or deliberate lying.

## Research Question

Is political elites’ dissemination of misinformation associated with populism generally, right-wing ideology generally, or their combination?

## Motivation

Case studies of populist misinformation campaigns cannot distinguish populism from its ideological attachments. A comparative dataset linking parliamentary communication to party characteristics permits these competing explanations to be evaluated together.

## Contributions

- Combines parliamentary Twitter activity with source-factuality ratings, V-Dem party measures, and ParlGov classifications.
- Tests the interaction between populism and economic ideology alongside a separate comparison of party families.
- Shifts analysis toward party-level differences in elite source sharing, while distinguishing these from population-wide misinformation consumption.

## Method

The source corpus contains approximately 32 million tweets from 8,198 parliamentarians during 2017–2022. Expanding shortened links yields 18,026,150 URLs; 2,939,372 remain after excluding links to Twitter and other social platforms. Matching against Media Bias/Fact Check and Wikipedia’s Fake News list supplies factuality classifications for 582,148 shared URLs.

The five source ratings receive scores of 0, 0.25, 0.5, 0.75, and 1, from very low to very high factuality. Averaging these scores within parties defines the response. The analysis retains parties that shared at least 100 URLs, producing 177 parties across 26 countries.

Beta-response generalized linear mixed models include random country intercepts. The first model interacts V-Dem populism (people-centrism and anti-elitism) with economic left–right position. The second uses ParlGov party families and excludes Latvia because of data availability. Both control for government participation, party personalization, and internal cohesion.

## Experiments

This is an observational comparative analysis, not a randomized experiment.

- **Ideological interaction:** The populism-by-economic-ideology interaction is significant at the 95% confidence level; the individual main effects are not. Predicted factuality declines toward the economic right at medium and high populism. Highly populist parties around 6 or above on the 1–10 left–right scale differ significantly from nonpopulist parties at comparable positions.
- **Party families:** Radical-right parties have lower predicted factuality than other families, with significant differences except against Conservative and Single-issue parties. The result does not establish a statistically distinct radical-right effect relative to those two groups.
- **Measurement validation:** A coder blinded to source ratings assessed 250 articles, stratified as 50 per factuality category. The authors report that high-rated sources generally provided factual articles and that a majority of articles from low-rated sources contained misleading information or misinformation.
- **Robustness:** The article reports similar results without hierarchical structure and with robust standard errors. Detailed coefficients and validation tables are in supplementary material absent from the supplied Markdown; numerical effect sizes cannot be recovered from the text alone.

## Limitations

Source ratings are proxies for article accuracy, and only a subset of external links receives ratings. The measure misses misinformation in tweet text and cannot identify intent. Party aggregation conceals differences among individual politicians. Observational associations do not establish that ideology causes misinformation or directly test the proposed mechanisms involving institutional distrust and alternative media.

Coverage is limited to parliamentary Twitter accounts in the included countries and 2017–2022, including the pandemic. It does not establish generalization to other platforms, nonparliamentary elites, or later periods. Economic left–right placement and radical-right party-family membership are distinct operationalizations and should not be treated as interchangeable.

## Related Concepts

- [[concepts/populism-and-ultranationalism|Populism and Ultranationalism]]: Separating populist rhetoric from its ideological attachments is central to interpreting the interaction.
- [[concepts/social-media-news-exposure|Social Media News Exposure]]: Elite link sharing describes information supply, not what audiences actually encounter, consume, or believe.

## Related Papers

- [[papers/how-populist-are-parties|How Populist are Parties?]]: Related library reading on continuous party populism measurement; uses manifesto classification rather than the expert-coded predictor used here.
- Lasser et al. (2022), “Social Media Sharing of Low-Quality News Sources by Political Elites”: Cited comparative predecessor covering three countries.
- van Vliet, Törnberg, and Uitermark (2020), “The Twitter Parliamentarian Database: Analyzing Twitter Politics Across 26 Countries”: Source of the parliamentary tweet corpus.

Published in The International Journal of Press/Politics 31(2), 367–386 (2026); the supplied article bears copyright 2025. [Article DOI](https://doi.org/10.1177/19401612241311886).

Source: Supplied parsed article, Methods and Data, Results, and Discussion and Conclusion. Ingest job: `85ffebef-9365-450e-952a-382a8fda3dcd`.
