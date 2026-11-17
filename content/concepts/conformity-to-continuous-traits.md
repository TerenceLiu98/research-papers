---
title: Conformity to Continuous Traits
type: concept
aliases:
  - Continuous-Trait Conformity
definition: "Conformity to continuous traits is preferential adoption of densely clustered observed trait values on a continuous spectrum, with popularity determined by proximity among observations."
tags:
  - opinion-dynamics
  - social-learning
---

## Overview

For continuous opinions, popular clusters and the arithmetic mean can differ substantially. Conformity defined through local density favors values close to other observed values, allowing adoption of a populated cluster even when the mean falls in an empty region between clusters.

## Key Ideas

- **Local popularity:** k-dispersal measures a candidate’s distance to its k nearest observed alternatives. Lower dispersal indicates a denser cluster.
- **Biased copying:** conformity increases adoption probability for clustered values; anticonformity favors dispersed values. Random copying is the zero-bias baseline.
- **Personal information:** a personal opinion can enter the candidate set with its own relative weight. Copying noise can spread probability around each candidate rather than around one overall average.
- **Collective consequences:** clustering-based copying and averaging can produce different polarization and accuracy trajectories. These consequences depend on network structure, personal beliefs, and parameter choices.

## Important Papers

- [[papers/conformity-to-popular-not-average-opinions-models-data-and-evolution|Conformity to popular, not average, opinions: Models, data, and evolution]] extends the mechanism with personal beliefs, compares it with human revisions, and explores network dynamics.
- Heinrich Mora et al. (2025), “Conformity to continuous and discrete ordered traits,” introduces the underlying dispersal-based model, as described in the paper above.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: the broader study of individual influence and collective opinion distributions.
