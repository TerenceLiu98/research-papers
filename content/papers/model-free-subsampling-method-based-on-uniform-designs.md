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

Data-driven subsampling (DDS) selects representative original records by mapping a uniform design through empirical marginal quantiles and matching the resulting points to observations in a rotated space. The paper introduces generalized empirical F-discrepancy (GEFD) to measure representation error and connects it to classical uniform-design discrepancy under joint independence. Reported simulations and a protein dataset show advantages over uniform random sampling and much lower selection costs than kernel herding or support points, with accuracy advantages that depend on the model and subsample size.

## Research Question

Can a small subset preserve the distribution of a large dataset efficiently enough to support several downstream models, including misspecified models, without tailoring selection to one regression specification?

## Motivation

Model-based selection methods such as IBOSS and optimal logistic-regression subsampling target a specified estimator. Their advantages need not transfer to other models. Model-free distributional methods avoid this dependence but can be computationally expensive. [[concepts/uniform-design-subsampling|Uniform Design Subsampling]] uses existing low-discrepancy designs to avoid directly optimizing a large subset-selection problem.

## Contributions

- Defines GEFD using a kernel applied after empirical marginal CDF transformations, with an explicit pairwise-sum expression (Section II).
- Relates squared GEFD to squared generalized uniform discrepancy up to an error of order $O(1/N^*)$ under joint independence and additional regularity conditions (Theorem 1).
- Gives an empirical Koksma-Hlawka bound for differences of transformed-data averages without the independence assumption (Theorem 2).
- Introduces rotation, marginal inversion, and nearest-neighbor selection as an efficient DDS procedure, and evaluates classification, regression, and selection runtime.

## Method

For full data $X=\{x_i\}_{i=1}^N$ and selected points $P=\{\xi_k\}_{k=1}^n$, let $T_X(x)$ apply the full-data marginal empirical CDF to each coordinate. With $\widetilde K(x,z)=K(T_X(x),T_X(z))$, Equation 5 gives

$$
D^2(P;X,K)=\frac{1}{N^2}\sum_{i,j=1}^N\widetilde K(x_i,x_j)
-\frac{2}{Nn}\sum_{i=1}^N\sum_{k=1}^n\widetilde K(x_i,\xi_k)
+\frac{1}{n^2}\sum_{k,l=1}^n\widetilde K(\xi_k,\xi_l).
$$

Centered, wrap-around, and mixture discrepancy kernels provide different choices of $K$. The expression compares the two empirical distributions in the geometry induced by the transformed kernel; it does not require computing a multivariate ECDF explicitly.

Theorem 1 assumes the reference ECDF factorizes into its marginals, bounded repetition of points, and a Lipschitz product kernel. Under these conditions, squared GEFD differs from the squared uniform discrepancy of $T_X(P)$ by $O(1/N^*)$, where $N^*$ is the smallest number of distinct marginal values. Theorem 2 instead bounds the difference between the full-data and subdata averages of $f\circ T_X$ by GEFD times the generalized variation of $f$. That bound requires finite variation but not joint independence; it is not a universal bound on downstream prediction error.

DDS proceeds as follows (Algorithm 1):

1. Use SVD to obtain rotated coordinates. The experiments retain leading components explaining at least 85% of variance.
2. Obtain a uniform design on the unit hypercube, then map each coordinate through the inverse empirical marginal CDF of the rotated data.
3. Build a KD-tree on the rotated observations and find the nearest observation to each mapped design point.
4. Return the corresponding original records for model fitting.

Designs can come from a table, a leave-one-out good-lattice-point construction, or a numerical uniform-design search. The experiments choose power-generator lattice designs by mixture discrepancy. DDS is deterministic for a fixed design; random shifts of that design supply repeated subsampling runs in the experiments. The authors report average selection complexity $O\{sN(s+\log N)\}$ for the stated procedure with a supplied design. This does not make arbitrary design-search costs negligible.

## Experiments

**Selection runtime (Table I).** Independent uniform covariates with $s=10$, $n=2{,}000$, and $N$ from $10^4$ to $10^7$ test scaling. At $N=10^7$, reported CPU times are 37.6828 seconds for DDS, 6.9295 for IBOSS, 10,019 for kernel herding, and 45,000 for support points. Thus DDS is substantially faster than the tested model-free optimization methods, while IBOSS remains faster.

