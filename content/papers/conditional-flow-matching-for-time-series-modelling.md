---
title: Conditional Flow Matching for Time Series Modelling
type: paper
authors:
  - Ella Tamir
  - Najwa Laabid
  - Markus Heinonen
  - Vikas Garg
  - Arno Solin
year: null
tags:
  - flow-matching
  - time-series
  - neural-differential-equations
  - gaussian-processes
---

[[index|Library home]]

## TL;DR

CFM-TS learns continuous-time dynamics by regressing a neural vector field against trajectory-conditioned targets obtained with Kalman smoothing or Gaussian processes. On three simulated systems, its GP variant achieves lower reported trajectory MSE than the basic neural ODE baseline wherever numerical baseline results are available, and learns a pendulum trajectory on which that baseline fails to converge. The Brownian-bridge variant is strongest on Lotka–Volterra but is worse than the baseline on the sine task.

## Research Question

Can trajectory-conditioned probability paths make neural ODE training more stable on long, irregularly observed trajectories without differentiating through full ODE rollouts?

## Motivation

Long observation horizons can make rollout-based neural ODE optimization difficult. Conditional vector-field regression offers local supervision assembled from tractable trajectory models, transferring the principle of [[concepts/flow-matching|Flow Matching]] to learning physical-time dynamics.

## Contributions

- Extends conditional flow-matching marginalization and loss-equivalence results from individual samples to observed trajectories.
- Constructs conditional targets using Brownian-bridge flows with Kalman smoothing (CFM-BB) or Gaussian-process flows (CFM-GP).
- Compares these constructions with an adjoint-trained neural ODE on Lotka–Volterra, sine, and pendulum systems.

## Method

For an observed trajectory $Y$, define a conditional density path $p_t(x\mid Y)$ and vector field $u_t(x\mid Y)$. Their mixture has density $p_t(x)=\int p_t(x\mid Y)p(Y)\,dY$ and a density-weighted marginal vector field. Training minimizes

$$
\mathbb E_{t,Y,x\sim p_t(\cdot\mid Y)}\|v_\theta(x,t)-u_t(x\mid Y)\|^2.
$$

Theorems 1–2 establish that valid conditional fields generate the mixture density and that conditional and marginal regression losses differ only by a parameter-independent constant under the stated positivity assumptions. These statements concern the constructed density paths, not guaranteed recovery of the true physical dynamics.

**CFM-BB:** A zero-drift Kalman smoother estimates Gaussian state marginals. The method interpolates between adjacent marginals and uses the corresponding analytical vector-field targets.

**CFM-GP:** [[concepts/gaussian-process-regression|Gaussian Process Regression]] jointly models states and time derivatives using an RBF kernel. Hyperparameters are fitted separately for each trajectory; the conditional derivative mean given a sampled state approximates the deterministic target field. Appendix D reports ten sampled functions per trajectory GP.

Both methods preprocess states and target velocities on a regular time grid and train with minibatches. Generating predicted trajectories still requires integrating the learned ODE.

## Experiments

Table 1 reports trajectory MSE, mean ± standard deviation over five runs:

| Model | Lotka–Volterra | Sine | Pendulum |
| --- | --- | --- | --- |
| NODE | 0.06 ± 0.061 | 0.04 ± 0.005 | Not reported: no convergence |
| CFM-BB | 0.0080 ± 0.003 | 0.07 ± 0.05 | 2.31 ± 1.68 |
| CFM-GP | 0.0086 ± 0.002 | 0.005 ± 0.003 | 0.09 ± 0.14 |

The multi-trajectory tasks use an 80/20 trajectory split. Pendulum evaluation uses new observation locations within the interval of a single trajectory, so it does not establish generalization to new initial conditions. Appendix D describes horizons of 5 for Lotka–Volterra, 2 for sine, and 16 seconds for pendulum.

CFM-BB has the lowest Lotka–Volterra MSE; CFM-GP performs best on sine and pendulum. The authors attribute the GP advantage on oscillatory trajectories to kernel flexibility, but do not isolate that explanation experimentally. The table contradicts the prose claim that NODE is worst on every task: NODE beats CFM-BB on sine.

## Limitations

- Evidence covers three simulated systems and a basic neural ODE baseline; latent dynamics and stronger multiple-shooting baselines remain future work.
- Experimental reporting is inconsistent: Section 3 gives 300 Lotka–Volterra and 100 sine trajectories, while Appendix D gives 400 each. The main text reports batch size 258 and 400–600 epochs for all models; the appendix reports batch size 256 and only ten NODE epochs, stating that longer training did not help.
- GP fitting is performed per trajectory and adds preprocessing cost. Reported training times do not establish a controlled end-to-end speed advantage.
- The supplied Markdown contains malformed mathematical notation, so implementation should not rely on its extracted formulas alone.
- Publication year and a stable paper identifier are not stated in the supplied text; year is left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: conditional regression and marginalization underpin CFM-TS.
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]: supplies smooth state and derivative targets.
- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: related continuous-time trajectory learning, with additional attention to preserving cross-time couplings.

## Related Papers

- Lipman et al. (2023), *Flow Matching for Generative Modeling*: the conditional matching foundation extended here.
- Iakovlev et al. (2023), *Latent Neural ODEs with Sparse Bayesian Multiple Shooting*: cited alternative for long-trajectory learning, not evaluated as a baseline here.
- [[papers/trajectory-flow-matching-with-applications-to-clinical-time-series-modeling|Trajectory Flow Matching with Applications to Clinical Time Series Modeling]]: a library comparison that conditions on history and models irregular timing and uncertainty; CFM-TS instead studies deterministic dynamics through smoothed trajectory targets.
