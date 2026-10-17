---
title: "Asymmetric uncertainty: Nowcasting using skewness in real-time data"
type: paper
authors:
  - Paul Labonne
year: 2024
tags:
  - nowcasting
  - uncertainty-quantification
  - factor-models
  - score-driven-models
---

## TL;DR

Common movements in the dispersion and asymmetry of macroeconomic indicators help characterize GDP nowcasting uncertainty beyond their conditional locations. A skew-t score-driven factor model improves calibration in a real-time U.S. application and captures asymmetric risks during the pandemic downturn and recovery. Sharpness gains depend on horizon and regime, and most full-sample comparisons do not reject equal predictive ability.

## Research Question

Can common factors in the scale and shape of real-time macroeconomic data improve GDP density nowcasts, and how can these factors enter mixed-frequency models?

## Motivation

Indicators with weak location relationships to GDP can still convey information about uncertainty and downside risk. Stock-market volatility and consumer sentiment illustrate this possibility. Symmetric volatility increases can assign substantial probability to large positive growth during a downturn; a changing shape parameter can shift uncertainty toward the relevant tail.

## Contributions

- Extends a skew-t model to separate location, scale, and shape common factors, with series-specific trends and score-driven updates.
- Incorporates these factors in a joint mixed-frequency factor model and a two-stage factor-augmented MIDAS model.
- Evaluates calibration and predictive scores using recursive real-time estimation, separating normal periods, the financial crisis, and the pandemic.

## Method

For indicator $i$, the conditional distribution is skew-t with location $\mu_{i,t}$, scale $\sigma_{i,t}$, shape $\alpha_{i,t}$, and a series-specific tail parameter. The factor structure is

$$
\mu_{i,t}=\bar\mu_{i,t}+\Lambda_{\mu,i}\tilde\mu_t,\qquad
\sigma_{i,t}=\exp(\bar\sigma_{i,t}+\Lambda_{\sigma,i}\tilde\sigma_t),\qquad
\alpha_{i,t}=\tanh(\bar\alpha_{i,t}+\Lambda_{\alpha,i}\tilde\alpha_t).
$$

The link functions enforce positive scale and shape in $(-1,1)$. Under this paper's convention, positive shape means skew toward negative prediction errors. Location, scale, and shape are distributional parameters, not interchangeable with the mean, variance, and standardized third moment.

[[concepts/score-driven-models|Score-Driven Models]] update the components using derivatives of the conditional log likelihood. Trends follow random-walk-style updates; the location factor is AR(2), while scale and shape factors are stationary AR(1). A contemporaneous filtering step updates states with newly released observations before predicting the next period. Missing observations contribute zero to the score. Conditional cross-sectional independence makes the joint log likelihood a sum of marginal terms. The factor model uses unweighted scores to avoid singular information matrices; estimation uses maximum likelihood with BFGS and automatic differentiation (Sections 3 and 3.1).

Two mixed-frequency implementations are compared (Section 4):

- **Joint factor model:** the location-only specification relates latent monthly GDP components to quarterly GDP using Mariano-Murasawa weights $(1/3,2/3,1,2/3,1/3)$. Specifications with common scale and shape first aggregate indicators to rolling quarterly observations so their distributional parameters operate at a comparable frequency. Lagged location components accommodate the aggregation.
- **Factor-augmented MIDAS:** monthly factors are estimated without GDP, then enter a quarterly skew-t GDP model through exponential Almon weights on five monthly factor observations. [[concepts/midas-regression|MIDAS Regression]] is applied to location, scale, and shape separately.

Each implementation has location-only, location-scale, and location-scale-shape variants. For early nowcasts, simulation propagates missing-indicator uncertainty through the score recursion and into GDP draws. In MIDAS, the second-stage model is fitted once to point factor estimates and then evaluated on simulated factor paths (Appendix D).

## Experiments

### Design

Monthly expanding-window estimation runs from February 2007 through April 2023, using FRED-MD vintages and Philadelphia Fed real-GDP vintages, with historical data beginning in January 1959. The target is the BEA advance GDP growth estimate. Section 5.1 lists ten headline indicators spanning output, labor, consumption, sentiment, and equities. The introduction instead says "about 13 series"; the summary follows the explicit data section without reconciling that discrepancy.

