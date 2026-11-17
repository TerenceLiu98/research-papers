---
title: Network-Based Ideal-Point Imputation
type: concept
aliases:
  - Network Ideology Imputation
definition: "Network-based ideal-point imputation extends externally measured political positions to unlabeled actors through their relational proximity to labeled actors."
tags:
  - ideal-point-estimation
  - social-network-analysis
---

## Overview

Network-based ideal-point imputation uses observed relationships to extend an existing political scale to actors without direct measurements. Its measurement assumption is that relational proximity carries information about ideological similarity. External labels anchor both orientation and scale.

## Key Ideas

- **Fixed seeds and averaging:** In a harmonic averaging implementation, labeled nodes retain their values while unlabeled nodes repeatedly average neighboring values.
- **Absorption interpretation:** Treat seeds as absorbing states of a random walk. Each imputed value is a weighted combination of seed values, with weights equal to absorption probabilities. Every scored component needs access to a seed.
- **Bipartite measurement:** Actor–event graphs can yield scores for both actors and events, such as organizations and the briefs they sign.
- **Validation and shrinkage:** Leave-one-out prediction evaluates recovery of known labels. Replacing seed actors' published scores with held-out predictions can make their shrinkage comparable to unlabeled actors, but does not establish validity in a different target population.
- **Scope:** Shared affiliations can reflect considerations beyond ideology. Static seed labels and pooled networks do not identify changing positions over time, and label error propagates into imputation.

## Important Papers

- [[papers/the-ideologies-of-organized-interests-and-amicus-curiae-briefs-large-scale-social-network-imputation-of-ideal-points|The Ideologies of Organized Interests and Amicus Curiae Briefs]]: develops ACNet using donation scores and amicus cosigning, with an absorbing-chain formulation and leave-one-out validation.

## Related Concepts

- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: estimates political positions from following patterns; its spatial and correspondence-analysis formulations differ from fixed-seed propagation.
