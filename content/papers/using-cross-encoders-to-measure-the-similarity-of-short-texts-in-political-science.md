---
title: "Using Cross-Encoders to Measure the Similarity of Short Texts in Political Science"
type: paper
authors:
  - Gechun Lin
year: 2025
doi: "10.1111/ajps.12956"
journal: American Journal of Political Science
volume: 69
pages: "1600-1616"
source_job_id: "3cf17f5a-169e-443d-a8be-12d9d6854e5a"
tags:
  - cross-encoders
  - semantic-similarity
  - text-as-data
  - political-methodology
  - measurement
---

## TL;DR

Cross-encoders jointly process two short texts and use their pair-level representation to estimate semantic similarity. Across applications to socially transmitted messages, Supreme Court headlines, and senators' Facebook posts, the paper reports that cross-encoder measurements better recover hand-coded or theoretically expected patterns than lexical overlap and independently encoded sentence representations. The evidence supports cross-encoders for meaning-based comparison of short political texts, while leaving important limits in domain transfer, input length, computation, and pairwise scaling.

## Research Question

Can [[concepts/cross-encoders|Cross-Encoders]] measure the semantic similarity of short political texts more accurately than sequence matching, bag-of-words cosine similarity, and sentence-level embeddings, and does better measurement change substantive inferences?

## Motivation

Political scientists compare bills, speeches, headlines, social messages, and social-media posts to study diffusion, framing, distortion, responsiveness, and polarization. Methods based on shared words or matching sequences are unreliable when short texts express the same meaning with different words or use similar words to make opposed claims. Sentence embeddings incorporate context within each text, but encoding each text independently prevents direct token-level interaction across the pair.

## Contributions

- Introduces joint pair encoding as a practical measurement strategy for short political texts.
- Distinguishes off-the-shelf use from task-specific fine-tuning with expert-labeled pairs.
- Evaluates measurement through downstream substantive tests, not only predictive metrics.
- Shows that modest first-stage improvements can determine whether a second-stage political relationship is statistically distinguishable from zero.
- Connects semantic similarity to measures of information distortion, competing media frames, and issue-specific elite polarization.

## Method

A cross-encoder concatenates two texts with special separator tokens and passes the combined sequence through a transformer. Self-attention allows tokens in either text to interact with all tokens in the pair. The final representation of the classification token serves as a pair embedding, which a task-specific neural classifier maps to a binary label, discrete semantic relation, or continuous similarity score.

This differs from [[concepts/text-embedding-models|Text Embedding Models]] used as bi-encoders: those models encode each text separately and compare fixed vectors, usually with cosine similarity. Joint encoding can capture entailment, contradiction, and context-dependent relationships more directly, but it cannot precompute one reusable vector per document.

The paper studies both an off-the-shelf RoBERTa-based cross-encoder trained on semantic textual similarity data and customized models trained on 1,022 expert-labeled pairs of Supreme Court news headlines. The customized system is an ensemble of the best model from each fold of five-fold cross-validation.

## Experiments

### Information distortion

The first application reanalyzes 399 summaries from Carlson's telephone-game experiment. Cross-encoder and bag-of-words cosine scores correlate only modestly at .45. In separate univariate regressions, manually coded partisan distortion is negatively associated with cross-encoder similarity (coefficient -.022, standard error .006), while its association with cosine similarity is small and not statistically significant (-.004, standard error .007). This supports the cross-encoder measure as a better proxy for meaning preserved from the neutral Reuters article in this dataset.

### Supreme Court headline framing

The second application contains 27,407 pairs of informative headlines covering the same Supreme Court decisions from January through July 2020. The author labels 1,022 pairs using a bidirectional entailment criterion and trains five customized cross-encoders. Across held-out folds, the ensemble's component models average .909 accuracy, .862 precision, .841 recall, and .849 F1. The paper reports AUC .938 for the customized cross-encoder and .918 for the off-the-shelf model; locally trained doc2vec, pretrained BERT, and SRoBERTa sentence-level comparisons are around .5, while bag-of-words cosine and Smith-Waterman alignment exceed .8.

The customized model's out-of-sample accuracy (.909) also exceeds the reported average accuracy of Mechanical Turk coders (.808), though the comparison is with qualified lay coders rather than an independent expert panel. In downstream OLS models, only the cross-encoder-based heterogeneity measures yield a statistically significant negative association between unanimous decisions and heterogeneous coverage. All but the doc2vec coefficient have the expected negative sign, so the result is about precision and uncertainty rather than uniquely opposite point estimates.

### Elite polarization

The third application compares 100,999 pairs of Facebook posts by US senators, restricted to different senators posting about the same topic in the same week during 2017. An off-the-shelf cross-encoder indicates lower similarity for inter-party than intra-party pairs, with a larger gap on domestic than international topics. Bag-of-words, doc2vec, and BERT cosine measures yield different conclusions about whether and where the partisan gap appears. The cross-encoder result accords with the paper's theoretical expectation that foreign-policy disagreement exists but is less pronounced than domestic-policy disagreement; this agreement is supporting construct evidence, not independent ground truth.

## Limitations

The models described accept at most 512 input tokens, so long documents require segmentation or summarization that changes the estimand or may discard information. Fine-tuning is reported to require a GPU with roughly 12-16 GB of memory. Off-the-shelf performance depends on similarity definitions and domain language resembling the model's training tasks; specialized concepts may require labeled data.

Joint encoding also makes exhaustive comparison quadratic in the number of documents and prevents the efficient precomputation used by bi-encoders. The paper proposes sampling or theoretically informed blocking, but does not benchmark their recall or computational trade-offs. Its three applications all concern English-language short texts, and the suggested multilingual value is prospective rather than tested here.

The applications validate different notions of similarity: preservation of article meaning, mutual entailment of headlines, and closeness of policy statements. Results therefore do not establish that one cross-encoder score is universally valid for every political concept. The polarization application relies partly on consistency with established theory, while the headline application's downstream inference depends on generated measurements in both stages.

## Related Concepts

- [[concepts/cross-encoders|Cross-Encoders]]: jointly encode a text pair for task-specific scoring.
- [[concepts/text-embedding-models|Text Embedding Models]]: independently encode texts for reusable vector comparison.
- [[concepts/political-polarization|Political Polarization]]: one substantive construct operationalized through within-topic language similarity.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: motivates the comparison of alternative portrayals of the same court decision.

## Related Papers

- Reimers and Gurevych (2019), "Sentence-BERT: Sentence Embeddings Using Siamese BERT-Networks": cited sentence-level embedding benchmark.
- Devlin et al. (2018), "BERT: Pre-Training of Deep Bidirectional Transformers for Language Understanding": cited transformer foundation.
- Carlson (2019), "Through the Grapevine: Informational Consequences of Inter-personal Political Communication": supplies the first application's experiment and original cosine-similarity measure.
- Ying, Montgomery, and Stewart (2022), "Topics, Concepts, and Measurement: A Crowdsourced Procedure for Validating Topics as Measures": supplies the Facebook corpus and topic assignments used in the third application.

[[index|Library home]]
