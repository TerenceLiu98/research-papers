---
title: Thompson Sampling using Prior-fitted Diffusion Transformers
type: paper
authors:
  - Sihwa Park
  - Jingsen Zhu
  - Vinamr Jain
  - Sheng-Yen Chou
  - Alexander Terenin
year: null
tags:
  - bayesian-optimization
  - generative-models
  - amortized-inference
---

## TL;DR

A diffusion transformer learns to sample an objective's maximizer directly from observed evaluations, approximating Thompson sampling under synthetic function priors. Non-Gaussian priors improve some black-box optimization benchmarks and reduce online computation, but performance depends on the problem and posterior approximation remains imperfect.

## Research Question

Can generative pretraining make Thompson sampling practical for continuous optimization under function priors whose posteriors are difficult to compute explicitly?

## Motivation

Gaussian processes make Bayesian optimization computationally manageable but restrict prior specification. Learning the conditional distribution of maximizers shifts inference cost into pretraining and permits structured non-Gaussian priors without discretizing the continuous output space.

## Contributions

- A prior-fitted diffusion transformer trained with standard flow matching to generate maximizers conditioned on observations.
- Function priors built from warped unimodal envelopes, optionally augmented with random oscillations.
- Experiments separating posterior approximation error from prior choice, alongside compute-allocation and inference-runtime studies.

## Method

Sample a function from a chosen prior, generate an observation set, and obtain its maximizer analytically or through numerical optimization. Train on these synthetic observation–maximizer pairs. A transformer encodes observations with fully connected attention and no positional encoding, preserving invariance to their order. Cross-attention conditions a time-dependent vector field on this context; [[concepts/flow-matching|Flow Matching]] transports Gaussian noise into candidate maximizers.

The ideal distribution-matching objective targets the conditional maximizer distribution underlying [[concepts/thompson-sampling|Thompson Sampling]]. Finite training and numerical sampling approximate that target. At inference, eight independent samples form a batch, using a 100-step Euler solver and no per-task retraining.

The unimodal construction is $E(x;x^*)=\alpha-\|n(x)-n(x^*)\|^2$, where $n$ is a randomly initialized invertible flow. The envelope-plus-wiggles family adds gated random Fourier-feature fluctuations, with either a shared or per-frequency length scale. Context sampling mixes uniform points and points nearer the optimum; this affects finite-training behavior. Appendix C reports prior hyperparameters selected by Bayesian optimization separately by dimension.

## Experiments

The main experiments use 16 seeds, eight parallel evaluations, an initial $2(d+1)$ observations, and a budget of at most 200 observations. Reported curves show median regret and interquartile ranges.

| Evaluation | Reported finding |
| --- | --- |
| Matched GP priors, dimensions 4, 8, 16 | Close performance in lower dimensions; an approximation gap favors GP Thompson sampling at dimension 16. |
| Ackley, Levy, Rosenbrock, dimensions 8, 16, 25 | At least one proposed prior usually beats other diffusion baselines. On 8D Ackley, DiBO beats the proposed variants, and several GP baselines do better still. |
| Prior comparison | Unimodal priors tend to work best at dimension 8; wiggle variants at 16 and 25. Problem-specific priors can underperform more generic ones. |
| Lunar Lander, Swimmer, Pest Control | Proposed models outperform baselines on Lunar Lander, approximately tie several on Swimmer, and trail GP methods and Diff-BBO on Pest Control. |

Table 5 measures 16D Ackley with batches of eight on one RTX A6000, using four seeds and 20 timed rounds after three warm-up rounds. The proposed model takes **192 ± 14 ms per round**, versus **690 ± 38 ms** for GP Thompson sampling, **786 ± 458 ms** for expected improvement, and **813 ± 3 ms** for DDOM. These online timings exclude pretraining, reported as roughly 6–24 hours per run.

The scaling study varies 16 model sizes and five compute budgets, evaluating average median regret over seven functions. Optimal model size appears approximately constant at the three largest budgets, but the authors also fit an uncapped power law and leave saturation unresolved.

## Limitations

- Better priors do not guarantee better finite-budget decisions: the explanation that mismatch can encourage useful short-horizon exploitation is an interpretation of the results.
- Learned posterior approximation incurs measurable regret under a matched GP prior at higher dimension.
- Benefits are benchmark-dependent, including negative results on Pest Control and 8D Ackley.
- Online speed shifts costs into synthetic-data generation, prior tuning, and pretraining; it is not an end-to-end training-cost comparison.
- Tested main contexts are limited to 200 observations. The scaling evidence does not establish a universal model-size ceiling.
- The supplied Markdown does not identify a publication year, venue, DOI, or arXiv identifier; year is left unset rather than inferred from references.

## Related Concepts

- [[concepts/thompson-sampling|Thompson Sampling]]: the decision rule whose conditional maximizer distribution is amortized.
- [[concepts/flow-matching|Flow Matching]]: the distribution-learning objective and continuous sampling mechanism.

## Related Papers

- Müller et al., *Transformers Can Do Bayesian Inference* (2022), source reference [24]: establishes the prior-fitted training paradigm.
- Müller et al., *PFNs4BO: In-Context Learning for Bayesian Optimization* (2023), source reference [23]: earlier prior-fitted Bayesian optimization contrasted with continuous maximizer generation.
- Wilson et al., *Pathwise Conditioning of Gaussian Processes* (2021), source reference [35]: supports the GP Thompson sampling comparator.
