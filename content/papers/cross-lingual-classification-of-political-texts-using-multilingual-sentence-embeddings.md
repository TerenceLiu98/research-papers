---
title: Cross-Lingual Classification of Political Texts Using Multilingual Sentence Embeddings
type: paper
authors:
  - Hauke Licht
year: 2023
doi: "10.1017/pan.2022.29"
source_job_id: "169b6dee-c3ff-4c0c-969d-819ec9ccd8d4"
tags:
  - cross-lingual-nlp
  - political-text-analysis
---

## TL;DR

Multilingual sentence embeddings enable manifesto classification at least as reliably as machine translation followed by bag-of-words representation in the evaluated settings. Their advantage is strongest with scarce labels, and they incur smaller losses when classifying languages absent from classifier training.

## Research Question

Can pretrained multilingual sentence embeddings replace translation-based input alignment for political text classification, including under limited supervision and unseen-language transfer?

## Motivation

Separate language-specific analyses duplicate effort. Commercial full-text translation can be costly, while isolated-token translation loses context. Shared semantic representations offer an alternative, but their pretraining corpora largely come from outside politics.

## Contributions

- Compares LASER, multilingual Universal Sentence Encoder, and knowledge-distilled XLM-R embeddings against Google Translate and open-source M2M translation with bag-of-words features.
- Measures how topic and position classification depend on labeled-data availability.
- Tests transfer to unseen classifier-training languages for immigration issue detection.

## Method

Original sentences are encoded as fixed-length vectors used as supervised classifier features, an application of [[concepts/text-embedding-models|Text Embedding Models]]. Translation baselines instead use word-count representations of translated sentences.

The first analysis uses 70,999 manifesto sentences in 12 languages matched to Comparative Manifestos Project labels, with five random 50:50 training/validation splits. Translation-based model selection uses five-times repeated fivefold cross-validation. Evaluation bootstraps 50 F1 estimates per classifier; topic and position comparisons use cross-class mean F1 excluding the uncoded category.

The second analysis varies training data from 3,549 to 31,948 sentences, using the best-performing XLM-R embedding model. The third varies source-language combinations in an eight-language immigration corpus, comparing held-out predictions when the target language is included versus excluded from training.

## Experiments

XLM-R embeddings outperform commercial translation plus bag-of-words for topic classification and perform comparably for position classification. LASER is the weakest embedding option. M2M translation produces only slightly lower classification reliability than Google Translate (Section 4.1).

The embedding advantage shrinks as training data increase. Topic classifiers using embeddings outperform commercial translation across the tested sizes; the position advantage is less pronounced. No tested size gives bag-of-words classifiers an advantage over their embedding counterparts (Section 4.2).

The immigration source corpus contains 222,847 quasi-sentences. A balanced within-language sample of 10,394 yields average F1 of 0.85 [0.84, 0.86] for embeddings and 0.83 [0.82, 0.85] for translation. Language-specific F1 exceeds 0.79 and 0.75, respectively. Embeddings achieve higher out-of-language F1 and smaller transfer losses across the evaluated languages. For Danish, the transfer loss is about 0.8 F1 points with embeddings versus 2.8 with translation (Section 4.3).

## Limitations

Absolute CMP topic and position performance is modest; class imbalance and noisy human labels are proposed explanations. Evidence concerns manifesto texts and the evaluated European languages. The proposed eventual advantage of domain-specific bag-of-words features with sufficiently abundant labels is an interpretation, not an observed crossover. Unseen-language classifier evaluation does not imply that the encoder never encountered that language during pretraining. Exact topic and position figure values are not transcribed in the supplied Markdown.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: provide shared semantic classifier features across languages.
- [[concepts/zero-shot-cross-lingual-topic-modeling|Zero-shot Cross-lingual Topic Modeling]]: related representation transfer for unsupervised topic inference, distinct from this paper’s supervised label prediction.

## Related Papers

- [[papers/cross-lingual-contextualized-topic-models-with-zero-shot-learning|Cross-lingual Contextualized Topic Models with Zero-shot Learning]]: uses multilingual representations for unseen-language topic inference.
- Artetxe and Schwenk (2019), “Massively Multilingual Sentence Embeddings for Zero-Shot Cross-Lingual Transfer and Beyond”: introduces LASER, evaluated here.
- Reimers and Gurevych (2020), “Making Monolingual Sentence Embeddings Multilingual using Knowledge Distillation”: provides the distillation approach used for multilingual embedding alignment.

Replication resources reported by the paper: [Code Ocean](https://doi.org/10.24433/CO.5199179.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/OLRTXA).
