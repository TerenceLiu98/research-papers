---
title: Contrastive Analysis
type: concept
aliases:
  - Common and Salient Factor Discovery
tags:
  - representation-learning
  - contrastive-analysis
  - subtype-discovery
---

## Overview

Contrastive analysis separates variation shared by a background and target dataset from salient variation specific to the target. Dataset membership supplies supervision even when the relevant attributes or their subtypes lack labels. For example, faces without glasses provide background variation against which eyewear characteristics can be discovered.

## Key Ideas

- **The comparison defines salience.** Salient factors are relative to the chosen background and target distributions. Dataset labels alone do not uniquely allocate correlated attributes to factors.
- **Group separation is insufficient.** A representation can distinguish background from target while mixing the target's internal subtypes. Probe accuracy, clustering, and decoded manipulations assess different properties.
- **Discovery and decoding are separate capabilities.** Generative CA methods learn decodable factors; representation-based methods may lack a decoder. SAGE combines factor discovery with a frozen pretrained image decoder.
- **Reconstruction is underdetermined.** Common factors can absorb the entire image. SAGE uses adversarial attribute swaps to force salient content into a separate map, and sparsity and consistency to limit shared-content leakage.
- **Selective does not mean exclusive.** A clean salient factor can coexist with target information still decodable from the common factor. Successful image edits do not establish complete disentanglement or causal identification.

## Important Papers

- [[papers/sage-salient-factor-discovery-and-generation-with-visual-foundation-representations|SAGE: Salient Factor Discovery and Generation with Visual Foundation Representations]]: spatial factor discovery, editing, and reference-conditioned generation.
- Abid and Zou (2019), "Contrastive variational autoencoder enhances salient features": generative CA, as discussed in SAGE.
- Louiset et al. (2024), "Separating common from salient patterns with contrastive representation learning": decoder-free factor learning, as compared in SAGE.

## Related Concepts

- [[concepts/disentangled-representations|Disentangled Representations]]
- [[concepts/representation-autoencoders|Representation Autoencoders]]
