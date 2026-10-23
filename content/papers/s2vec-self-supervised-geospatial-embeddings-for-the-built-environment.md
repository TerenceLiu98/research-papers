---
title: "S2Vec: Self-Supervised Geospatial Embeddings for the Built Environment"
type: paper
authors:
  - Shushman Choudhury
  - Chandrakumari Suvarna
  - Iveel Tsogsuren
  - Abdul Rahman Kreidieh
  - Elad Aharoni
  - Chun-Ta Lu
  - Neha Arora
year: 2026
doi: "10.1145/3787217"
venue: ACM Transactions on Spatial Algorithms and Systems
source_job_id: "569b8dbe-9a2f-4023-ae81-a19bc8567b40"
tags:
  - geospatial-ai
  - representation-learning
  - self-supervised-learning
  - built-environment
  - multimodal-learning
---

## TL;DR

S2Vec turns counts of points of interest and road infrastructure in fine-grained S2 cells into rasterized regional grids, then trains a masked autoencoder to produce reusable cell embeddings. The embeddings are competitive on socioeconomic prediction and transfer strongly to a geographically held-out region, but they trail imagery on tree cover and elevation. Downstream fusion with image embeddings often helps, although the benefit depends on the task and image model.

## Research Question

Can scalable self-supervision over structured built-environment features learn task-agnostic location embeddings that support socioeconomic prediction, geographic transfer, and complementary fusion with image-based representations?

## Motivation

Location encoders based only on coordinates or imagery may omit structured information about amenities and infrastructure. Conversely, methods that encode map attributes often use local neighborhoods or repeated computation. S2Vec asks whether hierarchical spatial indexing and masked reconstruction can capture both a cell's feature composition and its wider geographic context in a reusable representation. This is a form of [[concepts/geospatial-representation-learning|Geospatial Representation Learning]] centered on the built environment rather than Earth-observation pixels alone.

## Contributions

- A scalable pipeline that partitions an area with S2 Geometry, represents each level-12 cell by built-environment counts, and rasterizes child cells within level-8 parents.
- A masked-autoencoding objective that treats cell feature vectors as image patches and yields one embedding per fine-grained cell.
- Evaluation on five regression tasks using random splits, plus spatial holdouts for population and median income.
- Comparisons with coordinate-aware and image-based embeddings and three downstream fusion strategies.

## Method

**Spatial representation.** The experiments divide the continental United States into level-12 S2 cells of approximately 5 square kilometers. Each cell receives a 116-dimensional histogram of Google Maps point-of-interest categories and road-network elements. A level-8 parent covers approximately 1,300 square kilometers and contains a 16-by-16 grid of level-12 children. Ordering the children geographically turns their feature vectors into patches of a rasterized image while preserving local context.

**Self-supervised encoder.** S2Vec follows the Vision Transformer masked-autoencoder design. It randomly removes cell patches, encodes visible patches, and trains a smaller decoder to reconstruct the masked feature vectors. After pretraining, the patch encoder maps every level-12 feature vector to a 256-dimensional embedding. The selected configuration has six encoder layers, two decoder layers, eight attention heads, a 0.5 mask ratio, and 50 training epochs. Pretraining uses roughly 12,000 parent-cell images and eight Nvidia V100 GPUs.

**Downstream prediction.** A two-layer multilayer perceptron predicts min-max-scaled regression targets from frozen embeddings. The five tasks are California housing price, US population density, US median income, US tree cover, and US elevation. The authors also concatenate a Space2Vec coordinate encoding with S2Vec or RS-MaMMUT for selected random-split experiments.

**Multimodal fusion.** S2Vec is paired with SATCLIP, GEOCLIP, or RS-MaMMUT through concatenation, learned weighted addition when dimensions match, or separate projections followed by addition. These models are pretrained independently; fusion occurs only in the downstream predictor.

## Experiments

