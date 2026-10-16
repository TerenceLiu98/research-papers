---
title: Dirichlet Process Mixtures
type: concept
aliases:
  - Dirichlet Process Mixture Models
tags:
  - bayesian-nonparametrics
  - clustering
---

## Overview

Dirichlet process mixtures model observations through parameters drawn from an unknown, discrete random distribution. Shared parameter values induce clusters, allowing inference over the number of occupied groups instead of requiring a fixed count in advance.

## Key Ideas

For observations $y_i$, a mixture hierarchy is

$$
y_i\mid\theta_i\sim f(\cdot\mid\theta_i),\qquad
\theta_i\mid G\sim G,\qquad G\sim\operatorname{DP}(\alpha G_0).
$$

- The base distribution $G_0$ describes component parameters, while concentration $\alpha$ governs the tendency to generate additional occupied groups. Giving $\alpha$ a prior propagates uncertainty about that tendency.
- Although the random mixing distribution can have countably infinite support, a finite dataset occupies finitely many components. The occupied count is the relevant quantity for reporting sample clusters.
- The sampling distribution should match the observations. Spirling and Quinn use Bernoulli vote profiles with a product-beta base distribution, favoring near-unanimous behavior within legislative blocs.
- Cluster interpretation depends on the likelihood and prior. A bloc of similar votes need not represent shared policy motivations or an organized faction.
- Posterior draws can differ in both labels and group counts. [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]] summarize shared membership without aligning labels.

## Important Papers

- [[papers/identifying-intraparty-voting-blocs-in-the-uk-house-of-commons|Identifying Intraparty Voting Blocs in the U.K. House of Commons]]: applies a Bernoulli-profile mixture to Labour MPs and infers uncertainty over intraparty blocs.
- Neal (2000), "Markov Chain Sampling Methods for Dirichlet Process Mixture Models": the allocation sampler cited and used by that application alongside merge-split moves.

## Related Concepts

- [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]]: label-invariant summaries of a posterior over partitions.
- [[concepts/item-response-theory|Item Response Theory]]: an alternative latent representation for binary responses, with different substantive assumptions.
