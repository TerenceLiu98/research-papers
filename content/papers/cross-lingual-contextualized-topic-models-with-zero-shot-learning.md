---
title: Cross-lingual Contextualized Topic Models with Zero-shot Learning
type: paper
authors:
  - Federico Bianchi
  - Silvia Terragni
  - Debora Nozza
  - Dirk Hovy
  - Elisabetta Fersini
year: null
repository: "https://github.com/MilaNLProc/contextualized-topic-models"
source_job_id: "08069ed6-b471-4262-8d81-95428d73f157"
tags:
  - topic-modeling
  - cross-lingual-nlp
  - zero-shot-learning
  - document-embeddings
---

## TL;DR

ZeroShotTM replaces the bag-of-words input to Neural-ProdLDA with multilingual Sentence-BERT document embeddings while retaining an English bag-of-words reconstruction target during training. Trained only on English Wikipedia abstracts, it assigns comparable documents in Italian, French, Portuguese, and German to similar English-language topics without translation or multilingual topic-model training. Its English topic coherence is comparable to the paper's neural baselines, and its cross-lingual predictions approach a machine-translation baseline on paired abstracts.

[[index|Library home]]

## Research Question

Can a neural topic model learn interpretable topics in one language and infer topic distributions for documents in unseen languages without multilingual training corpora, dictionaries, alignments, or translation at inference time?

## Motivation

Conventional topic models consume vocabulary-specific bag-of-words vectors. They cannot directly encode unseen words, and a model trained in one language cannot accept documents whose words fall outside that vocabulary. Combining several languages into one vocabulary increases sparsity and parameter count. The paper uses multilingual document embeddings as a shared input space, turning the vocabulary mismatch into a representation-transfer problem summarized by [[concepts/zero-shot-cross-lingual-topic-modeling|Zero-shot Cross-lingual Topic Modeling]].

## Contributions

- Introduces ZeroShotTM, a variational neural topic model whose inference network consumes multilingual contextualized document embeddings instead of bag-of-words vectors.
- Separates test-time inference from the training vocabulary: an English bag-of-words target is used to learn topic descriptors during training, but is not required for a new document at inference time.
- Tests whether contextualized embeddings can replace bag-of-words inputs on English data and whether a model trained on English transfers to four unseen languages.
- Evaluates cross-lingual agreement with exact top-topic matches, topic-centroid similarity, KL divergence, and manual topic-quality ratings.

## Method

ZeroShotTM extends Neural-ProdLDA, a variational autoencoder for topic modeling. In Neural-ProdLDA, an inference network maps a document's bag-of-words vector to the mean and variance of a Gaussian latent representation, samples the latent document vector, and decodes it into a distribution over the vocabulary. ZeroShotTM instead feeds a pretrained Sentence-BERT document embedding to this inference network. This is an instance of [[concepts/amortized-variational-inference|Amortized Variational Inference]] with an embedding-based observation representation.

The decoder still reconstructs an English bag-of-words vector during training. That target connects latent dimensions to English topic words, but it is unnecessary at test time: inference requires only a document embedding. When the embedding model maps semantically corresponding documents from different languages into nearby regions, the trained encoder can produce similar topic distributions for them. Topic descriptors remain in the training language.

The experiments use the multilingual Sentence-BERT model on raw text truncated to 200 tokens. For bag-of-words targets and comparisons, the authors remove punctuation, digits, and English stop words and retain the 2,000 most frequent terms. Neural models use a 100-unit softplus hidden layer, 20% dropout, batch size 200, Adam with learning rate 0.002, and 100 training epochs.

## Experiments

The English-only W1 dataset contains 20,000 DBpedia Wikipedia abstracts. Across 30 runs, the authors measure NPMI coherence for 50 and 100 topics. ZeroShotTM scores 0.1632 and 0.1381, respectively, compared with 0.1644 and 0.1409 for Combined TM, 0.1658 and 0.1285 for Neural-ProdLDA, and negative values for LDA. Only Combined TM's 100-topic result is marked statistically significant in the table. These results support comparability to the neural baselines, not uniform superiority.

W2 contains 100,000 English abstracts, with 99,700 used for training and 300 held out. The evaluation pairs those 300 English abstracts with versions about the same entities in Italian, French, Portuguese, and German. Topic distributions are averaged over 100 samples before comparison.

| Topics | Mean exact match | Mean KL divergence | Mean topic-centroid similarity | Translation baseline match | Translation baseline KL | Translation baseline similarity |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 25 | 78.00% | 0.15 | 0.85 | 76.00% | 0.15 | 0.84 |
| 50 | 64.41% | 0.20 | 0.77 | 69.00% | 0.19 | 0.79 |

The exact-match rate ranges from 75.67% to 79.33% with 25 topics and from 62.00% to 68.00% with 50 topics across the four unseen languages. The translation baseline translates each document into English with DeepL before inference; ZeroShotTM is slightly stronger on the reported 25-topic averages and weaker on the 50-topic averages.

For manual evaluation, raters score the predicted topic for 300 documents in each of five languages on a 0-3 scale. Mean quality is 2.35 for English, 2.29 for Italian, 2.22 for French, 2.26 for Portuguese, and 2.19 for German, with an overall mean of 2.26. Ordinally weighted Gwet AC1 is 0.88. The reported runtime on a GeForce GTX 1050 is 1.2 seconds per epoch for both 25 and 50 topics, versus 0.8 and 0.9 seconds for Neural-ProdLDA.

## Limitations

- Cross-lingual evaluation uses only 300 matched Wikipedia abstracts per language and four European languages. The results do not establish transfer to distant language families, other genres, or low-resource languages with weaker embedding support.
- The model depends on the multilingual embedding space to align languages. It is language-independent only to the extent that the selected embedding model supplies an adequate representation for the test language.
- Topic descriptors always come from the training language, so the method does not produce localized topic vocabularies for readers of the test language.
- The English comparison relies on NPMI coherence alone; comparable coherence does not by itself establish topic diversity, human interpretability, or downstream utility. See [[concepts/topic-model-evaluation|Topic Model Evaluation]].
- Cross-lingual metrics compare language versions of the same Wikipedia entity. They measure consistency on comparable documents rather than recovery of independently validated latent topics.
- The manual study reports aggregate quality and agreement but does not describe a comparison against human ratings for the translation baseline.
- Dates can spuriously steer predictions toward time-related topics, as the paper's qualitative analysis notes.

## Related Concepts

- [[concepts/zero-shot-cross-lingual-topic-modeling|Zero-shot Cross-lingual Topic Modeling]]: the transfer setting and the paper's central task.
- [[concepts/text-embedding-models|Text Embedding Models]]: provide the shared multilingual document representation used at inference time.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: underlies the encoder that maps document representations to latent topic distributions.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: distinguishes coherence, assignment consistency, and human topic-quality evidence.
- [[concepts/embedded-topic-models|Embedded Topic Models]]: a related use of embeddings in probabilistic topic models, but at the topic-word parameterization rather than as the document encoder input.

## Related Papers

- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]]: embeds topics and vocabulary terms in a shared space while retaining bag-of-words document inputs.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]]: a later pretrained-embedding topic model evaluated for transfer and efficiency.
- Bianchi, Terragni, and Hovy, "Pre-training is a Hot Topic: Contextualized Document Embeddings Improve Topic Coherence": introduces Combined TM, which concatenates contextualized embeddings with bag-of-words inputs and serves as a baseline here.
- Mimno et al., "Polylingual Topic Models": learns aligned multilingual topics from parallel documents, unlike the unseen-language inference setting studied here.
