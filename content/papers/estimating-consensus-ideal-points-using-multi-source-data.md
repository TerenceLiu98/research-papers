---
title: Estimating Consensus Ideal Points Using Multi-Source Data
type: paper
authors:
  - Mellissa Meisels
  - Melody Huang
  - Tifany M. Tang
source_job_id: "853666e4-84a2-4566-8064-1814fb1b1538"
tags:
  - ideal-point-estimation
  - political-methodology
  - multi-view-learning
  - multidimensional-scaling
---

## TL;DR

The paper applies [[concepts/consensus-multidimensional-scaling|Consensus Multidimensional Scaling]] (CoMDS) to roll-call, campaign-finance, and campaign-platform estimates of U.S. House candidates' positions. CoMDS learns a shared spatial representation from source-level pairwise distances, accommodates unequal dimensions and missing estimates, and separates each source into consensus-aligned and orthogonal components. Across 5,389 candidate-year observations from 2016-2024, the resulting consensus ideal points remain related to all three source classes. Downstream analyses show that estimates built from the same data as an outcome can overstate or even reverse relationships that appear when using the shared component.

The supplied manuscript gives no publication year, venue, DOI, or other stable paper identifier. This entry therefore records only the supplied authorship and Cognitio source job.

## Research Question

How can researchers combine ideal-point estimates built from different behaviors, statistical models, dimensions, and target populations into a domain-agnostic representation without jointly remodeling the original outcomes?

## Motivation

Roll calls, campaign contributions, and campaign websites encode different activities and rely on different behavioral assumptions. Their ideal-point estimates strongly separate parties overall but can be weakly or negatively related within party. Yet applied work commonly treats these measures as interchangeable indicators of ideology. This creates an additional problem when an ideal point and a downstream outcome come from the same source: their association may partly reflect shared measurement rather than a general relationship between ideology and the outcome.

## Contributions

- Uses CoMDS to estimate a common spatial representation directly from existing source ideal points rather than pooling their underlying outcomes.
- Handles sources with different dimensions and observations missing from some sources through source-specific distances and missingness weights.
- Uses projection to decompose each source estimate into a component represented by the consensus space and an orthogonal, source-specific residual.
- Proposes relative-error and leave-one-source-out diagnostics for source alignment and estimate stability.
- Demonstrates how consensus estimates can change substantive conclusions about partisan disloyalty, campaign donors, and lexical diversity.

## Method

For each source $s$, CoMDS computes pairwise distances $D_{ij}^{(s)}$ between aligned observations. It then learns consensus coordinates $\mathbf Z^*$ and diagonal source weights $\mathbf W^{(s)}$ by minimizing the discrepancy between each observed source distance and its corresponding weighted distance in the consensus space. Products of observation indicators remove pairs for which a source estimate is missing. The application uses Euclidean distances and solves the stress-minimization problem with SMACOF majorization.

Because the objective operates on distances, the paper argues that the result is invariant to shifts and rotations of source coordinates; source-specific weights accommodate rescaling. Each source enters as a group rather than as a collection of ungrouped columns, avoiding the implicit extra weight that concatenated PCA gives to sources with more dimensions or correlated variants.

For interpretation, the consensus projection matrix

$$
\widehat{\mathbf P}^{*}=\widehat{\mathbf Z}^{*}
(\widehat{\mathbf Z}^{*\top}\widehat{\mathbf Z}^{*})^{-1}
\widehat{\mathbf Z}^{*\top}
$$

maps a source estimate into the consensus subspace. The residual $(\mathbf I-\widehat{\mathbf P}^{*})\mathbf Z^{(s)}$ is orthogonal to that space and represents source-specific variation on the original source scale.

The relative-error diagnostic reports a source's normalized contribution to total distance-reconstruction error; a large value indicates disagreement with the shared structure, not that the source is incorrect. Leave-one-source-out stability is measured by absolute correlation for a one-dimensional consensus or subspace correlation for a multidimensional consensus.

## Experiments

### Data and Design

The main application combines three classes of estimates for U.S. House candidates from 2016-2024: two-dimensional NOMINATE scores from roll calls, three campaign-finance score variants, and unidimensional Wordfish positions from campaign-platform text. Candidates observed in at least two classes are retained, producing 5,389 candidate-year observations. Downstream regressions standardize ideal points within each comparison sample, include a quadratic ideal-point term, and compare consensus estimates with source estimates on common observations.

