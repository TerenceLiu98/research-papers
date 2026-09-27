---
title: "The Earth Moves, But So Does the Bias: Systematic Upward Bias of the Wasserstein (Earth Mover's) Distance and Permutation-Based Null Calibration"
type: paper
authors:
  - Ho Ting (Bosco) Hung
year: 2026
tags:
  - optimal-transport
  - distribution-testing
  - permutation-tests
  - political-methodology
  - finite-sample-bias
---

## TL;DR

Finite samples can produce a positive Earth Mover's Distance (EMD, or first Wasserstein distance) even when the underlying distributions are identical. Hung proposes label permutation to calibrate the observed distance against its conditional null distribution while preserving group sizes. Simulations report rejection rates near 5% under the null, but low power against some weak alternatives. The permutation p-value tests distributional equality under exchangeability; subtracting the mean null distance yields a descriptive excess, not an unbiased estimate of population EMD.

## Research Question

How can researchers distinguish substantive distributional differences from finite-sample EMD noise, especially with unequal group sizes, multidimensional outcomes, or sparse conjoint profiles?

## Motivation

EMD incorporates the geometry of a shared support, making it useful for comparing political preferences when moving probability between adjacent positions should cost less than moving it across the scale. However, empirical distributions usually differ through sampling alone. Nonnegative transport costs turn these discrepancies into a positive null baseline. Resampling separately within the observed groups can characterize variability around their empirical distributions without imposing the equality null. Standard bootstrap uncertainty bounds therefore do not by themselves correct this inferential problem.

## Contributions

- Explains the positive finite-sample null expectation of empirical EMD, with a separation-property proof and binary and sparse categorical examples in Appendices B and D.
- Develops a sample-size-preserving permutation reference and distinguishes its inferential p-value from a supplementary excess-distance summary.
- Studies convergence, empirical bootstrapping, sparse profile spaces, and testing power in four simulation sets, with a second-Wasserstein extension.
- Compares specific Sinkhorn-bootstrap and centered-estimator Gaussian testing implementations while acknowledging their different targets and validity conditions.

## Method

### Distance and Null Baseline

For empirical probability vectors on a common metric support, [[concepts/optimal-transport|Optimal Transport]] gives

$$
W_1(\mathbf p,\mathbf q)=\min_{T\in\Pi(\mathbf p,\mathbf q)}\sum_{i,j}T_{ij}d(x_i,x_j),
$$

where the nonnegative transport plan has marginals $\mathbf p$ and $\mathbf q$. Under $P=Q$, population distance is zero, but empirical distance has positive expectation whenever the independent empirical measures differ with positive probability. This excludes degenerate cases where both measures always coincide. The claim concerns finite samples and is compatible with consistency.

For independent Bernoulli samples with success probability $\theta$, Appendix B gives the normal approximation

$$
\mathbb E_0[W_1]\approx\sqrt{\frac{2}{\pi}}\sqrt{\theta(1-\theta)\left(\frac1n+\frac1m\right)}.
$$

At $\theta=0.5$ and $n=m=100$, this is approximately 0.056. Its dependence on both group sizes explains why an arbitrary split-half reference need not match the actual comparison.

### Permutation Calibration

Pool the observations, shuffle group labels while retaining sizes $n$ and $m$, and recompute EMD for each of $B$ random permutations. With observed distance $W_1^{\mathrm{obs}}$ and permuted distances $\widetilde W_1^{(b)}$, the test uses

$$
p=\frac{1+\sum_{b=1}^{B}\mathbf1\{\widetilde W_1^{(b)}\ge W_1^{\mathrm{obs}}\}}{B+1}.
$$

Under exchangeability of the permitted label assignments, the rank argument controls Type I error, allowing conservatism from ties. This [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]] conditions on the realized pooled observations, their locations, and frequencies. It does not reproduce the sampling distribution under unequal populations or account for uncertainty in drawing a new pooled support.

The supplementary quantity is

$$
W_{\mathrm{excess}}=\max\left(0,W_1^{\mathrm{obs}}-\frac1B\sum_{b=1}^{B}\widetilde W_1^{(b)}\right).
$$

Its zero clamp can create a point mass and a nondifferentiable boundary. Appendix E discusses the unclamped difference and diagnostic bounds, but interval coverage requires separate assessment. The p-value remains the primary inferential result.

## Experiments

All reported distances are computed with Python Optimal Transport (POT); no experiments were rerun for this summary.

