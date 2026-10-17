---
title: Black-box Bayesian inference for agent-based models
type: paper
authors:
  - Joel Dyer
  - Patrick Cannon
  - J. Doyne Farmer
  - Sebastian M. Schmon
year: null
tags:
  - agent-based-models
  - simulation-based-inference
  - bayesian-inference
---

## TL;DR

Neural posterior estimation (NPE) and neural ratio estimation (NRE) recover economic simulator parameter posteriors more accurately than the tested ABC baselines with substantially fewer simulations. The paper combines these methods with learned time-series summaries and extends posterior estimation to evolving graphs. Its central methodological recommendation is to evaluate full posterior distributions and calibration, rather than only the distance of a point estimate from the generating parameter.

[[index|Library home]]

## Research Question

Can black-box neural inference provide accurate, simulation-efficient Bayesian parameter estimation for agent-based models whose outputs include nonstationary multivariate time series and graph sequences?

## Motivation

Agent-based models often supply samples but no tractable likelihood. Some existing calibration procedures estimate a surrogate likelihood afresh at every proposed parameter, coupling expensive simulator calls to long posterior sampling chains. Independence or stationarity assumptions can also discard the temporal structure these models are designed to generate. Learning a reusable posterior or likelihood-to-evidence ratio separates simulation from subsequent posterior sampling.

## Contributions

- Reviews and benchmarks [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]] against KDE-ABC and Bayesian versions of generalized subtracted L-divergence and simulated-moment matching.
- Evaluates posterior discrepancies using Wasserstein distance and [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]], with tractable-likelihood MCMC as an approximate reference.
- Couples a recurrent graph embedding with a conditional density estimator to infer parameters directly from node states and evolving ties.
- Demonstrates posterior predictive checks and [[concepts/simulation-based-calibration|Simulation-Based Calibration]] as complementary assessments when a reference posterior is unavailable.

## Method

**Posterior estimation.** Simulate pairs from $p(\theta)p(x\mid\theta)$ and maximize $\sum_i\log q_\phi(\theta_i\mid x_i)$. Conditional [[concepts/normalizing-flows|Normalizing Flows]] provide a normalized posterior approximation and direct independent samples. The experiments use masked autoregressive flows.

**Ratio estimation.** A classifier distinguishes joint pairs from independently paired parameters and observations. The target is

$$
r(x,\theta)=\frac{p(x,\theta)}{p(x)p(\theta)}
=\frac{p(\theta\mid x)}{p(\theta)}.
$$

With balanced binary classes, optimal classifier odds recover this ratio; the implementation uses a multiclass contrastive objective. The learned log-ratio gives an unnormalized posterior $p(\theta)\exp f_\phi(x,\theta)$, sampled through MCMC or sampling-importance-resampling without further simulator calls. This is an application of [[concepts/density-ratio-estimation|Density Ratio Estimation]].

**Training and summaries.** Prior-trained estimators amortize inference across observations. Sequential variants concentrate simulations around the posterior for one observation; NPE training must account for the changed proposal distribution. Recurrent embedding networks learn low-dimensional summaries jointly with the inference objective, with hand-crafted summaries retained as a comparison.

**Network data.** For node-state sequences $z$ and adjacency sequences $w$, a graph convolutional GRU and feedforward network produce $g_\phi(z,w)$. A conditional flow estimates $q_\varphi(\theta\mid g_\phi(z,w))$; the entire pipeline is trained together (Section 5).

## Experiments

**Brock and Hommes asset-pricing model (Section 4.2, Table 1).** Four unknown parameters are inferred from a length-100 synthetic observation. Sequential neural methods use 10 rounds of 1,000 simulations. Lower discrepancy values indicate closer agreement with the approximate reference posterior.

