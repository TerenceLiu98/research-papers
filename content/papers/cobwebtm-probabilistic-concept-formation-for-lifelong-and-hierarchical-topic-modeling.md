---
title: "CobwebTM: Probabilistic Concept Formation for Lifelong and Hierarchical Topic Modeling"
type: paper
authors:
  - Karthik Singaravadivelan
  - Anant Gupta
  - Zekun Wang
  - Christopher J. MacLellan
year: 2026
arxiv: "2604.14489"
tags:
  - topic-modeling
  - hierarchical-topic-modeling
  - continual-learning
  - conceptual-clustering
  - text-embeddings
---

## TL;DR

CobwebTM applies continuous [[concepts/incremental-concept-formation|Incremental Concept Formation]] to pretrained document embeddings, building and restructuring a topic tree one document at a time. It derives topic words afterward with class-based TF-IDF and can cut the tree into a dynamic flat partition. Across the reported lifelong and hierarchical benchmarks, it combines high coherence and stable assignments without fixing the number or depth of topics in advance, though results remain sensitive to the encoder and document order.

## Research Question

Can an incremental probabilistic concept hierarchy provide coherent, stable, and adaptive flat and hierarchical topics for streaming text without batch retraining, a fixed topic capacity, or a fixed-depth tree?

## Motivation

Classical probabilistic topic models commonly require a predefined topic count and use bag-of-words representations. Neural topic models can exploit richer representations but are usually trained in batches, require substantial tuning, and may forget earlier structure during sequential updates. Incremental embedding-clustering pipelines address streaming data but are often flat, parameter-sensitive, or organized into hierarchies only after clustering. CobwebTM instead treats online hierarchy construction as the topic-discovery mechanism itself.

## Contributions

- Adapts continuous Cobweb to document embeddings, using probabilistic concept formation to create and locally restructure a topic hierarchy online.
- Defines hierarchical topics from tree nodes and extracts interpretable word descriptors through class-based TF-IDF over each node's subtree documents.
- Introduces a recomputed tree cut for dynamic flat topic extraction, bounded by a maximum cluster count and a leaf-ratio criterion.
- Evaluates both lifelong behavior and hierarchy quality, including coherence, assignment stability, centroid drift, parent-child coherence, and sibling diversity.

## Method

Each document is embedded with a pretrained Transformer and inserted into a continuous Cobweb tree. Every concept node maintains a diagonal multivariate Gaussian over its assigned embedding vectors. At each level, category utility measures the expected reduction in Gaussian differential entropy obtained by knowing the child concept. Inserting a document greedily selects among four operations: add it to an existing child, create a new child, merge two children before insertion, or split a child by promoting its descendants. These operations let the hierarchy expand and reorganize without specifying a topic count or tree depth.

Every node is a candidate topic covering the documents in its subtree. CobwebTM concatenates those documents and applies class-based TF-IDF to rank descriptive words. For applications requiring flat topics, a top-down traversal selects a tree cut subject to `max_clusters` and a `leaf_ratio` threshold. The cut is recomputed as the stream changes, so flat assignments can evolve with the hierarchy.

The principal lifelong configuration uses 1,024-dimensional RoBERTa Large embeddings, an initial batch of 2,000 documents, subsequent batches of 125, `leaf_ratio = 0.15`, and `max_clusters = 1.3K`, where each dataset's recommended topic count supplies $K$. Topics across batches are greedily matched by cosine similarity of their embeddings.

## Experiments

The lifelong evaluation uses 5,000 sampled Spatiotemporal News articles, 5,000 sampled Stack Overflow posts, and about 2,800 TweetNER7 posts. Baselines include Online LDA, Lifelong DocNADE, incremental BERTopic pipelines with DBSTREAM or MiniBatchKMeans, and BERTopic pipelines refit with HDBSCAN or KMeans. [[concepts/topic-model-evaluation|Topic Model Evaluation]] covers coherence value ($C_v$), adjusted Rand index (ARI) across updates, topic centroid drift (TCD), and intruder similarity (ISIM).

