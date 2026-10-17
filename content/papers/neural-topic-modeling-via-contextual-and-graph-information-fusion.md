---
title: Neural Topic Modeling via Contextual and Graph Information Fusion
type: paper
authors:
  - Jiyuan Liu
  - Jiaxing Yan
  - Chunjiang Zhu
  - Xingyu Liu
  - Qing Li
  - Yanghui Rao
year: null
tags:
  - topic-modeling
  - contextual-embeddings
  - graph-regularization
  - variational-inference
---

## TL;DR

CGTM combines TF-IDF and contextual document representations at the topic level, aligns and sharpens their topic distributions, and regularizes word embeddings with a corpus-level co-occurrence graph. It improves topic coherence and overall topic quality on three main benchmarks, with additional Arxiv and Web of Science results. Human intrusion tests support improved interpretability, but FASTopic retains better document-clustering scores on 20News.

## Research Question

Can contextual document information and corpus-wide word relationships jointly produce informative, coherent topics while preserving useful and interpretable document-topic distributions?

## Motivation

Contextual embeddings provide semantic information, whereas TF-IDF emphasizes corpus-specific words. Simply concatenating these representations need not align their latent topics. Separately, topic words may lack internal consistency when a model does not exploit word co-occurrence across the corpus. CGTM addresses these problems through topic-level fusion and graph-guided word representations.

## Contributions

- Introduces a variational topic model with two document views and a learned topic-wise fusion layer.
- Uses shared TF-IDF reconstruction to align the views and a self-training target to sharpen fused topic assignments.
- Adds residual graph information fusion and graph reconstruction to constrain word embeddings.
- Evaluates topic coherence, diversity, human interpretability, label alignment, downstream classification, clustering, and computational cost.

## Method

**Document views and fusion.** A shared encoder maps TF-IDF and projected sentence embeddings to Gaussian latent parameters. Reparameterized samples pass through softmax to produce two document-topic distributions. The model concatenates equally weighted distributions, applies a learned transformation and ReLU, and normalizes with softmax. Appendix A fixes the two posterior mixture weights at 0.5. This is [[Contextual and Graph Fusion for Topic Modeling|fusion at the topic level]], rather than direct concatenation of input features.

**Alignment and sharpening.** Both views reconstruct the same TF-IDF vector through a shared topic-word decoder, encouraging corresponding topic dimensions to carry compatible meanings. The fused distribution is sharpened by minimizing KL divergence to a target proportional to squared topic probabilities divided by each topic's corpus-wide assignment mass. These constraints encourage shared topic structure and stronger document-specific assignments, respectively.

**Graph information.** Words co-occur when both TF-IDF values exceed a threshold in a document. Counts accumulated across training documents form a weighted graph, normalized as $R_{ij}=A_{ij}/(D_iD_j)$, where $D_i$ is the node degree in the co-occurrence matrix. With word embeddings arranged by row, graph fusion is

$$
\hat\rho=(I+\epsilon R)\rho.
$$

A graph decoder applies softmax to pairwise cosine similarities of adjusted embeddings and penalizes KL divergence from that reconstructed distribution to $\operatorname{softmax}(R)$. The document decoder reconstructs TF-IDF from document-topic weights and a softmax topic-word matrix based on topic-word embedding dot products. Training combines the variational objective with contextual and graph constraints (Sections 3.2-3.4).

## Experiments

The main datasets are 20News (11,314 training and 7,531 test documents), NYT (7,456/5,233), and AGnews (59,000/3,800). Ten baselines include LDA, ProdLDA, ETM, CombinedTM, GNTM, BERTopic, CWTM, ECRTM, GINopic, and FASTopic. Appendix B reports five-run averages, training-only graph construction, evaluation on unseen test data, and selection of the highest-TQ checkpoint during training.

Table 3 reports the following results. The strongest baseline is selected separately for each metric; TQ combines coherence and topic uniqueness.

| Dataset | CGTM NPMI | Best baseline NPMI | CGTM TQ | Best baseline TQ |
| --- | --- | --- | --- | --- |
| 20News | 0.346 | 0.281 (GINopic) | 0.325 | 0.212 (BERTopic) |
| NYT | 0.323 | 0.294 (ProdLDA) | 0.308 | 0.270 (ProdLDA) |
| AGnews | 0.264 | 0.217 (GINopic) | 0.250 | 0.157 (ProdLDA) |

