---
title: "Graphon Hawkes Processes: Sparse Estimation and Network Recovery"
type: paper
authors:
  - Justin R. Baars
  - Roger J. A. Laeven
  - Michel R. H. Mandjes
year: 2026
source_job_id: "242c769b-ba98-418a-ae0a-bed7f34cf63b"
tags:
  - graphon-hawkes-processes
  - sparse-estimation
  - network-recovery
  - spatiotemporal-point-processes
  - neuronal-spike-data
---

## TL;DR

The paper estimates linear [[concepts/graphon-hawkes-processes|Graphon Hawkes Processes]] on a continuous spatial domain by expanding the baseline intensity, temporal excitation kernel, and interaction graphon in finite bases and fitting a sparsity-penalized least-squares criterion. It proves non-asymptotic intensity-estimation bounds and consistent recovery of the graphon's coefficient support without assuming an almost-surely bounded conditional intensity. Simulations support finite-sample recovery, and an Allen Neuropixels application finds spatially structured, approximately separable connectivity, although the empirical analysis is presented as a proof of concept.

## Research Question

Can the latent interaction structure of a continuously indexed spatiotemporal Hawkes process be estimated consistently in a high-dimensional basis expansion, including recovery of which graphon coefficients encode effective network interactions?

## Motivation

Multivariate Hawkes models assign events to finitely many components, effectively discretizing space. In neuroscience, epidemiology, and seismology, event locations may instead lie on a continuous domain and interaction strength may vary smoothly across it. Finer discretization reduces spatial approximation error but rapidly enlarges the parameter space. A graphon supplies a continuous interaction kernel, while sparse estimation offers a route to interpretable network recovery.

## Contributions

- Formulates estimation of the baseline intensity $\nu$, temporal kernel $h$, and graphon $W$ as a growing-dimensional parametric problem through truncated spatial and temporal basis expansions.
- Introduces an $\ell^1$-penalized least-squares estimator that promotes sparsity in the graphon coefficient matrix while retaining a quadratic optimization structure.
- Establishes concentration inequalities and non-asymptotic probabilistic bounds for intensity estimation when the number of parameters grows with the observation horizon.
- Proves sparsistency under additional regularity, sparsity, and signal-strength conditions: the estimated coefficient support equals the population support with probability tending to one.
- Avoids the almost-sure upper bound on conditional intensity used in some earlier Hawkes analyses by combining localization, truncation, exponential moment control, and stopped-martingale inequalities.
- Evaluates estimation and support recovery under correctly specified and perturbed graphons, then applies the estimator to approximately 1.81 million neuronal spike events.

## Method

For events $(t_i,x_i)$ on a continuous spatial domain $\mathcal X$, the conditional intensity density is

$$
\lambda(t,x)=\nu(x)+\sum_{t_i<t}W(x,x_i)h(t-t_i).
$$

The method expands $\nu$ and both arguments of $W$ in a spatial basis and expands $h$ in a temporal basis. The resulting coefficients enter the intensity through products of graphon and temporal coefficients. A least-squares point-process contrast is augmented with an $\ell^1$ penalty on the graphon coefficients; the regularization level used in the theory scales as $\log(T)/\sqrt{T}$.

The consistency argument controls first- and second-order point-process functionals, approximation error from basis truncation, the empirical Gram matrix, and a martingale term. The support-recovery theorem additionally requires sparsity and separation conditions. Its target is the support of population basis coefficients, so network recovery is relative to the chosen representation and its approximation of the graphon.

## Experiments

The simulation study uses eight Legendre spatial functions, three exponential temporal functions, and 100 paths per setting. Four in-model graphons range from 4 to 28 nonzero coefficients; three misspecified variants add omitted higher-order basis components, a high-frequency trigonometric component, or a Brownian perturbation. The coefficient error for the first unperturbed model falls from a reported mean Frobenius norm of 0.422 at $T=1{,}000$ to 0.0953 at $T=500{,}000$. At $T=500{,}000$, reported mean $F_1$ scores range from 0.8169 to 0.9158 for unperturbed models and from 0.8511 to 0.8716 for perturbed models. The dense 28-coefficient case has the largest false-negative rate, which the authors attribute to shrinkage of small coefficients.

The empirical study analyzes Allen Neuropixels session 715093703 over the 250-second interval $[5000,5250]$, containing about 1.81 million spikes. Probe depths are jittered and rescaled to $[0,1]$. Fits using 16 Legendre polynomials and Haar wavelets show qualitatively similar dominant connectivity patterns. The estimated graphon is approximately separable into target susceptibility and source influence factors. An unpenalized comparison produces much more irregular estimates, including large oscillations and negative values, which the authors interpret as overfitting.

## Limitations

- The theory covers linear graphon Hawkes processes with a stationary baseline, bounded-support temporal excitation, and processes initialized with an empty history; nonlinear and nonstationary models are not analyzed.
- Sparsistency depends on representation-specific regularity, sparsity, and minimum-signal assumptions. It recovers coefficient support rather than establishing a basis-invariant notion of physical connectivity.
- The simulation setting is finite-sample: the authors note that its dimensions do not fully satisfy all asymptotic scaling conditions, and lasso shrinkage is visible, especially for the denser graphon.
- The Neuropixels study uses one session and a selected 250-second window. Jittering turns discrete probe-depth bins into a continuous coordinate, and the neurological interpretations are observational rather than causal.
- Optimization at larger scale, data-driven basis truncation, regularization selection, formal interaction tests, and limit distributions remain open.

## Related Concepts

- [[concepts/graphon-hawkes-processes|Graphon Hawkes Processes]]: continuously indexed Hawkes models whose spatial excitation strength is represented by a graphon.
- [[concepts/graphons|Graphons]]: measurable kernels used here as continuous interaction structures rather than only as dense-graph limits.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a different route to flexible Hawkes-kernel inference, based on Gaussian-process priors and approximate Bayesian inference.

## Related Papers

- [[papers/point-processes-with-event-time-uncertainty|Point Processes with Event Time Uncertainty]]: estimates networked Hawkes dynamics when event times are observed through uncertainty windows.
- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: develops Bayesian methods for flexible triggering kernels rather than sparse continuous-space network recovery.
- Baars, Laeven, and Mandjes (2026), "Spatiotemporal Hawkes Processes with a Graphon-Induced Connectivity Structure" (arXiv:2409.16903v2): introduces the graphon Hawkes framework used as the starting point of this paper.

[[index|Library home]]
