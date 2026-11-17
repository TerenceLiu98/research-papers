---
title: "PlacePulse: Learning Transferable Place Representations from Structural Geographic Data"
type: paper
authors:
  - Lucía García-Duarte
  - Miguel Álvarez
  - Diego Vicente
  - Javier Pérez Trufero
  - Javier de la Torre
year: null
source_job_id: "0e28f25b-cfcf-4b4c-a25a-cc329cb49dab"
tags:
  - geospatial-ai
  - representation-learning
  - self-supervised-learning
---

## TL;DR

PlacePulse compresses structural attributes and neighborhood summaries into 256-dimensional embeddings for 1,055,537 US H3 resolution-7 cells. Across 74 prediction targets, it improves on a compact feature-selection baseline for POI and activity outcomes and competes with Google's Population Dynamics Foundation Model (PDFM), with strengths that depend on domain and spatial support. The study evaluates a fixed, fully observed grid; it does not establish encoder transfer to unseen geographies or years.

## Research Question

Can relatively stable demographic, socioeconomic, commercial, and environmental composition support reusable place representations without pretraining on imagery or behavioral traces?

## Motivation

Task-specific geographic modeling repeatedly requires assembling and engineering many attributes. Structural composition supplies information about who lives and works in a place and its surrounding context that imagery and behavioral signals may capture only indirectly. PlacePulse tests this modality within [[concepts/geospatial-representation-learning|Geospatial Representation Learning]].

## Contributions

- A national structural representation learned from 572 base attributes and 1,716 neighborhood features.
- A benchmark separating intrinsic reconstruction, geometry, and spatial organization from downstream prediction across four spatial supports.
- Comparisons with a target-blind 256-feature baseline and PDFM that expose domain-dependent advantages rather than universal superiority.

## Method

The inputs are modeled 2025 Applied Geographic Solutions estimates covering approximately 5-square-kilometer H3 cells. For each base attribute, the model adds the first-ring mean and sample standard deviation and the second-ring mean. Rings exclude the focal cell; the resulting input has 2,288 dimensions.

A dense encoder maps these inputs through widths 1,024, 512, and 384 to a 256-dimensional, L2-normalized bottleneck. A symmetric decoder reconstructs the inputs. Hidden blocks use LeakyReLU, batch normalization, and dropout. Training independently masks 30% of input entries with learned column-specific tokens and computes weighted squared error only on masked entries. Center features receive weight 2.0 and ring features 0.667, approximately balancing their aggregate contributions. Inference uses complete inputs; unit norms make cosine similarity equal to the dot product.

Training uses Adam at learning rate 0.0003, batch size 512, a random 90/10 training-validation split, and early stopping. The final encoder generates embeddings over the entire observed grid. Intrinsic diagnostics are computed on that full grid, not an independently held-out geographic test set.

Downstream prediction uses fixed LightGBM settings (500 estimators, learning rate 0.05, 63 leaves) and five-fold state-blocked cross-validation. The 74 targets comprise 20 H3, 50 ZCTA, and four tract or precinct outcomes. At H3 resolution, the baseline selects one medoid from each of 256 clusters of input features without target labels. At ZCTA resolution, area-weighted PlacePulse embeddings are compared with native PDFM embeddings. Both are area-weighted for tract and precinct tasks. This is a [[concepts/change-of-spatial-support|Change of Spatial Support]] problem as well as a representation comparison.

## Experiments

Full-grid reconstruction has mean per-feature $R^2=0.853$, median 0.887, and normalized MSE 0.147. A greedy correlation diagnostic retains 251 of 256 dimensions; this is not an intrinsic-dimension estimate. The embedding's PCA participation ratio is 12.6 and its nonlinear dimensionality estimate is 25.2. The leading principal component has Moran's $I=0.93$ at adjacent cells, declining to 0.83 at ring distance five. Spatial coherence therefore extends beyond the two-ring input context, although these diagnostics do not isolate the causal contribution of neighborhood features.

Reported category means of held-out-fold $R^2$ (Tables 7–9):

| Support and category | PlacePulse | Comparator | Comparator type |
| --- | ---: | ---: | --- |
| H3 public health | 0.707 | 0.738 | Selected input features |
| H3 points of interest | 0.772 | 0.724 | Selected input features |
| H3 population activity | 0.801 | 0.788 | Selected input features |
| ZCTA public health | 0.610 | 0.573 | PDFM |
| ZCTA economic status | 0.633 | 0.605 | PDFM |
| ZCTA population activity | 0.863 | 0.855 | PDFM |
| ZCTA physical geography | 0.628 | 0.744 | PDFM |
| ZCTA points of interest | 0.784 | 0.906 | PDFM |
| ZCTA social capital | 0.715 | 0.713 | PDFM |
| ZCTA entrepreneurship | 0.765 | 0.822 | PDFM |
| Precinct elections | 0.737 | 0.709 | PDFM |
| Tract economic mobility | 0.546 | 0.508 | PDFM |
| Tract vulnerability and resilience | 0.435 | 0.302 | PDFM |

POI targets are evaluated in log space. Category averages do not establish statistically significant differences. Higher relative scores on vulnerability and resilience still leave substantial variance unexplained. The differing domain profiles motivate multimodal fusion, but fusion is not tested.

## Limitations

- Pretraining and intrinsic evaluation are transductive over a fixed US grid. State-blocked downstream labels do not make the encoder evaluation inductive.
- AGS inputs are proprietary modeled estimates from one vintage, with unquantified propagated uncertainty. Embeddings are a commercial CARTO product and model code is not public.
- Some health and socioeconomic targets share covariates or source families with the inputs. Nighttime lights also enter indirectly through an urbanity flag. External targets are not uniformly independent of pretraining information.
- Native support, boundary alignment, and aggregation differ between PlacePulse and PDFM, complicating attribution of performance gaps solely to representation quality.
- A single selected configuration is reported; systematic architecture, input-family, temporal, and cross-country studies remain open.
- The embeddings encode demographic attributes, including protected-attribute proxies. Area-level prediction does not justify individual-level inference. All authors work for CARTO, which funded the study and has a commercial interest in the product.

The supplied manuscript does not explicitly establish a publication year, venue, DOI, or arXiv identifier; these are left unverified.

## Related Concepts

- [[concepts/geospatial-representation-learning|Geospatial Representation Learning]]: reusable location vectors learned from structural composition.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: motivates geographic blocking and measures embedding coherence.
- [[concepts/change-of-spatial-support|Change of Spatial Support]]: governs transfer from H3 cells to administrative units.

## Related Papers

- [[papers/s2vec-self-supervised-geospatial-embeddings-for-the-built-environment|S2Vec]]: a library comparison, rather than a cited PlacePulse experiment; both learn structural cell embeddings through masked reconstruction, but S2Vec rasterizes built-environment counts for a transformer.
- Agarwal et al. (2024), “General Geospatial Inference with a Population Dynamics Foundation Model”: supplies the external PDFM comparator.
- Wen and Zhou (2024), “Demo2Vec: Learning Region Embedding with Demographic Information”: combines demographics with mobility at city scale.
- He et al. (2022), “Masked Autoencoders Are Scalable Vision Learners”: supplies the masked-reconstruction precedent adapted here to tabular inputs.
