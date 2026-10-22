---
title: "Beyond Top Words: MonoTM for Topic Modeling with Interpretable Monosemantic Features"
type: paper
authors:
  - Una Joh
  - Bei Yu
year: null
tags:
  - topic-modeling
  - sparse-autoencoders
  - interpretability
  - document-embeddings
  - semantic-features
---

## TL;DR

MonoTM is an interpretable topic model that separates two roles of [[Sparse Autoencoders|sparse-autoencoder]] features. It estimates document-topic mixtures from the full bag of SAE activations, then holds those mixtures fixed while learning topic descriptors over a separately validated vocabulary of corpus-trained semantic features. On 20 Newsgroups and Web of Science, its bag-of-features LDA has the strongest reported Micro- and Macro-F1 among the tested models; on Reuters it has the strongest Macro-F1 but not Micro-F1. The experiments show that features useful for statistical inference need not be the features easiest to label reliably.

## Research Question

Under which SAE configurations do corpus-trained features support reliable semantic interpretation and effective document-topic mixture estimation, and how can a topic model combine those two functions without requiring one feature subset or SAE configuration to optimize both?

## Motivation

Topic models commonly expose topics through their highest-probability words, even when contextual embeddings contribute to inference. Such word lists can be too lexical to express the semantic units analysts need for comparing documents and topics. SAEs offer sparse features over document embeddings, but an interpretable label for a feature and the feature's usefulness for estimating topic mixtures are different properties.

The paper treats this mismatch as a design constraint. Filtering inference inputs to only the easiest-to-interpret features can discard statistical signal, while interpreting every active feature can produce unreliable descriptions. MonoTM therefore assigns estimation and interpretation to separate representations linked through fixed document-topic mixtures.

## Contributions

- Trains TopK SAEs on corpus-specific document embeddings and maps how dictionary expansion and per-document activity affect feature interpretability.
- Evaluates SAE activations as a nonnegative bag-of-features vocabulary for LDA across 20 Newsgroups, Web of Science, and Reuters.
- Shows empirically that SAE configurations and feature subsets favorable to mixture estimation do not fully coincide with those favorable to validated interpretation.
- Introduces MonoTM, which learns topic mixtures from all active features and a second topic-feature distribution from validated, natural-language-labeled features.
- Audits excluded high-association features and demonstrates topic comparison through overlap in a shared validated-feature space.

## Method

Documents are embedded with `llama-embed-nemotron-8b` into 4,096 dimensions and standardized within each corpus. A tied-weight TopK SAE learns a dictionary of size $4096N$, where expansion factor $N$ controls dictionary capacity and $K$ caps active features per document. The study sweeps $N$ from $1/64$ to 5 and $K$ from 4 to 512 where the configuration is feasible.

Feature descriptions are generated and tested with an Interpreter-Predictor protocol. The Interpreter sees maximally activating, typically activating, and inactive documents and proposes a short label. A separate Predictor receives only that label and a held-out document, predicts whether the feature activates, and yields a feature-level F1 interpretability score, $IS(f)$.

For mixture estimation, active SAE magnitudes form a sparse nonnegative bag-of-features matrix. LDA is fit over this matrix without restricting it to interpretable features. MonoTM then constructs a separate interpretation matrix from features that activate in at least 30 documents, have nonempty labels, and satisfy $IS(f) \geq 0.8$. Each retained activation is weighted by its interpretability score. With the document-topic matrix $\Theta$ fixed, a Dirichlet-smoothed EM procedure estimates a topic-feature distribution $B$ over this validated vocabulary. MonoTM can use distinct SAE configurations for mixture estimation and interpretation.

## Experiments

The three benchmarks are 20 Newsgroups, Web of Science (WOS-46985), and Reuters-21578. The number of inferred topics equals the number of benchmark categories: 20, 7, and 47. Single-label mixtures are evaluated after Hungarian topic-label alignment with Micro- and Macro-F1. Reuters uses thresholded multilabel predictions and one-to-one topic-label alignment.

Bag-of-features LDA reports Micro/Macro-F1 of 0.6770/0.6489 on 20 Newsgroups and 0.5753/0.5446 on Web of Science, the strongest values in the paper's comparison with BoW-LDA, CombinedTM, ZeroShotTM, ECRTM, FASTopic, and $S^3$. On Reuters it reports 0.3188/0.2089: BoW-LDA has higher Micro-F1 at 0.3446, while bag-of-features LDA has the highest Macro-F1.

Interpretability and inference favor different regimes. At $N=0.5$ on 20 Newsgroups, increasing $K$ from 8 to 32 lowers the share of dictionary features with $IS \geq 0.8$ from 35.2% to 13.8%, while Micro/Macro-F1 rises from 0.56/0.52 to 0.66/0.63. Refitting LDA after filtering to high-IS features generally reduces mixture quality, with larger losses at stricter thresholds.

An excluded-feature audit compares lower-validation features that rank in a topic's top 20 against validated same-topic descriptors. Their document-level activation profiles are closer to nearest validated descriptors than to random same-topic descriptors, particularly on 20 Newsgroups and Web of Science. On Reuters, 70.7% of the audited labels are heuristically classified as format, register, or numeric cues. This is supporting evidence for coverage, not proof that validation never removes meaningful topic content.

Under fixed topic mixtures, qualitative comparisons suggest that MonoTM descriptors occupy a broader semantic level than lexical TF-IDF lists and are less tied to particular sampled documents than free-form LLM descriptors. A Web of Science demonstration also uses shared validated-feature mass to explain relations between topic pairs.

## Limitations

Feature validation is mediated by the selected Interpreter and Predictor LLMs, prompts, and thresholds rather than by a ground-truth test of monosemanticity. Model blind spots may systematically exclude registers, dialects, cultural concepts, or domain-specific distinctions, so high-impact uses require coverage audits and expert review.

The labeling and validation pipeline requires many LLM calls and is expensive for iterative analysis. The experiments use three benchmark corpora, fixed category counts, and gold-label alignment, which tests recovery of benchmark structure rather than every goal of exploratory topic modeling. The descriptor comparison is qualitative, and the excluded-feature audit cannot establish that every omitted feature is redundant or non-semantic.

## Related Concepts

- [[Sparse Autoencoders]]
- [[Mechanistic Topic Models]]
- [[Continuous Topic Models]]
- Topic modeling
- Autointerpretability
- Latent Dirichlet allocation
- Document embeddings

## Related Papers

- [[Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]]
- [[Sparse Autoencoders are Topic Models]]
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- O'Neill et al. (2024), "Towards Interpretable Scientific Foundation Models: Sparse Autoencoders for Disentangling Dense Embeddings of Scientific Concepts."
- Bianchi, Terragni, and Hovy (2021), "Pre-training is a Hot Topic: Contextualized Document Embeddings Improve Topic Coherence."

[[index|Library home]]
