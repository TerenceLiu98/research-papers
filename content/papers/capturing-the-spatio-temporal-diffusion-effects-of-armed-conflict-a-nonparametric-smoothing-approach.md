---
title: "Capturing the spatio-temporal diffusion effects of armed conflict: A nonparametric smoothing approach"
type: paper
authors:
  - Daniel Racek
  - Paul W. Thurner
  - Göran Kauermann
year: null
tags:
  - armed-conflict
  - spatiotemporal-modeling
  - generalized-additive-models
  - nonparametric-smoothing
---

## TL;DR

A Poisson generalized additive model smooths the effects of past conflict across temporal lags and spatial distances. On African monthly grid-cell fatalities, its held-out explained deviance is 33.47%, compared with 29.72% for the best conventional lag regression; allowing diffusion to vary with destination population raises it to 36.81%. The fitted dependence generally decays over space and time, while less populous cells exhibit stronger relative responses to nearby past violence. These are modeled associations, not identification of a causal transmission mechanism.

## Research Question

Can an interpretable regression capture long-lasting, geographically extensive conflict dependence more effectively than separate temporal lags and immediate-neighbor summaries, and how does that dependence vary with population?

## Motivation

Conflict histories contain information beyond a cell's own recent violence. Adding many unrestricted lags risks overfitting because fatalities are rare and highly uneven. Smoothing across relative distance and time lag allows a broad history to enter the model with regularization, while keeping background geographic intensity distinct from history-dependent diffusion. Monthly lattice aggregation also accommodates the imprecise dates and locations of recorded events.

## Contributions

- Introduces an interpretable diffusion component combining temporal and spatial exponential-decay bases in a generalized additive model.
- Evaluates a history extending 24 months and approximately 550 km against regressions with shorter or more local lag structures.
- Adds a destination-population interaction to distinguish baseline conflict intensity from sensitivity to prior surrounding conflict.
- Provides an implementation using R's `mgcv` and a [replication repository](https://osf.io/ypwuv/) cited in the supplied paper.

## Method

For fatalities $Y_{t,s}$ in month $t$ and cell $s$, model M1 specifies

$$
Y_{t,s}\sim\operatorname{Poisson}(\lambda_{t,s}),\qquad
\log\lambda_{t,s}=x_{t,s}^{\top}\beta+g(s)+b(H_{t,s})^{\top}u.
$$

Controls include cell area, lagged logged population, lagged logged country GDP per capita, and lagged Polity2. A thin-plate regression spline $g(s)$ captures time-constant geographic intensity. The history basis sums tensor products of temporal and spatial decay functions, weighted by $\log(1+Y)$, over past months and neighboring cells. Ten decay functions per dimension yield 100 basis terms, with rates ranging from 0.05 to 5. Distance is Euclidean distance on grid indices; the spatial cutoff is ten grid units, approximately 550 km, and the temporal cutoff is 24 months.

