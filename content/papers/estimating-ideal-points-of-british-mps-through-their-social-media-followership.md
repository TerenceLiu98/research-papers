---
title: Estimating Ideal Points of British MPs Through Their Social Media Followership
type: paper
authors:
  - Conor Gaughan
year: 2024
doi: "10.1017/S0007123424000450"
source_job_id: "3d1a8d63-69dd-4d31-86ce-715d1daad8d4"
tags:
  - ideal-point-estimation
  - social-network-analysis
  - political-methodology
  - british-politics
---

## TL;DR

Correspondence analysis of Twitter/X follower networks produces left-right positions for 591 British MPs holding office in August 2022. Against expert placements of 30 MPs, the paper reports weighted regression $R^2=0.93$ and within-party correlations of $r=0.84$ for Conservatives and $r=0.81$ for Labour. More rightward positions are associated with endorsing Liz Truss over Rishi Sunak in the 2022 Conservative leadership contest. The estimates depend on a selected audience of politically engaged followers and on excluding nationalist-party MPs when constructing the scale before projecting them onto it.

## Research Question

Can MPs' social-media follower networks yield credible left-right positions, including distinctions within parties, in a legislature where party discipline and government-opposition voting obscure individual preferences?

## Motivation

British parliamentary votes often reflect whipping and strategic opposition rather than unconstrained preferences. Following a political actor supplies an alternative relational signal: politically engaged users may follow MPs they perceive as ideologically close. [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]] uses these audience choices without requiring a common roll-call record or an analysis of MPs' authored language.

## Contributions

- Applies an established follower-network scaling approach to 591 of 650 House of Commons members, covering approximately 91% of MPs.
- Addresses the distortion caused by regional followership of nationalist parties through supplementary projection in correspondence analysis (CA).
- Validates a subset of positions against an expert survey, with separate assessments of pooled and within-party agreement.
- Demonstrates a substantive application using public endorsements in the Conservative leadership contest and supplies a replication-data identifier.

## Method

### Network and Filtering

The roster corresponds to MPs sitting as of August 22, 2022; follower collection ran from August 22 to September 15, 2022. Across 591 active MP accounts, the initial network contained 34,653,181 follower connections and 11,071,104 unique users. Removing accounts with fewer than 100 tweets or fewer than 25 followers left 4,460,657 users. The median user in this filtered population followed one MP, and 52% followed only one.

The final sample retains users following at least ten MPs, ten times that median. It contains 424,297 users and 11,443,165 follow connections. A binary, directed user-by-MP matrix has dimensions $424{,}297\times591$, with $Y_{ij}=1$ when user $i$ follows MP $j$ (Data; Tables 1-3).

### Scaling and Regional Structure

The motivating spatial-following model, attributed to Barbera (2015), is

$$
\Pr(Y_{ij}=1)=\operatorname{logit}^{-1}\left(
\alpha_j+\beta_i-\gamma\lVert\Theta_i-\Phi_j\rVert^2
\right),
$$

where $\alpha_j$ captures elite popularity, $\beta_i$ captures user political interest, and $\Theta_i$ and $\Phi_j$ denote user and elite positions. Ideological distance lowers following probability under this model. The paper uses CA, implemented with R's `ca` function, as a computationally cheaper scaling approach; it does not fit this Bayesian latent-space model directly.

The intended left-right scale is the first CA dimension. Regional affinity, especially for the Scottish National Party, can dominate the network structure and distort that axis. The author therefore constructs the space without nationalist-party MPs and subsequently projects those MPs as supplementary points. This modeling decision is central to the interpretation of [[concepts/ideological-dimensionality|Ideological Dimensionality]] in the resulting scale.

## Experiments

### Expert and Substantive Validation

Of 133 invited academics, 70 responded to an expert survey. They placed 30 MPs on a 0-10 left-right scale: 13 Conservatives, 13 Labour MPs, two Liberal Democrats, one Green, and one Independent. Selection sought variation in prominence and follower counts.

