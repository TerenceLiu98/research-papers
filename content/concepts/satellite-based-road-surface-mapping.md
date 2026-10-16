---
title: Satellite-Based Road Surface Mapping
type: concept
tags:
  - satellite-imagery
  - geospatial-ai
  - road-networks
  - infrastructure
---

## Overview

Satellite-based road surface mapping enriches a road network with physical attributes such as pavedness and approximate width. Combining image segmentation with existing road geometry supports repeated infrastructure inventories and analyses of development, accessibility, and transport vulnerability.

## Key Ideas

- **Separate geometry from attributes.** A mapped road centerline establishes location but does not establish surface, width, or usability. Segmentation and spatial post-processing supply additional measurements.
- **Keep coverage and accuracy distinct.** The fraction of road length assigned a surface is different from agreement with independently validated labels. Existing map tags can be outdated and should not automatically be treated as ground truth.
- **Specify the denominator.** Paved length divided by paved plus unpaved length excludes unknown surfaces. Geographic variation in unknown classifications can affect comparisons, and arterial coverage does not imply coverage of local streets.
- **Treat temporal differences as measurements.** Construction may change surface class, but cloud cover, vegetation, moisture, and image properties can also change predictions. Normalizing paving change by the initial unpaved share becomes unstable near full pavedness.
- **Respect spatial resolution.** Width derived from segmentation masks is a first-order estimate when roads span only a few pixels. Surface and width can inform logistical screening without establishing actual passability.
- **Distinguish indicators from effects.** Infrastructure attributes can correlate with development while leaving the causal impact of investment unidentified. Connectivity consequences also depend on the road graph and the disruption scenario.

## Important Papers

- [[papers/the-changing-surface-of-the-worlds-roads|The changing surface of the world's roads]]: maps arterial surface attributes for 2020 and 2024 using PlanetScope imagery and connects them to development indicators and network dependence.

## Related Concepts

- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: uses road attributes to define removal scenarios and assess structural dependence.
