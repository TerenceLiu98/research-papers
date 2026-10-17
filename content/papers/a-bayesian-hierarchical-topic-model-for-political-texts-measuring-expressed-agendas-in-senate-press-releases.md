---
title: "A Bayesian Hierarchical Topic Model for Political Texts: Measuring Expressed Agendas in Senate Press Releases"
type: paper
authors:
  - Justin Grimmer
year: 2010
tags:
  - political-communication
  - topic-modeling
  - bayesian-inference
  - legislative-behavior
---

## TL;DR

The expressed agenda model jointly discovers topics and estimates how much attention each author devotes to them, using a hierarchy of documents within authors. Applied to 24,236 Senate press releases from 2007, it recovers 43 topics and agenda patterns consistent with committee responsibilities, state interests, and earmark voting. Senators representing the same state express more similar priorities than senators from different states, contrary to the differentiation hypothesis tested in the paper.

## Research Question

How can political actors' [[concepts/expressed-agendas|expressed agendas]] be measured comparably from their statements, with uncertainty, and what do those measures reveal about senators' communication with constituents?

## Motivation

Manual studies of congressional communication often cover only a few legislators or statements. Document clustering alone does not directly model the author-level allocation of attention that substantive theories concern. Clustering each author's texts separately also produces incompatible topic inventories. Press releases offer frequent, author-controlled observations of what legislators choose to emphasize, whereas newspaper coverage combines those choices with editorial selection.

## Contributions

- Introduces a hierarchical mixture model with author-specific topic proportions and shared topics, supporting comparison and partial pooling across authors.
- Derives a variational estimation algorithm for agenda distributions and document assignments, with an extension that conditions the agenda prior on author covariates.
- Combines topic interpretation, event timing, institutional responsibilities, geography, and legislative voting to validate the resulting measures.
- Tests whether senators sharing a state differentiate their communication, using distances between agenda compositions across the full Senate.

## Method

**Corpus and representation.** The paper collects releases from Senate websites for the 2007 calendar year. Preprocessing removes word order and punctuation, lowercases and stems words, removes stop words and stems appearing in fewer than 0.5% of releases, and excludes words appearing in over 90% of any individual senator's releases. The retained corpus contains 1,988 stems and 3,715,293 stem observations. Each document's count vector is normalized to unit Euclidean length to prevent document length from driving clustering (Sections 4-5).

**Author hierarchy.** Senator $i$ has an agenda vector $\pi_i$ drawn from a shared Dirichlet prior. Each release receives one latent topic $z_{ij}$, and its normalized word vector follows that topic's von Mises-Fisher distribution:

$$
\pi_i \sim \operatorname{Dirichlet}(\alpha),\qquad
z_{ij}\mid\pi_i \sim \operatorname{Categorical}(\pi_i),\qquad
y^*_{ij}\mid z_{ij}=k \sim \operatorname{vMF}(\mu_k,\kappa).
$$

Topic centers $\mu_k$ are shared across senators; agenda proportions vary by senator. The reported analysis fixes the common concentration to $\kappa=100$ and estimates the shared Dirichlet parameters. The hierarchy concerns authors and documents, rather than a tree of broad topics and subtopics. An extension uses $\alpha_{ik}=\exp(X_i^\top\beta_k)$ to pool information conditional on author characteristics, but the main analysis omits these covariates (Section 5; Appendix B.6).

**Inference and model selection.** Mean-field variational optimization estimates Dirichlet distributions for agendas and categorical probabilities for document topics. Appendix B specifies MAP point estimates for topic centers and Dirichlet hyperparameters, so uncertainty is not integrated over every model parameter. The agenda update adds expected topic counts to the prior parameters: $\theta_{ik}=\alpha_k+\sum_j r_{ijk}$. The author explores 5-85 topics, selects 43 as an interpretable compromise, and reports that a Dirichlet-process clustering check finds 40-45 clusters over a range of hyperpriors. The algorithm is restarted 100 times and the best run is retained (Section 5.6).

