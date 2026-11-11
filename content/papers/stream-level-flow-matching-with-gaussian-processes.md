---
title: Stream-level Flow Matching with Gaussian Processes
type: paper
authors:
  - Ganchao Wei
  - Li Ma
year: null
tags:
  - flow-matching
  - gaussian-processes
  - generative-modeling
---

[[index|Library home]]

## TL;DR

GP-CFM learns a flow by regressing on positions and velocities sampled jointly from Gaussian-process streams conditioned on observed endpoints or multiple correlated observations. This preserves simulation-free training and broadens training coverage. Reported benefits include reduced variability on MNIST and improved CIFAR-10 FID for independent coupling, but combining GP streams with optimal-transport coupling does not improve CIFAR-10 FID.

## Research Question

Can conditioning flow matching on stochastic streams improve vector-field estimation and incorporate correlated observations while retaining tractable training?

## Motivation

Straight interpolating paths can leave regions poorly covered during training, forcing extrapolation during generation. Endpoint-only formulations also make it difficult to share information across multiple observations from one subject. GP streams allow smooth stochastic paths and conditioning on intermediate measurements.

## Contributions

- Extends conditional flow matching to latent differentiable streams, with a conditional-expectation interpretation and gradient-equivalence proofs.
- Uses analytic Gaussian conditioning to sample stream positions and velocities without simulating entire trajectories.
- Separates endpoint coupling from stream design, permitting independent or optimal-transport couplings.
- Demonstrates multi-observation conditioning on grouped handwriting and neural time series.

## Method

For a stream $s$, the marginal velocity is $u_t(x)=\mathbb{E}[\dot{s}_t\mid s_t=x]$. Training minimizes

$$
\mathcal{L}_{\mathrm{sCFM}}(\theta)=\mathbb{E}_{t,s}\|v_t^\theta(s_t)-\dot{s}_t\|^2.
$$

Sample an observation tuple and a time, then draw $(s_t,\dot{s}_t)$ jointly from the conditional GP and take a regression update. Differentiating the covariance kernel gives position–velocity and velocity–velocity covariance blocks. The implementation assumes independent GPs across coordinates and uses squared-exponential kernels, with additional variance terms in some experiments. Conditional Gaussian streams can still induce non-Gaussian marginal distributions through mixing over observations.

Multiple observations, including irregularly spaced ones, can constrain a single stream. When streams cross, conditioning the neural field on a subject covariate or starting observation helps distinguish their velocities. Generation still requires integrating the learned ODE. See Sections 3–4 and Appendices A–E and J.

## Experiments

| Setting | Reported result | Evaluation |
| --- | --- | --- |
| Gaussian-mixture simulation | W2: I-CFM 1.54, GP-I-CFM 1.51, OT-CFM 1.43, GP-OT-CFM 1.35 | Means over 100 seeds, Table 1 |
| MNIST | FID: 44.50, 44.21, 43.55, 42.99 for I-CFM, OT-CFM, GP-I-CFM, GP-OT-CFM | 100 fitted models per method, Table 3 |
| CIFAR-10 | FID: 3.75, 3.74, 3.62, 3.75 in the same order | 20 evaluations of 50,000 samples per trained model, Table 4 |

On CIFAR-10, training throughput decreases from about 3.6 to 3.0 iterations/second with GP streams. Generating ten images takes 1.30 seconds for I-CFM and 1.27 for GP-I-CFM; OT-CFM is fastest at 1.07 seconds. These timings use the reported hardware and adaptive DOPRI5 solver.

HWD+ uses 1,358 samples from 97 writers (1,086 training and 272 test) for grouped 0→8→6 transformations. The authors report smoother transformations and improved FID curves with GP models; conditioning on starting images further helps GP-CFM but worsens the separate linear-path baseline. The LFP demonstration uses 214 trials from one mouse session, seven regions, and five selected time points, generating 1,000 trajectories. It is an illustrative application rather than a quantitative benchmark.

## Limitations

Benefits depend on kernel and noise design. In Table 2, increasing noise toward the finite-sample target improves W2 from 0.269 to 0.243, while constant and decreasing noise worsen it to 0.305 and 0.329. GP-OT-CFM does not improve CIFAR-10 FID over I-CFM. Stream crossings can require covariates, and stochastic velocity targets introduce Monte Carlo error. Independent coordinate GPs simplify computation; handling more observation times is costly (the LFP example reports roughly 100 iterations/second with five times versus 2.5 with fifty). The supplied Markdown does not establish the paper's publication year or a stable paper identifier.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: regression-based training of continuous flows.
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: analytic conditioning supplies positions and derivative targets.
- [[concepts/stream-level-flow-matching|Stream-level Flow Matching]]: latent path conditioning separates stream geometry from endpoint coupling.

## Related Papers

- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: a related library paper using GPs as structured source priors; here GPs model conditional streams along flow time.
- Lipman et al. (2023), *Flow Matching for Generative Modeling*, and Tong et al. (2024), *Improving and Generalizing Flow-based Generative Models with Minibatch Optimal Transport*, are the endpoint-conditioned foundations discussed by the authors.
- Albergo et al. (2024), *Multimarginal Generative Modeling with Stochastic Interpolants*, addresses correlated observations through multimarginal interpolants.
