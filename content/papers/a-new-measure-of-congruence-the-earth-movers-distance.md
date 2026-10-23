---
title: "A New Measure of Congruence: The Earth Mover's Distance"
type: paper
authors:
  - Noam Lupu
  - Lucía Selios
  - Zach Warner
year: 2017
doi: "10.1017/pan.2017.2"
journal: "Political Analysis"
tags:
  - mass-elite-congruence
  - optimal-transport
  - political-representation
  - electoral-systems
  - distributional-comparison
---

## TL;DR

Lupu, Selios, and Warner propose Earth Mover's Distance (EMD) for comparing voter-preference and elite-position distributions. Unlike differences in means or overlap measures, EMD retains distributional shape, does not require a shared histogram binning, and extends directly to multiple dimensions. Simulations favor EMD on rank and magnitude recovery, while reanalyses find no convincing electoral-rule effect on ideological congruence and no association between party-system institutionalization and congruence in Latin America.

## Research Question

Can [[concepts/optimal-transport|Earth Mover's Distance]] measure [[concepts/mass-elite-congruence|mass-elite congruence]] more faithfully than differences in means or CDF/PDF overlap, and does changing the measure alter conclusions about the political and economic correlates of congruence?

## Motivation

Many-to-many congruence compares the full distribution of citizens' preferences with the distribution of elite positions. A difference in means discards within-group variation. CDF and PDF overlap require a common quantization, lose within-bin variation, and treat unsupported regions without regard to how far apart they are. These losses become more severe in multiple dimensions, even though reducing preferences to a single left-right scale can itself be substantively limiting.

## Contributions

- Introduces EMD to political-science research on representation as the minimum cost of transporting one weighted preference distribution into another.
- Shows how signatures, or variable-size generalized histograms, avoid mandatory binning and incorporate the amount and location of all observed mass.
- Gives an interpretable multidimensional formulation using the $L_1$ ground metric: with equally scaled variables, distance is the average summed separation on the original response scales.
- Uses simulations to compare EMD with differences in means and CDF/PDF overlap on ordinal and cardinal recovery.
- Demonstrates that the choice of congruence measure changes substantive conclusions in reanalyses of electoral systems and Latin American representation.

## Method

For weighted signatures $P_x=\{(x_i,p_x(x_i))\}$ and $P_y=\{(y_j,p_y(y_j))\}$, the method finds a nonnegative flow $f_{ij}$ that satisfies the available mass constraints and minimizes total transport work. The normalized distance is

$$
D_{\mathrm{EMD}}=
\frac{\sum_i\sum_j f_{ij}^{*}d_{ij}}
{\sum_i\sum_j f_{ij}^{*}},
$$

where $d_{ij}$ is a ground distance between locations. For probability distributions of equal total mass, the denominator is one. The authors recommend $L_1$ distance because it remains interpretable on the response scale and permits a multidimensional summary. Variables are equally weighted by default; repeated dimensions can impose other weights.

The simulation first fixes a target sample of 100 draws from a standard normal distribution. It compares that target with 1,000 samples whose means vary and 1,000 whose variances vary, assessing whether each measure recovers the known ordering and relative magnitude of the perturbations.

The first empirical application reconstructs voter and legislative ideological distributions from Comparative Study of Electoral Systems surveys and party seat shares. It reproduces Golder and Stramski's 1996-2005 sample, then expands coverage to 81 elections in 33 parliamentary systems through 2013. The second matches 22 AmericasBarometer and PELA surveys across 14 Latin American countries and treats harmonized survey items as equally weighted dimensions of preference.

## Experiments

In the illustrative distribution comparisons, EMD alone selects the visually closest pair while accounting for both location and spread. Across the 2,000 Monte Carlo comparisons, EMD has ordinal RMSE of 5.90 for mean shifts and 87.57 for variance shifts, compared with 42.68 and 184.48 for CDF overlap and 115.96 and 106.35 for PDF overlap. Difference in means performs similarly to EMD for mean shifts but has ordinal RMSE of 363.09 for variance shifts. On the normalized cardinality comparisons, EMD's RMSE is 0.00 for means and 0.11 for variances.

Replacing CDF overlap with EMD removes the reported association between electoral disproportionality and ideological congruence in both the original CSES sample and the expanded sample. In the Latin American application, neither unidimensional nor multidimensional EMD is associated with democratic age, average party age, electoral volatility, compulsory voting, or district magnitude. The multidimensional analysis instead reports lower congruence with longer ruling-party tenure and greater economic development; these are bivariate associations rather than identified causal effects.

## Limitations

- The empirical applications have no benchmark for true congruence, so they show that measurement changes conclusions rather than independently proving which empirical estimate is correct.
- The Latin American analysis has only 22 matched surveys across 14 countries. Because covariates are correlated, each is entered in a separate regression, limiting multivariable interpretation and causal claims.
- Multidimensional EMD weights dimensions equally unless the analyst changes the data representation. Variables therefore need comparable scales, and the choice of ground metric remains application-dependent.
- Exact EMD becomes more computationally demanding as sample size and dimensionality increase.
- The CSES party locations are based on perceptions reported by the 40% most educated respondents, and the expanded voter sample excludes respondents who did not complete high school. The resulting congruence measure is tied to those operational choices.
- Later work shows that empirical Wasserstein distances can be positive and upward-biased even when two samples come from the same population; this paper does not provide finite-sample null calibration. See [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]].

## Related Concepts

- [[concepts/mass-elite-congruence|Mass-Elite Congruence]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]
- [[concepts/electoral-responsiveness|Electoral Responsiveness]]

## Related Papers

- Golder and Stramski (2010), "Ideological Congruence and Electoral Institutions: Conceptualization and Measurement": supplies the CDF-overlap measure and electoral-system analysis reexamined here.
- Rubner, Tomasi, and Guibas (2000), "The Earth Mover's Distance as a Metric for Image Retrieval": develops the signature-based EMD formulation adapted by this paper.
- Levina and Bickel (2001), "The Earth Mover's Distance Is the Mallows Distance": connects EMD to distances between probability distributions.
- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]]: studies finite-sample upward bias and permutation-based null calibration for Wasserstein/EMD comparisons.

[[index|Library home]]
