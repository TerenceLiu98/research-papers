---
title: Modeling Hierarchical Spatial Interdependence for Limited Dependent Variables
type: paper
authors:
  - Ali Kagalwala
  - Hankyeul Yang
year: 2026
doi: 10.1017/pan.2026.10033
tags:
  - spatial-statistics
  - hierarchical-modeling
  - political-methodology
---

## TL;DR

Hierarchical spatial autoregressive (HSAR) probit separates dependence among binary outcomes from spatial dependence among group intercepts. Simulations show that omitting group structure can inflate estimated lower-level spillovers; allowing both spatial processes improves recovery but costs precision when the extra process is absent.

## Research Question

How should researchers estimate direct and indirect effects for binary outcomes when lower-level units are nested in groups and spatial dependence may operate at both levels?

## Motivation

Counties can share state-level baseline protest propensities while also influencing neighboring counties. A conventional spatial probit can attribute unmodeled group variation to county-level dependence, distorting substantive effects as well as coefficients.

## Contributions

- Extends hierarchical spatial autoregression to binary outcomes with Bayesian estimation.
- Derives SAR probit with independent random effects (SAR-RE) as a restricted alternative.
- Compares parameter and effect recovery across dependence structures and illustrates the models with US civil rights protests.

## Method

The latent outcome follows

$$
y^*=\rho Wy^*+X\beta+\Delta\theta+\epsilon,\qquad
\theta=\lambda M\theta+u.
$$

Here, $W$ and $M$ encode lower- and higher-level spatial relationships; $\Delta$ maps observations to groups. The model assumes $u\sim N(0,\sigma_u^2I)$, $\epsilon\sim N(0,I)$, and no covariance between the observation errors and group effects. The observed outcome is one when the latent outcome is nonnegative. Metropolis-within-Gibbs sampling combines truncated multivariate-normal latent draws with parameter updates; spatial coefficients require Metropolis–Hastings updates.

Setting $\lambda=0$ gives SAR-RE; setting both spatial coefficients to zero gives random-intercept probit; removing group variance gives ordinary SAR probit. Direct effects concern the same unit, indirect effects concern other units, and total effects sum the two. These probability effects require post-estimation calculations rather than reading coefficients directly (Sections 5–7).

## Experiments

**Monte Carlo:** The main design uses 1,117 observations in 111 groups, spatial coefficients in $\{0,0.3,0.5\}$ and group variance in $\{0,0.5,1\}$. Each parameter combination has 100 trials, with 1,000 MCMC draws and 200 discarded. Comparators are multilevel probit, SAR probit, and SAR-RE. SAR probit attenuates direct effects and inflates indirect effects when group variation exists. SAR-RE also inflates spillovers when group effects are spatially dependent. HSAR performs consistently well in this main design. Additional designs with 16 or 49 groups expose finite-sample issues; some coefficient attenuation remains at 49 groups.

**Application:** The outcome records any civil rights protest during the study period in 3,043 counties across 48 contiguous US states. Predictors are urban population share, Black population share, median age, and median school years. Spatial models use 50,000 draws with 10,000 discarded.

| Model | County spatial coefficient, 95% credible interval |
| --- | --- |
| SAR probit | 0.330 (0.198, 0.461) |
| SAR-RE | 0.143 (0.023, 0.251) |
| HSAR probit | 0.149 (0.022, 0.266) |

HSAR's state coefficient is 0.452 with interval (−0.065, 0.817), providing insufficient evidence for state-level diffusion. SAR-RE and HSAR yield similar substantive conclusions in this sample (Table 1).

## Limitations

Extra spatial parameters reduce precision when their corresponding processes are absent. Small numbers of groups can impair recovery, and the simulation runs use relatively short chains for computational reasons. Model-based spatial association does not itself identify a causal diffusion mechanism. The application does not establish absence of state-level dependence merely because its interval includes zero. The supplied extraction contains inconsistent early threshold notation; the formulation above follows Section 5 and the simulation specification.

## Related Concepts

- [[concepts/hierarchical-spatial-probit|Hierarchical Spatial Probit]]: separates dependence at observation and group levels.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: spatial association motivates the dependence structure but is distinct from causal diffusion.

## Related Papers

- Dong and Harris (2015), *Spatial Autoregressive Models for Geographically Hierarchical Data Structures*: continuous-outcome foundation extended here to probit.
- Franzese, Hays, and Cook (2016), *Spatial and Spatiotemporal-Autoregressive Probit Models of Interdependent Binary Outcomes*: foundation for spatial binary-outcome effect calculations.

Replication data identifier supplied by the paper: `10.7910/DVN/4G3GEV`.
