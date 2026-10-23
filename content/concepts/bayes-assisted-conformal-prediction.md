---
title: Bayes-Assisted Conformal Prediction
type: concept
aliases:
  - Bayesian Conformal Prediction
tags:
  - conformal-prediction
  - bayesian-inference
  - uncertainty-quantification
---

## Overview

Bayes-assisted conformal prediction uses a Bayesian working model to design the nonconformity score in [[Conformal Prediction]]. A common choice is the negative posterior predictive density: candidates that the working model regards as improbable receive larger scores. Conformal calibration supplies finite-sample marginal coverage under exchangeability even when the working model is misspecified, while the Bayesian model can improve prediction-set efficiency when its prior and likelihood are informative.

## Key Ideas

- Validity and efficiency have different dependencies. Exchangeability of calibration and test observations underwrites conformal coverage; alignment of the Bayesian working model with the data determines whether posterior-predictive scores produce compact sets.
- Prior information can be particularly useful with small samples or hierarchical structure, where purely data-driven scores estimate important quantities noisily.
- A misspecified prior need not invalidate conformal coverage, but it can make prediction sets unnecessarily large. Robust constructions therefore adapt how strongly the score uses the working prior.
- The Bayesian model may describe the full conditional distribution $Y\mid X$ or only residuals from a fixed predictor. Residual-level models can accommodate non-Bayesian black-box predictors and avoid priors over high-dimensional predictor parameters.
- Computational cost can be substantial because full conformal prediction repeatedly evaluates leave-one-out posterior predictives. Conjugacy, importance sampling, closed-form scores, or structured endpoint searches can reduce this cost.

## Important Papers

- Fong and Holmes (2021), "Conformal Bayesian Computation": extends posterior-predictive conformal scoring beyond conjugate models using add-one-in importance sampling.
- Hoff (2023), "Bayes-Optimal Prediction with Frequentist Coverage Control": shows that posterior-predictive density scores minimize Bayes risk among suitably valid conformal procedures under regularity conditions.
- Bersson and Hoff (2024), "Optimal Conformal Prediction for Small Areas": uses a Normal-Normal-Gamma working model to borrow strength and obtain closed-form intervals.
- [[Robust Bayes-Assisted Conformal Prediction]]: introduces residual-level heavy-tailed and empirical-Bayes scores that revert toward a data-centered baseline under prior-data conflict.

## Related Concepts

- [[Conformal Prediction]]
