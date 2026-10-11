---
title: Do Bayesian Neural Networks Actually Behave Like Bayesian Models?
type: paper
authors:
  - Gábor Pituk
  - Vik Shirvaikar
  - Tom Rainforth
year: null
source_job_id: "7b40f32d-1a4e-44ae-a25e-bc3bb09830fc"
tags:
  - bayesian-neural-networks
  - approximate-inference
  - uncertainty-quantification
  - sequential-learning
---

## TL;DR

Popular approximate Bayesian neural network (BNN) algorithms can predict well while violating Bayesian belief-updating properties. Synthetic regression and CIFAR/IMDB experiments reveal restricted function diversity, forgetting under sequential updates, and predictive incoherence. Averaging models retrained on jointly sampled pseudo-labels sometimes improves prediction, but this improvement itself contradicts the invariance expected under exact Bayesian updating.

## Research Question

Do practical BNN inference algorithms preserve the function-space uncertainty, sequential coherence, and predictive self-consistency required for Bayesian interpretations beyond static prediction?

## Motivation

Accuracy and calibration of a Bayesian model average (BMA) do not establish that the underlying posterior supports coherent updates. Active learning acquisition functions rely on meaningful expected uncertainty reduction, while continual and transfer learning may use an approximate posterior as a new prior. These applications can fail when approximations do not preserve the information in earlier data (Sections 1 and 5).

## Contributions

- Compares posterior function draws and BALD information-gain scores, showing differences concealed by similar predictive means.
- Tests whether sequential approximate inference agrees with fitting all observations together, including an experiment measuring the relative influence of old and new data.
- Adapts martingale-posterior ideas into a finite, joint predictive-resampling diagnostic for large BNNs.
- Reports potential predictive benefits from ensembling retrained pseudo-label posteriors, with additional computational cost and mixed results across settings.

## Method

### Function-Space and Sequential Diagnostics

Synthetic regression compares mean-field variational inference (MFVI), diagonal Laplace approximation, SWAG, and Hamiltonian Monte Carlo (HMC). Networks have hidden widths 32-32-16 or 128-256-128-64 and normally model a Gaussian response with input-dependent mean and variance. Checks also use homoskedastic noise and random Fourier feature expansion. HMC uses four NUTS chains initialized at independently optimized solutions, retaining 150 samples per chain (Appendix G).

Exact Bayesian inference under the same model satisfies

$$
\pi(\theta\mid D_1,D_2)\propto p(D_2\mid\theta)\pi(\theta\mid D_1).
$$

The sequential test replaces the first posterior with its approximation, uses it as the next prior, and compares predictions against a single fit to the combined data. Classification experiments reuse the implementations and hyperparameters of Izmailov et al. (2021), using ResNet-20-FRN on CIFAR and CNN-LSTM on IMDB.

### Predictive Resampling

The [[concepts/bayesian-predictive-coherence|Bayesian Predictive Coherence]] diagnostic starts with an approximate posterior $q_D$. Each trial draws one parameter vector from $q_D$, jointly generates labels for an unlabeled input set using that shared vector, and retrains on the original labeled data plus the sampled labels. Averaging these retrained posteriors estimates the paper's finite empirical martingale-posterior construction. For exact inference, the corresponding identity is

$$
\mathbb E_{Y^*\sim p(\cdot\mid X^*,D)}
  [\pi(\theta\mid D,X^*,Y^*)]=\pi(\theta\mid D).
$$

The authors compare model-averaged predictions through accuracy, log-likelihood, and expected calibration error (ECE). CIFAR-10 uses labeled and unlabeled splits of 4,080 images each; IMDB uses 4,000 examples per split. MFVI uses 20 imputed labelings and 20 posterior samples per retrained model. SGLD uses 18 labelings from spaced checkpoints and 900 correlated samples per retrained posterior. Confidence intervals resample entire imputed-labeling groups (Section 6; Appendix E).

## Experiments

