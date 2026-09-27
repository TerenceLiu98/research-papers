---
title: Learning Hawkes Processes Under Synchronization Noise
type: paper
authors:
  - William Trouleau
  - Jalal Etesami
  - Matthias Grossglauser
  - Negar Kiyavash
  - Patrick Thiran
year: null
source_job_id: ba2d3dc0-e387-4358-9266-6e2d7f5b7035
tags:
  - hawkes-processes
  - temporal-point-processes
  - causal-discovery
  - synchronization-noise
---

## TL;DR

Unknown, fixed timestamp offsets across event streams can reverse apparent cause-effect order and bias multivariate Hawkes inference. DESYNC-MHP jointly estimates these offsets and the Hawkes parameters, using a smoothed likelihood gradient for offsets and the exact likelihood gradient for model parameters. It substantially improves synthetic graph recovery at moderate noise and modestly improves predictive likelihood on neuronal spike trains, but remains vulnerable to local optima and high noise.

## Research Question

Can the excitation graph of a multivariate Hawkes process be recovered when each observed event stream has an unknown time shift, without assuming a known distribution for those shifts?

## Motivation

Independent sensor clocks and source-dependent observation delays can make events appear before their causes. Standard Hawkes estimators interpret observed ordering as true temporal ordering, potentially introducing reverse edges or suppressing genuine dependencies. [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]] preserves ordering within each stream while changing ordering between streams; finite observation windows can also gain or lose events (Section 3).

## Contributions

- Demonstrates how synchronization noise distorts conventional maximum likelihood estimates, including spurious bidirectional excitation in a two-process example.
- Introduces DESYNC-MHP, which treats one offset per dimension as an additional parameter alongside background intensities and excitation strengths.
- Develops kernel smoothing for offset optimization and stochastic gradient updates over multiple realizations to reduce sensitivity to local optima.
- Evaluates graph recovery across noise levels, dimensions, and realization counts, and predictive likelihood on a neuronal dataset.

## Method

For dimension $i$, the latent process has conditional intensity

$$
\lambda_i(t\mid\mathcal H_t)=\mu_i+
\sum_j\sum_{\tau\in\mathcal H_t^j}
\alpha_{ij}e^{-\beta(t-\tau)},
$$

where the history contains events strictly before $t$, $\mu_i,\alpha_{ij}\geq0$, and $\beta$ is a fixed hyperparameter. A nonzero $\alpha_{ij}$ represents an edge $j\to i$ under the Hawkes model. Observed timestamps satisfy

$$
\tilde t_k^i=t_k^i+z_i,
$$

with a single unknown $z_i$ shared by all events in dimension $i$. DESYNC-MHP maximizes the likelihood of timestamps corrected by these offsets, accounting for shifted observation-window limits, over $z\in\mathbb R^d$ and $\theta=\{\mu_i,\alpha_{ij}\}\geq0$ (Section 4.1).

Changing offsets can swap events across streams. Because the exponential excitation kernel jumps at zero lag, these swaps create discontinuities in the likelihood. Section 4.2 replaces the kernel, for offset updates, with

