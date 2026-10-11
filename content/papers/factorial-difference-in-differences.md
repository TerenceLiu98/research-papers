---
title: Factorial Difference-in-Differences
type: paper
authors:
  - Yiqing Xu
  - Anqi Zhao
  - Peng Ding
year: 2026
doi: "10.1080/01621459.2026.2628343"
venue: Journal of the American Statistical Association
tags:
  - causal-inference
  - difference-in-differences
  - treatment-effect-heterogeneity
  - panel-data
---

## TL;DR

When an event exposes every unit, a difference-in-differences (DID) contrast across a baseline factor identifies **effect modification** under no anticipation and canonical parallel trends. Interpreting that contrast as **causal moderation**, meaning that intervening on the baseline factor changes the event's effect, additionally requires factorial parallel trends. The paper formalizes [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]] (FDID), develops covariate-adjusted implementations, and illustrates the distinction using social capital and mortality during China's Great Famine.

## Research Question

What does a DID estimator identify when all units experience a common event, and which additional assumptions justify treating differences across baseline groups as causal effects of the baseline factor?

## Motivation

Applied researchers often interact a baseline characteristic with an event-period indicator in a two-way fixed-effects (TWFE) regression. The resulting coefficient is numerically a DID estimate, but universal exposure removes the clean unexposed comparison group of canonical DID. Defining the estimator alone therefore leaves its causal target unresolved. In the running example, smaller famine-related mortality increases in high-social-capital counties do not by themselves show that increasing social capital would reduce famine mortality.

## Contributions

- Defines potential outcomes jointly indexed by a baseline factor and exposure, separating four estimands that applied studies can conflate.
- Establishes identification of effect modification under canonical DID assumptions, and causal moderation under an additional factorial parallel trends restriction.
- Recasts canonical DID as a special case with an exclusion restriction, and distinguishes moderation from the baseline factor's effect given exposure.
- Extends identification to conditional assumptions, repeated cross-sections, and general baseline factors, with regression and TWFE implementations.

## Method

### Setup and Estimands

Let $G_i\in\{0,1\}$ denote the baseline factor, $Z_i=1$ denote universal exposure, and $Y_{it}(g,z)$ be potential outcomes before and after the event. Define $\Delta Y_i=Y_{i,\mathrm{post}}-Y_{i,\mathrm{pre}}$ and the exposure effect at fixed baseline level $g$ as $\theta_i(g)=Y_{i,\mathrm{post}}(g,1)-Y_{i,\mathrm{post}}(g,0)$. The population DID contrast is

$$
\tau_{\mathrm{DID}}=E[\Delta Y_i\mid G_i=1]-E[\Delta Y_i\mid G_i=0].
$$

Effect modification compares different observed groups:

$$
\tau_{\mathrm{em}}=E[\theta_i(1)\mid G_i=1]-E[\theta_i(0)\mid G_i=0].
$$

Causal moderation instead compares interventions on $G$ within a common population:

$$
\tau_{\mathrm{cm}}=E[\theta_i(1)-\theta_i(0)].
$$

The latter is a factorial interaction, symmetric in $G$ and $Z$. It also equals the difference between the average effects of $G$ with and without exposure (Section 3).

### Identification

No anticipation requires $Y_{i,\mathrm{pre}}(g,1)=Y_{i,\mathrm{pre}}(g,0)$. Canonical parallel trends requires equal mean unexposed changes across observed groups:

$$
E[\Delta Y_i(G_i,0)\mid G_i=1]=E[\Delta Y_i(G_i,0)\mid G_i=0].
$$

Factorial parallel trends additionally requires, for every fixed $(g,z)$,

$$
E[\Delta Y_i(g,z)\mid G_i=1]=E[\Delta Y_i(g,z)\mid G_i=0].
$$

Under universal exposure, no anticipation, and canonical parallel trends, Section 4 gives the following identification map:

| Additional restriction | Quantity identified by DID |
| --- | --- |
| None | Effect modification, $\tau_{\mathrm{em}}$ |
| Exposure has zero average effect in the observed $G=0$ group | Average exposure effect in the $G=1$ group, the ATT analog |
| Factorial parallel trends | Causal moderation, $\tau_{\mathrm{cm}}$ |
| Factorial parallel trends and zero average effect of $G$ absent the event | Average effect of $G$ given exposure |

Factorial parallel trends rules out residual association between baseline group membership and each potential outcome change. It is an additional identifying restriction, not a consequence of pre-event trend similarity.

### Adjustment and Estimation

With baseline covariates $X$, identification requires overlap and the corresponding conditional trend restrictions. Averaging conditional DID contrasts over the marginal distribution of $X$ yields a standardized estimand; standardized effect modification generally differs from the unadjusted group contrast.

