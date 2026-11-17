---
title: "A Percolation Model of Emergence: Analyzing Transformers Trained on a Formal Language"
type: paper
authors:
  - Ekdeep Singh Lubana
  - Kyogo Kawaguchi
  - Robert P. Dick
  - Hidenori Tanaka
year: null
tags:
  - emergence
  - formal-languages
  - phase-transitions
  - transformers
---

## TL;DR

Small Transformers trained online on a synthetic language acquire grammar, relative type constraints, and descriptive type constraints in successive phases. Improvements on unscrambling and conditional generation follow acquisition of these shared structures. A model based on [[concepts/bipartite-bond-percolation|Bipartite Bond Percolation]] predicts the square-root scaling of the descriptive-type transition with the number of properties, but does not explain the different scaling of unscrambling.

## Research Question

Can emergence be characterized through acquisition of shared data-generating structures, and can a model of those structures predict how the transition point changes with data complexity?

## Motivation

A sudden increase in one benchmark score does not identify what a network has learned. The authors propose tracking several downstream tasks alongside explicit measures of shared structures. Formal languages make grammar and semantic compatibility independently controllable and measurable.

## Contributions

- Proposes a phenomenological definition requiring nonlinear task improvement, simultaneous improvements across tasks, and correlated acquisition of an underlying structure useful to those tasks.
- Constructs a probabilistic language with context-free syntactic templates and context-sensitive entity–property compatibility constraints.
- Connects generalization to unseen valid entity–property combinations with the appearance of a large connected component in a bipartite graph.
- Tests predicted transition scaling against changes in vocabulary composition and distinguishes it from downstream task scaling.

## Method

A probabilistic context-free grammar generates symbolic sentences. A type-constraint graph then supplies compatible entities, descriptive properties, and relative properties. The base language has 900 entities and 18,000 properties in 10 disjoint classes; training exposes each entity to 15% of its class-valid properties.

A two-block GPT-style Transformer, with two attention heads per block and 128-dimensional representations, learns next-token prediction on fresh batches. Free generation, unscrambling, and conditional generation constitute 80%, 10%, and 10% of training examples. Adam uses learning rate 0.001, batch size 128, and weight decay 0.0001, with no learning-rate schedule and up to 100,000 iterations. Results generally average three seeds and evaluation uses 1,000 sampled strings.

The theoretical abstraction represents observed entity–property pairings by a density matrix $D$. Propagation through shared neighbors is represented by $T^{(n)}=(DD^T)^nD$. Nonzero entries encode connectivity through alternating paths. Under random bipartite connectivity, the large-system threshold is approximately $p_c=1/\sqrt{|E||K|}$, corresponding to order $\sqrt{|E||K|}$ observed edges. Mapping training exposure to increasing edge density predicts a square-root transition scale. This is an abstraction of learning, not a derived Transformer update rule.

## Experiments

**Learning phases (Section 6).** Grammaticality begins improving around 100 iterations. Relative type accuracy rises sharply around 1,000 iterations, near maximal grammaticality. Descriptive constraints improve later after a plateau; downstream tasks improve with a delay. Reported descriptive performance reaches roughly 30–35%, above the authors' estimated memorization-only performance of roughly 15% in the relevant regime.

**Structure-specific scaling (Section 7 and Appendix E).** Increasing descriptive properties delays their acquisition while leaving grammar and relative-type learning largely unchanged. Rescaling iterations by $|K|^{0.5}$ approximately aligns descriptive type-check transitions. Unscrambling accuracy instead aligns near $|K|^{1.5}$ in the base setting, shifting toward exponent 2 with 1,800 entities. A separate bilinear-spline breakpoint analysis gives exponent 1.4 for descriptive-sentence unscrambling (Appendix F).

**Robustness and metrics.** Property counts range from 14,800 to 38,800 in increments of 1,600; additional settings use two classes or 1,800 entities. Continuous probabilities, losses, token accuracy, rank-based measures, and exact match provide complementary evidence. Scaling is metric-dependent: rank-based cluster-membership proxies can align near exponent 0.5 even where unscrambling accuracy and NLL do not. Conditional-generation results include an additional 27,600-property setting.

## Limitations

- Evidence concerns a controlled synthetic language and a small architecture; prediction of natural-language LLM emergence remains open.
- Percolation models connectivity and idealized propagation. Its precise mapping assumes unlimited inference steps, while finite-step behavior differs (Appendix B.2).
- The theory does not explain the unscrambling exponent or its dependence on entity count.
- Sentence-type evaluations use length-based proxies: short sentences are approximately 94% descriptive, while the selected relative-sentence range is approximately 85% relative.
- Conditional-generation sweeps are limited by evaluation cost, and some runs were interrupted by cluster failures.
- The supplied Markdown does not establish a publication year or stable identifier; these are left unspecified rather than inferred from cited works.

## Related Concepts

- [[concepts/bipartite-bond-percolation|Bipartite Bond Percolation]]: the connectivity transition used to model generalization across entity–property combinations.
- [[concepts/lattice-percolation|Lattice Percolation]]: shares the use of connectivity order parameters, but has a different graph geometry and threshold.

## Related Papers

- [[papers/machine-learning-percolation-model|Machine Learning Percolation Model]] studies machine learning applied to physical percolation configurations; here percolation instead models neural learning dynamics.
- Schaeffer, Miranda, and Koyejo (2023), *Are Emergent Abilities of Large Language Models a Mirage?*: the metric-artifact explanation contrasted with changes in continuous and structure-sensitive evaluations.
- Power et al. (2022), *Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets*: contrasts delayed generalization after fitting a fixed dataset with this paper's online data-scaling setting.
