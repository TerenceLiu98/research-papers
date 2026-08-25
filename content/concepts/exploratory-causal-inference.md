---
title: Exploratory Causal Inference
type: concept
aliases:
  - ECI
  - Empiricist Causal Inference
tags:
  - causal-inference
  - exploratory-causal-inference
  - unstructured-data
  - causal-representation-learning
---

## Overview

Exploratory causal inference discovers which latent outcomes change under a randomized treatment when the outcomes are not specified before analysis. The outcomes are measured indirectly through high-dimensional observations such as images or video, so the analysis must first construct interpretable measurement channels. It complements prespecified, rationalist causal analysis by generating candidate effects for domain experts to interpret and test.

## Key Ideas

- Randomization identifies treatment-control contrasts, but it does not identify which aspect of an unstructured observation should be treated as the outcome.
- A foundation model followed by a sparse autoencoder can turn raw observations into a broad dictionary of candidate channels. The validity of this step depends on representation sufficiency and approximate alignment between channels and latent outcomes.
- Entanglement creates the Paradox of Exploratory Causal Inference: as sample size or effect magnitude increases, weak leakage into many channels can become statistically significant even after classical multiplicity correction.
- Recursive residual testing can separate principal effect channels from leakage. [[Neural Effect Search]] selects a leading channel, accounts for it in later strata or residuals, and stops when no residual effect remains.
- A discovered signal is not automatically a scientifically meaningful outcome. Finite-sample protocol or recording artifacts can be real treatment-associated signals and still require expert dismissal or follow-up.

## Important Papers

- [[Exploratory Causal Inference in Science]]
- [[Causal Inference with Unstructured Outcomes]]
- Chalupka, Eberhardt, and Perona (2017), "Causal feature learning: an overview."
- Schölkopf et al. (2021), "Toward causal representation learning."

## Related Concepts

- [[Neural Effect Search]]
- [[Unstructured Outcome Causal Inference]]
- Causal representation learning
- Sparse autoencoders
- Randomized controlled trials
- Multiple hypothesis testing

