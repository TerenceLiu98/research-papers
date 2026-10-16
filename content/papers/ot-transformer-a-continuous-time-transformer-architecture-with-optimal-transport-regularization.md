---
title: "OT-Transformer: A Continuous-time Transformer Architecture with Optimal Transport Regularization"
type: paper
authors:
  - Kelvin Kan
  - Xingjian Li
  - Stanley Osher
year: null
source_job_id: 0ef000c6-3326-420a-82f2-4aa9ba55793f
tags:
  - transformers
  - neural-differential-equations
  - optimal-transport
  - regularization
---

## TL;DR

OT-Transformer uses a composition of transformer blocks as the vector field of a single hidden-state ODE and penalizes integrated squared velocity. Across four classification tasks, the regularized models improve accuracy over the tested discrete baselines with fewer transformer parameters. The penalty prevents observed gradient explosions in point-cloud and sentiment experiments, but parameter savings do not establish faster inference, and the optimal-control argument does not prove uniqueness of neural-network training solutions.

## Research Question

Can a single continuous-time transformer dynamical system, trained with a transport-cost penalty, improve numerical stability, generalization, and parameter efficiency relative to discrete transformers and blockwise neural ODE transformers?

## Motivation

Residual connections motivate interpreting network depth as artificial time. However, endpoint supervision alone leaves hidden-state trajectories weakly constrained, allowing dynamics that are difficult to integrate. Drawing on transport-regularized continuous normalizing flows, the paper uses [[concepts/optimal-transport|Optimal Transport]] to motivate a penalty on motion along these trajectories.

## Contributions

- A single ODE whose vector field composes transformer blocks, contrasting with the N-ODE Transformer baseline's sequence of separate blockwise dynamical systems (Sections 3-4).
- Dimension-normalized [[concepts/kinetic-energy-regularization|Kinetic-Energy Regularization]] computed alongside numerical integration.
- An optimal-control motivation through a quadratic Hamiltonian and a target-conditioned Hamilton-Jacobi-Bellman equation.
- Comparisons and regularization ablations for point clouds, images, and sentiment, plus an MNIST inference-step experiment.

## Method

Input embeddings initialize $X(0)\in\mathbb R^{d\times n}$, where $d$ is hidden dimension and $n$ is token count. A transformer-block composition parameterizes

$$
\dot X(t)=f_\theta(X(t),t),\qquad t\in[0,T],
$$

and an output head reads $X(T)$. Training minimizes

$$
\mathbb E_{Z,y}\left[L(X(T),y;\gamma)
+\frac{\lambda}{2dn}\int_0^T\|f_\theta(X(t),t)\|_F^2\,dt\right].
$$

The second term penalizes integrated squared speed, encouraging more regular trajectories. Experiments use discretize-then-optimize training with explicit Euler and $T=1$: eight steps for ModelNet40 and IMDb, twenty for both image tasks. The vector-field parameters are reused across integration steps; reduced hidden dimensions or block counts produce the parameter savings.

For unrestricted controls and $\lambda>0$, the paper's Hamiltonian is

$$
H(X,P)=\sup_f\left[-\langle P,f\rangle-\frac{\lambda}{2dn}\|f\|_F^2\right],
\qquad f^*=-\frac{dn}{\lambda}P.
$$

The target-conditioned value function gives $P=\nabla_X\Phi_y$. Without the quadratic cost, the supremum is unbounded for nonzero $P$. This motivates regularizing the idealized control problem; it is not a proof that finite transformer parameterizations have unique optimizers or universally stable training.

The authors state that one Euler step recovers the discrete architecture. The supplied equations write $f$ as the full block composition, while Euler adds $X(0)$ to $f(X(0))$. The referenced implementation footnotes are absent from the supplied Markdown, so the exact residual convention needed for that identity is unresolved here.

## Experiments

Tables 1-4 report mean test accuracy and standard deviation. ModelNet40, MNIST, and IMDb use best test accuracy over five trials; the two-class image experiment uses final-epoch accuracy over three trials. Parameter counts are the reported counts, with Tables 1 and 3 explicitly counting transformer blocks rather than the complete model.

