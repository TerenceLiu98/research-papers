---
title: Generative AI and Topological Data Analysis of Longitudinal Panel Data
type: paper
authors:
  - Badredine Arfi
year: 2025
doi: 10.1017/pan.2025.10019
tags:
  - topological-data-analysis
  - graph-neural-networks
  - longitudinal-data
  - international-conflict
---

## TL;DR

Arfi integrates persistent homology, Bayesian spatial regression, and graph neural networks to analyze longitudinal panel data. In an illustrative militarized international disputes (MIDs) application covering 1946–2010, topological summaries improve reported predictive model comparisons, while additional learned latent factors contribute little. Subgraph-based data reduction yields a reported ROC AUC of about 0.75 with 1,118 retained observations.

## Research Question

Can global topological heterogeneity be represented numerically and used to moderate regression relationships, classify yearly networks, condition latent representations, and select compact panel datasets?

## Motivation

Dyadic covariates and conventional network dependence terms may leave global structural variation unrepresented. The paper connects topological summaries of each panel to statistical modeling and graph learning so that local state and dyad attributes can be analyzed alongside system-level structure.

## Contributions

- A persistence-diagram-to-component pipeline makes topological information available as regression moderators and graph labels.
- Edge-aware graph attention supports topology-based graph classification and an adversarially regularized variational graph autoencoder conditioned on topological factors.
- SubGraphX selects influential yearly subgraphs that are converted back into a smaller longitudinal dataset for Bayesian estimation.

## Method

1. Fit a Bayesian spatial autoregressive baseline with an international-organization sociomatrix, a fourth-order spatial expansion, and a zero-inflated binomial likelihood.
2. Compute persistent homology for each panel, summarize persistence diagrams with persistence images, and reduce these to two components per homology dimension, H0, H1, and H2. The paper calls these functional principal components; its main-text implementation description also refers to PCA on vectorized persistence images.
3. Add H1 components and their moderation terms to the Bayesian model. Discretize topological factors into four classes for supervised classification of annual graphs, whose nodes are states and edges encode dyadic features.
4. Use EdgeGATConv layers in a topology-conditioned adversarially regularized graph variational autoencoder. Learn representations separately within each annual graph, then reduce latent representations to two components and add them to the regression.
5. Use SubGraphX, Monte Carlo tree search, and Shapley-based importance to select explanatory subgraphs and reconstruct a reduced panel dataset.

## Experiments

The running example uses MIDs from 1946–2010, state attributes, dyadic covariates, and shared international-organization memberships. Graph classification splits annual graphs into training and testing sets; latent reconstruction splits nodes and corresponding edges within each graph.

| Analysis | Reported finding |
| --- | --- |
| Spatial baseline, Table 1 | Spatial coefficient 0.153; 94% HDI [0.141, 0.166]. |
| Topological moderation, Table 2 | H1 component coefficients −5.124 and −10.284; moderation coefficients 2.388 and 5.022. Their reported 94% intervals exclude zero. |
| Latent augmentation, Section 5.3 | Only 0.3% difference in leave-one-out ELPD from the model with spatial and topological terms; latent main and moderation intervals include zero. |
| Subgraph reduction, Section 5.4 | 1,118 selected observations versus 240,273 original observations; reported AUC approximately 0.75 and accuracy 99.4% on remaining empirical data. |

Graph-class membership, attention weights, and latent cluster cohesion visualize changes over time. The paper explicitly notes that attention weights and persistence entropy fail to capture an upward trend in total MIDs. Historical interpretations of these visual patterns are descriptive.

## Limitations

- Evidence comes from one illustrative dataset with a restricted feature set; broader domains and heterogeneous modalities are proposed applications.
- Strong outcome imbalance limits what 99.4% accuracy alone establishes. The subgraph evaluation excludes selected dyads from testing, but does not establish prospective temporal generalization.
- Learned latent factors show little incremental predictive contribution and no clearly nonzero regression effects in this example.
- The supplied text contains inconsistencies: Table 3 changes the second topological factor label relative to Table 2; Section 5.4 gives both 240,273 original observations and approximately 242,000 test observations. These counts should not be silently reconciled. Table 4 also reports a major-power mean outside its displayed interval.
- The main text delegates implementation and mathematical details to supplementary material. The present summary uses only the supplied Markdown, and predictive or descriptive associations do not establish causal effects.

## Related Concepts

- [[concepts/persistent-homology|Persistent Homology]] — supplies multiscale topological summaries.
- [[concepts/functional-principal-component-analysis|Functional Principal Component Analysis]] — the stated representation for reducing persistence-image information.
- [[concepts/neural-message-passing|Neural Message Passing]] — underlies the edge-aware graph attention models.

## Related Papers

- Arfi (2024), “The Promises of Persistent Homology, Machine Learning, and Deep Neural Networks in Topological Data Analysis of Democracy Survival” — prior topological analysis followed by this paper.
- Pan et al. (2018), “Adversarially Regularized Graph Autoencoder for Graph Embedding” — basis for the conditioned latent representation model.
- Lupu and Greenhill (2017), “The Networked Peace: Intergovernmental Organizations and International Conflict” — substantive network-conflict context.

Replication data and code are identified in the source as DOI 10.7910/DVN/F4UHHW. Ingest provenance: Cognitio job `45842d26-fd87-4b6b-a018-a720cc3ef77b`, supplied parsed Markdown.
