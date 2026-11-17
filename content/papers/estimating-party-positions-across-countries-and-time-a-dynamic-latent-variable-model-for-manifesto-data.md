---
title: "Estimating Party Positions across Countries and Time—A Dynamic Latent Variable Model for Manifesto Data"
type: paper
authors:
  - Thomas König
  - Moritz Marbach
  - Moritz Osnabrügge
year: 2013
source_job_id: 7c54d8b3-9d12-4e0e-920e-a23312274212
tags:
  - political-methodology
  - text-as-data
  - latent-trait-estimation
---

## TL;DR

Manifesto Common Space Scores (MCSS) combine Bayesian factor analysis, temporal trajectories, expert-informed priors, and bridge observations to estimate party positions across countries and elections. The application finds substantial contextual shifts and more gradual party movement than conventional manifesto scales; comparability depends on the bridge and measurement assumptions.

## Research Question

How can manifesto-based party positions be placed on a common left–right scale when national and electoral contexts alter the relationship between policy statements and ideology?

## Motivation

Identical issue emphasis need not indicate identical ideology across countries or decades. Conventional manifesto scales can confound contextual changes with party movement, distorting comparisons of polarization, government ideology, and party-system medians.

## Contributions

- Adds country and country–election shifts to a Bayesian latent-variable measurement model.
- Identifies these shifts through national–European election links and parties assumed stable between elections.
- Combines expert-informed party-family priors with Legendre-polynomial trajectories and posterior uncertainty.

## Method

Thirty-six coded manifesto categories form sixteen opposing-pole issue scales using logarithmic count transformations. A Gaussian factor model represents these indicators as loadings times the sum of party position, country bias, and country–election bias, with diagonal residual covariance. Loadings remain constant across countries and time (Section 3).

Party trajectories use up to three Legendre terms. Seven party-family prior means and variances come from expert surveys; unaffiliated parties receive diffuse priors. The “zero hour” assumption equates a party’s first European Parliament position with its preceding national position, setting EMP country bias to zero. The “incentive” assumption equates consecutive positions for the party with the largest relative seat-share gain; the first election’s time bias is zero. These are identifying restrictions, not observed invariances.

Estimation uses JAGS and R, two chains, 10,000 burn-in iterations, and 20,000 subsequent iterations thinned by ten. MCSS are posterior mean positions; posterior draws support uncertainty propagation.

## Experiments

The application describes 388 national parties in 25 EU countries over 1945–2010, plus European Parliament manifesto data. The narrative reports 238 national elections and 286 EP party delegations, whereas Table 3’s column totals assign 286 to national elections and 238 to EP parties. These counts are internally inconsistent in the supplied source.

| Check | Reported result |
| --- | --- |
| Agreement with vanilla and Rile scores | Approximately 0.6 correlation |
| Agreement with expert placements | 0.86 correlation |
| Eurobarometer-derived priors | 0.98 correlation with main estimates |
| Removing temporal polynomials | 0.81 correlation |
| Alternative temporal / national–EP bridges | 0.77 / 0.78 correlation |
| Restricting data to 1975 onward | 0.99 correlation |

Fifteen of sixteen issue loadings have 95% credible intervals excluding zero; protectionism is the exception. Country-bias estimates for Estonia and Latvia are 4.01 and 3.22, respectively. Many other country intervals include zero. The authors use a 1.5-point substantive threshold and report an average 53% probability that time bias exceeds that threshold. France and Sweden case studies favor the MCSS ordering and gradual trajectories over vanilla estimates (Sections 5–6).

## Limitations

The model assumes Gaussian indicators, linear additive contextual shifts, fixed loadings, and polynomial temporal dependence. Equal-position bridges may fail when parties change between linked elections; alternative-bridge correlations indicate meaningful sensitivity. Expert agreement is not fully independent validation because expert data also inform priors. Qualitative construct checks cover two selected countries. Modeling transformed counts does not represent the complete text-generating process, and the supplied extraction contains malformed equations and inconsistent sample totals.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal dependence borrows information across elections.
- [[concepts/text-scaling-models|Text Scaling Models]]: coded manifesto indicators supply the measurement layer.

## Related Papers

- [[papers/the-comparative-meaning-of-political-space-a-comprehensive-modeling-approach|The comparative meaning of political space: a comprehensive modeling approach]]: a later library comparison allowing country-varying issue–ideology relationships, whereas MCSS holds loadings fixed and adjusts additive context shifts.
- Elff (2013), “A dynamic state-space model of coded political texts”: cited alternative modeling manifesto category counts with multinomial observations and temporal dependence.
- Bakker (2009), “Re-measuring left-right”: cited predecessor using expert-informed Bayesian measurement.
