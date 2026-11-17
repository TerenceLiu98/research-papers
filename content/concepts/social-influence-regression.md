---
title: Social Influence Regression
type: concept
aliases:
  - SIR
definition: "Social influence regression parameterizes sender and receiver dependence in a bilinear network autoregression as functions of observed actor or dyad covariates."
tags:
  - network-models
  - longitudinal-data
---

## Overview

Social influence regression explains how observed attributes relate to predictive dependence among actors in a longitudinal network. Separate sender and receiver components describe whether actors direct interactions toward similar targets or receive interactions from similar sources over time.

## Key Ideas

- A bilinear network predictor $A_tX_tB_t^\top$ propagates lagged relational information through sender and receiver dependence matrices.
- Regressing entries of these matrices on covariates turns otherwise unrestricted dependence parameters into interpretable attribute-based relationships.
- Direct dyadic effects and network influence effects answer different questions. Trade between two states can predict their mutual conflict differently from how it predicts their tendency to share conflict partners.
- The resulting regression has a rank-one coefficient matrix. Alternating conditional GLM fits offers a practical estimation strategy, with a scale constraint needed to identify the multiplicative factors.
- Predictive influence does not by itself distinguish causal transmission from common causes or selection into relationships.

## Important Papers

- [[papers/decomposing-network-influence-social-influence-regression|Decomposing Network Influence: Social Influence Regression]]: develops the model and evaluates monthly international material-conflict prediction using ICEWS.
- Minhas, Hoff, and Ward (2016), “A New Approach to Analyzing Coevolving Longitudinal Networks in International Relations”: bilinear autoregression foundation identified by the SIR paper.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: the broader study of relational structure.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: models dependence through shared latent positions rather than this covariate parameterization of lagged network influence.
