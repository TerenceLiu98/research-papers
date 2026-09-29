---
title: "Hierarchical Mixtures of Latent Trait Analyzers with concomitant variables for multivariate binary data"
type: paper
authors:
  - Dalila Failli
  - Maria Francesca Marino
  - Bruno Arpino
year: 2025
source_job_id: "7aeea6e6-b01b-4c3f-a321-bad1df3ddc86"
tags:
  - hierarchical-mixture-models
  - latent-trait-models
  - model-based-clustering
  - multilevel-data
  - digital-skills
---

## TL;DR

This paper introduces Hierarchical Mixtures of Latent Trait Analyzers (HMLTA), a model for hierarchically clustering first-level units and second-level units in three-way binary data. It combines a Mixture of Latent Trait Analyzers (MLTA) for within-level clustering with concomitant variables and a second-level random effect whose distribution is estimated nonparametrically. A variational double EM algorithm fits the model. In an application to older residents in 21 European countries, the selected model finds four resident profiles nested within two country blocks.

## Research Question

Can a model jointly cluster first-level units and the higher-level units in which they are nested while accounting for residual dependence between binary variables and for covariate effects on cluster membership?

## Motivation

Three-way binary data contain observations, variables, and higher-level units such as residents, digital skills, and countries. Ignoring the nesting can distort clustering, while a locally independent latent-class model may need too many clusters to represent residual association among variables. The proposed model uses a continuous latent trait within each first-level cluster and estimates the higher-level mixing distribution without imposing a Gaussian form.

## Contributions

- Extends MLTA with concomitant variables to a multilevel setting, producing a partition of first-level units within a partition of second-level units.
- Uses a nonparametric maximum likelihood (NPML) estimate of the second-level random-effect distribution, whose discrete support directly induces higher-level blocks.
- Develops a variational approximation and a nested, upward-downward double EM algorithm for estimation when latent-trait integrals have no closed form.
- Evaluates parameter and clustering recovery, model selection, and computational behavior in simulations, and applies the model to digital skills among older European residents.

## Method

For first-level unit $i$ nested in second-level unit $h$, the observed vector is a binary response $\mathbf{Y}_{hi}$. A latent class $z_{hi}$ assigns the unit to one of $G$ clusters. Conditional on the class and a $D$-dimensional standard Gaussian latent trait $\mathbf{u}_{hi}$, each variable follows a logistic response model:

$$
\Pr(Y_{hik}=1\mid \mathbf{u}_{hi},z_{hig}=1)
=\operatorname{logit}^{-1}(b_{gk}+\mathbf{w}_{gk}^{\mathsf{T}}\mathbf{u}_{hi}).
$$

The intercepts $b_{gk}$ describe cluster-specific baseline tendencies, while the slopes $\mathbf{w}_{gk}$ capture residual heterogeneity and association between variables within clusters. Cluster probabilities depend on unit-level concomitant variables and a second-level random effect. NPML represents that effect by a discrete distribution with $Q$ support points, yielding second-level blocks with probabilities $\rho_q$.

The variational step lower-bounds the logistic response likelihood so the latent traits can be integrated using Gaussian identities. The outer EM algorithm updates posterior class and block probabilities, multinomial-logit coefficients, support-point parameters, and block probabilities. A nested EM update estimates latent-trait parameters and variational quantities. The authors use bootstrap resampling within second-level units for standard errors, and select $(G,D,Q)$ using BIC; ICL and AIC are alternatives. Final clustering uses maximum a posteriori assignments.

## Experiments

### Simulation

The simulation varies the number of first-level units ($N=500,1000,2000$), binary variables ($R=7,14$), first-level clusters ($G=3,4$), and second-level blocks ($Q=2,3$), with 20 second-level units and a one-dimensional latent trait. Adjusted Rand Index (ARI) improves with more units and variables. For example, with $R=14$, $N=2000$, $G=3$, and $Q=2$, mean ARI is 0.846 for first-level units and 1.000 for second-level units; with $G=4$ and $Q=3$, the corresponding values are 0.836 and 0.906.

