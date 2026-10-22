---
title: Topic Modeling for Short Texts via Optimal Transport-Based Clustering
type: paper
authors:
  - Tu Vu
  - Manh Do
  - Tung Nguyen
  - Linh Ngo Van
  - Sang Dinh
  - Thien Huu Nguyen
year: null
source_job_id: "4ecf55ac-105e-4584-b4cb-dd73586cd265"
tags:
  - topic-modeling
  - short-text
  - optimal-transport
  - document-clustering
---

## TL;DR

EnCOT adds two optimal-transport regularizers to neural topic models: one aligns document representations with learned cluster centroids, and the other aligns topic embeddings with the same centroids. When attached to GloCOM, it improves document-clustering purity and NMI over the tested baselines on four short-text datasets and usually reaches the maximum reported topic-diversity score. The evidence is strongest for representation separation in these static benchmarks; cluster centroids are discarded at inference, and the paper does not test dynamic or streaming topic models.

## Research Question

Can shared cluster centroids and optimal-transport objectives jointly separate short-document representations and topic embeddings, improving both document-topic distributions and topic quality under sparse word co-occurrence?

## Motivation

Short documents provide too little word co-occurrence for reliable topic inference. [[concepts/document-aggregation-for-short-text-topic-modeling|Document aggregation for short-text topic modeling]] can recover global context, but the paper argues that aggregation alone does not directly regularize either document-topic representations or topic embeddings for separation. EnCOT therefore treats documents, topics, and global cluster centroids as distributions to be aligned through [[concepts/optimal-transport|Optimal Transport]].

## Contributions

- Introduces a document-to-cluster optimal-transport loss that jointly updates topic-space document representations and cluster centroids.
- Introduces a topic-to-cluster optimal-transport loss that organizes topic embeddings around the same centroids, providing a higher-level grouping of related topics.
- Defines EnCOT as an additive regularizer that can be attached to multiple neural topic models rather than only one architecture.
- Evaluates the method with ETM, ECRTM, and GloCOM on four short-text datasets using topic coherence, topic diversity, purity, NMI, and an LLM-based topic score.

## Method

The main instantiation augments GloCOM. GloCOM first embeds short texts with a pretrained language model, clusters those embeddings, concatenates documents within each cluster into a global document, and combines local and global latent variables to infer each document's topic proportions. Its reconstruction target also mixes the local bag of words with the corresponding global bag of words.

EnCOT represents document $d$ in the topic-embedding space as

$$
x_{emb}^{d}=\theta_d^g\mathcal{T},
$$

where $\theta_d^g$ is its inferred topic distribution and $\mathcal{T}$ is the topic-embedding matrix. It then solves an entropy-regularized transport problem between a uniform distribution over document representations and a uniform distribution over $G$ trainable centroids, using squared Euclidean ground cost. The resulting document-cluster loss encourages related document representations to share centroids.

A second transport problem uses the same form between the $K$ topic embeddings and the $G$ centroids. The complete regularizer is

$$
\mathcal{L}_{EnCOT}=\lambda_{OT}^{DG}\mathcal{L}_{OT}^{DG}
+\lambda_{OT}^{TG}\mathcal{L}_{OT}^{TG},
$$

and GloCOM-EnCOT adds it to GloCOM's topic-modeling and embedding-clustering losses. The centroids are updated during minibatch training but are not used to infer topic proportions for held-out documents.

## Experiments

The experiments use four preprocessed short-text datasets: GoogleNews, SearchSnippets, StackOverflow, and Biomedical. The reported post-filtering sizes are 11,019, 12,294, 16,378, and 19,433 documents. Documents are embedded with `all-MiniLM-L6-v2` and clustered with DBSCAN; the main EnCOT comparison uses 30 clusters and either 50 or 100 topics. Baselines include ProdLDA, ETM, ECRTM, FASTopic, NQTM, TSCTM, kNNTM, and GloCOM. See [[concepts/topic-model-evaluation|Topic Model Evaluation]] for why the reported metrics measure distinct properties.

