---
title: "How I Learned to Stop Worrying and Love StopGrads: Stationarity, Convergence, and a Case Study on Flow Map Learning"
type: paper
authors:
  - Max W. Shen
  - Mark Goldstein
  - Zichu Wang
  - Aahlad Puli
  - Rajesh Ranganath
year: null
source_job_id: f1d4c335-e739-4fcb-8e62-6534b96e287b
tags:
  - stop-gradient
  - flow-matching
  - generative-models
  - optimization
---

## TL;DR

The paper gives a function-space account of stop-gradient optimization and introduces the [[concepts/stopgrad-regression-principle|Stopgrad Regression Principle]], which turns a broad class of stopped regression objectives into fixed-point equations for their stationary points. Applied to flow-map learning, it proves uniqueness of the true flow map for MeanFlow and improved MeanFlow, derives memory-saving slim ESD and slim LSD objectives, and establishes idealized convergence under functional semi-gradient flow. The slim objectives avoid second-order derivatives and roughly halve peak training memory, but their empirical quality is mixed across objectives and sampling budgets.

## Research Question

When does a stop-gradient objective have well-defined stationary points and convergent optimization dynamics, and can those conditions guide better flow-map training objectives?

## Motivation

A stop-gradient is the identity in the forward pass but blocks differentiation in the backward pass. The resulting semi-gradient need not be the gradient of any scalar objective, so ordinary descent arguments do not apply. This matters for self-referential objectives in reinforcement learning, representation learning, diffusion sampling, and flow-map methods such as [[concepts/average-velocity-fields|MeanFlow]]. Existing flow-map work had characterized some unstopped losses but left the stationary points or convergence of practical stop-gradient variants unresolved.

## Contributions

- Formalizes stop-gradient first variations in function space and defines their semi-gradients, stationary points, and continuous-time semi-gradient flow.
- Introduces the Stopgrad Regression Principle: when the learned function occurs once outside a stopped affine target, stationarity is equivalent to a conditional-mean fixed-point equation.
- Proves that the true flow map is the unique stationary point for MeanFlow and improved MeanFlow; removing MeanFlow's stop-gradient generally destroys stationarity at the true map.
- Derives slim Eulerian and Lagrangian self-distillation objectives whose stop-gradient placement gives known stationary points without second-order derivatives.
- Gives closed-form functional semi-gradient-flow trajectories for Eulerian and Lagrangian objectives and exponential convergence bounds under additional regularity assumptions.
- Evaluates slim ESD and slim LSD on CIFAR-10 and ImageNet and measures their peak training memory.

## Method

For inputs $x$, labels $y$, and a target operator affine in the label,

$$
T[f,y](x)=P[f](x)+Q[f](x)y+R(x)y,
$$

the paper studies

$$
\mathcal L[f]=\frac12\mathbb E\left[\left\|f(x)-\operatorname{SG}\{T[f,y](x)\}\right\|^2\right].
$$

Only the occurrence of $f$ outside the stopped target is varied. The semi-gradient is therefore the regression residual against the conditional target,

$$
g[f](x)=f(x)-T[f,\mathbb E[y\mid x]](x),
$$

so stationary points solve a fixed-point equation. If label noise is additive, an attainable minimizer of the ordinary regression loss is the unique stationary point; objectives outside that condition require separate uniqueness proofs.

For flow maps $F(t,u,x)=x+(u-t)f(t,u,x)$, the paper applies this template to MeanFlow, improved MeanFlow, Eulerian self-distillation (ESD), and Lagrangian self-distillation (LSD). The slim variants move all derivative-bearing terms inside stopped targets, avoiding parameter differentiation through input derivatives. Uniqueness follows by reducing each fixed-point equation to the relevant transport PDE or flow ODE.

The convergence analysis is explicitly functional and continuous-time. Under perfect flow-matching initialization where required, Eulerian and Lagrangian semi-gradient flows admit closed-form compositions of the initial map $F_0$ and true map $F^*$, with an intermediate hand-off time approaching the target endpoint exponentially in optimization time. The authors verify these expressions numerically on discretized affine flows.

## Experiments

**CIFAR-10 (Table 2).** Models train for 200,000 steps and report the best EMA checkpoint for each sampling budget over three seeds. Slim ESD improves over original-stopgrad ESD at every budget, reaching FID 25.4, 4.2, 3.1, and 2.8 at 1, 10, 50, and 100 steps. Slim LSD is close to original-stopgrad LSD at 10-100 steps (3.4, 3.0, and 2.7 versus 3.3, 2.8, and 2.7), but is substantially worse at one step (47.6 versus 25.3).

Peak memory falls from 64.6 to 31.2 GiB for ESD versus slim ESD and from 60.8 to 26.9 GiB for LSD versus slim LSD. Relative to the original stop-gradient variants, the slim versions use about 1.5 times less memory.

**ImageNet (Table 3).** In shorter latent-space ablation runs with a 90M-parameter B4 model, flow-matching pretraining alone has one-step FID 315. Slim ESD is the best ESD variant at 128.7 FID, compared with 195.1 for original-stopgrad ESD and 287.6 for unstopped ESD. Slim LSD reaches 159.5, close to original-stopgrad LSD at 152.8 and much better than unstopped LSD at 390.8. These are 40-epoch ablation runs rather than headline large-scale generation results.

**Convergence simulation.** Finite-difference simulations in one to five spatial dimensions agree with the paper's closed-form semi-gradient-flow trajectories for smooth affine velocity fields and constructed initial-map perturbations.

## Limitations

- The theory works in an infinite-capacity function space with continuous optimization; it does not establish convergence for finite neural networks trained by stochastic gradient descent.
- Convergence of improved MeanFlow, slim ESD, and slim LSD assumes perfect flow-matching pretraining, an idealization not met exactly in practice.
- The slim objectives do not uniformly improve generation quality: slim LSD loses substantially to the original stop-gradient objective for one-step CIFAR-10 sampling.
- ImageNet experiments are short ablation-style runs, and the supplied source does not provide a publication year, venue, DOI, or arXiv identifier.
- Known stationary points and idealized convergence do not by themselves establish robustness to approximation error, minibatch noise, or imperfect optimization.

## Related Concepts

- [[concepts/stopgrad-regression-principle|Stopgrad Regression Principle]]: the paper's fixed-point template for stopped regression objectives.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: the MeanFlow parameterization analyzed for stationarity and convergence.
- [[concepts/flow-matching|Flow Matching]]: supplies instantaneous velocity supervision and the diagonal initialization assumed by several convergence results.
- [[concepts/diffusion-models|Diffusion Models]]: the broader generative setting motivating few-step flow-map learning.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: introduces the stopped MeanFlow objective analyzed here.
- Boffi, Albergo, and Vanden-Eijnden (2024), "Flow Map Matching": introduces the ESD and LSD families whose stop-gradient placement is revised here.
- Geng et al. (2025), "Improved Mean Flows: On the Challenges of Fastforward Generative Models": introduces improved MeanFlow, whose stationary point and conditional convergence are characterized here.
- Sutton and Barto (2018), "Reinforcement Learning: An Introduction": supplies the semi-gradient terminology and TD-learning context generalized by the paper.

[[index|Library home]]