The appendix compares CoMDS with PCA and MD2S in simulations involving nonlinear mappings, rotated coordinates, dimension imbalance, correlated features, and randomly missing source values. It also evaluates alternative source selections, complete cases, and several imputation procedures.

### Reported Findings

- **Source agreement:** Consensus estimates are strongly bimodal by party and more closely related to each source class than the source classes are to one another. Among Democrats, campaign-finance scores correlate at nearly 0.2 with the consensus estimate despite correlations near zero with the other source measures.
- **Partisan disloyalty:** Consensus and NOMINATE estimates agree that within-party moderates defect more often, but NOMINATE coefficients are larger. For Democrats, the standardized linear coefficients are 0.673 for consensus and 0.727 for NOMINATE; for Republicans they are -0.504 and -0.651 (Table 1).
- **Campaign donors:** In the main comparison sample, donor counts decline as consensus scores become more conservative for both parties (-0.373 for Democrats and -0.423 for Republicans). Campaign-finance score models imply different magnitudes and, for Democrats, the opposite direction (Table 2).
- **Lexical diversity:** The consensus models associate moderation with higher corrected type-token ratios within both parties, with smaller coefficients than platform-based models (Table 3). Among complete cases, however, the Democratic consensus estimate is near zero and the Republican estimate is smaller, so the main-sample pattern is sensitive to coverage (Table E2).
- **Diagnostics:** Leave-one-source-out estimates remain highly correlated with the full estimate. Platform positions have the lowest relative error and cause the largest, though still small, change when omitted. Alternative source variants and missing-data treatments also yield highly correlated consensus estimates.
- **Simulation scope:** CoMDS preserves the simulated shared geometry under transformations and source imbalance where the tested PCA and MD2S implementations degrade. These are illustrative, model-controlled comparisons rather than a comprehensive benchmark across empirical latent-variable settings.

## Limitations

- A consensus is the structure shared by the supplied measures, not ground-truth ideology. Common partisan structure or common bias can dominate it.
- Distance preservation does not remove the behavioral assumptions, selection processes, or measurement errors embedded in each source estimate.
- Missing pairs receive zero weight; this enables estimation without imputation but does not make nonrandom missingness ignorable. Appendix B shows how omitted values can move individual ranks.
- Results depend on the selected sources, distance metric, target dimension, and source grouping. Leave-one-out stability is diagnostic rather than proof of construct validity.
- Main-sample fundraising and lexical-diversity conclusions weaken or change among complete cases, whose composition differs systematically because NOMINATE excludes losing candidates.
- The projection residual is orthogonal to the estimated consensus coordinates, but labeling it domain-specific does not identify its substantive cause.
- The source manuscript does not report uncertainty for the generated consensus coordinates themselves in the downstream regressions.

## Related Concepts

- [[concepts/consensus-multidimensional-scaling|Consensus Multidimensional Scaling]]: the distance-based multi-source estimator and its diagnostics.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: estimates domain-specific positions on a common scale by learning exact cross-domain equality within a joint response model.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes the number of latent axes from disagreement among measurements of a nominally common construct.
- [[concepts/item-response-theory|Item Response Theory]]: underlies several source measures, including roll-call and text-scaling estimates, but is not jointly re-estimated by CoMDS.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: clarifies why accommodating absent source values is different from modeling their selection process.

## Related Papers

- An and Tang (2025), "Consensus Dimension Reduction via Multi-View Learning": cited methodological foundation for CoMDS.
- Enamorado, Lopez-Moctezuma, and Ratkovic (2021), "Scaling Data from Multiple Sources": cited MD2S comparison that jointly models two outcome sources under linear structure.
- Barber (2022), "Comparing Campaign Finance and Vote-Based Measures of Ideology": cited evidence that ideal-point measures can have weak within-party agreement.
- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: cited joint model of shared and domain-specific legislative preferences.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational Measurement of Political Positions: A Review of Text-Based Ideal Point Estimation Algorithms]]: related library synthesis of how textual sources and modeling choices affect political-position estimates; not identified as a citation in this manuscript.

[[index|Library home]]
