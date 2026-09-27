---
title: Nonparametric Ideal-Point Estimation and Inference
type: paper
authors:
  - Alexander Tahk
year: 2018
date: "2018-03-08"
venue: Political Analysis
volume: 26
pages: "131-146"
doi: "10.1017/pan.2017.38"
source_job_id: "6142bd70-2d4b-4fa7-9d65-6d25b35cb93b"
tags:
  - political-methodology
  - ideal-point-estimation
  - nonparametric-inference
  - judicial-politics
---

## TL;DR

Tahk develops consistent estimation of ideal-point rank order and tests of equal orderings across groups of votes without specifying parametric utility or error distributions. The method compares two pairs of voters on bills where both pairs disagree. Simulations show a substantial advantage over Optimal Classification when bills concentrate at one end of the ideological spectrum. Supreme Court applications detect a change in Blackmun's relative position and different issue-area orderings in the 1960s. These are ordinal conclusions under a shared, concave utility model, not estimates of absolute ideological movement.

## Research Question

Can roll-call votes identify legislators' ideological ordering and support tests of changes in that ordering without assuming a particular utility function or error distribution?

## Motivation

Parametric ideal-point models can yield different ideological rankings and dimensionality conclusions when their functional forms change. Optimal Classification (OC) avoids a parametric stochastic model, but the paper argues that it does not supply model-based statistical inference and can be inconsistent even under quadratic utility. [[concepts/nonparametric-ideal-point-inference|Nonparametric Ideal-Point Inference]] targets ordinal information that can be recovered under weaker assumptions, allowing the distribution of bills to differ across comparison groups.

## Contributions

- Establishes monotonicity of vote probabilities in ideal points under a shared strictly concave utility function, while allowing each bill's ideological polarity to be unknown.
- Uses conditional agreement between two pairs of legislators to construct a consistent ordering estimator and a more scalable singular-value-decomposition (SVD) alternative.
- Develops tests of equal orderings across vote groups, including a test of one actor's relative movement using a pair with a stable ordering.
- Evaluates estimation and testing in simulations and applies the tests to temporal change and issue-area differences on the Supreme Court.

## Method

### Assumptions and Identified Information

Legislators vote sincerely in a one-dimensional policy space. Their deterministic utility functions share the same strictly concave shape, with maxima at their respective ideal points. Utility errors are independent across legislators and bills and identically distributed across legislators for a given bill; their distribution may vary between bills. The shared utility need not be symmetric, quadratic, or otherwise parametrically specified.

Under these assumptions, the probability of voting yea is monotonic in the ideal point for each bill, but can increase or decrease depending on the bill's direction. Strict monotonicity additionally requires distinct policy alternatives and a strictly increasing error-difference distribution. Estimation recovers rank order, with orientation fixed by constraining the order of two legislators; it does not recover distances between positions. Consistency also requires persistent informative variation as the number of votes grows.

### Two-Pair Comparisons and Estimation

Choose four distinct legislators forming pairs $(i,k)$ and $(\ell,m)$. If $x_i<x_k$ and $x_\ell<x_m$, then, conditional on both pairs casting opposing votes, the two relatively rightward legislators are at least as likely to vote together as a rightward legislator and the leftward member of the other pair. This comparison eliminates the need to know whether yea is the conservative choice on any bill.

The exhaustive estimator aggregates these alignment counts over candidate orderings. After fixing orientation, it considers $K!/2$ orderings, making the direct search impractical beyond roughly ten legislators in the paper's discussion. It can use a bill whenever the four legislators needed for a comparison voted.

The SVD alternative holds out each possible pair, uses bills on which that pair disagrees to rank the other $K-2$ legislators by agreement with one member, assigns the held-out pair the mean rank, and centers each row of the resulting ranking matrix. The first right-singular vector combines the partial rankings, up to reversal. A subset of pairs can reduce computation. The stated consistency result for this approach uses complete roll calls; the proposed mean-agreement imputation for missing votes does not retain a consistency guarantee.

### Testing Equal Orderings

For each pair-of-pairs comparison, conditional alignment counts from groups A and B yield a test of whether the alignment probabilities lie on the same side of one-half. They need not be equal across groups. Section 4 assumes bill parameters are jointly independent and identically distributed within each group, with unrestricted and potentially different distributions between groups.

The paper combines evidence using Fisher's method for disjoint groups of four legislators and a bootstrap stratified by vote group for overlapping comparisons. To improve power, it selects comparisons whose observed alignment reverses between groups, then computes p-values conditional on that selection. The test of a particular actor's movement fixes two other actors whose mutual ordering is assumed stable; it does not require their absolute positions to remain fixed.

## Experiments

### Monte Carlo Estimation

