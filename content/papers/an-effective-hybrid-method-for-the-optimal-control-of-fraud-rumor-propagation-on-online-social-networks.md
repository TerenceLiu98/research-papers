---
title: "An effective hybrid method for the optimal control of fraud rumor propagation on online social networks"
type: paper
authors:
  - Raheleh Khanduzi
  - Amin Jajarmi
  - Asiyeh Ebrahimzadeh
year: 2025
source_job_id: "579d352e-a79b-4226-bef5-9199ca4bcef4"
tags:
  - misinformation
  - optimal-control
  - numerical-optimization
---

## TL;DR

A five-compartment rumor model combines awareness, information filtering, and punishment controls. Legendre wavelet collocation converts the continuous control problem into nonlinear programming, solved with the Botox optimizer. In the reported simulations, combined control has the lowest average cost-effectiveness ratio; this establishes a model-based comparison, not measured platform effectiveness or optimizer superiority.

## Research Question

How can time-varying awareness, filtering, and punitive interventions be jointly optimized to reduce fraudulent rumor propagation while accounting for intervention costs?

## Motivation

Fraud rumors involve both inadvertent spreaders and deliberate defrauders. Distinguishing these groups allows interventions at different stages of exposure and spreading within [[concepts/misinformation-spreading-models|Misinformation Spreading Models]].

## Contributions

- Formulates bounded controls for three transitions in an SEIR-type rumor model.
- Combines Legendre wavelet collocation, Gauss–Legendre quadrature, and a population-based metaheuristic to solve the resulting optimization problem.
- Compares single and combined interventions using simulated trajectories and average cost-effectiveness ratios.

## Method

The states are unaware individuals $I$, exposed nonspreaders $E$, inadvertent spreaders $S_M$, deliberate defrauders $S_D$, and stiflers $R$. Exposure occurs at rate $\alpha I(S_M+S_D)$. Exposed individuals enter the two spreading classes at rates $l_1E$ and $l_2E$; inadvertent spreaders become deliberate defrauders at rate $\pi S_M$.

Controls $u,v,w\in[0,1]$ move individuals into $R$ through flows $uI$, $vE$, and $wS_D$, respectively. The objective penalizes terminal and accumulated $S_D+E-R$, plus quadratic control effort with weights 6000, 3000, and 2000. Thus increasing stiflers is explicitly rewarded.

Time is normalized to $[0,1]$. States and controls are expanded in 64 Legendre wavelet basis functions ($k=5$, $M=4$), with a differentiation matrix enforcing dynamics at collocation points. Gauss–Legendre quadrature approximates the objective. The Botox optimizer randomly initializes candidates, updates selected coordinates toward the population mean in the first half of iterations and toward the best candidate later, and retains improving moves. Its underlying algorithm is attributed to Hubalovska, Hubalovsky, and Trojovsky (2024), reference 26.

## Experiments

MATLAB simulations use literature-derived parameters rather than newly collected social-media observations. Table 1 sets $\Omega=0.3$, $\alpha=0.0005$, $l_1=0.55$, $l_2=0.2$, $k_1=0.08$, $k_2=0.002$, $\pi=0.02$, $\mu=0.000005$, and $\gamma=0.0003$.

Figures 2–5 compare no intervention, each single control, and combined control. The authors report reduced exposed and spreading populations and increased stiflers. Table 2 reports:

| Strategy | Total cost (TC) | Averted burden (TA) | ACER |
| --- | ---: | ---: | ---: |
| Awareness $u$ | 7.3398e14 | 1.7995e4 | 4.0788e10 |
| Filtering $v$ | 2.5857e14 | 1.2954e3 | 1.9961e11 |
| Punishment $w$ | 1.8288e14 | 2.8879e3 | 6.3325e10 |
| Combined | 6.8630e14 | 1.8486e4 | 3.7125e10 |

Here $TC=\int_0^T(W_1uI+W_2vE+W_3wS_D)\,dt$ along controlled trajectories. TA integrates the reduction in $E+S_M+S_D$ relative to no control, so it measures person-time averted rather than unique cases. ACER is TC/TA. Combined control has the lowest ratio, while punishment alone has the lowest total cost. This cost calculation differs from the quadratic effort penalty used during optimization.

## Limitations

- Deterministic, literature-derived parameters do not establish effectiveness under uncertain user behavior or changing platform conditions. Robust, stochastic, and fuzzy extensions are proposed as future work.
- No head-to-head optimizer benchmark, repeated-run uncertainty, runtime comparison, or convergence plot substantiates claims of numerical superiority. The approximation bound assumes smooth functions and does not certify global optimization.
- The supplied transcription omits $uI$ from the discretized stifler equations (33, 38), although it appears in the original equation (5), and omits the punishment term from equation (37). These may be source or extraction errors and need resolution for reproduction.
- The optimizer is described with three decision coordinates despite the wavelet coefficient representation. The mapping to the full constrained nonlinear program is insufficiently explicit.
- The large reported cost scale is reproduced as published; sensitivity of the cost-effectiveness ranking to weights and parameter uncertainty is not demonstrated.

## Related Concepts

- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: compartment transitions distinguish exposure, inadvertent spreading, intentional fraud, and cessation.

## Related Papers

- [[papers/structure-aware-optimal-intervention-for-rumor-dynamics-on-networks|Structure-aware optimal intervention for rumor dynamics on networks]]: a thematic library connection using node-specific controls and an instantaneous resource budget, whereas this paper optimizes aggregate compartment transitions.
- Belhdid, Balatif, and Khajji (2024), “Optimal control and cost-effectiveness analysis of scam rumor propagation over social networks”: reference 27 supplies the closely related modeling background.
