---
title: "A Statistical Model of Bipartite Networks: Application to Cosponsorship in the United States Senate"
type: paper
authors:
  - Adeline Lo
  - Santiago Olivella
  - Kosuke Imai
year: 2025
doi: "10.1017/pan.2025.10021"
source_job_id: "19d69d38-7be0-4452-a73a-3e368be5ed70"
tags:
  - bipartite-networks
  - stochastic-block-models
  - legislative-cosponsorship
  - variational-inference
---

## TL;DR

The bipartite mixed-membership stochastic blockmodel (biMMSBM) models senator–bill ties without projecting them into senator–senator connections. Applied to the 107th U.S. Senate, it identifies seasoned partisan groups and a junior bipartisan group, alongside legislation types that reveal cooperation through low-stakes resolutions and popular bills.

## Research Question

How can researchers identify overlapping groups on both sides of a bipartite network while explaining memberships and ties with observed covariates? Substantively, which senators and legislation types supported collaboration in a closely divided Senate?

## Motivation

Projection discards information about the nodes being aggregated over. Distinct senator–bill networks can generate identical weighted senator networks, obscuring bill popularity, policy content, and the composition of support. High-degree bills can induce clustering that is mistaken for group structure. Modeling the original incidence matrix preserves these distinctions (Sections 1–2).

## Contributions

- Extends mixed-membership block modeling to two distinct node families with potentially different numbers of latent groups.
- Incorporates node covariates through membership distributions and dyadic covariates directly through tie probabilities.
- Develops collapsed stochastic variational estimation, implemented in NetMix.
- Uses the 107th Senate to show how jointly characterizing legislators and legislation reveals cooperation missed by projected-network analysis.

## Method

For senator $p$ and bill $q$, dyad-specific group assignments are drawn from their respective membership vectors: $z_{pq}\sim\mathrm{Categorical}(\pi_p)$ and $u_{pq}\sim\mathrm{Categorical}(\psi_q)$. Conditional ties follow

$$
y_{pq}\sim\mathrm{Bernoulli}\left[\operatorname{logit}^{-1}(B_{z_{pq},u_{pq}}+d_{pq}^{\top}\gamma)\right].
$$

The rectangular block matrix contains group-pair log odds. Each membership vector has a Dirichlet distribution whose concentration parameters are exponentiated linear functions of node covariates. Nodes can therefore instantiate different roles across interactions; dyadic predictors further distinguish ties within the same group pair (Section 3.2).

Estimation integrates out membership vectors, approximates the collapsed posterior with a mean-field variational family, and subsamples dyads for stochastic optimization. Under the stated unbiased-gradient and step-size conditions, optimization targets a local variational optimum. This is a bipartite mixed-membership extension of [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]].

## Experiments

### Design and selection

The empirical application studies the 107th Senate. Senator covariates include party, ideology, seniority, and gender. Legislation covariates include sponsor characteristics, policy topic, and introduction phase relative to Jim Jeffords’s party departure and September 11. Self-sponsorship dyads are excluded. Dyadic predictors capture previous-Congress reciprocity, with a separate zero indicator, and committee overlap.

The authors hold out 25% of observations and compare group-count combinations by test AUROC, selecting three senator groups and three bill groups. They then refit on the full network. The main text reports satisfactory posterior predictive checks and projected-network comparisons in the supplement, but supplies no numerical AUROC here (Section 4.1).

### Findings

The senator groups are interpreted as seasoned Democrats, seasoned Republicans, and junior power brokers spanning both parties. Legislation groups distinguish contentious bills, bipartisan resolutions, and uncontroversial legislation. Sponsor ideology alone does not distinguish these bill groups. Low-stakes resolutions on contentious topics and popular substantive bills provide different avenues for bipartisan support (Sections 4.2–4.3).

The paper reports that a 1% increase in nonzero reciprocity corresponds to roughly 2% higher cosponsorship odds. It also reports a strong positive committee-overlap association, described as about 3.7 times greater cosponsorship likelihood. These are conditional model associations. Historical examples and centrality comparisons support the authors’ interpretation of junior senators as brokers; the analysis does not identify a causal effect of low-stakes cooperation on subsequent bill passage.

Replication materials are identified at [Code Ocean](https://doi.org/10.24433/CO.3081370.v1); the model implementation is [NetMix](https://CRAN.R-project.org/package=NetMix). These links are supplied by the paper.

## Limitations

- Fitting large networks remains computationally demanding, limiting rapid specification searches.
- Variational inference approximates the posterior and optimization reaches local rather than guaranteed global optima.
- The model is cross-sectional; introduction-phase covariates do not constitute a dynamic network model.
- The supplied text refers to supplementary diagnostics and parameter tables without including them. It also contains inconsistent aggregate bill counts, which are not reproduced here.
- Coalition interpretations concern modeled cosponsorship patterns in one Senate session; they do not establish causal determinants of legislative productivity.

## Related Concepts

- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: covariates explain both group composition and conditional ties.
- [[concepts/euclidean-latent-space-item-response-models|Euclidean Latent Space Item Response Models]]: an alternative bipartite representation based on geometric proximity rather than group-pair affinities.

## Related Papers

- Airoldi et al. (2008), “Mixed Membership Stochastic Blockmodels”: foundational mixed-membership formulation extended here.
- Olivella, Pratt, and Imai (2022), “Dynamic Stochastic Blockmodel Regression for Social Networks: Application to International Conflicts”: covariate and computational predecessor cited by the authors.
- [[papers/hyperbolic-latent-position-models-for-hierarchical-bipartite-data|Hyperbolic Latent Position Models for Hierarchical Bipartite Data]]: a library comparison that preserves both node families but represents interactions geometrically; not an experimental baseline in this paper.
