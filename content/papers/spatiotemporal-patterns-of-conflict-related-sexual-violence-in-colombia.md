---
title: Spatiotemporal patterns of conflict-related sexual violence in Colombia
type: paper
authors:
  - Elisavet Pappa
  - Alida Acosta-Ortiz
  - Charlotte Constable Fernandez
  - "María Camila García Durán"
  - Charlotte M. Jones Todd
  - Rob Saunders
  - Francesca Solmi
  - William Tamayo-Agudelo
  - Fabio Idrobo
  - Vaughan Bell
year: 2026
doi: 10.1038/s44360-026-00187-x
venue: Nature Health
source_job_id: f8cbc601-12a0-4481-883d-5c386373feb5
tags:
  - conflict-related-sexual-violence
  - spatial-statistics
  - hawkes-processes
  - colombia
---

## TL;DR

Two national Colombian victimization databases show that recorded sexual violence disproportionately affects women and minority ethnic groups. Spatial point-process models suggest a broader distribution than raw counts reveal and a more dispersed pattern in 2014-2024. Apparent near-critical temporal self-excitation largely attenuates when the Hawkes background rate varies over time. Remaining fitted effects decay within the one-day resolution of the analysis, limiting what can be concluded about short-term triggering.

## Research Question

Who experiences recorded conflict-related sexual violence in Colombia, where does it concentrate, and does temporal clustering reflect event-to-event excitation or slower changes in the background incidence rate?

## Motivation

National patterns can inform the geographic allocation of survivor support and the timescales relevant to prevention. Raw counts mix population concentration, reporting processes, and underlying event intensity. Similarly, clusters in time can arise from changing background conditions without one incident triggering another. The study compares 1964-2024 with the nested 2014-2024 period, selected for its relevance to Colombia's 2014 statutory guarantees of care and justice.

## Contributions

- Combines demographic descriptions from the Register of Victims (RUV) and the National Centre for Historical Memory (NCHM), while distinguishing victim registrations from event records.
- Uses population-adjusted [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]] to estimate latent spatial intensity.
- Compares constant and spline-varying background rates in temporal Hawkes models to assess the sensitivity of inferred contagion.
- Reports simulation-based model checks and sensitivity analyses for spatial mesh resolution and temporal spline smoothing.

## Method

