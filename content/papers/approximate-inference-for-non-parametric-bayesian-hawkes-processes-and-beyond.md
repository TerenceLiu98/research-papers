---
title: "Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond"
type: paper
authors:
  - Rui Zhang
year: 2022
venue: "PhD thesis, The Australian National University"
source_job_id: "6f1ca6fa-6fe4-4814-a9e5-e281bf0aba85"
tags:
  - hawkes-processes
  - bayesian-inference
  - gaussian-processes
  - optimal-transport
  - instrumental-variables
---

## TL;DR

This thesis develops two approximate inference methods for continuous, non-parametric Bayesian Hawkes triggering kernels, then studies Wasserstein-based Gaussian-process inference and kernel-based instrumental-variable estimation. Branching structures and restricted candidate parents make the Hawkes methods linear in event count under fixed model-size and neighborhood assumptions. Quantile propagation gives small predictive log-likelihood improvements over expectation propagation, while maximum moment restriction converts nonlinear IV estimation into a single empirical-risk objective. The latter two methods are evaluated beyond Hawkes processes; applying them to Hawkes inference remains future work.

## Research Question

Can Hawkes triggering kernels be learned flexibly, with uncertainty estimates and scalable computation, without choosing a fixed parametric shape or discretizing the event domain? More broadly, can alternative approximation criteria and kernel moment restrictions improve probabilistic inference and nonlinear estimation? Chapters 3-4 address the Hawkes questions directly; Chapters 5-6 develop separate, more general methods.

## Motivation

Parametric triggering kernels can miss the temporal shape of self-excitation. Flexible frequentist estimators may depend strongly on discretization or tuning and do not directly provide posterior uncertainty. Bayesian alternatives face expensive event-pair calculations and non-conjugate likelihoods. The thesis uses Gaussian-process priors and latent event ancestry to simplify this inference, then examines the limitations of KL-based Gaussian approximations and the complexity of two-stage or adversarial IV estimators.

## Contributions

- **Laplace Bayesian Hawkes inference (Chapter 3):** Gibbs-Hawkes alternates branching assignments, background intensity, and a GP-modulated triggering kernel; EM-Hawkes uses multiple sampled branching structures and approximate MAP updates.
- **Variational Bayesian Hawkes process, VBHP (Chapter 4):** A squared sparse GP models the triggering kernel. An EM-like variational algorithm optimizes a common ELBO, while the proposed tighter ELBO, TELBO, selects hyperparameters and triggering support.
- **Quantile propagation, QP (Chapter 5):** Replaces EP's local forward-KL Gaussian projection with a squared 2-Wasserstein projection, derives quantile-based updates, and establishes a locality result for GP models with factorized likelihoods.
- **Maximum moment restriction for IV regression, MMR-IV (Chapter 6):** Expresses conditional-moment estimation as kernel-weighted empirical risk, supplies neural-network and RKHS implementations, and develops consistency and asymptotic-normality results under stated regularity and identification assumptions.

## Method

### Branching-Based Hawkes Inference

For ordered event times, the model has conditional intensity

$$
\lambda(t)=\mu+\sum_{t_i<t}\phi(t-t_i).
$$

A latent parent assignment identifies each event as an immigrant or the offspring of an earlier event. Conditional on these assignments, inference separates into a background Poisson process and offspring Poisson processes sharing a triggering kernel. Chapter 3 uses $\phi=f^2/2$ with a GP prior represented by a truncated eigenfunction expansion, a Laplace approximation for its coefficients, and Gamma updates for the background intensity. Its Gibbs sampler therefore retains approximation error. EM-Hawkes approximates the expectation over branching structures with finitely many samples and uses pointwise kernel modes because joint mode-finding is intractable.

Chapter 4 uses $\phi=f^2$, Gaussian inducing variables $u$, and the variational factorization

$$
q(B,\mu,f,u)=q(B)q(\mu)p(f\mid u)q(u).
$$

The common ELBO, CELBO, updates variational distributions. The thesis proposes TELBO by omitting the two subtracted KL terms for $\mu$ and $u$ and uses it for model selection, not posterior optimization (Sections 4.3-4.3.1). VBHP precomputes candidate parent pairs within a compact triggering region. Its reported per-iteration cost is $O(CM^3N)$ for $N$ events, $M$ inducing points, and at most $C$ relevant neighbors. Chapter 3 reports $O((N+K)K^2)$ with $K$ basis functions and its accelerated parent calculations.

