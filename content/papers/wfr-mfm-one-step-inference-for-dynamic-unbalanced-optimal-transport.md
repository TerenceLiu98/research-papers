---
title: "WFR-MFM: One-Step Inference for Dynamic Unbalanced Optimal Transport"
type: paper
authors:
  - Xinyu Wang
  - Ruoyu Wang
  - Qiangwei Peng
  - Peijie Zhou
  - Tiejun Li
year: null
source_job_id: 0874c2ff-ed94-4b44-a240-98965deebf2e
tags:
  - unbalanced-optimal-transport
  - flow-matching
  - one-step-inference
  - single-cell-dynamics
---

## TL;DR

WFR-MFM learns finite-interval mean velocity and mean mass-growth fields for dynamics in which both positions and mass change. Specializing this construction to Wasserstein-Fisher-Rao geometry gives direct one-step inference without integrating an ODE trajectory. Across synthetic and real single-cell datasets, the method is reported to be tens to thousands of times faster than WFR-FM inference while generally retaining competitive distribution and mass prediction; more inference steps can recover accuracy when one step is too coarse.

## Research Question

Can [[concepts/average-velocity-fields|Average Velocity Fields]] be extended to jointly represent transport and mass growth, enabling fast inference for dynamic [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]] without trajectory-level simulation?

## Motivation

Snapshot single-cell RNA sequencing observes different cells at discrete times rather than individual trajectories. Dynamic unbalanced transport can model both movement through expression space and population changes from proliferation or apoptosis, but existing neural methods simulate coupled position and mass ODEs at inference. That cost becomes restrictive when thousands of perturbation conditions must be evaluated. Standard one-step flow models address transport under mass preservation and therefore do not directly solve this problem.

## Contributions

- Defines mean velocity and mean mass-growth fields over arbitrary time intervals and derives identities connecting them to instantaneous transport and growth fields.
- Introduces a conditional unbalanced mean-flow matching objective whose gradient agrees with the corresponding unconditional objective up to a parameter-independent constant under the paper's assumptions.
- Specializes the framework to Wasserstein-Fisher-Rao geometry through optimal entropy transport couplings, producing WFR-MFM for direct state-to-state evolution along dynamic unbalanced-transport paths.
- Supports one-step or multi-step inference from the same trained fields, yielding a tunable speed-accuracy trade-off without retraining.
- Extends the fields with perturbation conditioning and evaluates generalization from 100 observed synthetic perturbations to 5,000 unseen conditions.

## Method

For a trajectory with instantaneous velocity $u_\tau$ and mass-growth rate $g_\tau$, the method represents their trajectory averages over $t<T$ as

$$
v(x,t,T)=\frac{1}{T-t}\int_t^T u_\tau(x_\tau)\,d\tau,
\qquad
h(x,t,T)=\frac{1}{T-t}\int_t^T g_\tau(x_\tau)\,d\tau.
$$

These fields directly update position and mass:

$$
x_T=x_t+(T-t)v(x_t,t,T),
\qquad
m_T=m_t\exp((T-t)h(x_t,t,T)).
$$

Differentiating the finite-interval identities relates $v$ and $h$ to the instantaneous fields and total derivatives along trajectories. Neural fields are trained against stopped targets built from these identities, using Jacobian-vector products rather than simulated target trajectories. The conditional formulation samples endpoint pairs from a coupling and regresses both fields; choosing the coupling from the Wasserstein-Fisher-Rao optimal entropy transport problem yields WFR-MFM. For multiple observed times, couplings are computed between consecutive snapshots and training examples from the intervals are batched together. At inference, one interval gives the fastest prediction, while partitioning time applies the same learned fields repeatedly.

## Experiments

The study covers three synthetic datasets (Gene, Dyngen, and a 1,000-dimensional Gaussian mixture), four real multi-time single-cell datasets (EMT, embryoid body, CITE-seq, and mouse hematopoiesis), and a synthetic perturbation benchmark. Evaluation uses 1-Wasserstein distance for distribution matching, relative mass error (RME), runtime, training cost, and memory.

- Against WFR-FM with adaptive Dormand-Prince integration, reported per-inference speedups range from 38x on CITE-seq to 2,965x on the 50-dimensional embryoid-body data. Against 100-step Euler inference, speedups range from 94x to 124x across the reported datasets.
- On the synthetic Gene, Dyngen, and Gaussian datasets, WFR-MFM ranks first or second on the reported distribution and mass metrics. Its mean 1-Wasserstein/RME pairs are 0.021/0.003, 0.176/0.023, and 2.233/0.001, respectively.
- Results are not uniformly best. On 10-dimensional EMT, WFR-FM has lower 1-Wasserstein error at every reported time. On CITE-seq, one-step WFR-MFM is suboptimal, while ten-step inference substantially improves both distribution and mass estimates.
- Increasing inference steps generally lowers and stabilizes error while runtime grows approximately linearly, supporting a controllable trade-off rather than universal sufficiency of one-step prediction.
- On the synthetic perturbation task, one conditioned model is trained on 100 of 5,100 conditions. It processes 5,000 unseen conditions for 10,000 cells in 6.55 seconds and reports $W_1=0.115$ and RME $=0.069$; the paper estimates WFR-FM would require roughly 2,000 seconds by extrapolating a representative condition's runtime.

## Limitations

- The large-scale perturbation study is synthetic. Practical utility on large experimental perturbation datasets remains unvalidated.
- One-step inference can be too coarse for complex dynamics, as shown by the CITE-seq results; improved accuracy then requires multiple evaluations.
- Recent refinements intended to improve MeanFlow stability and inference quality are not incorporated.
- The WFR specialization depends on a geometry with tractable Dirac-to-Dirac flows; extension to other unbalanced geometries is proposed but not demonstrated.
- Performance depends on dataset-specific choices of the WFR mass penalty, cross-time sampling probability, growth-loss weight, preprocessing, and sometimes inference-step count.
- The supplied manuscript states no publication year, venue, DOI, or identifier for this paper, so those fields are not inferred.

## Related Concepts

- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]
- [[concepts/average-velocity-fields|Average Velocity Fields]]
- [[concepts/flow-matching|Flow Matching]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: supplies the finite-interval velocity perspective that WFR-MFM extends with mass-growth dynamics.
- Peng et al. (2026), "WFR-FM: Simulation-free Dynamic Unbalanced Optimal Transport": the trajectory-based WFR flow-matching baseline and geometric foundation used by WFR-MFM.
- Chizat et al. (2018), "An Interpolating Distance between Optimal Transport and Fisher-Rao Metrics": a foundation for the Wasserstein-Fisher-Rao geometry used by the method.
- [[papers/dynamic-landscapes-and-statistical-limits-on-growth-during-cell-fate-specification|Dynamic Landscapes and Statistical Limits on Growth during Cell Fate Specification]]: a related library treatment of transport coupled to population growth in cell-fate dynamics.

Source: supplied parsed Markdown for Cognitio job `0874c2ff-ed94-4b44-a240-98965deebf2e`.

[[index|Library home]]
