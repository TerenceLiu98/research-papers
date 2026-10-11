---
title: "Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses"
type: paper
authors:
  - John H. Aldrich
  - Jacob M. Montgomery
  - David B. Sparks
year: null
source_job_id: "821fd965-2969-402a-8f50-8181ca50d721"
tags:
  - ideological-dimensionality
  - political-polarization
  - ideal-point-estimation
  - legislative-behavior
---

## TL;DR

Monte Carlo simulations show that party separation on even a few policy dimensions can make W-NOMINATE fit statistics suggest a nearly one-dimensional legislature despite multidimensional underlying preferences. Scaling each caucus separately reduces this distortion under the simulated conditions. In the U.S. Senate's 1945-2010 record, within-party fit statistics show little evidence of the decline in dimensionality suggested by whole-chamber analyses. This challenges an interpretation of low-dimensional fit, without negating its usefulness for summarizing votes.

## Research Question

Does low-dimensional roll-call fit identify a low-dimensional preference space, or can party polarization produce the same pattern? Can separate analyses of party caucuses help distinguish these explanations?

## Motivation

Congressional ideal-point estimates are often interpreted as positions on a general liberal-conservative continuum. But good prediction with one or two dimensions does not by itself establish the number or substantive meaning of underlying preference dimensions. Between-party differences can dominate variation in the voting record and conceal less partisan conflicts. This matters both for interpreting scores and for spatial theories whose conclusions depend on exact unidimensionality.

## Contributions

- Demonstrates a distributional source of apparent low dimensionality without requiring agenda control or party pressure in the simulated voting process.
- Separates compact description of observed votes from recovery of latent preference dimensionality.
- Proposes comparing whole-chamber and within-caucus scaling as a diagnostic under polarization.
- Reexamines postwar Senate votes and finds that the two approaches imply different historical patterns.

## Method

The simulations generate 101 legislators, with 51 drawn from a multivariate Normal distribution with mean $\boldsymbol\mu$ and 50 from one with mean $-\boldsymbol\mu$, both with identity covariance. For $p_D$ of the $p$ dimensions, the corresponding entry of $\boldsymbol\mu$ is $D/2$; the other entries are zero. Thus $D$ measures party-mean separation on each polarized dimension, while preferences remain uncorrelated within each simulated party.

Proposal and status quo points are sampled uniformly inside a $p$-dimensional hypersphere. Legislators vote probabilistically using weighted squared Euclidean distances and a Normal cumulative response function. For each simulated legislature, 5,000 candidate roll calls are generated and 525 selected after excluding votes with no more than 3% of legislators in the minority. The retained count matches the mean Senate roll-call count over 1945-2010.

The authors report 3,600 simulations. Table 1 lists $p\in\{1,2,\ldots,10,15,20\}$, $D\in\{0,0.5,\ldots,7\}$, $p_D\in\{1,2,3,4\}$, voting-noise scale $\beta\in\{0.5,1,1.5\}$, and hypersphere radius $r\in\{9,11\}$. These are reported parameter values, not a claim that every Cartesian combination was run; the number of separated dimensions cannot exceed $p$.

W-NOMINATE models with different numbers of dimensions are compared using aggregate proportional reduction in error (APRE) and the marginal APRE gain from another dimension. High one-dimensional APRE and small additional gains are treated as conventional evidence for low dimensionality. The same procedure is applied separately to each caucus, again removing unanimous and near-unanimous votes within the analyzed group. These fit comparisons are dimensionality diagnostics, not formal tests that identify a unique latent dimension count.

## Experiments

| Analysis | Reported pattern | Interpretation |
| --- | --- | --- |
| Simulations without party separation, Figure 2 | One-dimensional APRE falls and additional dimensions become more useful as true dimensionality rises; low-dimensional cases most closely resemble empirical Senate fit | Low-dimensional fit is informative in this simulated unimodal setting |
| Simulations with party separation, Figure 4 | One-dimensional APRE rises and marginal gains shrink as separation increases, including examples with 15 true dimensions and separation on only a few axes | Polarization can mimic low-dimensional preferences |
| Separate simulated caucuses, Figure 5 | APRE changes relatively little with between-party separation and remains sensitive to true dimensionality | Within-party scaling reduces the distortion under the model |
| U.S. Senate, 1945-2010, Figure 6 | Whole-chamber results suggest declining dimensionality; within-party results show little corresponding secular trend | The aggregate trend need not reflect simplification of underlying preferences |
| Empirical/simulation comparison, Figure 7 | The combination of changing aggregate fit and comparatively stable within-party fit resembles a high-dimensional simulation with increasing polarization | Suggestive evidence for the alternative explanation, not a formal statistical test |

The empirical evidence does not establish a precise number of Senate preference dimensions. The central result is that both a simple preference space and a polarized, more complex space can generate the fit pattern commonly used to support unidimensionality.

## Limitations

- Simulations isolate one mechanism and do not reproduce the full congressional data-generating process. Their findings do not establish that polarization is the sole cause of low-dimensional empirical fit.
- Within-party analysis assumes informative intraparty divisions reach the agenda. Agenda selection or a process in which residual within-party variation is merely random could make this diagnostic misleading.
- APRE comparisons require judgments about adequate fit. The historical comparison is not a formal test or causal identification strategy.
- A first dimension may still summarize and predict many votes well. The critique concerns inferring latent preferences and interpreting that dimension as a stable substantive ideology.
- The supplied Markdown has malformed voting-equation notation, absent footnote text, and references to supplementary analyses that are not included. Table 1 lists 20-dimensional settings, while the main discussion emphasizes examples up to 15; the summary preserves that distinction.
- Publication year and a stable article identifier are not stated in the supplied text. The 2013 date in its bibliography belongs to the replication dataset and is not assigned to the article.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: latent preference complexity versus the dimensions needed to summarize observed voting.
- [[concepts/political-polarization|Political Polarization]]: between-party separation as a source of dominant aggregate voting structure.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: a related approach to representing issue-dependent departures from a general position.

## Related Papers

- Poole and Rosenthal (1991), "Patterns of congressional voting": a cited basis for the low-dimensional interpretation examined here.
- Clinton (2012), "Using roll call estimates to test models of politics": cited discussion of how legislative context conditions interpretation.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: a library comparison using bill topics to expose deviations from a general ideal point; it is not cited in the supplied paper.
- [[papers/multidimensional-party-polarization-in-europe-cross-cutting-divides-and-effective-dimensionality|Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: a library comparison measuring effective dimensionality of party positions, a different target from recovering latent dimensions from roll calls; it is not cited in the supplied paper.

The source cites replication data with DOI [10.7910/DVN/23248](https://doi.org/10.7910/DVN/23248), dated 2013. This is a dataset identifier, not the article DOI.

[[index|Library home]]
