---
title: Bayesian Reasoning for Physics-Informed Neural Networks
type: paper
authors:
  - Krzysztof M. Graczyk
  - Kornel Witkowski
year: 2026
doi: 10.1103/29bd-jfhz
source_job_id: "2155c672-08fb-47cb-a571-f2264d5eb829"
tags:
  - physics-informed-neural-networks
  - bayesian-neural-networks
  - laplace-approximation
  - loss-balancing
  - uncertainty-quantification
---

## TL;DR

Graczyk and Witkowski adapt MacKay's evidence framework to shallow physics-informed neural networks (PINNs). A local Laplace approximation makes the loss weights for equation residuals, boundary conditions, and observations differentiable hyperparameters, while model evidence ranks independently trained networks. Heat, wave, and Burgers equation experiments show that the method can recover reference solutions and improve wave-equation error over fixed weights, but its Hessian computations and local Gaussian posterior restrict it to small networks and do not guarantee calibrated uncertainty.

## Research Question

Can Bayesian model evidence replace heuristic PINN loss weighting while also supporting model comparison and predictive uncertainty without posterior sampling?

## Motivation

PINNs combine several objectives: satisfying a differential equation, enforcing boundary or initial conditions, and sometimes fitting observations. Their relative weights strongly affect optimization and are commonly chosen by trial and error or adaptive heuristics. Sampling-based Bayesian PINNs can quantify uncertainty, but posterior sampling and separate hyperparameter searches become costly. The paper seeks a single probabilistic treatment of regularization, loss balancing, model selection, and uncertainty for small PINNs.

## Contributions

- Formulates [[concepts/evidence-based-loss-weighting-for-physics-informed-neural-networks|Evidence-Based Loss Weighting for Physics-Informed Neural Networks]], interpreting each loss coefficient as an inverse-noise hyperparameter and optimizing it through an approximate marginal likelihood.
- Replaces MacKay's approximate fixed-point updates with gradient optimization of negative log evidence, interleaved with neural-network weight updates.
- Uses the Laplace Hessian both to rank trained network configurations by evidence and to propagate local weight uncertainty into predictions.
- Evaluates the framework on nonlinear regression and three PDEs, including a Burgers equation setting that combines residual, boundary, and noisy observational losses.

## Method

The PINN loss combines Gaussian weight priors with equation and boundary likelihood terms:

$$
E_T(\mathbf w)=\sum_i \alpha_i E_w^i(\mathbf w)
+\beta_q E_D^q(\mathbf w)+\beta_b E_D^b(\mathbf w).
$$

Here, $\alpha_i$ controls weight decay for a class of parameters, while $\beta_q$ and $\beta_b$ weight equation-residual and boundary-condition errors. Burgers equation adds $\beta_{ex}E_D^{ex}$ for noisy observations. The network weights are optimized toward a maximum-posterior solution $\mathbf w_{MP}$.

Around that solution, the method approximates the posterior as Gaussian with precision

$$
\mathbf A=\mathbf H+\mathbf I_W(\boldsymbol\alpha),
$$

where $\mathbf H$ is the loss Hessian weighted by the $\beta$ values. The approximate log marginal likelihood contains the fitted losses, $\log|\mathbf A|$, and normalization terms for $\alpha$ and $\beta$. Rather than using fixed-point equations, training minimizes its negative with respect to the hyperparameters after an initial weight-only phase and then updates weights and hyperparameters on interleaved schedules. This is a bilevel optimization procedure.

Evidence adds a symmetry correction for interchangeable and sign-flipped hidden units and is used to select among 100 independently trained networks. Local predictive variance is obtained by propagating the inverse Hessian through the network-output gradient:

$$
\Delta^2\mathcal N(\mathbf x)=
\nabla_{\mathbf w}\mathcal N(\mathbf x)^\top
\mathbf A^{-1}
\nabla_{\mathbf w}\mathcal N(\mathbf x).
$$

This variance describes uncertainty near one posterior mode; it does not integrate over distant modes or architectures.

## Experiments

### Nonlinear Regression

A one-hidden-layer network with six tanh units fits 24 noisy observations from $u(x)=x^2\cos^2(4x)$. Evidence optimization converges to $\alpha=0.24$ and $\beta=596$. Using the same architecture and hyperparameters, a 15,000-sample HMC fit produces visually similar means and uncertainties. This is a small illustrative comparison, not a runtime benchmark or a posterior-accuracy study.

### PDE Benchmarks

Each PDE study trains 100 networks and selects the strongest-evidence fit. Heat and wave equations use 50 residual and 50 boundary points; the Burgers experiment uses 200 residual, 200 boundary, and 60 noisy observation points.

