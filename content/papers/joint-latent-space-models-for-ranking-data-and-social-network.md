---
title: Joint latent space models for ranking data and social network
type: paper
authors:
  - Jiaqi Gu
  - Philip L. H. Yu
year: 2022
doi: 10.1007/s11222-022-10106-1
source_job_id: "6d046f47-8ded-47e8-b305-2885097d9b2f"
tags:
  - ranking-data
  - latent-space-models
  - social-networks
  - bayesian-inference
---

## TL;DR

The paper jointly models individual rankings and social ties using shared latent positions: item projections determine preference utilities, while distances between individuals determine link probabilities. Bayesian estimation improves ranking and network fit over two sequential estimation approaches in simulations and a CiaoDVD application. On 1,068 users and 13 DVD categories, the selected two-dimensional model achieves rankings' $RR^2=0.689$ and network AUC of 0.966. A posterior predictive check does not reject conditional independence given the positions; this is model-adequacy evidence, not proof that the latent features fully explain dependence or identify social influence.

## Research Question

Can a shared latent representation capture dependence between individuals' ranked preferences and social relations, improve estimation of both, and support a diagnostic for dependence left unexplained by the representation?

## Motivation

Ranking models commonly treat individuals' preferences as independent, even though people with similar tastes may connect and connected people may influence each other. Modeling rankings and networks separately discards information available from their association. A common geometric representation also makes inferred individual features interpretable through the positions of the ranked items (Section 1).

## Contributions

- Combines a wandering-vector ranking model with a distance-based network model in a shared probabilistic latent space.
- Develops Bayesian data augmentation and Gibbs sampling, dimensionality selection by deviance information criterion (DIC), and separate ranking and network fit measures.
- Adapts Yen's residual-correlation statistic into a posterior predictive conditional-independence check.
- Evaluates parameter recovery, fit, diagnostic behavior, and prediction of a withheld preferred DVD category; outlines sociability, directed-network, and covariate extensions.

## Method

### Shared Positions and Two Observation Models

For individual $j$, let $Z_j\sim N_d(\mu,\Sigma)$, and let $\xi_i$ be the fixed position of item $i$. Rankings order the utilities

$$
U_{ij}=\xi_i^T Z_j+\epsilon_{ij},\qquad \epsilon_{ij}\sim N(0,1),
$$

with independent errors and higher utility corresponding to a better rank. The base undirected binary network satisfies

