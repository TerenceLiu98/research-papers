---
title: "Latent ODEs for Irregularly-Sampled Time Series"
type: paper
authors:
  - Yulia Rubanova
  - Ricky T. Q. Chen
  - David Duvenaud
year: null
source_job_id: 49c60926-ebaa-4c5a-b089-221a0ce1f2b5
tags:
  - irregular-time-series
  - neural-odes
  - variational-inference
---

[[index|Library home]]

## TL;DR

ODE-RNNs evolve a recurrent hidden state continuously between measurements and update it when observations arrive. Using this architecture as the recognition network of a Latent ODE improves sparse time-series reconstruction and extrapolation in the reported experiments. Mortality classification gains are less decisive, and explicitly modeling observation times does not improve classification.

## Research Question

Can learned continuous-time dynamics improve inference and prediction from sparse, irregular observations without requiring a fixed observation grid?

## Motivation

Binning and imputing irregular measurements can discard timing information. Exponential-decay recurrent models accommodate elapsed time but constrain hidden dynamics toward a fixed point. Neural ODEs instead learn the dynamics between measurements.

## Contributions

- Introduces the ODE-RNN, combining learned continuous evolution with discrete observation updates.
- Replaces the RNN recognition network of earlier Latent ODEs with an ODE-RNN.
- Adds a Poisson-process likelihood for informative observation times.
- Evaluates interpolation, extrapolation, and classification on synthetic periodic trajectories, MuJoCo, PhysioNet, and human activity data.

## Method

An ODE-RNN integrates its hidden state from the previous observation time to the current one, then applies a GRU update using the new measurement. It can serve directly as an autoregressive predictor.

The [[concepts/latent-ordinary-differential-equations|Latent ODE]] instead samples an initial latent state from a prior, evolves it under a learned deterministic ODE, and emits conditionally independent observations from the resulting states. An ODE-RNN estimates a Gaussian approximate posterior over the initial state; encoder and decoder are trained with an evidence lower bound. For interpolation the encoder runs backward to the first observation; for extrapolation it runs forward to the final conditioning time, where decoding begins.

An optional inhomogeneous Poisson likelihood models observation times through a latent-dependent intensity. Its log likelihood sums log intensities at events and subtracts the integrated intensity. Augmenting the ODE with an integral state permits joint evaluation with the trajectory.

## Experiments

Models use random 80/20 training/test splits. Baselines include time-gap RNNs, imputation and exponential-decay variants, GRU-D, RNN-VAE, and Latent ODEs with RNN encoders.

- **MuJoCo (Table 3):** At 10% observed points, interpolation MSE is 0.360 for the ODE-encoder Latent ODE, 2.477 for its RNN-encoder counterpart, and 6.514 for RNN-VAE, all in units of 10⁻². Corresponding extrapolation errors are 1.441, 1.663, and 2.378. Autoregressive ODE-RNN extrapolation is poor and does not consistently beat standard RNNs.
- **PhysioNet (Tables 4–5):** On 8,000 ICU records with up to 37 features, ODE-RNN interpolation MSE is 2.361 ± 0.086 versus GRU-D's 3.384 ± 0.274, in units of 10⁻³. The ODE-encoder Latent ODE achieves interpolation/extrapolation MSE of 2.118 ± 0.271 / 2.231 ± 0.029, versus RNN-VAE's 5.930 ± 0.249 / 3.055 ± 0.145, in the same units.
- **Mortality classification (Table 6):** AUC is 0.833 ± 0.009 for ODE-RNN, 0.829 ± 0.004 for the ODE-encoder Latent ODE, and 0.818 ± 0.008 for GRU-D. The authors describe these as similar. Adding Poisson likelihood yields 0.826 ± 0.007 and no classification improvement.
- **Human activity (Table 7):** Seven-class per-time-point accuracy is 0.846 ± 0.013 for the ODE-encoder Latent ODE, 0.835 ± 0.010 with an RNN encoder, and 0.829 ± 0.016 for ODE-RNN.
- **Synthetic trajectories:** Qualitative examples show periodic extrapolation and reduced posterior variability with more conditioning observations; the supplementary numerical results are not uniformly favorable across sampling levels.

## Limitations

The generative trajectory is deterministic conditional on its initial state: uncertainty is represented through initial-state inference and observation noise, rather than stochastic process dynamics. Observation updates change inference, not the underlying generative state.

ODE integration adds cost even across empty intervals. Reported evaluation time is about 60% greater for ODE-RNN than a standard GRU, with Latent ODE taking roughly twice ODE-RNN's time. Solver cost depends on interval length and dynamics complexity.

Although the architecture supports arbitrary timestamps, experiments round PhysioNet times to minutes and activity times to 100 ms. Activity windows partially overlap and are randomly split after pooling subjects; these results do not establish held-out-subject generalization. PhysioNet normalization uses all patients. The supplied text does not explicitly identify its publication year or a stable paper identifier, so these metadata are left unspecified.

## Related Concepts

- [[concepts/latent-ordinary-differential-equations|Latent Ordinary Differential Equations]]: separates latent dynamics, emissions, and amortized inference.

## Related Papers

- Chen et al., *Neural Ordinary Differential Equations* (2018): introduces the earlier Latent ODE construction whose recognition network this work improves.
- Che et al., *Recurrent Neural Networks for Multivariate Time Series with Missing Values* (2018): GRU-D combines decay and imputation and provides a principal baseline.
- [[papers/chronoflow-hierarchical-flow-matching-for-irregular-time-series-generation|ChronoFlow]]: the existing library summary describes a Poisson + LatentODE baseline for complete irregular-sample generation, a different evaluation target from reconstruction and extrapolation here.

Source: supplied parsed Markdown, Cognitio job `49c60926-ebaa-4c5a-b089-221a0ce1f2b5`.
