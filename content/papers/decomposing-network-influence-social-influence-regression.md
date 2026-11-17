---
title: "Decomposing Network Influence: Social Influence Regression"
type: paper
authors:
  - Shahryar Minhas
  - Peter D. Hoff
year: 2025
source_job_id: "51ece245-cf78-4f60-8f01-52160f4712eb"
tags:
  - network-models
  - international-conflict
  - longitudinal-data
---

## TL;DR

Social influence regression (SIR) explains sender and receiver dependence in longitudinal networks using observed covariates. Applied to monthly ICEWS material-conflict events from 2005–2012, it associates alliances and verbal cooperation with aligned conflict behavior, and reports better held-out prediction than a conventional GLM and a generalized boosted model. Influence here is predictive dependence, not an identified causal effect.

## Research Question

Which observable actor and dyad characteristics explain whose past interactions predict whose subsequent interactions in a directed network?

## Motivation

Latent network models describe dependence but often leave its observable drivers unspecified. Alliances, trade, geography, and diplomatic cooperation may explain not only direct conflict between two states, but also why their conflict partners overlap over time.

## Contributions

- Regresses sender and receiver influence parameters on observed covariates within bilinear network autoregression.
- Fits the resulting rank-one regression through alternating GLM optimizations.
- Separates direct dyadic associations from covariate-dependent network associations in an international-conflict application.

## Method

For lagged network predictors $X_t$, the bilinear predictor is $A_tX_tB_t^\top$. SIR specifies $a_{ii',t}=\alpha^\top w_{ii',t}$ and $b_{jj',t}=\beta^\top w_{jj',t}$. Collecting the weighted lagged interactions into $\widetilde X_{ijt}$ yields

$$
\eta_{ijt}=\theta^\top z_{ijt}+\alpha^\top\widetilde X_{ijt}\beta,
\qquad Y_{ijt}\sim\operatorname{Poisson}(\exp\eta_{ijt}).
$$

The application uses log-transformed lagged counts. The coefficient matrix for the network component is constrained to $\alpha\beta^\top$, of rank one. Direct covariates include lagged conflict, reciprocity, distance, joint democracy, alliance, trade, and lagged and reciprocal verbal cooperation. Influence covariates are distance, alliance, trade, and verbal cooperation (Table 1).

Holding either multiplicative vector fixed makes the remaining problem a GLM. Block coordinate descent alternates these fits using iterative weighted least squares. Scale ambiguity is addressed by fixing the first element of $\alpha$ to one. The application uses sandwich-based model-robust standard errors (Sections 2.3–2.4).

## Experiments

**Data and associations.** Monthly directed material-conflict counts come from ICEWS, 2005–2012. Sender influence is positively associated with alliances and verbal cooperation and negatively associated with trade. Receiver influence similarly associates trade with less shared targeting; nearby countries are more likely to receive conflict from common senders. These network associations differ from the positive direct trade association: the authors report about 22% more predicted conflict across the logged-trade interquartile range. Joint democracy is reported to correspond to about 41% less expected conflict (Section 3.4).

**Prediction.** Section 3.6 compares SIR with a similarly parameterized GLM and a Poisson generalized boosted model. A ten-fold procedure withholds five time slices per set. SIR is reported best and GLM worst across Brier, Dawid–Sebastiani, logarithmic, spherical, and RMSE measures. A separate terminal holdout varies from two to five periods and again favors SIR. Exact score values are not available in the supplied prose.

## Limitations

- Observational lagged dependence does not establish causal transmission of conflict or causal effects of alliances and trade.
- Rank-one structure restricts the interactions among influence covariates; alternating optimization alone does not establish a global optimum.
- Predictive comparisons concern one conflict-event application and two baselines. The supplied text provides no quantitative runtime benchmark supporting the claimed computational improvement.
- The supplied Markdown contains damaged formulas and inconsistent Hessian signs. Its democracy coefficient is printed as positive despite the reported reduction, and the terminal-holdout description switches from periods to years despite monthly data. This summary preserves the reported percentage interpretation and leaves the forecasting unit unresolved.

## Related Concepts

- [[concepts/social-influence-regression|Social Influence Regression]]: covariate-parameterized sender and receiver dependence.
- [[concepts/social-network-analysis|Social Network Analysis]]: directed relational structure and dependence beyond individual dyads.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: an alternative representation of network dependence through shared latent positions.

## Related Papers

- Minhas, Hoff, and Ward (2016), “A New Approach to Analyzing Coevolving Longitudinal Networks in International Relations”: cited bilinear autoregression foundation.
- Zhou, Li, and Zhu (2013), “Tensor Regression with Applications in Neuroimaging Data Analysis”: cited low-rank regression connection.
- [[papers/joint-latent-space-models-for-ranking-data-and-social-network|Joint latent space models for ranking data and social network]]: library comparison using shared latent positions for rankings and ties, rather than covariate-driven temporal influence; not an experimental baseline.

Replication data are identified in the supplied paper by DOI: 10.7910/DVN/VTFDX6.
