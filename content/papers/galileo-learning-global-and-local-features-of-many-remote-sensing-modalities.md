---
title: "Galileo: Learning Global & Local Features of Many Remote Sensing Modalities"
type: paper
authors:
  - Gabriel Tseng
  - Anthony Fuller
  - Marlena Reil
  - Henry Herzog
  - Patrick Beukema
  - Favyen Bastani
  - James R. Green
  - Evan Shelhamer
  - Hannah Kerner
  - David Rolnick
year: 2025
arxiv: "2502.09356"
venue: ICML
url: https://proceedings.mlr.press/v267/tseng25a.html
tags:
  - remote-sensing
  - foundation-models
  - self-supervised-learning
  - multimodal-learning
  - representation-learning
---

## TL;DR

Galileo is a family of self-supervised transformers that accepts optical imagery, synthetic-aperture radar, topography, weather, land-cover products, population estimates, and other Earth-observation inputs in image and time-series forms. Its paired objectives use structured space-time masks and deep latent targets for global features, but random masks and shallow projected targets for local features. One set of Galileo-Base weights ranks first among the compared models on aggregate image and pixel-time-series evaluations, although individual datasets and evaluation settings include losses to specialist models.

## Research Question

Can one pretrained remote-sensing model accommodate heterogeneous modalities and input shapes while learning both broad semantic features for classification and fine spatial features for segmentation?

## Motivation

Remote-sensing phenomena span very different scales: a boat may occupy one or two pixels and one observation, while a glacier can extend across thousands of pixels and evolve over decades. Existing pretrained models commonly specialize in either imagery or pixel time series and often support only optical data, radar, or their combination. Galileo addresses both restrictions by unifying spatial, temporal, and static inputs and by explicitly separating global and local self-supervised objectives.

## Contributions

- Introduces a tokenization and transformer architecture for channel groups that may vary over space, time, both, or neither, supporting single images, image time series, and pixel time series.
- Combines a global objective using structured spatial or temporal masking and deep EMA-encoder targets with a local objective using unstructured masking and shallow linear-projection targets.
- Builds a geographically and semantically sampled pretraining dataset with 127,155 exported locations, 24 monthly timesteps, and nine remote-sensing data products.
- Evaluates the same pretrained model family across eleven downstream benchmarks for image classification, image segmentation, and pixel-time-series classification, including reduced-label partitions.

## Method

Inputs are divided by spatial patch, timestep, and semantically related channel group. Separate linear projections map four input forms to a shared token dimension: space-time arrays, spatial-only arrays, temporal-only arrays, and static vectors. The model adds spatial, temporal, month, and learned channel embeddings before a ViT encoder processes the combined sequence.

For the **global objective**, the two views contain non-overlapping sets of randomly selected modalities and use either spatial masks shared across time or temporal masks shared across space. The online encoder processes visible tokens. An exponential-moving-average target encoder supplies targets from modality-dependent depths: full depth for Sentinel-1 and Sentinel-2, no transformer layers for pseudo-labels, and half depth for other channels. A predictor cross-attends from target-position queries to visible encodings. The batch-level PatchDisc objective contrasts matching tokens against tokens from other instances, encouraging between-instance discrimination.

For the **local objective**, unstructured random masking retains 5% of tokens in the visible view and 50% in the target view. Targets come only from the target encoder's linear input projection, and an instance-level PatchDisc loss contrasts locations within the same input. Galileo alternates equally weighted global and local minibatches while giving each objective its own predictor. This design is a multimodal remote-sensing instance of latent target prediction related to [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]].

The pretraining instances cover Sentinel-1, Sentinel-2 and NDVI, SRTM elevation and slope, ERA5 weather, TerraClimate variables, VIIRS nighttime lights, Dynamic World, WorldCereal, LandScan population, and location features. Each source sample spans 96 x 96 pixels at 10 m resolution and 24 months. Galileo-Nano (0.8M parameters), Tiny (5.3M), and Base (85.0M) are pretrained for 500 epochs on one H100, with reported costs of 200, 259, and 573 GPU-hours respectively.

## Experiments

