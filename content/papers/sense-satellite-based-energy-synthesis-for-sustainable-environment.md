---
title: "SENSE: Satellite-based ENergy Synthesis for Sustainable Environment"
type: paper
authors:
  - Kailai Sun
  - Can Rong
  - Shenhao Wang
  - Mingyi He
  - Alok Prakash
  - Heye Huang
  - Baoshen Guo
  - Jinhua Zhao
year: null
source_job_id: "29197b68-68d1-450b-88a7-2d9b51801c5b"
aliases:
  - SENSE
tags:
  - urban-building-energy-modeling
  - controllable-generation
  - satellite-imagery
  - synthetic-data
  - semantic-segmentation
---

## TL;DR

SENSE combines a ControlNet-conditioned latent diffusion model with lightweight height and energy decoders to jointly generate satellite images and spatially aligned building-height and annual-energy maps from road constraints and urban-density prompts. On the four-city MUSE dataset, its energy decoder reports 89.25% accuracy and 0.7093 mIoU, while reconstructed district energy totals have 3.05% NMBE and 14.62% CVRMSE. Adding synthetic samples to prediction models trained with 20% of the real data raises mIoU by 0.0546-0.1088 across four baselines, but the study covers only annual energy, four metropolitan areas, and discretized output classes.

## Research Question

Can a controllable generative model use road geometry and urban-density conditions to synthesize realistic satellite imagery together with aligned building-height and energy-consumption maps, and can those synthetic pairs improve building-energy prediction when labeled observations are scarce?

## Motivation

[[concepts/urban-building-energy-modeling|Urban Building Energy Modeling]] usually evaluates energy demand for an existing urban form rather than generating alternative forms and their energy layers together. Data-driven models also depend on spatially aligned imagery and building-energy records that are costly, sensitive, and geographically sparse. SENSE treats urban imagery generation as a source of shared latent features from which physical annotation layers can be decoded, aiming to support scenario generation and synthetic-data augmentation from limited labels.

## Contributions

- Introduces a multimodal generative framework that conditions satellite-image synthesis on rasterized water, railway, and major-road constraints plus textual building-volume, building-coverage, and road-density measures.
- Extracts multiscale features from a latent diffusion U-Net and decodes them into five-class building-height maps and four-class building-energy maps.
- Constructs MUSE, a dataset of 2,788 quality-filtered 2 km by 2 km tiles from New York City, Boston, Lyon, and Busan, aligning satellite imagery, urban constraints, height data, and municipal energy disclosures.
- Evaluates the generated energy layer against segmentation metrics and district-scale ASHRAE Guideline 14 calibration thresholds.
- Tests synthetic-only and mixed real-synthetic training for downstream height and energy prediction under limited real-data regimes.

## Method

Each MUSE sample contains a 512 by 512 satellite tile, a text prompt with building volume density, building coverage ratio, and road density, a raster constraint map, a building-height map, and a log-transformed annual building-energy map. The authors spatially align heterogeneous public and municipal sources, then have three urban specialists reject tiles with large contiguous regions of missing or null energy labels. The retained city counts are 579 for New York City, 526 for Boston, 687 for Lyon, and 996 for Busan.

The image generator is a latent [[concepts/diffusion-models|Diffusion Model]] based on Stable Diffusion 1.5 and ControlNet. Text supplies city and density conditions, while the environmental control map constrains water, railway, and major-road topology. At a fixed denoising timestep, the method upsamples and concatenates hierarchical U-Net decoder features into a shared latent representation.

Two SegFormer-based heads decode that representation. The H-Decoder treats height as segmentation: background plus four quantile-derived height tiers. The E-Decoder predicts background and low-, medium-, or high-energy classes derived from tertiles of log-transformed consumption. Both use class-weighted cross-entropy and Dice losses. Physical energy totals are reconstructed with `expm1` and evaluated using normalized mean bias error (NMBE) and coefficient of variation of root mean square error (CVRMSE).

