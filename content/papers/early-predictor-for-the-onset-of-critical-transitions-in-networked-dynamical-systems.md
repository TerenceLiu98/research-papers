---
title: Early Predictor for the Onset of Critical Transitions in Networked Dynamical Systems
type: paper
authors:
  - Zijia Liu
  - Xiaozhu Zhang
  - Xiaolei Ru
  - Ting-Ting Gao
  - Jack Murdoch Moore
  - Gang Yan
year: 2024
doi: "10.1103/PhysRevX.14.031009"
venue: "Physical Review X, 14, 031009"
tags:
  - critical-transitions
  - network-dynamics
  - early-warning
  - deep-learning
---

## TL;DR

A GIN-GRU model estimates the control-parameter value of an upcoming critical transition from 20 observations per observed node, without receiving network topology, edge weights, or current control-parameter values. It achieves mean range-normalized absolute errors of 0.0215, 0.00677, and 0.0132 on simulated synchronization, biomass collapse, and neuronal collapse, respectively. Synthetic pretraining followed by empirical fine-tuning also predicts vegetation transition thresholds in a held-out African district.

## Research Question

Can short, partially observed sequences of node states predict the specific control-parameter threshold of a network-wide transition, rather than merely warn that a transition is approaching?

## Motivation

Classical early-warning signals such as rising variance and lag-1 autocorrelation can reflect critical slowing down, but do not directly locate the future threshold. Existing quantitative approaches discussed in the paper focus on low-dimensional systems or require additional parameter information. Networked ecological and neuronal systems motivate prediction from noisy observations of only some components.

## Contributions

- Formulates [[concepts/quantitative-prediction-of-critical-transitions|Quantitative Prediction of Critical Transitions]] as supervised regression from short pretransition sequences.
- Combines nodewise feature extraction, permutation-invariant max pooling, and recurrent processing to accommodate variable numbers of observed nodes.
- Evaluates continuous synchronization and abrupt collapse transitions, with separate tests of missing nodes, observational noise, and transient observations.
- Transfers a model pretrained on multiple synthetic systems to empirical vegetation data through supervised fine-tuning.

## Method

**Training data and target.** Simulations vary network properties, initial conditions, and selected dynamical parameters while sweeping a control parameter $\varepsilon$. Transition labels $\varepsilon_c$ come from model-specific order parameters or Jacobian eigenvalue behavior. Sliding windows contain 20 observations before the transition. The 70/10/20 train/validation/test split keeps each simulation intact, preventing overlapping windows from the same simulation from crossing splits (Section II).

**Architecture.** Six GIN layers, each followed by batch normalization, transform node histories. Although the paper writes the usual GIN neighborhood-sum formula, it explicitly omits that sum because topology is unavailable. The implemented feature extraction therefore does not pass messages along observed edges. Global max pooling combines node representations, four GRU layers process the pooled representation, and an MLP predicts $\hat\varepsilon_c$. Training minimizes mean squared error; inter-GRU dropout is 0.1, and validation performance selects the model.

**Prediction horizon and metric.** Lead distance is $|\varepsilon_s-\varepsilon_c|$, measured in control-parameter units rather than elapsed time. The current value $\varepsilon_s$ is used for evaluation but is not an input. Reported anticipation inaccuracy is

$$
I=\frac{|\hat\varepsilon_c-\varepsilon_c|}{\varepsilon_{\max}-\varepsilon_{\min}}.
$$

This is absolute error normalized by the swept parameter range, not percentage error relative to the true threshold. Inference does not require governing equations, but synthetic training and label construction do use specified dynamics.

## Experiments

### Synthetic Systems

| System | Network and node count | Simulations / windows | Parameter range | Mean test inaccuracy |
| --- | --- | --- | --- | --- |
| Kuramoto synchronization | Undirected scale-free, 65-135 | 1,000 / 32,632 | Coupling: 0-5 | 0.0215 |
| Resource biomass collapse | Scale-free, 5-400 | 600 / 26,191 | Grazing rate: 1-3 | 0.00677 |
| Wilson-Cowan neuronal collapse | Directed weighted ER, 300-700 | 1,000 / 28,233 | Link attenuation: 0-1 | 0.0132 |

Sections III A-C report predictions across lead distances. For Kuramoto systems, mean inaccuracy is at most 0.0252 at lead distances of about 2.0 or less. Biomass errors remain at most 0.00994 across the tested distances; neuronal errors remain below 0.0169 as lead distance increases.

### Robustness

Section IV evaluates Wilson-Cowan systems under three observation changes. Randomly hiding 81% of nodes gives accuracy comparable to complete observations; even with 99% hidden, mean inaccuracy remains below 0.039 at early prediction windows. With additive Gaussian observational noise, performance shows no obvious deterioration at 35 dB SNR, and mean inaccuracy remains below 0.035 even at 5 dB and large lead distances. Shortening equilibration before observation produces mean inaccuracy 0.026; continuously changing the parameter also retains predictive performance. Figure 5 reports standard deviations over five independent trials.

### Empirical Transfer

Section V combines MODIS tree-cover measurements with TRMM mean annual precipitation averaged over 20 years. Sequences are constructed along latitude, with 100 spatial nodes and interpolation to satisfy the 20-observation window requirement. Pretraining uses biomass, neuronal, and shallow-lake ecosystem simulations for 1,000 epochs. Fine-tuning uses six subsets from two Central African districts for 300 epochs; evaluation uses two areas in a third district. Reported mean relative errors are 0.008 and 0.016, with predictions averaged over ten fine-tuning trials.

The empirical experiment estimates rainfall thresholds from spatial vegetation sequences. It does not demonstrate prospective forecasting of a temporal forest-to-savannah collapse.

## Limitations

- Synthetic tests sample specified model families and parameter distributions. Success without equations at inference does not establish generalization to arbitrary unknown dynamics.
- Empirical transfer requires labeled target-domain data, interpolation, and fine-tuning. Three districts provide limited evidence of geographic transfer, rather than zero-shot deployment.
- The paper reports trying other graph and recurrent architectures and finding LSTM similarly effective but less efficient; the supplied text provides no quantitative comparison table or detailed ablation establishing which components drive the gains.
- The fixed 20-observation window, multiple successive transitions, and higher-order interactions remain future-work questions (Section VI).
- A threshold prediction alone does not determine remaining calendar time or an intervention deadline without additional knowledge of control-parameter evolution.

## Related Concepts

- [[concepts/quantitative-prediction-of-critical-transitions|Quantitative Prediction of Critical Transitions]]: estimating a critical parameter value from pretransition observations.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: relevant to abrupt ecological regime shifts and the vegetation application.
- [[concepts/time-series-anomaly-prediction|Time-Series Anomaly Prediction]]: a neighboring early-warning task with a future anomaly label instead of a numerical transition threshold.

## Related Papers

- Bury et al. (2021), "Deep learning for early warning signals of tipping points," predicts bifurcation classes rather than the numerical threshold targeted here (reference 33).
- Heßler and Kamps (2022), "Bayesian on-line anticipation of critical transitions," provides a quantitative transition-time approach discussed for low-dimensional systems (reference 34).
- Fan et al. (2021), "Anticipating synchronization with machine learning," uses parameter-aware reservoir computing for synchronization thresholds (reference 37).

Published 15 July 2024. [DOI](https://doi.org/10.1103/PhysRevX.14.031009). The paper supplies a [code repository](https://github.com/m-serious/tipping-predictor) in reference 72.

[[index|Library home]]
