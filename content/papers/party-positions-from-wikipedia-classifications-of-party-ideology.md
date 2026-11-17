---
title: Party Positions from Wikipedia Classifications of Party Ideology
type: paper
authors:
  - Michael Herrmann
  - Holger Döring
year: 2023
doi: 10.1017/pan.2021.28
tags:
  - political-measurement
  - ideal-point-estimation
  - party-ideology
---

## TL;DR

Herrmann and Döring scale Wikipedia infobox ideology tags into a common left–right space for parties and ideologies. Combining ideology tags with ordered political-position labels covers 2,147 parties and correlates 0.79 with DALP and 0.90 with CHES left–right expert ratings. Published online in 2021, the article appears in *Political Analysis* 31 (2023), 22–41.

## Research Question

Can crowdsourced classifications of party ideology recover valid, reliable party positions with broader coverage than conventional expert surveys?

## Motivation

Expert surveys and manifesto collections cover only part of the party universe. Wikipedia classifications potentially include historical, newly founded, and nondemocratic parties without requiring electoral manifestos. The empirical coverage remains conditional on available articles and sufficiently common tags.

## Contributions

- A probabilistic model jointly places parties and ideology keywords using binary tag co-occurrences, allowing tags to differ in prevalence and informativeness.
- An extension combines these tags with ordered left–right labels to increase coverage and sharpen inference.
- Expert comparisons, repeated Wikipedia snapshots, and editorial-scrutiny analyses evaluate validity, stability, and potential generalization beyond surveyed parties.

## Method

The party list comes from Party Facts version 2019a; Wikipedia tags were collected on April 27, 2019. Only tags linking to Wikipedia articles are used. Tags must occur at least 50 times and parties must have at least two retained tags.

For party position $x_i$ and ideology location $o_j$, the model is

$$
P(y_{ij}=1)=\operatorname{logit}^{-1}[\alpha_j-\beta_j(o_j-x_i)^2].
$$

A tag is most probable near its ideology location. Positive discrimination controls how quickly probability falls with distance; weakly discriminating tags contribute little positional information. Unlike monotonic word-frequency scaling, a party can be too far left or too far right to receive a tag.

Model 1 uses ideology tags alone. Model 2 additionally uses an ordered-logit likelihood for seven labels from far-left through far-right. Multiple position labels are treated as conditionally independent observations given the party position. Combining both sources assumes a shared latent dimension.

Bayesian estimation uses JAGS, correspondence-analysis starting positions, and a quadratic reparameterization of the tag likelihood. Each posterior draw is centered, standardized, and oriented with conservatism to the right of the mean. Four chains run for 22,000 iterations each; after 2,000 burn-in iterations and thinning every tenth draw, 8,000 posterior samples remain. The authors report satisfactory convergence diagnostics.

## Experiments

### Coverage and validity

Party Facts contains 4,483 parties in Table 1, of which 3,885 have Wikipedia articles. Model 1 scales 1,367 parties with 27 tags; Model 2 scales 2,147 parties with 35 tags. Major ideologies fall in the familiar left–right order in both models.

| Comparison | Model 1 | Model 2 |
|---|---:|---:|
| Correlation with DALP left–right ratings | 0.75 | 0.79 |
| Correlation with CHES left–right ratings | 0.84 | 0.90 |
| Matched DALP parties | 321 | 435 |
| Matched CHES parties | 203 | 247 |

Correlations are reported in Table 3; matched counts are from Figure 6. DALP ratings date to 2008–2009 and CHES ratings to 2014. General left–right correlations exceed correlations with specific policy dimensions. Nevertheless, Wikipedia scores lean more toward social and identity dimensions than economic policy, relative to experts’ overall left–right judgments. Country-level agreement varies: Model 2 mean correlations are 0.74 for DALP and 0.90 for CHES (Table 2).

### Reliability and coverage beyond surveys

A January 11, 2019 snapshot provides a test–retest comparison over roughly 15 weeks. Among parties with changed tags, average absolute score differences are 0.20 for Model 1 (111 parties) and 0.17 for Model 2 (279 parties). Respectively, 10 and 13 parties move by at least 0.5 scale units.

Editorial-experience associations with smaller expert-comparison residuals support the authors’ argument that unobserved parties need not be measured less accurately. Out-of-survey parties have fewer but more experienced editors on average. This is indirect evidence about generalization, rather than direct validation against unavailable expert scores.

## Limitations

- Article availability, linked-tag requirements, and frequency thresholds restrict realized coverage; rare or nationally specific ideologies are excluded.
- One latent dimension compresses ideological differences, and joint estimation assumes ideology and position labels share that dimension.
- Expert surveys and Wikipedia snapshots refer to different years. Agreement cannot establish that every estimated location is temporally accurate.
- The short retest assumes underlying party positions remain stable; it does not validate tracking genuine ideological change over years.
- Generalization outside survey coverage rests on observed editorial characteristics, not an external benchmark for those parties.

## Related Concepts

- [[concepts/party-position-measurement|Party-Position Measurement]]: expands source coverage through crowd-maintained classifications while retaining external validation requirements.
- [[concepts/text-scaling-models|Text Scaling Models]]: shares latent scaling ideas but uses binary keyword assignments and proximity response curves instead of document word counts.

## Related Papers

- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: provides a broader framework for distinguishing representation, scaling, and substantive interpretation.

## Source and Replication

- Article DOI: https://doi.org/10.1017/pan.2021.28
- Replication data, as cited in the paper: https://doi.org/10.7910/DVN/1JHZIU
