---
title: Mixed Time-Series Causal Discovery
type: concept
aliases:
  - Mixed Time Series Causal Discovery
  - MiTS Causal Discovery
tags:
  - causal-discovery
  - time-series
  - mixed-data
---

## Overview

Mixed time-series causal discovery estimates directed temporal relationships among variables observed on different scales, including continuous measurements and discrete states. Differences in distribution and measurement granularity complicate both conditional-independence testing and predictive modeling. A discrete state may be a thresholded observation of a continuous process, but that interpretation is an assumption about the measurement mechanism.

## Key Ideas

- **Separate numeric states from nominal categories.** Ordered levels can represent quantized magnitude; arbitrary category labels cannot generally be smoothed as numeric amplitudes without introducing an artificial ordering.
- **Account for information lost in measurement.** Thresholding maps many continuous values to the same discrete state. A representation learned from the discrete series is not automatically an identified reconstruction of the original signal.
- **Use informative continuous variables as supervision.** MiTCD trains embeddings of discrete histories to help forecast related continuous series while also reconstructing the discrete observations. The benefit depends on relationships between observed continuous variables and the latent processes behind the discrete states.
- **Distinguish representation learning from graph learning.** MiTCD uses multiscale Gaussian kernels for continuous embeddings, then sparse neural predictors for [[concepts/granger-causality|Granger Causality]]. Mixed-data conditional-independence tests offer another approach without requiring this particular embedding.
- **Preserve temporal information boundaries.** A smoothed representation can contain future observations even when a downstream predictor accepts only lagged embeddings. MiTCD's published kernel equation sums symmetrically over the full sequence, so strict temporal interpretation requires checking how the embedding is constructed.
- **Evaluate sensitivity to the observation process.** Discrete-variable proportion, number of states, thresholds, available continuous supervision, and graph sparsity change the task. In MiTCD's Lorenz-96 experiment, increasing the discrete proportion from 10% to 80% lowers AUROC from 99.29 to 86.46 (Table VIII).
- **Keep predictive and causal claims distinct.** A useful continuous representation can improve graph-ranking scores without proving unique latent recovery or removing hidden confounding. Causal sufficiency and assumptions about instantaneous effects still matter.

## Important Papers

- [[papers/addressing-information-asymmetry-deep-temporal-causality-discovery-for-mixed-time-series|Addressing Information Asymmetry: Deep Temporal Causality Discovery for Mixed Time Series]]: MiTCD combines continuous-variable supervision, multiscale Gaussian embeddings, discrete reconstruction, and sparse Granger graph learning. Its evidence primarily concerns thresholded benchmark series.
- Zeng et al. (2022), "Causal Discovery for Linear Mixed Data": cited by MiTCD as a mixed-variable causal model with multivariate identifiability conditions under its assumptions.
- Tsagris et al. (2018), "Constraint-Based Causal Discovery with Mixed Data": cited source for regression-based conditional-independence testing; MiTCD evaluates RegCI within PCMCI.

## Related Concepts

- [[concepts/granger-causality|Granger Causality]] supplies a criterion based on predictive dependence over temporal histories.
- [[concepts/causal-representation-learning|Causal Representation Learning]] addresses learning representations for causal reasoning and the additional assumptions required for identification.
