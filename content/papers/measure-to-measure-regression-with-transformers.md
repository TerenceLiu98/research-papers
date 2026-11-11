---
title: Measure-to-Measure Regression with Transformers
type: paper
authors:
  - Matthew Vandergrift
  - Martha White
  - Yury Polyanskiy
  - Philippe Rigollet
  - Lazar Atanackovic
year: 2026
tags:
  - measure-to-measure-regression
  - transformers
  - flow-matching
  - optimal-transport
  - single-cell-modeling
---

## TL;DR

The paper formalizes [[concepts/measure-to-measure-regression|Measure-to-Measure Regression]] and presents two transformer-based estimators: a static one-step pushforward and a dynamic measure-dependent velocity field trained by Transformer Flow Matching (M2M-TFM). Across synthetic point-cloud transformations, McKean-Vlasov systems, and patient-derived colorectal-cancer organoids, M2M-TFM generally offers the strongest or most balanced generalization to unseen measures.

## Research Question

How can a model learn an expressive and scalable nonlinear operator from paired probability measures $(\mu_i,\nu_i)$ and predict the corresponding output for an unseen input measure?

## Motivation

Many scientific observations are populations rather than independent vectors. In single-cell perturbation experiments, for example, an intervention maps a pretreatment cell population to a post-treatment population, while interactions among cells make a source-independent pointwise map inadequate. Earlier distribution regression often maps a measure to a vector, uses restricted transport families, or targets unpaired distribution alignment rather than a specific operator between paired measures.

## Contributions

- Formalizes nonlinear M2M regression with empirical measures as the observations and generalization to unseen measures as the prediction task.
- Represents the operator as $\mathcal{T}(\mu)=(f_\mu)_\#\mu$, using self-attention to make the particle-level map depend on the full source measure.
- Introduces static transformer pushforwards trained with differentiable distributional losses and a dynamic Transformer Flow Matching method, M2M-TFM.
- Evaluates both approaches on synthetic multi-measure objects, distribution-dependent interacting-particle dynamics, and patient-specific treatment-response prediction.

## Method

### Static M2M maps

A permutation-equivariant transformer $F_\mu^\theta$ acts on all particles of an empirical source measure and produces the one-step pushforward $(F_\mu^\theta)_\#\mu$. The training variants minimize energy distance, maximum mean discrepancy, approximate Wasserstein distances, or mean squared error under an [[concepts/optimal-transport|Optimal Transport]] coupling.

### Transformer Flow Matching

M2M-TFM parameterizes a time-dependent, measure-dependent velocity field with a transformer. For each paired measure and an OT coupling $(x,y)$, training samples the linear path $z_t=(1-t)x+ty$ and regresses the transformer velocity to $y-x$. Unlike Meta Flow Matching, the current empirical measure enters through self-attention throughout the trajectory and no separate distribution-embedding model is required. At inference, Euler integration transports every particle in an unseen source measure from $t=0$ to $t=1$. This extends [[concepts/flow-matching|Flow Matching]] from pointwise conditional generation to paired M2M operator learning.

## Experiments

**Synthetic multi-measure objects.** Models learn to reverse diffusion or kernel-interaction corruptions of 240 oriented letter measures and are tested on unseen letters, numbers, shapes, and multi-object compositions. Averaged over the held-out categories, M2M-TFM achieves $W_1=0.1300$ and energy distance $0.0023$ for diffusion, versus $0.1680/0.0044$ for the strongest static method (M2M-OTMSE). For kernel interactions it reaches $0.0780/0.0020$, versus $0.1334/0.0053$ for M2M-OTMSE.

**McKean-Vlasov systems.** The study covers Kuramoto, FitzHugh-Nagumo, and mean-field Atlas dynamics in 2, 50, and 100 dimensions, training on 70 systems and testing autoregressive rollouts on 10 unseen systems. In the reported 100-dimensional table, M2M-TFM has the lowest $W_1$ and energy distance for all three systems, including $3.229/2.584$ on Kuramoto and $14.710/1.121$ on FitzHugh-Nagumo.

**Patient-derived organoids.** The real-world experiment predicts treatment-response cell populations for three held-out colorectal-cancer patients using 44 biomarkers. M2M-TFM reports $W_1=4.3526$, energy distance $0.4715$, and $r^2=0.9029$. Static variants win the metric matching their respective training loss, while M2M-TFM provides the strongest balanced result and the best reported energy distance and $r^2$.

## Limitations

- The dynamic method uses linear interpolation paths and does not model nonlinear physical paths, stochasticity, birth-death dynamics, or unbalanced mass.
- The paper does not establish statistical or approximation guarantees for learning nonlinear M2M operators through the proposed vector-field objective.
- The organoid evaluation contains only 10 patients, so each held-out-patient model is trained on limited patient-level variation despite many replicate measure pairs.
- Dynamic inference requires ODE integration, whereas the static variants provide one-step prediction.

## Related Concepts

- [[concepts/measure-to-measure-regression|Measure-to-Measure Regression]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]

## Related Papers

- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling over Families of Distributions]]: models a meta-distribution over measures; the present paper instead learns paired source-to-target operators.
- [[papers/the-mean-field-dynamics-of-transformers|The Mean-Field Dynamics of Transformers]]: supplies theoretical context for treating self-attention as distribution-dependent interacting-particle dynamics.

[[index|Library home]]
