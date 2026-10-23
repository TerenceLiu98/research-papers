---
title: "An Optimal Transport Approach to Estimating Causal Effects via Nonlinear Difference-in-Differences"
type: paper
authors:
  - William Torous
  - Florian Gunsilius
  - Philippe Rigollet
year: 2024
tags:
  - causal-inference
  - difference-in-differences
  - optimal-transport
  - distributional-treatment-effects
---

## TL;DR

This paper generalizes changes-in-changes from scalar to multivariate outcomes by representing untreated temporal evolution as an optimal transport map. Under cyclical comonotonicity and support conditions, the map between the control group's pre- and post-intervention distributions identifies the treated group's counterfactual post-intervention distribution. Simulations show why coordinate-wise changes-in-changes can miss dependence, and a Card-Krueger reanalysis estimates more full-time and fewer part-time workers after New Jersey's minimum-wage increase.

## Research Question

Can the full counterfactual distribution of multivariate outcomes be identified and estimated in a two-group, two-period observational design without reducing treatment heterogeneity to an average effect or treating outcome coordinates independently?

## Motivation

Classical difference-in-differences estimates aggregate effects under a mean parallel-trends restriction. Changes-in-changes instead transports an entire scalar distribution through a monotone quantile map, but its coordinate-wise extension does not preserve cross-outcome dependence. That limitation matters when a treatment changes several related outcomes, such as full- and part-time employment, or when joint structure is itself substantively important.

## Contributions

- Recasts scalar changes-in-changes as transport of probability measures and extends it to multivariate outcomes using the unique quadratic-cost Brenier map.
- Gives identifying conditions based on cyclical comonotonicity of the pre- and post-period production functions, together with absolute continuity, convex support, invertibility, and support-overlap assumptions.
- Proposes an empirical estimator that learns the control-group transport map, matches treated pre-period observations to its empirical domain, and pushes them forward to form the untreated counterfactual law.
- Establishes consistency in Wasserstein distance and states a dimension-dependent convergence result under additional compactness and bounded-density-ratio conditions.
- Demonstrates that tensorized changes-in-changes can recover the wrong dependence structure even when its marginal construction appears plausible.

## Method

Let the control outcome laws before and after treatment be $\mu_0$ and $\mu_1$, and let the treated pre-period law be $\mu_0^*$. The paper models the untreated time trend as

$$
p=h_1\circ h_0^{-1}.
$$

If $h_0$ and $h_1$ are cyclically comonotone, then $p$ is cyclically monotone and therefore the unique Brenier map transporting $\mu_0$ to $\mu_1$. Assuming the treated pre-period support lies inside the control pre-period support, the untreated treated-group counterfactual is identified as

$$
\mu_1^\dagger=p_{\#}\mu_0^*.
$$

With sampled data, the estimator solves the discrete quadratic-cost transport problem between the empirical control laws. Because this empirical map is defined only on observed control points, each treated pre-period observation is projected to a nearest control neighbor before the learned map is applied. The resulting pushforward estimates $\mu_1^\dagger$. The implementation uses linear programming from Python Optimal Transport; the paper also discusses entropic regularization and learned-map alternatives.

Identification of the counterfactual distribution does not by itself identify a unit-level treatment map. The paper obtains the latter only under an additional cyclical-comonotonicity condition involving the treated post-period production function. This distinction separates distributional counterfactual identification from stronger individual treatment-effect claims.

## Experiments

### Bivariate Simulation

The first simulation uses 3,000 observations per treatment arm and linear production functions that mix two latent coordinates. The functions satisfy cyclical comonotonicity but not the coordinate-wise monotonicity needed by tensorized changes-in-changes. The optimal transport estimator closely recovers the true joint counterfactual, while tensorized changes-in-changes produces a mirrored dependence structure. Across 20 runs, the reported mean absolute empirical-CDF error is 0.008 for optimal transport and 0.089 for changes-in-changes, with standard deviations 0.002 and 0.003.

### Higher-Dimensional Simulation

The second experiment constructs transport maps as gradients of convex functions and varies dimension from 2 to 100, again with 3,000 units per arm. Over 20 runs and randomly selected two-coordinate planes, optimal transport has lower mean absolute empirical-CDF error at every reported dimension. At dimension 100, the reported errors are 0.0037 for optimal transport and 0.0090 for changes-in-changes. The optimal transport error increases with dimension, which the authors attribute to high-dimensional matching with a fixed sample size.

### Card-Krueger Reanalysis

The application jointly models full- and part-time employment in fast-food restaurants after New Jersey raised its minimum wage from \$4.25 to \$5.05, using eastern Pennsylvania as the control region. After removing 19 restaurants with missing outcomes, the analysis contains 76 control and 315 treated restaurants.

The optimal transport estimates are an average increase of 3.07 full-time employees (95% subsampling interval 2.00 to 4.67) and a decrease of 1.79 part-time employees (-3.43 to -0.33). The corresponding changes-in-changes estimates are 2.61 and -1.52, while classical difference-in-differences estimates 3.45 and -1.00; only the classical part-time interval includes zero. The joint result is interpreted as substitution toward full-time labor with a net gain in full-time-equivalent employment. A supplementary sensitivity exercise over higher-dimensional covariate subsets preserves the signs but is explicitly presented as exploratory.

## Limitations

- Identification depends on strong structural restrictions: time-invariant latent distributions, shared untreated production functions across groups, cyclical comonotonicity, absolute continuity, convex supports, and treated-to-control support inclusion.
- Discrete outcomes generally do not yield the same point identification. The employment application treats reported worker counts as draws from an underlying continuous distribution, despite the observed data being count-like and sometimes fractional.
- Nearest-neighbor extension of an empirical transport map relies on adequate overlap. It can extrapolate poorly when treated observations are far from the control support.
- Statistical rates deteriorate with dimension; the simulations hold sample size fixed while showing increasing optimal transport error.
- The asymptotic distribution of estimated transport maps is not supplied. The application uses subsampling for intervals and tests.
- The Card-Krueger analysis remains observational and inherits the design assumptions of the comparison. The higher-dimensional covariate exercise uses non-data-driven variable selection, substantial complete-case filtering, and a low ratio of observations to covariates.
- Recovering a counterfactual population law is weaker than recovering individual counterfactual outcomes. Unit-level treatment maps require additional assumptions.

## Related Concepts

- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: the scalar framework generalized here to joint outcome laws.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the identifiable multivariate natural-trend map and Wasserstein estimation criterion.

## Related Papers

- Athey and Imbens (2006), "Identification and Inference in Nonlinear Difference-in-Differences Models": introduces the scalar changes-in-changes model generalized by this paper.
- Card and Krueger (1994), "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania": provides the empirical application revisited here.
- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: uses a transported counterfactual law for an omnibus distributional test and accounts for transport-map estimation in calibration.

Source scope: supplied parsed Markdown for job `56d59203-3da9-44ce-96cd-f1bc32268894`. The source provides no DOI or arXiv identifier.

[[index|Library home]]
