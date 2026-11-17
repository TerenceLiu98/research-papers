---
title: Frame Differencing for Motion Measurement
type: concept
aliases:
  - Frame-Based Motion Measurement
definition: "Frame differencing measures temporal visual change between successive video frames as an aggregate indicator of movement."
tags:
  - video-analysis
  - behavioral-measurement
---

## Overview

Frame differencing measures changes between successive images to quantify motion. It can use pixel differences or an image-similarity metric, with the latter requiring attention to score direction: greater similarity implies less movement.

## Key Ideas

- Temporal change captures information absent from isolated still images.
- Aggregate motion does not itself identify actors, interactions, or intentions. Connecting it to a social construct requires contextual assumptions and behavioral validation.
- Consistent camera views are important for interpreting changes as activity in the scene.
- Structural similarity (SSIM) supplies one implementation. Averaging sequential similarities yields a summary that runs inversely to motion.
- Human-coded movement and individual trajectory reconstructions can test whether a score responds to the behavior of interest.

## Important Papers

- [[papers/using-motion-detection-to-measure-social-polarization-in-the-us-house-of-representatives|Using Motion Detection to Measure Social Polarization in the U.S. House of Representatives]] uses SSIM in overhead House footage and validates its association with walking and aisle crossing.
- Paxton and Dale (2013), “Frame-Differencing Methods for Measuring Bodily Synchrony in Conversation,” is cited by Dietrich as a precedent for measuring interpersonal dynamics.

## Related Concepts

- [[concepts/political-polarization|Political Polarization]]: in a chamber with partisan seating, motion can proxy opportunities for cross-party contact; that interpretation is setting-dependent.
