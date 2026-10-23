---
title: "Integrating Data Across Misaligned Spatial Units"
type: paper
authors:
  - Yuri M. Zhukov
  - Jason S. Byers
  - Marty A. Davidson II
  - Ken Kollman
year: 2024
doi: "10.1017/pan.2023.5"
journal: "Political Analysis"
volume: 32
pages: "17-33"
source_job_id: af015ce1-7c52-4e94-a9e0-192766099b65
tags:
  - spatial-statistics
  - change-of-support
  - political-methodology
  - measurement-error
---

## TL;DR

Moving data between geographic units is a measurement operation with consequences for regression inference. Two geometry-only diagnostics, relative nesting (RN) and relative scale (RS), predict transformation quality across election data and simulations: aggregating small, nested source units generally works better than disaggregating large, poorly nested ones. No tested transformation algorithm wins universally, and errors can either attenuate or inflate regression coefficients.

## Research Question

How do source and destination geometries affect the accuracy of spatial transformations and the bias of regressions using transformed variables, regardless of the chosen transformation algorithm?

## Motivation

The units required by a theory often differ from those used to collect data. Administrative areas, electoral districts, grids, and historical boundaries may overlap only partially. Treating these conversions as routine joins conceals assumptions about unobserved within-area variation. [[concepts/change-of-spatial-support|Change of Spatial Support]] provides a framework for examining these assumptions while retaining theoretically appropriate units.

The article appeared online on 23 March 2023 and in the 2024 volume of *Political Analysis*.

## Contributions

- Introduces nonparametric measures of nesting and relative size that require only source and destination geometries.
- Compares twelve algorithm variants using electoral data and synthetic spatial processes, distinguishing measurement accuracy from downstream OLS bias.
- Proposes validation and reporting practices and supplies the SUNGEO R package for diagnostics and transformations.

## Method

### Geometric Diagnostics

For source polygon areas $a_i$, destination areas $a_j$, and intersection areas $a_{i\cap j}$, the diagnostics are

$$
RN=\frac{1}{N_S}\sum_{i=1}^{N_S}\sum_{j:a_{i\cap j}>0}
\left(\frac{a_{i\cap j}}{a_i}\right)^2,
\qquad
RS=\frac{1}{N_{S\cap D}}\sum_{i\cap j}\mathbf{1}(a_i<a_j).
$$

RN averages the concentration of each source polygon's area across destinations; 1 means complete nesting. RS is the fraction of intersections whose source polygon is smaller than its destination; 1 indicates pure aggregation, while 0 means sources are never smaller. Intermediate RS values indicate mixed aggregation and disaggregation. See [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]] for interpretation and boundary cases.

### Transformation Methods and Evaluation

The comparison includes polygon and centroid variants of simple overlays, area weighting, and population weighting; two thin-plate regression spline/random forest variants; a spline/area-weighting hybrid; ordinary and universal block kriging; and rasterization. Area weighting assumes uniformity within source polygons. Population weighting relies on relevant ancillary information, while kriging and spline approaches add spatial-model assumptions.

Accuracy is evaluated using RMSE and Spearman correlation against destination-level truth, with range-normalized RMSE for simulated extensive variables. To assess inference, the authors generate $Y=1+2.5X+\epsilon$, with $\epsilon\sim N(0,1)$, and examine OLS coefficient bias when transformed estimates replace true $X$. Semiparametric regressions relate diagnostics to RN or RS using cubic splines and algorithm fixed effects.

## Experiments

### Electoral Data

Section 2.1 transforms 2014 Georgia election data among precincts, congressional constituencies, and hexagonal grid cells. The outcome is Top-2 Competitiveness, defined as one minus the winning party's vote-share margin. The main analysis transforms valid votes and the vote counts for the top two finishers, then reconstructs competitiveness. Official precinct and constituency results supply truth; precinct data supply grid aggregates.

| Transformation | RN | RS | Reported pattern |
| --- | --- | --- | --- |
| Precincts to constituencies | 0.98 | 1.00 | Estimates more closely resemble destination truth |
| Constituencies to grid cells | 0.29 | 0.12 | More missingness and implausibly smooth or uniform predictions |

