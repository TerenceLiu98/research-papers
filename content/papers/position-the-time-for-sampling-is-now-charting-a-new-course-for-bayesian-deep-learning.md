---
title: "Position: The Time for Sampling Is Now! Charting a New Course for Bayesian Deep Learning"
type: paper
authors:
  - Emanuel Sommer
  - David Rügamer
year: null
source_job_id: "55498ac1-964e-4f05-b43b-3247a90fa257"
tags:
  - bayesian-neural-networks
  - posterior-sampling
  - uncertainty-quantification
  - posterior-distillation
---

## TL;DR

This position paper argues that recent sampling methods make Bayesian neural-network inference practical for a useful range of modern models. Its proposed research agenda couples parallel, optimization-initialized posterior exploration with storage, distillation, and serving of posterior samples. Evidence comprises a small runtime illustration and selected results from prior studies; it does not establish universal computational parity, posterior convergence, or a completed distillation solution.

## Research Question

What methodological and infrastructure changes would make sampling-based Bayesian deep learning accessible from training through deployment, and which perceived barriers still warrant research?

## Motivation

Optimization-based posterior approximations are familiar and convenient but can impose restrictive distributional structure. Sampling offers more flexible approximations, yet generating weights is only part of the cost: prediction requires evaluating many network instances, and storing, diagnosing, and reusing those instances remains difficult. The authors argue that research should address this complete workflow rather than assess feasibility solely through sampling runtime.

## Contributions

- Reassesses objections involving runtime, scale, simple Gaussian priors, Metropolis-Hastings correction, and interactions among likelihoods, augmentation, tempering, and sampler noise (Section 3).
- Advocates parallel chains initialized through optimization, empirical SG-MCMC tuning guidance, and evaluation on modern models of manageable scale (Section 4).
- Prioritizes [[concepts/posterior-sample-distillation|Posterior Sample Distillation]], task-sensitive aggregation, sample-sharing benchmarks, and deployment tooling (Section 5).
- Discusses practical convergence limits and sampling selected parameters or adapters in foundation models, while acknowledging uncertain benefits for open-ended generation (Section 6).

## Method

### Sampling and Prediction

With an explicit differentiable likelihood and prior, [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]] targets

$$
p(\theta\mid\mathcal D)\propto p(\mathcal D\mid\theta)p(\theta).
$$

Given representative posterior draws, prediction uses a Monte Carlo model average:

$$
p(y^*\mid x^*,\mathcal D)\approx\frac{1}{S}\sum_{s=1}^{S}p(y^*\mid x^*,\theta^{(s)}).
$$

The paper distinguishes this setting from simulation-based, likelihood-free inference (Appendix B). Finite-budget sampling remains approximate; avoiding a fixed variational family does not guarantee that chains explore the posterior adequately.

### Proposed Workflow

1. Use independent optimization runs to initialize parallel chains near useful posterior regions. Deep ensembles provide starting points, not generally posterior draws in themselves.
2. Sample locally with scalable methods, including stochastic-gradient MCMC. Share configuration guidance and failure cases for step size, batch size, and noise settings.
3. Retain most or all samples when storage is feasible, preferably through asynchronous disk writes. The authors allow online approaches for extremely large models.
4. Compress, select, reweight, or otherwise summarize samples for the intended prediction task. Mean prediction, calibration, and tail estimation may require different retained information.
5. Develop serving tools, sample repositories, and BNN-specific diagnostics. Neither parameter-space non-identifiability nor agreement in function space makes conventional convergence checks straightforward.

The authors argue that initialization and finite-sample errors can outweigh discretization bias at suitably small step sizes. This is a practical trade-off supporting some unadjusted samplers, not a general guarantee that Metropolis-Hastings correction is unnecessary.

## Experiments

### Runtime Illustration

Figure 2 and Appendix A extend the UCI airfoil setup of Kobialka et al. (2026), using an MLP with three hidden layers of 16 neurons and a 10-core CPU. Comparisons include mean-field variational inference, Laplace approximation, 10- and 35-member deep ensembles, and Bayesian deep ensembles with 1 or 10 chains and 1,000 samples per chain. Error bars are standard errors over three seeds. The caption reports that matching one chain's predictive performance requires 35 deep-ensemble members, with longer runtime despite parallelization. Exact plotted runtimes and LPPD values are not tabulated in the supplied Markdown.

