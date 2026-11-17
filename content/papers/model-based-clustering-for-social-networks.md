---
title: Model-based clustering for social networks
type: paper
authors:
  - Mark S. Handcock
  - Adrian E. Raftery
  - Jeremy M. Tantrum
year: 2007
tags:
  - social-networks
  - latent-space-models
  - bayesian-clustering
---

## TL;DR

A Gaussian mixture over latent actor positions combines network clustering with distance-based transitivity and observed-attribute homophily. Joint Bayesian estimation selects three groups in a monastery network and six in a school friendship network, whereas sequential estimation selects one and two. These examples support interpretability rather than establishing universal cluster-recovery accuracy.

## Research Question

Can a generative network model estimate unknown groups while retaining within-group variation, geometric transitivity, covariate effects, and uncertainty about actors’ positions and memberships?

## Motivation

Discrete block models can suppress within-group heterogeneity, while an unclustered latent-distance model does not explicitly represent groups. Clustering estimated positions afterward also discards feedback from group structure and uncertainty in those positions.

## Contributions

- A latent position cluster model with spherical Gaussian mixture components of group-specific variance.
- Sequential maximum-likelihood and joint Bayesian estimation procedures.
- Alignment and relabelling of posterior draws, with summaries based on expected Kullback–Leibler loss.
- Approximate conditional Bayes factors for selecting the number of clusters, and two social-network applications (Sections 2–5).

## Method

Conditional on positions and covariates, directed binary ties are independent, with

$$
\operatorname{logit}P(Y_{ij}=1\mid Z,X,\beta)
=\beta_0^\top x_{ij}-\beta_1\lVert z_i-z_j\rVert,
\qquad
z_i\sim\sum_{g=1}^{G}\lambda_g\mathcal N_d(\mu_g,\sigma_g^2 I).
$$

Positions have unit root mean square to identify scale. Distances encourage local cohesion; observed dyadic covariates capture attribute associations. Mixture membership does not make all actors in a group relationally identical.

The sequential method fits the unclustered latent-space model and then uses EM to cluster its estimated positions. Joint estimation uses normal, Dirichlet, and inverse-chi-squared priors with Metropolis–Hastings and Gibbs updates. Procrustes alignment resolves geometric invariance; posterior relabelling resolves mixture-label switching (Section 3 and Appendix A).

For each candidate number of groups, the selection procedure conditions on an estimated configuration and integrates over the remaining parameters. It approximates the resulting evidence by the sum of logistic-regression and mixture-model BIC terms, with higher scores preferred. The penalties use actual ties for the logistic component and actors for the mixture component. This is not fully integrated evidence over latent positions (Section 4).

## Experiments

| Network | Analysis sample | Sequentially selected groups | Joint Bayesian selected groups |
| --- | ---: | ---: | ---: |
| Sampson monastery liking | 18 monks | 1 | 3 |
| Adolescent Health friendship | 69 students | 2 | 6 |

The monastery ties aggregate top-three positive-affect nominations across three interviews. Forcing three groups in the sequential method reproduces an earlier blockmodel partition; Bayesian estimation selects three without that constraint and yields more compact groups. Sampling uses 5,000 burn-in iterations and 30,000 further iterations, retaining every thirtieth draw.

The school initially contains 71 students; two isolates are excluded. Grade is withheld from fitting and used for comparison. The Bayesian solution largely separates seventh and eighth graders, splits ninth graders into two groups, and combines the higher grades into two nearby groups with substantial membership uncertainty. It uses 50,000 burn-in iterations and two million further iterations, retaining every thousandth draw (Section 5).

## Limitations

- Evidence centers on two illustrative networks; grade correspondence and ethnographic agreement are not controlled recovery benchmarks. Draper’s discussion notes that a two-group school solution can also have a substantive interpretation.
- Dimension is supplied by the user; both applications use two dimensions. The authors’ reply cautions against directly applying the cluster-selection BIC to dimension selection.
- Cluster evidence conditions on estimated positions, and the effective sample-size choice in BIC is debatable. The discussion also raises prior sensitivity and limited absolute goodness-of-fit assessment.
- The base model lacks explicit sender/receiver effects and flexible directed asymmetry. Reciprocity and transitivity are constrained by geometry, potentially requiring extensions.
- Posterior probabilities describe uncertainty about a single membership, not simultaneous mixed membership. Spherical components constrain cluster shape, and computation is demanding.
- The supplied document includes discussants and the authors’ reply. Proposed extensions and discussants’ experiments should not be mistaken for evaluations of the original method.

## Related Concepts

- [[concepts/latent-position-cluster-models|Latent Position Cluster Models]]: the mixture-based geometric model introduced here.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: related discrete-group approaches; this model retains continuous variation within groups.
- [[concepts/dynamic-latent-space-models|Dynamic Latent Space Models]]: temporal extensions address changes hidden by static aggregation.

## Related Papers

- Hoff, Raftery, and Handcock (2002), “Latent Space Approaches to Social Network Analysis”: the distance-based foundation extended with mixture clustering.
- Fraley and Raftery (2002), “Model-based clustering, discriminant analysis and density estimation”: mixture-clustering foundation.
- [[papers/joint-latent-space-models-for-ranking-data-and-social-network|Joint latent space models for ranking data and social network]]: a library comparison sharing positions across ranking and network likelihoods rather than introducing actor clusters; not an experimental baseline here.