The paper marks these gains significant at $p<0.05$ using paired t-tests. CGTM also leads in coherence value on all three datasets. Topic uniqueness is not uniformly best: ECRTM scores 0.956 on 20News versus CGTM's 0.940.

**Human and label-based evaluation.** Eight computer-science graduate students perform word and topic intrusion tasks. The design samples 25 of 100 topics for word intrusion and one document per label for topic intrusion. Table 4 gives CGTM a word intrusion score of 0.750 versus GINopic's 0.530, and a topic intrusion score of 0.713, tied with GINopic. Table 5 reports label-aligned NPMI of 0.381 and average relevance of 2.925, versus 0.296 and 2.675 for GINopic. These label-alignment judgments use LLM evaluation and should be distinguished from human judgments.

**Representation trade-off.** SVM classification using topic proportions is described as comparable to FASTopic; exact Figure 3 values are not transcribed in the supplied Markdown. Appendix H reports lower clustering performance than FASTopic on 20News: CGTM purity/ARI/NMI are 0.316/0.140/0.329 versus 0.465/0.256/0.471. Thus, improved interpretability does not imply superior clustering.

**Ablations.** In Table 7, removing topic alignment lowers TQ from 0.325 to 0.241 and uniqueness from 0.937 to 0.705. Replacing topic-wise fusion with standard mixture fusion lowers NPMI from 0.347 to 0.294 and classification accuracy from 0.655 to 0.515, even though uniqueness rises to 0.996. Removing the graph decoder or graph fusion lowers TQ to 0.300 or 0.299. Removing sharpening lowers classification accuracy to 0.590.

**Scale and cost.** CGTM takes 1,505 seconds with 3.99M parameters for the reported 500-epoch 20News comparison, versus 64 seconds for FASTopic and 8,501 seconds for GINopic. On Arxiv, with 131,160 training documents, it takes 3,620 seconds with 11.54M parameters. Appendix G reports TQ of 0.237 on Arxiv and 0.232 on WoS, versus ProdLDA's 0.218 and 0.193. Sparse storage reduces the Arxiv graph's nonzero entries to 5.8% of the dense matrix.

## Limitations

Interpretability is encouraged indirectly through reconstruction, alignment, and sharpening. Topic intrusion can reward repetitive topics, and the small human evaluation uses a specialized participant pool. Label alignment treats dataset labels as informative themes; this measures correspondence to those labels rather than establishing that all useful corpus themes have been recovered. See [[Topic Model Evaluation]] for the distinction between these criteria.

The graph introduces vocabulary-quadratic storage in its dense form, and the reported sparse representation does not establish that all pairwise graph-decoder operations avoid quadratic cost. Hyperparameters control trade-offs among coherence, uniqueness, and classification; larger graph fusion strength can increase both coherence and redundancy. Runtime gains are relative to particular baselines, not universal.

The supplied Markdown has damaged appendix passages and inconsistent reporting. Table 12's TIS values for ProdLDA and CombinedTM differ from Table 4 and match its WIS entries; Table 11 marks WoS uniqueness as an improvement despite FASTopic's larger value (0.961 versus 0.937). Appendix B's contextual encoder name and citation are inconsistent. The summary therefore uses Table 4 for intrusion scores and avoids asserting a precise encoder checkpoint. The source supplies neither a publication year nor a stable identifier, so these are not inferred.

## Related Concepts

- [[Contextual and Graph Fusion for Topic Modeling]]
- [[Topic Model Evaluation]]
- [[Text Embedding Models]]
- [[Amortized Variational Inference]]

## Related Papers

- Bianchi, Terragni, and Hovy (2021), "Pre-training is a Hot Topic: Contextualized Document Embeddings Improve Topic Coherence" (contextual embedding baseline).
- Adhya and Sanyal (2024), "GINopic: Topic Modeling with Graph Isomorphism Network" (graph-based baseline).
- Wu et al. (2024), "FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model" (contextual and optimal-transport baseline).
- [[HyHTM: Hyperbolic Geometry based Hierarchical Topic Models]] also enriches topic modeling with word relationships, but targets hierarchical topic structure.
- [[Sparse Autoencoders are Topic Models]] offers a complementary embedding-space approach to thematic representations; it is a library connection, not a CGTM baseline.

[[index|Library home]]
