---
title: "TAGNet: Temporal Attention Graph Network for Defensive Tactical Pattern Recognition in Professional Counter-Strike 2"
type: paper
authors:
  - Xiang Zhang
  - RongQi Zhang
  - Guancheng Chen
  - Xinlei Cao
  - ChaoFan Yue
  - Chunhong Yuan
year: null
source_job_id: "3032d9a1-0713-4287-9cee-47d61b31659b"
tags:
  - esports-analytics
  - graph-neural-networks
  - unsupervised-learning
---

## TL;DR

TAGNet discovers six defensive formation patterns from 697 professional Counter-Strike 2 rounds on Dust2. A reconstruction-trained graph attention encoder represents player formations, while a **fixed, randomly initialized GRU and context projection** aggregate five snapshots into round embeddings for clustering. The reported test reconstruction loss is 0.0086; tactical interpretations are descriptive and have moderate cross-seed stability.

The supplied manuscript gives no explicit publication year or stable paper identifier. Its data collection spans 2024–2025; this is not a publication date.

## Research Question

Can unlabeled player-state sequences reveal interpretable defensive formations and their associations with economy, previous rounds, and score state?

## Motivation

Event statistics and outcome prediction do not directly describe how five defenders coordinate their early-round positioning. Formation sequences and match context offer a basis for discovering recurring setups and descriptive team scouting profiles.

## Contributions

- A distance-aware graph encoder trained without tactical labels, followed by order-aware contextual aggregation.
- A dataset of 697 CT rounds from 33 professional Dust2 matches and a six-pattern defensive taxonomy.
- Contextual association analyses, positional baselines, and ablations separating reconstruction fidelity, cluster geometry, stability, and interpretability.

## Method

Five snapshots at 10, 12, 15, 18, and 20 seconds after freeze time each form a fully connected five-player graph. Each player has 20 named-area indicators, normalized health, and transformed equipment value. Edges encode normalized planar distance. Dead players remain with zero health; rounds ending before 20 seconds or missing players/snapshots are excluded.

Three shared single-head attention layers add a learned distance bias to query–key logits. Mean pooling produces a 64-dimensional snapshot embedding. Three heads reconstruct named-place distributions, macro-area occupancy, and ten pairwise distances using mean-squared errors weighted 1, 0.5, and 1. AdamW trains the encoder and heads for up to 40 epochs.

A 25-dimensional context vector includes equipment, utility, score, economy, and previous-round information. A fixed projection maps it to 32 dimensions, and a fixed GRU processes the resulting 96-dimensional snapshot inputs into a 64-dimensional round embedding. Neither module receives gradients from the snapshot reconstruction objective; this is not end-to-end learned temporal representation learning.

K-means with 20 initializations clusters all 697 embeddings. Mean dense ranks of silhouette, Davies–Bouldin, and Calinski–Harabasz indices over K=2–15 select K=6. Thus, held-out reconstruction and full-dataset exploratory clustering are distinct evaluations.

## Experiments

The match-level split is 23/5/5 matches, containing 486/95/116 training/validation/test rounds. The earlier configuration uses three snapshots, two attention layers, and a shared feed-forward block; its loss of 0.0094 falls to 0.0086 with the final configuration, an 8.5% reduction across several simultaneous changes.

| Check | Reported finding |
| --- | --- |
| Remove graph encoder | Single-run loss rises to 0.0143, +66.3% |
| Five-seed full model | Loss 0.008436 ± 0.000138; cross-seed ARI 0.5226 |
| Replace GRU with mean pooling | Identical reconstruction loss; cross-seed ARI falls to 0.4513 |
| Count-sequence k-means | Better internal clustering indices than TAGNet; agreement with TAGNet ARI 0.375 |
| Continuous coordinates as node features | Loss 0.035535; cross-seed ARI 0.3990 despite better internal indices |

The six interpreted patterns are Anchor-A Biased, Default Balanced, B-Biased Double-Point, Mid-Control Balanced, A-Long+Mid, and Aggressive A-Heavy Push. The last has a 24.2% CT win rate versus 59.1% for B-Biased Double-Point; these observational differences do not establish tactical effectiveness.

Economy is associated with cluster choice (chi-square 96.25, Cramér’s V=0.215, Holm p<0.001), as is the previous-round winner (Holm p<0.001). Previous attack direction does not survive correction, and the omnibus score-state test is nonsignificant. In a separate paired comparison across 22 teams, aggressive-push usage is higher when trailing (0.116 versus 0.031; raw p=0.0020, Holm p=0.0118). No team-specific opponent association survives the 17-test correction.

## Limitations

- One map, one side, and a short early-round window limit demonstrated scope. Planar geometry omits vertical structure; features omit orientation and movement direction.
- Tactical labels receive review from one experienced author, rather than independent expert validation. Cross-seed ARI around 0.52 indicates assignment variability.
- Reconstruction bypasses temporal aggregation. Single-snapshot loss comparisons also change the number and difficulty of training examples, so they do not isolate the value of history.
- Internal clustering indices favor some simpler baselines and are not directly comparable across feature spaces. Table VI also uses different initialization and cluster-selection settings from the main six-cluster analysis.
- Context is included in the embeddings before testing contextual associations. Economy and trailing status are correlated; neither association identifies a causal tactical response.
- Descriptive team fingerprints do not establish opponent-conditioned adaptation or practical coaching gains.

## Related Concepts

- [[concepts/attention-as-message-passing|Attention as Message Passing]]: player-state similarities and distance biases determine aggregation weights.
- [[concepts/neural-message-passing|Neural Message Passing]]: relational encoding of each player formation.
- [[concepts/k-means-clustering|K-Means Clustering]]: turns round embeddings into exploratory tactical categories.

## Related Papers

- [[papers/evaluating-player-actions-in-professional-counter-strike-using-temporal-heterogeneous-graph-neural-networks|Evaluating Player Actions in Professional Counter Strike using Temporal Heterogeneous Graph Neural Networks]]: a related library paper using temporal graphs for outcome prediction and action attribution, whereas TAGNet discovers defensive categories without tactical labels.
- Veličković et al. (2018), *Graph Attention Networks*: cited attention-based graph foundation.
- Raabe, Nabben, and Memmert (2023), *Graph Representations for the Analysis of Multi-Agent Spatiotemporal Sports Data*: cited sports-trajectory representation precedent.

The manuscript lists the dataset, models, and code at [TAGNet-CS2](https://github.com/zhangx1ang03620/TAGNet-CS2).
