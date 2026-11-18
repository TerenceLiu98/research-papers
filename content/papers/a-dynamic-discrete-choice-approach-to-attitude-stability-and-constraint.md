---
title: A Dynamic Discrete Choice Approach to Attitude Stability and Constraint
type: paper
authors:
  - Alecia Nepaul
  - Steven Stern
year: 2026
doi: 10.1017/pan.2026.10034
tags:
  - political-methodology
  - public-opinion
  - ordinal-measurement
---

## TL;DR

A joint ordinal panel model separates stable individual differences, common time effects, and transient shocks while estimating how shocks propagate between political attitudes. British panel results distinguish two attitude systems; US results show more persistent symbolic identifications than issue attitudes. Directional interpretations depend on excluding contemporaneous cross-attitude shock correlation.

## Research Question

How stable are political attitudes, which sources explain their variation, and which attitudes exert the greatest influence within an interdependent system?

## Motivation

Test–retest correlations summarize relative positions without separating common shifts, permanent heterogeneity, and shocks. Modeling attitudes separately misses cross-attitude spillovers, while treating survey categories as equally spaced ignores ordinal measurement.

## Contributions

- Joint modeling of multiple ordinal outcomes with multidimensional permanent heterogeneity and unequal interview intervals.
- Variance decompositions distinguish sources of stability from transient variation.
- Impulse responses and source-specific spillover variance quantify asymmetric constraint between attitudes.

## Method

Latent attitudes combine observed covariates, attitude-specific time effects, two independent normal person factors with attitude-specific loadings, and jointly normal shocks. Estimated thresholds translate latent values into ordered survey responses. Maximum simulated likelihood estimates the model (§3).

Shock covariance depends on elapsed interview time through signed powers of correlation parameters. Contemporaneous covariance blocks are identity matrices: shocks have normalized unit variance and cannot correlate across attitudes on impact, but may spill over subsequently. This identifying restriction supports the authors’ causal interpretation; correlated permanent factors capture a separate source of cross-attitude association. Variance decomposition, shock half-lives, and impulse responses summarize fitted dynamics.

## Experiments

**British Election Study Internet Panel:** 484,616 observations from 86,816 respondents during 2014–2019, with 12–15 waves per attitude. Outcomes are civic duty to vote, internal and external efficacy, trust in MPs, and satisfaction with democracy. Own-shock half-lives range from 0.344 to 1.076 months (Table 2). Permanent random effects explain 2.0–10.7% of variance; observed covariates explain 26.2–39.8% and common time effects 17.9–40.3% (Table 3).

Civic duty and internal efficacy form one system; trust, external efficacy, and democratic satisfaction form another. Internal efficacy accounts for 62.86% of civic duty’s spillover variance one month after shocks, whereas civic duty accounts for 3.94% of internal efficacy’s (Table 4). These are shares of spillover variance, not total attitude variance. A positive internal-efficacy shock predicts a negative civic-duty response despite their positive permanent-factor association.

**General Social Survey:** Four stacked rotating panels cover party and ideological identification plus immigration, military, welfare, and environmental spending attitudes. Permanent random effects explain 54.56% of party-identification variance and 47.00% of ideological-identification variance; current own shocks explain 58.04–67.93% of issue-attitude variance (Table 7). Party identification contributes 42.25% of ideological identification’s spillover variance (Table 8). The authors describe a weakly constrained system with party identification most influential.

## Limitations

- Directional shock effects depend on the contemporaneous exclusion restriction, not temporal ordering alone.
- Shocks combine measurement error, changing considerations, and differential item functioning; the decomposition does not separately identify these mechanisms.
- Pooled coefficients need not apply uniformly: the reported heterogeneity tests reject equality before and after Brexit.
- The supplied text refers to supplementary estimation details and reference-model comparisons; those supplementary materials are not included here.

## Related Concepts

- [[concepts/attitude-stability-and-constraint|Attitude Stability and Constraint]]: distinguishes persistence within an attitude from interdependence across attitudes.
- [[concepts/ordinal-scale-sensitivity-analysis|Ordinal-Scale Sensitivity Analysis]]: addresses the broader problem of conclusions depending on assumed distances between survey categories; this paper instead specifies a latent threshold model.

## Related Papers

- Converse (1964), “The Nature of Belief Systems in Mass Publics”: foundational account of constraint discussed by the authors.
- Zaller and Feldman (1992), “A Simple Theory of the Survey Response”: motivates changing consideration pools as one interpretation of transient survey responses.

Replication data and code are identified in the paper at [Harvard Dataverse](https://doi.org/10.7910/DVN/DUCHYS).
