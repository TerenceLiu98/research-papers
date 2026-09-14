---
title: "Multipolar social systems: Measuring polarization beyond dichotomous contexts"
type: paper
authors:
  - Samuel Martin-Gutierrez
  - Juan C. Losada
  - Rosa M. Benito
year: null
doi: "10.1016/j.chaos.2023.113244"
tags:
  - political-polarization
  - opinion-dynamics
  - social-networks
  - multipolar-systems
---

[[index|Library home]]

## TL;DR

The paper infers users' relative affinities toward multiple political parties from retweet networks, placing party poles at the vertices of a regular simplex. It measures [[multipolar-polarization|Multipolar Polarization]] through covariance trace for overall dispersion and principal-component variance shares for pole alignment. Applications to Spain's 2015 and April 2019 elections recover a left-right axis alongside context-specific secondary divisions. These are descriptive results for sampled Twitter conversations, not population estimates or causal explanations of political conflict.

## Research Question

How can opinions and polarization be measured in systems with more than two competing factions without specifying substantive ideological axes in advance?

## Motivation

Combining binary issue scales does not directly represent relative support for several qualitatively distinct alternatives. Preassigned left-right positions can also conceal competition between ideologically similar parties. The authors combine interaction-based opinion inference with a symmetric multipolar geometry so that dominant axes emerge from the estimated opinion distribution.

## Contributions

- Represents each of $n$ poles as a vertex of a regular $(n-1)$-simplex centered at zero, with unit distance from center to vertex.
- Uses a multidimensional Friedkin-Johnsen model with fixed elite opinions to infer listener positions from weighted retweets.
- Separates overall dispersion, measured by covariance trace, from concentration of variance along a few axes, measured through principal components.
- Demonstrates the framework in four-party and five-party electoral settings and checks sensitivity to elite selection.

## Method

**Network and opinion inference (Section 2.1).** Let $A_{ij}$ count how often user $i$ retweets user $j$; influence therefore flows from $j$ to $i$. The elite consists of disjoint sets associated with the selected parties. Their opinions remain fixed at the corresponding simplex vertices. Listeners start at zero and repeatedly average the opinions of the accounts they retweet:

$$
\mathbf{x}_i(t)=\frac{\sum_j A^*_{ij}\mathbf{x}_j(t-1)}{\sum_j A^*_{ij}}.
$$

For an elite node, its row in $A^*$ is replaced by a unit self-loop. A unique converged solution requires every listener to reach at least one elite node along directed retweet links. The authors retain eligible listeners and stop when the entrywise absolute change in their opinion matrix is below $10^{-6}$. This is an inference use of [[opinion-dynamics|Opinion Dynamics]]; the iterations are not observed trajectories of opinion change.

**Geometry and measurement (Sections 2.1 and 4).** Equal pairwise pole distances avoid prescribing which parties are closer. Convex averaging keeps positions inside the simplex, representing a constrained allocation of affinity among poles. For inferred opinion vector $\mathbf{X}$ and covariance matrix $\Sigma$,

$$
TV=\operatorname{tr}(\Sigma)
=\mathbb{E}\!\left[\|\mathbf{X}-\mathbb{E}\mathbf{X}\|_2^2\right].
$$

With unit-radius vertices, $0\leq TV\leq1$ under this probability-distribution definition of covariance. The maximum requires equal mass at all vertices, so the measure combines extremeness with balance across factions. Here total variation means aggregate variance, not total variation distance between probability distributions.

The eigenvectors of $\Sigma$ define orthogonal principal components (PCs). For positive total variance, the fraction $\lambda_1/\sum_j\lambda_j$ measures concentration along the leading axis; several leading shares characterize lower-dimensional alignment. Projecting users and poles onto these axes exposes latent structure related to [[ideological-dimensionality|Ideological Dimensionality]]. Opinion inference and covariance analysis are separable components.

## Experiments

**Setup.** A synthetic LFR network illustrates inference with 1,300 nodes, three communities, mixing parameter $0.1$, and the six highest-degree nodes per community as seeds. Empirical elites are influential, frequently participating users in party-associated communities detected with a nested stochastic block model on the full retweet network.

