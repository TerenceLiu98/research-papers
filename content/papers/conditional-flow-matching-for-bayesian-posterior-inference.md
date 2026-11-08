---
title: "Conditional Flow Matching for Bayesian Posterior Inference"
type: paper
authors:
  - Percy S. Zhai
  - So Won Jeong
  - Veronika Ročková
year: null
source_job_id: 12a2cf0e-c05b-44f4-aec1-064d10124146
tags:
  - flow-matching
  - simulation-based-inference
  - bayesian-inference
---

## TL;DR

Δ-Flow learns a block-triangular velocity field on the joint space of observations and parameters, enabling likelihood-free posterior sampling by reversible ODE transport. The manuscript develops posterior-consistency results and a monotonicity-based construction of nested credible sets. Experiments show faster training than M-GAN but mixed posterior accuracy across five SBI benchmarks.

## Research Question

Can joint-space [[concepts/flow-matching|Flow Matching]] support amortized posterior sampling, inverse ranks, and multivariate credible sets without evaluating a likelihood?

## Motivation

Simulators supply prior-predictive parameter–observation pairs even when likelihood evaluation is unavailable. A reusable transport can amortize inference across observations. Learning the observation marginal and parameter conditional through separate velocity components distributes the modeling task across two networks.

## Contributions

- Extends block-triangular posterior transport to continuous-time joint flows with regression-based training.
- Obtains inverse conditional maps through reverse ODE integration.
- Proposes credible regions and conditional vector ranks using a spherical reference distribution and additional monotonicity constraints.
- States Wasserstein posterior consistency and Hausdorff credible-set consistency under smoothness, boundedness, compactness, and relevant monotonicity assumptions.

## Method

Generate joint pairs from the prior and simulator and independent source noise. With $x=(y,\theta)$, train on straight-line interpolants $x_t=(1-t)x_0+tx_1$ using squared error against $x_1-x_0$. Constrain the velocity to

$$
\dot y_t=f_t(y_t),\qquad \dot\theta_t=g_t(y_t,\theta_t).
$$

This preserves block-triangular transport: the observation trajectory does not depend on parameter noise. For a new observation $y^*$, reverse the marginal flow to obtain its trajectory $\tilde F_t(y^*)$, then transport fresh parameter noise with $\dot\theta_t=g_t(\tilde F_t(y^*),\theta_t)$. Reversing the conditional transport gives its inverse.

For uncertainty quantification, the paper parameterizes the parameter velocity as the gradient of a partially input-convex potential. With a spherical reference having uniform radius, images of radius-$\tau$ balls define nested candidate credible sets. The manuscript identifies these with Monge–Kantorovich depth regions under its monotonicity framework; the inverse map supplies radial ranks. Section 3 states uniform posterior consistency as simulation sample size grows, with credible-set consistency under additional assumptions. These are asymptotic claims, not finite-training guarantees.

## Experiments

Table 3 reports classifier two-sample test accuracy, where 0.5 is ideal:

| Task | Δ-Flow | M-GAN | Kerrigan et al. |
| --- | ---: | ---: | ---: |
| Gaussian Linear | 0.71 | 0.85 | 0.89 |
| Gaussian Mixture | 0.82 | 0.73 | 0.96 |
| Bernoulli GLM | 0.92 | 0.84 | 0.99 |
| Two Moons | 0.74 | 0.67 | 0.99 |
| SLCP | 0.93 | 0.98 | 0.97 |

Δ-Flow improves on Kerrigan et al. in all five reported comparisons, but beats M-GAN only on Gaussian Linear and SLCP. Table 2 reports training times of 617.3–906.1 seconds for Δ-Flow versus 4480.55–6088.87 seconds for M-GAN; reported inference times are below 0.01 seconds for both. These are the manuscript's task-specific measurements.

Neal's funnel illustrates joint and conditional recovery, with some tail expansion for a scarce observation. Gaussian conjugate experiments report better resistance to posterior collapse than M-GAN as observation dimension increases. SIR experiments show sensitivity to scaling and priors; standardization improves joint recovery.

The credible-set experiment uses 100 datasets and checks convex-hull regions against 2,000 fresh samples from the learned flow per dataset. This measures internal posterior mass agreement, rather than independent calibration against the true posterior. An Illinois COVID-19 application uses 200 days of reconstructed SIR compartments and reports MAP reproduction number 3.54 and infectious period 14.58 days (Table 5).

## Limitations

- High observation dimension, high parameter dimension, severe multimodality, and extreme heavy tails remain challenging; tuning and summary-statistic choices matter.
- The convex-gradient velocity restricts representability. Remark 3 discusses expansive maps, smaller source variance, and an alternative formulation for contraction.
- Consistency results depend on regularity assumptions and accurate velocity learning; the experiments do not establish these conditions for trained networks.
- Credible-set mass checks use the learned sampler itself. The real-data application also depends on reconstructed compartments and epidemiological assumptions.
- Table 3 shows substantial remaining posterior discrepancies. Its values are used here because the surrounding prose inconsistently lists SLCP among both wins and losses against M-GAN.
- The supplied Markdown does not establish a publication year or stable paper identifier; these are not inferred.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: regression of transport velocities.
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]: amortized inference from simulator pairs.
- [[concepts/optimal-transport|Optimal Transport]]: the conditional transport and depth-region interpretation.

## Related Papers

- [[papers/flow-matching-for-scalable-simulation-based-inference|Flow Matching for Scalable Simulation-Based Inference]]: conditions parameter flow on fixed observations, whereas this work evolves observations and parameters jointly.
- Baptista et al. (2024), “Conditional sampling with monotone GANs: From generative models to likelihood-free inference”: supplies the block-triangular transport foundation and M-GAN baseline.
- Kerrigan et al. (2024), “Dynamic conditional optimal transport through simulation-free flows”: targets conditional optimal transport with fixed conditioning observations.

Source: supplied parsed manuscript, Cognitio job `12a2cf0e-c05b-44f4-aec1-064d10124146`.

[[index|Library home]]
