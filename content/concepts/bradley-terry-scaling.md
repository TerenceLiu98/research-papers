---
title: Bradley-Terry Scaling
type: concept
aliases:
  - Bradley-Terry Model
  - Bradley-Terry Pairwise Comparison Model
tags:
  - pairwise-comparisons
  - latent-trait-estimation
  - text-as-data
---

## Overview

Bradley-Terry scaling estimates relative item scores from pairwise judgments or competitive outcomes. Applications include sports ranking, social choice, and LLM evaluation. In text measurement, each judgment identifies which text expresses more of a specified construct. The model aggregates these comparisons into a latent scale, whether the judgments come from human coders or language models.

## Key Ideas

- **Model differences in latent strength.** For scores $z_i$ and $z_j$, $P(i\succ j)=e^{z_i}/(e^{z_i}+e^{z_j})=\sigma(z_i-z_j)$. Maximum-likelihood estimation relates observed wins and losses to these probabilities.
- **Identify the location.** Adding the same constant to all scores leaves comparison probabilities unchanged. A reference item or sum-to-zero constraint fixes the location. Display rescaling should be distinguished from the fitted scores used in the probability model.
- **Inspect the comparison graph.** Items are vertices and observed comparisons are edges. The sampling schedule determines which relative positions are informed by data; sparse observations and separation can complicate estimation. Licht et al. hold out vertices rather than merely edges to evaluate scoring of unseen texts.
- **Separate aggregation from learned scoring.** Fitting item parameters aggregates comparisons for observed items. A reward model instead learns a function of text with the loss $-\log\sigma(r_\theta(x_h)-r_\theta(x_l))$, allowing single-item scoring of new texts at inference.
- **Validate the construct and reference labels.** A coherent latent scale is not proof of semantic validity. Noisy human labels, biased LLM comparisons, or a poorly specified dimension can produce misleading scores. Additional human judgments can challenge the reference itself.
- **Distinguish prompting from supervision.** Pairwise labels can support data-efficient fine-tuning even when pairwise prompting fails to improve ranking over [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]].
- **Separate identification from finite estimation.** For unrestricted item utilities, a location constraint identifies the model on a connected undirected comparison graph. A finite unique unregularized MLE additionally requires the directed observed-win graph to be strongly connected. Regularization and priors can address separation but change the estimation problem (Fang et al., Sections 4.1-4.2).
- **Distinguish utility and rank uncertainty.** Uniform utility consistency supports ranking recovery only with sufficient score separation. Confidence intervals for individual utilities do not automatically give valid rank confidence sets; graph topology and degree imbalance affect the available guarantees (Fang et al., Sections 4.3-4.4).
- **Check representational limits.** A single BT utility vector imposes strong stochastic transitivity and cannot reproduce intrinsic preference cycles. [[concepts/plackett-luce-model|Plackett-Luce]] extends the model to ranked subsets, while mixtures and covariate-assisted models address different forms of heterogeneity (Fang et al., Section 2).
- **Match the solver to the graph.** The survey's supplementary comparison favors asynchronous Newman's iteration in full-data passes, but synchronous updates can diverge on near-bipartite graphs. Computational convergence is distinct from statistical accuracy (Fang et al., Section 5.1 and Supplement S.3).
- **Allow tied latent ranks explicitly.** [[concepts/bayesian-rank-clustering|Bayesian Rank Clustering]] can assign a shared strength to a latent group. The BT-SBM learns these groups and their count, giving within-group win probability one half while retaining a transitive ordering between groups. This represents uncertainty about ranking granularity, not a model of drawn match outcomes.

## Important Papers

- [[papers/recent-advances-in-the-bradley-terry-model-theory-algorithms-and-applications|Recent advances in the Bradley-Terry model: theory, algorithms, and applications]]: Fang et al. (2026) survey graph-dependent identification, inference, algorithms, and extensions beyond text measurement.
- Bradley and Terry (1952), "Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons": foundational model cited in the scalar-measurement study.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: uses Bradley-Terry models for human reference scores, aggregation of LLM comparisons, and the pairwise fine-tuning objective.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: uses a Bradley-Terry model to check consistency between human placements and pairwise judgments of political speeches.

## Related Concepts

- [[concepts/plackett-luce-model|Plackett-Luce Model]]
- [[concepts/item-response-theory|Item Response Theory]]: the Rasch model has the same logistic-difference structure on a bipartite person-item graph.
- [[concepts/text-scaling-models|Text Scaling Models]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
