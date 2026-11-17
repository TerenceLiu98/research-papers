---
title: Regional climate risk assessment from climate models using probabilistic machine learning
type: paper
authors:
  - Zhong Yi Wan
  - Ignacio Lopez-Gomez
  - Robert Carver
  - Tapio Schneider
  - John Anderson
  - Fei Sha
  - Leonardo Zepeda-Núñez
year: 2026
doi: 10.1038/s42256-026-01308-7
tags:
  - climate-downscaling
  - generative-models
  - climate-risk
---

## TL;DR

GenFocal combines distributional bias correction with conditional diffusion to turn daily 1.5° climate simulations into 2-hourly 0.25° regional weather. It requires no event-aligned climate–reanalysis training pairs and improves historical compound-heat and tropical-cyclone statistics relative to coarse simulations and statistical downscaling baselines.

## Research Question

Can unaligned coarse climate simulations and historical reanalysis support probabilistic regional downscaling that preserves multivariate, spatial, and temporal dependencies needed to assess persistent and compound extremes?

## Motivation

Free-running climate simulations cannot be matched event by event to observed weather. Dynamical downscaling is expensive for large ensembles, while conventional statistical methods can miss dependencies that determine humid heatwaves and cyclone evolution. Matching individual-variable distributions alone is insufficient for these risks.

## Contributions

- A modular two-stage generative framework that separates coarse-scale debiasing from fine-scale weather synthesis.
- Explicit temporal modelling in both stages, with overlapping temporal domains supporting extended coherent samples.
- Evaluation of compound heat, cyclone life cycles, and regional climate-change responses using large downscaled ensembles.

## Method

A rectified-flow ODE transports coarse CESM2 LENS2 sequences to the distribution of coarse-grained ERA5 sequences. This is distribution matching, not reconstruction of corresponding observed events. The velocity network learns displacements along interpolated source–target pairs; inference integrates the field with fourth-order Runge–Kutta.

A conditional diffusion model then samples fine-scale residuals relative to an interpolated coarse weather field. Its training pairs are obtained by coarsening ERA5 itself, so the super-resolution stage does use aligned pairs even though the climate-to-reanalysis mapping does not. Adding sampled residuals to the interpolated field yields weather realizations. Overlapping temporal domains enforce coherence when sampling sequences longer than the short training windows.

The input has ten daily variables and the output four variables at 2-hourly resolution. Training uses 1980–1999, tuning 2000–2009, and evaluation 2010–2019.

## Experiments

ERA5 supplies the historical reference; BCSD and STAR-ESDM supply statistical baselines. Evaluation includes marginal bias and distribution distances, spatial correlations, temporal spectra, cross-variable tail dependence, and hazard-specific statistics.

| Evaluation | Reported finding |
| --- | --- |
| Summer heat-index 99th percentile over CONUS | Average bias reduction greater than 35% against statistical baselines |
| Temperature–humidity tail dependence | Average error reduction of 44% against BCSD and STAR-ESDM |
| Five-day streaks with daily maximum heat index above 305 K | Average bias reductions of 44% versus BCSD and 57% versus STAR-ESDM |
| North Atlantic cyclones, 2010–2019 | Tracks, genesis, landfalls, frequency, intensity, and morphology consistent with ERA5 at the target resolution; ensemble comparisons use 100 LENS2 and 800 GenFocal members |

For 2020–2080 western-US temperature extremes, GenFocal reproduces coastal–inland differences resembling WRF dynamical downscaling; the statistical baselines show more uniform warming. These comparisons use 45-km and 9-km WRF outputs interpolated to the GenFocal grid.

For cyclone projections, eight samples per LENS2 trajectory produce 8,000 August–October seasons for each of 2010–2019 and 2050–2059. The model projects increased US east-coast landfalls and subtropical intensification, with tropical weakening. These are model-based projections, not verified future outcomes.

## Limitations

Distributional alignment is weaker than eventwise physical correspondence. Historical evaluation is relative to ERA5 and its 0.25° resolution, which limits what agreement can establish about fine-scale cyclone intensity. Evidence covers CESM2 LENS2 and the studied regions; generalization across climate models or regions is not established here. Future comparisons with WRF provide consistency evidence rather than future ground truth. The supplied article refers detailed architectures, ablations, and temporal-domain procedures to supplementary material not included in this Markdown.

## Related Concepts

- [[concepts/climate-downscaling|Climate Downscaling]]: translates coarse climate information into regional weather distributions.
- [[concepts/flow-matching|Flow Matching]]: rectified-flow transport corrects the coarse distribution without event alignment.
- [[concepts/diffusion-models|Diffusion Models]]: conditional residual generation restores fine spatial and temporal detail.

## Related Papers

- Mardani et al. (2025), “Residual corrective diffusion modeling for km-scale atmospheric downscaling”: related residual diffusion downscaling cited by the article.
- Lopez-Gomez et al. (2025), “Dynamical-generative downscaling of climate model ensembles”: a related approach using dynamical simulations to establish aligned training data.
- Liu, Gong, and Liu (2023), “Flow straight and fast: learning to generate and transfer data with rectified flow”: methodological foundation for the debiasing stage.

Source: [published article](https://doi.org/10.1038/s42256-026-01308-7).