**Interpretation and derived quantities.** Labels combine reading ten randomly selected high-probability documents per topic with the ten stems having highest mutual information with topic membership. Draws from approximate agenda distributions support comparisons of group attention, downstream vote regressions, and distances on the simplex between senators' agendas (Sections 7-9; Appendices C-D).

## Experiments

The empirical evidence consists primarily of substantive validation and an observational application, rather than a benchmark of classification accuracy.

| Check | Reported evidence |
| --- | --- |
| Communication reaches newspapers | Across ten Senate offices and six newspapers, the observed newspaper-senator coverage rates range from 6.3% to 32.4% of releases. Similarity detection screens candidate matches, followed by manual checking (Table 3). |
| Topics track external events | Immigration releases peak around cloture votes; Attorney General releases rise around the Gonzales no-confidence vote and resignation; honorary releases track holidays and deaths (Figure 3). |
| Committee responsibilities | Leaders devote more attention to their committees' issues in 40 of 47 committee-topic comparisons. This counts the direction of estimated differences, not 40 statistically decisive effects (Figure 4). |
| Geographic interests | Public-land attention is greater in western states, disaster attention in Gulf coast states, and border-security attention in international-border states. Agriculture attention increases with farms per capita (Figure 5). |
| Legislative behavior | Greater attention to appropriations is associated with opposition to the March 2008 DeMint-McCain earmark moratorium, including after conditioning on estimated ideal points (Figure 6). |
| Same-state differentiation | Average agenda distance is smaller within states than between states. The aggregate 50% and 90% HPD intervals exclude zero in the direction of similarity, and the pattern holds for split-party, Republican, and Democratic delegations (Figure 7). |

The final comparison challenges the tested prediction that competition for attention produces unusually distinctive agendas within state delegations. Shared constituencies and coordinated communication are offered as possible explanations, rather than established mechanisms.

## Limitations

Expressed attention measures communication priorities, not policy positions, actual legislative effort, or constituent exposure. The newspaper analysis covers a subset of offices and outlets. The main application concerns one chamber and one year; proposed applications to campaigns, presidents, and other media are not evaluated here.

The single-topic assumption fits the intended short-release setting but can obscure multi-issue documents. Results depend on preprocessing, the chosen topic count, fixed concentration, and optimization initialization. Manual interpretation samples high-probability documents and therefore does not establish accuracy for ambiguous releases. Variational agenda intervals are conditional on the fitted topic structure and point-estimated parameters, rather than accounting for all model-selection and parameter uncertainty.

Committee, geography, vote, and within-state comparisons support substantive validity but do not identify causal effects of institutional roles or communication strategies. The parsed text also gives inconsistent posterior-draw counts in its vote-regression discussion; no single count is treated here as a settled replication setting.

## Related Concepts

- [[concepts/expressed-agendas|Expressed Agendas]]: the author-level distribution of attention estimated by the model.
- [[concepts/party-issue-agendas|Party Issue Agendas]]: a related attention measure for party communication, distinct from issue positions.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: topic interpretation and downstream substantive validation address different properties of the measurement.

## Related Papers

- [[papers/the-partypress-database-a-new-comparative-database-of-parties-press-releases|The PARTYPRESS Database: A new comparative database of parties' press releases]]: a later press-release resource using supervised issue classification across European parties; its existing Wiki bibliography supplies the 2010 publication year, which is absent from the supplied Markdown.
- Quinn et al., "How to Analyze Political Attention with Minimal Assumptions and Costs" (cited as forthcoming): organizes political attention over time, whereas this model organizes it by author.
- Mimno and McCallum (2008), "Topic Models Conditioned on Arbitrary Features with Dirichlet-Multinomial Regression": the cited basis for incorporating author covariates into the prior.

[[index|Library home]]
