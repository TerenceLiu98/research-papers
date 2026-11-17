---
title: Scaling Data from Multiple Sources
type: paper
authors:
  - Ted Enamorado
  - Gabriel López-Moctezuma
  - Marc Ratkovic
year: 2021
doi: 10.1017/pan.2020.24
tags:
  - latent-variable-models
  - multi-view-learning
  - political-methodology
---

## TL;DR

Multi-Dataset Multidimensional Scaling (MD2S) jointly scales two datasets into shared and source-specific subspaces, estimating their relative contributions rather than fixing a pooling weight. Applied to Senate votes and speech, it recovers a familiar partisan axis plus distinct voting and speech dimensions.

## Research Question

How can two sources inform a common latent scale without allowing the larger source to overwhelm the smaller one, while retaining systematic variation unique to each?

## Motivation

Concatenating thousands of word features with hundreds of votes can make the resulting scale primarily reflect speech. Separate analyses cannot directly distinguish common variation from source-specific variation. Recovering feature locations alongside actor locations also makes latent dimensions easier to interpret.

## Contributions

- Extends [[concepts/inter-battery-factor-analysis|Inter-Battery Factor Analysis]] with likelihood-based source weighting and an efficient iterative scaling algorithm.
- Estimates both actor positions and feature factors in shared and source-specific spaces.
- Incorporates covariates into latent locations during estimation.
- Uses feature bootstrap resampling for location uncertainty and permutation tests for dimensionality.

## Method

For double-centered matrices with matched rows, the model is

$$
Y_m=Z_S L_m W_m^\top+Z_m D_m B_m^\top+\Omega_m,\qquad m\in\{1,2\}.
$$

Here $Z_S$ contains shared actor locations, $Z_m$ contains source-specific locations, and $W_m,B_m$ locate features. Columns within each dataset must have a common scale, although scales can differ between datasets. Identification uses orthonormal factors within subspaces, orthogonality of shared and source-specific locations, proportional shared loading matrices across sources, and nonnegative diagonal loadings. Signs remain arbitrary.

The probabilistic formulation treats feature weights as random and actor locations as fixed, with Gaussian isotropic noise within each source. Iteration alternates between estimating source-specific components after removing shared variation and updating the shared components after removing source-specific variation. Matrix calculations can use the smaller observation or feature dimension. Covariate models for locations are updated within fitting, so covariates can change the estimated positions.

Bootstrap samples retain rows and resample feature columns with replacement within each source. For dimensionality, rows are shuffled independently within columns and fitted dimension weights are compared with a permutation null. Dimensions are retained sequentially until the significance threshold fails; the applications use 0.1. The authors also require explained variance and substantive interpretability when assessing dimensions.

## Experiments

### Simulation

The design varies observations over 20, 50, and 100; fixes one source at 40 features; and varies the other from 20 to 5,000 features. It includes two shared dimensions and respectively two and three source-specific dimensions, with 1,000 repetitions. Comparators are variational Bayesian IBFA (V-BIBFA) and INDSCAL, with residual scaling added to the latter to recover source-specific structure.

V-BIBFA slightly outperforms MD2S for shared-factor recovery in small settings. As the larger source gains features, MD2S improves while V-BIBFA deteriorates in these simulations. For the first source-specific dimension at 50 observations and 500 features in the other source, reported correlations with truth are 0.97 for MD2S, 0.91 for V-BIBFA, and approximately 0.2 for INDSCAL.

Detection of the weaker second shared dimension rises from 17% at 50 observations and 100 features to 53% at 100 observations and 100 features, and 83% at 100 observations and 1,000 features. Thus dimension selection can miss genuine weaker structure in smaller samples.

### Senate Application

The application combines 100 voting members of the 112th U.S. Senate, 486 votes, and 2,532 speech terms. Covariates include party, gender, seniority, and committee memberships and leadership. With 5,000 permutations, the table values and accompanying prose support one significant dimension in each subspace.

| Finding | Reported result |
| --- | --- |
| Leading shared dimension | 95.64% of joint variance |
| Leading vote-specific dimension | 49.21% of vote-specific variance |
| Leading word-specific dimension | 39.00% of word-specific variance |
| Average source weights | 33% votes, 67% words |
| Shared-scale correlations | 0.97 with SFA; 0.94 with DW-NOMINATE; 0.95 with IDEAL |

The shared dimension separates parties, with fiscal vocabulary helping interpret their differences. The vote-specific dimension contrasts Tea Party and small-government senators with senior committee leaders. The speech-specific dimension contrasts national-security concerns with budget concerns across party lines.

## Limitations

- MD2S returns geometric scaled locations rather than ideal points identified by a behavioral choice model.
- Orthogonality, proportional shared loadings, Gaussian noise, and within-source scale comparability constrain the decomposition. Substantive interpretation requires more than a significant permutation result.
- Simulation superiority is conditional: V-BIBFA performs better in some small settings, and weak dimensions can go undetected.
- The implemented framework handles two sources; extensions to more sources and cross-time comparisons remain future work in this article.
- The supplied Table 1 caption claims two shared and three source-specific dimensions, conflicting with its p-values and the surrounding prose. The summary follows the latter. Several extracted formulas are damaged; the ambiguous printed permutation-tail formula is not reproduced.

## Related Concepts

- [[concepts/inter-battery-factor-analysis|Inter-Battery Factor Analysis]]: the shared-plus-specific decomposition underlying MD2S.
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]: the broader scaling family and basis of the INDSCAL comparison.
- [[concepts/consensus-multidimensional-scaling|Consensus Multidimensional Scaling]]: a related distance-based approach to common geometry, distinct from this joint feature-matrix factorization.

## Related Papers

- [[papers/scaling-politically-meaningful-dimensions-using-texts-and-votes|Scaling Politically Meaningful Dimensions Using Texts and Votes]]: uses text-derived issue mixtures to structure voting dimensions, whereas MD2S separates shared from source-specific variation.
- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: Bayesian roll-call foundation whose IDEAL estimates provide an empirical comparison.

Published in *Political Analysis* 29, 212–235 (2021); first published online 23 November 2020. [Article DOI](https://doi.org/10.1017/pan.2020.24). The article supplies [replication code on Code Ocean](https://doi.org/10.24433/CO.3824807.v1).
