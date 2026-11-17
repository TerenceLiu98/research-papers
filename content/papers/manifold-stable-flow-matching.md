---
title: Manifold-Stable Flow Matching
type: paper
authors:
  - Amirhossein Nazerian
  - Ali Pezeshki
  - Jianguo Zhao
year: null
tags:
  - flow-matching
  - geometric-generative-models
  - robotic-control
---

## TL;DR

Manifold-stable flow matching (MSFM) combines learned tangential transport with prescribed normal contraction, allowing ambient-space noise to approach known manifolds or estimated affine proxies. It reports higher observed robotic success alongside substantially smaller geometric residuals. The guarantees concern geometric convergence under explicit projection and proxy-selection assumptions, not exact recovery of the data distribution.

## Research Question

Can a flow-matching generator enforce attraction toward data geometry independently of its learned velocity-regression accuracy, without requiring a manifold-supported prior?

## Motivation

Low average velocity error does not enforce pointwise attraction toward valid configurations. Final projection corrects only the endpoint and requires known geometry. MSFM instead builds normal stabilization into the sampling field while learning transport along the geometry.

## Contributions

- A projected learned field with prescribed normal feedback for known geometry and local PCA affine proxies.
- Compatible conditional paths and an orthogonal decomposition separating learnable tangent error from a parameter-independent normal compatibility residual.
- Invariance and terminal convergence results, including a proxy-union bound for minimum-residual selection.
- Controlled comparisons with conventional FM on disturbed Push-T and nominal Robomimic Square, plus an ellipse diagnostic.

## Method

With nearest-point projection $y=\Pi(x)$, tangent projector $P_y$, and normal offset $r=x-y$, the field is

$$
v_\theta(t,x)=P_yw_\theta(t,x)-\alpha(t)r.
$$

Within the smooth projection neighborhood, $V=\|r\|^2/2$ satisfies $\dot V=-2\alpha V$, independently of tangential regression. The schedule $\alpha(t)=\alpha_0+\beta/(1-t)$ gives distance decay $e^{-\alpha_0t}(1-t)^\beta$. Exact vanishing occurs as $t\to1^-$; numerical sampling stops at $1-\delta$ and uses log time to bound the transformed feedback coefficient.

For unknown geometry, local neighbor PCA produces $P_i$ and $Q_i=I-P_i$, and the offset becomes $Q_i(x-x_i^*)$. A fixed proxy contracts analytically. A switching guarantee for distance to the union of proxies requires selecting the minimum normal residual; nearest-anchor selection does not automatically inherit this theorem.

Training paths on curved geometry include motion of the normal space: $\dot r_t=\dot Q_t r_t-\alpha r_t$. Full regression decomposes as

$$
\|v_\theta-u_t\|^2=\|P(w_\theta-u_t)\|^2+\|Qu_t+\alpha r\|^2.
$$

The second term vanishes only for normal-compatible paths. Push-T uses linear paths with a state-selected proxy that need not contain the target, so it retains a nonzero residual. Square uses analytical SO(3) tangent projectors and tubular paths. The normal-action optimality result fixes the base curve; it does not establish full optimal transport.

## Experiments

| Setting | FM | MSFM | Interpretation |
| --- | --- | --- | --- |
| Disturbed Push-T success, 50 rollouts | 37/50 (74%) | 41/50 (82%) | Repeated block translations; not the standard nominal protocol |
| Push-T mean maximum reward | 0.862 | 0.922 | Same initial-state seeds |
| Nominal Square success, 50 paired states | 30/50 (60%) | 36/50 (72%) | No injected disturbances |
| Square mean pre-projection rotation deviation | 0.0451 | $6.40\times10^{-7}$ | Validity residual, not expert-action accuracy |

The ellipse experiment uses 800 arc samples and 700 generated points: mean off-proxy error is $1.10\times10^{-6}$, analytic ellipse residual $9.74\times10^{-5}$, and nearest-data distance $2.75\times10^{-3}$. These distinguish proxy adherence from adherence to the true sampled arc; no comparative FM superiority is established there.

Robotic comparisons match network capacity and RK4 field-evaluation budgets, but use different integration grids. Push-T has episode-disjoint training/validation/test partitions; Square has 180 training and 20 validation episodes without a separate offline test partition. Both Square decoders apply final SO(3) projection. Of the paired Square rollouts, five succeed only with FM and eleven only with MSFM (Appendices E–G).

## Limitations

Known-manifold guarantees require trajectories to remain in a smooth nearest-projection neighborhood; they are not global guarantees for every ambient initialization. Unknown-geometry guarantees target extended affine proxies, not necessarily the true manifold or data support. Ellipse and Push-T use selectors different from the minimum-residual selector required by the switching theorem. Geometric convergence does not guarantee tangential distribution matching, and normal incompatibility remains a modeling tradeoff. The reported task gains come from compact networks and 50 rollouts per task; scaling to state-of-the-art policies remains untested.

The supplied manuscript does not explicitly identify its publication year or a stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: MSFM adds a structural geometric guarantee to velocity regression.

## Related Papers

- Lipman et al., *Flow Matching for Generative Modeling* (2023): conditional regression foundation cited by the manuscript.
- Chen and Lipman, *Flow Matching on General Geometries* (2024): intrinsic geometric transport, contrasted with MSFM's ambient prior.
- Pan et al., *Much Ado About Noising: Dispelling the Myths of Generative Robotic Control* (2026): cited motivation for distinguishing manifold adherence from validation error.
