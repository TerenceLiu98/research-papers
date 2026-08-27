---
title: Implicit Neural Representations
type: concept
aliases:
  - INR
  - INRs
  - Neural Fields
  - Coordinate-Based Neural Networks
tags:
  - implicit-neural-representations
  - neural-fields
  - coordinate-networks
  - scientific-machine-learning
---

## Overview

Implicit neural representations encode a signal as a learned function from coordinates to values. Instead of storing every pixel, voxel, or sampled field value explicitly, an INR stores the parameters of a coordinate-based neural network. The resulting neural field can be evaluated continuously, differentiated with respect to its coordinates, or queried only at selected points and regions.

## Key Ideas

- **Coordinates define the interface:** An INR learns a map from physical, spatial, temporal, or other coordinates to scalar or vector signal values. Evaluating it on a coordinate grid reconstructs a discretized tensor.
- **Model weights store the instance:** In compression-oriented use, a network is fitted directly to one target signal and its parameters serve as the compressed surrogate. Storage scales with network complexity rather than the original grid size.
- **Continuous querying is useful but not lossless by itself:** A trained network can be sampled at new resolutions and restricted to a region of interest, but it cannot be assumed to recover fine structure absent from the learned function.
- **Frequency learning is uneven:** Standard coordinate MLPs tend to fit low-frequency structure before high-frequency detail. Periodic activations, positional encodings, multiresolution features, spatial partitioning, and [[Wavelet-Domain Neural Compression|wavelet-domain decompositions]] address different parts of this spectral-bias problem.
- **Compression requires scientific fidelity:** For measurements in which weak scattering or speckle is meaningful, a visually smooth reconstruction can still be scientifically wrong. Rate distortion should therefore be paired with local, spectral, or physics-related validation.
- **INRs and neural operators solve different problems:** An INR commonly represents one function or scene, whereas [[Neural Operators|a neural operator]] learns a map between families of functions. Both may use coordinate networks and support evaluation across meshes.

## Important Papers

- [[Multi-resolution enhancement for full-spectrum neural representations]]
- Sitzmann et al. (2020), "Implicit Neural Representations with Periodic Activation Functions."
- Mildenhall et al. (2020), "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis."
- Dupont et al. (2021), "COIN: Compression with Implicit Neural Representations."
- Dupont et al. (2022), "COIN++: Neural Compression Across Modalities."
- Mueller et al. (2022), "Instant Neural Graphics Primitives with a Multiresolution Hash Encoding."

## Related Concepts

- [[Wavelet-Domain Neural Compression]]
- [[Neural Operators]]
- Spectral bias
- Neural fields
- Coordinate-based learning
- Neural compression
- Region-of-interest decoding
- Multiresolution representations
