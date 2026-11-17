---
title: Structural patterns of rumour propagation and hybrid graph learning in multi-event social networks
type: paper
authors:
  - Avijit Bose
  - Pradyut Sarkar
  - Premananda Jana
year: 2026
venue: Applied Network Science
tags:
  - rumor-detection
  - graph-neural-networks
  - cross-event-generalization
---

## TL;DR

Across four PHEME events, propagation statistics weakly distinguish rumour from non-rumour cascades, and graph-model performance depends strongly on the held-out event. Frozen BERT features improve GCN's mean Macro-F1 from 0.5264 to 0.5928 but increase variation across events and substantially reduce performance on Germanwings.

## Research Question

Do conversational topology, graph aggregation architecture, and textual representation support rumour classification on events absent from training?

## Motivation

Random splits can place conversations from the same event in both training and testing. Event-separated evaluation tests transfer to unfamiliar discussion contexts, while topology analysis asks whether observed structural differences provide useful discriminative evidence.

## Contributions

- Structural characterization of 4,072 reply cascades from four PHEME events.
- A common leave-one-event-out comparison of five standalone or hybrid GNNs, an adapted Bi-GCN, and GCN with frozen BERT features.
- Analysis of held-out predictions by propagation topology, distinguishing pooled topology performance from event-level robustness.

## Method

Tweets are nodes and parent-to-reply relationships are directed edges. Invalid reconstructions and cascades with fewer than five nodes are excluded. The retained sample contains 1,221 rumour and 2,851 non-rumour cascades. For 74 graphs with source-unreachable nodes, depth uses only reachable nodes, while root-edge dominance uses all edges.

Root-edge dominance is the fraction of edges originating at the source. Values at least 0.80 define star-like cascades; values at most 0.30 define chain-like cascades; intermediate values define hybrids. These are operational topology categories, not requirements that graphs be exact stars or paths. Counts are 1,950, 461, and 1,661, respectively. Depth is measured separately.

GCN, GAT, and GraphSAGE perform [[concepts/neural-message-passing|Neural Message Passing]] on these [[concepts/text-attributed-graphs|Text-Attributed Graphs]]. GCN+GAT is sequential; GCN+GraphSAGE concatenates parallel branches. Adapted Bi-GCN combines top-down and bottom-up propagation with root information. Frozen BERT-base-uncased supplies 768-dimensional masked-mean-pooled tweet embeddings in the representation comparison.

Each of four folds trains on three events and tests on the fourth. TF-IDF vocabulary and IDF weights are fitted only on training-event tweets, with at most 5,000 terms. Primary models train for 50 epochs with Adam, learning rate 0.005, weight decay 0.0005, dropout 0.5, and seed 42.

## Experiments

The retained event sizes are Charlie Hebdo 1,801, Ferguson 926, Germanwings 264, and Sydney Siege 1,081. Reported Macro-F1 means and sample standard deviations summarize four held-out events, **not repeated seeds** (Tables 3 and 5).

| Model / features | Mean Macro-F1 | Across-event SD |
| --- | ---: | ---: |
| GCN / TF-IDF | 0.5264 | 0.0546 |
| GAT / TF-IDF | 0.5772 | 0.0923 |
| GraphSAGE / TF-IDF | 0.5182 | 0.0532 |
| GCN+GAT / TF-IDF | 0.5230 | 0.0690 |
| GCN+GraphSAGE / TF-IDF | 0.5318 | 0.0611 |
| Adapted Bi-GCN / TF-IDF | 0.5308 | 0.0737 |
| GCN / frozen BERT | 0.5928 | 0.1550 |

Frozen BERT improves GCN on Charlie Hebdo, Ferguson, and Sydney Siege, but Germanwings drops from 0.5781 to 0.3835. Neither hybrid architecture consistently beats standalone models. GAT leads among primary models on average and in each pooled topology group, but leads only the Charlie Hebdo event fold. Topology groups use existing held-out predictions without separate retraining.

Mann–Whitney comparisons find small absolute effect sizes, 0.0300–0.0601, across six structural measures (Table 1). Mean internal branching is not significant at 0.05 (p=0.0558); significant differences in other measures coexist with substantial distribution overlap.

## Limitations

Four unequal, class-imbalanced event samples limit generalization. Filtering out small or invalid cascades restricts coverage. There is no structure-only ablation, paired significance testing of model scores, or repeated-seed evaluation. Bi-GCN is an adaptation rather than an exact reproduction; BERT is not fine-tuned. Topology-performance associations do not establish causal effects, and higher mean performance does not establish more reliable transfer.

## Related Concepts

- [[concepts/text-attributed-graphs|Text-Attributed Graphs]] — joint use of tweet semantics and reply connectivity.
- [[concepts/neural-message-passing|Neural Message Passing]] — the aggregation mechanisms compared in the experiments.
- [[concepts/social-network-analysis|Social Network Analysis]] — cascade depth, branching, density, and source concentration.

## Related Papers

- Bian et al. (2020), “Rumor Detection on Social Media with Bi-Directional Graph Convolutional Networks” — source architecture for the adapted bidirectional baseline.
- Zubiaga et al. (2016), “Analysing How People Orient to and Spread Rumours in Social Media by Looking at Conversational Threads” — source of the PHEME data.
- Goel et al. (2016), “The Structural Virality of Online Diffusion” — structural perspective on diffusion discussed by the paper.
