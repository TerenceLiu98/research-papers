---
title: Do Bayesian Neural Networks Need To Be Fully Stochastic?
type: paper
authors:
  - Mrinank Sharma
  - Sebastian Farquhar
  - Eric Nalisnick
  - Tom Rainforth
year: null
source_job_id: "09134e2b-73e9-4cf4-8f10-c1d6cf20e4c5"
tags:
  - bayesian-neural-networks
  - approximate-inference
  - uncertainty-quantification
---

## TL;DR

Full parameter stochasticity is unnecessary for universal conditional prediction under the paper's architectural and continuity assumptions. Across four inference methods and eight datasets, selected partially stochastic networks match or outperform fully stochastic counterparts with lower memory costs. The best stochastic subset depends on the inference method; these findings do not establish that every partial configuration works or that it recovers the full Bayesian posterior predictive.

## Research Question

Must all neural-network parameters be stochastic to obtain expressive, useful predictive distributions, and does approximate Bayesian inference justify making full stochasticity the default?

## Motivation

Bayesian neural networks place priors over weights and biases, but posterior inference is generally intractable. Partial stochasticity is often treated as a computational compromise. The paper separates three possible justifications for full stochasticity: representational capacity, fidelity to Bayesian inference, and practical predictive performance. None automatically implies the others.

## Contributions

- Proves a sufficient construction for [[concepts/universal-conditional-distribution-approximation|Universal Conditional Distribution Approximation]] using a finite set of random variables, including architectures with only as many stochastic biases as output dimensions when the required continuous generator exists.
- Reanalyzes released full-batch Hamiltonian Monte Carlo (HMC) chains and finds substantial disagreement under corrupted inputs, suggesting incomplete exploration of the posterior predictive.
- Evaluates [[concepts/partially-stochastic-neural-networks|Partially Stochastic Neural Networks]] with HMC, mean-field variational inference (MFVI), Laplace approximation, and SWA-Gaussian (SWAG), finding no systematic predictive advantage for full stochasticity in the tested settings.

## Method

### Partial Stochasticity

Partition parameters into stochastic and deterministic subsets, $\Theta_S$ and $\Theta_D$. Predictions average over a learned distribution on $\Theta_S$ while holding $\Theta_D$ at point estimates:

$$
p_{\mathrm{subset}}(y\mid x,\mathcal D)
=\mathbb E_{q(\Theta_S)}[p(y\mid f_{\Theta_S,\widehat\Theta_D}(x))].
$$

Two-stage training first fits a maximum-a-posteriori (MAP) network, then performs inference over a selected subset with the remaining parameters fixed. The experiments use this for HMC, Laplace, and SWAG; the subset prior can differ from the initial MAP prior. Joint training instead learns deterministic parameters and a variational distribution together through a penalized evidence lower bound. These procedures target useful subset predictives in their own right, rather than necessarily approximating the fully stochastic predictive (Section 6).

### Expressivity

The noise outsourcing lemma represents conditional sampling through input-independent noise and a measurable generator. Theorem 1 additionally assumes a **continuous** generator, compact input domain, and a suitable network architecture. If a hidden representation preserves both input and noise and the downstream network is a universal function approximator, the network can approximate the generator uniformly over the input domain and any bounded noise region. The proposed architectures use $m\geq n$ Gaussian noise variables for an $n$-dimensional output; $m=n$ suffices when a continuous generator exists at that dimension. The noise distribution itself need not be learned (Section 4; Appendix A).

Gaussian stochastic last-layer regression generally fails this universality criterion because its linear output mapping remains Gaussian. Classification is treated separately: a deterministic network can approximate class probabilities, followed by a categorical draw. The theorem is an existence result, not a guarantee that training finds an appropriate predictor.

### Inference Fidelity Diagnostic

For each of three released ResNet-20-FRN HMC chains, the authors average class probabilities across samples and take the highest-probability class. They compare unanimous agreement across chains with agreement among bootstrapped resamples of the first chain. This probes prediction-level mixing, especially on CIFAR-10-C, rather than merely comparing parameter samples (Section 5; Appendix D.2).

## Experiments

