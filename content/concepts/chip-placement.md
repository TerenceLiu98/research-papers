---
title: Chip Placement
type: concept
aliases:
  - VLSI Placement
  - Macro Placement
tags:
  - electronic-design-automation
  - physical-design
  - combinatorial-optimization
  - integrated-circuits
---

## Overview

Chip placement assigns spatial coordinates to circuit components subject to a fixed layout region and non-overlap constraints. Because macros are much larger and fewer than standard cells, physical-design flows commonly place macros first and use their arrangement as the foundation for subsequent standard-cell placement, optimization, clock-tree synthesis, and routing. Placement quality is evaluated downstream through wirelength, congestion, timing, power, and area rather than by geometry alone.

## Key Ideas

- **Netlist-conditioned geometry.** A netlist is naturally represented as a [[concepts/hypergraphs|hypergraph]] whose vertices are movable components and whose hyperedges are electrical nets. Placement must balance connectivity against spatial feasibility.
- **Macro and standard-cell stages.** Macro placement determines the coarse layout, while analytical placers can fill in the much larger population of standard cells. A macro placer therefore does not by itself complete the physical-design flow.
- **Feasibility and quality differ.** Non-overlap and boundary compliance are hard geometric requirements. A legal layout can still have poor routed wirelength, congestion, slack, power, or cell area after downstream optimization.
- **Classical methods.** Topological data structures combined with simulated annealing or evolutionary search preserve feasibility but can restrict the search space and scale poorly. Analytical placers optimize differentiable wirelength and density objectives efficiently, then rely on legalization.
- **Learning-based methods.** Reinforcement-learning placers construct layouts sequentially, making early decisions difficult to revise. Generative placers move all macros jointly and can transfer without per-circuit training, but still need a mechanism that converts learned proposals into legal layouts.
- **Synthetic design priors.** When public layouts are too scarce for generative training, synthetic layouts can encode domain knowledge such as keeping large macros near boundaries. Such priors can improve transfer but also narrow the learned design distribution.

## Important Papers

- Mirhoseini et al. (2021), "A Graph Placement Methodology for Fast Chip Design": frames macro placement as sequential reinforcement learning.
- Lin et al. (2020), "DREAMPlace: Deep Learning Toolkit-Enabled GPU Acceleration for Modern VLSI Placement": a GPU-accelerated analytical placement framework.
- Lai, Mu, and Luo (2022), "MaskPlace: Fast Chip Placement via Reinforced Visual Representation Learning": a reinforcement-learning macro placer.
- Lee et al. (2025), "Chip Placement with Diffusion Models": applies diffusion generation and gradient guidance to zero-shot placement.
- [[papers/flowplace-flow-matching-for-chip-placement|FlowPlace: Flow Matching for Chip Placement]]: combines boundary-biased synthetic layouts, flow matching, and progressive non-overlap projection.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/hypergraphs|Hypergraphs]]
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]
- [[concepts/strip-packing|Strip Packing]]
