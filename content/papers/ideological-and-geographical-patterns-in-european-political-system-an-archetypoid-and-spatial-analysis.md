---
title: "Ideological and geographical patterns in European political system: An Archetypoid and Spatial Analysis"
type: paper
authors:
  - M. Manisera
  - D. Fernández
  - P. Zuccolotto
year: null
doi: "10.1016/j.spasta.2026.101008"
tags:
  - political-ideology
  - archetypoid-analysis
  - spatial-autocorrelation
  - comparative-politics
---

## TL;DR

Using 19 policy dimensions from CHES 2024, the paper represents 256 European parties as mixtures of three observed ideological extremes through [[concepts/archetypoid-analysis|Archetypoid Analysis]]. Seat-share-weighted national orientations show positive [[concepts/spatial-autocorrelation|Spatial Autocorrelation]], with stronger evidence for center and right than left. Among three country-level policy components, only social conservative authoritarian orientation has significant spatial clustering. These are descriptive associations, not identified effects of neighboring countries on one another.

## Research Question

Can observed extreme parties summarize European ideological variation, and which policy dimensions are associated with the geographic clustering of national parliamentary orientations?

## Motivation

Expert surveys provide many policy dimensions, but interpreting party positions across countries requires a compact representation. Actual parties can serve as interpretable reference points, while parliamentary seat shares connect party profiles to national legislative composition. The resulting country summaries permit an investigation of geographic regularities beyond illustrative comparisons of party systems.

## Contributions

- Extends the party-level ADA application of Fernández et al. (2026) to country-level mapping and spatial analysis; it does not introduce ADA or claim this is its first electoral application.
- Combines ternary party profiles with seat-share-weighted national left, center, and right intensity indices.
- Relates national orientations to three policy components and examines their spatial structure using global and local diagnostics, a spatial autoregressive model, and alternative neighborhood definitions.

## Method

CHES 2024 contains 279 parties in 31 countries, assessed by 609 academic experts. The study uses expert-averaged positions on 19 economic, social, environmental, and institutional policy dimensions. Excluding Greece and Malta for missing values leaves 256 parties in 29 countries. Excluding Cyprus and Iceland, which lack land neighbors under the study's contiguity definition, leaves 27 countries for spatial analysis.

ADA approximates each party's policy vector as

$$
\widehat{\mathbf{x}}_i=\sum_{h=1}^{k}\alpha_{ih}\mathbf{z}_h,
\qquad \alpha_{ih}\geq 0,\qquad \sum_h\alpha_{ih}=1,
$$

where each reference vector $\mathbf{z}_h$ must be an observed party. BUILD and SWAP phases minimize squared reconstruction error. An elbow in residual sum of squares motivates $k=3$. Table 1 and Section 4.3 identify Partia Razem (Poland) as the left reference, FDP/PLR (Switzerland) as the liberal-centrist reference, and Hnutie Republika (Slovakia) as the right reference. Ternary plots display mixture weights, with bubble sizes proportional to parliamentary seats.

For country $c$, the national intensity for orientation $g\in\{L,C,R\}$ is

$$
I_c^g=\sum_{i\in P_c}s_i\alpha_{ig},
$$

where $s_i$ is the party's seat share in the most recent national election before the survey. These indices summarize legislative composition; they do not measure [[concepts/party-system-polarization|Party-System Polarization]].

The spatial analysis uses row-standardized Queen contiguity weights. PCA on the 19 seat-share-weighted national policy scores yields three components explaining 70.51% of variance. Varimax-rotated loadings support the labels social conservative authoritarian (PC1), neoliberal (PC2), and extractivist nationalist (PC3). Standardized component scores predict each intensity in separate beta regressions. A 1,000-replication bootstrap examines the stability of pairwise variable similarities in loading space.

Finally, an intercept-only spatial autoregressive model fits PC1:

$$
\mathrm{PC1}=\rho W\mathrm{PC1}+\beta\mathbf{1}+\epsilon.
$$

Local Moran analysis uses 4,999 permutations. Robustness checks replace Queen weights with Rook contiguity, three nearest neighbors, and a distance-threshold matrix.

## Experiments

This is an observational empirical analysis, with reported results rather than independently reproduced estimates.

### National Orientation and Regression Results

