---
title: "Your Classifier is Secretly an Energy Based Model and You Should Treat It Like One"
type: paper
authors:
  - Will Grathwohl
  - Kuan-Chieh Wang
  - Jörn-Henrik Jacobsen
  - David Duvenaud
  - Kevin Swersky
  - Mohammad Norouzi
year: 2020
source_job_id: "5b3b84b8-fcea-4479-b89e-fc2893215573"
tags:
  - energy-based-models
  - generative-classification
  - calibration
---

## TL;DR

JEM reinterprets classifier logits as a joint energy model of inputs and labels. Training the input density alongside cross-entropy enables image generation and improves calibration and some robustness measures, while preserving competitive classification. On CIFAR10, it reports 92.9% accuracy, Inception Score 8.76, and FID 38.4; sampling bias, training instability, and evaluation protocol matter substantially.

## Research Question

Can a standard classifier jointly model inputs and labels and obtain practical benefits from generative training without replacing its architecture with a specialized generator?

## Motivation

Hybrid generative models often sacrifice classification performance because their architectures are constrained by density estimation. Classifier logits already contain an input-dependent common offset that softmax discards. Modeling this degree of freedom provides an input density while keeping ordinary softmax predictions.

## Contributions

- Defines a joint energy model with one shared partition function, preserving exact conditional class probabilities.
- Combines cross-entropy with approximate maximum-likelihood input-density training.
- Evaluates hybrid generation and classification, calibration, out-of-distribution detection, and adversarial robustness using one model.

## Method

For logits $f_\theta(x)[y]$, define

$$
p_\theta(x,y)=\frac{\exp f_\theta(x)[y]}{Z(\theta)},\qquad
E_\theta(x)=-\log\sum_y\exp f_\theta(x)[y].
$$

Marginalizing labels yields $p_\theta(x)$; dividing the joint by this marginal cancels the partition function and recovers softmax. Training maximizes $\log p_\theta(y\mid x)+\log p_\theta(x)$. The conditional term is exact; the marginal term uses a biased finite-chain estimate of the energy-model likelihood gradient.

Persistent contrastive divergence maintains a 10,000-sample replay buffer, normally evolves chains for 20 Langevin steps, and reinitializes them with probability 0.05. The WideResNet-28-10 architecture omits batch normalization. Appendix A uses Adam for 150 epochs. The practical sampler independently selects gradient step size and noise, rather than following the asymptotically valid Langevin schedule.

For OOD detection, JEM supplies input log-density up to a constant, maximum class probability, and the heuristic score $-\|\nabla_x\log p_\theta(x)\|_2$, called approximate mass. This last quantity is a gradient-based heuristic, not an estimate of integrated probability mass. At inference, a few sampling steps seeded at the input can refine it before classification.

## Experiments

Table 1 reports the following CIFAR10 results (higher accuracy and IS, lower FID are preferable):

| Model | Accuracy (%) | IS | FID |
| --- | ---: | ---: | ---: |
| JEM | 92.9 | 8.76 | 38.4 |
| Residual Flow | 70.3 | 3.6 | 46.4 |
| IGEBM | 49.1 | 8.3 | 37.9 |
| JEM with class-conditional factorization | 30.1 | 6.36 | 61.8 |
| Discriminative WideResNet | 95.8 | — | — |
| SNGAN | — | 8.59 | 25.5 |

JEM reaches 96.7% on SVHN and 72.2% on CIFAR100. The matched CIFAR100 discriminative baseline reaches 74.2%, but JEM is reported to be much better calibrated with 20-bin expected calibration error. The reduced-label experiment improves calibration without improving generalization.

Appendix B qualifies the headline IS: the conditional score uses the top 10% of samples by predictive confidence and pools five replay buffers from late training. Unconditional single-buffer IS is 7.82. Implementations also change IS and FID values, limiting direct cross-paper comparisons.

OOD performance depends on both dataset and score. On CIFAR100 as OOD for CIFAR10, JEM obtains AUROC 0.67 with density, 0.87 with predictive confidence, and 0.82 with the gradient score. Baseline predictive confidence obtains 0.85. On SVHN, baseline confidence reaches 0.93 versus JEM's 0.89; improvements are not universal.

Robustness experiments use PGD, boundary, and pointwise attacks on 300 shared randomly selected inputs. PGD uses 20 restarts and 40 iterations; stochastic refinement is attacked using expectation over transformations, with five samples in the main results. Refinement improves reported robustness, but specialized robust baselines remain stronger at many perturbation budgets.

## Limitations

Normalized likelihoods are intractable, and visual samples only assess the approximate sampler. Persistent chains reduce computation relative to short-run chains but are less stable: models regularly diverged and required checkpoint restarts, reduced learning rates, or additional sampling steps. Appendix H reports class-dependent chain-age artifacts. Twenty sampling steps per update remain substantial overhead compared with ordinary classification. Calibration, OOD, and robustness gains are empirical and task-dependent; neither the density interpretation nor refinement establishes a robustness guarantee.

## Related Concepts

- [[concepts/joint-energy-based-models|Joint Energy-Based Models]]: one partition function couples input density and label prediction.
- [[concepts/generative-classification|Generative Classification]]: derives predictions from a joint generative model while retaining softmax inference.
- [[concepts/probability-calibration|Probability Calibration]]: distinguishes confidence reliability from accuracy.

## Related Papers

- [[papers/your-diffusion-model-is-secretly-a-zero-shot-classifier|Your Diffusion Model is Secretly a Zero-Shot Classifier]] explores the complementary direction: deriving a classifier from a conditional diffusion generator.
- Du and Mordatch (2019), “Implicit Generation and Generalization in Energy-Based Models”: supplies the persistent sampling foundation and IGEBM comparison.
- Xie et al. (2016), “A Theory of Generative ConvNet”: earlier classifier-to-energy connection using class-conditional models.

[[index|Library home]]
