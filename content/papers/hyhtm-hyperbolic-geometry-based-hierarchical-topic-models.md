---
title: "HyHTM: Hyperbolic Geometry based Hierarchical Topic Models"
type: paper
authors:
  - Simra Shahid
  - Tanay Anand
  - Nikitha Srikanth
  - Sumit Bhatia
  - Balaji Krishnamurthy
  - Nikaash Puri
year: null
tags:
  - hierarchical-topic-modeling
  - topic-modeling
  - hyperbolic-geometry
  - nonnegative-matrix-factorization
  - representation-learning
---

## TL;DR

HyHTM is a parametric [[Hierarchical Topic Models|hierarchical topic model]] that uses pretrained Poincare GloVe embeddings to encode semantic similarity and word hierarchy into recursive nonnegative matrix factorization. Across eight text datasets, its strongest and most consistent gains are in parent-child hierarchical coherence; it also produces more specialized lower-level topics and trains about 15 times faster than CluHTM at 125,000 AGNews documents in the reported implementation comparison.

## Research Question

Can the tree-like geometry of pretrained hyperbolic word embeddings help a hierarchical topic model produce coherent topics whose children remain related to their parents while becoming more specific at deeper levels?

## Motivation

Existing hierarchical topic models can produce lower-level topics that are neither clearly related to their parents nor more specific than higher-level topics. Models based on sparse bag-of-words representations also omit semantic relations, while methods that enrich documents with Euclidean word embeddings can crowd moderately different concepts together. Some existing methods, particularly CluHTM, are also computationally expensive.

Hyperbolic space is suited to tree-like structure because distances expand toward the boundary: parent and child concepts can remain close while leaves on different branches remain far apart. HyHTM uses that geometry both to enrich the initial document representation and to guide the recursive construction of topic children.

## Contributions

- Defines a Poincare neighborhood similarity that converts hyperbolic distances into nonnegative, thresholded term-term similarities suitable for matrix factorization.
- Builds an explicit term hierarchy matrix from local hyperbolic neighborhoods and uses parent-topic weights to reweight document representations before learning child topics.
- Evaluates topic coherence, parent-child coherence and affinity, specialization across hierarchy levels, runtime, and memory behavior on eight public datasets against four hierarchical topic-model baselines.
- Uses ablations with Euclidean FastText embeddings, BERTopic-style hierarchical clustering, and class-based TF-IDF to separate the effects of hyperbolic representations and parent-child reweighting.

## Method

HyHTM starts from a corpus vocabulary and pretrained Poincare GloVe word embeddings. For each word, it computes Poincare distances to its neighbors and normalizes those distances within a $k_S$-nearest-neighbor set. Similarities below a threshold $\alpha$ are set to zero. The resulting term-term similarity matrix enriches term-frequency representations with weights for semantically related words; a modified inverse-document-frequency vector then produces the root document-term matrix $A_0$.

Nonnegative matrix factorization decomposes a document-term matrix into document-topic weights $W$ and topic-term weights $H$. At each level, every document is assigned to the topic with its largest weight. HyHTM then constructs a binary term hierarchy matrix $M_H$ from a smaller $k_H$-neighborhood intended to retain local parent-child relations between words. For a parent topic $i$, its topic-term vector is multiplied by $M_H$ to obtain a parent-conditioned reweighting vector $M_{ti}$. The corresponding subset of $A_0$ is multiplied elementwise by this vector before NMF learns the child topics.

This procedure recurses depth-first until it reaches either a maximum depth or a topic containing fewer than a specified minimum number of documents. The model is parametric: the number of child topics per node is fixed by the user.

## Experiments

The evaluation uses InfoVis-VAST, NeurIPS, BBC, 20 Newsgroups, Enron, Amazon Reviews, Web of Science, and AGNews, spanning 1,085 to 127,600 documents. Baselines are hLDA, TSNTM, hARTM, and CluHTM. For the parametric models, the experiments use 10 root topics, 10 children per parent, and three levels, yielding 10, 100, and 1,000 topics. Results are averaged over three runs.

HyHTM has the highest hierarchical coherence on all eight datasets. For example, it scores 0.287 on 20 Newsgroups versus 0.133 for hARTM and 0.127 for CluHTM, and 0.329 on Enron versus 0.139 and 0.107. Its ordinary topic coherence is more mixed: it leads on NeurIPS (0.338) and Enron (0.365), ties hARTM on 20 Newsgroups (0.325), and is below at least one baseline on the other datasets. Child affinity is higher than non-child affinity across the evaluated datasets, and the reported gap is larger than for the baselines. Topic specialization generally increases from level 1 to level 3 more consistently than for CluHTM.

In the 20 Newsgroups and Amazon ablation, replacing hyperbolic embeddings with Euclidean FastText lowers hierarchical coherence from 0.287 to 0.240 and from 0.123 to 0.113, respectively. The Euclidean HyHTM variant still exceeds CluHTM (0.127 and 0.085), supporting a separate contribution from parent-child reweighting. On 20 Newsgroups, HyHTM also exceeds BERTopic in coherence (0.325 versus 0.293) and hierarchical coherence (0.296 versus 0.239); adding class-based TF-IDF reduces those scores to 0.269 and 0.148.

For runtime scaling, the authors subsample 5,000 to 125,000 AGNews documents. At 125,000 documents, their HyHTM implementation is approximately 15 times faster than CluHTM. HyHTM traverses the hierarchy depth-first so it need not keep every topic representation at a level in working memory. The comparison also uses a GPU-enabled NMF implementation for HyHTM and scikit-learn NMF for CluHTM, so it does not isolate algorithmic differences from implementation differences.

## Limitations

HyHTM requires the number of child topics to be specified and tuned empirically rather than inferred from the corpus. Its similarity threshold and neighborhood sizes are also dataset-dependent hyperparameters.

The hierarchy depends on Poincare embeddings trained on Wikipedia. Their coverage, learned relationships, and biases propagate into the topic model, and those relationships may transfer poorly to specialized domains where words are organized differently. Very small hierarchy neighborhoods discard relations and make representations sparse, while very large neighborhoods dilute local parent-child structure.

The reported efficiency advantage is specific to the compared implementations: HyHTM uses GPU-enabled NMF and depth-first traversal, whereas the CluHTM baseline uses scikit-learn NMF and breadth-first storage. The comparison therefore combines modeling, traversal, and implementation choices.

## Related Concepts

- [[Hierarchical Topic Models]]
- [[Riemannian Representation Learning]]
- [[Text Embedding Models]]
- Hyperbolic embeddings
- Poincare embeddings
- Nonnegative matrix factorization
- Topic coherence

## Related Papers

- Blei, Griffiths, Jordan, and Tenenbaum (2003), "Hierarchical Topic Models and the Nested Chinese Restaurant Process."
- Isonuma, Mori, Bollegala, and Sakata (2020), "Tree-Structured Neural Topic Model."
- Viegas et al. (2020), "CluHTM: Semantic Hierarchical Topic Modeling Based on CluWords."
- Xu et al., "HyperMiner: Topic Taxonomy Mining with Hyperbolic Embedding."
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure."

[[index|Library home]]
