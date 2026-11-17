---
title: Tourist Mobility Networks
type: concept
aliases:
  - Tourism Mobility Networks
definition: "Tourist mobility networks represent visited locations as nodes and observed tourist movements between locations as edges, optionally retaining direction and transition frequency."
tags:
  - tourism
  - human-mobility
  - complex-networks
---

## Overview

Tourist mobility networks describe how travel connects attractions or destinations. Their meaning depends on the spatial unit, sampling source, and transition rule: a network of consecutive attraction visits captures itinerary progression, while an origin–destination network answers a different movement question.

## Key Ideas

- Directed edges preserve visit order; weights can count observed transitions across itineraries.
- Consecutive duplicate locations do not imply movement, while a return after another visit can represent a meaningful loop.
- Season and companion groups define context-specific networks, but missing metadata can change their sampled populations.
- Platform traces reveal the behavior of contributing users. Heavy-tailed weights and geographically coherent communities do not establish representative population flow counts.
- Aggregation, thresholding, and transition-probability normalization change the analytical question and should be stated explicitly.

## Important Papers

- [[papers/a-dataset-of-tourist-mobility-networks-across-china-derived-from-online-travel-blogs|A dataset of tourist mobility networks across China derived from online travel blogs]]: releases attraction-level itinerary networks and demonstrates coverage, external-correlation, and structural checks.

## Related Concepts

- [[concepts/radiation-model-of-human-mobility|Radiation Model of Human Mobility]]: estimates spatial flows from populations and opportunities; observed tourist itinerary transitions have a different sampling basis and interpretation.
