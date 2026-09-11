---
title: Signed Political Networks
type: concept
tags:
  - signed-networks
  - political-polarization
  - social-network-analysis
---

## Overview

Signed political networks distinguish cooperative, neutral, and antagonistic relationships between political actors. Direction, relationship type, time, and provenance can be retained alongside sign. This representation helps distinguish dense interaction among allies from dense interaction among adversaries, a distinction that unsigned connectivity alone cannot make.

## Key Ideas

- Unsigned community detection can place opposing leaders in one community when criticism creates many edges between them. Sign-aware analysis can reveal camp separation hidden by that connectivity.
- A relationship-type prior and an instance-level sign are different measurements. The latter reflects the source passage's particular interaction rather than assigning all instances the same valence.
- Predominantly negative cross-camp ties and relatively more positive within-camp ties are consistent with structural balance. Aggregate sign ratios do not prove that every triad is balanced or that allies never compete.
- News-based signs describe reported interactions, not necessarily private trust, ideological distance, or causal influence. Conflict-heavy coverage can overweight adversarial relationships.
- Camp assignments require independent care. If extracted membership relations are contaminated, validated external affiliations are needed to avoid circular or erroneous comparisons.
- Temporal comparisons depend on article coverage, edge aggregation, and identity resolution. A rise in raw negative-edge counts may reflect additional reporting rather than increasing antagonism.

## Important Papers

- [[Mapping Political-Elite Networks in Europe with a Multilingual Joint Entity-Relation Extraction Pipeline]]: Shows how signed relations expose the Polish PO-PiS cleavage when unsigned detection groups front-line opponents together.
- Cartwright and Harary (1956), "Structural Balance: A Generalization of Heider's Theory." Cited theoretical reference for balance.

## Related Concepts

- [[Social Network Analysis]]
- [[Political Polarization]]
- [[Social Trust Networks]]
- [[Ontology-Constrained Relation Extraction]]
