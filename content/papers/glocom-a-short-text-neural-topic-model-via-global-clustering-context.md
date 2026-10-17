---
title: "GloCOM: A Short Text Neural Topic Model via Global Clustering Context"
type: paper
authors:
  - Quang Duc Nguyen
  - Tung Nguyen
  - Duc Anh Nguyen
  - Linh Van Ngo
  - Sang Dinh
  - Thien Huu Nguyen
year: null
tags:
  - topic-modeling
  - short-text
  - document-clustering
  - variational-inference
---

## TL;DR

GloCOM clusters pretrained text embeddings, pools each cluster into a global document, and uses that context both to infer individual document-topic distributions and to augment reconstruction targets. Across four short-text benchmarks, it reports the highest NMI at both 50 and 100 topics. Coherence, diversity, and purity gains are not universal, and its computational advantage over kNNTM concerns expensive neighbor preprocessing rather than faster model training.

## Research Question

Can semantic document aggregation address missing word co-occurrences and incomplete reconstruction targets in short texts while retaining a distinct topic distribution for each document?

## Motivation

Short texts provide few observed word co-occurrences (**data sparsity**). Their bag-of-words reconstruction targets also omit relevant but unobserved vocabulary (**label sparsity**, not a shortage of supervised class labels). Earlier aggregation approaches may require metadata, lose individual document representations, or incur expensive pairwise comparisons. GloCOM uses semantic clustering to supply broader context while preserving local adaptation.

## Contributions

- Constructs global documents through K-means clustering of pretrained document embeddings.
- Couples a global topic representation with a document-specific latent adapter to infer local topic proportions.
- Reuses aggregated word counts as weighted reconstruction targets.
- Evaluates topic quality, document clustering, component ablations, embedding choices, hyperparameter sensitivity, and computational cost.

## Method

**Aggregation.** The default encoder is all-MiniLM-L6-v2. K-means partitions document embeddings into $G$ groups, and bag-of-words vectors within group $g$ are summed into $x^g$. The target for document $d$ becomes

$$
\tilde{x}^d=x^d+\eta x^g.
$$

The global document includes the local document itself. $G$ controls context aggregation and is distinct from the number of modeled topics $K$. This is an instance of [[concepts/document-aggregation-for-short-text-topic-modeling|Document Aggregation for Short-Text Topic Modeling]].

**Global and local inference.** Separate networks infer a global latent representation from $x^g$ and an adaptive variable $\rho_d$ from $x^d$. The stated priors are logistic-normal for the global topic distribution and $\mathcal N(\mathbf 1,\epsilon I)$ for the adapter. Equation 2 constructs the local proportions as

$$
\theta_d^g=\operatorname{softmax}(\theta^g\odot\rho_d).
$$

The factorized variational approximation uses [[concepts/amortized-variational-inference|Amortized Variational Inference]] and reparameterized samples. Thus, documents share context without being forced to share identical topic weights.

**Decoder and objective.** Topic-word weights depend on squared distances between word and topic embeddings. Reconstruction uses $\operatorname{softmax}(\beta\theta_d^g)$ and the augmented target. Training combines reconstruction, prior regularization for both latent components, and embedding clustering regularization inherited from ECRTM. The latter uses entropic optimal transport between word and topic embeddings to discourage repeated topics; GloCOM therefore avoids pairwise document transport for aggregation, but does not eliminate optimal transport altogether.

## Experiments

After preprocessing, the datasets contain 11,019 GoogleNews titles, 12,294 SearchSnippets, 16,378 StackOverflow titles, and 19,433 Biomedical titles (Table 4). Mean lengths range from 4.988 to 14.426 words. The authors use 200 aggregation groups for GoogleNews and 40 for the other datasets, with $K=50$ and $K=100$ topics.

Baselines are ProdLDA, ETM, ECRTM, FASTopic, NQTM, TSCTM, and an author reimplementation of kNNTM. Topic coherence (TC) is $C_V$ computed with Palmetto and a Wikipedia reference corpus; topic diversity (TD) is the fraction of unique top words. Both use 15 words per topic. Purity and normalized mutual information (NMI) evaluate document clustering. Appendix D reports means and standard deviations over three runs.

Selected results at $K=50$ from Tables 2 and 11:

