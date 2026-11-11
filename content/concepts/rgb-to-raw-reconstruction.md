---
title: RGB-to-RAW Reconstruction
type: concept
tags:
  - computational-photography
  - inverse-problems
---

## Overview

RGB-to-RAW reconstruction estimates sensor-domain data from processed RGB images. Nonlinear ISP processing, quantization, and clipping make the inverse ambiguous; estimated RAW is not an original sensor recording.

## Key Ideas

- Approaches invert individual ISP stages, regress RAW directly, or learn conditional generative transport.
- Observation-initialized latent flow starts from RGB features and can reduce iterative sampling costs.
- RAW-domain PSNR and SSIM assess paired fidelity; downstream detection tests utility for sensor-domain learning.
- Camera-specific evaluation does not establish unseen-sensor transfer, and deterministic reconstruction cannot sample diverse noise realizations.

## Important Papers

- [[papers/bridging-rgb-and-raw-single-step-deterministic-flow-with-homogeneous-representation-alignment|Bridging RGB and RAW]] introduces SHADE, combining single-step transport with homogeneous student–teacher alignment.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] trains velocity fields between source and target representations.
