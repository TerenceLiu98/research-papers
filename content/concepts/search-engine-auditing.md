---
title: "Search Engine Auditing"
type: concept
tags:
  - algorithm-auditing
  - information-retrieval
  - platform-governance
---

## Overview

Search engine auditing empirically tests how query formulation, ranking, location, time, and platform choice affect the information returned by a search system. Audits use controlled queries and repeated observations to characterize system behavior without requiring access to proprietary ranking algorithms.

## Key Ideas

- **Matched queries:** Holding a topic constant while varying political, demographic, or other cues helps isolate associations between query wording and returned content.
- **Multiple audit dimensions:** Result overlap alone is insufficient. Audits can compare ranking, semantic content, narrative frames, source concentration, political leaning, and source quality.
- **Position matters:** Because users disproportionately attend to early results, measurements should preserve or explicitly model rank rather than treat results as an unordered sample.
- **Dynamic outputs:** Search results vary by time, location, language, personalization, and current events. Synchronized collection improves platform comparisons, but a snapshot does not establish temporal stability.
- **Behavior is not impact:** An audit can document exposure opportunities and platform differences; claims about belief change or polarization require user experiments or other causal designs.

## Important Papers

- [[papers/social-and-political-framing-in-search-engine-results|Social and Political Framing in Search Engine Results]]: compares semantic, framing, source, ideological, and factuality outcomes across three news search engines and three query conditions.
- Kulshrestha et al. (2019), "Search Bias Quantification": distinguishes bias introduced by input data and users from bias introduced by ranking.
- Urman, Makhortykh, and Ulloa (2022), "The Matter of Chance": studies variability in election-related results across six search engines.

## Related Concepts

- [[concepts/rank-turbulence-divergence|Rank Turbulence Divergence]]
- [[concepts/issue-framing-effects|Issue Framing Effects]]
- [[concepts/interactive-agenda-setting|Interactive Agenda Setting]]
