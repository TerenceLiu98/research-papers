---
title: Asynchronous Change-Point Detection
type: concept
aliases:
  - Asynchronous Changepoint Detection
tags:
  - change-point-detection
  - time-series
  - network-inference
---

## Overview

Asynchronous change-point detection identifies abrupt distributional changes in multiple time series while allowing their locations to differ across series. It is useful when a shared event reaches sensors at different times or changes propagate across a system. Temporal proximity alone and a directed lead-lag relationship are distinct modeling assumptions.

## Key Ideas

- Independent segmentation permits different change times but does not borrow evidence across series. Synchronized models share evidence by requiring or encouraging changes at the same time. Asynchronous models share evidence while allowing delays.
- A run-length representation records time since the most recent change. A reset marks a new segment, whose parameters may govern its mean, variance, or autoregressive dynamics.
- NetCP models directed dependence by letting a recent change in one series contribute a decaying impulse to another series' change probability. Edge inclusion, weight, and decay encode different aspects of the relationship.
- Graph structure may be supplied or inferred. An undirected graph encourages temporal proximity, whereas directed edges distinguish leading and lagging series. Inferred direction is statistical timing dependence and does not alone establish causality.
- Feedback cycles can encourage repeated bursts of changes. Sparse graph priors and acyclicity constraints are different restrictions: prohibiting reciprocal edges still allows longer directed cycles.
- Evaluation should distinguish change-location accuracy, recovery of dependence structure, and model evidence. Good performance on one does not automatically establish the others.

## Important Papers

- [[papers/network-modeling-of-asynchronous-change-points-in-multivariate-time-series|Network Modeling of Asynchronous Change-Points in Multivariate Time Series]]: jointly learns asynchronous segmentations and a directed network using a hierarchical Bayesian model.
- Hallgren, Heard, and Turcotte (2024), "Changepoint Detection on a Graph of Time Series": the NetCP manuscript describes this as coupling changes through a known undirected graph.
- Xie, Xie, and Moustakides (2019), "Asynchronous Multi-Sensor Change-Point Detection for Seismic Tremors": a related sensor-delay approach discussed in the NetCP manuscript.

## Related Concepts

- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]: posterior trajectory updates for dependent segmentations.
- [[concepts/neuroimaging-data-analysis|Neuroimaging Data Analysis]]: multichannel EEG provides an application involving seizure-associated changes.