### Selected Results from Prior Studies

Table 1 summarizes different studies and settings; these are not a single controlled benchmark run by this paper. LPPD, accuracy, and AUROC are higher-is-better; NLL, adaptive calibration error (ACE), and loss are lower-is-better.

| Setting and cited study | Scale | Baseline | Sampling result |
| --- | --- | --- | --- |
| CIFAR-10, ResNet-18; Sommer et al. (2026a) | 11.2M parameters | DE: LPPD -0.30, accuracy 0.90 | pSMILE: LPPD -0.26, accuracy 0.91 |
| Imagenette, vision transformer; Sommer et al. (2026a) | 22M parameters | DE: LPPD -0.99, accuracy 0.77 | pSMILE: LPPD -0.77, accuracy 0.77 |
| CIFAR-10, wide CNN; Paulin et al. (2025) | 73M parameters | SWA: NLL 0.56, ACE 0.014 | SMS-UBU: NLL 0.31, ACE 0.005 |
| Llama 3 fine-tuning; Duffield et al. (2025) | 218M parameters within an 8B model | SGD: OOD AUROC 0.80, English loss 4.20 | SGHMC: OOD AUROC 0.95, English loss 4.40 |

The LLM example improves OOD detection but worsens English loss, and the vision-transformer example ties accuracy. These qualify the paper's broad superiority language.

Figure 3 illustrates prediction cost by counting forward passes across published sampled BNNs. Its parallel bars divide counts by 10 to represent 10 CPU cores; they are not measured deployment latencies. Section 5 reports illustrative costs up to 1,000 times those of vanilla networks or fully linearized approaches, excluding extra memory-access and I/O costs.

## Limitations

- This is a position and synthesis paper, not a new sampler, convergence theorem, or validated implementation of the full proposed workflow. The distillation and tooling agenda remains prospective.
- The runtime experiment uses a small MLP, one regression dataset, and three seeds. Selected cross-study metrics do not establish equal-budget superiority across architectures or tasks.
- Realistic computational budgets cannot guarantee posterior convergence in high-dimensional BNNs. Parallel warm starts, local sampling, and predictive performance do not prove correct posterior mode coverage or weighting.
- SG-MCMC configuration remains sensitive, and claims about discretization bias depend on the regime and tuning. Prior, likelihood, augmentation, and noise choices interact.
- Storage and prediction costs can remain substantial. The paper's primary scope is feasible mid-to-large models and parameter subsets, rather than demonstrated full sampling of frontier foundation models.
- Epistemic uncertainty is distinct from semantic variability in generated text. The practical benefit of Bayesian treatment for open-ended LLM generation remains unresolved.
- The supplied Markdown does not identify this paper's publication year, venue, DOI, or arXiv ID. These are not inferred from the dates or identifiers in its references.

## Related Concepts

- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: posterior exploration and Monte Carlo prediction.
- [[concepts/posterior-sample-distillation|Posterior Sample Distillation]]: reducing storage and prediction costs after sampling.
- [[concepts/partially-stochastic-neural-networks|Partially Stochastic Neural Networks]]: restricting inference to a selected subnetwork or adapter.
- [[concepts/probability-calibration|Probability Calibration]]: a predictive criterion separate from accuracy, ranking, and posterior fidelity.

## Related Papers

- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: a related library paper, not a citation in the supplied text; studies selected stochastic subsets and diagnoses incomplete HMC mixing. It complements the present paper's subset-inference discussion while reinforcing the distinction between useful predictions and posterior fidelity.
- Sommer et al. (2025), "Microcanonical Langevin Ensembles: Advancing the Sampling of Bayesian Neural Networks": cited support for optimization-initialized sampling.
- Paulin et al. (2025), "Sampling from bayesian neural network posteriors with symmetric minibatch splitting langevin dynamics": source of the 73M-parameter example in Table 1.
- Duffield et al. (2025), "Scalable bayesian learning with posteriors": cited tooling and LLM fine-tuning evidence.
- Park et al. (2025), "Ensemble distribution distillation via flow matching": cited example of learned weight-space surrogates.

[[index|Library home]]
