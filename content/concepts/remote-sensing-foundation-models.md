---
title: Remote-Sensing Foundation Models
type: concept
aliases:
  - Earth Observation Foundation Models
  - Geospatial Foundation Models
tags:
  - remote-sensing
  - foundation-models
  - representation-learning
  - multimodal-learning
---

## Overview

Remote-sensing foundation models pretrain reusable representations from large Earth-observation corpora, then transfer them to tasks such as land-cover classification, crop mapping, flood detection, and semantic segmentation. The central design problem is broader than image pretraining: observations may combine different sensors, spatial resolutions, temporal frequencies, and input shapes, while downstream phenomena range from fine local objects to large, slowly changing regions.

## Key Ideas

- **Sensor and modality diversity:** Optical imagery, synthetic-aperture radar, elevation, weather, land-cover products, nighttime lights, and population estimates contain complementary information. A model's supported modalities constrain the downstream settings in which its pretrained representation can be reused.
- **Multiple input geometries:** Practical inputs include single images, image time series, and per-location time series. Generalist architectures need tokenization and positional information that preserve whichever spatial and temporal dimensions are present.
- **Scale-sensitive objectives:** Image-level classification benefits from broad semantic structure, while dense segmentation can depend on small, high-frequency details. Global and local pretraining objectives may use different masking spans or representation depths to expose both kinds of information.
- **Transfer protocols:** k-nearest-neighbor and linear probes measure information accessible from frozen representations, whereas finetuning also measures adaptability. Comparisons should align preprocessing, input size, label fractions, and hyperparameter search.
- **Benchmark coverage:** Common benchmarks often expose only optical or radar data. Strong scores on them do not by themselves establish the value of additional pretraining modalities; modality ablations and genuinely multimodal downstream tasks provide more direct evidence.
- **Deployment context:** Earth-observation systems can inform high-impact decisions about agriculture, disasters, ecosystems, and populations. Technical transfer performance does not replace stakeholder participation or evaluation of downstream harms.

## Important Papers

- [[papers/galileo-learning-global-and-local-features-of-many-remote-sensing-modalities|Galileo: Learning Global & Local Features of Many Remote Sensing Modalities]] combines nine remote-sensing data products with distinct global and local masked latent-prediction objectives, then evaluates one model family across images and pixel time series.
- Fuller et al. (2024), "CROMA: Remote Sensing Representations with Contrastive Radar-Optical Masked Autoencoders," jointly pretrains on optical and radar imagery.
- Tseng et al. (2023), "Lightweight, Pre-trained Transformers for Remote Sensing Timeseries," introduces Presto for pixel time series.
- Astruc et al. (2024), "AnySat: An Earth Observation Model for Any Resolutions, Scales, and Modalities," supports varied spatial and temporal resolutions across satellite sources.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] predict masked targets in representation space rather than reconstructing raw observations.
- [[concepts/linear-probing|Linear Probing]] evaluates task information available in frozen representations.
- [[concepts/time-series-foundation-models|Time Series Foundation Models]] address transferable pretraining over temporal inputs, including settings without spatial structure.
