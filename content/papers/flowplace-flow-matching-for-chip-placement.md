---
title: "FlowPlace: Flow Matching for Chip Placement"
type: paper
authors:
  - Peng Xie
  - Ke Xue
  - Yunqi Shi
  - Ruo-Tong Chen
  - Chengrui Gao
  - Siyuan Xu
  - Chenjian Ding
  - Mingxuan Yuan
  - Chao Qian
year: 2026
venue: "DAC 2026"
doi: "10.1145/3770743.3804343"
source_job_id: "9e0ab760-92da-4103-a1f0-6de3f012b14e"
tags:
  - chip-placement
  - flow-matching
  - generative-models
  - electronic-design-automation
  - constrained-generation
---

## TL;DR

FlowPlace applies [[concepts/flow-matching|Flow Matching]] to [[concepts/chip-placement|Chip Placement]], training on synthetic layouts that favor legal boundary positions and inserting greedy non-overlap projection into the sampling trajectory. On eight ICCAD 2015 circuits and six OpenROAD designs, the paper reports zero-overlap macro layouts, 10-50x faster sampling than ChipDiffusion, the best average ICCAD ranks for routed wirelength and congestion, and the best OpenROAD ranks for timing, power, and area, though not for routed wirelength.

## Research Question

Can a generative macro placer transfer to unseen circuits while avoiding the random synthetic data, long sampling trajectories, and residual overlaps associated with diffusion-based placement?

## Motivation

Macro locations strongly affect downstream wirelength, congestion, timing, power, and area. Sequential reinforcement-learning placers can be expensive to train per circuit and cannot revise early decisions easily, while analytical placers optimize differentiable proxies and require legalization. ChipDiffusion offers simultaneous, zero-shot generation, but its random synthetic layouts omit design priors, its denoising trajectory uses 1,000 steps, and gradient guidance does not guarantee non-overlap.

## Contributions

- Generates synthetic training layouts with legal-position masks and a boundary-aware score, encoding the design heuristic that large macros often leave the center available for standard cells and routing.
- Replaces diffusion sampling with a conditional flow-matching objective and a configurable source distribution; a uniform canvas prior performs best among the four evaluated priors.
- Integrates hard-constraint projection throughout inference by extrapolating an endpoint, greedily legalizing it, and interpolating the corrected endpoint back into the trajectory.
- Evaluates zero-shot transfer through downstream placement and routing flows on ICCAD 2015 and OpenROAD benchmarks.

## Method

Synthetic layouts are built on a discretized canvas. Macros are processed in descending size order, and a GPU-parallel binary mask identifies non-overlapping grid locations. Legal positions receive score

$$
S(p)=\frac{1}{(\operatorname{dist}(p,\partial C)+\epsilon)^2},
$$

then are sampled in proportion to that score. Pin offsets and proximity-based connections are generated afterward to form a netlist.

The learned state is the position of every macro. Node features contain normalized macro dimensions, edge features contain paired pin offsets, and the velocity network alternates GATv2 layers with multi-head self-attention. For a source layout $x_0$ and synthetic target $x_1$, training samples $t\sim U(0,1)$, forms $x_t=(1-t)x_0+tx_1$, and regresses the constant displacement $x_1-x_0$. Inference integrates the learned ODE with Euler steps; the reported setup uses 20-50 steps rather than ChipDiffusion's 1,000.

At each inference step, FlowPlace extrapolates a predicted endpoint, applies a greedy legalization operator that selects nearby non-overlapping grid cells while considering boundary distance, and uses the corrected endpoint to update the trajectory. This projection is applied to all macros and its geometric checks are parallelized on GPU.

## Experiments

- **Benchmarks and flow:** ICCAD 2015 supplies eight circuits with hundreds of macros and millions of standard cells. DREAMPlace 4.1 places standard cells and a commercial global router evaluates routed wirelength, horizontal and vertical congestion overflow, worst negative slack, and total negative slack. Six Nangate45 OpenROAD designs are evaluated through placement, optimization, clock-tree synthesis, and routing for routed wirelength, timing, power, and cell area.
- **Baselines:** Comparisons cover the analytical placer DREAMPlace, reinforcement-learning placers MaskPlace and EfficientPlace, and the generative baseline ChipDiffusion.
- **ICCAD 2015:** FlowPlace has average ranks 1.62 for routed wirelength, 1.00 for horizontal overflow, 1.25 for vertical overflow, 2.62 for worst negative slack, and 2.25 for total negative slack. These are the best ranks for the first four metrics and tie EfficientPlace for the best total-negative-slack rank.
- **OpenROAD:** FlowPlace has average ranks 2.83 for routed wirelength, 2.33 for worst negative slack, 1.83 for total negative slack, 2.00 for power, and 2.17 for area. It leads the timing, power, and area rankings, while DREAMPlace leads routed wirelength at 2.17.
- **Generative comparison:** Against ChipDiffusion, Figure 4 reports lower average routed wirelength, zero overlap, and a 10-50x sampling speedup across the two benchmark suites.
- **Ablations:** Mask-guided rather than random synthetic data improves every reported ICCAD metric rank. For source priors, normalized average HPWL ratios are 1.067 for a standard Gaussian, 1.023 for a truncated Gaussian, 1.029 for a narrower Gaussian, and 1.019 for a uniform prior.

## Limitations

- FlowPlace generates macro positions only; standard-cell placement, optimization, and routing remain delegated to external analytical and physical-design tools.
- Evidence covers 14 benchmark circuits and one OpenROAD technology library. It does not establish transfer across a broader range of technologies, floorplan constraints, or industrial design distributions.
- The training layouts encode a hand-designed boundary bias and proximity-derived netlists. The paper does not establish that this synthetic distribution captures every useful structural pattern in real layouts.
- The reported ablations isolate the synthetic dataset and source prior, but not the velocity-network components, projection frequency, greedy legalization rule, or inference-step count.
- The supplied paper reports the 10-50x sampling comparison in a figure rather than a hardware-normalized timing table, limiting detailed compute comparison.
- Zero overlap is reported for the generated macro layouts; it should not be read as a guarantee of globally optimal wirelength or downstream PPA, as the per-design tables contain metrics on which other placers perform better.

## Related Concepts

- [[concepts/chip-placement|Chip Placement]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/hypergraphs|Hypergraphs]]

## Related Papers

- Lee et al. (2025), "Chip Placement with Diffusion Models": the primary generative baseline, using random synthetic layouts, diffusion sampling, and gradient-based guidance.
- Cheng et al. (2025), "Gradient Free Generation for Hard-Constrained Systems": the progressive constraint-enforcement strategy adapted for FlowPlace sampling.
- Lipman et al. (2023), "Flow Matching for Generative Modeling": the conditional flow-matching foundation.
- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: another application in which deterministic transport reduces the sampling budget relative to diffusion, though in a different domain.

Source: supplied parsed manuscript, Cognitio job `9e0ab760-92da-4103-a1f0-6de3f012b14e`.

[[index|Library home]]
