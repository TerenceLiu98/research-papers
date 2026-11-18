---
title: Narrative Diffusion Graphs
type: concept
definition: "Narrative diffusion graphs connect narrative-labeled messages or sources through observed forwarding or inferred content reuse to characterize how recurring claims circulate."
aliases:
  - Narrative Propagation Graphs
tags:
  - narrative-classification
  - information-diffusion
  - network-analysis
---

## Overview

Narrative diffusion graphs combine a representation of recurring claims with relationships between messages or sources. They distinguish which narrative a post expresses from evidence about how that post or related content travels.

## Key Ideas

- Native forwarding records provenance; semantic similarity proposes additional reuse relationships. Preserve these as distinct edge types with different evidential strength.
- Time orientation makes semantic flows directional but does not demonstrate that the later author encountered the earlier post.
- Direct cross-group event shares and multi-hop reachability measure different properties. Sparse boundary crossings can coexist with broad indirect connectivity.
- Channel classifications depend on label reliability, minimum evidence, and thresholds. An insufficiently observed channel should not be interpreted as verified narrative-free.
- Aggregated channel paths need not constitute a temporally feasible message cascade. Upstream centrality identifies positions within the sampled network rather than absolute originators.

## Important Papers

- [[papers/graph-based-detection-of-disinformation-narrative-diffusion-between-russian-and-ukrainian-telegram-channels|Graph-Based Detection of Disinformation Narrative Diffusion between Russian and Ukrainian Telegram Channels]]: compares Telegram forwarding and time-oriented semantic layers after few-shot narrative labeling.

## Related Concepts

- [[concepts/narrative-polarization|Narrative Polarization]]: divergence in portrayals is distinct from connectivity between narrative-labeled groups.
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: models posit transmission dynamics, whereas empirical diffusion graphs reconstruct observable or inferred relationships.
- [[concepts/dominant-narrative-explanation|Dominant Narrative Explanation]]: explicit rationales can clarify what a narrative label means before it is aggregated into a network analysis.