| Assessment | Reported result | Scope |
| --- | --- | --- |
| Weighted regression of mean expert placements on CA positions | $R^2=0.93$ | Thirty MPs across five affiliations; weights use expert-estimate standard errors. |
| Conservative within-party Pearson correlation | $r=0.84$ | Thirteen MPs in the expert sample. |
| Labour within-party Pearson correlation | $r=0.81$ | Thirteen MPs in the expert sample. |

The author describes the pooled regression as between-party accuracy; it is agreement with expert placements, not a 93% classification accuracy. Additional descriptive checks compare faction membership, abortion-related voting, and Brexit positions. European Research Group members tend to lie further right within the Conservatives, and Socialist Campaign Group members further left within Labour. These distributions overlap substantially (Results and Validation; Figures 2-4).

### Leadership Endorsements

Public first-round endorsements were available for 319 of 357 eligible Conservative MPs; 278 also had estimated ideal points. Truss, Braverman, and Badenoch drew support from further right than Sunak and Mordaunt in the descriptive comparison. For the final Truss-Sunak contest, 245 MPs had both endorsements and ideal points. Their supporter medians were 1.39 for Truss and 1.23 for Sunak (Figures 5-6).

Logistic regressions associate more rightward positions with Truss endorsement in all three specifications, with $p\leq0.001$ for the ideal-point term. The ideal-point-only model uses 245 observations; adding demographic and then political controls reduces the sample to 192. Reported pseudo-$R^2$ values are 0.07, 0.14, and 0.16. Female MPs are also more likely to endorse Truss in the adjusted models (Table 5). These are fitted observational associations; the paper does not report held-out forecasting performance or establish a causal effect of ideology on the election outcome.

## Limitations

- **Coverage and selection:** 59 MPs lack estimates. Followers surviving the activity and ten-MP thresholds are a selected political audience, so the study does not establish representativeness of the electorate or validity for lightly engaged users.
- **Validation coverage:** expert comparisons concern 30 MPs, with only 13 observations for each reported within-party correlation. The expert sample includes no nationalist-party MPs, leaving their supplementary placements without this direct validation.
- **Construct interpretation:** a follow is an indirect signal of perceived affinity. The regional distortion illustrates why the leading network dimension cannot automatically be treated as ideology.
- **Imperfect substantive checks:** Labour Brexit positions are inferred from rebellion against a whipped bill, and the abortion comparison interprets abstention as a stance. The source acknowledges the Brexit proxy's limitations; neither behavior directly establishes the underlying attitude.
- **Temporal and causal scope:** collection spans several weeks during the leadership contest, while some endorsements precede it. The application is a retrospective association, not a prospective test. Adjusted-model sample loss also complicates comparison with the unadjusted model.
- **Reproducibility constraints:** the paper reports that restrictions on Twitter/X API access impede updates. That is a limitation reported at publication, not a checked statement about current access. The supplied Markdown references supplementary sections and footnotes whose full contents are absent; it does not specify every implementation choice, including the exact expert-weight formula.

The year follows the source's first-online publication date, November 8, 2024. Source-provided links: [article and supplementary material](https://doi.org/10.1017/S0007123424000450) and [Harvard Dataverse replication data](https://doi.org/10.7910/DVN/JDB0SE).

## Related Concepts

- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: latent political positions inferred from follower choices.
- [[concepts/social-network-analysis|Social Network Analysis]]: the directed bipartite structure used as measurement data.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: separating a left-right interpretation from regional and other network dimensions.
- [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]]: an alternative data source and model for estimating political positions without votes.

## Related Papers

- Barbera (2015), "Birds of the same feather tweet together: Bayesian ideal point estimation using Twitter data": cited spatial-following foundation, DOI `10.1093/pan/mpu011`.
- Barbera et al. (2015), "Tweeting from left to right: Is online political communication more than an echo chamber?": cited CA-based approach, DOI `10.1177/0956797615594620`.
- [[papers/text-based-ideal-points|Text-Based Ideal Points]]: library comparison that derives political positions from authored text rather than audience connections; not a benchmark evaluated in this paper.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: related library work on validating latent political scales against human judgments, including the distinction between positional agreement and uncertainty calibration; not an experiment in this paper.

[[index|Library home]]
