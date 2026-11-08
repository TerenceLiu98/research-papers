---
title: Dynamic Latent Space Models
type: concept
aliases:
  - Dynamic Latent Position Models
  - Dynamic Latent Distance Models
tags:
  - latent-space-models
  - dynamic-networks
  - network-analysis
  - longitudinal-networks
---

## Overview

Dynamic latent space models represent each network node by a position that changes over time. Pairwise distance encodes relational affinity, so trajectories summarize how the network's latent geometry evolves. Models differ in whether time is discrete or continuous, whether movement is smooth or regime-based, and whether observations are network snapshots, edge counts, or exact event times.

## Key Ideas

- **Distance is relational, not absolute.** Nearby nodes are modeled as more likely to interact, but translation, rotation, and reflection can leave all pairwise distances unchanged. Coordinates therefore require anchoring or post-processing, and substantive interpretation should focus on identified quantities.
- **Temporal representation determines possible change.** Snapshot positions, stochastic processes, splines, piecewise-linear paths, and hidden regimes express different assumptions about smoothness, recurrence, and abrupt movement.
- **Activity and affinity should be separated.** Node-specific intercepts can capture actors that interact frequently with everyone. Without them, degree heterogeneity may be misread as centrality in the latent geometry.
- **Continuous-time models can use exact timestamps.** A point-process intensity links instantaneous interaction risk to current latent distance, avoiding arbitrary temporal aggregation while requiring integration over non-events.
- **Regularization controls trajectory meaning.** Penalties on velocity limit total movement, while curvature or acceleration penalties discourage erratic changes in direction. These terms affect both forecasting and interpretations of mobility.
- **Prediction requires an extrapolation rule.** Smooth interpolation inside the observation window does not itself determine future positions. Persistence, constant velocity, or a dynamic prior can produce materially different forecasts.
- **Geometry does not establish causality.** A moving latent position summarizes changing relational patterns; external evidence is needed to attribute movement to alliances, shocks, policies, or other mechanisms.

## Important Papers

- Hoff, Raftery, and Handcock (2002), "Latent Space Approaches to Social Network Analysis": foundation for distance-based network embeddings.
- Sarkar and Moore (2005), "Dynamic Social Network Analysis Using Latent Space Models": early dynamic extension using network snapshots.
- Sewell and Chen (2015), "Latent Space Models for Dynamic Networks": dynamic latent positions for longitudinal networks.
- Artico and Wit (2023), "Dynamic Latent Space Relational Event Model": continuous-time latent trajectories for relational events.
- Rastelli and Corneli (2023), "Continuous Latent Position Models for Instantaneous Interactions": continuous latent positions with piecewise-linear movement.
- [[papers/dynamic-latent-space-modeling-of-inhomogeneous-poisson-network-processes-with-applications-to-international-relations|Dynamic Latent Space Modeling of Inhomogeneous Poisson Network Processes with Applications to International Relations]]: combines smooth spline trajectories with node activity effects, identification results, and scalable point-process estimation.

## Related Concepts

- [[concepts/relational-event-models|Relational Event Models]]: models exact or ordered interaction events rather than only network snapshots.
- [[concepts/markov-switching-latent-space-network-models|Markov-Switching Latent Space Network Models]]: represent temporal change with a finite set of recurring geometries.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: use shared positions to connect networks with additional measurements.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: characterizes which transformations of latent coordinates remain observationally equivalent.
