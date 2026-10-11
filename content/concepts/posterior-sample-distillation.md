---
title: Posterior Sample Distillation
type: concept
aliases:
  - Posterior Samples Distillation
tags:
  - posterior-sampling
  - model-compression
  - bayesian-neural-networks
---

## Overview

Posterior sample distillation compresses or summarizes a collection of posterior draws for efficient downstream inference. For Bayesian neural networks, each draw can be a full parameter vector requiring another forward pass. A useful compressed representation must therefore be assessed by both its resource cost and the predictive or uncertainty information it retains.

## Key Ideas

- **Compress for the intended task.** Preserving a predictive mean can require different samples or weights from preserving tail probabilities or calibration. A small collection that works for one metric need not preserve the posterior generally.
- **Several mechanisms are possible.** Selection, importance weighting, sequential stopping or testing, and learned weight-space generative surrogates offer different ways to reduce sample processing. They need not produce a single student network.
- **Thinning is only one reduction rule.** Periodic deletion ignores which samples carry information relevant to a task. Sommer and Rügamer advocate retaining samples first when feasible, then applying informed reduction; extremely large models may require online processing.
- **Reweighting changes the approximation.** Addressing autocorrelation or mode imbalance may improve particular predictions, but improvement must be measured. Compression cannot be assumed to recover posterior regions absent from the original sample collection.
- **Distinguish training-data compression.** Bayesian coresets and dataset distillation reduce the data burden during inference or training; posterior sample distillation reduces the representation used after sampling.
- **Benchmark fidelity and deployment cost together.** Forward-pass counts, storage, I/O, calibration, and downstream metrics capture different consequences. A promising compression proposal is not itself evidence of preserved uncertainty.

## Important Papers

- [[papers/position-the-time-for-sampling-is-now-charting-a-new-course-for-bayesian-deep-learning|Position: The Time for Sampling Is Now! Charting a New Course for Bayesian Deep Learning]]: Sections 5.1-5.4 identify posterior management and distillation as research priorities and call for reusable sample benchmarks; the paper does not validate a new distillation algorithm.
- Park et al. (2025), "Ensemble distribution distillation via flow matching": cited there as an example of a learned generative surrogate in weight space.
- Riabiz et al. (2022), "Optimal thinning of mcmc output": cited there in the discussion of principled sample reduction.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: generates the collections being compressed.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: a related transfer framework; posterior compression also includes sample-selection and weighting approaches without teacher-student training.
- [[concepts/probability-calibration|Probability Calibration]]: one downstream property that compression should explicitly evaluate.
