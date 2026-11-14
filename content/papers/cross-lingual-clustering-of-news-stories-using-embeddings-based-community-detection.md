---
title: "Cross-lingual Clustering of News Stories using Embeddings-based Community Detection"
type: paper
authors:
  - Nikolaos Nikolaidis
  - Kristina Kovacikova
  - Ion Androutsopoulos
year: null
tags:
  - news-clustering
  - multilingual-nlp
  - community-detection
---

## TL;DR

GCom clusters multilingual news using nearest-neighbor embedding graphs and Leiden community detection. A sentence-level variant links documents through shared sentence communities, improving the usefulness of smaller encoders. With LaBSE and filtered titles plus six leading sentences, it achieves AMI 0.917 on UA-RU News versus 0.757 for the matched HDBSCAN pipeline (Table 1).

## Research Question

Can graph community detection group articles about the same news event across languages efficiently, without decoder-LLM inference or encoder fine-tuning?

## Motivation

Lexical matching transfers poorly across languages, while sentence encoders can lose useful detail when applied to entire documents. Expensive generative clustering also limits access to large-scale news analysis. Event-level grouping must distinguish reports sharing a broad topic or named entity from reports describing the same event.

## Contributions

- Introduces single-vector and sentence-level GCom pipelines.
- Releases UA-RU News: 4,251 articles, 110 event clusters, and 39 languages from June 2024 coverage of Russia’s invasion of Ukraine.
- Compares 11 configurations across seven encoder families, including three Qwen3 sizes, against matched HDBSCAN baselines on two datasets.

## Method

The single-vector pipeline encodes titles, titles plus a 350-character opening snippet, or titles plus full text. PyNNDescent constructs an approximate directed nearest-neighbor graph with k = 100; model-dependent cosine-distance thresholds prune edges. Leiden partitions the graph directly into article clusters.

The sentence-level pipeline separately embeds titles and sentences, then builds and partitions a sentence graph. Sentence membership induces a document–sentence-community bipartite graph. Configuration B projects this onto sentence communities, weighting overlap with the Szymkiewicz–Simpson coefficient, before another community-detection pass. Configuration C instead partitions the weighted bipartite graph; edge weights count a document’s sentences in each community. Documents in the same mixed community become one cluster.

Optional filtering removes fragments and irrelevant material using a gradient-boosting classifier trained on 262,693 labeled sentences in 75 languages, with embeddings and sentence length as inputs. Graph resolution and distance thresholds still require choices even though the number of clusters is not specified in advance (Appendices A and C).

## Experiments

UA-RU News was independently refined by two annotators and jointly adjudicated, using titles, machine translations, and original text when needed. Miranda contains 13,874 articles in nine languages and 394 clusters. Evaluation uses homogeneity, completeness, NMI, and AMI against reference clusters. Sentence-level baselines replace the initial sentence community detection with HDBSCAN while retaining the downstream projection.

Selected LaBSE results from Tables 1–2:

| Dataset and configuration | HDBSCAN AMI | GCom AMI | HDBSCAN minutes | GCom minutes |
| --- | ---: | ---: | ---: | ---: |
| UA-RU, A: title + text | 0.481 | 0.882 | 0.34 | 0.06 |
| UA-RU, C: title + 6 sentences, filtered | 0.757 | 0.917 | 5.15 | 0.25 |
| Miranda, A: title + text | 0.441 | 0.837 | 3.62 | 0.18 |
| Miranda, C: title + 6 sentences, filtered | 0.689 | 0.861 | 33.57 | 0.79 |

These are clustering runtimes, not end-to-end embedding costs. Experiments used an AMD EPYC 7282 CPU and Quadro RTX 8000 GPU. Table 2 also reports 23.11 minutes for GCom’s all-sentence right projection, exceeding the five-minute maximum stated in Section 4.7.

On UA-RU News, BGE-M3 with filtered six-sentence mixed projection reaches NMI 0.936 and AMI 0.922 (Table 3). Full-text Qwen3-4B reaches AMI 0.905; its corresponding sentence configuration reaches 0.912. Benefits depend on encoder and dataset. Sentence configurations reduce language-based separation in Figure 3. UMAP substantially improves HDBSCAN, and some reduced-dimensional settings make it faster than GCom (Table 5); the raw-embedding runtime advantage should not be generalized to every preprocessing choice.

## Limitations

There is no development/test split, and hyperparameter exploration is incomplete. Appendix C reports dataset-specific distance thresholds and bipartite resolutions, limiting claims about transfer without tuning. Representations inherit pretrained-encoder biases. Evidence covers two text-only news datasets, with UA-RU concentrated on one conflict and month. Failure examples merge distinct actors or events and split reports of the same speech when framing differs. Full-text access restrictions may complicate reproduction.

The supplied Markdown does not explicitly identify the paper’s publication year, venue, DOI, or arXiv identifier; the year is left unset rather than inferred from references.

## Related Concepts

- [[concepts/cross-lingual-news-story-clustering|Cross-Lingual News Story Clustering]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- [[papers/measuring-issue-level-polarization-in-congressional-speech-using-community-detection-algorithms|Measuring issue-level polarization in congressional speech using community detection-algorithms]] — another use of text similarity networks and Leiden, measuring issue-attention structure rather than event identity.
- Miranda et al. (2018), “Multilingual clustering of streaming news” — source of the second evaluation dataset.
- Sannigrahi et al. (2023), “Are the best multilingual document embeddings simply based on sentence embeddings?” — cited motivation for sentence-level representations.

[[index|Library home]]
