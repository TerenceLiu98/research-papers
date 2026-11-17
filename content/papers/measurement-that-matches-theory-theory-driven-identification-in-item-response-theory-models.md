---
title: "Measurement That Matches Theory: Theory-Driven Identification in Item Response Theory Models"
type: paper
authors:
  - Marco Morucci
  - Margaret J. Foster
  - Kaitlyn Webster
  - So Jin Lee
  - David A. Siegel
year: 2024
doi: "10.1017/S000305542400039X"
source_job_id: "9f6e398c-4d1c-436b-9976-b0beeff2d24d"
tags:
  - political-methodology
  - item-response-theory
  - measurement
  - identifiability
---

## TL;DR

IRT-M uses theory-coded item–dimension relationships to identify substantively interpretable, potentially correlated latent traits. Sign and zero restrictions on loadings replace the need to know particular respondents’ positions in advance. Simulations report lower estimation error than PCA and unconstrained IRT; survey and congressional applications show how coding choices determine what is measured. Informative items remain essential: the survey application fails to provide a convincing measure of religious threat.

## Research Question

How can multidimensional latent measurement preserve the meanings of theoretical concepts without external information about respondents’ latent positions?

## Motivation

Dimensions that predict responses well need not correspond to concepts in a theory. Unconstrained scaling can combine economic and social preferences into a partisan axis, leaving another axis without a clear interpretation. Anonymous surveys often lack the external respondent information used for anchoring. Estimating each concept separately also loses correlations and complicates items influenced by several concepts.

## Contributions

- Encodes theoretical relationships as positive, negative, zero, or unspecified item loadings.
- Uses those restrictions and synthetic anchor respondents for identification and scaling.
- Estimates covariance among latent factors while imposing independent loading priors.
- Provides the IRTM R package, a worked Eurobarometer application, simulation comparisons, and congressional validation.

## Method

For respondent $i$ and binary item $k$, the probit specification is

$$
\Pr(Y_{ik}=1)=\Phi(\lambda_k^\top\theta_i-b_k).
$$

Each item has a diagonal constraint matrix $M_k$. A positive or negative entry gives its loading a correspondingly truncated Normal prior; zero fixes the loading to zero; NA leaves it unconstrained. Magnitudes can encode prior loading scales, although the applied coding uses 1, −1, 0, and NA. Zero expresses an exclusion assumption, whereas NA expresses lack of prior knowledge.

Latent traits have a multivariate Normal prior with mean zero and covariance $\Sigma$, which receives an inverse-Wishart prior. Loading independence allows correlated traits within this identification strategy. Gibbs sampling produces posterior distributions over respondent positions, loadings, and covariance parameters.

The constraints supply information about axis orientation. Synthetic positive anchors answer yes to positively coded items and no to negatively coded items; negative anchors reverse these responses. Other entries are missing. Fixed extreme positions provide reference points, and synthetic respondents are removed from the output. Prior choices address location and scale. The supplied identification discussion contains inconsistent signs in its constraint-count formulas, so a literal count is not reproduced here.

The implemented application recodes categorical answers into binary indicators. Logistic and multinomial formulations using Pólya–Gamma augmentation are described as extensions. Missing responses can be sampled within the probit hierarchy, though the authors caution about imputation toward conditional means.

## Experiments

### Simulation Comparisons

The study compares PCA, unconstrained IRT, and IRT-M with independent or correlated factors across 2, 3, 5, and 8 dimensions. Table 2 reports root-mean-square error, although the surrounding prose discusses MSE. At $N=500$, $K=50$, its reported values are:

| Dimensions | PCA | IRT | IRT-M, independent | IRT-M, correlated |
| --- | --- | --- | --- | --- |
| 2 | 2.768 | 4.480 | 0.094 | 0.078 |
| 3 | 3.108 | 2.676 | 0.110 | 0.087 |
| 5 | 2.933 | 2.210 | 0.144 | 0.107 |
| 8 | 2.783 | 2.322 | 0.184 | 0.139 |

These comparisons use theoretical restrictions supplied to IRT-M, unlike its unconstrained comparator. Table 3 reports broadly comparable or improved effective sample sizes, with correlated-factor estimation sometimes mixing less efficiently than independent-factor estimation. The prose and table notes disagree about replication and posterior-sample counts; no single reconciled count is inferred.

Progressively corrupting the constraint matrices worsens recovery and also changes the generated anchors. Figure 4 supports useful recovery with roughly half the coding correct in the tested setting, rather than a universal tolerance threshold.

### Eurobarometer 94.3

The February–March 2021 survey is coded for economic, cultural, religious, and health threats, plus support for immigration and the EU. Several theoretically expected associations with media trust and class appear more clearly in IRT-M than in a six-dimensional unconstrained model. Three informative threat dimensions correlate positively with one another and negatively with EU support; associations with immigration support are weaker.

Religious threat is poorly measured: only three terrorism-priority questions are available, with little response variation during the pandemic. Its concentrated distribution is therefore not convincing evidence that religious threat is absent. The border-control item used for an attitude-validity comparison also contributes to the immigration measure, so that comparison is not wholly external validation.

### Congressional Roll Calls

The authors analyze the 85th and 109th House and Senate using three alternative two-dimensional bill-coding schemes. The main-text House results show strong agreement between IRT-M’s first dimension and DW-NOMINATE’s first dimension. Isolating civil rights under coding rule B reveals the distinctive civil-rights division in the 85th House; combining it with other issues changes the estimated dimension. Stronger correlation between dimensions in the 109th House is consistent with a partisan common influence, without identifying its causal effect.

## Limitations

- Meaning depends on defensible theoretical coding and sufficient informative items; sign constraints alone do not establish construct validity.
- Coding requires upfront substantive work. Robustness to simulated coding errors does not guarantee robustness to systematic conceptual mistakes.
- Cross-context interpretation requires stable concepts and coding rules that reflect changes in item meaning. Shared labels alone do not establish numerical comparability.
- Loading independence is consequential, even when correlated factors are substantively attractive.
- Binary recoding is used in the applications; the broader outcome extensions are not equivalent to empirical validation of those extensions.
- The supplied Markdown has damaged formulas and inconsistent simulation descriptions. Supplementary-only diagnostics and Senate figures are not reconstructed.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the latent response framework extended with theory-coded restrictions.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: item restrictions orient dimensions without prespecified real-person positions.

## Related Papers

- [[papers/scaling-politically-meaningful-dimensions-using-texts-and-votes|Scaling Politically Meaningful Dimensions Using Texts and Votes]]: uses textual issue mixtures to constrain voting dimensions; IRT-M instead codes item relationships directly from theory.
- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: Bayesian roll-call foundation discussed in relation to identification using known actor positions.

Article: https://doi.org/10.1017/S000305542400039X. Replication data: https://doi.org/10.7910/DVN/FH74D9.
