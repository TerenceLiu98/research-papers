---
title: Wavelet-Domain Neural Compression
type: concept
aliases:
  - Neural Wavelet Compression
  - Multiresolution Neural Compression
tags:
  - wavelets
  - neural-compression
  - multiresolution-analysis
  - scientific-data-compression
---

## Overview

Wavelet-domain neural compression transforms a signal into localized coefficient bands before fitting or applying neural compressors. The transform separates coarse structure from detail at multiple scales and orientations, allowing model capacity, optimization, and error control to be organized by frequency band rather than applied uniformly in the original signal domain.

## Key Ideas

- **Localized multiresolution structure:** Wavelets trade spatial or temporal resolution against frequency resolution. Coarse coefficients capture broad trends, while fine coefficients represent localized transitions and texture that a global Fourier description may obscure.
- **Band-specific capacity:** Dedicated models can represent approximation and detail bands separately. Under a fixed parameter budget, this prevents easy low-frequency structure from consuming all of a small network's representational capacity.
- **Sub-bands remain dependent:** A wavelet transform decorrelates bands in a second-order sense, but coefficient magnitudes remain related across neighboring positions, orientations, and scales. Sharing outputs within a scale and conditioning fine predictions on coarse estimates can exploit those dependencies.
- **Fine-scale enhancement:** [[Multi-resolution enhancement for full-spectrum neural representations|WIEN-INR]] upsamples a coarse [[Implicit Neural Representations|implicit neural representation]] and applies a learned coordinate-dependent local kernel to estimate the finest coefficients. This performs better in its experiments than a simple residual predictor.
- **Reconstruction and selective decoding:** Predicted coefficients return to signal space through an inverse wavelet transform. Localized inverse transforms can support multiscale or region-of-interest decoding without reconstructing every voxel.
- **Overhead depends on the signal:** Splitting a small parameter budget across bands is most useful when fine-scale information is dense and important. For smoother natural images at very low rates, the additional networks and transforms can underperform a single global model.
- **Validation must follow the application:** PSNR and SSIM summarize global distortion but can miss suppressed weak signals or altered texture. Spectral errors, local regions, and downstream reconstructions may be necessary for scientific data.

## Important Papers

- [[Multi-resolution enhancement for full-spectrum neural representations]]
- Skodras, Christopoulos, and Ebrahimi (2001), "The JPEG 2000 Still Image Compression Standard."
- Shapiro (1993), "Embedded Image Coding Using Zerotrees of Wavelet Coefficients."
- Saragadam et al. (2023), "WIRE: Wavelet Implicit Neural Representations."
- Yu et al. (2025), "Cross-frequency Implicit Neural Representation with Self-evolving Parameters."
- Yang, Zhao, and Wang (2019), "Deep Image Compression in the Wavelet Transform Domain Based on High Frequency Sub-band Prediction."

## Related Concepts

- [[Implicit Neural Representations]]
- Multiresolution analysis
- Discrete wavelet transform
- Neural compression
- Rate-distortion optimization
- Spectral bias
- Scientific data compression