1. **Convergence:** 1,000 simulations compare independent uniform samples with equal group sizes from 20 to 2,000 in dimensions 1, 2, and 3. Null EMD declines with sample size and increases with dimension (Figure 1).
2. **Empirical bootstrap:** 2,000 within-group bootstrap resamples of fixed uniform sample pairs, at sizes 50 and 500, remain centered away from the population null distance of zero (Figure 2).
3. **Sparse conjoint support:** Group sizes 50, 100, 200, and 500 are compared over grids with three levels and one to six attributes, expanding support from 3 to 729 profiles. Larger support relative to sample size increases null distances in these designs (Figure 3).
4. **Testing:** The paper uses 500 permutations per run. Continuous settings include two-dimensional uniform and skewed Beta nulls plus location, dispersion, and bimodal alternatives. The conjoint setting describes 1,000 profile observations per group over 729 profiles, motivated by 100 respondents completing ten tasks. Alternatives shift all attributes or just one using exponential level weights.

Selected rejection rates from Table 1 at nominal level 0.05:

| Setting | Scenario | Rejection rate |
| --- | --- | --- |
| Continuous | Uniform null | 0.044 |
| Continuous | Beta(2,5) null | 0.048 |
| Sparse conjoint | Uniform null | 0.051 |
| Continuous | Location shifts 0.05 / 0.075 / 0.10 | 0.252 / 0.553 / 0.829 |
| Continuous | Dispersion: Beta(6,6) vs. Beta(4,4) | 0.241 |
| Continuous | Dispersion: Beta(8,8) vs. Beta(3,3) | 0.990 |
| Continuous | Bimodal component means (0.48,0.52) vs. (0.45,0.55) | 0.078 |
| Continuous | Bimodal component means (0.44,0.56) vs. (0.38,0.62) | 0.784 |
| Sparse conjoint | Global shifts, beta = 0.1 / 0.2 | 0.526 / 1.000 |
| Sparse conjoint | One-attribute shifts, beta = 0.1 / 0.2 / 0.5 | 0.109 / 0.354 / 1.000 |

Null rows estimate Type I error; alternative rows estimate power. Table G.1 reports second-Wasserstein null rejection rates of 0.042, 0.046, and 0.051 for the same three null scenarios.

Appendix H's prose reports 1,000 null replications comparing specific implementations. Pooled-bootstrap Sinkhorn with squared-Euclidean cost, regularization 0.05, and 500 resamples rejects at 0.034 in the continuous setting and 0.075 in the conjoint setting. A Gaussian test built from the Papp-Sherlock centered squared-Wasserstein estimator rejects at 0.003 in both. The paper explicitly calls the latter a finite-sample extension whose equality-null distribution is not established by the original estimator's theory. These results do not establish general superiority over either method family.

## Limitations

- **Exchangeability:** Validity requires the label assignments to be exchangeable under the null. Repeated respondent tasks, clusters, or other dependence require a design-appropriate permutation scheme; the profile-count description alone does not establish validity for dependent conjoint observations.
- **Conditional target:** Calibration holds the pooled support fixed. Rare, distant points can dominate both the observed distance and its reference distribution. Excess distance remains descriptive and can be unstable even with a valid conditional test.
- **Power:** Extreme sparsity can push observed and permuted distances toward the same large values. Weak local conjoint shifts and subtle bimodal changes have low reported power; non-rejection does not demonstrate equivalence.
- **Scope of evidence:** The evidence is simulation-based. Appendix A surveys applications but does not replicate them or show that their substantive conclusions change. Continuous dimension-dependent rates should not be treated as universal rates for a fixed finite categorical support.
- **Alternative comparisons:** Sinkhorn self-cost subtraction addresses entropic regularization bias, which is distinct from finite-sample sampling bias. Appendix H evaluates a particular pooled-bootstrap calibration. Its centered-estimator comparator uses a Gaussian approximation that degenerates at equality.
- **Source completeness:** The supplied manuscript is dated August 18, 2026 and provides no paper DOI, arXiv identifier, or venue. Its Markdown contains damaged symbols, omits referenced footnote text, and ends at the Table H.1 heading. Comparator numbers above come from Appendix H.3's prose; no missing table entries or implementation details are reconstructed.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: Supplies the geometry-sensitive distance being calibrated.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: Separates a conditional equality test from estimation of distributional distance.

## Related Papers

- Lupu, Selios, and Warner (2017), "A New Measure of Congruence: The Earth Mover's Distance." The cited political-science motivation for distributional congruence measurement.
- Fournier and Guillin (2015), "On the rate of convergence in Wasserstein distance of the empirical measure." The cited basis for dimension-sensitive empirical convergence.
- Papp and Sherlock (2022), "Centered plug-in estimation of Wasserstein distances." The centered-estimation alternative discussed in Section 7 and Appendix H.
- Feydy et al. (2018), "Interpolating between Optimal Transport and MMD using Sinkhorn Divergences." The cited regularized-divergence alternative.
- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: A thematic library connection, not a citation in this manuscript. It calibrates a distributional discrepancy after estimating a causal counterfactual, a different inferential target from an exchangeable two-sample comparison.

[[index|Library home]]
