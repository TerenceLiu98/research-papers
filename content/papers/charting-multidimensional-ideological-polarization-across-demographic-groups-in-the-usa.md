---
title: "Charting multidimensional ideological polarization across demographic groups in the USA"
type: paper
authors:
  - Jaume Ojer
  - David Cárcamo
  - Romualdo Pastor-Satorras
  - Michele Starnini
year: 2025
doi: "10.1038/s41562-025-02251-0"
tags:
  - political-polarization
  - partisan-sorting
  - ideological-dimensionality
  - manifold-learning
  - survey-research
---

[[index|Library home]]

## TL;DR

Embedding 11,614 ANES respondents' answers to 29 common questions into a shared two-dimensional space, the authors find increasing ideological distance between Democrats and Republicans from 1992 to 2020, alongside roughly stable distances between demographic groups. Democratic opinions become more dispersed in the 2016 and 2020 surveys, especially on social identity and personal attitudes. The authors interpret this as declining [[concepts/partisan-sorting|Partisan Sorting]] under their within-party homogeneity measure, showing that between-party separation and within-party diversity can grow together.

## Research Question

Has the US electorate become more ideologically divided, or have people mainly sorted into parties that better match their existing views? How do partisan and demographic divisions evolve when ideology is measured across multiple issues?

## Motivation

Single-issue and self-placement scales can miss cross-cutting beliefs. Social-media data provide rich behavioral traces but need not represent the electorate. A common survey-based opinion space permits comparisons of group location, distributional overlap, and internal heterogeneity across years without prespecifying a liberal-conservative axis.

## Contributions

- Constructs a pooled nonlinear embedding of identical survey items across five election years, enabling temporal comparisons within one coordinate system.
- Separates between-group ideological distance, within-group dispersion, and demographic alignment with parties.
- Finds growing partisan separation without comparable growth in demographic separation, and increased Democratic heterogeneity in the later surveys.
- Reports sensitivity checks across embedding algorithms, dimensionalities, neighborhood sizes, item subsets, and median-based group centers.

## Method

**Data.** The analysis uses ANES surveys from 1992, 2000, 2008, 2016, and 2020. Party/candidate questions and binary items are excluded; response scales are normalized to the interval (0, 1). Retaining common items with at most 20% missing answers yields 29 questions spanning policy, moral values, social identity, and personal attitudes. Random subsampling of the last two waves produces respective yearly counts of 2,485, 1,807, 2,322, 2,500, and 2,500 respondents.

Group comparisons cover Democrats versus Republicans, Black versus White respondents, female versus male respondents, ages 17-34 versus 55+, income below the 34th versus above the 66th percentile, and no college versus college. Independents are excluded from the partisan comparison; middle-income respondents are excluded from the income comparison. Group memberships overlap across attributes.

**Shared embedding.** Isomap with 10 nearest neighbors approximates [[concepts/geodesic-distance|Geodesic Distance]] through shortest paths and embeds all years jointly in two dimensions. Axes are arbitrary combinations of the selected questions. Distances are interpreted within this shared embedding; absolute distances from independently fitted embeddings are not directly comparable.

**Three measurements.** For group $g$ in year $t$, let its mean embedded position be $\bar{\mathbf{x}}_{g,t}$ and its covariance matrix be $\Sigma_{g,t}$:

$$
d_{g,h,t}=\|\bar{\mathbf{x}}_{g,t}-\bar{\mathbf{x}}_{h,t}\|_2,
\qquad R_{g,t}=\sqrt{\operatorname{tr}(\Sigma_{g,t})}.
$$

Centroid distance measures group separation; radius of gyration measures internal heterogeneity. Two-dimensional Kolmogorov-Smirnov (KS) distances supplement these summaries by comparing distributions. Group trajectories are centered on each year's overall sample mean. Demographic alignment is measured separately through cosine similarity between gradients of binned group prevalence in the opinion space.

**Validation and null model.** Tenfold stratified cross-validation compares logistic-regression prediction of party identification from original answers and embedded coordinates. A label-randomization null preserves group proportions over 100,000 repetitions; the authors approximate the resulting centroid distribution as bivariate normal and use Mahalanobis distance to assess observed centroids.

## Experiments

These are observational survey analyses and robustness checks, rather than interventions.