$$
\tilde\kappa_{ij}(u)=\alpha_{ij}\left[
\sigma(\gamma u)e^{-\beta u}
+\{1-\sigma(\gamma u)\}e^{\beta' u}
\right],\qquad \sigma(v)=\frac{1}{1+e^{-v}}.
$$

The smoothing parameters balance approximation bias against optimization difficulty. Algorithm 1 samples a realization, updates $z$ with the smoothed log-likelihood gradient, and updates $\theta$ with the exact log-likelihood gradient followed by projection onto nonnegative values. Smoothing therefore applies specifically to offset estimation. The experiments add Lasso regularization to excitation strengths. Stochastic updates help empirically, but do not make the joint problem convex.

## Experiments

### Synthetic Graph Recovery

Section 5.1 samples directed excitation matrices with edge probability $2/d$, rescales them to spectral radius 0.95, and uses $\beta=1$. The default data comprise five realizations of 50,000 events each; smoothing uses $\beta'=50$ and $\gamma=500$. Experiments use ten different matrices per parameter setting and compare DESYNC-MHP with classic MLE under the same sparsity regularization.

The reported accuracy is

$$
1-\frac{1}{d^2}\sum_{ij}
\left|\mathbf1\{\alpha^*_{ij}>0\}
-\mathbf1\{\hat\alpha_{ij}>0.05\}\right|.
$$

This measures agreement over all $d^2$ matrix entries, including absent edges, rather than recall of true edges alone.

- **Moderate noise:** With $d=10$ and the paper's noise-variance setting $\sigma^2=1$, DESYNC-MHP achieves accuracy close to 100%, while classic MLE misclassifies more than 25% of entries on average (Figure 4).
- **Larger noise:** DESYNC-MHP increasingly encounters local optima. At high noise both estimators fail and tend toward sparse graphs; the authors also describe an intermediate transition where both perform worse than random guesses.
- **Dimensions and realizations:** Accuracy is reported as fairly stable across the tested dimensions at $\sigma^2=1$ and 5 (Figure 5). At $d=10,\sigma^2=1$, three independent realizations of 50,000 events each suffice for near-100% accuracy in the reported experiment (Figure 6).

### Neuronal Spike Trains

Section 5.2 uses an hour of macaque motor-cortex recordings, originally containing 115 identified neurons at 1 ms resolution. The ten most active neurons contribute 354,285 spikes. The first 70% of observations train the models and the remaining 30% form the test set. Grid search selects $(\beta,\beta',\gamma)=(0.0047,0.16,1.6)$.

Table 1 reports predictive log-likelihood across multiple random initializations:

| Estimator | Mean | Standard deviation |
| --- | ---: | ---: |
| Classic MLE | 0.4282 | 0.000035 |
| DESYNC-MHP MLE | 0.4311 | 0.00030 |

The authors report estimated synchronization noise averaging 12.5 ms, compared with an average inter-event time of 88.9 ms. The two inferred graphs agree on 91% of edges, and both display a dominant direction consistent with prior analyses. Additional artificial shifts reduce both models' predictive likelihood, with DESYNC-MHP retaining an advantage in the reported comparisons (Figure 8). These results support predictive fit; no ground-truth neuronal graph or clock offsets are supplied.

## Limitations

- The observation model assumes a constant offset per stream. Event-specific delays and drifting clocks are outside the evaluated model.
- Offset optimization remains nonconvex and sensitive to initialization, smoothing, and noise scale. The supplied text establishes no general recovery or global-convergence guarantee.
- Evaluation uses exponential kernels. More flexible kernels are proposed as an extension, and gains on real data are smaller than in simulation.
- Overall matrix accuracy includes true negatives. Because the synthetic graph has expected degree near two, increasing dimension increases the proportion of absent edges, limiting conclusions from stable accuracy alone.
- Better held-out likelihood and agreement with previous neuronal analyses do not independently verify causal direction or distinguish clock error from model misspecification. Causal interpretation remains conditional on the Hawkes modeling assumptions.
- The supplied Markdown omits publication metadata and the appendix referenced in the discussion of high-noise behavior. The year is left unknown; omitted material is not used to support additional claims.

## Related Concepts

- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]]: the observation error modeled by DESYNC-MHP.
- [[concepts/granger-causality|Granger Causality]]: history-based directed dependence, represented here by Hawkes excitation support.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a complementary approach to flexible triggering kernels; the present experiments use parametric kernels and maximum likelihood.

## Related Papers

- Xu, Farajtabar, and Zha (2016), "Learning Granger causality for Hawkes processes": cited for learning excitation structure from accurately timed observations.
- Zhou, Zha, and Song (2013), "Learning social infectivity in sparse low-rank networks using multi-dimensional Hawkes processes": the cited classic MLE baseline.
- Shelton, Qin, and Shetty (2018), "Hawkes process inference with missing data": addresses missing events, a different observation problem from fixed stream offsets.
- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: a related library treatment of flexible Hawkes kernels and approximate Bayesian inference; it is not a baseline evaluated here.

[[index|Library home]]
