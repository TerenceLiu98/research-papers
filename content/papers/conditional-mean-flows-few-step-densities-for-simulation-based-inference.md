---
title: "Conditional Mean Flows: Few-Step Densities for Simulation-Based Inference"
type: paper
authors:
  - Jonas Arruda
  - Jan Hasenauer
  - Stefan T. Radev
year: 2026
source_job_id: 822c06b2-7a49-45ec-a428-6c8184a85d82
tags:
  - simulation-based-inference
  - mean-flows
  - neural-density-estimation
  - mcmc
  - missing-data
---

## TL;DR

Conditional mean flows turn [[concepts/average-velocity-fields|Average Velocity Fields]] into conditional posterior and likelihood estimators with tractable few-step densities. Each finite-time map contributes an exact Jacobian determinant, avoiding the numerical divergence integration required by [[concepts/flow-matching|Flow Matching]]. Across four simulation-based inference tasks, one or a few steps provide competitive samples and likelihoods, including single-step likelihoods that make downstream MCMC roughly 182--216 times faster than a 200-step flow-matching baseline on a cognitive model. Accuracy does not uniformly improve with more steps, and high-dimensional Jacobians remain expensive.

[[index|Library home]]

## Research Question

Can conditional mean flows provide flexible posterior and likelihood models for [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]] that retain tractable density evaluation while requiring only one or a few network evaluations at inference time?

## Motivation

[[concepts/normalizing-flows|Normalizing Flows]] provide one-pass densities but constrain the transformation architecture and do not generally expose marginal densities for missing observations. Flow-matching and diffusion estimators permit more flexible backbones, but sampling and density evaluation require numerical ODE integration. This is particularly costly for neural likelihood estimation, where MCMC may evaluate a learned likelihood thousands of times per dataset. Existing few-step generators such as consistency models reduce sampling cost without supplying a tractable density.

## Contributions

- Extends mean-flow training to conditional posterior and likelihood models and proves that the population objective identifies the conditional flow map under the paper's assumptions.
- Constructs few-step densities by composing finite-time mean-flow maps and summing their exact autodifferentiated log-Jacobian determinants.
- Adds independently sampled target masks to a transformer backbone and proves that the masked objective learns the marginal likelihood of the observed coordinates.
- Uses the same trained network at different fidelities: a cheap mean-flow density can screen proposals in delayed-acceptance MCMC, while its auxiliary velocity head supplies the fine ODE-based density.
- Benchmarks posterior estimation and learned likelihoods on two moons, a drift-diffusion cognitive model, an epidemic renewal model with missing observations, and a bivariate g-and-k model.

## Method

For target $z$, condition $x$, and times $s<t$, the network predicts the average velocity along a conditional flow trajectory,

$$
u_\psi(z,s,t,x)\approx\frac{1}{t-s}\int_s^t v(z_\tau,\tau,x)\,d\tau,
$$

which defines the finite-time map $\Phi_\psi(z;s,t,x)=z+(t-s)u_\psi(z,s,t,x)$. Training uses the MeanFlow identity with a stop-gradient Jacobian-vector product. An auxiliary velocity head estimates the instantaneous tangent, shares most network layers with the mean-flow head, and also lets the trained model operate as a conventional flow-matching estimator. A cycle loss encourages the forward and reverse finite-time maps to invert one another, though it does not guarantee invertibility.

For a schedule $0=t_0<\cdots<t_S=1$, the density maps data toward a Gaussian base through $S$ finite-time steps. If $z^{(i)}=G_i(z^{(i-1)})$, its log density is

$$
\log q_\psi^{(S)}(z\mid x)=\log\mathcal N(z^{(S)};0,I)
+\sum_{i=1}^S\log\left|\det\nabla_zG_i(z^{(i-1)})\right|.
$$

Unlike an Euler approximation to continuous change of variables, this expression computes the exact Jacobian determinant of each learned step. For missing target coordinates, the model samples a mask independently of the clean target and noise, replaces masked token inputs with a learned embedding, and excludes them from the loss. The resulting population objective targets the marginal conditional density of the observed coordinates.

## Experiments

**Two moons.** One mean-flow step attains a C2ST of 0.523, compared with 0.543 for the normalizing flow, and generates 5,000 samples about 23 times faster than 32-step Euler flow matching and 140 times faster than adaptive integration. Density quality improves with additional mean-flow steps: Hellinger distance decreases from 0.322 at one step to 0.169 at 32 steps. The one-step density is imperfect and places some mass between modes, but the stepwise determinant avoids the severe normalization errors seen with low-step Euler density evaluation.

**Cognitive-model likelihoods.** A learned single-trial likelihood is composed over 4, 16, 64, or 256 trials and sampled with NUTS. At one step, parameter NRMSE and posterior contraction are comparable to a 200-step Euler flow-matching likelihood while MCMC is 182--216 times faster. More steps do not consistently reduce error and create convergence failures: all failed runs use at least four steps. Coverage deteriorates for every method as the number of composed trials grows, with additional undercoverage for the one-step model at 256 trials.

**Missing epidemic observations.** A masked transformer learns the marginal likelihood when 30% of time points are missing completely at random. Against a normalizing flow trained with sentinel values, it lowers coefficient NRMSE from 0.199 to 0.187 and simulator predictive RMSE from 0.125 to 0.060. It also obtains higher ESS with fewer leapfrog steps, but expensive transformer and Jacobian evaluations make total sampling about 22 times slower.

**Budget-matched g-and-k inference.** With requested draws inversely proportional to mean-flow step count, posterior accuracy is similar from one to eight steps; four steps have the lowest mean C2ST, while ESS per network evaluation drops by roughly an order of magnitude from one to eight steps. The authors recommend two steps for this task. Delayed-acceptance MCMC using a coarse mean-flow density and a 100-step velocity-head density achieves accuracy comparable to NUTS without gradients, but yields lower ESS and remains slower than NUTS using the few-step likelihood.

## Limitations

- Every density step requires a full Jacobian and log determinant. Its cubic scaling in target dimension, plus second derivatives when NUTS differentiates the density, makes high-dimensional inference expensive.
- The cycle loss encourages but does not ensure invertibility, so a learned map need not define an exactly normalized density.
- Additional mean-flow steps are not an ODE-refinement guarantee: intermediate maps can be less accurate, and more steps caused convergence failures in the cognitive experiment.
- Approximation error accumulates when many learned single-observation likelihoods are composed; posterior coverage falls at large trial counts even for the 200-step baseline.
- The missing-data result assumes masks independent of targets and conditions, corresponding to missingness completely at random rather than informative missingness.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/normalizing-flows|Normalizing Flows]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]
- [[papers/how-i-learned-to-stop-worrying-and-love-stopgrads|How I Learned to Stop Worrying and Love StopGrads]]
