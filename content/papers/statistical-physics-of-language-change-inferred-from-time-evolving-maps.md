---
title: Statistical physics of language change inferred from time evolving maps
type: paper
authors:
  - James Burridge
  - Bert Vaux
year: null
source_job_id: cf7217e1-18d1-4d3d-996c-04ac40f29d63
tags:
  - sociophysics
  - language-change
  - spatial-inference
  - dialectology
  - phase-ordering
---

## TL;DR

Burridge and Vaux reconstruct changing U.S. lexical maps from birth-cohort survey data, then fit a spatial model combining migration, local copying, frequency-dependent accommodation, and variant-specific bias. The fitted model supports accommodation as a mechanism that can preserve dialect boundaries against migration. Forecasts capture some subsequent changes, but spatially detailed bias fields do not generally improve prediction. The publication year and stable paper identifiers are not stated in the supplied manuscript.

## Research Question

Can a statistical field model fitted to time-evolving dialect maps explain the persistence and movement of linguistic boundaries, distinguish the roles of migration and accommodation, and forecast future variant frequencies?

## Motivation

Earlier spatial models reproduced plausible dialect patterns but offered limited parameter inference and predictive validation. Sparse observations make raw local frequencies unreliable, while models restricted to binary variants or simplified movement cannot represent common lexical choices and long-range migration. The paper links a smoothed reconstruction of historical fields to a mechanistic model that accommodates multiple variants and independently calibrated migration.

## Contributions

- Estimates spatial and temporal variant-frequency fields using a multinomial observation model, Gaussian process priors, and cross-validated smoothing.
- Derives a multi-variant stochastic field model from individual migration, local copying, and replicator selection with frequency-dependent accommodation and spatially varying bias.
- Fits drift parameters to changes in reconstructed fields and derives a stationary-interface condition for an idealized two-variant system.
- Evaluates deterministic forecasts across overlapping training decades and horizons up to 25 years, including zero-bias, constant-bias, and spatially varying bias models.

## Method

### Data and Empirical Fields

The Cambridge Online Survey of World Englishes contains approximately 100,000 responses overall. Respondents report birth year and where they acquired their linguistic features; 93% of reported birth dates fall in 1950-2000. The analysis covers six lexical variables: terms for a woodlouse, rain during sunshine, plural address, a freshwater crustacean, a carbonated beverage, and athletic shoes. Rare variants and some responses without a distinctive term are excluded, and some similar variants are grouped. Frequencies are therefore conditional on using a retained variant, rather than unconditional population shares.

[[concepts/apparent-time-inference|Apparent-Time Inference]] treats differences between birth cohorts as evidence of historical community change, assuming substantial stabilization of language after adolescence. Birth year is the time coordinate, not the date of a historical survey. Population-weighted k-means on 2020 mainland U.S. zip-code coordinates produces 4,000 Voronoi cells. For a typical variable, approximately 10% of cells lack respondents, representing about 2% of the population in the sample.

A latent field $F$ is transformed into variant frequencies by $x_{ik}(t)=\operatorname{softmax}(F_i(t))_k$. A Gaussian process prior supplies spatial and temporal smoothing, including spatial length scales that depend on population density. Four hyperparameters are selected using held-out log likelihood under a random 80/20 respondent split. The complete dataset is then used to compute maximum a posteriori (MAP) fields (Section 2; Appendix A).

### Movement and Selection

Migration follows a gravity-type model fitted to 2011 IRS county-to-county flows, with its scale adjusted to the historical mean annual intercounty migration probability of 6.3% during 1950-2000. Symmetric modeled flows preserve expected cell populations. Local copying uses a population-weighted Gaussian neighborhood with radius parameter $R=100$ km and rate $J=0.1$, chosen to give plausible interface widths rather than jointly estimated from all cells.

Variant fitness in cell $i$ is

$$
q_{ik}=s_{ik}+\beta x_{ik},
\qquad
\bar q_i=\sum_k q_{ik}x_{ik}.
$$

The bias $s_{ik}$ captures frequency-independent local appeal and residual omitted processes. The [[concepts/linguistic-accommodation|Linguistic Accommodation]] coefficient $\beta$ increases the fitness of locally common variants. The deterministic drift is

$$
\dot x_{ik}=x_{ik}(q_{ik}-\bar q_i)
+\sum_j\left[w_{ij}+Jl_{ij}-(w_i+J)\delta_{ij}\right]x_{jk},
$$

where $w_{ij}$ are migration rates, $w_i=\sum_jw_{ij}$, and $l_{ij}$ are local copying weights. Bias fields use a low-dimensional spatial basis; a typical 1,000 km smoothing scale requires 13 basis functions. Accommodation and bias are fitted by regularized least squares between MAP-field increments and model drift. The stochastic term is derived but its amplitude is not inferred, and it is set to zero for forecasts (Sections 3-4; Appendix C).

### Interface Approximation

For two variants, uniform population density, zero bias, an isolated planar boundary, and approximately balanced incoming variants, a stationary interface requires $\beta>2\lambda$, where $\lambda$ is the migration rate. Its characteristic width is

$$
w=\sqrt{\frac{D}{\beta-2\lambda}},
\qquad D=\frac{JR^2}{2}.
$$