The penalized log-likelihood is $\ell-\rho u^{\top}u/2$. This is [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: smoothing acts on relative history rather than simply on absolute locations and dates. The lagged-outcome component produces self-exciting behavior analogous to Hawkes models, but the fitted model is a discrete cell-month regression with a log link, not a continuous-time Hawkes point process.

Model M2 adds $\widetilde{\log\mathrm{pop}}_{t-12,s}\,b(H_{t,s})^{\top}u_{\mathrm{pop}}$, where logged population is normalized by its maximum. Keeping both the base history term and the interaction allows higher destination population to weaken or strengthen the diffusion response.

## Experiments

### Data and Evaluation

The study aggregates UCDP GED state-based and nonstate battle-related fatalities to 10,640 African PRIO-GRID cells of 0.5 by 0.5 degrees over 2000-2020: 2,681,280 cell-months. Only 0.38% have any fatalities. Events must have date precision of at most one month and location precision reaching at least the second-order administrative region. Population comes from WorldPop; annual population, GDP, and democracy measures are lagged by one year.

Training uses 2000-2018 (2,425,920 observations); evaluation uses 2019-2020 (255,360). Table 1 reports mean Poisson unit deviance and explained deviance relative to an intercept-only model, with a separate null model fitted on the held-out period. Lower unit deviance and higher explained deviance are better.

| Model | Held-out mean deviance | Held-out explained deviance |
| --- | ---: | ---: |
| M0-1: controls and geographic smooth | 0.9491 | 9.26% |
| M0-2: own-cell history, 1 lag | 0.8005 | 23.47% |
| M0-2: own-cell history, 12 lags | 0.7640 | 26.96% |
| M0-2: own-cell history, 24 lags | 0.7697 | 26.41% |
| M0-3: own-cell and immediate-neighbor history, 1 lag | 0.7767 | 25.75% |
| M0-3: own-cell and immediate-neighbor history, 12 lags | 0.7351 | 29.72% |
| M0-3: own-cell and immediate-neighbor history, 24 lags | 0.7461 | 28.67% |
| M1: smoothed diffusion | 0.6959 | 33.47% |
| M2: smoothed diffusion with population interaction | 0.6610 | 36.81% |

M1 improves explained deviance by 3.75 percentage points over the best held-out reference model. M2 adds another 3.34 points. Increasing unrestricted reference-model lags from 12 to 24 worsens held-out performance, supporting regularization rather than simply adding more history. Black-box machine-learning models are not benchmarked.

### Substantive Findings and Robustness

The M1 coefficient for the preceding month in the same cell is 0.5559: a one-unit increase in $\log(1+Y)$ multiplies the conditional mean by approximately 1.7435, holding other terms fixed. The fitted surface generally declines with time and distance but includes spatial ring patterns, so it is not uniformly monotone.

For M2, the first-month adjacent-cell coefficients are 0.2048, 0.0981, and 0.0402 at the 5th, 50th, and 95th destination-population percentiles. Higher population has a positive baseline coefficient but a negative diffusion interaction. The authors interpret this as conflict originating in populous areas and spreading toward less populous areas; stronger relative diffusion coefficients do not by themselves imply larger absolute fatality increases there.

Section 4.3 reports robustness checks involving alternative bases, basis size, shorter history windows, unlogged fatalities, and expanded reference models. The authors report persistent main patterns, poorer performance with shorter histories, and weak performance for an unrestricted reference using the same history. They also report difficulty predicting rare high-fatality observations, no systematic spatial or temporal prediction bias in their diagnostics, an unsuitable negative-binomial fit in this setting, and no need for zero inflation. Detailed supplementary analyses are referenced but are not included in the supplied Markdown.

## Limitations

- **Causal interpretation:** Population interactions and fitted diffusion surfaces do not establish a specific transmission mechanism. Explanations of ring patterns through strategic battles or ethnic territories remain hypotheses.
- **Model structure:** The exponential basis favors decaying dependence. M1 assumes a shared distance-based surface across the study region; roads, actors, and local context could create different or directional patterns. The 24-month and 550-km limits are modeling cutoffs, not estimated universal propagation boundaries.
- **Data and generalization:** Evidence concerns African battle-related fatalities in 2000-2020, with severe sparsity and event-location uncertainty. Rare extreme fatalities remain difficult to predict; broader geographic transfer is not tested here.
- **Evaluation scope:** Gains are relative to interpretable regression references, not to modern forecasting systems. Supplementary-only claims are summarized as author reports rather than independently verified results.
- **Source precision:** The supplied text contains inconsistent notation, including a 1,056-coefficient statement alongside the explicit 100-term basis construction. This page follows the explicit tensor-basis definition and avoids reconstructing damaged decay formulas. The paper's own publication year and DOI are absent; the year remains null. The supplementary-material notice names Journal of the Royal Statistical Society: Series A.

## Related Concepts

- [[concepts/spatiotemporal-history-smoothing|Spatiotemporal History Smoothing]]: regularizes a broad set of distance-lag effects.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: geographic dependence motivates incorporating neighboring history; association alone does not establish causal spillovers.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a related approach to flexible self-excitation, with different observation units and inference.

## Related Papers

- Schutte and Weidmann (2011), "Diffusion patterns of violence in civil wars": cited Monte Carlo evidence for local spatiotemporal diffusion.
- Cook, Hays, and Franzese (2023), "STADL up! the spatiotemporal autoregressive distributed lag model for TSCS data analysis": cited alternative for modeling space-time dependence.
- Mueller, Rohner, and Schonholzer (2022), "Ethnic violence across space": cited evidence on spatial decay and ethnic-group structure.
- [[papers/the-geometry-of-conflict-3d-spatio-temporal-patterns-in-fatalities-prediction|The geometry of conflict: 3D Spatio-temporal patterns in fatalities prediction]]: a library comparison using historical pattern retrieval rather than a fitted diffusion surface; not a benchmark in this paper.
- [[papers/spatiotemporal-patterns-of-conflict-related-sexual-violence-in-colombia|Spatiotemporal patterns of conflict-related sexual violence in Colombia]]: a library comparison illustrating sensitivity of fitted excitation to background-rate specification; a different outcome and setting.

[[index|Library home]]
