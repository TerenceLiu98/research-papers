---
title: A Primer on Optimal Transport for Causal Inference with Observational Data
type: paper
authors:
  - Florian Gunsilius
year: null
tags:
  - causal-inference
  - optimal-transport
  - observational-data
  - identification
  - treatment-effect-heterogeneity
---

## TL;DR

This review argues that [[concepts/optimal-transport|optimal transport]] is not merely a computational technique for causal inference: transport maps already encode central identifying assumptions in nonseparable structural models. It develops this connection through monotone rearrangement, instrumental variables, nonlinear difference-in-differences, distributional synthetic controls, and matching, emphasizing both heterogeneous individual effects and counterfactual changes to whole outcome distributions.

## Research Question

How does optimal transport underlie the identification of causal effects from observational data, and how can making that structure explicit extend established causal methods beyond average effects, scalar outcomes, and exact covariate overlap?

## Motivation

Observational comparisons generally confound treatment effects with selection on unobserved characteristics. Classical methods address this through assumptions tailored to a design, but often target only average effects. The review uses transport language to expose the common structure behind several such assumptions and to distinguish two richer goals: identifying heterogeneity indexed by latent ranks and identifying how an entire system-level outcome distribution changes under a counterfactual intervention.

## Contributions

- Shows that monotonicity in a scalar latent variable identifies a structural mechanism as the monotone rearrangement between latent and outcome distributions. The identifying restriction is order preservation, not mass preservation alone.
- Relates this construction to potential outcomes, structural nested distribution models, comonotonic couplings, and Frechet-Hoeffding bounds. Marginal potential-outcome laws do not by themselves identify their joint law or [[concepts/individual-treatment-effects|individual treatment effects]].
- Interprets the instrumental-variable control-function rank $F_{X\mid Z}(X)$ as a transport construction and generalizes it through measure-preserving isomorphisms, while explaining why the argument does not transfer straightforwardly to multivariate first stages.
- Connects identification with discrete instruments to fixed-point dynamics of inverse Brenier maps. In multiple dimensions, a fixed set supplies normalization anchors and rank-map orbits propagate identification under strong regularity and coverage conditions.
- Casts partial identification in instrumental-variable models as optimization over counterfactual path measures subject to observed-law constraints, linking causal bounds to stochastic transport and Schrodinger-bridge regularization.
- Unifies changes-in-changes with monotone transport and explains its multivariate extension: cyclically comonotone production functions make the untreated temporal trend a unique Brenier map.
- Presents distributional synthetic controls as Wasserstein barycentric replication of treated-unit distributions, and motivates [[concepts/unbalanced-optimal-transport|unbalanced optimal transport]] for matching when exact [[concepts/causal-overlap|overlap]] fails.

## Method

The paper is a selective theoretical review organized around the structural model $Y=g(X,U)$. In the scalar exogenous case, continuity and strict monotonicity in $U$ yield

$$
g(x,u)=F^{-1}_{Y\mid X=x}(F_U(u)),
$$

the unique order-preserving transport map. The review then tracks how related transport restrictions enter several observational designs:

- **Instrumental variables:** Control variables recover averages by conditioning on first-stage ranks, subject to a large-support condition. With discrete instruments, alternating distributional maps create fixed-point iterations that can identify the full heterogeneous mechanism. Without structural assumptions, bounds arise from a linear program over counterfactual path-space measures. Wasserstein distributionally robust optimization supplies a separate robustness route for linear IV models.
- **Difference-in-differences:** [[concepts/distributional-difference-in-differences|Changes-in-changes]] transports the control group's untreated temporal evolution onto the treated group's pre-treatment distribution. For multivariate outcomes, cyclic comonotonicity identifies the natural trend as a Brenier map, provided absolute continuity, convex-support, invertibility, and support-inclusion conditions hold.
- **Synthetic controls:** Classical weighted averages are lifted from scalar aggregate outcomes to outcome distributions. In one dimension, convex combinations of quantile functions implement Wasserstein barycenters; in multiple dimensions, [[concepts/wasserstein-barycenters|Wasserstein barycenters]] or tangent-space approximations replace ordinary averaging. Identification requires the pre-treatment weights to remain optimal after treatment, which imposes an isometry restriction on the distributional dynamics.
- **Matching:** Balanced transport forces every treated and control observation to participate, which can induce bias under support mismatch. Unbalanced transport relaxes marginal constraints so poorly matched observations may receive no transported mass.

## Experiments

The paper reports no original benchmark or empirical study; it synthesizes theoretical results and selected applications from the literature. Illustrative evidence includes prior changes-in-changes analyses of minimum-wage effects, where distributional methods distinguish positive effects for smaller restaurants from negative effects for larger ones, and a multivariate extension that separates positive full-time from negative part-time employment effects. It also cites simulations from prior work in which unbalanced transport improves matching under overlap violations. These examples illustrate the reviewed methods rather than constitute new validation by this paper.

## Limitations

- The review is explicitly selective and weighted toward the author's research area; it does not attempt comprehensive coverage of all causal uses of transport.
- Many identification results rely on strong, design-specific assumptions: monotonicity or cyclic comonotonicity, instrument validity, large support, time-invariant latent distributions, common production functions, support inclusion, absolute continuity, convexity, and transport-weight stability.
- Monotone rearrangement fixes latent ranks and therefore represents only one coupling among many compatible with observed marginals. Changing the transport cost changes the admissible causal mechanism.
- Multivariate extensions are constrained by dimension matching, transport-map existence and uniqueness, regularity of densities and supports, and compositions of Brenier maps not generally remaining Brenier maps.
- Several proposed connections remain open research programs. These include efficient path-space partial-identification solvers, full convergence and stability theory for Brenier-map dynamics, inference for distributional synthetic controls, and data-dependent penalty theory for unbalanced matching.
- The paper primarily concerns identification. It does not provide a unified estimation or inference procedure, and identification of population distributions should not be read as identification of unit-level counterfactuals.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]

## Related Papers

- [[papers/an-optimal-transport-approach-to-estimating-causal-effects-via-nonlinear-difference-in-differences|An Optimal Transport Approach to Estimating Causal Effects via Nonlinear Difference-in-Differences]]: develops the multivariate Brenier-map extension of changes-in-changes reviewed here.
- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: tests equality between observed and transported counterfactual outcome laws in a scalar distributional DiD design.
- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: uses transport maps for causal estimation under limited covariate overlap.

Source scope: supplied parsed Markdown for job `d7cec24b-038b-47c4-bc5b-b9159c0e8761`. The source provides no publication year, DOI, or arXiv identifier.

[[index|Library home]]
