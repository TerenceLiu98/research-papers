---
title: "Toward Causal Representation Learning"
type: paper
authors:
  - Bernhard Schölkopf
  - Francesco Locatello
  - Stefan Bauer
  - Nan Rosemary Ke
  - Nal Kalchbrenner
  - Anirudh Goyal
  - Yoshua Bengio
year: 2021
tags:
  - causal-representation-learning
  - causality
  - representation-learning
  - independent-causal-mechanisms
  - disentanglement
  - out-of-distribution-generalization
---

## TL;DR

This review argues that causal modeling can complement statistical machine learning by representing interventions, distribution shifts, and counterfactuals rather than only i.i.d. associations. It presents independent causal mechanisms (ICM) and the sparse mechanism shift (SMS) hypothesis as inductive biases for causal discovery and transfer, then frames causal representation learning as the problem of recovering useful high-level causal variables and relations from low-level observations.

## Research Question

How can causal models improve robustness, transfer, and reasoning beyond the i.i.d. setting of standard machine learning? Conversely, how can representation learning discover the causal variables that traditional causal models usually assume are already given?

## Motivation

Statistical predictors can be accurate under fixed experimental conditions while failing after interventions or domain shifts. The review positions causal models between detailed physical models and purely statistical descriptions: they retain enough structural information to reason about interventions and, for structural causal models, counterfactuals, while remaining learnable from data under additional assumptions. This is especially important for raw perceptual data, where the variables and causal units are not provided in advance.

## Contributions

- Organizes physical, structural causal, causal graphical, and statistical models by the predictions and interventions they support and by how readily they can be learned from data.
- Reviews structural causal models, causal factorization, latent confounding, interventions, counterfactuals, and the limits of observational data.
- Develops the ICM principle: a causal generative process is composed of autonomous modules that do not inform or influence one another.
- States the SMS hypothesis, which predicts that small distribution changes usually affect a sparse or local subset of causal mechanisms rather than all factors at once.
- Connects causal discovery from interventions, changing environments, nonstationary data, and function-class assumptions to machine learning.
- Defines causal representation learning as learning high-level variables from entangled, high-dimensional observations, with causal structure serving as an inductive bias.
- Reinterprets semisupervised learning, adversarial robustness, domain generalization, pretraining, data augmentation, reinforcement learning, and continual learning through causal assumptions.

## Method

This is a conceptual review rather than a new learning algorithm. It uses structural causal models with assignments of the form $X_i := f_i(\mathbf{PA}_i, U_i)$ and the associated causal factorization $P(X_1,\ldots,X_n)=\prod_i P(X_i\mid\mathbf{PA}_i)$. Interventions modify assignments or mechanisms, while counterfactuals additionally require fixing the exogenous noise variables.

For causal representation learning, the review considers low-level observations generated as $X=G(S_1,\ldots,S_n)$ from latent causal variables. A candidate architecture combines an encoder, a structured mapping implementing causal mechanisms, and a decoder. ICM, invariance across environments, sparse mechanism changes, and independent interventions are proposed as biases that can make the learned representation more causal. The review emphasizes that the useful granularity of variables depends on the downstream tasks, available interventions, and observed distribution shifts.

## Experiments

The article reports no original dataset, benchmark, training run, or ablation study. Instead, it synthesizes theoretical results and prior empirical work. Its examples cover robustness to image perturbations, transfer of modular representations, disentanglement, invariant prediction, self-supervision, model-based and offline reinforcement learning, scientific simulation, personalized medicine, and astronomical signal deconfounding. The astronomy example cites prior work that identified 36 planet candidates and later validated 21 as exoplanets; these are results of the cited studies, not experiments conducted in this review.

## Limitations

The review is a research agenda and synthesis, so its proposed benefits for robustness, transfer, and versatile AI are not established by a single controlled evaluation. Causal discovery remains dependent on assumptions about function classes, faithfulness, environments, interventions, and confounding. Recovering exogenous variables is ill-defined from i.i.d. observations alone, and causal variables may be unobserved, coarse-grained, or task-dependent. Even when a causal model is available, the set of possible interventions must be specified; if observed environments do not cover that set, out-of-distribution error can remain arbitrarily large in the worst case. The review also identifies unresolved scalability and numerical-stability problems for learning nonlinear causal relations from high-dimensional inputs.

## Related Concepts

- [[Causal Representation Learning]]
- [[Independent Causal Mechanisms]]
- [[Disentangled Representations]]
- [[Structural Identifiability]]
- [[Statistical Identifiability]]
- [[Continual Learning]]

## Related Papers

- [[Statistical and Structural Identifiability in Representation Learning]]
- Bengio et al. (2019), "A Meta-Transfer Objective for Learning to Disentangle Causal Mechanisms."
- Parascandolo, Kilbertus, Rojas-Carulla, and Schölkopf (2018), "Learning Independent Causal Mechanisms."
- Peters, Janzing, and Schölkopf (2017), "Elements of Causal Inference—Foundations and Learning Algorithms."
- Schölkopf et al. (2012), "On Causal and Anticausal Learning."
- Locatello et al. (2020), "Weakly-Supervised Disentanglement Without Compromises."

[[index|Library home]]