In a model-selection experiment, BIC selected the generating specification ($G=3$, $Q=2$, $D=1$) in 98% of 50 simulated datasets. BIC and ICL agreed in 94% of cases, while AIC more often favored complex specifications. Compared with the multilevel latent-class model obtained when $D=0$, HMLTA produced higher ARI in the reported scenarios, at the cost of somewhat higher runtime from the latent-trait updates.

### European Social Survey application

The application uses ESS Round 10 digital-social-contacts data. After restricting the analysis to respondents aged 50 or older, countries with traditional face-to-face collection, and complete records, the data contain 13,017 residents nested in 21 countries and measured on seven binary digital-skill variables. The skills represent Internet use, preference settings, advanced search, PDFs, video calls, messaging, and online political posts. Demographic and socioeconomic covariates include age, health, activity limitations, birthplace, gender, education, partnership, partner education, income, children in the household, and employment activity.

BIC selects four resident clusters, two country blocks, and a one-dimensional latent trait. The first block contains Belgium, Czechia, Estonia, Finland, France, Ireland, Iceland, the Netherlands, Norway, and Switzerland; the second contains Bulgaria, Croatia, Hungary, Italy, Lithuania, Montenegro, North Macedonia, Portugal, Slovenia, Slovakia, and the United Kingdom. The first block has higher DESI, GDP, and tertiary-education levels in the paper's comparison. Within it, 61% of residents are assigned to the Digital Proficients cluster, compared with 36% in the second block.

The four resident profiles are Digital Laggards, Communication Technologies Users, Web Navigators, and Digital Proficients. The profiles differ in both overall proficiency and the technologies used. The latent-trait influence is especially large for video calls and messages. Relative to Digital Laggards, cluster membership is associated with age, health, activity limitations, education, income, partnership, children, and employment status, with the direction and significance varying by profile.

## Limitations

- NPML is sensitive to the chosen number of support points: too few can oversimplify heterogeneity, while too many can create numerical instability or weak identification.
- The application assumes data are missing at random and does not model missing-not-at-random mechanisms; the authors recommend sensitivity analysis for such extensions.
- The model is developed for binary responses and two clustering levels. Extensions to multicategory responses, more than two levels, and concomitant variables at each level remain future work.
- The simulation settings are controlled, and the comparison with the multilevel latent-class model uses specified generating mechanisms and initialization choices; the results do not establish robustness under arbitrary misspecification.
- The prose around the application inconsistently labels the higher- and lower-digitalization block indices in its discussion of predicted probabilities. The country assignments and earlier DESI comparison identify the first listed block as the more digitalized one.

## Related Concepts

- [[concepts/hierarchical-mixtures-of-latent-trait-analyzers|Hierarchical Mixtures of Latent Trait Analyzers]]: the durable model family introduced by this paper.
- [[concepts/item-response-theory|Item Response Theory]]: a related latent-trait response-modeling perspective for binary observations.
- [[concepts/random-effects-distribution-misspecification|Random Effects Distribution Misspecification]]: relevant to the choice between parametric and flexible distributions for unobserved higher-level heterogeneity.

## Related Papers

- Gollini and Murphy (2014), "Mixture of latent trait analyzers for model-based clustering of categorical data": the MLTA foundation extended here.
- Failli, Marino, and Martella (2024), "Finite mixtures of latent trait analyzers with concomitant variables for bipartite networks: an analysis of COVID-19 data": introduces the concomitant-variable MLTA extension used as a starting point.
- Vermunt (2003), "Multilevel latent class models": a multilevel latent-class comparison that corresponds to the HMLTA case with no continuous latent trait.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: a library connection on variational inference for latent-trait response models, not a cited comparison in this paper.

[[index|Library home]]
