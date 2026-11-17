---
title: 'Recalibration of Predicted Probabilities Using the “Logit Shift”: Why Does It Work, and When Can It Be Expected to Work Well?'
type: paper
authors:
  - Evan T. R. Rosenman
  - Cory McCartan
  - Santiago Olivella
year: 2023
doi: 10.1017/pan.2022.31
tags:
  - probability-calibration
  - election-prediction
  - political-methodology
---

## TL;DR

A common intercept adjustment closely approximates individual posterior probabilities conditional on an observed aggregate count under independent Bernoulli sampling. Accurate approximation does not ensure accurate individual predictions: a single shift preserves ranking and can worsen errors for subgroups whose initial bias runs opposite to the majority's.

## Research Question

Why does a constant logit shift approximate conditioning individual predictions on a known total, and when does this adjustment improve their calibration?

## Motivation

Election analysts observe precinct or county vote totals but cannot observe individual choices. Reconciling voter scores with those totals is useful for public-opinion research and campaign targeting, yet matching an aggregate alone cannot establish individual accuracy.

## Contributions

- Derives the exact conditional update and bounds the common shift using unit-specific Poisson–binomial probability ratios.
- Establishes an asymptotic approximation error controlled by the inverse variance of the aggregate count.
- Separates approximation fidelity from substantive calibration through simulations of subgroup bias and distributional misspecification.

## Method

For independent outcomes $W_i\sim\mathrm{Bernoulli}(p_i)$ and observed total $D$, the exact update is

$$
p_i^*=P(W_i=1\mid S=D)=p_i\frac{P(S_{-i}=D-1)}{P(S=D)},
$$

where $S=\sum_i W_i$ and $S_{-i}=\sum_{j\ne i}W_j$. Computing these Poisson–binomial probabilities separately for every individual is expensive.

The [[concepts/logit-shift-recalibration|logit shift]] instead chooses a common $\alpha>0$ such that

$$
\tilde p_i=\frac{p_i}{p_i+\alpha(1-p_i)},\qquad \sum_i\tilde p_i=D.
$$

The summed probabilities decrease monotonically in $\alpha$, enabling binary search for interior totals. This is equivalent to adding $-\log\alpha$ to every original logit. Theorems 1–2 bracket the common factor by the unit-specific conditional factors and adjacent aggregate probability ratios. Theorem 3 reports, for large samples,

$$
\tilde p_i=p_i^*+\mathcal O\left(\frac{1}{\sum_jp_j(1-p_j)}\right).
$$

The relevant quantity is aggregate variance; sample size alone does not describe it when probabilities approach zero or one. The parsed definition of the auxiliary function in Section 2.1 contains an inconsistent sign; the formula above follows Equation (1) and the conditional-update algebra.

## Experiments

Table 1 compares exact posterior updates with logit shifts for six distributions: uniform, two skewed beta distributions, an extremal mixture, a central beta distribution, and a bimodal mixture. The target total is 20% below its initial expectation.

| Initial distribution | RMSE, 100 voters | RMSE, 1,000 voters |
| --- | ---: | ---: |
| Uniform | 0.00195 | 0.00021 |
| Close to 0 | 0.00772 | 0.00043 |
| Close to 1 | 0.00369 | 0.00034 |
| Extremal | 0.00496 | 0.00050 |
| Central | 0.00161 | 0.00016 |
| Bimodal | 0.00227 | 0.00023 |

Table 2 uses 1,000 voters with opposite initial biases for White and Black voters. Under the close-to-zero distribution and a 90% White composition, relative correlation with true probabilities rises by 0.249 for White voters but falls by 0.366 for Black voters; the pooled change is +0.160. These are relative correlation changes, not percentage-point accuracy gains.

Table 3 crosses all 36 pairs of initial and true probability distributions while preserving individual ranks. Changes in correlation are essentially zero when both distributions have mean 0.5, despite differing shapes. Larger improvements occur when means differ substantially.

## Limitations

The theoretical justification assumes independent Bernoulli outcomes. It approximates a posterior under the supplied scores, which may themselves be misspecified. A common monotone shift cannot repair incorrect ranking or opposing subgroup biases. Finer aggregation can reduce the population exposed to minority-group bias when units are more homogeneous, but does not guarantee improvement for every subgroup. Small units also weaken the large-variance approximation. A single total supplies limited information about distributional shape. The supplementary proofs are referenced but not included in the supplied Markdown.

## Related Concepts

- [[concepts/logit-shift-recalibration|Logit Shift Recalibration]]: the aggregate-constrained adjustment analyzed here.
- [[concepts/probability-calibration|Probability Calibration]]: matching a total is weaker than recovering reliable individual probabilities.

## Related Papers

- Ghitza and Gelman (2020), “Voter Registration Databases and MRP”: cited application of county-level recalibration in public-opinion research.
- Kuriwaki et al. (2022), “The Geography of Racially Polarized Voting”: cited multiple-target approach addressing heterogeneity; the present paper leaves its conditional-posterior justification to future work.
- Chen and Liu (1997), “Statistical Applications of the Poisson-Binomial and Conditional Bernoulli Distributions”: distributional foundations for the exact update.

Published in *Political Analysis* 31, 651–661. [Article](https://doi.org/10.1017/pan.2022.31). [Replication data](https://doi.org/10.7910/DVN/7MRDUW).