With $\beta=0.2$, $\lambda=0.06$, $J=0.1$, and $R=100$ km, the width is approximately 80 km. The two-dimensional extension connects dialect boundaries to curvature-driven [[concepts/phase-ordering-in-dialects|Phase Ordering in Dialects]], modified by population gradients, bias, and migration. The threshold belongs to this approximation, not to arbitrary dialect systems.

## Experiments

The study combines empirical reconstruction, parameter estimation, analytical approximations, and retrospective forecasting; it is not an intervention on speakers.

| Analysis | Reported finding | Scope |
| --- | --- | --- |
| Athletic-shoe boundary | Migration and copying alone largely erase the sneakers region; accommodation near $\beta=0.2$ with small bias preserves it | Model comparison initialized from the 1950 MAP field |
| Changing lexical regions | The roly-poly region expands, while the Southern expression for rain during sunshine contracts despite a small positive fitted bias | Sections 4.2-5; migration and accommodation can outweigh intrinsic bias |
| Across six variables | Accommodation is generally near 0.2 and declines for five variables; in four, the growing variant has zero or negative fitted constant bias | Figure 11; growth need not imply positive intrinsic preference |
| Carbonated-beverage forecast | Mean cellwise KL divergence is 0.007, 0.02, and 0.04 at 5, 10, and 15 years | Figure 10; parameters fitted over 1975-1985, bias scale 2,000 km |
| Bias-model comparison | Bias can improve or leave unchanged roughly decadal forecasts, but spatial variation in bias does not generally improve prediction; some complex models become worse than zero bias beyond 10-15 years | Figure 9; overlapping training windows and horizons up to 25 years |

Forecasts start from the MAP field at the end of a ten-year fitting window. Performance is the unweighted mean over cells of $D_{\mathrm{KL}}(x^{\mathrm{MAP}}\|x^{\mathrm{pred}})$; bands show one standard deviation across training windows. The bias comparison includes spatial scales of 400, 800, and 1,600 km, a spatially constant bias, and zero bias. These are comparisons among model variants, not a reported benchmark against all forecasting alternatives.

The manuscript lists code and generated state-field data at [COSWE_stat_phys](https://github.com/james-burridge/COSWE_stat_phys).

## Limitations

- **Apparent time and sampling.** Historical trajectories are inferred from contemporary survey respondents across cohorts. Later-life lexical adoption can violate stabilization assumptions; voluntary participation and sparse cells limit interpretation as representative historical measurement.
- **Forecast reference and uncertainty.** Evaluation uses reconstructed MAP fields, not independently observed future surveys. Appendix A estimates those fields from the complete dataset, so later cohorts can inform smoothing near a forecast origin. The reported retrospective results do not establish a strictly prospective pipeline using only information available at that origin. MAP uncertainty is not propagated through drift fitting and forecasts, and forecast bands measure variation across windows rather than full predictive uncertainty.
- **Migration and residual bias.** Modern migration flows and a 2020 population discretization approximate earlier decades. Symmetric flows cannot reproduce net growth of places such as Los Angeles. Fitted bias may therefore absorb missing historical migration or other omitted mechanisms, rather than identify prestige or social preference causally.
- **Parameter interpretation.** The drift-fitting approximation assumes smoothing preserves drift locally. The copying rate is chosen from interface widths, and the switching-rate parameter governing stochastic amplitude is unidentified. Spatially detailed historical bias can reduce longer-horizon accuracy.
- **Excluded variants.** Appendix C.4 preserves the replicator form for retained variants, but if accommodation responds to full-population frequencies its fitted coefficient becomes an effective $\beta M(t)$, where $M$ is the retained-variant share. Changes in that share can alter inferred accommodation without changes in the underlying coefficient.
- **Scope.** Six lexical variables are modeled independently as discrete choices. Phonology, grammar, coupled variables, and identity-driven divergence need additional structure. The evidence supports a model-based accommodation mechanism without ruling out competing social explanations.

## Related Concepts

- [[concepts/apparent-time-inference|Apparent-Time Inference]]: connects birth cohorts to historical community states.
- [[concepts/linguistic-accommodation|Linguistic Accommodation]]: frequency-dependent selection that can counteract migration-driven leveling.
- [[concepts/phase-ordering-in-dialects|Phase Ordering in Dialects]]: formation and movement of domains separated by isoglosses.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: a broader framework for collective patterns arising from imitation and nonlinear social influence.

## Related Papers

- Burridge (2017), "Spatial evolution of human dialects," Physical Review X 7, 031008: an earlier surface-tension model cited as reference 18.
- Burridge and Blaxter (2021), "Inferring the drivers of language change using spatial models," Journal of Physics: Complexity 2, 035018: earlier spatial parameter fitting, reference 20.
- Burridge (2026), "Statistical field theory for dialectology," Physical Review E 113, 044310: the binary statistical-field predecessor discussed in the introduction, reference 28.
- [[papers/stochastic-thermodynamics-of-social-imitation-beyond-energetics|Stochastic Thermodynamics of Social Imitation beyond Energetics]]: a thematic library connection that also derives aggregate dynamics from individual imitation; it studies reaction-resolved thermodynamics rather than fitting dialect maps and is not presented here as a citation by Burridge and Vaux.

[[index|Library home]]