Simulations use nine legislators with ideal points $x_i=i$. The uniform bill setting distributes voting cutpoints over their ideal points. The lopsided setting concentrates bills at one end, making legislators at the other end hard to distinguish. Tables 1 and 2 report 10,000 simulations with 100 votes: the reported mean squared errors are 0.88 versus 1.14 for the new estimator and OC under uniform bills, and 13.76 versus 78.07 under lopsided bills.

Table 3 separately reports error as the number of votes increases:

| Votes | Uniform: new | Uniform: OC | Lopsided: new | Lopsided: OC |
| --- | --- | --- | --- | --- |
| 50 | 2.18 | 2.57 | 25.30 | 75.90 |
| 100 | 0.87 | 1.17 | 13.79 | 78.32 |
| 500 | 0.01 | 0.01 | 3.65 | 82.42 |
| 1,000 | 0.00 | 0.00 | 1.89 | 83.41 |

These are the paper's reported rank-estimation error summaries. The slight differences between the 100-vote entries in Table 3 and Tables 1-2 are preserved. Increasing votes improves the new estimator in both settings, whereas OC's error increases in the lopsided setting.

### Monte Carlo Inference

Both vote groups use the uniform bill distribution. The three scenarios retain the same ordering, swap one randomly chosen adjacent pair, or draw independent orderings. The test is conservative under the null. With an adjacent swap, power is low at 100 votes per group and reaches 86.9% at 1,000 votes per group at the 5% level. For independent orderings, reported power is 97.4% at 100 votes per group and exceeds 99.9% with at least 500 votes per group (Figure 1).

### Supreme Court Applications

The Blackmun comparison contrasts voting during the Nixon and Ford administrations with voting during the Carter and Reagan administrations. The common-ordering test rejects ($p=0.0005$). With Marshall and Burger as an ordered anchor pair, the Blackmun-specific test rejects ($p<0.0001$). Excluding Blackmun yields $p=0.71$, providing no evidence of reordering among the remaining justices. This cannot distinguish Blackmun moving from other justices moving relative to him.

Using the Supreme Court Database, the issue-area analysis compares criminal procedure, civil liberties, and economics by decade from the 1950s through the 2000s. For the 1960s, raw p-values are 0.001 for combined criminal procedure/civil liberties versus economics, 0.040 for criminal procedure versus economics, and 0.007 for civil liberties versus economics. The paper reports Holm-adjusted values of 0.009 and 0.039 for the first and third comparisons, respectively, controlling across six decades within each comparison. These adjusted values are reported directly rather than recomputed from rounded table entries.

The criminal-procedure/economics comparison in the 1970s gives $p=0.066$; other decades do not reject at 5%. Criminal procedure and civil liberties do not reject a shared ordering in any decade. These findings concern [[concepts/ideological-dimensionality|Ideological Dimensionality]] as compatibility of issue-specific rankings, not estimation of a Euclidean space's dimension.

## Limitations

- Nonparametric does not mean assumption-free: shared utility shape, sincere voting, independence, and one-dimensional preferences within each vote group remain substantive restrictions.
- Rank stability can coexist with changes in ideal-point levels or distances. Relative movement cannot identify which actor changed in an absolute sense.
- Exhaustive estimation scales factorially. The SVD workaround has stricter data-completeness requirements; its imputation extension need not be consistent. The ability to use incomplete roll calls does not itself establish robustness to arbitrary non-ignorable missingness.
- Tests can be conservative and have low power for small ordering changes. Non-rejection in a decade does not establish one-dimensionality. The stated multiplicity correction applies across decades within a comparison, not jointly across all comparison families.
- Multidimensional Euclidean estimation is not provided. Partitioning bills into subsets with different one-dimensional orderings is proposed as future work.
- The supplied Markdown contains malformed equations, inconsistent subscripts and signs, and footnote markers without their full notes. The exact optimization objective and combined-test formulas are therefore summarized in prose rather than reproduced as implementation-ready expressions. The supplementary material and replication files were not part of the supplied text.

## Related Concepts

- [[concepts/nonparametric-ideal-point-inference|Nonparametric Ideal-Point Inference]]: ordinal estimation and tests from conditional vote alignments.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: testing whether issue areas admit a common ordering.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: a related approach to temporal change that estimates latent trajectories under explicit temporal assumptions.

## Related Papers

- Poole (2000), "Nonparametric unfolding of binary choice data": the cited OC approach and estimation comparator.
- Ho and Quinn (2010), "How not to lie with judicial votes: Misconceptions, measurement, and models": cited motivation for caution about cardinal interpretations.
- Lauderdale and Clark (2012), "The Supreme Court's many median justices": cited work on issue-dependent judicial preferences and possible extensions.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: a later library comparison on temporal priors and missing responses, not a citation in Tahk's paper.

Paper DOI: [10.1017/pan.2017.38](https://doi.org/10.1017/pan.2017.38). Replication data cited in the paper: Tahk (2017), [10.7910/DVN/WIRN6R](https://doi.org/10.7910/DVN/WIRN6R).

[[index|Library home]]
