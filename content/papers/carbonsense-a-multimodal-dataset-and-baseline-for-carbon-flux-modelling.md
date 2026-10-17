---
title: "CarbonSense: A Multimodal Dataset and Baseline for Carbon Flux Modelling"
type: paper
authors:
  - Matthew Fortier
  - Mats L. Richter
  - Oliver Sonnentag
  - Chris Pal
year: null
source_job_id: "18672330-ee84-4669-aa2a-dfaa9c729c37"
aliases:
  - CarbonSense
  - EcoPerceiver
tags:
  - carbon-flux-modelling
  - multimodal-learning
  - environmental-datasets
  - missing-data
---

## TL;DR

CarbonSense combines hourly eddy covariance observations from 385 sites with MODIS imagery to standardize data-driven carbon flux modelling. Its EcoPerceiver baseline fuses meteorological and satellite inputs over a 32-hour window and improves net ecosystem exchange prediction over XGBoost in 12 of 15 ecosystem classes. Evergreen needleleaf forests, wetlands, and water bodies remain exceptions; all evaluated models perform worse than the observed-mean baseline on water bodies.

## Research Question

Can a standardized multimodal dataset and a model that integrates temporal context and incomplete observations improve carbon flux prediction at unseen measurement sites?

## Motivation

[[concepts/data-driven-carbon-flux-modelling|Data-Driven Carbon Flux Modelling]] uses sparse ecosystem measurements to learn relationships that can support regional or global flux estimation. Ad hoc data preparation makes model comparisons difficult, while tabular predictors compress the spatial information in satellite imagery and often ignore recent environmental history. CarbonSense supplies a common data resource for investigating these choices.

## Contributions

- A site-partitioned dataset covering 385 eddy covariance stations, with over 27 million hourly observations reported in Section 3, paired with satellite data where available.
- A reproducible preparation pipeline that merges standardized network releases, filters inputs by quality flags, and exposes configurable gap-filling tolerance; the dataset is described as CC-BY-4.0.
- EcoPerceiver, a compact multimodal architecture with per-timestep cross-attention, temporal self-attention, and explicit missing-input masks.
- Site-held-out evaluation by ecosystem class, ten-seed comparisons against XGBoost, additional baselines, and exploratory ablations.

## Method

**Dataset.** CarbonSense merges FLUXNET2015, ICOS releases, and AmeriFlux data processed through ONEFlux. Overlapping records favor the newer release, and half-hourly measurements are aggregated to hourly observations. Seven MCD43A4 spectral bands and MCD43A2 water/snow bands form daily 8-by-8-by-9 images covering 4-by-4 km around each tower. Pre-2000 observations lack MODIS imagery. Targets include net ecosystem exchange (NEE), gross primary productivity (GPP), and ecosystem respiration (RECO); the experiments focus on NEE. With the paper's sign convention, NEE = RECO - GPP, so negative NEE indicates net carbon uptake.

**Input quality and representation.** The main experiments accept directly observed and high-confidence gap-filled values (maximum QC flag 1). Restricting inputs to directly measured values reduces dataset size by 55%. Scalar predictors are min-max normalized and encoded with sine/cosine features at 12 frequencies, concatenated with learned variable embeddings. Each flattened image band receives a linear projection and a band embedding. A modality mask excludes unavailable inputs and implements observational dropout of 0.3 during training.

**EcoPerceiver.** One latent token per hour cross-attends only to that hour's inputs. Moving the time axis into the batch axis makes this windowed cross-attention cost proportional to the number of timesteps times the number of variables, for a fixed projection dimension. Causal self-attention then exchanges information across latent timesteps; this temporal attention is a separate operation from the linear-in-time cross-attention. Eight weight-shared cross-attention blocks alternate with causal self-attention, followed by four additional causal self-attention blocks. A linear head reads the final timestep to estimate flux. The main configuration uses 32 hours, latent width 128, and 988,633 parameters (Appendix B.2).

**Training and comparator.** EcoPerceiver minimizes MSE with AdamW, learning rate 0.00008, batch size 4096, and four A100 GPUs. Runs converge in 6-13 epochs. XGBoost uses distance-weighted spatial averages of each image band and 50 random-search iterations with five-fold cross-validation. After tuning, XGBoost trains on all non-test sites, whereas EcoPerceiver reserves 20% of those sites for validation.

## Experiments

**Protocol.** The site split holds out between one and five sites per IGBP ecosystem class, using the ceiling of 20% of sites capped at five. Deciduous needleleaf forests (DNF) and snow/ice (SNO) have no training sites; cropland/natural vegetation mosaics (CVM) and water bodies (WAT) each have one. Ten final seeds are used after hyperparameter selection. [[concepts/nash-sutcliffe-efficiency|Nash-Sutcliffe Efficiency]] (NSE) and RMSE are reported by ecosystem; higher NSE and lower RMSE are better.

Selected ten-seed means from Table 2; RMSE is in the NEE target units, micromoles CO2 per square metre per second:

| Ecosystem | XGBoost NSE | EcoPerceiver NSE | XGBoost RMSE | EcoPerceiver RMSE |
| --- | --- | --- | --- | --- |
| Croplands (CRO) | 0.8066 | 0.8482 | 3.2381 | 2.8677 |
| Deciduous needleleaf forests (DNF) | 0.2803 | 0.4336 | 4.0974 | 3.6322 |
| Evergreen needleleaf forests (ENF) | 0.7765 | 0.7694 | 2.8141 | 2.8579 |
| Grasslands (GRA) | 0.7461 | 0.7967 | 3.2487 | 2.9059 |
| Savannas (SAV) | 0.5802 | 0.7368 | 1.6514 | 1.3070 |
| Snow and ice (SNO) | -0.0370 | 0.2898 | 1.4291 | 1.1816 |
| Water bodies (WAT) | -11.0524 | -14.4010 | 3.1838 | 3.5802 |
| Permanent wetlands (WET) | 0.4530 | 0.4137 | 2.2073 | 2.2830 |

EcoPerceiver has better means in 12 of 15 classes, but this is not 12 statistically significant wins: for example, closed shrublands have a reported paired-test p-value of 0.0772. Table 2 reports p = 0.0409 for XGBoost's ENF advantage and p = 0.0651 for WET. Appendix B.5's statement that neither advantage is significant conflicts with the ENF table value at an unadjusted 0.05 threshold.

**Additional baselines.** Tables 8-9 include linear regression, random forests, and a single-timestep vanilla transformer. The transformer gives the best WAT NSE (-9.6845), but even this is worse than predicting the observed mean.

**Ablations.** Appendix B.7 uses one seed and excludes WAT. Table 10's truncated-mean NSE is 0.669 for EcoPerceiver, 0.635 without imagery, 0.635 with the gap-filled-data variant, 0.624 without Fourier encoding, 0.634 without observational dropout, 0.654 without causal masking, and 0.557 for the vanilla transformer. Causal masking provides little clear benefit in this experiment. Increasing context from 8 to 16 hours helps markedly, 16 to 32 helps modestly, and 64 adds no meaningful gain while increasing memory and runtime. A separate single-run DBF experiment gives NSE 0.7532 when trained on all ecosystems versus 0.7405 when trained only on DBF sites (Table 11).

## Limitations

- North America, Europe, evergreen needleleaf forests, and grasslands are overrepresented; Africa, Central Asia, and South America are underrepresented. Held-out-site performance does not establish reliable global extrapolation.
- Zero- and one-training-site ecosystem tests have very few test sites. WAT failures and the qualitative example of a disturbed forest show that neither abundant overall data nor low absolute error guarantees useful local predictions.
- The XGBoost comparison uses a different image representation and more final training sites. The vanilla transformer lacks temporal context, so its gap does not isolate the effect of windowed cross-attention alone.
- Ablations use a single seed and remove the hardest ecosystem. Their aggregate gains cannot be interpreted as ten-seed robustness or performance across all ecosystem types.
- Explicit masking does not make the dataset wholly free of imputation: the main QC threshold retains high-confidence gap-filled values.
- The supplied Markdown contains no explicit publication year, venue, DOI, arXiv identifier, or usable dataset/code release address. These are left unspecified rather than inferred from cited works.

## Related Concepts

- [[concepts/data-driven-carbon-flux-modelling|Data-Driven Carbon Flux Modelling]]: predicts ecosystem exchange from meteorological and remote-sensing observations.
- [[concepts/nash-sutcliffe-efficiency|Nash-Sutcliffe Efficiency]]: evaluates squared prediction error relative to observed target variability.
- [[concepts/patch-masking-for-missing-time-series-inputs|Patch Masking for Missing Time-Series Inputs]]: a related missing-input strategy. EcoPerceiver masks variable observations within timesteps rather than removing fully missing temporal patches.

## Related Papers

- Jaegle et al. (2021), "Perceiver: General Perception with Iterative Attention": the cited latent cross-attention foundation (reference 26).
- Pastorello et al. (2020), "The FLUXNET2015 Dataset and the ONEFlux Processing Pipeline for Eddy Covariance Data": the cited standardized measurement resource (reference 14).
- Nelson et al. (2024), "X-BASE: The First Terrestrial Carbon and Water Flux Products from an Extended Data-Driven Scaling Framework, FLUXCOM-X": the cited model-preparation precedent for the XGBoost comparator (reference 4).
- [[papers/towards-robust-real-world-multivariate-time-series-forecasting-a-unified-framework-for-dependency-asynchrony-and-missingness|Towards Robust Real-World Multivariate Time Series Forecasting: A Unified Framework for Dependency, Asynchrony, and Missingness]]: a library comparison on incomplete temporal inputs, not a citation or evaluated baseline in CarbonSense. It forecasts future values using channel summaries and patch removal; EcoPerceiver estimates flux from contemporaneous and preceding observations.

[[index|Library home]]