| Dataset | GloCOM TC | kNNTM TC | GloCOM purity | kNNTM purity | GloCOM NMI | kNNTM NMI |
| --- | --- | --- | --- | --- | --- | --- |
| GoogleNews | 0.475 | 0.435 | 0.586 | 0.579 | 0.817 | 0.795 |
| SearchSnippets | 0.453 | 0.425 | 0.806 | 0.768 | 0.502 | 0.429 |
| StackOverflow | 0.390 | 0.380 | 0.653 | 0.636 | 0.588 | 0.490 |
| Biomedical | 0.490 | 0.490 | 0.546 | 0.526 | 0.437 | 0.380 |

GloCOM has the highest reported purity and NMI on all four datasets at 50 topics. At 100 topics, it retains the highest NMI throughout, but GoogleNews purity is lower than kNNTM's (0.761 versus 0.797). Biomedical coherence at 100 topics is 0.462, below TSCTM's 0.485 and kNNTM's 0.483. ECRTM also exceeds GloCOM's diversity in several settings. These are distinct axes of [[concepts/topic-model-evaluation|Topic Model Evaluation]].

**Ablations.** On GoogleNews at 50 topics, full GloCOM reaches TC/NMI of 0.475/0.817, compared with 0.465/0.768 without global-context inference and 0.436/0.770 without target augmentation. On SearchSnippets, full GloCOM reaches 0.453/0.502; removing augmentation yields 0.445/0.491 while increasing TD from 0.956 to 1.000 (Table 3). Both components support clustering quality, but augmentation can trade diversity for coherence.

**Embeddings and sensitivity.** Section 4.4 reports that pretrained embeddings outperform TF-IDF clustering, and LLM2Vec improves all evaluated metrics over the default encoder on SearchSnippets. Exact plotted values are not supplied as text. Increasing augmentation from 0.01 to 1.0 lowers TD from 1.000 to 0.878, while TC peaks at 0.453 with augmentation 0.1 (Table 7). The default 40 groups does not maximize every metric: 30 groups produces NMI 0.529 versus 0.502 with 40 groups (Table 10).

**Cost.** For SearchSnippets with 50 topics, Table 6 reports 540 seconds and 1,298 MB for GloCOM versus 53 seconds and 2,120 MB for kNNTM training. The table separately reports 50 hours on four A100 GPUs for kNNTM's pairwise transport preprocessing. Appendix C.3 describes about two weeks for preprocessing all four datasets. These scopes should not be combined into a training-speed claim. GloCOM is trained for 200 epochs with batch size 200 and Adam learning rate 0.002.

## Limitations

The authors identify manual selection of the aggregation group count and difficulty adapting pretrained-embedding clustering to dynamic or real-time corpora. Context quality depends on the embedding and clustering stages. Automatic coherence and label-based clustering provide evidence about topic words and representations, but the reported evaluation does not include human interpretability testing.

The kNNTM comparison uses the authors' reimplementation because its code was unavailable to them. Runtime measurements distinguish training from preprocessing, and the paper does not provide a complete matched end-to-end timing for both pipelines. Hyperparameters are grid-searched, but the supplied text does not clearly specify a held-out selection protocol.

The supplied mathematical text has inconsistencies: Equation 1 normalizes its topic-word weights over topics, despite the generative description treating each topic as a word distribution; Equation 3 labels an expression with a negative reconstruction term and negative KL terms as a lower bound. The method summary preserves the described components without presenting these expressions as a verified likelihood implementation. No publication year or stable paper identifier is explicit in the supplied Markdown, so neither is inferred from its references.

## Related Concepts

- [[concepts/document-aggregation-for-short-text-topic-modeling|Document Aggregation for Short-Text Topic Modeling]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]

## Related Papers

- Lin et al. (2024), "Combating Label Sparsity in Short Text Topic Modeling via Nearest Neighbor Augmentation": kNNTM supplies the direct target-augmentation comparison.
- Wu et al. (2023), "Effective Neural Topic Modeling with Embedding Clustering Regularization": supplies the ECRTM base and word-topic regularizer.
- Quan et al. (2015), "Short and Sparse Text Topic Modeling via Self-Aggregation": earlier aggregation approach discussed in the paper.
- [[papers/neural-topic-modeling-via-contextual-and-graph-information-fusion|Neural Topic Modeling via Contextual and Graph Information Fusion]] is a related library paper that combines contextual document views and word graphs; it is not a reported GloCOM baseline.

[[index|Library home]]
