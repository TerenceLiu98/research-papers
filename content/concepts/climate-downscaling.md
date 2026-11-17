---
title: Climate Downscaling
type: concept
aliases:
  - Regional Climate Downscaling
definition: "Climate downscaling translates coarse climate-model outputs into finer regional climate or weather information using physical simulation, statistical mappings, or learned generative models."
tags:
  - climate-downscaling
  - climate-risk
---

## Overview

Climate downscaling bridges the resolution gap between global climate projections and regional information needed for impact assessment. It must address both coarse-model biases and unresolved variability; higher output resolution alone does not ensure reliable local risk estimates.

## Key Ideas

- Dynamical downscaling simulates regional physics under large-scale forcing, with computational costs that constrain ensemble size.
- Statistical downscaling learns relationships from reference data. Marginal accuracy need not imply correct spatial, temporal, or cross-variable dependence.
- Free-running climate simulations lack event-aligned observations. Distributional bias correction can use unpaired data, while super-resolution can learn paired examples constructed by coarsening reanalysis.
- Generative downscaling samples multiple plausible fine-scale realizations. Compound hazards require joint dependence, and prolonged extremes require temporal coherence.
- Historical agreement and preservation of future climate-change signals are separate evaluation questions. Reanalysis and dynamical models are useful references but do not establish future ground truth.

## Important Papers

- [[papers/regional-climate-risk-assessment-from-climate-models-using-probabilistic-machine-learning|Regional climate risk assessment from climate models using probabilistic machine learning]]: GenFocal separates unpaired coarse-scale rectified-flow debiasing from conditional diffusion super-resolution, evaluating humid heat and tropical cyclones.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learned distribution transport can correct coarse climate biases.
- [[concepts/diffusion-models|Diffusion Models]]: conditional generation can sample unresolved weather variability.