| Problem | Architecture and hyperparameters | Reported best-model L2 in Table II | Mean time per fit |
| --- | --- | ---: | ---: |
| Heat equation | One hidden layer, 6 tanh units; one $\alpha$, one shared $\beta$ | 0.051 | 59 s |
| Wave equation | One hidden layer, 8 tanh units; one $\alpha$, one shared $\beta$ | 0.119 | 152 s |
| Wave equation, full hyperparameters | Same network; four $\alpha$ values and separate $\beta_q,\beta_b$ | 0.011 | 159 s |
| Burgers equation | Two hidden layers, 8 tanh units each; one $\alpha$ and three $\beta$ values | 0.103 | 588 s |

For the wave equation, the full-hyperparameter model reaches log evidence of about 169 versus about 158 for the shared-$\alpha$, shared-$\beta$ version, and its boundary weight becomes nearly twice its residual weight. For Burgers equation, half of the residual and observational points are deliberately concentrated near the sharp feature at $x=0$; the selected prediction agrees visually with the reference numerical solution.

Table III separately compares fixed weights ($\alpha=0.05$, $\beta=1$) with Bayesian weighting over the five best runs under each method's own selection criterion:

| Problem | Method | Best L2 | Mean L2 | Mean MAD |
| --- | --- | ---: | ---: | ---: |
| Heat | Fixed weights | 0.00538 | 0.00588 | 0.00446 |
| Heat | Bayesian | 0.00508 | 0.00678 | 0.00530 |
| Wave | Fixed weights | 0.01290 | 0.01514 | 0.01248 |
| Wave | Bayesian | 0.01146 | 0.01114 | 0.00903 |

Thus adaptive evidence weighting does not improve the five-run heat average, but reduces the reported mean wave-equation L2 by about 26%. The manuscript does not explain the scale difference between the best-model values in Tables II and III, so they are retained as distinct reported evaluations.

## Limitations

- The Laplace approximation describes one local posterior peak as Gaussian. It can miss multimodality, skewness, and uncertainty from remote modes; the nonlinear-regression comparison itself anticipates wider HMC uncertainty on harder problems.
- Exact Hessian operations are practical only for shallow or moderately sized networks. The experiments use one or two hidden layers with at most eight units per layer.
- The Gaussian approximation is argued to be most appropriate when constraints outnumber model parameters, limiting direct extension to deep PINNs.
- Hyperparameter updates can be unstable and are delayed or spaced during training. The full wave model does not fully converge all hyperparameters even when its loss and evidence plateau.
- Figure 9 shows regions where the true wave-equation error falls outside the reported two-standard-deviation interval. The paper does not report a systematic coverage or calibration analysis.
- Results depend on selecting among 100 optimization runs. The fixed-weight comparison averages each method's five best runs under different selection criteria, rather than comparing paired runs or distributions over all runs.
- Burgers accuracy relies on concentrating training points near the developing sharp feature. General performance under other sampling designs is not established.
- The experiments cover three low-dimensional PDEs and one synthetic regression. They do not establish scalability, robustness across PDE families, or superiority to the adaptive weighting methods discussed in the paper.

## Related Concepts

- [[concepts/evidence-based-loss-weighting-for-physics-informed-neural-networks|Evidence-Based Loss Weighting for Physics-Informed Neural Networks]]: the paper's joint treatment of loss weights, regularization, and evidence-based model selection.
- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: the HMC alternative used in the nonlinear-regression comparison.
- [[concepts/probability-calibration|Probability Calibration]]: an evaluation dimension not systematically measured by the reported uncertainty bands.

## Related Papers

- MacKay (1992), "A practical Bayesian framework for backpropagation networks": the cited evidence framework adapted to PINNs.
- Raissi, Perdikaris, and Karniadakis (2019), "Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations": the cited PINN foundation.
- Yang, Meng, and Karniadakis (2021), "B-PINNs: Bayesian physics-informed neural networks for forward and inverse PDE problems with noisy data": the cited HMC-based Bayesian PINN comparison.
- Wang, Yu, and Perdikaris (2022), "When and why PINNs fail to train: A neural tangent kernel perspective": the cited account of gradient imbalance and NTK-guided loss scaling.
- [[papers/challenges-in-markov-chain-monte-carlo-for-bayesian-neural-networks|Challenges in Markov Chain Monte Carlo for Bayesian Neural Networks]]: a library comparison on posterior-sampling difficulty and the distinction between predictive utility and posterior exploration; not cited in this manuscript.

[[index|Library home]]
