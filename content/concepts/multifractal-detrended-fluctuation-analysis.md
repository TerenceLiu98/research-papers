---
title: Multifractal Detrended Fluctuation Analysis
type: concept
aliases:
  - MF-DFA
tags:
  - multifractal-analysis
  - time-series
  - scaling
---

## Overview

Multifractal detrended fluctuation analysis (MF-DFA) estimates how fluctuations in a time series scale across window sizes and moment orders after removing local trends. It extends detrended fluctuation analysis from one scaling exponent to a family $h(q)$, allowing small and large fluctuations to exhibit different dependence patterns.

## Key Ideas

- Construct a cumulative profile, detrend it within windows of size $s$, and aggregate residual fluctuations to estimate $F_q(s)\sim s^{h(q)}$. Positive $q$ emphasizes large fluctuations; negative $q$ emphasizes small fluctuations.
- A monofractal scaling model has constant $h(q)$ in the ideal limit. Variation across orders motivates multifractal summaries such as the range $\Delta h$ and singularity-spectrum width $\Delta\alpha$.
- For the increment-series convention used in the political application below, $H=h(2)<0.5$ indicates anti-persistence and $H>0.5$ persistence. Interpretation depends on the input transformation and whether levels or increments are analyzed.
- Fully overlapping windows can smooth estimated fluctuation functions. Focus-based regression jointly fits moment orders through a common endpoint at $s=N$, but requires fit diagnostics because imposing that constraint can mislead for monofractal inputs.
- Finite samples and heavy-tailed marginal distributions can produce apparent multifractality. IAAFT surrogate comparisons estimate the width remaining after accounting for a reference that preserves marginal and linear structure while disrupting nonlinear dependence. A positive corrected width alone does not supply a significance threshold.
- Scale range, detrending order, moment range, measurement precision, and possible scaling crossovers affect interpretation. Good fit to a scaling relation does not identify a causal process or demonstrate predictive utility.

## Important Papers

- Kantelhardt et al. (2002), "Multifractal detrended fluctuation analysis of nonstationary time series," *Physica A* 316, 87-114: foundational method, cited as reference 54 in the application below.
- Mukli, Nagy, and Eke (2015), "Multifractal formalism by enforcing the universal behavior of scaling functions," *Physica A* 417, 150-167: focus-based estimation, cited as reference 81.
- [[U.S. Politics from a multifractal perspective]]: applies overlapping, focus-based MF-DFA and surrogate width corrections to approval, attention, and election-contract series.

## Related Concepts

- [[Prediction Markets]]: one application to temporally evolving collective expectations.
- [[Opinion Dynamics]]: political dependence patterns can constrain models without identifying the mechanisms that generate them.
