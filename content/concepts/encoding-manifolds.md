---
title: Encoding Manifolds
type: concept
aliases:
  - Neural Encoding Manifold
  - Encoding Manifold Topology
tags:
  - neural-manifolds
  - computational-neuroscience
  - representational-similarity
  - functional-organization
---

## Overview

An encoding manifold represents neurons or model units as points in a stimulus-response space. Nearby units have similar tuning and temporal response profiles, while global topology describes whether a population forms discrete functional groups, continuous variation, or other organization. This complements a decoding manifold, which instead represents stimuli as points in neural-response coordinates.

## Key Ideas

- **The axes of comparison are transposed.** Decoding geometry asks how a population separates stimuli; encoding geometry asks how units are organized by the responses they produce across stimuli.
- **Similar readouts can hide different populations.** Two systems can preserve RSA, CKA, classification, or trajectory geometry while distributing the work across different functional subpopulations.
- **Topology carries functional hypotheses.** Clusters can indicate distinct response types, while continuous geometry can indicate graded variation. These interpretations require biological or causal validation rather than following from an embedding alone.
- **Construction is model-dependent.** One pipeline uses nonnegative tensor factorization to form neuron response coordinates, adaptive neighborhood graphs to estimate local structure, and diffusion maps to recover global geometry.
- **Coverage and alignment are different questions.** A small subpopulation can retain decoding performance while occupying only a restricted region of the full encoding manifold. Intrinsic distances such as [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] can quantify structural coverage without assuming pointwise correspondence.
- **Encoding geometry is not a circuit diagram.** Response-profile organization can expose differences that decoding metrics miss, but causal interventions are still needed to identify computational pathways.

## Important Papers

- Dyballa et al. (2024), "Population Encoding of Stimulus Features along the Visual Hierarchy": develops the encoding-manifold pipeline and reports clustered retinal organization alongside a continuous V1 organization.
- [[papers/decoding-alignment-without-encoding-alignment-a-missing-component-for-interpretability|Decoding Alignment without Encoding Alignment: A Missing Component for Interpretability]]: causally manipulates encoding topology while preserving common decoding metrics and proposes GW similarity as a complementary diagnostic.
- Dyballa and Zucker (2023), "IAN: Iterated Adaptive Neighborhoods for Manifold Learning and Dimensionality Estimation": supplies the adaptive graph method used in the manifold pipeline.

## Related Concepts

- [[concepts/brain-encoding-and-decoding|Brain Encoding and Decoding]]
- [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- Neural representation geometry
- Diffusion maps
