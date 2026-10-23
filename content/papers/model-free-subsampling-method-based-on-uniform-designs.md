---
title: Model-Free Subsampling Method Based on Uniform Designs
type: paper
authors:
  - Mei Zhang
  - Yongdao Zhou
  - Zheng Zhou
  - Aijun Zhang
year: null
tags:
  - subsampling
  - uniform-design
  - kernel-methods
  - massive-data
---

## TL;DR

Data-driven subsampling (DDS) selects actual records near a low-discrepancy uniform design mapped into the empirical covariate distribution. The paper introduces generalized empirical F-discrepancy (GEFD), relates it to classical generalized $\ell_2$ discrepancy, and reports that DDS is more stable than uniform random sampling across several downstream models. An accelerated version (ADDS) reduces nearest-neighbor search costs in high dimensions.

## Research Question

Can a small subset represent a large dataset well across different downstream models without making the selection rule depend on a particular regression or classification specification?

## Motivation

Model-based methods such as optimal logistic-regression subsampling and IBOSS optimize selection for a specified estimator, so their advantages may disappear under model misspecification. Uniform random sampling is model-free but can yield variable, poorly distributed subsets. [[concepts/uniform-design-subsampling|Uniform Design Subsampling]] instead targets distributional coverage with a space-filling design.

## Contributions

- Defines GEFD as a kernel norm between the empirical distributions of the full data and a candidate subset after marginal empirical-CDF transformation.
- Establishes an asymptotic connection between GEFD and generalized $\ell_2$ discrepancy under joint independence, and derives an empirical Koksma-Hlawka inequality.
- Introduces DDS, which rotates the data, maps a uniform design through inverse empirical marginals, and matches design points to observed records.
- Develops ADDS, a block-coded approximation for faster high-dimensional matching, plus a sliced-uniform-design scheme for decentralized data.

## Method

For full data $X=\{x_i\}_{i=1}^N$ and a subset $P=\{\xi_k\}_{k=1}^n$, the transformation $T_X$ applies each full-data marginal empirical CDF to its corresponding coordinate. Given a reproducing kernel $K$ on the unit hypercube, GEFD has the pairwise form

$$
D^2(P;X,K)=\frac{1}{N^2}\sum_{i,j=1}^N\widetilde K(x_i,x_j)
-\frac{2}{Nn}\sum_{i=1}^N\sum_{k=1}^n\widetilde K(x_i,\xi_k)
+\frac{1}{n^2}\sum_{k,l=1}^n\widetilde K(\xi_k,\xi_l),
$$

where $\widetilde K(x,z)=K(T_X(x),T_X(z))$. Lower GEFD means that the subset is closer to the full empirical distribution in the induced kernel geometry. The paper considers centered, wrap-around, and mixture discrepancy kernels.

DDS first rotates the covariates with SVD, then constructs a uniform design on the unit hypercube. Coordinatewise inverse empirical CDFs map each design point into the rotated observational space. A local nearest-neighbor search supplies a corresponding observed record, and the associated record in the original space enters the subset. In the experiments, leading rotated components explaining at least 85% of variance are retained, and good-lattice-point designs are selected by mixture discrepancy.

ADDS replaces the fine $n^s$ cell partition used by DDS with an $m^s$ block partition. Observations and mapped design points receive scalar block codes, and matching occurs among observations with the same code, with nearby blocks used when necessary. For data split across servers, slices of a sliced uniform design are assigned to the partitions and their independently selected subsets are combined.

## Experiments

**Acceleration study.** For independent ten-dimensional uniform data, subset size $n=2{,}000$, and full-data size from $10^4$ to $10^7$, Table 1 reports that ADDS is consistently faster than DDS. At $N=10^7$, DDS takes 143.5468 CPU seconds and ADDS takes 27.6287 seconds.

**Correctly specified logistic regression.** Training and test sets each contain 10,000 seven-dimensional correlated Gaussian observations. Across subset sizes from 400 to 1,500 and 1,000 repetitions, DDS, mVc, and mMSE have lower reported misclassification rates than uniform random sampling (URS); DDS is similar to the two model-specific methods and has a narrower result interval than URS.

**Misspecified borehole regression.** A nonlinear eight-input simulator produces one million training and one million test cases, with subset sizes from 50 to 400. Under a simple linear working model, DDS improves on URS, IBOSS, and kernel herding, while support points performs best. Under a transformed generalized regression specification, DDS is strongest at larger subset sizes, whereas support points is stronger at smaller sizes but degrades as the subset grows. The results support robustness across these two specifications rather than uniform dominance over every comparator.

**Protein tertiary-structure data.** After outlier removal, 45,253 observations with nine continuous attributes are evaluated by five-fold cross-validation. DDS uses two principal components explaining over 85% of variation. For linear regression, DDS improves on URS, IBOSS, and kernel herding, while support points is better for $n\geq232$. For Gaussian-process regression, DDS is slightly better than URS at small subset sizes; DDS, URS, and support points are similar at larger sizes. A full-data Gaussian-process baseline is omitted because of its computational cost.

## Limitations

- The asymptotic equivalence between GEFD and uniform discrepancy assumes joint independence; SVD or PCA decorrelation does not generally establish independence.
- Retaining components by explained covariate variance can discard directions that matter for prediction.
- Nearest-neighbor replacement only approximates the inverse-transformed design, and the stated algorithms do not specify a uniqueness constraint preventing duplicate record selection.
- Performance is evaluated on a small collection of simulations and one real dataset. Support points and correctly specified model-specific methods outperform DDS in some settings.
- The supplied source does not provide a publication year or stable identifier, so neither is inferred here.

## Related Concepts

- [[concepts/uniform-design-subsampling|Uniform Design Subsampling]]: low-discrepancy skeletons, GEFD, DDS, and ADDS.

## Related Papers

- Wang, Zhu, and Ma (2018), "Optimal Subsampling for Large Sample Logistic Regression": introduces the mVc and mMSE comparators.
- Wang, Yang, and Stufken (2019), "Information-Based Optimal Subdata Selection for Big Data Linear Regression": introduces IBOSS.
- Mak and Joseph (2018), "Support Points": a model-free distributional comparator.
- Hickernell (1998), "A Generalized Discrepancy and Quadrature Error Bound": provides discrepancy and integration-bound foundations.
- [[papers/ud-dml-uniform-design-subsampling-for-double-machine-learning-over-massive-data|UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]: applies uniform-design subsampling to causal estimation.

[[index|Library home]]