The evaluation reruns comparison models under common preprocessing and hyperparameter sweeps. It covers four label fractions (100%, 20%, 5%, and 1%) on GeoBench image tasks, plus MADOS, Sen1Floods11, PASTIS, Breizhcrops, and three CropHarvest tasks. Classification uses k-nearest-neighbor probing and finetuning; segmentation and pixel-time-series classification use linear probes.

**Aggregate results.** Across the complete tables, Galileo-Base has an average image rank of 3.0 and pixel-time-series rank of 1.8, compared with image rank 4.3 for CROMA-Base and time-series rank 3.0 for Presto. Galileo-Base's component image ranks are 2.9 for kNN classification, 3.5 for finetuned classification, and 2.7 for segmentation. These are ranks averaged across datasets and label partitions, not universal wins on every task.

**Representative classification results.** With kNN on the full training partitions, Galileo-Base obtains 93.0% on m-EuroSat, 59.0 F1 on m-BigEarthNet, 54.8% on m-So2Sat, and 90.7% on m-Brick-Kiln. With 1% training data, the corresponding results are 56.6, 36.5, 43.2, and 78.0. It leads the compared models on the first three full-data results but not m-Brick-Kiln, where CROMA reaches 92.6%. Under finetuning, Galileo-Base reaches 97.7% on full-data m-EuroSat and 63.5% with 1% of its training set.

**Segmentation and time series.** Galileo-Base records 67.6% mIoU on full-data MADOS and 79.4% on Sen1Floods11, but CROMA-Base is better on PASTIS (44.4% versus 39.2%). Its pixel-time-series linear-probe scores are 74.8 on Togo, 99.3 on Brazil, 84.2 on Kenya, and 73.0 on Breizhcrops. Presto remains better on Togo (75.5) and Galileo-Tiny is better on Kenya (85.4), illustrating that the aggregate lead is not a sweep of individual datasets.

**Ablations.** Shallow targets are particularly effective for fine-grained segmentation: the local task reaches 71.5% mIoU on MADOS versus 58.9% for the global task. Random rather than structured masking improves MADOS by about nine points in the local setup. The combined objective is more stable across runs: all runs exceed 80% on EuroSat, versus 63% for either single-objective experiment. Modality removal is not uniformly harmful, but removing TerraClimate, VIIRS, or LandScan sharply reduces MADOS, and removing TerraClimate or VIIRS reduces EuroSat by roughly ten points.

## Limitations

- Standard benchmarks mostly expose optical and radar inputs, so they do not directly measure much of Galileo's advertised multimodal capacity. The paper's modality-removal study provides supporting evidence, but the practical value of every additional modality is not equally established.
- Aggregate rankings obscure task-specific losses. Galileo-Base trails CROMA on PASTIS, Presto on Togo, and several methods on m-Brick-Kiln; model size also changes which variant is strongest.
- The AnySat segmentation comparison samples 6.25% of AnySat's per-pixel features during probe training to align training cost with patch-based models. Although the authors report confirming this protocol with AnySat's authors, the representation granularity remains different.
- Pretraining costs range from 200 to 573 H100 GPU-hours, and the evaluation relies on extensive hyperparameter sweeps. Smaller variants improve accessibility but do not reproduce Base's overall ranking.
- The work evaluates transfer across remote-sensing tasks, not other data domains. The authors explicitly leave the generality of local-global self-supervision beyond remote sensing for future research.
- Earth-observation models can support decisions about populations without their participation. The paper recommends deployment with local communities and stakeholders but does not empirically evaluate governance or downstream harms.

## Related Concepts

- [[concepts/remote-sensing-foundation-models|Remote-Sensing Foundation Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- Fuller et al. (2024), "CROMA: Remote Sensing Representations with Contrastive Radar-Optical Masked Autoencoders," is the strongest aggregate image baseline reported for a Base-sized architecture.
- Tseng et al. (2023), "Lightweight, Pre-trained Transformers for Remote Sensing Timeseries," introduces Presto, the specialist pixel-time-series baseline.
- Astruc et al. (2024), "AnySat: An Earth Observation Model for Any Resolutions, Scales, and Modalities," is the concurrent generalist most similar in supported spatial and temporal input forms.
- Wei et al. (2024), "Masked Image Modeling with Denoising Contrast," supplies the PatchDisc latent contrastive objective adapted by Galileo.

[[index|Library home]]