For downstream augmentation, prediction models are trained under three strategies: limited real data only, synthetic data only, or a mixture of limited real and generated samples. The generator and downstream models use the available 20% real training subset, and evaluation uses a separate fixed 20% real test set.

## Experiments

### Generated Outputs

The H-Decoder reports 85.75% accuracy and 0.6005 mIoU; its background and tallest-building classes attain IoUs of 0.8443 and 0.6664. The E-Decoder reports 89.25% accuracy and 0.7093 mIoU, with IoUs of 0.898 for background and 0.702 for high consumption. The satellite-image evaluation reports PSNR 14.5 and LPIPS 0.430, alongside several SSIM and FSIM diversity or precision measurements. These image metrics characterize the generated distribution but do not independently validate building-level physical correctness.

After converting class predictions back to energy values, SENSE reports 3.05% NMBE and 14.62% CVRMSE. The paper compares these with stated ASHRAE Guideline 14 thresholds of +/-10% and 30%, respectively. The inference omits explicit weather, material, building-type, and HVAC inputs, so this agreement is demonstrated for the paper's dataset and aggregation protocol rather than as a general physical guarantee.

### Synthetic Data Augmentation

With 20% real training data, mixed training improves mIoU over real-only training by 0.1041 for Streltsov et al., 0.1054 for Xie et al., 0.0546 for Mayer et al., and 0.1088 for Yap et al. The corresponding CVRMSE reductions are 2.88, 1.01, 5.84, and 9.92 percentage points. For Yap et al., mixed training moves mIoU from 0.6493 to 0.7581 and CVRMSE from 24.91% to 14.99%.

Few-shot curves show mixed training outperforming real-only training most clearly below 40% real data. Synthetic-only training remains competitive but is consistently described as slightly worse than mixed training. For building height, mixed data improves mIoU by roughly 4%-7% in limited-data settings. These experiments support synthetic augmentation, not replacement of real observations.

## Limitations

- The model generates annual total energy classes and does not represent hourly or seasonal energy dynamics.
- Evaluation spans four large metropolitan areas. It does not establish transfer to smaller settlements, developing regions, or urban forms outside those cities.
- Energy and height are discretized into quantile-based classes, limiting the resolution of generated physical values and making reconstructed totals dependent on the class-to-value procedure.
- The energy layer is inferred from visual latents without explicit weather, material, occupancy, building-use, or HVAC information; good aggregate calibration does not establish building-level causal or engineering fidelity.
- MUSE combines heterogeneous municipal disclosures and building sources. Expert filtering removes visibly incomplete labels but cannot make disclosure regimes or source quality uniform across cities.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier. These fields are left unspecified rather than inferred from citations or access dates.

## Related Concepts

- [[concepts/urban-building-energy-modeling|Urban Building Energy Modeling]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/geospatial-representation-learning|Geospatial Representation Learning]]
- Semantic segmentation
- Synthetic data augmentation

## Related Papers

- Rombach et al. (2022), "High-Resolution Image Synthesis with Latent Diffusion Models": supplies the latent image-generation foundation used by SENSE.
- Zhang, Rao, and Agrawala (2023), "Adding Conditional Control to Text-to-Image Diffusion Models": introduces ControlNet, used for geospatial constraints.
- Streltsov et al. (2020), "Estimating Residential Building Energy Consumption Using Overhead Imagery": an imagery-based energy predictor and downstream baseline.
- Mayer et al. (2023), "Estimating Building Energy Efficiency from Street View Imagery, Aerial Imagery, and Land Surface Temperature Data": a multimodal energy-estimation baseline.
- Yap et al. (2025), "Revealing Building Operating Carbon Dynamics for Multiple Cities": provides the downstream baseline with the largest reported mIoU gain from SENSE augmentation.
- [[papers/identification-of-the-potential-for-roof-greening-using-remote-sensing-and-deep-learning|Identification of the potential for roof greening using remote sensing and deep learning]]: another multi-city remote-sensing workflow that evaluates spatially explicit building attributes and geographic transfer, but for roof-greening potential rather than energy generation.

[[index|Library home]]