**Correctly specified logistic regression (Section V-A).** Training and test datasets each have $N=10{,}000$ and seven correlated Gaussian covariates. Subsamples range from 400 to 1,500, with 1,000 repetitions. DDS, mVc, and mMSE improve classification over uniform random sampling (URS), with similar classification performance among the first three methods. Parameter-estimation error gives a different ranking: at $n=400$, Table II reports mean errors of 0.03903 for DDS, 0.04105 for URS, 0.02939 for mVc, and 0.02969 for mMSE. DDS does not dominate the model-specific estimators.

**Borehole regression (Section V-A).** A nonlinear eight-input simulator supplies one million training and one million test observations; subsamples have 50, 80, 150, 250, or 400 records. Under a simple linear working model, DDS improves reported MSPE over URS, IBOSS, and kernel herding, but support points achieves the lowest MSPE. A second model uses a log response and ten transformed terms: DDS selects using six original variables, whereas IBOSS, kernel herding, and support points select in the transformed space. DDS performs best at larger subsample sizes, while support points is better at smaller sizes. These comparisons therefore vary both modeling and selection representations.

**Protein tertiary-structure data (Section V-B).** The authors remove outliers from 45,730 observations, leaving 45,253 with nine continuous attributes. Five-fold cross-validation evaluates linear and Gaussian-process regression; DDS uses two principal components explaining over 85% of variation. URS, DDS, and support points each have 100 repetitions per fold. For linear regression, DDS improves over URS, IBOSS, and kernel herding, but support points has lower MSPE for $n\geq232$. For Gaussian-process regression, DDS slightly improves over URS at small sizes; URS, DDS, and support points perform similarly at larger sizes. Full-training-data Gaussian-process fitting is omitted for computational reasons. At $n=376$, Table III reports selection times of 0.0658 seconds for DDS, 0.0197 for IBOSS, 11.1478 for kernel herding, and 41.5587 for support points.

## Limitations

- PCA yields linearly uncorrelated coordinates, not general joint independence. The uniform-discrepancy equivalence therefore does not automatically apply to arbitrary PCA-transformed data. The authors identify approximately independent low-dimensional coordinates as the method's intended setting.
- Retaining 85% of covariate variance can discard predictive directions. The empirical integration guarantee applies to its specified transformed function class, rather than all possible learning objectives.
- Nearest-neighbor matching only approximates the ideal inverse-transformed design. Algorithm 1 does not specify how to prevent different design points from selecting the same record, or establish that matching preserves the ideal discrepancy guarantee.
- Accuracy is assessed on a limited set of simulations and one real dataset. Support points and correctly specified model-based methods outperform DDS on some reported metrics.
- The supplied Markdown has damaged equations and omits the supplementary proofs and additional results. Its discussion of transformed-borehole support-point error also mixes a claim of deterioration with the phrase "lower than" URS; that comparison is not resolved here. Publication year and stable identifiers are absent from this source, so the year is left unset rather than inferred from references. The existing Wiki's UD-DML page cites this work as 2023.

## Related Concepts

- [[concepts/uniform-design-subsampling|Uniform Design Subsampling]]: the broader design-based selection strategy, including the GEFD criterion and its assumptions.

## Related Papers

- Wang, Zhu, and Ma (2018), "Optimal subsampling for large sample logistic regression": the mVc and mMSE comparators.
- Wang, Yang, and Stufken (2019), "Information-based optimal subdata selection for Big Data linear regression": the IBOSS comparator.
- Chen, Welling, and Smola (2010), "Super-samples from kernel herding," and Mak and Joseph (2018), "Support points": model-free comparators.
- Hickernell (1998), "A generalized discrepancy and quadrature error bound": the discrepancy and integration-bound foundation.
- [[papers/ud-dml-uniform-design-subsampling-for-double-machine-learning-over-massive-data|UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data]]: a later paper already in the Wiki that cites this work and adds paired treatment-arm selection for causal estimation.

[[index|Library home]]