Global Moran tests give $p=0.0579$ for left intensity, $0.0027$ for center, and $0.0001$ for right. Thus left intensity is not significant at 5% under the main specification despite a positive association.

Tables 2-4 report the following beta-regression coefficients for standardized predictors. These coefficients are on the model's regression scale, not percentage-point changes in parliamentary intensity.

| Predictor | Left | Center | Right |
| --- | ---: | ---: | ---: |
| PC1: social conservative authoritarian | -0.2039 | -0.2503 | 0.4564 |
| PC2: neoliberal | -0.0948 | 0.2351 | -0.0690 |
| PC3: extractivist nationalist | -0.2517 | -0.0555 | 0.3282 |

All coefficients have $p<0.001$ except right PC2 ($p=0.00116$) and center PC3 ($p=0.0774$); the latter is not significant at 5%. Residual Moran-test p-values are 0.071, 0.107, and 0.211 for left, center, and right, respectively.

### Spatial Policy Structure

Only PC1 has significant spatial autocorrelation ($p=0.0002$); PC2 and PC3 give $p=0.2001$ and $0.3912$. The PC1 SAR estimate is $\widehat{\rho}=0.5967$, with LR statistic 12.26 and Wald statistic 22.18, both $p<0.001$. A residual LM test gives $p=0.69$. Reported AIC is 69.35 versus 79.60 for the nonspatial linear model, and fitted-observed correlation is 0.73.

Local Moran tests identify high-high clusters in Romania, Croatia, and Bulgaria and a low-low cluster in Finland at $p\leq0.05$. Most countries do not belong to significant local clusters.

Alternative spatial weights retain significant positive clustering for center and right intensities and PC1, while left-intensity significance depends on the matrix. PC2 and PC3 remain nonsignificant. The SAR coefficient remains positive and highly significant, but the distance-based specification retains some residual spatial structure (Section 5).

## Limitations

- National weighted averages can hide polarized party configurations. Similar intensity indices need not imply similar within-country ideological dispersion, and seat shares do not directly measure voter attitudes or realized legislative influence.
- Both the intensity outcomes and policy-component predictors derive from the same expert policy scores and seat weights. Their regressions describe internal structure of these measurements rather than supply independent causal explanations.
- The country analysis has only 27 observations. The authors treat PCA as geometric dimension reduction, with bootstrap diagnostics supporting relative loading structure rather than proving population-level latent factors.
- Ordinal expert judgments are averaged and analyzed as continuous values. Missing-data exclusions, policy selection, the selected number of archetypoids, and neighborhood definitions delimit the findings.
- A single survey wave and spatial lag associations do not distinguish diffusion from shared history, institutions, or other common causes. Nonsignificant residual tests do not establish the absence of spatial dependence. The supplied text does not specify a multiple-testing adjustment for the local Moran results.
- Source quality: the supplied Markdown has damaged prose and mathematical symbols, and refers to supplementary tables not included in the text. Its Section 4.1 archetypoid numbering conflicts with Table 1 and the explicit mapping in Section 4.3; this page follows the latter two. The publication year is not explicitly provided and is left unset rather than inferred from the DOI. The DOI is retained from the supplementary-material statement.

## Related Concepts

- [[concepts/archetypoid-analysis|Archetypoid Analysis]]: observed extremes and convex representations.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: geographic clustering and residual diagnostics.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: compact representations of correlated policy positions; three archetypoids are not an estimate of effective ideological rank.
- [[concepts/party-system-polarization|Party-System Polarization]]: dispersion is distinct from the paper's average orientation indices.
- [[concepts/gal-tan-dimension|GAL-TAN Dimension]]: related sociocultural content, without equating this existing construct to the paper's empirically derived PC1.

## Related Papers

- Fernández, Manisera, and Zuccolotto (2026), "Identifying extreme European parties' ideological positioning across countries": the cited predecessor supplying the party-level ADA approach and intensity indices.
- Vinué, Epifanio, and Alemany (2015), "Archetypoids: A new approach to define representative archetypal data": the cited methodological foundation.
- [[papers/multidimensional-party-polarization-in-europe-cross-cutting-divides-and-effective-dimensionality|Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: a library comparison using CHES to measure dimensionality and dispersion, rather than geographic clustering of mean orientation; not presented as a citation by this paper.

[[index|Library home]]