| Analysis | Reported result |
| --- | --- |
| Party prediction, 29 original items | Balanced accuracy $0.76 \pm 0.06$ |
| Party prediction, two embedded coordinates | Balanced accuracy $0.75 \pm 0.06$ |
| Pooled gradient alignment with party | Race: 0.94; income: 0.72; education: 0.17 cosine similarity |
| Pre/post-2010 distributional change | Democrats: KS distance 0.32; Republicans: 0.13 |
| Cross-party comparison across periods | Pre-2010 Democrats versus post-2010 Republicans: KS distance 0.44 |

**Temporal separation (Figs. 3-5).** Partisan centroid distance increases and exceeds racial-group distance after 2008; demographic distances remain comparatively stable. Both parties move away from the yearly sample center. Republicans remain farther from it throughout, while Democrats approach that distance in 2016 and 2020. The center is an empirical sample mean, not an externally defined position of political moderation.

**Heterogeneity (Fig. 6).** Comparing pooled 1992/2000/2008 responses with pooled 2016/2020 responses, Democrats occupy a larger, partly newly populated region. The authors associate this shift mainly with racial resentment and social-justice attitudes; the policy/non-policy split locates it chiefly among identity and personal-attitude questions. Republicans' distribution changes less. The two periods bracket 2010; there is no 2010 survey wave in this analysis.

**Demographic alignment.** Race and income align with party in the pooled space, whereas education is nearly orthogonal to the party gradient. This describes the full period, not necessarily the latest wave. Reported demographic composition changes are modest: the White share of Republicans is 0.84 before versus 0.85 after 2010; the corresponding Democratic shares are 0.56 and 0.63.

**Robustness.** The main text reports similar findings with different Isomap neighborhood sizes, PCA, t-SNE, UMAP, three- and four-dimensional embeddings, and median-based centers. Both policy and non-policy subsets show increasing partisan distance. Supplementary figures and tables supporting these checks are referenced but are not included in the supplied Markdown.

## Limitations

- Common-item selection enables temporal comparison but omits newer issues, such as transgender rights. Findings concern the selected battery, waves, and group contrasts.
- Yearly and demographic sample sizes remain unequal after subsampling, especially for Black and White respondents. Group trajectories describe changing aggregate distributions, not demonstrated movement of the same individuals.
- A centroid can lie between dense clusters and poorly represent typical views, as for later Democratic respondents. Dispersion and KS distances help reveal this problem.
- Similar party-prediction accuracy supports retention of party-relevant information; it does not establish preservation of every ideological distinction or distance. Within-party dispersion is the paper's operational indicator of sorting, rather than a direct observation of individual party switching.
- The analysis is descriptive. Historical explanations, including an Obama-related shift in racial attitudes, are interpretations rather than identified causal effects. Affective hostility is not directly measured.
- The supplied text gives a missingness threshold but does not specify how residual missing item responses enter the embedding. Supplementary analyses cannot be independently reconstructed from this source alone.

## Related Concepts

- [[concepts/partisan-sorting|Partisan Sorting]]: distinguishes ideological-party alignment from between-party distance.
- [[concepts/political-polarization|Political Polarization]]: the broader family of ideological, affective, and structural divisions.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: multiple issue combinations can survive apparent partisan alignment.
- [[concepts/geodesic-distance|Geodesic Distance]]: the geometry approximated by Isomap.

## Related Papers

- [[papers/multipolar-social-systems-measuring-polarization-beyond-dichotomous-contexts|Multipolar social systems: Measuring polarization beyond dichotomous contexts]]: cited as reference 69; uses network-derived affinities and multidimensional dispersion in a multiparty setting.
- [[papers/multidimensional-party-polarization-in-europe-cross-cutting-divides-and-effective-dimensionality|Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: related library reading on multidimensional measurement using expert party positions, rather than individual survey answers; not cited in this paper.
- Baldassarri and Gelman (2008), "Partisans without constraint: political polarization and trends in American public opinion": cited background on sorting and issue alignment (reference 28).
- Tenenbaum, de Silva, and Langford (2000), "A global geometric framework for nonlinear dimensionality reduction": the Isomap foundation (reference 59).

## Source and Resources

Published online on July 2, 2025 in *Nature Human Behaviour*. Ingested from the supplied parsed Markdown for Cognitio job `2dc96f6a-6bee-4dfd-b964-1c333c94ba7e`.

- [Article DOI](https://doi.org/10.1038/s41562-025-02251-0)
- [ANES data center](https://electionstudies.org/data-center/)
- [Analysis code](https://github.com/polarizationUS/charting_multidimensional_demographic)
