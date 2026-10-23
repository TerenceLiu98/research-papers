---
title: Transformer Representation Trajectory Geometry
type: concept
tags:
  - mechanistic-interpretability
  - representation-learning
  - transformer-dynamics
---

## Overview

Transformer representation trajectory geometry studies the ordered sequence of hidden states across network depth. Instead of decoding a feature from one layer, it measures how a token or pooled sequence representation moves through the hidden space during a forward pass. The trajectory axis is layer depth, not generated-token time or training time.

## Key Ideas

- **Path length and turning angles:** Sum the norms of consecutive hidden-state differences to measure travel distance; compare adjacent differences by their angle to measure directional change. These measurements require consistent extraction sites and a stated treatment of zero-length steps.
- **Category separation:** A between-category minus within-category distance index measures relative semantic organization. Increasing separation can arise through between-category expansion as well as within-category contraction, so it does not by itself identify an attractor.
- **Two kinds of cosine similarity:** Adjacent-layer similarity measures persistence along a single path; similarity between lexical variants at the same layer measures robustness to surface-form changes.
- **Measurement choices matter:** Token selection, sequence pooling, normalization, and coordinate transformations can change the geometry. Full-space computation avoids projection distortion in metrics but does not make them coordinate-independent.
- **Controls answer different questions:** Random labels test category assignments, random weights test learned structure, and shuffled layers test ordering. Visual agreement across projections does not replace quantitative full-space analysis.
- **Displacement trajectories:** Replacing states with consecutive-layer differences emphasizes what each block writes to the residual stream and can attenuate persistent lexical content. This is a modeling choice rather than a guaranteed invariance: raw states may retain useful signal and can outperform displacements when prompt structure is stable.
- **Learned sequence models:** A recurrent classifier can consume the ordered token-by-layer update grid to detect labels such as candidate validity. Cross-task predictive transfer is evidence that the sequence contains reusable signal, but it does not by itself identify a causal reasoning mechanism or establish a universal geometry of truth.
- **Description versus mechanism:** Curvature differences across prompt families can motivate hypotheses about computation. Establishing complexity prediction, stable attraction, or causal relevance requires additional behavioral or intervention evidence. No trained probe is needed for these metrics, but category-based analyses still require labels.

## Important Papers

- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]] defines five metrics and reports depthwise patterns in three small decoder-only models. Its observational scope, mock-data figure, and inconsistent disambiguation reporting constrain the empirical interpretation.
- [[papers/truth-as-a-trajectory-what-internal-representations-reveal-about-large-language-model-reasoning|Truth as a Trajectory: What Internal Representations Reveal About Large Language Model Reasoning]] trains an LSTM on layer-wise residual displacements across tokens and layers, testing cross-dataset validity and toxicity classification against static probes and trajectory ablations.
- [[papers/geometry-of-divergence-tracking-hidden-state-trajectories-for-adaptive-multi-turn-reasoning|Geometry of Divergence: Tracking Hidden-State Trajectories for Adaptive Multi-Turn Reasoning]] applies related displacement geometry across dialogue turns rather than layers, using it to diagnose failure and trigger adaptive reasoning.

## Related Concepts

- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: aligns depthwise vocabulary-prediction trajectories between teacher and student models.
- [[concepts/attribution-patching|Attribution Patching]]: predicts the output effects of local activation changes rather than characterizing unperturbed paths alone.
- [[concepts/linear-probing|Linear Probing]]: tests target accessibility at one representation, providing a static baseline for trajectory classifiers.
- [[concepts/temporal-straightening|Temporal Straightening]]: uses directional penalties on latent trajectories over environment time for planning.
- [[concepts/multi-turn-hidden-state-trajectory-geometry|Multi-Turn Hidden-State Trajectory Geometry]]: samples a fixed model layer across interaction turns and relates the resulting path to agent outcomes.