### Quantile Propagation

QP forms an EP-style cavity distribution by removing a Gaussian site, then multiplies the cavity by the exact likelihood factor to form a tilted distribution. It projects this distribution onto a Gaussian using

$$
W_2^2(P,Q)=\int_0^1\left(F_P^{-1}(v)-F_Q^{-1}(v)\right)^2\,dv.
$$

The projected mean equals the tilted mean, as in EP; the standard deviation comes from matching quantile functions (Equation 5.1). For the **same tilted distribution**, the projected variance is no larger than EP's. The locality result permits univariate site updates while retaining a coupled Gaussian posterior. Data-independent lookup tables accelerate numerical integration; outside their parameter range, the implementation falls back to EP variance updates (Appendix C.10).

### Kernel Maximum Moment Restriction

For $Y=f(X)+\varepsilon$ and a valid instrument $Z$, the identifying moment is $\mathbb E[Y-f(X)\mid Z]=0$. MMR-IV maximizes the squared residual moment over a unit ball in an RKHS:

$$
R_k(f)=\sup_{\|h\|_{\mathcal H_k}\leq1}
\left(\mathbb E[(Y-f(X))h(Z)]\right)^2
=\mathbb E[(Y-f(X))(Y'-f(X'))k(Z,Z')],
$$

where primed variables are an independent copy. With an integrally strictly positive definite kernel and the required integrability conditions, zero risk characterizes the conditional moment restriction; uniqueness additionally needs identification, such as completeness. The practical objective uses a V-statistic,

$$
\widehat R_V(f)=n^{-2}(y-f(x))^\top K_z(y-f(x)),
$$

plus regularization. It supports direct neural-network optimization or an RKHS solution, with a Nystrom approximation and an analytical leave-$M$-out selection criterion derived through a GP interpretation. The unbiased U-statistic alternative has an indefinite weight matrix and is not the practical estimator evaluated here.

## Experiments

### Hawkes Kernel Estimation

Chapter 3 compares exponential, ODE, and Wiener-Hopf baselines against Gibbs-Hawkes and EM-Hawkes. On the synthetic cosine process, average relative kernel/background $L_2$ errors are 0.208 and 0.219 for Gibbs and EM, versus 0.365 for the exponential baseline. On exponential data, the correctly specified exponential baseline wins: 0.103 versus 0.125 and 0.172 (Table 3.2).

The Twitter sources are ACTIVE, containing about 41,000 cascades, and SEISMIC, containing about 166,000. Chapter 3 bundles 30 similarly sized cascades, scales time to $[0,\pi]$, and sets background intensity to zero. Per-event test log likelihoods are 2.580/2.592 for Gibbs/EM on ACTIVE and 3.576/3.578 on SEISMIC, exceeding the three baselines (Table 3.2). Differences in learned decay rates across content categories are interpreted as attention longevity, without a causal test.

Chapter 4 instead fits individual sequences and randomly assigns events to training or test sequences. Its Table 4.2 is therefore a separate evaluation, not directly comparable to Chapter 3:

| Dataset | SumExp | Gibbs Hawkes | VBHP (CELBO) | VBHP (TELBO) |
| --- | ---: | ---: | ---: | ---: |
| ACTIVE | 1.692 | 1.323 | 1.824 | 1.867 |
| SEISMIC | 2.943 | 3.110 | 3.143 | 3.164 |

Entries are mean normalized held-out log likelihood; higher is better. TELBO improves HLL in all five synthetic/real settings in that table, but does not win every kernel or background $L_2$ comparison. VBHP is roughly two orders of magnitude slower per iteration than Gibbs in the reported implementation, yet converges in 10-20 iterations: average convergence time for a 1,000-event sequence is 549 seconds versus 699 seconds for Gibbs (Section 4.5.5).

### Gaussian-Process Inference

Chapter 5 evaluates seven classification datasets, with Wine split into three pairwise tasks, using 100 repetitions of ten-fold cross-validation. QP and EP have almost identical test errors. Mean negative test log likelihood improves modestly, for example from 0.4247 to 0.4240 on Pima and from 0.0295 to 0.0290 on Glass (Table 5.1, converted from its $10^{-3}$ units). On coal-mining Poisson regression with 200 random event splits, NTLL is 1.6065 for QP versus 1.6068 for EP. VB usually has worse log scores, although it has lower classification error on Cancer and Wine3.

### Instrumental-Variable Regression

At $n=2{,}000$, MMR-IV (Nystrom) obtains MSE 0.011, 0.001, 0.006, and 0.020 for absolute-value, linear, sine, and step structural functions. Linear 2SLS and Poly2SLS are better on the linear case (Table 6.1). For MNIST-valued treatments/instruments, MMR-IV (NN) scores 0.024, 0.124, and 0.130 on MNIST-Z, MNIST-X, and MNIST-XZ; the Nystrom version scores 0.015, 0.442, and 0.425 and struggles when the treatment is an image (Table 6.2). Mendelian-randomization simulations vary instrument count and confounding strength.

An application uses 2,571 participants in a ten-year vitamin-D study, controlling age and treating filaggrin mutation as an instrument. The thesis compares fitted nonlinear surfaces; it reports that the earlier 2SLS analysis had a nonsignificant coefficient ($p=0.13$). These comparisons do not establish a statistically significant mortality effect for the proposed method. Appendix D.5.6 further clarifies that the controlled-variable formulation estimates $f(X,C)+\mathbb E[\varepsilon\mid C]$.

## Limitations

- **Conditional scalability:** Finite triggering support does not alone bound the number of nearby events. Linear-in-$N$ claims require the stated neighborhood bound and fixed basis/inducing-point counts; model selection and iteration counts add cost. MMR-IV has separate scaling, with the Nystrom algorithm reported as $O(nm^2+n^2)$.
- **Approximation and scope:** Laplace approximation, variational independence, support truncation, and pointwise kernel modes introduce approximation. Chapter 3 explicitly leaves marked multivariate extensions open. Random event splits in Chapter 4 evaluate held-out fit rather than chronological forecasting.
- **QP guarantees:** The variance comparison assumes a shared cavity, not separately converged EP and QP fixed points. Global convergence is not guaranteed. Hyperparameters still optimize EP's approximate evidence, and lookup tables consume memory and can be unstable; Poisson regression results are not Poisson-process or Hawkes-process results.
- **IV identification and tuning:** Kernel moment minimization does not establish instrument validity or completeness. Kernel choice remains open; baseline comparisons are sensitive to hyperparameter selection, and reported runtime comparisons exclude parameter selection (Figure 6.1). The infinite-dimensional normality result centers on a regularized population target with positive limiting regularization, not automatically the unregularized structural function.
- **Evidence provenance:** The source is a 2022 thesis compiling distinct studies. Its included-paper identifiers belong to those studies, not to the thesis. The supplied Markdown contains damaged mathematical notation; this summary preserves clear definitions and reported results without reproducing ambiguous proof expressions.

## Related Concepts

- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]
- [[concepts/quantile-propagation|Quantile Propagation]]
- [[concepts/kernel-maximum-moment-restriction|Kernel Maximum Moment Restriction]]
- [[concepts/optimal-transport|Optimal Transport]]: The distributional geometry underlying QP's local projections.