| Task | Discrete baseline | Regularized OT-Transformer | Parameters, baseline to OT |
| --- | --- | --- | --- |
| ModelNet40 point clouds | 87.4% +/- 0.45% | 89.9% +/- 0.42% | 0.86M to 0.65M |
| MNIST | 93.0% +/- 0.69% | 97.1% +/- 0.16% | 93k to 18k |
| Cats and dogs, final epoch | 77.6% +/- 0.86% | 79.0% +/- 0.31% | 1.77M to 1.48M |
| IMDb sentiment | 83.9% +/- 0.26% | 84.6% +/- 0.55% | 4.74M to 2.37M |

**Regularization ablations.** Unregularized continuous-time models produce NaNs from gradient explosion on ModelNet40 and IMDb. IMDb rows labeled "unregularized" actually use $\lambda=0.01$ to complete training: OT achieves 82.7% versus 84.6% with $\lambda=0.5$. On MNIST, the unregularized OT model reaches 96.8%, compared with 97.1% after regularization. On the two-class image task, final accuracy rises from 78.2% to 79.0%. Appendix B uses OT penalty weights of 1, 0.01, 0.01, and 0.5 for the four tasks respectively.

**Architecture comparison.** Regularized N-ODE Transformer reaches 87.5% on ModelNet40, 75.6% final accuracy on the two-class image task, and 83.9% on IMDb. Its formulation coincides with OT-Transformer in the single-block MNIST setup. For the two-class task, best-epoch accuracies are much closer than final-epoch results: 79.3% for the discrete baseline and 79.5% for OT (Appendix B, Table 8).

**Inference steps.** On MNIST, reducing Euler steps from twenty to eight lowers regularized accuracy from 97.1% to 96.6%. Four steps yield 87.1%; one step yields 17.9% (Appendix A, Table 5). Thus moderate step reduction works in this experiment, while aggressive reduction substantially degrades predictions.

## Limitations

- Evidence covers four classification setups with small transformers, not large language model pretraining or sequence generation. No wall-clock or measured peak-memory comparison establishes an overall computational advantage.
- Most headline results select the best test accuracy over training. They should be distinguished from final-epoch performance and validation-selected checkpoint evaluation.
- Trial variability does not improve uniformly: IMDb standard deviation increases from 0.26% for the baseline to 0.55% for OT despite higher mean accuracy.
- The optimal-control analysis concerns unrestricted, target-conditioned dynamics. Translating it into uniqueness or well-posedness guarantees for a shared parameterized transformer requires additional assumptions.
- The source omits publication year, venue, DOI, and this paper's arXiv identifier; `year` remains null. It ends at the caption for Table 9 without its data, and several referenced footnotes are missing. Earlier tables support the results summarized above.

## Related Concepts

- [[concepts/kinetic-energy-regularization|Kinetic-Energy Regularization]]: constrains the velocity of learned hidden-state trajectories.
- [[concepts/optimal-transport|Optimal Transport]]: motivates the trajectory cost.
- [[concepts/normalizing-flows|Normalizing Flows]]: continuous flow regularization provides methodological background; OT-Transformer itself is trained for supervised prediction.

## Related Papers

- Baier-Reinio and De Sterck (2020), "N-ODE Transformer: A Depth-Adaptive Variant of the Transformer Using Neural Ordinary Differential Equations," arXiv:2010.11358: the direct blockwise continuous-time baseline.
- Chen et al. (2018), "Neural Ordinary Differential Equations": foundational continuous-depth formulation.
- Finlay et al. (2020), "How to Train Your Neural ODE: The World of Jacobian and Kinetic Regularization": prior kinetic regularization cited by the paper.
- Onken et al. (2021), "OT-Flow: Fast and Accurate Continuous Normalizing Flows via Optimal Transport": transport-regularized flow background.
- Sander et al. (2022), "Sinkformers: Transformers with Doubly Stochastic Attention": source of the experimental code and baseline configurations.

[[index|Library home]]
