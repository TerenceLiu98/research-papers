---
title: Bayesian Symbolic Regression with Entropic Reinforcement Learning
type: paper
authors:
  - Oussama Boussif
  - Mohammed Mahfoud
  - Younesse Kaddar
  - Moksh Jain
  - Sida Li
  - Damiano Fornasiere
  - Xiaoyin Chen
  - Yoshua Bengio
  - Esmeralda S. Whitammer
year: null
source_job_id: "6dbc1b7c-671e-4055-9d18-1a9217978ce4"
tags:
  - symbolic-regression
  - bayesian-inference
  - reinforcement-learning
  - gflownets
---

## TL;DR

ERRLESS learns a policy that constructs algebraic expressions and samples their constants and observation noise, targeting a Bayesian posterior through entropy-regularized reinforcement learning. It reports a Feynman prediction AUC of 0.924 with concise expressions. On seven small synthetic problems, posterior predictive means are more stable than those of PySIPS, but PySIPS has better likelihood scores on every problem. These predictive comparisons do not establish exact posterior recovery.

## Research Question

Can a neural policy learn to sample jointly over expression structures, constants, and noise, avoiding per-candidate constant optimization while retaining useful uncertainty about the underlying formula?

## Motivation

Small, noisy scientific datasets can support several plausible formulas. Selecting one best-fitting expression conceals this structural uncertainty. [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]] combines explicit priors with a likelihood, but Monte Carlo approaches can require expensive exploration using handcrafted proposals. ERRLESS moves this sampling work into a learned policy.

## Contributions

- Introduces bottom-up expression construction with arity, length, redundancy, and optional physical-unit constraints.
- Uses [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]] to learn a joint distribution over discrete structures and continuous parameters.
- Evaluates predictive fit, expression complexity, posterior predictive behavior, and design choices on synthetic, Feynman, and Blackbox benchmarks.

## Method

### Posterior Target and Training

For tree $T$, constant vector $\theta$, noise standard deviation $\sigma$, and observations $\mathcal D$, the model assumes independent Gaussian errors:

$$
p(T,\theta,\sigma\mid\mathcal D)\propto
P(T)p(\theta,\sigma\mid T)
\prod_i\mathcal N(y_i;f_{T,\theta}(x_i),\sigma^2).
$$

Writing the log of this unnormalized target as $R$, maximizing $\mathbb E_{\pi_\varphi}[R]+\mathcal H[\pi_\varphi]$ minimizes $D_{\mathrm{KL}}(\pi_\varphi\Vert p)$. Exact posterior sampling requires attaining the appropriate optimum with a sufficiently expressive policy. The implemented trajectory-balance loss is

$$
\mathcal L_{\mathrm{TB}}=
\left[\log Z_\varphi+\log\pi_\varphi(T,\theta,\sigma)-R(T,\theta,\sigma)\right]^2.
$$

Here $\log Z_\varphi$ is learned alongside the policy. With a normalized prior and the stated likelihood, its target is the log evidence. The paper uses gradient clipping analogous to a Huber loss for stability (Sections 3.2-3.3).

### Construction and Architecture

Expressions are generated in postorder, or reverse Polish notation. Operands precede their operators, allowing local checks of arity and physical units; termination is permitted only for a complete tree. Constants are dimensionless. Restrictions exclude inverse compositions, nested trigonometric functions, nested exponentials, and unary operators applied directly to constants.

A two-layer Transformer with hidden dimension 256 and four attention heads predicts next-token logits. After termination, five-component Gaussian and log-normal mixtures sample constants and noise, respectively. The tree prior uses token frequencies drawn from a physics-equation corpus. Appendix A.2 specifies constant-prior standard deviations of 10 for synthetic tasks and 20 for Feynman/Blackbox; noise priors are log-normal for synthetic tasks and half-normal with scale 2000 otherwise.

Training uses epsilon-greedy exploration, a 10,000-trajectory prioritized replay buffer allowing at most three entries per tree, and 1,250 iterations with batches of 800. The replay fraction decreases from 0.9 to 0.2. Sampling is amortized across repeated draws for a fixed dataset; transfer to a new dataset without retraining remains future work.

## Experiments

### Protocol