| Setting | December 2015 election | April 2019 election |
| --- | --- | --- |
| Collection period | December 4-21, 2015 | April 11-29, 2019 |
| Poles | PP, PSOE, Podemos, Cs | PP, PSOE, Podemos, Cs, Vox |
| Opinion-space dimension | 3 | 4 |
| Elite received-retweet threshold | At least 100 | At least 1,000 |
| Elite participation threshold | At least 50% of days | At least 70% of days |
| Reported total variation | 0.23 | 0.34 |
| PC1 variance share | 46% | 57% |
| PC1 and PC2 combined share | 78% | 75% |

**Results (Sections 2.2.1-2.2.2).** In 2015, high opinion density near Podemos strongly influences PC1. Its projection distinguishes left and right, while the authors interpret additional party separation in terms of competition within ideological blocs. In 2019, PC1 orders parties consistently with citizen placements on a left-right scale, with a density minimum between the blocs. PC2 separates Podemos and Vox from the other parties, which the authors interpret as extremism versus moderation. Their survey comparison defines the center as the midpoint of the mean placements of Podemos and Vox, $5.83$. The plotted face projections exclude users with fewer than 10 tweets in 2015 and 30 in 2019 and restrict each projection to relevant pole Voronoi cells.

**Robustness (Section 2.2.3).** Selecting elites using popularity alone or engagement alone yields visually similar first-two-PC distributions. Similarity persists with elites as small as 16 nodes in 2015 and 10 in 2019. Restricting seeds to the party and candidate accounts also broadly preserves qualitative interpretations. These checks establish reported visual stability, not individual-level predictive accuracy.

## Limitations

- Twitter audiences and keyword-selected conversations may differ from the electorate. The suggested survey calibration and cross-platform corrections are not applied in these case studies.
- Retweets are treated as proxies for affinity or influence, and only users connected to selected elites can receive inferred opinions. Contextual party labels and elite selection remain inputs despite the symmetric geometry.
- Covariance depends on the distribution of support as well as distance from the center. A popular pole can dominate PC1; the components do not independently identify causal drivers of conflict or directly measure affective hostility.
- Higher reported values in the 2019 sample do not by themselves establish a population-wide temporal increase: the pole set, collection window, and selection thresholds differ.
- The supplied Markdown contains damaged symbols and captions and references supplementary sections that are not included. Unavailable sample counts and supplementary results are not reconstructed. The publication year is left unknown because it is not explicitly stated; the DOI is supplied in Appendix A.

## Related Concepts

- [[multipolar-polarization|Multipolar Polarization]]
- [[political-polarization|Political Polarization]]
- [[opinion-dynamics|Opinion Dynamics]]
- [[ideological-dimensionality|Ideological Dimensionality]]
- [[party-system-polarization|Party-System Polarization]]

## Related Papers

- [[the-dynamics-of-political-polarization|The dynamics of political polarization]]: cited background on polarization as a social-system phenomenon.
- [[multidimensional-party-polarization-in-europe-cross-cutting-divides-and-effective-dimensionality|Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: a related Wiki comparison using party-position correlations and effective dimensionality; its expert-position measurement differs from this paper's simplex representation of user affinities.
- Morales et al. (2015), "Measuring political polarization: Twitter shows the two sides of Venezuela": the bipolar inference approach generalized here (reference 43).
- Parsegov et al. (2017), "Novel multidimensional models of opinion dynamics in social networks": the multidimensional Friedkin-Johnsen foundation (reference 48).

## Source and Resources

Ingested from the supplied parsed Markdown for Cognitio job `99a2784f-eaed-41fe-8ced-b11b3cd9ecee`.

- [Article DOI](https://doi.org/10.1016/j.chaos.2023.113244)
- [Replication repository](https://github.com/samuel-mg/multipolar_paper)
- [Framework scripts](https://github.com/samuel-mg/multipolar)
- [Interactive visualizations](https://vis.csh.ac.at/multipolar-viz)
