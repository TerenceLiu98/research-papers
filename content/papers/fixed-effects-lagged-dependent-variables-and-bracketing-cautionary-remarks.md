---
title: "Fixed Effects, Lagged Dependent Variables, and Bracketing: Cautionary Remarks"
type: paper
authors:
  - Matei Demetrescu
  - Manuel Frondel
  - Lukas Tomberg
  - Colin Vance
year: 2025
doi: 10.1017/pan.2025.10002
tags:
  - panel-data
  - causal-inference
  - dynamic-models
---

## TL;DR

Separate fixed-effects (FE) and lagged-dependent-variable (LDV) estimates need not bracket a treatment effect when both time-invariant confounding and outcome-to-treatment feedback operate. In the authors' dynamic panel setup, combining FE and an LDV provides a conservative reference for effect magnitude, with treatment-coefficient bias decaying at order $1/T^2$ in stationary settings.

## Research Question

When does FE–LDV bracketing survive simultaneous violations of the assumptions supporting each estimator, and what can a combined FE-LDV model establish?

## Motivation

FE removes stable unit heterogeneity but requires strict exogeneity; feedback from past outcomes to current treatment violates that requirement. LDV adjustment accommodates feedback but does not generally remove fixed confounding. Comparing two misspecified estimates cannot automatically identify causal bounds.

## Contributions

- Derives bias directions and conditions for bracketing under simultaneous feedback and fixed confounding.
- Demonstrates failures through Monte Carlo comparisons of OLS, FE, LDV, and FE-LDV.
- Distinguishes secondary treatment-coefficient bias from the familiar order-$1/T$ Nickell bias of the outcome-lag coefficient.
- Extends the analysis to direct state dependence and a unit root.

## Method

The baseline process is

$$
y_{it}=\delta_Y\alpha_i+\tau x_{it}+\varepsilon_{it},\qquad
x_{it}=\delta_X\alpha_i+\rho y_{i,t-1}+u_{it}.
$$

Here $\tau$ is the treatment effect, $\rho$ governs feedback, and $\alpha_i$ is stable heterogeneity. The analysis assumes independent units, mutually independent disturbance and effect sequences with bounded moments, and stationary initialization with $|\tau\rho|<1$.

In the baseline bias analysis, FE bias has sign opposite to $\rho$, whereas LDV bias has the sign of $\delta_X\delta_Y$. Thus matching signs of feedback and confounding support [[concepts/fe-ldv-bracketing|FE–LDV bracketing]]; opposite signs place both estimates on the same side of the truth.

For FE-LDV, the authors derive an exact large-$N$, fixed-$T$ bias at $T=3$ and an approximation for larger $T$. The secondary treatment bias is opposite in sign to $\tau$ and of order $1/T^2$ under the stationary setup. The conservative interpretation concerns magnitude: for negative effects, movement toward zero is numerically upward, not a signed lower bound. These are estimator-bias results, not confidence guarantees for each realized sample.

Adding $\pi y_{i,t-1}$ to the outcome equation makes persistence $\pi+\tau\rho$. Omitting that term creates another source of FE bias and can defeat the baseline bracketing rule. At a unit root, the treatment-bias rate can instead be $1/T$ when fixed heterogeneity is absent.

## Experiments

The main simulations use 500 repetitions, 300 individuals, and six retained periods, with 50 initial periods discarded. Effects and shocks are generated from standard normal distributions. Table 6 varies treatment-effect and selection signs with fixed-effect loadings and feedback magnitudes of 0.5.

| Table 6 scenario | True effect | FE | LDV | FE-LDV | Brackets? |
| --- | ---: | ---: | ---: | ---: | --- |
| A: positive feedback, positive confounding | 1.00 | 0.89 | 1.09 | 0.95 | Yes |
| B: positive feedback, negative confounding | 1.00 | 0.89 | 0.80 | 0.95 | No |
| C: negative feedback, positive confounding | 1.00 | 1.03 | 1.18 | 0.99 | No |
| D: negative feedback, negative confounding | 1.00 | 1.03 | 0.80 | 0.99 | Yes |

Four of eight Table 6 scenarios fail to bracket. Reported extensions vary feedback, noise, state dependence, and panel length. FE-LDV approaches the true effect relatively closely from about $T=20$ in the simulated cases; this is not a universal sample-size threshold. Results are reported from the supplied paper, not independently replicated.

## Limitations

The conclusions depend on the specified linear dynamics and contemporaneous exogeneity conditional on FE. More complex lag structures and short-run versus long-run interpretations are outside scope. Simulation bias magnitudes depend strongly on parameterization, and FE-LDV does not supply an upper magnitude bound.

The supplied Markdown contains damaged mathematical notation and references supplementary proofs and robustness tables not included in the text. Its democracy-and-growth illustration reports FE and LDV estimates of 10.112 and 0.457, then calls FE-LDV estimates 0.973 and 0.787 outside that interval; the printed numbers are inside it. This illustration therefore cannot substantiate the stated failure without checking the original materials.

## Related Concepts

- [[concepts/fe-ldv-bracketing|FE–LDV Bracketing]]: conditions for interpreting alternative panel estimators as bounds.
- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: relevant when contemporaneous endogeneity requires an identification strategy beyond FE-LDV adjustment.

## Related Papers

- Ding and Li (2019), “A Bracketing Relationship Between Difference-in-Differences and Lagged-Dependent-Variable Adjustment”: motivates the extension beyond settings where one identifying model holds.
- Nickell (1981), “Biases in Dynamic Models with Fixed Effects”: foundational dynamic-panel bias result distinguished from secondary treatment bias here.
- [[papers/lagged-outcomes-lagged-predictors-and-lagged-errors-a-clarification-on-common-factors|Lagged Outcomes, Lagged Predictors, and Lagged Errors]]: complementary analysis of how dynamic specification affects coefficient interpretation, rather than a bracketing result.

[Paper DOI](https://doi.org/10.1017/pan.2025.10002). [Replication archive cited by the paper](https://doi.org/10.7910/DVN/JWZ75L).
