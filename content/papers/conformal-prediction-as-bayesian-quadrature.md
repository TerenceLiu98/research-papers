---
title: Conformal Prediction as Bayesian Quadrature
type: paper
authors:
  - Jake C. Snell
  - Thomas L. Griffiths
year: null
tags:
  - conformal-prediction
  - bayesian-quadrature
  - uncertainty-quantification
  - risk-control
---

## TL;DR

The paper interprets [[concepts/conformal-prediction|conformal prediction]] and conformal risk control as special cases of [[concepts/bayesian-quadrature|Bayesian quadrature]] over the quantile function of calibration losses. Random Dirichlet quantile spacings produce a prior-robust distribution that upper-bounds posterior expected loss; using a high posterior quantile rather than only its mean yields data-conditional risk decisions that are more conservative than standard conformal risk control but more efficient than the evaluated risk-controlling prediction-set baseline.

## Research Question

Can distribution-free uncertainty quantification be given a Bayesian formulation that conditions on the observed calibration losses, represents a range of plausible deployment risks, and recovers standard conformal methods when only the posterior mean is used?

## Motivation

Standard conformal guarantees are marginal: they average performance over possible calibration datasets rather than describing uncertainty after the actual calibration losses have been observed. This can leave many individual calibration trials above a target risk even when the marginal guarantee holds. A Bayesian view could represent uncertainty about expected deployment loss and incorporate prior information, but an ordinary Bayesian analysis would require a prior over the unknown loss distribution.

## Contributions

- Casts split conformal prediction and conformal risk control as decision rules that bound worst-case risk.
- Rewrites expected loss as the integral of its quantile function, turning risk estimation into a Bayesian quadrature problem.
- Removes dependence on a specified function prior by integrating the worst-case quantile function consistent with the ordered calibration losses and an upper loss bound $B$.
- Uses the distribution-free result that consecutive quantile spacings follow $\operatorname{Dirichlet}(1,\ldots,1)$ for i.i.d. losses with a continuous distribution.
- Constructs a random upper bound $L^+$ for posterior expected loss and shows that the mean of $L^+$ recovers conformal risk control and, for binary miscoverage loss, split conformal prediction.
- Proposes selecting the control parameter from a one-sided posterior bound, thereby targeting a data-conditional rather than input-conditional guarantee.

## Method

For ordered calibration losses $\ell_{(1)},\ldots,\ell_{(n)}$ and known maximum loss $\ell_{(n+1)}=B$, the method samples

$$
(U_1,\ldots,U_{n+1})\sim\operatorname{Dirichlet}(1,\ldots,1)
$$

and forms

$$
L^+=\sum_{i=1}^{n+1}U_i\ell_{(i)}.
$$

The Dirichlet weights represent the unknown probability mass between consecutive loss quantiles. A right-rectangle integral of the largest monotone quantile function consistent with the observations supplies a prior-independent upper bound. The resulting $L^+$ stochastically dominates posterior expected loss for every sufficiently expressive prior consistent with the observations.

Because $\mathbb E[U_i]=1/(n+1)$,

$$
\mathbb E[L^+]=\frac{\sum_{i=1}^n\ell_i+B}{n+1},
$$

which is exactly the correction used by conformal risk control. Instead of controlling this mean, the proposed decision rule chooses the smallest parameter $\lambda$ for which $P(L^+\leq\alpha\mid\ell_{1:n})\geq\beta$. The experiments estimate this probability with 1,000 Monte Carlo Dirichlet samples.

## Experiments

- **Scaled binomial losses:** Across 10,000 trials with $n=10$, $K=4$, and target risk $\alpha=0.4$, conformal risk control exceeded the target in 21.20% of trials. RCPS did so in 0.00%, and the proposed $\beta=0.95$ rule in 0.03%. Mean risk was $0.3363\pm0.0007$ for CRC and $0.1758\pm0.0006$ for the proposed rule.
- **Heteroskedastic intervals:** Across 10,000 trials with 200 calibration observations and 90% target coverage, split conformal prediction/CRC exceeded target risk in 46.19% of trials with mean interval length 7.99. RCPS had 0.0% failures and length 14.29; the proposed rule had 3.42% failures and length 9.50.
- **MS-COCO multilabel classification:** Each split used 1,000 calibration and 3,952 test examples. CRC exceeded the false-negative-rate target in 45.05% of trials with mean set size 2.92. RCPS had 0.0% failures and size 3.57; the proposed rule had 5.43% failures and size 3.04.

These comparisons show the intended trade-off: the posterior-quantile rule reduces trial-level risk failures relative to marginal CRC while producing smaller sets or intervals than the evaluated RCPS baseline. The reported MS-COCO failure rate is slightly above the nominal 5% target.

## Limitations

- Calibration and deployment observations must be independent and identically distributed; distribution shift invalidates the guarantee.
- Losses must have a known finite upper bound $B$.
- The Dirichlet spacing theorem is stated for i.i.d. losses with a continuous distribution, while the scaled-binomial experiment uses a discrete loss.
- Maximizing over all priors makes the bound conservative, so realized losses may be substantially smaller.
- The guarantee conditions on the observed loss values, not on each input $x$; it is distinct from [[concepts/conditional-prediction-coverage|pointwise conditional prediction coverage]].
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/conformal-prediction|Conformal Prediction]]
- [[concepts/bayesian-quadrature|Bayesian Quadrature]]
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]
- [[concepts/bayes-assisted-conformal-prediction|Bayes-Assisted Conformal Prediction]]

## Related Papers

- [[papers/robust-bayes-assisted-conformal-prediction|Robust Bayes-Assisted Conformal Prediction]]: uses Bayesian working models to improve conformal efficiency while retaining frequentist marginal coverage, rather than forming a posterior distribution over expected loss.
- [[papers/generative-score-inference-for-multimodal-data|Generative Score Inference for Multimodal Data]]: targets conditional score distributions through a generative model, contrasting with the present paper's distribution-free, data-conditional risk bound.

[[index|Library home]]
