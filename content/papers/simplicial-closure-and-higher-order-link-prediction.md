---
title: Simplicial closure and higher-order link prediction
type: paper
authors:
  - Austin R. Benson
  - Rediet Abebe
  - Michael T. Schaub
  - Ali Jadbabaie
  - Jon Kleinberg
year: 2018
tags:
  - higher-order-networks
  - link-prediction
---

## TL;DR

Across 19 temporal datasets, group interactions reveal structure that pairwise projections erase. Stronger prior interactions and denser connections generally predict future joint participation, with their relative importance varying by domain. Simple local tie-strength scores are competitive predictors of which open triangles will first participate in a shared event.

## Research Question

Which structural patterns distinguish systems of group interactions, and how well can prior interactions among subsets predict a new joint interaction?

## Motivation

Three pairwise collaborations and a single three-person collaboration produce the same unweighted triangle. Retaining timestamped sets of participants distinguishes these cases and makes [[concepts/simplicial-closure|Simplicial Closure]] observable.

## Contributions

- Assembles 19 datasets spanning collaboration, online activity, drugs, legislation, email, and proximity contacts.
- Distinguishes open and closed triangles and shows that local higher-order statistics help identify system domains.
- Analyzes density and tie strength as predictors of closure for three- and four-node configurations.
- Introduces a higher-order prediction benchmark, scalable configuration counting, and heuristic and supervised baselines.

## Method

Data are timestamped node sets, called simplices. The weighted projection counts how often each pair occurs together. A triangle is closed if its three nodes have appeared together in at least one event, including an event with additional participants; otherwise a complete projected triangle is open. Closure is therefore distinct from adding a missing pairwise edge.

The temporal split uses the 80th percentile of event timestamps: events at or before the cutoff form training data, and later events form test data. Closure probabilities condition on prior configuration. Pairwise ties are weak after one joint event and strong after at least two. Four-node analyses instead distinguish zero, one, or multiple joint events for constituent triples. Counting methods obtain denominators from configuration counts and numerators from newly observed test events without enumerating every possible candidate set (Appendix E).

Prediction experiments rank training-set open triangles. Scores include harmonic, geometric, and arithmetic means of their three edge weights; common-neighbor variants; preferential attachment; Katz; PageRank; and logistic regression. The supervised model learns from an earlier 60% segment and a subsequent 60–80% validation segment, then computes test features from the full training segment. Evaluation uses area under the precision–recall curve (AUC-PR), reported relative to random ranking, whose baseline is the closure prevalence.

## Experiments

Egonet domain classification samples 100 eligible neighborhoods from each of 13 datasets across five domains, uses 80 per dataset for training, and repeats 20 times. Including open-triangle fraction, log average degree, and log density yields accuracy 0.78 ± 0.02 versus 0.21 for frequency-proportional random guessing. Omitting open-triangle fraction reduces accuracy to 0.49 ± 0.03 (Table 2).

For four-node configurations, adding an edge significantly increases closure probability in 180 of 228 applicable comparisons and decreases it in two, at the reported threshold of p < 10⁻⁵. Density versus tie-strength preferences show no significant reversal between three- and four-node analyses for a dataset. Earlier temporal slices broadly preserve the main trends (Section 3; Appendix D).

Selected prediction results from Table 8 are ratios to random AUC-PR, not absolute AUC-PR:

| Dataset | Random absolute AUC-PR | Geometric mean / random | Logistic regression / random |
| --- | --- | --- | --- |
| coauth-DBLP | 0.00168 | 1.59 | 3.37 |
| tags-stack-overflow | 0.000184 | 10.42 | 3.37 |
| threads-ask-ubuntu | 0.000131 | 80.94 | 9.82 |
| congress-bills | 0.000171 | 0.90 | 107.19 |
| email-Enron | 0.0140 | 1.62 | 0.72 |

No method wins everywhere. Harmonic and geometric means often outperform arithmetic means and long-path scores, while supervised learning captures useful domain-specific feature combinations. Large relative gains coexist with low absolute performance because closure is rare. Hodge components can improve simplicial PageRank on some datasets, but no component consistently dominates (Appendix F).

## Limitations

- Prediction evaluates open triangles, not all unseen groups or arbitrary group sizes; four-node structural analysis is broader than the prediction benchmark.
- Events larger than 25 nodes are excluded. Observation windows and timestamp resolution differ across datasets.
- Some groups are reconstructed: contact events use maximal cliques within 20-second intervals, and email-Eu groups aggregate recipients sharing sender and timestamp.
- Observational prediction does not identify causal mechanisms of group formation. The independent-simplex model illustrates structural diversity without establishing that it generated the data.
- Some simplicial PageRank computations did not finish within two weeks. Supervised models sometimes underperform even random ranking.

The year is corroborated by the existing library Perspective's bibliography. The supplied Markdown does not identify this paper's DOI or arXiv identifier; identifiers of cited works are not assigned to it.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]] preserve joint membership that pairwise projections discard.
- [[concepts/simplicial-closure|Simplicial Closure]] distinguishes first joint participation from pairwise triangle completion.

## Related Papers

- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]] is a later Perspective that cites this study and places group closure within research on collective behavior.
- Liben-Nowell and Kleinberg (2007), “The link-prediction problem for social networks”: the dyadic evaluation framework extended here (reference 34).
- Opsahl (2013), “Triadic closure in two-mode networks: Redefining the global and local clustering coefficients”: prior distinction between open and closed projected triangles (reference 45).
