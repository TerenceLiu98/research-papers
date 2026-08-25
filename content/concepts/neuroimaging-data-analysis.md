---
title: Neuroimaging Data Analysis
type: concept
aliases:
  - Neuroimaging Analysis
  - Neuroimaging Data Analytics
tags:
  - neuroimaging
  - medical-imaging
  - statistical-learning
  - brain-science
---

## Overview

Neuroimaging data analysis is the statistical and computational study of measurements of brain structure, function, connectivity, metabolism, or perfusion. It spans acquisition-aware image processing, spatial and temporal modeling, multimodal integration, prediction, causal inference, and validation of imaging biomarkers.

## Key Ideas

- Common modalities have different resolution and signal characteristics: EEG and MEG provide millisecond-scale electrophysiology, MRI provides detailed anatomy and diffusion structure, fMRI and fNIRS measure hemodynamic signals, and PET and SPECT measure molecular or perfusion processes.
- Individual-level processing includes reconstruction, enhancement, registration, segmentation, smoothing, and correction for motion, intensity inhomogeneity, and partial-volume effects.
- Neuroimaging measurements are high-dimensional and dependent across space, time, subjects, sites, and modalities. Treating voxels or channels as independent can misrepresent uncertainty and scientific signal.
- MRI acquisition in k-space means that temporally localized disturbances can become spatially widespread artifacts after reconstruction. Acquisition and reconstruction should therefore be considered in noise and artifact models.
- Large studies introduce harmonization, missingness, attrition, site and scanner variation, and limited effective sample size alongside computational cost.
- Useful methods include functional and spatial models, mixed-effects models, dimension reduction, variable selection, graphical models, deep learning, manifold learning, survival analysis, domain adaptation, and federated learning.
- Reliable imaging biomarkers require internal validation, external validation, uncertainty quantification, calibration, robustness checks, and attention to privacy and fairness.

## Important Papers

- [[Statistical Opportunities in Neuroimaging]]
- Zhu, Li, and Zhao (2023), "Statistical learning methods for neuroimaging data analysis with applications."
- Lindquist (2008), "The Statistical Analysis of fMRI Data."
- Ombao, Lindquist, Thompson, and Aston (2016), "Handbook of Neuroimaging Data Analysis."
- Zhou et al. (2021), "A review of deep learning in medical imaging."

## Related Concepts

- [[Multimodal Neuroimaging Data Integration]]
- [[Brain Encoding and Decoding]]
- [[High-Dimensional EEG Signals]]
- [[Nonstationary Functional Time Series]]
- [[Spatial Causal Inference]]
- Image registration
- Image segmentation
- Imaging biomarkers