| Setting | Comparison and reported result |
| --- | --- |
| HMC mixing on CIFAR-10 and CIFAR-10-C | Original chains agree on about 90% of clean test inputs but fewer than 60% under some corruptions; bootstrapped chains agree on more than 94% throughout. This suggests between-chain differences exceed finite-sample variation within the first chain. |
| Synthetic regression, HMC | Sampling only first-hidden-layer parameters captures in-between uncertainty similarly to full sampling and trains approximately 7 times faster in this example (Figure 1). |
| Synthetic regression, MFVI | Output-layer-only stochasticity gives more in-between uncertainty with approximately 200 times fewer stochastic parameters (Figure 3). |
| UCI Yacht, Boston, and Energy, HMC | Subsets select the largest absolute MAP parameters; predictions use 600 samples over 8 chains. Across 15 splits, gains from increasing stochasticity plateau on standard splits and can reverse on central-feature gap splits (Figure 4). |
| CIFAR-10/CIFAR-10-C, Laplace | WideResNet-16-4 with stochastic input and output layers slightly outperforms the fully stochastic KFAC variant with approximately 900 times fewer stochastic parameters; results span 10 seeds (Figure 5). |
| CIFAR-10/CIFAR-10-C, SWAG | Stochastic input layer plus first residual block outperforms the fully stochastic network, whose reported memory cost is 11 times higher. Other partial configurations do not consistently retain the advantage at high corruption severity; results span 10 seeds (Figure 6; Appendix D.7). |
| CIFAR-10/CIFAR-100, MFVI | WideResNet-28-10 partial variants outperform the fully stochastic baseline despite reusing its hyperparameters without separate tuning. Input-only stochasticity gives the highest reported accuracy; output layer plus last block gives the lowest NLL (Table 1). |

Selected MFVI results from Table 1, reported as mean plus/minus standard error across three seeds:

| Model | CIFAR-10 accuracy (%) | CIFAR-10 NLL | CIFAR-100 accuracy (%) | CIFAR-100 NLL |
| --- | --- | --- | --- | --- |
| Deterministic | 95.61 +/- 0.01 | 0.187 +/- 0.001 | 79.33 +/- 0.45 | 0.862 +/- 0.014 |
| Fully stochastic | 94.69 +/- 0.07 | 0.214 +/- 0.002 | 77.68 +/- 0.29 | 0.944 +/- 0.002 |
| Input layer stochastic | 95.70 +/- 0.08 | 0.187 +/- 0.002 | 79.49 +/- 0.15 | 0.861 +/- 0.021 |
| Output layer and last block stochastic | 95.59 +/- 0.08 | 0.168 +/- 0.0005 | 79.00 +/- 0.091 | 0.834 +/- 0.0007 |

Supplementary Laplace and SWAG results also assess expected calibration error: selected partial networks can be better calibrated, but calibration deteriorates as corruption grows (Appendices D.6-D.7).

## Limitations

- Universality requires the stated continuity, width, and information-preservation conditions. It does not imply universality for arbitrary subsets, successful optimization, calibrated uncertainty, or posterior recovery. The finite-width fully stochastic counterexample in Appendix D.1 imposes a minimum parameter standard deviation of 0.25; it is not a blanket impossibility result for all fully stochastic networks.
- The strongest partial configuration changes with inference method and metric. The supplement includes unsuccessful configurations, and no general subset-selection rule is established.
- Regression HMC uses tuned priors and, for UCI tasks, dataset-specific likelihood tempering. The toy HMC comparison also scales the subset prior variance. These are not comparisons that hold every modeling choice fixed while changing only parameter count.
- HMC chain disagreement is evidence of mixing concerns in the examined samples, not a measurement against a known exact posterior or a proof that accurate inference is impossible.
- Memory savings do not imply proportional runtime savings. Stochastic input layers still require repeated full forward passes, whereas stochastic output layers can reuse deterministic features (Appendix C).
- The supplied text has inconsistencies in experiment descriptions: the toy MFVI architecture differs between Section 6.1 and Appendix D.4, and Table 1 labels its uncertainty as standard error while Figure 15 says standard deviation. The table above follows Table 1.
- The supplied Markdown provides no publication year, venue, DOI, or arXiv identifier for this paper; these are not inferred from its bibliography.

## Related Concepts

- [[concepts/partially-stochastic-neural-networks|Partially Stochastic Neural Networks]]: separating stochastic parameter inference from deterministic estimation.
- [[concepts/universal-conditional-distribution-approximation|Universal Conditional Distribution Approximation]]: sufficient capacity for conditional sampling with limited randomness.
- [[concepts/probability-calibration|Probability Calibration]]: a predictive evaluation criterion distinct from expressivity and posterior fidelity.

## Related Papers

- Daxberger et al. (2021), "Bayesian deep learning via subnetwork inference": cited subset-inference approach; the present paper evaluates partial predictors as models in their own right.
- Izmailov et al. (2021), "What are Bayesian neural network posteriors really like?": source of the released HMC samples reanalyzed for mixing under corruption.
- Farquhar, Smith, and Gal (2020), "Liberty or depth: Deep bayesian neural nets do not need complex weight posterior approximations": related expressivity result discussed in Section 4.
- Foong et al. (2020), "On the expressiveness of approximate inference in bayesian neural networks": related analysis of predictive expressivity and approximate inference.
- Maddox et al. (2019), "A simple baseline for bayesian uncertainty in deep learning": cited SWAG method used in the comparisons.

[[index|Library home]]
