---
title: Challenges in Markov Chain Monte Carlo for Bayesian Neural Networks
type: paper
authors:
  - Theodore Papamarkou
  - Jacob Hinkle
  - M. Todd Young
  - David Womble
year: 2022
venue: Statistical Science
volume: 37
issue: 3
pages: "425-442"
url: https://www.jstor.org/stable/10.2307/27368583
source_job_id: "93fc3a61-3f17-44ec-aec5-1fcbddfd0bee"
tags:
  - bayesian-neural-networks
  - posterior-sampling
  - uncertainty-quantification
---

## TL;DR

Small Bayesian multilayer perceptrons can predict accurately even when MCMC diagnostics indicate poor parameter exploration. Across four classification examples, no setting combines low multivariate potential scale reduction factor (PSRF) with high effective sample size (ESS); nevertheless, HMC-based prediction reaches 100% accuracy on penguins and 98.03% on hawks. These results support studying predictive utility separately from parameter convergence, but do not establish accurate recovery of the posterior predictive distribution or calibrated uncertainty.

## Research Question

What obstructs MCMC inference for neural-network parameters, and can predictive averaging remain useful when finite chains fail to explore the parameter posterior adequately?

## Motivation

Neural-network inference combines computational cost, nonlinear hierarchical dependence, weight symmetries, difficult prior specification, and convergence problems. Different parameter configurations can implement the same function, so exploring parameter space and learning useful predictions are distinct objectives. The paper reviews these obstacles and tests the predictive value of imperfect sampling on deliberately small networks (Sections 2-4).

## Contributions

- Organizes MCMC challenges into computational scaling, model structure, weight symmetries, prior specification, and convergence assessment.
- Compares random-walk Metropolis-Hastings (MH), Hamiltonian Monte Carlo (HMC), and a population sampler labeled power posterior (PP) sampling using parameter diagnostics and classification performance.
- Shows examples of accurate predictions from nonconverged chains, alongside noisy-XOR examples where different chains learn different regions of the input space.
- Proposes output-focused approximate inference and dependence-aware block updates as research directions, rather than implemented solutions (Section 5).

## Method

### Models and Sampling

The experiments use sigmoid hidden layers, sigmoid outputs for binary classification, and softmax outputs for three-class classification. All weights and biases have the Gaussian prior $\theta\sim\mathcal N(0,10I)$. MH and HMC run on all four datasets; the more expensive PP sampler runs only on noisy XOR.

PP uses ten interacting chains with MH within-chain updates. Crucially, pilot tuning sets **every temperature to one**: chains target the same posterior, rather than a ladder of progressively tempered distributions (Section 4.2). Its empirical advantage should therefore not be attributed to demonstrated tempering benefits.

Each dataset-sampler setting has ten chain realizations, each with 110,000 iterations and 10,000 discarded as burn-in. Multivariate PSRF compares chains; multivariate ESS is computed per chain and averaged. Both use the multivariate initial monotone sequence covariance estimator. Predictions use the last 10,000 draws of each chain separately, and reported accuracies are averaged over the ten realizations.

### Predictive Averaging

[[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]] approximates the predictive integral by averaging conditional class probabilities:

$$
p(y\mid x,D)=\int p(y\mid x,\theta)p(\theta\mid D)\,d\theta,
\qquad
\widehat p(y\mid x,D)=\frac{1}{V}\sum_{k=1}^{V}p(y\mid x,\theta_k).
$$

Binary predictions threshold the estimated probability of class one at 0.5; multiclass predictions select the largest probability. For nonconverged samples, this average is an approximate predictor with unestablished error relative to the exact integral. The supplied Markdown's Equation (3.11) omits the normalizing factor $1/V$; the expression here writes the normalized Monte Carlo average implied by the expectation in Equation (3.10).

## Experiments

Rows containing missing values in the selected variables are removed from the real datasets, and their features are standardized. Table 1 specifies:

| Dataset | Training / test size | MLP layer widths | Parameters |
| --- | --- | --- | --- |
| Noisy XOR | 500 / 120 | 2, 2, 1 | 9 |
| Pima diabetes | 262 / 130 | 8, 2, 2, 1 | 27 |
| Penguins | 223 / 110 | 6, 2, 2, 3 | 29 |
| Hawks | 596 / 295 | 6, 2, 2, 3 | 29 |

