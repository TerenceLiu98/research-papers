---
title: "FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model"
type: paper
authors:
  - Xiaobao Wu
  - Thong Nguyen
  - Delvin Ce Zhang
  - William Yang Wang
  - Anh Tuan Luu
year: 2024
tags:
  - topic-modeling
  - optimal-transport
  - contextual-embeddings
  - representation-learning
---

## TL;DR

FASTopic learns document-topic and topic-word distributions as two entropically regularized transport plans among pretrained document embeddings and learnable topic and word embeddings. Its single bag-of-words reconstruction objective avoids a variational autoencoder, and the reported experiments show strong topic quality, document clustering, transfer, and runtime across six text datasets.

## Research Question

Can a topic model jointly deliver coherent and diverse topics, accurate document-topic distributions, fast training, and stable behavior across domains and dataset configurations without the complexity of a variational autoencoder or the indirect assignments of clustering-based methods?

## Motivation

The paper identifies a trade-off in prior neural topic models. VAE-based models explicitly learn topic distributions but can require complex encoders, decoders, and auxiliary objectives. Clustering-based models are faster but may produce repetitive topics or only approximate document-topic mixtures. Directly applying a softmax to distances between documents and topic embeddings can also concentrate most relation mass on a small subset of topics, which the paper calls relation bias.

## Contributions

- Introduces dual semantic-relation reconstruction (DSR), which represents documents, topics, and words in one embedding space and reconstructs bag-of-words documents through document-topic and topic-word relations.
- Defines the embedding transport plan (ETP), using entropically regularized [[concepts/optimal-transport|Optimal Transport]] to impose marginal constraints on both relations.
- Provides an out-of-sample rule for inferring topic mixtures from new document embeddings without resolving the corpus-level transport problem.
- Evaluates topic quality, clustering, classification, transfer, runtime, and sensitivity to topic count, corpus size, vocabulary size, and document encoder on six benchmark datasets.

## Method

FASTopic starts with fixed document embeddings from a pretrained Transformer and randomly initialized, learnable topic and word embeddings in the same dimensional space. DSR interprets a document-to-topic relation matrix as document-topic distributions $\theta$ and a topic-to-word relation matrix as topic-word distributions $\beta$. It minimizes the negative log reconstruction of each bag-of-words document under $\beta\theta$.

ETP obtains both relation matrices from separate entropically regularized transport problems. The first transports uniform document mass to learnable topic masses using squared Euclidean document-topic costs. Row-normalizing its transport plan yields $\theta$. The second transports topic mass to learnable word masses using topic-word costs; column normalization yields $\beta$. Marginal constraints prevent topic or word embeddings from receiving arbitrarily little mass, while Sinkhorn iterations make the plans differentiable and practical to optimize. Training updates the topic and word embeddings and their mass vectors through the DSR loss.

For a new document, FASTopic compares its embedding with each learned topic embedding, scales that affinity by the topic's aggregate affinity to the training documents, and normalizes across topics. This approximates the learned topic-mass correction without recomputing a joint transport plan.

## Experiments

The study uses 20 Newsgroups, New York Times, Web of Science, NeurIPS papers, ACL papers, and Wikitext-103. Baselines cover conventional models (LDA-Mallet and NMF), clustering (BERTopic), and VAE-based neural models (CombinedTM, GINopic, ProGBN, HyperMiner, and ECRTM). [[concepts/topic-model-evaluation|Topic Model Evaluation]] includes coherence value and topic diversity for topic words, Purity and NMI for document clustering, and SVM accuracy and F1 from inferred topic mixtures. The paper does not report perplexity because it regards that measure as incomparable across the included model families.

FASTopic is reported as the strongest or statistically tied model on most topic-quality and clustering comparisons. It also leads the reported downstream classification and cross-domain transfer experiments. All six runtime measurements are under one minute; the comparison excludes data loading, and the paper reports that some baselines take up to roughly 30 minutes. A NYT breakdown attributes 7.10 seconds to loading document embeddings and 5.85 seconds to FASTopic training.

The ETP ablation provides the clearest component evidence. On 20 Newsgroups, replacing ETP with parameterized softmax reduces coherence from 0.426 to 0.368, diversity from 0.983 to 0.391, Purity from 0.577 to 0.401, and NMI from 0.525 to 0.452. The same qualitative degradation appears on the other five datasets and with only ten topics. On Web of Science, the full model remains competitive as topic count varies from 75 to 200, corpus size from 15,000 to 40,000 documents, and vocabulary size from 20,000 to 50,000 while retaining one hyperparameter setting.

## Limitations

The authors identify the pretrained document encoder's maximum input length as the main limitation, since truncation can impair extremely long documents. Although experiments include long academic papers, this does not establish robustness beyond the encoder's context window.

The empirical claims are tied to six English-language datasets, one primary Sentence-Transformer configuration, and the selected baselines and metrics. Automated coherence and diversity do not by themselves establish human interpretability, and label-based clustering or classification measures representation utility rather than topic validity. Runtime excludes data loading, including document embedding computation, so the reported training speed is not an end-to-end ingestion measurement. Transfer is evaluated by training on Wikitext-103 and testing topic features on three classification datasets rather than by a broader multilingual or temporal shift study.

## Related Concepts

- [[concepts/continuous-topic-models|Continuous Topic Models]]: FASTopic also learns topics in an embedding space, but retains explicit word distributions and reconstructs bag-of-words documents.
- [[concepts/optimal-transport|Optimal Transport]]: entropically regularized transport plans define the two semantic-relation matrices.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: separates topic-word quality from document representation quality and runtime.
- [[concepts/text-embedding-models|Text Embedding Models]]: pretrained document representations supply FASTopic's semantic input space.

## Related Papers

- Zhao et al. (2021), "Neural Topic Model via Optimal Transport": uses optimal transport inside a variational neural topic model.
- Wu et al. (2023), "Effective Neural Topic Modeling with Embedding Clustering Regularization": regularizes topic embeddings with optimal transport while retaining a VAE framework.
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure": the principal clustering-based comparison.
- [[papers/neural-topic-modeling-via-contextual-and-graph-information-fusion|Neural Topic Modeling via Contextual and Graph Information Fusion]]: later compares topic-level contextual and graph fusion against FASTopic.
- [[papers/sparse-autoencoders-are-topic-models|Sparse Autoencoders are Topic Models]]: a later embedding-space topic model evaluated against FASTopic.

[[index|Library home]]
