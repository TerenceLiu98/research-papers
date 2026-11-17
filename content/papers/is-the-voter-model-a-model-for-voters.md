---
title: "Is the Voter Model a Model for Voters?"
type: paper
authors:
  - Juan Fernández-Gracia
  - Krzysztof Suchecki
  - José J. Ramasco
  - Maxi San Miguel
  - Víctor M. Eguíluz
year: 2014
doi: "10.1103/PhysRevLett.112.158701"
journal: Physical Review Letters
tags:
  - opinion-dynamics
  - electoral-geography
  - noisy-voter-model
---

## TL;DR

A noisy voter model coupled through observed home–work commuting flows reproduces the approximately stationary dispersion and logarithmically decaying spatial correlations of U.S. presidential vote-share fluctuations. Agreement persists when counties are aggregated into congressional districts and states. The target is local deviation from the national average, rather than the election winner.

## Research Question

Can microscopic imitation, imperfect copying, and recurrent mobility explain the spatial and temporal statistical regularities of electoral vote shares?

## Motivation

The [[concepts/voter-model|Voter Model]] is a standard model of social influence, but its empirical adequacy for voting requires testing. U.S. presidential elections from 1980–2012 exhibit approximately Gaussian county vote-share distributions with changing means but roughly constant standard deviation, about 0.11. Spatial correlations decay approximately logarithmically with distance. These regularities provide targets beyond aggregate electoral outcomes.

## Contributions

- Introduces social influence and recurrent mobility (SIRM), using population and commuting heterogeneity to specify interaction structure.
- Derives a noisy diffusion approximation on an anisotropic substrate determined by home and workplace mixing.
- Calibrates dispersion and temporal change, then examines spatial correlations and aggregation across geographical scales.
- Shows that longer commuting links matter for quantitative agreement even after noise is recalibrated for each restricted network.

## Method

Agents have binary opinions and belong to residence–workplace groups. The census flow $N_{ij}$ counts residents of county $i$ working in county $j$; $v_{ij}$ is the fraction holding one opinion in that group. With probability $\alpha$, an agent copies someone in its residence population; otherwise it copies someone in its workplace population. Gaussian noise represents imperfect imitation and other influences beyond peer copying.

At leading order, retaining external noise and neglecting finite-population internal noise, the dynamics are

$$
\frac{dv_{ij}}{dt}=\alpha\sum_l\left(\frac{N_{il}}{N_i}-\delta_{jl}\right)v_{il}+(1-\alpha)\sum_l\left(\frac{N_{lj}}{N'_j}-\delta_{li}\right)v_{lj}+D\eta_{ij}(t).
$$

Here $N_i$ and $N'_j$ are residence and workplace populations, and the noise is independent, zero-mean Gaussian white noise across groups. The authors identify this with an Edwards–Wilkinson equation on a disordered medium. Without external noise, this deterministic approximation conserves total support and relaxes toward a homogeneous configuration. Simulations instead update group counts with binomial draws from the original transition rates, visiting groups in random order each Monte Carlo step.

The 2000 Census supplies population and commuting flows. Time-use considerations motivate $\alpha=1/2$. Initial conditions come from the 2000 election. Matching county dispersion after 1,000 Monte Carlo steps gives $D=0.03$; matching county trajectory dispersion across successive elections gives 10 Monte Carlo steps per election, or 2.5 per year.

## Experiments

- **Noise calibration:** $D=0.03$ matches the observed standard deviation of approximately 0.11. At $D=0.005$, diffusion narrows distributions and strengthens correlations; at $D=0.35$, noise broadens distributions and erases correlations (Fig. 2).
- **Spatial and distributional checks:** At calibrated noise, centered vote-share distributions and logarithmically decaying spatial correlations remain approximately stationary. Spatial correlations were not the noise-calibration target. Distributional agreement extends to congressional districts and states (Fig. 3).
- **Temporal fluctuations:** Average within-county trajectory dispersion grows approximately as the square root of the number of elections in both data and simulation.
- **2000–2004 comparison:** For ratios of modeled to observed deviations from the spatial average, 80% fall between 0.6 and 1.5 at county level and between 0.9 and 1.1 at congressional-district level. These intervals concern centered fluctuations, not raw vote-share accuracy.
- **Mobility ablation:** Starting with geographical-neighbor links and progressively adding more distant commuting links, the authors recalibrate noise for each network. Longer links improve agreement with empirical spatial correlations (Fig. 4).

## Limitations

The model does not explain the changing national mean or predict the winning party. Census commuting flows are proxies for social contacts and omit fine interaction structure. Binary opinions simplify the electoral setting, and media effects enter only indirectly through noise. The same empirical setting supports calibration and evaluation; agreement with aggregate regularities does not uniquely identify the underlying individual mechanism. The supplied main text refers to supplementary derivations and sensitivity analyses that are not included in the parsed document.

## Related Concepts

- [[concepts/voter-model|Voter Model]] — local binary imitation supplies the microscopic rule.
- [[concepts/noisy-voter-model|Noisy Voter Model]] — imperfect copying sustains fluctuations against spatial smoothing.

## Related Papers

- [[papers/polarization-induced-stress-in-the-noisy-voter-model|Polarization-induced stress in the noisy voter model]] — a complementary theoretical extension studies state-dependent intrinsic noise in a well-mixed population; the present paper emphasizes empirical spatial coupling.
- Borghesi and Bouchaud (2010), *European Physical Journal B* 75, 395, and Borghesi, Raynal, and Bouchaud (2012), *PLoS ONE* 7, e36289 — cited antecedents for spatial electoral correlations and mesoscopic diffusion models (source references 24–25).