RUV contains registrations for access to reparations and codes location by municipality. NCHM combines multiple reporting sources and supplies event timestamps and coordinates. Both support demographic and co-occurrence summaries; the spatial and temporal models use NCHM. RUV is restricted-access, whereas the authors provide NCHM data and analysis code in their [research repository](https://github.com/ElisavetPappa/col-conflict-sv).

The spatial analysis fits LGCP models with and without log population density, extracted at mesh nodes from back-projected census data. Baseline log intensity, spatial correlation range, and latent-field variation summarize geographic structure. A high inferred intensity is an estimate of event concentration, not direct evidence of unreported cases or causal spread.

The temporal analysis fits exponential Hawkes models by maximum likelihood using `stelfi`, comparing a constant background rate with a non-homogeneous rate obtained by fitting splines to sexual-violence incidence. Thus the adjustment represents changing incidence; it is not a direct measurement of all structural determinants or an independent conflict-intensity covariate. The branching ratio is $\alpha/\beta$ and excitation half-life is $\log(2)/\beta$. One day of random jitter separates tied timestamps, placing sub-day estimates below effective temporal resolution.

## Experiments

This is an observational secondary-data study, with simulations used for model validation rather than intervention evaluation.

### Demographics and Co-occurrence

Table 1 reports 90.1% female victims in NCHM and 90.6% in RUV. Afrocolombian victims constitute 8.8% and 20.5%, respectively; Indigenous victims constitute 1.4% and 3.4%. RUV has an older age profile, which may partly reflect delays between victimization and registration.

RUV co-registration is especially frequent for torture (18.3%) and physical wounds (11.9%). These percentages use the number registered for each other exposure as the denominator, not the number of sexual-violence victims. NCHM records very little event co-occurrence, so the two sources do not measure the same overlap.

### Spatial Patterns

Both sources identify high recorded concentrations in the Andean region and several Pacific and northwestern departments. LGCP surfaces extend inferred intensity beyond raw-count concentrations, particularly east of the Andes. The authors describe lower spatial intensity and broader clustering in 2014-2024. Population-density coefficients are 0.530 (SE 0.088) for 1964-2024 and 0.458 (SE 0.082) for 2014-2024.

Ripley's K rejects a spatially random description in the reported checks. Across 1,000 simulated patterns, event counts and density surfaces generally reproduce observed patterns; the full-period model slightly underestimates event density by less than 1%. Coarser and finer meshes preserve the broad spatial pattern. Exact spatial-range values are not reproduced here because the supplied prose and extended table conflict (see Limitations).

### Temporal Patterns

Reported estimates from the Results section:

| Period | Background | Excitation alpha | Decay beta | Half-life (days) | Reported branching ratio |
| --- | --- | ---: | ---: | ---: | ---: |
| 1964-2024 | Constant | 0.186 | 0.188 | 3.7 | 0.989 |
| 1964-2024 | Spline-varying | 1.283 | 3.757 | 0.18 | Not stated |
| 2014-2024 | Constant | 0.069 | 0.069 | 10.04 | 1.000 |
| 2014-2024 | Spline-varying | 0.537 | 2.843 | 0.24 | Not stated |

Allowing background variation yields larger immediate excitation amplitudes but much faster decay. The authors interpret the remaining contagion as negligible; more conservatively, the adjusted fits do not resolve sustained excitation at day-level timescales. They cannot precisely characterize within-day triggering.

Observed mean interevent times are 1.32 and 1.49 days. Both fall within the corresponding simulated 95% intervals: 0.49-4.70 and 0.42-31.87 days under constant backgrounds, and 1.26-1.34 and 1.23-1.55 days under adjusted backgrounds. The very wide recent-period constant-background interval indicates limited precision. Alternative spline smoothing settings reportedly leave the main pattern stable.

## Limitations

- Underreporting and unequal access to reporting can distort demographic and geographic patterns. Population adjustment does not correct geographically uneven stigma, retaliation risk, or service access.
- RUV registrations and NCHM events have different ascertainment and timing. Their age profiles and co-occurrence measures are not directly interchangeable.
- A single sexual-violence category pools distinct acts. NCHM perpetrator information is missing in 99.59% of cases, preventing reliable attribution to armed groups.
- Sub-day adjusted half-lives fall below the one-day jitter scale. These estimates do not establish absence of short-term triggering, and statistical excitation is not itself causal identification.
- Attenuation under a flexible background supports sensitivity to long-term trends, but does not identify specific structural causes or establish that a proposed prevention intervention works.
- The comparison uses overlapping periods of unequal duration, not a causal evaluation of the 2014 law or 2016 peace agreement.
- The supplied Extended Data Table 1 appears misaligned in its unadjusted columns and disagrees with prose on some spatial parameters and uncertainties. Exact ranges and units need checking against the original typeset material or analysis outputs before reuse.
- The supplied article gives acceptance in July 2026 and a 2026 copyright year, but its online publication date is a placeholder. No exact publication date is inferred.

## Related Concepts

- [[concepts/log-gaussian-cox-processes|Log-Gaussian Cox Processes]]: latent spatial event-intensity modeling.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: nearby locations can share underlying intensity without causal contagion.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a complementary approach to flexible triggering kernels; this study instead uses parametric excitation and maximum likelihood.
- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]]: a distinct timing problem; fixed stream offsets differ from the event-level jitter used here.

## Related Papers

- Brix and Diggle (2001), "Spatiotemporal prediction for log-Gaussian Cox processes": cited spatial point-process foundation.
- Jones-Todd and van Helsdingen (2024), "stelfi: an R package for fitting Hawkes and log-Gaussian Cox point process models": cited implementation.
- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]]: related library work on how timestamp errors affect excitation inference, not an evaluated method in this study.
- [[papers/spatial-causal-inference-in-the-presence-of-preferential-sampling-to-study-the-impacts-of-marine-protected-areas|Spatial Causal Inference in the Presence of Preferential Sampling to Study the Impacts of Marine Protected Areas]]: related library use of LGCPs to model informative sampling locations; the present study models recorded violence locations.

[[index|Library home]]