$$
\operatorname{logit}\Pr(Y_{jj'}=1\mid Z_j,Z_{j'})
=\alpha-\lVert Z_j-Z_{j'}\rVert_2.
$$

Rankings and network ties are conditionally independent given the shared positions and model parameters (Section 2.1). The applied model replaces the common intercept with $\alpha_j+\alpha_{j'}$, allowing sociability beyond latent similarity. Directed ties can additionally have sender, receiver, and reciprocity terms; observed covariates can enter utility and sociability models (Section 2.2).

### Estimation and Model Selection

The authors center item points at zero, constrain the latent mean to be positive, and impose an ordered diagonal covariance to address geometric non-identifiability; the proof is referred to supplementary material. Reparameterizing $Z_j=\mu+\widetilde Z_j$ separates the mean from the centered latent variation. Augmenting with utilities avoids direct high-dimensional integration of ranking probabilities. Gibbs updates cover utilities, item positions, individual positions, the mean, covariance, and network parameters (Sections 3.1-3.2).

The experiments use 30,000 iterations: 10,000 burn-in, 10,000 for posterior estimates, and 10,000 for DIC. Dimensionality minimizes a missing-data version of DIC. Rankings' $RR^2$ is one minus mean observed-to-fitted Kendall distance divided by mean distance between observed rankings. Net-AUC compares fitted tie probabilities with observed edges; these are fit measures (Sections 3.3-3.4).

### Conditional-Independence Check

At posterior draws, the diagnostic compares residuals for selected item-pair preferences with residuals for ties to selected individuals. Its discrepancy is the maximum residual association minus the mean association, calibrated using replicated rankings and networks from the fitted model. The authors select item pairs with low mean rank sums and individuals with high degree to balance computation and information (Section 3.5). Non-rejection concerns this diagnostic and these selected residuals.

## Experiments

**Simulation.** Data comprise 500 individuals ranking 10 items, with two latent dimensions and heterogeneous sociability. DIC favors two dimensions over three (83,271.9 versus 86,336.9). The reported relative Frobenius error measure for latent-vector recovery is 0.043. Most, but not all, parameter intervals in Table 2 cover the generating values.

| Dataset and approach | Rankings' $RR^2$ | Net-AUC |
| --- | ---: | ---: |
| Simulation: joint | 0.769 | 0.881 |
| Simulation: ranking first | 0.729 | 0.710 |
| Simulation: network first | 0.609 | 0.830 |
| CiaoDVD: joint | 0.689 | 0.966 |
| CiaoDVD: ranking first | 0.579 | 0.533 |
| CiaoDVD: network first | 0.676 | 0.929 |

The sequential baselines estimate latent positions from one modality and then fit the other using those estimates (Tables 3 and 7).

**Diagnostic simulation.** Across 500 generated datasets, rejection rates at a 5% threshold range from 0.826 to 1.000 for an insufficient one-dimensional fit. For two- and three-dimensional fits, rates range from 0.046 to 0.054 over the tested item-pair and individual subsamples. These results assess the specific dimension-misspecification experiment (Table 4).

**CiaoDVD.** The raw data contain 2,687 users and 17 categories. Preferences are inferred by sorting frequencies of high ratings (4 or 5), breaking frequency ties by average ratings, and treating categories without high ratings as unordered below the observed top ranks. Filtering to connected users who rated at least three categories and removing four sparsely rated categories yields 1,068 users and 13 categories. Trust is represented as an undirected binary network (Section 5.1).

DIC values for one through four dimensions are 103,259.5, 102,248.0, 104,585.4, and 107,245.7. The two-dimensional solution has the best tested DIC. Its conditional-independence posterior predictive p-values range from 0.0900 to 0.2495, so none reject at 5% (Tables 6 and 8).

**Withheld-category prediction.** The authors remove each user's lowest-ranked highly rated category from the observed top ranking and predict it among the remaining candidates using posterior utility probabilities. Figure 11 is described as showing all fitted approaches above random guessing, with joint and network-first estimation outperforming ranking-first estimation. The supplied prose provides no exact accuracy values and does not establish uniform superiority of joint over network-first estimation (Section 5.3).

## Limitations

- Shared latent dependence is associational. Static rankings and ties cannot distinguish preference-based selection from peer influence.
- The application uses behavior-derived preferences, filtered users, partial rankings, and an undirected trust representation. Its results do not establish performance on arbitrary ranking or directed-network data.
- Fit metrics use observed data; the withheld-category task is the separate predictive evaluation. No runtime or large-network scalability benchmark is reported.
- Non-rejection of the residual check does not establish conditional independence, and its power experiments mainly test omitted latent dimensions.
- Weighted and heterogeneous networks, alternative ranking geometries, block-model mixtures, and deep embeddings are proposed extensions rather than evaluated methods.
- The supplied Markdown has damaged equations and inconsistent interpretation in Section 5.2.1: its claimed top-three category ordering does not match Table 5, and its variance-based interpretation is difficult to reconcile with the displayed covariance. This summary retains tabulated fit results without adopting those interpretations. Detailed sampler derivations and the identifiability proof are referred to supplementary material not included in the supplied text.

## Related Concepts

- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: the shared representation linking two observation models.
- [[concepts/social-network-analysis|Social Network Analysis]]: latent distance and sociability as explanations of edge structure.
- [[concepts/social-trust-networks|Social Trust Networks]]: the application domain, simplified here to undirected binary ties.
- [[concepts/plackett-luce-model|Plackett-Luce Model]]: a library comparison for ranking probabilities; this paper instead orders Gaussian-noise utilities.

## Related Papers

- Hoff, Raftery, and Handcock (2002), "Latent Space Approaches to Social Network Analysis": cited basis for the distance-based network component.
- Yu and Chan (2001), "Bayesian Analysis of Wandering Vector Models for Displaying Ranking Data": cited basis for the ranking component.
- Fosdick and Hoff (2015), "Testing and Modeling Dependencies between a Network and Modal Attributes": cited related dependence-testing work, distinguished here because the conditioning features are latent.
- [[papers/estimating-stochastic-block-models-in-the-presence-of-covariates|Estimating Stochastic Block Models in the Presence of Covariates]]: a library comparison using discrete communities and observed covariates rather than continuous positions shared with rankings; not a claimed citation or experimental baseline.

[[index|Library home]]
