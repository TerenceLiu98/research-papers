---
title: "CarbonFluxBench: A Global Benchmark for Upscaling of Carbon Fluxes Using Zero-Shot Learning"
type: paper
authors:
  - Aleksei Rozanov
  - Arvind Renganathan
  - Yimeng Zhang
  - Vipin Kumar
year: 2026
doi: "10.1145/3770855.3817566"
venue: KDD 2026
tags:
  - carbon-flux-modelling
  - spatial-transfer
  - benchmarks
  - time-series-regression
---

## TL;DR

CarbonFluxBench standardizes daily carbon-flux prediction at unseen tower sites using 1,170,682 observations from 474 sites during 2000-2024. It combines satellite and meteorological predictors with vegetation- and climate-stratified site splits. Temporal models lead the main GPP and RECO comparisons, but LightGBM remains competitive and NEE is substantially harder. Larger feature sets do not consistently improve spatial transfer, especially at poorly predicted sites.

## Research Question

How well can models trained on sparse eddy covariance observations predict carbon exchange at entirely unseen locations, and how do architecture, environmental stratification, and predictor richness affect that transfer?

## Motivation

[[concepts/data-driven-carbon-flux-modelling|Data-driven carbon flux modelling]] must extend sparse tower measurements to locations with different ecosystem dynamics. Conventional temporal forecasting evaluations do not test this spatial requirement. Differences in sites, predictors, targets, and metrics also make existing upscaling studies difficult to compare. CarbonFluxBench supplies a common regression task and reports the distribution of site-level errors so that strong average performance cannot conceal widespread local failures.

## Contributions

- Harmonizes FLUXNET, AmeriFlux, ICOS, and JapanFlux observations with MODIS reflectance, ERA5-Land meteorology, and ecosystem metadata.
- Defines two site-disjoint train-test partitions stratified by IGBP vegetation or Koppen climate class, with standardized feature configurations and quality-filtered evaluation.
- Compares boosted trees, recurrent networks, transformers, and the transfer-oriented TAM-RL architecture using site-level accuracy quantiles.
- Provides a Python workflow for data handling, training, and evaluation; the supplied text does not expose a usable release URL.

## Method

**Targets and predictors.** The targets are gross primary production (GPP), ecosystem respiration (RECO), and net ecosystem exchange (NEE), standardized through ONEFlux. Their balance is $\mathrm{NEE}=\mathrm{RECO}-\mathrm{GPP}$. MOD09GA surface reflectance is aggregated around towers in 2 km by 2 km windows, with cloud fraction as a quality proxy. ERA5-Land supplies 150 meteorological variables. Predictors are aligned daily, MODIS gaps are filled, and continuous predictors and targets are normalized using training-split statistics only (Sections 4.1-4.5).

The dataset reports 165 features: 150 meteorological, 12 MODIS, two climate variables, and one vegetation category, in addition to coordinates and observation time. Minimal, Standard, and Full denote nested **meteorological** subsets of 6, 36, and 150 variables, not total input widths. Minimal uses temperature, precipitation, net solar radiation, evaporation, and high/low vegetation leaf-area indices.

**Spatial protocol.** All flux labels from test sites are withheld; covariates at those locations remain available. This tests regression at unseen sites without labeled target-site adaptation, rather than future forecasting at known sites. Both partitions retain categories in training and testing:

| Stratification | Training sites | Test sites | Coverage |
| --- | ---: | ---: | --- |
| IGBP vegetation | 371 | 103 | 16 represented vegetation classes |
| Koppen climate | 379 | 95 | Five main climate classes |

These are within-category site holdouts, not leave-one-biome-out or leave-one-climate-out experiments. Section 5.2 describes extra test allocation for rare vegetation types; its exact rule and Table 1 do not fully agree.

**Models and training.** XGBoost and LightGBM use one day's inputs. LSTM, GRU, CT-LSTM, CT-GRU, an encoder-only Transformer, a PatchTST-based Patch-Transformer, and TAM-RL use 30-day windows with training stride 15. CT variants concatenate one-hot vegetation and climate labels at each timestep. Neural models jointly predict all three fluxes with the loss

$$
\mathcal L=\mathrm{MSE}\,w_{\mathrm{qc}}w_{\mathrm{igbp}}w_{\mathrm{koppen}}+0.1\mathcal L_{\mathrm{flux}},
$$

where weights encode observation quality and inverse class frequency, and the flux term penalizes carbon-balance violations. Tree models omit the joint flux constraint. The paper reports five-fold climate-stratified cross-validation for tuning and prediction averaging over ten independently seeded models (Section 5.5; Appendix D).

## Experiments

**Evaluation.** Only observations with quality flag equal to one are scored; 490,232 observations meet this criterion across the full dataset. Training uses the broader quality spectrum with loss weighting. Metrics are site-level $R^2$, RMSE in $\mathrm{gC\,m^{-2}\,day^{-1}}$, and MAE normalized by site-level mean flux magnitude. Sections 5.1 and 6.1 describe the reported median and quartiles as summaries across test sites, not confidence intervals over seeds.

**Minimal-feature results.** Selected median site-level $R^2$ values from Table 2:

| Split | Model | GPP | RECO | NEE |
| --- | --- | ---: | ---: | ---: |
| IGBP | LightGBM | 0.540 | 0.350 | 0.219 |
| IGBP | CT-LSTM | 0.573 | 0.451 | 0.141 |
| IGBP | TAM-RL | 0.574 | 0.393 | 0.204 |
| Koppen | LightGBM | 0.608 | 0.541 | 0.283 |
| Koppen | CT-LSTM | 0.648 | 0.489 | 0.296 |
| Koppen | TAM-RL | 0.644 | 0.593 | 0.270 |

TAM-RL narrowly leads IGBP GPP, CT-LSTM leads IGBP RECO and Koppen GPP, and TAM-RL leads Koppen RECO. LightGBM has the highest IGBP NEE median among all nine baselines, while CT-LSTM leads Koppen NEE. Thus temporal context does not confer a uniform advantage across targets. NEE median nMAE spans 2.046-2.654 versus 0.397-0.553 for GPP; the authors interpret NEE's difficulty partly through its role as a small residual between larger opposing fluxes.

**Lower-quartile performance.** TAM-RL's IGBP GPP 25th-percentile $R^2$ is 0.251 versus 0.179 for CT-LSTM and 0.019 for LSTM. On Koppen RECO, however, LightGBM reaches 0.186 versus TAM-RL's 0.053. TAM-RL is the only temporal baseline with positive lower-quartile $R^2$ for all three targets on the Koppen split. These quantiles describe the lower-performing portion of sites, not the worst observed site or a formal robustness guarantee.

**Feature richness.** Tables 4-5 omit tree baselines. CT-LSTM's Koppen GPP median declines from 0.648 with Minimal to 0.625 with Standard and 0.584 with Full. TAM-RL's IGBP GPP lower quartile falls from 0.251 to 0.099 and 0.087. Conversely, LSTM's Koppen NEE median improves from 0.241 to 0.315 with Standard before falling to 0.271 with Full. Richer inputs therefore help some model-target combinations while worsening others; the proposed explanation of overfitting to site-specific patterns is an interpretation rather than an isolated causal result.

**Process-model comparison.** MiCASA is evaluated on an overlapping subset after approximately 1.2% missing samples are removed. Its NEE median $R^2$ is 0.133 for Koppen and -0.005 for IGBP (Table 3). Spatial-resolution mismatch and its prediction of NPP and heterotrophic respiration rather than GPP and total RECO prevent a matched comparison of all three targets with the learned baselines.

## Limitations

- Tower coverage is concentrated in North America and Europe. Tropical and polar classes contain only 19 and 11 sites, respectively; several vegetation classes have two. Site holdouts within represented categories do not establish reliability in entirely unobserved ecosystems.
- Restricting scoring to the highest-quality observations changes the evaluated sample distribution. Component fluxes depend on partitioning, and remote-sensing and reanalysis footprints differ from tower footprints.
- NEE normalization is sensitive to its small mean magnitude. Large nMAE values should be read alongside absolute error and $R^2$, rather than treated as an independent measure of physical error severity.
- Apart from TAM-RL, baselines largely use standard supervised learning. Target-specific modelling, broader adaptation methods, uncertainty calibration, and detailed class-wise results remain research opportunities rather than demonstrated solutions.
- The supplied text contains reporting inconsistencies: Appendix C says 567 sites while the main dataset description, split totals, and Figure 6 caption give 474; the stated 50/50 rule for vegetation classes with at most ten sites does not match every Table 1 row. Table captions describe ensemble medians ambiguously relative to the site-quantile evaluation text. Section 6.1 calls TAM-RL the only temporal model with positive lower-quartile Koppen RECO, but Table 2 also gives CT-LSTM 0.016. This summary uses the tabulated values and the main protocol without inferring corrections.

## Related Concepts

- [[concepts/data-driven-carbon-flux-modelling|Data-Driven Carbon Flux Modelling]]: learning ecosystem exchange from tower measurements and spatially available drivers.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: a related transfer setting; broad pretraining for future forecasting differs from the site-held-out, covariate-conditioned regression evaluated here.

## Related Papers

- [[papers/carbonsense-a-multimodal-dataset-and-baseline-for-carbon-flux-modelling|CarbonSense: A Multimodal Dataset and Baseline for Carbon Flux Modelling]]: a library comparison with hourly NEE, imagery, and missing-observation handling. Its results use a different dataset and protocol and are not direct benchmark comparisons or a citation in the supplied paper.
- Nathaniel, Liu, and Gentine (2023), "MetaFlux: Meta-learning global carbon fluxes from sparse spatiotemporal observations" (reference 136): a cited meta-learning approach to global flux estimation.
- Renganathan et al. (2025), "Task Aware Modulation using Representation Learning: An Approach for Few Shot Learning in Environmental Systems" (reference 199): the cited TAM-RL methodological foundation.
- Jung et al. (2020), "Scaling carbon fluxes from eddy covariance sites to globe: synthesis and evaluation of the FLUXCOM approach" (reference 110): a cited operational upscaling framework.

Source: [KDD paper DOI](https://doi.org/10.1145/3770855.3817566).

[[index|Library home]]