Table 2 reports the following diagnostics and mean test accuracies. ESS refers to chains with 100,000 retained draws; the prior baseline averages predictions from the Gaussian prior without learning from training labels.

| Dataset | Sampler | PSRF | Mean ESS | Accuracy (%) | Prior accuracy (%) |
| --- | --- | --- | --- | --- | --- |
| Noisy XOR | MH | 1.2057 | 540 | 75.92 | 48.33 |
| Noisy XOR | HMC | 13.8689 | 25,448 | 74.75 | 48.33 |
| Noisy XOR | PP | 2.2885 | 4,083 | 87.58 | 48.33 |
| Pima | MH | 1.0007 | 93 | 79.31 | 51.69 |
| Pima | HMC | 1.0001 | 718 | 80.38 | 51.69 |
| Penguins | MH | 1.0229 | 217 | 100.00 | 36.45 |
| Penguins | HMC | 1.6082 | 3,127 | 100.00 | 36.45 |
| Hawks | MH | 1.0319 | 168 | 97.97 | 28.85 |
| Hawks | HMC | 1.4421 | 1,838 | 98.03 | 28.85 |

Only Pima reaches PSRF below 1.01, but it has the lowest ESS values. HMC's relatively large ESS on noisy XOR coexists with severe between-chain disagreement. This illustrates why a single diagnostic is insufficient (Section 4.3).

Trace plots show trapping and switching between approximately symmetric parameter regions. Noisy-XOR predictive heatmaps show two HMC realizations learning different regions; the displayed PP realization covers more of the ground-truth grid. Probability plots illustrate greater uncertainty near a decision boundary or for atypical observations, but do not constitute a calibration study (Sections 4.4-4.5).

The SGD comparison illustrates weight symmetries using 1,000 accepted solutions, each trained for 2,000 epochs and retained only when noisy-XOR test accuracy exceeds 85%. It visualizes parameter regions shared by optimization and sampling; the test-based selection prevents interpreting it as an unbiased predictive comparison.

For the hawk example, mean per-chain CPU runtimes are 42 minutes 54 seconds for MH and 1 hour 10 minutes 48 seconds for HMC. The paper identifies `eeyore`, `kanga`, and `bnn_mcmc_examples` as its sampling, diagnostic, and experiment implementations (Sections 4.6-4.7).

## Limitations

- Evidence is restricted to four small classification datasets and networks with 9-29 parameters. It does not establish scalability to modern deep architectures.
- Classification accuracy is not a distance to the exact posterior predictive. There is no demonstrated posterior recovery, predictive calibration, or general guarantee that nonconverged chains give useful uncertainty estimates.
- The prior-predictive baseline is weak; the experiments do not provide a broad comparison against variational inference or strong predictive ensembles.
- Hyperparameters are empirically tuned, and the PP setting uses equal temperatures. Differences in compute and sampler configuration limit algorithm rankings.
- Ten chain realizations on each reported split assess sampler variability, not variability across independently resampled train/test splits.
- Weight symmetries help explain why parameter and prediction behavior can differ, but incomplete exploration may also miss functionally different predictions, as the XOR heatmaps demonstrate.
- Future block Gibbs and output-space discrepancy methods are proposals, not evaluated contributions.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: parameter draws, convergence diagnostics, and predictive averaging.
- [[concepts/probability-calibration|Probability Calibration]]: a separate criterion needed to assess the reliability of predictive probabilities.

## Related Papers

- Titterington (2004), "Bayesian methods for neural networks and related models": cited review of Bayesian neural-network inference.
- Pourzanjani, Jiang, and Petzold (2017), "Improving the identifiability of neural networks for Bayesian inference": cited treatment of weight symmetries and identifiability.
- Wilson and Izmailov (2020), "Bayesian deep learning and a probabilistic perspective of generalization": cited motivation for interpreting ensembles through Bayesian marginalization.
- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: related library paper, not a citation in this source; separates predictive usefulness from full posterior fidelity and examines predictive disagreement across HMC chains.

[[index|Library home]]
