---
title: "Triple Changes Estimator for Targeted Policies"
type: paper
authors:
  - Sina Akbari
  - Negar Kiyavash
year: null
tags:
  - causal-inference
  - triple-differences
  - changes-in-changes
  - distributional-treatment-effects
  - optimal-transport
---

## TL;DR

The paper introduces the triple changes estimator, a distributional analogue of [[concepts/triple-differences|Triple Differences]] for targeted policies. It identifies the untreated post-treatment outcome distribution for the eligible population in a treated state by assuming that the nonlinear drift between eligible and ineligible groups is the same across treated and comparison states. Unlike an additive triple-difference contrast, the construction is invariant to monotone outcome transformations and can recover distributional treatment effects. The paper also gives partial-identification results, an asymptotically normal estimator of the average treatment effect on the treated (ATT), and an [[concepts/optimal-transport|Optimal Transport]] extension to multivariate outcomes.

## Research Question

Can the counterfactual outcome distribution for a policy-targeted population be identified when the no-drift restriction behind changes-in-changes is implausible, but eligible-ineligible differences in untreated evolution are comparable across two populations?

## Motivation

Difference-in-differences identifies an average effect under parallel trends, while triple differences can remove a shared bias by subtracting a second DiD contrast. Both approaches are tied to additive comparisons and primarily target mean effects. Changes-in-changes instead transports outcome ranks between periods and identifies an entire counterfactual distribution, but its standard formulation requires the untreated time-evolution map to be identical across treated and control groups. That restriction is especially questionable for policies aimed at populations, such as low-income households, whose untreated outcomes may evolve differently from those of ineligible groups.

The paper combines the extra comparison dimension of triple differences with the nonlinear distribution mappings of [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]. Its key idea is to use a second state or population to learn the eligible-ineligible drift rather than require that drift to vanish.

## Contributions

- Defines a triple changes design with two states, eligible and ineligible cohorts, and pre- and post-treatment periods, and identifies the missing untreated post-period distribution for eligible units in the treated state.
- Replaces the changes-in-changes no-drift restriction with state-independent drift: the composition of eligible and ineligible temporal maps may be nonidentity, but must agree across states.
- Derives partial-identification bounds when production functions are only approximately monotone, latent distributions are only approximately time invariant, or both assumptions are relaxed.
- Shows that stronger unit-level time invariance identifies the joint distribution of treated and untreated potential outcomes, not only marginal causal contrasts.
- Constructs an empirical-CDF plug-in estimator for the ATT and establishes root-sample-size consistency and asymptotic normality under smooth, bounded-density conditions.
- Generalizes identification to multivariate outcomes through Brenier maps under a co-cyclical-monotonicity condition.

## Method

Let $S\in\{s_0,s_1\}$ index a comparison and treated state, $D\in\{d_0,d_1\}$ index policy ineligibility and eligibility, and $t_0<t_1$ index time. Only the $(s_1,d_1)$ group is treated after $t_0$. Within each state-cohort cell, a latent variable and a strictly increasing, group-specific production function generate untreated potential outcomes. Time invariance of the latent distribution and common outcome support identify a monotone temporal map

$$
T_{s,d}=F^{-1}_{Y^0(t_1)\mid s,d}\circ F_{Y^0(t_0)\mid s,d}.
$$

Standard changes-in-changes would equate the eligible and ineligible maps. Triple changes instead assumes equality across states of the relative drift

$$
T^*=T_{s_0,d_1}\circ T^{-1}_{s_0,d_0}
=T_{s_1,d_1}\circ T^{-1}_{s_1,d_0}.
$$

This identifies the missing counterfactual CDF by composing the observed pre-period eligible distribution in the treated state with three observable temporal maps. Because the construction uses CDFs and quantile functions, it preserves nonlinear distributional information and is invariant to monotone changes of scale.

For inference on the ATT, the estimator substitutes empirical CDFs and empirical quantile functions into the identifying composition and averages the imputed untreated outcomes. For vector outcomes, the paper replaces scalar quantile maps with unique quadratic-cost Brenier maps; identification then requires the relevant production functions to be co-cyclically monotone.

## Experiments

The synthetic evaluation compares DiD, triple differences (DDD), changes-in-changes (CiC), and triple changes (CCC), using both empirical-distribution and correctly specified maximum-likelihood versions where applicable.

- In a linear Gaussian design, DiD and CiC retain nonvanishing relative bias, whereas DDD and CCC approach zero bias as sample size grows. DDD has slightly lower small-sample bias because it uses sample means rather than estimated distribution maps.
- In a nonlinear design with exponential production functions in two cells, DDD is biased while both CCC implementations remain asymptotically unbiased. The empirical CCC estimator is more biased than its model-based version at small sample sizes.
- A supplementary misspecification experiment samples latent variables from exponential distributions while fitting Gaussian models, illustrating the role of distribution-model misspecification.

The application uses 2016 and 2017 National Survey of Children's Health data to study Louisiana's Medicaid expansion, with Mississippi and Texas as nonexpansion comparisons. Children at or below 100% of the federal poverty level form the eligible group, children at or above 140% form the ineligible group, and observations between the thresholds are excluded. Across 1,000 bootstrap samples, DDD estimates an increase of 0.170 annual preventive visits with a 90% interval of $[-0.004,0.344]$; CCC estimates 0.145 with a 90% interval of $[-0.01,0.331]$. Both intervals include zero, so the application is suggestive rather than conventionally conclusive.

## Limitations

- Point identification depends on state-independent drift, strict monotonicity, time invariance of the latent distribution, consistency, and common outcome-support conditions. The second comparison population makes no-drift unnecessary but does not make the replacement restriction testable.
- The partial-identification bounds quantify specified violations through epsilon-monotonicity and Kolmogorov-distance time instability; they do not cover arbitrary departures from the model.
- Identification of joint potential outcomes requires the stronger assumption that the latent variable itself remains fixed over time with no loss to follow-up, effectively imposing rank invariance.
- The ATT asymptotic theory assumes continuous outcomes on a shared bounded domain, smooth densities bounded above and away from zero, positive cell probabilities, and independent sampling. The Medicaid outcome is a visit-frequency measure, so the application does not literally match all continuity assumptions used in that theorem.
- Multivariate identification requires co-cyclical monotonicity and suitable support conditions. The paper provides the identification representation but not a corresponding multivariate finite-sample estimator or empirical study.
- The Medicaid estimates are imprecise, use only two years and a small set of neighboring comparison states, and rely on the cross-state drift assumption. The reported bootstrap intervals both cross zero.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/triple-differences|Triple Differences]]
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/causal-overlap|Causal Overlap]]

## Related Papers

- [[papers/better-understanding-triple-differences-estimators|Better Understanding Triple Differences Estimators]]: develops covariate-adjusted and staggered DDD identification for mean effects; triple changes instead targets counterfactual distributions in a two-period, two-state design.
- [[papers/an-optimal-transport-approach-to-estimating-causal-effects-via-nonlinear-difference-in-differences|An Optimal Transport Approach to Estimating Causal Effects via Nonlinear Difference-in-Differences]]: uses Brenier maps to extend changes-in-changes to multivariate outcomes without the additional state dimension used here.
- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: uses transport maps for covariate-distribution adjustment under limited overlap, whereas this paper transports outcome distributions across time and groups.

[[index|Library home]]