There are three nowcast steps: $h=2$ before quarter-end, $h=1$ at quarter-end, and $h=0$ before the advance GDP release when all monthly indicator observations are available. Benchmarks include the nested variants and a Student-t AR(2). Evaluation uses probability-integral-transform diagnostics for calibration, CRPS and log scores, and modified Diebold-Mariano tests for equal predictive ability.

### Results

Table 2 reports score ratios to the location-only model **within each model family**; lower is better. Its log-score ratios use negative log scores.

| Model with location, scale, and shape | CRPS, h=0 | CRPS, h=1 | CRPS, h=2 | Negative log score, h=0 |
| --- | ---: | ---: | ---: | ---: |
| Factor-augmented MIDAS | 0.668 | 1.051 | 1.064 | 0.566 |
| Mixed-frequency factor model | 0.748 | 0.747 | 0.980 | 0.760 |

The MIDAS last-step log-score improvement is marked significant at 1% in Table 2. Most improvements are not statistically significant, and MIDAS shape factors worsen early-horizon CRPS relative to the location-only baseline.

Calibration generally improves when scale dynamics are introduced; adding shape further improves several diagnostics. This is not universal acceptance: for the full mixed-frequency model, Table 1 reports a Berkowitz statistic of 13.22 at $h=2$, rejecting at 1%. The full MIDAS model also rejects AD and Berkowitz tests at the earlier horizons. The author attributes particularly large Berkowitz statistics to pandemic prediction errors.

The strongest practical benefit of shape is tracking the 2020 downturn and subsequent rebound, especially late in the nowcasting window. Table 3 reports pandemic CRPS of 3.85 for the full mixed-frequency model, versus 4.76 with location and scale and 5.72 with location only. However, its average log score is -6.63 versus -5.95 for location-scale, so shape does not win every metric. For MIDAS, pandemic CRPS is 5.71 with shape versus 4.89 without it. Gains therefore depend on model family, score, and horizon. The long expansion of the 2010s shows little material sharpness improvement (Section 6.3).

Appendix C reports 1,000-replication checks of generated paths, sensitivity to initial conditions, and factor-estimation variability. Simulated paths are nonexplosive in the examined fitted model; perturbed filters take roughly a third of the sample to converge. These are empirical stability checks, not general stability guarantees.

## Limitations

- Evidence comes from one U.S. GDP application and a small indicator panel chosen partly for computational cost. Crisis-specific gains need not generalize to other economies or periods.
- Cross-sectional conditional independence and the chosen factor dynamics restrict the joint distribution. Missing-data simulations do not by themselves integrate uncertainty in estimated static parameters.
- Shape improves some calibration and crisis results without uniformly improving scores or passing every calibration test.
- The supplied Markdown contains damaged equations and missing footnote text. Section 3.1 and Appendix C.3 also give different factor-variability summaries, so no single numerical stability estimate is asserted here. The source supplies a 2024 copyright year but no stable identifier for this paper; none is inferred.

## Related Concepts

- [[concepts/score-driven-models|Score-Driven Models]]: observation-driven updates for time-varying distributional parameters.
- [[concepts/midas-regression|MIDAS Regression]]: aggregates monthly factors into quarterly density parameters.
- [[concepts/probability-calibration|Probability Calibration]]: tests whether density nowcasts represent uncertainty reliably.
- [[concepts/temporal-disaggregation|Temporal Disaggregation]]: relates latent monthly locations to quarterly flow observations.

## Related Papers

- Creal, Koopman, and Lucas (2013), "Generalized autoregressive score models with applications": score-driven foundation cited in the paper.
- Delle-Monache, De-Polis, and Petrella (2023), "Modeling and forecasting macroeconomic downside risk": univariate skew-t predecessor.
- Buccheri et al. (2021), "Filtering and smoothing with score-driven models": basis for updating states using contemporaneous releases.
- [[papers/predictor-preselection-for-mixed-frequency-dynamic-factor-models|Predictor Preselection for Mixed-Frequency Dynamic Factor Models]]: a library comparison addressing indicator selection for GDP nowcasts rather than common scale and shape dynamics.
- [[papers/factor-augmented-sparse-midas-regressions-with-an-application-to-nowcasting|Factor-Augmented Sparse MIDAS Regressions with an Application to Nowcasting]]: a library comparison combining sparse and common signals for point prediction. These library comparisons are not asserted to be citations in the source.

[[index|Library home]]
