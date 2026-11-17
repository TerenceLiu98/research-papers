---
title: Photoplethysmography
type: concept
aliases:
  - PPG
definition: "Photoplethysmography measures optical intensity changes associated with pulsatile blood-volume changes in tissue."
tags:
  - physiological-sensing
  - mobile-health
---

## Overview

Photoplethysmography (PPG) records changes in light transmitted through or reflected from tissue as blood volume varies with the cardiac cycle. Its pulsatile signal can support physiological estimation, but estimating oxygen saturation also requires wavelength-dependent information and calibration or a learned mapping.

## Key Ideas

- PPG can complement ECG in shared pretrained representations, but PPG-only, ECG-only, and combined-input performance should be evaluated separately. Blood-pressure estimates using calibration segments from test subjects answer a different generalization question from subject-held-out estimation.

- Transmittance sensing places the detector across tissue from the light source; reflectance sensing measures returning light on the same side.
- The pulsatile AC component sits on a larger DC background. Tissue properties, motion, exposure, and channel clipping can change the usable signal.
- Smartphone contact PPG can use a finger over the camera and flash. Spatially averaging each RGB channel yields time series, but broad camera bands differ from dedicated red/infrared oximeter channels.
- A learned saturation estimator must be evaluated across participants and saturation ranges. Accurate performance near normal saturation does not establish accuracy at low saturation.

## Important Papers

- [[papers/smartphone-camera-oximetry-in-an-induced-hypoxemia-study|Smartphone camera oximetry in an induced hypoxemia study]]: evaluates contact RGB PPG over 70–100% reference saturation and shows the effects of range restriction and tissue-dependent signal variation.

## Related Concepts

- [[concepts/convolutional-neural-networks|Convolutional Neural Networks]]: can learn temporal and cross-channel features from PPG for physiological regression.
