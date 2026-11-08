---
title: Trajectory Flow Matching with Applications to Clinical Time Series Modeling
type: paper
authors:
  - Xi Zhang
  - Yuan Pu
  - Yuki Kawamura
  - Andrew Loza
  - Yoshua Bengio
  - Dennis L. Shung
  - Alexander Tong
year: null
tags:
  - flow-matching
  - time-series
  - neural-differential-equations
  - clinical-machine-learning
  - uncertainty-quantification
---

[[index|Library home]]

## TL;DR

Trajectory Flow Matching (TFM) trains neural ODE or SDE models of irregular time series without backpropagating through differential-equation solutions. It conditions the flow on trajectory history and covariates to preserve observed couplings, predicts the next observation time, and learns an error-based uncertainty signal. On four clinical datasets, the paper reports substantially lower trajectory MSE than the evaluated neural differential-equation and flow-matching baselines, while the stochastic variant better matches uncertainty and increment distributions in several settings.

## Research Question

Can [[concepts/flow-matching|Flow Matching]] provide simulation-free training for stochastic, irregularly sampled time-series dynamics while retaining the dependence between successive observations and representing predictive uncertainty?

## Motivation

Neural SDEs model stochastic continuous-time dynamics, but their usual objectives require simulation and backpropagation through an SDE solver. Ordinary conditional matching objectives preserve time-indexed marginals but need not preserve which endpoints belong to the same trajectory, particularly when paths cross. Clinical measurements add irregular observation times, sparse covariates, and uncertainty whose magnitude may itself be informative.

## Contributions

- Formulates [[concepts/trajectory-flow-matching|Trajectory Flow Matching]] as a simulation-free regression objective for trajectory-valued data and states sufficient conditions for preserving trajectory couplings.
- Reparameterizes velocity prediction as next-target prediction, producing a time-weighted equivalent of the matching loss and improving numerical stability in the reported implementation.
- Adds an auxiliary next-observation-time loss for irregular sampling and an error-prediction loss used as an epistemic uncertainty estimate.
- Evaluates deterministic TFM-ODE and stochastic TFM on a harmonic-oscillator example and four clinical datasets involving heart rate and blood pressure trajectories.

## Method

For adjacent observations, TFM samples an intermediate state from a Gaussian bridge whose mean linearly interpolates the observations and whose variance is proportional to $t(1-t)$. A network regresses the conditional bridge velocity. Rather than outputting velocity directly, the target-prediction parameterization estimates the next observation and converts it to a velocity by dividing its displacement from the current state by the remaining interval.

The coupling result depends on conditioning making the local trajectory velocity identifiable. The paper gives three sufficient cases: a deterministic map from an initial state to its successor, a sufficiently long observation history that distinguishes trajectories, or a trajectory-specific condition vector. These are sufficient conditions at the optimum, not a claim that arbitrary finite models preserve every empirical coupling.

For irregular samples, a second network predicts the interval until the next observation. The predicted state displacement and time interval determine the instantaneous velocity. A separate network predicts the squared next-state error of the target estimator; this quantity is interpreted as epistemic uncertainty and is used as the SDE noise estimate.

## Experiments

**Crossing trajectories.** On three damped harmonic-oscillator trajectories sharing an initial point, TFM-ODE with three previous observations visually fits the separate paths. TFM-ODE without memory and aligned flow matching produce overlapping predictions, illustrating the role of history in distinguishing crossing trajectories.

**Clinical prediction.** The four datasets cover ICU sepsis, ICU cardiac-arrest risk, ICU gastrointestinal bleeding, and emergency-department gastrointestinal bleeding. Models predict paired heart-rate and mean-arterial-pressure trajectories during the first 24 hours. Results are averaged over five seeds for the clinical experiments. TFM-ODE reports MSEs (multiplied by $10^{-3}$) of 0.793, 2.762, 2.673, and 8.245; the corresponding TFM values are 0.796, 2.755, 2.596, and 8.613. The paper summarizes these as 15-83% reductions relative to the evaluated baselines, with the largest gain on ICU sepsis.

**Uncertainty and distributions.** On the three ICU datasets in Table 2, stochastic TFM has lower uncertainty-test MSE and lower reported variance than TFM-ODE. TFM also has the lowest increment-distribution RBF-MMD on cardiac arrest, ICU gastrointestinal bleeding, and emergency-department gastrointestinal bleeding; TFM-ODE is best on ICU sepsis.

**Ablations.** Increasing hidden width generally improves MSE. Removing uncertainty prediction worsens the reported point-prediction MSE despite the state and uncertainty networks having separate losses, an empirical interaction the paper does not explain. History improves ICU sepsis and ICU gastrointestinal bleeding but not emergency-department gastrointestinal bleeding, so the evidence does not support memory as uniformly beneficial.

## Limitations

- The coupling guarantees require idealized identifiability and regularity assumptions and concern an optimal matching solution; they do not establish coupling preservation under finite data, limited model capacity, or imperfect optimization.
- The uncertainty target is the model's observed squared prediction error. The paper calls it epistemic uncertainty, but does not report calibration, coverage, or prospective decision metrics.
- Clinical results are retrospective. The proposed care applications require prospective validation, outcome-specific calibration, subgroup-bias assessment, and safeguards against under- or overtreatment.
- The clinical experiments model two physiologic variables over the first 24 hours and do not establish generalization to other signals, institutions, or observation policies.
- Memory is selectively useful, and the method does not currently estimate causal effects of interventions.
- The source reports roughly 24,000 GPU hours and notes that individual runs require about one GPU-day; the claim that matching-based models train faster is not accompanied by a formal runtime comparison.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: history-conditioned matching for coupled time-series trajectories.
- [[concepts/flow-matching|Flow Matching]]: the simulation-free conditional vector-field regression framework underlying TFM.
- [[concepts/probabilistic-time-series-forecasting|Probabilistic Time Series Forecasting]]: distributional prediction and uncertainty evaluation for future observations.
- [[concepts/neural-controlled-differential-equations|Neural Controlled Differential Equations]]: a related continuous-time approach for irregular observations.

## Related Papers

- Lipman et al., "Flow Matching for Generative Modeling" (2023): supplies the conditional flow-matching framework.
- Kidger et al., "Efficient and Accurate Gradients for Neural SDEs" (2021): a simulation-based neural-SDE baseline and motivation for avoiding solver backpropagation.
- Rubanova et al., "Latent Ordinary Differential Equations for Irregularly-Sampled Time Series" (2019): a continuous-time latent baseline for irregular observations.
- Lahlou et al., "DEUP: Direct Epistemic Uncertainty Prediction" (2023): motivates direct prediction of model error as an uncertainty signal.
- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: applies rectified flow to fixed-grid unconditional generation, forecasting, and imputation rather than coupled irregular trajectories.
- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: incorporates temporal structure through the source distribution rather than through TFM's adjacent-observation bridges.

Source: supplied parsed manuscript, Cognitio job `064c826d-12cd-414a-a616-78be9163f1e9`. Publication metadata is unspecified in the source.
