---
title: Iterative Proportional Fitting
type: concept
aliases:
  - IPF
  - Raking
tags:
  - population-synthesis
  - survey-weighting
  - statistical-calibration
  - election-simulation
---

## Overview

Iterative Proportional Fitting (IPF) estimates a multidimensional joint table from an initial table and known marginal totals. It repeatedly rescales entries so that one set of margins matches its targets, then rescales them for another set, cycling until the margins are sufficiently close or the updates stabilize. In population simulation, IPF can convert separate demographic and political distributions into a usable joint sampling distribution.

## Key Ideas

- **Marginal-to-joint reconstruction:** IPF supplies a joint distribution when the available data describe variables separately or through lower-order tables rather than observing every combination directly.
- **Multiplicative updates:** Each pass preserves nonnegative cell values while adjusting them in proportion to the ratio between a target margin and the current margin.
- **Initialization matters:** The seed table encodes the associations available before calibration. IPF aligns margins but does not create independent evidence that the resulting cross-variable associations are correct.
- **Convergence is an empirical condition:** Structural zeros, incompatible targets, sparse cells, or an unsuitable seed can prevent exact convergence. Reporting residual marginal gaps is therefore part of validating an IPF-based population.
- **Calibration is not representation:** Matching demographic margins does not make the sampled population representative on unmeasured variables, platform participation, or behavioral distributions.
- **Use with simulation evaluation:** In ElectionSim, IPF is applied within each state to gender, race, age group, ideology, and partisanship. The paper reports that 888 of 918 marginals are within 5% of their targets, while most runs do not converge.

## Important Papers

- [[papers/electionsim-massive-population-election-simulation-powered-by-large-language-model-driven-agents|ElectionSim: Massive Population Election Simulation Powered by Large Language Model Driven Agents]]: applies IPF to construct state-level joint distributions for LLM voter simulation.
- Choupani and Mamdoohi (2016), "Population synthesis using iterative proportional fitting (IPF): A review and future research."

## Related Concepts

- [[Massive Population Election Simulation]]
- Population synthesis
- Survey weighting
- Demographic calibration