Random-split experiments use 20 independently initialized 60/20/20 train-validation-test splits. On California housing, S2Vec is comparable to SATCLIP, below GEOCLIP and RS-MaMMUT, and above the reported Hex2vec and GeoVex results. Projection followed by addition is the strongest fusion strategy in this comparison, although adding RS-MaMMUT hurts, which the authors attribute to the small dataset and RS-MaMMUT's larger embedding.

On the four US-wide random-split tasks, mean absolute error is measured after target normalization:

| Method | Population | Median income | Tree cover | Elevation |
| --- | ---: | ---: | ---: | ---: |
| S2Vec | 0.065 | 0.057 | 0.195 | 0.067 |
| SATCLIP | 0.075 | 0.044 | 0.104 | 0.015 |
| GEOCLIP | 0.075 | **0.033** | **0.091** | **0.015** |
| RS-MaMMUT | **0.057** | 0.061 | 0.092 | 0.045 |
| S2Vec + SATCLIP | 0.065 | 0.045 | 0.113 | 0.018 |
| S2Vec + GEOCLIP | 0.066 | 0.045 | 0.100 | 0.0194 |
| S2Vec + RS-MaMMUT | 0.058 | 0.056 | 0.102 | 0.048 |

The environmental results expose the modality boundary: image representations substantially outperform S2Vec, and fusion does not improve on the best image-only model.

For geographic adaptation, the eastern and northern United States are excluded from training and validation. Reported mean $R^2$ values are:

| Method | Population | Median income |
| --- | ---: | ---: |
| S2Vec | 0.64 | 0.45 |
| SATCLIP | -0.60 | -7.24 |
| GEOCLIP | 0.33 | 0.30 |
| RS-MaMMUT | 0.68 | 0.23 |
| S2Vec + SATCLIP | 0.56 | 0.37 |
| S2Vec + GEOCLIP | 0.60 | **0.48** |
| S2Vec + RS-MaMMUT | **0.72** | 0.35 |

S2Vec therefore beats both SATCLIP and GEOCLIP as an individual representation on both spatial holdouts. The best overall method depends on the task: S2Vec plus RS-MaMMUT for population, and S2Vec plus GEOCLIP for median income.

## Limitations

- The experimental feature vectors come from a proprietary Google Maps database, and the authors' implementation is not public. The paper points to an unaffiliated open-source SRAI implementation.
- Counts discard entity quality, size, popularity, road topology, geometry, mobility, and temporal variation. Map freshness and uneven coverage can also affect the representation.
- Evidence is limited to the United States and five regression tasks. Using an eastern US holdout does not establish global transfer.
- Weak tree-cover and elevation results show that built-environment counts are not a general replacement for imagery, especially for environmental targets.
- Fusion is performed after independent pretraining and is inconsistent: it does not always beat the strongest individual modality and may overfit small datasets.
- The study fixes one parent-child resolution pair. It does not test whether other S2 levels or multiscale objectives produce better local-context tradeoffs.

## Related Concepts

- [[concepts/geospatial-representation-learning|Geospatial Representation Learning]]: learns transferable encodings of locations, spatial objects, or regions.
- [[concepts/remote-sensing-foundation-models|Remote-Sensing Foundation Models]]: supplies the image-centered family against which S2Vec's structured built-environment representation is compared and fused.

## Related Papers

- He et al. (2022), "Masked Autoencoders Are Scalable Vision Learners": supplies the reconstruction framework adapted from images to rasterized cell features.
- Wozniak and Szymanski (2021), "hex2vec: Context-Aware Embedding H3 Hexagons with OpenStreetMap Tags": the local contrastive map-feature baseline.
- Donghi and Morvan (2023), "GeoVex: Geospatial Vectors with Hexagonal Convolutional Autoencoders": the convolutional autoencoding baseline for structured map features.
- Klemmer et al. (2023), "SatCLIP: Global, General-Purpose Location Embeddings with Satellite Imagery": an image-and-location baseline used alone and in fusion.
- Cepeda, Nayak, and Shah (2023), "GeoCLIP: CLIP-Inspired Alignment between Locations and Images for Effective Worldwide Geo-localization": the strongest random-split median-income model and part of the strongest median-income geographic-adaptation fusion.

[[index|Library home]]
