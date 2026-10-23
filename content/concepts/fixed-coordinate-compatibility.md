---
title: Fixed-Coordinate Compatibility
type: concept
aliases:
  - Fixed-Coordinate Decodability
tags:
  - representation-alignment
  - knowledge-distillation
  - sparse-representations
---

## Overview

Fixed-coordinate compatibility measures whether a model representation can be decoded through a coordinate system and decoder fixed independently of the model training being evaluated. It addresses a limitation of learned alignment heads: teacher-feature prediction can remain unchanged under an invertible change of basis in the student, so prediction accuracy alone cannot identify corresponding student coordinates.

Compatibility is relative to its chosen reference system. It is neither an intrinsic property of a representation nor evidence that the fixed coordinates are universally semantic or causally equivalent across models.

## Key Ideas

- **Independent anchoring:** The coordinate system and evaluation decoder must be fixed before the audited model is optimized. A jointly trained or post-hoc fitted decoder measures predictability or connectability, not direct reuse of prespecified coordinates.
- **Held-out decoding:** An evaluation branch excluded from the transfer objective can test whether a student code is directly readable in the fixed system. Whether that branch participated in reference-system pretraining determines whether the result is adapter-free reuse or the stronger claim of extension to an unseen model family.
- **Quality is a separate axis:** Downstream probes measure usefulness, while fixed-coordinate decoding measures compatibility with one reference. The two can rank training objectives differently.
- **Correspondence matters:** Matching the marginal frequency or mass of coordinates need not preserve which input locations activate them. A shuffled-target intervention can separate allocation from spatial correspondence.
- **Support selection matters:** Matching values on coordinates selected with teacher assistance does not show that the student can choose those coordinates autonomously. Local-support evaluation and teacher-assisted support restoration distinguish these capabilities.
- **Reference capacity limits the audit:** Reconstruction error from the fixed vocabulary contributes to measured decoding error. The result should be reported relative to that vocabulary rather than treated as a universal error floor.

## Important Papers

- [[papers/what-does-multi-teacher-distillation-transfer-measuring-feature-distillation-with-fixed-concept-coordinates|What Does Multi-Teacher Distillation Transfer? Measuring Feature Distillation with Fixed Concept Coordinates]] formalizes the measurement and uses matched correspondence and support interventions in multi-teacher vision distillation.
- [[papers/universal-sparse-autoencoders-interpretable-cross-model-concept-alignment|Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]] provides one form of fixed shared sparse vocabulary with model-specific encoders and decoders.
- Lenc and Vedaldi (2015), "Understanding Image Representations by Measuring Their Equivariance and Equivalence," and Bansal, Nakkiran, and Barak (2021), "Revisiting Model Stitching to Compare Neural Representations," study learned post-hoc connections between representations, a related but distinct measurement target.

## Related Concepts

- [[concepts/knowledge-distillation|Knowledge Distillation]]
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Representational alignment
- Model stitching