| Diagnostic | Reported finding | Evidence |
| --- | --- | --- |
| Function draws and BALD | HMC produces richer functions than the other approximations, but also misses some plausible qualitative behaviors. Laplace and SWAG can assign negligible information gain outside observed regions despite similar predictive means. | Figures 1-2 |
| Sequential regression | Five input-ordered groups produce forgetting under MFVI; later HMC inference does not repair information already poorly represented by an intermediate approximation. Laplace shows related failures. | Figure 3; Appendix J |
| Sequential classification | Two-step MFVI underperforms single-step MFVI in accuracy, log-likelihood, and ECE on CIFAR-10 and IMDB across six seeds, and CIFAR-100 across three seeds. Warm-started SGD provides a useful non-Bayesian comparison, but does not improve on CIFAR-100 as it does on the other tasks. | Figure 4; Figure 10 |
| Old versus new data | After fitting 50 observations centered at 0.5, a Laplace posterior used as an HMC prior shifts to a negative predictive mean after only 25 observations centered at -0.5. New data thus have disproportionate influence relative to the symmetric equal-weight benchmark. | Figure 5 |
| CIFAR-10 predictive resampling | Both MFVI and SGLD ensemble predictions differ from the initial BMA beyond the reported bootstrap intervals. Individual retrained posteriors underperform the initial BMA, while their ensemble improves prediction; confidence can fall enough to yield underconfidence. | Figures 7-8 |
| IMDB predictive resampling | MFVI shows similar gains. SGLD gains are inconclusive: comparable or slightly better accuracy does not translate into improved likelihood, although calibration remains incoherent. | Figure 9 |
| Tractable control | Bayesian linear regression with 20 random Fourier features supplies an analytic baseline. MFVI exhibits sequential coherence despite an imperfect posterior approximation. | Figures 12-13 |

The appendix also separates inference failures from modeling problems. In a spurious-correlation regression example, test MSE under a Laplace **prior** is 0.0046 for MAP and 0.1479 for HMC; under a Gaussian prior it is 0.9059 and 0.9045, respectively (Table 1). This is a prior-dependent covariate-shift result, not a comparison of Laplace posterior approximation against HMC.

## Limitations

- These are empirical failures of selected algorithms and configurations, not a theorem that all approximate BNNs are incoherent or that BNNs lack predictive value.
- HMC is an approximate reference with mixing concerns. The old-versus-new-data experiment cannot uniquely separate errors in the intermediate approximation from errors in subsequent HMC inference (Section 5.2).
- Synthetic MFVI uses a tempered objective, with KL weights 0.325 and 0.05 for the small and large networks. Laplace uses curvature shrinkage and a diagonal empirical-Fisher approximation. Results therefore concern these practical procedures, rather than ideal optimization or all covariance approximations.
- The predictive-resampling intervals quantify variation from resampling a finite set of imputed labelings. Correlated SGLD draws and limited trials constrain precision; matching a few predictive summaries would not establish equality of full posterior distributions.
- Ensembling requires repeated retraining and unlabeled inputs, although no additional observed labels. Gains are not universal, and improved accuracy can coexist with underconfidence or unimproved likelihood.
- A PCA-based sequential CIFAR-10 split yields inconclusive additional effects (Appendix F.2). The tractable linear control also shows that imperfect posterior representation need not destroy sequential coherence.
- The supplied Markdown does not identify this paper's publication year, venue, DOI, or arXiv identifier. Plot-only performance values are not reconstructed numerically.

## Related Concepts

- [[concepts/bayesian-predictive-coherence|Bayesian Predictive Coherence]]: invariance of average beliefs under self-generated observations.
- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: HMC and SGLD provide approximate samples whose predictive usefulness does not establish posterior fidelity.
- [[concepts/probability-calibration|Probability Calibration]]: static confidence calibration is distinct from coherence of updates.

## Related Papers

- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: cited evidence that full stochasticity need not improve predictive performance and that released HMC chains can disagree in predictive space.
- [[papers/challenges-in-markov-chain-monte-carlo-for-bayesian-neural-networks|Challenges in Markov Chain Monte Carlo for Bayesian Neural Networks]]: related library study of accurate prediction despite poor sampling diagnostics; not presented as a citation in this source.
- Izmailov et al. (2021), "What are Bayesian Neural Network posteriors really like?": supplies the classification experimental setup and a comparison centered on static predictive performance.
- Fong, Holmes, and Walker (2023), "Martingale posterior distributions": develops the predictive-resampling framework adapted here.
- Falck, Wang, and Holmes (2024), "Is in-context learning in large language models Bayesian? A martingale perspective": cited use of predictive diagnostics in a different model setting.

[[index|Library home]]
