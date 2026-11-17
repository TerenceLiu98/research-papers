---
title: A Bayesian Alternative to Synthetic Control for Comparative Case Studies
type: paper
authors:
  - Xun Pang
  - Licheng Liu
  - Yiqing Xu
year: 2022
doi: 10.1017/pan.2021.22
tags:
  - causal-inference
  - bayesian-inference
  - panel-data
  - synthetic-control
---

## TL;DR

A dynamic multilevel latent factor model (DM-LFM) predicts untreated counterfactuals for one or several treated units and obtains treatment-effect distributions by subtracting those predictions from observed outcomes. Bayesian shrinkage adapts covariate effects and factor complexity while propagating model uncertainty. Reported simulations favor the method under complex heterogeneity, at substantially greater computational cost than generalized synthetic control.

## Research Question

How can comparative case studies estimate individual and average treatment effects with interpretable uncertainty when untreated trajectories reflect latent common shocks and heterogeneous, evolving covariate effects?

## Motivation

Small numbers of aggregate units and nonrandom interventions complicate both counterfactual prediction and uncertainty assessment. Synthetic control placebo comparisons lack a straightforward randomization interpretation when treatment is not randomized. A posterior predictive approach instead conditions probability statements on the observed data and an assumed model.

## Contributions

- Frames comparative-case causal inference as Bayesian imputation of missing untreated outcomes under latent ignorability.
- Combines dynamic factors with covariate coefficients that can vary across units and time.
- Uses hierarchical shrinkage for continuous model search and averaging over covariates, varying coefficients, and factors.
- Provides MCMC implementation through the R package bpCausal, with core functions in C++.

## Method

For staggered adoption, the untreated response model is

$$
y_{it}(c)=X_{it}'(\beta+\alpha_i+\xi_t)+\gamma_i'f_t+\epsilon_{it}.
$$

Time-varying coefficients and common factors follow autoregressive processes with diagonal transition matrices; errors are Gaussian. Unit loadings translate common factors into different outcome trajectories. Estimation uses untreated observations, including treated units' pretreatment histories.

Identification requires no cross-unit spillovers, no anticipation, individualistic assignment and positivity, and [[concepts/latent-ignorability-in-panel-data|latent ignorability]] conditional on exogenous covariates and latent trajectories. Those trajectories must admit a low-rank factor representation. Conditional exchangeability and the specified outcome model support posterior prediction. This extends strict exogeneity and does not permit residual feedback from past outcomes into treatment assignment.

Bayesian Lasso priors shrink mean coefficients. Reparameterized scale coefficients shrink unit variation, temporal variation, and factor loadings. These continuous priors have no point mass at zero: weak components remain with negligible influence rather than being exactly removed. MCMC integrates estimation and specification uncertainty.

For posterior draw $g$, the treatment effect is $\delta_{it}^{(g)}=y_{it}^{obs}-y_{it}^{(g)}(c)$. Averaging appropriate draws yields sample ATT estimates, including effects by duration since adoption. Posterior means and 2.5th–97.5th percentiles summarize effects and 95% credible intervals, incorporating predictive, parameter, and model uncertainty. Recommended diagnostics include MCMC convergence, pretreatment fit, and pretreatment placebo periods.

## Experiments

- **Simulation studies (Section 4):** Under heterogeneous covariate effects and latent factors correlated with selection, the full model improves bias, RMSE, and coverage relative to restricted variants. Factors contribute most, while varying coefficients further improve precision. Comparisons favor DM-LFM over SCM and over Gsynth when factor counts are unknown or numerous weak factors matter. These are findings for the reported designs.
- **Computational comparison:** With 50 units and 60 pretreatment periods, one reported run takes about 30 seconds on a 2019 six-core MacBook Pro, versus less than one second for Gsynth.
- **German reunification:** Uses West Germany and 16 OECD controls over 1960–2003, with treatment beginning in 1990. DM-LFM and SCM both imply lower actual GDP per capita than the untreated counterfactual through most of the post-reunification period, except the initial years. A 1987–1989 placebo yields effects close to zero.
- **Election day registration:** Uses 47 states across 24 presidential elections, 1920–2012, including nine treated states. DM-LFM yields narrower intervals than Gsynth and better pretreatment fits in the reported comparisons. At least six factors affect prediction, versus two selected by Gsynth. The authors attribute the narrower intervals to improved prediction; this is an interpretation rather than an independent coverage test.

Published in *Political Analysis* 30, 269–288 (2022), online 13 July 2021. Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/B6SWA1).

## Limitations

The causal interpretation depends on latent ignorability and a suitable low-rank outcome structure. Idiosyncratic trends without common components, spillovers, anticipation, or residual outcome-to-treatment feedback can invalidate it. Shrinkage does not remove these identification requirements. Frequentist performance deteriorates with too few controls or short pretreatment histories, especially fewer than about 20 periods. Computation is more expensive than frequentist alternatives, and the treatment setup assumes irreversible adoption. The supplied text contains inconsistent unit counts in the illustrative simulation; those counts are not reproduced here.

## Related Concepts

- [[concepts/latent-ignorability-in-panel-data|Latent Ignorability in Panel Data]]: the assignment assumption enabling counterfactual prediction from a latent factor outcome model.
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]: posterior prediction supports effects for individual treated unit-periods as well as averages.

## Related Papers

- [[papers/bayesian-sensitivity-analysis-for-unmeasured-confounding-in-causal-panel-data-models|Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models]]: extends the Bayesian factor-model baseline to assess residual confounding beyond observed covariates and common factors.
- Xu (2017), “Generalized Synthetic Control Method: Causal Inference with Interactive Fixed Effects Models”: frequentist factor-model comparator.
- Abadie, Diamond, and Hainmueller (2015), “Comparative Politics and the Synthetic Control Method”: source of the German reunification application.