Section 5 considers OLS of $\Delta Y$ on $(1,G,X,GX)$ and a restricted model without $GX$. Correct specification is required for consistency. Centering $X$ makes the coefficient on $G$ in the interacted model equal the estimated marginal contrast. The corresponding two-period TWFE regressions include post-period interactions with $G$, $X$, and, for the full model, $GX$; their coefficients are numerically equivalent. A unit-level bootstrap must resample original covariates and recenter within each replicate to include uncertainty in the covariate mean.

Section 6 treats repeated cross-sections as a different sampling scheme from the same population, using period-specific outcome means because individual changes are unobserved. Nested regional data require region-level clustering. Comparisons between general levels of $G$ extend the binary estimands; continuous-factor linear regression still requires the stated specification assumptions.

## Experiments

The empirical illustration reanalyzes a balanced panel of **921 counties, 1954-1966**, from Cao, Xu, and Zhang (2022). Mortality is measured in deaths per 1,000 people per year. Binary $G$ indicates genealogy books per capita at or above the sample median; continuous $G$ is the logarithm of one plus genealogy books per capita. The reference year is **1957**. Adjustments include baseline agricultural production, land use, urbanization, geographic distances, minority share, rice suitability, education, and population.

Selected results from Table 1, Panel A, with 95% percentile bootstrap confidence intervals:

| Comparison period versus 1957 | Unadjusted DID | OLS with interactions | OLS without interactions |
| --- | --- | --- | --- |
| Famine, 1958-1961 | -2.32 [-3.75, -0.83] | -2.92 [-4.29, -1.39] | -2.79 [-4.12, -1.31] |
| Pre-famine, 1954-1956 | 0.32 [-0.10, 0.72] | 0.35 [-0.04, 0.78] | 0.33 [-0.06, 0.75] |
| After famine, 1962-1966 | -0.81 [-1.20, -0.40] | -0.51 [-0.90, -0.11] | -0.49 [-0.86, -0.11] |

The adjusted interacted estimate associates high social capital with a famine-induced mortality increase smaller by 2.92 deaths per 1,000 annually. Under the conditional identification and model assumptions this estimates effect modification; interpreting it as causal moderation needs conditional factorial parallel trends. Pre-famine intervals include zero but do not establish that stronger assumption. Year-specific estimates are most negative in 1959 and 1960.

For continuous $G$, famine-period coefficients are -5.85 without adjustment, -5.14 with interactions, and -10.11 without interactions. These contrasts use a different scale from binary $G$ and show sensitivity to specification. The paper reports supplementary sensitivity analysis, but those supplementary results are not included in the supplied Markdown.

## Limitations

- Factorial parallel trends is strong and inherently untestable. Unobserved income or governance characteristics related to both social capital and mortality dynamics can defeat causal moderation identification.
- If counterfactual interventions on $G$ are not meaningfully defined, causal moderation is not a coherent target; effect modification may remain appropriate.
- Neither moderation nor effect modification automatically equals the overall event effect or the baseline factor's effect during the event. The relevant exclusion restrictions must be defended separately.
- Regression interpretation depends on overlap, functional form, and suitable interactions. Covariate support across time in repeated cross-sections is left for future research.
- The supplied text contains extraction artifacts and internal discrepancies: one description includes 1957 in the placebo window, whereas Table 1 and the results discussion use 1954-1956; continuous-factor prose gives a coefficient inconsistent with Table 1's -5.14. The numerical summary follows Table 1 and does not repeat the questionable percentage-change interpretation. Supplementary proofs and sensitivity details were unavailable in this input.

## Related Concepts

- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]
- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]: distinguishing factors that predict heterogeneity from interventions that change effects.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: a separate extension concerned with entire outcome laws, rather than universal exposure and factorial estimands.

## Related Papers

- Cao, Xu, and Zhang (2022), "Clans and Calamity: How Social Capital Saved Lives During China's Great Famine": source of the empirical reanalysis.
- VanderWeele (2009), "On the Distinction between Interaction and Effect Modification": conceptual precedent for separating group differences from causal interaction.
- Bansak (2020, as cited in the supplied paper), "Estimating Causal Moderation Effects with Randomized Treatments and Non-randomized Moderators": related moderation framework extended here to observational panels.
- Card and Krueger (1994), "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania": canonical DID comparison used to clarify the role of an unaffected group.

Publication metadata in the supplied article: *Journal of the American Statistical Association*, 121(554), 963-975. [DOI](https://doi.org/10.1080/01621459.2026.2628343).

[[index|Library home]]
