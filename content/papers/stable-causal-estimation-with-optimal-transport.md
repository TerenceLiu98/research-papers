---
title: Stable Causal Estimation with Optimal Transport
type: paper
authors:
  - Yidan Xu
  - Yixin Wang
  - XuanLong Nguyen
year: null
tags:
  - causal-inference
  - optimal-transport
  - causal-overlap
  - treatment-effects
  - cross-fitting
---

## TL;DR

The paper replaces density-ratio reweighting with transport-map adjustment for average causal effects under limited overlap. Its Stable Transport Estimator (STE) evaluates an outcome regression at transported covariates, while an extrapolation-controlled extension (EC-STE) interpolates between source and target covariate distributions when their supports only partly overlap. The authors prove consistency and, under stronger map-estimation conditions, asymptotic normality; simulations and three applied studies report substantially more stable error than weighting or outcome-regression alternatives in severe-overlap settings.

## Research Question

Can average treatment effects remain identifiable and estimable without unstable propensity-score weights when treatment groups have unbounded density ratios, and can transport geometry provide a controlled approximation when [[concepts/causal-overlap|overlap]] fails outright?

## Motivation

Inverse propensity weighting changes measure by multiplying outcomes by treated-to-control density ratios. When propensity scores approach zero or one, these ratios can diverge even if ordinary overlap still holds, producing unstable variance. Trimming, weight constraints, and overlap-weighted targets can improve numerical behavior but may discard observations or change the population being studied. The paper instead uses [[concepts/optimal-transport|optimal transport]] to align covariate distributions through their geometry, requiring finite transport cost rather than uniformly bounded density ratios.

## Contributions

- Introduces transport-based identification of ATT, ATC, and ATE by pushing one treatment group's covariate distribution to the other and evaluating the relevant outcome regression after transport.
- Defines the cross-fitted Stable Transport Estimator and decomposes its error into outcome-regression and estimated-map components. Its conditional evaluation variance contains the transported regression variance rather than an inverse-density-ratio factor.
- Establishes consistency under $L_2$ consistency of the regression and map nuisances, and a central limit theorem when the estimated map admits an asymptotically linear expansion around an exact transport map.
- Introduces EC-STE for partial support overlap. Displacement interpolation explicitly trades residual covariate imbalance against regression extrapolation; the resulting first-order interpolation bias is estimable and can be removed under stated rate conditions.
- Gives distribution-based choices of the interpolation parameter using integral probability metrics, Wasserstein distance, $\chi^2$ divergence, and Kullback-Leibler divergence.

## Method

For ATT, let $P_X^0$ and $P_X^1$ be the control and treated covariate laws and let $T_\sharp P_X^0=P_X^1$. Under SUTVA, unconfoundedness, and overlap, the untreated counterfactual mean among treated units can be written as

$$
\mathbb{E}_{P_X^1}[h_0(X)]
=\mathbb{E}_{P_X^0}[h_0(T(X))],
$$

where $h_0(x)=\mathbb{E}[Y\mid X=x,A=0]$. STE estimates $h_0$ and $T$ on training folds and averages $\hat h_0(\hat T(X))$ over held-out controls. Cross-fitting is essential: fitting and evaluating an empirical coupling on the same sample collapses the transport estimate to the treated-arm outcome-regression average.

The paper studies Gaussian plug-in, empirical barycentric, nearest-neighbor-extended, and entropically regularized transport maps. For outright support mismatch it uses

$$
T_\eta(x)=\eta x+(1-\eta)T(x), \qquad \eta\in[0,1],
$$

so $\eta=0$ fully transports controls to the treated law and $\eta=1$ leaves them at the regression's training distribution. The interpolation limits extrapolation but introduces approximation bias. The theory characterizes this bias to first order and shows when recentering preserves the STE asymptotic variance.

## Experiments

The evaluation compares STE and EC-STE with IPW, stabilized IPW, augmented IPW, difference in means, and outcome regression.

- **Beta and Gaussian simulations:** As treated and control distributions separate in 5 and 20 dimensions under a deliberately misspecified linear outcome model, the authors report growing bias or variance for the baselines while selected EC-STE variants remain comparatively stable.
- **LaLonde-PSID:** With degree-three ridge outcome regression, full transport coincides with outcome regression and interpolation does not improve performance. The paper presents this as the expected case in which a sufficiently specified outcome model leaves little extrapolation error to correct.
- **Right Heart Catheterization semi-synthetic study:** The $W_2$-selected EC-STE reports bias $-0.814$ and MSE $6.64$, versus MSE $22.975$ for IPW/SIPW and $2143.215$ for outcome regression; the grid-search oracle reaches MSE $3.017$.
- **MEPS Medicare study:** In a design with near-separation around age 65, the reported $W_1$- and $W_2$-selected variants have MSEs of approximately $193{,}165$ and $189{,}585$, respectively, compared with $3{,}884{,}285$ for outcome regression. The grid-search oracle's reported MSE is $2{,}388$.

## Limitations

- Identification still requires SUTVA and unconfoundedness; transport does not address unmeasured confounding.
- Root-$n$ inference is established only for map estimators with an asymptotically linear expansion around an exact map. The paper does not extend this result to general nonparametric Brenier-map plug-ins, whose known convergence can be slower.
- A fixed nonzero interpolation parameter generally targets a biased approximation rather than the original ATT. Consistency requires the parameter to vanish, or inference must use the paper's local-bias correction and rate conditions.
- Data-driven interpolation controls distributional discrepancy as a proxy for unknown outcome-regression extrapolation error. It cannot directly observe or minimize that error, and its tolerance remains a tuning choice.
- The MEPS analysis defines treatment and control groups through age-based Medicare eligibility and exclusions that generate near-separation; its causal interpretation remains conditional on the observational identification assumptions and this restricted target population.
- The supplied manuscript does not state its publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/double-machine-learning|Double Machine Learning]]
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]

## Related Papers

- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: studies how treatment-predictive representations can destroy usable overlap and motivates design-based recovery of comparisons.
- [[papers/causal-inference-with-unstructured-outcomes|Causal Inference with Unstructured Outcomes]]: another causal-inference setting in which learned nuisance representations and cross-fitting affect identification and inference.

[[index|Library home]]
