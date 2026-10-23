---
title: Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference
type: paper
authors:
  - Hengrui Cai
  - Huaqing Jin
  - Lexin Li
year: null
tags:
  - causal-inference
  - conformal-prediction
  - diffusion-models
  - individual-treatment-effects
  - covariate-shift
---

## TL;DR

The paper uses conditional diffusion models to sample potential outcomes and weighted conformal calibration to construct prediction sets for [[concepts/individual-treatment-effects|individual treatment effects]] from observational data. Propensity-score weights address treatment-group imbalance, while kernel-local weights address calibration-to-target covariate shift. The resulting guarantee is marginal and degrades with error in the combined importance weights; simulations and a semi-synthetic eICU study report that the full method maintains near-nominal 95% coverage under the evaluated shifts when its ablations and baselines do not.

## Research Question

Can a flexible generative model capture complex and multimodal potential-outcome distributions while [[concepts/conformal-prediction|conformal prediction]] supplies calibrated uncertainty for individual treatment effects under treatment imbalance and target-population covariate shift?

## Motivation

An individual treatment effect is the difference $Y_i(1)-Y_i(0)$, but only one potential outcome is observed for each person. Unlike an average or conditional average treatment effect, it is therefore a random, individually unobservable quantity rather than a point-identifiable population parameter. Existing conformal ITE methods can also be limited by simple outcome models and by the exchangeability failure induced when treated, calibration, and target populations have different covariate distributions.

## Contributions

- Fits separate conditional diffusion models for treated and control outcomes, using generated potential-outcome samples rather than only a conditional-mean estimate.
- Extends probabilistic conformal prediction based on conditional random samples to the ITE setting. The nonconformity score is the minimum distance between an observed outcome and $M$ samples from the relevant conditional diffusion model.
- Combines a kernel-local weight for calibration-to-target shift with an inverse-propensity weight for treatment-assignment imbalance.
- Proves a marginal coverage lower bound of $1-\alpha-\tfrac12\mathbb E|\widehat w(X)-w(X)|$, and asymptotic nominal coverage when the combined weight estimate converges in $L_1$.
- Evaluates the method against causal forests, conformal quantile regression, a no-localization ablation, an MLP substitute, and an uncalibrated generative baseline.

## Method

The method splits observations into training, calibration, and test sets. It trains separate [[concepts/diffusion-models|diffusion models]] $\widehat q_0(Y\mid X)$ and $\widehat q_1(Y\mid X)$ for the two treatment arms. For each calibration observation, it draws $M$ conditional outcomes and defines

$$
V_j=\min_{1\leq m\leq M}|Y_j-\widehat Y_{jm}|.
$$

For a target covariate $X_k$, a Gaussian-kernel localization weight upweights nearby calibration covariates. An inverse-propensity factor rebalances treatment assignment, linking the procedure to [[concepts/causal-overlap|causal overlap]]. Their product is normalized across the calibration points and target point. A weighted $(1-\alpha)$ quantile of calibration scores, with the target weight placed at $+\infty$, expands an interval around each of the $M$ target outcome samples; the prediction set is the union of those intervals.

The theory compares the true and estimated change-of-measure weights in total variation. It establishes marginal, not pointwise [[concepts/conditional-prediction-coverage|conditional prediction coverage]], under consistency, conditional ignorability, positivity, and finite-weight assumptions.

## Experiments

- **Synthetic outcomes:** The study uses $7{,}500$ training, $2{,}500$ calibration, and $1{,}000$ test observations over 50 replications, with dimensions 10 and 300 and Gaussian, Gamma, or bimodal non-local-moment noise. The target is a 95% ITE interval.
- **No target shift:** CDM, CQR, CDM without local weights, and the MLP conformal variant attain the target coverage in the reported homoscedastic settings. CDM has the shortest reported intervals for bimodal noise, while the naive generator and causal forest undercover.
- **Target shift:** Under heteroscedasticity and a test subgroup defined by the upper tail of covariate norm, only the full CDM maintains the target empirical coverage across the reported settings. Removing local weights, replacing diffusion with an MLP, CQR, causal forest, and the naive method all under-cover.
- **Sensitivity:** Performance is reported as relatively stable across a reasonable number of diffusion samples; the authors use $M=40$. Results are more sensitive to the localization bandwidth, which is selected on 15% of the training data.
- **eICU semi-synthetic study:** The study models fluid resuscitation effects on cumulative metabolism using ten covariates and evaluates a shifted subgroup of younger patients taking norepinephrine. CDM reports coverage 0.948 with median interval length 5.066. CQR reports 0.927 coverage, the no-local ablation 0.858, MLP 0.847, the naive method 0.615, and causal forest 0.119; their shorter intervals therefore do not meet the nominal coverage target.

## Limitations

- The causal interpretation requires consistency, conditional ignorability given observed covariates, and positivity; the method cannot correct unmeasured confounding.
- The formal result is marginal coverage. The paper does not establish conditional coverage for a fixed covariate value, and notes that suitable diffusion-model convergence rates are unavailable for that extension.
- The coverage bound depends directly on estimating both propensity and localization weights well. Poor overlap or inaccurate shift adjustment weakens the guarantee.
- Diffusion training and repeated sampling are computationally expensive relative to simpler outcome models.
- The simulations set $Y(0)=0$, and the eICU evaluation generates potential outcomes from fitted models rather than observing real individual counterfactuals.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/individual-treatment-effects|Individual Treatment Effects]]
- [[concepts/conformal-prediction|Conformal Prediction]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]

## Related Papers

- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: addresses instability under limited causal overlap through transport maps rather than inverse-density-ratio weighting.
- [[papers/continuous-time-counterfactual-quantile-learning-for-risk-sensitive-policy-optimization|Continuous-Time Counterfactual Quantile Learning for Risk-Sensitive Policy Optimization]]: models counterfactual outcome distributions for policy-specific quantiles, a different target from the distribution of person-level treatment-effect differences.

[[index|Library home]]