CobwebTM has the highest reported final $C_v$ on all three streams: 0.741 on TweetNER, 0.613 on Stack Overflow, and 0.796 on Spatiotemporal News. Its ARI is 0.915, 0.997, and 0.984, respectively, with reported TCD of 0.000 on each dataset. MiniBatchKMeans has a higher TweetNER ARI of 0.952, and several baselines have lower ISIM on individual datasets, so CobwebTM does not dominate every metric. With the initial batch reduced from 2,000 to 500, the authors report that its lifelong advantage persists. In a TweetNER holdout injection, its coherence on the newly introduced person category reaches 1.000, matching both refit pipelines; Online LDA reaches 0.8132 and the other incremental baselines score zero.

The hierarchical evaluation compares CobwebTM with TraCo, BoxTM, and hierarchical BERTopic on 20 Newsgroups, AG News, and Stack Exchange. CobwebTM reports the highest NPMI on all three datasets (0.206, 0.108, and 0.131) and the highest parent-child coherence (0.141, 0.027, and 0.073). Its sibling diversity remains high (0.958, 0.942, and 0.959), while BoxTM is more diverse but much less coherent. Encoder ablations show similar results with smaller MiniLM models, although the best encoder varies by dataset and metric.

On 5,000 Stack Exchange documents with batches of 10, CobwebTM takes 382.94 seconds overall and 1.37 seconds for the final batch. This is close to incremental MiniBatchKMeans (362.81 and 1.52 seconds), slower than Online LDA (25.17 and 0.07 seconds), and much faster than either refit pipeline. At 20,000 and 50,000 Stack Exchange documents, its final $C_v$ is 0.6573 and 0.6441; both refit pipelines time out after 15 hours in the reported setup.

## Limitations

Topic words are produced by post hoc aggregation rather than by the hierarchy-construction objective. Performance depends on a pretrained encoder whose geometry may omit distinctions needed by the corpus; the study deliberately restricts its encoder ablation to models trained with distance-based objectives. Incremental insertion is order-sensitive, and local merge and split operations do not guarantee a globally optimal hierarchy.

The tree's statistics and traversal costs grow with the document stream, so long-running deployments may require pruning, compression, or partitioning. The lifelong tests cover three English datasets and three trials, while hierarchy tests use three established benchmarks; automated coherence, diversity, and intruder-similarity measures do not establish domain validity or human interpretability. The method can also reproduce or legitimize biases in the underlying text by presenting learned groupings as coherent topics.

## Related Concepts

- [[concepts/incremental-concept-formation|Incremental Concept Formation]]: Cobweb's category-utility search and local restructuring provide the online learning mechanism.
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]: the learned concept tree supplies broad-to-specific topic organization directly rather than through post hoc linkage.
- [[concepts/continual-learning|Continual Learning]]: the model updates from a stream while retaining and restructuring earlier topics.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: the experiments separate flat topic quality and stability from vertical and horizontal hierarchy quality.
- [[concepts/text-embedding-models|Text Embedding Models]]: pretrained document representations define the continuous feature space clustered by Cobweb.

## Related Papers

- Fisher (1987), "Knowledge Acquisition via Incremental Conceptual Clustering": introduces the Cobweb conceptual-clustering algorithm.
- Barari, Lian, and MacLellan (2024), "Incremental Concept Formation over Visual Images without Catastrophic Forgetting": supplies the continuous-valued Cobweb formulation used by CobwebTM.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]]: learns flat topics in embedding space but does not perform incremental hierarchical discovery.
- [[papers/hyhtm-hyperbolic-geometry-based-hierarchical-topic-models|HyHTM: Hyperbolic Geometry based Hierarchical Topic Models]]: uses pretrained hyperbolic word embeddings and a fixed recursive factorization rather than an evolving document hierarchy.
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure": supplies the topic-word extraction method and several clustering baselines.

[[index|Library home]]