- **Synthetic:** Seven expressions, 20 training points and 100 test points, with broader test domains; maximum nine nodes and three constants. The posterior comparison uses noise level 0.1, ten seeds, and up to 1,000 posterior draws.
- **Feynman:** 116 expressions after excluding four requiring arcsin/arccos; 10,000 training and 25,000 test points per expression, five seeds, and training-target noise levels 0.001, 0.01, and 0.1. Limits are 32 nodes and three constants.
- **Blackbox:** A curated subset of 12 PMLB datasets. The stated search budget is one million reward evaluations.

The prediction AUC integrates the fraction of datasets whose median test $R^2$ exceeds a threshold over thresholds from zero to one. It is not a classification ROC AUC.

### Reported Results

| Setting | ERRLESS | Comparisons and interpretation |
| --- | ---: | --- |
| Feynman AUC | 0.924 | DSR 0.873, PhySO 0.893, BSR 0.702; leading methods including GP-GOMEA and Operon still outperform ERRLESS in fit. |
| Blackbox AUC | 0.350 | BSR 0.19, AIFeynman 0.004, XGBoost 0.625. |

Table 1 reports higher median posterior-mean $R^2$ for ERRLESS than PySIPS on all seven synthetic expressions. However, ERRLESS itself has negative posterior-mean $R^2$ on five of seven. For $2.37x+3.02$, the scores are 0.760 versus 0.349; for $x+\sin(5.5x)$, they are -2.230 versus approximately $-2.8\times10^{38}$. PySIPS attains lower NLL on all seven and higher single-expression test $R^2$ on six. Its extreme posterior-mean failures arise from extrapolating samples that dominate the average; only two of ten runs yield finite posterior-mean predictions for $\sqrt{x^2+y^2}$.

NLL uses a uniformly weighted pointwise Gaussian mixture, discarding non-finite predictions. ERRLESS supplies sampled noise values; PySIPS uses each particle's training residual RMSE. Figure 3 instead illustrates a single run with importance-weighted ERRLESS summaries, so it should not be read as the aggregate Table 1 result.

Appendix D finds no clear AUC advantage of trajectory balance over detailed balance, although trajectory balance produces shorter expressions. At noise 0.1, the nodes prior reaches AUC 0.895076 versus 0.778414 for the chosen unigram prior. Fixed replay fractions also outperform annealing in the reported noise-0.01 sensitivity experiment. These ablations do not support uniform superiority of all default settings.

## Limitations

- Finite-budget predictive performance does not demonstrate calibrated uncertainty or convergence to the full posterior. Complex expressions and sharply concentrated likelihoods remain difficult.
- Length, unit, and redundancy constraints restrict posterior support. A concise approximation may be preferred to the generating formula; the paper gives a case with test $R^2=0.99$ for a leading-order approximation.
- The learned sampler requires retraining for each dataset, unlike inference networks that amortize across observations or datasets.
- The reported order-of-magnitude runtime advantage over most learning-based competitors uses ERRLESS on an L40S GPU with four CPUs and 48 GB RAM, but takes baseline times from SRBench. PhySO runtime is absent. This is not a controlled hardware-matched comparison.
- The supplied Markdown has damaged mathematical glyphs and inconsistent reward/log-reward wording in parts of the appendix. The equations above follow the explicit main-text posterior and trajectory-balance definitions. No publication year, venue, DOI, or identifier for this paper is supplied; the year is left unknown and author names follow the supplied text.

## Related Concepts

- [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]]: posterior uncertainty over formulas and numerical parameters.
- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]: learning a sampler from an unnormalized target density.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: related sharing of inference computation, with a different amortization scope from ERRLESS's per-dataset training.

## Related Papers

- Jin et al. (2019), "Bayesian symbolic regression": cited reversible-jump MCMC approach.
- Bomarito and Leser (2026), "Bayesian symbolic regression via posterior sampling": cited SMC approach underlying PySIPS.
- Li, Marinescu, and Musslick (2023), "GFN-SR: Symbolic regression with generative flow networks": cited trajectory-balance predecessor.
- Malkin et al. (2022), "Trajectory balance: Improved credit assignment in GFlowNets": cited training-objective foundation.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: library comparison for learned approximate Bayesian inference; it amortizes ability inference across respondents. This connection is not a citation in ERRLESS.

[[index|Library home]]
