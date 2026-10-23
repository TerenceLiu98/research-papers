---
title: Urban Building Energy Modeling
type: concept
aliases:
  - UBEM
  - Urban Building Energy Modelling
tags:
  - urban-energy
  - building-science
  - geospatial-ai
  - sustainable-cities
---

## Overview

Urban building energy modeling estimates energy demand across groups of buildings or entire districts. It connects building physics, urban morphology, weather, occupancy, and operational data to questions about decarbonization, retrofit targeting, infrastructure planning, and urban design. Approaches range from physics-based simulation to data-driven prediction and, more recently, conditional generation of urban forms with aligned energy layers.

## Key Ideas

- **Scale and aggregation:** UBEM operates above the individual-building scale, so both building-level errors and their aggregation into district totals matter. Pixel segmentation accuracy and aggregate calibration answer different questions.
- **Physics-based and data-driven models:** Physics engines represent thermal processes from detailed inputs, while learned models infer relationships from measurements, imagery, maps, and weather. Faster learned surrogates may reduce simulation cost but inherit the coverage and biases of their training data.
- **Spatial alignment:** Satellite imagery, footprints, heights, roads, and energy disclosures must share a coordinate system and spatial support. Misalignment or missing disclosures can appear as model error and can distort fine-grained evaluation.
- **Calibration metrics:** NMBE measures systematic bias and CVRMSE measures error variability relative to mean demand. Passing an aggregate calibration threshold does not establish that individual buildings or causal mechanisms are correct.
- **Generative planning:** Conditional generation can map road networks and density targets into candidate urban imagery and energy layers. Such outputs support scenario exploration only to the extent that constraints, physical variables, and geographic transfer have been validated.
- **Data scarcity and privacy:** Municipal disclosure programs provide valuable supervision but vary across jurisdictions and may omit smaller or sensitive properties. Synthetic annotations can augment limited training sets, but evaluation should remain anchored to held-out real observations.

## Important Papers

- Reinhart and Cerezo Davila (2016), "Urban Building Energy Modeling - A Review of a Nascent Field": surveys foundational UBEM methods and applications.
- Streltsov et al. (2020), "Estimating Residential Building Energy Consumption Using Overhead Imagery": predicts building energy from overhead imagery.
- Dai, Niyogi, and Nagy (2025), "CityTFT: A Temporal Fusion Transformer-Based Surrogate Model for Urban Building Energy Modeling": develops a learned surrogate for heating and cooling loads.
- [[papers/sense-satellite-based-energy-synthesis-for-sustainable-environment|SENSE: Satellite-based ENergy Synthesis for Sustainable Environment]] jointly generates satellite imagery, height classes, and annual-energy classes, then tests the generated pairs as downstream training data.

## Related Concepts

- [[concepts/geospatial-representation-learning|Geospatial Representation Learning]]
- [[concepts/diffusion-models|Diffusion Models]]
- Semantic segmentation
- Synthetic data augmentation
- Urban morphology
