---
title: Cross-Lingual News Story Clustering
type: concept
tags:
  - news-clustering
  - multilingual-nlp
---

## Overview

Cross-lingual news story clustering groups articles in different languages that report the same event. Event identity is finer than shared subject matter: two reports can mention the same politicians or conflict while describing different occurrences.

## Key Ideas

- Multilingual embeddings supply a shared similarity space, but similarity may still reflect language, framing, or generic topical overlap.
- Document-level representations are economical; sentence-level representations preserve local evidence and can connect documents through shared sentence communities.
- GCom constructs a sparse nearest-neighbor graph and applies Leiden community detection. Its sentence variant aggregates through a document–sentence-community bipartite graph, avoiding a single pooled document vector.
- Homogeneity measures whether clusters mix reference stories; completeness measures whether a reference story is fragmented. AMI adjusts mutual information for chance. Language homogeneity is a separate diagnostic, not a substitute for story accuracy.
- Annotation must specify how updates, reactions, opinion pieces, and follow-up events relate to the original story. Reported performance depends on this granularity as well as the embedding model and graph thresholds.

## Important Papers

- [[papers/cross-lingual-clustering-of-news-stories-using-embeddings-based-community-detection|Cross-lingual Clustering of News Stories using Embeddings-based Community Detection]] — compares document and sentence graph pipelines and introduces UA-RU News.
- Miranda et al. (2018), “Multilingual clustering of streaming news” — multilingual news clustering dataset used in GCom’s evaluation.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]] — shared vector representations enable cross-language comparisons.
