---
title: Simulation-Based Inference for Causal Evaluation
type: concept
aliases:
  - SBICE
  - Posterior-Weighted Causal Simulation
tags:
  - causal-inference
  - simulation-based-inference
  - synthetic-data
  - approximate-bayesian-computation
---

## Overview

Simulation-based inference for causal evaluation treats a synthetic-data generator and its causal data-generating parameters as uncertain. Rather than benchmarking estimators on one generator with fixed assumptions, it infers a posterior over configurations that can reproduce an observed source dataset and evaluates estimators on posterior-weighted synthetic datasets.

## Key Ideas

- **Joint uncertainty over models and assumptions:** A discrete prior covers candidate generators, while generator-specific priors cover quantities such as treatment effect, unobserved confounding, effect heterogeneity, and treatment propensity.
- **Likelihood-free compatibility:** When a generator has no tractable likelihood, approximate Bayesian computation compares simulated and source datasets with a distributional distance and retains sufficiently close configurations.
- **Posterior-weighted benchmarking:** Synthetic datasets sampled from the inferred posterior focus causal-estimator evaluation on assumptions compatible with observed data rather than treating every prior setting as equally plausible.
- **Model selection as part of inference:** A generator receives less posterior mass when it consistently produces data far from the source, so generator choice and parameter sensitivity are handled in one procedure.
- **No escape from non-identifiability:** If several causal configurations imply the same observed distribution, the data cannot select a unique one. The posterior should preserve that ambiguity, subject to the prior and simulator family.
- **Simulator adequacy is a prerequisite:** Posterior inference can filter configurations but cannot correct a family that cannot generate source-like data. Persistent distance is a model-checking signal, not evidence for a causal conclusion.
- **Task-specific validation:** Distributional fit should be supplemented with posterior predictive checks tied to estimator behavior, because similar marginal or joint distances do not guarantee similar causal-estimation error.

## Important Papers

- [[papers/improving-generative-methods-for-causal-evaluation-via-simulation-based-inference|Improving Generative Methods for Causal Evaluation via Simulation-Based Inference]]: introduces SBICE using SMC-ABC, distributional distances, and bias squared error for causal-estimator benchmarking.
- Cranmer, Brehmer, and Louppe (2020), "The frontier of simulation-based inference": surveys the broader likelihood-free inference framework.
- Toni and Stumpf (2010), "Simulation-based model selection for dynamical systems in systems and population biology": develops SMC-ABC model selection used as the inference mechanism in SBICE.

## Related Concepts

- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: learns posterior or likelihood-ratio approximations from simulator output; causal evaluation can instead use non-neural SMC-ABC over trained generators.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: clarifies when observed distributions can distinguish parameter configurations.
- [[concepts/causal-overlap|Causal Overlap]]: one causal property that generators may expose as an uncertain DGP parameter.
- [[concepts/simulation-based-calibration|Simulation-Based Calibration]]: evaluates whether Bayesian inference is calibrated across repeated prior-predictive datasets.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: one distance that can compare generated and source distributions during likelihood-free inference.