## Related Papers

The thesis identifies the following component studies in its Publications and Software section:

- Zhang, Walder, Rizoiu, and Xie (2019), "Efficient non-parametric Bayesian Hawkes processes," IJCAI 2019, [arXiv:1810.03730](https://arxiv.org/abs/1810.03730). Chapter 3.
- Zhang, Walder, and Rizoiu (2020), "Variational inference for sparse Gaussian process modulated Hawkes process," AAAI 2020, [arXiv:1905.10496](https://arxiv.org/abs/1905.10496). Chapter 4.
- Zhang, Walder, Bonilla, Rizoiu, and Xie (2020), "Quantile propagation for Wasserstein-approximate Gaussian processes," NeurIPS 33, 21566-21578. Chapter 5.
- Zhang, Imaizumi, Scholkopf, and Muandet (listed as 2021 in the thesis), "Maximum moment restriction for instrumental variable regression," [arXiv:2010.07684](https://arxiv.org/abs/2010.07684). Chapter 6; described as a submitted preprint in this source.

The separately listed work on instrument-space selection is explicitly excluded from the thesis. A methodological comparison elsewhere in the library is [[papers/fast-unsupervised-ground-metric-learning-with-tree-wasserstein-distance|Fast Unsupervised Ground Metric Learning with Tree-Wasserstein Distance]]: it accelerates distribution comparisons through a tree ground metric, whereas QP uses univariate quantile projections for posterior approximation.

[[index|Library home]]
