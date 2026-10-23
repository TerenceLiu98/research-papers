---
title: Geospatial Representation Learning
type: concept
aliases:
  - Spatial Representation Learning
  - Location Embeddings
tags:
  - geospatial-ai
  - representation-learning
  - spatial-machine-learning
---

## Overview

Geospatial representation learning converts coordinates, spatial objects, regions, imagery, map attributes, or combinations of these inputs into vectors that downstream models can reuse. A useful representation must encode both what is present at a location and how that location relates to its surroundings, while respecting geographic scale, spatial dependence, and transfer across regions.

## Key Ideas

- **Representation source:** Coordinates provide position but little direct semantics; imagery captures visible surface structure; structured maps expose named entities and infrastructure. Their signals overlap but are not interchangeable.
- **Spatial context:** Encoders may use immediate neighborhoods, broad regional windows, hierarchical grids, graphs, or global coordinate functions. The context definition determines which spatial relationships can enter an embedding.
- **Scale and support:** Cell size and aggregation level affect what an embedding can distinguish. Multiresolution systems can connect fine local features to wider regional structure, but their chosen levels remain modeling assumptions.
- **Transfer evaluation:** Random train-test splits primarily measure interpolation among nearby or similarly distributed examples. Geographic holdouts more directly test extrapolation to unseen regions and can produce substantially different method rankings.
- **Task-modality fit:** Built-environment features are naturally aligned with many socioeconomic targets, while overhead imagery can be more informative for environmental properties. A general representation should be assessed across distinct target families rather than a single benchmark.
- **Fusion:** Independently learned modalities can be concatenated or aligned in a shared downstream space. Gains are empirical rather than automatic; fusion can add complementary information, reproduce a dominant modality, or overfit.

## Important Papers

- [[papers/s2vec-self-supervised-geospatial-embeddings-for-the-built-environment|S2Vec: Self-Supervised Geospatial Embeddings for the Built Environment]] rasterizes structured map features in hierarchical S2 cells and uses masked autoencoding to learn cell embeddings.
- Mai et al. (2022), "A Review of Location Encoding for GeoAI: Methods and Applications," organizes analytical and learned approaches for representing geographic location.
- Mai et al. (2023), "Sphere2Vec: A General-Purpose Location Representation Learning over a Spherical Surface for Large-Scale Geospatial Predictions," develops coordinate encodings on the sphere.
- Klemmer et al. (2023), "SatCLIP: Global, General-Purpose Location Embeddings with Satellite Imagery," aligns satellite imagery and location information for downstream transfer.
- Wozniak and Szymanski (2021), "hex2vec: Context-Aware Embedding H3 Hexagons with OpenStreetMap Tags," learns local contextual representations from structured map attributes.

## Related Concepts

- [[concepts/remote-sensing-foundation-models|Remote-Sensing Foundation Models]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]
- [[concepts/change-of-spatial-support|Change of Spatial Support]]
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]]
