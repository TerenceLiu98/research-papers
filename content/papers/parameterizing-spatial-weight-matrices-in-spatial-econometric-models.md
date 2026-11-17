---
title: Parameterizing Spatial Weight Matrices in Spatial Econometric Models
type: paper
authors:
  - Chang Tan
  - Michaela Kesina
  - J. Paul Elhorst
year: 2024
doi: 10.1017/pan.2024.16
tags:
  - spatial-econometrics
  - panel-data
  - spatial-spillovers
---

## TL;DR

Estimating a separate distance-decay parameter for each spatial lag in a spatial Durbin model allows regressors to have different spillover ranges. Simulations show that imposing a common, incorrect weights matrix can substantially bias indirect effects even when direct effects remain stable. The military-expenditure application also shows that treating estimated weights as fixed can exaggerate statistical significance.

## Research Question

Can jointly estimating lag-specific distance decay and response coefficients improve estimation of spatial interactions and their direct and indirect effects in panels with many units and few periods?

## Motivation

Using one predetermined matrix for all spatial lags assumes a common spatial pattern across distinct channels of interaction. Checking a small menu of matrices may miss the relevant pattern, while unrestricted network estimation can require more time observations than typical panels provide.

## Contributions

- A parameterized spatial Durbin model with separate decay parameters for the dependent-variable lag and each explanatory-variable lag.
- Joint maximum-likelihood or quasi-maximum-likelihood estimation with fixed effects, extending the large-unit, fixed-time framework of Lee and Yu (2010).
- Direct and indirect effect calculations with delta-method uncertainty that includes estimated decay parameters.
- Simulation and application evidence distinguishing sensitivity of direct effects, indirect effects, and their significance.

## Method

With time-invariant weights, the model is

$$
y_t=\rho W(\alpha_0)y_t+\sum_k\beta_k x_{kt}+\sum_k\gamma_k W(\alpha_k)x_{kt}+c+\xi_t\mathbf{1}+\varepsilon_t.
$$

Off-diagonal weights are proportional to either $e^{-\alpha_k d_{ij}}$ or $d_{ij}^{-\alpha_k}$, normalized by the row sum; diagonal weights are zero. Distances, regressors, and their spatial lags are assumed exogenous. The paper also considers normalization by the largest eigenvalue.

For regressor $k$, the marginal-effect matrix is

$$
M_k=[I-\rho W(\alpha_0)]^{-1}[\beta_k I+\gamma_k W(\alpha_k)].
$$

Its average diagonal gives the direct effect; the average off-diagonal row sum gives the indirect effect. Direct effects include feedback returning to the originating unit. Separate weights permit distinct spatial profiles of indirect effects. Estimation of decay requires the corresponding spatial response coefficient to be bounded away from zero. The stated asymptotic conditions require positive exponential decay and inverse-distance decay greater than one.

## Experiments

**Monte Carlo (Section 4, Table 1).** The main design uses 1,000 replications, $T=5$, $N=200$ or $800$, two regressors, and true decay parameters $(2,1.5,3)$. It compares parameterized weights (PWFE), known true weights (TWFE), and a misspecified common decay of one (WFE). For the first regressor at $N=200$, indirect-effect bias is 0.576 under WFE versus 0.011 under PWFE; corresponding RMSEs are 0.627 and 0.244. At $N=800$, biases are 0.704 and 0.001. Known true weights remain more precise: their first indirect-effect RMSE at $N=200$ is 0.156. The main table uses row-normalized exponential weights; other configurations are reported in the supplement.

**Military expenditures (Section 5, Table 2).** The application covers 144 countries in 1993–2007, with 2,160 observations. The outcome is log military expenditure as a share of GDP. Under jointly estimated weights, the GDP direct effect is −0.505 and the indirect effect is −1.407, versus −0.535 and −0.048 with common contiguity weights. The jointly estimated GDP indirect effect is not significant ($t=-0.85$). Holding estimated weights fixed changes it little (−1.409) but increases its absolute t-statistic to 2.14. Thus stronger significance in the fixed-weight variants is not evidence that the joint model resolves uncertainty about spillovers.

Figure 1 reports approximate spillover ranges above 6,000 km for GDP and below 1,500 km for civil war and political regime under differentiated decay, versus roughly 2,000 km for all three with common weights. Replication materials are identified at [Harvard Dataverse](https://doi.org/10.7910/DVN/V9L9XC).

## Limitations

The model assumes a balanced panel, exogenous regressors and distances, and time-invariant weights. It estimates decay within selected functional families rather than learning arbitrary connectivity. Near-zero spatial response coefficients undermine decay identification; very high decay can be poorly estimated, and two application estimates reach the upper bound of ten. Temporal dynamics and an additional spatial error lag are proposed extensions. The simulation deliberately uses relatively strong spatially lagged regressor coefficients, so its gains need not transfer unchanged to weaker interactions.

The supplied Markdown contains damaged mathematical notation and sign inconsistencies in the application prose. Numerical signs and significance discussed here follow Table 2; the stronger significance of fixed-weight variants is kept distinct from joint-estimation results.

## Related Concepts

- [[concepts/spatial-durbin-model|Spatial Durbin Model]]: combines outcome dependence and spatially lagged covariates to model feedback and spillovers.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: the weights define geographic dependence, but association alone does not identify causal diffusion.

## Related Papers

- Lee and Yu (2010), *Estimation of Spatial Autoregressive Panel Data Models with Fixed Effects*: estimation framework extended to parameterized weights.
- LeSage and Pace (2014), *The Biggest Myth in Spatial Econometrics*: the present paper qualifies robustness claims by separating direct from indirect effects.
- Yesilyurt and Elhorst (2017), *Impact of Neighboring Countries on Military Expenditures: A Dynamic Spatial Panel Approach*: source of the empirical data and comparison models.