| Method | Simulations | WASS | MMD |
| --- | ---: | ---: | ---: |
| KDE-ABC | 150,000 | 0.690 | 1.015 |
| GSL-ABC | 100,000 | 0.695 | 1.024 |
| MSM-ABC | 100,000 | 0.541 | 1.268 |
| SNPE, hand-crafted summaries | 10,000 | 0.336 | 0.552 |
| SNPE, learned summaries | 10,000 | 0.477 | 0.789 |
| SNRE, hand-crafted summaries | 10,000 | 0.299 | 0.781 |
| SNRE, learned summaries | 10,000 | 0.241 | 0.451 |

These are the Table 1 results, not repeated-run averages. Learned summaries improve SNRE here but worsen SNPE relative to its hand-crafted counterpart. Repeated-seed experiments generally favor neural methods while showing occasional poorer learned-summary NRE runs. In the second parameter setting (Appendix B, Table 2), learned-summary SNRE achieves WASS 0.132 and MMD 0.025, versus 0.304 and 0.127 for KDE-ABC at the same respective budgets as above.

**Multivariate geometric Brownian motion (Section 4.3).** Three drift parameters are inferred from 100 observations of a three-dimensional process. NPE and NRE use 1,000 simulations each, versus 1,000,000 for KDE-ABC. Across ten seeds, the reported Wasserstein and MMD distributions do not overlap with the worse KDE-ABC results. Neural methods use the original nonstationary series; KDE-ABC uses first differences and still produces a biased, overly concentrated posterior.

**Hopfield social dynamics (Section 5.2).** Graph-based NPE uses 1,000 simulations to infer three parameters governing opinion and tie dynamics. Posterior predictive distributions make the observed balanced-triad statistic and tie-strength/opinion-overlap correlation more typical than prior predictive distributions. These checks support fit on the two selected statistics; they do not establish exact posterior recovery.

**Franke and Westerhof asset-pricing model (Appendix D).** Amortized NPE and NRE train on 10,000 length-100 simulations. Calibration uses 5,000 prior-predictive datasets. Rank histograms are broadly compatible with the displayed reference bands, but both methods show a small downward bias in the wealth-sensitivity parameter $\alpha_w$.

## Limitations

- Experiments use synthetic observations generated by the assumed simulator. Robustness to real-world model misspecification remains unresolved.
- Architecture choice, training variability, and training cost remain relevant. Simulation-count reductions are not measurements of total wall-clock speedup.
- More simulations do not necessarily repair insufficient summaries: Appendix B reports nonmonotonic performance with the generic hand-crafted statistics.
- The graph demonstration uses fully observed node states and ties. The supplied text gives conflicting dimensions: Section 5.2 reports 25 agents and 50 time steps, whereas Appendix G reports 20 agents and 25 steps. Section 4.2 describes 20 robustness trials, but Figure 5's caption says ten.
- The supplied Markdown contains damaged notation and omits the paper's publication year, venue, and stable identifier. The year is left null. Equations with ambiguous extraction are not reproduced as implementation specifications.

## Related Concepts

- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: learns posterior densities or ratios from simulator-generated examples.
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]: supplies the likelihood-to-evidence ratio underlying NRE.
- [[concepts/normalizing-flows|Normalizing Flows]]: conditional density model used for NPE.
- [[concepts/simulation-based-calibration|Simulation-Based Calibration]]: tests inference through prior-predictive rank statistics.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: compares estimated and reference posterior samples.

## Related Papers

- Greenberg, Nonnenmacher, and Macke (2019), "Automatic posterior transformation for likelihood-free inference": sequential posterior-estimation foundation.
- Hermans, Begy, and Louppe (2020), "Likelihood-free MCMC with amortized approximate ratio estimators": joint-versus-marginal classification for inference.
- Durkan, Murray, and Papamakarios (2020), "On contrastive learning for likelihood-free inference": multiclass ratio-estimation objective used here.
- Grazzini, Richiardi, and Tsionas (2017), "Bayesian estimation of agent-based models": motivates the comparison with established economic ABM inference methods.

The source identifies [sbi4abm](https://github.com/joelnmdyer/sbi4abm) as its data and code repository.