**GloCOM comparison.** With 50 topics, adding EnCOT changes GloCOM's purity/NMI from 0.586/0.817 to 0.613/0.848 on GoogleNews, from 0.806/0.502 to 0.839/0.530 on SearchSnippets, from 0.653/0.588 to 0.675/0.622 on StackOverflow, and from 0.546/0.437 to 0.557/0.447 on Biomedical. With 100 topics, the corresponding changes are 0.761/0.900 to 0.801/0.911, 0.822/0.501 to 0.839/0.516, 0.658/0.585 to 0.679/0.609, and 0.536/0.422 to 0.557/0.445.

**Topic quality.** GloCOM-EnCOT reports topic diversity of 1.0 on all four datasets at both 50 and 100 topics. Coherence does not improve uniformly over base GloCOM: for example, GoogleNews coherence falls from 0.475 to 0.450 at 50 topics and from 0.450 to 0.420 at 100 topics, while the document-clustering scores improve. This is an important trade-off behind the paper's broader topic-quality claim. The appendix reports higher LLMScore for EnCOT than ECRTM and kNNTM on all four datasets, although the supplied StackOverflow ECRTM value of `12.0` is anomalous relative to the other values and should not be treated as reliable without checking the source table.

**Portability.** Adding EnCOT to ETM and ECRTM improves most reported topic-diversity, purity, and NMI results at 50 and 100 topics. For GloCOM, the improvements in purity and NMI are consistent across all four datasets and both topic counts, while coherence is mixed.

**Ablation and sensitivity.** Removing topic-to-cluster alignment has small or mixed effects at 50 topics, including a slightly higher NMI on GoogleNews and slightly higher purity on StackOverflow and Biomedical. Its benefit becomes more consistent as the topic count grows: at 200 topics, the full model is at least as strong on every reported metric and improves purity and NMI across all four datasets. Sensitivity experiments vary the cluster count and loss weights; results remain broadly stable, but the tables do show metric-level variation rather than complete insensitivity.

## Limitations

- The learned centroids contribute during training but are omitted during held-out inference, so their potential as corpus-level representations is not evaluated.
- The experiments cover static short-text corpora. The authors explicitly identify dynamic, online, and streaming topic modeling as unresolved settings where temporal topic relationships may require a different design.
- Topic diversity reaches 1.0 in most settings, but coherence sometimes decreases relative to GloCOM. Maximum word-list diversity alone does not establish more coherent or more useful topics.
- The topic-to-cluster ablation provides limited evidence at smaller topic counts and clearer gains at larger counts, so hierarchical topic organization should be interpreted as a proposed mechanism rather than a directly validated hierarchy.
- The evaluation uses dataset labels through purity and NMI, automated coherence/diversity, and an LLM-based score. It reports no human topic-interpretation study for EnCOT.
- The supplied Markdown provides no stable paper identifier or reliable publication year, so neither is inferred here. It also contains an anomalous LLMScore table entry for ECRTM on StackOverflow.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/document-aggregation-for-short-text-topic-modeling|Document Aggregation for Short-Text Topic Modeling]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]

## Related Papers

- [[papers/glocom-a-short-text-neural-topic-model-via-global-clustering-context|GloCOM: A Short Text Neural Topic Model via Global Clustering Context]] supplies the main architecture and global aggregation mechanism extended by EnCOT.
- Zhao et al. (2021), "Neural Topic Model via Optimal Transport," applies optimal transport within neural topic modeling and is discussed as prior methodological context.
- Wu et al. (2023), "Effective Neural Topic Modeling with Embedding Clustering Regularization," introduces ECRTM, one of the tested base models and a component used by GloCOM.
- [[papers/neural-topic-modeling-via-contextual-and-graph-information-fusion|Neural Topic Modeling via Contextual and Graph Information Fusion]] offers a complementary approach to improving topic and document representations with contextual and corpus-level graph information.

[[index|Library home]]
