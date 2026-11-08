---
title: Soft Task Reformulation for Regression
type: concept
aliases:
  - Target codec
  - Soft binning for regression
tags:
  - deep-regression
  - task-reformulation
---

## Overview

Soft task reformulation represents a continuous target as a distribution over a finite set of codes. A predictor learns that distribution, and a decoder converts it into a continuous prediction. This generalizes regression-as-classification beyond one-hot bin assignments.

## Key Ideas

A target encoder can assign weights using softmax over negative squared distances to representatives. A linear decoder computes a weighted combination of representatives. Smooth assignments preserve distinctions that hard binning discards, while keeping a classification-style training objective.

The encoder and decoder may be fixed, pretrained using targets alone, or jointly trained with the predictor. Joint training combines target reconstruction, KL distribution matching, and decoded regression error. The distribution-matching term supervises the representation; the regression term directly measures error in the original target space.

Code count controls representation capacity and optimization cost. The best setting depends on the task. Linear simplex decoding confines predictions to the convex hull of decoder representatives. The learned code distribution is a target representation and is not automatically a calibrated uncertainty estimate.

## Important Papers

[[papers/beyond-binning-soft-task-reformulation-for-deep-regression|Beyond Binning: Soft Task Reformulation for Deep Regression]] develops a lightweight trainable codec and evaluates joint classification/regression training on tabular data, retinal images, and visual geolocation.

## Related Concepts

Hard-binned regression-as-classification is the discrete special case. Target autoencoding supplies a reconstruction objective; Gaussian mixture responsibilities motivate the soft encoder initialization. These connections describe the mechanism without requiring a separate page for every component.