Across Georgia transformations, simple overlays have median RMSE at most 0.22 and median rank correlation at least 0.85, compared with 0.43 and 0.12 for universal kriging. These are application-specific comparisons, not a universal ranking. The main text reports similar patterns for Swedish elections in Supplementary Section A5. It also reports that reconstructing competitiveness from transformed components works better at high RN and RS, whereas direct transformation is preferable near their lower limits (Supplementary Section A6).

### Monte Carlo Evidence

Section 2.2 generates random tessellations on a rectangular surface, with source and destination counts ranging from 10 to 200 and ten random-seed repetitions. An inhomogeneous Poisson point process generates extensive variables, whose totals should be preserved. A mean-zero Gaussian random field generates intensive variables, for which destination summaries are typically weighted means. Spatially random benchmarks supplement spatially clustered cases.

Figure 6 reports the following medians across algorithms for low, middle, and high RN groups. Each algorithm's entries are averages within the bottom decile, 45th-55th percentile band, or top decile, respectively.

| Diagnostic | Low RN | Middle RN | High RN |
| --- | --- | --- | --- |
| Intensive-variable RMSE | 1.02 | 0.63 | 0.35 |
| Extensive-variable Spearman correlation | 0.80 | 0.85 | 0.95 |
| Extensive-variable OLS bias | -0.87 | -0.73 | -0.29 |
| Intensive-variable OLS bias | 0.17 | 0.04 | -0.03 |

Transformation quality generally improves with nesting and relative scale, especially when moving out of the lowest ranges. Extensive-variable regressions tend toward attenuation; intensive-variable regressions can show inflation at low RN. Population weighting does not improve intensive-variable transformations in these simulations. RN is more predictive individually, but the main text reports that adding RS explains additional variation (Supplementary Section A3).

### Validation and Resources

The authors recommend reporting RN and RS, inspecting maps for implausible patterns, and checking sensitivity across algorithms. Irreducibly lowest-level observations can validate transformations or serve directly as source data. Reliable one-to-one or many-to-one IDs can replace geometric transformations with group aggregation when the units permit it. Without truth, disagreement across methods can motivate investigation, but agreement does not establish accuracy and outlier status alone does not justify exclusion.

The supplied article identifies [SUNGEO](https://github.com/zhukovyuri/SUNGEO), [Code Ocean replication materials](https://codeocean.com/capsule/7981862/tree), and a [Dataverse preservation copy](https://doi.org/10.7910/DVN/TOSX7N).

## Limitations

- RN and RS diagnose geometric difficulty; they do not recover within-area variation or certify a transformation's accuracy. Ancillary-data quality and model assumptions still matter.
- No algorithm dominates across variable types and geometries. Election-specific rankings should not be transferred mechanically to other applications.
- High correlation can coexist with consequential regression bias. The inference exercise uses a specified synthetic linear outcome and does not cover every downstream model.
- Ground-truth-free validation remains unresolved. Comparing methods cannot identify which estimate is correct without further information.
- The supplied Markdown contains damaged notation and refers to supplementary analyses without including their full contents. Supplementary findings above are attributed to the main text's reports; ambiguous numerical prose is not used.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]

## Related Papers

- Gotway and Young (2002), "Combining Incompatible Spatial Data." Cited general treatment of change-of-support problems.
- [[papers/crossing-the-boundaries-an-implementation-of-two-methods-for-projecting-data-across-boundary-changes|Goplerud (2016), "Crossing the Boundaries: An Implementation of Two Methods for Projecting Data across Boundary Changes"]]: Cited political-methodology work on boundary transformations.
- Comber and Zeng (2019), "Spatial Interpolation Using Areal Features: A Review of Methods and Opportunities Using New Forms of Data with Coded Illustrations." Cited review of transformation methods.
- [[papers/bayesian-spatial-disaggregation-modeling-for-the-detection-of-disease-clusters|Bayesian spatial disaggregation modeling for the detection of disease clusters]]: Related library reading on recovering fine-scale patterns from areal counts. It is not cited in this article; the connection concerns the validation of inferred spatial detail.

[[index|Library home]]
